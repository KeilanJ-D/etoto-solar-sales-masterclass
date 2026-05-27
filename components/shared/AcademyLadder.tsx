'use client'

import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Crown,
  Rocket,
  Sparkles,
  Users,
  Wrench,
} from 'lucide-react'
import AnimateOnScroll from './AnimateOnScroll'

interface Tier {
  id: 'masterclass' | 'scaler' | 'core'
  badge: string
  title: string
  subtitle: string
  price: string
  priceNote: string
  commitment: string
  outcome: string
  includes: string[]
  cta: { label: string; href: string }
  accent: 'red' | 'amber' | 'emerald'
  icon: typeof BookOpen
  doneBy: string
  featured?: boolean
}

const TIERS: Tier[] = [
  {
    id: 'masterclass',
    badge: 'Self-serve',
    title: 'The Solar Sales Masterclass',
    subtitle: 'Read it. Run it yourself.',
    price: '£1,000',
    priceNote: '+ VAT · one-time',
    commitment: 'Lifetime access',
    outcome:
      'Your team learns the framework, the technicals and the systems we use to drive £200M+ in client sales.',
    includes: [
      '9-step sales framework + real call audio',
      'Knowledge Library — 7 deep technical topics',
      'Interactive Inverter Sizing + Optimiser ROI tools',
      '4 Systems Playbooks (SolaFlow, HighLevel, OpenSolar, Discovery)',
    ],
    cta: { label: 'Buy the Masterclass', href: '/complete-toolkit' },
    accent: 'red',
    icon: BookOpen,
    doneBy: 'You',
  },
  {
    id: 'scaler',
    badge: 'Done with you',
    title: '90-Day Growth Scaler',
    subtitle: 'We run the lead engine. You keep selling.',
    price: '£3,000',
    priceNote: '/month · 3-month commitment',
    commitment: '£1,500 retainer + £1,500 ad budget',
    outcome: '+2 sales per week within 90 days, or we keep working.',
    includes: [
      'Ads built and run daily',
      'Pre-qualified leads, no autofill',
      'HighLevel CRM set up + automations',
      'SolaFlow embedded on your site',
      'Weekly reporting + sales review',
    ],
    cta: { label: 'Explore the 90-Day Scaler', href: '/agency#scaler' },
    accent: 'amber',
    icon: Rocket,
    doneBy: 'ETOTO + you',
    featured: true,
  },
  {
    id: 'core',
    badge: 'Done for you',
    title: '6-Month Growth Programme',
    subtitle: 'We run the whole pipeline. You scale install capacity.',
    price: '£6,000',
    priceNote: '/month · 6-month commitment',
    commitment: '£3,000 retainer + £3,000 ad budget',
    outcome:
      'Steps you off the tools. Sales coaching, partner unlocks, dedicated rep.',
    includes: [
      'Everything in the 90-Day Scaler',
      'Dedicated appointment setter',
      'Bi-weekly sales training for your team',
      'Founder + Installer Growth Manager assigned',
      'Finance + wholesale partner introductions',
      'Commission-only rep unlock + 30-day guarantee',
    ],
    cta: { label: 'Explore the 6-Month Programme', href: '/agency#core' },
    accent: 'emerald',
    icon: Crown,
    doneBy: 'ETOTO',
  },
]

const ACCENT_STYLES = {
  red: {
    pill: 'bg-[#E8192C]/10 text-[#E8192C] ring-[#E8192C]/20',
    iconBg: 'bg-[#E8192C]',
    button:
      'bg-[#E8192C] hover:bg-[#D01622] text-white shadow-lg shadow-[#E8192C]/25',
    cardRing: 'hover:ring-[#E8192C]/30',
    accent: 'text-[#E8192C]',
    gradient: 'from-[#E8192C]/5 via-transparent to-transparent',
  },
  amber: {
    pill: 'bg-amber-500/10 text-amber-700 ring-amber-500/20',
    iconBg: 'bg-amber-500',
    button:
      'bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/25',
    cardRing: 'hover:ring-amber-500/30',
    accent: 'text-amber-700',
    gradient: 'from-amber-500/5 via-transparent to-transparent',
  },
  emerald: {
    pill: 'bg-emerald-500/10 text-emerald-700 ring-emerald-500/20',
    iconBg: 'bg-emerald-600',
    button:
      'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/25',
    cardRing: 'hover:ring-emerald-500/30',
    accent: 'text-emerald-700',
    gradient: 'from-emerald-500/5 via-transparent to-transparent',
  },
}

export default function AcademyLadder({
  variant = 'full',
  intro = true,
}: {
  variant?: 'full' | 'compact'
  intro?: boolean
}) {
  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#E8192C] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-emerald-500 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {intro && (
          <AnimateOnScroll variant="fade-up">
            <div className="text-center mb-10 sm:mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white rounded-full text-xs sm:text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>The ETOTO Academy</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 mb-3 text-balance">
                Three ways to use what we know.
              </h2>
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                The masterclass is the methodology. The 90-Day Scaler is us running the
                lead engine alongside you. The 6-Month Programme is the whole pipeline,
                done for you. Most clients climb the ladder.
              </p>
            </div>
          </AnimateOnScroll>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
          {TIERS.map((tier, idx) => {
            const styles = ACCENT_STYLES[tier.accent]
            const Icon = tier.icon
            return (
              <AnimateOnScroll
                key={tier.id}
                variant="fade-up"
                delay={idx * 0.1}
                className="h-full"
              >
                <div
                  className={`group h-full bg-white rounded-2xl ring-1 ring-slate-200 ${styles.cardRing} transition-all hover:shadow-2xl hover:-translate-y-1 overflow-hidden flex flex-col ${
                    tier.featured ? 'ring-2 ring-amber-400/40 lg:scale-[1.02]' : ''
                  }`}
                >
                  {tier.featured && (
                    <div className="bg-amber-400 text-amber-900 text-xs font-bold py-1.5 px-4 text-center uppercase tracking-wide">
                      Most clients start here
                    </div>
                  )}

                  <div
                    className={`p-6 sm:p-7 bg-gradient-to-br ${styles.gradient} flex-1 flex flex-col`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div
                        className={`w-12 h-12 rounded-xl ${styles.iconBg} flex items-center justify-center shadow-md`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span
                        className={`inline-flex items-center text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ring-1 ${styles.pill}`}
                      >
                        {tier.badge}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight mb-1">
                      {tier.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 mb-5">
                      {tier.subtitle}
                    </p>

                    <div className="mb-5">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-3xl sm:text-4xl font-black text-slate-900">
                          {tier.price}
                        </span>
                        <span className="text-slate-500 text-sm">{tier.priceNote}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{tier.commitment}</p>
                    </div>

                    <div
                      className={`rounded-xl p-3.5 bg-slate-50 border border-slate-100 mb-5`}
                    >
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
                        Outcome
                      </p>
                      <p className="text-sm text-slate-800 font-medium leading-relaxed">
                        {tier.outcome}
                      </p>
                    </div>

                    {variant === 'full' && (
                      <ul className="space-y-2 mb-6 text-sm flex-1">
                        {tier.includes.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-slate-700">
                            <ArrowRight
                              className={`w-3.5 h-3.5 ${styles.accent} flex-shrink-0 mt-1`}
                            />
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="pt-2 mt-auto">
                      <Link
                        href={tier.cta.href}
                        className={`flex items-center justify-center gap-2 w-full ${styles.button} font-bold py-3 px-5 rounded-xl transition-all min-h-[48px]`}
                      >
                        <span>{tier.cta.label}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      <p className="text-center text-xs text-slate-500 mt-2.5">
                        Done by:{' '}
                        <span className="font-semibold text-slate-700">
                          {tier.doneBy}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            )
          })}
        </div>

        <AnimateOnScroll variant="fade-up" delay={0.4}>
          <div className="mt-10 sm:mt-12 text-center">
            <p className="text-sm text-slate-600 max-w-2xl mx-auto">
              <Users className="inline w-4 h-4 mr-1.5 text-slate-400" />
              Clients typically start with the 90-Day Scaler and graduate to the 6-Month
              Programme once the lead engine is proven.
            </p>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
