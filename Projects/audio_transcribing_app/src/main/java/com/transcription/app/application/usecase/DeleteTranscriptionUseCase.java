package com.transcription.app.application.usecase;

import com.transcription.app.domain.model.JobStatus;
import com.transcription.app.domain.model.TranscriptionJob;
import com.transcription.app.domain.port.AudioChunkRepository;
import com.transcription.app.domain.port.ChunkResultRepository;
import com.transcription.app.domain.port.TranscriptionJobRepository;
import com.transcription.app.web.exception.JobNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.*;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class DeleteTranscriptionUseCase {

    private final TranscriptionJobRepository jobRepository;
    private final AudioChunkRepository chunkRepository;
    private final ChunkResultRepository resultRepository;

    public void execute(UUID id) {
        TranscriptionJob job = jobRepository.findById(id)
                .orElseThrow(() -> new JobNotFoundException("Transcription job not found: " + id));

        if (job.getStatus().isActive()) {
            log.warn("[Job {}] Deleting job that is still active (status: {})", id, job.getStatus());
        }

        resultRepository.deleteByJobId(id);
        chunkRepository.deleteByJobId(id);
        jobRepository.deleteById(id);

        deleteWorkDirectory(job.getWorkDirectory(), id);

        log.info("[Job {}] Deleted successfully", id);
    }

    private void deleteWorkDirectory(String workDirectoryPath, UUID jobId) {
        if (workDirectoryPath == null) return;

        Path workDir = Path.of(workDirectoryPath);
        if (!Files.exists(workDir)) return;

        try {
            Files.walkFileTree(workDir, new SimpleFileVisitor<>() {
                @Override
                public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
                    Files.delete(file);
                    return FileVisitResult.CONTINUE;
                }

                @Override
                public FileVisitResult postVisitDirectory(Path dir, IOException exc) throws IOException {
                    Files.delete(dir);
                    return FileVisitResult.CONTINUE;
                }
            });
            log.info("[Job {}] Work directory deleted: {}", jobId, workDir);
        } catch (IOException e) {
            log.warn("[Job {}] Failed to delete work directory {}: {}", jobId, workDir, e.getMessage());
        }
    }
}
