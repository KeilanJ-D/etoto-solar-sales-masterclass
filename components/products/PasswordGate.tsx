'use client'

import { useState, useEffect, ReactNode } from 'react'
import { Lock, Unlock, AlertCircle, ArrowRight } from 'lucide-react'

interface PasswordGateProps {
  productId: string
  productName: string
  price: string
  buyLink: string
  children: ReactNode
  previewContent?: ReactNode
}

// Passwords will be validated server-side via API route
// This component handles the client-side UX

export default function PasswordGate({ 
  productId, 
  productName, 
  price,
  buyLink,
  children,
  previewContent
}: PasswordGateProps) {
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
    } catch {
      // If API fails, allow access if token exists (graceful degradation)
      setIsUnlocked(true)
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
      <div className="relative z-10 -mt-32 mx-4 md:mx-auto max-w-xl">
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="bg-slate-900 text-white p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-[#E8192C]/20 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-[#E8192C]" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-2">
              Unlock the Full {productName}
            </h3>
            <p className="text-slate-400 text-sm">
              Enter your access code to unlock all content
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
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
                className="w-full px-4 py-3 border border-slate-300 rounded-xl text-base focus:ring-2 focus:ring-[#E8192C]/20 focus:border-[#E8192C] outline-none transition-all uppercase"
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
              className="w-full flex items-center justify-center gap-2 bg-[#E8192C] hover:bg-[#D01622] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl transition-all min-h-[56px]"
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
          <div className="p-6 bg-slate-50">
            <p className="text-center text-slate-600 text-sm mb-4">
              Don&apos;t have a code?
            </p>
            <a
              href={buyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-4 px-6 rounded-xl transition-all min-h-[56px]"
            >
              <span>Buy Access for {price}</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <p className="text-center text-slate-500 text-xs mt-3">
              Bought the Complete Toolkit? Your code works here too.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
