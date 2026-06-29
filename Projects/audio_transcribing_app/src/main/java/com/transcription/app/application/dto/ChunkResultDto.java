package com.transcription.app.application.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.UUID;

@Getter
@Builder
public class ChunkResultDto {

    private final UUID id;
    private final int chunkIndex;
    private final boolean successful;
    private final long processingTimeMs;
    private final String errorMessage;
    private final int attempts;
}
