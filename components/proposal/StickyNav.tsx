'use client'

import { useState, useEffect } from 'react'

export default function StickyNav() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.5)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: 'Current State', href: '#where-you-are' },
    { label: 'Proof', href: '#proof' },
    { label: 'Roadmap', href: '#roadmap' },
    { label: 'Investment', href: '#investment' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
    >
      <div className="bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 rounded-lg px-3 py-1.5">
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ETOTO_Joel-Sp4sI6W29ziGLLM0CGKbh7tBi3HDbM.png" 
                alt="ETOTO Media" 
                className="h-5"
              />
            </div>
            <span className="text-[#E8192C] font-black text-sm">×</span>
            <div className="bg-slate-900 rounded-lg px-3 py-1.5">
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/solar%20path%20logo-gb9aYzjnVnp3LFRgT565BJqotuLeRG.png" 
                alt="Solar Path" 
                className="h-5"
              />
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a 
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-slate-600 hover:text-[#E8192C] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
          
          <a 
            href="#next-steps"
            className="bg-[#E8192C] hover:bg-[#D01622] text-white text-sm font-semibold px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-[#E8192C]/20"
          >
            Get Started
          </a>
        </div>
      </div>
    </nav>
  )
}
