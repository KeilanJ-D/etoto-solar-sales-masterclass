'use client'

import { useState, useMemo } from 'react'
import SalesStep, { KeyLine } from './SalesStep'
import { ChevronDown, DollarSign, Clock, TrendingDown, Users, AlertTriangle, Search } from 'lucide-react'

const objections = [
  {
    icon: DollarSign,
    title: '"That\'s more expensive than another quote."',
    keywords: ['expensive', 'price', 'cost', 'cheap', 'quote', 'money', 'afford'],
    response: {
      validate: '"That\'s completely fair — big price differences are very common in solar."',
      reframe: '"What we\'re looking at is a lifetime investment. It\'s one of the largest purchases you\'ll make besides your home."',
      differentiate: [
        'Battery quality and expandability (stackable vs stuck)',
        'Panel efficiency and warranty length',
        'Installer track record and volume',
        'Long-term reliability — fewer issues = better returns',
      ],
      never: 'Bash the competitor by name. Let the numbers speak.',
      example: 'Mark said "you are the highest end." Keilan responded with modularity (stackable SIG batteries vs the competitor\'s non-expandable 5.2 kWh), product quality, and the fact that cheapest quote = stuck with a battery you can\'t grow. Mark ruled out the cheapest quote himself.',
    },
  },
  {
    icon: Clock,
    title: '"I need to think about it."',
    keywords: ['think', 'consider', 'decide', 'time', 'wait', 'later', 'unsure'],
    response: {
      validate: '"Absolutely."',
      reframe: '"What specifically would help you decide — is it the numbers, the product choice, or the timing?"',
      tip: 'Get specific. "Think about it" usually means one unanswered question. Find it and answer it.',
    },
  },
  {
    icon: TrendingDown,
    title: '"I\'m waiting for prices to drop."',
    keywords: ['price', 'drop', 'wait', 'cheaper', 'future', 'fall', 'decrease'],
    response: {
      validate: '"Panel prices have dropped..."',
      reframe: '"...but 0% VAT ends March 2027 — that\'s a £500-£1,600 saving you\'ll lose. And every month without a battery, you\'re paying £65 more than you need to."',
      tip: 'Quantify the cost of waiting. Don\'t argue — calculate.',
    },
  },
  {
    icon: Users,
    title: '"My partner needs to agree."',
    keywords: ['partner', 'wife', 'husband', 'spouse', 'family', 'discuss', 'together'],
    response: {
      validate: '"Of course."',
      reframe: '"Want me to send everything in writing so they can see exactly what we discussed? Or better yet, would it help if I jumped on a quick call with both of you?"',
      tip: 'Never fight this. Facilitate the second conversation.',
    },
  },
  {
    icon: AlertTriangle,
    title: '"I\'ve heard bad things about solar companies."',
    keywords: ['bad', 'scam', 'trust', 'heard', 'stories', 'reliable', 'cowboy', 'reviews'],
    response: {
      validate: '"You\'re absolutely right to be cautious."',
      reframe: '"Here\'s what separates us: MCS certification, RECC consumer protection, Section 75 payment protection on your deposit, and we install 100+ systems per month — we\'re not going anywhere."',
      tip: 'Turn it into a trust-building moment, not a defensive one.',
    },
  },
]

export default function Step7Objections() {
  const [expanded, setExpanded] = useState<number | null>(0)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredObjections = useMemo(() => {
    if (!searchQuery.trim()) return objections
    
    const query = searchQuery.toLowerCase()
    return objections.filter(obj => 
      obj.title.toLowerCase().includes(query) ||
      obj.keywords.some(keyword => keyword.includes(query))
    )
  }, [searchQuery])

  const highlightedIndex = useMemo(() => {
    if (!searchQuery.trim() || filteredObjections.length === 0) return null
    // Find the original index of the first filtered result
    return objections.findIndex(obj => obj === filteredObjections[0])
  }, [searchQuery, filteredObjections])

  return (
    <SalesStep
      id="step-7"
      stepNumber={7}
      title="Handle Objections with Data, Not Pressure"
      goal="Every objection has a numbers-based answer."
    >
      {/* Search Input */}
      <div className="mb-6">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              // Auto-expand the first matching result
              if (e.target.value.trim()) {
                const query = e.target.value.toLowerCase()
                const matchIndex = objections.findIndex(obj => 
                  obj.title.toLowerCase().includes(query) ||
                  obj.keywords.some(keyword => keyword.includes(query))
                )
                if (matchIndex !== -1) setExpanded(matchIndex)
              }
            }}
            placeholder='What did the customer say? (e.g. "expensive", "partner")'
            className="w-full pl-12 pr-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-[#E8192C] focus:border-[#E8192C] outline-none transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              &times;
            </button>
          )}
        </div>
        {searchQuery && filteredObjections.length === 0 && (
          <p className="text-center text-sm text-slate-500 mt-2">No matching objections found. Try different keywords.</p>
        )}
      </div>

      <div className="space-y-4 mb-8">
        {(searchQuery ? filteredObjections : objections).map((objection, displayIndex) => {
          const Icon = objection.icon
          // Find the actual index in the original array
          const actualIndex = objections.findIndex(obj => obj === objection)
          const isExpanded = expanded === actualIndex
          const isHighlighted = highlightedIndex === actualIndex && searchQuery.trim()
          
          return (
            <div 
              key={actualIndex}
              className={`bg-white dark:bg-slate-800 border rounded-xl overflow-hidden transition-all duration-300 ${
                isExpanded ? 'border-[#E8192C] shadow-lg' : isHighlighted ? 'border-[#F5921E] shadow-md' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <button
                onClick={() => setExpanded(isExpanded ? null : actualIndex)}
                className="w-full flex items-center gap-4 p-5 text-left"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                  isExpanded ? 'bg-[#E8192C] text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-bold text-slate-900 dark:text-white flex-1 text-sm md:text-base">{objection.title}</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
              </button>
              
              {isExpanded && (
                <div className="px-5 pb-5 animate-fade-in-up">
                  <div className="space-y-4 pl-14">
                    {objection.response.validate && (
                      <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4 rounded-r-lg">
                        <p className="text-xs font-semibold text-green-700 dark:text-green-400 uppercase tracking-wide mb-1">Validate</p>
                        <p className="text-slate-700 dark:text-slate-300 text-sm">{objection.response.validate}</p>
                      </div>
                    )}
                    
                    {objection.response.reframe && (
                      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-lg">
                        <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 uppercase tracking-wide mb-1">Reframe</p>
                        <p className="text-slate-700 dark:text-slate-300 text-sm">{objection.response.reframe}</p>
                      </div>
                    )}
                    
                    {objection.response.differentiate && (
                      <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
                        <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-2">Differentiate</p>
                        <ul className="space-y-1">
                          {objection.response.differentiate.map((item, i) => (
                            <li key={i} className="text-slate-700 dark:text-slate-300 text-sm flex items-start gap-2">
                              <span className="text-[#E8192C]">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {objection.response.never && (
                      <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r-lg">
                        <p className="text-xs font-semibold text-red-700 dark:text-red-400 uppercase tracking-wide mb-1">Never</p>
                        <p className="text-slate-700 dark:text-slate-300 text-sm">{objection.response.never}</p>
                      </div>
                    )}
                    
                    {objection.response.tip && (
                      <div className="bg-[#F5921E]/10 dark:bg-[#F5921E]/20 border-l-4 border-[#F5921E] p-4 rounded-r-lg">
                        <p className="text-xs font-semibold text-[#F5921E] uppercase tracking-wide mb-1">Pro Tip</p>
                        <p className="text-slate-700 dark:text-slate-300 text-sm">{objection.response.tip}</p>
                      </div>
                    )}
                    
                    {objection.response.example && (
                      <div className="bg-slate-900 text-white p-4 rounded-lg">
                        <p className="text-xs font-semibold text-[#E8192C] uppercase tracking-wide mb-1">From the Real Call</p>
                        <p className="text-slate-300 text-sm italic">{objection.response.example}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <KeyLine>
        Never argue. Validate the concern, then answer it with data. If they say you&apos;re expensive, show them why. If they need time, give them what they need to decide. Pressure loses deals. Transparency closes them.
      </KeyLine>
    </SalesStep>
  )
}
