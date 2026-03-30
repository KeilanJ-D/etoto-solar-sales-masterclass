'use client'

import { useState } from 'react'

interface LiteYouTubeProps {
  videoId: string
  title?: string
  className?: string
  aspectRatio?: 'video' | 'vertical'
}

// Extracts video ID from various YouTube URL formats
function extractVideoId(url: string): string {
  // Already a video ID (no slashes or dots)
  if (!url.includes('/') && !url.includes('.')) {
    return url
  }
  
  // Handle embed URLs: youtube.com/embed/VIDEO_ID
  const embedMatch = url.match(/youtube\.com\/embed\/([^?&]+)/)
  if (embedMatch) return embedMatch[1]
  
  // Handle watch URLs: youtube.com/watch?v=VIDEO_ID
  const watchMatch = url.match(/youtube\.com\/watch\?v=([^&]+)/)
  if (watchMatch) return watchMatch[1]
  
  // Handle short URLs: youtu.be/VIDEO_ID
  const shortMatch = url.match(/youtu\.be\/([^?]+)/)
  if (shortMatch) return shortMatch[1]
  
  return url
}

export function LiteYouTube({ videoId, title = 'Video', className = '', aspectRatio = 'video' }: LiteYouTubeProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [thumbnailError, setThumbnailError] = useState(false)
  const id = extractVideoId(videoId)
  
  // Use maxresdefault for best quality, fallback to hqdefault if it doesn't exist
  const thumbnailUrl = thumbnailError 
    ? `https://img.youtube.com/vi/${id}/hqdefault.jpg`
    : `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
  
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
      className={`relative ${aspectClass} ${className} group cursor-pointer overflow-hidden rounded-xl bg-slate-800`}
      aria-label={`Play ${title}`}
    >
      {/* Thumbnail - styled to look like a real YouTube embed */}
      <img
        src={thumbnailUrl}
        alt={title}
        className="w-full h-full object-cover"
        loading="lazy"
        onError={() => !thumbnailError && setThumbnailError(true)}
      />
      
      {/* Subtle vignette overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      
      {/* YouTube-style play button - red circle with white triangle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[68px] h-[48px] bg-[#E8192C] rounded-xl flex items-center justify-center shadow-lg transition-all duration-200 group-hover:bg-[#FF0000] group-hover:scale-110">
          {/* Play triangle */}
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-white ml-0.5" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
      
      {/* Hover state - slight brightness increase */}
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-200" />
    </button>
  )
}
