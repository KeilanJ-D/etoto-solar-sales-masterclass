'use client'

import Image from 'next/image'

interface ClientLogo {
  name: string
  logoUrl: string | null
}

interface ClientLogosProps {
  logos: ClientLogo[]
  title?: string
}

export function ClientLogos({ logos, title = 'Trusted by 200+ UK solar installers' }: ClientLogosProps) {
  return (
    <div className="py-8 sm:py-10 px-4 sm:px-6 bg-slate-900 border-y border-slate-800">
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-sm text-slate-400 mb-6">
          {title}
        </p>
        {/* Desktop: flex row */}
        <div className="hidden md:flex flex-wrap justify-center items-center gap-8 lg:gap-12">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="opacity-60 hover:opacity-100 transition-all duration-300"
            >
              {logo.logoUrl ? (
                <Image
                  src={logo.logoUrl}
                  alt={logo.name}
                  width={100}
                  height={40}
                  className="object-contain"
                  style={{ width: 'auto', height: 'auto', maxHeight: '40px', maxWidth: '100%' }}
                />
              ) : (
                <span className="text-sm font-semibold text-slate-300 whitespace-nowrap">{logo.name}</span>
              )}
            </div>
          ))}
        </div>
        {/* Mobile: horizontal scroll */}
        <div className="md:hidden flex gap-8 overflow-x-auto scrollbar-hide scroll-snap-x pb-2">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="flex-shrink-0 scroll-snap-start opacity-60"
            >
              {logo.logoUrl ? (
                <Image
                  src={logo.logoUrl}
                  alt={logo.name}
                  width={80}
                  height={32}
                  className="object-contain"
                  style={{ width: 'auto', height: 'auto', maxHeight: '24px', maxWidth: '100%' }}
                />
              ) : (
                <span className="text-xs font-semibold text-slate-300 whitespace-nowrap">{logo.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
