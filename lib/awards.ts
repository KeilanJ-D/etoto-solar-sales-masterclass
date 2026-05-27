// lib/awards.ts
// ============================================
// Awards + accolades earned by ETOTO Media.
// Lifted from the pitch deck.
// ============================================

export interface Award {
  id: string
  badge: 'Winner' | 'Highly Commended' | 'Finalist'
  title: string
  ceremony: string
  year: number
  recipient: string
  image: string
  accentFrom: string
  accentTo: string
  badgeColor: string
}

export const awards: Award[] = [
  {
    id: 'business-development-director-2026',
    badge: 'Winner',
    title: 'Business Development Director of the Year',
    ceremony: 'South East Energy Efficiency Awards',
    year: 2026,
    recipient: 'Keilan James-Devereux, Co-Founder, ETOTO Media',
    image: '/awards/businessdev_winner.png',
    accentFrom: 'from-amber-500/20',
    accentTo: 'to-yellow-500/10',
    badgeColor: 'bg-amber-500',
  },
  {
    id: 'energy-consultancy-2026',
    badge: 'Highly Commended',
    title: 'Energy Consultancy of the Year',
    ceremony: 'South East Energy Efficiency Awards',
    year: 2026,
    recipient: 'ETOTO Media, Renewable Energy Marketing Specialists',
    image: '/awards/energycons_hc.jpg',
    accentFrom: 'from-slate-400/20',
    accentTo: 'to-slate-300/10',
    badgeColor: 'bg-slate-500',
  },
]
