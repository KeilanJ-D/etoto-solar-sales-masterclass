'use client'

import { useEffect, useState, useRef } from 'react'
import { Mail, Globe } from 'lucide-react'

export default function ProposalClosing() {
  const [sectionVisible, setSectionVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSectionVisible(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 md:py-28 px-4 md:px-6 bg-slate-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#E8192C]/10 to-transparent pointer-events-none" />
      
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <p className={`text-2xl md:text-4xl font-black leading-relaxed mb-8 transition-all duration-700 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          You have built a business worth scaling.<br />
          <span className="text-[#E8192C]">Let us build the engine that gets you there.</span>
        </p>
        
        <p className={`text-slate-400 text-lg mb-12 transition-all duration-700 delay-200 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          No pressure. You know what we do and how we do it. Let me know where you land.
        </p>
        
        <div className={`transition-all duration-700 delay-300 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="w-20 h-20 bg-slate-800 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-3xl font-black text-[#E8192C]">KJD</span>
          </div>
          <p className="font-black text-xl mb-1">Keilan James-Devereux</p>
          <p className="text-slate-400 mb-6">Co-Founder & CRO · ETOTO Media</p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="mailto:keilan.jd@etotomedia.com"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-3 rounded-full transition-all duration-300 hover:scale-105"
            >
              <Mail className="w-4 h-4" />
              keilan.jd@etotomedia.com
            </a>
            <a 
              href="https://etotomedia.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#E8192C] hover:bg-[#D01622] text-white px-5 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-[#E8192C]/30"
            >
              <Globe className="w-4 h-4" />
              etotomedia.com
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
