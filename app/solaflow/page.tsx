'use client'

import { useState } from 'react'
import { 
  Zap, Battery, Sun, TrendingUp, Lock, Upload, Palette, Building2, 
  Check, ArrowRight, Calculator, MessageSquare, ChevronRight, 
  Star, X, Target, Award, BarChart3, FileText, Sparkles, Home,
  Phone, CalendarCheck, BadgeCheck, Quote
} from 'lucide-react'
import Image from 'next/image'
import MasterclassNav from '@/components/funnel/MasterclassNav'
import Footer from '@/components/funnel/Footer'
import { CustomerJourneyTimeline, yeersCustomerA, yeersCustomerB } from '@/components/shared/CustomerJourneyTimeline'

// ============================================
// CRM DATA PREVIEW COMPONENT
// ============================================

function CRMDataPreview() {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 text-white">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
          <FileText className="w-5 h-5 text-green-400" />
        </div>
        <div>
          <h4 className="font-bold text-lg">This is what lands in your CRM</h4>
          <p className="text-sm text-slate-400">Before you even pick up the phone</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* Property Details */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Property Details</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-slate-400">Type:</span><span className="font-medium">Detached</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Roof:</span><span className="font-medium">Pitched tile</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Location:</span><span className="font-medium">Doncaster DN4</span></div>
          </div>
        </div>

        {/* Energy Usage */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Energy Usage</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-slate-400">Annual:</span><span className="font-medium">3,824 kWh</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Bill:</span><span className="font-medium">£1,300/year</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Rate:</span><span className="font-medium">28.0p/kWh</span></div>
          </div>
        </div>

        {/* System Config */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">System Configuration</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-slate-400">Panels:</span><span className="font-medium">18× 510W</span></div>
            <div className="flex justify-between"><span className="text-slate-400">System:</span><span className="font-medium">9.18 kWp</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Battery:</span><span className="font-medium">11.68 kWh</span></div>
          </div>
        </div>

        {/* Estimate */}
        <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
          <p className="text-xs font-semibold text-green-400 uppercase tracking-wider mb-3">Cost Estimate</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-slate-400">Total:</span><span className="font-bold text-green-400 text-lg">£15,062</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Savings:</span><span className="font-medium text-green-400">£2,303/year</span></div>
            <div className="flex justify-between"><span className="text-slate-400">CO2:</span><span className="font-medium">2.73 tonnes/year</span></div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-white/10">
        <p className="text-sm text-slate-400">
          Compare this to a standard contact form: <span className="line-through">name, email, phone, &quot;interested in solar&quot;</span>.
          <strong className="text-white"> Night and day.</strong>
        </p>
      </div>
    </div>
  )
}

// ============================================
// GATED CALCULATOR PREVIEW COMPONENT
// ============================================

function GatedCalculatorPreview({ 
  brandColor, 
  companyName, 
  logoUrl 
}: { 
  brandColor: string
  companyName: string
  logoUrl: string | null
}) {
  const [activeTab, setActiveTab] = useState(0)
  const [monthlyBill, setMonthlyBill] = useState('150')
  const [unitRate, setUnitRate] = useState('28')
  const [standingCharge, setStandingCharge] = useState('61.64')
  const [showGate, setShowGate] = useState(false)

  const monthlyNum = parseFloat(monthlyBill) || 0
  const unitRateNum = parseFloat(unitRate) || 28
  const standingChargeNum = parseFloat(standingCharge) || 61.64
  const annualSpend = monthlyNum * 12
  const annualStandingCharge = (standingChargeNum * 365) / 100
  const annualUsageCost = annualSpend - annualStandingCharge
  const annualKwh = Math.round((annualUsageCost / unitRateNum) * 100)
  const dailyKwh = annualKwh / 365

  const tabs = [
    { icon: Zap, label: 'Energy Audit', locked: false },
    { icon: Battery, label: 'Battery', locked: true },
    { icon: Sun, label: 'Solar', locked: true },
    { icon: TrendingUp, label: 'Payback', locked: true },
  ]

  const handleTabClick = (index: number) => {
    if (index === 0) {
      setActiveTab(0)
      setShowGate(false)
    } else {
      setShowGate(true)
    }
  }

  return (
    <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-2xl overflow-hidden">
      {/* Calculator Header */}
      <div 
        className="p-4 sm:p-6 border-b border-slate-200"
        style={{ backgroundColor: `${brandColor}08` }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {logoUrl ? (
              <Image 
                src={logoUrl} 
                alt={companyName} 
                width={120} 
                height={40} 
                className="object-contain"
                style={{ height: 'auto', width: 'auto', maxHeight: '40px' }}
              />
            ) : (
              <div 
                className="h-10 w-10 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                style={{ backgroundColor: brandColor }}
              >
                {companyName.charAt(0)}
              </div>
            )}
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">{companyName}</h3>
              <p className="text-xs text-slate-500">Energy Audit Calculator</p>
            </div>
          </div>
          <span 
            className="text-xs font-medium px-2 py-1 rounded-full hidden sm:block"
            style={{ backgroundColor: `${brandColor}15`, color: brandColor }}
          >
            Powered by SolaFlow
          </span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="p-3 sm:p-4 bg-slate-50 border-b border-slate-200">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {tabs.map((tab, index) => {
            const Icon = tab.icon
            const isActive = activeTab === index && !showGate
            return (
              <button
                key={index}
                onClick={() => handleTabClick(index)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-medium text-sm transition-all flex-shrink-0 min-h-[44px] ${
                  isActive
                    ? 'text-white shadow-lg' 
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
                style={isActive ? { backgroundColor: brandColor } : {}}
              >
                <span 
                  className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    isActive ? 'bg-white/20' : 'bg-slate-100'
                  }`}
                >
                  {tab.locked ? <Lock className="w-3 h-3" /> : index + 1}
                </span>
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Content */}
      <div className="relative min-h-[400px]">
        {!showGate && (
          <div className="p-4 sm:p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Monthly electricity bill</label>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-medium">£</span>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={monthlyBill}
                    onChange={(e) => setMonthlyBill(e.target.value)}
                    className="w-full px-3 sm:px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:outline-none transition-all text-slate-900 font-medium text-base min-h-[48px]"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Unit rate</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    inputMode="decimal"
                    value={unitRate}
                    onChange={(e) => setUnitRate(e.target.value)}
                    className="w-full px-3 sm:px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:outline-none transition-all text-slate-900 font-medium text-base min-h-[48px]"
                  />
                  <span className="text-slate-500 font-medium whitespace-nowrap">p/kWh</span>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Standing charge</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    inputMode="decimal"
                    value={standingCharge}
                    onChange={(e) => setStandingCharge(e.target.value)}
                    className="w-full px-3 sm:px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:outline-none transition-all text-slate-900 font-medium text-base min-h-[48px]"
                  />
                  <span className="text-slate-500 font-medium whitespace-nowrap">p/day</span>
                </div>
              </div>
            </div>

            <div 
              className="rounded-xl p-5 border space-y-3"
              style={{ backgroundColor: `${brandColor}05`, borderColor: `${brandColor}20` }}
            >
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Monthly bill</span>
                <span className="font-medium text-slate-900">£{monthlyNum.toFixed(0)}/month (£{annualSpend.toLocaleString()}/year)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Standing charge</span>
                <span className="font-medium text-slate-900">{standingCharge}p/day (£{annualStandingCharge.toFixed(0)}/year)</span>
              </div>
              <div className="border-t pt-3 flex justify-between items-center" style={{ borderColor: `${brandColor}30` }}>
                <span className="font-medium text-slate-700">Energy usage cost</span>
                <span className="font-bold" style={{ color: brandColor }}>£{annualUsageCost.toFixed(0)}/year</span>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-sm">
                <p className="text-xs sm:text-sm text-slate-500 mb-1">Annual usage</p>
                <p className="text-xl sm:text-2xl font-bold text-slate-900">{annualKwh.toLocaleString()} <span className="text-sm font-normal text-slate-500">kWh</span></p>
              </div>
              <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-sm">
                <p className="text-xs sm:text-sm text-slate-500 mb-1">Daily average</p>
                <p className="text-xl sm:text-2xl font-bold text-slate-900">{dailyKwh.toFixed(1)} <span className="text-sm font-normal text-slate-500">kWh</span></p>
              </div>
              <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-sm">
                <p className="text-xs sm:text-sm text-slate-500 mb-1">Unit cost</p>
                <p className="text-xl sm:text-2xl font-bold text-slate-900">{unitRate} <span className="text-sm font-normal text-slate-500">p/kWh</span></p>
              </div>
              <div className="bg-white rounded-xl p-4 sm:p-5 border shadow-sm" style={{ borderColor: brandColor, backgroundColor: `${brandColor}05` }}>
                <p className="text-xs sm:text-sm text-slate-500 mb-1">Annual spend</p>
                <p className="text-xl sm:text-2xl font-bold" style={{ color: brandColor }}>£{annualSpend.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 pt-4 border-t border-slate-100">
              <span className="text-slate-500 text-sm">Ready for the next step?</span>
              <button 
                onClick={() => setShowGate(true)}
                className="font-semibold text-sm hover:underline flex items-center gap-1"
                style={{ color: brandColor }}
              >
                Calculate battery savings <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {showGate && (
          <div className="relative min-h-[400px]">
            <div className="p-6 sm:p-8 space-y-6 blur-md pointer-events-none select-none opacity-60">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-100 h-40 rounded-xl flex items-center justify-center">
                  <Battery className="w-12 h-12 text-slate-300" />
                </div>
                <div className="bg-slate-100 h-40 rounded-xl flex items-center justify-center">
                  <Sun className="w-12 h-12 text-slate-300" />
                </div>
              </div>
              <div className="bg-slate-50 h-32 rounded-xl border border-slate-200"></div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/98 to-white/90 flex items-center justify-center p-6">
              <div className="text-center max-w-lg">
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                  style={{ backgroundColor: `${brandColor}15` }}
                >
                  <Lock className="w-10 h-10" style={{ color: brandColor }} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
                  Unlock Your Custom Calculator
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Get full access to <strong>Battery sizing</strong>, <strong>Solar calculations</strong>, 
                  and <strong>ROI payback analysis</strong> — all branded with your company logo.
                </p>
                
                <a
                  href="https://buy.stripe.com/bJeeVfgPQ1k95zc1XYfEk07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                  style={{ backgroundColor: brandColor }}
                >
                  Get SolaFlow — £200/month
                  <ArrowRight className="w-5 h-5" />
                </a>

                <button
                  onClick={() => setShowGate(false)}
                  className="mt-6 text-sm text-slate-400 hover:text-slate-600 transition-colors block mx-auto"
                >
                  Back to Energy Audit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================
// BRANDING CUSTOMIZER COMPONENT
// ============================================

function BrandingCustomizer({
  brandColor,
  setBrandColor,
  companyName,
  setCompanyName,
  logoUrl,
  setLogoUrl,
}: {
  brandColor: string
  setBrandColor: (c: string) => void
  companyName: string
  setCompanyName: (n: string) => void
  logoUrl: string | null
  setLogoUrl: (u: string | null) => void
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const presetColors = [
    { color: '#E8192C', label: 'Red' },
    { color: '#3B82F6', label: 'Blue' },
    { color: '#10B981', label: 'Green' },
    { color: '#FBBF24', label: 'Yellow' },
    { color: '#F97316', label: 'Orange' },
  ]

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setLogoUrl(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
      {/* Collapsible header on mobile */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-5 sm:p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white sm:cursor-default"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 border border-slate-200 flex items-center justify-center flex-shrink-0">
            <Palette className="w-6 h-6 sm:w-7 sm:h-7 text-slate-600" />
          </div>
          <div className="flex-1 text-left">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">Brand Your Calculator</h3>
            <p className="text-sm text-slate-500">
              <span className="sm:hidden">{isExpanded ? 'Tap to collapse' : 'Tap to customise'}</span>
              <span className="hidden sm:inline">See changes instantly below</span>
            </p>
          </div>
          <ChevronRight className={`w-5 h-5 text-slate-400 sm:hidden transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
        </div>
      </button>
      
      {/* Content - always visible on desktop, collapsible on mobile */}
      <div className={`sm:block ${isExpanded ? 'block' : 'hidden'}`}>
        <div className="p-5 sm:p-6 space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Company Name
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full px-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#E8192C]/20 focus:border-[#E8192C] outline-none transition-all text-slate-900 font-medium text-base min-h-[48px]"
              placeholder="Your Company Name"
              maxLength={25}
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Brand Color
            </label>
            {/* 44px minimum touch targets for color buttons */}
            <div className="grid grid-cols-5 gap-2 sm:gap-3 mb-4">
              {presetColors.map((preset) => (
                <button
                  key={preset.color}
                  onClick={() => setBrandColor(preset.color)}
                  className={`flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-xl transition-all min-h-[72px] touch-action-manipulation ${
                    brandColor === preset.color ? 'ring-2 ring-offset-2 ring-slate-400 bg-slate-100' : 'hover:bg-slate-50 border border-slate-100'
                  }`}
                >
                  <div 
                    className="w-11 h-11 sm:w-10 sm:h-10 rounded-lg shadow-md flex-shrink-0"
                    style={{ backgroundColor: preset.color }}
                  />
                  <span className="text-[10px] sm:text-xs font-medium text-slate-600">{preset.label}</span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={brandColor}
                onChange={(e) => setBrandColor(e.target.value)}
                className="w-14 h-14 rounded-xl border border-slate-200 cursor-pointer"
              />
              <div className="flex-1">
                <label className="text-xs text-slate-500 mb-1 block">Custom hex</label>
                <input
                  type="text"
                  value={brandColor}
                  onChange={(e) => setBrandColor(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm font-mono text-slate-700"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Company Logo
            </label>
            {logoUrl ? (
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <Image 
                  src={logoUrl} 
                  alt="Logo preview" 
                  width={120} 
                  height={48} 
                  className="object-contain"
                  style={{ height: 'auto', width: 'auto', maxHeight: '48px' }}
                />
                <button
                  onClick={() => setLogoUrl(null)}
                  className="ml-auto p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <label className="flex items-center justify-center gap-3 px-6 py-8 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:border-slate-300 hover:bg-slate-50 transition-all min-h-[100px]">
                <Upload className="w-6 h-6 text-slate-400" />
                <span className="text-slate-600 font-medium">Click to upload logo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================

export default function SolaFlowPage() {
  const [brandColor, setBrandColor] = useState('#E8192C')
  const [companyName, setCompanyName] = useState('Your Company')
  const [logoUrl, setLogoUrl] = useState<string | null>(null)

  return (
    <main className="min-h-screen bg-white">
      <MasterclassNav />
      
      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <section className="relative pt-20 sm:pt-24 pb-16 sm:pb-20 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E8192C]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="px-3 py-1 bg-[#E8192C]/20 text-[#E8192C] text-sm font-semibold rounded-full border border-[#E8192C]/30">
              Quiz Funnel + Calculator
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            Turn Leads Into Sales.<br />
            <span className="text-[#E8192C]">Not Just Designs.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            OpenSolar, PV Sol, Easy PV — they all focus on <em>system design</em>. 
            SolaFlow focuses on <strong className="text-white">consumer psychology</strong>. 
            Your leads pre-qualify themselves, pre-build their system, and land in your CRM ready to buy.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 w-full max-w-md sm:max-w-none mx-auto">
            <a
              href="https://buy.stripe.com/bJeeVfgPQ1k95zc1XYfEk07"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-[#E8192C] hover:bg-[#D01622] active:bg-[#B01220] text-white font-bold rounded-xl sm:rounded-full shadow-lg hover:shadow-xl transition-all min-h-[56px] touch-action-manipulation"
            >
              Get SolaFlow — £200/month
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#proof"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-medium rounded-xl sm:rounded-full hover:bg-white/20 active:bg-white/30 transition-all border border-white/10 min-h-[56px] touch-action-manipulation"
            >
              See It Working
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <p className="text-2xl sm:text-3xl font-black text-[#E8192C]">50%</p>
              <p className="text-sm text-slate-400">More conversions</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <p className="text-2xl sm:text-3xl font-black text-white">£24.4K</p>
              <p className="text-sm text-slate-400">Closed in 2 weeks</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <p className="text-2xl sm:text-3xl font-black text-white">3 days</p>
              <p className="text-sm text-slate-400">Ad to deposit</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <p className="text-2xl sm:text-3xl font-black text-white">5 min</p>
              <p className="text-sm text-slate-400">Lead to call</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* THE PIPELINE VISUAL */}
      {/* ============================================ */}
      <section className="py-16 sm:py-24 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-[#E8192C]/10 text-[#E8192C] text-sm font-semibold rounded-full mb-4">
              The Full Pipeline
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
              From Ad Click to Deposit Paid
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Two tools. One pipeline. Every step covered.
            </p>
          </div>

          <div className="grid md:grid-cols-6 gap-4 items-center">
            {[
              { step: 1, icon: Target, title: 'Ad Click', desc: 'Customer sees your ad' },
              { step: 2, icon: MessageSquare, title: 'Quiz Funnel', desc: 'Designs their system', highlight: true },
              { step: 3, icon: FileText, title: 'CRM Lead', desc: 'Full data lands' },
              { step: 4, icon: Phone, title: 'Call Back', desc: 'Within 5 minutes' },
              { step: 5, icon: Calculator, title: 'Calculator', desc: 'Verify the maths', highlight: true },
              { step: 6, icon: BadgeCheck, title: 'Close', desc: 'Deposit paid' },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <div key={i} className="text-center">
                  <div className={`w-16 h-16 rounded-2xl mx-auto mb-3 flex items-center justify-center ${
                    item.highlight ? 'bg-[#E8192C] text-white shadow-lg' : 'bg-white border border-slate-200 text-slate-600'
                  }`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <p className="font-bold text-slate-900 text-sm">{item.title}</p>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* TOOL 1: QUIZ FUNNEL */}
      {/* ============================================ */}
      <section id="quiz-funnel" className="py-16 sm:py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          {/* Header + Features - Above the embed */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <span className="px-2.5 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                TOOL 1
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
              Quiz Funnel
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              <strong className="text-slate-900">Your customer-facing lead magnet.</strong> They see an ad, land on your quiz, 
              design their own system, and get an instant indicative quote — all before you say a word.
            </p>
          </div>

          {/* 3 Feature pills - horizontal */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-green-50 rounded-full border border-green-200">
              <Check className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-slate-700">Instant indicative pricing</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 bg-green-50 rounded-full border border-green-200">
              <Check className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-slate-700">Lead capture before results</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 bg-green-50 rounded-full border border-green-200">
              <Check className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-slate-700">Pre-qualified leads</span>
            </div>
          </div>

          {/* Quiz Funnel Embed - Full width, capped height */}
          <div className="bg-slate-950 rounded-2xl p-2 shadow-2xl border border-white/10 max-w-4xl mx-auto">
            <div className="flex items-center gap-2 px-4 py-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-slate-800 rounded-full px-4 py-1.5 text-slate-400 text-xs flex items-center gap-2">
                  <Lock className="w-3 h-3" />
                  your-company.solaflow.app
                </div>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden bg-white" style={{ height: '500px' }}>
              <iframe
                src="https://vercel-solar-estimator.vercel.app"
                className="w-full h-full"
                title="SolaFlow Quiz Funnel"
                allow="clipboard-write"
              />
              {/* Scroll hint overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none flex items-end justify-center pb-2">
                <span className="text-xs text-slate-400 font-medium">Scroll to explore</span>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <p className="text-sm text-slate-500 mb-4">
              This is a live demo. Your version will be fully branded with your logo, colors, and products.
            </p>
            <a
              href="https://buy.stripe.com/bJeeVfgPQ1k95zc1XYfEk07"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              Get Your Quiz Funnel — £200/month
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* QUIZ OUTPUT SHOWCASE */}
      {/* ============================================ */}
      <section className="py-16 sm:py-24 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-slate-200 text-slate-700 text-sm font-semibold rounded-full mb-4">
              What Customers See
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
              They Design Their Own System
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Panel selection, battery choice, inverter matching — all guided by intelligent recommendations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { 
                title: 'Choose Solar Panels', 
                desc: 'Aiko, DMEG, Exiom — with specs and features',
                image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-fFP0ifJ7liQNT41pxXOkBJSo3LcaBn.png'
              },
              { 
                title: 'Add a Battery', 
                desc: 'Tesla, Sigenergy, Fox — capacity matched',
                image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-XnLhCoT1oxhhNkwTAYZ5pi93YSrP4h.png'
              },
              { 
                title: 'Select Inverter', 
                desc: 'EcoFlow, Sigen — compatible options only',
                image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-LtE3sJgmni0reYChk0RppuzLO7FNAb.png'
              },
              { 
                title: 'Instant Estimate', 
                desc: 'Savings, payback, CO2 — all calculated',
                image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hubY9mhSf5N2aLxawVyPe4dNk76yP5.png'
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="aspect-[4/3] relative bg-slate-100">
                  <Image 
                    src={item.image} 
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CRM DATA */}
      {/* ============================================ */}
      <section className="py-16 sm:py-24 px-4 bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-green-500/20 text-green-400 text-sm font-semibold rounded-full mb-4">
              What You Receive
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Pre-Qualified Intelligence
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              This is the data that lands in your CRM the moment they complete the quiz.
            </p>
          </div>

          <CRMDataPreview />
        </div>
      </section>

      {/* ============================================ */}
      {/* YEERS CASE STUDY */}
      {/* ============================================ */}
      <section id="proof" className="py-16 sm:py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-[#E8192C]/10 text-[#E8192C] text-sm font-semibold rounded-full mb-4">
              Real Results
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
              From Ad to Deposit in 3 Days
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              YEERS closed £24,400 in their first 2 weeks using SolaFlow. Here&apos;s exactly how it happened.
            </p>
          </div>

          {/* Customer A Timeline */}
          <div className="mb-16">
            <CustomerJourneyTimeline
              steps={yeersCustomerA}
              title="Customer A — £13,100"
              subtitle="Came in via Facebook ad for battery. Left with full solar + battery system."
              customer="YEERS Case Study"
              totalValue="£13,100"
            />
          </div>

          {/* Key quote callout */}
          <div className="bg-gradient-to-r from-[#E8192C]/10 to-transparent rounded-2xl p-6 sm:p-8 border-l-4 border-[#E8192C] mb-16">
            <div className="flex items-start gap-4">
              <Quote className="w-8 h-8 text-[#E8192C] flex-shrink-0 mt-1" />
              <div>
                <p className="text-lg sm:text-xl text-slate-800 font-medium leading-relaxed mb-4">
                  &ldquo;I&apos;ve had another quote come back cheaper, but using Fox equipment and I&apos;ve looked online 
                  and have seen that the Sigenergy stuff is loads better like you said.&rdquo;
                </p>
                <p className="text-slate-600">
                  <strong>The customer overcame their own objection</strong> because SolaFlow pre-educated them on product quality.
                </p>
              </div>
            </div>
          </div>

          {/* Customer B */}
          <div className="mb-16">
            <CustomerJourneyTimeline
              steps={yeersCustomerB}
              title="Customer B — £11,300"
              subtitle="Came in looking for battery only. SolaFlow configured a better system. Closed against competitor."
              customer="YEERS Case Study"
              totalValue="£11,300"
            />
          </div>

          {/* Summary stats */}
          <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 text-center">
            <p className="text-slate-400 mb-2">Combined results from first 2 weeks</p>
            <p className="text-4xl sm:text-5xl font-black text-white mb-4">£24,400</p>
            <p className="text-slate-400">
              Both customers came in comparing quotes. Both chose YEERS because SolaFlow pre-qualified them with quality products.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* TOOL 2: CALCULATOR */}
      {/* ============================================ */}
      <section id="calculator" className="py-16 sm:py-24 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <Calculator className="w-6 h-6 text-green-600" />
              </div>
              <span className="px-2.5 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                TOOL 2
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
              Energy Audit Calculator
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              <strong className="text-slate-900">Your rep-facing sales tool.</strong> Use this live with customers — 
              in person, on the phone, or via screen share. Verify the formulas, explain the maths, 
              close the deal.
            </p>
          </div>

          {/* Features row */}
          <div className="grid sm:grid-cols-3 gap-4 mb-12">
            <div className="bg-white rounded-xl p-5 border border-slate-200 text-center">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                <Check className="w-5 h-5 text-green-600" />
              </div>
              <p className="font-bold text-slate-900 mb-1">Transparent formula</p>
              <p className="text-sm text-slate-500">Show exactly how savings are calculated</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-slate-200 text-center">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                <Check className="w-5 h-5 text-green-600" />
              </div>
              <p className="font-bold text-slate-900 mb-1">Your products, your margins</p>
              <p className="text-sm text-slate-500">Configure what you actually sell</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-slate-200 text-center">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                <Check className="w-5 h-5 text-green-600" />
              </div>
              <p className="font-bold text-slate-900 mb-1">Build trust in real-time</p>
              <p className="text-sm text-slate-500">Customers see the maths, not just the result</p>
            </div>
          </div>

          {/* Branding Customizer - Full width above calculator */}
          <div className="mb-8">
            <BrandingCustomizer
              brandColor={brandColor}
              setBrandColor={setBrandColor}
              companyName={companyName}
              setCompanyName={setCompanyName}
              logoUrl={logoUrl}
              setLogoUrl={setLogoUrl}
            />
          </div>

          {/* Calculator Preview - Full width */}
          <div>
            <GatedCalculatorPreview
              brandColor={brandColor}
              companyName={companyName}
              logoUrl={logoUrl}
            />
            <p className="text-center text-sm text-slate-500 mt-4">
              Tab 1 is fully functional. Tabs 2-4 require SolaFlow subscription.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* WHY NOT DESIGN SOFTWARE */}
      {/* ============================================ */}
      <section className="py-16 sm:py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-slate-200 text-slate-700 text-sm font-semibold rounded-full mb-4">
              The Difference
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
              Design Software vs Sales Software
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Design Software */}
            <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center">
                  <X className="w-5 h-5 text-slate-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-700">Design Software</h3>
              </div>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-slate-400 mt-1">•</span>
                  <span>OpenSolar, PV Sol, Easy PV</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-400 mt-1">•</span>
                  <span>Focuses on technical system design</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-400 mt-1">•</span>
                  <span>Rep uses it to create proposal</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-400 mt-1">•</span>
                  <span>Customer sees output after the call</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-400 mt-1">•</span>
                  <span>No lead generation capability</span>
                </li>
              </ul>
            </div>

            {/* Sales Software */}
            <div className="bg-[#E8192C]/5 rounded-2xl p-6 sm:p-8 border border-[#E8192C]/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#E8192C] flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">SolaFlow</h3>
              </div>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#E8192C] mt-1 flex-shrink-0" />
                  <span>Quiz funnel generates qualified leads</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#E8192C] mt-1 flex-shrink-0" />
                  <span>Focuses on consumer psychology</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#E8192C] mt-1 flex-shrink-0" />
                  <span>Customer pre-builds their system</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#E8192C] mt-1 flex-shrink-0" />
                  <span>Rep verifies maths live on call</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#E8192C] mt-1 flex-shrink-0" />
                  <span>Full pipeline from ad to deposit</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-10">
            <p className="text-lg text-slate-600 mb-6">
              Design software helps you <em>create proposals</em>. SolaFlow helps you <strong className="text-slate-900">close deals</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CTA */}
      {/* ============================================ */}
      <section className="py-16 sm:py-24 px-4 bg-slate-900">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-[#E8192C]" />
            <span className="text-white text-sm font-medium">Start converting more leads today</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6">
            Get SolaFlow for Your Business
          </h2>
          
          <p className="text-lg text-slate-300 mb-8 leading-relaxed">
            Quiz funnel + calculator + CRM integration. Everything you need to turn cold leads into closed deals.
          </p>

          <a
            href="https://buy.stripe.com/bJeeVfgPQ1k95zc1XYfEk07"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-5 bg-[#E8192C] text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            Get SolaFlow — £200/month
            <ArrowRight className="w-5 h-5" />
          </a>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-slate-400">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              Quiz funnel included
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              Calculator included
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              Full branding
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              CRM integration
            </span>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
