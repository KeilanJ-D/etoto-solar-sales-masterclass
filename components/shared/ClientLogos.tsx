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
                <div className="h-10 w-auto relative" style={{ width: '120px', height: '40px' }}>
                  {/* brightness(0) invert(1): client logo PNGs are mixed
                      colour/greyscale designed for light backgrounds. On dark
                      navy most disappear. Force a uniform white so every logo
                      contrasts equally, then dim with opacity for a tasteful
                      "trusted by" wall (full colour returns on hover). */}
                  <Image
                    src={logo.logoUrl}
                    alt={logo.name}
                    fill
                    sizes="120px"
                    className="object-contain [filter:brightness(0)_invert(1)] hover:[filter:none] transition-[filter] duration-300"
                  />
                </div>
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
                <div className="h-6 w-auto relative" style={{ width: '80px', height: '24px' }}>
                  <Image
                    src={logo.logoUrl}
                    alt={logo.name}
                    fill
                    sizes="80px"
                    className="object-contain [filter:brightness(0)_invert(1)]"
                  />
                </div>
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
