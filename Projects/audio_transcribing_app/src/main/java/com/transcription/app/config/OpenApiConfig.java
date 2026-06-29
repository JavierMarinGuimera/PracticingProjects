package com.transcription.app.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Audio Transcription API")
                        .version("1.0.0")
                        .description("Production-ready audio transcription service using Faster-Whisper and Java 21 Virtual Threads. " +
                                "Supports MP3 files of any size with parallel processing.")
                        .contact(new Contact()
                                .name("Transcription Service")
                                .email("admin@transcription.local"))
                        .license(new License()
                                .name("MIT")
                                .url("https://opensource.org/licenses/MIT")))
                .servers(List.of(
                        new Server().url("http://localhost:8080").description("Local Development"),
                        new Server().url("https://api.transcription.prod").description("Production")
                ));
    }
}
