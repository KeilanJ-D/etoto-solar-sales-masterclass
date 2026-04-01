'use client'

import { useState } from 'react'
import { Star, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import { googleReviews, googleReviewsUrl } from '@/lib/social-proof-data'

interface GoogleReview {
  name: string
  rating: number
  text: string
  timeAgo: string
}

function ReviewCard({ review, featured = false }: { review: GoogleReview; featured?: boolean }) {
  return (
    <div className={`bg-white rounded-xl p-5 sm:p-6 border ${featured ? 'border-yellow-200 shadow-lg' : 'border-slate-100 shadow-sm'}`}>
      {/* Stars */}
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      
      {/* Quote */}
      <p className={`text-slate-700 leading-relaxed mb-4 ${featured ? 'text-base' : 'text-sm'}`}>
        &ldquo;{review.text}&rdquo;
      </p>
      
      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white text-sm font-bold">
          {review.name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-slate-900">{review.name}</p>
          <p className="text-xs text-slate-500">{review.timeAgo}</p>
        </div>
      </div>
    </div>
  )
}

export function GoogleReviewsCarousel() {
  const [currentPage, setCurrentPage] = useState(0)
  
  // Show 3 reviews per page on desktop, 1 on mobile
  const reviewsPerPage = 3
  const totalPages = Math.ceil(googleReviews.length / reviewsPerPage)
  
  const currentReviews = googleReviews.slice(
    currentPage * reviewsPerPage,
    (currentPage + 1) * reviewsPerPage
  )
  
  const nextPage = () => setCurrentPage((p) => (p + 1) % totalPages)
  const prevPage = () => setCurrentPage((p) => (p - 1 + totalPages) % totalPages)
  
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
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
        
        {/* Reviews Grid - Mobile: 1 col stacked, Desktop: 3 cols */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {currentReviews.map((review, index) => (
            <ReviewCard 
              key={`${review.name}-${currentPage}-${index}`} 
              review={review}
              featured={index === 0 && currentPage === 0}
            />
          ))}
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={prevPage}
            className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors"
            aria-label="Previous reviews"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === currentPage 
                    ? 'bg-[#E8192C] w-6' 
                    : 'bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={nextPage}
            className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors"
            aria-label="Next reviews"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        {/* Leave a review CTA */}
        <div className="text-center mt-8 pt-6 border-t border-slate-200">
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
            Leave us a 5-star review
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
