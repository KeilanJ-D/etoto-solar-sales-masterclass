'use client'

import { useParams } from 'next/navigation'
import { Check, Copy, ArrowRight, Mail, ExternalLink } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const productData: Record<string, {
  name: string
  code: string
  description: string
  accessUrl: string
  includes?: string[]
}> = {
  'toolkit': {
    name: 'Complete Solar Sales Toolkit',
    code: 'TOOLKIT-2026',
    description: 'You now have access to all 4 premium resources.',
    accessUrl: '/complete-toolkit',
    includes: [
      'Solar Sales Script',
      'Sales Framework Template', 
      'Appointment Setter Quiz',
      'Formula Cheat Sheet & Calculator'
    ]
  },
  'formula-cheat-sheet': {
    name: 'Formula Cheat Sheet & Calculator',
    code: 'FORMULAS-2026',
    description: 'Your one-page calculator reference for customer conversations.',
    accessUrl: '/formula-cheat-sheet'
  },
  'appointment-quiz': {
    name: 'Appointment Setter Quiz',
    code: 'QUIZ-2026',
    description: 'Train your setters with this qualification checklist.',
    accessUrl: '/appointment-quiz'
  },
  'sales-framework': {
    name: 'Solar Sales Framework',
    code: 'FRAMEWORK-2026',
    description: 'Visual reference card for the 9-step formula.',
    accessUrl: '/sales-framework'
  },
  'sales-script': {
    name: 'Solar Sales Script',
    code: 'SCRIPT-2026',
    description: 'Word-for-word script covering the entire 9-step process.',
    accessUrl: '/sales-script'
  }
}

export default function SuccessPage() {
  const params = useParams()
  const productKey = params.product as string
  const product = productData[productKey]
  
  const [copied, setCopied] = useState(false)
  const [autoUnlocked, setAutoUnlocked] = useState(false)

  // Auto-unlock the product on page load
  useEffect(() => {
    if (product) {
      const unlockProduct = async () => {
        try {
          // Get token for this product
          const res = await fetch('/api/verify-code', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              productId: productKey === 'toolkit' ? 'complete-toolkit' : productKey,
              code: product.code 
            }),
          })
          const data = await res.json()
          
          if (data.valid && data.token) {
            const storageKey = productKey === 'toolkit' ? 'complete-toolkit' : productKey
            localStorage.setItem(`access_${storageKey}`, data.token)
            
            // If toolkit, also unlock all individual products
            if (productKey === 'toolkit') {
              const individualProducts = ['sales-script', 'sales-framework', 'appointment-quiz', 'formula-cheat-sheet']
              for (const p of individualProducts) {
                const pRes = await fetch('/api/verify-code', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ productId: p, code: product.code }),
                })
                const pData = await pRes.json()
                if (pData.valid && pData.token) {
                  localStorage.setItem(`access_${p}`, pData.token)
                }
              }
            }
            setAutoUnlocked(true)
          }
        } catch (err) {
          console.error('Failed to auto-unlock:', err)
        }
      }
      unlockProduct()
    }
  }, [product, productKey])

  const handleCopy = () => {
    if (product) {
      navigator.clipboard.writeText(product.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Product not found</h1>
          <Link href="/" className="text-[#E8192C] hover:underline">Return home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Success Header */}
      <div className="bg-emerald-600 text-white py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-emerald-600" strokeWidth={3} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Payment Successful!</h1>
          <p className="text-emerald-100 text-lg">Thank you for your purchase</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 -mt-8">
        {/* Product Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6">
          <h2 className="text-xl font-bold text-slate-900 mb-1">{product.name}</h2>
          <p className="text-slate-500 mb-6">{product.description}</p>

          {/* What's Included (for toolkit) */}
          {product.includes && (
            <div className="bg-slate-50 rounded-xl p-4 mb-6">
              <p className="text-sm font-medium text-slate-700 mb-3">Your toolkit includes:</p>
              <ul className="space-y-2">
                {product.includes.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-slate-600">
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Access Code Box */}
          <div className="border-2 border-dashed border-emerald-300 bg-emerald-50 rounded-xl p-6 mb-6">
            <p className="text-sm font-medium text-emerald-800 mb-2 text-center">Your Access Code</p>
            <div className="flex items-center justify-center gap-3">
              <code className="text-2xl md:text-3xl font-mono font-bold text-emerald-700 tracking-wider">
                {product.code}
              </code>
              <button
                onClick={handleCopy}
                className="p-2 hover:bg-emerald-100 rounded-lg transition-colors"
                title="Copy code"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Copy className="w-5 h-5 text-emerald-600" />
                )}
              </button>
            </div>
            {autoUnlocked && (
              <p className="text-xs text-emerald-600 text-center mt-3">
                Your access has been automatically activated on this device
              </p>
            )}
          </div>

          {/* Access Button */}
          <Link
            href={product.accessUrl}
            className="w-full flex items-center justify-center gap-2 bg-[#E8192C] hover:bg-[#D01622] text-white font-bold py-4 px-6 rounded-xl transition-all"
          >
            <span>Access Your Purchase</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Important Info Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Mail className="w-5 h-5 text-slate-400" />
            Check Your Email
          </h3>
          <p className="text-slate-600 text-sm mb-4">
            We&apos;ve sent a confirmation email to your inbox with:
          </p>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
              <span>Your receipt and invoice</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
              <span>Your access code: <code className="font-mono bg-slate-100 px-1 rounded">{product.code}</code></span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
              <span>Direct link to access your purchase anytime</span>
            </li>
          </ul>
          <p className="text-xs text-slate-400 mt-4">
            Save this code — you&apos;ll need it to access your purchase on other devices or browsers.
          </p>
        </div>

        {/* Back to Masterclass Link */}
        <div className="text-center pb-12">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Back to Solar Sales Masterclass</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
