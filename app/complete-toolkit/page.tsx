'use client'

import { useState, useEffect } from 'react'
import { Check, ArrowRight, Package, FileText, Calculator, HelpCircle, ClipboardList, Lock } from 'lucide-react'
import Link from 'next/link'
import ProductFooter from '@/components/products/ProductFooter'

const products = [
  {
    name: 'Full Sales Script',
    description: 'Word-for-word scripts for all 9 steps with audio clips from real calls',
    icon: FileText,
    href: '/sales-script',
    features: ['9 complete step scripts', 'Audio examples', 'Objection handlers', 'Copy buttons']
  },
  {
    name: 'Sales Framework',
    description: 'Flexible skeleton you can adapt to your own style',
    icon: ClipboardList,
    href: '/sales-framework',
    features: ['Customizable templates', 'Adapt-it sections', 'Key phrases', 'Flow diagrams']
  },
  {
    name: 'Appointment Quiz',
    description: '18-question training tool with detailed explanations',
    icon: HelpCircle,
    href: '/appointment-quiz',
    features: ['18 quiz questions', 'Instant feedback', 'Retry wrong answers', 'Score tracking']
  },
  {
    name: 'Formula Cheat Sheet',
    description: 'Interactive calculator with tariff table and saved configs',
    icon: Calculator,
    href: '/formula-cheat-sheet',
    features: ['Live calculator', 'UK tariff rates', 'Export summaries', 'Battery sizing']
  }
]

export default function CompleteToolkitPage() {
  const [hasAccess, setHasAccess] = useState(false)
  
  useEffect(() => {
    // Check if user has bundle access
    const bundleAccess = localStorage.getItem('etoto_bundle_access')
    if (bundleAccess === 'true') {
      setHasAccess(true)
    }
  }, [])

  return (
    <main className="bg-[#FAFBFC] min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#E8192C]/20 text-[#E8192C] px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Package className="w-4 h-4" />
            <span>Complete Bundle</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
            The Complete Solar<br />Sales Toolkit
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Everything you need to close more solar deals. All 4 products in one package, 
            saving you £5.97 compared to buying individually.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <div className="text-center">
              <p className="text-slate-400 line-through text-lg">£15.96</p>
              <p className="text-4xl md:text-5xl font-black text-white">£9.99</p>
              <p className="text-emerald-400 font-medium">Save 37%</p>
            </div>
          </div>
          
          {hasAccess ? (
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-6 py-3 rounded-full font-medium">
              <Check className="w-5 h-5" />
              <span>You have full access</span>
            </div>
          ) : (
            <a
              href="mailto:keilan.jd@etotomedia.com?subject=Complete%20Toolkit%20Purchase"
              className="inline-flex items-center gap-2 bg-[#E8192C] hover:bg-[#D01622] text-white font-bold py-4 px-8 rounded-full transition-all min-h-[56px]"
            >
              <span>Get Complete Toolkit</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          )}
        </div>
      </section>
      
      {/* What's Included */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-4">
            What&apos;s Included
          </h2>
          <p className="text-slate-500 text-center mb-12 max-w-2xl mx-auto">
            Four standalone products that work together to transform your solar sales process
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((product) => (
              <div
                key={product.name}
                className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-[#E8192C]/30 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#E8192C]/10 flex items-center justify-center flex-shrink-0">
                    <product.icon className="w-6 h-6 text-[#E8192C]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">{product.name}</h3>
                    <p className="text-slate-500 text-sm">{product.description}</p>
                  </div>
                </div>
                
                <ul className="space-y-2 mb-4">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {hasAccess ? (
                  <Link
                    href={product.href}
                    className="flex items-center justify-center gap-2 w-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium py-3 px-4 rounded-xl transition-all"
                  >
                    <span>Open</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <div className="flex items-center justify-center gap-2 w-full bg-slate-100 text-slate-400 font-medium py-3 px-4 rounded-xl cursor-not-allowed">
                    <Lock className="w-4 h-4" />
                    <span>Included in bundle</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Value Breakdown */}
      <section className="bg-slate-900 text-white py-16 md:py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">The Value Breakdown</h2>
          
          <div className="space-y-4 mb-8">
            {products.map((product) => (
              <div key={product.name} className="flex items-center justify-between bg-white/5 rounded-xl p-4">
                <span className="text-slate-300">{product.name}</span>
                <span className="font-bold">£3.99</span>
              </div>
            ))}
            <div className="border-t border-white/20 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Individual total</span>
                <span className="text-slate-400 line-through">£15.96</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="font-bold text-lg">Bundle price</span>
                <span className="font-black text-2xl text-[#E8192C]">£9.99</span>
              </div>
            </div>
          </div>
          
          {!hasAccess && (
            <a
              href="mailto:keilan.jd@etotomedia.com?subject=Complete%20Toolkit%20Purchase"
              className="inline-flex items-center gap-2 bg-[#E8192C] hover:bg-[#D01622] text-white font-bold py-4 px-8 rounded-full transition-all"
            >
              <span>Get Complete Toolkit for £9.99</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          )}
        </div>
      </section>
      
      {/* FAQ */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 mb-2">How do I access the products?</h3>
              <p className="text-slate-600">After purchase, you&apos;ll receive an access code via email. Enter it on any product page to unlock all content permanently on your device.</p>
            </div>
            
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 mb-2">Can I share my access code?</h3>
              <p className="text-slate-600">Each code is for individual use. For team access, contact us about our installer package with volume pricing.</p>
            </div>
            
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 mb-2">Is there a refund policy?</h3>
              <p className="text-slate-600">Yes, we offer a 14-day money-back guarantee if you&apos;re not satisfied with the content.</p>
            </div>
            
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 mb-2">Will there be updates?</h3>
              <p className="text-slate-600">Yes, we regularly update the content based on market changes and feedback. All updates are included free.</p>
            </div>
          </div>
        </div>
      </section>
      
      <ProductFooter />
    </main>
  )
}
