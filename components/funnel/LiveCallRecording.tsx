'use client'

import { useEffect, useRef, useState } from 'react'
import { Play, Clock } from 'lucide-react'

const timestamps = [
  { time: '0:00', label: 'Introduction & rapport' },
  { time: '1:08', label: 'Discovery (Mark\'s situation)' },
  { time: '2:57', label: 'Energy audit (live maths: £3.28/day)' },
  { time: '5:12', label: 'Battery value (£788/year saving)' },
  { time: '7:36', label: 'Solar value (£1,729/year income)' },
  { time: '10:03', label: 'Combined financials (4.99 year payback)' },
  { time: '13:01', label: 'Objection handling ("you\'re the most expensive")' },
  { time: '16:28', label: 'Close (proposal sent, payment structure)' },
  { time: '23:37', label: 'Post-call debrief' },
]

export default function LiveCallRecording() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 md:py-32 px-4 md:px-6 bg-gradient-to-b from-slate-900 to-slate-800 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E8192C] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#F5921E] rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Eyebrow */}
        <div className={`flex items-center justify-center gap-2 mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <Play className="w-4 h-4 text-[#E8192C]" />
          <span className="text-sm font-medium text-slate-400 tracking-wide uppercase">
            See It in Action
          </span>
        </div>

        {/* Main headline */}
        <h2 className={`text-3xl md:text-5xl font-black text-center mb-4 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          A Real Sales Call. Start to Finish.
        </h2>

        {/* Body text */}
        <p className={`text-lg md:text-xl text-slate-300 text-center max-w-3xl mx-auto mb-10 leading-relaxed transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          This is Keilan closing a solar deal over the phone. Every step of the formula, applied in real time. No edits. No scripts on screen. Just the conversation.
        </p>

        {/* YouTube Embed */}
        <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="aspect-video w-full rounded-xl overflow-hidden shadow-2xl border border-white/10">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/Hm7LvAOx3Ro?si=xTt1x6OSFI_Bhk3g"
              title="ETOTO Solar Sales Call"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Timestamps */}
        <div className={`mt-8 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-[#F5921E]" />
            <span className="text-sm font-medium text-slate-400">Key Moments</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {timestamps.map((ts, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/10 hover:border-[#E8192C]/30 transition-all duration-300"
              >
                <span className="text-[#E8192C] font-mono font-bold text-sm w-12">{ts.time}</span>
                <span className="text-slate-300 text-sm">{ts.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quote callout */}
        <div className={`mt-10 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="bg-[#E8192C]/20 border border-[#E8192C]/30 rounded-xl p-6 text-center">
            <p className="text-slate-200 text-sm md:text-base leading-relaxed italic">
              &ldquo;If I can do it, then people with far more years of experience installing and selling solar can do it.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
