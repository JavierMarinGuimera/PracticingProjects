package com.transcription.app.application.dto;

import com.transcription.app.domain.model.ChunkStatus;
import lombok.Builder;
import lombok.Getter;

import java.util.UUID;

@Getter
@Builder
public class AudioChunkDto {

    private final UUID id;
    private final int chunkIndex;
    private final double startTimeSeconds;
    private final double endTimeSeconds;
    private final double durationSeconds;
    private final ChunkStatus status;
    private final int attempts;
    private final String formattedStartTime;
    private final String formattedEndTime;
}
