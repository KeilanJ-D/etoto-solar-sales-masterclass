'use client'

import { useEffect, useRef, useState } from 'react'
import { Target, CheckCircle, ArrowRight, Zap, TrendingUp } from 'lucide-react'

const adExamples = [
  {
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/14%20Panel%20%26%205kWh%20Battery%20Package%20Ad%20V1-BOrCjBjfx9Pe1TxrPJekGDbIyZxAJp.png',
    title: '14 Panel + Battery Package',
    description: 'Clear pricing, SEAI grant messaging, professional imagery',
  },
  {
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4%2010%20Panel%20Package%20Ad%20V2-dKl3A3NnX3qAtsMQLh6aq1RnZKLkZR.png',
    title: '10 Panel Package',
    description: 'Entry-level offer with strong value proposition',
  },
  {
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Breaking%20News%20Grant-M2QurqMxxrUTkNEdTWEj2KS6zCHBji.png',
    title: 'Breaking News Format',
    description: 'News-style creative for pattern interrupt',
  },
]

const strategyPoints = [
  {
    title: 'Direct, On-The-Nose Messaging',
    description: 'No fluff, no jargon. Clear pricing, clear benefits, clear call to action. Does exactly what it says on the tin.',
  },
  {
    title: 'Pattern-Interrupt Hooks',
    description: 'News-style formats, bold headlines, and unexpected visuals that stop the scroll in a crowded feed.',
  },
  {
    title: '8-Step Qualification Gate',
    description: 'After clicking, prospects go through a qualification quiz. By the time they submit, they are pre-sold and ready to buy.',
  },
  {
    title: 'Grant-Led Value Proposition',
    description: 'SEAI grant messaging front and centre. Homeowners see immediate savings, not just another solar ad.',
  },
]

export default function AdStrategy() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeAd, setActiveAd] = useState(0)
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveAd(prev => (prev + 1) % adExamples.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block bg-[#E0F2FE] text-[#0369A1] text-sm font-semibold px-4 py-2 rounded-full mb-4">
            Proven Ad Strategy
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-[#1A1A2E] mb-4">
            Ads That Actually Convert
          </h2>
          <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
            These are the exact creatives we run in the Irish market. Direct. Effective. Profitable.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Ad carousel */}
          <div className={`transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative bg-[#F8FAFC] rounded-2xl p-4 mb-4">
              <div className="aspect-square relative overflow-hidden rounded-xl">
                {adExamples.map((ad, i) => (
                  <img 
                    key={i}
                    src={ad.image} 
                    alt={ad.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                      activeAd === i ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Ad selector */}
            <div className="flex gap-2">
              {adExamples.map((ad, i) => (
                <button
                  key={i}
                  onClick={() => setActiveAd(i)}
                  className={`flex-1 p-3 rounded-xl text-left transition-all ${
                    activeAd === i 
                      ? 'bg-[#E8192C] text-white' 
                      : 'bg-[#F8FAFC] text-[#64748B] hover:bg-[#F1F5F9]'
                  }`}
                >
                  <p className="font-semibold text-sm">{ad.title}</p>
                  <p className={`text-xs mt-1 ${activeAd === i ? 'text-white/70' : 'text-[#94A3B8]'}`}>
                    {ad.description}
                  </p>
                </button>
              ))}
            </div>

            {/* Conversion stat */}
            <div className="mt-6 bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#16A34A] flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-[#166534]">+340% Higher Conversion</p>
                <p className="text-sm text-[#166534]/70">Compared to generic "Get a free quote" ads</p>
              </div>
            </div>
          </div>

          {/* Strategy breakdown */}
          <div className={`space-y-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h3 className="text-2xl font-bold text-[#1A1A2E]">Why These Ads Work</h3>
            
            {strategyPoints.map((point, i) => (
              <div 
                key={i}
                className="flex gap-4 p-4 bg-[#F8FAFC] rounded-xl hover:bg-[#F1F5F9] transition-all cursor-default group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#E8192C]/10 flex items-center justify-center group-hover:bg-[#E8192C] transition-all">
                  <CheckCircle className="w-5 h-5 text-[#E8192C] group-hover:text-white transition-all" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1A1A2E] mb-1">{point.title}</h4>
                  <p className="text-sm text-[#64748B]">{point.description}</p>
                </div>
              </div>
            ))}

            <div className="bg-gradient-to-r from-[#1A1A2E] to-[#2D2D44] rounded-xl p-6 mt-8">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-5 h-5 text-[#F5921E]" />
                <p className="text-white font-bold">The ETOTO Difference</p>
              </div>
              <p className="text-white/70 text-sm">
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
