import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import "dotenv/config";

import resolveRoute from "./routes/resolve.js";
import downloadRoute from "./routes/download.js";
import { getStats } from "./db.js";

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "*" }));
app.use(express.json());

// Public demo safeguard: 10 requests/minute per IP across resolve+download.
// Loosen or remove this for local/dev use.
const limiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", limiter);

app.use("/api", resolveRoute);
app.use("/api", downloadRoute);

app.get("/api/stats", async (_req, res) => {
  res.json(await getStats());
});

app.get("/api/health", (_req, res) => res.json({ ok: true }));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Parker API listening on :${port}`));
