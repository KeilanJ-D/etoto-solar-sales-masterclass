'use client'

import { useEffect, useRef, useState } from 'react'
import { TrendingUp, Users, Target, Zap, AlertTriangle, CheckCircle, Clock, XCircle } from 'lucide-react'
import { useCountUp } from '@/hooks/use-animate-on-scroll'

const adExamples = [
  { 
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/14%20Panel%20%26%205kWh%20Battery%20Package%20Ad%20V1-BOrCjBjfx9Pe1TxrPJekGDbIyZxAJp.png', 
    title: '14 Panel + Battery Package', 
    leads: 47,
    cpl: '€18.04',
    description: 'Best performer. Clear pricing with SEAI grant, professional imagery, strong value proposition.' 
  },
  { 
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4%2010%20Panel%20Package%20Ad%20V2-dKl3A3NnX3qAtsMQLh6aq1RnZKLkZR.png', 
    title: 'Starting from €4,799 V2', 
    leads: 106,
    cpl: '€14.29',
    description: 'Highest volume. Entry-level pricing appeals to first-time buyers with budget-friendly messaging.' 
  },
  { 
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Breaking%20News%20Grant-M2QurqMxxrUTkNEdTWEj2KS6zCHBji.png', 
    title: 'Breaking News Format', 
    leads: 0,
    cpl: 'Engagement',
    description: 'Pattern interrupt for brand awareness. 318 likes, 778 clicks — builds audience for retargeting.' 
  },
]

const crmStages = [
  { stage: 'New Leads', count: 28, color: '#22C55E', note: 'Untouched for 100+ days' },
  { stage: 'Quote Given (+45 Days)', count: 7, color: '#F5921E', note: 'Stalled — no follow up' },
  { stage: 'Further Action Required', count: 10, color: '#EAB308', note: 'Client dropped the ball' },
  { stage: 'No Contact (20+ Days)', count: 3, color: '#EF4444', note: 'Gone cold' },
  { stage: 'Outside Service Area', count: 6, color: '#64748B', note: 'Targeting issue' },
  { stage: 'Closed Lost', count: 7, color: '#DC2626', note: 'Lost to competitors' },
  { stage: 'Dead Leads', count: 1, color: '#1F2937', note: 'Unqualified' },
]

export default function PremierEnergyCaseStudy() {
  const [isVisible, setIsVisible] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [activeAd, setActiveAd] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const leadsGenerated = useCountUp(229, 2000, showStats)
  const costPerLead = useCountUp(16, 1500, showStats)
  const adSpend = useCountUp(3705, 2000, showStats)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          setTimeout(() => setShowStats(true), 300)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Auto-cycle ads
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveAd(prev => (prev + 1) % adExamples.length)
    }, 4000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-16 md:py-28 px-4 md:px-6 bg-slate-900 text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#E8192C]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#F5921E]/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className={`text-center mb-12 md:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-flex items-center gap-2 bg-[#E8192C]/20 text-[#E8192C] text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <TrendingUp className="w-4 h-4" />
            Real Irish Case Study
          </span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black mb-4">
            Premier Energy Ireland:
            <span className="text-[#E8192C]"> What We Delivered</span>
          </h2>
          <p className="text-base md:text-lg text-slate-400 max-w-3xl mx-auto">
            We ran Meta Ads for Premier Energy (ad account: Realm Energy Solutions) from February to June 2025. 
            Here is exactly what happened — the good, the bad, and what it means for Solar Path.
          </p>
        </div>

        {/* Stats cards */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {[
            { icon: Users, label: 'Leads Generated', value: leadsGenerated, suffix: '', context: 'Feb - Jun 2025', good: true },
            { icon: Target, label: 'Cost Per Lead', value: costPerLead, prefix: '€', suffix: '.18', context: 'vs €40+ industry avg', good: true },
            { icon: Zap, label: 'Total Ad Spend', value: adSpend, prefix: '€', suffix: '', context: 'Lead gen only', good: true },
          ].map((stat, i) => (
            <div 
              key={i}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300"
              style={{ transitionDelay: `${300 + i * 100}ms` }}
            >
              <stat.icon className="w-8 h-8 text-[#22C55E] mx-auto mb-3" />
              <p className="text-3xl md:text-4xl font-black text-white">
                {stat.prefix}{stat.value}{stat.suffix}
              </p>
              <p className="text-sm text-slate-400 mt-1">{stat.label}</p>
              <p className="text-xs text-[#22C55E] mt-2 flex items-center justify-center gap-1">
                <CheckCircle className="w-3 h-3" /> {stat.context}
              </p>
            </div>
          ))}
        </div>

        {/* Two columns: Ads + What went wrong */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Ad carousel */}
          <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#22C55E]" />
              The Ads We Ran
            </h3>
            
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 mb-4">
              <div className="aspect-square relative overflow-hidden rounded-lg shadow-lg">
                {adExamples.map((ad, i) => (
                  <img 
                    key={i}
                    src={ad.image} 
                    alt={ad.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                      activeAd === i ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                    }`}
                  />
                ))}
              </div>
              
              {/* Progress dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {adExamples.map((_, i) => (
                  <div 
                    key={i}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeAd === i ? 'bg-white w-6' : 'bg-white/50 w-2'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Current ad info */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-white">{adExamples[activeAd].title}</h4>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-[#22C55E] font-bold">{adExamples[activeAd].leads} leads</span>
                  <span className="text-slate-400">{adExamples[activeAd].cpl} CPL</span>
                </div>
              </div>
              <p className="text-sm text-slate-400">{adExamples[activeAd].description}</p>
            </div>
          </div>

          {/* What went wrong */}
          <div className={`transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#F5921E]" />
              What Went Wrong (Sales Side)
            </h3>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 mb-4">
              <p className="text-sm text-slate-300 mb-4">
                We delivered 229 qualified leads at €16.18 each. But look at what happened to them in the CRM:
              </p>
              
              <div className="space-y-2">
                {crmStages.map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-white">{item.stage}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-500">{item.note}</span>
                      <span className="text-sm font-bold text-white">{item.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key insight */}
            <div className="bg-[#DC2626]/20 border border-[#DC2626]/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-[#DC2626] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-white mb-1">The Real Problem</p>
                  <p className="text-sm text-slate-300">
                    28 leads sat untouched for 100+ days. 7 quotes went stale. 10 needed follow-up that never came.
                    This is not a lead gen problem — it is a sales process problem.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Solar Path will be different */}
        <div className={`bg-[#22C55E]/10 border border-[#22C55E]/30 rounded-2xl p-6 md:p-8 transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-[#22C55E]" />
            Why Solar Path Will Be Different
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { 
                title: 'You Have the Sales Team', 
                description: 'Ken confirmed you have capacity for 50 installs/month. Premier Energy did not have the team to follow up.'
              },
              { 
                title: 'CRM + Automation from Day 1', 
                description: 'We will set up automated follow-up sequences so no lead sits for 100 days untouched.'
              },
              { 
                title: 'Proven Creative & Targeting', 
                description: 'We are not testing — we already know what works. €14-18 CPL is achievable from week one.'
              },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-4">
                <h4 className="font-bold text-white mb-2">{item.title}</h4>
                <p className="text-sm text-slate-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Data note */}
        <div className={`mt-8 text-center transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs text-slate-500">
            Data source: Meta Ads Manager (Realm Energy Solutions) + GHL CRM export. Campaign period: 25 Feb - 1 Jun 2025.
          </p>
        </div>
      </div>
    </section>
  )
}
