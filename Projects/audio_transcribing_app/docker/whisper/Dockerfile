FROM python:3.11-slim

LABEL maintainer="transcription-service"
LABEL description="Faster-Whisper transcription microservice"

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    ffmpeg \
    curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy application
COPY whisper_server.py .

# Create directory for shared transcription files
RUN mkdir -p /app/transcriptions

# Environment defaults (override in docker-compose)
ENV WHISPER_MODEL=medium
ENV WHISPER_DEVICE=cpu
ENV WHISPER_COMPUTE_TYPE=int8
ENV HOST=0.0.0.0
ENV PORT=8000

EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=120s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

CMD ["python", "whisper_server.py"]
