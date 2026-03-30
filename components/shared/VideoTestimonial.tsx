'use client'

import { Quote } from 'lucide-react'

interface VideoTestimonialProps {
  videoUrl: string
  quote: string
  name: string
  company: string
  stat: string
  isVertical?: boolean
}

export function VideoTestimonial({
  videoUrl,
  quote,
  name,
  company,
  stat,
  isVertical = false,
}: VideoTestimonialProps) {
  return (
    <div className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className={`flex flex-col ${isVertical ? 'md:flex-row md:items-center' : 'lg:flex-row lg:items-center'} gap-6 md:gap-10`}>
          {/* Video */}
          <div className={`${isVertical ? 'md:w-1/3' : 'lg:w-1/2'} flex-shrink-0`}>
            {isVertical ? (
              // Phone-frame style for vertical videos
              <div className="relative mx-auto max-w-[280px]">
                <div className="bg-slate-900 rounded-[2rem] p-2 shadow-2xl">
                  <div className="bg-black rounded-[1.5rem] overflow-hidden aspect-[9/16]">
                    <iframe
                      src={videoUrl}
                      title={`${name} testimonial`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </div>
            ) : (
              // Standard 16:9 aspect ratio
              <div className="aspect-video rounded-xl overflow-hidden shadow-2xl bg-slate-900">
                <iframe
                  src={videoUrl}
                  title={`${name} testimonial`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            )}
          </div>

          {/* Quote */}
          <div className={`${isVertical ? 'md:w-2/3' : 'lg:w-1/2'} flex flex-col justify-center`}>
            <Quote className="w-8 h-8 text-[#E8192C]/30 mb-4" />
            <blockquote className="text-lg sm:text-xl md:text-2xl font-medium text-slate-900 leading-relaxed mb-6">
              &ldquo;{quote}&rdquo;
            </blockquote>
            <div>
              <p className="font-bold text-slate-900">{name}</p>
              <p className="text-slate-500 text-sm">{company}</p>
              <span className="inline-block mt-3 px-3 py-1.5 bg-[#E8192C] text-white text-sm font-semibold rounded-full">
                {stat}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
