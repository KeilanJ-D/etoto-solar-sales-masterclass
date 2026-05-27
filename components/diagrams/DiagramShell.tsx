'use client'

import { type ReactNode } from 'react'
import AnimateOnScroll from '@/components/shared/AnimateOnScroll'

interface DiagramShellProps {
  eyebrow?: string
  title: string
  caption?: string
  children: ReactNode
  /** Optional bottom legend (chips, color keys). */
  legend?: ReactNode
  /** Wider than usual */
  fullWidth?: boolean
}

export default function DiagramShell({
  eyebrow,
  title,
  caption,
  children,
  legend,
  fullWidth = false,
}: DiagramShellProps) {
  return (
    <AnimateOnScroll variant="fade-up">
      <figure
        className={`${
          fullWidth ? '' : 'max-w-4xl mx-auto'
        } my-8 sm:my-10 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm`}
      >
        {(eyebrow || title) && (
          <header className="px-5 sm:px-7 pt-5 sm:pt-7">
            {eyebrow && (
              <p className="text-xs font-semibold uppercase tracking-widest text-[#E8192C] mb-2">
                {eyebrow}
              </p>
            )}
            <h3 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 leading-tight">
              {title}
            </h3>
            {caption && (
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">{caption}</p>
            )}
          </header>
        )}

        <div className="p-5 sm:p-7">{children}</div>

        {legend && (
          <footer className="bg-slate-50 px-5 sm:px-7 py-3 border-t border-slate-100 flex flex-wrap items-center gap-3 sm:gap-4 text-xs">
            {legend}
          </footer>
        )}
      </figure>
    </AnimateOnScroll>
  )
}

/** Reusable legend swatch used by most diagrams. */
export function LegendItem({
  color,
  label,
}: {
  color: string
  label: string
}) {
  return (
    <span className="inline-flex items-center gap-1.5 text-slate-700">
      <span
        className="inline-block w-3 h-3 rounded-sm"
        style={{ backgroundColor: color }}
      />
      {label}
    </span>
  )
}
