'use client'

import MasterclassNav from '@/components/funnel/MasterclassNav'
import Footer from '@/components/funnel/Footer'
import Link from 'next/link'
import { ArrowRight, Package, FileText, LayoutGrid, CheckSquare, Calculator, BookOpen, Video, HelpCircle } from 'lucide-react'
import { GoogleReviewsBadge } from '@/components/shared/GoogleReviewsBadge'
import { googleReviewsUrl } from '@/lib/social-proof-data'

const isInternalSite = process.env.NEXT_PUBLIC_UNLOCK_ALL === 'true'

const products = [
  {
    title: 'Solar Sales Script',
    description: 'Word-for-word script for all 9 steps',
    price: isInternalSite ? null : '£3.99',
    href: '/sales-script',
    icon: FileText,
    color: '#E8192C',
    useOn: 'On sales calls',
    steps: 'Steps 1-9',
  },
  {
    title: 'Sales Framework',
    description: 'Visual skeleton of the formula',
    price: isInternalSite ? null : '£3.99',
    href: '/sales-framework',
    icon: LayoutGrid,
    color: '#3B82F6',
    useOn: 'For training',
    steps: 'Steps 1-9',
  },
  {
    title: 'Setter Quiz',
    description: '18 scenario-based questions',
    price: isInternalSite ? null : '£3.99',
    href: '/appointment-quiz',
    icon: CheckSquare,
    color: '#8B5CF6',
    useOn: 'For training',
    steps: 'Steps 1-3',
  },
  {
    title: 'Formula Cheat Sheet',
    description: 'Calculator reference for calls',
    price: isInternalSite ? null : '£3.99',
    href: '/formula-cheat-sheet',
    icon: Calculator,
    color: '#10B981',
    useOn: 'On calls',
    steps: 'Steps 3-6',
  },
]

const freeResources = [
  {
    title: 'The 9 Steps',
    description: 'The complete formula from first contact to signed contract',
    href: '/steps',
    icon: BookOpen,
  },
  {
    title: 'Live Sales Call',
    description: 'Watch the formula applied in a real conversation',
    href: '/live-call',
    icon: Video,
  },
  {
    title: 'Knowledge Quiz',
    description: 'Test yourself — 18 questions, 80% to pass',
    href: '/quiz',
    icon: HelpCircle,
  },
]

export default function ResourcesPage() {
  return (
    <main className="bg-[#FAFBFC] min-h-screen overflow-x-hidden">
      <MasterclassNav />
      <section className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 bg-[#E8192C] text-white text-sm font-bold rounded-full mb-6 uppercase tracking-wide">
            {isInternalSite ? 'Tools' : 'The Shop'}
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Your Solar Sales Toolkit
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed mb-8">
            {isInternalSite 
              ? 'Scripts, templates, cheat sheets — all designed to help you close more deals.'
              : "Everything you've learned in the masterclass, packaged into tools you can use every day. Scripts, templates, cheat sheets — all designed to help you close more deals."
            }
          </p>
          
          {/* Value props */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <span className="px-4 py-2 bg-white/10 rounded-full text-slate-300">Instant download</span>
            <span className="px-4 py-2 bg-white/10 rounded-full text-slate-300">Printable formats</span>
            <span className="px-4 py-2 bg-white/10 rounded-full text-slate-300">Lifetime access</span>
          </div>
        </div>
      </section>

      {/* Free Resources Summary */}
      <section className="py-12 px-4 md:px-6 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Already completed the free training?</h2>
            <p className="text-slate-500">The resources below build on what you&apos;ve learned</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {freeResources.map((resource) => {
              const Icon = resource.icon
              return (
                <Link
                  key={resource.href}
                  href={resource.href}
                  className="flex items-center gap-3 p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-slate-200 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm">{resource.title}</h3>
                    <p className="text-xs text-slate-500">{resource.description}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
      
      {/* Bundle First - The Best Deal */}
      <section className="py-16 md:py-20 px-4 md:px-6 bg-[#FAFBFC]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              {isInternalSite ? 'Your Tools' : 'Get Everything You Need'}
            </h2>
            <p className="text-slate-600">
              {isInternalSite 
                ? 'Every tool maps to a stage of the formula. Click to open.'
                : 'Every tool maps to a stage of the formula. Buy what you need, or get everything.'
              }
            </p>
          </div>

          {/* Bundle Card - Featured (hidden on internal site) */}
          {!isInternalSite && (
            <Link
              href="/complete-toolkit"
              className="block bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 md:p-8 text-white hover:shadow-2xl transition-all hover:scale-[1.01] mb-10"
            >
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#E8192C] flex items-center justify-center flex-shrink-0">
                  <Package className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                    <h3 className="text-xl md:text-2xl font-bold">The Complete Toolkit</h3>
                    <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs font-bold rounded-full uppercase">
                      Best Value
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm">
                    All 4 tools. Save £5.97 vs buying individually.
                  </p>
                </div>
                <div className="text-center sm:text-right flex items-center gap-4">
                  <div>
                    <p className="text-3xl md:text-4xl font-black">£9.99</p>
                    <p className="text-sm text-slate-500 line-through">£15.96</p>
                  </div>
                  <ArrowRight className="w-6 h-6 text-slate-400" />
                </div>
              </div>
            </Link>
          )}

          {/* Or Pick What You Need */}
          {!isInternalSite && (
            <p className="text-center text-slate-500 text-sm mb-6">Or pick what you need:</p>
          )}

          {/* Products Grid - 2x2 compact cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {products.map((product) => {
              const Icon = product.icon
              return (
                <Link
                  key={product.href}
                  href={product.href}
                  className="group bg-white border border-slate-200 rounded-xl p-5 hover:shadow-lg hover:border-slate-300 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${product.color}15` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: product.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-900 mb-0.5">{product.title}</h3>
                      <p className="text-sm text-slate-500 mb-2">{product.description}</p>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">{product.steps}</span>
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">{product.useOn}</span>
                      </div>
                    </div>
                    {product.price && (
                      <div className="text-right flex-shrink-0">
                        <p className="text-lg font-bold text-slate-900">{product.price}</p>
                      </div>
                    )}
                    {isInternalSite && (
                      <div className="flex-shrink-0">
                        <ArrowRight className="w-5 h-5 text-slate-400" />
                      </div>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
      
      {/* Google Reviews Badge */}
      <section className="py-8 px-4 sm:px-6 bg-white border-t border-slate-100">
        <div className="flex justify-center">
          <GoogleReviewsBadge url={googleReviewsUrl} />
        </div>
      </section>
      
      <Footer />
    </main>
  )
}
