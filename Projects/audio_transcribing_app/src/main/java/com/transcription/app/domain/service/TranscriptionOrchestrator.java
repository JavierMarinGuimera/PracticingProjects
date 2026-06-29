package com.transcription.app.domain.service;

import com.transcription.app.config.AppProperties;
import com.transcription.app.domain.model.*;
import com.transcription.app.domain.port.*;
import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.Timer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

@Slf4j
@Service
@RequiredArgsConstructor
public class TranscriptionOrchestrator {

    private final TranscriptionJobRepository jobRepository;
    private final AudioChunkRepository chunkRepository;
    private final ChunkResultRepository resultRepository;
    private final AudioSplitter audioSplitter;
    private final WhisperClient whisperClient;
    private final AppProperties properties;
    private final ExecutorService virtualThreadExecutor;
    private final MeterRegistry meterRegistry;

    public void orchestrate(UUID jobId, Path audioFilePath) {
        log.info("[Job {}] Starting orchestration for file: {}", jobId, audioFilePath);

        try {
            Path workDir = Path.of(properties.getStorage().getWorkDirectory(), jobId.toString());

            // Phase 1: Split audio into chunks
            List<AudioChunk> chunks = splitAudio(jobId, audioFilePath, workDir);

            // Phase 2: Process chunks in parallel with Virtual Threads
            processChunksInParallel(jobId, chunks);

            // Phase 3: Merge results
            mergeResults(jobId, workDir);

        } catch (Exception e) {
            log.error("[Job {}] Orchestration failed: {}", jobId, e.getMessage(), e);
            jobRepository.updateStatus(jobId, JobStatus.FAILED, e.getMessage());
        }
    }

    private List<AudioChunk> splitAudio(UUID jobId, Path audioFilePath, Path workDir) {
        log.info("[Job {}] Starting audio split phase", jobId);
        jobRepository.updateStatus(jobId, JobStatus.SPLITTING);

        try {
            Path chunksDir = workDir.resolve("chunks");
            Files.createDirectories(chunksDir);

            List<AudioChunk> chunks = audioSplitter.split(
                    audioFilePath,
                    chunksDir,
                    jobId,
                    properties.getFfmpeg().getChunkDurationSeconds()
            );

            List<AudioChunk> savedChunks = chunkRepository.saveAll(chunks);

            // Update total chunks count on the job
            TranscriptionJob job = jobRepository.findById(jobId)
                    .orElseThrow(() -> new IllegalStateException("Job not found: " + jobId));

            jobRepository.save(job.withTotalChunks(savedChunks.size()));

            log.info("[Job {}] Audio split into {} chunks", jobId, savedChunks.size());
            meterRegistry.counter("transcription.chunks.created", "jobId", jobId.toString())
                    .increment(savedChunks.size());

            return savedChunks;

        } catch (IOException e) {
            throw new RuntimeException("Failed to create chunks directory", e);
        }
    }

    private void processChunksInParallel(UUID jobId, List<AudioChunk> chunks) {
        log.info("[Job {}] Starting parallel processing of {} chunks with Virtual Threads", jobId, chunks.size());
        jobRepository.updateStatus(jobId, JobStatus.PROCESSING);

        List<CompletableFuture<Void>> futures = chunks.stream()
                .map(chunk -> CompletableFuture.runAsync(
                        () -> processChunk(jobId, chunk),
                        virtualThreadExecutor
                ))
                .toList();

        try {
            long timeoutMinutes = properties.getProcessing().getChunkTimeout().toMinutes() * chunks.size();
            CompletableFuture.allOf(futures.toArray(new CompletableFuture[0]))
                    .get(timeoutMinutes, TimeUnit.MINUTES);

            log.info("[Job {}] All {} chunks processed", jobId, chunks.size());

        } catch (TimeoutException e) {
            futures.forEach(f -> f.cancel(true));
            throw new RuntimeException("Chunk processing timed out after " +
                    properties.getProcessing().getChunkTimeout().toMinutes() + " minutes per chunk");
        } catch (Exception e) {
            throw new RuntimeException("Parallel processing failed: " + e.getMessage(), e);
        }
    }

    private void processChunk(UUID jobId, AudioChunk chunk) {
        String threadName = Thread.currentThread().toString();
        log.info("[Job {}][Chunk {}] Processing on thread: {}", jobId, chunk.getChunkIndex(), threadName);

        int maxRetries = properties.getProcessing().getMaxRetries();
        int attempt = 0;
        Exception lastException = null;

        while (attempt < maxRetries) {
            attempt++;
            chunkRepository.updateStatus(chunk.getId(), ChunkStatus.PROCESSING);
            chunkRepository.incrementAttempts(chunk.getId());

            try {
                Timer.Sample sample = Timer.start(meterRegistry);
                long startMs = System.currentTimeMillis();

                String transcription = whisperClient.transcribe(
                        Path.of(chunk.getFilePath()),
                        properties.getWhisper().getModel(),
                        properties.getWhisper().getLanguage()
                );

                long processingTimeMs = System.currentTimeMillis() - startMs;
                sample.stop(meterRegistry.timer("transcription.chunk.duration",
                        "jobId", jobId.toString(), "chunkIndex", String.valueOf(chunk.getChunkIndex())));

                ChunkResult result = ChunkResult.builder()
                        .id(UUID.randomUUID())
                        .chunkId(chunk.getId())
                        .jobId(jobId)
                        .chunkIndex(chunk.getChunkIndex())
                        .transcriptionText(transcription)
                        .processingTimeMs(processingTimeMs)
                        .attempts(attempt)
                        .createdAt(Instant.now())
                        .updatedAt(Instant.now())
                        .build();

                resultRepository.save(result);
                chunkRepository.updateStatus(chunk.getId(), ChunkStatus.COMPLETED);
                jobRepository.incrementProcessedChunks(jobId);

                log.info("[Job {}][Chunk {}] Completed in {}ms (attempt {}/{})",
                        jobId, chunk.getChunkIndex(), processingTimeMs, attempt, maxRetries);
                return;

            } catch (Exception e) {
                lastException = e;
                log.warn("[Job {}][Chunk {}] Attempt {}/{} failed: {}",
                        jobId, chunk.getChunkIndex(), attempt, maxRetries, e.getMessage());

                if (attempt < maxRetries) {
                    try {
                        Thread.sleep(properties.getProcessing().getRetryDelay().toMillis());
                    } catch (InterruptedException ie) {
                        Thread.currentThread().interrupt();
                        break;
                    }
                }
            }
        }

        // All retries exhausted
        log.error("[Job {}][Chunk {}] Failed after {} attempts: {}",
                jobId, chunk.getChunkIndex(), maxRetries, lastException.getMessage());

        ChunkResult failedResult = ChunkResult.builder()
                .id(UUID.randomUUID())
                .chunkId(chunk.getId())
                .jobId(jobId)
                .chunkIndex(chunk.getChunkIndex())
                .errorMessage(lastException.getMessage())
                .attempts(attempt)
                .createdAt(Instant.now())
                .updatedAt(Instant.now())
                .build();

        resultRepository.save(failedResult);
        chunkRepository.updateStatus(chunk.getId(), ChunkStatus.FAILED);
        jobRepository.incrementFailedChunks(jobId);

        meterRegistry.counter("transcription.chunks.failed", "jobId", jobId.toString()).increment();
    }

    private void mergeResults(UUID jobId, Path workDir) {
        log.info("[Job {}] Starting merge phase", jobId);
        jobRepository.updateStatus(jobId, JobStatus.MERGING);

        List<ChunkResult> results = resultRepository.findByJobIdOrderByChunkIndex(jobId);
        List<ChunkResult> successfulResults = results.stream()
                .filter(ChunkResult::isSuccessful)
                .sorted(Comparator.comparingInt(ChunkResult::getChunkIndex))
                .toList();

        if (successfulResults.isEmpty()) {
            throw new RuntimeException("No successful chunk results to merge");
        }

        try {
            Path transcriptionFile = workDir.resolve("final-transcription.txt");
            List<String> lines = new ArrayList<>();

            for (ChunkResult result : successfulResults) {
                lines.add(result.getTranscriptionText().strip());
                lines.add(""); // blank line between chunks
            }

            // Remove trailing blank line
            if (!lines.isEmpty() && lines.getLast().isBlank()) {
                lines.removeLast();
            }

            Files.write(transcriptionFile, lines, StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);

            TranscriptionJob job = jobRepository.findById(jobId)
                    .orElseThrow(() -> new IllegalStateException("Job not found: " + jobId));

            jobRepository.save(job
                    .withFinalTranscriptionPath(transcriptionFile.toString())
                    .withStatus(JobStatus.COMPLETED)
                    .withCompletedAt(Instant.now())
                    .withUpdatedAt(Instant.now()));

            int failedCount = results.size() - successfulResults.size();
            log.info("[Job {}] Merge complete. {} chunks merged, {} failed. Output: {}",
                    jobId, successfulResults.size(), failedCount, transcriptionFile);

            meterRegistry.counter("transcription.jobs.completed").increment();

        } catch (IOException e) {
            throw new RuntimeException("Failed to write final transcription file", e);
        }
    }
}
