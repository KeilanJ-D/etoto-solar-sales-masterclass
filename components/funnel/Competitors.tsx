'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, X, AlertTriangle } from 'lucide-react'

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
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 md:py-32 px-4 md:px-6 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-10 md:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 text-xs md:text-sm font-semibold px-4 py-2 rounded-full mb-4">
            <AlertTriangle className="w-4 h-4" />
            Competitive Landscape
          </span>
          <h2 className="text-2xl md:text-5xl font-black text-slate-900 mb-3 md:mb-4">
            While You Wait, They Win
          </h2>
          <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto">
            Your competitors are not standing still. Here is what they are doing that you are not.
          </p>
        </div>

        {/* Mobile card view */}
        <div className="md:hidden space-y-4">
          {competitors.map((comp, i) => (
            <div 
              key={comp.name}
              className={`bg-white rounded-xl border border-slate-100 p-4 shadow-sm transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-slate-900">{comp.name}</h4>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                  comp.threat === 'CRITICAL' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
                }`}>{comp.threat}</span>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs text-slate-500 w-16">SEO</span>
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full transition-all duration-1000" style={{ width: isVisible ? `${comp.seo}%` : '0%' }} />
                </div>
                <span className="text-sm font-semibold text-green-600 w-8">{comp.seo}</span>
              </div>
              <div className="flex gap-4 text-xs">
                <span className={comp.content ? 'text-green-600' : 'text-slate-400'}>
                  {comp.content ? <Check className="w-4 h-4 inline" /> : <X className="w-4 h-4 inline" />} Content
                </span>
                <span className={comp.automation ? 'text-green-600' : 'text-slate-400'}>
                  {comp.automation ? <Check className="w-4 h-4 inline" /> : <X className="w-4 h-4 inline" />} Automation
                </span>
              </div>
            </div>
          ))}
          
          {/* Solar Path mobile */}
          <div className={`bg-red-50 rounded-xl border-2 border-red-200 p-4 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '400ms' }}>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-[#E8192C]">Solar Path (You)</h4>
              <span className="text-xs font-bold px-2 py-1 rounded-full bg-slate-900 text-white">YOU</span>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs text-red-600 w-16">SEO</span>
              <div className="flex-1 h-2 bg-red-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#E8192C] rounded-full transition-all duration-1000" style={{ width: isVisible ? '34%' : '0%' }} />
              </div>
              <span className="text-sm font-bold text-[#E8192C] w-8">34</span>
            </div>
            <div className="flex gap-4 text-xs text-red-600">
              <span><X className="w-4 h-4 inline" /> Content</span>
              <span><X className="w-4 h-4 inline" /> Automation</span>
            </div>
          </div>
        </div>

        {/* Desktop table */}
        <div className={`hidden md:block bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-lg transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-5 gap-4 p-6 border-b border-slate-100 bg-slate-50 text-sm font-bold text-slate-500">
            <div>Competitor</div>
            <div>SEO Score</div>
            <div>Content Strategy</div>
            <div>Lead Automation</div>
            <div>Threat Level</div>
          </div>
          
          {competitors.map((comp, i) => (
            <div key={comp.name} className="grid grid-cols-5 gap-4 p-6 border-b border-slate-100 hover:bg-slate-50 transition-all items-center">
              <div className="font-semibold text-slate-900">{comp.name}</div>
              <div className="flex items-center gap-3">
                <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full transition-all duration-1000" style={{ width: isVisible ? `${comp.seo}%` : '0%', transitionDelay: `${i * 100}ms` }} />
                </div>
                <span className="text-green-600 font-semibold">{comp.seo}</span>
              </div>
              <div className="flex items-center gap-2">
                {comp.content ? <><Check className="w-4 h-4 text-green-500" /><span className="text-green-600 font-medium">Active</span></> : <><X className="w-4 h-4 text-slate-400" /><span className="text-slate-400">None</span></>}
              </div>
              <div className="flex items-center gap-2">
                {comp.automation ? <><Check className="w-4 h-4 text-green-500" /><span className="text-green-600 font-medium">Yes</span></> : <><X className="w-4 h-4 text-slate-400" /><span className="text-slate-400">No</span></>}
              </div>
              <div>
                <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${comp.threat === 'CRITICAL' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>{comp.threat}</span>
              </div>
            </div>
          ))}
          
          {/* Solar Path row */}
          <div className="grid grid-cols-5 gap-4 p-6 bg-red-50 items-center">
            <div className="font-bold text-[#E8192C]">Solar Path (You)</div>
            <div className="flex items-center gap-3">
              <div className="w-20 h-2 bg-red-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#E8192C] rounded-full transition-all duration-1000" style={{ width: isVisible ? '34%' : '0%', transitionDelay: '400ms' }} />
              </div>
              <span className="text-[#E8192C] font-bold">34</span>
            </div>
            <div className="flex items-center gap-2"><X className="w-4 h-4 text-[#E8192C]" /><span className="text-[#E8192C] font-medium">Inactive</span></div>
            <div className="flex items-center gap-2"><X className="w-4 h-4 text-[#E8192C]" /><span className="text-[#E8192C] font-medium">No</span></div>
            <div><span className="text-xs font-bold px-3 py-1.5 rounded-full bg-slate-900 text-white">YOU</span></div>
          </div>
        </div>

        <div className={`mt-6 md:mt-8 flex items-center justify-center gap-2 md:gap-3 text-slate-500 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-amber-500" />
          <p className="text-center text-sm md:text-base">
            Every month of inaction is market share handed to competitors on a silver platter.
          </p>
        </div>
      </div>
    </section>
  )
}
