'use client'

import { useEffect, useRef, useState } from 'react'
import { Zap, Clock, Bot, Sparkles } from 'lucide-react'

export default function AISpeed() {
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
      <div className="max-w-5xl mx-auto">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 bg-[#F5921E]/20 text-[#F5921E] text-sm font-semibold px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4" />
            The Future Is Here
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            This Entire Microsite?
            <span className="block text-[#F5921E]">Built in Under 2 Hours.</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Every word, every animation, every section you have scrolled through — created with AI-powered tools that we use across all our clients.
          </p>
        </div>

        <div className={`grid md:grid-cols-3 gap-6 mb-12 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <Clock className="w-10 h-10 text-[#F5921E] mx-auto mb-4" />
            <p className="text-3xl font-black text-white mb-2">2 Hours</p>
            <p className="text-white/50 text-sm">From concept to live site</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <Bot className="w-10 h-10 text-[#F5921E] mx-auto mb-4" />
            <p className="text-3xl font-black text-white mb-2">AI-Powered</p>
            <p className="text-white/50 text-sm">Copy, design, development</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <Zap className="w-10 h-10 text-[#F5921E] mx-auto mb-4" />
            <p className="text-3xl font-black text-white mb-2">24/7</p>
            <p className="text-white/50 text-sm">Running for all our clients</p>
          </div>
        </div>

        <div className={`bg-gradient-to-r from-[#E8192C]/20 to-[#F5921E]/20 border border-white/10 rounded-2xl p-8 text-center transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-white/90 text-lg md:text-xl leading-relaxed">
            <span className="font-bold text-white">This is what we do.</span> We leverage cutting-edge AI across content creation, 
            ad creative generation, lead qualification, and campaign optimisation. It is quick, accurate when used properly, 
            and completely hands-off once set up.
          </p>
          <p className="text-white/60 mt-6 text-sm">
            Imagine this level of speed and quality applied to your entire marketing operation.
          </p>
        </div>

        <div className={`mt-8 text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-white/40 text-sm italic">
            "Wow, this is free. Imagine what the paid stuff is like."
          </p>
        </div>
      </div>
    </section>
  )
}
