package com.transcription.app.domain.port;

import com.transcription.app.domain.model.JobStatus;
import com.transcription.app.domain.model.TranscriptionJob;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TranscriptionJobRepository {

    TranscriptionJob save(TranscriptionJob job);

    Optional<TranscriptionJob> findById(UUID id);

    List<TranscriptionJob> findAll();

    List<TranscriptionJob> findByStatus(JobStatus status);

    void deleteById(UUID id);

    boolean existsById(UUID id);

    TranscriptionJob updateStatus(UUID id, JobStatus status);

    TranscriptionJob updateStatus(UUID id, JobStatus status, String errorMessage);

    TranscriptionJob incrementProcessedChunks(UUID id);

    TranscriptionJob incrementFailedChunks(UUID id);
}
