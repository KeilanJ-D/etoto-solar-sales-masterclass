'use client'

import Link from 'next/link'
import { ArrowRight, ArrowUpRight, BookOpen, Calculator, Clock, MessageSquare, Sparkles, Wrench, XCircle } from 'lucide-react'
import type { KnowledgeTopic } from '@/lib/knowledge/types'
import { knowledgeBySlug, knowledgeCategoryLabels } from '@/lib/knowledge/registry'
import GatedSection from './GatedSection'
import DoneForYouCard from '@/components/shared/DoneForYouCard'

const DONE_FOR_YOU_BY_TOPIC: Record<
  string,
  { title: string; body: string }
> = {
  'inverter-sizing': {
    title: 'Want our team to spec inverters for your jobs?',
    body: 'The 6-Month Programme includes weekly sales review where we audit every quote together — inverter selection, DC:AC ratio, DNO classification. No more midnight WhatsApps to a wholesaler.',
  },
  'battery-and-inverter': {
    title: 'Want this maths automated for every customer?',
    body: 'SolaFlow does this in real time on your website. Your customer enters their bill and tariff, the system pairs inverter + battery for their use case. Included in both the 90-Day Scaler and 6-Month Programme.',
  },
  'strings-and-mppt': {
    title: 'Want your designers trained on this in person?',
    body: 'Bi-weekly sales training in the 6-Month Programme covers stringing, MPPT and optimiser decisions with your team — using real OpenSolar designs from your active pipeline.',
  },
  optimisers: {
    title: 'Want a partner that gets you Aiko + Tigo at trade?',
    body: 'Direct wholesale partner intros (Sigenergy, EcoFlow, Anker, plus optimiser brands) come with the 6-Month Programme. Margin you can\'t access alone.',
  },
  'single-vs-three-phase': {
    title: 'Want G99 paperwork off your plate?',
    body: 'The 6-Month Programme assigns you a dedicated Installer Growth Manager who handles DNO applications, scaffolding bookings, and the back-office that slows installs down.',
  },
  'panel-selection': {
    title: 'Want direct wholesale on the panel brands you spec?',
    body: 'Direct relationships with Aiko, JA Solar, Longi, Trina via our partner network. Margin most installers can\'t access — included in the 6-Month Programme.',
  },
  'system-design-walkthrough': {
    title: 'Want this design workflow built into your business?',
    body: 'Onboarding the 90-Day Scaler installs SolaFlow on your site and wires it to your CRM. The whole design-to-quote workflow runs in real time, not in your head.',
  },
}

const accentClasses: Record<string, string> = {
  red: 'bg-[#E8192C]/10 border-[#E8192C]/30 text-[#E8192C]',
  amber: 'bg-amber-50 border-amber-200 text-amber-900',
  emerald: 'bg-emerald-50 border-emerald-200 text-emerald-900',
  blue: 'bg-blue-50 border-blue-200 text-blue-900',
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return iso
  }
}

export default function KnowledgePage({ topic }: { topic: KnowledgeTopic }) {
  return (
    <article className="bg-white">
      {/* HERO */}
      <section className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm mb-4">
            <Link
              href="/knowledge"
              className="inline-flex items-center gap-1.5 text-slate-500 hover:text-[#E8192C] transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Knowledge Library
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-700 font-medium">
              {knowledgeCategoryLabels[topic.category]}
            </span>
            <span className="inline-flex items-center gap-1 text-slate-500 ml-auto">
              <Clock className="w-3.5 h-3.5" />
              {topic.estReadMinutes} min read
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-4 text-balance leading-tight">
            {topic.title}
          </h1>

          <div className="bg-[#E8192C] text-white rounded-xl p-5 sm:p-6 my-6 shadow-lg shadow-[#E8192C]/20">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-wide opacity-80 mb-2">
              The Rule
            </p>
            <p className="text-base sm:text-lg md:text-xl font-bold leading-snug">
              {topic.oneLineRule}
            </p>
          </div>

          <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
            <span className="font-semibold text-slate-900">Who this is for: </span>
            {topic.intent}
          </p>
        </div>
      </section>

      {/* LONG RULE (free) */}
      <section className="px-4 sm:px-6 lg:px-8 py-10 sm:py-14 border-b border-slate-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#E8192C] mb-3">
            Why this rule works
          </h2>
          <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
            {topic.longRule}
          </p>
        </div>
      </section>

      {/* DECISION FLOW (free) */}
      <section className="px-4 sm:px-6 lg:px-8 py-10 sm:py-14 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-[#E8192C]/10 flex items-center justify-center">
              <Wrench className="w-5 h-5 text-[#E8192C]" />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">
              Decision Flow
            </h2>
          </div>
          {topic.decisionFlow.intro && (
            <p className="text-slate-600 mb-8 text-sm sm:text-base">
              {topic.decisionFlow.intro}
            </p>
          )}

          <div className="space-y-6 sm:space-y-8">
            {topic.decisionFlow.steps.map((step, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden"
              >
                <div className="bg-slate-900 text-white px-5 sm:px-6 py-4 flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#E8192C] flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {i + 1}
                  </span>
                  <h3 className="font-bold text-base sm:text-lg">{step.question}</h3>
                </div>
                <div className="divide-y divide-slate-100">
                  {step.options.map((opt, j) => (
                    <div
                      key={j}
                      className="px-5 sm:px-6 py-4 sm:py-5 flex flex-col sm:flex-row gap-3 sm:gap-5"
                    >
                      <div className="sm:w-1/3 flex-shrink-0">
                        <span
                          className={`inline-flex items-start text-sm font-semibold rounded-lg px-3 py-2 border ${
                            accentClasses[opt.accent || 'blue']
                          }`}
                        >
                          {opt.label}
                        </span>
                      </div>
                      <div className="sm:w-2/3 text-slate-700 text-sm sm:text-base leading-relaxed">
                        {opt.outcome}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISTAKES (free) */}
      <section className="px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">
              Mistakes That Cost You the Job
            </h2>
          </div>
          <p className="text-slate-600 mb-8 text-sm sm:text-base">
            Every one of these is something we&apos;ve seen reps do — including ours, before we
            wrote them down.
          </p>

          <div className="grid grid-cols-1 gap-4 sm:gap-5">
            {topic.mistakes.map((m, i) => (
              <div
                key={i}
                className="bg-white border-l-4 border-red-500 rounded-r-xl shadow-sm p-5 sm:p-6"
              >
                <p className="font-bold text-slate-900 text-base sm:text-lg mb-3 leading-snug">
                  {m.mistake}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 text-sm">
                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-500 mb-1">
                      Why it happens
                    </p>
                    <p className="text-slate-700 leading-relaxed">{m.whyItHappens}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase text-red-600 mb-1">
                      What it costs
                    </p>
                    <p className="text-slate-700 leading-relaxed">{m.costOfMistake}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase text-emerald-600 mb-1">
                      The fix
                    </p>
                    <p className="text-slate-700 leading-relaxed">{m.fix}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MATHS (GATED) */}
      <section className="px-4 sm:px-6 lg:px-8 py-10 sm:py-14 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
              <Calculator className="w-5 h-5 text-emerald-600" />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">
              Worked Examples
            </h2>
          </div>
          <p className="text-slate-600 mb-6 text-sm sm:text-base">
            Real scenarios with the maths. Drop these into a quote and the customer goes
            quiet — the good kind of quiet.
          </p>

          <GatedSection
            unlockTitle="Unlock the worked examples + sales scripts"
            unlockSubtitle="Real scenarios per topic with full maths breakdowns, plus the exact words to say when the customer pushes back. Part of the Complete Masterclass."
          >
            <div className="space-y-6">
              {topic.maths.map((m, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600 mb-2">
                    Scenario {i + 1}
                  </p>
                  <p className="text-slate-900 font-semibold text-base sm:text-lg mb-4 leading-snug">
                    {m.scenario}
                  </p>

                  <div className="bg-slate-50 rounded-xl p-4 mb-4">
                    <p className="text-xs font-semibold uppercase text-slate-500 mb-2">
                      Inputs
                    </p>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                      {m.inputs.map((inp, idx) => (
                        <div key={idx} className="flex gap-2">
                          <dt className="text-slate-500 font-medium">{inp.label}:</dt>
                          <dd className="text-slate-900 font-semibold">{inp.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  <div className="space-y-3 mb-4">
                    {m.steps.map((s, idx) => (
                      <div
                        key={idx}
                        className="border-l-2 border-[#E8192C] pl-4 py-1"
                      >
                        <code className="block text-sm sm:text-base font-mono text-slate-800 bg-slate-50 px-3 py-2 rounded">
                          {s.formula}
                        </code>
                        <p className="text-slate-700 font-semibold text-sm sm:text-base mt-2">
                          → {s.result}
                        </p>
                        {s.explanation && (
                          <p className="text-slate-500 text-xs sm:text-sm mt-1">{s.explanation}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                    <p className="text-xs font-semibold uppercase text-emerald-700 mb-1">
                      Final spec
                    </p>
                    <p className="text-slate-900 text-sm sm:text-base leading-relaxed">
                      {m.outcome}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </GatedSection>
        </div>
      </section>

      {/* SALES SCRIPTS (GATED) */}
      <section className="px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-[#E8192C]/10 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-[#E8192C]" />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">
              Sales Scripts
            </h2>
          </div>
          <p className="text-slate-600 mb-6 text-sm sm:text-base">
            How to explain this to a customer without losing them. Tested in real calls.
          </p>

          <GatedSection
            unlockTitle="Unlock the sales scripts"
            unlockSubtitle="The exact wording that lands the technical point without putting the customer to sleep. Copy/paste ready, tested in real calls."
          >
            <div className="space-y-6">
              {topic.salesScripts.map((s, i) => (
                <div
                  key={i}
                  className="bg-slate-900 rounded-2xl p-5 sm:p-6 text-white"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#E8192C] mb-3">
                    When to use this
                  </p>
                  <p className="text-slate-300 italic mb-5 text-sm sm:text-base">
                    {s.context}
                  </p>

                  <div className="space-y-3 mb-5">
                    {s.lines.map((line, idx) => (
                      <div
                        key={idx}
                        className={`flex gap-3 ${
                          line.speaker === 'you'
                            ? 'border-l-2 border-[#E8192C]/70 pl-3'
                            : 'border-l-2 border-emerald-500/70 pl-3'
                        }`}
                      >
                        <span
                          className={`flex-shrink-0 text-xs font-bold uppercase ${
                            line.speaker === 'you'
                              ? 'text-[#E8192C]'
                              : 'text-emerald-400'
                          }`}
                        >
                          {line.speaker === 'you' ? 'You' : 'Cust'}
                        </span>
                        <p className="text-slate-100 text-sm sm:text-base leading-relaxed flex-1">
                          {line.text}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-white/10 pt-4">
                    <p className="text-xs font-semibold uppercase text-slate-400 mb-2">
                      Why it works
                    </p>
                    <ul className="space-y-1.5 text-sm text-slate-300">
                      {s.whyItWorks.map((w, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                          <span>{w}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </GatedSection>
        </div>
      </section>

      {/* RELATED (free) */}
      {topic.relatedTopics && topic.relatedTopics.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 py-10 sm:py-14 bg-slate-50 border-t border-slate-200">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">
              Related knowledge
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {topic.relatedTopics.map((slug) => {
                const related = knowledgeBySlug(slug)
                if (!related) return null
                return (
                  <Link
                    key={slug}
                    href={`/knowledge/${slug}`}
                    className="group bg-white rounded-xl border border-slate-200 hover:border-[#E8192C]/40 p-4 transition-all hover:shadow-md"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
                      {knowledgeCategoryLabels[related.category]}
                    </p>
                    <p className="font-bold text-slate-900 group-hover:text-[#E8192C] transition-colors flex items-center gap-2">
                      {related.title}
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </p>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* DONE-FOR-YOU FUNNEL CARD */}
      {DONE_FOR_YOU_BY_TOPIC[topic.slug] && (
        <section className="px-4 sm:px-6 lg:px-8 pt-0 pb-4">
          <div className="max-w-4xl mx-auto">
            <DoneForYouCard
              title={DONE_FOR_YOU_BY_TOPIC[topic.slug].title}
              body={DONE_FOR_YOU_BY_TOPIC[topic.slug].body}
            />
          </div>
        </section>
      )}

      {/* FOOTER STAMP — visually separated from DoneForYouCard above */}
      <section className="px-4 sm:px-6 lg:px-8 py-10 sm:py-12 text-center border-t border-slate-100 mt-6">
        <p className="text-xs text-slate-400">
          Last reviewed: {formatDate(topic.lastUpdated)} · Maintained by the ETOTO solar
          team
        </p>
        <Link
          href="/knowledge"
          className="inline-flex items-center gap-2 mt-3 text-sm text-slate-600 hover:text-[#E8192C] transition-colors font-medium"
        >
          <BookOpen className="w-4 h-4" />
          Back to Knowledge Library
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </article>
  )
}
