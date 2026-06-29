package com.transcription.app.web.controller;

import com.transcription.app.application.dto.TranscriptionJobDto;
import com.transcription.app.application.usecase.CreateTranscriptionUseCase;
import com.transcription.app.application.usecase.DeleteTranscriptionUseCase;
import com.transcription.app.application.usecase.GetTranscriptionUseCase;
import com.transcription.app.domain.model.TranscriptionJob;
import com.transcription.app.web.dto.CreateTranscriptionResponse;
import com.transcription.app.web.dto.TranscriptionResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/api/transcriptions")
@RequiredArgsConstructor
@Tag(name = "Transcriptions", description = "Audio transcription management endpoints")
public class TranscriptionController {

    private final CreateTranscriptionUseCase createTranscriptionUseCase;
    private final GetTranscriptionUseCase getTranscriptionUseCase;
    private final DeleteTranscriptionUseCase deleteTranscriptionUseCase;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(
            summary = "Upload MP3 file for transcription",
            description = "Accepts MP3 files of any size. The file is streamed to disk without loading into memory. " +
                    "Processing runs asynchronously using Java 21 Virtual Threads. " +
                    "Use the returned job ID to poll for status and download the transcription."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "202", description = "File accepted, transcription started"),
            @ApiResponse(responseCode = "400", description = "Invalid file format or validation error"),
            @ApiResponse(responseCode = "413", description = "File size exceeds configured limit")
    })
    public ResponseEntity<CreateTranscriptionResponse> createTranscription(
            @Parameter(description = "MP3 audio file to transcribe", required = true)
            @RequestParam("file") MultipartFile file) {

        log.info("Received transcription request for file: {} ({} bytes)",
                file.getOriginalFilename(), file.getSize());

        TranscriptionJob job = createTranscriptionUseCase.execute(file);
        CreateTranscriptionResponse response = toCreateResponse(job);

        return ResponseEntity
                .status(HttpStatus.ACCEPTED)
                .location(buildUri("/{id}", job.getId()))
                .body(response);
    }

    @GetMapping
    @Operation(summary = "List all transcription jobs")
    @ApiResponse(responseCode = "200", description = "List of all jobs")
    public ResponseEntity<List<TranscriptionJobDto>> listTranscriptions() {
        return ResponseEntity.ok(getTranscriptionUseCase.getAllJobs());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get transcription job details including chunk status")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Job details retrieved"),
            @ApiResponse(responseCode = "404", description = "Job not found")
    })
    public ResponseEntity<TranscriptionResponse> getTranscription(
            @Parameter(description = "Job UUID", required = true) @PathVariable UUID id) {

        TranscriptionJobDto job = getTranscriptionUseCase.getJob(id);

        TranscriptionResponse response = TranscriptionResponse.builder()
                .id(job.getId())
                .originalFilename(job.getOriginalFilename())
                .fileSizeBytes(job.getFileSizeBytes())
                .status(job.getStatus())
                .totalChunks(job.getTotalChunks())
                .processedChunks(job.getProcessedChunks())
                .failedChunks(job.getFailedChunks())
                .progressPercent(job.getProgressPercent())
                .errorMessage(job.getErrorMessage())
                .hasTranscription(job.isHasTranscription())
                .chunks(getTranscriptionUseCase.getChunks(id))
                .results(getTranscriptionUseCase.getResults(id))
                .createdAt(job.getCreatedAt())
                .updatedAt(job.getUpdatedAt())
                .completedAt(job.getCompletedAt())
                .links(buildLinks(id))
                .build();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}/status")
    @Operation(summary = "Get current processing status of a transcription job")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Status retrieved"),
            @ApiResponse(responseCode = "404", description = "Job not found")
    })
    public ResponseEntity<TranscriptionJobDto> getStatus(
            @Parameter(description = "Job UUID", required = true) @PathVariable UUID id) {
        return ResponseEntity.ok(getTranscriptionUseCase.getJobStatus(id));
    }

    @GetMapping("/{id}/download")
    @Operation(
            summary = "Download the final transcription as plain text",
            description = "Only available when job status is COMPLETED"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Transcription text returned",
                    content = @Content(mediaType = "text/plain")),
            @ApiResponse(responseCode = "404", description = "Job not found or transcription not yet ready")
    })
    public ResponseEntity<String> downloadTranscription(
            @Parameter(description = "Job UUID", required = true) @PathVariable UUID id) {

        String transcription = getTranscriptionUseCase.downloadTranscription(id);

        TranscriptionJobDto job = getTranscriptionUseCase.getJob(id);
        String filename = job.getOriginalFilename().replaceAll("\\.[^.]+$", "") + "_transcription.txt";

        return ResponseEntity.ok()
                .contentType(MediaType.TEXT_PLAIN)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                .body(transcription);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a transcription job and all its associated files")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Job deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Job not found")
    })
    public ResponseEntity<Void> deleteTranscription(
            @Parameter(description = "Job UUID", required = true) @PathVariable UUID id) {

        deleteTranscriptionUseCase.execute(id);
        return ResponseEntity.noContent().build();
    }

    private CreateTranscriptionResponse toCreateResponse(TranscriptionJob job) {
        return CreateTranscriptionResponse.builder()
                .id(job.getId())
                .originalFilename(job.getOriginalFilename())
                .fileSizeBytes(job.getFileSizeBytes())
                .status(job.getStatus())
                .message("Audio file accepted. Transcription is processing asynchronously. " +
                        "Poll the status endpoint to track progress.")
                .links(CreateTranscriptionResponse.Links.builder()
                        .self(buildUriString("/{id}", job.getId()))
                        .status(buildUriString("/{id}/status", job.getId()))
                        .download(buildUriString("/{id}/download", job.getId()))
                        .build())
                .build();
    }

    private TranscriptionResponse.Links buildLinks(UUID id) {
        return TranscriptionResponse.Links.builder()
                .self(buildUriString("/{id}", id))
                .status(buildUriString("/{id}/status", id))
                .download(buildUriString("/{id}/download", id))
                .build();
    }

    private java.net.URI buildUri(String path, Object... vars) {
        return ServletUriComponentsBuilder.fromCurrentRequestUri()
                .replacePath("/api/transcriptions" + path)
                .buildAndExpand(vars)
                .toUri();
    }

    private String buildUriString(String path, Object... vars) {
        return ServletUriComponentsBuilder.fromCurrentRequestUri()
                .replacePath("/api/transcriptions" + path)
                .buildAndExpand(vars)
                .toUriString();
    }
}
