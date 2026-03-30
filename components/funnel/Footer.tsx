'use client'

export default function Footer() {
  return (
    <footer className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ETOTO_Joel-Sp4sI6W29ziGLLM0CGKbh7tBi3HDbM.png" 
              alt="ETOTO Media" 
              className="h-10 md:h-12 object-contain"
            />
          </div>
          
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
                <li><a href="#the-problem" className="text-white/50 hover:text-[#E8192C] active:text-[#E8192C] text-sm transition-colors block py-0.5">The Problem</a></li>
                <li><a href="#the-method" className="text-white/50 hover:text-[#E8192C] active:text-[#E8192C] text-sm transition-colors block py-0.5">The Method</a></li>
                <li><a href="#step-1" className="text-white/50 hover:text-[#E8192C] active:text-[#E8192C] text-sm transition-colors block py-0.5">The 9 Steps</a></li>
                <li><a href="#live-call" className="text-white/50 hover:text-[#E8192C] active:text-[#E8192C] text-sm transition-colors block py-0.5">Live Call</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white/80 font-semibold text-sm mb-3">Resources</h4>
              <ul className="space-y-2.5 sm:space-y-2">
                <li><a href="#formula-calculator" className="text-white/50 hover:text-[#E8192C] active:text-[#E8192C] text-sm transition-colors block py-0.5">Calculator</a></li>
                <li><a href="#quiz" className="text-white/50 hover:text-[#E8192C] active:text-[#E8192C] text-sm transition-colors block py-0.5">Quiz</a></li>
                <li><a href="#downloads" className="text-white/50 hover:text-[#E8192C] active:text-[#E8192C] text-sm transition-colors block py-0.5">Downloads</a></li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-white/80 font-semibold text-sm mb-3">Contact</h4>
              <ul className="space-y-2.5 sm:space-y-2">
                <li><a href="https://etotomedia.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-[#E8192C] active:text-[#E8192C] text-sm transition-colors block py-0.5">etotomedia.com</a></li>
                <li><a href="mailto:keilan.jd@etotomedia.com" className="text-white/50 hover:text-[#E8192C] active:text-[#E8192C] text-sm transition-colors block py-0.5 truncate">keilan.jd@etotomedia.com</a></li>
                <li><a href="https://chat.whatsapp.com/FSM9iEeKpPj9Oux4qYyFSz?mode=gi_t" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-[#25D366] active:text-[#25D366] text-sm transition-colors block py-0.5">Join the community</a></li>
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
