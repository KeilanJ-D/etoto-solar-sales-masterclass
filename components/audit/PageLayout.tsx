'use client'

interface PageLayoutProps {
  children: React.ReactNode
  sectionNumber?: string
  sectionTitle?: string
}

export function PageLayout({ children, sectionNumber, sectionTitle }: PageLayoutProps) {
  return (
    <div className="page-container w-full max-w-[794px] bg-white shadow-2xl flex flex-col" style={{ minHeight: '1123px' }}>
      <Header />
      <div className="flex-1 px-14 py-10 flex flex-col">
        {sectionNumber && sectionTitle && (
          <div className="flex items-baseline gap-5 mb-8">
            <span className="font-black text-[#E8192C] leading-none" style={{ fontSize: '56px' }}>{sectionNumber}</span>
            <h2 className="font-black text-[#0A0A0A] uppercase tracking-[0.08em]" style={{ fontSize: '15px' }}>
              {sectionTitle}
            </h2>
          </div>
        )}
        {children}
      </div>
      <Footer />
    </div>
  )
}

export function Header() {
  return (
    <header className="flex items-center justify-between px-14 py-5 border-b border-[#E5E7EB]">
      <img 
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Etoto%20logo%20%28Black%29-tn289JpGNWiyy62pa8d9DxYU9rejGO.png" 
        alt="ETOTO Media" 
        className="h-7"
      />
      <span className="text-[#E8192C] font-black text-base select-none">×</span>
      <img 
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/solar%20path%20logo-gb9aYzjnVnp3LFRgT565BJqotuLeRG.png" 
        alt="Solar Path" 
        className="h-7"
        style={{ filter: 'brightness(0) saturate(100%) invert(40%) sepia(85%) saturate(1500%) hue-rotate(10deg)' }}
      />
    </header>
  )
}

export function Footer() {
  return (
    <footer className="flex items-center justify-between px-14 py-4 border-t border-[#E5E7EB] mt-auto">
      <p className="text-[#9CA3AF] text-[9px] italic">
        CONFIDENTIAL — ETOTO Media × Solar Path — March 2026
      </p>
      <p className="text-[#9CA3AF] text-[9px] font-medium">
        etotomedia.com
      </p>
    </footer>
  )
}
