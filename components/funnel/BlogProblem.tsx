'use client'

import { useEffect, useRef, useState } from 'react'
import { Calendar, FileText, TrendingDown, Zap } from 'lucide-react'

export default function BlogProblem() {
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
    <section ref={sectionRef} className="py-24 md:py-32 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block bg-[#FEE2E2] text-[#DC2626] text-sm font-semibold px-4 py-2 rounded-full mb-4">
            Content Strategy
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-[#1A1A2E] mb-4">
            Your Blog Is Dead in the Water
          </h2>
          <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
            Content is the engine of organic growth. Yours has stalled completely.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Current state */}
          <div className={`bg-[#FEF2F2] border border-[#FECACA] rounded-2xl p-8 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#FEE2E2] flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1A2E]">Current State</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-[#DC2626] mt-0.5" />
                <div>
                  <p className="font-semibold text-[#1A1A2E]">9 blog posts total</p>
                  <p className="text-sm text-[#64748B]">All published on the same day — clearly a one-time effort</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-[#DC2626] mt-0.5" />
                <div>
                  <p className="font-semibold text-[#1A1A2E]">1 post two months later</p>
                  <p className="text-sm text-[#64748B]">Then nothing since. Google notices this inactivity.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <TrendingDown className="w-5 h-5 text-[#DC2626] mt-0.5" />
                <div>
                  <p className="font-semibold text-[#1A1A2E]">Zero topical authority</p>
                  <p className="text-sm text-[#64748B]">No content clusters, no internal linking, no expertise signals</p>
                </div>
              </div>
            </div>
          </div>

          {/* AI-powered solution */}
          <div className={`bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-8 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#DCFCE7] flex items-center justify-center">
                <Zap className="w-6 h-6 text-[#16A34A]" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1A2E]">The Solution</h3>
            </div>
            
            <p className="text-[#166534] mb-6">
              With the power of AI, there is <span className="font-bold">no excuse</span> to not have hyper-optimised blog content running on autopilot.
            </p>
            
            <div className="space-y-3">
              {[
                'Weekly SEO-optimised articles published automatically',
                'Content clusters targeting high-intent keywords',
                'Local content for each county you serve',
                'FAQ sections that capture featured snippets',
                'Internal linking that builds topical authority'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#16A34A] flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-[#166534] font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom message */}
        <div className={`bg-gradient-to-r from-[#1A1A2E] to-[#2D2D44] rounded-2xl p-8 text-center transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-white/90 text-lg md:text-xl font-medium">
            Your competitors are publishing <span className="text-[#E8192C] font-bold">consistently — weekly or fortnightly</span>. 
            Your blog has been inactive since late 2025. Every week you wait, they pull further ahead.
          </p>
        </div>
      </div>
    </section>
  )
}
