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

  // Alternate background colors: odd steps = white, even steps = slate-50
  // Step 3 (calculator) gets special treatment = slate-900
  const bgClass = dark 
    ? 'bg-slate-900 text-white' 
    : stepNumber % 2 === 0 
      ? 'bg-slate-50' 
      : 'bg-white'

  return (
    <section 
      id={id} 
      ref={sectionRef} 
      className={`py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors ${bgClass}`}
    >
      {/* Large watermark step number */}
      <div 
        className={`absolute top-8 sm:top-12 md:top-16 left-1/2 -translate-x-1/2 text-[8rem] sm:text-[12rem] md:text-[16rem] font-black pointer-events-none select-none leading-none ${
          dark ? 'text-white/5' : 'text-slate-900/[0.03]'
        }`}
        aria-hidden="true"
      >
        {String(stepNumber).padStart(2, '0')}
      </div>

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
          <span className={`text-xs sm:text-sm font-medium tracking-wide uppercase ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
            Step {stepNumber} of 9
          </span>
        </div>

        {/* Title */}
        <h2 className={`text-xl sm:text-2xl md:text-4xl lg:text-5xl font-black text-center mb-3 sm:mb-4 transition-all duration-700 delay-100 text-balance ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${dark ? 'text-white' : 'text-slate-900'}`}>
          {title}
        </h2>

        {/* Goal */}
        <p className={`text-sm sm:text-base md:text-lg text-center max-w-2xl mx-auto mb-6 sm:mb-8 md:mb-10 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${dark ? 'text-slate-300' : 'text-slate-500'}`}>
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
  const [showPulse, setShowPulse] = useState(true)
  const contentRef = useRef<HTMLDivElement>(null)

  // Remove pulse animation after first view
  useEffect(() => {
    const timer = setTimeout(() => setShowPulse(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  const handleCopy = () => {
    if (contentRef.current) {
      const text = contentRef.current.innerText
      navigator.clipboard.writeText(text)
      setCopied(true)
      setShowPulse(false)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Parse children to add line numbers and speaker highlighting
  const formatScript = (content: ReactNode): ReactNode => {
    if (typeof content !== 'string') return content
    
    const lines = content.split('\n')
    return (
      <div className="space-y-2 sm:space-y-1">
        {lines.map((line, i) => {
          // Detect speaker labels
          let formattedLine = line
          let speakerClass = ''
          
          if (line.includes('[YOU]') || line.startsWith('YOU:') || line.includes('"Hi')) {
            speakerClass = 'border-l-2 border-[#E8192C]/50 pl-3 -ml-3'
          } else if (line.includes('[CUSTOMER]') || line.startsWith('CUSTOMER:')) {
            speakerClass = 'border-l-2 border-green-500/50 pl-3 -ml-3'
          }
          
          // Style speaker labels inline
          formattedLine = line
            .replace(/\[YOU\]/g, '<span class="text-[#E8192C] font-bold">[YOU]</span>')
            .replace(/\[CUSTOMER\]/g, '<span class="text-green-400 font-bold">[CUSTOMER]</span>')
          
          return (
            <div key={i} className={`flex gap-3 ${speakerClass} py-1 sm:py-0.5`}>
              <span className="script-line-number font-mono text-xs sm:text-sm hidden sm:block">{i + 1}</span>
              <span 
                className="flex-1"
                dangerouslySetInnerHTML={{ __html: formattedLine }}
              />
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="relative mb-6 sm:mb-8 group">
      {/* Cinematic red glow on left */}
      <div className="absolute left-0 top-4 bottom-4 w-1.5 sm:w-1 rounded-full bg-gradient-to-b from-[#E8192C] via-[#F5921E] to-[#E8192C] shadow-[0_0_30px_rgba(232,25,44,0.4),0_0_60px_rgba(232,25,44,0.2)] group-hover:shadow-[0_0_40px_rgba(232,25,44,0.5),0_0_80px_rgba(232,25,44,0.3)] transition-shadow duration-500" />
      
      <div className="bg-slate-900 rounded-xl sm:rounded-2xl relative ml-3 sm:ml-2 noise-texture overflow-hidden">
        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 via-transparent to-slate-950/50 pointer-events-none" />
        
        <div className="relative z-10">
          {/* Sticky Header bar on mobile */}
          <div className="sticky top-0 z-20 bg-slate-900/95 backdrop-blur-sm flex items-center justify-between gap-2 px-4 sm:px-6 md:px-8 py-3 sm:py-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500" />
              </div>
              <span className="ml-2 text-slate-400 text-xs sm:text-sm font-medium tracking-wide">{title}</span>
            </div>
            {/* Desktop copy button in header */}
            <button
              onClick={handleCopy}
              className={`hidden sm:flex items-center gap-2 text-sm bg-white/5 hover:bg-white/10 active:bg-white/15 text-slate-300 px-4 py-2.5 rounded-lg transition-all min-h-[44px] touch-action-manipulation flex-shrink-0 border border-white/10 hover:border-white/20 ${
                showPulse ? 'ring-2 ring-[#E8192C]/40 ring-offset-2 ring-offset-slate-900' : ''
              } ${copied ? 'copy-success' : ''}`}
              aria-label="Copy script to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 font-medium">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Script</span>
                </>
              )}
            </button>
          </div>
          
          {/* Script content - larger text on mobile for mid-call reading */}
          <div 
            ref={contentRef} 
            className="text-slate-100 text-base sm:text-base md:text-lg leading-[1.8] sm:leading-relaxed font-mono px-4 sm:px-6 md:px-8 py-4 sm:py-5 overflow-hidden break-words"
          >
            {typeof children === 'string' ? formatScript(children) : (
              <div className="whitespace-pre-wrap break-words">{children}</div>
            )}
          </div>
          
          {/* Legend */}
          <div className="flex items-center gap-4 px-4 sm:px-6 md:px-8 py-3 border-t border-white/10 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#E8192C]" />
              You
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              Customer
            </span>
          </div>
          
          {/* Mobile-only full-width copy button at bottom */}
          <button
            onClick={handleCopy}
            className={`sm:hidden w-full flex items-center justify-center gap-2 text-base font-bold py-4 transition-all min-h-[56px] touch-action-manipulation ${
              copied 
                ? 'bg-green-500 text-white' 
                : 'bg-green-600 hover:bg-green-700 active:bg-green-800 text-white'
            } ${showPulse ? 'animate-pulse' : ''}`}
            aria-label="Copy script to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-5 h-5" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                <span>Copy Script</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export function WhyCard({ title, children }: { title: string, children: ReactNode }) {
  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200 card-lift hover:border-[#E8192C]/30 group">
      <h4 className="font-bold text-slate-900 text-sm mb-2 group-hover:text-[#E8192C] transition-colors">{title}</h4>
      <p className="text-slate-600 text-sm leading-relaxed">{children}</p>
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
    <div className="bg-slate-50 border-l-4 border-[#F5921E] rounded-r-xl p-5 mt-6">
      <p className="text-xs font-semibold text-[#F5921E] uppercase tracking-wide mb-2">From the Real Call</p>
      <p className="text-slate-600 text-sm leading-relaxed italic">{children}</p>
    </div>
  )
}

export function FormulaBlock({ children }: { children: ReactNode }) {
  return (
    <div className="bg-slate-100 rounded-xl p-6 font-mono text-sm md:text-base text-slate-800 mb-6">
      {children}
    </div>
  )
}

export function ExampleBlock({ title, children }: { title: string, children: ReactNode }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6 shadow-sm">
      <p className="text-xs font-semibold text-[#E8192C] uppercase tracking-wide mb-3">{title}</p>
      <div className="text-slate-700 text-sm md:text-base leading-relaxed font-mono">
        {children}
      </div>
    </div>
  )
}
