import type { Metadata } from 'next'

const isInternal = process.env.NEXT_PUBLIC_UNLOCK_ALL === 'true'

export const metadata: Metadata = {
  title: isInternal 
    ? 'Solar Sales Framework — ETOTO Media' 
    : 'Solar Sales Framework — ETOTO Solar Sales Masterclass',
  description: isInternal
    ? 'The 9-step skeleton for experienced solar reps. Flexible, adaptable, yours.'
    : 'The 9-step skeleton for experienced solar reps. Flexible, adaptable, yours. Part of the Complete Masterclass.',
  openGraph: {
    title: 'The 9-Step Skeleton. Flexible. Adaptable. Yours.',
    description: isInternal
      ? 'The sales framework for experienced reps who want structure without a script.'
      : 'The sales framework for experienced reps who want structure without a script. Part of the Complete Masterclass.',
    type: 'website',
    images: [{ url: '/og/sales-framework.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The 9-Step Skeleton. Flexible. Adaptable. Yours.',
    description: isInternal
      ? 'The sales framework for experienced reps who want structure without a script.'
      : 'The sales framework for experienced reps who want structure without a script. Part of the Complete Masterclass.',
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
