import { Archivo, DM_Mono } from 'next/font/google'
import './globals.css'

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
    default: 'Bryan Aldrin Quinalayo | Full-Stack Software Engineer',
    template: '%s | Bryan Aldrin Quinalayo',
  },
  description: 'Senior full-stack software engineer building web and mobile products with React, Next.js, React Native, and Expo.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${archivo.variable} ${dmMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
