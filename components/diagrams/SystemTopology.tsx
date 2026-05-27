'use client'

import { motion } from 'framer-motion'
import DiagramShell, { LegendItem } from './DiagramShell'

const STROKE = '#94a3b8' // slate-400
const RED = '#E8192C'
const AMBER = '#F5921E'
const EMERALD = '#10b981'
const BLUE = '#3b82f6'

/**
 * Residential solar system topology — panels through to grid.
 * Designed to teach what a fully-installed system looks like and
 * what each box does. Animated current-flow dots travel along the
 * DC and AC lines so the diagram feels alive.
 */
export default function SystemTopology() {
  return (
    <DiagramShell
      eyebrow="System topology"
      title="What a residential solar + battery install actually looks like"
      caption="Sun → panels → inverter → battery / consumer unit → house load → grid. Animated dots show DC (red) and AC (blue) current flow."
      fullWidth
      scrollOnMobile
      mobileMinWidth={900}
      legend={
        <>
          <LegendItem color={RED} label="DC current (panels → inverter)" />
          <LegendItem color={BLUE} label="AC current (inverter → load / grid)" />
          <LegendItem color={EMERALD} label="Battery charge / discharge" />
          <LegendItem color={STROKE} label="Physical wiring (CT clamps, MCS)" />
        </>
      }
    >
      <svg
        viewBox="0 0 900 460"
        className="w-full h-auto"
        role="img"
        aria-label="Residential solar system topology diagram"
      >
        {/* SUN */}
        <g>
          <circle cx="120" cy="80" r="32" fill={AMBER} opacity="0.9" />
          {/* Sun rays */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 360) / 8
            const rad = (angle * Math.PI) / 180
            const x1 = 120 + Math.cos(rad) * 40
            const y1 = 80 + Math.sin(rad) * 40
            const x2 = 120 + Math.cos(rad) * 52
            const y2 = 80 + Math.sin(rad) * 52
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={AMBER}
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.7"
              />
            )
          })}
        </g>

        {/* PANELS (roof) */}
        <g transform="translate(220 30)">
          {/* Roof slope */}
          <polygon points="0,140 250,140 220,40 30,40" fill="#1e293b" />
          {/* Panel grid */}
          {Array.from({ length: 3 }).map((_, row) =>
            Array.from({ length: 4 }).map((_, col) => (
              <rect
                key={`${row}-${col}`}
                x={50 + col * 38}
                y={55 + row * 26}
                width="32"
                height="22"
                fill="url(#panelGradient)"
                stroke="#0f172a"
                strokeWidth="1"
                rx="2"
              />
            ))
          )}
          <defs>
            <linearGradient id="panelGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </linearGradient>
          </defs>
          <text x="125" y="160" textAnchor="middle" fontSize="11" fill="#64748b" fontWeight="600">
            Solar panels (DC out)
          </text>
        </g>

        {/* SUN RAYS HITTING PANELS */}
        <g opacity="0.4">
          {[160, 180, 200, 220].map((x, i) => (
            <line
              key={i}
              x1={x}
              y1={110}
              x2={x + 40}
              y2={180}
              stroke={AMBER}
              strokeWidth="2"
              strokeDasharray="3 3"
            />
          ))}
        </g>

        {/* DC LINE: panels → inverter */}
        <path
          id="dcPath"
          d="M 345 200 L 345 280 L 480 280"
          fill="none"
          stroke={RED}
          strokeWidth="3"
        />
        <text x="360" y="225" fontSize="11" fill={RED} fontWeight="700">
          DC
        </text>
        {/* Animated current dots on DC */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={`dc-${i}`}
            r="4"
            fill={RED}
            initial={false}
            animate={{
              offsetDistance: ['0%', '100%'],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              delay: i * 0.8,
              ease: 'linear',
            }}
            style={{
              offsetPath: 'path("M 345 200 L 345 280 L 480 280")',
            }}
          />
        ))}

        {/* INVERTER */}
        <g transform="translate(480 240)">
          <rect width="120" height="80" rx="6" fill="#0f172a" />
          <rect x="6" y="6" width="108" height="68" rx="4" fill="#1e293b" />
          <text x="60" y="32" textAnchor="middle" fill="white" fontSize="12" fontWeight="700">
            HYBRID
          </text>
          <text x="60" y="48" textAnchor="middle" fill="white" fontSize="14" fontWeight="900">
            INVERTER
          </text>
          <circle cx="60" cy="62" r="4" fill={EMERALD} />
          <text x="60" y="95" textAnchor="middle" fontSize="11" fill="#64748b" fontWeight="600">
            DC → AC + battery routing
          </text>
        </g>

        {/* BATTERY */}
        <g transform="translate(680 240)">
          <rect width="100" height="80" rx="6" fill="#064e3b" />
          <rect x="6" y="6" width="88" height="50" rx="3" fill="#10b981" />
          {/* Battery level segments */}
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={i}
              x={12 + i * 19}
              y="12"
              width="15"
              height="38"
              fill="#34d399"
              opacity={i < 3 ? 0.95 : 0.5}
            />
          ))}
          <text x="50" y="73" textAnchor="middle" fill="white" fontSize="11" fontWeight="700">
            BATTERY
          </text>
          <text x="50" y="95" textAnchor="middle" fontSize="11" fill="#64748b" fontWeight="600">
            Stores AC at off-peak
          </text>
        </g>

        {/* Battery connection (bidirectional) */}
        <path
          d="M 600 280 L 680 280"
          stroke={EMERALD}
          strokeWidth="3"
          fill="none"
          markerEnd="url(#arrowEm)"
          markerStart="url(#arrowEmStart)"
        />

        {/* AC LINE: inverter → consumer unit */}
        <path
          d="M 540 320 L 540 380 L 480 380"
          fill="none"
          stroke={BLUE}
          strokeWidth="3"
        />
        <text x="545" y="355" fontSize="11" fill={BLUE} fontWeight="700">
          AC
        </text>
        {/* Animated current dots on AC */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={`ac-${i}`}
            r="4"
            fill={BLUE}
            initial={false}
            animate={{
              offsetDistance: ['0%', '100%'],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              delay: i * 0.8,
              ease: 'linear',
            }}
            style={{
              offsetPath: 'path("M 540 320 L 540 380 L 480 380")',
            }}
          />
        ))}

        {/* CONSUMER UNIT */}
        <g transform="translate(370 350)">
          <rect width="110" height="60" rx="4" fill="#475569" />
          <rect x="4" y="4" width="102" height="52" rx="2" fill="#64748b" />
          {/* Breakers */}
          {[0, 1, 2, 3, 4].map((i) => (
            <rect
              key={i}
              x={10 + i * 18}
              y="14"
              width="14"
              height="32"
              fill="#1e293b"
              rx="1"
            />
          ))}
          <text x="55" y="75" textAnchor="middle" fontSize="11" fill="#64748b" fontWeight="600">
            Consumer unit (MCS)
          </text>
        </g>

        {/* HOUSE LOAD */}
        <g transform="translate(220 350)">
          <rect width="120" height="60" rx="4" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
          <text x="60" y="30" textAnchor="middle" fill="#92400e" fontSize="12" fontWeight="700">
            HOUSE LOAD
          </text>
          <text x="60" y="45" textAnchor="middle" fill="#92400e" fontSize="10">
            Lights · Kettle · EV
          </text>
          <text x="60" y="75" textAnchor="middle" fontSize="11" fill="#64748b" fontWeight="600">
            What you use
          </text>
        </g>

        {/* House load arrow */}
        <path
          d="M 370 380 L 340 380"
          stroke={BLUE}
          strokeWidth="3"
          fill="none"
          markerEnd="url(#arrowBlue)"
        />

        {/* GRID */}
        <g transform="translate(740 350)">
          {/* Pylon */}
          <polygon
            points="50,0 30,40 70,40"
            fill="none"
            stroke="#475569"
            strokeWidth="3"
          />
          <line x1="50" y1="0" x2="50" y2="40" stroke="#475569" strokeWidth="2" />
          <line x1="35" y1="20" x2="65" y2="20" stroke="#475569" strokeWidth="2" />
          {/* Wires going off-screen */}
          <line x1="20" y1="15" x2="80" y2="15" stroke="#475569" strokeWidth="2" />
          <line x1="20" y1="25" x2="80" y2="25" stroke="#475569" strokeWidth="2" />
          <text x="50" y="60" textAnchor="middle" fontSize="11" fill="#64748b" fontWeight="600">
            National Grid
          </text>
          <text x="50" y="74" textAnchor="middle" fontSize="9" fill="#64748b">
            (DNO-controlled)
          </text>
        </g>

        {/* Grid connection (bidirectional) */}
        <path
          d="M 480 380 L 740 380"
          stroke={BLUE}
          strokeWidth="3"
          strokeDasharray="0"
          fill="none"
          markerEnd="url(#arrowBlue)"
          markerStart="url(#arrowBlueStart)"
        />
        {/* White pill behind text so it doesn't compete with the wire */}
        <rect x="528" y="360" width="144" height="14" rx="7" fill="white" stroke="#e2e8f0" strokeWidth="0.5" />
        <text x="600" y="370" textAnchor="middle" fontSize="10" fill="#64748b" fontStyle="italic">
          Imports + Exports (SEG)
        </text>

        {/* Arrowheads */}
        <defs>
          <marker
            id="arrowBlue"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={BLUE} />
          </marker>
          <marker
            id="arrowBlueStart"
            viewBox="0 0 10 10"
            refX="2"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 10 0 L 0 5 L 10 10 z" fill={BLUE} />
          </marker>
          <marker
            id="arrowEm"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={EMERALD} />
          </marker>
          <marker
            id="arrowEmStart"
            viewBox="0 0 10 10"
            refX="2"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 10 0 L 0 5 L 10 10 z" fill={EMERALD} />
          </marker>
        </defs>
      </svg>
    </DiagramShell>
  )
}
