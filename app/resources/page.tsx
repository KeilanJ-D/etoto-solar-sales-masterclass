'use client'

import MasterclassNav from '@/components/funnel/MasterclassNav'
import Footer from '@/components/funnel/Footer'
import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Calculator,
  CheckSquare,
  FileText,
  HelpCircle,
  LayoutGrid,
  Package,
  Settings,
  Video,
  Wrench,
} from 'lucide-react'
import { GoogleReviewsBadge } from '@/components/shared/GoogleReviewsBadge'
import { googleReviewsUrl } from '@/lib/social-proof-data'
import { COMPLETE_MASTERCLASS } from '@/lib/pricing'

const isInternalSite = process.env.NEXT_PUBLIC_UNLOCK_ALL === 'true'

const paidSections = [
  {
    title: 'Solar Sales Script',
    description: 'Word-for-word for all 9 steps',
    href: '/sales-script',
    icon: FileText,
    color: '#E8192C',
  },
  {
    title: 'Sales Framework',
    description: 'Visual skeleton of the formula',
    href: '/sales-framework',
    icon: LayoutGrid,
    color: '#3B82F6',
  },
  {
    title: 'Setter Quiz',
    description: '18 scenario-based questions',
    href: '/appointment-quiz',
    icon: CheckSquare,
    color: '#8B5CF6',
  },
  {
    title: 'Formula Cheat Sheet',
    description: 'Calculator reference for calls',
    href: '/formula-cheat-sheet',
    icon: Calculator,
    color: '#10B981',
  },
  {
    title: 'Knowledge Library',
    description: '7 technical topics + glossary',
    href: '/knowledge',
    icon: BookOpen,
    color: '#8B5CF6',
  },
  {
    title: 'Systems Playbooks',
    description: 'SolaFlow · HighLevel · OpenSolar · Discovery',
    href: '/systems',
    icon: Settings,
    color: '#10B981',
  },
  {
    title: 'Inverter Sizing Tool',
    description: 'Interactive UK inverter database',
    href: '/tools/inverter-sizing',
    icon: Wrench,
    color: '#F59E0B',
  },
  {
    title: 'Optimiser ROI Calculator',
    description: 'Visual roof grid, three options compared',
    href: '/tools/optimiser-roi',
    icon: Wrench,
    color: '#F59E0B',
  },
]

const freeResources = [
  {
    title: 'The 9 Steps',
    description: 'The complete formula from first contact to signed contract',
    href: '/steps',
    icon: BookOpen,
  },
  {
    title: 'Live Sales Call',
    description: 'Watch the formula applied in a real conversation',
    href: '/live-call',
    icon: Video,
  },
  {
    title: 'Knowledge Library',
    description: '7 deep technical topics — the rule + decision flow are free',
    href: '/knowledge',
    icon: BookOpen,
  },
  {
    title: 'Knowledge Quiz',
    description: 'Test yourself — 18 questions, 80% to pass',
    href: '/quiz',
    icon: HelpCircle,
  },
  {
    title: 'For Your Role',
    description: 'Curated for setters, reps, partner agencies',
    href: '/for',
    icon: Briefcase,
  },
]

export default function ResourcesPage() {
  return (
    <main className="bg-[#FAFBFC] min-h-screen overflow-x-hidden">
      <MasterclassNav />
      <section className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 bg-[#E8192C] text-white text-sm font-bold rounded-full mb-6 uppercase tracking-wide">
            {isInternalSite ? 'Tools' : 'Resources'}
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Everything in the Masterclass
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed mb-8">
            {isInternalSite
              ? 'Scripts, frameworks, knowledge library, sizing tools, systems playbooks — all unlocked.'
              : 'Sales scripts, technical knowledge, interactive tools, systems playbooks, role portals. The complete operating system.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <span className="px-4 py-2 bg-white/10 rounded-full text-slate-300">
              Instant access
            </span>
            <span className="px-4 py-2 bg-white/10 rounded-full text-slate-300">
              Lifetime updates
            </span>
            <span className="px-4 py-2 bg-white/10 rounded-full text-slate-300">
              Works on mobile + desktop
            </span>
          </div>
        </div>
      </section>

      {/* Free Resources */}
      <section className="py-12 px-4 md:px-6 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Free for everyone
            </h2>
            <p className="text-slate-500">
              The framework, the call recording, the knowledge rules — all free.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {freeResources.map((resource) => {
              const Icon = resource.icon
              return (
                <Link
                  key={resource.href}
                  href={resource.href}
                  className="flex items-center gap-3 p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-slate-200 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-slate-600" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-slate-900 text-sm">
                      {resource.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-snug">
                      {resource.description}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* The Masterclass CTA — hidden on internal */}
      {!isInternalSite && (
        <section className="py-12 md:py-16 px-4 md:px-6 bg-[#FAFBFC]">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/complete-toolkit"
              className="block bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 md:p-8 text-white hover:shadow-2xl transition-all hover:scale-[1.01]"
            >
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#E8192C] flex items-center justify-center flex-shrink-0">
                  <Package className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                    <h3 className="text-xl md:text-2xl font-bold">
                      {COMPLETE_MASTERCLASS.name}
                    </h3>
                    <span className="px-2 py-0.5 bg-[#E8192C]/30 text-[#E8192C] text-xs font-bold rounded-full uppercase">
                      All sections unlocked
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm">
                    Unlocks every section listed below + interactive tools + systems
                    playbooks. Lifetime access.
                  </p>
                </div>
                <div className="text-center sm:text-right flex items-center gap-4">
                  <div>
                    <p className="text-3xl md:text-4xl font-black">
                      {COMPLETE_MASTERCLASS.priceHeadline}
                    </p>
                    <p className="text-sm text-slate-400">
                      {COMPLETE_MASTERCLASS.priceVatNote}
                    </p>
                  </div>
                  <ArrowRight className="w-6 h-6 text-slate-400" />
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* All sections */}
      <section className="py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              {isInternalSite ? 'Your sections' : 'Every section, one purchase'}
            </h2>
            <p className="text-slate-600">
              {isInternalSite
                ? 'Click any section to open it.'
                : 'All eight sections below are included in the Masterclass — no individual purchases.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {paidSections.map((s) => {
              const Icon = s.icon
              return (
                <Link
                  key={s.href}
                  href={s.href}
                  className="group bg-white border border-slate-200 rounded-xl p-5 hover:shadow-lg hover:border-slate-300 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${s.color}15` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: s.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-900 mb-0.5 text-sm sm:text-base">
                        {s.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 leading-snug">
                        {s.description}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 flex-shrink-0 mt-1 group-hover:text-slate-600 transition-colors" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6 bg-white border-t border-slate-100">
        <div className="flex justify-center">
          <GoogleReviewsBadge url={googleReviewsUrl} />
        </div>
      </section>

      <Footer />
    </main>
  )
}
