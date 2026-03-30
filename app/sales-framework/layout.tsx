import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Solar Sales Framework (£3.99) — ETOTO Media',
  description: 'The 9-step skeleton for experienced solar reps. Flexible, adaptable, yours. £3.99.',
  openGraph: {
    title: 'The 9-Step Skeleton. Flexible. Adaptable. Yours.',
    description: 'The sales framework for experienced reps who want structure without a script. £3.99.',
    type: 'website',
    images: [{ url: '/og/sales-framework.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The 9-Step Skeleton. Flexible. Adaptable. Yours.',
    description: 'The sales framework for experienced reps who want structure without a script. £3.99.',
    images: ['/og/sales-framework.jpg'],
  },
}

export default function SalesFrameworkLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
