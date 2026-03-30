'use client'

import { TestimonialCard } from './TestimonialCard'

interface Testimonial {
  quote: string
  name: string
  company: string
  stat?: string
}

interface TestimonialRowProps {
  testimonials: Testimonial[]
  title?: string
}

export function TestimonialRow({ testimonials, title }: TestimonialRowProps) {
  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        {title && (
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 text-center mb-8">
            {title}
          </h3>
        )}
        {/* Desktop: grid, Mobile: horizontal scroll */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>
        {/* Mobile: horizontal scroll with snap */}
        <div className="sm:hidden flex gap-4 overflow-x-auto scrollbar-hide scroll-snap-x pb-4">
          {testimonials.map((t, i) => (
            <div key={i} className="flex-shrink-0 w-[85vw] scroll-snap-start">
              <TestimonialCard {...t} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
