'use client'

import { useState, useEffect } from 'react'

const steps = [
  { id: 'step1', number: 1, label: 'Rapport' },
  { id: 'step2', number: 2, label: 'Discovery' },
  { id: 'step3', number: 3, label: 'Energy Audit' },
  { id: 'step4', number: 4, label: 'Battery Value' },
  { id: 'step5', number: 5, label: 'Solar Value' },
  { id: 'step6', number: 6, label: 'Financials' },
  { id: 'step7', number: 7, label: 'Objections' },
  { id: 'step8', number: 8, label: 'Close' },
  { id: 'step9', number: 9, label: 'Follow-Up' },
]

export default function StepNavigation() {
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Check if we're in the steps area
      const step1 = document.getElementById('step1')
      const step9 = document.getElementById('step9')
      
      if (!step1 || !step9) {
        setIsVisible(false)
        return
      }

      const step1Top = step1.getBoundingClientRect().top
      const step9Bottom = step9.getBoundingClientRect().bottom
      const windowHeight = window.innerHeight

      // Show nav when we're between step 1 and step 9
      if (step1Top < windowHeight * 0.8 && step9Bottom > windowHeight * 0.2) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }

      // Determine which step is active
      for (let i = steps.length - 1; i >= 0; i--) {
        const el = document.getElementById(steps[i].id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top < windowHeight * 0.5) {
            setActiveStep(steps[i].number)
            return
          }
        }
      }
      setActiveStep(null)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToStep = (stepId: string) => {
    const el = document.getElementById(stepId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div 
      className={`fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-50 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'
      }`}
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-slate-200 py-3 px-2">
        <div className="flex flex-col items-center gap-1">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => scrollToStep(step.id)}
              className="group relative"
              aria-label={`Go to Step ${step.number}: ${step.label}`}
            >
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 ${
                  activeStep === step.number
                    ? 'bg-[#E8192C] text-white scale-110'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700'
                }`}
              >
                {step.number}
              </div>
              
              {/* Tooltip */}
              <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="bg-slate-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
                  {step.label}
                  <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-slate-900" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
