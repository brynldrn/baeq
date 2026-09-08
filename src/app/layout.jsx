import { Archivo, DM_Mono } from 'next/font/google'
import '@/components/portfolio/portfolio.css'
import './globals.css'
import { earlyIntentScript } from '@/lib/orbit.mjs'

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata = {
  title: {
    default: 'Bryan Aldrin Quinalayo — Senior Software Engineer',
    template: '%s — Bryan Aldrin Quinalayo',
  },
  description: 'Senior Software Engineer building scalable React and Next.js products.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${archivo.variable} ${dmMono.variable}`}>
      <body>
        <script id="portfolio-early-intent" dangerouslySetInnerHTML={{ __html: earlyIntentScript }} />
        {children}
      </body>
    </html>
  )
}
