'use client'

import Image from 'next/image'
import { MessageCircle } from 'lucide-react'

interface ScreenshotProofItem {
  id: string
  image: string
  headline: string
  caption: string
  source: string
  logoUrl?: string
  company?: string
}

interface ScreenshotProofProps {
  items: ScreenshotProofItem[]
}

export function ScreenshotProof({ items }: ScreenshotProofProps) {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8 sm:mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full mb-3">
            <MessageCircle className="w-4 h-4" />
            Real client messages
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Straight from the WhatsApp group
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden flex flex-col"
            >
              {/* Header with logo + headline */}
              <div className="p-4 sm:p-5 bg-slate-900">
                {/* Company Logo - Bold and prominent */}
                {item.logoUrl && (
                  <div className="mb-4">
                    <Image
                      src={item.logoUrl}
                      alt={item.company || 'Client logo'}
                      width={160}
                      height={48}
                      className="object-contain"
                      style={{ width: 'auto', height: 'auto', maxHeight: '48px' }}
                    />
                  </div>
                )}
                <p className="text-xl sm:text-2xl font-bold text-white">
                  {item.headline}
                </p>
                <p className="text-sm text-slate-400 mt-1">
                  {item.caption}
                </p>
              </div>
              
              {/* Screenshot */}
              <div className="relative bg-[#0B141A] flex-1 p-3 sm:p-4">
                <div className="relative w-full overflow-hidden rounded-lg">
                  <Image
                    src={item.image}
                    alt={item.headline}
                    width={600}
                    height={500}
                    className="object-contain"
                    style={{ width: '100%', height: 'auto', maxHeight: '420px' }}
                  />
                </div>
              </div>
              
              {/* Footer with source */}
              <div className="px-4 py-3 bg-slate-100 border-t border-slate-200">
                <p className="text-xs text-slate-600 font-medium">
                  {item.source}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
