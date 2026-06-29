package com.transcription.app.infrastructure.persistence.adapter;

import com.transcription.app.domain.model.ChunkResult;
import com.transcription.app.domain.port.ChunkResultRepository;
import com.transcription.app.infrastructure.persistence.entity.ChunkResultEntity;
import com.transcription.app.infrastructure.persistence.jpa.ChunkResultJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class ChunkResultRepositoryAdapter implements ChunkResultRepository {

    private final ChunkResultJpaRepository jpaRepository;

    @Override
    @Transactional
    public ChunkResult save(ChunkResult result) {
        return toDomain(jpaRepository.save(toEntity(result)));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ChunkResult> findById(UUID id) {
        return jpaRepository.findById(id).map(this::toDomain);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ChunkResult> findByChunkId(UUID chunkId) {
        return jpaRepository.findByChunkId(chunkId).map(this::toDomain);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ChunkResult> findByJobIdOrderByChunkIndex(UUID jobId) {
        return jpaRepository.findByJobIdOrderByChunkIndex(jobId).stream().map(this::toDomain).toList();
    }

    @Override
    @Transactional
    public void deleteByJobId(UUID jobId) {
        jpaRepository.deleteByJobId(jobId);
    }

    private ChunkResultEntity toEntity(ChunkResult result) {
        return ChunkResultEntity.builder()
                .id(result.getId())
                .chunkId(result.getChunkId())
                .jobId(result.getJobId())
                .chunkIndex(result.getChunkIndex())
                .transcriptionText(result.getTranscriptionText())
                .processingTimeMs(result.getProcessingTimeMs())
                .errorMessage(result.getErrorMessage())
                .attempts(result.getAttempts())
                .createdAt(result.getCreatedAt())
                .updatedAt(result.getUpdatedAt())
                .build();
    }

    private ChunkResult toDomain(ChunkResultEntity entity) {
        return ChunkResult.builder()
                .id(entity.getId())
                .chunkId(entity.getChunkId())
                .jobId(entity.getJobId())
                .chunkIndex(entity.getChunkIndex())
                .transcriptionText(entity.getTranscriptionText())
                .processingTimeMs(entity.getProcessingTimeMs())
                .errorMessage(entity.getErrorMessage())
                .attempts(entity.getAttempts())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
}
