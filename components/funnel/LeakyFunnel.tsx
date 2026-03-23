'use client'

import { useAnimateOnScroll } from '@/hooks/use-animate-on-scroll'

const stages = [
  { 
    stage: 'AWARENESS', 
    current: 'No blog, no educational content', 
    fix: 'Content hub with solar guides',
    leakPercent: 40 
  },
  { 
    stage: 'INTEREST', 
    current: 'Calculators exist but no email gate', 
    fix: 'Gated tools + lead magnets',
    leakPercent: 60 
  },
  { 
    stage: 'CONSIDERATION', 
    current: 'Generic contact form only', 
    fix: 'Multi-step qualification quiz',
    leakPercent: 75 
  },
  { 
    stage: 'DECISION', 
    current: 'No urgency, no social proof', 
    fix: 'Testimonials + limited offers',
    leakPercent: 85 
  },
]

export default function LeakyFunnel() {
  const { ref, isVisible } = useAnimateOnScroll(0.1)

  return (
    <section className="relative py-32 px-6 bg-gradient-to-b from-transparent via-[#0f0505] to-transparent">
      <div className="max-w-6xl mx-auto">
        <div 
          ref={ref}
          className={`text-center mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <span className="text-[#E8192C] text-sm font-bold tracking-widest mb-4 block">CONVERSION AUDIT</span>
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Your Funnel Is Leaking
          </h2>
          <p className="text-white/50 text-xl max-w-2xl mx-auto">
            Every stage loses prospects. Here is where they drop off — and how we plug the holes.
          </p>
        </div>

        <div className="relative">
          {/* Funnel visualization */}
          <div className="space-y-4">
            {stages.map((stage, i) => {
              const { ref: stageRef, isVisible: stageVisible } = useAnimateOnScroll(0.2)
              const width = 100 - (i * 15)
              
              return (
                <div 
                  key={stage.stage}
                  ref={stageRef}
                  className={`transition-all duration-700 ${stageVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div 
                    className="relative bg-gradient-to-r from-[#E8192C]/20 to-transparent border-l-4 border-[#E8192C] rounded-r-2xl p-6 mx-auto group hover:from-[#E8192C]/30 transition-all"
                    style={{ width: `${width}%` }}
                  >
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <span className="text-[#E8192C] text-xs font-bold tracking-widest">{stage.stage}</span>
                        <p className="text-white font-medium mt-1">{stage.current}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <svg className="w-6 h-6 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        <div className="bg-white/10 rounded-lg px-4 py-2">
                          <p className="text-white/80 text-sm">{stage.fix}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Leak indicator */}
                    <div 
                      className="absolute -right-4 top-1/2 -translate-y-1/2 bg-[#E8192C] text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      -{stage.leakPercent}% leak
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Bottom conversion rate */}
          <div className={`mt-12 text-center transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="inline-flex flex-col items-center bg-white/[0.02] border border-white/10 rounded-2xl p-8">
              <span className="text-white/50 text-sm mb-2">Current Estimated Conversion Rate</span>
              <span className="text-5xl font-black text-[#E8192C]">0.8%</span>
              <span className="text-white/30 text-sm mt-2">Industry average: 2.5-4%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
