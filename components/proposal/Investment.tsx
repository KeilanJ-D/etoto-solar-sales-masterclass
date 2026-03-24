'use client'

import { useEffect, useState, useRef } from 'react'
import { Check, Sparkles } from 'lucide-react'

export default function Investment() {
  const [sectionVisible, setSectionVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSectionVisible(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const includes = [
    'Meta campaign management (awareness, engagement, lead gen)',
    'Go High Level CRM overhaul and ongoing management',
    'SolaFlow quiz funnel (branded, Irish market configured)',
    'Website management & CRO optimisation',
    'Ad creative production',
    'Weekly performance calls',
    'SEO & Google Ads audit (once access granted)',
  ]

  return (
    <section ref={sectionRef} id="investment" className="py-16 md:py-28 px-4 md:px-6 bg-white relative overflow-hidden">
      <div className="max-w-3xl mx-auto relative z-10">
        {/* Section header */}
        <div className={`text-center mb-12 transition-all duration-700 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-flex items-center gap-2 bg-[#E8192C]/10 text-[#E8192C] text-xs md:text-sm font-semibold px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4" />
            The Investment
          </span>
          <h2 className="text-2xl md:text-5xl font-black text-slate-900">
            What It Costs
          </h2>
        </div>
        
        {/* Main price card */}
        <div className={`relative bg-white border-2 border-[#E8192C] rounded-2xl p-6 md:p-10 shadow-2xl transition-all duration-700 delay-200 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Discount badge */}
          <div className="flex justify-center mb-6">
            <span className="bg-[#E8192C] text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg shadow-[#E8192C]/30">
              £1,000/MONTH DISCOUNT — IRISH MARKET LAUNCH RATE
            </span>
          </div>
          
          {/* Original price crossed out */}
          <p className="text-center text-slate-400 line-through mb-2">
            Standard retainer: £3,000/month
          </p>
          
          {/* Main price */}
          <div className="text-center mb-8">
            <p className="text-5xl md:text-6xl font-black text-slate-900">
              £2,000<span className="text-2xl font-normal text-slate-500">/month</span>
            </p>
            <p className="text-slate-500 mt-2">Retainer (~€2,400)</p>
          </div>
          
          {/* Includes */}
          <div className="border-t border-slate-100 pt-6 mb-6">
            <p className="font-bold text-slate-900 mb-4">Retainer includes:</p>
            <ul className="space-y-3">
              {includes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-slate-600">
                  <Check className="w-5 h-5 text-[#22C55E] flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Ad budget */}
          <div className="border-t border-slate-100 pt-6 mb-6">
            <p className="font-bold text-slate-900 mb-2">Recommended ad budget:</p>
            <p className="text-2xl font-black text-slate-900">
              £2,000<span className="text-base font-normal text-slate-500">/month (~€2,400)</span>
            </p>
            <p className="text-slate-500 text-sm mt-2">
              Based on our Irish campaign data, this generates ~240 leads/month at €10 CPL
            </p>
          </div>
          
          {/* Video production */}
          <div className="border-t border-slate-100 pt-6 mb-6">
            <p className="font-bold text-slate-900 mb-2">Video production (quarterly):</p>
            <p className="text-2xl font-black text-slate-900">
              £5,000<span className="text-base font-normal text-slate-500"> per shoot (~€5,750–€5,790)</span>
            </p>
            <ul className="mt-4 space-y-1 text-sm text-slate-500">
              <li>• 2 × video shoot days (we fly to Ireland)</li>
              <li>• 5–10 customer testimonials</li>
              <li>• 100+ stills</li>
              <li>• Team headshots & B-roll footage</li>
              <li>• 20+ short-form videos</li>
              <li>• 10+ educational ads ready to run</li>
            </ul>
          </div>
          
          {/* Consolidation frame */}
          <div className="bg-slate-900 text-white p-6 rounded-xl -mx-6 md:-mx-10 -mb-6 md:-mb-10 mt-6">
            <p className="text-slate-400 text-sm mb-3">
              You are currently spending ~€5,000/month across disconnected providers.
            </p>
            <p className="text-lg font-bold mb-3">
              Total monthly investment with ETOTO: <span className="text-[#22C55E]">~€4,800</span>
            </p>
            <p className="text-slate-400 text-sm">
              Less money. One provider. Everything integrated. Everything working.
            </p>
          </div>
        </div>
        
        {/* Terms */}
        <p className={`text-center text-slate-400 text-sm mt-6 transition-all duration-700 delay-400 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          3-month minimum commitment. Cancel anytime after 90 days with 30 days notice.
        </p>
      </div>
    </section>
  )
}
