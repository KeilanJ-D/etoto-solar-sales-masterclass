'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, Clock, Phone, Calendar, FileText, MessageSquare, Trophy, ChevronDown } from 'lucide-react'

interface TimelineStep {
  timestamp: string
  event: string
  detail: string
  quote?: string
  highlight?: boolean
  icon?: 'estimate' | 'call' | 'survey' | 'quote' | 'message' | 'won'
}

interface CustomerJourneyTimelineProps {
  steps: TimelineStep[]
  title?: string
  subtitle?: string
  customer?: string
  totalValue?: string
}

const iconMap = {
  estimate: Clock,
  call: Phone,
  survey: Calendar,
  quote: FileText,
  message: MessageSquare,
  won: Trophy,
}

export function CustomerJourneyTimeline({ 
  steps, 
  title = "From Ad to Deposit",
  subtitle,
  customer,
  totalValue
}: CustomerJourneyTimelineProps) {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([])
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set())
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  // On mobile, auto-expand the "WON" step (highlighted)
  useEffect(() => {
    const highlightedIndex = steps.findIndex(s => s.highlight)
    if (highlightedIndex !== -1) {
      setExpandedSteps(new Set([highlightedIndex]))
    }
  }, [steps])

  const toggleStep = (index: number) => {
    setExpandedSteps(prev => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'))
            setVisibleSteps((prev) => {
              if (!prev.includes(index)) {
                return [...prev, index].sort((a, b) => a - b)
              }
              return prev
            })
          }
        })
      },
      { threshold: 0.3, rootMargin: '0px 0px -50px 0px' }
    )

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [steps.length])

  return (
    <div className="py-8 sm:py-12">
      {/* Header */}
      <div className="text-center mb-10">
        {customer && (
          <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-sm font-medium rounded-full mb-3">
            {customer}
          </span>
        )}
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">{title}</h3>
        {subtitle && <p className="text-slate-600">{subtitle}</p>}
      </div>

      {/* Timeline */}
      <div className="relative max-w-2xl mx-auto">
        {/* Vertical line */}
        <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 sm:-translate-x-0.5" />

        {/* Steps */}
        <div className="space-y-6 sm:space-y-8">
          {steps.map((step, index) => {
            const Icon = iconMap[step.icon || 'estimate'] || Clock
            const isVisible = visibleSteps.includes(index)
            const isAlternate = index % 2 === 1

            return (
              <div
                key={index}
                ref={(el) => { stepRefs.current[index] = el }}
                data-index={index}
                className={`relative transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Mobile: always left aligned */}
                {/* Desktop: alternating left/right */}
                <div className={`flex items-start gap-4 pl-12 sm:pl-0 ${
                  isAlternate ? 'sm:flex-row-reverse' : ''
                }`}>
                  {/* Content card */}
                  <div className={`flex-1 ${isAlternate ? 'sm:text-right sm:pr-8' : 'sm:pl-8'} sm:w-1/2`}>
                    {/* On mobile: collapsible card. On desktop: always expanded */}
                    <button
                      onClick={() => toggleStep(index)}
                      className={`sm:cursor-default w-full text-left bg-white rounded-xl border p-4 sm:p-5 shadow-sm ${
                        step.highlight 
                          ? 'border-green-300 bg-green-50' 
                          : 'border-slate-200 hover:border-slate-300'
                      } transition-colors`}
                    >
                      {/* Timestamp + expand indicator on mobile */}
                      <div className="flex items-center justify-between gap-2 sm:block">
                        <p className="text-xs font-medium text-slate-400 mb-1">{step.timestamp}</p>
                        <ChevronDown className={`w-4 h-4 text-slate-400 sm:hidden transition-transform ${
                          expandedSteps.has(index) || step.highlight ? 'rotate-180' : ''
                        }`} />
                      </div>
                      
                      {/* Event - always visible */}
                      <h4 className={`font-bold mb-1 ${
                        step.highlight ? 'text-green-700' : 'text-slate-900'
                      }`}>
                        {step.event}
                      </h4>
                      
                      {/* Detail + Quote - collapsible on mobile, always visible on desktop */}
                      <div className={`${expandedSteps.has(index) || step.highlight ? 'block' : 'hidden'} sm:block`}>
                        <p className={`text-sm ${
                          step.highlight ? 'text-green-600' : 'text-slate-600'
                        }`}>
                          {step.detail}
                        </p>
                        
                        {/* Quote */}
                        {step.quote && (
                          <div className={`mt-3 pt-3 border-t ${
                            step.highlight ? 'border-green-200' : 'border-slate-100'
                          }`}>
                            <p className={`text-sm italic ${
                              step.highlight ? 'text-green-700' : 'text-slate-700'
                            }`}>
                              &ldquo;{step.quote}&rdquo;
                            </p>
                          </div>
                        )}
                      </div>
                    </button>
                  </div>

                  {/* Hidden spacer for desktop alternating layout */}
                  <div className="hidden sm:block sm:w-1/2" />
                </div>

                {/* Icon node - positioned on the timeline */}
                <div className={`absolute left-0 sm:left-1/2 top-4 sm:top-5 w-8 h-8 rounded-full flex items-center justify-center sm:-translate-x-1/2 ${
                  step.highlight
                    ? 'bg-green-500 text-white ring-4 ring-green-100'
                    : 'bg-white border-2 border-slate-300 text-slate-500'
                }`}>
                  {step.highlight ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Footer - Total value */}
      {totalValue && (
        <div className="text-center mt-10 pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-500 mb-1">Total Deal Value</p>
          <p className="text-3xl sm:text-4xl font-black text-green-600">{totalValue}</p>
        </div>
      )}
    </div>
  )
}

// Pre-configured YEERS stories
export const yeersCustomerA: TimelineStep[] = [
  {
    timestamp: 'Mar 17, 6:17 PM',
    event: 'SolaFlow estimate completed',
    detail: '9.18 kWp solar + 11.68 kWh battery | £15,062 estimate',
    icon: 'estimate',
  },
  {
    timestamp: 'Mar 17, 6:22 PM',
    event: 'Rep calls within 5 minutes',
    detail: 'Outbound call made immediately after CRM notification',
    quote: 'Hi, I saw you completed an estimate using our online tool!',
    icon: 'call',
  },
  {
    timestamp: 'Mar 18, 10:11 AM',
    event: 'Survey booked',
    detail: 'Home visit arranged for the following day',
    icon: 'survey',
  },
  {
    timestamp: 'Mar 19, 3:52 PM',
    event: 'Site survey completed',
    detail: '8.73 kW in-roof system, 9kWh battery | Quote: £13,100',
    icon: 'quote',
  },
  {
    timestamp: 'Mar 20, 2:28 PM',
    event: 'Customer compares quotes',
    detail: 'Received cheaper competitor quote using Fox equipment',
    quote: "I've had another quote cheaper, but using Fox equipment and I've looked online and seen that the Sigenergy stuff is loads better like you said.",
    icon: 'message',
  },
  {
    timestamp: 'Mar 20, 7:34 PM',
    event: 'Deposit paid',
    detail: '£13,100 — WON',
    quote: 'Cheers! Deposit paid.',
    highlight: true,
    icon: 'won',
  },
]

export const yeersCustomerB: TimelineStep[] = [
  {
    timestamp: 'Mar 18, 4:42 PM',
    event: 'SolaFlow estimate completed',
    detail: 'Battery-only enquiry | £3,000 estimate',
    icon: 'estimate',
  },
  {
    timestamp: 'Mar 18, 4:48 PM',
    event: 'Rep calls within 6 minutes',
    detail: 'Lead qualified immediately via CRM',
    icon: 'call',
  },
  {
    timestamp: 'Mar 19, 2:30 PM',
    event: 'Site survey completed',
    detail: 'System upgraded on-site: solar + battery recommended',
    icon: 'survey',
  },
  {
    timestamp: 'Mar 21, 11:15 AM',
    event: 'Quote accepted',
    detail: 'Solar + battery system | Quote: £11,300',
    quote: 'SolaFlow helped configure a better system for their usage — they chose a more expensive system over the competitor.',
    highlight: true,
    icon: 'won',
  },
]
