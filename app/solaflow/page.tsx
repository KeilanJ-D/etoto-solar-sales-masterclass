'use client'

import { useState } from 'react'
import { 
  Zap, Battery, Sun, TrendingUp, Lock, Upload, Palette, Building2, 
  Check, ArrowRight, Calculator, MessageSquare, ChevronRight, 
  Star, X, Users, Target, Award, BarChart3, FileText, Sparkles
} from 'lucide-react'
import Image from 'next/image'
import MasterclassNav from '@/components/funnel/MasterclassNav'
import Footer from '@/components/funnel/Footer'

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

  // Calculations
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

      {/* Content Area */}
      <div className="relative min-h-[400px]">
        {/* Energy Audit Tab (Unlocked) */}
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

        {/* GATED Content Overlay */}
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
              <div className="grid grid-cols-4 gap-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="bg-slate-100 h-20 rounded-xl"></div>
                ))}
              </div>
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
                  and <strong>ROI payback analysis</strong> — all branded with your company logo and colors.
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
                
                <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500 mt-6">
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-green-500" />
                    Quiz funnel included
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-green-500" />
                    PDF quotes
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
// BRANDING CUSTOMIZER COMPONENT (Larger, not sticky)
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
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
      <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 border border-slate-200 flex items-center justify-center">
            <Palette className="w-7 h-7 text-slate-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Brand Your Calculator</h3>
            <p className="text-sm text-slate-500">See changes instantly below</p>
          </div>
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        {/* Company Name */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            Company Name
          </label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full px-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#E8192C]/20 focus:border-[#E8192C] outline-none transition-all text-slate-900 font-medium text-lg"
            placeholder="Your Company Name"
            maxLength={25}
          />
        </div>

        {/* Brand Color */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Brand Color
          </label>
          <div className="grid grid-cols-5 gap-2 mb-4">
            {presetColors.map((preset) => (
              <button
                key={preset.color}
                onClick={() => setBrandColor(preset.color)}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${
                  brandColor === preset.color ? 'ring-2 ring-offset-2 ring-slate-400 bg-slate-100' : 'hover:bg-slate-50 border border-slate-100'
                }`}
              >
                <div 
                  className="w-10 h-10 rounded-lg shadow-md"
                  style={{ backgroundColor: preset.color }}
                />
                <span className="text-xs font-medium text-slate-600">{preset.label}</span>
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

        {/* Logo Upload */}
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
            <label className="flex items-center justify-center gap-3 px-6 py-8 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:border-slate-300 hover:bg-slate-50 transition-all">
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
  )
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================

export default function SolaFlowPage() {
  const [brandColor, setBrandColor] = useState('#E8192C')
  const [companyName, setCompanyName] = useState('Your Company')
  const [logoUrl, setLogoUrl] = useState<string | null>(null)

  // Quiz flow screenshots
  const quizScreenshots = [
    {
      title: 'Panel Selection',
      desc: 'Choose from Aiko, DMEGC, Exiom & more',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-fFP0ifJ7liQNT41pxXOkBJSo3LcaBn.png',
    },
    {
      title: 'Battery Options',
      desc: 'Bexie, EcoFlow, Sigenergy, Fox, Tesla',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-XnLhCoT1oxhhNkwTAYZ5pi93YSrP4h.png',
    },
    {
      title: 'Inverter Choice',
      desc: 'Auto-matched to system requirements',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-LtE3sJgmni0reYChk0RppuzLO7FNAb.png',
    },
    {
      title: 'Instant Estimate',
      desc: 'Savings, payback & ROI calculated',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hubY9mhSf5N2aLxawVyPe4dNk76yP5.png',
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      <MasterclassNav />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-20" style={{ background: `radial-gradient(circle, ${brandColor} 0%, transparent 70%)` }} />
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6 border border-white/10">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            The Solar Sales Platform That Actually Closes Deals
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.1] tracking-tight">
            Convert 50% More Leads<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8192C] to-orange-500">
              Into Sales
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            OpenSolar, PV Sol, Easy PV — they focus on system <em>design</em>. 
            <strong className="text-white"> SolaFlow focuses on consumer psychology.</strong> 
            {' '}Turn every lead into a survey booking with a white-label quiz funnel that produces instant quotes, 
            and an energy audit calculator that explains the maths so customers actually understand the ROI.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <a
              href="https://buy.stripe.com/bJeeVfgPQ1k95zc1XYfEk07"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#E8192C] text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all min-h-[56px] text-lg"
            >
              Get SolaFlow — £200/month
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-medium rounded-full hover:bg-white/20 transition-all border border-white/10 min-h-[56px]"
            >
              See How It Works
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-black text-white">50%</p>
              <p className="text-sm text-slate-400">More Conversions</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-black text-white">200+</p>
              <p className="text-sm text-slate-400">UK Installers</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-black text-white">10min</p>
              <p className="text-sm text-slate-400">Setup Time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why SolaFlow is Different */}
      <section className="py-16 sm:py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
              Design Software vs. Sales Software
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Other tools help you design systems. SolaFlow helps you <strong>sell</strong> them.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-4">
                <X className="w-6 h-6 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">The Problem with Design Tools</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-2">
                  <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  Customers don&apos;t understand technical specs
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  Quotes look like engineering documents
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  No lead capture before revealing prices
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  Can&apos;t explain ROI in a way that resonates
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-[#E8192C] shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-[#E8192C]/10 flex items-center justify-center mb-4">
                <Check className="w-6 h-6 text-[#E8192C]" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">The SolaFlow Approach</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  Consumer-friendly language they understand
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  Beautiful, branded quotes that build trust
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  Lead capture built into the experience
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  Step-by-step ROI breakdown customers love
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 sm:py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full mb-4">
              Two Tools, One Platform
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">
              Lead Generation + Sales Closer
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              SolaFlow works at both ends of your funnel — capturing leads online 
              and helping you close deals in any sales environment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Tool 1: Quiz Funnel */}
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl p-6 sm:p-8 border border-blue-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Tool 1</span>
                  <h3 className="text-xl font-bold text-slate-900">Quiz Funnel</h3>
                </div>
              </div>
              <p className="text-slate-600 mb-6 leading-relaxed">
                <strong className="text-slate-900">Produces instant quotes.</strong> Embed on your website or share as a link. 
                Visitors answer questions about their energy usage and property, then receive an 
                <strong className="text-blue-600"> indicative estimate</strong> with savings, payback period, and ROI — 
                <em> after</em> providing their contact details.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Lead capture', 'Instant estimates', 'Website embed', 'Email sequences'].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Tool 2: Calculator */}
            <div className="bg-gradient-to-br from-green-50 to-white rounded-3xl p-6 sm:p-8 border border-green-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">Tool 2</span>
                  <h3 className="text-xl font-bold text-slate-900">Energy Audit Calculator</h3>
                </div>
              </div>
              <p className="text-slate-600 mb-6 leading-relaxed">
                <strong className="text-slate-900">Verifies the maths in person.</strong> Use live with customers — 
                on the doorstep, on the phone, or via screen share. Walk through the formulas step-by-step so they 
                <strong className="text-green-600"> understand exactly</strong> how battery arbitrage and solar generation 
                translate into real savings.
              </p>
              <div className="flex flex-wrap gap-2">
                {['In-person sales', 'Phone demos', 'Transparent maths', 'PDF quotes'].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz Funnel Showcase */}
      <section id="quiz-funnel" className="py-16 sm:py-24 px-4 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 text-sm font-semibold rounded-full mb-4">
              Quiz Funnel Preview
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
              Customers Design Their Own System
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Step-by-step, they choose panels, batteries, and inverters. 
              Each choice updates their estimate in real-time. Then they get the results — after giving you their details.
            </p>
          </div>

          {/* Screenshot Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {quizScreenshots.map((screenshot, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow mb-3">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={screenshot.image}
                      alt={screenshot.title}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
                <div className="text-center">
                  <span className="inline-block px-2 py-0.5 bg-white/10 text-white/80 text-xs font-medium rounded-full mb-1">
                    Step {index + 1}
                  </span>
                  <h4 className="font-bold text-white">{screenshot.title}</h4>
                  <p className="text-sm text-slate-400">{screenshot.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Benefits */}
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Target, title: 'Qualify Leads', desc: 'Filter out time-wasters before the first call' },
              { icon: Users, title: 'Capture Details', desc: 'Name, email, phone required for results' },
              { icon: FileText, title: 'Instant Quotes', desc: 'Indicative pricing shown automatically' },
              { icon: BarChart3, title: 'Book Surveys', desc: '50% of quiz completers book appointments' },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                  <Icon className="w-8 h-8 text-blue-400 mb-3" />
                  <h4 className="font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-sm text-slate-400">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Energy Audit Calculator Section */}
      <section id="calculator" className="py-16 sm:py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full mb-4">
              Energy Audit Calculator Preview
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">
              Close the Deal Face-to-Face
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              When you&apos;re with a customer — in person or on a call — this calculator lets you 
              walk through the numbers together. Customize the branding below and try the Energy Audit tab.
            </p>
          </div>

          {/* Branding Customizer + Calculator */}
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Branding Customizer - Static, not sticky */}
            <div className="lg:col-span-1">
              <BrandingCustomizer
                brandColor={brandColor}
                setBrandColor={setBrandColor}
                companyName={companyName}
                setCompanyName={setCompanyName}
                logoUrl={logoUrl}
                setLogoUrl={setLogoUrl}
              />
            </div>

            {/* Calculator Preview */}
            <div className="lg:col-span-2">
              <GatedCalculatorPreview
                brandColor={brandColor}
                companyName={companyName}
                logoUrl={logoUrl}
              />
            </div>
          </div>

          {/* Calculator Benefits */}
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Formula-Driven', desc: 'Transparent calculations customers trust' },
              { title: 'Your Products', desc: '20+ panels, 15+ batteries pre-loaded' },
              { title: 'Custom Margins', desc: 'Set your own pricing per product' },
              { title: 'PDF Quotes', desc: 'Generate professional quotes instantly' },
            ].map((feature) => (
              <div key={feature.title} className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-1">{feature.title}</h4>
                <p className="text-sm text-slate-600">{feature.desc}</p>
              </div>
            ))}
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
              <div key={index} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-700 mb-5">&quot;{testimonial.quote}&quot;</p>
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
              No hidden fees. No per-lead charges. Unlimited access.
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
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24 px-4 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6">
            Stop Losing Leads to Confusion
          </h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Your competitors are still sending PDF quotes that look like spreadsheets. 
            You&apos;ll be closing deals with interactive tools that customers actually understand.
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
