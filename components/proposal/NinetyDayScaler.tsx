'use client'

import { useEffect, useState, useRef } from 'react'
import { Check, Zap, TrendingUp, Target } from 'lucide-react'

export default function NinetyDayScaler() {
  const [sectionVisible, setSectionVisible] = useState(false)
  const [visibleMonths, setVisibleMonths] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSectionVisible(true)
            months.forEach((_, idx) => {
              setTimeout(() => {
                setVisibleMonths(prev => [...prev, idx])
              }, idx * 200)
            })
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const months = [
    {
      number: 1,
      icon: Zap,
      focus: 'BUILD + LAUNCH',
      title: 'Foundation & First Leads',
      items: [
        'Go High Level CRM overhaul — automations, pipelines, lead routing, review collection',
        'SolaFlow quiz funnel built and branded for Solar Path (Irish market config)',
        'Meta campaigns built — awareness, engagement, lead gen',
        'First ads live within 7 days of signing',
        'Weekly performance calls',
      ],
      results: {
        budget: '€2,400',
        leads: '~240',
        cpl: '€10',
      },
      borderColor: '#E8192C',
    },
    {
      number: 2,
      icon: TrendingUp,
      focus: 'OPTIMISE',
      title: 'Data-Driven Refinement',
      items: [
        'A/B testing on ad creative and copy',
        'Audience refinement based on lead quality feedback',
        'CRM automation tuning — response times, follow-up sequences',
        'First content shoot planning',
        'Lead-to-sale tracking calibration',
      ],
      results: {
        budget: '€2,400',
        leads: '~240',
        cpl: 'Target €8–10',
      },
      borderColor: '#F5921E',
    },
    {
      number: 3,
      icon: Target,
      focus: 'PROVE',
      title: 'Full System Operational',
      items: [
        'Video content from first shoot feeding campaigns',
        'Retargeting audiences mature and converting',
        'Sales team receiving pre-qualified leads with full context',
        'Pipeline velocity measurable and improving',
        'Ready to scale ad spend based on proven ROI',
      ],
      results: {
        budget: '€2,400',
        leads: '~240',
        cpl: 'Target €8',
      },
      borderColor: '#22C55E',
    },
  ]

  return (
    <section ref={sectionRef} id="roadmap" className="py-16 md:py-28 px-4 md:px-6 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-red-50/50 to-transparent pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className={`text-center mb-12 md:mb-16 transition-all duration-700 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-flex items-center gap-2 bg-[#E8192C]/10 text-[#E8192C] text-xs md:text-sm font-semibold px-4 py-2 rounded-full mb-4">
            <span className="w-2 h-2 bg-[#E8192C] rounded-full animate-pulse" />
            The 90-Day Solar Scaler
          </span>
          <h2 className="text-2xl md:text-5xl font-black text-slate-900 mb-4">
            Three Months to Prove It Works
          </h2>
          <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto">
            A structured ramp-up designed to build infrastructure, prove the model, and give you full visibility 
            before committing to scale.
          </p>
        </div>
        
        {/* Month cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {months.map((month, idx) => {
            const Icon = month.icon
            const isVisible = visibleMonths.includes(idx)
            
            return (
              <div 
                key={month.number}
                className={`relative bg-white border border-slate-100 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                {/* Top border accent */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                  style={{ backgroundColor: month.borderColor }}
                />
                
                {/* Month number watermark */}
                <span 
                  className="absolute top-4 right-4 font-black text-[80px] leading-none pointer-events-none"
                  style={{ color: month.borderColor, opacity: 0.1 }}
                >
                  {month.number}
                </span>
                
                {/* Icon */}
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${month.borderColor}15` }}
                >
                  <Icon className="w-6 h-6" style={{ color: month.borderColor }} />
                </div>
                
                <p 
                  className="text-xs font-bold tracking-wider mb-2"
                  style={{ color: month.borderColor }}
                >
                  {month.focus}
                </p>
                <h3 className="text-xl font-black text-slate-900 mb-4">
                  {month.title}
                </h3>
                
                <ul className="space-y-3 mb-6">
                  {month.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                      <Check className="w-4 h-4 text-[#22C55E] mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Results box */}
                <div 
                  className="border-l-4 bg-slate-50 p-4 rounded-r-lg"
                  style={{ borderColor: month.borderColor }}
                >
                  <p className="text-sm text-slate-500 mb-1">Projected at {month.results.budget} ad spend:</p>
                  <p className="font-bold text-slate-900">
                    {month.results.leads} leads at {month.results.cpl} CPL
                  </p>
                </div>
              </div>
            )
          })}
        </div>
        
        {/* The Month 3 Math */}
        <div className={`bg-slate-900 p-6 md:p-8 rounded-2xl transition-all duration-700 delay-500 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-xl font-black text-white mb-6">The Month 3 Maths</h3>
          
          <div className="space-y-4 text-white">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-slate-400">Ad budget:</span>
              <span className="font-semibold bg-slate-800 px-3 py-1 rounded">€2,400</span>
              <span className="text-slate-400">÷</span>
              <span className="font-semibold bg-slate-800 px-3 py-1 rounded">€10/lead</span>
              <span className="text-slate-400">=</span>
              <span className="font-bold text-[#E8192C] bg-[#E8192C]/20 px-3 py-1 rounded">240 leads</span>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold bg-slate-800 px-3 py-1 rounded">240 leads</span>
              <span className="text-slate-400">×</span>
              <span className="font-semibold bg-slate-800 px-3 py-1 rounded">1-in-6 close rate</span>
              <span className="text-slate-400">=</span>
              <span className="font-bold text-[#E8192C] bg-[#E8192C]/20 px-3 py-1 rounded">40 sales</span>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold bg-slate-800 px-3 py-1 rounded">40 sales</span>
              <span className="text-slate-400">×</span>
              <span className="font-semibold bg-slate-800 px-3 py-1 rounded">€12,000 AOV</span>
              <span className="text-slate-400">=</span>
              <span className="text-2xl md:text-3xl font-black text-[#22C55E]">€480,000 revenue</span>
            </div>
          </div>
          
          <p className="text-slate-400 text-sm mt-6 pt-6 border-t border-slate-700">
            Total monthly investment: ~€4,800 (retainer + ad spend) · <span className="text-white font-semibold">100:1 return</span>
          </p>
        </div>
      </div>
    </section>
  )
}
