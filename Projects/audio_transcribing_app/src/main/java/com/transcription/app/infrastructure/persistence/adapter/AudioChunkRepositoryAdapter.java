package com.transcription.app.infrastructure.persistence.adapter;

import com.transcription.app.domain.model.AudioChunk;
import com.transcription.app.domain.model.ChunkStatus;
import com.transcription.app.domain.port.AudioChunkRepository;
import com.transcription.app.infrastructure.persistence.entity.AudioChunkEntity;
import com.transcription.app.infrastructure.persistence.jpa.AudioChunkJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class AudioChunkRepositoryAdapter implements AudioChunkRepository {

    private final AudioChunkJpaRepository jpaRepository;

    @Override
    @Transactional
    public AudioChunk save(AudioChunk chunk) {
        return toDomain(jpaRepository.save(toEntity(chunk)));
    }

    @Override
    @Transactional
    public List<AudioChunk> saveAll(List<AudioChunk> chunks) {
        return jpaRepository.saveAll(chunks.stream().map(this::toEntity).toList())
                .stream().map(this::toDomain).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<AudioChunk> findById(UUID id) {
        return jpaRepository.findById(id).map(this::toDomain);
    }

    @Override
    @Transactional(readOnly = true)
    public List<AudioChunk> findByJobId(UUID jobId) {
        return jpaRepository.findByJobIdOrderByChunkIndex(jobId).stream().map(this::toDomain).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<AudioChunk> findByJobIdOrderByChunkIndex(UUID jobId) {
        return jpaRepository.findByJobIdOrderByChunkIndex(jobId).stream().map(this::toDomain).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<AudioChunk> findByJobIdAndStatus(UUID jobId, ChunkStatus status) {
        return jpaRepository.findByJobIdAndStatus(jobId, status).stream().map(this::toDomain).toList();
    }

    @Override
    @Transactional
    public void deleteByJobId(UUID jobId) {
        jpaRepository.deleteByJobId(jobId);
    }

    @Override
    @Transactional
    public AudioChunk updateStatus(UUID id, ChunkStatus status) {
        jpaRepository.updateStatus(id, status, Instant.now());
        return findById(id).orElseThrow();
    }

    @Override
    @Transactional
    public AudioChunk incrementAttempts(UUID id) {
        jpaRepository.incrementAttempts(id, Instant.now());
        return findById(id).orElseThrow();
    }

    private AudioChunkEntity toEntity(AudioChunk chunk) {
        return AudioChunkEntity.builder()
                .id(chunk.getId())
                .jobId(chunk.getJobId())
                .chunkIndex(chunk.getChunkIndex())
                .filePath(chunk.getFilePath())
                .startTimeSeconds(chunk.getStartTimeSeconds())
                .endTimeSeconds(chunk.getEndTimeSeconds())
                .durationSeconds(chunk.getDurationSeconds())
                .status(chunk.getStatus())
                .attempts(chunk.getAttempts())
                .createdAt(chunk.getCreatedAt())
                .updatedAt(chunk.getUpdatedAt())
                .build();
    }

    private AudioChunk toDomain(AudioChunkEntity entity) {
        return AudioChunk.builder()
                .id(entity.getId())
                .jobId(entity.getJobId())
                .chunkIndex(entity.getChunkIndex())
                .filePath(entity.getFilePath())
                .startTimeSeconds(entity.getStartTimeSeconds())
                .endTimeSeconds(entity.getEndTimeSeconds())
                .durationSeconds(entity.getDurationSeconds())
                .status(entity.getStatus())
                .attempts(entity.getAttempts())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
}
