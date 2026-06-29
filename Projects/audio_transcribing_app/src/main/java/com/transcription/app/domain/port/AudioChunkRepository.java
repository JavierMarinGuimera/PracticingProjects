package com.transcription.app.domain.port;

import com.transcription.app.domain.model.AudioChunk;
import com.transcription.app.domain.model.ChunkStatus;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AudioChunkRepository {

    AudioChunk save(AudioChunk chunk);

    List<AudioChunk> saveAll(List<AudioChunk> chunks);

    Optional<AudioChunk> findById(UUID id);

    List<AudioChunk> findByJobId(UUID jobId);

    List<AudioChunk> findByJobIdOrderByChunkIndex(UUID jobId);

    List<AudioChunk> findByJobIdAndStatus(UUID jobId, ChunkStatus status);

    void deleteByJobId(UUID jobId);

    AudioChunk updateStatus(UUID id, ChunkStatus status);

    AudioChunk incrementAttempts(UUID id);
}
