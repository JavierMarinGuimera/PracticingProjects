package com.transcription.app.domain.model;

public enum JobStatus {
    PENDING,
    UPLOADED,
    SPLITTING,
    PROCESSING,
    MERGING,
    COMPLETED,
    FAILED;

    public boolean isTerminal() {
        return this == COMPLETED || this == FAILED;
    }

    public boolean isActive() {
        return this == SPLITTING || this == PROCESSING || this == MERGING;
    }
}
