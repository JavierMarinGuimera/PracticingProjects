package com.transcription.app.domain.model;

import lombok.Builder;
import lombok.Getter;
import lombok.With;

import java.time.Instant;
import java.util.UUID;

@Getter
@Builder
@With
public class TranscriptionJob {

    private final UUID id;
    private final String originalFilename;
    private final long fileSizeBytes;
    private final String workDirectory;
    private final JobStatus status;
    private final int totalChunks;
    private final int processedChunks;
    private final int failedChunks;
    private final String errorMessage;
    private final String finalTranscriptionPath;
    private final Instant createdAt;
    private final Instant updatedAt;
    private final Instant completedAt;

    public double getProgressPercent() {
        if (totalChunks == 0) return 0.0;
        return (double) processedChunks / totalChunks * 100.0;
    }

    public boolean isCompleted() {
        return status == JobStatus.COMPLETED;
    }

    public boolean isFailed() {
        return status == JobStatus.FAILED;
    }
}
