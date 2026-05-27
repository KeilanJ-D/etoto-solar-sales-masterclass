'use client'

import DiagramShell from './DiagramShell'

const GREEN = '#10b981'
const AMBER = '#F5921E'
const RED = '#E8192C'
const SLATE = '#475569'

/**
 * DNO connection regulation decision tree.
 * Walks: phase type → proposed inverter size → G98 (notify) or G99 (apply).
 * Reps + designers can read this in 10 seconds before quoting.
 */
export default function DnoFlowchart() {
  return (
    <DiagramShell
      eyebrow="DNO compliance"
      title="G98 (notify) vs G99 (apply) — the 10-second decision"
      caption="Before you quote any system over 3.68 kW single-phase or 11.04 kW three-phase, you need DNO approval (G99). G98 is just a notification after install. Getting this wrong = system disconnected and MCS standing at risk."
      fullWidth
    >
      <svg
        viewBox="0 0 900 460"
        className="w-full h-auto"
        role="img"
        aria-label="DNO G98 vs G99 decision flowchart"
      >
        {/* START */}
        <g transform="translate(370 20)">
          <rect width="160" height="50" rx="8" fill="#0f172a" />
          <text x="80" y="22" textAnchor="middle" fill="white" fontSize="11" fontWeight="700">
            START
          </text>
          <text x="80" y="38" textAnchor="middle" fill="white" fontSize="13" fontWeight="900">
            Spec the system
          </text>
        </g>

        {/* Arrow to Q1 */}
        <Arrow path="M 450 70 L 450 100" />

        {/* Q1: Phase type */}
        <DiamondBox
          x={310}
          y={100}
          width={280}
          height={80}
          fill="#fef3c7"
          stroke="#fbbf24"
          title="Question 1"
          question="What's the property's supply type?"
        />

        {/* Branch labels */}
        <text x="240" y="225" textAnchor="middle" fontSize="11" fill={SLATE} fontWeight="700">
          Single-phase
        </text>
        <text x="660" y="225" textAnchor="middle" fontSize="11" fill={SLATE} fontWeight="700">
          Three-phase
        </text>

        {/* Arrow left + right */}
        <Arrow path="M 380 180 L 240 240" />
        <Arrow path="M 520 180 L 660 240" />

        {/* Q2a (single-phase): inverter size */}
        <DiamondBox
          x={100}
          y={240}
          width={280}
          height={80}
          fill="#fef3c7"
          stroke="#fbbf24"
          title="Question 2"
          question="Inverter ≤ 3.68 kW (16A)?"
        />

        {/* Q2b (three-phase): inverter size */}
        <DiamondBox
          x={520}
          y={240}
          width={280}
          height={80}
          fill="#fef3c7"
          stroke="#fbbf24"
          title="Question 2"
          question="Total inverter ≤ 11.04 kW?"
        />

        {/* Branch labels under Q2a */}
        <text x="150" y="345" textAnchor="middle" fontSize="11" fill={GREEN} fontWeight="700">
          Yes
        </text>
        <text x="320" y="345" textAnchor="middle" fontSize="11" fill={AMBER} fontWeight="700">
          No
        </text>

        {/* Branch labels under Q2b */}
        <text x="570" y="345" textAnchor="middle" fontSize="11" fill={GREEN} fontWeight="700">
          Yes
        </text>
        <text x="740" y="345" textAnchor="middle" fontSize="11" fill={AMBER} fontWeight="700">
          No
        </text>

        {/* Arrows from Q2a */}
        <Arrow path="M 180 320 L 130 370" />
        <Arrow path="M 300 320 L 350 370" />

        {/* Arrows from Q2b */}
        <Arrow path="M 600 320 L 550 370" />
        <Arrow path="M 720 320 L 770 370" />

        {/* OUTCOMES (4) */}
        {/* G98 single-phase (✓) */}
        <OutcomeBox
          x={30}
          y={370}
          width={210}
          color="green"
          tag="G98"
          title="Notify only"
          body="Submit DNO form within 28 days of commissioning. No pre-approval. Install proceeds normally."
        />

        {/* G99 single-phase (⚠) */}
        <OutcomeBox
          x={250}
          y={370}
          width={210}
          color="amber"
          tag="G99"
          title="Apply BEFORE install"
          body="4 – 6 week lead time. Most DNOs approve 5 – 11 kW single-phase but some throttle. Submit day of deposit."
        />

        {/* G98 three-phase (✓) */}
        <OutcomeBox
          x={470}
          y={370}
          width={210}
          color="green"
          tag="G98"
          title="Notify only"
          body="3-phase has way more headroom. Most domestic 3-phase installs fall under G98 (≤ 3.68 kW per phase)."
        />

        {/* G99 three-phase (✓ usually quick) */}
        <OutcomeBox
          x={690}
          y={370}
          width={180}
          color="amber"
          tag="G99"
          title="Apply BEFORE install"
          body="2 – 4 weeks typical on 3-phase. Rare refusal."
        />
      </svg>
    </DiagramShell>
  )
}

function Arrow({ path }: { path: string }) {
  return (
    <g>
      <path d={path} fill="none" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowDno)" />
      <defs>
        <marker
          id="arrowDno"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
        </marker>
      </defs>
    </g>
  )
}

function DiamondBox({
  x,
  y,
  width,
  height,
  fill,
  stroke,
  title,
  question,
}: {
  x: number
  y: number
  width: number
  height: number
  fill: string
  stroke: string
  title: string
  question: string
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={width} height={height} rx="8" fill={fill} stroke={stroke} strokeWidth="2" />
      <text x={width / 2} y="20" textAnchor="middle" fontSize="9" fontWeight="700" fill="#92400e">
        {title.toUpperCase()}
      </text>
      <text x={width / 2} y="45" textAnchor="middle" fontSize="13" fontWeight="800" fill="#0f172a">
        {question}
      </text>
    </g>
  )
}

function OutcomeBox({
  x,
  y,
  width,
  color,
  tag,
  title,
  body,
}: {
  x: number
  y: number
  width: number
  color: 'green' | 'amber' | 'red'
  tag: string
  title: string
  body: string
}) {
  const colors = {
    green: { bg: '#d1fae5', border: '#10b981', tagBg: '#10b981', text: '#065f46' },
    amber: { bg: '#fef3c7', border: '#f59e0b', tagBg: '#f59e0b', text: '#92400e' },
    red: { bg: '#fee2e2', border: '#ef4444', tagBg: '#ef4444', text: '#991b1b' },
  }[color]
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={width} height="80" rx="6" fill={colors.bg} stroke={colors.border} strokeWidth="2" />
      <rect x="0" y="0" width="50" height="20" rx="6" fill={colors.tagBg} />
      <text x="25" y="14" textAnchor="middle" fontSize="11" fill="white" fontWeight="900">
        {tag}
      </text>
      <text x="12" y="40" fontSize="12" fontWeight="800" fill={colors.text}>
        {title}
      </text>
      <foreignObject x="12" y="44" width={width - 24} height="36">
        <p
          style={{
            fontSize: '10px',
            lineHeight: '1.4',
            color: colors.text,
            margin: 0,
            fontFamily: 'inherit',
          }}
        >
          {body}
        </p>
      </foreignObject>
    </g>
  )
}
