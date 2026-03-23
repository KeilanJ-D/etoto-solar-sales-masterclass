'use client'

import { useEffect, useRef, useState } from 'react'
import { TrendingUp, Check, X, AlertTriangle } from 'lucide-react'

const competitors = [
  { name: 'Activ8 Solar', seo: 72, content: true, automation: true, threat: 'HIGH' },
  { name: 'Pinergy', seo: 68, content: true, automation: true, threat: 'HIGH' },
  { name: 'Electric Ireland Solar', seo: 81, content: true, automation: true, threat: 'CRITICAL' },
  { name: 'SSE Airtricity', seo: 75, content: true, automation: false, threat: 'HIGH' },
]

export default function Competitors() {
  const [isVisible, setIsVisible] = useState(false)
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
    <section ref={sectionRef} className="py-24 md:py-32 px-6 bg-gradient-to-b from-white to-[#F8FAFC]">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block bg-[#FEF3C7] text-[#92400E] text-sm font-semibold px-4 py-2 rounded-full mb-4">
            Competitive Landscape
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-[#1A1A2E] mb-4">
            While You Wait, They Win
          </h2>
          <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
            Your competitors are not standing still. Here is what they are doing that you are not.
          </p>
        </div>

        {/* Competitor table */}
        <div className={`bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Header */}
          <div className="grid grid-cols-5 gap-4 p-6 border-b border-[#E2E8F0] bg-[#F8FAFC] text-sm font-bold text-[#64748B]">
            <div>Competitor</div>
            <div>SEO Score</div>
            <div>Content Strategy</div>
            <div>Lead Automation</div>
            <div>Threat Level</div>
          </div>
          
          {/* Competitor rows */}
          {competitors.map((comp, i) => (
            <div 
              key={comp.name}
              className="grid grid-cols-5 gap-4 p-6 border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition-all items-center"
            >
              <div className="font-semibold text-[#1A1A2E]">{comp.name}</div>
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-20 h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#16A34A] rounded-full transition-all duration-1000"
                      style={{ width: isVisible ? `${comp.seo}%` : '0%', transitionDelay: `${i * 100}ms` }}
                    />
                  </div>
                  <span className="text-[#16A34A] font-semibold">{comp.seo}</span>
                </div>
              </div>
              <div>
                {comp.content ? (
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#16A34A]" />
                    <span className="text-[#16A34A] font-medium">Active</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <X className="w-4 h-4 text-[#94A3B8]" />
                    <span className="text-[#94A3B8]">None</span>
                  </div>
                )}
              </div>
              <div>
                {comp.automation ? (
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#16A34A]" />
                    <span className="text-[#16A34A] font-medium">Yes</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <X className="w-4 h-4 text-[#94A3B8]" />
                    <span className="text-[#94A3B8]">No</span>
                  </div>
                )}
              </div>
              <div>
                <span 
                  className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                    comp.threat === 'CRITICAL' 
                      ? 'bg-[#FEE2E2] text-[#DC2626]' 
                      : 'bg-[#FEF3C7] text-[#D97706]'
                  }`}
                >
                  {comp.threat}
                </span>
              </div>
            </div>
          ))}
          
          {/* Solar Path row */}
          <div className="grid grid-cols-5 gap-4 p-6 bg-[#FEF2F2] items-center">
            <div className="font-bold text-[#E8192C]">Solar Path (You)</div>
            <div>
              <div className="flex items-center gap-3">
                <div className="w-20 h-2 bg-[#FECACA] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#E8192C] rounded-full transition-all duration-1000"
                    style={{ width: isVisible ? '34%' : '0%', transitionDelay: '400ms' }}
                  />
                </div>
                <span className="text-[#E8192C] font-bold">34</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <X className="w-4 h-4 text-[#E8192C]" />
                <span className="text-[#E8192C] font-medium">Inactive</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <X className="w-4 h-4 text-[#E8192C]" />
                <span className="text-[#E8192C] font-medium">No</span>
              </div>
            </div>
            <div>
              <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-[#1A1A2E] text-white">
                YOU
              </span>
            </div>
          </div>
        </div>

        {/* Bottom warning */}
        <div className={`mt-8 flex items-center justify-center gap-3 text-[#64748B] transition-all duration-700 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <AlertTriangle className="w-5 h-5 text-[#F59E0B]" />
          <p className="text-center">
            Every month of inaction is market share handed to competitors on a silver platter.
          </p>
        </div>
      </div>
    </section>
  )
}
