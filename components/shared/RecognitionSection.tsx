'use client'

import Image from 'next/image'
import { Award as AwardIcon, Trophy } from 'lucide-react'
import { awards } from '@/lib/awards'
import AnimateOnScroll from './AnimateOnScroll'

interface RecognitionSectionProps {
  variant?: 'full' | 'compact'
  className?: string
}

export default function RecognitionSection({
  variant = 'full',
  className = '',
}: RecognitionSectionProps) {
  if (variant === 'compact') {
    return (
      <section className={`py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-white ${className}`}>
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center mb-7">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 rounded-full mb-3 ring-1 ring-amber-200">
              <Trophy className="w-3.5 h-3.5 text-amber-600" />
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wide">
                Recognition
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 text-balance max-w-xl">
              Award-winning agency, masterclass distilled from £200M+ in client sales
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {awards.map((a) => {
              const Icon = a.badge === 'Winner' ? Trophy : AwardIcon
              return (
                <div
                  key={a.id}
                  className={`relative rounded-2xl bg-gradient-to-br ${a.accentFrom} ${a.accentTo} ring-1 ring-slate-200 p-4 sm:p-5 overflow-hidden`}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white ring-1 ring-slate-200 overflow-hidden">
                      <Image
                        src={a.image}
                        alt=""
                        fill
                        sizes="64px"
                        className="object-contain p-1.5"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${a.badgeColor} text-white text-[10px] font-bold uppercase tracking-wider mb-1.5`}
                      >
                        <Icon className="w-3 h-3" />
                        {a.badge}
                      </div>
                      <h4 className="font-black text-sm text-slate-900 leading-tight">
                        {a.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1">
                        {a.ceremony} {a.year}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      className={`py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        <AnimateOnScroll variant="fade-up">
          <div className="text-center mb-10 md:mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 rounded-full mb-3 ring-1 ring-amber-200">
              <Trophy className="w-3.5 h-3.5 text-amber-600" />
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wide">
                Recognition
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-3 md:mb-4 text-balance">
              Award-winning. UK&apos;s best-in-class for renewables growth.
            </h2>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Two industry awards at the South East Energy Efficiency Awards 2026 —
              recognised for outstanding contribution to the renewable energy sector.
              This masterclass distils the methodology that earned them.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid lg:grid-cols-5 gap-5 md:gap-8 items-stretch">
          {/* Team photo */}
          <AnimateOnScroll
            variant="slide-right"
            className="lg:col-span-3 relative rounded-2xl overflow-hidden bg-slate-900 aspect-[16/10] lg:aspect-auto lg:min-h-[400px] shadow-xl"
          >
            <Image
              src="/awards/etoto_eea_certs.jpeg"
              alt="The ETOTO Media team at the South East Energy Efficiency Awards 2026"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 text-white">
              <p className="text-xs md:text-sm font-bold uppercase tracking-[0.14em] text-white/80 mb-2">
                South East Energy Efficiency Awards 2026
              </p>
              <p className="text-lg md:text-2xl font-bold text-balance">
                Two awards. One night.
              </p>
            </div>
          </AnimateOnScroll>

          {/* Award badges */}
          <AnimateOnScroll
            variant="slide-left"
            delay={0.15}
            className="lg:col-span-2 grid gap-4 md:gap-5"
          >
            {awards.map((a) => {
              const Icon = a.badge === 'Winner' ? Trophy : AwardIcon
              return (
                <div
                  key={a.id}
                  className={`relative rounded-2xl bg-gradient-to-br ${a.accentFrom} ${a.accentTo} ring-1 ring-slate-200 p-5 md:p-6 overflow-hidden hover:shadow-lg transition-shadow`}
                >
                  <div className="flex items-start gap-4">
                    <div className="relative shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl bg-white ring-1 ring-slate-200 overflow-hidden">
                      <Image
                        src={a.image}
                        alt=""
                        fill
                        sizes="80px"
                        className="object-contain p-1.5"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full ${a.badgeColor} text-white text-[10px] font-bold uppercase tracking-wider mb-2`}
                      >
                        <Icon className="w-3 h-3" />
                        {a.badge}
                      </div>
                      <h3 className="font-black text-sm md:text-base text-slate-900 leading-tight">
                        {a.title}
                      </h3>
                      <p className="text-xs md:text-sm text-slate-600 mt-1.5 leading-snug">
                        {a.recipient}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
