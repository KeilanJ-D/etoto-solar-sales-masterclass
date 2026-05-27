'use client'

import Link from 'next/link'
import { AlertTriangle, ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Clock, Layers, Lightbulb, Settings, Sparkles } from 'lucide-react'
import type { SystemsPlaybook } from '@/lib/systems/types'
import { playbookBySlug } from '@/lib/systems/registry'
import GatedSection from '@/components/knowledge/GatedSection'
import DoneForYouCard from '@/components/shared/DoneForYouCard'

const DONE_FOR_YOU_BY_PLAYBOOK: Record<
  string,
  { title: string; body: string }
> = {
  'solaflow-mastery': {
    title: 'Want SolaFlow embedded and running on your site?',
    body: 'The 90-Day Scaler installs SolaFlow on your website, branded and pre-configured for your service area. Quotes start generating from day one of going live.',
  },
  'highlevel-playbook': {
    title: 'Want this HighLevel setup done for you?',
    body: 'Onboarding the 90-Day Scaler builds your pipelines, smart lists, automations and SMS templates in your HighLevel account. 5-minute lead response from go-live.',
  },
  'opensolar-workflow': {
    title: 'Want our designers spec\'ing your jobs?',
    body: 'The 6-Month Programme assigns an Installer Growth Manager who runs OpenSolar designs alongside your team — every quote checked before it goes to the customer.',
  },
  'customer-discovery-mastery': {
    title: 'Want a trained appointment setter, not just a question library?',
    body: 'The 6-Month Programme includes a dedicated partner-trained setter running this exact discovery framework on every inbound lead. Plus 30-day rep guarantee.',
  },
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

export default function PlaybookPage({ playbook }: { playbook: SystemsPlaybook }) {
  return (
    <article className="bg-white">
      <section className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#E8192C] rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-amber-500 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto relative">
          <Link
            href="/systems"
            className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Systems Playbooks
          </Link>
          <div className="inline-flex items-center gap-2 bg-white/10 text-white px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-5">
            <Settings className="w-4 h-4" />
            Operator&apos;s Manual
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 text-balance leading-tight">
            {playbook.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed mb-5">
            {playbook.subtitle}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {playbook.estReadMinutes} min read
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              {playbook.sections.length} sections
            </span>
            <span className="text-slate-500">·</span>
            <span>For: {playbook.forWhom}</span>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-10 sm:py-14 bg-slate-50 border-b border-slate-200">
        <div className="max-w-3xl mx-auto">
          <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
            {playbook.introNarrative}
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="max-w-4xl mx-auto">
          <GatedSection
            unlockTitle="Unlock the full operator's manual"
            unlockSubtitle="Every step, every scenario, every troubleshooting fix. Part of the Complete Masterclass alongside the knowledge library and interactive tools."
          >
            <nav className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
                In this playbook
              </p>
              <ol className="space-y-1.5">
                {playbook.sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="text-sm text-slate-700 hover:text-[#E8192C] transition-colors flex items-center gap-2"
                    >
                      <span className="text-xs font-bold text-slate-400 w-5">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-medium">{s.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="space-y-12 sm:space-y-16">
              {playbook.sections.map((section, sIdx) => (
                <section key={section.id} id={section.id} className="scroll-mt-24">
                  <div className="mb-6">
                    <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#E8192C] mb-2">
                      Section {String(sIdx + 1).padStart(2, '0')}
                    </p>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-3 leading-tight">
                      {section.title}
                    </h2>
                    <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                      {section.intro}
                    </p>
                  </div>

                  {section.steps && section.steps.length > 0 && (
                    <div className="space-y-5">
                      {section.steps.map((step) => (
                        <div
                          key={step.number}
                          className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm"
                        >
                          <div className="bg-slate-900 text-white px-5 sm:px-6 py-4 flex items-start gap-3">
                            <span className="w-8 h-8 rounded-full bg-[#E8192C] flex items-center justify-center font-bold text-sm flex-shrink-0">
                              {step.number}
                            </span>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-base sm:text-lg leading-tight">
                                {step.title}
                              </h3>
                              <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
                                {step.goal}
                              </p>
                            </div>
                            {step.timeEstimate && (
                              <span className="text-xs bg-white/10 text-slate-300 px-2 py-1 rounded-full whitespace-nowrap">
                                {step.timeEstimate}
                              </span>
                            )}
                          </div>
                          <div className="p-5 sm:p-6 space-y-3">
                            <ul className="space-y-2.5">
                              {step.instructions.map((instr, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-2.5 text-sm sm:text-base text-slate-700 leading-relaxed"
                                >
                                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-1" />
                                  <span>{instr}</span>
                                </li>
                              ))}
                            </ul>
                            {step.proTip && (
                              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-2.5">
                                <Lightbulb className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-xs font-semibold uppercase text-amber-800 mb-0.5">
                                    Pro tip
                                  </p>
                                  <p className="text-sm text-slate-800 leading-relaxed">
                                    {step.proTip}
                                  </p>
                                </div>
                              </div>
                            )}
                            {step.commonMistake && (
                              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-2.5">
                                <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-xs font-semibold uppercase text-red-700 mb-0.5">
                                    Common mistake
                                  </p>
                                  <p className="text-sm text-slate-800 leading-relaxed">
                                    {step.commonMistake}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.scenarios && section.scenarios.length > 0 && (
                    <div className="mt-6 space-y-4">
                      <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                        Scenarios
                      </p>
                      {section.scenarios.map((sc, idx) => (
                        <div
                          key={idx}
                          className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6"
                        >
                          <p className="font-bold text-slate-900 text-base sm:text-lg mb-2">
                            {sc.title}
                          </p>
                          <p className="text-xs font-semibold uppercase text-slate-500 mb-1">
                            Trigger
                          </p>
                          <p className="text-slate-700 text-sm mb-4 italic">
                            {sc.trigger}
                          </p>
                          <p className="text-xs font-semibold uppercase text-slate-500 mb-2">
                            Actions
                          </p>
                          <ul className="space-y-2 text-sm text-slate-700 mb-4">
                            {sc.actions.map((a, j) => (
                              <li key={j} className="flex items-start gap-2">
                                <span className="text-[#E8192C] font-bold">
                                  {j + 1}.
                                </span>
                                <span className="leading-relaxed">{a}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3">
                            <p className="text-xs font-semibold uppercase text-emerald-700 mb-0.5">
                              Outcome
                            </p>
                            <p className="text-sm text-slate-800 leading-relaxed">
                              {sc.outcome}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.keyTakeaway && (
                    <div className="mt-6 bg-[#E8192C] text-white rounded-xl p-5 sm:p-6 shadow-lg">
                      <div className="flex items-start gap-3">
                        <Sparkles className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide opacity-80 mb-1">
                            Key takeaway
                          </p>
                          <p className="text-base sm:text-lg font-semibold leading-snug">
                            {section.keyTakeaway}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </section>
              ))}
            </div>

            {playbook.troubleshooting && playbook.troubleshooting.length > 0 && (
              <section className="mt-12 sm:mt-16">
                <div className="mb-6">
                  <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#E8192C] mb-2">
                    Troubleshooting
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                    When things go wrong
                  </h2>
                </div>
                <div className="space-y-3">
                  {playbook.troubleshooting.map((t, idx) => (
                    <details
                      key={idx}
                      className="group bg-white border border-slate-200 rounded-xl"
                    >
                      <summary className="px-5 py-4 cursor-pointer flex items-start gap-3 list-none">
                        <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-1" />
                        <span className="font-semibold text-slate-900 text-sm sm:text-base flex-1">
                          {t.problem}
                        </span>
                        <span className="text-slate-400 text-xs group-open:rotate-180 transition-transform">
                          ▼
                        </span>
                      </summary>
                      <div className="px-5 pb-5 pt-1 ml-7 space-y-2 text-sm">
                        <p>
                          <span className="font-semibold text-slate-700">Cause: </span>
                          <span className="text-slate-600">{t.cause}</span>
                        </p>
                        <p>
                          <span className="font-semibold text-emerald-700">Fix: </span>
                          <span className="text-slate-700">{t.fix}</span>
                        </p>
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            )}
          </GatedSection>

          {/* Done-for-you funnel card */}
          {DONE_FOR_YOU_BY_PLAYBOOK[playbook.slug] && (
            <DoneForYouCard
              title={DONE_FOR_YOU_BY_PLAYBOOK[playbook.slug].title}
              body={DONE_FOR_YOU_BY_PLAYBOOK[playbook.slug].body}
            />
          )}

          {/* Related playbooks (free) */}
          {playbook.relatedSystems && playbook.relatedSystems.length > 0 && (
            <div className="mt-12 sm:mt-16">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-5">
                Related playbooks
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {playbook.relatedSystems.map((slug) => {
                  const rel = playbookBySlug(slug)
                  if (!rel) return null
                  return (
                    <Link
                      key={slug}
                      href={`/systems/${slug}`}
                      className="group bg-white rounded-xl border border-slate-200 hover:border-[#E8192C]/40 p-4 transition-all hover:shadow-md"
                    >
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
                        Playbook
                      </p>
                      <p className="font-bold text-slate-900 group-hover:text-[#E8192C] transition-colors flex items-center gap-2">
                        {rel.title}
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </p>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          <div className="mt-10 text-center">
            <p className="text-xs text-slate-400">
              Last reviewed: {formatDate(playbook.lastUpdated)} · Maintained by the ETOTO
              team
            </p>
            <Link
              href="/systems"
              className="inline-flex items-center gap-2 mt-3 text-sm text-[#E8192C] hover:underline font-medium"
            >
              <BookOpen className="w-4 h-4" />
              All Systems Playbooks
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </article>
  )
}
