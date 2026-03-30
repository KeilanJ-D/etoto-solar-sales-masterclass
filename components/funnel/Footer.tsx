'use client'

import Link from 'next/link'
import { Star, Mail, Phone, MapPin, ExternalLink } from 'lucide-react'
import { googleReviewsUrl } from '@/lib/social-proof-data'

export default function Footer() {
  return (
    <footer className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 noise-texture opacity-50" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E8192C]/5 rounded-full blur-3xl" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Top section - Logo and tagline */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <Link href="/" className="flex items-center gap-4">
            <img 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ETOTO_Joel-Sp4sI6W29ziGLLM0CGKbh7tBi3HDbM.png" 
              alt="ETOTO Media" 
              width={200}
              height={56}
              style={{ width: 'auto', height: 'auto', maxHeight: '56px' }}
              className="h-12 md:h-14"
            />
          </Link>
          
          <div className="text-center md:text-right">
            <p className="text-white font-bold text-lg">
              Solar Sales Masterclass
            </p>
            <p className="text-white/50 text-sm mt-1">
              The complete 9-step system for closing more solar deals
            </p>
          </div>
        </div>
        
        {/* Main grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12 pb-12 border-b border-white/10">
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wide">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/#the-problem" className="text-white/50 hover:text-[#E8192C] text-sm transition-colors">The Problem</Link></li>
              <li><Link href="/#the-method" className="text-white/50 hover:text-[#E8192C] text-sm transition-colors">The Method</Link></li>
              <li><Link href="/steps" className="text-white/50 hover:text-[#E8192C] text-sm transition-colors">The 9 Steps</Link></li>
              <li><Link href="/live-call" className="text-white/50 hover:text-[#E8192C] text-sm transition-colors">Live Call</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wide">Tools</h4>
            <ul className="space-y-3">
              <li><Link href="/steps#formula-calculator" className="text-white/50 hover:text-[#E8192C] text-sm transition-colors">Calculator</Link></li>
              <li><Link href="/quiz" className="text-white/50 hover:text-[#E8192C] text-sm transition-colors">Quiz</Link></li>
              <li><Link href="/resources" className="text-white/50 hover:text-[#E8192C] text-sm transition-colors">Resources</Link></li>
              <li><Link href="/solaflow" className="text-white/50 hover:text-[#E8192C] text-sm transition-colors">SolaFlow</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wide">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:keilan.jd@etotomedia.com" className="flex items-center gap-2 text-white/50 hover:text-[#E8192C] text-sm transition-colors">
                  <Mail className="w-4 h-4" />
                  keilan.jd@etotomedia.com
                </a>
              </li>
              <li>
                <a href="tel:+447771775917" className="flex items-center gap-2 text-white/50 hover:text-[#E8192C] text-sm transition-colors">
                  <Phone className="w-4 h-4" />
                  +44 7771 775917
                </a>
              </li>
              <li className="flex items-start gap-2 text-white/50 text-sm">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Shoreditch, London, UK</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wide">Connect</h4>
            <ul className="space-y-3">
              <li>
                <a href="https://etotomedia.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/50 hover:text-[#E8192C] text-sm transition-colors">
                  <ExternalLink className="w-4 h-4" />
                  etotomedia.com
                </a>
              </li>
              <li>
                <a href="https://chat.whatsapp.com/FSM9iEeKpPj9Oux4qYyFSz?mode=gi_t" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/50 hover:text-[#25D366] text-sm transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Community
                </a>
              </li>
              <li>
                <a href={googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/50 hover:text-yellow-400 text-sm transition-colors">
                  <Star className="w-4 h-4 fill-current" />
                  Rate us on Google
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Trust bar */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-8 text-white/30 text-xs">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            200+ UK Installers
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            £175M+ Attributed Sales
          </span>
          <span className="flex items-center gap-1.5">
            <Star className="w-4 h-4 fill-current text-yellow-500" />
            4.9 Google Rating
          </span>
        </div>
        
        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10">
          <div className="flex items-center gap-4">
            <p className="text-white/30 text-xs">
              © 2026 ETOTO Media. All rights reserved.
            </p>
            <span className="hidden md:inline text-white/20">|</span>
            <p className="text-white/30 text-xs">
              Part of the ETOTO Media family
            </p>
          </div>
          <p className="text-white/30 text-xs">
            Confidential — For internal training purposes only
          </p>
        </div>
      </div>
    </footer>
  )
}
