'use client'

import { useState } from 'react'
import { Share2, Check, MessageCircle } from 'lucide-react'

interface ShareButtonProps {
  title?: string
  text?: string
  url?: string
  variant?: 'default' | 'compact'
}

export function ShareButton({
  title = 'Solar Sales Masterclass',
  text = 'Check out this free solar sales training from ETOTO Media',
  url = 'https://solar-sales-masterclass.vercel.app',
  variant = 'default',
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const whatsappMessage = encodeURIComponent(`${text}\n\n${url}`)
  const whatsappUrl = `https://wa.me/?text=${whatsappMessage}`

  const handleShare = async () => {
    // Use Web Share API on mobile if available
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url })
        return
      } catch {
        // User cancelled or API not supported for this content
      }
    }

    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(`${text}\n\n${url}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Open WhatsApp as final fallback
      window.open(whatsappUrl, '_blank')
    }
  }

  if (variant === 'compact') {
    return (
      <button
        onClick={handleShare}
        className="inline-flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-[#E8192C] hover:bg-slate-50 rounded-lg transition-colors min-h-[44px] touch-action-manipulation"
      >
        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Share2 className="w-4 h-4" />}
        {copied ? 'Copied!' : 'Share'}
      </button>
    )
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3">
      <button
        onClick={handleShare}
        className="inline-flex items-center gap-2 px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-full transition-colors min-h-[48px] touch-action-manipulation"
      >
        {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
        {copied ? 'Link copied!' : 'Share with your team'}
      </button>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-3 bg-[#25D366] hover:bg-[#1DA851] text-white font-medium rounded-full transition-colors min-h-[48px] touch-action-manipulation"
      >
        <MessageCircle className="w-4 h-4" />
        Send via WhatsApp
      </a>
    </div>
  )
}
