package com.transcription.app.infrastructure.persistence.jpa;

import com.transcription.app.infrastructure.persistence.entity.ChunkResultEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ChunkResultJpaRepository extends JpaRepository<ChunkResultEntity, UUID> {

    Optional<ChunkResultEntity> findByChunkId(UUID chunkId);

    List<ChunkResultEntity> findByJobIdOrderByChunkIndex(UUID jobId);

    void deleteByJobId(UUID jobId);
}
