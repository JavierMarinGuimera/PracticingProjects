package com.transcription.app.infrastructure.persistence.jpa;

import com.transcription.app.domain.model.JobStatus;
import com.transcription.app.infrastructure.persistence.entity.TranscriptionJobEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Repository
public interface TranscriptionJobJpaRepository extends JpaRepository<TranscriptionJobEntity, UUID> {

    List<TranscriptionJobEntity> findByStatus(JobStatus status);

    @Modifying
    @Query("UPDATE TranscriptionJobEntity j SET j.status = :status, j.updatedAt = :now WHERE j.id = :id")
    int updateStatus(@Param("id") UUID id, @Param("status") JobStatus status, @Param("now") Instant now);

    @Modifying
    @Query("UPDATE TranscriptionJobEntity j SET j.status = :status, j.errorMessage = :errorMessage, j.updatedAt = :now WHERE j.id = :id")
    int updateStatusWithError(@Param("id") UUID id, @Param("status") JobStatus status,
                              @Param("errorMessage") String errorMessage, @Param("now") Instant now);

    @Modifying
    @Query("UPDATE TranscriptionJobEntity j SET j.processedChunks = j.processedChunks + 1, j.updatedAt = :now WHERE j.id = :id")
    int incrementProcessedChunks(@Param("id") UUID id, @Param("now") Instant now);

    @Modifying
    @Query("UPDATE TranscriptionJobEntity j SET j.failedChunks = j.failedChunks + 1, j.updatedAt = :now WHERE j.id = :id")
    int incrementFailedChunks(@Param("id") UUID id, @Param("now") Instant now);
}
