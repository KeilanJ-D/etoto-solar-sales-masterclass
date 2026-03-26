'use client'

import { useState, useEffect } from 'react'
import { Calculator, Battery, Sun, Zap, Copy, Check, TrendingUp } from 'lucide-react'

export default function FormulaCalculator() {
  // Inputs
  const [annualSpend, setAnnualSpend] = useState<string>('1200')
  const [unitRate, setUnitRate] = useState<string>('21')
  const [offPeakRate, setOffPeakRate] = useState<string>('7')
  const [numPanels, setNumPanels] = useState<string>('14')
  const [panelWattage, setPanelWattage] = useState<string>('470')
  const [exportRate, setExportRate] = useState<string>('16')
  const [systemCost, setSystemCost] = useState<string>('12000')
  
  // Calculated values
  const [results, setResults] = useState({
    annualKwh: 0,
    dailyKwh: 0,
    dailyCost: 0,
    batteryDailyCost: 0,
    batteryDailySaving: 0,
    batteryAnnualSaving: 0,
    systemKwp: 0,
    dailyGeneration: 0,
    dailyIncome: 0,
    annualIncome: 0,
    totalAnnualBenefit: 0,
    paybackYears: 0,
  })

  const [copied, setCopied] = useState(false)
  const [activePhase, setActivePhase] = useState(1)

  useEffect(() => {
    const spend = parseFloat(annualSpend) || 0
    const unit = parseFloat(unitRate) || 0
    const offPeak = parseFloat(offPeakRate) || 0
    const panels = parseFloat(numPanels) || 0
    const wattage = parseFloat(panelWattage) || 0
    const exportR = parseFloat(exportRate) || 0
    const cost = parseFloat(systemCost) || 0

    // Phase 1: Energy Audit
    const annualKwh = unit > 0 ? spend / (unit / 100) : 0
    const dailyKwh = annualKwh / 365
    const dailyCost = dailyKwh * (unit / 100)

    // Phase 2: Battery Savings
    const batteryDailyCost = dailyKwh * (offPeak / 100)
    const batteryDailySaving = dailyCost - batteryDailyCost
    const batteryAnnualSaving = batteryDailySaving * 365

    // Phase 3: Solar Income
    const systemKwp = (wattage * panels) / 1000
    const dailyGeneration = systemKwp * 4.5
    const dailyIncome = dailyGeneration * (exportR / 100)
    const annualIncome = dailyIncome * 365

    // Total
    const totalAnnualBenefit = batteryAnnualSaving + annualIncome
    
    // Payback
    const paybackYears = totalAnnualBenefit > 0 ? cost / totalAnnualBenefit : 0

    setResults({
      annualKwh,
      dailyKwh,
      dailyCost,
      batteryDailyCost,
      batteryDailySaving,
      batteryAnnualSaving,
      systemKwp,
      dailyGeneration,
      dailyIncome,
      annualIncome,
      totalAnnualBenefit,
      paybackYears,
    })
  }, [annualSpend, unitRate, offPeakRate, numPanels, panelWattage, exportRate, systemCost])

  const copyToClipboard = () => {
    const summary = `ENERGY AUDIT SUMMARY
---
Annual Spend: £${annualSpend}
Unit Rate: ${unitRate}p/kWh
Annual Usage: ${results.annualKwh.toFixed(0)} kWh
Daily Usage: ${results.dailyKwh.toFixed(2)} kWh
Daily Running Cost: £${results.dailyCost.toFixed(2)}

BATTERY SAVINGS
---
Off-Peak Rate: ${offPeakRate}p/kWh
New Daily Cost: £${results.batteryDailyCost.toFixed(2)}
Daily Saving: £${results.batteryDailySaving.toFixed(2)}
Annual Saving: £${results.batteryAnnualSaving.toFixed(0)}

SOLAR INCOME
---
System Size: ${results.systemKwp.toFixed(2)} kWp (${numPanels} × ${panelWattage}W)
Daily Generation: ${results.dailyGeneration.toFixed(2)} kWh
Daily Income: £${results.dailyIncome.toFixed(2)}
Annual Income: £${results.annualIncome.toFixed(0)}

PAYBACK ANALYSIS
---
System Cost: £${systemCost}
Total Annual Benefit: £${results.totalAnnualBenefit.toFixed(0)}
Payback Period: ${results.paybackYears.toFixed(1)} years`

    navigator.clipboard.writeText(summary)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Generate 10-year projection data
  const projectionData = Array.from({ length: 11 }, (_, year) => ({
    year,
    cumulative: year * results.totalAnnualBenefit,
    investment: parseFloat(systemCost) || 0,
  }))

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
      {/* Phase Tabs */}
      <div className="flex border-b border-slate-200">
        {[
          { num: 1, label: 'Energy Audit', icon: Calculator },
          { num: 2, label: 'Battery Savings', icon: Battery },
          { num: 3, label: 'Solar Income', icon: Sun },
          { num: 4, label: 'Payback', icon: TrendingUp },
        ].map((phase) => {
          const Icon = phase.icon
          return (
            <button
              key={phase.num}
              onClick={() => setActivePhase(phase.num)}
              className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium transition-colors ${
                activePhase === phase.num
                  ? 'bg-[#E8192C] text-white'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden md:inline">{phase.label}</span>
              <span className="md:hidden">{phase.num}</span>
            </button>
          )
        })}
      </div>

      <div className="p-6">
        {/* Phase 1: Energy Audit */}
        {activePhase === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Annual Electricity Spend
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">£</span>
                  <input
                    type="number"
                    value={annualSpend}
                    onChange={(e) => setAnnualSpend(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#E8192C] focus:border-[#E8192C] outline-none"
                    placeholder="1200"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Unit Rate (p/kWh)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={unitRate}
                    onChange={(e) => setUnitRate(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#E8192C] focus:border-[#E8192C] outline-none"
                    placeholder="21"
                    step="0.01"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">p</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-5">
              <h4 className="text-sm font-semibold text-slate-900 mb-4">Results</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-black text-[#E8192C]">{results.annualKwh.toFixed(0)}</p>
                  <p className="text-xs text-slate-500">kWh/year</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-black text-[#E8192C]">{results.dailyKwh.toFixed(1)}</p>
                  <p className="text-xs text-slate-500">kWh/day</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-black text-[#E8192C]">£{results.dailyCost.toFixed(2)}</p>
                  <p className="text-xs text-slate-500">cost/day</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Phase 2: Battery Savings */}
        {activePhase === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Off-Peak Rate (p/kWh)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={offPeakRate}
                  onChange={(e) => setOffPeakRate(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#E8192C] focus:border-[#E8192C] outline-none"
                  placeholder="7"
                  step="0.1"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">p</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">Typical off-peak (Octopus Go): 7-8p/kWh</p>
            </div>

            <div className="bg-slate-50 rounded-xl p-5">
              <h4 className="text-sm font-semibold text-slate-900 mb-4">Battery Savings</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 text-sm">Old daily cost</span>
                  <span className="font-bold text-slate-900">£{results.dailyCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 text-sm">New daily cost (battery)</span>
                  <span className="font-bold text-green-600">£{results.batteryDailyCost.toFixed(2)}</span>
                </div>
                <div className="border-t border-slate-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 text-sm">Daily saving</span>
                    <span className="font-bold text-[#E8192C]">£{results.batteryDailySaving.toFixed(2)}</span>
                  </div>
                </div>
                <div className="bg-[#E8192C] text-white rounded-lg p-4 text-center">
                  <p className="text-xs uppercase tracking-wide mb-1">Annual Battery Saving</p>
                  <p className="text-3xl font-black">£{results.batteryAnnualSaving.toFixed(0)}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Phase 3: Solar Income */}
        {activePhase === 3 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Number of Panels
                </label>
                <input
                  type="number"
                  value={numPanels}
                  onChange={(e) => setNumPanels(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#E8192C] focus:border-[#E8192C] outline-none"
                  placeholder="14"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Panel Wattage (W)
                </label>
                <input
                  type="number"
                  value={panelWattage}
                  onChange={(e) => setPanelWattage(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#E8192C] focus:border-[#E8192C] outline-none"
                  placeholder="470"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Export Rate (p/kWh)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={exportRate}
                    onChange={(e) => setExportRate(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#E8192C] focus:border-[#E8192C] outline-none"
                    placeholder="16"
                    step="0.1"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">p</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-5">
              <h4 className="text-sm font-semibold text-slate-900 mb-4">Solar Income</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 text-sm">System size</span>
                  <span className="font-bold text-slate-900">{results.systemKwp.toFixed(2)} kWp</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 text-sm">Daily generation (avg)</span>
                  <span className="font-bold text-slate-900">{results.dailyGeneration.toFixed(1)} kWh</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 text-sm">Daily export income</span>
                  <span className="font-bold text-[#F5921E]">£{results.dailyIncome.toFixed(2)}</span>
                </div>
                <div className="bg-[#F5921E] text-white rounded-lg p-4 text-center">
                  <p className="text-xs uppercase tracking-wide mb-1">Annual Solar Income</p>
                  <p className="text-3xl font-black">£{results.annualIncome.toFixed(0)}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Phase 4: Payback */}
        {activePhase === 4 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                System Cost
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">£</span>
                <input
                  type="number"
                  value={systemCost}
                  onChange={(e) => setSystemCost(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#E8192C] focus:border-[#E8192C] outline-none"
                  placeholder="12000"
                />
              </div>
              <p className="text-xs text-slate-500 mt-1">Total installed cost including battery</p>
            </div>

            <div className="bg-slate-50 rounded-xl p-5">
              <h4 className="text-sm font-semibold text-slate-900 mb-4">Payback Analysis</h4>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-white rounded-lg border border-slate-200">
                  <p className="text-xs text-slate-500 mb-1">System Cost</p>
                  <p className="text-xl font-black text-slate-900">£{(parseFloat(systemCost) || 0).toLocaleString()}</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border border-slate-200">
                  <p className="text-xs text-slate-500 mb-1">Annual Benefit</p>
                  <p className="text-xl font-black text-green-600">£{results.totalAnnualBenefit.toFixed(0)}</p>
                </div>
                <div className="text-center p-4 bg-[#E8192C] rounded-lg text-white">
                  <p className="text-xs mb-1">Payback</p>
                  <p className="text-xl font-black">{results.paybackYears.toFixed(1)} yrs</p>
                </div>
              </div>

              {/* 10-Year Projection Chart */}
              <div className="bg-white rounded-lg border border-slate-200 p-4">
                <h5 className="text-sm font-semibold text-slate-900 mb-4">10-Year Projection</h5>
                <div className="relative h-48">
                  {/* Y-axis labels */}
                  <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-slate-400 pr-2">
                    <span>£{(results.totalAnnualBenefit * 10).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    <span>£{(results.totalAnnualBenefit * 5).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    <span>£0</span>
                  </div>
                  
                  {/* Chart area */}
                  <div className="ml-16 h-full relative">
                    {/* Investment line (horizontal) */}
                    <div 
                      className="absolute w-full border-t-2 border-dashed border-slate-300"
                      style={{ 
                        bottom: `${((parseFloat(systemCost) || 0) / (results.totalAnnualBenefit * 10)) * 100}%`
                      }}
                    >
                      <span className="absolute right-0 -top-4 text-xs text-slate-500 bg-white px-1">Investment</span>
                    </div>
                    
                    {/* Cumulative savings line */}
                    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="savingsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#E8192C" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#E8192C" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      {/* Area under line */}
                      <path
                        d={`M 0 100 ${projectionData.map((d, i) => `L ${(i / 10) * 100} ${100 - (d.cumulative / (results.totalAnnualBenefit * 10)) * 100}`).join(' ')} L 100 100 Z`}
                        fill="url(#savingsGradient)"
                      />
                      {/* Line */}
                      <path
                        d={`M 0 100 ${projectionData.map((d, i) => `L ${(i / 10) * 100} ${100 - (d.cumulative / (results.totalAnnualBenefit * 10)) * 100}`).join(' ')}`}
                        fill="none"
                        stroke="#E8192C"
                        strokeWidth="2"
                      />
                    </svg>
                    
                    {/* X-axis labels */}
                    <div className="absolute -bottom-5 left-0 right-0 flex justify-between text-xs text-slate-400">
                      <span>0</span>
                      <span>5</span>
                      <span>10 yrs</span>
                    </div>
                    
                    {/* Crossover point indicator */}
                    {results.paybackYears <= 10 && results.paybackYears > 0 && (
                      <div 
                        className="absolute w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-lg"
                        style={{
                          left: `${(results.paybackYears / 10) * 100}%`,
                          bottom: `${((parseFloat(systemCost) || 0) / (results.totalAnnualBenefit * 10)) * 100}%`,
                          transform: 'translate(-50%, 50%)'
                        }}
                      >
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-green-600 whitespace-nowrap">
                          Break-even
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* 10-year total */}
                <div className="mt-8 pt-4 border-t border-slate-200 text-center">
                  <p className="text-sm text-slate-500">10-Year Total Benefit</p>
                  <p className="text-3xl font-black text-green-600">£{(results.totalAnnualBenefit * 10).toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                  <p className="text-sm text-slate-500 mt-1">
                    Net profit after payback: <span className="font-bold text-green-600">£{((results.totalAnnualBenefit * 10) - (parseFloat(systemCost) || 0)).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Total Summary - Always visible */}
        <div className="mt-6 pt-6 border-t border-slate-200">
          <div className="bg-slate-900 text-white rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold">Total Annual Benefit</h4>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy summary'}
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <p className="text-[#F5921E] text-xs uppercase tracking-wide mb-1">Battery</p>
                <p className="text-xl font-bold">£{results.batteryAnnualSaving.toFixed(0)}</p>
              </div>
              <div className="text-center flex items-center justify-center">
                <Zap className="w-6 h-6 text-slate-500" />
              </div>
              <div className="text-center">
                <p className="text-[#F5921E] text-xs uppercase tracking-wide mb-1">Solar</p>
                <p className="text-xl font-bold">£{results.annualIncome.toFixed(0)}</p>
              </div>
            </div>
            <div className="bg-[#E8192C] rounded-lg p-4 text-center">
              <p className="text-xs uppercase tracking-wide mb-1 text-white/80">Combined Annual Benefit</p>
              <p className="text-4xl font-black">£{results.totalAnnualBenefit.toFixed(0)}</p>
              {results.paybackYears > 0 && (
                <p className="text-sm text-white/80 mt-2">Payback in {results.paybackYears.toFixed(1)} years</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
