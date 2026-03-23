'use client'

import { useAnimateOnScroll } from '@/hooks/use-animate-on-scroll'

export default function CTA() {
  const { ref, isVisible } = useAnimateOnScroll(0.1)

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#E8192C]/20 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#E8192C]/20 rounded-full blur-[150px]" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div 
          ref={ref}
          className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <span className="text-[#E8192C] text-sm font-bold tracking-widest mb-6 block">NEXT STEPS</span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
            Ready to Stop
            <br />
            <span className="text-[#E8192C]">Leaking Money?</span>
          </h2>
          <p className="text-xl text-white/50 max-w-2xl mx-auto mb-12">
            Book a 30-minute strategy call. We will walk through this audit together and map out a growth plan tailored to Solar Path.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a 
              href="mailto:hello@etotomedia.com?subject=Solar%20Path%20Growth%20Audit"
              className="group inline-flex items-center gap-3 bg-[#E8192C] hover:bg-[#ff2a3f] text-white px-10 py-5 text-lg font-bold rounded-full transition-all hover:scale-105 hover:shadow-[0_0_60px_rgba(232,25,44,0.5)]"
            >
              Book Strategy Call
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a 
              href="mailto:hello@etotomedia.com"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white px-6 py-4 text-lg transition-all"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              hello@etotomedia.com
            </a>
          </div>

          {/* Trust badges */}
          <div className={`flex items-center justify-center gap-8 opacity-50 transition-all duration-700 delay-300 ${isVisible ? 'opacity-50' : 'opacity-0'}`}>
            <img 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Etoto%20logo%20%28Black%29-tn289JpGNWiyy62pa8d9DxYU9rejGO.png" 
              alt="ETOTO Media" 
              className="h-8 object-contain brightness-0 invert opacity-60"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto mt-24 pt-8 border-t border-white/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/30">
          <p>© 2026 ETOTO Media. All rights reserved.</p>
          <p>Prepared exclusively for Solar Path. Confidential.</p>
          <a href="https://etotomedia.com" className="hover:text-white/60 transition-colors">etotomedia.com</a>
        </div>
      </div>
    </section>
  )
}
