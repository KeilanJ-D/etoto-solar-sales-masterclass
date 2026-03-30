'use client'

import { useState } from 'react'
import { Play } from 'lucide-react'

interface LiteYouTubeProps {
  videoId: string
  title?: string
  className?: string
  aspectRatio?: 'video' | 'vertical'
}

// Extracts video ID from various YouTube URL formats
function extractVideoId(url: string): string {
  // Already a video ID
  if (!url.includes('/') && !url.includes('.')) {
    return url
  }
  
  // Handle embed URLs
  const embedMatch = url.match(/youtube\.com\/embed\/([^?&]+)/)
  if (embedMatch) return embedMatch[1]
  
  // Handle watch URLs
  const watchMatch = url.match(/youtube\.com\/watch\?v=([^&]+)/)
  if (watchMatch) return watchMatch[1]
  
  // Handle short URLs
  const shortMatch = url.match(/youtu\.be\/([^?]+)/)
  if (shortMatch) return shortMatch[1]
  
  return url
}

export function LiteYouTube({ videoId, title = 'Video', className = '', aspectRatio = 'video' }: LiteYouTubeProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const id = extractVideoId(videoId)
  
  // YouTube thumbnail URLs
  const thumbnailUrl = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
  
  const aspectClass = aspectRatio === 'vertical' 
    ? 'aspect-[9/16] max-w-[320px] mx-auto' 
    : 'aspect-video'
  
  if (isLoaded) {
    return (
      <div className={`${aspectClass} ${className}`}>
        <iframe
          src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-xl"
        />
      </div>
    )
  }
  
  return (
    <button
      onClick={() => setIsLoaded(true)}
      className={`relative ${aspectClass} ${className} group cursor-pointer overflow-hidden rounded-xl bg-slate-900`}
      aria-label={`Play ${title}`}
    >
      {/* Thumbnail */}
      <img
        src={thumbnailUrl}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
      
      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-[#E8192C] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
          <Play className="w-7 h-7 md:w-8 md:h-8 text-white fill-white ml-1" />
        </div>
      </div>
    </button>
  )
}
