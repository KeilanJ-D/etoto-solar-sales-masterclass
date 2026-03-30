'use client'

import { useState, useEffect } from 'react'

const steps = [
  { id: 'step-1', label: 'Rapport', number: 1 },
  { id: 'step-2', label: 'Discovery', number: 2 },
  { id: 'step-3', label: 'Energy Audit', number: 3 },
  { id: 'step-4', label: 'Battery Value', number: 4 },
  { id: 'step-5', label: 'Solar Value', number: 5 },
  { id: 'step-6', label: 'Financials', number: 6 },
  { id: 'step-7', label: 'Objections', number: 7 },
  { id: 'step-8', label: 'Close', number: 8 },
  { id: 'step-9', label: 'Follow-up', number: 9 },
]

export function StepProgress() {
  const [activeStep, setActiveStep] = useState(1)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show after scrolling past the header
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400)
    }

    // Observe which step is in view
    const observers: IntersectionObserver[] = []
    
    steps.forEach((step) => {
      const el = document.getElementById(step.id)
      if (el) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveStep(step.number)
            }
          },
          { threshold: 0.3, rootMargin: '-100px 0px -50% 0px' }
        )
        observer.observe(el)
        observers.push(observer)
      }
    })

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observers.forEach((obs) => obs.disconnect())
    }
  }, [])

  const scrollToStep = (stepId: string) => {
    const el = document.getElementById(stepId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  if (!isVisible) return null

  return (
    <>
      {/* Desktop: Vertical sidebar */}
      <div className="hidden lg:block fixed left-4 xl:left-8 top-1/2 -translate-y-1/2 z-40">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200 p-3">
          <div className="flex flex-col gap-1">
            {steps.map((step) => (
              <button
                key={step.id}
                onClick={() => scrollToStep(step.id)}
                className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-left transition-all ${
                  activeStep === step.number
                    ? 'bg-[#E8192C] text-white'
                    : 'hover:bg-slate-100 text-slate-600'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                  activeStep === step.number
                    ? 'bg-white/20'
                    : activeStep > step.number
                      ? 'bg-green-100 text-green-600'
                      : 'bg-slate-100'
                }`}>
                  {activeStep > step.number ? '✓' : step.number}
                </span>
                <span className="text-xs font-medium hidden xl:inline">{step.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: Bottom pill */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40">
        <div className="bg-white/95 backdrop-blur-sm rounded-full shadow-lg border border-slate-200 px-4 py-2.5">
          <div className="flex items-center gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#E8192C] text-white flex items-center justify-center text-sm font-bold">
              {activeStep}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">
                Step {activeStep} — {steps[activeStep - 1]?.label}
              </p>
              <div className="mt-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#E8192C] transition-all duration-300"
                  style={{ width: `${(activeStep / 9) * 100}%` }}
                />
              </div>
            </div>
            <span className="text-xs text-slate-500 flex-shrink-0">
              {activeStep}/9
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
