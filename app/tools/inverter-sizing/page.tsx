'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Wrench, Zap } from 'lucide-react'
import MasterclassNav from '@/components/funnel/MasterclassNav'
import Footer from '@/components/funnel/Footer'
import GatedSection from '@/components/knowledge/GatedSection'

const InverterSizingTool = dynamic(
  () => import('@/components/tools/InverterSizingTool'),
  {
    ssr: false,
    loading: () => (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 animate-pulse">
        <div className="h-8 bg-slate-200 rounded w-1/3 mb-6" />
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-10 bg-slate-100 rounded" />
            ))}
          </div>
          <div className="space-y-3">
            <div className="h-32 bg-slate-100 rounded" />
            <div className="h-20 bg-slate-100 rounded" />
          </div>
        </div>
      </div>
    ),
  }
)

export default function InverterSizingPage() {
  return (
    <main className="bg-[#FAFBFC] min-h-screen">
      <MasterclassNav />

      <section className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#E8192C] rounded-full blur-3xl" />
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
            <Wrench className="w-4 h-4" />
            Interactive Tool
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 text-balance leading-tight">
            Inverter Sizing Tool
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Enter the PV size, battery, phase, tariff and loads. The tool runs the
            charge-throughput maths, picks the matching inverter from the UK trade
            database, checks DNO compliance, and explains why.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="max-w-5xl mx-auto">
          <GatedSection
            unlockTitle="Unlock the Inverter Sizing Tool"
            unlockSubtitle="Live calculator with the UK inverter database, DNO checks, charge-time estimates and full reasoning. Part of the Complete Masterclass."
          >
            <InverterSizingTool />

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/knowledge/inverter-sizing"
                className="group bg-white border border-slate-200 hover:border-[#E8192C]/40 rounded-xl p-5 transition-all"
              >
                <p className="text-xs font-semibold uppercase text-slate-500 mb-1">
                  Background reading
                </p>
                <p className="font-bold text-slate-900 group-hover:text-[#E8192C] transition-colors flex items-center gap-2">
                  Inverter Sizing — The Rule
                  <ArrowRight className="w-4 h-4" />
                </p>
              </Link>
              <Link
                href="/knowledge/battery-and-inverter"
                className="group bg-white border border-slate-200 hover:border-[#E8192C]/40 rounded-xl p-5 transition-all"
              >
                <p className="text-xs font-semibold uppercase text-slate-500 mb-1">
                  Deeper pairing logic
                </p>
                <p className="font-bold text-slate-900 group-hover:text-[#E8192C] transition-colors flex items-center gap-2">
                  Battery + Inverter Pairing
                  <ArrowRight className="w-4 h-4" />
                </p>
              </Link>
            </div>
          </GatedSection>
        </div>
      </section>

      <section className="bg-slate-900 text-white px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#E8192C]/20 mb-4">
            <Zap className="w-7 h-7 text-[#E8192C]" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black mb-4">
            Pair this with the Optimiser Calculator.
          </h2>
          <p className="text-slate-300 mb-6 max-w-xl mx-auto text-sm sm:text-base">
            Inverter spec&apos;d? Now check whether the panels need optimisers or if smart
            stringing covers it.
          </p>
          <Link
            href="/tools/optimiser-roi"
            className="inline-flex items-center gap-2 bg-white text-slate-900 hover:bg-slate-100 font-bold py-3.5 px-7 rounded-full transition-all min-h-[52px]"
          >
            Open Optimiser Calculator
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
