'use client'

import { useEffect, useRef, useState } from 'react'
import { Star, ExternalLink } from 'lucide-react'
import { googleReviews, googleReviewsUrl } from '@/lib/social-proof-data'

interface GoogleReview {
  name: string
  rating: number
  text: string
  timeAgo: string
}

function ReviewCard({ review }: { review: GoogleReview }) {
  return (
    <div className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[340px] bg-white rounded-xl p-5 shadow-sm border border-slate-100">
      {/* Stars */}
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      
      {/* Quote */}
      <p className="text-slate-700 text-sm leading-relaxed mb-4 line-clamp-4">
        &ldquo;{review.text}&rdquo;
      </p>
      
      {/* Author */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-xs font-bold">
          {review.name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-medium text-slate-900">{review.name}</p>
          <p className="text-xs text-slate-500">{review.timeAgo}</p>
        </div>
      </div>
    </div>
  )
}

export function GoogleReviewsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  
  // Duplicate reviews for infinite scroll effect
  const duplicatedReviews = [...googleReviews, ...googleReviews]
  
  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return
    
    let animationId: number
    let scrollSpeed = 0.5 // pixels per frame (~30px/second at 60fps)
    
    const scroll = () => {
      if (!isPaused && scrollContainer) {
        scrollContainer.scrollLeft += scrollSpeed
        
        // Reset scroll position when we've scrolled through the first set
        const halfWidth = scrollContainer.scrollWidth / 2
        if (scrollContainer.scrollLeft >= halfWidth) {
          scrollContainer.scrollLeft = 0
        }
      }
      animationId = requestAnimationFrame(scroll)
    }
    
    animationId = requestAnimationFrame(scroll)
    
    return () => cancelAnimationFrame(animationId)
  }, [isPaused])
  
  return (
    <section className="py-12 sm:py-16 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-slate-900 font-bold">5.0</span>
              <span className="text-slate-500 text-sm">on Google</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              What our clients say
            </h2>
          </div>
          
          <a
            href={googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-[#E8192C] transition-colors"
          >
            See all reviews
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
      
      {/* Scrolling carousel */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-hidden px-4 sm:px-6"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {duplicatedReviews.map((review, index) => (
          <ReviewCard key={`${review.name}-${index}`} review={review} />
        ))}
      </div>
      
      {/* Leave a review CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="text-center">
          <p className="text-slate-500 text-sm mb-2">Found this tool valuable?</p>
          <a
            href={googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#E8192C] hover:text-[#D01622] font-medium transition-colors"
          >
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            Leave us a 5-star review on Google
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
