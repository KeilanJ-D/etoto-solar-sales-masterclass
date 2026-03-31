'use client'

import { useState, useEffect } from 'react'
import { ChevronUp, ChevronDown, X } from 'lucide-react'

const steps = [
  { id: 1, title: 'Build Rapport', anchor: 'step-1' },
  { id: 2, title: 'Discovery', anchor: 'step-2' },
  { id: 3, title: 'Energy Audit', anchor: 'step-3' },
  { id: 4, title: 'Battery Value', anchor: 'step-4' },
  { id: 5, title: 'Solar Value', anchor: 'step-5' },
  { id: 6, title: 'Financials', anchor: 'step-6' },
  { id: 7, title: 'Objections', anchor: 'step-7' },
  { id: 8, title: 'Close', anchor: 'step-8' },
  { id: 9, title: 'Follow Up', anchor: 'step-9' },
]

export default function StepsNav() {
  const [currentStep, setCurrentStep] = useState(1)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Find which step section is currently in view
      for (let i = steps.length - 1; i >= 0; i--) {
        const element = document.getElementById(steps[i].anchor)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            setCurrentStep(steps[i].id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToStep = (anchor: string) => {
    const element = document.getElementById(anchor)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileOpen(false)
    }
  }

  return (
    <>
      {/* Desktop Sidebar - hidden on mobile */}
      <nav className="hidden lg:block fixed left-4 top-1/2 -translate-y-1/2 z-40">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200 p-2">
          <div className="space-y-1">
            {steps.map((step) => (
              <button
                key={step.id}
                onClick={() => scrollToStep(step.anchor)}
                className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-left transition-all group ${
                  currentStep === step.id
                    ? 'bg-[#E8192C] text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  currentStep === step.id
                    ? 'bg-white/20 text-white'
                    : currentStep > step.id
                      ? 'bg-green-500 text-white'
                      : 'bg-slate-200 text-slate-500'
                }`}>
                  {currentStep > step.id ? '✓' : step.id}
                </span>
                <span className="text-xs font-medium whitespace-nowrap">{step.title}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Floating Pill - shown only on mobile */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
        {!mobileOpen ? (
          <button
            onClick={() => setMobileOpen(true)}
            className="flex items-center gap-3 px-5 py-3 bg-slate-900 text-white rounded-full shadow-xl hover:shadow-2xl transition-all"
          >
            <span className="text-sm font-medium">Step {currentStep} of 9</span>
            <div className="flex items-center gap-1">
              <ChevronUp className="w-4 h-4 opacity-60" />
            </div>
          </button>
        ) : (
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden w-72">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
              <span className="text-sm font-bold text-slate-900">Jump to Step</span>
              <button 
                onClick={() => setMobileOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>
            <div className="p-2 max-h-80 overflow-y-auto">
              {steps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => scrollToStep(step.anchor)}
                  className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-left transition-all ${
                    currentStep === step.id
                      ? 'bg-[#E8192C] text-white'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    currentStep === step.id
                      ? 'bg-white/20 text-white'
                      : currentStep > step.id
                        ? 'bg-green-500 text-white'
                        : 'bg-slate-200 text-slate-600'
                  }`}>
                    {currentStep > step.id ? '✓' : step.id}
                  </span>
                  <span className="text-sm font-medium">{step.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
