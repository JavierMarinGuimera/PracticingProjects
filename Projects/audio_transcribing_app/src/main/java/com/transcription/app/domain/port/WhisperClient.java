package com.transcription.app.domain.port;

import java.nio.file.Path;

public interface WhisperClient {

    /**
     * Transcribes an audio file using Faster-Whisper.
     *
     * @param audioFilePath absolute path to the audio file (must be accessible by the Whisper service)
     * @param model         Whisper model name (tiny/base/small/medium/large-v3)
     * @param language      ISO language code or null for auto-detection
     * @return transcribed text
     */
    String transcribe(Path audioFilePath, String model, String language);
}
