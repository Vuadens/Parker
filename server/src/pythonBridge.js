import { spawn } from "node:child_process";
import "dotenv/config";

const PYTHON_BIN = process.env.PYTHON_BIN || "python3";
const WORKER_TIMEOUT_MS = 30_000;

/**
 * Runs a worker script with argv-array args (never a shell string), so a
 * malicious URL can never break out into a shell command. Expects the
 * script to print a single JSON object to stdout.
 */
function runWorker(scriptPath, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(PYTHON_BIN, [scriptPath, ...args], {
      timeout: WORKER_TIMEOUT_MS,
    });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (chunk) => (stdout += chunk));
    child.stderr.on("data", (chunk) => (stderr += chunk));

    child.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(stderr.trim() || `Worker exited with code ${code}`));
        return;
      }
      try {
        resolve(JSON.parse(stdout));
      } catch (err) {
        reject(new Error("Worker returned invalid JSON: " + stdout.slice(0, 300)));
      }
    });

    child.on("error", reject);
  });
}

export function resolveUrl(url) {
  return runWorker("../worker/resolve.py", [url]);
}

export function downloadFormat(url, formatId, outDir) {
  return runWorker("../worker/download.py", [url, formatId, outDir]);
}
