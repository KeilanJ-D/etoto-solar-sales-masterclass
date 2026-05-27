'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Sparkles, Zap } from 'lucide-react'
import type { CaseStudy } from '@/lib/case-studies'

const PROGRAMME_LABELS = {
  scaler: { label: '90-Day Scaler', color: 'bg-amber-500/15 text-amber-800' },
  core: { label: '6-Month Programme', color: 'bg-emerald-500/15 text-emerald-800' },
}

const TECH_LABELS = {
  solar: { label: 'Solar', icon: '☀' },
  'air-source': { label: 'Heat pump', icon: '♨' },
  'air-con': { label: 'AC', icon: '❄' },
}

export default function CaseStudyCard({
  study,
  variant = 'full',
}: {
  study: CaseStudy
  variant?: 'full' | 'compact'
}) {
  const programmeMeta = PROGRAMME_LABELS[study.programme]
  const primaryTech = study.technologies[0]

  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className="group flex flex-col h-full bg-white rounded-2xl ring-1 ring-slate-200 hover:ring-[#E8192C]/30 overflow-hidden hover:shadow-xl hover:-translate-y-0.5 transition-all"
    >
      <div className="relative aspect-[16/10] bg-gradient-to-br from-slate-900 via-slate-800 to-[#E8192C]/30 overflow-hidden flex-shrink-0">
        {study.thumbnail ? (
          <Image
            src={study.thumbnail}
            alt={`${study.client} — ${study.headline}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 400px"
            className={
              study.thumbnailMode === 'contain'
                ? 'object-contain p-4 bg-white'
                : 'object-cover group-hover:scale-105 transition-transform duration-700'
            }
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
            <Sparkles className="w-7 h-7 text-amber-400 mb-2" />
            <p className="text-white font-black text-lg sm:text-xl text-balance">
              {study.client}
            </p>
            <p className="text-slate-300 text-xs sm:text-sm mt-1.5">
              {study.headline}
            </p>
          </div>
        )}

        {study.featured && (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 bg-[#E8192C] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full">
            <Zap className="w-3 h-3" />
            Featured
          </span>
        )}
      </div>

      <div className="p-5 sm:p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-2 flex-wrap mb-3 text-xs">
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full font-semibold ${programmeMeta.color}`}
          >
            {programmeMeta.label}
          </span>
          {primaryTech && TECH_LABELS[primaryTech] && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
              {TECH_LABELS[primaryTech].label}
            </span>
          )}
        </div>

        <p className="text-xs font-semibold uppercase text-[#E8192C] tracking-wide mb-1">
          {study.client}
        </p>
        <h3 className="font-black text-lg sm:text-xl text-slate-900 group-hover:text-[#E8192C] transition-colors leading-tight mb-2">
          {study.headline}
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          {study.oneLineSummary}
        </p>

        {variant === 'full' && (
          <div className="grid grid-cols-3 gap-2 mb-4">
            {study.metrics.slice(0, 3).map((m) => (
              <div
                key={m.label}
                className={`text-center rounded-lg py-2 px-1.5 ${
                  m.highlight ? 'bg-[#E8192C]/10' : 'bg-slate-50'
                }`}
              >
                <p
                  className={`text-sm sm:text-base font-black leading-tight ${
                    m.highlight ? 'text-[#E8192C]' : 'text-slate-900'
                  }`}
                >
                  {m.value}
                </p>
                <p className="text-[10px] uppercase text-slate-500 mt-0.5 tracking-wide leading-tight">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        )}

        <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-[#E8192C]">
          Read the full story
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}
