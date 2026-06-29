package com.transcription.app.infrastructure.persistence.jpa;

import com.transcription.app.domain.model.ChunkStatus;
import com.transcription.app.infrastructure.persistence.entity.AudioChunkEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Repository
public interface AudioChunkJpaRepository extends JpaRepository<AudioChunkEntity, UUID> {

    List<AudioChunkEntity> findByJobIdOrderByChunkIndex(UUID jobId);

    List<AudioChunkEntity> findByJobIdAndStatus(UUID jobId, ChunkStatus status);

    void deleteByJobId(UUID jobId);

    @Modifying
    @Query("UPDATE AudioChunkEntity c SET c.status = :status, c.updatedAt = :now WHERE c.id = :id")
    int updateStatus(@Param("id") UUID id, @Param("status") ChunkStatus status, @Param("now") Instant now);

    @Modifying
    @Query("UPDATE AudioChunkEntity c SET c.attempts = c.attempts + 1, c.updatedAt = :now WHERE c.id = :id")
    int incrementAttempts(@Param("id") UUID id, @Param("now") Instant now);
}
