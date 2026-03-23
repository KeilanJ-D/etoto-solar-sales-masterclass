'use client'

import { useEffect, useRef, useState } from 'react'

export default function CTA() {
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
    <section ref={sectionRef} className="py-24 md:py-40 px-4 md:px-6 bg-white relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-red-50/30 pointer-events-none" />
      
      <div className="max-w-3xl mx-auto relative z-10">
        <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-6 leading-[1.1]">
            Ready to Stop
            <br />
            <span className="text-[#E8192C]">Leaking Revenue?</span>
          </h2>
        </div>

        <div className={`text-center mt-16 md:mt-24 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <p className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-12">
            Good. See you on the call.
          </p>
          
          <div className="space-y-3">
            <p className="text-lg md:text-xl font-semibold text-slate-900">
              Keilan James-Devereux
            </p>
            <p className="text-slate-500">
              Co-Founder, ETOTO Media
            </p>
            <a 
              href="mailto:keilan.jd@etotomedia.com"
              className="inline-block text-[#E8192C] hover:text-[#D01622] font-medium text-lg transition-colors duration-300 hover:underline"
            >
              keilan.jd@etotomedia.com
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
