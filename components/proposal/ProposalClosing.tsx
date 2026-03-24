'use client'

import { Mail, Globe } from 'lucide-react'

export default function ProposalClosing() {
  return (
    <section className="bg-[#0A0A0A] text-white py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="font-heading text-2xl md:text-3xl font-bold leading-relaxed mb-8 animate-on-scroll">
          You&apos;ve built a business worth scaling.<br />
          Let&apos;s build the engine that gets you there.
        </p>
        
        <p className="text-[#9CA3AF] text-lg mb-12 animate-on-scroll stagger-1">
          No pressure. You know what we do and how we do it. Let me know where you land.
        </p>
        
        <div className="animate-on-scroll stagger-2">
          <p className="font-heading font-bold text-xl mb-1">Keilan James-Devereux</p>
          <p className="text-[#9CA3AF] mb-6">Co-Founder & CRO · ETOTO Media</p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
            <a 
              href="mailto:keilan.jd@etotomedia.com"
              className="flex items-center gap-2 text-white hover:text-[#E8192C] transition-colors"
            >
              <Mail className="w-4 h-4" />
              keilan.jd@etotomedia.com
            </a>
            <a 
              href="https://etotomedia.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white hover:text-[#E8192C] transition-colors"
            >
              <Globe className="w-4 h-4" />
              etotomedia.com
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
