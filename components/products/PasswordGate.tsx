'use client'

import { useState, useEffect, ReactNode } from 'react'
import { Lock, Unlock, AlertCircle, ArrowRight } from 'lucide-react'
import { COMPLETE_MASTERCLASS } from '@/lib/pricing'

interface PasswordGateProps {
  productId: string
  productName: string
  price?: string
  buyLink?: string
  children: ReactNode
  previewContent?: ReactNode
}

// Passwords will be validated server-side via API route
// This component handles the client-side UX

export default function PasswordGate({
  productId,
  productName,
  price = `${COMPLETE_MASTERCLASS.priceHeadline} ${COMPLETE_MASTERCLASS.priceVatNote}`,
  buyLink = COMPLETE_MASTERCLASS.stripeLink,
  children,
  previewContent
}: PasswordGateProps) {
  // Bypass gate for internal/client deployments
  if (process.env.NEXT_PUBLIC_UNLOCK_ALL === 'true') {
    return <>{children}</>
  }

  const [isUnlocked, setIsUnlocked] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  // Check localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem(`access_${productId}`)
    if (storedToken) {
      // Verify token is still valid
      verifyStoredToken(storedToken)
    } else {
      setIsChecking(false)
    }
  }, [productId])

  const verifyStoredToken = async (token: string) => {
    try {
      const res = await fetch('/api/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, token }),
      })
      const data = await res.json()
      if (data.valid) {
        setIsUnlocked(true)
      } else {
        localStorage.removeItem(`access_${productId}`)
      }
    } catch (err) {
      // Fail closed - never grant access on API failure
      console.error('Token verification failed:', err)
      localStorage.removeItem(`access_${productId}`)
      setIsUnlocked(false)
    } finally {
      setIsChecking(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, code: inputValue.toUpperCase().trim() }),
      })
      const data = await res.json()
      
      if (data.valid) {
        localStorage.setItem(`access_${productId}`, data.token)
        setIsUnlocked(true)
      } else {
        setError('Invalid access code. Please check your purchase confirmation email.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isChecking) {
    return (
      <div className="py-20 text-center">
        <div className="w-8 h-8 border-2 border-[#E8192C] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-slate-500 mt-4">Checking access...</p>
      </div>
    )
  }

  if (isUnlocked) {
    return <>{children}</>
  }

  return (
    <div className="relative">
      {/* Preview content with blur overlay */}
      {previewContent && (
        <div className="relative">
          {previewContent}
          {/* Gradient fade to white */}
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-white via-white/95 to-transparent pointer-events-none" />
        </div>
      )}

      {/* Password gate card */}
      <div className="relative z-10 -mt-32 mx-3 sm:mx-4 md:mx-auto max-w-xl">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="bg-slate-900 text-white p-4 sm:p-6 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#E8192C]/20 flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-[#E8192C]" />
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-balance">
              Unlock the Complete Masterclass
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm">
              Includes {productName} and everything else — framework, knowledge library, systems playbooks, sizing tools.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
            <div>
              <label htmlFor="accessCode" className="block text-sm font-medium text-slate-700 mb-2">
                Access Code
              </label>
              <input
                id="accessCode"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="e.g. SCRIPT-2026"
                className="w-full px-3 sm:px-4 py-3 border border-slate-300 rounded-lg sm:rounded-xl text-base focus:ring-2 focus:ring-[#E8192C]/20 focus:border-[#E8192C] outline-none transition-all uppercase min-h-[48px]"
                autoComplete="off"
                autoCapitalize="characters"
              />
            </div>

            {error && (
              <div className="flex items-start gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="w-full flex items-center justify-center gap-2 bg-[#E8192C] hover:bg-[#D01622] active:bg-[#B01220] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold py-3.5 sm:py-4 px-6 rounded-lg sm:rounded-xl transition-all min-h-[52px] sm:min-h-[56px] touch-action-manipulation"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Unlock className="w-5 h-5" />
                  <span>Unlock Content</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="px-6">
            <div className="border-t border-slate-200" />
          </div>

          {/* Buy section */}
          <div className="p-4 sm:p-6 bg-slate-50">
            <p className="text-center text-slate-600 text-sm mb-3 sm:mb-4">
              Don&apos;t have a code?
            </p>
            <a
              href={buyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#E8192C] hover:bg-[#D01622] active:bg-[#B01220] text-white font-semibold py-3.5 sm:py-4 px-6 rounded-lg sm:rounded-xl transition-all min-h-[52px] sm:min-h-[56px] touch-action-manipulation"
            >
              <span>Buy the Complete Masterclass — {price}</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <p className="text-center text-slate-500 text-xs mt-3">
              {COMPLETE_MASTERCLASS.priceMonthly} also available · Lifetime access
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
