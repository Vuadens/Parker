'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const NAV = [
  { label: 'Downloader', href: '/#tool' },
  { label: 'How it\u2019s built', href: '/#architecture' },
  { label: 'Process', href: '/#process' },
  { label: 'About', href: '/about' },
]

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-100 border-b px-8 py-3.5 backdrop-blur-md transition-colors ${
        scrolled ? 'border-line bg-white/85' : 'border-transparent bg-white/85'
      }`}
    >
      <div className="mx-auto flex max-w-[1160px] items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 font-serif text-[21px] text-navy">
          <Image src="/parker-logo.svg" alt="Parker logo" width={26} height={26} className="h-[26px] w-auto" />
          Parker
        </Link>

        <div className="hidden items-center gap-[34px] text-sm font-medium text-navy md:flex">
          {NAV.map((n) => (
            <Link key={n.label} href={n.href} className="transition-colors hover:text-blue">
              {n.label}
            </Link>
          ))}
        </div>

        <Link
          href="/#tool"
          className="rounded-full bg-ink px-[18px] py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-navy"
        >
          Try it
        </Link>
      </div>
    </nav>
  )
}
