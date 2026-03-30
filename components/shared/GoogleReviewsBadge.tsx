'use client'

import { Star, ExternalLink } from 'lucide-react'

interface GoogleReviewsBadgeProps {
  url: string
  rating?: string
}

export function GoogleReviewsBadge({ url, rating = '5.0' }: GoogleReviewsBadgeProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-full shadow-sm hover:shadow-md hover:border-slate-300 transition-all group touch-action-manipulation"
    >
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <span className="font-semibold text-slate-900 text-sm">{rating}</span>
      <span className="text-slate-500 text-sm">on Google</span>
      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#E8192C] transition-colors" />
    </a>
  )
}
