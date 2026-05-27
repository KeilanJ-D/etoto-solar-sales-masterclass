import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight, BookOpen, Clock, Search, Wrench } from 'lucide-react'
import MasterclassNav from '@/components/funnel/MasterclassNav'
import Footer from '@/components/funnel/Footer'
import {
  knowledgeTopics,
  knowledgeByCategory,
  knowledgeCategoryLabels,
} from '@/lib/knowledge/registry'

export const metadata: Metadata = {
  title: 'Knowledge Library — ETOTO Solar Sales Masterclass',
  description:
    'The technical reference for UK solar installers. Inverter sizing, battery pairing, string design, optimisers, single vs three-phase, panel selection. Used by 200+ installers.',
}

export default function KnowledgeIndexPage() {
  const grouped = knowledgeByCategory()
  const categories = Object.keys(grouped)

  return (
    <main className="bg-[#FAFBFC] min-h-screen">
      <MasterclassNav />

      {/* HERO */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white px-4 sm:px-6 lg:px-8 py-14 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#E8192C] rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-amber-500 rounded-full blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto relative">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-5">
            <BookOpen className="w-4 h-4" />
            Knowledge Library
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-5 text-balance leading-tight">
            The technical playbook<br />
            every solar rep should know.
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed mb-6">
            Inverter sizing, string design, battery pairing, optimiser maths, DNO
            compliance. The rules, the decision flows, and the mistakes that cost you the
            job. Free.
          </p>
          <p className="text-sm text-slate-400 max-w-2xl">
            The worked examples and word-for-word sales scripts are inside the Complete
            Toolkit. The reference itself is open.
          </p>
        </div>
      </section>

      {/* QUICK NAV */}
      <section className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Jump to:
            </span>
            {knowledgeTopics.map((t) => (
              <Link
                key={t.slug}
                href={`/knowledge/${t.slug}`}
                className="text-xs sm:text-sm bg-slate-100 hover:bg-[#E8192C]/10 hover:text-[#E8192C] text-slate-700 px-3 py-1.5 rounded-full font-medium transition-colors"
              >
                {t.title.split(' — ')[0]}
              </Link>
            ))}
            <Link
              href="/knowledge/glossary"
              className="text-xs sm:text-sm bg-slate-100 hover:bg-[#E8192C]/10 hover:text-[#E8192C] text-slate-700 px-3 py-1.5 rounded-full font-medium transition-colors inline-flex items-center gap-1.5"
            >
              <Search className="w-3 h-3" />
              Glossary
            </Link>
          </div>
        </div>
      </section>

      {/* TOPICS BY CATEGORY */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto space-y-12 sm:space-y-16">
          {categories.map((cat) => (
            <div key={cat}>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px bg-slate-200 flex-1" />
                <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-slate-600">
                  {knowledgeCategoryLabels[cat] || cat}
                </h2>
                <div className="h-px bg-slate-200 flex-1" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                {grouped[cat].map((t) => (
                  <Link
                    key={t.slug}
                    href={`/knowledge/${t.slug}`}
                    className="group bg-white border border-slate-200 hover:border-[#E8192C]/40 rounded-2xl p-5 sm:p-6 transition-all hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-[#E8192C]/10 flex items-center justify-center flex-shrink-0">
                        <Wrench className="w-5 h-5 text-[#E8192C]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-slate-900 text-base sm:text-lg leading-snug group-hover:text-[#E8192C] transition-colors">
                          {t.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                          <Clock className="w-3 h-3" />
                          {t.estReadMinutes} min
                        </div>
                      </div>
                    </div>
                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-semibold mb-3">
                      {t.oneLineRule}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#E8192C]">
                      Read the rule
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* UPSELL FOOTER */}
      <section className="bg-slate-900 text-white px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-[#E8192C] mb-3">
            Want the maths, the scripts, and the tools?
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 text-balance">
            Unlock worked examples, sales scripts, and interactive sizing tools.
          </h2>
          <p className="text-slate-300 mb-7 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            The library is free. The operational layer — exact wording, copy-paste maths,
            interactive Inverter Sizing Tool, Optimiser ROI Calculator — is bundled with
            the Complete Toolkit.
          </p>
          <Link
            href="/complete-toolkit"
            className="inline-flex items-center gap-2 bg-[#E8192C] hover:bg-[#D01622] text-white font-bold py-4 px-8 rounded-full transition-all min-h-[56px]"
          >
            See the Complete Toolkit
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
