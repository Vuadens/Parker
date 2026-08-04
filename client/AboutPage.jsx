import React from "react";

// ---------------------------------------------------------------------------
// Shared Parker tokens — kept identical to App.jsx so both pages stay in sync.
// If you centralize tokens in a shared file later, import them from there
// instead of duplicating this block.
// ---------------------------------------------------------------------------
const tokens = {
  bg: "#E8EBEF",
  surface: "#FFFFFF",
  border: "#C6D2D8",
  borderStrong: "#B6C9CF",
  text: "#1E3D59",
  textDim: "#48749E",
  textFaint: "#7C97AC",
  ink: "#000000",
  amber: "#1E3D59",
  amberDim: "#DEEEFE",
  teal: "#48749E",
  tealDim: "#C6EBF7",
};

function ParkerIcon({ size = 26, color = tokens.text }) {
  return (
    <svg
      width={size}
      height={size * (670.71881 / 1091.8276)}
      viewBox="0 0 1091.8276 670.71881"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="matrix(0.1,0,0,-0.1,-1054,1499.7873)" fill={color}>
        <path d="m 19430,14986 c -179,-32 -353,-93 -507,-176 l -73,-39 -43,28 c -54,37 -154,71 -209,71 -105,0 -223,-55 -298,-137 -102,-112 -127,-287 -60,-425 27,-55 26,-64 -13,-112 -47,-59 -221,-303 -304,-426 -178,-266 -360,-564 -611,-1000 -435,-756 -583,-973 -813,-1196 -130,-125 -252,-207 -392,-263 -64,-26 -92,-25 -193,8 -709,230 -1532,739 -1878,1161 l -29,35 -126,-1 c -133,0 -185,-11 -283,-60 -59,-30 -164,-117 -173,-143 -11,-36 60,-170 164,-310 137,-184 479,-499 704,-649 67,-45 86,-70 45,-58 -13,4 -43,11 -68,16 -536,111 -1060,362 -1491,716 -127,104 -331,304 -449,439 -396,456 -703,1035 -895,1690 -46,159 -76,273 -95,368 -13,66 -25,73 -33,20 -69,-446 -82,-601 -74,-848 17,-506 131,-972 345,-1410 315,-643 841,-1165 1511,-1500 107,-54 242,-113 316,-139 14,-5 16,-9 7,-15 -21,-13 -305,33 -567,91 -481,106 -895,275 -1152,470 l -78,59 -67,-5 c -151,-13 -372,-110 -540,-236 -57,-43 -153,-129 -213,-191 -110,-114 -255,-294 -255,-318 0,-6 33,-45 73,-85 55,-55 94,-83 151,-111 76,-36 80,-37 169,-33 l 92,4 93,-78 c 462,-391 1135,-748 1722,-916 384,-109 691,-152 1097,-152 313,0 549,24 790,82 51,12 95,19 98,16 6,-6 -89,-100 -161,-160 -72,-60 -177,-134 -252,-178 -141,-83 -187,-150 -187,-275 0,-68 4,-89 28,-137 35,-72 110,-140 185,-168 52,-20 71,-22 222,-17 127,3 184,9 245,26 511,139 999,430 1511,902 597,550 1087,1174 1468,1869 58,105 221,432 260,520 16,36 51,115 78,175 28,61 61,137 75,170 14,33 54,118 90,189 202,396 417,661 688,844 139,94 311,162 508,202 147,30 446,31 642,1 355,-53 526,-46 733,30 236,86 407,289 478,565 15,62 24,119 22,154 l -3,54 -256,216 c -590,495 -678,565 -794,623 -111,55 -268,110 -400,138 -127,28 -457,36 -575,15 z m 625,-527 c 56,-15 128,-92 143,-150 21,-85 -12,-172 -87,-224 -38,-27 -51,-30 -116,-30 -65,0 -78,3 -116,30 -111,78 -125,226 -31,318 61,60 127,78 207,56 z m -556,-2946 c -99,-250 -324,-602 -562,-879 -299,-347 -702,-634 -1085,-772 l -103,-37 -90,-173 c -138,-269 -194,-367 -287,-505 -143,-211 -142,-210 -149,-265 -8,-69 16,-131 68,-175 148,-127 439,-43 767,221 244,196 560,544 775,853 281,404 507,908 622,1382 48,199 85,407 72,407 -2,0 -15,-26 -28,-57 z" />
      </g>
    </svg>
  );
}

const NAV = [
  { label: "Downloader" },
  { label: "Platforms and formats" },
  { label: "About" },
];

// ---------------------------------------------------------------------------
// Content — edit here. Everything the page renders is sourced from these
// three lists plus the intro block below.
// ---------------------------------------------------------------------------
const INTRO = {
  name: "Joaquín Maza",
  role: "Systems Engineering Undergraduate · UTN FRRo",
  linkedin: "https://www.linkedin.com/in/joaqu%C3%ADn-maza-4b25991a4/",
  email: "your.email@example.com", // TODO: replace with your real contact email
  bio: [
    "Third-year Systems Engineering student at the National Technological University (UTN, Argentina) seeking a first professional role in technology. Hands-on experience with Python, SQL, HTML, CSS, Git, and GitHub through academic and self-directed projects, plus practical system administration: software installation, configuration, troubleshooting, and command-line work on Windows and Linux. Fluent in English (C2 Cambridge Proficiency), with strong communication skills in professional, multicultural environments. Fast learner, adaptable, detail-oriented, and collaborative, with a practical, analytical approach to technical problem-solving.",
  ],
};

const EXPERIENCE = [
  {
    role: "PC Support Specialist",
    org: "MATRIX Servicio Técnico · Independent contractor",
    period: "Jul 2025 – Present · 1 yr 1 mo",
    location: "Hybrid",
  },
  {
    role: "Swimming Instructor",
    org: "Club de Regatas Rosario · Part-time",
    period: "Jan 2025 – Present · 1 yr 7 mo",
    location: "On-site",
  },
];

const EDUCATION = [
  {
    org: "Universidad Tecnológica Nacional (UTN)",
    program: "Systems Engineering",
    period: "Mar 2024 – Present",
    detail:
      "Studying Information Systems Engineering at UTN – Facultad Regional Rosario. Strong focus on programming and software development, with an emphasis on self-directed learning and putting knowledge into practice through academic and personal projects.",
    tags: ["Incident resolution", "Technical support", "+2 more"],
  },
];

const CERTIFICATIONS = [
  {
    title: "C2 Proficiency (CAE)",
    issuer: "Cambridge University Press & Assessment",
    date: "Issued Dec 2025 · Credential ID 463803PAZ",
    tags: ["English (C2 Proficiency)", "Technical English (Engineering)"],
  },
  {
    title: "Public Speaking for Nonconformists",
    issuer: "Franco Pisso",
    date: "Issued Mar 2026",
    tags: ["Public speaking", "Storytelling", "+3 more"],
  },
];

const SKILLS = [
  "English (C2 Proficiency)",
  "Technical English (Engineering)",
  "Python",
  "SQL",
  "HTML",
  "CSS",
  "Git & GitHub",
  "Command-line (Windows / Linux)",
  "Technical support",
  "Incident resolution",
  "Troubleshooting",
  "Public speaking",
  "Storytelling",
  "Teamwork",
  "Adaptability",
  "Attention to detail",
  "Problem-solving",
  "Fast learning",
];

// Decorative level-bar, reused from the downloader's format rows so both
// pages share the same visual signature.
function LevelBars({ seed }) {
  const heights = [3, 1, 2].map((n) => ((seed * n * 37) % 12) + 6);
  return (
    <div style={{ display: "flex", gap: 2, alignItems: "flex-end", height: 16, flexShrink: 0 }}>
      {heights.map((h, i) => (
        <div key={i} style={{ width: 3, height: h, background: tokens.borderStrong, borderRadius: 1 }} />
      ))}
    </div>
  );
}

function SectionLabel({ children, color = tokens.text }) {
  return (
    <div
      style={{
        fontSize: 11,
        letterSpacing: "0.08em",
        color,
        marginBottom: 14,
        fontWeight: 500,
      }}
    >
      {children}
    </div>
  );
}

function Tag({ children }) {
  return (
    <span
      className="tag-chip"
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 12,
        color: tokens.textDim,
        background: tokens.tealDim,
        border: `1px solid ${tokens.border}`,
        borderRadius: 999,
        padding: "4px 12px",
        display: "inline-block",
      }}
    >
      {children}
    </span>
  );
}

function EntryCard({ seed, kicker, kickerColor, title, subtitle, meta, extra, detail, tags }) {
  return (
    <div
      className="entry-card"
      style={{
        display: "flex",
        gap: 14,
        padding: "16px 16px",
        background: tokens.surface,
        border: `1px solid ${tokens.border}`,
        borderRadius: 8,
        animationDelay: `${seed * 70}ms`,
      }}
    >
      <LevelBars seed={seed} />
      <div style={{ flex: 1 }}>
        {kicker && (
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: kickerColor || tokens.textFaint,
              marginBottom: 4,
              letterSpacing: "0.04em",
            }}
          >
            {kicker}
          </div>
        )}
        <div style={{ fontSize: 15, fontWeight: 500, color: tokens.text }}>{title}</div>
        {subtitle && (
          <div style={{ fontSize: 13, color: tokens.textDim, marginTop: 2 }}>{subtitle}</div>
        )}
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            color: tokens.textFaint,
            marginTop: 6,
          }}
        >
          {meta}
          {extra ? ` · ${extra}` : ""}
        </div>
        {detail && (
          <p style={{ fontSize: 13, color: tokens.textDim, lineHeight: 1.6, margin: "10px 0 0" }}>
            {detail}
          </p>
        )}
        {tags && tags.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
            {tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: tokens.bg,
        color: tokens.text,
        fontFamily: "'Rethink Sans', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Hedvig+Letters+Serif&family=Rethink+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }

        .hero-fade {
          opacity: 0;
          animation: fadeUp 700ms ease forwards;
        }
        .hero-photo {
          animation-name: popIn;
          animation-duration: 600ms;
          animation-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .cta-btn { transition: transform 180ms ease, box-shadow 180ms ease, background 180ms ease; }
        .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.25); }
        .cta-solid:hover { background: #1E3D59 !important; }

        .entry-card {
          opacity: 0;
          animation: fadeUp 500ms ease forwards;
          transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
        }
        .entry-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 24px rgba(30,61,89,0.12);
          border-color: #48749E;
        }

        .tag-chip { transition: transform 150ms ease, background 150ms ease; }
        .tag-chip:hover { transform: translateY(-1px) scale(1.04); background: #B6C9CF; }

        @media (max-width: 640px) {
          .about-hero { flex-direction: column; text-align: center; }
          .about-hero > div:last-child { text-align: center; align-items: center; }
          .about-hero a { margin: 0 auto; }
        }
      `}</style>

      {/* Nav */}
      <header
        style={{
          borderBottom: `1px solid ${tokens.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 32px",
          background: tokens.surface,
        }}
      >
        <div
          style={{
            fontFamily: "'Hedvig Letters Serif', serif",
            fontWeight: 400,
            fontSize: 20,
            color: tokens.text,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <ParkerIcon size={24} />
          Parker
        </div>
        <nav style={{ display: "flex", gap: 28 }}>
          {NAV.map((n) => (
            <span
              key={n.label}
              style={{
                fontSize: 13,
                color: n.label === "About" ? tokens.text : tokens.textDim,
                fontWeight: n.label === "About" ? 500 : 400,
                cursor: "pointer",
              }}
            >
              {n.label}
            </span>
          ))}
        </nav>
      </header>

      {/* Hero — photo as focal point + intro on the gradient */}
      <section
        style={{
          padding: "64px 24px",
          background:
            "linear-gradient(135deg, #1E3D59 0%, #48749E 42%, #C6EBF7 72%, #DEEEFE 100%)",
        }}
      >
        <div
          className="about-hero"
          style={{
            maxWidth: 920,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            gap: 48,
          }}
        >
          <div
            className="hero-fade hero-photo"
            style={{
              width: 260,
              height: 260,
              minWidth: 200,
              borderRadius: "50%",
              border: "4px solid #FFFFFF",
              boxShadow: "0 16px 40px rgba(0,0,0,0.28)",
              background: "#DEEEFE",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <img
              src="/myself.jpg"
              alt={INTRO.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          <div style={{ textAlign: "left" }}>
            <h1
              className="hero-fade"
              style={{
                fontFamily: "'Hedvig Letters Serif', serif",
                fontWeight: 400,
                fontSize: 42,
                color: "#FFFFFF",
                margin: "0 0 6px",
                textShadow: "0 2px 14px rgba(0,0,0,0.45)",
                animationDelay: "80ms",
              }}
            >
              {INTRO.name}
            </h1>
            <p
              className="hero-fade"
              style={{
                fontSize: 16,
                color: "#FFFFFF",
                margin: "0 0 24px",
                textShadow: "0 1px 10px rgba(0,0,0,0.4)",
                animationDelay: "150ms",
              }}
            >
              {INTRO.role}
            </p>
            <div className="hero-fade" style={{ display: "flex", gap: 12, flexWrap: "wrap", animationDelay: "220ms" }}>
              <a
                href={INTRO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="cta-btn cta-solid"
                style={{
                  background: "#000000",
                  color: "#FFFFFF",
                  fontSize: 14,
                  fontWeight: 500,
                  padding: "12px 22px",
                  borderRadius: 6,
                  textDecoration: "none",
                }}
              >
                Connect on LinkedIn
              </a>
              <a
                href={`mailto:${INTRO.email}`}
                className="cta-btn"
                style={{
                  background: "rgba(0,0,0,0.35)",
                  color: "#FFFFFF",
                  fontSize: 14,
                  fontWeight: 500,
                  padding: "12px 22px",
                  borderRadius: 6,
                  border: "1.5px solid #FFFFFF",
                  textDecoration: "none",
                }}
              >
                Send an email
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Bio */}
      <section style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 8px" }}>
        {INTRO.bio.map((p, i) => (
          <p
            key={i}
            style={{
              fontSize: 15,
              lineHeight: 1.75,
              color: tokens.textDim,
              marginBottom: 18,
            }}
          >
            {p}
          </p>
        ))}
      </section>

      {/* Experience */}
      <section style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px 8px" }}>
        <SectionLabel color={tokens.amber}>EXPERIENCE</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {EXPERIENCE.map((e, i) => (
            <EntryCard
              key={e.role}
              seed={i + 1}
              title={e.role}
              subtitle={e.org}
              meta={e.period}
              extra={e.location}
              kickerColor={tokens.amber}
            />
          ))}
        </div>
      </section>

      {/* Education */}
      <section style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px 8px" }}>
        <SectionLabel color={tokens.teal}>EDUCATION</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {EDUCATION.map((e, i) => (
            <EntryCard
              key={e.org}
              seed={i + 3}
              title={e.org}
              subtitle={e.program}
              meta={e.period}
              detail={e.detail}
              tags={e.tags}
              kickerColor={tokens.teal}
            />
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px 8px" }}>
        <SectionLabel color={tokens.amber}>LICENSES &amp; CERTIFICATIONS</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {CERTIFICATIONS.map((c, i) => (
            <EntryCard
              key={c.title}
              seed={i + 5}
              title={c.title}
              subtitle={c.issuer}
              meta={c.date}
              tags={c.tags}
              kickerColor={tokens.amber}
            />
          ))}
        </div>
      </section>

      {/* Skills */}
      <section style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px 72px" }}>
        <SectionLabel color={tokens.teal}>SKILLS</SectionLabel>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {SKILLS.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
      </section>

      <footer
        style={{
          borderTop: `1px solid ${tokens.border}`,
          padding: "18px 32px",
          fontSize: 12,
          color: tokens.textFaint,
          textAlign: "center",
        }}
      >
        Built with Parker · Open to opportunities worldwide
      </footer>
    </div>
  );
}
