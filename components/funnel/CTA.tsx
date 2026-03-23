'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Mail, Calendar } from 'lucide-react'

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
    <section ref={sectionRef} className="py-24 md:py-32 px-6 bg-gradient-to-b from-white to-[#F8F9FA]">
      <div className="max-w-4xl mx-auto">
        <div className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block bg-[#E8192C]/10 text-[#E8192C] text-sm font-semibold px-4 py-2 rounded-full mb-6">
            Next Steps
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#1A1A2E] mb-6 leading-tight">
            Ready to Stop
            <br />
            <span className="text-[#E8192C]">Leaking Revenue?</span>
          </h2>
          <p className="text-lg md:text-xl text-[#64748B] max-w-2xl mx-auto mb-10">
            Book a 30-minute strategy call. We shall walk through this audit together and map out a growth plan tailored specifically to Solar Path.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a 
              href="mailto:hello@etotomedia.com?subject=Solar%20Path%20Growth%20Strategy%20Call"
              className="group inline-flex items-center gap-3 bg-[#E8192C] hover:bg-[#D01622] text-white px-8 py-4 text-lg font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#E8192C]/25"
            >
              <Calendar className="w-5 h-5" />
              Book Strategy Call
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="mailto:hello@etotomedia.com"
              className="inline-flex items-center gap-2 text-[#64748B] hover:text-[#1A1A2E] px-6 py-4 text-lg transition-all"
            >
              <Mail className="w-5 h-5" />
              hello@etotomedia.com
            </a>
          </div>

          <div className={`flex items-center justify-center gap-8 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <img 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ETOTO_Joel-Sp4sI6W29ziGLLM0CGKbh7tBi3HDbM.png" 
              alt="ETOTO Media" 
              className="h-8 object-contain"
            />
            <span className="text-[#CBD5E1]">×</span>
            <img 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/solar%20path%20logo-gb9aYzjnVnp3LFRgT565BJqotuLeRG.png" 
              alt="Solar Path" 
              className="h-8 object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
