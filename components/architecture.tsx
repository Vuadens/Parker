import { Eyebrow, Reveal } from './reveal'

const ARCHITECTURE = [
  {
    tag: 'API',
    title: 'A real REST layer',
    body: 'Node/Express validates every request, rate-limits by IP, and exposes a clean JSON contract the React client consumes.',
    items: ['POST /api/resolve', 'POST /api/download', 'GET /api/stats'],
  },
  {
    tag: 'WORKER',
    title: 'Isolated extraction logic',
    body: 'A Python service (yt-dlp) does the actual media work, called via argv — never a shell string, so a malicious URL can\u2019t inject commands.',
    items: ['resolve.py', 'download.py', 'Timeout-bounded'],
  },
  {
    tag: 'DATA',
    title: 'MySQL, doing a real job',
    body: 'Every resolve and download is logged — URL, platform, format, status — enough for a genuine schema and a stats query, not a demo table.',
    items: ['requests', 'downloads', 'GROUP BY stats'],
  },
]

const FLOW = [
  { label: 'React', sub: 'client' },
  { label: 'Node / Express', sub: 'REST API' },
  { label: 'Python', sub: 'yt-dlp worker' },
  { label: 'MySQL', sub: 'request log' },
]

export function Architecture() {
  return (
    <section id="architecture" className="bg-navy px-8 py-24 text-white">
      <div className="mx-auto max-w-[1160px]">
        <div className="mb-14 max-w-[640px]">
          <Eyebrow dark>How it&apos;s built</Eyebrow>
          <h2 className="mt-4 text-balance font-serif text-[clamp(30px,4vw,46px)] font-normal leading-[1.05] tracking-[-0.01em] text-white">
            Three tiers, each doing <em className="text-blue-pale">one job well.</em>
          </h2>
          <p className="mt-4 max-w-[520px] text-pretty text-base leading-relaxed text-white/60">
            An API gateway plus a specialized worker — the shape these systems tend to take in the
            real world, and true to how the project actually evolved.
          </p>
        </div>

        {/* flow diagram */}
        <div className="mb-16 grid gap-3 md:grid-cols-4">
          {FLOW.map((node, i) => (
            <div key={node.label} className="relative">
              <div className="rounded-lg border border-white/18 bg-white/5 px-4 py-5 text-center">
                <p className="font-serif text-lg text-white">{node.label}</p>
                <p className="mt-1 font-mono text-[11px] text-white/50">{node.sub}</p>
              </div>
              {i < FLOW.length - 1 && (
                <span
                  className="absolute -right-2.5 top-1/2 hidden -translate-y-1/2 font-mono text-white/40 md:block"
                  aria-hidden="true"
                >
                  &rarr;
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="grid gap-7 md:grid-cols-3">
          {ARCHITECTURE.map((a, i) => (
            <Reveal key={a.tag} delay={i * 80} className="border-t border-white/18 pt-[26px]">
              <span className="mb-4 inline-block rounded bg-white px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-navy">
                {a.tag}
              </span>
              <h3 className="mb-3 font-serif text-2xl font-normal leading-tight text-white">
                {a.title}
              </h3>
              <p className="mb-3.5 text-sm leading-relaxed text-white/70">{a.body}</p>
              <ul className="text-[13px]">
                {a.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 border-b border-white/10 py-1.5 font-mono text-white/85 last:border-b-0"
                  >
                    <span
                      className="h-1 w-1 flex-shrink-0 rounded-full bg-blue-pale"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
