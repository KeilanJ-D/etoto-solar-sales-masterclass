'use client'

import { useEffect, useRef, useState } from 'react'
import { FileText, Download, Clock, TrendingUp, Sparkles, ExternalLink, ChevronRight } from 'lucide-react'

const blogs = [
  {
    id: 1,
    title: 'SEAI Solar Panel Grant 2026: Complete Irish Homeowner Guide',
    slug: 'seai-grant-2026',
    keywords: ['seai grant', 'solar panel grant ireland', 'seai solar grant 2026'],
    wordCount: 1847,
    readTime: '8 min',
    searchVolume: '2,400/mo',
    excerpt: 'Everything Irish homeowners need to know about the SEAI solar panel grant in 2026, including eligibility, amounts, and how to apply.',
  },
  {
    id: 2,
    title: 'How Much Do Solar Panels Cost in Ireland in 2026?',
    slug: 'solar-panels-cost-ireland-2026',
    keywords: ['solar panels cost ireland', 'solar panel prices ireland 2026'],
    wordCount: 1624,
    readTime: '7 min',
    searchVolume: '1,900/mo',
    excerpt: 'A comprehensive breakdown of solar panel costs in Ireland for 2026, including installation, grants, and ROI calculations.',
  },
  {
    id: 3,
    title: 'Solar Panels Cork: Your Complete Local Installation Guide',
    slug: 'solar-panels-cork',
    keywords: ['solar panels cork', 'solar installers cork', 'solar pv cork'],
    wordCount: 1156,
    readTime: '5 min',
    searchVolume: '720/mo',
    excerpt: 'Local guide for Cork homeowners considering solar panels, including regional installers, grants, and weather considerations.',
  },
  {
    id: 4,
    title: 'Sigenergy Review Ireland: Is It Worth the Premium?',
    slug: 'sigenergy-review-ireland',
    keywords: ['sigenergy review', 'sigenergy ireland', 'sigenergy battery'],
    wordCount: 1432,
    readTime: '6 min',
    searchVolume: '590/mo',
    excerpt: 'An honest review of Sigenergy solar battery systems for Irish homeowners, covering performance, pricing, and alternatives.',
  },
  {
    id: 5,
    title: 'Aiko Solar Panels Ireland: Premium Efficiency Worth It?',
    slug: 'aiko-solar-panels-ireland',
    keywords: ['aiko solar panels', 'aiko panels ireland', 'aiko solar review'],
    wordCount: 1289,
    readTime: '6 min',
    searchVolume: '480/mo',
    excerpt: 'Deep dive into Aiko solar panels for the Irish market, examining their efficiency claims and value proposition.',
  },
  {
    id: 6,
    title: 'Is a Solar Battery Worth It in Ireland? 2026 Analysis',
    slug: 'solar-battery-worth-it-ireland',
    keywords: ['solar battery ireland', 'is solar battery worth it', 'home battery storage ireland'],
    wordCount: 1567,
    readTime: '7 min',
    searchVolume: '1,300/mo',
    excerpt: 'Data-driven analysis of whether solar battery storage makes financial sense for Irish homeowners in 2026.',
  },
  {
    id: 7,
    title: 'Sigenergy vs Huawei: Which Solar Battery for Ireland?',
    slug: 'sigenergy-vs-huawei-ireland',
    keywords: ['sigenergy vs huawei', 'best solar battery ireland', 'huawei battery ireland'],
    wordCount: 1378,
    readTime: '6 min',
    searchVolume: '390/mo',
    excerpt: 'Head-to-head comparison of Sigenergy and Huawei solar battery systems for the Irish market.',
  },
  {
    id: 8,
    title: 'How to Sell Electricity Back to the Grid in Ireland',
    slug: 'sell-electricity-grid-ireland',
    keywords: ['sell electricity grid ireland', 'microgeneration ireland', 'ceg ireland'],
    wordCount: 1234,
    readTime: '5 min',
    searchVolume: '880/mo',
    excerpt: 'Complete guide to the Clean Export Guarantee and how Irish solar owners can earn from excess electricity.',
  },
  {
    id: 9,
    title: '10 Solar Panel Myths Irish Homeowners Still Believe',
    slug: 'solar-panel-myths-ireland',
    keywords: ['solar panel myths', 'solar panels ireland facts', 'solar myths debunked'],
    wordCount: 1456,
    readTime: '6 min',
    searchVolume: '320/mo',
    excerpt: 'Debunking the most common misconceptions about solar panels that prevent Irish homeowners from going solar.',
  },
  {
    id: 10,
    title: 'Solar Panels for Irish Farms: TAMS 3 Grants Explained',
    slug: 'farm-solar-tams3-ireland',
    keywords: ['tams 3 solar', 'farm solar panels ireland', 'agricultural solar grants'],
    wordCount: 1607,
    readTime: '7 min',
    searchVolume: '540/mo',
    excerpt: 'How Irish farmers can leverage TAMS 3 grants for solar panel installations, with ROI calculations and eligibility.',
  },
]

const totalWords = blogs.reduce((acc, blog) => acc + blog.wordCount, 0)

export default function BlogShowcase() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredBlog, setHoveredBlog] = useState<number | null>(null)
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

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="blogs" className="py-20 md:py-32 px-4 md:px-6 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E8192C]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#F5921E]/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className={`text-center mb-12 md:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-flex items-center gap-2 bg-[#E8192C]/20 text-[#E8192C] text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4" />
            The Showstopper
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4">
            10 SEO-Optimised Articles.
            <br />
            <span className="text-[#E8192C]">Written in 24 Hours.</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
            This is not a promise. These articles already exist. {totalWords.toLocaleString()} words of high-quality, 
            keyword-targeted content ready to publish on your blog today.
          </p>
        </div>

        {/* Stats bar */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {[
            { label: 'Articles', value: '10', icon: FileText },
            { label: 'Total Words', value: totalWords.toLocaleString(), icon: FileText },
            { label: 'Combined Search Volume', value: '9,519/mo', icon: TrendingUp },
            { label: 'Time to Create', value: '24hrs', icon: Clock },
          ].map((stat, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
              <stat.icon className="w-5 h-5 text-[#E8192C] mx-auto mb-2" />
              <p className="text-2xl md:text-3xl font-black text-white">{stat.value}</p>
              <p className="text-xs text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Blog grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {blogs.map((blog, index) => (
            <div
              key={blog.id}
              className={`group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 md:p-6 transition-all duration-500 hover:bg-white/10 hover:border-[#E8192C]/50 hover:-translate-y-1 cursor-pointer ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${300 + index * 50}ms` }}
              onMouseEnter={() => setHoveredBlog(blog.id)}
              onMouseLeave={() => setHoveredBlog(null)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded-full bg-[#E8192C] text-white text-xs font-bold flex items-center justify-center">
                      {blog.id}
                    </span>
                    <span className="text-xs text-slate-400">{blog.readTime} read</span>
                    <span className="text-xs text-[#F5921E] font-medium">{blog.searchVolume}</span>
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-white mb-2 group-hover:text-[#E8192C] transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-slate-400 mb-3 line-clamp-2">{blog.excerpt}</p>
                  <div className="flex flex-wrap gap-2">
                    {blog.keywords.slice(0, 2).map((kw, i) => (
                      <span key={i} className="text-xs bg-white/10 text-slate-300 px-2 py-1 rounded">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#E8192C] transition-colors">
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </div>
              
              {/* Word count badge */}
              <div className="absolute top-4 right-4 text-xs text-slate-500">
                {blog.wordCount.toLocaleString()} words
              </div>
            </div>
          ))}
        </div>

        {/* Download CTA */}
        <div className={`text-center transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex flex-col items-center gap-6 bg-gradient-to-br from-[#E8192C] to-[#D01622] rounded-2xl p-8 md:p-10 shadow-2xl shadow-[#E8192C]/20">
            <div className="text-center">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                Download All 10 Articles Now
              </h3>
              <p className="text-white/80 text-sm md:text-base max-w-md">
                Fully formatted, ready to publish. Just add your branding and go live.
              </p>
            </div>
            <a 
              href="/api/download-blogs" 
              download="solar-path-blog-content.zip"
              className="inline-flex items-center gap-3 bg-white text-[#E8192C] px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-100 transition-all duration-300 hover:scale-105 shadow-xl"
            >
              <Download className="w-5 h-5" />
              Download ZIP ({(totalWords / 1000).toFixed(1)}k words)
            </a>
            <p className="text-white/60 text-xs">
              Includes all 10 markdown files + meta descriptions + featured image suggestions
            </p>
          </div>
        </div>

        {/* Context note */}
        <div className={`mt-12 text-center transition-all duration-700 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-6 py-4">
            <Sparkles className="w-5 h-5 text-[#F5921E]" />
            <p className="text-sm text-slate-300">
              <span className="font-semibold text-white">This is the power of AI + expertise.</span> We created this entire content library in under 24 hours. 
              Imagine what we could do for Solar Path in 90 days.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
