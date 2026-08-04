import Link from 'next/link'
import Image from 'next/image'

const COLUMNS = [
  {
    heading: 'Product',
    links: [
      { label: 'Downloader', href: '/#tool' },
      { label: 'How it\u2019s built', href: '/#architecture' },
      { label: 'Process', href: '/#process' },
    ],
  },
  {
    heading: 'Project',
    links: [
      { label: 'GitHub repo', href: 'https://github.com/Vuadens/Parker' },
      { label: 'Original CLI', href: 'https://github.com/Vuadens/YT-dlp-downloader-for-Linux' },
    ],
  },
  {
    heading: 'Author',
    links: [
      { label: 'About', href: '/about' },
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/joaqu%C3%ADn-maza-4b25991a4/',
      },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="bg-navy px-8 pb-6 pt-16 text-white/60">
      <div className="mx-auto max-w-[1160px]">
        <div className="mb-12 grid gap-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="mb-3 flex items-center gap-2.5 font-serif text-[21px] text-white">
              <Image src="/parker-logo.svg" alt="Parker logo" width={26} height={26} className="h-[26px] w-auto brightness-0 invert" />
              Parker
            </div>
            <p className="max-w-[260px] text-pretty text-sm leading-relaxed text-white/60">
              A full-stack media downloader built to practice REST API design, service isolation,
              and schema modeling.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h5 className="mb-4 font-mono text-[11px] uppercase tracking-[0.08em] text-white/40">
                {col.heading}
              </h5>
              <ul className="flex flex-col gap-2.5 text-sm">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-between gap-2 border-t border-white/12 pt-5 text-[12.5px] sm:flex-row">
          <span>Parker — portfolio demo. Results on this site are simulated.</span>
          <span>Joaqu&iacute;n Maza · {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  )
}
