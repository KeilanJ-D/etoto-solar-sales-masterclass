import type { Metadata } from 'next'

const isInternal = process.env.NEXT_PUBLIC_UNLOCK_ALL === 'true'

export const metadata: Metadata = {
  title: isInternal 
    ? 'Solar ROI Calculator & Formula Cheat Sheet — ETOTO Media' 
    : 'Solar ROI Calculator & Formula Cheat Sheet — ETOTO Solar Sales Masterclass',
  description: isInternal
    ? 'Every formula. A live calculator. Tariff comparisons. The tools that close solar deals.'
    : 'Every formula. A live calculator. Tariff comparisons. The tools that close solar deals. Part of the Complete Masterclass.',
  openGraph: {
    title: 'Every Formula. Every Tool. Always in Your Pocket.',
    description: isInternal
      ? 'The 4 formulas that close solar deals — with a live calculator and tariff comparison table.'
      : 'The 4 formulas that close solar deals — with a live calculator and tariff comparison table. Part of the Complete Masterclass.',
    type: 'website',
    images: [{ url: '/og/formula-cheat-sheet.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Every Formula. Every Tool. Always in Your Pocket.',
    description: isInternal
      ? 'The 4 formulas that close solar deals — with a live calculator and tariff comparison table.'
      : 'The 4 formulas that close solar deals — with a live calculator and tariff comparison table. Part of the Complete Masterclass.',
    images: ['/og/formula-cheat-sheet.jpg'],
  },
}

export default function FormulaCheatSheetLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
