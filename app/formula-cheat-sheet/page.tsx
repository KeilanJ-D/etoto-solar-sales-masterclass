'use client'

import { useState, useEffect } from 'react'
import { Calculator, Zap, Battery, Sun, TrendingUp, Check, Copy, Printer, Save, ArrowRight, ExternalLink } from 'lucide-react'
import ProductHero from '@/components/products/ProductHero'
import PasswordGate from '@/components/products/PasswordGate'
import BuySection from '@/components/products/BuySection'
import SolaFlowUpsell from '@/components/products/SolaFlowUpsell'
import ETOTOServices from '@/components/products/ETOTOServices'
import ProductFooter from '@/components/products/ProductFooter'
import FormulaCalculator from '@/components/funnel/FormulaCalculator'
import MasterclassNav from '@/components/funnel/MasterclassNav'

export default function FormulaCheatSheetPage() {
  const isInternal = process.env.NEXT_PUBLIC_UNLOCK_ALL === 'true'
  const [isUnlocked, setIsUnlocked] = useState(isInternal)

  // Check localStorage on mount
  useEffect(() => {
    if (isInternal) return // Skip token check on internal site
    const storedToken = localStorage.getItem('access_formula-cheat-sheet')
    if (storedToken) {
      setIsUnlocked(true)
    }
  }, [isInternal])

  return (
    <main className="bg-[#FAFBFC] min-h-screen">
      <MasterclassNav />
      {/* Hero */}
      <ProductHero
        title="Every Formula. Every Tool. Always in Your Pocket."
        subtitle="The four formulas that close solar deals — live, interactive, with a working calculator you can use on every call. Pin the visual summary to your desk. Use the calculator on your phone mid-pitch."
        price=""
        buyLink="/complete-toolkit"
        stats={[
          { value: '4', label: 'Core Formulas' },
          { value: '4-Tab', label: 'Calculator' },
          { value: '10+', label: 'UK Tariffs' },
          { value: '1-Page', label: 'Printable' },
        ]}
        isUnlocked={isUnlocked}
      />

      {/* What's Inside */}
      <section className="py-16 md:py-20 px-4 md:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">What&apos;s Inside</h2>
            {!isInternal && <p className="text-slate-600">The formulas are free. The interactive calculator is part of the Complete Masterclass.</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Zap, title: 'Energy Audit', desc: 'Annual spend ÷ unit rate = annual kWh' },
              { icon: Battery, title: 'Battery Savings', desc: 'Daily kWh × (peak - off-peak) × 365' },
              { icon: Sun, title: 'Solar Income', desc: 'kWp × sun hours × export rate × 365' },
              { icon: TrendingUp, title: 'Payback', desc: 'System cost ÷ annual benefit' },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <div key={index} className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                  <div className="w-10 h-10 rounded-lg bg-[#E8192C]/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-[#E8192C]" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Preview / Gated Content */}
      <PasswordGate
        productId="formula-cheat-sheet"
        productName="Formula Cheat Sheet"
        previewContent={
          <section className="py-12 md:py-16 px-4 md:px-6 bg-slate-50">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-8">
                <span className="text-sm font-medium text-[#E8192C] tracking-wide uppercase mb-2 block">Preview</span>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">The 4 Formulas</h2>
              </div>

              {/* All 4 Formula Cards — ungated. The spine is free; only the
                  calculator + tariff tables sit behind the paywall. */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <FormulaCard
                  number={1}
                  title="Energy Audit"
                  formula="Annual spend ÷ unit rate = Annual kWh"
                  example="£1,800 ÷ £0.28 = 6,429 kWh"
                  result="Daily: 6,429 ÷ 365 = 17.61 kWh"
                />
                <FormulaCard
                  number={2}
                  title="Battery Savings"
                  formula="Daily kWh × (peak rate - off-peak rate) × 365"
                  example="17.61 × (£0.28 - £0.07) × 365"
                  result="= £1,350/year saved"
                />
                <FormulaCard
                  number={3}
                  title="Solar Income"
                  formula="kWp × peak sun hours × export rate × 365"
                  example="6.58 × 3.5 × £0.12 × 365"
                  result="= £1,008/year income"
                />
                <FormulaCard
                  number={4}
                  title="Payback Period"
                  formula="Total system cost ÷ Annual benefit"
                  example="£12,500 ÷ £2,358"
                  result="= 5.3 years payback"
                />
              </div>
              <p className="text-center text-sm text-slate-500 italic">
                The 4 formulas are the spine — free for everyone. The interactive calculator,
                live tariff comparison and printable cheat sheet are part of the Complete Masterclass.
              </p>
            </div>
          </section>
        }
      >
        {/* Full Unlocked Content */}
        <UnlockedContent />
      </PasswordGate>

      {/* Buy Section (only show if not unlocked) */}
      {!isUnlocked && <BuySection />}

      {/* SolaFlow Upsell */}
      <SolaFlowUpsell />

      {/* ETOTO Services */}
      <ETOTOServices />

      {/* Footer */}
      <ProductFooter />
    </main>
  )
}

// Formula Card Component
function FormulaCard({ number, title, formula, example, result }: {
  number: number
  title: string
  formula: string
  example: string
  result: string
}) {
  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-8 h-8 rounded-full bg-[#E8192C] text-white flex items-center justify-center font-bold text-sm">
          {number}
        </span>
        <h3 className="font-bold text-slate-900">{title}</h3>
      </div>
      <div className="bg-slate-900 text-white rounded-lg p-4 font-mono text-sm mb-4">
        {formula}
      </div>
      <div className="space-y-1 text-sm">
        <p className="text-slate-600">Example: <span className="font-mono text-slate-900">{example}</span></p>
        <p className="text-[#E8192C] font-semibold">{result}</p>
      </div>
    </div>
  )
}

// Full Unlocked Content Component
function UnlockedContent() {
  const [copied, setCopied] = useState(false)

  const handleCopyConfig = () => {
    const config = `Solar Sales Calculator Config
---
Unit Rate: 28p/kWh
Off-peak Rate: 7p/kWh
Export Rate: 15p/kWh
Price per kWp: £1,000
Peak Sun Hours: 3.5 (SolaFlow conservative UK average)
---
Saved: ${new Date().toLocaleDateString()}`
    navigator.clipboard.writeText(config)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-slate-50">
      {/* Success banner */}
      <div className="bg-emerald-600 text-white py-3 px-4 text-center">
        <p className="text-sm font-medium flex items-center justify-center gap-2">
          <Check className="w-4 h-4" />
          Full access unlocked! All tools below are now available.
        </p>
      </div>

      {/* All 4 Formulas */}
      <section className="py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">The 4 Formulas</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <FormulaCard
              number={1}
              title="Energy Audit"
              formula="Annual spend ÷ unit rate = Annual kWh"
              example="£1,800 ÷ £0.28 = 6,429 kWh"
              result="Daily: 6,429 ÷ 365 = 17.61 kWh"
            />
            <FormulaCard
              number={2}
              title="Battery Savings"
              formula="Daily kWh × (peak rate - off-peak rate) × 365"
              example="17.61 × (£0.28 - £0.07) × 365"
              result="= £1,350/year saved"
            />
            <FormulaCard
              number={3}
              title="Solar Income"
              formula="kWp × peak sun hours × export rate × 365"
              example="6.58 × 4.5 × £0.15 × 365"
              result="= £1,621/year income"
            />
            <FormulaCard
              number={4}
              title="Payback Period"
              formula="Total system cost ÷ Annual benefit"
              example="£12,500 ÷ £2,358"
              result="= 5.3 years payback"
            />
          </div>

          {/* Print button */}
          <div className="text-center">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-6 rounded-full transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print Formulas</span>
            </button>
          </div>
        </div>
      </section>

      {/* Full Calculator */}
      <section className="py-12 md:py-16 px-4 md:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Interactive Calculator</h2>
            <p className="text-slate-600">The full 4-tab calculator with all features unlocked.</p>
          </div>

          {/* Calculator */}
          <FormulaCalculator />

          {/* Save config button */}
          <div className="text-center mt-8">
            <button
              onClick={handleCopyConfig}
              className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-3 px-6 rounded-full transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy Current Config'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Tariff Comparison Table */}
      <section className="py-12 md:py-16 px-4 md:px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">UK Tariff Comparison</h2>
            <p className="text-slate-600">Quick reference for common electricity tariffs. Last updated: March 2026.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl border border-slate-200 overflow-hidden">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="text-left py-3 px-4 font-semibold text-sm">Tariff</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Peak Import</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Off-Peak</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Export</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <TariffRow name="Standard Variable" type="Flat rate" peak="28p" offPeak="28p" export="N/A" highlight />
                <TariffRow name="Octopus Go" type="Time-of-use" peak="24p" offPeak="7p" export="15p SEG" />
                <TariffRow name="Octopus Intelligent" type="Smart TOU" peak="24p" offPeak="7p" export="15p SEG" />
                <TariffRow name="Octopus Flux" type="Dynamic" peak="20-28p" offPeak="20-28p" export="8-32p" />
                <TariffRow name="Economy 7" type="Time-of-use" peak="28p" offPeak="10-12p" export="Varies" />
                <TariffRow name="British Gas SEG" type="Export only" peak="Standard" offPeak="Standard" export="3.2p" />
                <TariffRow name="Ecotricity SEG" type="Export only" peak="Standard" offPeak="Standard" export="16p" best />
              </tbody>
            </table>
          </div>

          {/* Key takeaway */}
          <div className="mt-6 bg-[#E8192C]/10 border border-[#E8192C]/20 rounded-xl p-5">
            <h4 className="font-bold text-slate-900 mb-2">Key Takeaway</h4>
            <p className="text-sm text-slate-700">
              <strong>For battery arbitrage:</strong> Octopus Go or Intelligent Go. The gap between 7p import and 28p peak is where the saving lives.<br />
              <strong>For maximum export income:</strong> Octopus Flux (up to 32p at peak times) or Ecotricity SEG (16p flat).<br />
              <strong>For simplicity:</strong> Any SEG tariff + off-peak import tariff.
            </p>
          </div>
        </div>
      </section>

      {/* Key Market Figures */}
      <section className="py-12 md:py-16 px-4 md:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Key Market Figures (March 2026)</h2>
            <p className="text-slate-600">Bookmark this page — we update these whenever rates change.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: 'Ofgem Cap', value: '28p', note: 'Q2 2026' },
              { label: 'Off-Peak', value: '7p', note: 'Octopus Go' },
              { label: 'Best SEG', value: '16p', note: 'Ecotricity' },
              { label: 'Peak Export', value: '32p', note: 'Flux peak' },
              { label: 'Sun Hours', value: '3.5', note: 'SolaFlow funnel' },
              { label: 'VAT', value: '0%', note: 'Until Mar 2027' },
            ].map((item, index) => (
              <div key={index} className="bg-slate-50 rounded-xl p-4 text-center border border-slate-200">
                <p className="text-2xl md:text-3xl font-black text-[#E8192C]">{item.value}</p>
                <p className="text-sm font-medium text-slate-900">{item.label}</p>
                <p className="text-xs text-slate-500">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// Tariff Row Component
function TariffRow({ name, type, peak, offPeak, export: exportRate, highlight, best }: {
  name: string
  type: string
  peak: string
  offPeak: string
  export: string
  highlight?: boolean
  best?: boolean
}) {
  return (
    <tr className={highlight ? 'bg-amber-50' : best ? 'bg-emerald-50' : ''}>
      <td className="py-3 px-4 font-medium text-slate-900">{name}</td>
      <td className="py-3 px-4 text-slate-600 text-sm">{type}</td>
      <td className="py-3 px-4 text-slate-900">{peak}</td>
      <td className="py-3 px-4 text-slate-900">{offPeak}</td>
      <td className="py-3 px-4 text-slate-900">{exportRate}</td>
    </tr>
  )
}
