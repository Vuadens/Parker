import React, { useEffect, useRef, useState } from "react";

// ---------------------------------------------------------------------------
// Parker tokens
// ---------------------------------------------------------------------------
const tokens = {
  black: "#000000",
  navy: "#1E3D59",
  navySoft: "#28496b",
  white: "#FFFFFF",
  offWhite: "#E8EBEF",
  blueSoft: "#DEEEFE",
  blue: "#48749E",
  bluePale: "#C6EBF7",
  muted: "#7C97AC",
  line: "rgba(30,61,89,.14)",
  lineStrong: "rgba(30,61,89,.28)",
};

const API_BASE = import.meta.env?.VITE_API_BASE || "http://localhost:4000/api";

async function resolveVideoUrl(url) {
  const res = await fetch(`${API_BASE}/resolve`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Couldn't resolve that link.");
  return data;
}

async function downloadFormat({ requestId, url, format, kind }) {
  const res = await fetch(`${API_BASE}/download`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      requestId,
      url,
      formatId: format.id,
      kind,
      formatLabel:
        kind === "video" ? `${format.format} ${format.width}x${format.height}` : `${format.format} ${format.bitrate}kbps`,
    }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Download failed.");
  }
  const blob = await res.blob();
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  const disposition = res.headers.get("Content-Disposition") || "";
  const match = disposition.match(/filename="?([^"]+)"?/);
  link.download = match ? match[1] : "download";
  link.click();
  URL.revokeObjectURL(link.href);
}

function ParkerIcon({ size = 26, color = tokens.navy }) {
  return (
    <svg width={size} height={size * (670.71881 / 1091.8276)} viewBox="0 0 1091.8276 670.71881" xmlns="http://www.w3.org/2000/svg">
      <g transform="matrix(0.1,0,0,-0.1,-1054,1499.7873)" fill={color}>
        <path d="m 19430,14986 c -179,-32 -353,-93 -507,-176 l -73,-39 -43,28 c -54,37 -154,71 -209,71 -105,0 -223,-55 -298,-137 -102,-112 -127,-287 -60,-425 27,-55 26,-64 -13,-112 -47,-59 -221,-303 -304,-426 -178,-266 -360,-564 -611,-1000 -435,-756 -583,-973 -813,-1196 -130,-125 -252,-207 -392,-263 -64,-26 -92,-25 -193,8 -709,230 -1532,739 -1878,1161 l -29,35 -126,-1 c -133,0 -185,-11 -283,-60 -59,-30 -164,-117 -173,-143 -11,-36 60,-170 164,-310 137,-184 479,-499 704,-649 67,-45 86,-70 45,-58 -13,4 -43,11 -68,16 -536,111 -1060,362 -1491,716 -127,104 -331,304 -449,439 -396,456 -703,1035 -895,1690 -46,159 -76,273 -95,368 -13,66 -25,73 -33,20 -69,-446 -82,-601 -74,-848 17,-506 131,-972 345,-1410 315,-643 841,-1165 1511,-1500 107,-54 242,-113 316,-139 14,-5 16,-9 7,-15 -21,-13 -305,33 -567,91 -481,106 -895,275 -1152,470 l -78,59 -67,-5 c -151,-13 -372,-110 -540,-236 -57,-43 -153,-129 -213,-191 -110,-114 -255,-294 -255,-318 0,-6 33,-45 73,-85 55,-55 94,-83 151,-111 76,-36 80,-37 169,-33 l 92,4 93,-78 c 462,-391 1135,-748 1722,-916 384,-109 691,-152 1097,-152 313,0 549,24 790,82 51,12 95,19 98,16 6,-6 -89,-100 -161,-160 -72,-60 -177,-134 -252,-178 -141,-83 -187,-150 -187,-275 0,-68 4,-89 28,-137 35,-72 110,-140 185,-168 52,-20 71,-22 222,-17 127,3 184,9 245,26 511,139 999,430 1511,902 597,550 1087,1174 1468,1869 58,105 221,432 260,520 16,36 51,115 78,175 28,61 61,137 75,170 14,33 54,118 90,189 202,396 417,661 688,844 139,94 311,162 508,202 147,30 446,31 642,1 355,-53 526,-46 733,30 236,86 407,289 478,565 15,62 24,119 22,154 l -3,54 -256,216 c -590,495 -678,565 -794,623 -111,55 -268,110 -400,138 -127,28 -457,36 -575,15 z m 625,-527 c 56,-15 128,-92 143,-150 21,-85 -12,-172 -87,-224 -38,-27 -51,-30 -116,-30 -65,0 -78,3 -116,30 -111,78 -125,226 -31,318 61,60 127,78 207,56 z m -556,-2946 c -99,-250 -324,-602 -562,-879 -299,-347 -702,-634 -1085,-772 l -103,-37 -90,-173 c -138,-269 -194,-367 -287,-505 -143,-211 -142,-210 -149,-265 -8,-69 16,-131 68,-175 148,-127 439,-43 767,221 244,196 560,544 775,853 281,404 507,908 622,1382 48,199 85,407 72,407 -2,0 -15,-26 -28,-57 z" />
      </g>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Reveal-on-scroll hook — mirrors the IntersectionObserver pattern
// ---------------------------------------------------------------------------
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ as: Tag = "div", className = "", children, ...rest }) {
  const [ref, visible] = useReveal();
  return (
    <Tag ref={ref} className={`pk-reveal ${visible ? "pk-in" : ""} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

function Eyebrow({ children, dark = false }) {
  return <span className={`pk-eyebrow ${dark ? "pk-eyebrow-dark" : ""}`}>{children}</span>;
}

// ---------------------------------------------------------------------------
// Format rows (the real, working tool)
// ---------------------------------------------------------------------------
function LevelBars({ seed }) {
  const heights = [3, 1, 2].map((n) => ((seed * n * 37) % 12) + 6);
  return (
    <div style={{ display: "flex", gap: 2, alignItems: "flex-end", height: 16, flexShrink: 0 }}>
      {heights.map((h, i) => (
        <div key={i} style={{ width: 3, height: h, background: tokens.lineStrong, borderRadius: 1 }} />
      ))}
    </div>
  );
}

function FormatRow({ item, kind, selected, onSelect }) {
  const spec = kind === "video" ? `${item.format} · ${item.width}×${item.height}` : `${item.format} · ${item.bitrate}kbps`;
  return (
    <button onClick={() => onSelect(item.id)} className={`pk-format-row ${selected ? "pk-selected" : ""}`}>
      <LevelBars seed={item.id.charCodeAt(1) || 1} />
      <span className="pk-format-spec">{spec}</span>
      <span className="pk-format-size">{item.size}</span>
      <span className="pk-format-dot" />
    </button>
  );
}

const NAV = [
  { label: "Downloader", href: "#tool" },
  { label: "How it built", href: "#architecture" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
];

const CAPABILITIES = [
  {
    tags: ["MP4", "WEBM", "1080P", "4K"],
    title: "Every video format",
    body: "Resolves every quality tier the source publishes, from compact 480p to full 1080p — you choose the trade-off between size and quality.",
  },
  {
    tags: ["MP3", "AAC", "320KBPS"],
    title: "Audio, extracted clean",
    body: "Pull just the audio track at your preferred bitrate — no need to download the full video to get the sound.",
  },
  {
    tags: ["NO ACCOUNT", "NO LOGIN"],
    title: "Nothing to sign up for",
    body: "Paste a link, get a file. No account, no email capture, no session to manage — the way a utility should work.",
  },
];

const ARCHITECTURE = [
  {
    tag: "API",
    title: "A real <em>REST</em> layer",
    body: "Node/Express validates every request, rate-limits by IP, and exposes a clean JSON contract the React client consumes.",
    items: ["POST /api/resolve", "POST /api/download", "GET /api/stats"],
  },
  {
    tag: "WORKER",
    title: "Isolated <em>extraction</em> logic",
    body: "A Python service (yt-dlp) does the actual media work, called via argv — never a shell string, so a malicious URL can't inject commands.",
    items: ["resolve.py", "download.py", "Timeout-bounded"],
  },
  {
    tag: "DATA",
    title: "MySQL, doing a real job",
    body: "Every resolve and download is logged — URL, platform, format, status — enough for a genuine schema and a stats query, not a demo table.",
    items: ["requests", "downloads", "GROUP BY stats"],
  },
];

const PROCESS = [
  { title: "Paste the link", body: "Any public video URL." },
  { title: "We resolve it", body: "The worker lists every available format." },
  { title: "Pick one", body: "Video quality or audio bitrate — your call." },
  { title: "Get the file", body: "Streamed straight to your device." },
];

const WHY = [
  {
    title: "Argv, never a shell string",
    body: "URLs are passed to the worker as array arguments, so there's no path for shell injection regardless of what a user pastes.",
  },
  {
    title: "Rate-limited by design",
    body: "10 requests per minute per IP at the API layer, keeping a public demo's bandwidth and cost predictable.",
  },
  {
    title: "Nothing retained",
    body: "Downloaded files live in a per-request temp folder and are deleted the moment they're streamed to the client.",
  },
  {
    title: "IPs hashed, not stored",
    body: "Request logs keep a SHA-256 hash of the requester's IP — enough for basic abuse detection, never the raw address.",
  },
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [requestId, setRequestId] = useState(null);
  const [selected, setSelected] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function toUiFormat(f, kind) {
    return {
      id: f.id,
      format: (f.ext || "").toUpperCase(),
      width: f.width,
      height: f.height,
      bitrate: f.abr,
      size: f.size_mb ? `${f.size_mb} MB` : "—",
      kind,
    };
  }

  async function handleSearch(e) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    setResult(null);
    setSelected(null);
    setDownloaded(false);
    try {
      const data = await resolveVideoUrl(url);
      setRequestId(data.requestId);
      setResult({
        title: data.title,
        video: data.video.map((f) => toUiFormat(f, "video")),
        audio: data.audio.map((f) => toUiFormat(f, "audio")),
      });
      setStatus("ready");
    } catch (err) {
      setError(err.message || "Couldn't read that link.");
      setStatus("error");
    }
  }

  async function handleDownload() {
    if (!selected || !result) return;
    const format = result.video.find((f) => f.id === selected) || result.audio.find((f) => f.id === selected);
    if (!format) return;
    setDownloading(true);
    try {
      await downloadFormat({ requestId, url, format, kind: format.kind });
      setDownloaded(true);
    } catch (err) {
      setError(err.message || "Download failed.");
      setStatus("error");
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="pk-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Hedvig+Letters+Serif&family=Rethink+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        .pk-root{ background:${tokens.white}; color:${tokens.navy}; font-family:'Rethink Sans',sans-serif; font-size:16px; line-height:1.5; overflow-x:hidden; }
        .pk-root *{ box-sizing:border-box; }
        .pk-root a{ color:inherit; text-decoration:none; }
        .pk-container{ max-width:1160px; margin:0 auto; padding:0 32px; }

        .pk-eyebrow{ font-family:'JetBrains Mono',monospace; font-size:11px; letter-spacing:.18em; text-transform:uppercase; color:${tokens.muted}; display:inline-flex; align-items:center; gap:10px; }
        .pk-eyebrow::before{ content:""; width:24px; height:1px; background:${tokens.navy}; }
        .pk-eyebrow-dark{ color:rgba(255,255,255,.6); }
        .pk-eyebrow-dark::before{ background:${tokens.white}; }

        .pk-nav{ position:fixed; top:0; left:0; right:0; z-index:100; padding:14px 32px; background:rgba(255,255,255,.85); backdrop-filter:blur(12px); border-bottom:1px solid transparent; transition:border-color .3s ease; }
        .pk-nav.pk-scrolled{ border-bottom-color:${tokens.line}; }
        .pk-nav-inner{ max-width:1160px; margin:0 auto; display:flex; align-items:center; justify-content:space-between; }
        .pk-logo{ font-family:'Hedvig Letters Serif',serif; font-size:21px; display:flex; align-items:center; gap:9px; }
        .pk-nav-links{ display:flex; gap:34px; font-size:14px; font-weight:500; }
        .pk-nav-links a{ transition:color .2s; }
        .pk-nav-links a:hover{ color:${tokens.blue}; }
        .pk-nav-cta{ font-size:13px; font-weight:600; padding:10px 18px; background:${tokens.black}; color:${tokens.white}; border-radius:999px; transition:background .2s; }
        .pk-nav-cta:hover{ background:${tokens.navy}; }

        .pk-hero{ padding:150px 0 100px; background:linear-gradient(160deg, ${tokens.navy} 0%, ${tokens.blue} 55%, ${tokens.bluePale} 100%); }
        .pk-hero-grid{ display:grid; grid-template-columns:1.1fr 1fr; gap:64px; align-items:center; }
        .pk-hero h1{ font-family:'Hedvig Letters Serif',serif; font-weight:400; font-size:clamp(38px,5.4vw,64px); line-height:1.04; letter-spacing:-.01em; margin:20px 0 22px; color:${tokens.white}; text-shadow:0 2px 16px rgba(0,0,0,.35); }
        .pk-hero h1 em{ font-style:italic; color:${tokens.bluePale}; }
        .pk-hero-sub{ font-size:17px; line-height:1.6; color:rgba(255,255,255,.88); max-width:460px; margin-bottom:8px; }

        .pk-tool-card{ background:${tokens.white}; border-radius:14px; padding:26px; box-shadow:0 24px 60px rgba(10,20,40,.25); }
        .pk-tool-input-row{ display:flex; gap:8px; margin-bottom:16px; }
        .pk-input{ flex:1; background:${tokens.offWhite}; border:1px solid ${tokens.line}; border-radius:8px; padding:0 14px; height:46px; font-family:'JetBrains Mono',monospace; font-size:12.5px; color:${tokens.navy}; outline:none; }
        .pk-btn-black{ background:${tokens.black}; color:${tokens.white}; border:none; border-radius:8px; padding:0 20px; font-weight:600; font-size:13.5px; cursor:pointer; transition:background .2s; }
        .pk-btn-black:hover{ background:${tokens.navy}; }
        .pk-btn-black:disabled{ opacity:.55; cursor:not-allowed; }
        .pk-error{ background:#FBE9E9; color:#A3403F; font-size:12.5px; padding:10px 12px; border-radius:6px; margin-bottom:14px; }

        .pk-result-title{ font-size:14.5px; font-weight:600; margin-bottom:2px; }
        .pk-result-meta{ font-family:'JetBrains Mono',monospace; font-size:11px; color:${tokens.muted}; margin-bottom:16px; }
        .pk-channel-label{ font-family:'JetBrains Mono',monospace; font-size:10.5px; letter-spacing:.08em; margin-bottom:8px; font-weight:600; }
        .pk-format-row{ width:100%; display:flex; align-items:center; gap:12px; padding:10px 12px; background:transparent; border:1px solid ${tokens.line}; border-radius:6px; cursor:pointer; text-align:left; margin-bottom:6px; transition:all .12s ease; }
        .pk-format-row:hover{ border-color:${tokens.blue}; }
        .pk-format-row.pk-selected{ background:${tokens.blueSoft}; border-color:${tokens.navy}; }
        .pk-format-spec{ font-family:'JetBrains Mono',monospace; font-size:12px; color:${tokens.muted}; flex:1; }
        .pk-selected .pk-format-spec{ color:${tokens.navy}; }
        .pk-format-size{ font-family:'JetBrains Mono',monospace; font-size:11px; color:${tokens.muted}; }
        .pk-format-dot{ width:13px; height:13px; border-radius:50%; border:1.5px solid ${tokens.lineStrong}; flex-shrink:0; }
        .pk-selected .pk-format-dot{ background:${tokens.navy}; border-color:${tokens.navy}; }
        .pk-download-btn{ width:100%; height:44px; border:none; border-radius:8px; font-weight:600; font-size:13.5px; margin-top:6px; cursor:pointer; transition:background .2s; }

        .pk-trust{ border-top:1px solid ${tokens.line}; border-bottom:1px solid ${tokens.line}; padding:26px 0; background:${tokens.offWhite}; }
        .pk-trust-grid{ display:grid; grid-template-columns:repeat(4,1fr); gap:20px; }
        .pk-trust-item{ font-family:'JetBrains Mono',monospace; font-size:12px; letter-spacing:.03em; color:${tokens.navy}; text-align:center; }

        .pk-section{ padding:96px 0; }
        .pk-section-head{ max-width:640px; margin-bottom:56px; }
        .pk-section-head h2{ font-family:'Hedvig Letters Serif',serif; font-weight:400; font-size:clamp(30px,4vw,46px); line-height:1.05; letter-spacing:-.01em; margin-top:16px; }
        .pk-section-head h2 em{ font-style:italic; color:${tokens.blue}; }
        .pk-section-head .pk-lead{ font-size:16px; color:${tokens.muted}; margin-top:16px; line-height:1.55; max-width:520px; }

        .pk-cap-grid{ display:grid; grid-template-columns:repeat(3,1fr); border-top:1px solid ${tokens.line}; border-left:1px solid ${tokens.line}; }
        .pk-cap{ padding:32px 28px; border-right:1px solid ${tokens.line}; border-bottom:1px solid ${tokens.line}; transition:background .2s; }
        .pk-cap:hover{ background:${tokens.offWhite}; }
        .pk-cap-num{ font-family:'JetBrains Mono',monospace; font-size:11px; color:${tokens.muted}; letter-spacing:.1em; display:block; margin-bottom:24px; }
        .pk-cap h3{ font-family:'Hedvig Letters Serif',serif; font-weight:600; font-size:21px; margin-bottom:8px; }
        .pk-cap p{ font-size:14px; color:${tokens.muted}; line-height:1.55; margin-bottom:14px; }
        .pk-cap-tags{ display:flex; flex-wrap:wrap; gap:6px; }
        .pk-cap-tag{ font-family:'JetBrains Mono',monospace; font-size:10px; letter-spacing:.05em; color:${tokens.muted}; border:1px solid ${tokens.line}; padding:3px 8px; border-radius:3px; text-transform:uppercase; }

        .pk-dark{ background:${tokens.navy}; color:${tokens.white}; }
        .pk-dark .pk-section-head h2{ color:${tokens.white}; }
        .pk-dark .pk-section-head .pk-lead{ color:rgba(255,255,255,.62); }
        .pk-arch-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:28px; }
        .pk-arch{ padding-top:26px; border-top:1px solid rgba(255,255,255,.18); }
        .pk-arch-tag{ font-family:'JetBrains Mono',monospace; font-size:10px; letter-spacing:.08em; color:${tokens.navy}; background:${tokens.white}; padding:3px 8px; border-radius:3px; display:inline-block; margin-bottom:16px; text-transform:uppercase; }
        .pk-arch h3{ font-family:'Hedvig Letters Serif',serif; font-weight:400; font-size:24px; line-height:1.15; margin-bottom:12px; }
        .pk-arch h3 em{ font-style:italic; font-weight:600; color:${tokens.bluePale}; }
        .pk-arch p{ font-size:14px; line-height:1.55; color:rgba(255,255,255,.72); margin-bottom:14px; }
        .pk-arch ul{ list-style:none; font-size:13px; padding:0; margin:0; }
        .pk-arch ul li{ padding:7px 0; color:rgba(255,255,255,.85); border-bottom:1px solid rgba(255,255,255,.1); font-family:'JetBrains Mono',monospace; display:flex; align-items:center; gap:9px; }
        .pk-arch ul li::before{ content:""; width:4px; height:4px; border-radius:50%; background:${tokens.bluePale}; flex-shrink:0; }
        .pk-arch ul li:last-child{ border-bottom:none; }

        .pk-process{ background:${tokens.offWhite}; }
        .pk-process-flow{ display:grid; grid-template-columns:repeat(4,1fr); }
        .pk-process-step{ padding:30px 20px 0 0; position:relative; }
        .pk-process-step::before{ content:""; position:absolute; top:44px; left:0; right:20px; height:1px; background:${tokens.line}; }
        .pk-process-step::after{ content:""; position:absolute; top:39px; left:0; width:10px; height:10px; border-radius:50%; background:${tokens.white}; border:1.5px solid ${tokens.navy}; }
        .pk-step-num{ font-family:'JetBrains Mono',monospace; font-size:11px; letter-spacing:.1em; color:${tokens.muted}; display:block; margin-bottom:54px; }
        .pk-process-step h4{ font-family:'Hedvig Letters Serif',serif; font-weight:600; font-size:18px; margin-bottom:6px; }
        .pk-process-step p{ font-size:13.5px; color:${tokens.muted}; line-height:1.5; }

        .pk-why-list{ margin-top:12px; }
        .pk-why-item{ padding:24px 0; border-bottom:1px solid ${tokens.line}; display:grid; grid-template-columns:52px 1fr; gap:20px; }
        .pk-why-item:first-child{ border-top:1px solid ${tokens.line}; }
        .pk-why-num{ font-family:'JetBrains Mono',monospace; font-size:12px; color:${tokens.muted}; padding-top:4px; }
        .pk-why-item h4{ font-family:'Hedvig Letters Serif',serif; font-weight:600; font-size:18px; margin-bottom:6px; }
        .pk-why-item p{ font-size:13.5px; color:${tokens.muted}; line-height:1.55; }

        .pk-footer{ background:${tokens.navy}; color:rgba(255,255,255,.6); padding:64px 0 24px; }
        .pk-footer-grid{ display:grid; grid-template-columns:1.4fr 1fr 1fr 1fr; gap:32px; margin-bottom:48px; }
        .pk-footer h5{ font-family:'JetBrains Mono',monospace; font-size:11px; letter-spacing:.08em; color:rgba(255,255,255,.4); text-transform:uppercase; margin-bottom:16px; }
        .pk-footer ul{ list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:10px; font-size:14px; }
        .pk-footer ul a:hover{ color:${tokens.white}; }
        .pk-footer-bottom{ border-top:1px solid rgba(255,255,255,.12); padding-top:20px; display:flex; justify-content:space-between; font-size:12.5px; }

        .pk-reveal{ opacity:0; transform:translateY(20px); transition:opacity .7s ease, transform .7s ease; }
        .pk-reveal.pk-in{ opacity:1; transform:none; }

        @media (max-width:900px){
          .pk-hero-grid{ grid-template-columns:1fr; }
          .pk-nav-links{ display:none; }
          .pk-trust-grid{ grid-template-columns:repeat(2,1fr); }
          .pk-cap-grid{ grid-template-columns:1fr; }
          .pk-arch-grid{ grid-template-columns:1fr; }
          .pk-process-flow{ grid-template-columns:1fr; }
          .pk-footer-grid{ grid-template-columns:1fr 1fr; }
        }
      `}</style>

      {/* NAV */}
      <nav className={`pk-nav ${scrolled ? "pk-scrolled" : ""}`}>
        <div className="pk-nav-inner">
          <div className="pk-logo">
            <ParkerIcon size={22} />
            Parker
          </div>
          <div className="pk-nav-links">
            {NAV.map((n) => (
              <a key={n.label} href={n.href}>{n.label}</a>
            ))}
          </div>
          <a className="pk-nav-cta" href="#tool">Try it</a>
        </div>
      </nav>

      {/* HERO + live tool */}
      <header className="pk-hero" id="tool">
        <div className="pk-container pk-hero-grid">
          <div>
            <Eyebrow dark>Media downloader</Eyebrow>
            <h1>
              Paste a link.
              <br />
              Get exactly <em>the file</em> you need.
            </h1>
            <p className="pk-hero-sub">
              A real REST API, a Python extraction worker, and a MySQL-backed request log — not a mockup.
              Resolves video and audio formats for public links and streams the file straight to you.
            </p>
          </div>

          <div className="pk-tool-card">
            <form className="pk-tool-input-row" onSubmit={handleSearch}>
              <input
                className="pk-input"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/watch?v=..."
              />
              <button className="pk-btn-black" type="submit" disabled={status === "loading"}>
                {status === "loading" ? "Resolving…" : "Search"}
              </button>
            </form>

            {status === "error" && <div className="pk-error">{error}</div>}

            {result && (
              <div>
                <div className="pk-result-title">{result.title}</div>
                <div className="pk-result-meta">{result.video.length + result.audio.length} formats found</div>

                <div className="pk-channel-label" style={{ color: tokens.navy }}>VIDEO</div>
                {result.video.map((v) => (
                  <FormatRow key={v.id} item={v} kind="video" selected={selected === v.id} onSelect={setSelected} />
                ))}

                <div className="pk-channel-label" style={{ color: tokens.blue, marginTop: 14 }}>AUDIO</div>
                {result.audio.map((a) => (
                  <FormatRow key={a.id} item={a} kind="audio" selected={selected === a.id} onSelect={setSelected} />
                ))}

                <button
                  className="pk-download-btn"
                  onClick={handleDownload}
                  disabled={!selected || downloading}
                  style={{
                    background: selected ? tokens.black : tokens.line,
                    color: selected ? tokens.white : tokens.muted,
                    cursor: selected ? "pointer" : "not-allowed",
                  }}
                >
                  {downloading ? "Downloading…" : downloaded ? "Downloaded" : "Download"}
                </button>
              </div>
            )}

            {!result && status !== "loading" && (
              <p style={{ fontSize: 13, color: tokens.muted, margin: 0 }}>
                Paste a link above — formats will appear here.
              </p>
            )}
          </div>
        </div>
      </header>

      {/* TRUST STRIP */}
      <div className="pk-trust">
        <div className="pk-container pk-trust-grid">
          <div className="pk-trust-item">Any public platform</div>
          <div className="pk-trust-item">Video &amp; audio formats</div>
          <div className="pk-trust-item">No account required</div>
          <div className="pk-trust-item">Files deleted after send</div>
        </div>
      </div>

      {/* CAPABILITIES */}
      <section className="pk-section">
        <div className="pk-container">
          <Reveal className="pk-section-head">
            <Eyebrow>What it does</Eyebrow>
            <h2>One link in, <em>every format</em> out.</h2>
            <p className="pk-lead">
              Resolve a URL once and choose exactly the video quality or audio bitrate you need — nothing more to set up.
            </p>
          </Reveal>

          <div className="pk-cap-grid">
            {CAPABILITIES.map((c, i) => (
              <Reveal as="div" className="pk-cap" key={c.title}>
                <span className="pk-cap-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
                <div className="pk-cap-tags">
                  {c.tags.map((t) => <span className="pk-cap-tag" key={t}>{t}</span>)}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ARCHITECTURE — dark inverted section */}
      <section className="pk-section pk-dark" id="architecture">
        <div className="pk-container">
          <Reveal className="pk-section-head">
            <Eyebrow dark>Under the hood</Eyebrow>
            <h2>Built like <em>production</em> software.</h2>
            <p className="pk-lead">
              An API-gateway-plus-worker architecture, chosen deliberately rather than crammed into one script.
            </p>
          </Reveal>

          <div className="pk-arch-grid">
            {ARCHITECTURE.map((a) => (
              <Reveal as="div" className="pk-arch" key={a.tag}>
                <span className="pk-arch-tag">{a.tag}</span>
                <h3 dangerouslySetInnerHTML={{ __html: a.title }} />
                <p>{a.body}</p>
                <ul>
                  {a.items.map((it) => <li key={it}>{it}</li>)}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="pk-section pk-process" id="process">
        <div className="pk-container">
          <Reveal className="pk-section-head">
            <Eyebrow>How it works</Eyebrow>
            <h2>Four steps, <em>no friction</em>.</h2>
          </Reveal>

          <div className="pk-process-flow">
            {PROCESS.map((p, i) => (
              <Reveal as="div" className="pk-process-step" key={p.title}>
                <span className="pk-step-num">{String(i + 1).padStart(2, "0")}</span>
                <h4>{p.title}</h4>
                <p>{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY — engineering decisions */}
      <section className="pk-section" id="about">
        <div className="pk-container">
          <Reveal className="pk-section-head">
            <Eyebrow>Engineering notes</Eyebrow>
            <h2>Decisions worth <em>explaining</em>.</h2>
            <p className="pk-lead">The details that separate a demo from something meant to run safely in public.</p>
          </Reveal>

          <div className="pk-why-list">
            {WHY.map((w, i) => (
              <Reveal as="div" className="pk-why-item" key={w.title}>
                <span className="pk-why-num">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h4>{w.title}</h4>
                  <p>{w.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="pk-footer">
        <div className="pk-container">
          <div className="pk-footer-grid">
            <div>
              <div className="pk-logo" style={{ color: tokens.white, marginBottom: 12 }}>
                <ParkerIcon size={20} color={tokens.white} />
                Parker
              </div>
              <p style={{ fontSize: 13.5, maxWidth: 260 }}>A media downloader built as a real full-stack project, from Rosario, Argentina.</p>
            </div>
            <div>
              <h5>Product</h5>
              <ul><li><a href="#tool">Downloader</a></li><li><a href="#process">How it works</a></li></ul>
            </div>
            <div>
              <h5>Project</h5>
              <ul><li><a href="#architecture">Architecture</a></li><li><a href="#about">Engineering notes</a></li></ul>
            </div>
            <div>
              <h5>Contact</h5>
              <ul><li><a href="https://www.linkedin.com/in/joaqu%C3%ADn-maza-4b25991a4/" target="_blank" rel="noreferrer">LinkedIn</a></li></ul>
            </div>
          </div>
          <div className="pk-footer-bottom">
            <p>© 2026 Parker</p>
            <p>Built by Joaquín Maza</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
