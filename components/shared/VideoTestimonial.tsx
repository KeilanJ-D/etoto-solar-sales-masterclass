'use client'

import Image from 'next/image'
import { Quote } from 'lucide-react'
import { LiteYouTube } from './LiteYouTube'

interface VideoTestimonialData {
  id: string
  name: string
  company: string
  quote: string
  stat: string
  videoUrl: string
  isVertical?: boolean
  logoUrl?: string | null
  embedType?: 'youtube' | 'linkedin'
}

interface VideoTestimonialProps {
  testimonial: VideoTestimonialData
}

export function VideoTestimonial({ testimonial }: VideoTestimonialProps) {
  const { videoUrl, quote, name, company, stat, isVertical = false, logoUrl, embedType = 'youtube' } = testimonial
  
  const renderVideo = () => {
    if (embedType === 'linkedin') {
      return (
        <div className="relative mx-auto max-w-[320px]">
          <div className="bg-slate-900 rounded-[2rem] p-2 shadow-2xl">
            <div className="bg-black rounded-[1.5rem] overflow-hidden">
              <iframe
                src={videoUrl}
                height="570"
                width="100%"
                frameBorder="0"
                allowFullScreen
                title={`${name} testimonial`}
                className="w-full"
              />
            </div>
          </div>
        </div>
      )
    }
    
    if (isVertical) {
      return (
        <div className="relative mx-auto max-w-[280px]">
          <div className="bg-slate-900 rounded-[2rem] p-2 shadow-2xl">
            <div className="bg-black rounded-[1.5rem] overflow-hidden">
              <LiteYouTube 
                videoId={videoUrl} 
                title={`${name} testimonial`}
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
          videoId={videoUrl} 
          title={`${name} testimonial`}
        />
      </div>
    )
  }
  
  return (
    <div className={`flex flex-col ${isVertical || embedType === 'linkedin' ? 'md:flex-row md:items-center' : 'lg:flex-row lg:items-center'} gap-6 md:gap-10`}>
      {/* Video */}
      <div className={`${isVertical || embedType === 'linkedin' ? 'md:w-2/5' : 'lg:w-1/2'} flex-shrink-0`}>
        {renderVideo()}
      </div>

      {/* Quote & Company Info */}
      <div className={`${isVertical ? 'md:w-3/5' : 'lg:w-1/2'} flex flex-col justify-center`}>
        {/* Logo - Bold and prominent */}
        {logoUrl && (
          <div className="mb-6">
            <Image
              src={logoUrl}
              alt={company}
              width={180}
              height={60}
              className="object-contain"
              style={{ height: 'auto', width: 'auto', maxHeight: '56px' }}
            />
          </div>
        )}
        
        <Quote className="w-8 h-8 text-[#E8192C]/30 mb-4" />
        <blockquote className="text-lg sm:text-xl md:text-2xl font-medium text-slate-900 leading-relaxed mb-6">
          &ldquo;{quote}&rdquo;
        </blockquote>
        <div>
          <p className="font-bold text-slate-900">{name}</p>
          <p className="text-slate-500 text-sm">{company}</p>
          <span className="inline-block mt-3 px-4 py-2 bg-[#E8192C] text-white text-sm font-bold rounded-full">
            {stat}
          </span>
        </div>
      </div>
    </div>
  )
}
