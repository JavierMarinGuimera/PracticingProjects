package com.transcription.app.domain.port;

import com.transcription.app.domain.model.ChunkResult;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ChunkResultRepository {

    ChunkResult save(ChunkResult result);

    Optional<ChunkResult> findById(UUID id);

    Optional<ChunkResult> findByChunkId(UUID chunkId);

    List<ChunkResult> findByJobIdOrderByChunkIndex(UUID jobId);

    void deleteByJobId(UUID jobId);
}
