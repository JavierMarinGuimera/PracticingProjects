package com.transcription.app.infrastructure.persistence.adapter;

import com.transcription.app.domain.model.JobStatus;
import com.transcription.app.domain.model.TranscriptionJob;
import com.transcription.app.domain.port.TranscriptionJobRepository;
import com.transcription.app.infrastructure.persistence.entity.TranscriptionJobEntity;
import com.transcription.app.infrastructure.persistence.jpa.TranscriptionJobJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class TranscriptionJobRepositoryAdapter implements TranscriptionJobRepository {

    private final TranscriptionJobJpaRepository jpaRepository;

    @Override
    @Transactional
    public TranscriptionJob save(TranscriptionJob job) {
        TranscriptionJobEntity entity = toEntity(job);
        return toDomain(jpaRepository.save(entity));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<TranscriptionJob> findById(UUID id) {
        return jpaRepository.findById(id).map(this::toDomain);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TranscriptionJob> findAll() {
        return jpaRepository.findAll().stream().map(this::toDomain).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<TranscriptionJob> findByStatus(JobStatus status) {
        return jpaRepository.findByStatus(status).stream().map(this::toDomain).toList();
    }

    @Override
    @Transactional
    public void deleteById(UUID id) {
        jpaRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean existsById(UUID id) {
        return jpaRepository.existsById(id);
    }

    @Override
    @Transactional
    public TranscriptionJob updateStatus(UUID id, JobStatus status) {
        jpaRepository.updateStatus(id, status, Instant.now());
        return findById(id).orElseThrow();
    }

    @Override
    @Transactional
    public TranscriptionJob updateStatus(UUID id, JobStatus status, String errorMessage) {
        jpaRepository.updateStatusWithError(id, status, errorMessage, Instant.now());
        return findById(id).orElseThrow();
    }

    @Override
    @Transactional
    public TranscriptionJob incrementProcessedChunks(UUID id) {
        jpaRepository.incrementProcessedChunks(id, Instant.now());
        return findById(id).orElseThrow();
    }

    @Override
    @Transactional
    public TranscriptionJob incrementFailedChunks(UUID id) {
        jpaRepository.incrementFailedChunks(id, Instant.now());
        return findById(id).orElseThrow();
    }

    private TranscriptionJobEntity toEntity(TranscriptionJob job) {
        return TranscriptionJobEntity.builder()
                .id(job.getId())
                .originalFilename(job.getOriginalFilename())
                .fileSizeBytes(job.getFileSizeBytes())
                .workDirectory(job.getWorkDirectory())
                .status(job.getStatus())
                .totalChunks(job.getTotalChunks())
                .processedChunks(job.getProcessedChunks())
                .failedChunks(job.getFailedChunks())
                .errorMessage(job.getErrorMessage())
                .finalTranscriptionPath(job.getFinalTranscriptionPath())
                .createdAt(job.getCreatedAt())
                .updatedAt(job.getUpdatedAt())
                .completedAt(job.getCompletedAt())
                .build();
    }

    private TranscriptionJob toDomain(TranscriptionJobEntity entity) {
        return TranscriptionJob.builder()
                .id(entity.getId())
                .originalFilename(entity.getOriginalFilename())
                .fileSizeBytes(entity.getFileSizeBytes())
                .workDirectory(entity.getWorkDirectory())
                .status(entity.getStatus())
                .totalChunks(entity.getTotalChunks())
                .processedChunks(entity.getProcessedChunks())
                .failedChunks(entity.getFailedChunks())
                .errorMessage(entity.getErrorMessage())
                .finalTranscriptionPath(entity.getFinalTranscriptionPath())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .completedAt(entity.getCompletedAt())
                .build();
    }
}
