'use client'

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'

export function Reveal({
  as: Tag = 'div',
  className = '',
  children,
  delay = 0,
}: {
  as?: ElementType
  className?: string
  children: ReactNode
  delay?: number
}) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true)
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'reveal-in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}

export function Eyebrow({
  children,
  dark = false,
}: {
  children: ReactNode
  dark?: boolean
}) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em] ${
        dark ? 'text-white/60' : 'text-muted-tone'
      }`}
    >
      <span
        className={`h-px w-6 ${dark ? 'bg-white' : 'bg-navy'}`}
        aria-hidden="true"
      />
      {children}
    </span>
  )
}
