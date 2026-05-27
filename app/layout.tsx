import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, DM_Sans, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['500', '600', '700', '800'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://masterclass.etoto.media'),
  title: 'ETOTO Media — Solar Sales Masterclass',
  description: 'The 9-step formula that closes solar deals. Scripts, live maths, real call recordings. Free training for UK solar installers.',
  generator: 'v0.app',
  openGraph: {
    title: 'Sell Solar Like You Built It.',
    description: 'The 9-step formula used by 200+ UK solar installers. Free masterclass from ETOTO Media.',
    type: 'website',
    images: [{ url: '/og/masterclass.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sell Solar Like You Built It.',
    description: 'The 9-step formula used by 200+ UK solar installers.',
    images: ['/og/masterclass.jpg'],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${dmSans.variable} ${jetbrainsMono.variable}`} data-scroll-behavior="smooth">
      <body className="font-sans antialiased bg-white overflow-x-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
