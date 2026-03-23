'use client'

export default function Footer() {
  return (
    <footer className="py-12 px-6 bg-[#1A1A2E]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ETOTO_Joel-Sp4sI6W29ziGLLM0CGKbh7tBi3HDbM.png" 
              alt="ETOTO Media" 
              className="h-10 object-contain"
            />
            <span className="text-white/30">×</span>
            <img 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/solar%20path%20logo-gb9aYzjnVnp3LFRgT565BJqotuLeRG.png" 
              alt="Solar Path" 
              className="h-10 object-contain"
            />
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-white/40 text-sm">
              Prepared exclusively for Solar Path by ETOTO Media
            </p>
            <p className="text-white/30 text-xs mt-1">
              March 2026 — Confidential
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            © 2026 ETOTO Media. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="https://etotomedia.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white text-sm transition-colors">
              etotomedia.com
            </a>
            <a href="mailto:hello@etotomedia.com" className="text-white/40 hover:text-white text-sm transition-colors">
              hello@etotomedia.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
