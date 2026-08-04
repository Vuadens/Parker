import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { Eyebrow, Reveal } from '@/components/reveal'

export const metadata: Metadata = {
  title: 'About — Joaquín Maza · Parker',
  description:
    'Joaquín Maza — Systems Engineering undergraduate at UTN FRRo, author of Parker. Experience with Python, SQL, and full-stack development.',
}

const INTRO = {
  name: 'Joaquín Maza',
  role: 'Systems Engineering Undergraduate · UTN FRRo',
  linkedin: 'https://www.linkedin.com/in/joaqu%C3%ADn-maza-4b25991a4/',
  bio: 'Third-year Systems Engineering student at the National Technological University (UTN, Argentina) seeking a first professional role in technology. Hands-on experience with Python, SQL, HTML, CSS, Git, and GitHub through academic and self-directed projects, plus practical system administration: software installation, configuration, troubleshooting, and command-line work on Windows and Linux. Fluent in English (C2 Cambridge Proficiency), with strong communication skills in professional, multicultural environments. Fast learner, adaptable, detail-oriented, and collaborative, with a practical, analytical approach to technical problem-solving.',
}

const EXPERIENCE = [
  {
    role: 'PC Support Specialist',
    org: 'MATRIX Servicio Técnico · Independent contractor',
    period: 'Jul 2025 – Present · 1 yr 1 mo',
    location: 'Hybrid',
  },
  {
    role: 'Swimming Instructor',
    org: 'Club de Regatas Rosario · Part-time',
    period: 'Jan 2025 – Present · 1 yr 7 mo',
    location: 'On-site',
  },
]

const EDUCATION = [
  {
    org: 'Universidad Tecnológica Nacional (UTN)',
    program: 'Systems Engineering',
    period: 'Mar 2024 – Present',
    detail:
      'Studying Information Systems Engineering at UTN – Facultad Regional Rosario. Strong focus on programming and software development, with an emphasis on self-directed learning and putting knowledge into practice through academic and personal projects.',
    tags: ['Incident resolution', 'Technical support', '+2 more'],
  },
]

const CERTIFICATIONS = [
  {
    title: 'C2 Proficiency (CAE)',
    issuer: 'Cambridge University Press & Assessment',
    date: 'Issued Dec 2025 · Credential ID 463803PAZ',
    tags: ['English (C2 Proficiency)', 'Technical English (Engineering)'],
  },
  {
    title: 'Public Speaking for Nonconformists',
    issuer: 'Franco Pisso',
    date: 'Issued Mar 2026',
    tags: ['Public speaking', 'Storytelling', '+3 more'],
  },
]

const SKILLS = [
  'English (C2 Proficiency)',
  'Technical English (Engineering)',
  'Python',
  'SQL',
  'HTML',
  'CSS',
  'Git & GitHub',
  'Command-line (Windows / Linux)',
  'Technical support',
  'Incident resolution',
  'Troubleshooting',
  'Public speaking',
  'Storytelling',
  'Teamwork',
  'Adaptability',
  'Attention to detail',
  'Problem-solving',
  'Fast learning',
]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-6 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-tone">
      {children}
    </h2>
  )
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded border border-line px-2.5 py-1 font-mono text-[11px] text-navy transition-colors hover:bg-off-white">
      {children}
    </span>
  )
}

function EntryCard({
  title,
  subtitle,
  meta,
  detail,
  tags,
}: {
  title: string
  subtitle?: string
  meta: string
  detail?: string
  tags?: string[]
}) {
  return (
    <Reveal className="rounded-lg border border-line bg-white p-6 transition-all hover:-translate-y-1 hover:border-blue hover:shadow-[0_10px_24px_rgba(30,61,89,0.12)]">
      <h3 className="font-serif text-lg font-semibold text-navy">{title}</h3>
      {subtitle && <p className="mt-0.5 text-sm text-blue">{subtitle}</p>}
      <p className="mt-1 font-mono text-[11px] text-muted-tone">{meta}</p>
      {detail && <p className="mt-3 text-sm leading-relaxed text-muted-tone">{detail}</p>}
      {tags && tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
        </div>
      )}
    </Reveal>
  )
}

export default function AboutPage() {
  return (
    <main>
      <SiteNav />

      {/* Hero */}
      <section
        className="px-8 pb-20 pt-[150px]"
        style={{
          background: 'linear-gradient(160deg, #1e3d59 0%, #48749e 55%, #c6ebf7 100%)',
        }}
      >
        <div className="mx-auto flex max-w-[900px] flex-col items-center gap-8 text-center sm:flex-row sm:text-left">
          <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-2xl border-2 border-white/40 shadow-[0_12px_30px_rgba(0,0,0,.3)]">
            <Image
              src="/profile.jpg"
              alt="Portrait of Joaquín Maza"
              width={128}
              height={128}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <h1 className="font-serif text-[clamp(30px,5vw,44px)] font-normal text-white [text-shadow:0_2px_16px_rgba(0,0,0,.35)]">
              {INTRO.name}
            </h1>
            <p className="mt-2 font-mono text-[12.5px] tracking-[0.03em] text-white/85">
              {INTRO.role}
            </p>
            <Link
              href={INTRO.linkedin}
              className="mt-5 rounded-full bg-ink px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-navy"
            >
              Connect on LinkedIn
            </Link>
          </div>
        </div>
      </section>

      {/* Bio */}
      <section className="border-b border-line bg-off-white px-8 py-16">
        <div className="mx-auto max-w-[760px]">
          <p className="text-pretty text-[17px] leading-relaxed text-navy">{INTRO.bio}</p>
        </div>
      </section>

      {/* Experience */}
      <section className="px-8 py-16">
        <div className="mx-auto max-w-[900px]">
          <Eyebrow>Career</Eyebrow>
          <div className="mt-6">
            <SectionLabel>Experience</SectionLabel>
            <div className="grid gap-4 md:grid-cols-2">
              {EXPERIENCE.map((e) => (
                <EntryCard
                  key={e.role}
                  title={e.role}
                  subtitle={e.org}
                  meta={`${e.period} · ${e.location}`}
                />
              ))}
            </div>
          </div>

          <div className="mt-12">
            <SectionLabel>Education</SectionLabel>
            <div className="grid gap-4">
              {EDUCATION.map((e) => (
                <EntryCard
                  key={e.org}
                  title={e.org}
                  subtitle={e.program}
                  meta={e.period}
                  detail={e.detail}
                  tags={e.tags}
                />
              ))}
            </div>
          </div>

          <div className="mt-12">
            <SectionLabel>Licenses &amp; Certifications</SectionLabel>
            <div className="grid gap-4 md:grid-cols-2">
              {CERTIFICATIONS.map((c) => (
                <EntryCard
                  key={c.title}
                  title={c.title}
                  subtitle={c.issuer}
                  meta={c.date}
                  tags={c.tags}
                />
              ))}
            </div>
          </div>

          <div className="mt-12">
            <SectionLabel>Skills</SectionLabel>
            <div className="flex flex-wrap gap-2">
              {SKILLS.map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
