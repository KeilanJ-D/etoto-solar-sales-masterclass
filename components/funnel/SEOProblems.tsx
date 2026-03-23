'use client'

import { useEffect, useRef, useState } from 'react'
import { AlertTriangle, FileX, Link2Off, ImageOff, Clock, FileText } from 'lucide-react'

const issues = [
  {
    icon: FileX,
    title: 'Missing Meta Descriptions',
    count: 12,
    pages: ['Homepage', 'Services', 'About Us', '+9 more'],
    impact: 'HIGH',
    detail: 'Search engines cannot properly index your pages without meta descriptions. This directly impacts click-through rates.',
  },
  {
    icon: Link2Off,
    title: 'Broken Internal Links',
    count: 8,
    pages: ['Blog posts', 'Service pages'],
    impact: 'MEDIUM',
    detail: 'Dead links frustrate users and harm your SEO authority. Crawlers penalise sites with broken link structures.',
  },
  {
    icon: ImageOff,
    title: 'Missing Alt Text',
    count: 47,
    pages: ['Gallery', 'Case studies', 'Product pages'],
    impact: 'MEDIUM',
    detail: 'Images without alt text miss ranking opportunities and fail accessibility standards.',
  },
  {
    icon: Clock,
    title: 'Slow Page Load',
    count: 6,
    pages: ['Homepage (4.2s)', 'Services (3.8s)'],
    impact: 'HIGH',
    detail: 'Pages loading over 3 seconds lose 40% of visitors. Your mobile experience is particularly slow.',
  },
  {
    icon: FileText,
    title: 'Thin Content Pages',
    count: 9,
    pages: ['County landing pages', 'Service descriptions'],
    impact: 'HIGH',
    detail: 'Pages with fewer than 300 words rarely rank. Your county pages average just 120 words.',
  },
  {
    icon: AlertTriangle,
    title: 'No Schema Markup',
    count: 1,
    pages: ['Entire site'],
    impact: 'MEDIUM',
    detail: 'Without structured data, Google cannot show rich snippets for your business, reviews, or services.',
  },
]

export default function SEOProblems() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block bg-[#FEE2E2] text-[#DC2626] text-sm font-semibold px-4 py-2 rounded-full mb-4">
            Technical SEO Audit
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-[#1A1A2E] mb-4">
            83 Technical Issues Found
          </h2>
          <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
            Click each issue to see affected pages and recommended fixes.
          </p>
        </div>

        <div className="space-y-4">
          {issues.map((issue, index) => {
            const Icon = issue.icon
            const isExpanded = expandedIndex === index

            return (
              <div
                key={index}
                className={`bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-lg cursor-pointer ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() => setExpandedIndex(isExpanded ? null : index)}
              >
                <div className="p-6 flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    issue.impact === 'HIGH' ? 'bg-[#FEE2E2]' : 'bg-[#FEF3C7]'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      issue.impact === 'HIGH' ? 'text-[#DC2626]' : 'text-[#D97706]'
                    }`} />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold text-[#1A1A2E]">{issue.title}</h3>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                        issue.impact === 'HIGH' 
                          ? 'bg-[#FEE2E2] text-[#DC2626]' 
                          : 'bg-[#FEF3C7] text-[#D97706]'
                      }`}>
                        {issue.impact} IMPACT
                      </span>
                    </div>
                    <p className="text-sm text-[#64748B]">{issue.count} instances found</p>
                  </div>

                  <div className={`w-8 h-8 rounded-full bg-[#F8FAFC] flex items-center justify-center transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                    <svg className="w-5 h-5 text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-48' : 'max-h-0'}`}>
                  <div className="px-6 pb-6 border-t border-[#E2E8F0] pt-4">
                    <p className="text-[#64748B] mb-4">{issue.detail}</p>
                    <div className="flex flex-wrap gap-2">
                      {issue.pages.map((page, i) => (
                        <span key={i} className="text-xs bg-[#F1F5F9] text-[#475569] px-3 py-1 rounded-full">
                          {page}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
