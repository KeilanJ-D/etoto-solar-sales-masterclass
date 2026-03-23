'use client'

import { useEffect, useRef, useState } from 'react'
import { Star, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'

const reviews = [
  {
    name: 'Paul Harrison',
    company: 'UPS Solar',
    text: 'ETOTO transformed our lead generation. We went from struggling with poor quality leads to having a consistent pipeline of qualified homeowners ready to buy. The £450 CPA speaks for itself.',
    rating: 5,
  },
  {
    name: 'Michael O\'Brien',
    company: 'Premier Energy Ireland',
    text: 'The team understands the Irish solar market better than anyone we have worked with. Their ad creatives actually convert, and the qualification process means we only speak to serious buyers.',
    rating: 5,
  },
  {
    name: 'Sarah McCarthy',
    company: 'GreenLight Solar',
    text: 'We were skeptical at first, but the results are undeniable. More leads, better quality, lower costs. ETOTO delivered exactly what they promised and then some.',
    rating: 5,
  },
  {
    name: 'David Walsh',
    company: 'SunPower Solutions',
    text: 'Finally, a marketing agency that gets renewables. No more generic campaigns that waste budget. Every pound we spend with ETOTO comes back tenfold.',
    rating: 5,
  },
]

export default function Reviews() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % reviews.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const nextReview = () => setCurrentIndex(prev => (prev + 1) % reviews.length)
  const prevReview = () => setCurrentIndex(prev => (prev - 1 + reviews.length) % reviews.length)

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-2 mb-4">
            <img 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ETOTO_Joel-Sp4sI6W29ziGLLM0CGKbh7tBi3HDbM.png" 
              alt="ETOTO Media" 
              className="h-8 object-contain"
            />
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#F5921E] text-[#F5921E]" />
              ))}
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-[#1A1A2E] mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
            Solar installers across the UK and Ireland trust ETOTO to deliver results.
          </p>
        </div>

        {/* Review carousel */}
        <div className={`relative transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-3xl p-8 md:p-12 relative overflow-hidden">
            {/* Quote mark */}
            <div className="absolute top-4 left-4 text-[#E8192C]/10 text-9xl font-serif leading-none">"</div>
            
            <div className="relative z-10">
              <div className="flex gap-1 mb-6">
                {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#F5921E] text-[#F5921E]" />
                ))}
              </div>
              
              <p className="text-xl md:text-2xl text-[#1A1A2E] font-medium leading-relaxed mb-8">
                "{reviews[currentIndex].text}"
              </p>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-[#1A1A2E]">{reviews[currentIndex].name}</p>
                  <p className="text-[#64748B]">{reviews[currentIndex].company}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={prevReview}
                    className="w-10 h-10 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center hover:bg-[#F8FAFC] transition-all"
                  >
                    <ChevronLeft className="w-5 h-5 text-[#64748B]" />
                  </button>
                  <button 
                    onClick={nextReview}
                    className="w-10 h-10 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center hover:bg-[#F8FAFC] transition-all"
                  >
                    <ChevronRight className="w-5 h-5 text-[#64748B]" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentIndex === i ? 'bg-[#E8192C] w-6' : 'bg-[#E2E8F0]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* CTA to leave review */}
        <div className={`mt-12 text-center transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-[#64748B] mb-4">Found this audit helpful?</p>
          <a 
            href="https://g.page/r/ETOTOMEDIA/review" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white border-2 border-[#E8192C] text-[#E8192C] px-6 py-3 rounded-full font-semibold hover:bg-[#E8192C] hover:text-white transition-all"
          >
            Leave Us a Review
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
