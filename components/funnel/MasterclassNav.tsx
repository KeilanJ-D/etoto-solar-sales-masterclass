'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
  
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between gap-2 py-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#E8192C] text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
