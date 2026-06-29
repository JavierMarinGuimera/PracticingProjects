package com.transcription.app.domain.model;

import lombok.Builder;
import lombok.Getter;
import lombok.With;

import java.time.Instant;
import java.util.UUID;

@Getter
@Builder
@With
public class AudioChunk {

    private final UUID id;
    private final UUID jobId;
    private final int chunkIndex;
    private final String filePath;
    private final double startTimeSeconds;
    private final double endTimeSeconds;
    private final double durationSeconds;
    private final ChunkStatus status;
    private final int attempts;
    private final Instant createdAt;
    private final Instant updatedAt;

    public String getFormattedStartTime() {
        return formatTime((long) startTimeSeconds);
    }

    public String getFormattedEndTime() {
        return formatTime((long) endTimeSeconds);
    }

    private String formatTime(long totalSeconds) {
        long hours = totalSeconds / 3600;
        long minutes = (totalSeconds % 3600) / 60;
        long seconds = totalSeconds % 60;
        return String.format("%02d:%02d:%02d", hours, minutes, seconds);
    }
}
