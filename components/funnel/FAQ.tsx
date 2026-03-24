'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'Can we send SMS through Go High Level in Ireland?',
    answer: 'There are restrictions on Irish SMS through GHL directly. As we discussed on the call, we\'ll integrate Mailchimp to enable SMS alongside email — doubling the chances of a customer responding. This is already factored into the CRM build.',
  },
  {
    question: 'How hands-on do we need to be?',
    answer: 'As little as possible. We manage campaigns, creative, CRM automations, and reporting. Your team focuses on selling and installing. The fortnightly call is 30 minutes. Video shoots are 2 days per quarter, fully directed by us. Otherwise, we handle it.',
  },
  {
    question: 'What if the leads are poor quality?',
    answer: 'Our 8-step qualification gate means leads fill in 5 mandatory questions before submitting — no autofill. They\'ve self-qualified by the time they reach your CRM. Plus SolaFlow pre-screens by property type, energy usage, and budget expectation. Your SDRs will have more pre-call intelligence than they\'ve ever had.',
  },
  {
    question: 'What happens if it doesn\'t work?',
    answer: '3-month minimum. If after 90 days the numbers don\'t stack up, you walk away with 30 days notice. But we\'ll know long before day 90 whether it\'s working — the fortnightly calls exist to catch problems early, not report on them after the fact.',
  },
  {
    question: 'Can you handle commercial and agricultural as well?',
    answer: 'Yes — Jackie asked about this on the call. We\'ve generated over 450MW of commercial opportunity across the UK. We have calculator software, appointment setting infrastructure, and dedicated commercial campaign frameworks. This sits as an add-on once the residential engine is running.',
  },
  {
    question: 'What about the Rocky / Foch situation?',
    answer: 'We\'ve built this proposal to work entirely without Rocky funding. If your conversation goes well and the Foch exclusivity ends in April, the installer loyalty programme could reduce or eliminate your ad spend entirely. That\'s upside — not the plan. We\'re happy to be on a call with Rocky if it helps.',
  },
  {
    question: 'Why the discount?',
    answer: 'Solar Path is our first Irish client under the full ETOTO system. You\'re opening a market for us. The £1,000/month discount reflects that — and it stays in place for as long as we work together. Standard UK retainer is £3,000. You pay £2,000.',
  },
  {
    question: 'Do we need planning permission for solar panels?',
    answer: 'Almost certainly not. Since October 2022, solar panels on residential rooftops in Ireland are exempt from planning permission, provided they don\'t extend more than 50cm above the roof surface. There are limited exceptions for protected structures and architectural conservation areas — we\'ll flag these during the site survey if applicable. For farm buildings, rooftop solar is exempt up to 300 kWp.',
  },
  {
    question: 'Do solar panels actually work in Irish weather?',
    answer: 'Yes — this is the most common myth in Irish solar and it\'s completely wrong. Ireland receives 1,100-1,600 sunshine hours per year. The Netherlands, which has 20% worse solar irradiance, leads Europe in rooftop solar adoption per capita. Modern panels work on daylight, not direct sunshine. A well-sized system in Cork generates 3,500-4,000 kWh per year — enough to cover 70-100% of a typical household\'s consumption. Real Irish homeowners consistently report 5-7 year payback periods on forums like Boards.ie.',
  },
]

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 md:py-24 px-4 md:px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <span className="inline-block px-4 py-1.5 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full mb-4 tracking-wide uppercase">
            Questions We Know You Have
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-slate-900">
            Straight Answers
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border border-slate-200 rounded-xl overflow-hidden transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: `${100 + index * 50}ms` }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-slate-50 transition-colors"
              >
                <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                />
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}
              >
                <p className="px-5 pb-5 text-slate-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
