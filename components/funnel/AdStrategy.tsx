'use client'

import { useEffect, useRef, useState } from 'react'
import { CheckCircle, Zap, TrendingUp } from 'lucide-react'
import { useCountUp } from '@/hooks/use-animate-on-scroll'

const adExamples = [
  { image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/14%20Panel%20%26%205kWh%20Battery%20Package%20Ad%20V1-BOrCjBjfx9Pe1TxrPJekGDbIyZxAJp.png', title: '14 Panel + Battery', description: 'Clear pricing, SEAI grant, professional imagery' },
  { image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4%2010%20Panel%20Package%20Ad%20V2-dKl3A3NnX3qAtsMQLh6aq1RnZKLkZR.png', title: '10 Panel Package', description: 'Entry-level with strong value proposition' },
  { image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Breaking%20News%20Grant-M2QurqMxxrUTkNEdTWEj2KS6zCHBji.png', title: 'Breaking News', description: 'News-style for pattern interrupt' },
]

const strategyPoints = [
  { title: 'Direct, On-The-Nose Messaging', description: 'No fluff, no jargon. Clear pricing, clear benefits, clear call to action. Does exactly what it says on the tin.' },
  { title: 'Pattern-Interrupt Hooks', description: 'News-style formats, bold headlines, and unexpected visuals that stop the scroll in a crowded feed.' },
  { title: '8-Step Qualification Gate', description: 'After clicking, prospects go through a qualification quiz. By the time they submit, they are pre-sold and ready to buy.' },
  { title: 'Grant-Led Value Proposition', description: 'SEAI grant messaging front and centre. Homeowners see immediate savings, not just another solar ad.' },
]

export default function AdStrategy() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeAd, setActiveAd] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  
  const conversionIncrease = useCountUp(340, 1500, isVisible)

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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveAd(prev => (prev + 1) % adExamples.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section ref={sectionRef} className="py-16 md:py-32 px-4 md:px-6 bg-white relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-blue-50/50 to-transparent pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`text-center mb-10 md:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs md:text-sm font-semibold px-4 py-2 rounded-full mb-4">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            Proven Ad Strategy
          </span>
          <h2 className="text-2xl md:text-5xl font-black text-slate-900 mb-3 md:mb-4">
            Ads That Actually Convert
          </h2>
          <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto">
            These are the exact creatives we run in the Irish market. Direct. Effective. Profitable.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Ad carousel */}
          <div className={`transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="relative bg-slate-50 rounded-xl md:rounded-2xl p-3 md:p-4 mb-3 md:mb-4">
              <div className="aspect-square relative overflow-hidden rounded-lg md:rounded-xl shadow-lg">
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
              
              {/* Progress bar */}
              <div className="absolute bottom-5 md:bottom-6 left-5 md:left-6 right-5 md:right-6 h-1 bg-white/30 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white rounded-full transition-all duration-100"
                  style={{ width: `${((activeAd + 1) / adExamples.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Ad selector */}
            <div className="grid grid-cols-3 gap-2">
              {adExamples.map((ad, i) => (
                <button
                  key={i}
                  onClick={() => setActiveAd(i)}
                  className={`p-2 md:p-3 rounded-lg md:rounded-xl text-left transition-all duration-300 ${
                    activeAd === i 
                      ? 'bg-[#E8192C] text-white shadow-lg shadow-[#E8192C]/20 scale-105' 
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <p className="font-semibold text-xs md:text-sm truncate">{ad.title}</p>
                  <p className={`text-[10px] md:text-xs mt-0.5 md:mt-1 line-clamp-1 ${activeAd === i ? 'text-white/70' : 'text-slate-400'}`}>
                    {ad.description}
                  </p>
                </button>
              ))}
            </div>

            {/* Conversion stat */}
            <div className="mt-4 md:mt-6 bg-green-50 border border-green-100 rounded-xl p-3 md:p-4 flex items-center gap-3 md:gap-4 group hover:bg-green-100 transition-colors">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-green-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-green-700 text-sm md:text-base">+{conversionIncrease}% Higher Conversion</p>
                <p className="text-xs md:text-sm text-green-600/70">Compared to generic "Get a free quote" ads</p>
              </div>
            </div>
          </div>

          {/* Strategy breakdown */}
          <div className={`space-y-4 md:space-y-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900">Why These Ads Work</h3>
            
            {strategyPoints.map((point, i) => (
              <div 
                key={i}
                className={`flex gap-3 md:gap-4 p-3 md:p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all cursor-default group ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                }`}
                style={{ transitionDelay: `${300 + i * 100}ms` }}
              >
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-[#E8192C]/10 flex items-center justify-center group-hover:bg-[#E8192C] transition-all flex-shrink-0">
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-[#E8192C] group-hover:text-white transition-all" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm md:text-base mb-0.5 md:mb-1">{point.title}</h4>
                  <p className="text-xs md:text-sm text-slate-500">{point.description}</p>
                </div>
              </div>
            ))}

            <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-4 md:p-6 mt-6 md:mt-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                <Zap className="w-4 h-4 md:w-5 md:h-5 text-[#F5921E]" />
                <p className="text-white font-bold text-sm md:text-base">The ETOTO Difference</p>
              </div>
              <p className="text-white/70 text-xs md:text-sm leading-relaxed">
                We understand the renewables market. We know what homeowners respond to. 
                We have the data to prove it works.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
