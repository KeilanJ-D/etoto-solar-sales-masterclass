'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  Check,
  CheckCircle2,
  Copy,
  Download,
  Eye,
  EyeOff,
  Filter,
  ListChecks,
  Plus,
  Search,
  Sparkles,
  Target,
  Trash2,
  X,
} from 'lucide-react'
import {
  DISCOVERY_CATEGORIES,
  discoveryQuestions,
  type DiscoveryCategory,
  type DiscoveryQuestion,
} from '@/lib/discovery-questions'

type CategoryFilter = DiscoveryCategory | 'all'

/**
 * Interactive Customer Discovery Question Bank.
 *
 * Three modes layered on top of the same data:
 * 1. Browse — search + filter the 22-question library, flip cards to reveal answers
 * 2. Training mode — hides good/bad/what-you-learn until the rep clicks Reveal
 * 3. Build my flow — add questions to a script, reorder, copy/export as printable text
 *
 * Powered by lib/discovery-questions.ts. Same data also powers the
 * static playbook content on /systems/customer-discovery-mastery.
 */
export default function DiscoveryQuestionBank() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all')
  const [foundationalOnly, setFoundationalOnly] = useState(false)
  const [trainingMode, setTrainingMode] = useState(false)
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set())
  const [flowIds, setFlowIds] = useState<string[]>([])
  const [showFlow, setShowFlow] = useState(false)
  const [copyState, setCopyState] = useState<'idle' | 'copied'>('idle')

  const filteredQuestions = useMemo(() => {
    const q = search.toLowerCase().trim()
    return discoveryQuestions.filter((dq) => {
      if (activeCategory !== 'all' && dq.category !== activeCategory) return false
      if (foundationalOnly && !dq.foundational) return false
      if (!q) return true
      return (
        dq.question.toLowerCase().includes(q) ||
        dq.intent.toLowerCase().includes(q) ||
        dq.whatYouLearn.toLowerCase().includes(q)
      )
    })
  }, [search, activeCategory, foundationalOnly])

  const flowQuestions = useMemo(
    () => flowIds.map((id) => discoveryQuestions.find((q) => q.id === id)!).filter(Boolean),
    [flowIds],
  )

  const toggleInFlow = (id: string) =>
    setFlowIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )

  const moveInFlow = (id: string, direction: -1 | 1) => {
    setFlowIds((prev) => {
      const i = prev.indexOf(id)
      if (i === -1) return prev
      const j = i + direction
      if (j < 0 || j >= prev.length) return prev
      const next = [...prev]
      ;[next[i], next[j]] = [next[j], next[i]]
      return next
    })
  }

  const toggleReveal = (id: string) =>
    setRevealedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const isRevealed = (id: string) => !trainingMode || revealedIds.has(id)

  const copyFlowAsText = async () => {
    const lines: string[] = ['CUSTOMER DISCOVERY FLOW', '', '']
    flowQuestions.forEach((q, i) => {
      const cat = DISCOVERY_CATEGORIES[q.category]
      lines.push(`${i + 1}. [${cat.label.toUpperCase()}] ${q.question}`)
      lines.push(`   Intent: ${q.intent}`)
      lines.push(`   Why ask: ${q.whyAsk}`)
      lines.push('')
    })
    lines.push('')
    lines.push('Generated from the ETOTO Solar Sales Masterclass — Customer Discovery Question Bank.')
    try {
      await navigator.clipboard.writeText(lines.join('\n'))
      setCopyState('copied')
      setTimeout(() => setCopyState('idle'), 2000)
    } catch {
      // ignore
    }
  }

  const clearFlow = () => setFlowIds([])

  return (
    <div className="my-8 sm:my-10 bg-white border-2 border-[#E8192C]/20 rounded-2xl overflow-hidden shadow-lg">
      {/* HEADER */}
      <header className="bg-gradient-to-br from-slate-900 to-slate-800 text-white px-5 sm:px-7 py-5 sm:py-6">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Target className="w-4 h-4 text-[#F5921E]" />
              <p className="text-xs font-bold uppercase tracking-widest text-[#F5921E]">
                Interactive question bank
              </p>
            </div>
            <h3 className="font-black text-lg sm:text-xl mb-1">
              The Customer Discovery Library
            </h3>
            <p className="text-sm text-slate-300">
              {discoveryQuestions.length} questions across 6 categories. Filter, search,
              flip to reveal answers, build your own discovery script.
            </p>
          </div>
          <button
            onClick={() => setTrainingMode((m) => !m)}
            className={`flex items-center gap-2 text-xs font-bold px-3 py-2 rounded-full border transition-all ${
              trainingMode
                ? 'bg-amber-400 text-amber-950 border-amber-300'
                : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
            }`}
          >
            {trainingMode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            {trainingMode ? 'Training mode ON' : 'Training mode OFF'}
          </button>
        </div>
        {trainingMode && (
          <p className="mt-2 text-xs text-amber-200 bg-amber-900/30 border border-amber-700/30 rounded-md px-3 py-2">
            Training mode: answers hidden by default. Tap each question to reveal.
          </p>
        )}
      </header>

      {/* FILTERS */}
      <div className="px-5 sm:px-7 py-4 border-b border-slate-200 bg-slate-50 space-y-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by question, intent, or what you learn..."
            className="w-full pl-9 pr-9 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#E8192C]/20 focus:border-[#E8192C] outline-none bg-white"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter chips */}
        <div className="flex items-center gap-2 overflow-x-auto -mx-1 px-1">
          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 flex-shrink-0">
            <Filter className="w-3 h-3" />
            Filter
          </span>
          <CategoryChip
            active={activeCategory === 'all'}
            onClick={() => setActiveCategory('all')}
            label={`All (${discoveryQuestions.length})`}
            color="bg-slate-900 text-white"
          />
          {(Object.entries(DISCOVERY_CATEGORIES) as [DiscoveryCategory, typeof DISCOVERY_CATEGORIES.energy][]).map(
            ([key, meta]) => {
              const count = discoveryQuestions.filter((q) => q.category === key).length
              return (
                <CategoryChip
                  key={key}
                  active={activeCategory === key}
                  onClick={() => setActiveCategory(key)}
                  label={`${meta.label} (${count})`}
                  color={meta.color}
                />
              )
            },
          )}
        </div>

        {/* Foundational toggle */}
        <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
          <input
            type="checkbox"
            checked={foundationalOnly}
            onChange={(e) => setFoundationalOnly(e.target.checked)}
            className="w-4 h-4 accent-[#E8192C]"
          />
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Show only foundational questions (every new rep should master these first)
        </label>
      </div>

      {/* CARD GRID */}
      <div className="p-5 sm:p-7">
        <p className="text-xs text-slate-500 mb-4">
          {filteredQuestions.length} of {discoveryQuestions.length} questions
        </p>

        {filteredQuestions.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <p>No questions match this filter. Try clearing search or filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredQuestions.map((q) => (
              <QuestionCard
                key={q.id}
                q={q}
                inFlow={flowIds.includes(q.id)}
                revealed={isRevealed(q.id)}
                trainingMode={trainingMode}
                onToggleFlow={() => toggleInFlow(q.id)}
                onReveal={() => toggleReveal(q.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* FLOATING FLOW CART */}
      <AnimatePresence>
        {flowIds.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40"
          >
            <button
              onClick={() => setShowFlow(true)}
              className="flex items-center gap-2 bg-[#E8192C] hover:bg-[#D01622] text-white font-bold py-3 px-5 rounded-full shadow-2xl shadow-[#E8192C]/30 transition-all hover:scale-105"
            >
              <ListChecks className="w-4 h-4" />
              {flowIds.length} {flowIds.length === 1 ? 'question' : 'questions'} in your flow
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOW DRAWER */}
      <AnimatePresence>
        {showFlow && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-50"
              onClick={() => setShowFlow(false)}
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-[500px] bg-white z-50 shadow-2xl overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-slate-200 px-5 py-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#E8192C]">
                    My discovery flow
                  </p>
                  <h3 className="font-black text-slate-900">
                    {flowQuestions.length}{' '}
                    {flowQuestions.length === 1 ? 'question' : 'questions'}
                  </h3>
                </div>
                <button
                  onClick={() => setShowFlow(false)}
                  className="text-slate-500 hover:text-slate-900 p-1"
                  aria-label="Close flow drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-5 space-y-3">
                {flowQuestions.length === 0 ? (
                  <p className="text-sm text-slate-500 text-center py-10">
                    No questions added yet.
                  </p>
                ) : (
                  flowQuestions.map((q, i) => {
                    const meta = DISCOVERY_CATEGORIES[q.category]
                    return (
                      <div
                        key={q.id}
                        className="bg-white border border-slate-200 rounded-lg p-3"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-7 h-7 rounded-full bg-slate-900 text-white text-xs font-black flex items-center justify-center flex-shrink-0">
                            {i + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap mb-1">
                              <span
                                className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${meta.color} border`}
                              >
                                {meta.label}
                              </span>
                            </div>
                            <p className="text-sm font-semibold text-slate-900 leading-snug mb-2">
                              {q.question}
                            </p>
                            <p className="text-xs text-slate-500 italic">{q.intent}</p>
                          </div>
                          <div className="flex flex-col gap-1 flex-shrink-0">
                            <button
                              onClick={() => moveInFlow(q.id, -1)}
                              disabled={i === 0}
                              className="text-slate-400 hover:text-slate-900 disabled:opacity-30 disabled:hover:text-slate-400 p-1"
                              aria-label="Move up"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => moveInFlow(q.id, 1)}
                              disabled={i === flowQuestions.length - 1}
                              className="text-slate-400 hover:text-slate-900 disabled:opacity-30 disabled:hover:text-slate-400 p-1"
                              aria-label="Move down"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => toggleInFlow(q.id)}
                              className="text-slate-400 hover:text-red-600 p-1"
                              aria-label="Remove"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>

              {flowQuestions.length > 0 && (
                <div className="sticky bottom-0 bg-white border-t border-slate-200 p-4 space-y-2">
                  <button
                    onClick={copyFlowAsText}
                    className="w-full flex items-center justify-center gap-2 bg-[#E8192C] hover:bg-[#D01622] text-white font-bold py-3 px-5 rounded-xl transition-all shadow-md"
                  >
                    {copyState === 'copied' ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied to clipboard!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy as script text
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="w-full flex items-center justify-center gap-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold py-2.5 px-5 rounded-xl transition-all text-sm"
                  >
                    <Download className="w-4 h-4" />
                    Print (or Save as PDF)
                  </button>
                  <button
                    onClick={clearFlow}
                    className="w-full text-xs text-slate-500 hover:text-red-600 py-1"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

// ============================================
// CATEGORY CHIP
// ============================================

function CategoryChip({
  active,
  onClick,
  label,
  color,
}: {
  active: boolean
  onClick: () => void
  label: string
  color: string
}) {
  return (
    <button
      onClick={onClick}
      className={`text-xs font-semibold px-2.5 py-1.5 rounded-full whitespace-nowrap transition-all flex-shrink-0 border ${
        active ? color : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
      }`}
    >
      {label}
    </button>
  )
}

// ============================================
// QUESTION CARD
// ============================================

function QuestionCard({
  q,
  inFlow,
  revealed,
  trainingMode,
  onToggleFlow,
  onReveal,
}: {
  q: DiscoveryQuestion
  inFlow: boolean
  revealed: boolean
  trainingMode: boolean
  onToggleFlow: () => void
  onReveal: () => void
}) {
  const meta = DISCOVERY_CATEGORIES[q.category]
  return (
    <div
      className={`bg-white rounded-xl border-2 transition-all ${
        inFlow
          ? 'border-[#E8192C]/40 shadow-md'
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      <div className="p-4 sm:p-5">
        <div className="flex items-center gap-1.5 mb-2 flex-wrap">
          <span
            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${meta.color}`}
          >
            {meta.label}
          </span>
          {q.foundational && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
              <Sparkles className="w-2.5 h-2.5" />
              Foundational
            </span>
          )}
        </div>

        <p className="font-bold text-slate-900 text-sm sm:text-base leading-snug mb-2 italic">
          &ldquo;{q.question}&rdquo;
        </p>
        <p className="text-xs text-slate-500 mb-3">{q.intent}</p>

        {trainingMode && !revealed ? (
          <button
            onClick={onReveal}
            className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-slate-700 border border-dashed border-slate-300 rounded-lg py-2.5 hover:bg-slate-50"
          >
            <Eye className="w-4 h-4" />
            Reveal answers
          </button>
        ) : (
          <div className="space-y-2 text-xs">
            <AnswerRow label="Why we ask" body={q.whyAsk} tone="neutral" />
            <AnswerRow label="Good answer" body={q.goodAnswer} tone="good" />
            <AnswerRow label="Bad answer" body={q.badAnswer} tone="bad" />
            <AnswerRow label="What you learn" body={q.whatYouLearn} tone="primary" />
          </div>
        )}

        <button
          onClick={onToggleFlow}
          className={`mt-3 w-full flex items-center justify-center gap-1.5 text-xs font-bold py-2 px-3 rounded-lg transition-all ${
            inFlow
              ? 'bg-[#E8192C] text-white hover:bg-[#D01622]'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          {inFlow ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5" /> Added to your flow
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" /> Add to my flow
            </>
          )}
        </button>
      </div>
    </div>
  )
}

function AnswerRow({
  label,
  body,
  tone,
}: {
  label: string
  body: string
  tone: 'neutral' | 'good' | 'bad' | 'primary'
}) {
  const toneStyles = {
    neutral: { labelColor: 'text-slate-500', bg: 'bg-slate-50', icon: null as React.ReactNode },
    good: {
      labelColor: 'text-emerald-700',
      bg: 'bg-emerald-50 border border-emerald-200',
      icon: <CheckCircle2 className="w-3 h-3 text-emerald-600 inline mr-1" />,
    },
    bad: {
      labelColor: 'text-red-700',
      bg: 'bg-red-50 border border-red-200',
      icon: <AlertTriangle className="w-3 h-3 text-red-600 inline mr-1" />,
    },
    primary: {
      labelColor: 'text-[#E8192C]',
      bg: 'bg-[#E8192C]/5 border border-[#E8192C]/20',
      icon: <Target className="w-3 h-3 text-[#E8192C] inline mr-1" />,
    },
  }[tone]
  return (
    <div className={`rounded p-2 ${toneStyles.bg}`}>
      <p className={`text-[10px] font-bold uppercase tracking-wide mb-0.5 ${toneStyles.labelColor}`}>
        {toneStyles.icon}
        {label}
      </p>
      <p className="text-slate-700 leading-relaxed">{body}</p>
    </div>
  )
}
