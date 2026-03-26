'use client'

import { useParams, useSearchParams } from 'next/navigation'
import { Check, Copy, ArrowRight, ExternalLink, Loader2, AlertCircle, RefreshCw } from 'lucide-react'
import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'

const productMeta: Record<string, {
  name: string
  description: string
  accessUrl: string
  includes?: string[]
}> = {
  'toolkit': {
    name: 'Complete Solar Sales Toolkit',
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
    description: 'Your one-page calculator reference for customer conversations.',
    accessUrl: '/formula-cheat-sheet'
  },
  'appointment-quiz': {
    name: 'Appointment Setter Quiz',
    description: 'Train your setters with this qualification checklist.',
    accessUrl: '/appointment-quiz'
  },
  'sales-framework': {
    name: 'Solar Sales Framework',
    description: 'Visual reference card for the 9-step formula.',
    accessUrl: '/sales-framework'
  },
  'sales-script': {
    name: 'Solar Sales Script',
    description: 'Word-for-word script covering the entire 9-step process.',
    accessUrl: '/sales-script'
  }
}

function SuccessPageContent() {
  const params = useParams()
  const searchParams = useSearchParams()
  const productKey = params.product as string
  const sessionId = searchParams.get('session_id')
  const product = productMeta[productKey]
  
  const [code, setCode] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [autoUnlocked, setAutoUnlocked] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  // Look up the purchase code from Firestore via session_id
  useEffect(() => {
    if (!sessionId) {
      setLoading(false)
      setError('No session ID found. If you just completed a purchase, please check your email for the access code.')
      return
    }

    const lookupPurchase = async () => {
      setLoading(true)
      setError(null)

      try {
        const res = await fetch('/api/lookup-purchase', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        })

        const data = await res.json()

        if (data.found && data.code) {
          setCode(data.code)
          // Auto-unlock the product
          await autoUnlockProduct(data.code, data.isBundle, data.bundleProducts)
        } else {
          // Webhook might not have fired yet - retry after a delay
          if (retryCount < 3) {
            setTimeout(() => {
              setRetryCount(prev => prev + 1)
            }, 2000)
          } else {
            setError('Your purchase is being processed. Please wait a moment and refresh, or contact support if this persists.')
          }
        }
      } catch (err) {
        console.error('Lookup error:', err)
        setError('Failed to look up your purchase. Please refresh the page or contact support.')
      } finally {
        setLoading(false)
      }
    }

    lookupPurchase()
  }, [sessionId, retryCount])

  const autoUnlockProduct = async (purchaseCode: string, isBundle: boolean, bundleProducts: string[]) => {
    try {
      const mainProductId = productKey === 'toolkit' ? 'complete-toolkit' : productKey
      
      // Verify and get token for main product
      const res = await fetch('/api/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: mainProductId, code: purchaseCode }),
      })
      const data = await res.json()

      if (data.valid && data.token) {
        localStorage.setItem(`access_${mainProductId}`, data.token)

        // If bundle, also unlock all individual products
        if (isBundle && bundleProducts.length > 0) {
          for (const p of bundleProducts) {
            const pRes = await fetch('/api/verify-code', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ productId: p, code: purchaseCode }),
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

  const handleCopy = () => {
    if (code) {
      navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleRetry = () => {
    setRetryCount(0)
    setError(null)
    setLoading(true)
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
            {loading ? (
              <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
            ) : error ? (
              <AlertCircle className="w-10 h-10 text-amber-500" />
            ) : (
              <Check className="w-10 h-10 text-emerald-600" strokeWidth={3} />
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            {loading ? 'Processing...' : error ? 'Almost There!' : 'Payment Successful!'}
          </h1>
          <p className="text-emerald-100 text-lg">
            {loading ? 'Looking up your purchase' : error ? 'Just a moment' : 'Thank you for your purchase'}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 -mt-8">
        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 text-center">
            <Loader2 className="w-8 h-8 text-emerald-600 animate-spin mx-auto mb-4" />
            <p className="text-slate-600">Looking up your purchase...</p>
            {retryCount > 0 && (
              <p className="text-sm text-slate-400 mt-2">Attempt {retryCount + 1} of 4</p>
            )}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-900 mb-1">Processing Your Purchase</p>
                  <p className="text-sm text-amber-700">{error}</p>
                </div>
              </div>
            </div>
            <button
              onClick={handleRetry}
              className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-4 px-6 rounded-xl transition-all"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Try Again</span>
            </button>
          </div>
        )}

        {/* Success State with Code */}
        {!loading && !error && code && (
          <>
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
                <p className="text-sm font-medium text-emerald-800 mb-2 text-center">Your Unique Access Code</p>
                <div className="flex items-center justify-center gap-3">
                  <code className="text-2xl md:text-3xl font-mono font-bold text-emerald-700 tracking-wider">
                    {code}
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
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-6">
              <h3 className="font-bold text-amber-900 mb-3">Important: Save Your Access Code</h3>
              <p className="text-amber-800 text-sm mb-4">
                Screenshot this page or write down your code. You&apos;ll need it to access your purchase on other devices. Each code can be used on up to 3 devices.
              </p>
              <div className="bg-white rounded-lg p-4 border border-amber-200">
                <p className="text-xs text-slate-500 mb-1">Your unique code:</p>
                <code className="text-lg font-mono font-bold text-slate-900">{code}</code>
              </div>
              <p className="text-xs text-amber-700 mt-3">
                Stripe will email your receipt. Bookmark this page or the product page for easy access.
              </p>
            </div>
          </>
        )}

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

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
      </div>
    }>
      <SuccessPageContent />
    </Suspense>
  )
}
