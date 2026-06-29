package com.transcription.app.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

import java.time.Duration;

@Configuration
public class RestClientConfig {

    @Bean
    public RestClient whisperRestClient(AppProperties properties) {
        return RestClient.builder()
                .baseUrl(properties.getWhisper().getBaseUrl())
                .defaultHeader("Content-Type", "application/json")
                .build();
    }
}
