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
    <div className="py-12 sm:py-16 px-4 sm:px-6 bg-slate-50">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden"
            >
              <div className="p-4 sm:p-5">
                <p className="text-lg sm:text-xl font-bold text-slate-900 mb-3">
                  {item.headline}
                </p>
                <div className="relative rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                  <Image
                    src={item.image}
                    alt={item.headline}
                    width={400}
                    height={300}
                    className="w-full h-auto"
                  />
                </div>
                <p className="mt-3 text-sm text-slate-600">
                  {item.caption}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  {item.source}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
