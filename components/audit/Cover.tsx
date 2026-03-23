export default function Cover() {
  return (
    <div className="page-container w-full max-w-[794px] bg-white shadow-2xl relative overflow-hidden" style={{ minHeight: '1123px' }}>
      {/* Top gradient strip */}
      <div className="h-1" style={{ background: 'linear-gradient(90deg, #E8192C 0%, #E8192C 60%, #F5921E 80%, #1B6FE8 100%)' }} />
      
      {/* Header with logos */}
      <header className="flex items-center justify-between px-14 py-8 border-b border-[#E5E7EB]">
        <img 
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Etoto%20logo%20%28Black%29-tn289JpGNWiyy62pa8d9DxYU9rejGO.png" 
          alt="ETOTO Media" 
          className="h-10"
        />
        <span className="text-[#E8192C] font-black text-2xl select-none">×</span>
        <img 
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/solar%20path%20logo-gb9aYzjnVnp3LFRgT565BJqotuLeRG.png" 
          alt="Solar Path" 
          className="h-10"
          style={{ filter: 'brightness(0) saturate(100%) invert(40%) sepia(85%) saturate(1500%) hue-rotate(10deg)' }}
        />
      </header>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center px-14 py-20 relative" style={{ minHeight: '800px' }}>
        {/* Confidential stamp */}
        <div className="absolute top-12 right-14 border-2 border-[#E8192C] px-5 py-2">
          <span className="text-[#E8192C] font-black text-[10px] tracking-[0.25em] uppercase">Confidential</span>
        </div>

        {/* Eyebrow */}
        <p className="text-[#E8192C] font-bold text-[11px] tracking-[0.2em] uppercase mb-8">
          Confidential Website Audit — March 2026
        </p>

        {/* Main headline */}
        <h1 className="font-black text-[#0A0A0A] uppercase leading-[0.95] tracking-tight mb-8" style={{ fontSize: '52px' }}>
          Your website is<br />
          costing you <span className="text-[#E8192C]">more</span><br />
          than you know.
        </h1>

        {/* Red accent line */}
        <div className="w-20 h-1 bg-[#E8192C] mb-10" />

        {/* Subhead */}
        <p className="text-[#4B5563] text-[15px] leading-relaxed max-w-xl mb-10">
          A forensic audit of <span className="font-semibold text-[#0A0A0A]">solarpath.ie</span> across SEO, Conversion Rate Optimisation, Brand & Paid Media — prepared exclusively for{' '}
          <span className="font-bold text-[#0A0A0A]">Ken Hegarty & Jackie, Solar Path.</span>
        </p>

        {/* Metadata */}
        <div className="flex items-center gap-3 text-[#6B7280] text-[11px] font-medium">
          <span>March 2026</span>
          <span className="text-[#E8192C] font-bold">|</span>
          <span>Prepared by ETOTO Media</span>
          <span className="text-[#E8192C] font-bold">|</span>
          <span>Confidential</span>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0">
        <div className="flex items-center justify-between px-14 py-6 border-t border-[#E5E7EB]">
          <p className="text-[#9CA3AF] text-[11px] italic">
            "The UK & Ireland's most data-driven growth agency for solar & renewables."
          </p>
          <p className="text-[#D1D5DB] text-[11px] italic">
            Turn the page. It gets interesting.
          </p>
        </div>
        
        {/* Colour strip */}
        <div className="flex h-2">
          <div className="flex-[5] bg-[#E8192C]" />
          <div className="flex-[2] bg-[#F5921E]" />
          <div className="flex-1 bg-[#1B6FE8]" />
        </div>
      </footer>
    </div>
  )
}
