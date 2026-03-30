'use client'

import { Calculator, ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function SolaFlowUpsell() {
  return (
    <section className="py-12 md:py-16 px-4 md:px-6 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
          {/* Icon */}
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-[#E8192C] to-[#F5921E] flex items-center justify-center flex-shrink-0 shadow-xl">
            <Calculator className="w-10 h-10 md:w-12 md:h-12 text-white" />
          </div>

          {/* Content */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#F5921E]" />
              <span className="text-xs font-semibold text-[#F5921E] uppercase tracking-wide">
                For Your Business
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
              Want the Calculator Branded to Your Business?
            </h3>
            <p className="text-slate-400 text-sm md:text-base mb-3">
              SolaFlow gives your customers instant solar estimates before you even call them. 
              Your logo, your branding, your leads. <span className="text-white font-medium">£200/month.</span>
            </p>
            <p className="text-xs text-slate-500">
              <span className="text-green-400 font-medium">YEERS closed £24.4K in 2 weeks</span> — ad to deposit in 3 days
            </p>
          </div>

          {/* CTA */}
          <Link
            href="/solaflow"
            className="flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-900 font-semibold py-3 px-6 rounded-full transition-all flex-shrink-0 min-h-[48px]"
          >
            <span>See SolaFlow</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
