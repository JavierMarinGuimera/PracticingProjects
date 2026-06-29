-- ============================================================
-- Audio Transcription App — Initial Schema
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Job status enum
CREATE TYPE job_status AS ENUM (
    'PENDING',
    'UPLOADED',
    'SPLITTING',
    'PROCESSING',
    'MERGING',
    'COMPLETED',
    'FAILED'
);

-- Chunk status enum
CREATE TYPE chunk_status AS ENUM (
    'PENDING',
    'PROCESSING',
    'COMPLETED',
    'FAILED'
);

-- ============================================================
-- transcription_job — top-level job tracking
-- ============================================================
CREATE TABLE transcription_job (
    id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    original_filename       VARCHAR(512)    NOT NULL,
    file_size_bytes         BIGINT          NOT NULL,
    work_directory          VARCHAR(1024)   NOT NULL,
    status                  VARCHAR(50)     NOT NULL DEFAULT 'PENDING',
    total_chunks            INT             NOT NULL DEFAULT 0,
    processed_chunks        INT             NOT NULL DEFAULT 0,
    failed_chunks           INT             NOT NULL DEFAULT 0,
    error_message           TEXT,
    final_transcription_path VARCHAR(1024),
    created_at              TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at              TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    completed_at            TIMESTAMPTZ
);

CREATE INDEX idx_transcription_job_status ON transcription_job (status);
CREATE INDEX idx_transcription_job_created_at ON transcription_job (created_at DESC);

-- ============================================================
-- audio_chunk — one row per split chunk
-- ============================================================
CREATE TABLE audio_chunk (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id              UUID            NOT NULL REFERENCES transcription_job(id) ON DELETE CASCADE,
    chunk_index         INT             NOT NULL,
    file_path           VARCHAR(1024)   NOT NULL,
    start_time_seconds  DOUBLE PRECISION NOT NULL,
    end_time_seconds    DOUBLE PRECISION NOT NULL,
    duration_seconds    DOUBLE PRECISION NOT NULL,
    status              VARCHAR(50)     NOT NULL DEFAULT 'PENDING',
    attempts            INT             NOT NULL DEFAULT 0,
    created_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW(),

    CONSTRAINT uq_audio_chunk_job_index UNIQUE (job_id, chunk_index)
);

CREATE INDEX idx_audio_chunk_job_id ON audio_chunk (job_id);
CREATE INDEX idx_audio_chunk_status ON audio_chunk (status);

-- ============================================================
-- chunk_result — transcription output per chunk
-- ============================================================
CREATE TABLE chunk_result (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chunk_id            UUID            NOT NULL REFERENCES audio_chunk(id) ON DELETE CASCADE,
    job_id              UUID            NOT NULL REFERENCES transcription_job(id) ON DELETE CASCADE,
    chunk_index         INT             NOT NULL,
    transcription_text  TEXT,
    processing_time_ms  BIGINT          NOT NULL DEFAULT 0,
    error_message       TEXT,
    attempts            INT             NOT NULL DEFAULT 0,
    created_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_chunk_result_chunk_id ON chunk_result (chunk_id);
CREATE INDEX idx_chunk_result_job_id ON chunk_result (job_id);
CREATE INDEX idx_chunk_result_job_index ON chunk_result (job_id, chunk_index);

-- ============================================================
-- processing_status — view for quick status overview
-- ============================================================
CREATE VIEW processing_status AS
SELECT
    j.id                                                    AS job_id,
    j.original_filename,
    j.status                                                AS job_status,
    j.total_chunks,
    j.processed_chunks,
    j.failed_chunks,
    ROUND((j.processed_chunks::NUMERIC / NULLIF(j.total_chunks, 0)) * 100, 2) AS progress_pct,
    COUNT(c.id)                                             AS chunk_count,
    COUNT(c.id) FILTER (WHERE c.status = 'COMPLETED')       AS completed_chunks,
    COUNT(c.id) FILTER (WHERE c.status = 'FAILED')          AS failed_chunk_count,
    COUNT(c.id) FILTER (WHERE c.status = 'PROCESSING')      AS in_progress_chunks,
    AVG(r.processing_time_ms)                               AS avg_chunk_ms,
    j.created_at,
    j.updated_at,
    j.completed_at
FROM transcription_job j
LEFT JOIN audio_chunk c ON c.job_id = j.id
LEFT JOIN chunk_result r ON r.chunk_id = c.id
GROUP BY j.id, j.original_filename, j.status, j.total_chunks,
         j.processed_chunks, j.failed_chunks, j.created_at, j.updated_at, j.completed_at;

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_transcription_job_updated_at
    BEFORE UPDATE ON transcription_job
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_audio_chunk_updated_at
    BEFORE UPDATE ON audio_chunk
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_chunk_result_updated_at
    BEFORE UPDATE ON chunk_result
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
