'use client'

import { useState, useMemo } from 'react'
import { Copy, Check, Zap, Battery, Sun, TrendingUp, Clock, AlertCircle, ChevronRight, Minus, Plus } from 'lucide-react'
import Image from 'next/image'

// ============================================
// PRODUCT DATA
// ============================================

const BATTERY_PRODUCTS = [
  {
    id: 'sigenergy',
    name: 'Sigenergy SigenStor 10.0',
    nominalKwh: 9.04,
    usableKwh: 8.76,
    dod: 100,
    dodLabel: '100%',
    cycles: '10,000',
    maxStack: 6,
    chargeRateW: 4600,
    ipRating: 'IP66',
    warranty: '10 years',
    defaultPrice: 2500,
    image: '/products/sigenergy-10.jpg',
  },
  {
    id: 'ecoflow',
    name: 'EcoFlow PowerOcean 5kWh',
    nominalKwh: 5.12,
    usableKwh: 4.8,
    dod: 95,
    dodLabel: '95%',
    cycles: '6,000',
    maxStack: 4,
    chargeRateW: 3300,
    ipRating: 'IP65',
    warranty: '15 years',
    defaultPrice: 1200,
    image: '/products/ecoflow-powerocean.jpg',
  },
]

// ============================================
// UTILITY COMPONENTS
// ============================================

function TabButton({ 
  active, 
  onClick, 
  icon: Icon, 
  label, 
  step 
}: { 
  active: boolean
  onClick: () => void
  icon: React.ElementType
  label: string
  step: number 
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium text-sm transition-all ${
        active 
          ? 'bg-[#E8192C] text-white shadow-lg' 
          : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
      }`}
    >
      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
        active ? 'bg-white/20' : 'bg-slate-100'
      }`}>
        {step}
      </span>
      <Icon className="w-4 h-4" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  )
}

function InputField({ 
  label, 
  value, 
  onChange, 
  prefix = '', 
  suffix = '',
  hint = '',
}: { 
  label: string
  value: string
  onChange: (v: string) => void
  prefix?: string
  suffix?: string
  hint?: string
}) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <div className="flex items-center gap-2">
        {prefix && <span className="text-slate-500 font-medium">{prefix}</span>}
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#E8192C]/20 focus:border-[#E8192C] outline-none transition-all text-slate-900 font-medium text-base"
        />
        {suffix && <span className="text-slate-500 font-medium">{suffix}</span>}
      </div>
      {hint && <p className="text-xs text-slate-500">{hint}</p>}
    </div>
  )
}

// ============================================
// TAB 1: ENERGY AUDIT
// ============================================

function EnergyAuditTab({ 
  monthlyBill, 
  setMonthlyBill, 
  unitRate, 
  setUnitRate,
  dailyKwh,
  dailyCost,
  annualKwh,
  annualSpend
}: {
  monthlyBill: string
  setMonthlyBill: (v: string) => void
  unitRate: string
  setUnitRate: (v: string) => void
  dailyKwh: number
  dailyCost: number
  annualKwh: number
  annualSpend: number
}) {
  const monthlyNum = parseFloat(monthlyBill) || 0

  return (
    <div className="space-y-8">
      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <InputField
          label="Monthly electricity bill"
          value={monthlyBill}
          onChange={setMonthlyBill}
          prefix="£"
          hint="Enter your average monthly electricity bill"
        />
        <InputField
          label="Unit rate"
          value={unitRate}
          onChange={setUnitRate}
          suffix="p/kWh"
          hint="Ofgem price cap: 28p (Apr 2026)"
        />
      </div>

      {/* Conversion display */}
      <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
        <p className="text-sm text-slate-600 mb-1">Annual spend calculation</p>
        <p className="text-2xl font-bold text-slate-900">
          £{monthlyNum.toFixed(0)}/month × 12 = <span className="text-[#E8192C]">£{annualSpend.toLocaleString()}/year</span>
        </p>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500 mb-1">Annual usage</p>
          <p className="text-2xl font-bold text-slate-900">{annualKwh.toLocaleString()} kWh</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500 mb-1">Daily usage</p>
          <p className="text-2xl font-bold text-slate-900">{dailyKwh.toFixed(2)} kWh</p>
        </div>
        <div className="bg-gradient-to-br from-[#E8192C] to-[#c01424] rounded-xl p-5 text-white shadow-lg">
          <p className="text-sm text-white/80 mb-1">Daily running cost</p>
          <p className="text-2xl md:text-3xl font-bold">£{dailyCost.toFixed(2)}</p>
        </div>
      </div>

      {/* Anchor statement */}
      <div className="text-center py-6 border-t border-slate-200">
        <p className="text-xl text-slate-700">
          Your home costs <span className="text-[#E8192C] font-bold text-2xl">£{dailyCost.toFixed(2)} a day</span> to run.
        </p>
        <p className="text-slate-500 mt-1">Let&apos;s change that.</p>
      </div>
    </div>
  )
}

// ============================================
// TAB 2: BATTERY SAVINGS
// ============================================

function BatterySavingsTab({
  dailyKwh,
  dailyCost,
  unitRate,
  selectedProduct,
  setSelectedProduct,
  quantity,
  setQuantity,
  batteryPrices,
  setBatteryPrice,
  offPeakRate,
  setOffPeakRate,
}: {
  dailyKwh: number
  dailyCost: number
  unitRate: string
  selectedProduct: string
  setSelectedProduct: (v: string) => void
  quantity: number
  setQuantity: (v: number) => void
  batteryPrices: Record<string, number>
  setBatteryPrice: (id: string, price: number) => void
  offPeakRate: string
  setOffPeakRate: (v: string) => void
}) {
  const product = BATTERY_PRODUCTS.find(p => p.id === selectedProduct)!
  const totalCapacity = product.usableKwh * quantity
  const totalBatteryCost = batteryPrices[selectedProduct] * quantity
  
  const offPeakNum = parseFloat(offPeakRate) || 7
  const unitRateNum = parseFloat(unitRate) || 28
  
  // Coverage calculations
  const coveredKwh = Math.min(totalCapacity, dailyKwh)
  const gapKwh = Math.max(0, dailyKwh - totalCapacity)
  const surplusKwh = Math.max(0, totalCapacity - dailyKwh)
  const coveragePercent = Math.min(100, (totalCapacity / dailyKwh) * 100)
  
  // Charge time
  const chargeHours = totalCapacity / (product.chargeRateW / 1000)
  const canChargeOvernight = chargeHours <= 6
  
  // Savings calculations
  const batteryPortionCost = coveredKwh * (offPeakNum / 100)
  const peakPortionCost = gapKwh * (unitRateNum / 100)
  const newDailyCost = batteryPortionCost + peakPortionCost
  const dailySaving = dailyCost - newDailyCost
  const annualSaving = dailySaving * 365

  return (
    <div className="space-y-8">
      {/* Daily usage reference */}
      <div className="bg-slate-900 text-white rounded-xl p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">Your daily usage (from Tab 1)</p>
            <p className="text-2xl font-bold">{dailyKwh.toFixed(2)} kWh/day</p>
          </div>
          <Zap className="w-10 h-10 text-[#E8192C]" />
        </div>
      </div>

      {/* Product Selection */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4">Choose your battery</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {BATTERY_PRODUCTS.map((p) => (
            <div
              key={p.id}
              onClick={() => {
                setSelectedProduct(p.id)
                setQuantity(1)
              }}
              className={`relative cursor-pointer rounded-xl border-2 p-5 transition-all ${
                selectedProduct === p.id
                  ? 'border-[#E8192C] bg-[#E8192C]/5 shadow-lg'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              {selectedProduct === p.id && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-[#E8192C] rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
              
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 truncate">{p.name}</h4>
                  <p className="text-[#E8192C] font-semibold">{p.usableKwh} kWh usable</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {p.dodLabel} DoD · {p.cycles} cycles · Stack up to {p.maxStack}
                  </p>
                </div>
              </div>
              
              {/* Editable price */}
              <div className="mt-4 pt-4 border-t border-slate-200">
                <label className="text-xs text-slate-500 block mb-1">Price per battery</label>
                <div className="flex items-center gap-2">
                  <span className="text-slate-700 font-medium">£</span>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={batteryPrices[p.id]}
                    onChange={(e) => setBatteryPrice(p.id, parseFloat(e.target.value) || 0)}
                    onClick={(e) => e.stopPropagation()}
                    className="w-24 px-2 py-2 border border-slate-300 rounded text-slate-900 font-medium text-base focus:ring-2 focus:ring-[#E8192C]/20 focus:border-[#E8192C] outline-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quantity selector */}
      <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-slate-900">How many batteries?</h4>
            <p className="text-sm text-slate-500">Max {product.maxStack} for {product.name.split(' ')[0]}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 rounded-lg bg-white border border-slate-300 flex items-center justify-center hover:bg-slate-50 transition-colors"
            >
              <Minus className="w-4 h-4 text-slate-600" />
            </button>
            <span className="text-2xl font-bold text-slate-900 w-8 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(Math.min(product.maxStack, quantity + 1))}
              className="w-10 h-10 rounded-lg bg-white border border-slate-300 flex items-center justify-center hover:bg-slate-50 transition-colors"
            >
              <Plus className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between text-sm">
          <span className="text-slate-600">Total capacity: <span className="font-bold text-slate-900">{totalCapacity.toFixed(2)} kWh</span></span>
          <span className="text-slate-600">Cost: <span className="font-bold text-slate-900">£{totalBatteryCost.toLocaleString()}</span></span>
        </div>
      </div>

      {/* Coverage bar */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
        <h4 className="font-bold text-slate-900 mb-4">Daily coverage</h4>
        
        {/* The bar */}
        <div className="relative h-12 bg-slate-200 rounded-lg overflow-hidden mb-4">
          {/* Green: covered at off-peak */}
          <div
            className="absolute inset-y-0 left-0 bg-emerald-500 transition-all duration-500"
            style={{ width: `${Math.min(100, coveragePercent)}%` }}
          />
          {/* Teal: surplus for export */}
          {surplusKwh > 0 && (
            <div
              className="absolute inset-y-0 bg-teal-400 transition-all duration-500"
              style={{ 
                left: `${(dailyKwh / totalCapacity) * 100}%`,
                width: `${(surplusKwh / totalCapacity) * 100}%`
              }}
            />
          )}
          {/* Usage marker */}
          {surplusKwh > 0 && (
            <div
              className="absolute inset-y-0 w-0.5 bg-slate-900"
              style={{ left: `${(dailyKwh / totalCapacity) * 100}%` }}
            />
          )}
        </div>
        
        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-emerald-500 rounded" />
            <span className="text-slate-600">Covered at off-peak: <span className="font-medium">{coveredKwh.toFixed(1)} kWh</span></span>
          </div>
          {gapKwh > 0 && (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-slate-200 rounded" />
              <span className="text-slate-600">Gap at peak rate: <span className="font-medium text-red-600">{gapKwh.toFixed(1)} kWh</span></span>
            </div>
          )}
          {surplusKwh > 0 && (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-teal-400 rounded" />
              <span className="text-slate-600">Surplus for export: <span className="font-medium text-teal-600">{surplusKwh.toFixed(1)} kWh</span></span>
            </div>
          )}
        </div>
        
        <p className="mt-4 text-lg font-medium text-slate-900">
          {coveragePercent >= 100 
            ? `100% covered + ${surplusKwh.toFixed(1)} kWh surplus`
            : `${coveragePercent.toFixed(1)}% covered`
          }
        </p>
      </div>

      {/* Charge time */}
      <div className={`rounded-xl p-5 border ${canChargeOvernight ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'}`}>
        <div className="flex items-start gap-4">
          <Clock className={`w-6 h-6 flex-shrink-0 ${canChargeOvernight ? 'text-emerald-600' : 'text-amber-600'}`} />
          <div>
            <h4 className="font-bold text-slate-900">Charge time</h4>
            <p className="text-sm text-slate-600 mt-1">
              {quantity}× {product.name.split(' ')[0]}: {totalCapacity.toFixed(1)} kWh ÷ {(product.chargeRateW / 1000).toFixed(1)} kW = <span className="font-bold">{chargeHours.toFixed(1)} hours</span>
            </p>
            <p className={`text-sm mt-2 font-medium ${canChargeOvernight ? 'text-emerald-700' : 'text-amber-700'}`}>
              {canChargeOvernight 
                ? '✓ Fully charged in one night (6-hour off-peak window)'
                : '⚠ May need 2 nights to fully charge on 6-hour off-peak window'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Off-peak rate input */}
      <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
        <InputField
          label="Off-peak rate"
          value={offPeakRate}
          onChange={setOffPeakRate}
          suffix="p/kWh"
          hint="Octopus Intelligent Go: ~7p | Economy 7: ~10p"
        />
      </div>

      {/* Savings calculation */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 text-white">
        <h4 className="text-lg font-bold mb-4">With {quantity}× {product.name.split(' ')[0]}</h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-slate-400">Daily cost</p>
            <p className="text-xl">
              <span className="line-through text-slate-500">£{dailyCost.toFixed(2)}</span>
              <ChevronRight className="w-4 h-4 inline mx-1" />
              <span className="font-bold text-emerald-400">£{newDailyCost.toFixed(2)}</span>
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-400">Daily saving</p>
            <p className="text-xl font-bold text-emerald-400">£{dailySaving.toFixed(2)}</p>
          </div>
        </div>
        
        <div className="pt-4 border-t border-slate-700">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-sm text-slate-400">Annual saving</p>
              <p className="text-2xl md:text-3xl font-bold text-emerald-400">£{Math.round(annualSaving).toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-400">Battery cost</p>
              <p className="text-xl font-medium">£{totalBatteryCost.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        {surplusKwh > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-700 flex items-center gap-2 text-teal-400">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">Surplus: {surplusKwh.toFixed(1)} kWh/day → rolls into Solar Income</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================
// TAB 3: SOLAR INCOME
// ============================================

function SolarIncomeTab({
  panels,
  setPanels,
  wattage,
  setWattage,
  exportRate,
  setExportRate,
  pricePerKwp,
  setPricePerKwp,
  surplusKwh,
}: {
  panels: string
  setPanels: (v: string) => void
  wattage: string
  setWattage: (v: string) => void
  exportRate: string
  setExportRate: (v: string) => void
  pricePerKwp: string
  setPricePerKwp: (v: string) => void
  surplusKwh: number
}) {
  const panelsNum = parseInt(panels) || 12
  const wattageNum = parseInt(wattage) || 470
  const exportRateNum = parseFloat(exportRate) || 15
  const pricePerKwpNum = parseFloat(pricePerKwp) || 1000
  
  const systemKwp = (panelsNum * wattageNum) / 1000
  const solarCost = systemKwp * pricePerKwpNum
  
  // Solar generation (UK average ~4.5 peak sun hours)
  const dailyGeneration = systemKwp * 4.5
  const dailySolarExport = dailyGeneration * (exportRateNum / 100)
  const annualSolarExport = dailySolarExport * 365
  
  // Surplus from battery
  const dailySurplusExport = surplusKwh * (exportRateNum / 100)
  const annualSurplusExport = dailySurplusExport * 365
  
  const totalDailyExport = dailySolarExport + dailySurplusExport
  const totalAnnualExport = annualSolarExport + annualSurplusExport

  return (
    <div className="space-y-8">
      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <InputField
          label="Number of panels"
          value={panels}
          onChange={setPanels}
          hint="Typical UK roof: 10-16 panels"
        />
        <InputField
          label="Panel wattage"
          value={wattage}
          onChange={setWattage}
          suffix="W"
          hint="Modern panels: 400-500W"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <InputField
          label="Export rate"
          value={exportRate}
          onChange={setExportRate}
          suffix="p/kWh"
          hint="SEG rates vary: 12-15p typical"
        />
        <InputField
          label="Price per kWp installed"
          value={pricePerKwp}
          onChange={setPricePerKwp}
          prefix="£"
          suffix="/kWp"
          hint="Covers panels, inverter, labour, scaffold — everything"
        />
      </div>

      {/* System summary */}
      <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-slate-500">System size</p>
            <p className="text-xl font-bold text-slate-900">{panelsNum} × {wattageNum}W = {systemKwp.toFixed(2)} kWp</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-500">Solar cost</p>
            <p className="text-xl font-bold text-[#E8192C]">£{Math.round(solarCost).toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Export income breakdown */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-200">
          <h4 className="font-bold text-slate-900">Export income breakdown</h4>
        </div>
        
        <div className="divide-y divide-slate-100">
          {/* Solar export */}
          <div className="p-5 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Sun className="w-5 h-5 text-amber-500" />
              <div>
                <p className="font-medium text-slate-900">Solar export</p>
                <p className="text-sm text-slate-500">{dailyGeneration.toFixed(1)} kWh/day × {exportRateNum}p</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-slate-900">£{dailySolarExport.toFixed(2)}/day</p>
              <p className="text-sm text-slate-500">£{Math.round(annualSolarExport).toLocaleString()}/year</p>
            </div>
          </div>
          
          {/* Surplus export */}
          {surplusKwh > 0 && (
            <div className="p-5 flex justify-between items-center bg-teal-50">
              <div className="flex items-center gap-3">
                <Battery className="w-5 h-5 text-teal-600" />
                <div>
                  <p className="font-medium text-slate-900">Battery surplus export</p>
                  <p className="text-sm text-slate-500">{surplusKwh.toFixed(1)} kWh/day × {exportRateNum}p</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-teal-600">£{dailySurplusExport.toFixed(2)}/day</p>
                <p className="text-sm text-teal-600">£{Math.round(annualSurplusExport).toLocaleString()}/year</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Total */}
        <div className="p-5 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
          <div className="flex justify-between items-center">
            <p className="font-bold">Total export income</p>
            <div className="text-right">
              <p className="text-2xl font-bold">£{totalDailyExport.toFixed(2)}/day</p>
              <p className="text-amber-100">£{Math.round(totalAnnualExport).toLocaleString()}/year</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// TAB 4: PAYBACK
// ============================================

function PaybackTab({
  batteryCost,
  solarCost,
  annualBatterySaving,
  annualSolarExport,
  annualSurplusExport,
  customSystemCost,
  setCustomSystemCost,
  systemKwp,
}: {
  batteryCost: number
  solarCost: number
  annualBatterySaving: number
  annualSolarExport: number
  annualSurplusExport: number
  customSystemCost: string
  setCustomSystemCost: (v: string) => void
  systemKwp: number
}) {
  const calculatedCost = batteryCost + solarCost
  const systemCost = customSystemCost ? parseFloat(customSystemCost) : calculatedCost
  const totalAnnualBenefit = annualBatterySaving + annualSolarExport + annualSurplusExport
  const paybackYears = totalAnnualBenefit > 0 ? systemCost / totalAnnualBenefit : 0
  const fifteenYearProfit = (totalAnnualBenefit * 15) - systemCost

  // Generate chart data
  const chartData = Array.from({ length: 16 }, (_, i) => ({
    year: i,
    savings: totalAnnualBenefit * i,
  }))

  const maxSavings = totalAnnualBenefit * 15

  return (
    <div className="space-y-8">
      {/* Cost breakdown */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-200">
          <h4 className="font-bold text-slate-900">System cost breakdown</h4>
        </div>
        <div className="p-5 space-y-3">
          <div className="flex justify-between">
            <span className="text-slate-600">Solar ({systemKwp.toFixed(2)} kWp)</span>
            <span className="font-medium text-slate-900">£{Math.round(solarCost).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Battery</span>
            <span className="font-medium text-slate-900">£{Math.round(batteryCost).toLocaleString()}</span>
          </div>
          <div className="flex justify-between pt-3 border-t border-slate-200">
            <span className="font-bold text-slate-900">Calculated total</span>
            <span className="font-bold text-slate-900">£{Math.round(calculatedCost).toLocaleString()}</span>
          </div>
        </div>
        
        {/* Custom override */}
        <div className="p-5 bg-slate-50 border-t border-slate-200">
          <InputField
            label="Or enter custom price (for discounts)"
            value={customSystemCost}
            onChange={setCustomSystemCost}
            prefix="£"
            hint="Leave blank to use calculated cost"
          />
        </div>
      </div>

      {/* Benefit breakdown */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-200">
          <h4 className="font-bold text-slate-900">Annual benefit breakdown</h4>
        </div>
        <div className="p-5 space-y-3">
          <div className="flex justify-between">
            <span className="text-slate-600">Battery saving</span>
            <span className="font-medium text-emerald-600">£{Math.round(annualBatterySaving).toLocaleString()}/year</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Solar export</span>
            <span className="font-medium text-amber-600">£{Math.round(annualSolarExport).toLocaleString()}/year</span>
          </div>
          {annualSurplusExport > 0 && (
            <div className="flex justify-between">
              <span className="text-slate-600">Surplus export</span>
              <span className="font-medium text-teal-600">£{Math.round(annualSurplusExport).toLocaleString()}/year</span>
            </div>
          )}
          <div className="flex justify-between pt-3 border-t border-slate-200">
            <span className="font-bold text-slate-900">Total annual benefit</span>
            <span className="font-bold text-emerald-600">£{Math.round(totalAnnualBenefit).toLocaleString()}/year</span>
          </div>
        </div>
      </div>

      {/* Payback result */}
      <div className="bg-gradient-to-br from-[#E8192C] to-[#c01424] rounded-xl p-8 text-white text-center">
        <p className="text-white/80 text-sm uppercase tracking-wide mb-2">Payback period</p>
        <p className="text-3xl md:text-5xl font-bold">{paybackYears.toFixed(1)} years</p>
        <p className="text-white/80 mt-4">
          After payback: <span className="font-bold text-white">£{Math.round(totalAnnualBenefit).toLocaleString()}/year</span> in pure savings
        </p>
      </div>

      {/* 15-year projection chart */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h4 className="font-bold text-slate-900 mb-4">15-year projection</h4>
        
        {/* Simple SVG chart */}
        <div className="relative h-64">
          <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
            {/* Grid lines */}
            {[0, 1, 2, 3, 4].map(i => (
              <line key={i} x1="40" y1={40 + i * 35} x2="380" y2={40 + i * 35} stroke="#e2e8f0" strokeWidth="1" />
            ))}
            
            {/* Investment line */}
            <line 
              x1="40" 
              y1={180 - (systemCost / maxSavings * 140)} 
              x2="380" 
              y2={180 - (systemCost / maxSavings * 140)} 
              stroke="#E8192C" 
              strokeWidth="2" 
              strokeDasharray="5,5" 
            />
            
            {/* Savings curve */}
            <path
              d={`M 40 180 ${chartData.map((d, i) => `L ${40 + (i * 22.67)} ${180 - (d.savings / maxSavings * 140)}`).join(' ')}`}
              fill="none"
              stroke="#10b981"
              strokeWidth="3"
            />
            
            {/* Crossover point */}
            {paybackYears <= 15 && paybackYears > 0 && (
              <circle
                cx={40 + paybackYears * 22.67}
                cy={180 - (systemCost / maxSavings * 140)}
                r="6"
                fill="#E8192C"
              />
            )}
            
            {/* Labels */}
            <text x="40" y="198" fontSize="10" fill="#64748b">0</text>
            <text x="150" y="198" fontSize="10" fill="#64748b">5 years</text>
            <text x="260" y="198" fontSize="10" fill="#64748b">10 years</text>
            <text x="360" y="198" fontSize="10" fill="#64748b">15</text>
          </svg>
          
          {/* Legend */}
          <div className="absolute bottom-0 right-0 flex gap-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-0.5 bg-emerald-500" />
              <span className="text-slate-600">Cumulative savings</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-0.5 bg-[#E8192C]" style={{ borderStyle: 'dashed' }} />
              <span className="text-slate-600">Investment</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-slate-200 text-center">
          <p className="text-lg text-slate-700">
            15-year net profit: <span className="font-bold text-emerald-600">£{Math.round(fifteenYearProfit).toLocaleString()}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

// ============================================
// SUMMARY FOOTER
// ============================================

function SummaryFooter({
  monthlyBill,
  dailyKwh,
  annualKwh,
  selectedProduct,
  quantity,
  batteryCost,
  solarCost,
  systemKwp,
  panels,
  wattage,
  annualBatterySaving,
  annualSolarExport,
  annualSurplusExport,
  totalCapacity,
  coveragePercent,
  chargeHours,
  paybackYears,
}: {
  monthlyBill: string
  dailyKwh: number
  annualKwh: number
  selectedProduct: string
  quantity: number
  batteryCost: number
  solarCost: number
  systemKwp: number
  panels: string
  wattage: string
  annualBatterySaving: number
  annualSolarExport: number
  annualSurplusExport: number
  totalCapacity: number
  coveragePercent: number
  chargeHours: number
  paybackYears: number
}) {
  const [copied, setCopied] = useState(false)
  const product = BATTERY_PRODUCTS.find(p => p.id === selectedProduct)!
  const totalCost = batteryCost + solarCost
  const totalAnnualBenefit = annualBatterySaving + annualSolarExport + annualSurplusExport
  const fifteenYearProfit = (totalAnnualBenefit * 15) - totalCost

  const handleCopy = () => {
    const monthlyNum = parseFloat(monthlyBill) || 0
    const text = `Monthly bill: £${monthlyNum.toFixed(0)} (£${(monthlyNum * 12).toLocaleString()}/year)
Usage: ${annualKwh.toLocaleString()} kWh/year, ${dailyKwh.toFixed(2)} kWh/day

Battery: ${quantity}× ${product.name} (${totalCapacity.toFixed(2)} kWh) — £${batteryCost.toLocaleString()}
Coverage: ${coveragePercent.toFixed(1)}% | Charge time: ${chargeHours.toFixed(1)} hours
Annual saving: £${Math.round(annualBatterySaving).toLocaleString()}

Solar: ${panels}× ${wattage}W panels (${systemKwp.toFixed(2)} kWp) — £${Math.round(solarCost).toLocaleString()}
Annual export: £${Math.round(annualSolarExport).toLocaleString()}${annualSurplusExport > 0 ? `\nSurplus export: £${Math.round(annualSurplusExport).toLocaleString()}` : ''}

Total system: £${Math.round(totalCost).toLocaleString()}
Total annual benefit: £${Math.round(totalAnnualBenefit).toLocaleString()}
Payback: ${paybackYears.toFixed(1)} years
15-year net profit: £${Math.round(fifteenYearProfit).toLocaleString()}`

    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-slate-900 text-white rounded-xl p-6 mt-8">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-bold">Your system summary</h4>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Costs */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Solar ({systemKwp.toFixed(2)} kWp)</span>
            <span>£{Math.round(solarCost).toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Battery ({quantity}× {product.name.split(' ')[0]})</span>
            <span>£{Math.round(batteryCost).toLocaleString()}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-slate-700">
            <span className="font-medium">Total cost</span>
            <span className="font-bold">£{Math.round(totalCost).toLocaleString()}</span>
          </div>
        </div>
        
        {/* Benefits */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Battery saving</span>
            <span className="text-emerald-400">£{Math.round(annualBatterySaving).toLocaleString()}/yr</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Solar export</span>
            <span className="text-amber-400">£{Math.round(annualSolarExport).toLocaleString()}/yr</span>
          </div>
          {annualSurplusExport > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Surplus export</span>
              <span className="text-teal-400">£${Math.round(annualSurplusExport).toLocaleString()}/yr</span>
            </div>
          )}
          <div className="flex justify-between pt-2 border-t border-slate-700">
            <span className="font-medium">Total benefit</span>
            <span className="font-bold text-emerald-400">£{Math.round(totalAnnualBenefit).toLocaleString()}/yr</span>
          </div>
        </div>
      </div>
      
      {/* Payback bar */}
      <div className="mt-6 pt-6 border-t border-slate-700">
        <div className="bg-slate-800 rounded-lg h-4 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#E8192C] to-emerald-500 transition-all duration-500"
            style={{ width: `${Math.min(100, (1 / paybackYears) * 100 * 3)}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <span className="text-slate-400">Payback</span>
          <span className="font-bold text-[#E8192C]">{paybackYears.toFixed(1)} years</span>
        </div>
      </div>
    </div>
  )
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function FormulaCalculator() {
  // Tab state
  const [activeTab, setActiveTab] = useState(0)
  
  // Tab 1: Energy Audit (now monthly bill)
  const [monthlyBill, setMonthlyBill] = useState('150')
  const [unitRate, setUnitRate] = useState('28')
  
  // Tab 2: Battery
  const [selectedProduct, setSelectedProduct] = useState('sigenergy')
  const [quantity, setQuantity] = useState(2)
  const [batteryPrices, setBatteryPrices] = useState<Record<string, number>>({
    sigenergy: 2500,
    ecoflow: 1200,
  })
  const [offPeakRate, setOffPeakRate] = useState('7')
  
  // Tab 3: Solar
  const [panels, setPanels] = useState('12')
  const [wattage, setWattage] = useState('470')
  const [exportRate, setExportRate] = useState('15')
  const [pricePerKwp, setPricePerKwp] = useState('1000')
  
  // Tab 4: Payback
  const [customSystemCost, setCustomSystemCost] = useState('')

  // Derived values
  const calculations = useMemo(() => {
    const monthlyNum = parseFloat(monthlyBill) || 0
    const unitRateNum = parseFloat(unitRate) || 28
    const offPeakNum = parseFloat(offPeakRate) || 7
    const exportRateNum = parseFloat(exportRate) || 15
    const panelsNum = parseInt(panels) || 12
    const wattageNum = parseInt(wattage) || 470
    const pricePerKwpNum = parseFloat(pricePerKwp) || 1000

    const annualSpend = monthlyNum * 12
    const annualKwh = Math.round(annualSpend / (unitRateNum / 100))
    const dailyKwh = annualKwh / 365
    const dailyCost = dailyKwh * (unitRateNum / 100)

    const product = BATTERY_PRODUCTS.find(p => p.id === selectedProduct)!
    const totalCapacity = product.usableKwh * quantity
    const batteryCost = batteryPrices[selectedProduct] * quantity
    
    const coveredKwh = Math.min(totalCapacity, dailyKwh)
    const surplusKwh = Math.max(0, totalCapacity - dailyKwh)
    const coveragePercent = dailyKwh > 0 ? Math.min(100, (totalCapacity / dailyKwh) * 100) : 0
    const chargeHours = totalCapacity / (product.chargeRateW / 1000)
    
    const batteryPortionCost = coveredKwh * (offPeakNum / 100)
    const peakPortionCost = Math.max(0, dailyKwh - totalCapacity) * (unitRateNum / 100)
    const newDailyCost = batteryPortionCost + peakPortionCost
    const dailySaving = dailyCost - newDailyCost
    const annualBatterySaving = dailySaving * 365

    const systemKwp = (panelsNum * wattageNum) / 1000
    const solarCost = systemKwp * pricePerKwpNum
    const dailyGeneration = systemKwp * 4.5
    const annualSolarExport = dailyGeneration * (exportRateNum / 100) * 365
    const annualSurplusExport = surplusKwh * (exportRateNum / 100) * 365

    const calculatedCost = batteryCost + solarCost
    const systemCost = customSystemCost ? parseFloat(customSystemCost) : calculatedCost
    const totalAnnualBenefit = annualBatterySaving + annualSolarExport + annualSurplusExport
    const paybackYears = totalAnnualBenefit > 0 ? systemCost / totalAnnualBenefit : 0

    return {
      annualSpend,
      annualKwh,
      dailyKwh,
      dailyCost,
      totalCapacity,
      batteryCost,
      coveredKwh,
      surplusKwh,
      coveragePercent,
      chargeHours,
      annualBatterySaving,
      systemKwp,
      solarCost,
      annualSolarExport,
      annualSurplusExport,
      totalAnnualBenefit,
      paybackYears,
    }
  }, [monthlyBill, unitRate, offPeakRate, exportRate, panels, wattage, pricePerKwp, selectedProduct, quantity, batteryPrices, customSystemCost])

  const setBatteryPrice = (id: string, price: number) => {
    setBatteryPrices(prev => ({ ...prev, [id]: price }))
  }

  const tabs = [
    { icon: Zap, label: 'Energy Audit' },
    { icon: Battery, label: 'Battery' },
    { icon: Sun, label: 'Solar' },
    { icon: TrendingUp, label: 'Payback' },
  ]

  return (
    <section id="formula-calculator" className="py-16 md:py-24 px-4 md:px-6 bg-slate-100">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 bg-[#E8192C]/10 text-[#E8192C] text-sm font-medium rounded-full mb-4">
            Interactive Calculator
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Run the numbers live
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Enter the customer&apos;s details and watch the savings calculate in real-time. 
            All prices are editable — adjust to match your own margins.
          </p>
        </div>

        {/* Tab navigation */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {tabs.map((tab, i) => (
            <TabButton
              key={i}
              active={activeTab === i}
              onClick={() => setActiveTab(i)}
              icon={tab.icon}
              label={tab.label}
              step={i + 1}
            />
          ))}
        </div>

        {/* Tab content */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          {activeTab === 0 && (
            <EnergyAuditTab
              monthlyBill={monthlyBill}
              setMonthlyBill={setMonthlyBill}
              unitRate={unitRate}
              setUnitRate={setUnitRate}
              dailyKwh={calculations.dailyKwh}
              dailyCost={calculations.dailyCost}
              annualKwh={calculations.annualKwh}
              annualSpend={calculations.annualSpend}
            />
          )}
          {activeTab === 1 && (
            <BatterySavingsTab
              dailyKwh={calculations.dailyKwh}
              dailyCost={calculations.dailyCost}
              unitRate={unitRate}
              selectedProduct={selectedProduct}
              setSelectedProduct={setSelectedProduct}
              quantity={quantity}
              setQuantity={setQuantity}
              batteryPrices={batteryPrices}
              setBatteryPrice={setBatteryPrice}
              offPeakRate={offPeakRate}
              setOffPeakRate={setOffPeakRate}
            />
          )}
          {activeTab === 2 && (
            <SolarIncomeTab
              panels={panels}
              setPanels={setPanels}
              wattage={wattage}
              setWattage={setWattage}
              exportRate={exportRate}
              setExportRate={setExportRate}
              pricePerKwp={pricePerKwp}
              setPricePerKwp={setPricePerKwp}
              surplusKwh={calculations.surplusKwh}
            />
          )}
          {activeTab === 3 && (
            <PaybackTab
              batteryCost={calculations.batteryCost}
              solarCost={calculations.solarCost}
              annualBatterySaving={calculations.annualBatterySaving}
              annualSolarExport={calculations.annualSolarExport}
              annualSurplusExport={calculations.annualSurplusExport}
              customSystemCost={customSystemCost}
              setCustomSystemCost={setCustomSystemCost}
              systemKwp={calculations.systemKwp}
            />
          )}
        </div>

        {/* Summary footer */}
        <SummaryFooter
          monthlyBill={monthlyBill}
          dailyKwh={calculations.dailyKwh}
          annualKwh={calculations.annualKwh}
          selectedProduct={selectedProduct}
          quantity={quantity}
          batteryCost={calculations.batteryCost}
          solarCost={calculations.solarCost}
          systemKwp={calculations.systemKwp}
          panels={panels}
          wattage={wattage}
          annualBatterySaving={calculations.annualBatterySaving}
          annualSolarExport={calculations.annualSolarExport}
          annualSurplusExport={calculations.annualSurplusExport}
          totalCapacity={calculations.totalCapacity}
          coveragePercent={calculations.coveragePercent}
          chargeHours={calculations.chargeHours}
          paybackYears={calculations.paybackYears}
        />
      </div>
    </section>
  )
}
