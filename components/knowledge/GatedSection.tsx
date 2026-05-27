'use client'

import { useState, useEffect, ReactNode } from 'react'
import { Lock, Unlock, AlertCircle, ArrowRight, Sparkles } from 'lucide-react'
import { COMPLETE_MASTERCLASS } from '@/lib/pricing'

interface GatedSectionProps {
  productId?: string
  buyLink?: string
  price?: string
  priceSubtext?: string
  unlockTitle: string
  unlockSubtitle: string
  previewLines?: number
  children: ReactNode
}

const UNLOCK_ALL = process.env.NEXT_PUBLIC_UNLOCK_ALL === 'true'

export default function GatedSection({
  productId = COMPLETE_MASTERCLASS.productId,
  buyLink = COMPLETE_MASTERCLASS.stripeLink,
  price = `${COMPLETE_MASTERCLASS.priceHeadline} ${COMPLETE_MASTERCLASS.priceVatNote}`,
  priceSubtext = COMPLETE_MASTERCLASS.priceMonthly,
  unlockTitle,
  unlockSubtitle,
  previewLines = 3,
  children,
}: GatedSectionProps) {
  const [isUnlocked, setIsUnlocked] = useState(UNLOCK_ALL)
  const [showUnlockForm, setShowUnlockForm] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isChecking, setIsChecking] = useState(!UNLOCK_ALL)

  useEffect(() => {
    if (UNLOCK_ALL) return
    const storedToken = localStorage.getItem(`access_${productId}`)
    if (!storedToken) {
      setIsChecking(false)
      return
    }
    ;(async () => {
      try {
        const res = await fetch('/api/verify-code', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId, token: storedToken }),
        })
        const data = await res.json()
        if (data.valid) setIsUnlocked(true)
        else localStorage.removeItem(`access_${productId}`)
      } catch {
        localStorage.removeItem(`access_${productId}`)
      } finally {
        setIsChecking(false)
      }
    })()
  }, [productId])

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
        setError(data.error || 'Invalid code')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isChecking) {
    return (
      <div className="my-6 py-10 text-center bg-slate-50 rounded-xl border border-slate-200">
        <div className="w-6 h-6 border-2 border-[#E8192C] border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    )
  }

  if (isUnlocked) {
    return <div className="relative">{children}</div>
  }

  return (
    <div className="relative my-6 sm:my-8">
      <div className="bg-gradient-to-br from-slate-50 via-white to-slate-50 border-2 border-dashed border-slate-300 rounded-2xl overflow-hidden">
        <div className="relative max-h-32 sm:max-h-40 overflow-hidden">
          <div className="opacity-40 blur-[2px] pointer-events-none p-6">{children}</div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/70 to-white" />
        </div>

        <div className="px-5 sm:px-8 py-6 sm:py-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#E8192C]/10 mb-4">
            <Lock className="w-6 h-6 sm:w-7 sm:h-7 text-[#E8192C]" />
          </div>
          <h4 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 mb-2 text-balance">
            {unlockTitle}
          </h4>
          <p className="text-slate-600 text-sm sm:text-base mb-5 max-w-md mx-auto leading-relaxed">
            {unlockSubtitle}
          </p>

          {!showUnlockForm ? (
            <div className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={buyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#E8192C] hover:bg-[#D01622] text-white font-bold py-3.5 px-6 rounded-xl transition-all min-h-[52px] touch-action-manipulation flex-1"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Unlock for {price}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setShowUnlockForm(true)}
                  className="flex items-center justify-center gap-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-900 font-semibold py-3.5 px-6 rounded-xl transition-all min-h-[52px] touch-action-manipulation"
                >
                  <span>Have a code?</span>
                </button>
              </div>
              {priceSubtext && (
                <p className="text-xs text-slate-500 mt-3">
                  or {priceSubtext}
                </p>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter access code"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl text-base text-center focus:ring-2 focus:ring-[#E8192C]/20 focus:border-[#E8192C] outline-none transition-all uppercase font-mono tracking-wider min-h-[48px]"
                autoComplete="off"
                autoCapitalize="characters"
                autoFocus
              />
              {error && (
                <div className="flex items-start gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg text-left">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowUnlockForm(false)
                    setError('')
                    setInputValue('')
                  }}
                  className="flex-1 py-3 px-4 border border-slate-300 rounded-xl text-slate-700 font-medium hover:bg-slate-50 transition-all min-h-[48px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className="flex-1 flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white font-semibold py-3 px-4 rounded-xl transition-all min-h-[48px]"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Unlock className="w-4 h-4" />
                      <span>Unlock</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          <p className="text-xs text-slate-500 mt-4">
            One purchase. Lifetime access. Free updates forever.
          </p>
        </div>
      </div>
    </div>
  )
}
