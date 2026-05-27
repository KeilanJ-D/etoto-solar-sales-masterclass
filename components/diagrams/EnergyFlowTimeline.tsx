'use client'

import { motion } from 'framer-motion'
import DiagramShell, { LegendItem } from './DiagramShell'

const AMBER = '#F5921E'
const RED = '#E8192C'
const EMERALD = '#10b981'
const BLUE = '#3b82f6'
const SLATE = '#94a3b8'

/**
 * 24-hour energy flow visualization showing how solar + battery + grid
 * interact across the day. Sun arc rises and sets, house load curve shows
 * morning + evening peaks, battery state-of-charge dips and recovers.
 */
export default function EnergyFlowTimeline() {
  // Curve points generated mathematically below in the SVG paths
  return (
    <DiagramShell
      eyebrow="Daily energy flow"
      title="How solar + battery + grid interact across 24 hours"
      caption="The sun arc, household load, and battery state-of-charge all overlap in time. Where they don't align is where the battery + grid earn their money."
      fullWidth
      legend={
        <>
          <LegendItem color={AMBER} label="Solar generation (sun arc)" />
          <LegendItem color={EMERALD} label="Battery state of charge" />
          <LegendItem color={BLUE} label="House load (peak morning + evening)" />
          <LegendItem color={RED} label="Grid import / export" />
        </>
      }
    >
      <svg
        viewBox="0 0 900 380"
        className="w-full h-auto"
        role="img"
        aria-label="24-hour energy flow timeline diagram"
      >
        {/* Background gradient (night → day → night) */}
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="20%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#fef3c7" />
            <stop offset="80%" stopColor="#fb923c" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <linearGradient id="solarFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={AMBER} stopOpacity="0.4" />
            <stop offset="100%" stopColor={AMBER} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="batteryFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={EMERALD} stopOpacity="0.3" />
            <stop offset="100%" stopColor={EMERALD} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Sky strip */}
        <rect x="60" y="20" width="820" height="22" rx="2" fill="url(#skyGrad)" />

        {/* Animated sun moving across */}
        <motion.circle
          r="14"
          fill={AMBER}
          cy="31"
          initial={{ cx: 60, opacity: 0 }}
          animate={{
            cx: [60, 880, 60],
            opacity: [0, 1, 1, 1, 0],
          }}
          transition={{
            duration: 10,
            times: [0, 0.05, 0.5, 0.95, 1],
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Chart background */}
        <rect x="60" y="60" width="820" height="240" fill="#f8fafc" rx="4" />

        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={`gh-${i}`}
            x1="60"
            y1={60 + i * 60}
            x2="880"
            y2={60 + i * 60}
            stroke="#e2e8f0"
            strokeWidth="1"
            strokeDasharray="2 4"
          />
        ))}

        {/* Time-of-day x-axis labels */}
        {[
          { x: 60, label: '00:00', sub: 'night' },
          { x: 200, label: '06:00', sub: 'dawn' },
          { x: 340, label: '09:00', sub: 'morning peak' },
          { x: 470, label: '12:00', sub: 'midday' },
          { x: 600, label: '15:00', sub: 'afternoon' },
          { x: 740, label: '18:00', sub: 'evening peak' },
          { x: 880, label: '24:00', sub: 'night' },
        ].map((t, i) => (
          <g key={i}>
            <line
              x1={t.x}
              y1="300"
              x2={t.x}
              y2="305"
              stroke="#cbd5e1"
              strokeWidth="1"
            />
            <text
              x={t.x}
              y="320"
              textAnchor="middle"
              fontSize="11"
              fill="#64748b"
              fontWeight="600"
            >
              {t.label}
            </text>
            <text
              x={t.x}
              y="335"
              textAnchor="middle"
              fontSize="9"
              fill="#94a3b8"
              fontStyle="italic"
            >
              {t.sub}
            </text>
          </g>
        ))}

        {/* SOLAR GENERATION (sun arc — bell curve peaking at noon) */}
        <path
          d="M 60 280 Q 200 280 340 180 Q 470 80 600 180 Q 740 280 880 280 L 880 280 L 60 280 Z"
          fill="url(#solarFill)"
        />
        <motion.path
          d="M 60 280 Q 200 280 340 180 Q 470 80 600 180 Q 740 280 880 280"
          fill="none"
          stroke={AMBER}
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
        <text x="475" y="100" textAnchor="middle" fontSize="11" fill={AMBER} fontWeight="700">
          Solar peak ~12:30
        </text>

        {/* HOUSE LOAD (M-shaped curve — morning + evening peaks) */}
        <motion.path
          d="M 60 220 Q 150 220 220 200 Q 280 180 340 110 Q 400 220 470 230 Q 540 220 600 200 Q 680 110 750 110 Q 820 200 880 220"
          fill="none"
          stroke={BLUE}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="6 4"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
        />
        <text x="340" y="105" textAnchor="middle" fontSize="11" fill={BLUE} fontWeight="700">
          Morning peak
        </text>
        <text x="750" y="105" textAnchor="middle" fontSize="11" fill={BLUE} fontWeight="700">
          Evening peak
        </text>

        {/* BATTERY SOC (charges overnight, discharges evening) */}
        <path
          d="M 60 130 L 60 90 L 200 90 L 340 130 L 470 110 L 600 110 L 740 240 L 880 130 L 880 280 L 60 280 Z"
          fill="url(#batteryFill)"
        />
        <motion.path
          d="M 60 90 L 200 90 L 340 130 L 470 110 L 600 110 L 740 240 L 880 130"
          fill="none"
          stroke={EMERALD}
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.6, ease: 'easeOut' }}
        />
        <text x="140" y="80" textAnchor="middle" fontSize="11" fill={EMERALD} fontWeight="700">
          ↓ Off-peak charge (cheap grid)
        </text>
        <text x="760" y="260" textAnchor="middle" fontSize="11" fill={EMERALD} fontWeight="700">
          ↑ Evening discharge
        </text>

        {/* Annotations — money zones */}
        <g>
          {/* Money zone 1: morning peak */}
          <rect
            x="280"
            y="60"
            width="120"
            height="60"
            fill={RED}
            opacity="0.06"
            rx="4"
          />
          <text x="340" y="80" textAnchor="middle" fontSize="10" fill={RED} fontWeight="700">
            ⚡ Battery covers
          </text>
          <text x="340" y="95" textAnchor="middle" fontSize="10" fill={RED} fontWeight="700">
            morning peak
          </text>
          {/* Money zone 2: evening peak */}
          <rect
            x="700"
            y="60"
            width="120"
            height="60"
            fill={RED}
            opacity="0.06"
            rx="4"
          />
          <text x="760" y="80" textAnchor="middle" fontSize="10" fill={RED} fontWeight="700">
            ⚡ Battery covers
          </text>
          <text x="760" y="95" textAnchor="middle" fontSize="10" fill={RED} fontWeight="700">
            evening peak
          </text>
        </g>

        {/* Y-axis label */}
        <text
          x="20"
          y="180"
          fontSize="11"
          fill="#64748b"
          fontWeight="600"
          transform="rotate(-90 20 180)"
        >
          Power (kW)
        </text>

        {/* X-axis baseline */}
        <line x1="60" y1="300" x2="880" y2="300" stroke="#94a3b8" strokeWidth="2" />

        {/* Bottom annotation */}
        <text
          x="470"
          y="365"
          textAnchor="middle"
          fontSize="12"
          fill="#64748b"
          fontStyle="italic"
        >
          The gap between solar generation and house load is where the battery + grid earn (and save) money.
        </text>
      </svg>
    </DiagramShell>
  )
}
