import type { Metadata } from 'next'

const isInternal = process.env.NEXT_PUBLIC_UNLOCK_ALL === 'true'

export const metadata: Metadata = {
  title: isInternal 
    ? 'Solar ROI Calculator & Formula Cheat Sheet — ETOTO Media' 
    : 'Solar ROI Calculator & Formula Cheat Sheet (£3.99) — ETOTO Media',
  description: isInternal
    ? 'Every formula. A live calculator. Tariff comparisons. The tools that close solar deals.'
    : 'Every formula. A live calculator. Tariff comparisons. The tools that close solar deals. £3.99.',
  openGraph: {
    title: 'Every Formula. Every Tool. Always in Your Pocket.',
    description: isInternal
      ? 'The 4 formulas that close solar deals — with a live calculator and tariff comparison table.'
      : 'The 4 formulas that close solar deals — with a live calculator and tariff comparison table. £3.99.',
    type: 'website',
    images: [{ url: '/og/formula-cheat-sheet.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Every Formula. Every Tool. Always in Your Pocket.',
    description: isInternal
      ? 'The 4 formulas that close solar deals — with a live calculator and tariff comparison table.'
      : 'The 4 formulas that close solar deals — with a live calculator and tariff comparison table. £3.99.',
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
