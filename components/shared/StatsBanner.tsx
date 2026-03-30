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

export function StatsBanner({ stats, dark = false }: StatsBannerProps) {
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
      className={`py-8 sm:py-10 md:py-12 px-4 sm:px-6 ${
        dark ? 'bg-slate-900' : 'bg-slate-50'
      }`}
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`text-center transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <p
                className={`text-2xl sm:text-3xl md:text-4xl font-black mb-1 ${
                  dark ? 'text-white' : 'text-slate-900'
                }`}
              >
                {stat.value}
              </p>
              <p
                className={`text-xs sm:text-sm font-medium ${
                  dark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
