import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Solar Sales Script (£3.99) — ETOTO Media',
  description: 'The word-for-word script that closes solar deals. 9 steps, copy-to-clipboard, audio from a real closing call. £3.99.',
  openGraph: {
    title: 'The Word-for-Word Script That Closes Solar Deals.',
    description: 'Every sentence. Every question. The exact script used by 200+ UK installers. £3.99.',
    type: 'website',
    images: [{ url: '/og/sales-script.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Word-for-Word Script That Closes Solar Deals.',
    description: 'Every sentence. Every question. The exact script used by 200+ UK installers. £3.99.',
    images: ['/og/sales-script.jpg'],
  },
}

export default function SalesScriptLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
