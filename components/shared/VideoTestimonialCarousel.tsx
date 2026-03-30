'use client'

import { useState } from 'react'
import { Play, Quote } from 'lucide-react'
import { LiteYouTube } from './LiteYouTube'

interface VideoTestimonial {
  id: string
  name: string
  company: string
  quote: string
  stat: string
  videoUrl: string
  featured?: boolean
  isVertical?: boolean
  embedType?: 'youtube' | 'linkedin'
}

interface VideoTestimonialCarouselProps {
  testimonials: VideoTestimonial[]
}

export function VideoTestimonialCarousel({ testimonials }: VideoTestimonialCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = testimonials[activeIndex]

  const renderVideo = () => {
    if (active.embedType === 'linkedin') {
      return (
        <div className="relative mx-auto max-w-[320px]">
          <div className="bg-slate-800 rounded-[2rem] p-2 shadow-2xl">
            <div className="bg-black rounded-[1.5rem] overflow-hidden">
              <iframe
                src={active.videoUrl}
                height="570"
                width="100%"
                frameBorder="0"
                allowFullScreen
                title={`${active.name} testimonial`}
                className="w-full"
              />
            </div>
          </div>
        </div>
      )
    }
    
    if (active.isVertical) {
      return (
        <div className="relative mx-auto max-w-[280px]">
          <div className="bg-slate-800 rounded-[2rem] p-2 shadow-2xl">
            <div className="bg-black rounded-[1.5rem] overflow-hidden">
              <LiteYouTube
                videoId={active.videoUrl}
                title={`${active.name} testimonial`}
                aspectRatio="vertical"
              />
            </div>
          </div>
        </div>
      )
    }
    
    return (
      <div className="rounded-xl overflow-hidden shadow-2xl">
        <LiteYouTube
          videoId={active.videoUrl}
          title={`${active.name} testimonial`}
        />
      </div>
    )
  }

  return (
    <div className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-10">
          <span className="inline-block px-3 py-1 bg-[#E8192C]/20 text-[#E8192C] text-sm font-medium rounded-full mb-3">
            Real Results
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Hear from our clients
          </h2>
        </div>

        {/* Main video + quote */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 mb-8">
          {/* Video */}
          <div className="lg:w-3/5 flex-shrink-0">
            {renderVideo()}
          </div>

          {/* Quote */}
          <div className="lg:w-2/5 flex flex-col justify-center">
            <Quote className="w-8 h-8 text-[#E8192C]/50 mb-4" />
            <blockquote className="text-lg sm:text-xl text-white leading-relaxed mb-6">
              &ldquo;{active.quote}&rdquo;
            </blockquote>
            <div>
              <p className="font-bold text-white">{active.name}</p>
              <p className="text-slate-400 text-sm">{active.company}</p>
              <span className="inline-block mt-3 px-3 py-1.5 bg-[#E8192C] text-white text-sm font-semibold rounded-full">
                {active.stat}
              </span>
            </div>
          </div>
        </div>

        {/* Thumbnail navigation */}
        <div className="flex gap-3 overflow-x-auto scrollbar-hide scroll-snap-x pb-2">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActiveIndex(i)}
              className={`flex-shrink-0 scroll-snap-start p-3 rounded-lg transition-all min-w-[140px] sm:min-w-[160px] text-left touch-action-manipulation ${
                i === activeIndex
                  ? 'bg-[#E8192C] text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Play className="w-3 h-3 flex-shrink-0" />
                <span className="text-xs font-medium truncate">{t.company}</span>
              </div>
              <p className="text-xs opacity-80 truncate">{t.stat}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
