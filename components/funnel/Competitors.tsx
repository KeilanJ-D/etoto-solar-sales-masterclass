'use client'

import { useAnimateOnScroll } from '@/hooks/use-animate-on-scroll'

const competitors = [
  { name: 'Activ8 Solar', seo: 72, content: true, automation: true, threat: 'HIGH' },
  { name: 'Pinergy', seo: 68, content: true, automation: true, threat: 'HIGH' },
  { name: 'Electric Ireland Solar', seo: 81, content: true, automation: true, threat: 'CRITICAL' },
  { name: 'SSE Airtricity', seo: 75, content: true, automation: false, threat: 'HIGH' },
]

export default function Competitors() {
  const { ref, isVisible } = useAnimateOnScroll(0.1)

  return (
    <section className="relative py-32 px-6">
      <div className="absolute right-0 top-0 w-1/2 h-1/2 bg-[#E8192C]/5 rounded-full blur-[200px]" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div 
          ref={ref}
          className={`text-center mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <span className="text-[#E8192C] text-sm font-bold tracking-widest mb-4 block">COMPETITIVE LANDSCAPE</span>
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            While You Wait, They Win
          </h2>
          <p className="text-white/50 text-xl max-w-2xl mx-auto">
            Your competitors are not standing still. Here is what they are doing that you are not.
          </p>
        </div>

        {/* Competitor table */}
        <div className={`bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="grid grid-cols-5 gap-4 p-6 border-b border-white/10 text-sm font-bold text-white/50">
            <div>Competitor</div>
            <div>SEO Score</div>
            <div>Content Strategy</div>
            <div>Lead Automation</div>
            <div>Threat Level</div>
          </div>
          
          {competitors.map((comp, i) => (
            <div 
              key={comp.name}
              className="grid grid-cols-5 gap-4 p-6 border-b border-white/5 hover:bg-white/[0.02] transition-all items-center"
            >
              <div className="font-semibold">{comp.name}</div>
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#16A34A] rounded-full"
                      style={{ width: `${comp.seo}%` }}
                    />
                  </div>
                  <span className="text-white/70">{comp.seo}</span>
                </div>
              </div>
              <div>
                {comp.content ? (
                  <span className="text-[#16A34A]">Active</span>
                ) : (
                  <span className="text-white/30">None</span>
                )}
              </div>
              <div>
                {comp.automation ? (
                  <span className="text-[#16A34A]">Yes</span>
                ) : (
                  <span className="text-white/30">No</span>
                )}
              </div>
              <div>
                <span 
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    comp.threat === 'CRITICAL' 
                      ? 'bg-[#E8192C]/20 text-[#E8192C]' 
                      : 'bg-[#F5921E]/20 text-[#F5921E]'
                  }`}
                >
                  {comp.threat}
                </span>
              </div>
            </div>
          ))}
          
          {/* Solar Path row */}
          <div className="grid grid-cols-5 gap-4 p-6 bg-[#E8192C]/10 items-center">
            <div className="font-semibold text-[#E8192C]">Solar Path</div>
            <div>
              <div className="flex items-center gap-3">
                <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#E8192C] rounded-full" style={{ width: '38%' }} />
                </div>
                <span className="text-[#E8192C]">38</span>
              </div>
            </div>
            <div><span className="text-[#E8192C]">None</span></div>
            <div><span className="text-[#E8192C]">No</span></div>
            <div><span className="text-xs font-bold px-3 py-1 rounded-full bg-white/10 text-white/50">YOU</span></div>
          </div>
        </div>

        <p className={`text-center text-white/40 mt-8 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          Every month of inaction is market share handed to competitors on a silver platter.
        </p>
      </div>
    </section>
  )
}
