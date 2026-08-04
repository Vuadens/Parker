import { Router } from "express";
import crypto from "node:crypto";
import { resolveUrl } from "../pythonBridge.js";
import { logRequest } from "../db.js";

const router = Router();
const MAX_DURATION = Number(process.env.MAX_DURATION_SECONDS || 1200);

function isLikelyUrl(value) {
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

// POST /api/resolve  { url }
router.post("/resolve", async (req, res) => {
  const { url } = req.body || {};
  const ipHash = crypto.createHash("sha256").update(req.ip || "").digest("hex");

  if (!url || !isLikelyUrl(url)) {
    return res.status(400).json({ error: "Provide a valid http(s) URL." });
  }

  try {
    const info = await resolveUrl(url);

    if (info.duration && info.duration > MAX_DURATION) {
      await logRequest({
        sourceUrl: url,
        videoTitle: info.title,
        platform: info.extractor,
        status: "failed",
        errorMessage: "Duration exceeds demo limit",
        ipHash,
      });
      return res.status(422).json({
        error: `This demo only handles videos under ${Math.round(MAX_DURATION / 60)} minutes.`,
      });
    }

    const requestId = await logRequest({
      sourceUrl: url,
      videoTitle: info.title,
      platform: info.extractor,
      status: "resolved",
      ipHash,
    });

    res.json({ requestId, title: info.title, video: info.video, audio: info.audio });
  } catch (err) {
    await logRequest({
      sourceUrl: url,
      status: "failed",
      errorMessage: String(err.message).slice(0, 500),
      ipHash,
    });
    res.status(422).json({ error: "Couldn't read that link. It may be private, region-locked, or unsupported." });
  }
});

export default router;
