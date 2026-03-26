import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SolaFlow — Branded Solar Calculator for Installers',
  description: 'Your own solar calculator with your branding, your pricing, your products. Replaces your contact form. £200/month.',
  openGraph: {
    title: 'Your Own Solar Calculator. Branded. Live. Converting.',
    description: 'SolaFlow gives your customers an instant solar estimate with YOUR pricing. £200/month.',
    type: 'website',
    images: [{ url: '/og/solaflow.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Own Solar Calculator. Branded. Live. Converting.',
    description: 'SolaFlow gives your customers an instant solar estimate with YOUR pricing. £200/month.',
    images: ['/og/solaflow.jpg'],
  },
}

export default function SolaFlowLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
