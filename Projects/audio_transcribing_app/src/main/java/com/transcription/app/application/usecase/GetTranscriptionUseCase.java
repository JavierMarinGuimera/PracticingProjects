package com.transcription.app.application.usecase;

import com.transcription.app.application.dto.AudioChunkDto;
import com.transcription.app.application.dto.ChunkResultDto;
import com.transcription.app.application.dto.TranscriptionJobDto;
import com.transcription.app.domain.model.AudioChunk;
import com.transcription.app.domain.model.ChunkResult;
import com.transcription.app.domain.model.TranscriptionJob;
import com.transcription.app.domain.port.AudioChunkRepository;
import com.transcription.app.domain.port.ChunkResultRepository;
import com.transcription.app.domain.port.TranscriptionJobRepository;
import com.transcription.app.web.exception.JobNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class GetTranscriptionUseCase {

    private final TranscriptionJobRepository jobRepository;
    private final AudioChunkRepository chunkRepository;
    private final ChunkResultRepository resultRepository;

    public TranscriptionJobDto getJob(UUID id) {
        TranscriptionJob job = findJobOrThrow(id);
        return toDto(job);
    }

    public TranscriptionJobDto getJobStatus(UUID id) {
        return getJob(id);
    }

    public List<AudioChunkDto> getChunks(UUID jobId) {
        findJobOrThrow(jobId);
        return chunkRepository.findByJobIdOrderByChunkIndex(jobId).stream()
                .map(this::toChunkDto)
                .toList();
    }

    public List<ChunkResultDto> getResults(UUID jobId) {
        findJobOrThrow(jobId);
        return resultRepository.findByJobIdOrderByChunkIndex(jobId).stream()
                .map(this::toResultDto)
                .toList();
    }

    public String downloadTranscription(UUID id) {
        TranscriptionJob job = findJobOrThrow(id);

        if (job.getFinalTranscriptionPath() == null) {
            throw new JobNotFoundException("Transcription not yet available for job: " + id +
                    ". Current status: " + job.getStatus());
        }

        try {
            return Files.readString(Path.of(job.getFinalTranscriptionPath()));
        } catch (IOException e) {
            log.error("[Job {}] Failed to read transcription file: {}", id, e.getMessage());
            throw new RuntimeException("Failed to read transcription file", e);
        }
    }

    public List<TranscriptionJobDto> getAllJobs() {
        return jobRepository.findAll().stream()
                .map(this::toDto)
                .toList();
    }

    private TranscriptionJob findJobOrThrow(UUID id) {
        return jobRepository.findById(id)
                .orElseThrow(() -> new JobNotFoundException("Transcription job not found: " + id));
    }

    private TranscriptionJobDto toDto(TranscriptionJob job) {
        return TranscriptionJobDto.builder()
                .id(job.getId())
                .originalFilename(job.getOriginalFilename())
                .fileSizeBytes(job.getFileSizeBytes())
                .status(job.getStatus())
                .totalChunks(job.getTotalChunks())
                .processedChunks(job.getProcessedChunks())
                .failedChunks(job.getFailedChunks())
                .progressPercent(job.getProgressPercent())
                .errorMessage(job.getErrorMessage())
                .hasTranscription(job.getFinalTranscriptionPath() != null)
                .createdAt(job.getCreatedAt())
                .updatedAt(job.getUpdatedAt())
                .completedAt(job.getCompletedAt())
                .build();
    }

    private AudioChunkDto toChunkDto(AudioChunk chunk) {
        return AudioChunkDto.builder()
                .id(chunk.getId())
                .chunkIndex(chunk.getChunkIndex())
                .startTimeSeconds(chunk.getStartTimeSeconds())
                .endTimeSeconds(chunk.getEndTimeSeconds())
                .durationSeconds(chunk.getDurationSeconds())
                .status(chunk.getStatus())
                .attempts(chunk.getAttempts())
                .formattedStartTime(chunk.getFormattedStartTime())
                .formattedEndTime(chunk.getFormattedEndTime())
                .build();
    }

    private ChunkResultDto toResultDto(ChunkResult result) {
        return ChunkResultDto.builder()
                .id(result.getId())
                .chunkIndex(result.getChunkIndex())
                .successful(result.isSuccessful())
                .processingTimeMs(result.getProcessingTimeMs())
                .errorMessage(result.getErrorMessage())
                .attempts(result.getAttempts())
                .build();
    }
}
