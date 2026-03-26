import type { Metadata } from 'next'
import { Raleway } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
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
    <html lang="en" className={raleway.variable}>
      <body className="font-sans antialiased bg-white">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
