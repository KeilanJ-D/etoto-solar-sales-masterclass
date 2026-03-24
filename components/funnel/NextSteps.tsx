'use client'

import { useEffect, useRef, useState } from 'react'
import { CheckCircle, Settings, Search, Phone, ArrowRight, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'

const metaOnboardingSteps = [
  {
    step: 1,
    title: 'Switch to your business page account',
    description: 'Go to Facebook and click on your profile in the top right corner to make the switch.',
  },
  {
    step: 2,
    title: 'Open Meta Business Suite',
    description: 'Find and click the Menu in the top right (beside Messenger), scroll down to find "Meta Business Suite".',
  },
  {
    step: 3,
    title: 'Go to Settings',
    description: 'Find the "All Tools" button and select either "Settings" or "Business Settings". If this looks different you may need to create a business account.',
  },
  {
    step: 4,
    title: 'Add our team',
    description: 'Within your settings find "People" and click the "Add People" button.',
  },
  {
    step: 5,
    title: 'Grant full access',
    description: 'Give the email marketingteam@etotomedia.com FULL ACCESS and assign the relevant business assets such as your Facebook and Instagram pages.',
  },
  {
    step: 6,
    title: 'Connect billing',
    description: 'Head to "Billing & Payments" in your business profile settings, find "Payment Methods" tab and add a "Business Payment Method" — this will be used for your monthly ad spend.',
  },
]

export default function NextSteps() {
  const [isVisible, setIsVisible] = useState(false)
  const [showMetaGuide, setShowMetaGuide] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const steps = [
    {
      icon: CheckCircle,
      title: 'The Green Light',
      description: 'Review this with Jackie. Let us know you\'re in. We\'ll send contracts same day.',
      expandable: null,
    },
    {
      icon: Settings,
      title: 'GHL Access',
      description: 'Add ETOTO as a staff member in Go High Level. We start scoping the CRM build immediately.',
      expandable: null,
    },
    {
      icon: Search,
      title: 'Meta Ads + GA4 Access',
      description: 'Grant access to your Meta Ads account and GA4. Free audit — no commitment, just an honest look.',
      expandable: 'meta',
    },
    {
      icon: Phone,
      title: 'Rocky Update',
      description: 'Let us know how the conversation lands. If the funding model works, it\'s a bonus — not the plan.',
      expandable: null,
    },
  ]

  return (
    <section ref={sectionRef} className="py-16 md:py-28 px-4 md:px-6 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-4">
            What Happens Next
          </h2>
          <p className="text-base md:text-lg text-slate-500">
            Four things. That's it. Then we move.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-4 md:space-y-6">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={index}
                className={`relative transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                }`}
                style={{ transitionDelay: `${200 + index * 150}ms` }}
              >
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-[#E8192C] hover:shadow-lg transition-all duration-300 group">
                  <div className="flex items-start gap-4 md:gap-6 p-5 md:p-6">
                    {/* Step number + icon */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-[#E8192C]/10 flex items-center justify-center group-hover:bg-[#E8192C] transition-colors duration-300">
                          <Icon className="w-6 h-6 md:w-7 md:h-7 text-[#E8192C] group-hover:text-white transition-colors duration-300" />
                        </div>
                        <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-[#E8192C] text-white text-xs font-bold flex items-center justify-center">
                          {index + 1}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1">{step.title}</h3>
                      <p className="text-sm md:text-base text-slate-500">{step.description}</p>
                      
                      {/* Meta guide toggle */}
                      {step.expandable === 'meta' && (
                        <button
                          onClick={() => setShowMetaGuide(!showMetaGuide)}
                          className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#E8192C] hover:text-[#C41526] transition-colors"
                        >
                          {showMetaGuide ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          {showMetaGuide ? 'Hide Meta onboarding guide' : 'Click to see Meta onboarding guide'}
                        </button>
                      )}
                    </div>

                    {/* Arrow */}
                    <div className="flex-shrink-0 hidden md:flex items-center justify-center">
                      <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-[#E8192C] transition-colors duration-300" />
                    </div>
                  </div>

                  {/* Meta onboarding guide (expandable) */}
                  {step.expandable === 'meta' && showMetaGuide && (
                    <div className="border-t border-slate-200 bg-slate-50 p-5 md:p-6">
                      <h4 className="font-bold text-slate-900 mb-4">Meta Business Onboarding Guide</h4>
                      <div className="space-y-4">
                        {metaOnboardingSteps.map((guideStep) => (
                          <div key={guideStep.step} className="flex gap-3">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#E8192C] text-white text-xs font-bold flex items-center justify-center">
                              {guideStep.step}
                            </div>
                            <div>
                              <p className="font-semibold text-slate-900 text-sm">{guideStep.title}</p>
                              <p className="text-slate-500 text-sm">{guideStep.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                        <p className="text-sm text-blue-800">
                          <strong>Email to add:</strong> marketingteam@etotomedia.com
                        </p>
                        <p className="text-xs text-blue-600 mt-1">
                          For any questions, email contact@etotomedia.com or drop us a message on WhatsApp.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-6 md:left-7 top-full w-0.5 h-4 md:h-6 bg-slate-200" />
                )}
              </div>
            )
          })}
        </div>

        {/* Urgency note */}
        <div className={`mt-10 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-[#E8192C] rounded-xl p-6 text-center">
            <p className="text-xl md:text-2xl font-bold text-white mb-2">
              Your current agency ends this week.
            </p>
            <p className="text-red-100 text-sm md:text-base">
              We can have campaigns live within 7 days of signing. There doesn't need to be a gap — but the decision needs to happen now.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
