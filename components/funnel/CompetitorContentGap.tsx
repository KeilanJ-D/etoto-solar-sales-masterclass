'use client'

import { useEffect, useRef, useState } from 'react'
import { AlertTriangle, CheckCircle, XCircle, TrendingUp, Search } from 'lucide-react'

const competitors = [
  { name: 'Solar Path', isCurrent: true },
  { name: 'PV Gen Solar', isCurrent: false },
  { name: 'Swyft Energy', isCurrent: false },
  { name: 'Activ8 Solar', isCurrent: false },
]

const contentTopics = [
  { topic: 'SEAI Grant Guide', solarPath: false, pvGen: true, swyft: true, activ8: true, volume: '2,400/mo', priority: 'high' },
  { topic: 'Solar Costs Ireland', solarPath: false, pvGen: true, swyft: true, activ8: false, volume: '1,900/mo', priority: 'high' },
  { topic: 'Battery Storage Guide', solarPath: false, pvGen: true, swyft: true, activ8: true, volume: '1,300/mo', priority: 'high' },
  { topic: 'Sigenergy Review', solarPath: false, pvGen: false, swyft: true, activ8: false, volume: '590/mo', priority: 'medium' },
  { topic: 'Aiko Panels Review', solarPath: false, pvGen: false, swyft: false, activ8: false, volume: '480/mo', priority: 'medium' },
  { topic: 'County-Specific Pages', solarPath: false, pvGen: true, swyft: true, activ8: true, volume: '3,200/mo', priority: 'high' },
  { topic: 'CEG / Grid Export', solarPath: false, pvGen: true, swyft: false, activ8: true, volume: '880/mo', priority: 'medium' },
  { topic: 'Farm Solar / TAMS 3', solarPath: false, pvGen: false, swyft: true, activ8: false, volume: '540/mo', priority: 'medium' },
]

export default function CompetitorContentGap() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)
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

  const solarPathScore = contentTopics.filter(t => t.solarPath).length
  const maxScore = contentTopics.length

  return (
    <section ref={sectionRef} className="py-16 md:py-28 px-4 md:px-6 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#E8192C] via-[#F5921E] to-[#E8192C]" />
      
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-10 md:mb-14 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-flex items-center gap-2 bg-red-50 text-[#DC2626] text-sm font-semibold px-4 py-2 rounded-full mb-4">
            <Search className="w-4 h-4" />
            Competitor Content Analysis
          </span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-4">
            Your Competitors Are Eating
            <span className="text-[#E8192C]"> Your Lunch</span>
          </h2>
          <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto">
            We analysed the top Irish solar installers. Here is what they have that you do not.
          </p>
        </div>

        {/* Score callout */}
        <div className={`mb-8 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-red-50 border border-red-100 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#DC2626] flex items-center justify-center">
                <span className="text-2xl font-black text-white">{solarPathScore}/{maxScore}</span>
              </div>
              <div>
                <p className="font-bold text-slate-900 text-lg">Solar Path Content Score</p>
                <p className="text-sm text-slate-500">You are missing {maxScore - solarPathScore} of {maxScore} key content topics</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[#DC2626]">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-semibold">Critical content gaps detected</span>
            </div>
          </div>
        </div>

        {/* Content gap table */}
        <div className={`overflow-x-auto transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-slate-200">
                <th className="text-left py-4 px-4 font-bold text-slate-900">Content Topic</th>
                <th className="text-center py-4 px-3 font-bold text-slate-900">
                  <span className="inline-flex items-center gap-1">
                    Solar Path
                    <span className="text-xs font-normal text-slate-400">(You)</span>
                  </span>
                </th>
                <th className="text-center py-4 px-3 font-bold text-slate-600 hidden md:table-cell">PV Gen</th>
                <th className="text-center py-4 px-3 font-bold text-slate-600 hidden md:table-cell">Swyft</th>
                <th className="text-center py-4 px-3 font-bold text-slate-600 hidden md:table-cell">Activ8</th>
                <th className="text-right py-4 px-4 font-bold text-slate-900">Search Volume</th>
              </tr>
            </thead>
            <tbody>
              {contentTopics.map((topic, index) => (
                <tr 
                  key={index}
                  className={`border-b border-slate-100 transition-colors duration-200 ${
                    hoveredRow === index ? 'bg-red-50' : ''
                  } ${!topic.solarPath ? 'bg-red-50/50' : ''}`}
                  onMouseEnter={() => setHoveredRow(index)}
                  onMouseLeave={() => setHoveredRow(null)}
                  style={{ 
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                    transition: `all 0.5s ease ${400 + index * 50}ms`
                  }}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-900">{topic.topic}</span>
                      {topic.priority === 'high' && (
                        <span className="text-xs bg-[#E8192C] text-white px-2 py-0.5 rounded-full font-semibold">
                          HIGH
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-3 text-center">
                    {topic.solarPath ? (
                      <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                    ) : (
                      <XCircle className="w-6 h-6 text-[#DC2626] mx-auto" />
                    )}
                  </td>
                  <td className="py-4 px-3 text-center hidden md:table-cell">
                    {topic.pvGen ? (
                      <CheckCircle className="w-5 h-5 text-green-500 mx-auto opacity-60" />
                    ) : (
                      <XCircle className="w-5 h-5 text-slate-300 mx-auto" />
                    )}
                  </td>
                  <td className="py-4 px-3 text-center hidden md:table-cell">
                    {topic.swyft ? (
                      <CheckCircle className="w-5 h-5 text-green-500 mx-auto opacity-60" />
                    ) : (
                      <XCircle className="w-5 h-5 text-slate-300 mx-auto" />
                    )}
                  </td>
                  <td className="py-4 px-3 text-center hidden md:table-cell">
                    {topic.activ8 ? (
                      <CheckCircle className="w-5 h-5 text-green-500 mx-auto opacity-60" />
                    ) : (
                      <XCircle className="w-5 h-5 text-slate-300 mx-auto" />
                    )}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className={`font-semibold ${topic.priority === 'high' ? 'text-[#E8192C]' : 'text-slate-600'}`}>
                      {topic.volume}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Product keyword alert */}
        <div className={`mt-10 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-[#F5921E]/10 border border-[#F5921E]/30 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#F5921E] flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">Product Keyword Alert: You Are Invisible</h3>
                <p className="text-slate-600 mb-3">
                  Solar Path installs <strong>Sigenergy</strong> and <strong>Aiko</strong> products, but you have zero content ranking for these terms. 
                  Homeowners searching for these premium brands cannot find you.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm bg-white border border-slate-200 px-3 py-1 rounded-full">
                    "sigenergy ireland" — <span className="text-[#E8192C] font-semibold">590 searches/mo</span>
                  </span>
                  <span className="text-sm bg-white border border-slate-200 px-3 py-1 rounded-full">
                    "aiko solar panels" — <span className="text-[#E8192C] font-semibold">480 searches/mo</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={`mt-10 text-center transition-all duration-700 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-slate-500 text-sm md:text-base">
            The good news? <span className="font-semibold text-slate-900">We have already written articles for all 8 topics.</span> 
            <br className="hidden md:block" />
            Scroll down to see the content library we built for you in 24 hours.
          </p>
        </div>
      </div>
    </section>
  )
}
