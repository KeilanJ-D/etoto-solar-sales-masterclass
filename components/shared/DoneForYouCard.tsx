'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

type Cta = {
  label: string
  href: string
}

interface DoneForYouCardProps {
  eyebrow?: string
  title: string
  body: string
  cta?: Cta
  variant?: 'subtle' | 'amber' | 'emerald'
}

const VARIANTS = {
  subtle: {
    wrap: 'bg-gradient-to-br from-slate-50 to-white border border-slate-200',
    badge: 'bg-slate-900 text-white',
    cta: 'text-[#E8192C]',
  },
  amber: {
    wrap: 'bg-gradient-to-br from-amber-50 to-white border border-amber-200',
    badge: 'bg-amber-500 text-white',
    cta: 'text-amber-700',
  },
  emerald: {
    wrap: 'bg-gradient-to-br from-emerald-50 to-white border border-emerald-200',
    badge: 'bg-emerald-600 text-white',
    cta: 'text-emerald-700',
  },
}

export default function DoneForYouCard({
  eyebrow = 'Or have us run this for you',
  title,
  body,
  cta = { label: 'Explore the Agency', href: '/agency' },
  variant = 'subtle',
}: DoneForYouCardProps) {
  const v = VARIANTS[variant]
  return (
    <aside
      className={`mt-12 sm:mt-14 rounded-2xl p-5 sm:p-6 ${v.wrap} hover:shadow-md transition-shadow`}
      role="complementary"
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <span
          className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${v.badge} flex-shrink-0`}
        >
          <Sparkles className="w-3 h-3" />
          {eyebrow}
        </span>
      </div>
      <h3 className="mt-3 font-bold text-slate-900 text-base sm:text-lg leading-tight">
        {title}
      </h3>
      <p className="mt-1.5 text-sm sm:text-base text-slate-600 leading-relaxed">
        {body}
      </p>
      <Link
        href={cta.href}
        className={`mt-3 inline-flex items-center gap-1.5 text-sm font-semibold ${v.cta} hover:underline`}
      >
        {cta.label}
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </aside>
  )
}
