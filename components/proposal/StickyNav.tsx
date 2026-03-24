'use client'

import { useState, useEffect } from 'react'

export default function StickyNav() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
      style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
    >
      <div className="bg-white/90 border-b border-[#E2E5EA]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-heading font-bold text-[#0A0A0A]">ETOTO MEDIA</span>
            <span className="text-[#E8192C] font-bold">×</span>
            <span className="font-heading font-bold text-[#0A0A0A]">Solar Path</span>
          </div>
          <span className="text-[#6B7280] text-sm">Commercial Proposal — March 2026</span>
        </div>
      </div>
    </nav>
  )
}
