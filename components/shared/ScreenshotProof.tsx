'use client'

import { MessageCircle, TrendingUp } from 'lucide-react'

interface ClientResultItem {
  id: string
  company: string
  headline: string
  message: string
  stat?: string
}

interface ClientResultsProps {
  items: ClientResultItem[]
}

// Redesigned as a clean conversation-style UI without screenshots
export function ScreenshotProof({ items }: ClientResultsProps) {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 bg-slate-50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8 sm:mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full mb-3">
            <MessageCircle className="w-4 h-4" />
            Real client results
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            What our clients are saying
          </h3>
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6"
            >
              <div className="flex items-start gap-4">
                {/* Company icon */}
                <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">
                    {item.company.split(' ').map(w => w[0]).join('').slice(0, 2)}
                  </span>
                </div>
                
                <div className="flex-1 min-w-0">
                  {/* Company name + stat */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h4 className="font-bold text-slate-900">{item.company}</h4>
                      <p className="text-sm text-slate-500">{item.headline}</p>
                    </div>
                    {item.stat && (
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 rounded-full flex-shrink-0">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-bold text-green-700">{item.stat}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Message bubble */}
                  <div className="bg-slate-50 rounded-xl rounded-tl-sm p-4 border border-slate-100">
                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                      &ldquo;{item.message}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
