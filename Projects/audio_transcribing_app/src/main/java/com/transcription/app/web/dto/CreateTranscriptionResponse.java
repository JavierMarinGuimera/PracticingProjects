package com.transcription.app.web.dto;

import com.transcription.app.domain.model.JobStatus;
import lombok.Builder;
import lombok.Getter;

import java.util.UUID;

@Getter
@Builder
public class CreateTranscriptionResponse {

    private final UUID id;
    private final String originalFilename;
    private final long fileSizeBytes;
    private final JobStatus status;
    private final String message;
    private final Links links;

    @Getter
    @Builder
    public static class Links {
        private final String self;
        private final String status;
        private final String download;
    }
}
