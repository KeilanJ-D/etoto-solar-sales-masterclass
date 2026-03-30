'use client'

import { useState } from 'react'
import { 
  Zap, Battery, Sun, TrendingUp, Lock, Upload, Palette, Building2, 
  Check, ArrowRight, Calculator, MessageSquare, Sparkles, ChevronRight, 
  Star, Play, X
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import MasterclassNav from '@/components/funnel/MasterclassNav'
import Footer from '@/components/funnel/Footer'

// ============================================
// GATED CALCULATOR PREVIEW COMPONENT
// This is the actual calculator from 9 Steps, but with tabs 2-4 gated
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

  // Calculations (same as original FormulaCalculator)
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
      {/* Calculator Header with Custom Branding */}
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
              <p className="text-xs text-slate-500">Solar Energy Calculator</p>
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

      {/* Tab Navigation - Styled like the real calculator */}
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

      {/* Content Area */}
      <div className="relative min-h-[400px]">
        {/* Energy Audit Tab (Unlocked) - Full functionality */}
        {!showGate && (
          <div className="p-4 sm:p-6 md:p-8 space-y-6">
            {/* Input Fields - Same as real calculator */}
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
                    style={{ '--tw-ring-color': `${brandColor}30` } as React.CSSProperties}
                  />
                </div>
                <p className="text-xs text-slate-500">Enter your average monthly bill</p>
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
                <p className="text-xs text-slate-500">Ofgem cap: 24.5p (Apr 2026)</p>
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
                <p className="text-xs text-slate-500">UK average ~62p/day</p>
              </div>
            </div>

            {/* Conversion Display */}
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

            {/* Results Grid */}
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

            {/* Next Step Prompt */}
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

        {/* GATED Content Overlay - The money shot */}
        {showGate && (
          <div className="relative min-h-[400px]">
            {/* Blurred fake calculator content */}
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
              <div className="grid grid-cols-4 gap-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="bg-slate-100 h-20 rounded-xl"></div>
                ))}
              </div>
              <div className="bg-slate-100 h-48 rounded-xl"></div>
            </div>

            {/* Gate Overlay CTA */}
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
                  and <strong>ROI payback analysis</strong> — all branded with your company logo and colors.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
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
                </div>
                
                <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-green-500" />
                    Quiz funnel included
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-green-500" />
                    PDF quotes
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-green-500" />
                    Cancel anytime
                  </span>
                </div>

                <button
                  onClick={() => setShowGate(false)}
                  className="mt-6 text-sm text-slate-400 hover:text-slate-600 transition-colors"
                >
                  ← Back to Energy Audit
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
    <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
      <div className="p-5 border-b border-slate-100 bg-slate-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
            <Palette className="w-5 h-5 text-slate-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Brand Preview</h3>
            <p className="text-sm text-slate-500">Customize and see it live</p>
          </div>
        </div>
      </div>
      
      <div className="p-5 space-y-5">
        {/* Company Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            Company Name
          </label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#E8192C]/20 focus:border-[#E8192C] outline-none transition-all text-slate-900 font-medium"
            placeholder="Your Company Name"
            maxLength={25}
          />
        </div>

        {/* Brand Color */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Brand Color
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {presetColors.map((preset) => (
              <button
                key={preset.color}
                onClick={() => setBrandColor(preset.color)}
                className={`flex flex-col items-center gap-1 px-2 py-1.5 rounded-lg transition-all ${
                  brandColor === preset.color ? 'ring-2 ring-offset-2 ring-slate-400 bg-slate-100' : 'hover:bg-slate-50'
                }`}
              >
                <div 
                  className="w-7 h-7 rounded-md shadow-sm"
                  style={{ backgroundColor: preset.color }}
                />
                <span className="text-xs text-slate-500">{preset.label}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={brandColor}
              onChange={(e) => setBrandColor(e.target.value)}
              className="w-10 h-10 rounded-lg border border-slate-200 cursor-pointer"
            />
            <input
              type="text"
              value={brandColor}
              onChange={(e) => setBrandColor(e.target.value)}
              className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm font-mono text-slate-700"
            />
          </div>
        </div>

        {/* Logo Upload */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Company Logo
          </label>
          {logoUrl ? (
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <Image 
                src={logoUrl} 
                alt="Logo preview" 
                width={100} 
                height={40} 
                className="object-contain"
                style={{ height: 'auto', width: 'auto', maxHeight: '40px' }}
              />
              <button
                onClick={() => setLogoUrl(null)}
                className="ml-auto p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="flex items-center justify-center gap-2 px-4 py-6 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:border-slate-300 hover:bg-slate-50 transition-all">
              <Upload className="w-5 h-5 text-slate-400" />
              <span className="text-sm text-slate-600 font-medium">Click to upload logo</span>
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
  )
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================

export default function SolaFlowPage() {
  const [brandColor, setBrandColor] = useState('#E8192C')
  const [companyName, setCompanyName] = useState('ETOTO Media')
  const [logoUrl, setLogoUrl] = useState<string | null>('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ETOTO_Joel-Sp4sI6W29ziGLLM0CGKbh7tBi3HDbM.png')

  return (
    <main className="min-h-screen bg-white">
      <MasterclassNav />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-20" style={{ background: `radial-gradient(circle, ${brandColor} 0%, transparent 70%)` }} />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full opacity-10" style={{ background: `radial-gradient(circle, #3B82F6 0%, transparent 70%)` }} />
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6 border border-white/10">
            <Sparkles className="w-4 h-4" style={{ color: brandColor }} />
            White-Label Solar Sales Platform
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tight">
            Your Brand.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8192C] to-orange-500">
              Your Calculator.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            SolaFlow gives you a branded <strong className="text-white">quiz funnel</strong> for lead generation 
            and a powerful <strong className="text-white">energy audit calculator</strong> for closing sales — all in one platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://buy.stripe.com/bJeeVfgPQ1k95zc1XYfEk07"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#E8192C] text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all min-h-[56px]"
            >
              Get SolaFlow — £200/month
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#demo"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-medium rounded-full hover:bg-white/20 transition-all border border-white/10 min-h-[56px]"
            >
              <Play className="w-5 h-5" />
              Try the Calculator
            </a>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-10 text-white/50 text-sm">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-green-400" />
              Cancel anytime
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-green-400" />
              Setup in 10 minutes
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-green-400" />
              Full white-label
            </span>
          </div>
        </div>
      </section>

      {/* Two Tools Section */}
      <section className="py-16 sm:py-24 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-[#E8192C]/10 text-[#E8192C] text-sm font-semibold rounded-full mb-4">
              Two Powerful Tools
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">
              Lead Gen + Sales Closer
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              SolaFlow works at both ends of your funnel — capturing leads online 
              and helping you close deals in any sales environment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Quiz Funnel Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 hover:shadow-xl hover:border-slate-300 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Quiz Funnel Lead Magnet</h3>
              <p className="text-slate-600 mb-5 leading-relaxed">
                Embed a branded quiz on your website that qualifies leads and calculates 
                their potential savings. Capture contact details before revealing results.
              </p>
              <ul className="space-y-2.5 text-slate-700">
                {['Customizable quiz questions', 'Lead capture before results', 'Automated email sequences', 'Website embed or standalone'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Energy Audit Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 hover:shadow-xl hover:border-slate-300 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Calculator className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Energy Audit Calculator</h3>
              <p className="text-slate-600 mb-5 leading-relaxed">
                Run the numbers live with customers. Show them exactly how much they&apos;ll 
                save with solar + battery — using your products and your pricing.
              </p>
              <ul className="space-y-2.5 text-slate-700">
                {['Your products, your margins', 'Real-time ROI calculations', 'Generate PDF quotes instantly', 'Use on tablet, phone, or laptop'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Calculator Demo - THE MAIN EVENT */}
      <section id="demo" className="py-16 sm:py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-[#E8192C]/10 text-[#E8192C] text-sm font-semibold rounded-full mb-4">
              Interactive Preview
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">
              Try It Yourself
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Customize the colors, add your logo, and test the Energy Audit tab. 
              <strong className="text-slate-900"> The other tabs are locked</strong> — get SolaFlow to unlock everything.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6 items-start">
            {/* Branding Customizer - Smaller on the side */}
            <div className="lg:col-span-1 lg:sticky lg:top-24">
              <BrandingCustomizer
                brandColor={brandColor}
                setBrandColor={setBrandColor}
                companyName={companyName}
                setCompanyName={setCompanyName}
                logoUrl={logoUrl}
                setLogoUrl={setLogoUrl}
              />
            </div>

            {/* Calculator Preview - Main focus */}
            <div className="lg:col-span-3">
              <GatedCalculatorPreview
                brandColor={brandColor}
                companyName={companyName}
                logoUrl={logoUrl}
              />
              <p className="text-center text-sm text-slate-500 mt-4">
                This is the exact calculator your sales team will use — fully branded to your business
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 sm:py-24 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Trusted by UK Solar Installers
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto">
              Join the installers already using SolaFlow to close more deals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "SolaFlow paid for itself in the first week. The calculator makes explaining ROI so much easier.",
                name: "James Wilson",
                role: "South Coast Solar",
              },
              {
                quote: "The quiz funnel generates 30+ qualified leads per month. Game changer for our business.",
                name: "Sarah Mitchell",
                role: "Green Energy Solutions",
              },
              {
                quote: "Professional, branded quotes in seconds. Customers love seeing the numbers laid out clearly.",
                name: "Mark Thompson",
                role: "UPS Solar",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-700 mb-5 leading-relaxed">&quot;{testimonial.quote}&quot;</p>
                <div>
                  <p className="font-semibold text-slate-900">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 sm:py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-[#E8192C]/10 text-[#E8192C] text-sm font-semibold rounded-full mb-4">
              Simple Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-slate-600">
              No hidden fees. No per-lead charges. Just unlimited access.
            </p>
          </div>

          <div className="bg-white rounded-3xl border-2 border-[#E8192C] shadow-2xl overflow-hidden">
            <div className="bg-[#E8192C] text-white text-center py-3 text-sm font-semibold">
              Most Popular — Used by 200+ Installers
            </div>
            <div className="p-8 sm:p-12">
              <div className="text-center mb-10">
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-6xl font-black text-slate-900">£200</span>
                  <span className="text-xl text-slate-500">/month</span>
                </div>
                <p className="text-slate-600">Cancel anytime. No contracts.</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4 mb-10">
                {[
                  'Branded quiz funnel',
                  'Energy audit calculator',
                  'PDF quote generator',
                  '20+ solar panel options',
                  '15+ battery systems',
                  'Custom pricing & margins',
                  'Website embed code',
                  'Lead capture & export',
                  'Trust badge library',
                  'Priority support',
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-slate-700">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://buy.stripe.com/bJeeVfgPQ1k95zc1XYfEk07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#E8192C] text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all text-lg"
                >
                  Get Started Now
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>

              <p className="text-center text-sm text-slate-500 mt-6">
                Questions? <a href="https://wa.me/447123456789" className="text-[#E8192C] font-medium hover:underline">Chat with us on WhatsApp</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24 px-4 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6">
            Ready to Close More Deals?
          </h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Join 200+ UK installers using SolaFlow to generate leads and close 
            sales faster. Start today, see results this week.
          </p>
          <a
            href="https://buy.stripe.com/bJeeVfgPQ1k95zc1XYfEk07"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-5 bg-[#E8192C] text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all text-lg"
          >
            Get SolaFlow — £200/month
            <ArrowRight className="w-6 h-6" />
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
