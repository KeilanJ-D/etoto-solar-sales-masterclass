export default function Page11Review() {
  return (
    <div className="w-full bg-[#F2F4F7] flex flex-col items-center justify-center" style={{ minHeight: '297mm' }}>
      <div className="border-4 border-[#E8192C] bg-white w-80 flex flex-col overflow-hidden">
        {/* Inner content */}
        <div className="flex flex-col items-center px-8 py-8 gap-4 text-center flex-1">
          {/* ETOTO E monogram */}
          <div className="w-12 h-12 rounded-full bg-[#E8192C] flex items-center justify-center">
            <span className="text-white font-black" style={{ fontSize: '20px' }}>E</span>
          </div>

          {/* Stars */}
          <div className="flex gap-1">
            {[1,2,3,4,5].map(i => (
              <span key={i} className="text-yellow-400" style={{ fontSize: '18px' }}>★</span>
            ))}
          </div>

          <p className="text-[#6B7280] font-extrabold uppercase tracking-widest" style={{ fontSize: '8.5px' }}>
            Rated 4.9 / 5.0 on Google
          </p>

          <p className="text-[#374151] leading-relaxed" style={{ fontSize: '10px' }}>
            Found today's conversation valuable? We'd massively appreciate a quick Google review — even just two lines to say the meeting was helpful. 30 seconds. Means the world.
          </p>

          <a
            href="https://www.google.com/search?q=ETOTO+Media+Reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#0A0A0A] text-white font-bold px-5 py-2.5 flex items-center gap-2 hover:bg-[#374151] transition-colors"
            style={{ fontSize: '10px' }}
          >
            <span className="text-yellow-400">★</span> Leave Us a Google Review
          </a>
        </div>

        {/* Footer strip */}
        <div className="bg-[#E8192C] py-2.5 px-4 text-center">
          <p className="text-white font-bold uppercase tracking-wide" style={{ fontSize: '7.5px' }}>
            ETOTO Media · etotomedia.com · The UK &amp; Ireland's #1 Growth Agency For Solar Installers
          </p>
        </div>
      </div>
    </div>
  )
}
