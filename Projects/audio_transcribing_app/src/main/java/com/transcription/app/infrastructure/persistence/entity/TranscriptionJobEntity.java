package com.transcription.app.infrastructure.persistence.entity;

import com.transcription.app.domain.model.JobStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "transcription_job")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TranscriptionJobEntity {

    @Id
    @Column(columnDefinition = "uuid")
    private UUID id;

    @Column(name = "original_filename", nullable = false, length = 512)
    private String originalFilename;

    @Column(name = "file_size_bytes", nullable = false)
    private long fileSizeBytes;

    @Column(name = "work_directory", nullable = false, length = 1024)
    private String workDirectory;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 50)
    private JobStatus status;

    @Column(name = "total_chunks", nullable = false)
    private int totalChunks;

    @Column(name = "processed_chunks", nullable = false)
    private int processedChunks;

    @Column(name = "failed_chunks", nullable = false)
    private int failedChunks;

    @Column(name = "error_message", columnDefinition = "text")
    private String errorMessage;

    @Column(name = "final_transcription_path", length = 1024)
    private String finalTranscriptionPath;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    @Column(name = "completed_at")
    private Instant completedAt;
}
