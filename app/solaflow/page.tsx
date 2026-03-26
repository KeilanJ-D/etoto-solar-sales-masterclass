'use client'

import { useState } from 'react'
import { Check, ArrowRight, Zap, BarChart3, Users, Clock, Play, ExternalLink } from 'lucide-react'
import ProductFooter from '@/components/products/ProductFooter'

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

const plans = [
  {
    name: 'Starter',
    price: '£49',
    period: '/month',
    description: 'Perfect for solo installers',
    features: [
      'Up to 50 quotes/month',
      '1 user',
      'Basic branding',
      'Email support',
      'Standard integrations'
    ],
    cta: 'Start Free Trial',
    highlighted: false
  },
  {
    name: 'Professional',
    price: '£149',
    period: '/month',
    description: 'For growing sales teams',
    features: [
      'Unlimited quotes',
      'Up to 5 users',
      'Full white-label branding',
      'Priority support',
      'CRM integrations',
      'Custom pricing rules',
      'Analytics dashboard'
    ],
    cta: 'Start Free Trial',
    highlighted: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large installers',
    features: [
      'Everything in Professional',
      'Unlimited users',
      'Dedicated account manager',
      'Custom development',
      'SLA guarantee',
      'On-premise option'
    ],
    cta: 'Contact Sales',
    highlighted: false
  }
]

export default function SolaFlowPage() {
  const [showDemo, setShowDemo] = useState(false)

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
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 text-emerald-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                <span>Solar Quote Software</span>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
                Generate Solar Quotes in 60 Seconds
              </h1>
              
              <p className="text-lg md:text-xl text-emerald-100 mb-8">
                SolaFlow is the quote engine trusted by 200+ UK solar installers. 
                Turn website visitors into qualified leads with instant, accurate proposals.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://vercel-solar-estimator.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-emerald-900 font-bold py-4 px-8 rounded-full transition-all min-h-[56px]"
                >
                  <span>Try Live Demo</span>
                  <ExternalLink className="w-5 h-5" />
                </a>
                <button
                  onClick={() => setShowDemo(true)}
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-full transition-all min-h-[56px]"
                >
                  <Play className="w-5 h-5" />
                  <span>Watch Video</span>
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="aspect-video bg-slate-900/50 rounded-xl flex items-center justify-center">
                  <button
                    onClick={() => setShowDemo(true)}
                    className="w-20 h-20 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
                  >
                    <Play className="w-10 h-10 text-white ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Video Modal */}
      {showDemo && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setShowDemo(false)}
        >
          <div 
            className="w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="SolaFlow Demo"
            />
          </div>
        </div>
      )}
      
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
      
      {/* Embedded Demo */}
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
      
      {/* Pricing */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-slate-500 text-center mb-12">
            Start free, upgrade when you&apos;re ready. No hidden fees.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-6 ${
                  plan.highlighted 
                    ? 'bg-emerald-900 text-white ring-4 ring-emerald-500' 
                    : 'bg-white border border-slate-200'
                }`}
              >
                {plan.highlighted && (
                  <div className="text-emerald-300 text-sm font-medium mb-2">Most Popular</div>
                )}
                <h3 className={`text-xl font-bold mb-1 ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-4 ${plan.highlighted ? 'text-emerald-200' : 'text-slate-500'}`}>
                  {plan.description}
                </p>
                
                <div className="mb-6">
                  <span className={`text-4xl font-black ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>
                    {plan.price}
                  </span>
                  <span className={plan.highlighted ? 'text-emerald-200' : 'text-slate-500'}>
                    {plan.period}
                  </span>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        plan.highlighted ? 'text-emerald-400' : 'text-emerald-500'
                      }`} />
                      <span className={`text-sm ${plan.highlighted ? 'text-emerald-100' : 'text-slate-600'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <a
                  href="mailto:keilan.jd@etotomedia.com?subject=SolaFlow%20Inquiry"
                  className={`flex items-center justify-center gap-2 w-full font-bold py-3 px-4 rounded-xl transition-all min-h-[48px] ${
                    plan.highlighted
                      ? 'bg-white hover:bg-slate-100 text-emerald-900'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-600 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Transform Your Solar Sales?
          </h2>
          <p className="text-emerald-100 mb-8">
            Join 200+ UK installers already using SolaFlow to close more deals.
          </p>
          <a
            href="mailto:keilan.jd@etotomedia.com?subject=SolaFlow%20Demo%20Request"
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-emerald-900 font-bold py-4 px-8 rounded-full transition-all"
          >
            <span>Book a Demo</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>
      
      <ProductFooter />
    </main>
  )
}
