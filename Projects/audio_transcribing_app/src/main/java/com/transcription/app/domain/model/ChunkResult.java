package com.transcription.app.domain.model;

import lombok.Builder;
import lombok.Getter;
import lombok.With;

import java.time.Instant;
import java.util.UUID;

@Getter
@Builder
@With
public class ChunkResult {

    private final UUID id;
    private final UUID chunkId;
    private final UUID jobId;
    private final int chunkIndex;
    private final String transcriptionText;
    private final long processingTimeMs;
    private final String errorMessage;
    private final int attempts;
    private final Instant createdAt;
    private final Instant updatedAt;

    public boolean isSuccessful() {
        return transcriptionText != null && !transcriptionText.isBlank();
    }
}
