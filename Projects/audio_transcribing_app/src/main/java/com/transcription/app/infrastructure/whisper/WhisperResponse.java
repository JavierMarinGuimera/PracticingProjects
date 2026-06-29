package com.transcription.app.infrastructure.whisper;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class WhisperResponse {

    @JsonProperty("text")
    private String text;

    @JsonProperty("language")
    private String language;

    @JsonProperty("duration")
    private double duration;

    @JsonProperty("segments")
    private List<Segment> segments;

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Segment {
        @JsonProperty("id")
        private int id;

        @JsonProperty("start")
        private double start;

        @JsonProperty("end")
        private double end;

        @JsonProperty("text")
        private String text;
    }
}
