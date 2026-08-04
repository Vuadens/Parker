'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'

// ---------------------------------------------------------------------------
// Helpers — extract YouTube video ID and build thumbnail URL
// ---------------------------------------------------------------------------
function extractYouTubeId(url: string): string | null {
  try {
    const u = new URL(url)
    // youtube.com/watch?v=ID  or  youtu.be/ID  or  youtube.com/shorts/ID
    if (u.hostname.includes('youtube.com')) {
      return u.searchParams.get('v') ?? u.pathname.split('/').pop() ?? null
    }
    if (u.hostname === 'youtu.be') {
      return u.pathname.replace('/', '')
    }
  } catch {
    // not a valid URL
  }
  return null
}

// YouTube exposes public thumbnails without auth — perfect for a demo.
// maxresdefault → hqdefault as fallback (some older videos lack maxres).
function youtubeThumbnail(id: string) {
  return {
    hq: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
    maxres: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
  }
}

// ---------------------------------------------------------------------------
// Fake metadata for generic (non-YouTube) URLs
// ---------------------------------------------------------------------------
const SAMPLE_TITLES = [
  'Building a three-tier app from a Python script',
  'How REST APIs isolate specialized workers',
  'yt-dlp deep dive — resolving formats',
  'Designing a MySQL schema for request logs',
  'A calm 4K city walk at golden hour',
]

function fakeMeta(url: string) {
  const seed = Array.from(url).reduce((a, c) => a + c.charCodeAt(0), 0)
  const title = SAMPLE_TITLES[seed % SAMPLE_TITLES.length]
  const duration = 3 + (seed % 9)
  return { title, meta: `resolved · ${duration}m clip · 6 formats available` }
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type Format = {
  id: string
  spec: string
  size: string
  kind: 'video' | 'audio'
}

type ResolvedResult = {
  title: string
  meta: string
  thumbnailUrl: string | null
  ytId: string | null
  video: Format[]
  audio: Format[]
}

function buildResult(url: string): ResolvedResult {
  const ytId = extractYouTubeId(url)
  const { title, meta } = ytId
    ? { title: 'Resolving title from YouTube…', meta: `yt-dlp · real video ID detected · 6 formats` }
    : fakeMeta(url)

  return {
    title,
    meta,
    thumbnailUrl: ytId ? youtubeThumbnail(ytId).hq : null,
    ytId,
    video: [
      { id: 'v1', spec: 'MP4 · 3840×2160 (4K)', size: '318 MB', kind: 'video' },
      { id: 'v2', spec: 'MP4 · 1920×1080 (FHD)', size: '142 MB', kind: 'video' },
      { id: 'v3', spec: 'WEBM · 1280×720 (HD)', size: '64 MB', kind: 'video' },
      { id: 'v4', spec: 'MP4 · 854×480', size: '38 MB', kind: 'video' },
    ],
    audio: [
      { id: 'a1', spec: 'MP3 · 320 kbps', size: '9.1 MB', kind: 'audio' },
      { id: 'a2', spec: 'M4A · 128 kbps', size: '3.7 MB', kind: 'audio' },
    ],
  }
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------
function FormatRow({
  item,
  selected,
  onSelect,
}: {
  item: Format
  selected: boolean
  onSelect: (id: string) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(item.id)}
      className={`mb-1.5 flex w-full items-center gap-3 rounded-md border px-3 py-2.5 text-left transition-all ${
        selected ? 'border-navy bg-blue-soft' : 'border-line hover:border-blue'
      }`}
    >
      <span
        className={`h-3.5 w-3.5 flex-shrink-0 rounded-full border-[1.5px] ${
          selected ? 'border-navy bg-navy' : 'border-line-strong'
        }`}
        aria-hidden="true"
      />
      <span className={`flex-1 font-mono text-xs ${selected ? 'text-navy' : 'text-muted-tone'}`}>
        {item.spec}
      </span>
      <span className="font-mono text-[11px] text-muted-tone">{item.size}</span>
    </button>
  )
}

// Thumbnail that gracefully falls back if the image 404s (e.g. private video)
function Thumbnail({ url, alt }: { url: string; alt: string }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div className="flex h-[140px] w-full items-center justify-center rounded-lg bg-off-white font-mono text-[11px] text-muted-tone">
        Thumbnail unavailable
      </div>
    )
  }
  return (
    <div className="relative mb-4 h-[140px] w-full overflow-hidden rounded-lg bg-off-white">
      <Image
        src={url}
        alt={alt}
        fill
        className="object-cover"
        onError={() => setFailed(true)}
        unoptimized
      />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export function Downloader() {
  const [url, setUrl] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready'>('idle')
  const [result, setResult] = useState<ResolvedResult | null>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!url.trim()) return
    setStatus('loading')
    setResult(null)
    setSelected(null)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setResult(buildResult(url))
      setStatus('ready')
    }, 1300)
  }

  return (
    <div className="rounded-[14px] bg-white p-[26px] shadow-[0_24px_60px_rgba(10,20,40,.25)]">
      {/* demo banner */}
      <div className="mb-4 flex items-center gap-2 rounded-md bg-off-white px-3 py-2 font-mono text-[10.5px] uppercase tracking-[0.06em] text-muted-tone">
        <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue" aria-hidden="true" />
        Demo mode — no files are downloaded
      </div>

      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
        <label htmlFor="parker-url" className="sr-only">
          Media URL
        </label>
        <input
          id="parker-url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://youtube.com/watch?v=..."
          className="h-[46px] flex-1 rounded-lg border border-line bg-off-white px-3.5 font-mono text-[12.5px] text-navy outline-none focus:border-blue"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="rounded-lg bg-ink px-5 text-[13.5px] font-semibold text-white transition-colors hover:bg-navy disabled:cursor-not-allowed disabled:opacity-55"
        >
          {status === 'loading' ? 'Resolving…' : 'Search'}
        </button>
      </form>

      {status === 'ready' && result && (
        <div>
          {/* Thumbnail — only shown for YouTube links */}
          {result.thumbnailUrl && (
            <Thumbnail url={result.thumbnailUrl} alt={`Thumbnail for ${result.title}`} />
          )}

          <p className="text-[14.5px] font-semibold text-navy">{result.title}</p>
          <p className="mb-4 font-mono text-[11px] text-muted-tone">{result.meta}</p>

          <p className="mb-2 font-mono text-[10.5px] font-semibold tracking-[0.08em] text-navy">
            VIDEO
          </p>
          {result.video.map((v) => (
            <FormatRow key={v.id} item={v} selected={selected === v.id} onSelect={setSelected} />
          ))}

          <p className="mb-2 mt-3 font-mono text-[10.5px] font-semibold tracking-[0.08em] text-navy">
            AUDIO
          </p>
          {result.audio.map((a) => (
            <FormatRow key={a.id} item={a} selected={selected === a.id} onSelect={setSelected} />
          ))}

          {/* No download button — this is a demo only */}
          <div className="mt-4 flex items-center gap-2 rounded-md border border-line bg-off-white px-3 py-2.5 font-mono text-[10.5px] text-muted-tone">
            <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-muted-tone" aria-hidden="true" />
            Download disabled in demo — the real Parker CLI handles this via yt-dlp
          </div>
        </div>
      )}

      {status === 'loading' && (
        <div className="flex flex-col gap-2 py-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-11 w-full animate-pulse rounded-md bg-off-white" />
          ))}
        </div>
      )}

      {status === 'idle' && (
        <p className="py-4 text-center font-mono text-[11.5px] text-muted-tone">
          Paste a YouTube link above — the real thumbnail will appear here.
        </p>
      )}
    </div>
  )
}
