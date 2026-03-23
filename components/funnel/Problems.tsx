'use client'

import { useAnimateOnScroll } from '@/hooks/use-animate-on-scroll'

const problems = [
  { score: 38, label: 'SEO Health', status: 'CRITICAL', color: '#E8192C' },
  { score: 45, label: 'Conversion Rate', status: 'POOR', color: '#F5921E' },
  { score: 52, label: 'Brand Consistency', status: 'WEAK', color: '#F5921E' },
  { score: 28, label: 'Lead Capture', status: 'FAILING', color: '#E8192C' },
]

function ScoreCard({ score, label, status, color, delay }: { score: number; label: string; status: string; color: string; delay: number }) {
  const { ref, isVisible } = useAnimateOnScroll(0.2)
  
  return (
    <div 
      ref={ref}
      className={`relative bg-white/[0.02] border border-white/10 rounded-2xl p-8 transition-all duration-700 hover:bg-white/[0.04] hover:border-white/20 group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-6">
        <div 
          className="text-6xl font-black transition-all duration-500"
          style={{ color }}
        >
          {isVisible ? score : 0}
        </div>
        <span 
          className="text-xs font-bold tracking-wider px-3 py-1.5 rounded-full"
          style={{ backgroundColor: `${color}20`, color }}
        >
          {status}
        </span>
      </div>
      <p className="text-white/60 text-lg font-medium">{label}</p>
      
      {/* Progress bar */}
      <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ 
            width: isVisible ? `${score}%` : '0%', 
            backgroundColor: color,
            transitionDelay: `${delay + 200}ms`
          }}
        />
      </div>
    </div>
  )
}

export default function Problems() {
  const { ref, isVisible } = useAnimateOnScroll(0.1)

  return (
    <section id="problems" className="relative py-32 px-6">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#E8192C]/5 rounded-full blur-[200px]" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div 
          ref={ref}
          className={`text-center mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <span className="text-[#E8192C] text-sm font-bold tracking-widest mb-4 block">THE DIAGNOSIS</span>
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Executive Snapshot
          </h2>
          <p className="text-white/50 text-xl max-w-2xl mx-auto">
            Four critical metrics. Four failing grades. Here is where Solar Path stands today.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, i) => (
            <ScoreCard key={problem.label} {...problem} delay={i * 100} />
          ))}
        </div>

        {/* Bottom insight */}
        <div 
          className={`mt-16 text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <div className="inline-flex items-center gap-3 bg-[#E8192C]/10 border border-[#E8192C]/30 rounded-full px-6 py-3">
            <svg className="w-5 h-5 text-[#E8192C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="text-white/80 font-medium">Combined audit score: <span className="text-[#E8192C] font-bold">41/100</span></span>
          </div>
        </div>
      </div>
    </section>
  )
}
