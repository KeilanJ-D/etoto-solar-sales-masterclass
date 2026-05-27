import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight, Clock, Layers, Settings, Sparkles } from 'lucide-react'
import MasterclassNav from '@/components/funnel/MasterclassNav'
import Footer from '@/components/funnel/Footer'
import { systemsPlaybooks } from '@/lib/systems/registry'

export const metadata: Metadata = {
  title: 'Systems Playbooks — ETOTO Solar Sales Masterclass',
  description:
    'Operator manuals for SolaFlow, HighLevel CRM, OpenSolar, and customer discovery. The systems that run a turnkey solar installer business.',
}

export default function SystemsIndexPage() {
  return (
    <main className="bg-[#FAFBFC] min-h-screen">
      <MasterclassNav />

      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white px-4 sm:px-6 lg:px-8 py-14 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#E8192C] rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-emerald-500 rounded-full blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto relative">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-5">
            <Settings className="w-4 h-4" />
            Systems Playbooks
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-5 text-balance leading-tight">
            The operator manuals.<br />
            <span className="text-slate-400">For the tools your business runs on.</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed">
            SolaFlow. HighLevel. OpenSolar. Customer discovery. Every screen, every
            shortcut, every scenario. The expertise that takes new hires 12 months to
            absorb — captured in one place.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto space-y-5 sm:space-y-6">
          {systemsPlaybooks.map((p) => (
            <Link
              key={p.slug}
              href={`/systems/${p.slug}`}
              className="group block bg-white border border-slate-200 hover:border-[#E8192C]/40 rounded-2xl p-6 sm:p-7 transition-all hover:shadow-xl hover:-translate-y-0.5"
            >
              <div className="flex flex-col md:flex-row gap-5 md:gap-7 items-start">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#E8192C]/10 flex items-center justify-center flex-shrink-0">
                  <Settings className="w-6 h-6 sm:w-7 sm:h-7 text-[#E8192C]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-900 text-xl sm:text-2xl md:text-3xl leading-tight group-hover:text-[#E8192C] transition-colors mb-2">
                    {p.title}
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
                    {p.subtitle}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {p.estReadMinutes} min
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      {p.sections.length} sections
                    </span>
                    <span className="hidden sm:inline-flex items-center gap-1.5 text-[#E8192C] font-medium ml-auto">
                      Open playbook
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 text-white px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#E8192C]/20 mb-4">
            <Sparkles className="w-7 h-7 text-[#E8192C]" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 text-balance">
            Source of truth for partner agencies and remote sales teams.
          </h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto text-sm sm:text-base">
            Onboard a new appointment setter in 2 days instead of 2 months. Standardise
            every rep on the same systems. Audit your own operation against the playbooks
            and fix the gaps.
          </p>
          <Link
            href="/for/partner-agencies"
            className="inline-flex items-center gap-2 bg-[#E8192C] hover:bg-[#D01622] text-white font-bold py-3.5 px-7 rounded-full transition-all min-h-[52px]"
          >
            Partner Agency Portal
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
