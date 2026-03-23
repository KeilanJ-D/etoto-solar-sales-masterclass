'use client'

import { useEffect, useRef, useState } from 'react'
import { TrendingUp, TrendingDown, Zap, Target, Banknote } from 'lucide-react'

export default function CaseStudy() {
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
    <section ref={sectionRef} className="py-24 md:py-32 px-6 bg-[#1A1A2E]">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block bg-[#E8192C]/20 text-[#E8192C] text-sm font-semibold px-4 py-2 rounded-full mb-4">
            Live Case Study
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            How We Transformed UPS Solar
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Real results from a real solar installer. Same challenges, same market, same opportunity.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Before - Jolly Media Marketing */}
          <div className={`bg-white/5 border border-white/10 rounded-2xl p-8 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#DC2626]/20 flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-[#DC2626]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Before ETOTO</h3>
                <p className="text-white/50 text-sm">Working with Jolly Media Marketing</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#DC2626] mt-2" />
                <p className="text-white/70">Did not understand the renewables market</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#DC2626] mt-2" />
                <p className="text-white/70">Poor ad creatives that failed to convert</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#DC2626] mt-2" />
                <p className="text-white/70">Terrible pricing strategy</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#DC2626] mt-2" />
                <p className="text-white/70">Fox-only offers with zero margin</p>
              </div>
            </div>

            <div className="bg-[#DC2626]/10 border border-[#DC2626]/30 rounded-xl p-4">
              <p className="text-[#DC2626] font-bold text-lg">Result: Unsustainable CPAs, poor lead quality</p>
            </div>
          </div>

          {/* After - ETOTO */}
          <div className={`bg-gradient-to-br from-[#E8192C]/20 to-[#F5921E]/10 border border-[#E8192C]/30 rounded-2xl p-8 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center gap-4 mb-6">
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ETOTO_Joel-Sp4sI6W29ziGLLM0CGKbh7tBi3HDbM.png" 
                alt="ETOTO Media" 
                className="h-10 object-contain"
              />
              <div>
                <h3 className="text-xl font-bold text-white">After ETOTO</h3>
                <p className="text-white/50 text-sm">Sigenergy & Aiko strategy</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#16A34A] mt-2" />
                <p className="text-white/70">Premium Sigenergy & Aiko offer positioning</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#16A34A] mt-2" />
                <p className="text-white/70">Direct, on-the-nose ad creatives that convert</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#16A34A] mt-2" />
                <p className="text-white/70">8-step qualification gate after click</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#16A34A] mt-2" />
                <p className="text-white/70">More leads with less budget</p>
              </div>
            </div>

            <div className="bg-[#16A34A]/20 border border-[#16A34A]/30 rounded-xl p-4">
              <p className="text-[#16A34A] font-bold text-lg">Result: £450 CPA (per owner Paul Harrison)</p>
            </div>
          </div>
        </div>

        {/* UPS Solar logo and stats */}
        <div className={`bg-white/5 border border-white/10 rounded-2xl p-8 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ups-logo%201-ztcb9P0ESqqPQCo0hyWBEUFcj4RrT3.png" 
                alt="UPS Solar" 
                className="h-16 object-contain"
              />
              <div>
                <h4 className="text-xl font-bold text-white">UPS Solar</h4>
                <p className="text-white/50">UK-based solar installer</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-3xl md:text-4xl font-black text-[#E8192C]">£450</p>
                <p className="text-white/50 text-sm">Cost Per Acquisition</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-black text-[#16A34A]">+78%</p>
                <p className="text-white/50 text-sm">More Leads</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-black text-[#F5921E]">-35%</p>
                <p className="text-white/50 text-sm">Lower Ad Spend</p>
              </div>
            </div>
          </div>
        </div>

        {/* Meta Ads comparison screenshot */}
        <div className={`mt-12 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-center text-white/50 text-sm mb-4">Live Meta Ads Manager comparison</p>
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <img 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/us%20vs%20them%20-%20UPS-8wrbM7jp1whgKjN2cZXvTCA0pQ0D02.jpg" 
              alt="Meta Ads Manager comparison showing ETOTO vs competitor results" 
              className="w-full"
            />
          </div>
          <p className="text-center text-white/40 text-xs mt-4">
            ETOTO campaign: 1,315 leads at £16.53 CPL vs Competitor: 734 leads at £29.64 CPL
          </p>
        </div>
      </div>
    </section>
  )
}
