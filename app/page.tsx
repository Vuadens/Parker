import { SiteNav } from '@/components/site-nav'
import { Hero, TrustStrip } from '@/components/hero'
import { Capabilities } from '@/components/capabilities'
import { Architecture } from '@/components/architecture'
import { Process, Safety } from '@/components/process'
import { SiteFooter } from '@/components/site-footer'

export default function HomePage() {
  return (
    <main>
      <SiteNav />
      <Hero />
      <TrustStrip />
      <Capabilities />
      <Architecture />
      <Process />
      <Safety />
      <SiteFooter />
    </main>
  )
}
