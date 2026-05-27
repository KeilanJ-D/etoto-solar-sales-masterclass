'use client'

import { useMemo, useState } from 'react'
import { AlertTriangle, Battery, CheckCircle2, Clock, Info, Sparkles, Sun, Zap } from 'lucide-react'
import { inverterDatabase, type InverterSpec } from '@/lib/knowledge/inverter-database'

type Phase = 'single' | 'three'
type Tariff = 'go' | 'cosy' | 'flat'
type Priority = 'cost' | 'balanced' | 'performance'

const tariffWindows: Record<Tariff, { hours: number; label: string }> = {
  go: { hours: 4, label: 'Octopus Go (4h cheap window)' },
  cosy: { hours: 6, label: 'Octopus Cosy (6h cheap window)' },
  flat: { hours: 0, label: 'Flat rate / no off-peak' },
}

export default function InverterSizingTool() {
  const [pvKwp, setPvKwp] = useState(5)
  const [batteryKwh, setBatteryKwh] = useState(10)
  const [batteryDoD, setBatteryDoD] = useState(90)
  const [phase, setPhase] = useState<Phase>('single')
  const [tariff, setTariff] = useState<Tariff>('cosy')
  const [hasEv, setHasEv] = useState(false)
  const [hasHeatPump, setHasHeatPump] = useState(false)
  const [priority, setPriority] = useState<Priority>('balanced')

  const recommendation = useMemo(() => {
    const usableBattery = batteryKwh * (batteryDoD / 100)
    const offPeakHours = tariffWindows[tariff].hours

    // 1. Battery charge throughput needed (only if tariff has off-peak)
    const chargeThroughputKw =
      offPeakHours > 0 ? (usableBattery / offPeakHours) * 1.1 : 0

    // 2. Peak discharge needed
    let peakDischargeKw = 3.0 // baseline household
    if (hasEv) peakDischargeKw += 5.0 // partial EV cover (battery + grid)
    if (hasHeatPump) peakDischargeKw += 3.0

    // 3. PV-driven floor
    const pvFloor = pvKwp * 0.9

    // 4. Pick the binding constraint
    const minInverterKw = Math.max(chargeThroughputKw, peakDischargeKw, pvFloor)

    // 5. DNO check
    const singlePhaseG98Limit = 3.68
    const threePhaseG98Limit = 11.04
    const exceedsG98 =
      phase === 'single'
        ? minInverterKw > singlePhaseG98Limit
        : minInverterKw > threePhaseG98Limit
    const dnoNote = exceedsG98
      ? `G99 application required — 4 – 6 week lead time before install.`
      : `G98 — notify DNO within 28 days of commissioning. No pre-approval needed.`

    // 6. Filter inverter database
    const matching = inverterDatabase.filter(
      (inv) => inv.phase === phase && inv.acPowerKw >= minInverterKw - 0.4
    )

    // Sort by priority
    const sorted = [...matching].sort((a, b) => {
      if (priority === 'cost') return a.approxTradePriceGBP - b.approxTradePriceGBP
      if (priority === 'performance') return b.acPowerKw - a.acPowerKw
      // balanced: closest to min size, then cheaper
      const aDist = Math.abs(a.acPowerKw - minInverterKw)
      const bDist = Math.abs(b.acPowerKw - minInverterKw)
      if (Math.abs(aDist - bDist) > 0.5) return aDist - bDist
      return a.approxTradePriceGBP - b.approxTradePriceGBP
    })

    const primary = sorted[0]
    const alternates = sorted.slice(1, 3)

    // 7. Battery charge time at recommended inverter
    const actualChargeTimeH = primary
      ? usableBattery / primary.batteryPowerKw
      : 0
    const fillsInOffPeak = offPeakHours > 0 ? actualChargeTimeH <= offPeakHours : true

    // 8. DC:AC ratio at recommended inverter
    const dcAcRatio = primary ? pvKwp / primary.acPowerKw : 0
    const dcAcWarning =
      dcAcRatio > 1.3
        ? 'High DC:AC — significant clipping in summer peak.'
        : dcAcRatio < 0.6 && batteryKwh < 10
        ? 'Low DC:AC — inverter much bigger than PV; only justified for fast battery charging.'
        : null

    // 9. Reasoning
    let bindingFactor = 'PV nameplate'
    if (chargeThroughputKw > peakDischargeKw && chargeThroughputKw > pvFloor)
      bindingFactor = 'battery charge throughput'
    else if (peakDischargeKw > chargeThroughputKw && peakDischargeKw > pvFloor)
      bindingFactor = 'peak household discharge (EV/heat pump)'

    return {
      usableBattery,
      chargeThroughputKw,
      peakDischargeKw,
      pvFloor,
      minInverterKw,
      bindingFactor,
      exceedsG98,
      dnoNote,
      primary,
      alternates,
      actualChargeTimeH,
      fillsInOffPeak,
      offPeakHours,
      dcAcRatio,
      dcAcWarning,
    }
  }, [pvKwp, batteryKwh, batteryDoD, phase, tariff, hasEv, hasHeatPump, priority])

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="bg-slate-900 text-white px-5 sm:px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#E8192C] flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg sm:text-xl">Inverter Sizing Tool</h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Enter the system spec — get the inverter + reasoning + DNO note.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
        {/* INPUTS */}
        <div className="p-5 sm:p-6 space-y-5">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            Inputs
          </h3>

          {/* PV */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-900 mb-2">
              <Sun className="w-4 h-4 text-amber-500" />
              PV system size
              <span className="ml-auto font-mono text-[#E8192C]">{pvKwp} kWp</span>
            </label>
            <input
              type="range"
              min={2}
              max={20}
              step={0.5}
              value={pvKwp}
              onChange={(e) => setPvKwp(Number(e.target.value))}
              className="w-full accent-[#E8192C]"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>2 kWp</span>
              <span>20 kWp</span>
            </div>
          </div>

          {/* Battery */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-900 mb-2">
              <Battery className="w-4 h-4 text-emerald-500" />
              Battery (nominal)
              <span className="ml-auto font-mono text-[#E8192C]">{batteryKwh} kWh</span>
            </label>
            <input
              type="range"
              min={0}
              max={40}
              step={2.5}
              value={batteryKwh}
              onChange={(e) => setBatteryKwh(Number(e.target.value))}
              className="w-full accent-[#E8192C]"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>No battery</span>
              <span>40 kWh</span>
            </div>
          </div>

          {/* DoD */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-900 mb-2">
              Usable depth (DoD)
              <span className="ml-auto font-mono text-[#E8192C]">{batteryDoD}%</span>
            </label>
            <input
              type="range"
              min={80}
              max={100}
              step={5}
              value={batteryDoD}
              onChange={(e) => setBatteryDoD(Number(e.target.value))}
              className="w-full accent-[#E8192C]"
            />
            <p className="text-xs text-slate-500 mt-1">
              Modern LFP batteries (Sigenergy, GivEnergy) are 90 – 100%. NMC chemistries
              80 – 85%.
            </p>
          </div>

          {/* Phase */}
          <div>
            <label className="text-sm font-semibold text-slate-900 mb-2 block">
              Property supply
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['single', 'three'] as Phase[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPhase(p)}
                  className={`px-3 py-2.5 rounded-lg border text-sm font-medium transition-all min-h-[44px] ${
                    phase === p
                      ? 'bg-[#E8192C] border-[#E8192C] text-white'
                      : 'bg-white border-slate-300 text-slate-700 hover:border-[#E8192C]/40'
                  }`}
                >
                  {p === 'single' ? 'Single-phase' : 'Three-phase'}
                </button>
              ))}
            </div>
          </div>

          {/* Tariff */}
          <div>
            <label className="text-sm font-semibold text-slate-900 mb-2 block">
              Tariff
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['go', 'cosy', 'flat'] as Tariff[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTariff(t)}
                  className={`px-3 py-2.5 rounded-lg border text-xs sm:text-sm font-medium transition-all min-h-[44px] ${
                    tariff === t
                      ? 'bg-[#E8192C] border-[#E8192C] text-white'
                      : 'bg-white border-slate-300 text-slate-700 hover:border-[#E8192C]/40'
                  }`}
                >
                  {t === 'go' ? 'Go (4h)' : t === 'cosy' ? 'Cosy (6h)' : 'Flat'}
                </button>
              ))}
            </div>
          </div>

          {/* Loads */}
          <div>
            <label className="text-sm font-semibold text-slate-900 mb-2 block">
              Major peak loads
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasEv}
                  onChange={(e) => setHasEv(e.target.checked)}
                  className="w-5 h-5 accent-[#E8192C]"
                />
                <span className="text-sm text-slate-700">EV charger (7.4 kW)</span>
              </label>
              <label className="flex items-center gap-3 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasHeatPump}
                  onChange={(e) => setHasHeatPump(e.target.checked)}
                  className="w-5 h-5 accent-[#E8192C]"
                />
                <span className="text-sm text-slate-700">Heat pump (3 – 8 kW)</span>
              </label>
            </div>
          </div>

          {/* Priority */}
          <div>
            <label className="text-sm font-semibold text-slate-900 mb-2 block">
              Priority
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['cost', 'balanced', 'performance'] as Priority[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPriority(p)}
                  className={`px-3 py-2.5 rounded-lg border text-xs sm:text-sm font-medium transition-all min-h-[44px] capitalize ${
                    priority === p
                      ? 'bg-[#E8192C] border-[#E8192C] text-white'
                      : 'bg-white border-slate-300 text-slate-700 hover:border-[#E8192C]/40'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* OUTPUT */}
        <div className="p-5 sm:p-6 bg-slate-50">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
            Recommendation
          </h3>

          {/* Headline */}
          <div className="bg-white rounded-xl border-2 border-[#E8192C]/30 p-5 mb-4 shadow-md">
            <p className="text-xs font-semibold uppercase text-[#E8192C] mb-1">
              Minimum inverter size
            </p>
            <p className="text-3xl sm:text-4xl font-black text-slate-900 mb-1">
              {recommendation.minInverterKw.toFixed(1)} kW
            </p>
            <p className="text-sm text-slate-600">
              Driven by: <span className="font-semibold">{recommendation.bindingFactor}</span>
            </p>
          </div>

          {/* Primary spec */}
          {recommendation.primary ? (
            <SpecCard
              spec={recommendation.primary}
              isPrimary
              chargeTimeH={recommendation.actualChargeTimeH}
              fillsInWindow={recommendation.fillsInOffPeak}
              offPeakHours={recommendation.offPeakHours}
              dcAcRatio={recommendation.dcAcRatio}
            />
          ) : (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900">
              No inverter in the database matches this spec. Check phase and consider
              stacking units.
            </div>
          )}

          {/* DNO note */}
          <div
            className={`rounded-xl p-4 mb-4 border ${
              recommendation.exceedsG98
                ? 'bg-amber-50 border-amber-200'
                : 'bg-emerald-50 border-emerald-200'
            }`}
          >
            <div className="flex items-start gap-2">
              {recommendation.exceedsG98 ? (
                <AlertTriangle className="w-4 h-4 text-amber-700 mt-0.5 flex-shrink-0" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-700 mt-0.5 flex-shrink-0" />
              )}
              <div>
                <p className="text-xs font-semibold uppercase mb-1 text-slate-700">
                  DNO check
                </p>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {recommendation.dnoNote}
                </p>
              </div>
            </div>
          </div>

          {/* DC:AC warning if applicable */}
          {recommendation.dcAcWarning && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-700 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-slate-700">{recommendation.dcAcWarning}</p>
              </div>
            </div>
          )}

          {/* Alternates */}
          {recommendation.alternates.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">
                Alternatives
              </p>
              <div className="space-y-2">
                {recommendation.alternates.map((alt) => (
                  <SpecCard key={alt.id} spec={alt} />
                ))}
              </div>
            </div>
          )}

          {/* Reasoning */}
          <div className="mt-5 bg-slate-900 text-white rounded-xl p-5">
            <p className="text-xs font-semibold uppercase text-[#E8192C] mb-2">
              The reasoning
            </p>
            <ul className="space-y-2 text-sm leading-relaxed">
              <li className="flex gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-1" />
                <span>
                  Battery throughput needed:{' '}
                  <span className="font-bold text-emerald-300">
                    {recommendation.chargeThroughputKw.toFixed(2)} kW
                  </span>{' '}
                  (
                  {recommendation.offPeakHours > 0
                    ? `${recommendation.usableBattery.toFixed(1)} kWh ÷ ${recommendation.offPeakHours}h × 1.1`
                    : 'no off-peak window'}
                  )
                </span>
              </li>
              <li className="flex gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-1" />
                <span>
                  Peak discharge needed:{' '}
                  <span className="font-bold text-emerald-300">
                    {recommendation.peakDischargeKw.toFixed(1)} kW
                  </span>{' '}
                  (baseline + EV + heat pump)
                </span>
              </li>
              <li className="flex gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-1" />
                <span>
                  PV floor (0.9× nameplate):{' '}
                  <span className="font-bold text-emerald-300">
                    {recommendation.pvFloor.toFixed(2)} kW
                  </span>
                </span>
              </li>
              <li className="flex gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-1" />
                <span>
                  Pick the max:{' '}
                  <span className="font-bold text-[#E8192C]">
                    {recommendation.minInverterKw.toFixed(1)} kW minimum
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function SpecCard({
  spec,
  isPrimary = false,
  chargeTimeH,
  fillsInWindow,
  offPeakHours,
  dcAcRatio,
}: {
  spec: InverterSpec
  isPrimary?: boolean
  chargeTimeH?: number
  fillsInWindow?: boolean
  offPeakHours?: number
  dcAcRatio?: number
}) {
  return (
    <div
      className={`rounded-xl p-4 ${
        isPrimary
          ? 'bg-white border-2 border-emerald-300 shadow-md'
          : 'bg-white border border-slate-200'
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-xs font-semibold uppercase text-slate-500">{spec.brand}</p>
          <p className="font-bold text-slate-900 text-sm sm:text-base">{spec.model}</p>
        </div>
        <p className="font-mono text-sm font-bold text-[#E8192C]">
          £{spec.approxTradePriceGBP.toLocaleString()}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div>
          <p className="text-slate-500">AC out</p>
          <p className="font-semibold text-slate-900">{spec.acPowerKw} kW</p>
        </div>
        <div>
          <p className="text-slate-500">Battery rate</p>
          <p className="font-semibold text-slate-900">{spec.batteryPowerKw} kW</p>
        </div>
        <div>
          <p className="text-slate-500">MPPTs</p>
          <p className="font-semibold text-slate-900">{spec.mpptCount}</p>
        </div>
      </div>
      {isPrimary && chargeTimeH !== undefined && (
        <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5 text-xs">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-slate-400" />
            <span className="text-slate-600">
              Battery fills in{' '}
              <span className="font-bold text-slate-900">
                {chargeTimeH.toFixed(1)} h
              </span>
              {offPeakHours && offPeakHours > 0 ? (
                <span
                  className={`ml-1 ${
                    fillsInWindow ? 'text-emerald-600' : 'text-amber-600'
                  } font-semibold`}
                >
                  {fillsInWindow
                    ? '✓ fits the off-peak window'
                    : `✗ overruns the ${offPeakHours}h window`}
                </span>
              ) : null}
            </span>
          </div>
          {dcAcRatio !== undefined && (
            <div className="flex items-center gap-1.5">
              <Sun className="w-3 h-3 text-slate-400" />
              <span className="text-slate-600">
                DC:AC ratio{' '}
                <span className="font-bold text-slate-900">{dcAcRatio.toFixed(2)}</span>
                {dcAcRatio > 1.25 ? (
                  <span className="ml-1 text-amber-600">clipping risk</span>
                ) : dcAcRatio < 0.8 ? (
                  <span className="ml-1 text-blue-600">inverter-led design</span>
                ) : (
                  <span className="ml-1 text-emerald-600">balanced</span>
                )}
              </span>
            </div>
          )}
          {spec.notes && (
            <p className="text-slate-500 italic mt-1">{spec.notes}</p>
          )}
        </div>
      )}
    </div>
  )
}
