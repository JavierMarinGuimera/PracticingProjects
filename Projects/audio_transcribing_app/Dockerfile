# ─────────────────────────────────────────────────────────────
# Stage 1: Build
# ─────────────────────────────────────────────────────────────
FROM eclipse-temurin:21-jdk-alpine AS builder

WORKDIR /build

# Cache Maven dependencies first
COPY pom.xml .
RUN --mount=type=cache,target=/root/.m2 \
    apk add --no-cache maven && \
    mvn dependency:go-offline -q

# Build application
COPY src ./src
RUN --mount=type=cache,target=/root/.m2 \
    mvn package -DskipTests -q

# ─────────────────────────────────────────────────────────────
# Stage 2: Runtime
# ─────────────────────────────────────────────────────────────
FROM eclipse-temurin:21-jre-alpine

LABEL maintainer="transcription-service"
LABEL description="Audio Transcription Service — Java 21 + Spring Boot + Virtual Threads"

# Install FFmpeg
RUN apk add --no-cache ffmpeg curl

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copy artifact from builder
COPY --from=builder /build/target/audio-transcribing-app-*.jar app.jar

# Create transcription work directory
RUN mkdir -p /app/transcriptions && chown -R appuser:appgroup /app

USER appuser

# JVM tuning for Virtual Threads and containers
ENV JAVA_OPTS="\
    -XX:+UseZGC \
    -XX:+ZGenerational \
    -XX:MaxRAMPercentage=75.0 \
    -XX:+HeapDumpOnOutOfMemoryError \
    -XX:HeapDumpPath=/app/heapdump.hprof \
    -Djava.security.egd=file:/dev/./urandom \
    -Dspring.profiles.active=docker"

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:8080/actuator/health || exit 1

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar /app/app.jar"]
