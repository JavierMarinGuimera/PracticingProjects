"""
Faster-Whisper transcription microservice.

Accepts transcription requests from the Java Spring Boot application.
Both services share a Docker volume so file paths can be passed directly
instead of transmitting audio bytes over HTTP.
"""

import os
import time
import logging
from pathlib import Path
from typing import Optional

import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from faster_whisper import WhisperModel

# ─────────────────────────────────────────────────────────────
# Logging
# ─────────────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s - %(message)s",
)
logger = logging.getLogger("whisper-service")

# ─────────────────────────────────────────────────────────────
# Model configuration from environment
# ─────────────────────────────────────────────────────────────
MODEL_NAME = os.environ.get("WHISPER_MODEL", "medium")
DEVICE = os.environ.get("WHISPER_DEVICE", "cpu")
COMPUTE_TYPE = os.environ.get("WHISPER_COMPUTE_TYPE", "int8")
HOST = os.environ.get("HOST", "0.0.0.0")
PORT = int(os.environ.get("PORT", "8000"))

logger.info("Loading Faster-Whisper model: %s (device=%s, compute_type=%s)",
            MODEL_NAME, DEVICE, COMPUTE_TYPE)

start = time.time()
model = WhisperModel(MODEL_NAME, device=DEVICE, compute_type=COMPUTE_TYPE)
logger.info("Model loaded in %.2fs", time.time() - start)

# ─────────────────────────────────────────────────────────────
# FastAPI app
# ─────────────────────────────────────────────────────────────
app = FastAPI(
    title="Faster-Whisper Transcription Service",
    description="Internal microservice for audio transcription using Faster-Whisper",
    version="1.0.0",
)


# ─────────────────────────────────────────────────────────────
# Request / Response models
# ─────────────────────────────────────────────────────────────
class TranscribeRequest(BaseModel):
    file_path: str
    model: Optional[str] = None          # ignored; model is loaded at startup
    language: Optional[str] = None       # None = auto-detect
    task: str = "transcribe"             # "transcribe" | "translate"


class SegmentResponse(BaseModel):
    id: int
    start: float
    end: float
    text: str


class TranscribeResponse(BaseModel):
    text: str
    language: str
    duration: float
    segments: list[SegmentResponse]
    processing_time_seconds: float


# ─────────────────────────────────────────────────────────────
# Endpoints
# ─────────────────────────────────────────────────────────────
@app.get("/health")
def health():
    return {"status": "healthy", "model": MODEL_NAME, "device": DEVICE}


@app.post("/transcribe", response_model=TranscribeResponse)
def transcribe(request: TranscribeRequest):
    file_path = Path(request.file_path)

    if not file_path.exists():
        logger.error("File not found: %s", file_path)
        raise HTTPException(status_code=404, detail=f"Audio file not found: {request.file_path}")

    if not file_path.is_file():
        raise HTTPException(status_code=400, detail=f"Path is not a file: {request.file_path}")

    logger.info("Transcribing: %s (language=%s, task=%s)",
                file_path.name, request.language or "auto", request.task)

    t0 = time.time()

    try:
        segments_gen, info = model.transcribe(
            str(file_path),
            language=request.language or None,
            task=request.task,
            beam_size=5,
            vad_filter=True,           # Voice Activity Detection — skip silence
            vad_parameters={
                "min_silence_duration_ms": 500,
            },
            word_timestamps=False,
        )

        segments = []
        full_text_parts = []

        for segment in segments_gen:
            segments.append(SegmentResponse(
                id=segment.id,
                start=round(segment.start, 3),
                end=round(segment.end, 3),
                text=segment.text.strip(),
            ))
            full_text_parts.append(segment.text.strip())

        full_text = " ".join(full_text_parts)
        elapsed = time.time() - t0

        logger.info("Transcription complete: %s — %d chars, language=%s, %.2fs",
                    file_path.name, len(full_text), info.language, elapsed)

        return TranscribeResponse(
            text=full_text,
            language=info.language,
            duration=round(info.duration, 3),
            segments=segments,
            processing_time_seconds=round(elapsed, 3),
        )

    except Exception as e:
        logger.exception("Transcription failed for %s: %s", file_path.name, str(e))
        raise HTTPException(status_code=500, detail=f"Transcription failed: {str(e)}")


@app.get("/models")
def list_available_models():
    return {
        "available": ["tiny", "tiny.en", "base", "base.en", "small", "small.en",
                       "medium", "medium.en", "large-v1", "large-v2", "large-v3"],
        "current": MODEL_NAME,
    }


# ─────────────────────────────────────────────────────────────
# Entry point
# ─────────────────────────────────────────────────────────────
if __name__ == "__main__":
    uvicorn.run(
        "whisper_server:app",
        host=HOST,
        port=PORT,
        workers=1,          # Single worker — model is not thread-safe across forks
        log_level="info",
        access_log=True,
    )
