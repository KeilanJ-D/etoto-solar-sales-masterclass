'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Battery, Sparkles, Sun } from 'lucide-react'
import { type ReactNode, useState } from 'react'

export type SystemMode = 'solar-only' | 'hybrid' | 'battery-only'

interface ModeOption {
  id: SystemMode
  label: string
  icon: typeof Sun
  color: string
  description: string
}

const MODES: ModeOption[] = [
  {
    id: 'solar-only',
    label: 'Solar only',
    icon: Sun,
    color: '#F5921E',
    description:
      'Panels only — 30% self-consumed (when you\'re home), 70% exported at SEG rate. No battery to time-shift, no overnight coverage.',
  },
  {
    id: 'hybrid',
    label: 'Solar + Battery',
    icon: Sparkles,
    color: '#10b981',
    description:
      'The full stack. Battery covers evenings + mornings on cheap overnight grid. Solar covers the daytime. Self-consumption jumps to 70%+ and SEG export drops to 30%.',
  },
  {
    id: 'battery-only',
    label: 'Battery only',
    icon: Battery,
    color: '#3b82f6',
    description:
      'No panels — battery alone, doing a full charge/discharge cycle every day at the off-peak vs peak arbitrage spread. Works well for flats and small roofs.',
  },
]

interface AnimatedModeSwitchProps {
  initialMode?: SystemMode
  onChange?: (mode: SystemMode) => void
  /** Override descriptions per mode (defaults to the canonical SolaFlow text). */
  descriptions?: Partial<Record<SystemMode, ReactNode>>
}

/**
 * Three-way toggle between Solar-only / Hybrid / Battery-only with an
 * animated body that swaps as the user selects. Lifted in pattern from
 * the SolaFlow Estimator's AnimatedModeSwitch component.
 */
export default function AnimatedModeSwitch({
  initialMode = 'hybrid',
  onChange,
  descriptions,
}: AnimatedModeSwitchProps) {
  const [active, setActive] = useState<SystemMode>(initialMode)

  const handleSelect = (mode: SystemMode) => {
    setActive(mode)
    onChange?.(mode)
  }

  const activeMode = MODES.find((m) => m.id === active)!

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm my-6 sm:my-8">
      {/* Pill switcher */}
      <div className="p-1.5 bg-slate-100 m-3 sm:m-4 rounded-xl flex gap-1">
        {MODES.map((m) => {
          const Icon = m.icon
          const isActive = active === m.id
          return (
            <button
              key={m.id}
              onClick={() => handleSelect(m.id)}
              className="flex-1 relative px-3 sm:px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors"
              style={{
                color: isActive ? 'white' : '#475569',
              }}
            >
              {isActive && (
                <motion.span
                  layoutId="modeBg"
                  className="absolute inset-0 rounded-lg shadow-md"
                  style={{ backgroundColor: m.color }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative inline-flex items-center justify-center gap-1.5">
                <Icon className="w-4 h-4" />
                {m.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* Animated body */}
      <div className="px-5 sm:px-6 pb-5 sm:pb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <div
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${activeMode.color}20` }}
              >
                <activeMode.icon
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  style={{ color: activeMode.color }}
                />
              </div>
              <div className="flex-1">
                <p
                  className="text-xs font-semibold uppercase tracking-wider mb-1"
                  style={{ color: activeMode.color }}
                >
                  When you spec
                </p>
                <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
                  {descriptions?.[active] ?? activeMode.description}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
