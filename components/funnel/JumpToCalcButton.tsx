'use client'

import { Calculator } from 'lucide-react'

export default function JumpToCalcButton() {
  const scrollToCalculator = () => {
    const calculator = document.getElementById('formula-calculator')
    if (calculator) {
      calculator.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <button
      onClick={scrollToCalculator}
      className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-[#E8192C] text-white shadow-lg hover:bg-[#D01622] transition-all hover:scale-105 flex items-center justify-center"
      aria-label="Jump to calculator"
    >
      <Calculator className="w-6 h-6" />
    </button>
  )
}
