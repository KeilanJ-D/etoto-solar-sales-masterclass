import MasterclassNav from '@/components/funnel/MasterclassNav'
import Footer from '@/components/funnel/Footer'
import Link from 'next/link'
import { ArrowRight, Package, FileText, LayoutGrid, CheckSquare, Calculator, BookOpen, Video, HelpCircle, Zap } from 'lucide-react'
import { GoogleReviewsBadge } from '@/components/shared/GoogleReviewsBadge'
import { googleReviewsUrl } from '@/lib/social-proof-data'

export const metadata = {
  title: 'Solar Sales Resources & Toolkit — ETOTO Media',
  description: 'Scripts, frameworks, calculators, and the complete sales toolkit. Everything you need to sell solar.',
  openGraph: {
    title: 'Solar Sales Resources & Toolkit — ETOTO Media',
    description: 'Scripts, frameworks, calculators, and the complete sales toolkit. Everything you need to sell solar.',
  },
}

const products = [
  {
    title: 'Solar Sales Script',
    description: 'The exact word-for-word script covering all 9 steps. Used by ETOTO-trained installers.',
    price: '£3.99',
    href: '/sales-script',
    icon: FileText,
    color: '#E8192C',
    preview: [
      'Opening lines that build instant rapport',
      'Discovery questions that uncover real pain points',
      'Objection responses that convert skeptics',
      'Closing sequences that get the deposit',
    ],
  },
  {
    title: 'Sales Framework Template',
    description: 'Visual reference card for the complete 9-step formula. Print it, pin it, use it.',
    price: '£3.99',
    href: '/sales-framework',
    icon: LayoutGrid,
    color: '#3B82F6',
    preview: [
      'Step-by-step visual workflow',
      'Key talking points for each stage',
      'Trigger phrases that move deals forward',
      'Red flags and qualification criteria',
    ],
  },
  {
    title: 'Appointment Setting Quiz',
    description: 'Train your setters with scenario-based questions. Know before they hit the phones.',
    price: '£3.99',
    href: '/appointment-quiz',
    icon: CheckSquare,
    color: '#8B5CF6',
    preview: [
      'Real customer scenarios to practice',
      'Qualifying questions checklist',
      'Common mistakes to avoid',
      'Scoring system to track progress',
    ],
  },
  {
    title: 'Formula Cheat Sheet',
    description: 'One-page calculator reference for live customer conversations. The maths, simplified.',
    price: '£3.99',
    href: '/formula-cheat-sheet',
    icon: Calculator,
    color: '#10B981',
    preview: [
      'kWh calculations made simple',
      'Battery sizing formulas',
      'ROI calculations for any system',
      'Price-to-savings breakdowns',
    ],
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
      
      {/* Hero Header */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 bg-[#E8192C] text-white text-sm font-bold rounded-full mb-6 uppercase tracking-wide">
            The Shop
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Your Solar Sales Toolkit
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed mb-8">
            Everything you&apos;ve learned in the masterclass, packaged into tools you can use every day. 
            Scripts, templates, cheat sheets — all designed to help you close more deals.
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
      
      {/* Premium Products with Previews */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-[#FAFBFC]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-[#E8192C]/10 text-[#E8192C] text-sm font-medium rounded-full mb-4">
              Premium Resources
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Tools That Pay For Themselves
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Each resource is designed to help you close more deals. One extra sale covers these costs 100x over.
            </p>
          </div>
          
          <div className="space-y-6">
            {products.map((product) => {
              const Icon = product.icon
              return (
                <div
                  key={product.href}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Left: Icon + Info */}
                      <div className="flex-1">
                        <div className="flex items-start gap-4 mb-4">
                          <div 
                            className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: `${product.color}15` }}
                          >
                            <Icon className="w-7 h-7" style={{ color: product.color }} />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-1">{product.title}</h3>
                            <p className="text-slate-600">{product.description}</p>
                          </div>
                        </div>
                        
                        {/* Preview points */}
                        <div className="bg-slate-50 rounded-xl p-5 mb-4">
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">What&apos;s inside:</p>
                          <ul className="grid sm:grid-cols-2 gap-2">
                            {product.preview.map((point, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                                <Zap className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: product.color }} />
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      {/* Right: Price + CTA */}
                      <div className="flex flex-col items-center md:items-end justify-between md:w-48">
                        <div className="text-center md:text-right mb-4">
                          <p className="text-3xl font-black text-slate-900">{product.price}</p>
                          <p className="text-sm text-slate-500">One-time purchase</p>
                        </div>
                        <Link
                          href={product.href}
                          className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-colors min-h-[48px]"
                        >
                          View Details
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          
          {/* Bundle CTA */}
          <div className="mt-12">
            <Link
              href="/complete-toolkit"
              className="block bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white hover:shadow-2xl transition-shadow"
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-20 h-20 rounded-2xl bg-[#E8192C] flex items-center justify-center flex-shrink-0">
                  <Package className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <span className="inline-block px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full mb-2 uppercase">
                    Best Value
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">Complete Toolkit Bundle</h3>
                  <p className="text-slate-300">
                    Get all four resources for one price. Everything you need to sell solar professionally.
                  </p>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-4xl font-black text-[#E8192C]">£9.99</p>
                  <p className="text-sm text-slate-400 line-through">£15.96 individually</p>
                  <p className="text-sm text-green-400 font-semibold">Save £5.97</p>
                </div>
              </div>
            </Link>
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
