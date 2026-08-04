import mysql from "mysql2/promise";
import "dotenv/config";

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

export async function logRequest({ sourceUrl, videoTitle, platform, status, errorMessage, ipHash }) {
  const [result] = await pool.query(
    `INSERT INTO requests (source_url, video_title, platform, status, error_message, ip_hash)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [sourceUrl, videoTitle ?? null, platform ?? null, status, errorMessage ?? null, ipHash ?? null]
  );
  return result.insertId;
}

export async function logDownloadStart({ requestId, formatId, kind, formatLabel }) {
  const [result] = await pool.query(
    `INSERT INTO downloads (request_id, format_id, kind, format_label, status)
     VALUES (?, ?, ?, ?, 'started')`,
    [requestId, formatId, kind, formatLabel ?? null]
  );
  return result.insertId;
}

export async function logDownloadFinish(downloadId, { status, fileSizeMb }) {
  await pool.query(
    `UPDATE downloads SET status = ?, file_size_mb = ?, completed_at = NOW() WHERE id = ?`,
    [status, fileSizeMb ?? null, downloadId]
  );
}

export async function getStats() {
  const [rows] = await pool.query(
    `SELECT kind, format_label, COUNT(*) AS total
     FROM downloads
     WHERE status = 'completed'
     GROUP BY kind, format_label
     ORDER BY total DESC
     LIMIT 10`
  );
  return rows;
}
