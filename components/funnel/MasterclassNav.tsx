'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { Home, ListOrdered, Video, Phone, HelpCircle, Package } from 'lucide-react'

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/steps', label: 'The 9 Steps', icon: ListOrdered },
  { href: '/live-call', label: 'Live Call', icon: Video },
  { href: '/appointment-setting', label: 'Appointment Setting', icon: Phone },
  { href: '/quiz', label: 'Quiz', icon: HelpCircle },
  { href: '/resources', label: 'Resources', icon: Package },
]

export default function MasterclassNav() {
  const pathname = usePathname()
  const navRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef<HTMLAnchorElement>(null)
  
  // Auto-scroll active pill into view on mount and route change
  useEffect(() => {
    if (activeRef.current && navRef.current) {
      const nav = navRef.current
      const active = activeRef.current
      const navRect = nav.getBoundingClientRect()
      const activeRect = active.getBoundingClientRect()
      
      // Calculate scroll position to center the active pill
      const scrollLeft = active.offsetLeft - (navRect.width / 2) + (activeRect.width / 2)
      nav.scrollTo({ left: Math.max(0, scrollLeft), behavior: 'smooth' })
    }
  }, [pathname])
  
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-2 sm:px-4">
        <div 
          ref={navRef}
          className="flex items-center gap-2 py-2 sm:py-3 overflow-x-auto scrollbar-hide scroll-snap-x md:justify-between md:overflow-visible"
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            
            return (
              <Link
                key={item.href}
                href={item.href}
                ref={isActive ? activeRef : null}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all touch-action-manipulation scroll-snap-start flex-shrink-0 min-h-[44px] ${
                  isActive
                    ? 'bg-[#E8192C] text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 active:bg-slate-300'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="hidden xs:inline sm:inline">{item.label}</span>
                <span className="xs:hidden sm:hidden">{item.label.split(' ')[0]}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
