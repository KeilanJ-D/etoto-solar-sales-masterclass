'use client'

import DiagramShell, { LegendItem } from './DiagramShell'

const SUN = '#3b82f6'
const SHADE = '#475569'
const GOOD = '#10b981'
const BAD = '#ef4444'

/**
 * Three side-by-side roof scenarios showing the implications of string
 * design. Each scenario shows: panels (colored by sun/shade), the string
 * wiring, the inverter MPPT input, and the expected output verdict.
 */
export default function StringDesign() {
  return (
    <DiagramShell
      eyebrow="String design"
      title="One MPPT, one string, one operating voltage — why it matters"
      caption="Three roofs, three different stringing decisions. The cost of getting this wrong is 8 – 25% of annual yield, every year, forever."
      fullWidth
      scrollOnMobile
      mobileMinWidth={900}
      legend={
        <>
          <LegendItem color={SUN} label="Panel in full sun" />
          <LegendItem color={SHADE} label="Panel in shade" />
          <LegendItem color={GOOD} label="Full output" />
          <LegendItem color={BAD} label="Throttled output" />
        </>
      }
    >
      <svg
        viewBox="0 0 900 380"
        className="w-full h-auto"
        role="img"
        aria-label="Three string design scenarios"
      >
        {/* SCENARIO 1: Single string, no shade */}
        <Scenario
          x={0}
          title="A. Single orientation, no shade"
          verdict="Perfect — 100% yield"
          verdictColor={GOOD}
          panels={[
            ['sun', 'sun', 'sun'],
            ['sun', 'sun', 'sun'],
          ]}
          stringPath="M 30 130 Q 90 130 150 130"
          stringColor={GOOD}
          inverterLabel="1 MPPT · 1 string"
        />

        {/* SCENARIO 2: E/W split, two strings */}
        <Scenario
          x={310}
          title="B. East + West split, 2 MPPTs"
          verdict="Best for split roofs — 100%"
          verdictColor={GOOD}
          panels={[
            ['sun', 'sun', 'sun'],
            ['sun', 'sun', 'sun'],
          ]}
          stringPath="M 30 95 Q 90 95 150 130 M 30 165 Q 90 165 150 130"
          stringColor={GOOD}
          inverterLabel="2 MPPTs · 2 strings"
          split
        />

        {/* SCENARIO 3: Single string, 1 shaded panel */}
        <Scenario
          x={620}
          title="C. One panel shaded, single string"
          verdict="Whole string drops to 30%"
          verdictColor={BAD}
          panels={[
            ['sun', 'sun', 'sun'],
            ['shade', 'sun', 'sun'],
          ]}
          stringPath="M 30 130 Q 90 130 150 130"
          stringColor={BAD}
          inverterLabel="1 MPPT · 1 string · ⚠ bottleneck"
        />

        {/* Bottom annotation */}
        <text
          x="450"
          y="360"
          textAnchor="middle"
          fontSize="12"
          fill="#64748b"
          fontStyle="italic"
        >
          Fix C with: smart stringing (free) · or optimisers on the shaded panel (£45 trade) · or Aiko 510W All-Black (built-in cell bypass).
        </text>
      </svg>
    </DiagramShell>
  )
}

function Scenario({
  x,
  title,
  verdict,
  verdictColor,
  panels,
  stringPath,
  stringColor,
  inverterLabel,
  split = false,
}: {
  x: number
  title: string
  verdict: string
  verdictColor: string
  panels: ('sun' | 'shade')[][]
  stringPath: string
  stringColor: string
  inverterLabel: string
  split?: boolean
}) {
  return (
    <g transform={`translate(${x} 30)`}>
      {/* Title */}
      <text x="140" y="14" textAnchor="middle" fontSize="12" fill="#0f172a" fontWeight="700">
        {title}
      </text>

      {/* Roof */}
      <g transform="translate(20 30)">
        <rect width="240" height="140" fill="#1e293b" rx="3" />
        {split && (
          <line x1="120" y1="0" x2="120" y2="140" stroke="#0f172a" strokeWidth="3" />
        )}
        {/* Panel grid */}
        {panels.map((row, ri) =>
          row.map((p, ci) => (
            <rect
              key={`${ri}-${ci}`}
              x={20 + ci * 65}
              y={15 + ri * 55}
              width="50"
              height="45"
              fill={p === 'sun' ? SUN : SHADE}
              stroke="#0f172a"
              strokeWidth="1.5"
              rx="2"
            />
          ))
        )}
        {split && (
          <>
            <text x="60" y="-2" textAnchor="middle" fontSize="9" fill="#94a3b8" fontWeight="700">
              EAST
            </text>
            <text x="180" y="-2" textAnchor="middle" fontSize="9" fill="#94a3b8" fontWeight="700">
              WEST
            </text>
          </>
        )}
      </g>

      {/* String wiring → inverter */}
      <g transform="translate(20 180)">
        <path
          d={stringPath}
          fill="none"
          stroke={stringColor}
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>

      {/* Inverter */}
      <g transform="translate(180 285)">
        <rect width="80" height="38" rx="4" fill="#0f172a" />
        <text x="40" y="22" textAnchor="middle" fill="white" fontSize="10" fontWeight="700">
          INVERTER
        </text>
        <text x="40" y="50" textAnchor="middle" fontSize="9" fill="#64748b">
          {inverterLabel}
        </text>
      </g>

      {/* Verdict */}
      <rect
        x="20"
        y="225"
        width="240"
        height="32"
        rx="4"
        fill={verdictColor === GOOD ? '#d1fae5' : '#fee2e2'}
      />
      <text
        x="140"
        y="245"
        textAnchor="middle"
        fontSize="11"
        fontWeight="800"
        fill={verdictColor === GOOD ? '#065f46' : '#991b1b'}
      >
        {verdictColor === GOOD ? '✓ ' : '✗ '}
        {verdict}
      </text>
    </g>
  )
}
