import Link from 'next/link'

export default function ProductFooter() {
  return (
    <footer className="py-10 px-4 md:px-6 bg-slate-900 text-white">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="bg-white/10 rounded-xl px-4 py-3">
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ETOTO_Joel-Sp4sI6W29ziGLLM0CGKbh7tBi3HDbM.png" 
                alt="ETOTO Media" 
                className="h-6 w-auto object-contain"
              />
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors">
              Back to Masterclass
            </Link>
            <Link href="/complete-toolkit" className="text-slate-400 hover:text-white transition-colors">
              Complete Toolkit
            </Link>
            <Link href="/solaflow" className="text-slate-400 hover:text-white transition-colors">
              SolaFlow
            </Link>
            <a 
              href="https://calendly.com/etotomediakjd/intromeeting"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
            >
              Questions? Book a call
            </a>
            <a 
              href="mailto:keilan.jd@etotomedia.com" 
              className="text-slate-400 hover:text-white transition-colors"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-slate-800 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} ETOTO Media. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
