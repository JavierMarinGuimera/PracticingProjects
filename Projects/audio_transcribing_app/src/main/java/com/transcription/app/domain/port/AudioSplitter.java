package com.transcription.app.domain.port;

import com.transcription.app.domain.model.AudioChunk;

import java.nio.file.Path;
import java.util.List;
import java.util.UUID;

public interface AudioSplitter {

    /**
     * Splits an audio file into fixed-duration chunks.
     *
     * @param inputFile   path to the source MP3 file
     * @param outputDir   directory where chunks will be written
     * @param jobId       parent job identifier
     * @param chunkSeconds duration of each chunk in seconds
     * @return ordered list of AudioChunk metadata (index, paths, timestamps)
     */
    List<AudioChunk> split(Path inputFile, Path outputDir, UUID jobId, int chunkSeconds);

    /**
     * Returns the total duration of an audio file in seconds.
     */
    double getDurationSeconds(Path audioFile);
}
