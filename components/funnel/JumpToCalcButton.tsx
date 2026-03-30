'use client'

import { Calculator } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

export default function JumpToCalcButton() {
  const pathname = usePathname()
  const router = useRouter()

  const handleClick = () => {
    // If we're on the steps page, scroll to calculator
    if (pathname === '/steps') {
      const calculator = document.getElementById('formula-calculator')
      if (calculator) {
        calculator.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } else {
      // Otherwise navigate to steps page with anchor
      router.push('/steps#formula-calculator')
    }
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-[#E8192C] text-white shadow-lg hover:bg-[#D01622] transition-all hover:scale-105 flex items-center justify-center"
      aria-label="Jump to calculator"
    >
      <Calculator className="w-6 h-6" />
    </button>
  )
}
