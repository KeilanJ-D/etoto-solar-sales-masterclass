'use client'

import { useAnimateOnScroll } from '@/hooks/use-animate-on-scroll'

export default function Pipeline() {
  const { ref, isVisible } = useAnimateOnScroll(0.1)
  const { ref: cardsRef, isVisible: cardsVisible } = useAnimateOnScroll(0.1)

  return (
    <section className="relative py-32 px-6 bg-gradient-to-b from-transparent via-[#E8192C]/5 to-transparent">
      <div className="max-w-6xl mx-auto">
        <div 
          ref={ref}
          className={`text-center mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <span className="text-[#E8192C] text-sm font-bold tracking-widest mb-4 block">THE OPPORTUNITY</span>
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Pipeline Money Left on the Table
          </h2>
          <p className="text-white/50 text-xl max-w-3xl mx-auto">
            Solar Path operates in 26 counties. Each underperforming metric represents lost revenue that compounds monthly.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Card 1 */}
          <div 
            className={`bg-white/[0.02] border border-white/10 rounded-3xl p-8 transition-all duration-700 ${cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          >
            <div className="text-6xl font-black text-[#E8192C] mb-4">26</div>
            <h3 className="text-xl font-bold mb-3">Counties Served</h3>
            <p className="text-white/50">Nationwide coverage means nationwide opportunity — and nationwide leakage when systems fail.</p>
          </div>

          {/* Card 2 */}
          <div 
            className={`bg-white/[0.02] border border-white/10 rounded-3xl p-8 transition-all duration-700 delay-100 ${cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          >
            <div className="text-6xl font-black text-[#F5921E] mb-4">72%</div>
            <h3 className="text-xl font-bold mb-3">Invisible Keywords</h3>
            <p className="text-white/50">Nearly three-quarters of high-intent solar keywords show zero ranking presence.</p>
          </div>

          {/* Card 3 */}
          <div 
            className={`bg-white/[0.02] border border-white/10 rounded-3xl p-8 transition-all duration-700 delay-200 ${cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          >
            <div className="text-6xl font-black text-white mb-4">0</div>
            <h3 className="text-xl font-bold mb-3">Email Capture</h3>
            <p className="text-white/50">Three calculators exist. None gate results behind email. Users calculate and leave.</p>
          </div>
        </div>

        {/* County grid */}
        <div 
          className={`bg-white/[0.02] border border-white/10 rounded-3xl p-8 transition-all duration-700 delay-300 ${cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <h3 className="text-lg font-bold mb-6 text-white/70">Coverage Area</h3>
          <div className="flex flex-wrap gap-2">
            {['Dublin', 'Cork', 'Galway', 'Limerick', 'Waterford', 'Kerry', 'Tipperary', 'Clare', 'Mayo', 'Donegal', 'Sligo', 'Leitrim', 'Roscommon', 'Longford', 'Westmeath', 'Offaly', 'Laois', 'Kilkenny', 'Carlow', 'Wexford', 'Wicklow', 'Kildare', 'Meath', 'Louth', 'Cavan', 'Monaghan'].map((county, i) => (
              <span 
                key={county}
                className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-sm text-white/60 hover:bg-[#E8192C]/20 hover:border-[#E8192C]/40 hover:text-white transition-all cursor-default"
                style={{ animationDelay: `${i * 30}ms` }}
              >
                {county}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
