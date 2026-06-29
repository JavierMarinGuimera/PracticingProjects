package com.transcription.app.application.usecase;

import com.transcription.app.config.AppProperties;
import com.transcription.app.domain.model.JobStatus;
import com.transcription.app.domain.model.TranscriptionJob;
import com.transcription.app.domain.port.TranscriptionJobRepository;
import com.transcription.app.domain.service.TranscriptionOrchestrator;
import com.transcription.app.web.exception.InvalidFileException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.time.Instant;
import java.util.UUID;
import java.util.concurrent.ExecutorService;

@Slf4j
@Service
@RequiredArgsConstructor
public class CreateTranscriptionUseCase {

    private final TranscriptionJobRepository jobRepository;
    private final TranscriptionOrchestrator orchestrator;
    private final AppProperties properties;
    private final ExecutorService virtualThreadExecutor;

    public record JobInitResult(TranscriptionJob job, Path audioFilePath) {}

    /**
     * Creates a job record and copies the audio file into the work directory,
     * without launching async orchestration. Used by FolderWatcherService.
     */
    public JobInitResult initFromPath(Path sourcePath, String originalFilename) {
        UUID jobId = UUID.randomUUID();
        Path workDir = Path.of(properties.getStorage().getWorkDirectory(), jobId.toString());

        try {
            Files.createDirectories(workDir);
            Path destination = workDir.resolve("audio_" + jobId + ".mp3");
            Files.copy(sourcePath, destination, StandardCopyOption.REPLACE_EXISTING);

            TranscriptionJob job = TranscriptionJob.builder()
                    .id(jobId)
                    .originalFilename(sanitizeFilename(originalFilename))
                    .fileSizeBytes(Files.size(destination))
                    .workDirectory(workDir.toString())
                    .status(JobStatus.UPLOADED)
                    .totalChunks(0)
                    .processedChunks(0)
                    .failedChunks(0)
                    .createdAt(Instant.now())
                    .updatedAt(Instant.now())
                    .build();

            log.info("[Job {}] Initialized from folder for file '{}' ({} bytes)", jobId, originalFilename, Files.size(destination));
            return new JobInitResult(jobRepository.save(job), destination);

        } catch (IOException e) {
            log.error("[Job {}] Failed to initialize job from path: {}", jobId, e.getMessage());
            throw new RuntimeException("Failed to initialize transcription job from file", e);
        }
    }

    public TranscriptionJob execute(MultipartFile file) {
        validateFile(file);

        UUID jobId = UUID.randomUUID();
        Path workDir = Path.of(properties.getStorage().getWorkDirectory(), jobId.toString());

        try {
            Files.createDirectories(workDir);
            Path savedFile = saveUploadedFile(file, workDir, jobId);

            TranscriptionJob job = TranscriptionJob.builder()
                    .id(jobId)
                    .originalFilename(sanitizeFilename(file.getOriginalFilename()))
                    .fileSizeBytes(file.getSize())
                    .workDirectory(workDir.toString())
                    .status(JobStatus.UPLOADED)
                    .totalChunks(0)
                    .processedChunks(0)
                    .failedChunks(0)
                    .createdAt(Instant.now())
                    .updatedAt(Instant.now())
                    .build();

            TranscriptionJob savedJob = jobRepository.save(job);
            log.info("[Job {}] Created for file '{}' ({} bytes)", jobId, job.getOriginalFilename(), job.getFileSizeBytes());

            // Launch orchestration in background using Virtual Thread
            Path finalSavedFile = savedFile;
            virtualThreadExecutor.submit(() -> {
                try {
                    orchestrator.orchestrate(jobId, finalSavedFile);
                } catch (Exception e) {
                    log.error("[Job {}] Background orchestration failed: {}", jobId, e.getMessage(), e);
                }
            });

            return savedJob;

        } catch (IOException e) {
            log.error("[Job {}] Failed to create work directory or save file: {}", jobId, e.getMessage());
            throw new RuntimeException("Failed to initialize transcription job", e);
        }
    }

    private void validateFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new InvalidFileException("File is empty or not provided");
        }

        String contentType = file.getContentType();
        String originalFilename = file.getOriginalFilename();

        boolean isAudioMpeg = "audio/mpeg".equals(contentType);
        boolean hasMp3Extension = originalFilename != null &&
                originalFilename.toLowerCase().endsWith(".mp3");

        if (!isAudioMpeg && !hasMp3Extension) {
            throw new InvalidFileException(
                    "Only MP3 files are supported. Received content-type: " + contentType +
                    ", filename: " + originalFilename);
        }

        if (file.getSize() > properties.getUpload().getMaxFileSizeBytes()) {
            throw new InvalidFileException(
                    "File size " + file.getSize() + " bytes exceeds maximum allowed size of " +
                    properties.getUpload().getMaxFileSizeBytes() + " bytes");
        }
    }

    private Path saveUploadedFile(MultipartFile file, Path workDir, UUID jobId) throws IOException {
        String originalFilename = file.getOriginalFilename();
        String safeFilename = "audio_" + jobId + ".mp3";
        Path destination = workDir.resolve(safeFilename);

        // Stream copy — never loads full file into memory
        try (var inputStream = file.getInputStream()) {
            Files.copy(inputStream, destination, StandardCopyOption.REPLACE_EXISTING);
        }

        log.info("[Job {}] Saved uploaded file to: {}", jobId, destination);
        return destination;
    }

    private String sanitizeFilename(String filename) {
        if (filename == null) return "unknown.mp3";
        return filename.replaceAll("[^a-zA-Z0-9._-]", "_");
    }
}
