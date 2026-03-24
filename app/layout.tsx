import type { Metadata } from 'next'
import { Outfit, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: 'Solar Path × ETOTO Media — Commercial Proposal',
  description: '90-Day Solar Scaler — Prepared exclusively for Ken Hegarty & Jackie Murphy',
  robots: 'noindex, nofollow',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${dmSans.variable}`}>
      <body className="font-body antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
