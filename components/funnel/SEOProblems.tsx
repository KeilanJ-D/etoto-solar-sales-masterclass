'use client'

import { useEffect, useRef, useState } from 'react'
import { AlertTriangle, FileX, Link2Off, ImageOff, Clock, FileText, Info } from 'lucide-react'

const issues = [
  {
    icon: FileX,
    title: 'Missing Meta Descriptions',
    count: 12,
    pages: ['Homepage', 'Services', 'About Us', '+9 more'],
    impact: 'HIGH',
    detail: 'Search engines cannot properly index your pages without meta descriptions. This directly impacts click-through rates from Google search results.',
    context: 'We crawled solarpath.ie using Screaming Frog. Of 15 indexable pages, 12 have either missing or duplicate meta descriptions. Google uses meta descriptions to generate search snippets—without unique descriptions, your click-through rate suffers by an estimated 20-30%.',
    fix: 'Write unique, keyword-rich meta descriptions (150-160 characters) for each page. Prioritise high-traffic pages: Homepage, Solar Panels, Battery Storage, Contact.'
  },
  {
    icon: Link2Off,
    title: 'Broken Internal Links',
    count: 8,
    pages: ['Blog posts', 'Service pages'],
    impact: 'MEDIUM',
    detail: 'Dead links frustrate users and harm your SEO authority. Crawlers penalise sites with broken link structures.',
    context: 'We identified 8 internal links returning 404 errors. Most are old blog post links and deprecated service page URLs. Google interprets broken links as poor site maintenance, which can reduce crawl frequency and trust.',
    fix: 'Implement 301 redirects for moved pages. Remove or update links pointing to deleted content. Set up Google Search Console alerts for crawl errors.'
  },
  {
    icon: ImageOff,
    title: 'Missing Alt Text',
    count: 47,
    pages: ['Gallery', 'Case studies', 'Product pages'],
    impact: 'MEDIUM',
    detail: 'Images without alt text miss ranking opportunities in Google Images and fail accessibility standards.',
    context: '47 images across the site lack alt attributes. This includes product images, installation photos, and team pictures. Alt text is a ranking factor for Google Images (which drives 8% of solar enquiries nationally) and is legally required for accessibility compliance.',
    fix: 'Add descriptive alt text to all images. Include target keywords naturally, e.g., "Solar panel installation Dublin semi-detached house" rather than "IMG_0234".'
  },
  {
    icon: Clock,
    title: 'Slow Page Load',
    count: 6,
    pages: ['Homepage (4.2s)', 'Services (3.8s)'],
    impact: 'HIGH',
    detail: 'Pages loading over 3 seconds lose 40% of visitors. Your mobile experience is particularly slow.',
    context: 'Google PageSpeed Insights scores your homepage at 42/100 (mobile) and 61/100 (desktop). Largest Contentful Paint (LCP) is 4.2 seconds—Google recommends under 2.5s. We identified 4.8MB of uncompressed images and 8 render-blocking scripts as primary culprits.',
    fix: 'Compress images to WebP format (saves 60% file size). Defer non-critical JavaScript. Implement lazy loading for below-fold images. Consider a CDN for faster global delivery.'
  },
  {
    icon: FileText,
    title: 'Thin Content Pages',
    count: 9,
    pages: ['County landing pages', 'Service descriptions'],
    impact: 'HIGH',
    detail: 'Pages with fewer than 300 words rarely rank. Your county pages average just 120 words.',
    context: 'Your county-specific landing pages (Dublin, Cork, Galway, etc.) have an average word count of 120. Competitor pages targeting the same keywords average 800+ words. Google interprets thin content as low-value, making it nearly impossible to rank for local terms like "solar panels Dublin".',
    fix: 'Expand county pages to 800+ words with unique local content: customer testimonials from that area, local installer info, county-specific grants, and local solar statistics.'
  },
  {
    icon: AlertTriangle,
    title: 'No Schema Markup',
    count: 1,
    pages: ['Entire site'],
    impact: 'MEDIUM',
    detail: 'Without structured data, Google cannot show rich snippets for your business, reviews, or services.',
    context: 'No schema markup detected on any page. Schema markup enables rich results in Google: star ratings, price ranges, FAQ dropdowns, and business info directly in search results. Competitors using LocalBusiness and Product schema see up to 30% higher click-through rates.',
    fix: 'Implement LocalBusiness schema on all pages. Add Product schema to service pages with pricing. Add FAQ schema to common question pages. Use Google\'s Structured Data Testing Tool to validate.'
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
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 md:py-32 px-4 md:px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className={`text-center mb-10 md:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-flex items-center gap-2 bg-red-50 text-[#DC2626] text-xs md:text-sm font-semibold px-4 py-2 rounded-full mb-4">
            <span className="w-2 h-2 bg-[#DC2626] rounded-full animate-pulse" />
            Technical SEO Audit
          </span>
          <h2 className="text-2xl md:text-5xl font-black text-slate-900 mb-3 md:mb-4">
            83 Technical Issues Found
          </h2>
          <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto">
            Tap each issue to see the full analysis, affected pages, and our recommended fix.
          </p>
          <p className="text-xs md:text-sm text-slate-400 mt-3 max-w-xl mx-auto">
            Analysis performed using Google Lighthouse, Screaming Frog, and PageSpeed Insights on 17 March 2026.
          </p>
        </div>

        <div className="space-y-3 md:space-y-4">
          {issues.map((issue, index) => {
            const Icon = issue.icon
            const isExpanded = expandedIndex === index

            return (
              <div
                key={index}
                className={`bg-white border border-slate-100 rounded-xl md:rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-lg cursor-pointer ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                } ${isExpanded ? 'shadow-xl ring-2 ring-[#E8192C]/20' : ''}`}
                style={{ transitionDelay: `${index * 80}ms` }}
                onClick={() => setExpandedIndex(isExpanded ? null : index)}
              >
                <div className="p-4 md:p-6 flex items-center gap-3 md:gap-4">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    issue.impact === 'HIGH' ? 'bg-red-50' : 'bg-amber-50'
                  }`}>
                    <Icon className={`w-5 h-5 md:w-6 md:h-6 ${
                      issue.impact === 'HIGH' ? 'text-[#DC2626]' : 'text-[#D97706]'
                    }`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 md:gap-3 mb-1 flex-wrap">
                      <h3 className="font-bold text-slate-900 text-sm md:text-base">{issue.title}</h3>
                      <span className={`text-[10px] md:text-xs font-bold px-2 py-0.5 rounded ${
                        issue.impact === 'HIGH' 
                          ? 'bg-red-50 text-[#DC2626]' 
                          : 'bg-amber-50 text-[#D97706]'
                      }`}>
                        {issue.impact} IMPACT
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-slate-500">{issue.count} instances found</p>
                  </div>

                  <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full bg-slate-50 flex items-center justify-center transition-transform duration-300 flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`}>
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-[500px]' : 'max-h-0'}`}>
                  <div className="px-4 md:px-6 pb-5 md:pb-6 border-t border-slate-100 pt-4 space-y-4">
                    <p className="text-slate-600 text-sm leading-relaxed">{issue.detail}</p>
                    
                    <div className="bg-slate-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Info className="w-4 h-4 text-slate-500" />
                        <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Our Analysis</p>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">{issue.context}</p>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-2">Recommended Fix</p>
                      <p className="text-sm text-green-700 leading-relaxed">{issue.fix}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 pt-2">
                      <p className="text-xs text-slate-500 mr-2">Affected areas:</p>
                      {issue.pages.map((page, i) => (
                        <span key={i} className="text-xs bg-white border border-slate-200 text-slate-600 px-3 py-1 rounded-full">
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

        <div className={`mt-10 md:mt-12 text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex flex-col items-center gap-2 bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4">
            <p className="text-slate-600 text-sm md:text-base">
              These 83 issues contribute to your <span className="font-bold text-[#DC2626]">34/100 SEO score</span>
            </p>
            <p className="text-xs text-slate-400">
              Industry benchmark for high-performing solar installers: 65+
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
