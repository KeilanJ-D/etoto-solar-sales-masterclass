'use client'

import { Check, ArrowRight, Zap, BarChart3, Users, Clock, Calendar, MessageCircle } from 'lucide-react'
import ProductFooter from '@/components/products/ProductFooter'
import { StatsBanner } from '@/components/shared/StatsBanner'
import { VideoTestimonial } from '@/components/shared/VideoTestimonial'
import { ScreenshotProof } from '@/components/shared/ScreenshotProof'
import { GoogleReviewsCarousel } from '@/components/shared/GoogleReviewsCarousel'
import { stats, getVideoTestimonialById, screenshotProof } from '@/lib/social-proof-data'

const features = [
  {
    icon: Zap,
    title: 'Instant Quotes',
    description: 'Generate accurate solar proposals in under 60 seconds with live pricing'
  },
  {
    icon: BarChart3,
    title: 'ROI Calculator',
    description: 'Show customers their exact savings with interactive payback charts'
  },
  {
    icon: Users,
    title: 'Lead Capture',
    description: 'Built-in forms that sync directly to your CRM or email'
  },
  {
    icon: Clock,
    title: 'Time Savings',
    description: 'Reduce quote generation from hours to minutes'
  }
]

const includedFeatures = [
  'Branded to your business',
  'Your own products & pricing',
  'Dashboard access',
  'Embed code for your website',
  'Lead capture & notifications',
  'Ongoing updates included',
  'Setup & onboarding included',
]

export default function SolaFlowPage() {
  const abTestimonial = getVideoTestimonialById('ab-renewables')
  
  return (
    <main className="bg-[#FAFBFC] min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white py-16 md:py-24 px-4 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-300 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-5xl mx-auto relative">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 text-emerald-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              <span>Solar Quote Software</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
              Generate Solar Quotes in 60 Seconds
            </h1>
            
            <p className="text-lg md:text-xl text-emerald-100 mb-8 max-w-3xl mx-auto">
              SolaFlow is the quote engine trusted by 200+ UK solar installers. 
              Turn website visitors into qualified leads with instant, accurate proposals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://buy.stripe.com/bJeeVfgPQ1k95zc1XYfEk07"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-emerald-900 font-bold py-4 px-8 rounded-full transition-all min-h-[56px]"
              >
                <span>Start My Free Trial</span>
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="https://calendly.com/etotomediakjd/intromeeting"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-full transition-all min-h-[56px]"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Your Onboarding Call</span>
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Banner */}
      <StatsBanner stats={stats} />
      
      {/* Features */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-4">
            Why Installers Choose SolaFlow
          </h2>
          <p className="text-slate-500 text-center mb-12 max-w-2xl mx-auto">
            Stop losing leads to slow quotes. SolaFlow gives your customers instant answers.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-emerald-300 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-500 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Live Demo Embed */}
      <section className="bg-slate-900 py-16 md:py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-4">
            Try It Yourself
          </h2>
          <p className="text-slate-400 text-center mb-8">
            This is the exact widget your customers will see on your website
          </p>
          
          <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              src="https://vercel-solar-estimator.vercel.app"
              className="w-full h-[500px] md:h-[700px]"
              title="SolaFlow Demo"
            />
          </div>
        </div>
      </section>
      
      {/* AB Renewables Testimonial */}
      {abTestimonial && (
        <section className="py-16 md:py-24 px-4 bg-slate-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-xs sm:text-sm font-medium rounded-full mb-3">
                Client Success
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                &ldquo;{abTestimonial.stat}&rdquo;
              </h2>
              <p className="text-slate-600 mt-2">
                AB Renewables — full ETOTO + SolaFlow results
              </p>
            </div>
            <VideoTestimonial testimonial={abTestimonial} />
          </div>
        </section>
      )}
      
      {/* Screenshot Proof */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              Real results, real conversations
            </h3>
          </div>
          <ScreenshotProof items={screenshotProof.filter(s => s.id === 'ups-solar')} />
        </div>
      </section>
      
      {/* Pricing - Single Plan */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-slate-500 text-center mb-12">
            One price. Everything included. 14-day free trial.
          </p>
          
          {/* Single Pricing Card */}
          <div className="bg-gradient-to-br from-emerald-900 to-teal-900 rounded-3xl p-8 md:p-10 text-white">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-white/10 text-emerald-200 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Zap className="w-4 h-4" />
                <span>14-Day Free Trial</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">SolaFlow</h3>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-5xl md:text-6xl font-black">£200</span>
                <span className="text-emerald-200 text-xl">/month</span>
              </div>
              <p className="text-emerald-200 mt-2">No charge until day 15</p>
            </div>
            
            <ul className="space-y-4 mb-8">
              {includedFeatures.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-emerald-100">{feature}</span>
                </li>
              ))}
            </ul>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://buy.stripe.com/bJeeVfgPQ1k95zc1XYfEk07"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-emerald-900 font-bold py-4 px-6 rounded-xl transition-all min-h-[56px]"
              >
                <span>Start My Free Trial</span>
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="https://calendly.com/etotomediakjd/intromeeting"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-6 rounded-xl transition-all min-h-[56px]"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Your Onboarding Call</span>
              </a>
            </div>
          </div>
          
          {/* ETOTO Network Banner */}
          <div className="mt-8 bg-slate-100 rounded-2xl p-6 border border-slate-200">
            <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
              <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-6 h-6 text-[#25D366]" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 mb-1">All SolaFlow customers get access to The ETOTO Network</h4>
                <p className="text-sm text-slate-600">Join 200+ installers sharing leads, insights, and best practices.</p>
              </div>
              <a
                href="https://chat.whatsapp.com/FSM9iEeKpPj9Oux4qYyFSz?mode=gi_t"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold py-3 px-5 rounded-full transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Join WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Google Reviews Carousel */}
      <GoogleReviewsCarousel />
      
      {/* CTA */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-600 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Transform Your Solar Sales?
          </h2>
          <p className="text-emerald-100 mb-8">
            Join 200+ UK installers already using SolaFlow to close more deals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://buy.stripe.com/bJeeVfgPQ1k95zc1XYfEk07"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-emerald-900 font-bold py-4 px-8 rounded-full transition-all"
            >
              <span>Start My Free Trial</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="https://calendly.com/etotomediakjd/intromeeting"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-full transition-all"
            >
              <Calendar className="w-5 h-5" />
              <span>Book a Demo</span>
            </a>
          </div>
        </div>
      </section>
      
      <ProductFooter />
    </main>
  )
}
