'use client'

import { useEffect, useState } from 'react'

export default function Hero() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#1a0a0a] to-[#0A0A0A]" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#E8192C 1px, transparent 1px), linear-gradient(90deg, #E8192C 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />
      
      {/* Glowing orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#E8192C]/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Logos */}
        <div 
          className={`flex items-center justify-center gap-6 mb-16 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <img 
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Etoto%20logo%20%28Black%29-tn289JpGNWiyy62pa8d9DxYU9rejGO.png" 
            alt="ETOTO Media" 
            className="h-10 object-contain brightness-0 invert"
          />
          <span className="text-[#E8192C] text-3xl font-light">×</span>
          <img 
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/solar%20path%20logo-gb9aYzjnVnp3LFRgT565BJqotuLeRG.png" 
            alt="Solar Path" 
            className="h-10 object-contain"
          />
        </div>

        {/* Badge */}
        <div 
          className={`inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-8 transition-all duration-1000 delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="w-2 h-2 bg-[#E8192C] rounded-full animate-pulse" />
          <span className="text-sm text-white/70 font-medium tracking-wide">EXCLUSIVE GROWTH AUDIT</span>
        </div>

        {/* Main headline */}
        <h1 
          className={`text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="text-white">Your Website Is</span>
          <br />
          <span className="text-[#E8192C]">Leaking Money</span>
        </h1>

        {/* Subheadline */}
        <p 
          className={`text-xl md:text-2xl text-white/60 font-light max-w-2xl mx-auto mb-12 leading-relaxed transition-all duration-1000 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          A forensic analysis of solarpath.ie reveals critical gaps costing you qualified leads every single day.
        </p>

        {/* CTA */}
        <div 
          className={`transition-all duration-1000 delay-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <a 
            href="#problems"
            className="inline-flex items-center gap-3 bg-[#E8192C] hover:bg-[#ff2a3f] text-white px-8 py-4 text-lg font-semibold rounded-full transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(232,25,44,0.4)]"
          >
            See What We Found
            <svg className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>

        {/* Scroll indicator */}
        <div 
          className={`absolute bottom-12 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-white/40 rounded-full mt-2 animate-[bounce_1.5s_infinite]" />
          </div>
        </div>
      </div>
    </section>
  )
}
