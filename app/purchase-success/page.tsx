'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { Check, Copy, ArrowRight, Mail } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

const productInfo: Record<string, { name: string; code: string; href: string; description: string }> = {
  'sales-script': {
    name: 'Solar Sales Script',
    code: 'SCRIPT-2026',
    href: '/sales-script',
    description: 'Your word-for-word script covering the entire 9-step process',
  },
  'sales-framework': {
    name: 'Sales Framework Template',
    code: 'FRAMEWORK-2026',
    href: '/sales-framework',
    description: 'Your visual reference card for the 9-step formula',
  },
  'appointment-quiz': {
    name: 'Appointment Setting Quiz',
    code: 'QUIZ-2026',
    href: '/appointment-quiz',
    description: 'Train your setters with this qualification checklist',
  },
  'formula-cheat-sheet': {
    name: 'Formula Cheat Sheet',
    code: 'FORMULAS-2026',
    href: '/formula-cheat-sheet',
    description: 'Your one-page calculator reference for customer conversations',
  },
  'complete-toolkit': {
    name: 'Complete Solar Sales Toolkit',
    code: 'TOOLKIT-2026',
    href: '/complete-toolkit',
    description: 'All 4 tools: Sales Script, Sales Framework, Appointment Quiz, and Formula Cheat Sheet',
  },
}

function PurchaseSuccessContent() {
  const searchParams = useSearchParams()
  const productId = searchParams.get('product') || 'complete-toolkit'
  const product = productInfo[productId] || productInfo['complete-toolkit']
  
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(product.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const isToolkit = productId === 'complete-toolkit'

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-200">
            <Check className="w-10 h-10 text-white" strokeWidth={3} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Payment Successful!</h1>
          <p className="text-slate-600">Thank you for purchasing the {product.name}</p>
        </div>

        {/* Access Code Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 mb-6">
          <p className="text-sm text-slate-500 text-center mb-3">Your Access Code</p>
          <div className="flex items-center justify-center gap-3 mb-4">
            <code className="text-3xl font-mono font-bold text-[#E8192C] tracking-wider">
              {product.code}
            </code>
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
              title="Copy code"
            >
              {copied ? (
                <Check className="w-5 h-5 text-emerald-500" />
              ) : (
                <Copy className="w-5 h-5 text-slate-500" />
              )}
            </button>
          </div>
          <p className="text-center text-slate-600 text-sm">
            {copied ? 'Copied to clipboard!' : 'Click to copy'}
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800">
              <p className="font-medium mb-1">Save this code!</p>
              <p>You&apos;ll also receive a confirmation email with this code. Use it to access your purchase anytime.</p>
            </div>
          </div>
        </div>

        {/* Access Button */}
        <Link
          href={product.href}
          className="w-full flex items-center justify-center gap-2 bg-[#E8192C] hover:bg-[#D01622] text-white font-bold py-4 px-6 rounded-xl transition-all mb-4"
        >
          <span>Access {isToolkit ? 'Your Toolkit' : 'Your Purchase'}</span>
          <ArrowRight className="w-5 h-5" />
        </Link>

        {/* Toolkit: Show all product links */}
        {isToolkit && (
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
            <p className="text-sm font-medium text-slate-700 mb-3">Your toolkit includes:</p>
            <div className="space-y-2">
              {Object.entries(productInfo)
                .filter(([key]) => key !== 'complete-toolkit')
                .map(([key, info]) => (
                  <Link
                    key={key}
                    href={info.href}
                    className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200 hover:border-[#E8192C]/30 hover:bg-red-50/30 transition-colors group"
                  >
                    <span className="text-slate-700 group-hover:text-slate-900">{info.name}</span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#E8192C]" />
                  </Link>
                ))}
            </div>
            <p className="text-xs text-slate-500 mt-3">
              Use code <span className="font-mono font-medium">TOOLKIT-2026</span> to unlock all of these.
            </p>
          </div>
        )}

        {/* Help */}
        <p className="text-center text-slate-500 text-sm mt-6">
          Need help? Contact{' '}
          <a href="mailto:keilan.jd@etotomedia.com" className="text-[#E8192C] hover:underline">
            keilan.jd@etotomedia.com
          </a>
        </p>
      </div>
    </div>
  )
}

export default function PurchaseSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#E8192C] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <PurchaseSuccessContent />
    </Suspense>
  )
}
