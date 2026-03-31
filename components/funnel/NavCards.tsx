'use client'

import Link from 'next/link'
import { ListOrdered, Video, Phone, HelpCircle, Calculator, Package, ArrowRight } from 'lucide-react'

const ctaCards = [
  {
    icon: ListOrdered,
    title: 'The 9 Steps',
    description: 'The complete formula',
    href: '/steps',
    cta: 'Start Learning',
    accent: '#E8192C',
    featured: false,
  },
  {
    icon: Video,
    title: 'Live Sales Call',
    description: 'Watch it happen',
    href: '/live-call',
    cta: 'Watch Now',
    accent: '#3B82F6',
    featured: false,
  },
  {
    icon: Phone,
    title: 'Appointment Setting',
    description: 'The setter playbook',
    href: '/appointment-setting',
    cta: 'Read the Playbook',
    accent: '#8B5CF6',
    featured: false,
  },
  {
    icon: HelpCircle,
    title: 'Knowledge Quiz',
    description: '18 questions, 80% to pass',
    href: '/quiz',
    cta: 'Test Yourself',
    accent: '#F59E0B',
    featured: false,
  },
  {
    icon: Calculator,
    title: 'Calculator',
    description: 'Build a system live',
    href: '/steps#formula-calculator',
    cta: 'Try It',
    accent: '#10B981',
    featured: true,
  },
  {
    icon: Package,
    title: 'Resources & Toolkit',
    description: 'Scripts, frameworks, and more',
    href: '/resources',
    cta: 'Browse',
    accent: '#6366F1',
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
            className={`group relative bg-white border rounded-lg sm:rounded-xl p-4 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
              card.featured
                ? 'border-emerald-200 ring-2 ring-emerald-100'
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
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${card.accent}15` }}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: card.accent }} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-0.5 sm:mb-1">{card.title}</h3>
                <p className="text-xs sm:text-sm text-slate-500 mb-2 sm:mb-3">{card.description}</p>
                <span
                  className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium group-hover:gap-2 transition-all"
                  style={{ color: card.accent }}
                >
                  {card.cta}
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </span>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
