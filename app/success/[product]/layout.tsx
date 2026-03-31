import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Purchase Complete — ETOTO Media',
  description: 'Thank you for your purchase. Access your download and activation code below.',
  robots: 'noindex, nofollow', // Don't index success pages
}

export default function SuccessLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
