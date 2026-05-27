'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, ArrowLeft, BookOpen } from 'lucide-react'
import MasterclassNav from '@/components/funnel/MasterclassNav'
import Footer from '@/components/funnel/Footer'
import { glossary } from '@/lib/knowledge/glossary'
import { knowledgeCategoryLabels } from '@/lib/knowledge/registry'

const categoryColors: Record<string, string> = {
  sizing: 'bg-blue-50 text-blue-700 border-blue-200',
  topology: 'bg-purple-50 text-purple-700 border-purple-200',
  electrical: 'bg-amber-50 text-amber-700 border-amber-200',
  product: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  design: 'bg-[#E8192C]/10 text-[#E8192C] border-[#E8192C]/30',
  reference: 'bg-slate-100 text-slate-700 border-slate-200',
}

export default function GlossaryPage() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!query.trim()) return glossary
    const q = query.toLowerCase()
    return glossary.filter(
      (t) =>
        t.term.toLowerCase().includes(q) ||
        t.shortForm?.toLowerCase().includes(q) ||
        t.oneLineDefinition.toLowerCase().includes(q) ||
        t.detail.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <main className="bg-[#FAFBFC] min-h-screen">
      <MasterclassNav />

      <section className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/knowledge"
            className="inline-flex items-center gap-1.5 text-slate-500 hover:text-[#E8192C] text-sm transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Knowledge Library
          </Link>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-3">
            Glossary
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mb-6">
            Every term a solar rep should know — defined in one line, expanded if you need
            it.
          </p>

          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search terms... e.g. MPPT, G99, hybrid"
              className="w-full pl-12 pr-4 py-3 sm:py-4 border border-slate-300 rounded-xl text-base focus:ring-2 focus:ring-[#E8192C]/20 focus:border-[#E8192C] outline-none transition-all min-h-[48px]"
            />
          </div>

          {query && (
            <p className="text-sm text-slate-500 mt-3">
              {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
            </p>
          )}
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="max-w-4xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500">No terms match — try a different word.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((term) => (
                <div
                  key={term.term}
                  id={term.term.toLowerCase().replace(/\s+/g, '-')}
                  className="bg-white rounded-xl border border-slate-200 hover:border-[#E8192C]/30 hover:shadow-sm p-5 sm:p-6 transition-all"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg sm:text-xl">
                        {term.term}
                      </h3>
                      {term.shortForm && (
                        <p className="text-xs text-slate-500 font-mono mt-0.5">
                          {term.shortForm}
                        </p>
                      )}
                    </div>
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                        categoryColors[term.category] || categoryColors.reference
                      }`}
                    >
                      {knowledgeCategoryLabels[term.category]}
                    </span>
                  </div>
                  <p className="text-slate-700 font-medium text-sm sm:text-base mb-3 leading-relaxed">
                    {term.oneLineDefinition}
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed">{term.detail}</p>

                  {term.relatedTopics && term.relatedTopics.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap gap-2">
                      <span className="text-xs text-slate-500">See also:</span>
                      {term.relatedTopics.map((slug) => (
                        <Link
                          key={slug}
                          href={`/knowledge/${slug}`}
                          className="text-xs font-medium text-[#E8192C] hover:underline"
                        >
                          {slug.replace(/-/g, ' ')}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
