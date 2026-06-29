package com.transcription.app.web.controller;

import com.transcription.app.application.dto.TranscriptionJobDto;
import com.transcription.app.application.usecase.CreateTranscriptionUseCase;
import com.transcription.app.application.usecase.DeleteTranscriptionUseCase;
import com.transcription.app.application.usecase.GetTranscriptionUseCase;
import com.transcription.app.domain.model.JobStatus;
import com.transcription.app.domain.model.TranscriptionJob;
import com.transcription.app.web.exception.JobNotFoundException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(TranscriptionController.class)
@DisplayName("TranscriptionController")
class TranscriptionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean private CreateTranscriptionUseCase createTranscriptionUseCase;
    @MockBean private GetTranscriptionUseCase getTranscriptionUseCase;
    @MockBean private DeleteTranscriptionUseCase deleteTranscriptionUseCase;

    @Test
    @DisplayName("POST /api/transcriptions — returns 202 with job ID for valid MP3")
    void createTranscription_validFile_returns202() throws Exception {
        UUID jobId = UUID.randomUUID();
        TranscriptionJob job = buildJob(jobId);

        when(createTranscriptionUseCase.execute(any())).thenReturn(job);

        MockMultipartFile file = new MockMultipartFile(
                "file", "test.mp3", "audio/mpeg", new byte[1024]);

        mockMvc.perform(multipart("/api/transcriptions").file(file))
                .andExpect(status().isAccepted())
                .andExpect(jsonPath("$.id").value(jobId.toString()))
                .andExpect(jsonPath("$.status").value("UPLOADED"))
                .andExpect(jsonPath("$.links.self").exists())
                .andExpect(jsonPath("$.links.status").exists())
                .andExpect(jsonPath("$.links.download").exists());
    }

    @Test
    @DisplayName("GET /api/transcriptions — returns list of all jobs")
    void listTranscriptions_returnsAllJobs() throws Exception {
        UUID jobId = UUID.randomUUID();
        TranscriptionJobDto dto = buildJobDto(jobId, JobStatus.PROCESSING);

        when(getTranscriptionUseCase.getAllJobs()).thenReturn(List.of(dto));

        mockMvc.perform(get("/api/transcriptions"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(jobId.toString()))
                .andExpect(jsonPath("$[0].status").value("PROCESSING"));
    }

    @Test
    @DisplayName("GET /api/transcriptions/{id}/status — returns 404 for unknown job")
    void getStatus_unknownId_returns404() throws Exception {
        UUID unknownId = UUID.randomUUID();

        when(getTranscriptionUseCase.getJobStatus(unknownId))
                .thenThrow(new JobNotFoundException("Transcription job not found: " + unknownId));

        mockMvc.perform(get("/api/transcriptions/{id}/status", unknownId))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status").value(404))
                .andExpect(jsonPath("$.error").value("Not Found"));
    }

    @Test
    @DisplayName("GET /api/transcriptions/{id}/download — returns transcription text")
    void downloadTranscription_completedJob_returnsText() throws Exception {
        UUID jobId = UUID.randomUUID();
        TranscriptionJobDto dto = buildJobDto(jobId, JobStatus.COMPLETED);

        when(getTranscriptionUseCase.downloadTranscription(jobId)).thenReturn("Hello World transcription.");
        when(getTranscriptionUseCase.getJob(jobId)).thenReturn(dto);

        mockMvc.perform(get("/api/transcriptions/{id}/download", jobId))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.TEXT_PLAIN))
                .andExpect(content().string("Hello World transcription."));
    }

    @Test
    @DisplayName("DELETE /api/transcriptions/{id} — returns 204")
    void deleteTranscription_existingJob_returns204() throws Exception {
        UUID jobId = UUID.randomUUID();
        doNothing().when(deleteTranscriptionUseCase).execute(jobId);

        mockMvc.perform(delete("/api/transcriptions/{id}", jobId))
                .andExpect(status().isNoContent());

        verify(deleteTranscriptionUseCase).execute(jobId);
    }

    // ─── Helpers ──────────────────────────────────────────────

    private TranscriptionJob buildJob(UUID id) {
        return TranscriptionJob.builder()
                .id(id)
                .originalFilename("test.mp3")
                .fileSizeBytes(1024L)
                .workDirectory("/tmp/" + id)
                .status(JobStatus.UPLOADED)
                .totalChunks(0)
                .processedChunks(0)
                .failedChunks(0)
                .createdAt(Instant.now())
                .updatedAt(Instant.now())
                .build();
    }

    private TranscriptionJobDto buildJobDto(UUID id, JobStatus status) {
        return TranscriptionJobDto.builder()
                .id(id)
                .originalFilename("test.mp3")
                .fileSizeBytes(1024L)
                .status(status)
                .totalChunks(3)
                .processedChunks(status == JobStatus.COMPLETED ? 3 : 1)
                .failedChunks(0)
                .progressPercent(status == JobStatus.COMPLETED ? 100.0 : 33.3)
                .hasTranscription(status == JobStatus.COMPLETED)
                .createdAt(Instant.now())
                .updatedAt(Instant.now())
                .build();
    }
}
