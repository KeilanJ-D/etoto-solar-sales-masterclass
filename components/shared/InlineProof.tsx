import { Quote, TrendingUp, Clock } from 'lucide-react'

interface InlineProofProps {
  quote: string
  context: string
  icon?: 'quote' | 'stat' | 'timeline'
  variant?: 'default' | 'compact' | 'highlight'
}

const iconMap = {
  quote: Quote,
  stat: TrendingUp,
  timeline: Clock,
}

export function InlineProof({ 
  quote, 
  context, 
  icon = 'quote',
  variant = 'default'
}: InlineProofProps) {
  const Icon = iconMap[icon]

  if (variant === 'compact') {
    return (
      <div className="my-4 pl-4 border-l-2 border-[#E8192C] py-2">
        <p className="text-sm text-slate-700 italic">&ldquo;{quote}&rdquo;</p>
        <p className="text-xs text-slate-500 mt-1">{context}</p>
      </div>
    )
  }

  if (variant === 'highlight') {
    return (
      <div className="my-6 bg-gradient-to-r from-[#E8192C]/10 to-transparent rounded-xl p-5 border-l-4 border-[#E8192C]">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-[#E8192C]/10 flex items-center justify-center flex-shrink-0">
            <Icon className="w-4 h-4 text-[#E8192C]" />
          </div>
          <div>
            <p className="text-slate-800 font-medium leading-relaxed">&ldquo;{quote}&rdquo;</p>
            <p className="text-sm text-slate-500 mt-2">{context}</p>
          </div>
        </div>
      </div>
    )
  }

  // Default variant
  return (
    <div className="my-6 bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
          <Icon className="w-4 h-4 text-slate-600" />
        </div>
        <div className="flex-1">
          <p className="text-slate-700 leading-relaxed italic">&ldquo;{quote}&rdquo;</p>
          <p className="text-sm text-slate-500 mt-2 font-medium">{context}</p>
        </div>
      </div>
    </div>
  )
}

// Quick stat variant for home page / one-liners
export function ProofStat({ 
  stat, 
  label,
  link 
}: { 
  stat: string
  label: string
  link?: string 
}) {
  const content = (
    <div className="bg-white rounded-xl border border-slate-200 p-4 hover:border-[#E8192C]/30 hover:shadow-md transition-all group">
      <p className="text-2xl sm:text-3xl font-black text-[#E8192C] mb-1">{stat}</p>
      <p className="text-sm text-slate-600">{label}</p>
    </div>
  )

  if (link) {
    return (
      <a href={link} className="block">
        {content}
      </a>
    )
  }

  return content
}
