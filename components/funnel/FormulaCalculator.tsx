'use client'

import { useState, useEffect, useMemo } from 'react'
import { Calculator, Battery, Sun, TrendingUp, Copy, Check, Minus, Plus, ArrowRight } from 'lucide-react'

// Battery product data
const BATTERY_PRODUCTS = [
  {
    id: 'sigenergy',
    name: 'Sigenergy 10.0',
    usableKwh: 9.5,
    dod: '100%',
    cycles: '10,000+',
  },
  {
    id: 'fox-ep12',
    name: 'Fox ESS EP12',
    usableKwh: 10.37,
    dod: '90%',
    cycles: '6,000+',
  },
  {
    id: 'fox-ep6',
    name: 'Fox ESS EP6',
    usableKwh: 5.18,
    dod: '90%',
    cycles: '6,000+',
  },
]

export default function FormulaCalculator() {
  // Tab state
  const [activeTab, setActiveTab] = useState(1)
  
  // Tab 1: Energy Audit inputs
  const [annualSpend, setAnnualSpend] = useState('1200')
  const [unitRate, setUnitRate] = useState('28')
  
  // Tab 2: Battery inputs
  const [selectedBattery, setSelectedBattery] = useState(BATTERY_PRODUCTS[0])
  const [batteryQty, setBatteryQty] = useState(1)
  const [offPeakRate, setOffPeakRate] = useState('7')
  
  // Tab 3: Solar inputs
  const [numPanels, setNumPanels] = useState('14')
  const [panelWattage, setPanelWattage] = useState('470')
  const [exportRate, setExportRate] = useState('15')
  
  // Tab 4: Payback inputs
  const [systemCost, setSystemCost] = useState('')
  
  // Copy state
  const [copied, setCopied] = useState(false)

  // Derived calculations
  const calculations = useMemo(() => {
    const spend = parseFloat(annualSpend) || 0
    const unit = parseFloat(unitRate) || 0
    const offPeak = parseFloat(offPeakRate) || 0
    const panels = parseFloat(numPanels) || 0
    const wattage = parseFloat(panelWattage) || 0
    const expRate = parseFloat(exportRate) || 0
    const cost = parseFloat(systemCost) || 0
    
    // Tab 1: Energy Audit
    const annualKwh = unit > 0 ? spend / (unit / 100) : 0
    const dailyKwh = annualKwh / 365
    const dailyCost = dailyKwh * (unit / 100)
    
    // Tab 2: Battery
    const totalBatteryCapacity = selectedBattery.usableKwh * batteryQty
    const coveredByBattery = Math.min(dailyKwh, totalBatteryCapacity)
    const remainingAtPeak = Math.max(0, dailyKwh - totalBatteryCapacity)
    const surplusCapacity = Math.max(0, totalBatteryCapacity - dailyKwh)
    
    const coveragePercent = dailyKwh > 0 ? (coveredByBattery / dailyKwh) * 100 : 0
    const surplusPercent = dailyKwh > 0 ? (surplusCapacity / dailyKwh) * 100 : 0
    
    const batteryCostOfCovered = coveredByBattery * (offPeak / 100)
    const batteryCostOfRemaining = remainingAtPeak * (unit / 100)
    const newDailyCost = batteryCostOfCovered + batteryCostOfRemaining
    const batteryDailySaving = dailyCost - newDailyCost
    const batteryAnnualSaving = batteryDailySaving * 365
    
    // Tab 3: Solar + Surplus
    const systemKwp = (wattage * panels) / 1000
    const dailyGeneration = systemKwp * 4.5
    const solarDailyIncome = dailyGeneration * (expRate / 100)
    const solarAnnualIncome = solarDailyIncome * 365
    
    const surplusDailyIncome = surplusCapacity * (expRate / 100)
    const surplusAnnualIncome = surplusDailyIncome * 365
    
    const totalDailyIncome = solarDailyIncome + surplusDailyIncome
    const totalAnnualIncome = solarAnnualIncome + surplusAnnualIncome
    
    // Tab 4: Payback
    const totalAnnualBenefit = batteryAnnualSaving + totalAnnualIncome
    const paybackYears = cost > 0 && totalAnnualBenefit > 0 ? cost / totalAnnualBenefit : 0
    
    return {
      // Tab 1
      annualKwh,
      dailyKwh,
      dailyCost,
      // Tab 2
      totalBatteryCapacity,
      coveredByBattery,
      remainingAtPeak,
      surplusCapacity,
      coveragePercent,
      surplusPercent,
      newDailyCost,
      batteryDailySaving,
      batteryAnnualSaving,
      // Tab 3
      systemKwp,
      dailyGeneration,
      solarDailyIncome,
      solarAnnualIncome,
      surplusDailyIncome,
      surplusAnnualIncome,
      totalDailyIncome,
      totalAnnualIncome,
      // Tab 4
      totalAnnualBenefit,
      paybackYears,
    }
  }, [annualSpend, unitRate, offPeakRate, selectedBattery, batteryQty, numPanels, panelWattage, exportRate, systemCost])

  const copyToClipboard = () => {
    const summary = `Energy Audit: ${calculations.annualKwh.toFixed(0)} kWh/year, ${calculations.dailyKwh.toFixed(2)} kWh/day, £${calculations.dailyCost.toFixed(2)}/day
Battery: ${batteryQty}× ${selectedBattery.name} (${calculations.totalBatteryCapacity.toFixed(1)} kWh) — £${calculations.batteryAnnualSaving.toFixed(0)}/year saving
Solar: ${numPanels}× ${panelWattage}W panels (${calculations.systemKwp.toFixed(2)} kWp) — £${calculations.solarAnnualIncome.toFixed(0)}/year export
${calculations.surplusCapacity > 0 ? `Surplus: ${calculations.surplusCapacity.toFixed(2)} kWh/day — £${calculations.surplusAnnualIncome.toFixed(0)}/year export` : ''}
Total benefit: £${calculations.totalAnnualBenefit.toFixed(0)}/year${systemCost ? `
System cost: £${systemCost}
Payback: ${calculations.paybackYears.toFixed(1)} years` : ''}`

    navigator.clipboard.writeText(summary)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Generate projection data for chart
  const projectionData = useMemo(() => {
    const cost = parseFloat(systemCost) || 0
    return Array.from({ length: 16 }, (_, year) => ({
      year,
      cumulative: year * calculations.totalAnnualBenefit,
      investment: cost,
    }))
  }, [systemCost, calculations.totalAnnualBenefit])

  return (
    <div id="formula-calculator" className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
      {/* Tab Header */}
      <div className="flex border-b border-slate-200">
        {[
          { num: 1, label: 'Energy Audit', icon: Calculator },
          { num: 2, label: 'Battery Savings', icon: Battery },
          { num: 3, label: 'Solar Income', icon: Sun },
          { num: 4, label: 'Payback', icon: TrendingUp },
        ].map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.num}
              onClick={() => setActiveTab(tab.num)}
              className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium transition-colors ${
                activeTab === tab.num
                  ? 'bg-[#E8192C] text-white'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden md:inline">{tab.label}</span>
              <span className="md:hidden">{tab.num}</span>
            </button>
          )
        })}
      </div>

      <div className="p-6">
        {/* TAB 1: Energy Audit */}
        {activeTab === 1 && (
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
                    placeholder="28"
                    step="0.01"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">p</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Current Ofgem cap: 28p/kWh</p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-5">
              <h4 className="text-sm font-semibold text-slate-900 mb-4">Your Energy Profile</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-black text-[#E8192C]">{calculations.annualKwh.toFixed(0)}</p>
                  <p className="text-xs text-slate-500">kWh/year</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-black text-[#E8192C]">{calculations.dailyKwh.toFixed(1)}</p>
                  <p className="text-xs text-slate-500">kWh/day</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-black text-[#E8192C]">£{calculations.dailyCost.toFixed(2)}</p>
                  <p className="text-xs text-slate-500">cost/day</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Battery Savings */}
        {activeTab === 2 && (
          <div className="space-y-6">
            {/* Daily usage display */}
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-sm text-slate-600">Your home uses <span className="font-bold text-slate-900">{calculations.dailyKwh.toFixed(2)} kWh</span> per day</p>
            </div>
            
            {/* Battery product selector */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">Choose a Battery Product</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {BATTERY_PRODUCTS.map((battery) => (
                  <button
                    key={battery.id}
                    onClick={() => setSelectedBattery(battery)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      selectedBattery.id === battery.id
                        ? 'border-[#E8192C] bg-[#E8192C]/5'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <p className="font-bold text-slate-900">{battery.name}</p>
                    <p className="text-sm text-slate-600">{battery.usableKwh} kWh usable</p>
                    <p className="text-xs text-slate-400 mt-1">{battery.dod} DoD • {battery.cycles} cycles</p>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Quantity selector */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">How Many?</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setBatteryQty(Math.max(1, batteryQty - 1))}
                  className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-2xl font-bold text-slate-900 w-8 text-center">{batteryQty}</span>
                <button
                  onClick={() => setBatteryQty(Math.min(4, batteryQty + 1))}
                  className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <span className="text-sm text-slate-500">
                  {batteryQty}× {selectedBattery.name} = <span className="font-bold text-slate-900">{calculations.totalBatteryCapacity.toFixed(1)} kWh</span>
                </span>
              </div>
            </div>
            
            {/* Off-peak rate */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Off-Peak Rate (p/kWh)</label>
              <div className="relative w-full md:w-48">
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
            
            {/* Coverage visualisation */}
            <div className="bg-slate-50 rounded-xl p-5">
              <h4 className="text-sm font-semibold text-slate-900 mb-3">Daily Coverage</h4>
              <div className="mb-2">
                <div className="h-8 rounded-lg overflow-hidden flex bg-slate-200">
                  {/* Green: covered by battery */}
                  <div 
                    className="bg-green-500 transition-all duration-500"
                    style={{ width: `${Math.min(100, calculations.coveragePercent)}%` }}
                  />
                  {/* Red: gap still at peak */}
                  {calculations.remainingAtPeak > 0 && (
                    <div 
                      className="bg-red-400"
                      style={{ width: `${(calculations.remainingAtPeak / calculations.dailyKwh) * 100}%` }}
                    />
                  )}
                </div>
                {/* Surplus bar if applicable */}
                {calculations.surplusCapacity > 0 && (
                  <div className="mt-2">
                    <div className="h-4 rounded-lg overflow-hidden flex bg-slate-200">
                      <div 
                        className="bg-teal-500 transition-all duration-500"
                        style={{ width: `${Math.min(100, calculations.surplusPercent)}%` }}
                      />
                    </div>
                    <p className="text-xs text-teal-600 mt-1 flex items-center gap-1">
                      <span className="font-bold">{calculations.surplusCapacity.toFixed(2)} kWh/day surplus</span>
                      <ArrowRight className="w-3 h-3" />
                      <span>available for export</span>
                    </p>
                  </div>
                )}
              </div>
              <div className="flex gap-4 text-xs mt-3">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded bg-green-500" /> 
                  Covered ({calculations.coveredByBattery.toFixed(1)} kWh at {offPeakRate}p)
                </span>
                {calculations.remainingAtPeak > 0 && (
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded bg-red-400" /> 
                    Gap ({calculations.remainingAtPeak.toFixed(1)} kWh at {unitRate}p)
                  </span>
                )}
                {calculations.surplusCapacity > 0 && (
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded bg-teal-500" /> 
                    Surplus ({calculations.surplusCapacity.toFixed(1)} kWh)
                  </span>
                )}
              </div>
            </div>
            
            {/* Savings breakdown */}
            <div className="bg-slate-50 rounded-xl p-5">
              <h4 className="text-sm font-semibold text-slate-900 mb-4">Savings Breakdown</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 text-sm">Previous daily cost</span>
                  <span className="font-bold text-slate-900">£{calculations.dailyCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 text-sm">New daily cost</span>
                  <span className="font-bold text-green-600">£{calculations.newDailyCost.toFixed(2)}</span>
                </div>
                <div className="border-t border-slate-200 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 text-sm">Daily saving</span>
                    <span className="font-bold text-[#E8192C]">£{calculations.batteryDailySaving.toFixed(2)}</span>
                  </div>
                </div>
                <div className="bg-[#E8192C] text-white rounded-lg p-4 text-center">
                  <p className="text-xs uppercase tracking-wide mb-1">Annual Battery Saving</p>
                  <p className="text-3xl font-black">£{calculations.batteryAnnualSaving.toFixed(0)}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Solar Income */}
        {activeTab === 3 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Number of Panels</label>
                <input
                  type="number"
                  value={numPanels}
                  onChange={(e) => setNumPanels(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#E8192C] focus:border-[#E8192C] outline-none"
                  placeholder="14"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Panel Wattage (W)</label>
                <input
                  type="number"
                  value={panelWattage}
                  onChange={(e) => setPanelWattage(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#E8192C] focus:border-[#E8192C] outline-none"
                  placeholder="470"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Export Rate (p/kWh)</label>
                <div className="relative">
                  <input
                    type="number"
                    value={exportRate}
                    onChange={(e) => setExportRate(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#E8192C] focus:border-[#E8192C] outline-none"
                    placeholder="15"
                    step="0.1"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">p</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-5 space-y-4">
              <h4 className="text-sm font-semibold text-slate-900">Solar Generation</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 text-sm">System size</span>
                  <span className="font-bold text-slate-900">{calculations.systemKwp.toFixed(2)} kWp</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 text-sm">Daily generation (avg)</span>
                  <span className="font-bold text-slate-900">{calculations.dailyGeneration.toFixed(1)} kWh</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 text-sm">Solar export income</span>
                  <span className="font-bold text-[#F5921E]">£{calculations.solarDailyIncome.toFixed(2)}/day → £{calculations.solarAnnualIncome.toFixed(0)}/year</span>
                </div>
              </div>
            </div>
            
            {/* Surplus income if applicable */}
            {calculations.surplusCapacity > 0 && (
              <div className="bg-teal-50 border border-teal-200 rounded-xl p-5">
                <h4 className="text-sm font-semibold text-teal-800 mb-3 flex items-center gap-2">
                  <Battery className="w-4 h-4" />
                  Battery Surplus Export
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-teal-700 text-sm">Daily surplus capacity</span>
                    <span className="font-bold text-teal-900">{calculations.surplusCapacity.toFixed(2)} kWh</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-teal-700 text-sm">Surplus export income</span>
                    <span className="font-bold text-teal-800">£{calculations.surplusDailyIncome.toFixed(2)}/day → £{calculations.surplusAnnualIncome.toFixed(0)}/year</span>
                  </div>
                </div>
              </div>
            )}

            {/* Total income */}
            <div className="bg-[#F5921E] text-white rounded-xl p-5 text-center">
              <p className="text-xs uppercase tracking-wide mb-1">Total Annual Export Income</p>
              <p className="text-3xl font-black">£{calculations.totalAnnualIncome.toFixed(0)}</p>
              {calculations.surplusCapacity > 0 && (
                <p className="text-xs mt-2 opacity-80">
                  Solar: £{calculations.solarAnnualIncome.toFixed(0)} + Surplus: £{calculations.surplusAnnualIncome.toFixed(0)}
                </p>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: Payback */}
        {activeTab === 4 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">System Cost</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">£</span>
                <input
                  type="number"
                  value={systemCost}
                  onChange={(e) => setSystemCost(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#E8192C] focus:border-[#E8192C] outline-none"
                  placeholder="Enter system cost"
                />
              </div>
              <p className="text-xs text-slate-500 mt-1">Total installed cost including battery and panels</p>
            </div>

            {systemCost && parseFloat(systemCost) > 0 && (
              <>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-slate-50 rounded-xl">
                    <p className="text-xs text-slate-500 mb-1">System Cost</p>
                    <p className="text-xl font-black text-slate-900">£{(parseFloat(systemCost) || 0).toLocaleString()}</p>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-xl">
                    <p className="text-xs text-slate-500 mb-1">Annual Benefit</p>
                    <p className="text-xl font-black text-green-600">£{calculations.totalAnnualBenefit.toFixed(0)}</p>
                  </div>
                  <div className="text-center p-4 bg-[#E8192C] rounded-xl text-white">
                    <p className="text-xs mb-1">Payback</p>
                    <p className="text-xl font-black">{calculations.paybackYears.toFixed(1)} yrs</p>
                  </div>
                </div>

                {/* Projection Chart */}
                <div className="bg-slate-50 rounded-xl p-5">
                  <h4 className="text-sm font-semibold text-slate-900 mb-4">15-Year Projection</h4>
                  <div className="relative h-48">
                    {/* Y-axis */}
                    <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-slate-400 pr-2 w-12">
                      <span>£{(calculations.totalAnnualBenefit * 15).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                      <span>£{((parseFloat(systemCost) || 0)).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                      <span>£0</span>
                    </div>
                    
                    {/* Chart */}
                    <div className="ml-14 h-full relative">
                      {/* Investment line */}
                      <div 
                        className="absolute w-full border-t-2 border-dashed border-slate-400"
                        style={{ 
                          bottom: `${((parseFloat(systemCost) || 0) / (calculations.totalAnnualBenefit * 15)) * 100}%`
                        }}
                      >
                        <span className="absolute right-0 -top-5 text-xs text-slate-500 bg-slate-50 px-1">Investment</span>
                      </div>
                      
                      {/* Savings line */}
                      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="savingsGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path
                          d={`M 0 100 ${projectionData.map((d, i) => `L ${(i / 15) * 100} ${100 - (d.cumulative / (calculations.totalAnnualBenefit * 15)) * 100}`).join(' ')} L 100 100 Z`}
                          fill="url(#savingsGrad)"
                        />
                        <path
                          d={`M 0 100 ${projectionData.map((d, i) => `L ${(i / 15) * 100} ${100 - (d.cumulative / (calculations.totalAnnualBenefit * 15)) * 100}`).join(' ')}`}
                          fill="none"
                          stroke="#22c55e"
                          strokeWidth="2"
                        />
                      </svg>
                      
                      {/* X-axis */}
                      <div className="absolute -bottom-5 left-0 right-0 flex justify-between text-xs text-slate-400">
                        <span>0</span>
                        <span>5</span>
                        <span>10</span>
                        <span>15 yrs</span>
                      </div>
                      
                      {/* Crossover point */}
                      {calculations.paybackYears <= 15 && calculations.paybackYears > 0 && (
                        <div 
                          className="absolute w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg"
                          style={{
                            left: `${(calculations.paybackYears / 15) * 100}%`,
                            bottom: `${((parseFloat(systemCost) || 0) / (calculations.totalAnnualBenefit * 15)) * 100}%`,
                            transform: 'translate(-50%, 50%)'
                          }}
                        >
                          <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-green-600 whitespace-nowrap bg-white px-1 rounded">
                            Break-even
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* 15-year total */}
                  <div className="mt-8 pt-4 border-t border-slate-200 text-center">
                    <p className="text-sm text-slate-500">15-Year Total Benefit</p>
                    <p className="text-3xl font-black text-green-600">£{(calculations.totalAnnualBenefit * 15).toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                    <p className="text-sm text-slate-500 mt-1">
                      Net profit after payback: <span className="font-bold text-green-600">£{((calculations.totalAnnualBenefit * 15) - (parseFloat(systemCost) || 0)).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    </p>
                  </div>
                </div>
              </>
            )}
            
            {(!systemCost || parseFloat(systemCost) === 0) && (
              <div className="bg-slate-50 rounded-xl p-8 text-center">
                <p className="text-slate-500">Enter the system cost above to calculate payback period</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Summary Footer - Always Visible */}
      <div className="border-t border-slate-200 bg-slate-50 p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-slate-900">Total Annual Benefit</h4>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-white rounded-lg p-3 border border-slate-200">
            <p className="text-xs text-slate-500 uppercase">Battery Saving</p>
            <p className="text-lg font-bold text-green-600">£{calculations.batteryAnnualSaving.toFixed(0)}</p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-slate-200">
            <p className="text-xs text-slate-500 uppercase">Solar Export</p>
            <p className="text-lg font-bold text-[#F5921E]">£{calculations.solarAnnualIncome.toFixed(0)}</p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-slate-200">
            <p className="text-xs text-slate-500 uppercase">Surplus Export</p>
            <p className="text-lg font-bold text-teal-600">£{calculations.surplusAnnualIncome.toFixed(0)}</p>
          </div>
          <div className="bg-[#E8192C] rounded-lg p-3 text-white">
            <p className="text-xs uppercase">Combined</p>
            <p className="text-lg font-bold">£{calculations.totalAnnualBenefit.toFixed(0)}/yr</p>
          </div>
        </div>
        
        {systemCost && parseFloat(systemCost) > 0 && (
          <div className="text-center pt-3 border-t border-slate-200">
            <p className="text-sm text-slate-500">
              System: £{(parseFloat(systemCost) || 0).toLocaleString()} • 
              <span className="font-bold text-[#E8192C] ml-2">Payback: {calculations.paybackYears.toFixed(1)} years</span>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
