package com.transcription.app.infrastructure.watcher;

import com.transcription.app.application.usecase.CreateTranscriptionUseCase;
import com.transcription.app.application.usecase.CreateTranscriptionUseCase.JobInitResult;
import com.transcription.app.config.AppProperties;
import com.transcription.app.domain.service.TranscriptionOrchestrator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.file.*;
import java.util.concurrent.ExecutorService;

@Slf4j
@Component
@RequiredArgsConstructor
public class FolderWatcherService implements ApplicationListener<ApplicationReadyEvent> {

    private final CreateTranscriptionUseCase createTranscriptionUseCase;
    private final TranscriptionOrchestrator orchestrator;
    private final AppProperties properties;
    private final ExecutorService virtualThreadExecutor;

    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        String inputDirStr = properties.getStorage().getInputDirectory();
        String outputDirStr = properties.getStorage().getOutputDirectory();

        if (inputDirStr == null || inputDirStr.isBlank()) {
            log.info("Folder watcher disabled — INPUT_DIR not configured");
            return;
        }

        Path inputDir = Path.of(inputDirStr);
        Path outputDir = outputDirStr != null && !outputDirStr.isBlank()
                ? Path.of(outputDirStr)
                : inputDir.getParent().resolve("output");
        Path processedDir = inputDir.resolve("processed");

        try {
            Files.createDirectories(inputDir);
            Files.createDirectories(outputDir);
            Files.createDirectories(processedDir);
        } catch (IOException e) {
            log.error("Folder watcher failed to create directories: {}", e.getMessage(), e);
            return;
        }

        log.info("Folder watcher started. Input: {} | Output: {}", inputDir, outputDir);

        // Process any MP3 files already present on startup
        try (DirectoryStream<Path> stream = Files.newDirectoryStream(inputDir, "*.mp3")) {
            for (Path mp3 : stream) {
                submitFile(mp3, processedDir, outputDir);
            }
        } catch (IOException e) {
            log.error("Failed to scan input directory on startup: {}", e.getMessage(), e);
        }

        // Keep watching for new files in a virtual thread
        virtualThreadExecutor.submit(() -> watchDirectory(inputDir, processedDir, outputDir));
    }

    private void watchDirectory(Path inputDir, Path processedDir, Path outputDir) {
        try (WatchService watcher = FileSystems.getDefault().newWatchService()) {
            inputDir.register(watcher, StandardWatchEventKinds.ENTRY_CREATE);
            log.info("Watching {} for new MP3 files...", inputDir);

            while (!Thread.currentThread().isInterrupted()) {
                WatchKey key = watcher.take();
                for (WatchEvent<?> watchEvent : key.pollEvents()) {
                    if (watchEvent.kind() == StandardWatchEventKinds.OVERFLOW) continue;

                    @SuppressWarnings("unchecked")
                    Path filename = ((WatchEvent<Path>) watchEvent).context();
                    if (!filename.toString().toLowerCase().endsWith(".mp3")) continue;

                    Path fullPath = inputDir.resolve(filename);
                    waitForFileStable(fullPath);
                    submitFile(fullPath, processedDir, outputDir);
                }
                if (!key.reset()) break;
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            log.info("Folder watcher stopped");
        } catch (IOException e) {
            log.error("Folder watcher error: {}", e.getMessage(), e);
        }
    }

    private void submitFile(Path mp3File, Path processedDir, Path outputDir) {
        if (!Files.isRegularFile(mp3File)) return;

        String filename = mp3File.getFileName().toString();
        Path destination = processedDir.resolve(filename);

        try {
            // Move to processed/ before starting so a restart won't re-queue it
            Files.move(mp3File, destination, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            log.error("Could not move '{}' to processed/: {}", filename, e.getMessage());
            return;
        }

        log.info("Queuing '{}' for transcription", filename);
        virtualThreadExecutor.submit(() -> processFile(destination, filename, outputDir));
    }

    private void processFile(Path audioFile, String originalFilename, Path outputDir) {
        try {
            JobInitResult init = createTranscriptionUseCase.initFromPath(audioFile, originalFilename);
            log.info("[Job {}] Transcribing '{}'", init.job().getId(), originalFilename);

            orchestrator.orchestrate(init.job().getId(), init.audioFilePath());

            Path resultFile = Path.of(properties.getStorage().getWorkDirectory())
                    .resolve(init.job().getId().toString())
                    .resolve("final-transcription.txt");

            if (Files.exists(resultFile)) {
                String baseName = originalFilename.replaceAll("(?i)\\.mp3$", "");
                Path outputFile = outputDir.resolve(baseName + ".txt");
                Files.copy(resultFile, outputFile, StandardCopyOption.REPLACE_EXISTING);
                log.info("[Job {}] Output written to: {}", init.job().getId(), outputFile);
            } else {
                log.warn("[Job {}] Transcription finished but result file not found at: {}",
                        init.job().getId(), resultFile);
            }

        } catch (Exception e) {
            log.error("Transcription failed for '{}': {}", originalFilename, e.getMessage(), e);
        }
    }

    /** Waits until the file size stops changing (i.e., the copy is complete). */
    private void waitForFileStable(Path file) {
        long previousSize = -1;
        int stableChecks = 0;
        while (stableChecks < 3) {
            try {
                Thread.sleep(500);
                long currentSize = Files.size(file);
                if (currentSize == previousSize) {
                    stableChecks++;
                } else {
                    stableChecks = 0;
                    previousSize = currentSize;
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                return;
            } catch (IOException e) {
                return;
            }
        }
    }
}
