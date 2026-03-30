'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'
import { Copy, Check } from 'lucide-react'

interface SalesStepProps {
  id: string
  stepNumber: number
  title: string
  goal: string
  children: ReactNode
  dark?: boolean
}

export default function SalesStep({ id, stepNumber, title, goal, children, dark = false }: SalesStepProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section 
      id={id} 
      ref={sectionRef} 
      className={`py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors ${
        dark ? 'bg-slate-900 text-white' : 'bg-white dark:bg-slate-900 dark:text-white'
      }`}
    >
      {/* Background decoration */}
      {dark ? (
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#E8192C] rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#F5921E] rounded-full blur-3xl" />
        </div>
      ) : (
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-gradient-to-bl from-red-50/30 to-transparent pointer-events-none" />
      )}
      
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Step number badge */}
        <div className={`flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#E8192C] flex items-center justify-center font-black text-lg sm:text-xl text-white shadow-lg">
            {stepNumber}
          </div>
          <span className={`text-xs sm:text-sm font-medium tracking-wide uppercase ${dark ? 'text-slate-400' : 'text-slate-500 dark:text-slate-400'}`}>
            Step {stepNumber} of 9
          </span>
        </div>

        {/* Title */}
        <h2 className={`text-xl sm:text-2xl md:text-4xl lg:text-5xl font-black text-center mb-3 sm:mb-4 transition-all duration-700 delay-100 text-balance ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${dark ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
          {title}
        </h2>

        {/* Goal */}
        <p className={`text-sm sm:text-base md:text-lg text-center max-w-2xl mx-auto mb-6 sm:mb-8 md:mb-10 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${dark ? 'text-slate-300' : 'text-slate-500 dark:text-slate-300'}`}>
          {goal}
        </p>

        {/* Content */}
        <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {children}
        </div>
      </div>
    </section>
  )
}

// Reusable components for step content
export function ScriptBox({ children, title = "What to Say" }: { children: ReactNode, title?: string }) {
  const [copied, setCopied] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const handleCopy = () => {
    if (contentRef.current) {
      const text = contentRef.current.innerText
      navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="bg-slate-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 relative group">
      <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500" />
          <span className="ml-1.5 sm:ml-2 text-slate-400 text-xs sm:text-sm font-medium truncate">{title}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs bg-white/10 hover:bg-white/20 active:bg-white/30 text-slate-300 px-3 py-2.5 rounded-lg transition-all min-h-[44px] touch-action-manipulation flex-shrink-0"
          aria-label="Copy script to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div ref={contentRef} className="text-slate-100 text-sm sm:text-base leading-relaxed sm:leading-loose font-mono whitespace-pre-wrap">
        {children}
      </div>
    </div>
  )
}

export function WhyCard({ title, children }: { title: string, children: ReactNode }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-800 rounded-lg sm:rounded-xl p-4 sm:p-5 border border-slate-100 dark:border-slate-700 hover:border-[#E8192C]/30 hover:shadow-lg transition-all duration-300">
      <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1.5 sm:mb-2">{title}</h4>
      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{children}</p>
    </div>
  )
}

export function KeyLine({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#E8192C] text-white rounded-xl p-5 md:p-6 mt-8">
      <p className="text-sm md:text-base font-medium leading-relaxed text-center">
        {children}
      </p>
    </div>
  )
}

export function FromTheCall({ children }: { children: ReactNode }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-800 border-l-4 border-[#F5921E] rounded-r-xl p-5 mt-6">
      <p className="text-xs font-semibold text-[#F5921E] uppercase tracking-wide mb-2">From the Real Call</p>
      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed italic">{children}</p>
    </div>
  )
}

export function FormulaBlock({ children }: { children: ReactNode }) {
  return (
    <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-6 font-mono text-sm md:text-base text-slate-800 dark:text-slate-200 mb-6">
      {children}
    </div>
  )
}

export function ExampleBlock({ title, children }: { title: string, children: ReactNode }) {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 mb-6 shadow-sm">
      <p className="text-xs font-semibold text-[#E8192C] uppercase tracking-wide mb-3">{title}</p>
      <div className="text-slate-700 dark:text-slate-200 text-sm md:text-base leading-relaxed font-mono">
        {children}
      </div>
    </div>
  )
}
