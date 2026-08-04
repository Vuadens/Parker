import { Downloader } from './downloader'
import { Eyebrow } from './reveal'

export function Hero() {
  return (
    <section
      id="tool"
      className="px-8 pb-24 pt-[150px]"
      style={{
        background:
          'linear-gradient(160deg, #1e3d59 0%, #48749e 55%, #c6ebf7 100%)',
      }}
    >
      <div className="mx-auto grid max-w-[1160px] items-center gap-16 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <Eyebrow dark>Media downloader</Eyebrow>
          <h1 className="mb-5 mt-5 text-balance font-serif text-[clamp(38px,5.4vw,64px)] font-normal leading-[1.04] tracking-[-0.01em] text-white [text-shadow:0_2px_16px_rgba(0,0,0,.35)]">
            Paste a link. <em className="text-blue-pale">Get exactly the file you need.</em>
          </h1>
          <p className="max-w-[460px] text-pretty text-[17px] leading-relaxed text-white/90">
            A real REST API, a Python extraction worker, and a MySQL-backed request log — not just a
            front end. This page is a portfolio demo, so results here are simulated.
          </p>
        </div>

        <Downloader />
      </div>
    </section>
  )
}

const TRUST = [
  'Any public platform',
  'Video & audio formats',
  'No account required',
  'Files deleted after send',
]

export function TrustStrip() {
  return (
    <section className="border-y border-line bg-off-white py-[26px]">
      <div className="mx-auto grid max-w-[1160px] grid-cols-2 gap-5 px-8 md:grid-cols-4">
        {TRUST.map((t) => (
          <p key={t} className="text-center font-mono text-xs tracking-[0.03em] text-navy">
            {t}
          </p>
        ))}
      </div>
    </section>
  )
}
