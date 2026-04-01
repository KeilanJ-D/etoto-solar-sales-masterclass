import type { Metadata } from 'next'

const isInternal = process.env.NEXT_PUBLIC_UNLOCK_ALL === 'true'

export const metadata: Metadata = {
  title: isInternal 
    ? 'Solar Sales Framework — ETOTO Media' 
    : 'Solar Sales Framework (£3.99) — ETOTO Media',
  description: isInternal
    ? 'The 9-step skeleton for experienced solar reps. Flexible, adaptable, yours.'
    : 'The 9-step skeleton for experienced solar reps. Flexible, adaptable, yours. £3.99.',
  openGraph: {
    title: 'The 9-Step Skeleton. Flexible. Adaptable. Yours.',
    description: isInternal
      ? 'The sales framework for experienced reps who want structure without a script.'
      : 'The sales framework for experienced reps who want structure without a script. £3.99.',
    type: 'website',
    images: [{ url: '/og/sales-framework.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The 9-Step Skeleton. Flexible. Adaptable. Yours.',
    description: isInternal
      ? 'The sales framework for experienced reps who want structure without a script.'
      : 'The sales framework for experienced reps who want structure without a script. £3.99.',
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
