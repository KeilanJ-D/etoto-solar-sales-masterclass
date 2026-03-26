import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Complete Solar Sales Toolkit | ETOTO Media',
  description: 'All 4 solar sales products in one bundle. Scripts, framework, quiz, and calculator for £9.99. Save 37% compared to buying individually.',
  openGraph: {
    title: 'Complete Solar Sales Toolkit',
    description: 'All 4 solar sales products in one bundle for £9.99',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Complete Solar Sales Toolkit',
    description: 'All 4 solar sales products in one bundle for £9.99',
  },
}

export default function CompleteToolkitLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
