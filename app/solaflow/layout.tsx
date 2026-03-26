import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SolaFlow — Solar Quote Software | ETOTO Media',
  description: 'Generate solar quotes in 60 seconds. The quote engine trusted by 200+ UK installers. Turn website visitors into qualified leads with instant proposals.',
  openGraph: {
    title: 'SolaFlow — Solar Quote Software',
    description: 'Generate solar quotes in 60 seconds. Trusted by 200+ UK installers.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SolaFlow — Solar Quote Software',
    description: 'Generate solar quotes in 60 seconds. Trusted by 200+ UK installers.',
  },
}

export default function SolaFlowLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
