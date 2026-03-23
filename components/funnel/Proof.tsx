'use client'

import { useAnimateOnScroll } from '@/hooks/use-animate-on-scroll'

const testimonials = [
  {
    quote: "ETOTO transformed our lead generation. We went from 50 leads a month to over 300 qualified prospects.",
    author: "Michael O'Brien",
    role: "CEO, GreenTech Solutions",
    metric: "6x leads"
  },
  {
    quote: "The ROI speaks for itself. Every euro we spend with ETOTO comes back threefold.",
    author: "Sarah Murphy",
    role: "Marketing Director, EcoHomes",
    metric: "3x ROI"
  }
]

export default function Proof() {
  const { ref, isVisible } = useAnimateOnScroll(0.1)

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div 
          ref={ref}
          className={`text-center mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <span className="text-[#E8192C] text-sm font-bold tracking-widest mb-4 block">SOCIAL PROOF</span>
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            We Have Done This Before
          </h2>
          <p className="text-white/50 text-xl max-w-2xl mx-auto">
            Real results from real clients in the renewable energy space.
          </p>
        </div>

        {/* Stats comparison panel */}
        <div className={`bg-[#111] border border-white/10 rounded-3xl p-8 mb-12 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h3 className="text-lg font-bold text-white/70 mb-6">Live Campaign Comparison — Meta Ads Manager</h3>
          
          <div className="overflow-x-auto">
            <img 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/us%20vs%20them%20-%20UPS-8wrbM7jp1whgKjN2cZXvTCA0pQ0D02.jpg"
              alt="ETOTO vs Competitor Campaign Results"
              className="rounded-xl w-full"
            />
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="text-center p-4 bg-white/5 rounded-xl">
              <div className="text-3xl font-black text-[#16A34A] mb-1">1,315</div>
              <div className="text-white/50 text-sm">ETOTO Leads</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-xl">
              <div className="text-3xl font-black text-[#E8192C] mb-1">734</div>
              <div className="text-white/50 text-sm">Competitor Leads</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-xl">
              <div className="text-3xl font-black text-white mb-1">44%</div>
              <div className="text-white/50 text-sm">Lower Cost Per Lead</div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => {
            const { ref: cardRef, isVisible: cardVisible } = useAnimateOnScroll(0.2)
            return (
              <div 
                key={t.author}
                ref={cardRef}
                className={`relative bg-white/[0.02] border border-white/10 rounded-3xl p-8 transition-all duration-700 ${cardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="absolute top-6 right-8 text-6xl text-[#E8192C]/20 font-serif">"</div>
                <span className="inline-block bg-[#E8192C]/20 text-[#E8192C] text-sm font-bold px-3 py-1 rounded-full mb-6">{t.metric}</span>
                <p className="text-xl text-white/80 mb-8 leading-relaxed relative z-10">{t.quote}</p>
                <div>
                  <p className="font-bold">{t.author}</p>
                  <p className="text-white/50 text-sm">{t.role}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
