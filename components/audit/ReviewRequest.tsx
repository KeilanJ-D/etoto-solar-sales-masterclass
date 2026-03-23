export default function ReviewRequest() {
  return (
    <div className="page-container w-full max-w-[794px] bg-white shadow-2xl flex flex-col items-center justify-center" style={{ minHeight: '1123px' }}>
      {/* Outer frame */}
      <div className="border-4 border-[#E8192C] p-10 max-w-md w-full mx-auto">
        {/* Inner card */}
        <div className="flex flex-col items-center text-center">
          {/* ETOTO monogram */}
          <div className="w-16 h-16 bg-[#E8192C] flex items-center justify-center mb-6">
            <span className="text-white font-black text-2xl">E</span>
          </div>

          {/* Stars */}
          <div className="flex gap-1 mb-3">
            {[1,2,3,4,5].map(i => <span key={i} className="text-amber-400 text-xl">★</span>)}
          </div>

          {/* Rating */}
          <p className="text-[#6B7280] text-[10px] uppercase tracking-widest font-semibold mb-6">
            Rated 4.9 / 5.0 on Google
          </p>

          {/* Message */}
          <p className="text-[#374151] leading-relaxed mb-8" style={{ fontSize: '12px' }}>
            Found today's conversation valuable? We'd massively appreciate a quick Google review — even just two lines to say the meeting was helpful. 30 seconds. Means the world.
          </p>

          {/* CTA button */}
          <a 
            href="https://www.google.com/search?q=ETOTO+Media+Reviews"
            className="bg-[#0A0A0A] text-white font-bold px-8 py-3 text-[11px] uppercase tracking-wider hover:bg-[#1F2937] transition-colors"
          >
            ★ Leave Us a Google Review
          </a>
        </div>

        {/* Red footer strip */}
        <div className="bg-[#E8192C] -mx-10 -mb-10 mt-10 px-6 py-4 text-center">
          <p className="text-white text-[10px] font-medium">
            ETOTO Media · etotomedia.com · The UK & Ireland's #1 Growth Agency For Solar Installers
          </p>
        </div>
      </div>
    </div>
  )
}
