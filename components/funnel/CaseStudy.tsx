'use client'

import { useEffect, useRef, useState } from 'react'
import { TrendingDown, Check } from 'lucide-react'
import { useCountUp } from '@/hooks/use-animate-on-scroll'

export default function CaseStudy() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  
  const cpa = useCountUp(450, 1500, isVisible)
  const leads = useCountUp(78, 1200, isVisible)
  const spend = useCountUp(35, 1000, isVisible)

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
    <section ref={sectionRef} className="py-16 md:py-32 px-4 md:px-6 bg-slate-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E8192C]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#F5921E]/10 rounded-full blur-3xl" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`text-center mb-10 md:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-flex items-center gap-2 bg-[#E8192C]/20 text-[#E8192C] text-xs md:text-sm font-semibold px-4 py-2 rounded-full mb-4">
            <span className="w-2 h-2 bg-[#E8192C] rounded-full animate-pulse" />
            Live Case Study
          </span>
          <h2 className="text-2xl md:text-5xl font-black text-white mb-3 md:mb-4">
            How We Transformed UPS Solar
          </h2>
          <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto">
            Real results from a real solar installer. Same challenges, same market, same opportunity.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-12">
          {/* Before - Jolly Media Marketing */}
          <div className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl md:rounded-2xl p-5 md:p-8 transition-all duration-700 delay-100 hover:bg-white/10 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="flex items-center gap-3 md:gap-4 mb-5 md:mb-6">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#DC2626]/20 flex items-center justify-center">
                <TrendingDown className="w-5 h-5 md:w-6 md:h-6 text-[#DC2626]" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-white">Before ETOTO</h3>
                <p className="text-white/50 text-xs md:text-sm">Working with Jolly Media Marketing</p>
              </div>
            </div>

            <div className="space-y-3 md:space-y-4 mb-5 md:mb-6">
              {[
                "Did not understand the renewables market",
                "Poor ad creatives that failed to convert",
                "Terrible pricing strategy",
                "Fox-only offers with zero margin"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 group">
                  <div className="w-2 h-2 rounded-full bg-[#DC2626] mt-1.5 md:mt-2 group-hover:scale-150 transition-transform" />
                  <p className="text-white/70 text-sm md:text-base">{item}</p>
                </div>
              ))}
            </div>

            <div className="bg-[#DC2626]/10 border border-[#DC2626]/30 rounded-xl p-3 md:p-4">
              <p className="text-[#DC2626] font-bold text-sm md:text-lg">Result: Unsustainable CPAs, poor lead quality</p>
            </div>
          </div>

          {/* After - ETOTO */}
          <div className={`bg-gradient-to-br from-[#E8192C]/20 to-[#F5921E]/10 backdrop-blur-sm border border-[#E8192C]/30 rounded-xl md:rounded-2xl p-5 md:p-8 transition-all duration-700 delay-200 hover:border-[#E8192C]/50 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="flex items-center gap-3 md:gap-4 mb-5 md:mb-6">
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ETOTO_Joel-Sp4sI6W29ziGLLM0CGKbh7tBi3HDbM.png" 
                alt="ETOTO Media" 
                className="h-8 md:h-10 object-contain"
              />
              <div>
                <h3 className="text-lg md:text-xl font-bold text-white">After ETOTO</h3>
                <p className="text-white/50 text-xs md:text-sm">Sigenergy & Aiko strategy</p>
              </div>
            </div>

            <div className="space-y-3 md:space-y-4 mb-5 md:mb-6">
              {[
                "Premium Sigenergy & Aiko offer positioning",
                "Direct, on-the-nose ad creatives that convert",
                "8-step qualification gate after click",
                "More leads with less budget"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 group">
                  <Check className="w-4 h-4 md:w-5 md:h-5 text-[#16A34A] mt-0.5 flex-shrink-0 group-hover:scale-125 transition-transform" />
                  <p className="text-white/70 text-sm md:text-base">{item}</p>
                </div>
              ))}
            </div>

            <div className="bg-[#16A34A]/20 border border-[#16A34A]/30 rounded-xl p-3 md:p-4">
              <p className="text-[#16A34A] font-bold text-sm md:text-lg">Result: £450 CPA (per owner Paul Harrison)</p>
            </div>
          </div>
        </div>

        {/* UPS Solar logo and stats */}
        <div className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl md:rounded-2xl p-5 md:p-8 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
            <div className="flex items-center gap-4 md:gap-6">
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ups-logo%201-ztcb9P0ESqqPQCo0hyWBEUFcj4RrT3.png" 
                alt="UPS Solar" 
                className="h-12 md:h-16 object-contain"
              />
              <div>
                <h4 className="text-lg md:text-xl font-bold text-white">UPS Solar</h4>
                <p className="text-white/50 text-sm">UK-based solar installer</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 md:gap-8 text-center w-full md:w-auto">
              <div className="group">
                <p className="text-2xl md:text-4xl font-black text-[#E8192C] group-hover:scale-110 transition-transform">£{cpa}</p>
                <p className="text-white/50 text-xs md:text-sm">Cost Per Acquisition</p>
              </div>
              <div className="group">
                <p className="text-2xl md:text-4xl font-black text-[#16A34A] group-hover:scale-110 transition-transform">+{leads}%</p>
                <p className="text-white/50 text-xs md:text-sm">More Leads</p>
              </div>
              <div className="group">
                <p className="text-2xl md:text-4xl font-black text-[#F5921E] group-hover:scale-110 transition-transform">-{spend}%</p>
                <p className="text-white/50 text-xs md:text-sm">Lower Ad Spend</p>
              </div>
            </div>
          </div>
        </div>

        {/* Meta Ads comparison screenshot */}
        <div className={`mt-8 md:mt-12 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-center text-white/50 text-xs md:text-sm mb-3 md:mb-4">Live Meta Ads Manager comparison</p>
          <div className="rounded-xl md:rounded-2xl overflow-hidden border border-white/10 shadow-2xl hover:shadow-[#E8192C]/20 transition-shadow duration-500">
            <img 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/us%20vs%20them%20-%20UPS-8wrbM7jp1whgKjN2cZXvTCA0pQ0D02.jpg" 
              alt="Meta Ads Manager comparison showing ETOTO vs competitor results" 
              className="w-full"
            />
          </div>
          <p className="text-center text-white/40 text-xs mt-3 md:mt-4">
            ETOTO campaign: 1,315 leads at £16.53 CPL vs Competitor: 734 leads at £29.64 CPL
          </p>
        </div>
      </div>
    </section>
  )
}
