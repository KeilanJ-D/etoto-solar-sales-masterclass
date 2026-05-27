'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Grid3x3 } from 'lucide-react'
import MasterclassNav from '@/components/funnel/MasterclassNav'
import Footer from '@/components/funnel/Footer'
import GatedSection from '@/components/knowledge/GatedSection'

const OptimiserCalculator = dynamic(
  () => import('@/components/tools/OptimiserCalculator'),
  { ssr: false }
)

export default function OptimiserCalculatorPage() {
  return (
    <main className="bg-[#FAFBFC] min-h-screen">
      <MasterclassNav />

      <section className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-amber-500 rounded-full blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto relative">
          <Link
            href="/knowledge"
            className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Knowledge Library
          </Link>
          <div className="inline-flex items-center gap-2 bg-white/10 text-white px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-5">
            <Grid3x3 className="w-4 h-4" />
            Interactive Tool
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 text-balance leading-tight">
            Optimiser ROI Calculator
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed mb-4">
            Mock up the roof. Click any panel to mark it as shaded. The calculator
            runs the annual generation-loss maths and ranks your three fixes:
          </p>
          <ul className="text-sm sm:text-base text-slate-300 space-y-1.5 max-w-3xl">
            <li><strong className="text-white">Smart stringing</strong> — £0, uses a spare MPPT</li>
            <li><strong className="text-white">Tigo optimisers</strong> — £45 per shaded panel</li>
            <li><strong className="text-white">Swap to Aiko</strong> — £15 premium per panel, cell-level bypass on every panel</li>
          </ul>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="max-w-4xl mx-auto">
          <GatedSection
            unlockTitle="Unlock the Optimiser ROI Calculator"
            unlockSubtitle="Visual roof layout, real maths on annual loss + 25-year cost, three options compared, and the exact words to say to the customer."
          >
            <OptimiserCalculator />

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/knowledge/optimisers"
                className="group bg-white border border-slate-200 hover:border-[#E8192C]/40 rounded-xl p-5 transition-all"
              >
                <p className="text-xs font-semibold uppercase text-slate-500 mb-1">
                  Background reading
                </p>
                <p className="font-bold text-slate-900 group-hover:text-[#E8192C] transition-colors flex items-center gap-2">
                  Optimisers vs Bigger Inverter vs Aiko
                  <ArrowRight className="w-4 h-4" />
                </p>
              </Link>
              <Link
                href="/knowledge/strings-and-mppt"
                className="group bg-white border border-slate-200 hover:border-[#E8192C]/40 rounded-xl p-5 transition-all"
              >
                <p className="text-xs font-semibold uppercase text-slate-500 mb-1">
                  Why this matters
                </p>
                <p className="font-bold text-slate-900 group-hover:text-[#E8192C] transition-colors flex items-center gap-2">
                  Strings & MPPT explained
                  <ArrowRight className="w-4 h-4" />
                </p>
              </Link>
            </div>
          </GatedSection>
        </div>
      </section>

      <Footer />
    </main>
  )
}
