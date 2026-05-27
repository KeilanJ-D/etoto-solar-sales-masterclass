'use client'

import Link from 'next/link'
import { Award, Briefcase, ListOrdered, Video, BookOpen, Settings, Calculator, Users, ArrowRight, Wrench } from 'lucide-react'

const ctaCards = [
  {
    icon: ListOrdered,
    title: 'The 9 Steps',
    description: 'The complete sales formula',
    href: '/steps',
    cta: 'Start Learning',
    accent: '#E8192C',
    featured: false,
  },
  {
    icon: BookOpen,
    title: 'Knowledge Library',
    description: 'Inverter sizing, MPPT, optimisers, phase logic',
    href: '/knowledge',
    cta: 'Browse Library',
    accent: '#8B5CF6',
    featured: true,
  },
  {
    icon: Settings,
    title: 'Systems Playbooks',
    description: 'SolaFlow · HighLevel · OpenSolar · Discovery',
    href: '/systems',
    cta: 'Open Playbooks',
    accent: '#10B981',
    featured: false,
  },
  {
    icon: Wrench,
    title: 'Interactive Tools',
    description: 'Inverter sizing tool + optimiser ROI calculator',
    href: '/tools/inverter-sizing',
    cta: 'Try the Tools',
    accent: '#F59E0B',
    featured: false,
  },
  {
    icon: Video,
    title: 'Live Sales Call',
    description: 'Real 45-min call recording',
    href: '/live-call',
    cta: 'Watch Now',
    accent: '#3B82F6',
    featured: false,
  },
  {
    icon: Users,
    title: 'For Your Role',
    description: 'Setters · Reps · Partner agencies',
    href: '/for',
    cta: 'Pick Your Role',
    accent: '#6366F1',
    featured: false,
  },
  {
    icon: Calculator,
    title: 'Formula Calculator',
    description: 'Build a system live with full maths',
    href: '/steps#formula-calculator',
    cta: 'Try It',
    accent: '#EC4899',
    featured: false,
  },
  {
    icon: Award,
    title: 'Case Studies',
    description: '£1.1M pipeline in 7 weeks · 67 sales/month · 9 real client stories',
    href: '/case-studies',
    cta: 'Read the Stories',
    accent: '#0EA5E9',
    featured: false,
  },
  {
    icon: Briefcase,
    title: 'Work with ETOTO',
    description: 'The agency behind the masterclass · 90-Day & 6-Month programmes',
    href: '/agency',
    cta: 'Explore the Agency',
    accent: '#14B8A6',
    featured: false,
  },
]

export default function NavCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
      {ctaCards.map((card) => {
        const Icon = card.icon
        return (
          <Link
            key={card.href}
            href={card.href}
            className={`group relative bg-white border rounded-lg sm:rounded-xl p-4 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.99] ${
              card.featured
                ? 'border-emerald-200 ring-2 ring-emerald-100 hover:ring-emerald-200'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            {card.featured && (
              <span className="absolute -top-2.5 right-4 bg-emerald-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                Most Popular
              </span>
            )}

            <div className="flex items-start gap-3 sm:gap-4">
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                style={{ 
                  backgroundColor: `${card.accent}15`,
                  boxShadow: 'none',
                }}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:scale-110" style={{ color: card.accent }} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-0.5 sm:mb-1">{card.title}</h3>
                <p className="text-xs sm:text-sm text-slate-500 mb-2 sm:mb-3">{card.description}</p>
                <span
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium transition-all"
                  style={{ color: card.accent }}
                >
                  {card.cta}
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
