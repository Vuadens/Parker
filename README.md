# Parker

A full-stack media downloader — paste a link, get exactly the format you need.
Started as a personal Python script; rebuilt as a real three-tier app to
practice designing a REST API, integrating a specialized backend service,
and modeling a MySQL schema around it.

## Architecture

```
┌─────────────┐      REST/JSON      ┌──────────────────┐     spawn(argv)     ┌─────────────────┐
│   React     │ ──────────────────▶ │   Node / Express  │ ──────────────────▶ │  Python worker   │
│   (client)  │ ◀────────────────── │   REST API        │ ◀────────────────── │  (yt-dlp)        │
└─────────────┘      files/JSON     └─────────┬─────────┘     JSON on stdout  └─────────────────┘
                                                │
                                                ▼
                                          ┌───────────┐
                                          │  MySQL    │
                                          │  (logs)   │
                                          └───────────┘
```

- **Client (React)** — paste a URL, browse resolved video/audio formats, download.
- **API (Node/Express)** — validates input, rate-limits requests, calls the Python
  worker via `child_process.spawn` with an argv array (never a shell string, so
  the URL can never be used for shell injection), and logs every request to MySQL.
- **Worker (Python + yt-dlp)** — the original script, now split into two small,
  single-purpose CLI tools (`resolve.py`, `download.py`) that talk to the API
  over stdin/stdout as JSON.
- **MySQL** — logs every resolve/download attempt (URL, title, platform, chosen
  format, status, timestamps). Supports a small `/api/stats` endpoint showing
  the most-downloaded formats — a real query over real data, not a mock.

## Why this shape

This was deliberately built as a small **API gateway + specialized worker**
pattern rather than one monolith, because it mirrors how these systems tend to
look in the real world: a general-purpose web API in one language, and a
narrow, dependency-heavy task (media extraction) isolated in the language best
suited to it. It's also just true to how the project actually evolved — the
Python script came first.

## Running it locally

**1. Database**
```bash
mysql -u root -p < server/src/db/schema.sql
```

**2. Worker**
```bash
cd worker
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
```

**3. API**
```bash
cd server
cp .env.example .env   # fill in your DB credentials
npm install
npm run dev
```

**4. Client**
The `client/` files are plain React components (`App.jsx`, `AboutPage.jsx`).
Drop them into a Vite + React project (`npm create vite@latest -- --template react`),
add a `.env` with `VITE_API_BASE=http://localhost:4000/api`, and run `npm run dev`.

## Safety notes for a public deploy

- `MAX_DURATION_SECONDS` and `MAX_FILE_SIZE_MB` in `.env` cap what the public
  demo will process — keeps hosting bandwidth/storage predictable.
- Every request is rate-limited (10/min/IP) at the API layer.
- Downloaded files are written to a per-request temp folder and deleted
  immediately after being streamed to the client — nothing is retained server-side.
- IPs are hashed (SHA-256) before being logged, never stored raw.
- Intended for personal/educational use with content you have the right to
  download; respect the terms of service of whatever platform a URL comes from.

## Stack

React · Node.js / Express · Python (yt-dlp) · MySQL · REST API design

## Author

Joaquín Maza — Systems Requirements Analyst (UTN, finishing 3rd year of
Systems Engineering).
