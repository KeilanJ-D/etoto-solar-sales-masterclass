'use client'

import { motion } from 'framer-motion'
import DiagramShell, { LegendItem } from './DiagramShell'

const RED = '#E8192C'
const EMERALD = '#10b981'
const AMBER = '#F5921E'
const SLATE = '#94a3b8'

/**
 * Annotated bar comparison: typical UK household electricity bill
 * before solar + battery vs after. Bars are animated to grow on
 * scroll, so the saving lands visually.
 *
 * Numbers: typical 4-bed UK home, £1,800/yr bill (£150/m × 12)
 * before solar. After 6 kWp solar + 10 kWh battery on Octopus
 * Cosy: ~£480/yr remaining + SEG income.
 */
export default function BillBeforeAfter() {
  // Bar lengths (pixel widths) — both sum to the same total
  // to keep "monthly cost shape" visible. Total bar = 600px.
  const before = {
    label: '£1,800',
    sub: '£150/month',
    parts: [
      { label: 'Peak rate units', width: 380, color: RED },
      { label: 'Off-peak units', width: 140, color: AMBER },
      { label: 'Standing charge', width: 80, color: SLATE },
    ],
  }
  const after = {
    label: '£480',
    sub: '£40/month',
    parts: [
      { label: 'Peak (rare)', width: 50, color: RED },
      { label: 'Off-peak charging', width: 90, color: AMBER },
      { label: 'Standing charge', width: 80, color: SLATE },
    ],
  }
  const segIncome = 480 // £/yr from exports

  return (
    <DiagramShell
      eyebrow="Bill before / after"
      title="What a typical UK home's electricity bill looks like before + after solar + battery"
      caption="Same usage, same standing charge, completely different colour mix. The peak-rate red bar collapses; off-peak charging takes most of the load; SEG export creates a new green income bar that didn't exist before."
      fullWidth
      scrollOnMobile
      mobileMinWidth={900}
      legend={
        <>
          <LegendItem color={RED} label="Peak rate (~28p/kWh)" />
          <LegendItem color={AMBER} label="Off-peak rate (~7p/kWh)" />
          <LegendItem color={SLATE} label="Standing charge" />
          <LegendItem color={EMERALD} label="SEG export income (NEW)" />
        </>
      }
    >
      <svg
        viewBox="0 0 900 380"
        className="w-full h-auto"
        role="img"
        aria-label="Bill before and after solar + battery"
      >
        {/* BEFORE */}
        <g transform="translate(0 30)">
          <text x="40" y="0" fontSize="13" fontWeight="800" fill="#0f172a">
            BEFORE solar + battery
          </text>
          <text x="40" y="20" fontSize="11" fill="#64748b">
            Typical 4-bed home, all peak-rate import
          </text>

          {/* Bar */}
          <g transform="translate(40 40)">
            {before.parts.map((p, i) => {
              const prevWidth = before.parts
                .slice(0, i)
                .reduce((sum, prev) => sum + prev.width, 0)
              return (
                <motion.rect
                  key={i}
                  x={prevWidth}
                  y="0"
                  height="50"
                  fill={p.color}
                  initial={{ width: 0 }}
                  whileInView={{ width: p.width }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.15, ease: 'easeOut' }}
                />
              )
            })}
          </g>

          {/* Annotation chips below each section */}
          <g transform="translate(40 95)">
            {before.parts.map((p, i) => {
              const prevWidth = before.parts
                .slice(0, i)
                .reduce((sum, prev) => sum + prev.width, 0)
              return (
                <g key={i} transform={`translate(${prevWidth + p.width / 2} 0)`}>
                  <line x1="0" y1="0" x2="0" y2="-5" stroke={p.color} strokeWidth="1.5" />
                  <text x="0" y="10" textAnchor="middle" fontSize="9" fill={p.color} fontWeight="600">
                    {p.label}
                  </text>
                </g>
              )
            })}
          </g>

          {/* Total at the right */}
          <g transform="translate(660 35)">
            <text x="0" y="0" fontSize="11" fill="#64748b">Annual total</text>
            <text x="0" y="22" fontSize="22" fontWeight="900" fill={RED}>
              {before.label}
            </text>
            <text x="0" y="38" fontSize="10" fill="#64748b">
              {before.sub}
            </text>
          </g>
        </g>

        {/* Down arrow */}
        <g transform="translate(450 145)">
          <line x1="0" y1="0" x2="0" y2="30" stroke="#cbd5e1" strokeWidth="2" />
          <polygon points="-6,28 6,28 0,38" fill="#cbd5e1" />
        </g>

        {/* AFTER */}
        <g transform="translate(0 195)">
          <text x="40" y="0" fontSize="13" fontWeight="800" fill="#0f172a">
            AFTER 6 kWp solar + 10 kWh battery on Octopus Cosy
          </text>
          <text x="40" y="20" fontSize="11" fill="#64748b">
            Solar self-consumes daytime + exports for SEG; battery charges overnight at 7p
          </text>

          {/* Bar — animated */}
          <g transform="translate(40 40)">
            {after.parts.map((p, i) => {
              const prevWidth = after.parts
                .slice(0, i)
                .reduce((sum, prev) => sum + prev.width, 0)
              return (
                <motion.rect
                  key={i}
                  x={prevWidth}
                  y="0"
                  height="50"
                  fill={p.color}
                  initial={{ width: 0 }}
                  whileInView={{ width: p.width }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.7 + i * 0.15, ease: 'easeOut' }}
                />
              )
            })}
            {/* Hatched area showing where the previous bar USED to extend (ghost) */}
            <rect
              x="220"
              y="0"
              width="380"
              height="50"
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <text x="410" y="28" textAnchor="middle" fontSize="10" fill="#64748b" fontStyle="italic">
              ↑ what you used to pay
            </text>
          </g>

          {/* Annotation chips */}
          <g transform="translate(40 95)">
            {after.parts.map((p, i) => {
              const prevWidth = after.parts
                .slice(0, i)
                .reduce((sum, prev) => sum + prev.width, 0)
              return (
                <g key={i} transform={`translate(${prevWidth + p.width / 2} 0)`}>
                  <line x1="0" y1="0" x2="0" y2="-5" stroke={p.color} strokeWidth="1.5" />
                  <text x="0" y="10" textAnchor="middle" fontSize="9" fill={p.color} fontWeight="600">
                    {p.label}
                  </text>
                </g>
              )
            })}
          </g>

          {/* SEG income bar (new, green, sits below the cost bar) */}
          <g transform="translate(40 130)">
            <motion.rect
              x="0"
              y="0"
              height="22"
              fill={EMERALD}
              opacity="0.85"
              initial={{ width: 0 }}
              whileInView={{ width: 200 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 1.3, ease: 'easeOut' }}
            />
            <text x="105" y="15" textAnchor="middle" fontSize="10" fill="white" fontWeight="700">
              + £{segIncome} SEG export income (NEW)
            </text>
          </g>

          {/* Total at the right */}
          <g transform="translate(660 35)">
            <text x="0" y="0" fontSize="11" fill="#64748b">Annual total</text>
            <text x="0" y="22" fontSize="22" fontWeight="900" fill={EMERALD}>
              {after.label}
            </text>
            <text x="0" y="38" fontSize="10" fill="#64748b">
              {after.sub} — minus £{segIncome} export
            </text>
            <text x="0" y="62" fontSize="14" fontWeight="800" fill={EMERALD}>
              Net: −£{1800 - 480 + segIncome}/yr
            </text>
          </g>
        </g>

        {/* Bottom takeaway */}
        <g transform="translate(40 350)">
          <text fontSize="12" fill="#0f172a" fontWeight="700">
            From £1,800/yr expense to a £1,800/yr benefit. Same house, same usage, different system.
          </text>
        </g>
      </svg>
    </DiagramShell>
  )
}
