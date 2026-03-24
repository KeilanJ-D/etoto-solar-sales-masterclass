'use client'

export default function ProposalFooter() {
  return (
    <footer>
      {/* Gradient strip */}
      <div className="gradient-strip" />
      
      <div className="bg-[#111827] py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="font-heading font-bold text-white">ETOTO MEDIA</span>
              <span className="text-[#E8192C] font-bold">×</span>
              <span className="font-heading font-bold text-white">Solar Path</span>
            </div>
            
            <p className="text-[#6B7280] text-sm text-center md:text-right">
              Prepared exclusively for Ken Hegarty & Jackie Murphy · March 2026 · Confidential
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
