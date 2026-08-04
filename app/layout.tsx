import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Hedvig_Letters_Serif, Rethink_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const hedvig = Hedvig_Letters_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-hedvig',
  display: 'swap',
})

const rethink = Rethink_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-rethink',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Parker — Full-stack media downloader',
  description:
    'Parker is a three-tier media downloader: a React client, a Node/Express REST API, and a Python (yt-dlp) worker backed by MySQL. A portfolio project by Joaquín Maza.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#1e3d59',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${hedvig.variable} ${rethink.variable} ${jetbrains.variable} bg-background`}
    >
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
