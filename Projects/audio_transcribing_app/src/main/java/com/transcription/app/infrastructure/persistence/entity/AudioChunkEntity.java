package com.transcription.app.infrastructure.persistence.entity;

import com.transcription.app.domain.model.ChunkStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "audio_chunk", indexes = {
        @Index(name = "idx_audio_chunk_job_id", columnList = "job_id"),
        @Index(name = "idx_audio_chunk_job_index", columnList = "job_id, chunk_index")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AudioChunkEntity {

    @Id
    @Column(columnDefinition = "uuid")
    private UUID id;

    @Column(name = "job_id", nullable = false, columnDefinition = "uuid")
    private UUID jobId;

    @Column(name = "chunk_index", nullable = false)
    private int chunkIndex;

    @Column(name = "file_path", nullable = false, length = 1024)
    private String filePath;

    @Column(name = "start_time_seconds", nullable = false)
    private double startTimeSeconds;

    @Column(name = "end_time_seconds", nullable = false)
    private double endTimeSeconds;

    @Column(name = "duration_seconds", nullable = false)
    private double durationSeconds;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 50)
    private ChunkStatus status;

    @Column(name = "attempts", nullable = false)
    private int attempts;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;
}
