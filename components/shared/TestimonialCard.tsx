'use client'

import { Quote } from 'lucide-react'

interface TestimonialCardProps {
  quote: string
  name: string
  company: string
  stat?: string
}

export function TestimonialCard({ quote, name, company, stat }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-xl p-5 sm:p-6 shadow-lg border border-slate-100 h-full flex flex-col">
      <Quote className="w-6 h-6 text-[#E8192C]/30 mb-3 flex-shrink-0" />
      <p className="text-slate-700 text-sm sm:text-base leading-relaxed flex-grow mb-4">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="mt-auto">
        <p className="font-semibold text-slate-900 text-sm">
          {name}
        </p>
        <p className="text-slate-500 text-xs">
          {company}
        </p>
        {stat && (
          <span className="inline-block mt-2 px-2.5 py-1 bg-[#E8192C]/10 text-[#E8192C] text-xs font-medium rounded-full">
            {stat}
          </span>
        )}
      </div>
    </div>
  )
}
