import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Complete Solar Sales Toolkit — ETOTO Media',
  description: 'Script, framework, quiz, and calculator. Everything your team needs to sell solar. £9.99.',
  openGraph: {
    title: 'The Complete Solar Sales Toolkit. £9.99.',
    description: 'All 4 tools in one purchase. Used by 200+ UK solar installers. Save £5.97 vs buying individually.',
    type: 'website',
    images: [{ url: '/og/complete-toolkit.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Complete Solar Sales Toolkit. £9.99.',
    description: 'All 4 tools in one purchase. Used by 200+ UK solar installers. Save £5.97 vs buying individually.',
    images: ['/og/complete-toolkit.jpg'],
  },
}

export default function CompleteToolkitLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
