export function PageHeader() {
  return (
    <div className="flex items-center justify-between px-10 py-4 border-b border-[#E2E5EA]">
      <img
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Etoto%20logo%20%28Black%29-tn289JpGNWiyy62pa8d9DxYU9rejGO.png"
        alt="ETOTO Media"
        className="h-7 object-contain"
      />
      <span className="text-[#E8192C] font-black text-base">×</span>
      <img
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/solar%20path%20logo-gb9aYzjnVnp3LFRgT565BJqotuLeRG.png"
        alt="Solar Path"
        className="h-7 object-contain"
        style={{ filter: 'invert(1) sepia(1) saturate(3) hue-rotate(10deg) brightness(0.6)' }}
      />
    </div>
  )
}

export function PageFooter() {
  return (
    <div className="flex items-center justify-between px-10 py-3 border-t border-[#E2E5EA]">
      <p className="text-[#9CA3AF] font-light italic" style={{ fontSize: '9px' }}>
        CONFIDENTIAL — ETOTO Media × Solar Path — March 2026
      </p>
      <p className="text-[#9CA3AF] font-medium" style={{ fontSize: '9px' }}>
        etotomedia.com
      </p>
    </div>
  )
}
