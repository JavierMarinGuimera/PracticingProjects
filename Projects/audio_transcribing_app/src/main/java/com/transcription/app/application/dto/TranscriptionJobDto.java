package com.transcription.app.application.dto;

import com.transcription.app.domain.model.JobStatus;
import lombok.Builder;
import lombok.Getter;

import java.time.Instant;
import java.util.UUID;

@Getter
@Builder
public class TranscriptionJobDto {

    private final UUID id;
    private final String originalFilename;
    private final long fileSizeBytes;
    private final JobStatus status;
    private final int totalChunks;
    private final int processedChunks;
    private final int failedChunks;
    private final double progressPercent;
    private final String errorMessage;
    private final boolean hasTranscription;
    private final Instant createdAt;
    private final Instant updatedAt;
    private final Instant completedAt;
}
