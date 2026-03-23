export default function Page1Cover() {
  return (
    <div className="relative w-full bg-white flex flex-col" style={{ minHeight: '297mm' }}>
      {/* Gradient top strip */}
      <div style={{ height: '4px', background: 'linear-gradient(to right, #E8192C 60%, #F5921E 80%, #1B6FE8 100%)' }} />

      {/* Header bar */}
      <div className="flex items-center justify-between px-10 py-5 border-b border-[#E2E5EA]">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Etoto%20logo%20%28Black%29-tn289JpGNWiyy62pa8d9DxYU9rejGO.png"
          alt="ETOTO Media"
          className="h-9 object-contain"
        />
        <span className="text-[#E8192C] font-black text-xl leading-none">×</span>
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/solar%20path%20logo-gb9aYzjnVnp3LFRgT565BJqotuLeRG.png"
          alt="Solar Path"
          className="h-9 object-contain"
          style={{ filter: 'invert(1) sepia(1) saturate(3) hue-rotate(10deg) brightness(0.6)' }}
        />
      </div>

      {/* Hero content */}
      <div className="flex-1 flex flex-col justify-center px-10 py-12 relative">
        {/* Confidential stamp */}
        <div className="absolute top-8 right-10 border-2 border-[#E8192C] px-4 py-1.5 opacity-85">
          <span className="text-[#E8192C] font-black text-xs tracking-[0.2em] uppercase">Confidential</span>
        </div>

        {/* Eyebrow */}
        <p className="text-[#E8192C] font-extrabold text-[10px] tracking-[0.18em] uppercase mb-6">
          Confidential Website Audit — March 2026
        </p>

        {/* Main headline */}
        <h1 className="font-black uppercase text-[#0A0A0A] leading-none mb-5" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
          YOUR WEBSITE IS COSTING YOU{' '}
          <span className="text-[#E8192C]">MORE</span>{' '}
          THAN YOU KNOW.
        </h1>

        {/* Red rule */}
        <div className="mb-7" style={{ width: '72px', height: '3px', background: '#E8192C' }} />

        {/* Sub-copy */}
        <p className="text-[#374151] font-normal leading-relaxed mb-8 max-w-2xl" style={{ fontSize: '13px' }}>
          A forensic audit of solarpath.ie across SEO, Conversion Rate Optimisation, Brand &amp; Paid Media — prepared exclusively for{' '}
          <span className="font-bold text-[#0A0A0A]">Ken Hegarty &amp; Jackie, Solar Path.</span>
        </p>

        {/* Metadata row */}
        <div className="flex items-center gap-2 text-[#6B7280] font-medium" style={{ fontSize: '10px' }}>
          <span>March 2026</span>
          <span className="text-[#E8192C]">|</span>
          <span>Prepared by ETOTO Media</span>
          <span className="text-[#E8192C]">|</span>
          <span>Confidential</span>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-[#E2E5EA] flex items-center justify-between px-10 py-5">
        <p className="text-[#6B7280] italic font-light" style={{ fontSize: '10px' }}>
          "The UK &amp; Ireland's most data-driven growth agency for solar &amp; renewables."
        </p>
        <p className="text-[#D1D5DB] italic font-light" style={{ fontSize: '10px' }}>
          Turn the page. It gets interesting.
        </p>
      </div>

      {/* Colour strip */}
      <div className="flex" style={{ height: '6px' }}>
        <div className="flex-[5] bg-[#E8192C]" />
        <div className="flex-[2] bg-[#F5921E]" />
        <div className="flex-[1] bg-[#1B6FE8]" />
      </div>
    </div>
  )
}
