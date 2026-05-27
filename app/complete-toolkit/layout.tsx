import type { Metadata } from 'next'

const isInternal = process.env.NEXT_PUBLIC_UNLOCK_ALL === 'true'

export const metadata: Metadata = {
  title: isInternal
    ? 'ETOTO Solar Sales Masterclass — Internal'
    : 'The ETOTO Solar Sales Masterclass — £1,000 + VAT',
  description: isInternal
    ? 'The complete solar sales operating system. Framework, knowledge, tools, systems. All unlocked.'
    : 'The complete solar sales operating system for UK installers. 9-step framework, technical knowledge library, interactive sizing tools, systems playbooks. £1,000 + VAT. Lifetime access.',
  openGraph: {
    title: isInternal
      ? 'ETOTO Solar Sales Masterclass'
      : 'The Solar Sales Masterclass That Closes Deals.',
    description: isInternal
      ? 'Framework, knowledge, tools, systems. The whole operating system.'
      : 'Used by 200+ UK installers to drive £200M+ in client sales. One purchase. Lifetime access. £1,000 + VAT.',
    type: 'website',
    images: [{ url: '/og/complete-toolkit.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: isInternal
      ? 'ETOTO Solar Sales Masterclass'
      : 'The Solar Sales Masterclass That Closes Deals.',
    description: isInternal
      ? 'Framework, knowledge, tools, systems. The whole operating system.'
      : 'Used by 200+ UK installers. £1,000 + VAT. Lifetime access.',
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
