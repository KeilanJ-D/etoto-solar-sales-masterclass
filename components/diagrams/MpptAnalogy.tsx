'use client'

import { motion } from 'framer-motion'
import DiagramShell, { LegendItem } from './DiagramShell'

const RED = '#E8192C'
const AMBER = '#F5921E'
const EMERALD = '#10b981'
const SLATE = '#475569'

/**
 * MPPT (Maximum Power Point Tracker) explained as cruise control.
 * Left: car cruise control adjusting throttle to maintain speed
 * across changing conditions (uphill/downhill).
 * Right: inverter MPPT adjusting voltage to extract max power
 * across changing conditions (sun/cloud/shade).
 *
 * The whole point: both systems continuously seek the optimum
 * operating point, even as conditions change.
 */
export default function MpptAnalogy() {
  return (
    <DiagramShell
      eyebrow="MPPT explained"
      title="What an MPPT actually does — the cruise control analogy"
      caption="Cruise control adjusts the throttle to hold a target speed across changing road conditions. An MPPT adjusts the voltage to extract maximum power across changing sun conditions. Same idea, different lever."
      fullWidth
      scrollOnMobile
      mobileMinWidth={900}
      legend={
        <>
          <LegendItem color={SLATE} label="Driver / sun input" />
          <LegendItem color={AMBER} label="Output (throttle / voltage)" />
          <LegendItem color={EMERALD} label="Target (speed / max power)" />
        </>
      }
    >
      <svg
        viewBox="0 0 900 380"
        className="w-full h-auto"
        role="img"
        aria-label="MPPT cruise control analogy diagram"
      >
        {/* LEFT: CRUISE CONTROL */}
        <g transform="translate(40 30)">
          <text x="200" y="14" textAnchor="middle" fontSize="13" fill="#0f172a" fontWeight="800">
            Cruise control in your car
          </text>

          {/* Road profile */}
          <path
            d="M 0 200 L 80 200 L 140 160 L 220 160 L 280 220 L 360 220 L 400 200"
            fill="none"
            stroke={SLATE}
            strokeWidth="3"
          />
          <path
            d="M 0 200 L 80 200 L 140 160 L 220 160 L 280 220 L 360 220 L 400 200 L 400 270 L 0 270 Z"
            fill="#cbd5e1"
            opacity="0.4"
          />
          <text x="100" y="195" fontSize="9" fill="#64748b">flat</text>
          <text x="180" y="155" fontSize="9" fill="#64748b">uphill</text>
          <text x="320" y="215" fontSize="9" fill="#64748b">downhill</text>

          {/* Car (animated) */}
          <motion.g
            initial={{ x: 0 }}
            animate={{ x: [0, 380, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <g transform="translate(0 178)">
              <rect x="0" y="-4" width="40" height="18" rx="4" fill={RED} />
              <rect x="6" y="-12" width="22" height="10" rx="2" fill="#0f172a" />
              <circle cx="9" cy="16" r="5" fill="#1e293b" />
              <circle cx="31" cy="16" r="5" fill="#1e293b" />
            </g>
          </motion.g>

          {/* Speedometer dial (left) */}
          <g transform="translate(20 50)">
            <circle cx="40" cy="40" r="32" fill="white" stroke={SLATE} strokeWidth="2" />
            {/* Tick marks */}
            {[-120, -90, -60, -30, 0, 30, 60, 90, 120].map((deg, i) => {
              const rad = (deg * Math.PI) / 180
              const x1 = 40 + Math.cos(rad - Math.PI / 2) * 26
              const y1 = 40 + Math.sin(rad - Math.PI / 2) * 26
              const x2 = 40 + Math.cos(rad - Math.PI / 2) * 30
              const y2 = 40 + Math.sin(rad - Math.PI / 2) * 30
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={SLATE}
                  strokeWidth="1.5"
                />
              )
            })}
            {/* Needle — stays at 70 (the target) */}
            <motion.line
              x1="40"
              y1="40"
              x2="40"
              y2="18"
              stroke={EMERALD}
              strokeWidth="2.5"
              strokeLinecap="round"
              animate={{ rotate: [-2, 2, -2] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: '40px 40px' }}
            />
            <circle cx="40" cy="40" r="3" fill={EMERALD} />
            <text x="40" y="92" textAnchor="middle" fontSize="9" fill="#64748b" fontWeight="600">
              Target: 70 mph
            </text>
          </g>

          {/* Throttle gauge (right) — animates with terrain */}
          <g transform="translate(330 50)">
            <rect width="50" height="60" rx="4" fill="white" stroke={SLATE} strokeWidth="2" />
            <motion.rect
              x="4"
              y="4"
              width="42"
              animate={{ height: [20, 50, 30, 20] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              fill={AMBER}
              style={{ transformOrigin: 'center bottom' }}
            />
            <text x="25" y="80" textAnchor="middle" fontSize="9" fill="#64748b" fontWeight="600">
              Throttle
            </text>
          </g>

          {/* Caption */}
          <text x="200" y="310" textAnchor="middle" fontSize="11" fill="#0f172a" fontWeight="700">
            Throttle ↑ uphill, ↓ downhill, all to hold 70.
          </text>
        </g>

        {/* DIVIDER */}
        <line x1="450" y1="40" x2="450" y2="320" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />

        {/* RIGHT: MPPT */}
        <g transform="translate(490 30)">
          <text x="180" y="14" textAnchor="middle" fontSize="13" fill="#0f172a" fontWeight="800">
            MPPT in your inverter
          </text>

          {/* Sun conditions strip (cloudy → sunny → shaded → sunny) */}
          <g transform="translate(0 60)">
            {[
              { x: 0, w: 90, label: 'cloudy', icon: '☁' },
              { x: 90, w: 90, label: 'sunny', icon: '☀' },
              { x: 180, w: 90, label: 'shaded', icon: '◐' },
              { x: 270, w: 90, label: 'sunny', icon: '☀' },
            ].map((s, i) => (
              <g key={i}>
                <rect x={s.x} y="0" width={s.w} height="60" fill="#f1f5f9" stroke={SLATE} strokeWidth="0.5" />
                <text
                  x={s.x + s.w / 2}
                  y="32"
                  textAnchor="middle"
                  fontSize="22"
                  fill={AMBER}
                >
                  {s.icon}
                </text>
                <text
                  x={s.x + s.w / 2}
                  y="50"
                  textAnchor="middle"
                  fontSize="9"
                  fill="#64748b"
                  fontWeight="600"
                >
                  {s.label}
                </text>
              </g>
            ))}
          </g>

          {/* Power output dial (left) — animates more than cruise control */}
          <g transform="translate(20 160)">
            <circle cx="40" cy="40" r="32" fill="white" stroke={SLATE} strokeWidth="2" />
            {/* Tick marks */}
            {[-120, -90, -60, -30, 0, 30, 60, 90, 120].map((deg, i) => {
              const rad = (deg * Math.PI) / 180
              const x1 = 40 + Math.cos(rad - Math.PI / 2) * 26
              const y1 = 40 + Math.sin(rad - Math.PI / 2) * 26
              const x2 = 40 + Math.cos(rad - Math.PI / 2) * 30
              const y2 = 40 + Math.sin(rad - Math.PI / 2) * 30
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={SLATE}
                  strokeWidth="1.5"
                />
              )
            })}
            {/* Needle — moves to find max power */}
            <motion.line
              x1="40"
              y1="40"
              x2="40"
              y2="14"
              stroke={EMERALD}
              strokeWidth="2.5"
              strokeLinecap="round"
              animate={{ rotate: [-90, 30, -45, 60, -90] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: '40px 40px' }}
            />
            <circle cx="40" cy="40" r="3" fill={EMERALD} />
            <text x="40" y="92" textAnchor="middle" fontSize="9" fill="#64748b" fontWeight="600">
              Target: max power
            </text>
          </g>

          {/* Voltage adjustment gauge (right) — animates inversely to sun */}
          <g transform="translate(310 160)">
            <rect width="50" height="60" rx="4" fill="white" stroke={SLATE} strokeWidth="2" />
            <motion.rect
              x="4"
              y="4"
              width="42"
              animate={{ height: [20, 45, 30, 50, 20] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              fill={AMBER}
              style={{ transformOrigin: 'center bottom' }}
            />
            <text x="25" y="80" textAnchor="middle" fontSize="9" fill="#64748b" fontWeight="600">
              Voltage
            </text>
          </g>

          {/* Caption */}
          <text x="180" y="310" textAnchor="middle" fontSize="11" fill="#0f172a" fontWeight="700">
            Voltage adjusts every second to extract max power.
          </text>
        </g>

        {/* Bottom takeaway */}
        <rect x="60" y="340" width="780" height="32" rx="4" fill="#fef3c7" />
        <text
          x="450"
          y="361"
          textAnchor="middle"
          fontSize="12"
          fill="#92400e"
          fontWeight="800"
        >
          More MPPTs = more independent strings = more orientations / shading scenarios you can handle without losing yield.
        </text>
      </svg>
    </DiagramShell>
  )
}
