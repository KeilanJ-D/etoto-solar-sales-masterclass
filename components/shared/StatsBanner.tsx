'use client'

import { useEffect, useRef, useState } from 'react'

interface Stat {
  value: string
  label: string
}

interface StatsBannerProps {
  stats: Stat[]
  dark?: boolean
}

export function StatsBanner({ stats, dark = true }: StatsBannerProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 overflow-hidden ${
        dark ? 'bg-slate-900' : 'bg-slate-50'
      }`}
    >
      {/* Cinematic background effects for dark mode */}
      {dark && (
        <>
          {/* Noise texture */}
          <div className="absolute inset-0 noise-texture" />
          
          {/* Gradient orbs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E8192C]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#F5921E]/10 rounded-full blur-3xl" />
          
          {/* Top and bottom fades */}
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-slate-900 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-900 to-transparent" />
        </>
      )}
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`grid gap-8 md:gap-12 ${
          stats.length === 2 
            ? 'grid-cols-2 max-w-2xl mx-auto' 
            : 'grid-cols-2 md:grid-cols-4'
        }`}>
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`text-center transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* Large stat value */}
              <p
                className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-2 tracking-tight ${
                  dark ? 'text-white' : 'text-slate-900'
                }`}
              >
                {stat.value}
              </p>
              
              {/* Label */}
              <p
                className={`text-sm sm:text-base font-medium ${
                  dark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                {stat.label}
              </p>
              
              {/* Red accent line under first stat */}
              {i === 0 && dark && (
                <div className="mt-4 h-1 w-12 mx-auto bg-gradient-to-r from-[#E8192C] to-[#F5921E] rounded-full" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
