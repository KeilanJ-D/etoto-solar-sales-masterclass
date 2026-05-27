'use client'

import { useState, useEffect } from 'react'
import {
  AlertCircle,
  ArrowRight,
  Banknote,
  BookOpen,
  Briefcase,
  Calculator,
  Check,
  ClipboardList,
  FileText,
  HelpCircle,
  Infinity as InfinityIcon,
  Lock,
  Package,
  Settings,
  Sparkles,
  Unlock,
  Wrench,
} from 'lucide-react'
import Link from 'next/link'
import ProductFooter from '@/components/products/ProductFooter'
import { StatsBanner } from '@/components/shared/StatsBanner'
import { TestimonialRow } from '@/components/shared/TestimonialRow'
import { GoogleReviewsBadge } from '@/components/shared/GoogleReviewsBadge'
import { googleReviewsUrl } from '@/lib/social-proof-data'
import { stats, getTestimonialsByIds } from '@/lib/social-proof-data'
import MasterclassNav from '@/components/funnel/MasterclassNav'
import { COMPLETE_MASTERCLASS } from '@/lib/pricing'
import RecognitionSection from '@/components/shared/RecognitionSection'
import AcademyLadder from '@/components/shared/AcademyLadder'

const pillars = [
  {
    icon: ClipboardList,
    title: 'The 9-Step Sales Framework',
    description:
      'Rapport, discovery, energy audit, battery value, solar value, financials, objections, close, follow-up. Word-for-word scripts, real call audio, every step explained.',
    items: [
      'Full script for every step (copy/paste ready)',
      'Audio examples from a real 45-minute closing call',
      'Flexible framework template for personalisation',
      '18-question appointment-setter quiz with instant scoring',
    ],
    href: '/steps',
  },
  {
    icon: BookOpen,
    title: 'Technical Knowledge Library',
    description:
      'Seven deep technical topics that make your reps indistinguishable from a technical sales engineer.',
    items: [
      'Inverter sizing — including the DC:AC ratio + DNO logic',
      'Battery + inverter pairing (the £350 upgrade that pays back in 18 months)',
      'Strings, MPPT and the £200/year that nobody talks about',
      'Optimisers vs bigger inverter vs Aiko — the £80 decision',
      'Single vs three-phase + G98/G99 compliance',
      'Panel selection — Aiko vs Longi vs JA Solar vs Trina',
      'Full system design walkthrough + searchable glossary',
    ],
    href: '/knowledge',
  },
  {
    icon: Wrench,
    title: 'Interactive Sizing Tools',
    description:
      'Real software with the UK inverter database, real maths, real DNO checks. Use them on the doorstep.',
    items: [
      'Inverter Sizing Tool — PV + battery + phase + tariff → recommended inverter + reasoning',
      'Optimiser ROI Calculator — clickable roof grid, three options compared with £ payback',
      'Live formula calculator with battery product data + UK tariff rates',
    ],
    href: '/tools/inverter-sizing',
  },
  {
    icon: Settings,
    title: 'Four Systems Playbooks',
    description:
      'Operator manuals for the systems your business actually runs on. New hires onboarded in 2 days, not 2 months.',
    items: [
      'SolaFlow Operator\'s Manual — every screen, every shortcut, every scenario',
      'HighLevel CRM Playbook — 7 pipelines, 12 automations, 8 smart lists, 6 message templates',
      'OpenSolar end-to-end design workflow',
      'Customer Discovery Mastery — the full question library, organised by intel type',
    ],
    href: '/systems',
  },
  {
    icon: Briefcase,
    title: 'Role-Based Portals',
    description:
      'Curated entry points for setters, sales reps, and partner agencies. Same masterclass, three different operating angles.',
    items: [
      'For appointment setters — daily rhythm + technical primer',
      'For sales reps — full framework + technical + systems',
      'For partner agencies — source of truth + standards + onboarding path',
    ],
    href: '/for',
  },
]

export default function CompleteMasterclassPage() {
  const bundleTestimonials = getTestimonialsByIds(['yeers', 'alltech', 'halo'])

  const isInternalSite = process.env.NEXT_PUBLIC_UNLOCK_ALL === 'true'

  const [hasAccess, setHasAccess] = useState(isInternalSite)
  const [isChecking, setIsChecking] = useState(!isInternalSite)
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showCodeForm, setShowCodeForm] = useState(false)

  const productId = COMPLETE_MASTERCLASS.productId

  useEffect(() => {
    if (isInternalSite) return
    const storedToken = localStorage.getItem(`access_${productId}`)
    if (storedToken) {
      verifyStoredToken(storedToken)
    } else {
      setIsChecking(false)
    }
  }, [isInternalSite, productId])

  const verifyStoredToken = async (token: string) => {
    try {
      const res = await fetch('/api/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, token }),
      })
      const data = await res.json()
      if (data.valid) setHasAccess(true)
      else localStorage.removeItem(`access_${productId}`)
    } catch {
      setHasAccess(true)
    } finally {
      setIsChecking(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    try {
      const res = await fetch('/api/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, code: inputValue.toUpperCase().trim() }),
      })
      const data = await res.json()
      if (data.valid) {
        localStorage.setItem(`access_${productId}`, data.token)
        setHasAccess(true)
      } else {
        setError('Invalid access code. Please check your purchase confirmation email.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleBuy = () => {
    if (COMPLETE_MASTERCLASS.stripeLink.includes('REPLACE_WITH')) {
      window.location.href =
        'mailto:keilan.jd@etotomedia.com?subject=Solar%20Sales%20Masterclass%20%E2%80%94%20Purchase%20Enquiry&body=Hi%20Keilan%2C%0A%0AI%27d%20like%20to%20buy%20the%20Solar%20Sales%20Masterclass.%20Please%20send%20me%20the%20payment%20link.'
    } else {
      window.open(COMPLETE_MASTERCLASS.stripeLink, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <main className="bg-[#FAFBFC] min-h-screen">
      <MasterclassNav />

      {/* HERO */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-white py-14 md:py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#E8192C] rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-amber-500 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-[#E8192C]/20 text-[#E8192C] px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Package className="w-4 h-4" />
            <span>The Complete Masterclass</span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-5 leading-tight text-balance">
            {isInternalSite
              ? COMPLETE_MASTERCLASS.name
              : 'The complete solar sales operating system.'}
          </h1>

          <p className="text-base md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            {isInternalSite
              ? 'Framework, knowledge, tools, systems. The whole stack — all unlocked for you.'
              : 'Framework, technical knowledge, interactive sizing tools and four systems playbooks. The same operating system used by 200+ UK installers to drive £200M+ in client sales.'}
          </p>

          {!isInternalSite && (
            <>
              <div className="mb-7">
                <p className="text-sm text-slate-400 mb-2">
                  Comparable consulting + training value:{' '}
                  <span className="line-through">
                    {COMPLETE_MASTERCLASS.comparableValueHeadline}
                  </span>
                </p>
                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="text-5xl md:text-7xl font-black text-white">
                    {COMPLETE_MASTERCLASS.priceHeadline}
                  </span>
                  <span className="text-slate-400 text-2xl">
                    {COMPLETE_MASTERCLASS.priceVatNote}
                  </span>
                </div>
                <p className="text-emerald-400 font-medium">
                  or {COMPLETE_MASTERCLASS.priceMonthly}
                </p>
              </div>

              {isChecking ? (
                <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
              ) : hasAccess ? (
                <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-6 py-3 rounded-full font-medium">
                  <Check className="w-5 h-5" />
                  <span>You have full access — scroll down to view your masterclass</span>
                </div>
              ) : (
                <div className="space-y-4 max-w-xl mx-auto">
                  <button
                    onClick={handleBuy}
                    className="inline-flex w-full items-center justify-center gap-2 bg-[#E8192C] hover:bg-[#D01622] text-white font-bold py-4 px-8 rounded-full transition-all min-h-[56px] text-base sm:text-lg shadow-lg shadow-[#E8192C]/30"
                  >
                    <span>
                      Pay in full — {COMPLETE_MASTERCLASS.priceHeadline}{' '}
                      {COMPLETE_MASTERCLASS.priceVatNote}
                    </span>
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-white/15" />
                    <span className="text-xs text-slate-400 uppercase tracking-wider">
                      or
                    </span>
                    <div className="flex-1 h-px bg-white/15" />
                  </div>

                  <a
                    href={COMPLETE_MASTERCLASS.iwocaPayLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold py-3.5 px-6 rounded-full transition-all min-h-[52px] text-sm sm:text-base"
                  >
                    <Banknote className="w-5 h-5 text-emerald-400" />
                    <span>
                      Apply for iwocaPay finance — {COMPLETE_MASTERCLASS.iwocaPayDeposit},
                      then {COMPLETE_MASTERCLASS.iwocaPayMonthly}
                    </span>
                  </a>

                  <p className="text-slate-400 text-xs">
                    {COMPLETE_MASTERCLASS.iwocaPaySubtext} ·{' '}
                    {COMPLETE_MASTERCLASS.accessNote}
                  </p>

                  <button
                    onClick={() => setShowCodeForm(!showCodeForm)}
                    className="text-slate-500 text-sm underline hover:text-white transition-colors"
                  >
                    Already purchased? Enter your code
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Stats Banner */}
      <StatsBanner stats={stats} />

      {/* Access code form */}
      {!isInternalSite && !hasAccess && !isChecking && showCodeForm && (
        <section className="py-12 px-4 bg-white border-b border-slate-200">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#E8192C]/10 flex items-center justify-center mx-auto mb-3">
                <Lock className="w-6 h-6 text-[#E8192C]" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Enter your access code
              </h3>
              <p className="text-slate-500 text-sm">
                Check your purchase confirmation email
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="e.g. MASTER-2026"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl text-base text-center focus:ring-2 focus:ring-[#E8192C]/20 focus:border-[#E8192C] outline-none transition-all uppercase font-mono tracking-wider"
                autoComplete="off"
                autoCapitalize="characters"
                autoFocus
              />
              {error && (
                <div className="flex items-start gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl transition-all"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Unlock className="w-5 h-5" />
                    <span>Unlock the Masterclass</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </section>
      )}

      {/* WHAT'S INSIDE — five pillars */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#E8192C] mb-3">
              What&apos;s inside
            </p>
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-3 text-balance">
              Five pillars. One operating system.
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Not a course. Not a toolkit. A complete operating system that runs the
              sales side of a solar installer business — from doorstep script to
              back-office automation.
            </p>
          </div>

          <div className="space-y-5">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon
              return (
                <div
                  key={pillar.title}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-[#E8192C]/30 hover:shadow-lg transition-all"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3">
                    <div className="md:col-span-1 bg-gradient-to-br from-slate-50 to-white p-6 sm:p-8 border-b md:border-b-0 md:border-r border-slate-200 flex flex-col justify-between">
                      <div>
                        <div className="w-12 h-12 rounded-2xl bg-[#E8192C]/10 flex items-center justify-center mb-4">
                          <Icon className="w-6 h-6 text-[#E8192C]" />
                        </div>
                        <p className="text-xs font-semibold uppercase text-slate-500 mb-1">
                          Pillar {idx + 1}
                        </p>
                        <h3 className="font-black text-slate-900 text-xl mb-3 leading-tight">
                          {pillar.title}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          {pillar.description}
                        </p>
                      </div>
                      {(hasAccess || isInternalSite) && (
                        <Link
                          href={pillar.href}
                          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#E8192C] hover:underline"
                        >
                          Open
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                    <div className="md:col-span-2 p-6 sm:p-8">
                      <ul className="space-y-2.5">
                        {pillar.items.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2.5 text-sm text-slate-700 leading-relaxed"
                          >
                            <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-1" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* VALUE BREAKDOWN - hidden on internal site */}
      {!isInternalSite && (
        <section className="bg-slate-900 text-white py-16 md:py-24 px-4 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#E8192C] rounded-full blur-3xl" />
          </div>
          <div className="max-w-3xl mx-auto text-center relative">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#E8192C] mb-3">
              What it would cost otherwise
            </p>
            <h2 className="text-2xl md:text-4xl font-black mb-3 text-balance">
              {COMPLETE_MASTERCLASS.comparableValueHeadline}+ of consulting,
              <br />
              software and training in one purchase.
            </h2>
            <p className="text-slate-400 mb-10 max-w-xl mx-auto">
              Built and refined over 6 years working with 200+ UK installers. Buying it
              piece by piece would look like this:
            </p>

            <div className="space-y-2 mb-10 text-left max-w-2xl mx-auto">
              {COMPLETE_MASTERCLASS.comparableBreakdown.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between bg-white/5 hover:bg-white/10 transition-colors rounded-xl p-4"
                >
                  <span className="text-slate-300 text-sm sm:text-base flex-1 pr-4">
                    {item.label}
                  </span>
                  <span className="font-bold text-white whitespace-nowrap">
                    {item.value}
                  </span>
                </div>
              ))}
              <div className="border-t border-white/20 pt-6 mt-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-slate-300 text-base sm:text-lg">
                    Approximate equivalent value
                  </span>
                  <span className="text-slate-400 line-through text-base sm:text-lg">
                    {COMPLETE_MASTERCLASS.comparableValueHeadline}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xl sm:text-2xl text-white">
                    Your price today
                  </span>
                  <div className="text-right">
                    <span className="font-black text-3xl sm:text-4xl text-[#E8192C]">
                      {COMPLETE_MASTERCLASS.priceHeadline}
                    </span>
                    <span className="text-slate-400 ml-1">
                      {COMPLETE_MASTERCLASS.priceVatNote}
                    </span>
                  </div>
                </div>
                <p className="text-emerald-400 text-sm mt-2 text-right">
                  or {COMPLETE_MASTERCLASS.priceMonthly}
                </p>
              </div>
            </div>

            {!hasAccess && (
              <button
                onClick={handleBuy}
                className="inline-flex items-center gap-2 bg-[#E8192C] hover:bg-[#D01622] text-white font-bold py-4 px-8 rounded-full transition-all text-base sm:text-lg shadow-lg shadow-[#E8192C]/30"
              >
                <span>
                  Buy the Masterclass — {COMPLETE_MASTERCLASS.priceHeadline}{' '}
                  {COMPLETE_MASTERCLASS.priceVatNote}
                </span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </section>
      )}

      {/* GUARANTEES */}
      {!isInternalSite && (
        <section className="py-12 md:py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-slate-50 rounded-2xl p-5 sm:p-6 text-center">
                <InfinityIcon className="w-8 h-8 text-[#E8192C] mx-auto mb-2" />
                <p className="font-bold text-slate-900 mb-1">Lifetime access</p>
                <p className="text-xs sm:text-sm text-slate-600">
                  One purchase. All future updates included. No subscription.
                </p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-5 sm:p-6 text-center">
                <Sparkles className="w-8 h-8 text-[#E8192C] mx-auto mb-2" />
                <p className="font-bold text-slate-900 mb-1">14-day refund</p>
                <p className="text-xs sm:text-sm text-slate-600">
                  Full money-back guarantee. No questions if it isn&apos;t for you.
                </p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-5 sm:p-6 text-center">
                <Briefcase className="w-8 h-8 text-[#E8192C] mx-auto mb-2" />
                <p className="font-bold text-slate-900 mb-1">Team-ready</p>
                <p className="text-xs sm:text-sm text-slate-600">
                  Need multi-seat for your sales team or partner agency?{' '}
                  <a
                    href="mailto:keilan.jd@etotomedia.com?subject=Masterclass%20team%20licence"
                    className="text-[#E8192C] underline"
                  >
                    Contact us
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ - hidden on internal site */}
      {!isInternalSite && (
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-12">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: 'What exactly do I get for £1,000?',
                  a: 'Permanent access to every page on this site that\'s currently behind a paywall — the full 9-step script, the technical knowledge library, the interactive sizing tools, and all four systems playbooks (SolaFlow, HighLevel, OpenSolar, Customer Discovery). Plus every update we publish, forever.',
                },
                {
                  q: 'Why is it £1,000 — not £49 like other courses?',
                  a: 'Because this isn\'t a course. It\'s the operating system we use to run sales for our own clients (£200M+ in client sales). A solar installer business that adopts this typically adds £500K – £2M in annual sales within 6 months. We\'re selling at <0.5% of the value it creates.',
                },
                {
                  q: 'Can I buy individual pieces instead of the full masterclass?',
                  a: 'No — the value comes from the whole stack working together. The framework needs the technical knowledge needs the systems needs the discovery library. Individual pieces leave too much on the table.',
                },
                {
                  q: 'Is there a refund policy?',
                  a: 'Yes — 14-day full money-back guarantee, no questions asked. If the masterclass isn\'t for you, email us and we refund.',
                },
                {
                  q: 'Can I share access with my team?',
                  a: 'Single-seat licence is one device. For team or partner-agency multi-seat licences, contact us for pricing. We have a separate model for installer teams.',
                },
                {
                  q: 'Will the content stay current?',
                  a: 'Yes. Every update — new inverter models, new tariffs, new SolaFlow features, new playbooks — is included free. The library compounds in value over time.',
                },
              ].map((item, idx) => (
                <details
                  key={idx}
                  className="group bg-white rounded-xl border border-slate-200"
                >
                  <summary className="px-5 py-4 sm:px-6 sm:py-5 cursor-pointer flex items-start gap-3 list-none">
                    <span className="font-bold text-slate-900 text-sm sm:text-base flex-1 pr-4">
                      {item.q}
                    </span>
                    <span className="text-slate-400 group-open:rotate-180 transition-transform flex-shrink-0">
                      ▼
                    </span>
                  </summary>
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 -mt-1 text-slate-700 text-sm sm:text-base leading-relaxed">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recognition — awards lifted from pitch deck */}
      {!isInternalSite && <RecognitionSection variant="compact" />}

      {/* Testimonials */}
      <TestimonialRow
        testimonials={bundleTestimonials}
        title="Join 200+ UK solar installers"
      />

      {/* Academy ladder — "the bigger picture" */}
      {!isInternalSite && <AcademyLadder />}

      {/* Google Reviews Badge */}
      <section className="py-8 px-4 sm:px-6 bg-slate-50 border-t border-slate-100">
        <div className="flex justify-center">
          <GoogleReviewsBadge url={googleReviewsUrl} />
        </div>
      </section>

      {/* Final CTA - hidden on internal site */}
      {!isInternalSite && !hasAccess && (
        <section className="bg-slate-900 text-white py-12 sm:py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 text-balance">
              Ready to run a turnkey solar sales operation?
            </h2>
            <p className="text-slate-300 mb-7 max-w-xl mx-auto">
              One purchase. Lifetime access. Free updates forever.
            </p>
            <button
              onClick={handleBuy}
              className="inline-flex items-center gap-2 bg-[#E8192C] hover:bg-[#D01622] text-white font-bold py-4 px-8 rounded-full transition-all text-base sm:text-lg"
            >
              <span>
                Buy the Masterclass — {COMPLETE_MASTERCLASS.priceHeadline}{' '}
                {COMPLETE_MASTERCLASS.priceVatNote}
              </span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>
      )}

      <ProductFooter />
    </main>
  )
}
