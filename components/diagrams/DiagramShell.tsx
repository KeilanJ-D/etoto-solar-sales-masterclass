'use client'

import { type ReactNode } from 'react'
import { Move } from 'lucide-react'
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
  /**
   * When true, wraps the diagram body in a horizontally-scrollable
   * container on mobile (<lg) with a minimum width. Adds a swipe hint.
   * Use for complex single-SVG diagrams that don't reflow naturally.
   */
  scrollOnMobile?: boolean
  /** Min-width (px) for the scrollable body on mobile. Defaults to 720. */
  mobileMinWidth?: number
}

export default function DiagramShell({
  eyebrow,
  title,
  caption,
  children,
  legend,
  fullWidth = false,
  scrollOnMobile = false,
  mobileMinWidth = 720,
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

        {scrollOnMobile && (
          <p className="lg:hidden text-[11px] text-slate-500 px-5 sm:px-7 pt-3 -mb-2 flex items-center gap-1.5">
            <Move className="w-3 h-3" />
            Swipe to view full diagram
          </p>
        )}

        {scrollOnMobile ? (
          <div className="p-5 sm:p-7 overflow-x-auto lg:overflow-visible">
            <div
              style={{ minWidth: mobileMinWidth }}
              className="lg:!min-w-0"
            >
              {children}
            </div>
          </div>
        ) : (
          <div className="p-5 sm:p-7">{children}</div>
        )}

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
