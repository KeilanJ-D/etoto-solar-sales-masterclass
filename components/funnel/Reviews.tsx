'use client'

import { useRef, useEffect, useState } from 'react'
import { Star } from 'lucide-react'

const reviews = [
  { name: "Donovan Fawcett", badge: "Local Guide", time: "3 weeks ago", text: "An Incredible company to work with. A great group of very intelligent hard working and capable individuals, worked alongside them in a variety of marketing campaigns from local to national commercial. Very driven and a pleasure to work alongside. Highly recommend." },
  { name: "John Bloomfield", time: "a month ago", text: "Great team especially Keilan who is also a menace on the dance floor. They have exceeded our expectations and we are very happy with the service so far. We are about 5 months in and the increase in enquiries is very noticeable." },
  { name: "James Burrell", time: "11 months ago", text: "We've only been working with ETOTO Media for a few weeks, but we're already seeing great results and good quality leads. The team has been proactive, responsive, and clearly know their stuff. Excited to see what we can achieve together going forward!" },
  { name: "Callum Conroy", time: "a year ago", text: "We've been working with ETOTO Media for 4 months now and they are doing a great job. We've seen our leads triple since the team came on board. Speaking to the team regularly they are great guys." },
  { name: "Emilie Stella Hulbert", time: "a year ago", text: "ETOTO Media has been absolutely amazing in helping grow my business! Their expertise in building our followers and generating high-quality leads has made a huge difference." },
  { name: "Kirsty Biggs", time: "a year ago", text: "We are currently only a few weeks into working with ETOTO, however our social media engagement has increased massively and we already have our first lead converted before we start the lead campaign fully!" },
  { name: "Karim Shabankareh", time: "a year ago", text: "ETOTO media are a young, expert and enthusiastic team of marketeers and sales support strategists. Jordan, Keilan and Joel have absolutely nailed their processes and have helped me scale my business." },
  { name: "David Ewen", time: "a year ago", text: "Our company started using ETOTO Media in May of this year and the amount of high quality leads we have received since has been amazing (over 120). We had many chats and zoom calls with the team before getting started." },
  { name: "Jon Carter", time: "a year ago", text: "Exceptional Onboarding and Lead Generation with ETOTO Marketing! I've been consistently impressed with ETOTO Marketing's services." },
  { name: "Nick Turner", time: "a year ago", text: "ETOTO were recommended to us by a company we work closely with, and could personally see the increase in sales they were making since they started their marketing campaign." },
  { name: "Georgia Memon", badge: "Local Guide", time: "a year ago", text: "The most fantastic, ambitious, committed team. I have had the pleasure of working with Keilan and Alex over the 5 months. It's been an incredible experience." },
  { name: "Daniel Millar", time: "a year ago", text: "The Etoto team are a pleasure to work with and absolutely deliver, after working with a few agencies Etoto are who we have stuck with. The quality of leads and supporting software they provide is unmatched." },
  { name: "Sarah Haysmore", time: "a year ago", text: "The guys at Etoto are like an extension of your work force. Always on hand if you need them, especially Keilan who was working on a project with me until 9pm one evening." },
  { name: "Finn J.W.", time: "a year ago", text: "ETOTO talk a BIG game on the sales call but you'll find out why. I have just finished my first month with ETOTO. Before they took over my marketing, results were mediocre. Now they're exceptional." },
  { name: "Lead Pro Solutions", time: "a year ago", text: "Amazing company we started our business at the start of July needed someone to help us improve our lead quality, halfway through the month and we've hit 100k in sales." },
  { name: "EVLM Renewables", time: "a year ago", text: "A great bunch, totally committed and always on the end of the phone. After a meeting with them we felt they had what it takes to help us scale up our Renewables business." },
  { name: "Robert Atkinson", time: "a year ago", text: "These guys are hard working and ambitious. We get a sense they really want the best for our company and not just want our cash like many marketing companies. Highly recommended." },
  { name: "Richard Murray", time: "2 years ago", text: "A breath of fresh air; creative ideas, excellent communication and top-class marketing & industry knowledge. After multiple failed trials with other companies, it seems we've now found the one." },
  { name: "Aid", badge: "Local Guide", time: "5 days ago", text: "Known the guys for a few years now, they were patient waiting for me to finally commit, but I can honestly say onboarding was easy and I feel like I have 24hour access to the team when needed." },
  { name: "Rory Pack", time: "3 days ago", text: "Great company to work alongside." },
]

function ReviewCard({ review }: { review: typeof reviews[0] }) {
  return (
    <div className="flex-shrink-0 w-[300px] md:w-[360px] bg-white rounded-2xl p-5 md:p-6 shadow-lg border border-slate-100 mx-2 md:mx-3">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-gradient-to-br from-[#E8192C] to-[#FF6B7A] flex items-center justify-center text-white font-bold text-sm md:text-base flex-shrink-0">
          {review.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-slate-900 text-sm md:text-base truncate">{review.name}</p>
          <div className="flex items-center gap-2">
            {review.badge && (
              <span className="text-[10px] md:text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{review.badge}</span>
            )}
            <span className="text-[10px] md:text-xs text-slate-400">{review.time}</span>
          </div>
        </div>
      </div>
      <div className="flex gap-0.5 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 md:w-4 md:h-4 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <p className="text-slate-600 text-xs md:text-sm leading-relaxed line-clamp-4">{review.text}</p>
    </div>
  )
}

export default function Reviews() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])
  
  // Continuous scroll - no pause on hover
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    
    let animationId: number
    let scrollPos = 0
    
    const animate = () => {
      scrollPos += 0.8 // Constant speed, no slowing
      if (scrollPos >= container.scrollWidth / 2) {
        scrollPos = 0
      }
      container.scrollLeft = scrollPos
      animationId = requestAnimationFrame(animate)
    }
    
    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [])

  return (
    <section ref={sectionRef} className="py-16 md:py-28 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      <div className={`max-w-7xl mx-auto px-4 md:px-8 mb-10 md:mb-14 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <p className="text-[#E8192C] font-semibold tracking-wide uppercase text-xs md:text-sm mb-3">
          Trusted by Solar Installers Nationwide
        </p>
        <h2 className="text-2xl md:text-5xl font-bold text-slate-900 mb-5">
          What Our Clients Say
        </h2>
        <div className="flex justify-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 md:w-6 md:h-6 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <p className="text-slate-500 text-sm md:text-base">5.0 rating from 30+ verified Google reviews</p>
      </div>

      <div 
        ref={scrollRef}
        className="flex overflow-hidden"
      >
        <div className="flex">
          {reviews.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
          {reviews.map((review, i) => (
            <ReviewCard key={`dup-${i}`} review={review} />
          ))}
        </div>
      </div>

      <div className={`max-w-7xl mx-auto px-4 md:px-8 mt-12 md:mt-16 text-center transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <p className="text-slate-600 mb-5 text-sm md:text-base">Found this audit helpful?</p>
        <a
          href="https://g.page/r/CQfK3n8YKhAJEBM/review"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white border-2 border-slate-200 hover:border-[#E8192C] text-slate-900 px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-lg group"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Leave Us a Review
        </a>
        <div className="flex justify-center gap-1 mt-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
          ))}
        </div>
      </div>
    </section>
  )
}
