'use client'

import { useState } from 'react'
import { Check, ArrowRight, Zap, BarChart3, Users, Palette, Globe, Phone, FileText, Lock, Calendar, MessageCircle, Sparkles, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import ProductFooter from '@/components/products/ProductFooter'
import { GoogleReviewsCarousel } from '@/components/shared/GoogleReviewsCarousel'

// Brand color presets
const colorPresets = [
  { name: 'ETOTO Red', primary: '#E8192C', secondary: '#1E293B' },
  { name: 'Solar Green', primary: '#10B981', secondary: '#064E3B' },
  { name: 'Electric Blue', primary: '#3B82F6', secondary: '#1E3A8A' },
  { name: 'Royal Purple', primary: '#8B5CF6', secondary: '#4C1D95' },
  { name: 'Sunset Orange', primary: '#F97316', secondary: '#7C2D12' },
]

const useCases = [
  {
    icon: Globe,
    title: 'Website Lead Magnet',
    description: 'Embed the quiz on your website. Visitors get instant savings estimates, you get qualified leads with full contact details.',
    features: ['Auto-capture email & phone', 'Sync to your CRM', 'Custom redirect on completion'],
  },
  {
    icon: Phone,
    title: 'In-Person Sales Tool',
    description: 'Use on tablets during home visits. Walk customers through their savings live, building trust and closing faster.',
    features: ['Offline capable', 'Generate PDF quotes', 'One-tap proposal sharing'],
  },
  {
    icon: FileText,
    title: 'Appointment Setting',
    description: 'Send the quiz link before calls. Setters qualify leads automatically, so closers arrive with data ready.',
    features: ['Pre-qualify before calls', 'Score lead quality', 'Auto-book hot leads'],
  },
]

const includedFeatures = [
  'Fully branded to your business',
  'Your own products & pricing',
  'Dashboard with lead analytics',
  'Website embed code',
  'Lead notifications (email + SMS)',
  'CRM integrations available',
  'Setup & onboarding call',
  'Ongoing updates included',
]

const securityFeatures = [
  { icon: Lock, title: 'Password Protected', description: 'Each calculator requires authentication' },
  { icon: Users, title: 'Team Accounts', description: 'Invite your sales team with role-based access' },
  { icon: Zap, title: 'Rate Limited', description: 'Prevent abuse with smart usage limits' },
]

export default function SolaFlowPage() {
  // Branding customization state
  const [selectedPreset, setSelectedPreset] = useState(0)
  const [customPrimary, setCustomPrimary] = useState(colorPresets[0].primary)
  const [logoText, setLogoText] = useState('Your Brand')
  
  const currentColor = customPrimary || colorPresets[selectedPreset].primary
  
  return (
    <main className="bg-white min-h-screen">
      {/* Hero - Clean, bold SaaS style */}
      <section className="relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20" style={{ background: `radial-gradient(circle, ${currentColor} 0%, transparent 70%)` }} />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-10" style={{ background: `radial-gradient(circle, ${currentColor} 0%, transparent 70%)` }} />
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 text-white/90 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" style={{ color: currentColor }} />
              <span>White-Label Solar Calculator</span>
            </div>
            
            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-[1.1]">
              Your brand.{' '}
              <span style={{ color: currentColor }}>Your calculator.</span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Turn website visitors into qualified leads with a fully-branded solar savings calculator. 
              Used by 200+ UK installers to close more deals.
            </p>
            
            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://buy.stripe.com/bJeeVfgPQ1k95zc1XYfEk07"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-white font-bold py-4 px-8 rounded-full transition-all hover:scale-105 hover:shadow-xl min-h-[56px]"
                style={{ backgroundColor: currentColor }}
              >
                <span>Start 14-Day Free Trial</span>
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#demo"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-full transition-all border border-white/10 min-h-[56px]"
              >
                <span>See Live Demo</span>
                <ChevronRight className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Social proof bar */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <p className="text-center text-slate-500 text-sm mb-6">Trusted by leading UK solar installers</p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
              {['AB Renewables', 'Carter Renewables', 'JEM Energy', 'Halo Renewables', 'UPS Solar'].map((name) => (
                <span key={name} className="text-white/70 font-semibold text-sm">{name}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Interactive Branding Customizer */}
      <section className="py-20 md:py-28 px-4 bg-slate-50" id="customizer">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 bg-slate-200 text-slate-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Palette className="w-4 h-4" />
              <span>Interactive Preview</span>
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-4">
              Make it yours in seconds
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Pick your brand colors and see your calculator come to life. Full customization available after signup.
            </p>
          </div>
          
          {/* Customization Controls + Preview */}
          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* Controls Panel */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4">Customize Your Brand</h3>
              
              {/* Logo Text */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">Company Name</label>
                <input
                  type="text"
                  value={logoText}
                  onChange={(e) => setLogoText(e.target.value)}
                  placeholder="Your Brand"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-offset-2 focus:outline-none transition-all text-slate-900"
                  style={{ ['--tw-ring-color' as string]: currentColor }}
                  maxLength={20}
                />
              </div>
              
              {/* Color Presets */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">Brand Color</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {colorPresets.map((preset, idx) => (
                    <button
                      key={preset.name}
                      onClick={() => {
                        setSelectedPreset(idx)
                        setCustomPrimary(preset.primary)
                      }}
                      className={`w-10 h-10 rounded-full border-2 transition-all hover:scale-110 ${
                        selectedPreset === idx ? 'border-slate-900 ring-2 ring-offset-2' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: preset.primary, ['--tw-ring-color' as string]: preset.primary }}
                      title={preset.name}
                    />
                  ))}
                </div>
                
                {/* Custom color picker */}
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={customPrimary}
                    onChange={(e) => setCustomPrimary(e.target.value)}
                    className="w-10 h-10 rounded-lg border border-slate-200 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={customPrimary}
                    onChange={(e) => setCustomPrimary(e.target.value)}
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm font-mono text-slate-700"
                    placeholder="#E8192C"
                  />
                </div>
              </div>
              
              {/* Preview note */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <p className="text-sm text-slate-600">
                  <strong className="text-slate-900">Full customization unlocked after signup:</strong> Logo upload, custom fonts, button styles, and more.
                </p>
              </div>
            </div>
            
            {/* Calculator Preview */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
                {/* Preview Header */}
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between" style={{ backgroundColor: currentColor }}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-white">{logoText || 'Your Brand'}</span>
                  </div>
                  <span className="text-white/80 text-sm">Solar Savings Calculator</span>
                </div>
                
                {/* Preview Body - Simplified Calculator UI */}
                <div className="p-6">
                  <h4 className="text-lg font-bold text-slate-900 mb-2">Calculate Your Solar Savings</h4>
                  <p className="text-sm text-slate-500 mb-6">Enter your details to see how much you could save</p>
                  
                  {/* Mock Form Fields */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Monthly Electricity Bill</label>
                      <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
                        <span className="px-4 py-3 bg-slate-50 text-slate-500 border-r border-slate-200">£</span>
                        <input type="text" value="150" readOnly className="flex-1 px-4 py-3 text-slate-900 bg-white" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Property Type</label>
                      <select className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 bg-white">
                        <option>Detached House</option>
                        <option>Semi-Detached</option>
                        <option>Terraced</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* Mock Results */}
                  <div className="rounded-xl p-4 mb-6" style={{ backgroundColor: `${currentColor}10` }}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-slate-700">Estimated Annual Savings</span>
                      <span className="text-2xl font-black" style={{ color: currentColor }}>£1,247</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: '75%', backgroundColor: currentColor }} />
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <button
                    className="w-full py-4 rounded-xl font-bold text-white transition-all hover:opacity-90"
                    style={{ backgroundColor: currentColor }}
                  >
                    Get My Free Quote
                  </button>
                </div>
              </div>
              
              {/* Preview Label */}
              <p className="text-center text-sm text-slate-500 mt-4">
                Live preview — your actual calculator will be even more powerful
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Use Cases */}
      <section className="py-20 md:py-28 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-4">
              Three ways to generate leads
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              SolaFlow works wherever you sell — online, on the phone, or face-to-face.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {useCases.map((useCase, idx) => (
              <div
                key={useCase.title}
                className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all group"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${currentColor}15` }}
                >
                  <useCase.icon className="w-7 h-7" style={{ color: currentColor }} />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-3">{useCase.title}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">{useCase.description}</p>
                
                <ul className="space-y-2">
                  {useCase.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-slate-700">
                      <Check className="w-4 h-4 flex-shrink-0" style={{ color: currentColor }} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Live Demo Embed */}
      <section className="py-20 md:py-28 px-4 bg-slate-900" id="demo">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 bg-white/10 text-white/90 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Zap className="w-4 h-4" style={{ color: currentColor }} />
              <span>Live Demo</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Try the real thing
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              This is the exact calculator your customers will use. Go ahead, click around.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              src="https://vercel-solar-estimator.vercel.app"
              className="w-full h-[500px] md:h-[700px]"
              title="SolaFlow Demo Calculator"
            />
          </div>
        </div>
      </section>
      
      {/* Security & Access Control */}
      <section className="py-20 md:py-28 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-slate-200 text-slate-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Lock className="w-4 h-4" />
                <span>Enterprise Security</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
                Your data stays yours
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                SolaFlow is built for businesses, not free tools. Every calculator is secured with authentication, 
                rate limiting, and team-based access controls.
              </p>
              
              <ul className="space-y-4">
                {securityFeatures.map((feature) => (
                  <li key={feature.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5" style={{ color: currentColor }} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{feature.title}</h4>
                      <p className="text-sm text-slate-600">{feature.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-slate-900 rounded-2xl p-8 text-white">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold">Access Control Panel</h4>
                  <p className="text-sm text-slate-400">Manage who can use your calculator</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {[
                  { name: 'Public Website Widget', status: 'Requires email to view results' },
                  { name: 'Sales Team Dashboard', status: 'Password protected' },
                  { name: 'API Access', status: 'Authenticated requests only' },
                ].map((item) => (
                  <div key={item.name} className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-3">
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="text-xs text-slate-400">{item.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing */}
      <section className="py-20 md:py-28 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-4">
              Simple pricing, serious results
            </h2>
            <p className="text-lg text-slate-600">
              One plan. Everything included. Start free, cancel anytime.
            </p>
          </div>
          
          {/* Pricing Card */}
          <div className="rounded-3xl overflow-hidden shadow-2xl" style={{ background: `linear-gradient(135deg, ${currentColor} 0%, ${colorPresets[selectedPreset].secondary} 100%)` }}>
            <div className="p-8 md:p-12 text-white">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-8 border-b border-white/20">
                <div>
                  <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-sm font-medium mb-4">
                    <Sparkles className="w-4 h-4" />
                    <span>14-Day Free Trial</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">SolaFlow Pro</h3>
                  <p className="text-white/70">Everything you need to convert more leads</p>
                </div>
                <div className="mt-6 md:mt-0 text-right">
                  <div className="flex items-baseline gap-1 justify-end">
                    <span className="text-5xl md:text-6xl font-black">£200</span>
                    <span className="text-white/70 text-xl">/mo</span>
                  </div>
                  <p className="text-white/60 text-sm">No charge until day 15</p>
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {includedFeatures.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-sm text-white/90">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://buy.stripe.com/bJeeVfgPQ1k95zc1XYfEk07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-slate-100 font-bold py-4 px-6 rounded-xl transition-all min-h-[56px]"
                  style={{ color: currentColor }}
                >
                  <span>Start Free Trial</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href="https://calendly.com/etotomediakjd/intromeeting"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-6 rounded-xl transition-all border border-white/20 min-h-[56px]"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book Demo Call</span>
                </a>
              </div>
            </div>
          </div>
          
          {/* ETOTO Network Banner */}
          <div className="mt-8 bg-slate-50 rounded-2xl p-6 border border-slate-200">
            <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
              <div className="w-14 h-14 rounded-full bg-[#25D366]/10 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-7 h-7 text-[#25D366]" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 mb-1">All customers get access to The ETOTO Network</h4>
                <p className="text-slate-600">Join 200+ installers sharing leads, insights, and best practices.</p>
              </div>
              <a
                href="https://chat.whatsapp.com/FSM9iEeKpPj9Oux4qYyFSz?mode=gi_t"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold py-3 px-6 rounded-full transition-all whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Join WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Google Reviews */}
      <GoogleReviewsCarousel />
      
      {/* Final CTA */}
      <section className="py-20 md:py-28 px-4" style={{ background: `linear-gradient(135deg, ${currentColor} 0%, ${colorPresets[selectedPreset].secondary} 100%)` }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6">
            Ready to close more solar deals?
          </h2>
          <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto">
            Join 200+ UK installers already using SolaFlow to convert more leads into customers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://buy.stripe.com/bJeeVfgPQ1k95zc1XYfEk07"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 font-bold py-4 px-8 rounded-full transition-all hover:scale-105 min-h-[56px]"
              style={{ color: currentColor }}
            >
              <span>Start Your Free Trial</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="https://calendly.com/etotomediakjd/intromeeting"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-full transition-all border border-white/20 min-h-[56px]"
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
