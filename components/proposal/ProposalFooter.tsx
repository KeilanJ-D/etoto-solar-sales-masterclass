'use client'

export default function ProposalFooter() {
  return (
    <footer>
      {/* Gradient strip */}
      <div className="h-1 bg-gradient-to-r from-[#E8192C] via-[#F5921E] to-[#1B6FE8]" />
      
      <div className="bg-slate-950 py-8 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-slate-800 rounded-lg px-3 py-1.5">
                <img 
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ETOTO_Joel-Sp4sI6W29ziGLLM0CGKbh7tBi3HDbM.png" 
                  alt="ETOTO Media" 
                  className="h-4"
                />
              </div>
              <span className="text-[#E8192C] font-black text-sm">×</span>
              <div className="bg-slate-800 rounded-lg px-3 py-1.5">
                <img 
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/solar%20path%20logo-gb9aYzjnVnp3LFRgT565BJqotuLeRG.png" 
                  alt="Solar Path" 
                  className="h-4"
                />
              </div>
            </div>
            
            <p className="text-slate-500 text-sm text-center md:text-right">
              Prepared exclusively for Ken Hegarty & Jackie Murphy · March 2026 · Confidential
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
