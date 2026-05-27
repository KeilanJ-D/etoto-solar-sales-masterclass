'use client'

import Image from 'next/image'
import type { CaseStudy } from '@/lib/case-studies'

export default function CaseStudyEmbed({ study }: { study: CaseStudy }) {
  if (study.embedType === 'youtube' && study.youtubeId) {
    return (
      <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 shadow-xl">
        <iframe
          src={`https://www.youtube.com/embed/${study.youtubeId}?rel=0`}
          title={`${study.client} testimonial`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>
    )
  }

  if (study.embedType === 'linkedin' && study.linkedinPostId) {
    return (
      <div className="relative aspect-square sm:aspect-[4/5] w-full rounded-2xl overflow-hidden bg-slate-900 shadow-xl">
        <iframe
          src={`https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:${study.linkedinPostId}?compact=1`}
          title={`${study.client} testimonial`}
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>
    )
  }

  if (study.embedType === 'screenshot' && study.thumbnail) {
    return (
      <div
        className={`relative w-full rounded-2xl overflow-hidden ring-1 ring-slate-200 shadow-lg ${
          study.thumbnailMode === 'contain'
            ? 'bg-white aspect-video'
            : 'bg-slate-900 aspect-[16/10]'
        }`}
      >
        <Image
          src={study.thumbnail}
          alt={`${study.client} ${study.headline}`}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          className={
            study.thumbnailMode === 'contain' ? 'object-contain p-4' : 'object-cover'
          }
        />
      </div>
    )
  }

  // Branded poster fallback
  return (
    <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-[#E8192C]/40 shadow-xl flex flex-col items-center justify-center p-8 text-center">
      <p className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
        Client story
      </p>
      <p className="text-white text-2xl sm:text-3xl font-black text-balance">
        {study.client}
      </p>
      <p className="text-slate-300 text-sm mt-3">{study.headline}</p>
    </div>
  )
}
