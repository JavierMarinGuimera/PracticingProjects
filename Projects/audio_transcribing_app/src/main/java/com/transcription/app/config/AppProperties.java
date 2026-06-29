package com.transcription.app.config;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import java.time.Duration;

@Getter
@Setter
@Validated
@ConfigurationProperties(prefix = "app")
public class AppProperties {

    @NotNull
    private Upload upload = new Upload();

    @NotNull
    private Processing processing = new Processing();

    @NotNull
    private Ffmpeg ffmpeg = new Ffmpeg();

    @NotNull
    private Whisper whisper = new Whisper();

    @NotNull
    private Storage storage = new Storage();

    @Getter
    @Setter
    public static class Upload {
        private long maxFileSizeBytes = 10L * 1024 * 1024 * 1024; // 10 GB
        private String allowedContentType = "audio/mpeg";
    }

    @Getter
    @Setter
    public static class Processing {
        @Min(1)
        private int maxRetries = 3;
        private Duration retryDelay = Duration.ofSeconds(5);
        private Duration chunkTimeout = Duration.ofMinutes(30);
        @Min(1)
        private int maxConcurrentJobs = 5;
    }

    @Getter
    @Setter
    public static class Ffmpeg {
        @NotBlank
        private String executablePath = "ffmpeg";
        @NotBlank
        private String ffprobePath = "ffprobe";
        @Min(60)
        private int chunkDurationSeconds = 600; // 10 minutes
    }

    @Getter
    @Setter
    public static class Whisper {
        @NotBlank
        private String baseUrl = "http://whisper-service:8000";
        private String model = "medium";
        private String language = null; // null = auto-detect
        private Duration requestTimeout = Duration.ofMinutes(20);
    }

    @Getter
    @Setter
    public static class Storage {
        @NotBlank
        private String workDirectory = "/tmp/transcriptions";
        private boolean cleanupOnCompletion = false;
        private Duration retentionPeriod = Duration.ofDays(7);
        private String inputDirectory = "";
        private String outputDirectory = "";
    }
}
