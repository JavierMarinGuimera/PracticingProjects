package com.transcription.app.infrastructure.ffmpeg;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.transcription.app.config.AppProperties;
import com.transcription.app.domain.model.AudioChunk;
import com.transcription.app.domain.model.ChunkStatus;
import com.transcription.app.domain.port.AudioSplitter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Component
@RequiredArgsConstructor
public class FfmpegAudioSplitter implements AudioSplitter {

    private final AppProperties properties;
    private final ObjectMapper objectMapper;

    @Override
    public List<AudioChunk> split(Path inputFile, Path outputDir, UUID jobId, int chunkSeconds) {
        log.info("[Job {}] Splitting {} with FFmpeg (chunk size: {}s)", jobId, inputFile.getFileName(), chunkSeconds);

        double totalDuration = getDurationSeconds(inputFile);
        log.info("[Job {}] Total audio duration: {:.1f}s ({:.1f} minutes)", jobId, totalDuration, totalDuration / 60);

        splitWithFfmpeg(inputFile, outputDir, chunkSeconds);

        List<Path> chunkFiles = collectChunkFiles(outputDir);
        log.info("[Job {}] Created {} chunk files", jobId, chunkFiles.size());

        return buildChunkMetadata(chunkFiles, jobId, chunkSeconds, totalDuration);
    }

    @Override
    public double getDurationSeconds(Path audioFile) {
        List<String> cmd = List.of(
                properties.getFfmpeg().getFfprobePath(),
                "-v", "quiet",
                "-print_format", "json",
                "-show_format",
                audioFile.toAbsolutePath().toString()
        );

        try {
            ProcessResult result = runProcess(cmd, "ffprobe");
            JsonNode json = objectMapper.readTree(result.stdout());
            String durationStr = json.path("format").path("duration").asText("0");
            return Double.parseDouble(durationStr);
        } catch (Exception e) {
            throw new RuntimeException("Failed to get audio duration for: " + audioFile, e);
        }
    }

    private void splitWithFfmpeg(Path inputFile, Path outputDir, int chunkSeconds) {
        String outputPattern = outputDir.resolve("chunk_%03d.mp3").toAbsolutePath().toString();

        List<String> cmd = List.of(
                properties.getFfmpeg().getExecutablePath(),
                "-i", inputFile.toAbsolutePath().toString(),
                "-f", "segment",
                "-segment_time", String.valueOf(chunkSeconds),
                "-c", "copy",                    // copy stream — no recompression
                "-reset_timestamps", "1",         // reset timestamps per chunk for Whisper
                "-avoid_negative_ts", "make_zero",
                "-y",                             // overwrite without prompt
                outputPattern
        );

        log.debug("[FFmpeg] Command: {}", String.join(" ", cmd));

        ProcessResult result = runProcess(cmd, "ffmpeg-split");

        if (result.exitCode() != 0) {
            log.error("[FFmpeg] Split failed. stderr:\n{}", result.stderr());
            throw new RuntimeException("FFmpeg split failed with exit code " + result.exitCode() +
                    ". stderr: " + result.stderr());
        }
    }

    private List<Path> collectChunkFiles(Path outputDir) {
        try (var stream = Files.list(outputDir)) {
            return stream
                    .filter(p -> p.getFileName().toString().startsWith("chunk_") &&
                            p.getFileName().toString().endsWith(".mp3"))
                    .sorted()
                    .collect(Collectors.toList());
        } catch (IOException e) {
            throw new RuntimeException("Failed to list chunk files in: " + outputDir, e);
        }
    }

    private List<AudioChunk> buildChunkMetadata(List<Path> chunkFiles, UUID jobId,
                                                  int chunkSeconds, double totalDuration) {
        List<AudioChunk> chunks = new ArrayList<>();
        Instant now = Instant.now();

        for (int i = 0; i < chunkFiles.size(); i++) {
            double startTime = (double) i * chunkSeconds;
            double endTime = Math.min(startTime + chunkSeconds, totalDuration);
            double duration = endTime - startTime;

            chunks.add(AudioChunk.builder()
                    .id(UUID.randomUUID())
                    .jobId(jobId)
                    .chunkIndex(i)
                    .filePath(chunkFiles.get(i).toAbsolutePath().toString())
                    .startTimeSeconds(startTime)
                    .endTimeSeconds(endTime)
                    .durationSeconds(duration)
                    .status(ChunkStatus.PENDING)
                    .attempts(0)
                    .createdAt(now)
                    .updatedAt(now)
                    .build());
        }

        return chunks;
    }

    private ProcessResult runProcess(List<String> command, String processName) {
        try {
            ProcessBuilder pb = new ProcessBuilder(command);
            pb.redirectErrorStream(false);
            Process process = pb.start();

            String stdout = readStream(process.getInputStream());
            String stderr = readStream(process.getErrorStream());
            int exitCode = process.waitFor();

            return new ProcessResult(exitCode, stdout, stderr);

        } catch (IOException | InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("Failed to run " + processName + ": " + e.getMessage(), e);
        }
    }

    private String readStream(java.io.InputStream stream) {
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(stream))) {
            return reader.lines().collect(Collectors.joining("\n"));
        } catch (IOException e) {
            return "";
        }
    }

    private record ProcessResult(int exitCode, String stdout, String stderr) {}
}
