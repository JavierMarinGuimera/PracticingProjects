package com.transcription.app.web.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.transcription.app.application.dto.AudioChunkDto;
import com.transcription.app.application.dto.ChunkResultDto;
import com.transcription.app.domain.model.JobStatus;
import lombok.Builder;
import lombok.Getter;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Getter
@Builder
public class TranscriptionResponse {

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
    private final List<AudioChunkDto> chunks;
    private final List<ChunkResultDto> results;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", timezone = "UTC")
    private final Instant createdAt;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", timezone = "UTC")
    private final Instant updatedAt;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", timezone = "UTC")
    private final Instant completedAt;

    private final Links links;

    @Getter
    @Builder
    public static class Links {
        private final String self;
        private final String status;
        private final String download;
    }
}
