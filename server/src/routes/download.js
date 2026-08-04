import { Router } from "express";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { downloadFormat } from "../pythonBridge.js";
import { logDownloadStart, logDownloadFinish } from "../db.js";

const router = Router();
const TMP_DIR = process.env.TMP_DIR || "./tmp";
const MAX_FILE_SIZE_MB = Number(process.env.MAX_FILE_SIZE_MB || 250);

fs.mkdirSync(TMP_DIR, { recursive: true });

// POST /api/download  { requestId, url, formatId, kind, formatLabel }
router.post("/download", async (req, res) => {
  const { requestId, url, formatId, kind, formatLabel } = req.body || {};

  if (!url || !formatId || !requestId) {
    return res.status(400).json({ error: "Missing requestId, url, or formatId." });
  }

  const downloadId = await logDownloadStart({ requestId, formatId, kind, formatLabel });
  const jobDir = path.join(TMP_DIR, crypto.randomUUID());
  fs.mkdirSync(jobDir);

  try {
    const { filePath, fileSizeMb } = await downloadFormat(url, formatId, jobDir);

    if (fileSizeMb > MAX_FILE_SIZE_MB) {
      throw new Error(`File exceeds ${MAX_FILE_SIZE_MB}MB demo limit`);
    }

    res.download(filePath, path.basename(filePath), async (err) => {
      // Clean up regardless of whether the stream succeeded
      fs.rm(jobDir, { recursive: true, force: true }, () => {});
      await logDownloadFinish(downloadId, {
        status: err ? "failed" : "completed",
        fileSizeMb,
      });
    });
  } catch (err) {
    fs.rm(jobDir, { recursive: true, force: true }, () => {});
    await logDownloadFinish(downloadId, { status: "failed" });
    res.status(422).json({ error: "Download failed: " + String(err.message).slice(0, 300) });
  }
});

export default router;
