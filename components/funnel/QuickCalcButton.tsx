'use client'

import { useState, useEffect } from 'react'
import { Calculator, X, Copy, Check } from 'lucide-react'

export default function QuickCalcButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  
  // Inputs
  const [annualSpend, setAnnualSpend] = useState('1200')
  const [unitRate, setUnitRate] = useState('21')
  const [offPeakRate, setOffPeakRate] = useState('7')
  const [numPanels, setNumPanels] = useState('14')
  const [panelWattage, setPanelWattage] = useState('470')
  const [exportRate, setExportRate] = useState('16')
  const [systemCost, setSystemCost] = useState('12000')
  
  // Calculate results
  const spend = parseFloat(annualSpend) || 0
  const unit = parseFloat(unitRate) || 0
  const offPeak = parseFloat(offPeakRate) || 0
  const panels = parseFloat(numPanels) || 0
  const wattage = parseFloat(panelWattage) || 0
  const exportR = parseFloat(exportRate) || 0
  const cost = parseFloat(systemCost) || 0

  const annualKwh = unit > 0 ? spend / (unit / 100) : 0
  const dailyKwh = annualKwh / 365
  const dailyCost = dailyKwh * (unit / 100)
  const batteryDailyCost = dailyKwh * (offPeak / 100)
  const batteryAnnualSaving = (dailyCost - batteryDailyCost) * 365
  const systemKwp = (wattage * panels) / 1000
  const dailyGeneration = systemKwp * 4.5
  const annualIncome = dailyGeneration * (exportR / 100) * 365
  const totalAnnualBenefit = batteryAnnualSaving + annualIncome
  const paybackYears = totalAnnualBenefit > 0 ? cost / totalAnnualBenefit : 0

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  const copyResults = () => {
    const text = `Annual Usage: ${annualKwh.toFixed(0)} kWh
Battery Saving: £${batteryAnnualSaving.toFixed(0)}/yr
Solar Income: £${annualIncome.toFixed(0)}/yr
Total Benefit: £${totalAnnualBenefit.toFixed(0)}/yr
Payback: ${paybackYears.toFixed(1)} years`
    
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-[#E8192C] text-white shadow-lg hover:bg-[#D01622] transition-all hover:scale-105 flex items-center justify-center ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        aria-label="Open quick calculator"
      >
        <Calculator className="w-6 h-6" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 md:bg-transparent md:pointer-events-none"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Calculator Panel */}
      <div className={`fixed bottom-6 left-6 z-50 w-[calc(100vw-3rem)] max-w-sm bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-[#E8192C]" />
            <span className="font-bold text-slate-900 dark:text-white">Quick Calculator</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
          {/* Input Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Annual Spend</label>
              <div className="relative">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 text-sm">£</span>
                <input
                  type="number"
                  value={annualSpend}
                  onChange={(e) => setAnnualSpend(e.target.value)}
                  className="w-full pl-6 pr-2 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#E8192C] focus:border-[#E8192C] outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Unit Rate</label>
              <div className="relative">
                <input
                  type="number"
                  value={unitRate}
                  onChange={(e) => setUnitRate(e.target.value)}
                  className="w-full px-2 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#E8192C] focus:border-[#E8192C] outline-none"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 text-sm">p</span>
              </div>
            </div>
            <div>
              <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Off-Peak Rate</label>
              <div className="relative">
                <input
                  type="number"
                  value={offPeakRate}
                  onChange={(e) => setOffPeakRate(e.target.value)}
                  className="w-full px-2 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#E8192C] focus:border-[#E8192C] outline-none"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 text-sm">p</span>
              </div>
            </div>
            <div>
              <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Panels</label>
              <input
                type="number"
                value={numPanels}
                onChange={(e) => setNumPanels(e.target.value)}
                className="w-full px-2 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#E8192C] focus:border-[#E8192C] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Panel Wattage</label>
              <div className="relative">
                <input
                  type="number"
                  value={panelWattage}
                  onChange={(e) => setPanelWattage(e.target.value)}
                  className="w-full px-2 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#E8192C] focus:border-[#E8192C] outline-none"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 text-sm">W</span>
              </div>
            </div>
            <div>
              <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Export Rate</label>
              <div className="relative">
                <input
                  type="number"
                  value={exportRate}
                  onChange={(e) => setExportRate(e.target.value)}
                  className="w-full px-2 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#E8192C] focus:border-[#E8192C] outline-none"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 text-sm">p</span>
              </div>
            </div>
          </div>
          
          {/* System Cost - Full Width */}
          <div>
            <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">System Cost</label>
            <div className="relative">
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 text-sm">£</span>
              <input
                type="number"
                value={systemCost}
                onChange={(e) => setSystemCost(e.target.value)}
                className="w-full pl-6 pr-2 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#E8192C] focus:border-[#E8192C] outline-none"
              />
            </div>
          </div>

          {/* Results */}
          <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-600 dark:text-slate-400">Annual Usage</span>
              <span className="font-bold text-slate-900 dark:text-white">{annualKwh.toFixed(0)} kWh</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-600 dark:text-slate-400">Battery Saving</span>
              <span className="font-bold text-green-600">£{batteryAnnualSaving.toFixed(0)}/yr</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-600 dark:text-slate-400">Solar Income</span>
              <span className="font-bold text-[#F5921E]">£{annualIncome.toFixed(0)}/yr</span>
            </div>
            <div className="border-t border-slate-200 dark:border-slate-700 pt-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-900 dark:text-white font-semibold">Total Benefit</span>
                <span className="font-black text-xl text-[#E8192C]">£{totalAnnualBenefit.toFixed(0)}/yr</span>
              </div>
            </div>
            <div className="bg-[#E8192C] text-white rounded-lg p-3 text-center">
              <span className="text-xs uppercase tracking-wide">Payback</span>
              <p className="text-2xl font-black">{paybackYears.toFixed(1)} years</p>
            </div>
          </div>

          {/* Copy Button */}
          <button
            onClick={copyResults}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-lg transition-colors text-sm"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-green-600 dark:text-green-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Results</span>
              </>
            )}
          </button>
        </div>
      </div>
    </>
  )
}
