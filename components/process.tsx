import { Eyebrow, Reveal } from './reveal'

const PROCESS = [
  { title: 'Paste the link', body: 'Any public video URL.' },
  { title: 'We resolve it', body: 'The worker lists every available format.' },
  { title: 'Pick one', body: 'Video quality or audio bitrate — your call.' },
  { title: 'Get the file', body: 'Streamed straight to your device.' },
]

const WHY = [
  {
    title: 'Argv, never a shell string',
    body: 'URLs are passed to the worker as array arguments, so there\u2019s no path for shell injection regardless of what a user pastes.',
  },
  {
    title: 'Rate-limited by design',
    body: '10 requests per minute per IP at the API layer, keeping a public demo\u2019s bandwidth and cost predictable.',
  },
  {
    title: 'Nothing retained',
    body: 'Downloaded files live in a per-request temp folder and are deleted the moment they\u2019re streamed to the client.',
  },
  {
    title: 'IPs hashed, not stored',
    body: 'Request logs keep a SHA-256 hash of the requester\u2019s IP — enough for basic abuse detection, never the raw address.',
  },
]

export function Process() {
  return (
    <section id="process" className="bg-off-white px-8 py-24">
      <div className="mx-auto max-w-[1160px]">
        <div className="mb-14 max-w-[640px]">
          <Eyebrow>Process</Eyebrow>
          <h2 className="mt-4 text-balance font-serif text-[clamp(30px,4vw,46px)] font-normal leading-[1.05] tracking-[-0.01em] text-navy">
            Four steps, <em className="text-blue">start to file.</em>
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-4">
          {PROCESS.map((step, i) => (
            <Reveal key={step.title} delay={i * 80}>
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border-[1.5px] border-navy font-mono text-[13px] text-navy">
                  {i + 1}
                </span>
                <span className="h-px flex-1 bg-line" aria-hidden="true" />
              </div>
              <h3 className="mb-1.5 font-serif text-lg font-semibold text-navy">{step.title}</h3>
              <p className="text-[13.5px] leading-relaxed text-muted-tone">{step.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Safety() {
  return (
    <section className="px-8 py-24">
      <div className="mx-auto max-w-[1160px]">
        <div className="mb-10 max-w-[640px]">
          <Eyebrow>Why this shape</Eyebrow>
          <h2 className="mt-4 text-balance font-serif text-[clamp(30px,4vw,46px)] font-normal leading-[1.05] tracking-[-0.01em] text-navy">
            Built like it&apos;s <em className="text-blue">going to production.</em>
          </h2>
        </div>

        <div>
          {WHY.map((w, i) => (
            <Reveal
              key={w.title}
              className="grid grid-cols-[52px_1fr] gap-5 border-b border-line py-6 first:border-t"
            >
              <span className="pt-1 font-mono text-xs text-muted-tone">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="mb-1.5 font-serif text-lg font-semibold text-navy">{w.title}</h3>
                <p className="text-[13.5px] leading-relaxed text-muted-tone">{w.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
