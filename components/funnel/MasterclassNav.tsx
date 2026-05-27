'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { Award, BookOpen, Briefcase, Home, Layers, ListOrdered, Settings, Sparkles, Users, Wrench, Zap } from 'lucide-react'

const isInternalSite = process.env.NEXT_PUBLIC_UNLOCK_ALL === 'true'

const navItems = [
  { href: '/', label: 'Home', shortLabel: 'Home', icon: Home },
  { href: '/steps', label: 'The 9 Steps', shortLabel: 'Steps', icon: ListOrdered },
  { href: '/knowledge', label: 'Knowledge', shortLabel: 'Know', icon: BookOpen },
  { href: '/products', label: 'Products', shortLabel: 'Brands', icon: Layers },
  { href: '/demo-dashboard', label: 'SolaFlow Demo', shortLabel: 'Demo', icon: Zap },
  { href: '/systems', label: 'Systems', shortLabel: 'Sys', icon: Settings },
  { href: '/case-studies', label: 'Cases', shortLabel: 'Cases', icon: Award },
  { href: '/agency', label: 'Work with Us', shortLabel: 'Agency', icon: Briefcase },
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
    <nav aria-label="Main navigation" className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
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
                className={`nav-pill flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-2 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 touch-action-manipulation scroll-snap-start flex-shrink-0 min-h-[44px] ${
                  isActive
                    ? 'bg-[#E8192C] text-white shadow-lg shadow-[#E8192C]/25'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 active:bg-slate-300 hover:shadow-md'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="sm:hidden">{item.shortLabel}</span>
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
