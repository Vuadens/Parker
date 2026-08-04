-- Parker · MySQL schema
-- Minimal but real: logs every resolve/download request so we can
-- demonstrate schema design + queries without inventing user accounts
-- we don't need yet. Easy to extend with a `users` table later.

CREATE DATABASE IF NOT EXISTS parker;
USE parker;

CREATE TABLE IF NOT EXISTS requests (
  id            BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  source_url    VARCHAR(2048)   NOT NULL,
  video_title   VARCHAR(512)    NULL,
  platform      VARCHAR(64)     NULL,          -- e.g. youtube, vimeo (from yt-dlp's extractor field)
  status        ENUM('resolved', 'failed')     NOT NULL,
  error_message VARCHAR(512)    NULL,
  ip_hash       CHAR(64)        NULL,           -- sha256 of requester IP, never store raw IP
  created_at    TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS downloads (
  id            BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  request_id    BIGINT UNSIGNED NOT NULL,
  format_id     VARCHAR(32)     NOT NULL,       -- yt-dlp format code, e.g. "137+140"
  kind          ENUM('video', 'audio')          NOT NULL,
  format_label  VARCHAR(64)     NULL,           -- e.g. "MP4 · 1920x1080"
  file_size_mb  DECIMAL(8,2)    NULL,
  status        ENUM('started', 'completed', 'failed') NOT NULL DEFAULT 'started',
  created_at    TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  completed_at  TIMESTAMP       NULL,
  FOREIGN KEY (request_id) REFERENCES requests(id) ON DELETE CASCADE
);

CREATE INDEX idx_requests_created_at ON requests(created_at);
CREATE INDEX idx_downloads_kind ON downloads(kind);

-- Example analytics query this schema supports (used by GET /api/stats):
--
-- SELECT kind, format_label, COUNT(*) AS total
-- FROM downloads
-- WHERE status = 'completed'
-- GROUP BY kind, format_label
-- ORDER BY total DESC
-- LIMIT 10;
