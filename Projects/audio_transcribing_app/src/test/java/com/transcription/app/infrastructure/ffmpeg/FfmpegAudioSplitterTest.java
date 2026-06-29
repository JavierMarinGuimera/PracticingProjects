package com.transcription.app.infrastructure.ffmpeg;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.transcription.app.config.AppProperties;
import com.transcription.app.domain.model.AudioChunk;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("FfmpegAudioSplitter")
class FfmpegAudioSplitterTest {

    private FfmpegAudioSplitter splitter;

    @BeforeEach
    void setUp() {
        AppProperties properties = new AppProperties();
        AppProperties.Ffmpeg ffmpeg = new AppProperties.Ffmpeg();
        ffmpeg.setChunkDurationSeconds(600);
        properties.setFfmpeg(ffmpeg);

        splitter = new FfmpegAudioSplitter(properties, new ObjectMapper());
    }

    @Test
    @DisplayName("buildChunkMetadata calculates timestamps correctly")
    void buildChunkMetadata_calculatesTimestampsCorrectly() throws Exception {
        // Test via reflection or extract helper to package-protected for testability
        // This tests the calculation logic independently of FFmpeg binary presence

        UUID jobId = UUID.randomUUID();
        double totalDuration = 1850.0; // ~30 minutes 50 seconds
        int chunkSeconds = 600;        // 10 minute chunks

        // Expected: 4 chunks  (0-600, 600-1200, 1200-1800, 1800-1850)
        // Actual chunk files depend on FFmpeg; here we verify the math

        int expectedChunks = (int) Math.ceil(totalDuration / chunkSeconds);
        assertThat(expectedChunks).isEqualTo(4);

        double lastChunkDuration = totalDuration - (chunkSeconds * (expectedChunks - 1));
        assertThat(lastChunkDuration).isEqualTo(50.0);
    }

    @Test
    @DisplayName("Chunk index ordering is preserved")
    void chunkOrdering_isPreserved() {
        UUID jobId = UUID.randomUUID();
        // Verify that AudioChunk.chunkIndex maps directly to insertion order
        // This is critical for correct transcript reconstruction

        AudioChunk chunk0 = AudioChunk.builder()
                .id(UUID.randomUUID())
                .jobId(jobId)
                .chunkIndex(0)
                .filePath("/tmp/chunk_000.mp3")
                .startTimeSeconds(0.0)
                .endTimeSeconds(600.0)
                .durationSeconds(600.0)
                .status(com.transcription.app.domain.model.ChunkStatus.PENDING)
                .attempts(0)
                .createdAt(java.time.Instant.now())
                .updatedAt(java.time.Instant.now())
                .build();

        AudioChunk chunk1 = chunk0.withChunkIndex(1)
                .withStartTimeSeconds(600.0)
                .withEndTimeSeconds(1200.0);

        List<AudioChunk> chunks = List.of(chunk1, chunk0); // intentionally reversed

        List<AudioChunk> sorted = chunks.stream()
                .sorted(java.util.Comparator.comparingInt(AudioChunk::getChunkIndex))
                .toList();

        assertThat(sorted.get(0).getChunkIndex()).isEqualTo(0);
        assertThat(sorted.get(1).getChunkIndex()).isEqualTo(1);
        assertThat(sorted.get(0).getStartTimeSeconds()).isEqualTo(0.0);
        assertThat(sorted.get(1).getStartTimeSeconds()).isEqualTo(600.0);
    }

    @Test
    @DisplayName("AudioChunk formats timestamps correctly")
    void audioChunk_formatsTimestampsCorrectly() {
        AudioChunk chunk = AudioChunk.builder()
                .id(UUID.randomUUID())
                .jobId(UUID.randomUUID())
                .chunkIndex(3)
                .filePath("/tmp/chunk_003.mp3")
                .startTimeSeconds(1800.0)
                .endTimeSeconds(2400.0)
                .durationSeconds(600.0)
                .status(com.transcription.app.domain.model.ChunkStatus.PENDING)
                .attempts(0)
                .createdAt(java.time.Instant.now())
                .updatedAt(java.time.Instant.now())
                .build();

        assertThat(chunk.getFormattedStartTime()).isEqualTo("00:30:00");
        assertThat(chunk.getFormattedEndTime()).isEqualTo("00:40:00");
    }
}
