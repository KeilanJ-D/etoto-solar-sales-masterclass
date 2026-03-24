'use client'

import { useEffect, useRef, useState } from 'react'
import { TrendingUp, Users, Target, Zap, ChevronRight } from 'lucide-react'
import { useCountUp } from '@/hooks/use-animate-on-scroll'

const pipelineStages = [
  { label: 'Leads Generated', value: 482, color: '#22C55E', width: 100 },
  { label: 'Quoted', value: 287, sublabel: '€542K value', color: '#F5921E', width: 60 },
  { label: 'Stalled / No Response', value: 143, sublabel: 'Never followed up', color: '#EF4444', width: 30 },
  { label: 'Closed Won', value: 4, sublabel: '0.8% close rate', color: '#DC2626', width: 5 },
]

export default function IrishMarketProof() {
  const [isVisible, setIsVisible] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const leadsGenerated = useCountUp(482, 2000, showStats)
  const costPerLead = useCountUp(16, 1500, showStats)
  const adSpend = useCountUp(7800, 2000, showStats)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          setTimeout(() => setShowStats(true), 300)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
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
            Irish Market Proof
          </span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black mb-4">
            We Already Do This.
            <span className="text-[#E8192C]"> In Ireland.</span>
          </h2>
          <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto">
            Real data from Premier Energy Ireland — a solar installer we have been working with since February 2025.
          </p>
        </div>

        {/* Stats cards */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {[
            { icon: Users, label: 'Leads Generated', value: leadsGenerated, suffix: '', context: 'Feb - Jun 2025' },
            { icon: Target, label: 'Cost Per Lead', value: costPerLead, prefix: '€', suffix: '.18', context: 'vs €40+ industry avg' },
            { icon: Zap, label: 'Total Ad Spend', value: adSpend, prefix: '€', suffix: '', context: '4 months' },
          ].map((stat, i) => (
            <div 
              key={i}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300"
              style={{ transitionDelay: `${300 + i * 100}ms` }}
            >
              <stat.icon className="w-8 h-8 text-[#E8192C] mx-auto mb-3" />
              <p className="text-3xl md:text-4xl font-black text-white">
                {stat.prefix}{stat.value}{stat.suffix}
              </p>
              <p className="text-sm text-slate-400 mt-1">{stat.label}</p>
              <p className="text-xs text-[#F5921E] mt-2">{stat.context}</p>
            </div>
          ))}
        </div>

        {/* Pipeline visualisation */}
        <div className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-lg md:text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-3 h-3 bg-[#E8192C] rounded-full animate-pulse" />
            Premier Energy Pipeline — The Opportunity You Are Missing
          </h3>

          <div className="space-y-4">
            {pipelineStages.map((stage, index) => (
              <div key={index} className="relative">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-white">{stage.label}</span>
                    {stage.sublabel && (
                      <span className="text-xs text-slate-400">({stage.sublabel})</span>
                    )}
                  </div>
                  <span className="text-lg font-bold text-white">{stage.value}</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: isVisible ? `${stage.width}%` : '0%',
                      backgroundColor: stage.color,
                      transitionDelay: `${600 + index * 150}ms`
                    }}
                  />
                </div>
                {index < pipelineStages.length - 1 && (
                  <ChevronRight className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-4 h-4 text-slate-500" />
                )}
              </div>
            ))}
          </div>

          {/* Pipeline insight */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="bg-[#DC2626]/20 border border-[#DC2626]/30 rounded-xl p-4">
              <p className="text-sm text-white">
                <strong className="text-[#E8192C]">The Problem:</strong> Premier Energy generated 482 leads but only closed 4. 
                Why? No proper follow-up system. No lead nurturing. €270K+ in quoted opportunities went cold because nobody contacted them within 48 hours.
              </p>
            </div>
            <div className="mt-4 bg-[#22C55E]/20 border border-[#22C55E]/30 rounded-xl p-4">
              <p className="text-sm text-white">
                <strong className="text-[#22C55E]">What We Are Fixing:</strong> Automated follow-up sequences, lead scoring, 
                and a proper CRM workflow. We expect to increase close rate from 0.8% to 3%+ within 90 days.
              </p>
            </div>
          </div>
        </div>

        {/* Context note */}
        <div className={`mt-8 text-center transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-sm text-slate-400">
            This is not theory. This is real data from a real Irish solar company. 
            <span className="text-[#E8192C] font-semibold"> We can do the same for Solar Path.</span>
          </p>
        </div>
      </div>
    </section>
  )
}
