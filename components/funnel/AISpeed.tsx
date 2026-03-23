'use client'

import { useEffect, useRef, useState } from 'react'
import { Zap, Clock, Bot, Sparkles } from 'lucide-react'
import { useCountUp } from '@/hooks/use-animate-on-scroll'

export default function AISpeed() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  
  const hours = useCountUp(2, 1000, isVisible)

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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F5921E]/5 rounded-full blur-3xl" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className={`text-center mb-10 md:mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 bg-[#F5921E]/20 text-[#F5921E] text-xs md:text-sm font-semibold px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4 animate-pulse" />
            The Future Is Here
          </div>
          <h2 className="text-2xl md:text-5xl font-black text-white mb-3 md:mb-4">
            This Entire Microsite?
            <span className="block text-[#F5921E]">Built in Under 2 Hours.</span>
          </h2>
          <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto">
            Every word, every animation, every section you have scrolled through — created with AI-powered tools that we use across all our clients.
          </p>
        </div>

        <div className={`grid grid-cols-3 gap-3 md:gap-6 mb-10 md:mb-12 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {[
            { icon: Clock, value: `${hours} Hours`, label: 'From concept to live site' },
            { icon: Bot, value: 'AI-Powered', label: 'Copy, design, development' },
            { icon: Zap, value: '24/7', label: 'Running for all our clients' },
          ].map((item, i) => {
            const Icon = item.icon
            return (
              <div 
                key={i}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 text-center hover:bg-white/10 transition-all group"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <Icon className="w-8 h-8 md:w-10 md:h-10 text-[#F5921E] mx-auto mb-2 md:mb-4 group-hover:scale-110 transition-transform" />
                <p className="text-xl md:text-3xl font-black text-white mb-1 md:mb-2">{item.value}</p>
                <p className="text-white/50 text-[10px] md:text-sm">{item.label}</p>
              </div>
            )
          })}
        </div>

        <div className={`bg-gradient-to-r from-[#E8192C]/20 to-[#F5921E]/20 backdrop-blur-sm border border-white/10 rounded-xl md:rounded-2xl p-5 md:p-8 text-center transition-all duration-700 delay-400 hover:border-white/20 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-white/90 text-sm md:text-xl leading-relaxed">
            <span className="font-bold text-white">This is what we do.</span> We leverage cutting-edge AI across content creation, 
            ad creative generation, lead qualification, and campaign optimisation. It is quick, accurate when used properly, 
            and completely hands-off once set up.
          </p>
          <p className="text-white/60 mt-4 md:mt-6 text-xs md:text-sm">
            Imagine this level of speed and quality applied to your entire marketing operation.
          </p>
        </div>

        <div className={`mt-6 md:mt-8 text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-white/40 text-xs md:text-sm italic">
            "Wow, this is free. Imagine what the paid stuff is like."
          </p>
        </div>
      </div>
    </section>
  )
}
