import { Eyebrow, Reveal } from './reveal'

const CAPABILITIES = [
  {
    tags: ['MP4', 'WEBM', '1080P', '4K'],
    title: 'Every video format',
    body: 'Resolves every quality tier the source publishes, from compact 480p to full 4K — you choose the trade-off between size and quality.',
  },
  {
    tags: ['MP3', 'AAC', '320KBPS'],
    title: 'Audio, extracted clean',
    body: 'Pull just the audio track at your preferred bitrate — no need to download the full video to get the sound.',
  },
  {
    tags: ['NO ACCOUNT', 'NO LOGIN'],
    title: 'Nothing to sign up for',
    body: 'Paste a link, get a file. No account, no email capture, no session to manage — the way a utility should work.',
  },
]

export function Capabilities() {
  return (
    <section className="px-8 py-24">
      <div className="mx-auto max-w-[1160px]">
        <div className="mb-14 max-w-[640px]">
          <Eyebrow>What it does</Eyebrow>
          <h2 className="mt-4 text-balance font-serif text-[clamp(30px,4vw,46px)] font-normal leading-[1.05] tracking-[-0.01em] text-navy">
            One link in, <em className="text-blue">every format out.</em>
          </h2>
          <p className="mt-4 max-w-[520px] text-pretty text-base leading-relaxed text-muted-tone">
            Resolve a URL once and choose exactly the video quality or audio bitrate you need —
            nothing more to set up.
          </p>
        </div>

        <div className="grid border-l border-t border-line md:grid-cols-3">
          {CAPABILITIES.map((c, i) => (
            <Reveal
              key={c.title}
              delay={i * 80}
              className="border-b border-r border-line px-7 py-8 transition-colors hover:bg-off-white"
            >
              <span className="mb-6 block font-mono text-[11px] tracking-[0.1em] text-muted-tone">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mb-2 font-serif text-[21px] font-semibold text-navy">{c.title}</h3>
              <p className="mb-3.5 text-sm leading-relaxed text-muted-tone">{c.body}</p>
              <div className="flex flex-wrap gap-1.5">
                {c.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.05em] text-muted-tone"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
