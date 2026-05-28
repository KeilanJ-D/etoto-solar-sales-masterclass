import Link from 'next/link'
import { Home, ArrowRight } from 'lucide-react'

// Custom 404 page — replaces Next.js's default black/white "404 | This page
// could not be found." with a branded surface that gives the visitor a way
// back into the deck.

export default function NotFound() {
  const suggestions: { href: string; label: string; sub: string }[] = [
    {
      href: '/',
      label: 'Home',
      sub: 'The Sell Solar Like You Built It overview',
    },
    {
      href: '/steps',
      label: 'The 9 Steps',
      sub: 'The full sales formula, step by step',
    },
    {
      href: '/formula-cheat-sheet',
      label: 'The Formula',
      sub: 'Four sums that close every solar deal',
    },
    {
      href: '/knowledge',
      label: 'Knowledge Library',
      sub: 'Inverter sizing, MPPTs, optimisers, glossary',
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-red-50/30 flex items-center justify-center px-6 py-16">
      <div className="max-w-2xl w-full text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-[#E8192C] mb-3">
          404 · Page not found
        </p>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 text-balance">
          That page isn&apos;t part of the Masterclass.
        </h1>
        <p className="text-slate-600 mb-10">
          Either you followed an old link, or the URL needs another look. Pick a place to
          jump back in:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 text-left">
          {suggestions.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group flex items-center gap-3 p-4 bg-white border border-slate-200 hover:border-[#E8192C]/40 hover:shadow-md rounded-xl transition-all"
            >
              <div className="flex-1">
                <p className="font-bold text-slate-900">{s.label}</p>
                <p className="text-sm text-slate-500">{s.sub}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#E8192C] group-hover:translate-x-0.5 transition-all" />
            </Link>
          ))}
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#E8192C] hover:bg-[#D01622] text-white font-semibold py-3 px-6 rounded-full transition-all shadow-lg shadow-[#E8192C]/20"
        >
          <Home className="w-4 h-4" />
          <span>Back to Masterclass home</span>
        </Link>
      </div>
    </main>
  )
}
