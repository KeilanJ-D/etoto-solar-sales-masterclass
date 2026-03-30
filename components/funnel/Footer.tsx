'use client'

import Link from 'next/link'
import { Star } from 'lucide-react'
import { googleReviewsUrl } from '@/lib/social-proof-data'

export default function Footer() {
  return (
    <footer className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-4">
            <img 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ETOTO_Joel-Sp4sI6W29ziGLLM0CGKbh7tBi3HDbM.png" 
              alt="ETOTO Media" 
              className="h-10 md:h-12 w-auto object-contain"
            />
          </Link>
          
          <div className="text-center md:text-right">
            <p className="text-white/60 text-sm md:text-base font-medium">
              Solar Sales Masterclass
            </p>
            <p className="text-white/40 text-xs md:text-sm mt-1">
              The complete 9-step system for closing more solar deals
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/10">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-8 mb-8">
            <div>
              <h4 className="text-white/80 font-semibold text-sm mb-3">Quick Links</h4>
              <ul className="space-y-2.5 sm:space-y-2">
                <li><Link href="/#the-problem" className="text-white/50 hover:text-[#E8192C] active:text-[#E8192C] text-sm transition-colors block py-0.5">The Problem</Link></li>
                <li><Link href="/#the-method" className="text-white/50 hover:text-[#E8192C] active:text-[#E8192C] text-sm transition-colors block py-0.5">The Method</Link></li>
                <li><Link href="/steps" className="text-white/50 hover:text-[#E8192C] active:text-[#E8192C] text-sm transition-colors block py-0.5">The 9 Steps</Link></li>
                <li><Link href="/live-call" className="text-white/50 hover:text-[#E8192C] active:text-[#E8192C] text-sm transition-colors block py-0.5">Live Call</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white/80 font-semibold text-sm mb-3">Resources</h4>
              <ul className="space-y-2.5 sm:space-y-2">
                <li><Link href="/steps#formula-calculator" className="text-white/50 hover:text-[#E8192C] active:text-[#E8192C] text-sm transition-colors block py-0.5">Calculator</Link></li>
                <li><Link href="/quiz" className="text-white/50 hover:text-[#E8192C] active:text-[#E8192C] text-sm transition-colors block py-0.5">Quiz</Link></li>
                <li><Link href="/resources" className="text-white/50 hover:text-[#E8192C] active:text-[#E8192C] text-sm transition-colors block py-0.5">Downloads</Link></li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-white/80 font-semibold text-sm mb-3">Contact</h4>
              <ul className="space-y-2.5 sm:space-y-2">
                <li><a href="https://etotomedia.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-[#E8192C] active:text-[#E8192C] text-sm transition-colors block py-0.5">etotomedia.com</a></li>
                <li><a href="mailto:keilan.jd@etotomedia.com" className="text-white/50 hover:text-[#E8192C] active:text-[#E8192C] text-sm transition-colors block py-0.5 truncate">keilan.jd@etotomedia.com</a></li>
                <li><a href="https://chat.whatsapp.com/FSM9iEeKpPj9Oux4qYyFSz?mode=gi_t" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-[#25D366] active:text-[#25D366] text-sm transition-colors block py-0.5">Join the community</a></li>
                <li>
                  <a 
                    href={googleReviewsUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1.5 text-white/50 hover:text-yellow-400 active:text-yellow-400 text-sm transition-colors py-0.5"
                  >
                    <Star className="w-3.5 h-3.5 fill-current" />
                    Rate us on Google
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
            <p className="text-white/30 text-xs">
              © 2026 ETOTO Media. All rights reserved.
            </p>
            <p className="text-white/30 text-xs">
              Confidential — For internal training purposes only
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
