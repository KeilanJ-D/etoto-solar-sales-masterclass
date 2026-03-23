'use client'

import { useAnimateOnScroll } from '@/hooks/use-animate-on-scroll'

const issues = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    title: 'Broken Internal Links',
    value: '47',
    desc: 'Dead-end links frustrating users and bleeding PageRank.'
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Page Load Time',
    value: '4.2s',
    desc: 'Mobile users abandon after 3 seconds. You are losing them.'
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Missing Meta Tags',
    value: '23',
    desc: 'Pages without descriptions. Google guesses. Users skip.'
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Unoptimized Images',
    value: '156',
    desc: 'Heavy images killing load times and Core Web Vitals.'
  },
]

export default function SEOProblems() {
  const { ref, isVisible } = useAnimateOnScroll(0.1)

  return (
    <section className="relative py-32 px-6">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 h-2/3 bg-[#E8192C]/5 rounded-full blur-[200px]" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div 
          ref={ref}
          className={`text-center mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <span className="text-[#E8192C] text-sm font-bold tracking-widest mb-4 block">TECHNICAL SEO</span>
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            The Foundation Is Cracked
          </h2>
          <p className="text-white/50 text-xl max-w-2xl mx-auto">
            Before we even discuss strategy, the technical basics need repair.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {issues.map((issue, i) => {
            const { ref: cardRef, isVisible: cardVisible } = useAnimateOnScroll(0.2)
            return (
              <div 
                key={issue.title}
                ref={cardRef}
                className={`group relative bg-white/[0.02] border border-white/10 rounded-2xl p-8 transition-all duration-700 hover:bg-white/[0.04] hover:border-[#E8192C]/30 ${cardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-14 h-14 bg-[#E8192C]/10 border border-[#E8192C]/30 rounded-xl flex items-center justify-center text-[#E8192C] group-hover:bg-[#E8192C] group-hover:text-white transition-all">
                    {issue.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-xl font-bold">{issue.title}</h3>
                      <span className="text-3xl font-black text-[#E8192C]">{issue.value}</span>
                    </div>
                    <p className="text-white/50">{issue.desc}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
