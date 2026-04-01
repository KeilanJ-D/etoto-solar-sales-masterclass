'use client'

import { useEffect, useRef, useState } from 'react'
import { Download, FileText, ArrowRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'

const isInternalSite = process.env.NEXT_PUBLIC_UNLOCK_ALL === 'true'

const steps = [
  'Rapport',
  'Discovery',
  'Energy Audit',
  'Battery',
  'Solar',
  'Financials',
  'Objections',
  'Close',
  'Follow-Up',
]

const formulas = [
  {
    title: 'Energy Audit',
    lines: [
      'Annual spend ÷ Unit rate = Annual kWh',
      'Annual kWh ÷ 365 = Daily kWh',
      'Daily kWh × Unit rate = Daily cost',
    ],
  },
  {
    title: 'Battery Saving',
    lines: [
      'Daily kWh × Off-peak rate = New daily cost',
      'Old cost − New cost = Daily saving',
      'Daily saving × 365 = Annual saving',
    ],
  },
  {
    title: 'Solar Income',
    lines: [
      'Panel W × Count = System kWp',
      'kWp × 4.5 peak hours = Daily generation',
      'Daily gen × Export rate = Daily income',
      'Daily income × 365 = Annual income',
    ],
  },
  {
    title: 'Payback',
    lines: [
      'System cost ÷ (Annual saving + Annual income)',
      '= Payback period (years)',
    ],
  },
]

const products = [
  { name: 'Full Sales Script', description: 'Word-for-word, with audio clips', href: '/sales-script', price: isInternalSite ? null : '£3.99' },
  { name: 'Sales Framework', description: 'Flexible 9-step skeleton', href: '/sales-framework', price: isInternalSite ? null : '£3.99' },
  { name: 'Appointment Setter Quiz', description: '18 questions, scoring, retry mode', href: '/appointment-quiz', price: isInternalSite ? null : '£3.99' },
  { name: 'Formula Cheat Sheet', description: 'Calculator with saved configs', href: '/formula-cheat-sheet', price: isInternalSite ? null : '£3.99' },
]

export default function SummaryDownloads() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 md:py-24 px-4 md:px-6 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-gradient-to-bl from-red-50/30 to-transparent pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-center justify-center gap-2 mb-4">
            <FileText className="w-4 h-4 text-[#E8192C]" />
            <span className="text-sm font-medium text-slate-500 tracking-wide uppercase">
              Everything You Need
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-4">The Complete Toolkit</h2>
          <p className="text-slate-500">Download the scripts. Memorise the formula. Close deals.</p>
        </div>

        {/* 9-Step Recap */}
        <div className={`mb-12 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h3 className="text-lg font-bold text-slate-900 mb-4 text-center">The 9-Step Formula</h3>
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className="flex items-center gap-2 bg-slate-100 rounded-full px-4 py-2">
                  <span className="w-6 h-6 rounded-full bg-[#E8192C] text-white text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium text-slate-700">{step}</span>
                </div>
                {index < steps.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-slate-300 mx-1 hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Formula Cheat Sheet */}
        <div className={`bg-slate-900 rounded-2xl p-6 md:p-8 mb-12 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h3 className="text-lg font-bold text-white mb-6 text-center">Formula Cheat Sheet</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formulas.map((formula, index) => (
              <div key={index} className="bg-white/5 rounded-xl p-5 border border-white/10">
                <h4 className="text-[#E8192C] font-bold text-sm mb-3">{formula.title}</h4>
                <div className="space-y-1">
                  {formula.lines.map((line, i) => (
                    <p key={i} className="text-slate-300 text-sm font-mono">{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Microsites */}
        <div className={`mb-12 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h3 className="text-lg font-bold text-slate-900 mb-2 text-center">{isInternalSite ? 'Your Tools' : 'Go Deeper — The Full Toolkit'}</h3>
          <p className="text-slate-500 text-center mb-6 text-sm">{isInternalSite ? 'Scripts, audio, calculators, and quizzes.' : 'Interactive microsites with scripts, audio, calculators, and quizzes.'}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {products.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="flex items-center gap-4 p-5 bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-[#E8192C]/30 rounded-xl transition-all text-left group"
              >
                <div className="w-12 h-12 rounded-lg bg-[#E8192C]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#E8192C]/20 transition-colors">
                  <ExternalLink className="w-5 h-5 text-[#E8192C]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-900">{item.name}</p>
                  <p className="text-sm text-slate-500 truncate">{item.description}</p>
                </div>
                {item.price && <span className="text-sm font-bold text-[#E8192C] flex-shrink-0">{item.price}</span>}
                {!item.price && <ArrowRight className="w-4 h-4 text-slate-400 flex-shrink-0" />}
              </Link>
            ))}
          </div>
          {!isInternalSite && (
            <div className="mt-6 text-center">
              <Link 
                href="/complete-toolkit"
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-6 rounded-full transition-all"
              >
                <span>Get All 4 for £9.99</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-sm text-slate-500 mt-2">Save £5.97 with the Complete Toolkit</p>
            </div>
          )}
        </div>

        {/* Closing Line */}
        <div className={`text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="inline-block bg-[#E8192C] text-white rounded-2xl px-8 py-6">
            <p className="text-xl md:text-2xl font-black">
              &ldquo;The maths does the selling. You just do the maths.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
