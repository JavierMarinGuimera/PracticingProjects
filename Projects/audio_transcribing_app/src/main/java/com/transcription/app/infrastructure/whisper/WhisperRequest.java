package com.transcription.app.infrastructure.whisper;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class WhisperRequest {

    @JsonProperty("file_path")
    private final String filePath;

    @JsonProperty("model")
    private final String model;

    @JsonProperty("language")
    private final String language;

    @JsonProperty("task")
    @Builder.Default
    private final String task = "transcribe";
}
