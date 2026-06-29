package com.transcription.app.infrastructure.persistence.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "chunk_result", indexes = {
        @Index(name = "idx_chunk_result_job_id", columnList = "job_id"),
        @Index(name = "idx_chunk_result_chunk_id", columnList = "chunk_id")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChunkResultEntity {

    @Id
    @Column(columnDefinition = "uuid")
    private UUID id;

    @Column(name = "chunk_id", nullable = false, columnDefinition = "uuid")
    private UUID chunkId;

    @Column(name = "job_id", nullable = false, columnDefinition = "uuid")
    private UUID jobId;

    @Column(name = "chunk_index", nullable = false)
    private int chunkIndex;

    @Column(name = "transcription_text", columnDefinition = "text")
    private String transcriptionText;

    @Column(name = "processing_time_ms")
    private long processingTimeMs;

    @Column(name = "error_message", columnDefinition = "text")
    private String errorMessage;

    @Column(name = "attempts", nullable = false)
    private int attempts;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;
}
