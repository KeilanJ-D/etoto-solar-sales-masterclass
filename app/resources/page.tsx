import MasterclassNav from '@/components/funnel/MasterclassNav'
import SummaryDownloads from '@/components/funnel/SummaryDownloads'
import Footer from '@/components/funnel/Footer'
import Link from 'next/link'
import { ArrowRight, Package } from 'lucide-react'
import { ScreenshotProof } from '@/components/shared/ScreenshotProof'
import { GoogleReviewsBadge } from '@/components/shared/GoogleReviewsBadge'
import { googleReviewsUrl } from '@/lib/social-proof-data'
import { InlineProof } from '@/components/shared/InlineProof'
import { NextStepCTA } from '@/components/shared/NextStepCTA'
import { screenshotProof } from '@/lib/social-proof-data'

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
    description: 'Word-for-word script covering the entire 9-step process',
    price: '£3.99',
    href: '/sales-script',
  },
  {
    title: 'Sales Framework Template',
    description: 'Visual reference card for the 9-step formula',
    price: '£3.99',
    href: '/sales-framework',
  },
  {
    title: 'Appointment Setting Quiz',
    description: 'Train your setters with this qualification checklist',
    price: '£3.99',
    href: '/appointment-quiz',
  },
  {
    title: 'Formula Cheat Sheet',
    description: 'One-page calculator reference for customer conversations',
    price: '£3.99',
    href: '/formula-cheat-sheet',
  },
]

export default function ResourcesPage() {
  return (
    <main className="bg-[#FAFBFC] min-h-screen overflow-x-hidden">
      <MasterclassNav />
      
      {/* Header */}
      <section className="py-12 md:py-16 px-4 md:px-6 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-3 py-1 bg-white/10 text-white/80 text-sm font-medium rounded-full mb-4">
            Tools & Templates
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Resources & Toolkit
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Everything you need to sell solar professionally. 
            Scripts, templates, cheat sheets, and the complete toolkit bundle.
          </p>
        </div>
      </section>
      
      <SummaryDownloads />
      
      {/* YEERS Ecosystem Proof */}
      <section className="py-8 px-4 sm:px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-2xl mx-auto">
          <InlineProof
            quote="Everything on this site — the scripts, the calculator, the quiz, SolaFlow — works together. YEERS used all of it and closed £24,400 in their first 2 weeks."
            context="The ecosystem in action"
            icon="stat"
            variant="highlight"
          />
        </div>
      </section>
      
      {/* Screenshot Proof - WhatsApp screenshots */}
      <ScreenshotProof items={screenshotProof} />
      
      {/* Paid Products */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-[#E8192C]/10 text-[#E8192C] text-sm font-medium rounded-full mb-4">
              Premium Resources
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Take it further
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Standalone tools for you and your team. Or get everything in the Complete Toolkit bundle.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
            {products.map((product) => (
              <Link
                key={product.href}
                href={product.href}
                className="group bg-white hover:bg-slate-50 border border-slate-200 rounded-xl p-5 sm:p-6 transition-all hover:shadow-lg hover:border-slate-300 min-h-[120px] touch-action-manipulation"
              >
                <div className="flex justify-between items-start mb-2 sm:mb-3">
                  <h3 className="font-bold text-slate-900 text-base">{product.title}</h3>
                  <span className="text-[#E8192C] font-bold text-lg">{product.price}</span>
                </div>
                <p className="text-sm text-slate-500 mb-4">{product.description}</p>
                <span className="w-full sm:w-auto flex items-center justify-center sm:inline-flex gap-2 text-sm font-medium bg-[#E8192C] text-white py-3 px-4 rounded-lg group-hover:bg-[#D01622] transition-all min-h-[48px]">
                  Learn more
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
          
          {/* Bundle CTA */}
          <Link
            href="/complete-toolkit"
            className="block bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white hover:shadow-2xl transition-shadow"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-xl bg-[#E8192C] flex items-center justify-center flex-shrink-0">
                <Package className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2">Complete Toolkit Bundle</h3>
                <p className="text-slate-300">
                  Get all four resources for one price. Save £5.97 compared to buying individually.
                </p>
              </div>
              <div className="text-center md:text-right">
                <p className="text-3xl font-bold text-[#E8192C]">£9.99</p>
                <p className="text-sm text-slate-400 line-through">£15.96 individually</p>
              </div>
            </div>
          </Link>
        </div>
      </section>
      
      {/* Google Reviews Badge */}
      <section className="py-8 px-4 sm:px-6 bg-slate-50 border-t border-slate-100">
        <div className="flex justify-center">
          <GoogleReviewsBadge url={googleReviewsUrl} />
        </div>
      </section>
      
      {/* Next Step in funnel */}
      <NextStepCTA currentStep="buy" />
      
      <Footer />
    </main>
  )
}
