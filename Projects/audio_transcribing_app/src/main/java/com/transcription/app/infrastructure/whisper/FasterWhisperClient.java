package com.transcription.app.infrastructure.whisper;

import com.transcription.app.config.AppProperties;
import com.transcription.app.domain.port.WhisperClient;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

import java.nio.file.Path;

@Slf4j
@Component
@RequiredArgsConstructor
public class FasterWhisperClient implements WhisperClient {

    private final RestClient whisperRestClient;
    private final AppProperties properties;

    @Override
    public String transcribe(Path audioFilePath, String model, String language) {
        log.debug("[Whisper] Transcribing: {} with model={}", audioFilePath.getFileName(), model);

        WhisperRequest request = WhisperRequest.builder()
                .filePath(audioFilePath.toAbsolutePath().toString())
                .model(model)
                .language(language)
                .build();

        try {
            WhisperResponse response = whisperRestClient.post()
                    .uri("/transcribe")
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(request)
                    .retrieve()
                    .body(WhisperResponse.class);

            if (response == null || response.getText() == null) {
                throw new RuntimeException("Whisper service returned null response for: " + audioFilePath);
            }

            log.debug("[Whisper] Transcription complete for {} — {} chars, language={}",
                    audioFilePath.getFileName(), response.getText().length(), response.getLanguage());

            return response.getText().strip();

        } catch (RestClientException e) {
            log.error("[Whisper] HTTP error transcribing {}: {}", audioFilePath.getFileName(), e.getMessage());
            throw new RuntimeException("Whisper service request failed: " + e.getMessage(), e);
        }
    }
}
