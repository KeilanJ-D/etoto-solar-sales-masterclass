'use client'

import Image from 'next/image'
import { MessageCircle } from 'lucide-react'

interface ScreenshotProofItem {
  id: string
  image: string
  headline: string
  caption: string
  source: string
}

interface ScreenshotProofProps {
  items: ScreenshotProofItem[]
}

export function ScreenshotProof({ items }: ScreenshotProofProps) {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
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
              className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden flex flex-col"
            >
              {/* Header with headline */}
              <div className="p-4 sm:p-5 bg-slate-900 text-white">
                <p className="text-lg sm:text-xl font-bold">
                  {item.headline}
                </p>
                <p className="text-sm text-slate-400 mt-1">
                  {item.caption}
                </p>
              </div>
              
              {/* Screenshot - constrained height with object-contain */}
              <div className="relative bg-[#0B141A] flex-1 flex items-center justify-center p-4">
                <div className="relative w-full max-h-[400px] overflow-hidden rounded-lg">
                  <Image
                    src={item.image}
                    alt={item.headline}
                    width={600}
                    height={400}
                    className="w-full h-auto max-h-[400px] object-contain"
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>
              
              {/* Footer with source */}
              <div className="px-4 py-3 bg-slate-50 border-t border-slate-100">
                <p className="text-xs text-slate-500">
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
