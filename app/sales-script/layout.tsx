import type { Metadata } from 'next'

const isInternal = process.env.NEXT_PUBLIC_UNLOCK_ALL === 'true'

export const metadata: Metadata = {
  title: isInternal 
    ? 'Solar Sales Script — ETOTO Media' 
    : 'Solar Sales Script — ETOTO Solar Sales Masterclass',
  description: isInternal
    ? 'The word-for-word script that closes solar deals. 9 steps, copy-to-clipboard, audio from a real closing call.'
    : 'The word-for-word script that closes solar deals. 9 steps, copy-to-clipboard, audio from a real closing call. Part of the Complete Masterclass.',
  openGraph: {
    title: 'The Word-for-Word Script That Closes Solar Deals.',
    description: isInternal
      ? 'Every sentence. Every question. The exact script used by 200+ UK installers.'
      : 'Every sentence. Every question. The exact script used by 200+ UK installers. Part of the Complete Masterclass.',
    type: 'website',
    images: [{ url: '/og/sales-script.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Word-for-Word Script That Closes Solar Deals.',
    description: isInternal
      ? 'Every sentence. Every question. The exact script used by 200+ UK installers.'
      : 'Every sentence. Every question. The exact script used by 200+ UK installers. Part of the Complete Masterclass.',
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
