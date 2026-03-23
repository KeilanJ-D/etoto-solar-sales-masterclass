'use client'

import { useEffect, useRef, useState } from 'react'
import { AlertCircle, ArrowRight, Check } from 'lucide-react'

const stages = [
  { 
    stage: 'AWARENESS', 
    current: 'No blog content, no educational resources', 
    fix: 'Content hub with solar guides & calculators',
    leakPercent: 40,
    colour: '#E8192C'
  },
  { 
    stage: 'INTEREST', 
    current: 'Calculators exist but results are ungated', 
    fix: 'Email-gated tools + downloadable guides',
    leakPercent: 60,
    colour: '#F5921E'
  },
  { 
    stage: 'CONSIDERATION', 
    current: 'Generic contact form with no qualification', 
    fix: 'Multi-step quiz that pre-qualifies leads',
    leakPercent: 75,
    colour: '#F59E0B'
  },
  { 
    stage: 'DECISION', 
    current: 'No urgency triggers, limited social proof', 
    fix: 'Testimonial carousel + limited-time offers',
    leakPercent: 85,
    colour: '#DC2626'
  },
]

export default function LeakyFunnel() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeStage, setActiveStage] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6 bg-gradient-to-b from-[#F8FAFC] to-white">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block bg-[#FEF3C7] text-[#92400E] text-sm font-semibold px-4 py-2 rounded-full mb-4">
            Conversion Audit
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-[#1A1A2E] mb-4">
            Your Funnel Is Leaking at Every Stage
          </h2>
          <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
            Visitors arrive, but they leave without converting. Here is exactly where they drop off.
          </p>
        </div>

        {/* Funnel visualization */}
        <div className="space-y-4 mb-12">
          {stages.map((stage, i) => {
            const width = 100 - (i * 12)
            const isActive = activeStage === i
            
            return (
              <div 
                key={stage.stage}
                className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
                style={{ transitionDelay: `${i * 150}ms` }}
                onMouseEnter={() => setActiveStage(i)}
                onMouseLeave={() => setActiveStage(null)}
              >
                <div 
                  className={`relative bg-white border-2 rounded-2xl p-6 mx-auto cursor-pointer transition-all duration-300 ${
                    isActive ? 'shadow-xl scale-[1.02]' : 'shadow-sm hover:shadow-md'
                  }`}
                  style={{ 
                    width: `${width}%`,
                    borderColor: isActive ? stage.colour : '#E2E8F0',
                    borderLeftWidth: '4px',
                    borderLeftColor: stage.colour
                  }}
                >
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span 
                          className="text-xs font-bold tracking-widest px-2 py-1 rounded"
                          style={{ backgroundColor: `${stage.colour}15`, color: stage.colour }}
                        >
                          {stage.stage}
                        </span>
                        <span className="text-xs font-bold text-[#DC2626] bg-[#FEE2E2] px-2 py-1 rounded">
                          -{stage.leakPercent}% LEAK
                        </span>
                      </div>
                      <p className="text-[#64748B] font-medium">{stage.current}</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <ArrowRight className="w-5 h-5 text-[#94A3B8]" />
                      <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-lg px-4 py-2">
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-[#16A34A]" />
                          <p className="text-[#166534] text-sm font-medium">{stage.fix}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom conversion rate */}
        <div className={`text-center transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex flex-col items-center bg-white border border-[#E2E8F0] rounded-2xl p-8 shadow-lg">
            <span className="text-[#64748B] text-sm mb-2">Current Estimated Conversion Rate</span>
            <span className="text-5xl font-black text-[#E8192C]">0.8%</span>
            <div className="flex items-center gap-2 mt-3">
              <AlertCircle className="w-4 h-4 text-[#F59E0B]" />
              <span className="text-[#64748B] text-sm">Industry average: 2.5-4%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
