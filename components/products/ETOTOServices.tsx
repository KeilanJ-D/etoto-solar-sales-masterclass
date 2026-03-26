'use client'

import { Target, Globe, Video, Calculator, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: Target,
    title: 'Meta Advertising',
    description: 'Facebook and Instagram ads that generate solar leads at £15-25 CPL. We manage the campaigns, you close the deals.',
    stat: '200+ installers | £175M+ attributed sales',
    cta: 'Talk to Us About Ads',
    href: 'mailto:keilan.jd@etotomedia.com?subject=Meta%20Advertising%20Enquiry',
  },
  {
    icon: Globe,
    title: 'Website Build / Redesign',
    description: 'A website built for conversion. SolaFlow embedded, SEO-optimised, designed to capture the leads your ads create.',
    stat: 'From £2,500',
    cta: 'See Our Builds',
    href: 'https://foreuk.co.uk',
  },
  {
    icon: Video,
    title: 'Video Content',
    description: 'Professional video content for your solar business. Testimonials, explainers, social ads. Shot and edited by ETOTO.',
    stat: 'From £500 per video',
    cta: 'View Portfolio',
    href: 'mailto:keilan.jd@etotomedia.com?subject=Video%20Content%20Enquiry',
  },
  {
    icon: Calculator,
    title: 'SolaFlow for Your Business',
    description: 'Your own branded solar calculator. Customers enter their details, get an instant estimate. Warms leads before the call.',
    stat: '£200/month',
    cta: 'See SolaFlow',
    href: '/solaflow',
  },
]

export default function ETOTOServices() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <span className="text-sm font-medium text-[#E8192C] tracking-wide uppercase mb-3 block">
            ETOTO Media Services
          </span>
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-4">
            Want Us to Do It All?
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base">
            The toolkit gives you the scripts and calculator. But if you want the full package — leads, website, content, and sales system built for you — that&apos;s what ETOTO does.
          </p>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div 
                key={index}
                className="bg-white rounded-xl p-5 md:p-6 border border-slate-200 hover:border-[#E8192C]/30 hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                <div className="w-12 h-12 rounded-lg bg-[#E8192C]/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[#E8192C]" />
                </div>
                
                <h3 className="font-bold text-slate-900 mb-2">{service.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-3 flex-grow">
                  {service.description}
                </p>
                
                <p className="text-xs font-semibold text-[#F5921E] mb-4">
                  {service.stat}
                </p>
                
                <a
                  href={service.href}
                  target={service.href.startsWith('mailto:') || service.href.startsWith('/') ? undefined : '_blank'}
                  rel={service.href.startsWith('mailto:') || service.href.startsWith('/') ? undefined : 'noopener noreferrer'}
                  className="flex items-center gap-2 text-sm font-semibold text-[#E8192C] hover:text-[#D01622] transition-colors group"
                >
                  <span>{service.cta}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            )
          })}
        </div>

        {/* Contact CTA */}
        <div className="mt-10 md:mt-14 text-center">
          <p className="text-slate-600 mb-4">
            Not sure what you need? Let&apos;s talk.
          </p>
          <a
            href="mailto:keilan.jd@etotomedia.com"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-6 rounded-full transition-all"
          >
            <span>Contact ETOTO</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
