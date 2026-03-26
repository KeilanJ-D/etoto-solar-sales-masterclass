'use client'

import { useState, useEffect } from 'react'
import { Calculator, Battery, Sun, Zap, Copy, Check } from 'lucide-react'

export default function FormulaCalculator() {
  // Inputs
  const [annualSpend, setAnnualSpend] = useState<string>('1200')
  const [unitRate, setUnitRate] = useState<string>('21.89')
  const [offPeakRate, setOffPeakRate] = useState<string>('7')
  const [numPanels, setNumPanels] = useState<string>('14')
  const [panelWattage, setPanelWattage] = useState<string>('470')
  const [exportRate, setExportRate] = useState<string>('16')
  
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
    })
  }, [annualSpend, unitRate, offPeakRate, numPanels, panelWattage, exportRate])

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

TOTAL ANNUAL BENEFIT: £${results.totalAnnualBenefit.toFixed(0)}`

    navigator.clipboard.writeText(summary)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
      {/* Phase Tabs */}
      <div className="flex border-b border-slate-200">
        {[
          { num: 1, label: 'Energy Audit', icon: Calculator },
          { num: 2, label: 'Battery Savings', icon: Battery },
          { num: 3, label: 'Solar Income', icon: Sun },
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
                    placeholder="21.89"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
