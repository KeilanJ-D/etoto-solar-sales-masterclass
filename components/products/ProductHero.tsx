'use client'

import { Check, ArrowRight, Package } from 'lucide-react'
import Link from 'next/link'
import { COMPLETE_MASTERCLASS } from '@/lib/pricing'

interface ProductHeroProps {
  eyebrow?: string
  title: string
  subtitle: string
  // Legacy props retained so existing pages don't break.
  // ProductHero ignores per-product price/buy and always points at the Masterclass.
  price?: string
  buyLink?: string
  bundleNudge?: string
  stats?: Array<{ value: string; label: string }>
  isUnlocked?: boolean
}

export default function ProductHero({
  eyebrow = 'ETOTO Solar Sales Masterclass',
  title,
  subtitle,
  stats = [],
  isUnlocked = false,
}: ProductHeroProps) {
  const isInternalSite = process.env.NEXT_PUBLIC_UNLOCK_ALL === 'true'

  return (
    <section className="relative py-16 md:py-24 px-4 md:px-6 bg-gradient-to-br from-white via-slate-50/50 to-red-50/30 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 md:w-96 md:h-96 bg-[#E8192C]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 md:w-[500px] md:h-[500px] bg-[#F5921E]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {!isInternalSite && (
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-6 transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>Back to Masterclass</span>
          </Link>
        )}

        <p className="text-sm font-medium text-[#E8192C] tracking-wide uppercase mb-4">
          {eyebrow}
        </p>

        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-6 text-balance">
          {title}
        </h1>

        <p className="text-base md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
          {subtitle}
        </p>

        {!isInternalSite && (
          isUnlocked ? (
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 font-semibold px-6 py-3 rounded-full mb-8">
              <Check className="w-5 h-5" />
              <span>Full Access Unlocked</span>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link
                href="/complete-toolkit"
                className="inline-flex items-center gap-2 bg-[#E8192C] hover:bg-[#D01622] active:bg-[#B01220] text-white font-semibold py-3.5 px-6 rounded-full transition-all shadow-lg hover:shadow-xl min-h-[52px] touch-action-manipulation"
              >
                <Package className="w-5 h-5" />
                <span>
                  Part of the Masterclass — {COMPLETE_MASTERCLASS.priceHeadline}{' '}
                  {COMPLETE_MASTERCLASS.priceVatNote}
                </span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          )
        )}

        {stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-slate-100"
              >
                <p className="text-xl md:text-2xl font-bold text-[#E8192C]">{stat.value}</p>
                <p className="text-xs md:text-sm text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
