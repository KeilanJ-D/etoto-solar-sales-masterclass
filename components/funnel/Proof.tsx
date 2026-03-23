'use client'

import { useEffect, useRef, useState } from 'react'
import { TrendingUp, Users, Target, Award } from 'lucide-react'

const stats = [
  { icon: TrendingUp, value: '£16.53', label: 'Average CPL', subtext: 'vs £29.64 industry average' },
  { icon: Users, value: '1,315', label: 'Leads Generated', subtext: 'In a single campaign period' },
  { icon: Target, value: '78%', label: 'More Leads', subtext: 'With 35% less ad spend' },
  { icon: Award, value: '£450', label: 'CPA Achieved', subtext: 'For UPS Solar' },
]

export default function Proof() {
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
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6 bg-gradient-to-r from-[#E8192C] to-[#F5921E]">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            Results That Speak for Themselves
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            These are not projections. This is what we have achieved for solar installers just like you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <div 
                key={stat.label}
                className={`bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center transition-all duration-700 hover:bg-white/20 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-3xl md:text-4xl font-black text-white mb-1">{stat.value}</p>
                <p className="text-white font-semibold mb-1">{stat.label}</p>
                <p className="text-white/60 text-sm">{stat.subtext}</p>
              </div>
            )
          })}
        </div>

        <div className={`mt-12 text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-white/80 text-lg">
            Imagine what these results could mean for <span className="font-bold text-white">Solar Path</span>.
          </p>
        </div>
      </div>
    </section>
  )
}
