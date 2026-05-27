'use client'

import dynamic from 'next/dynamic'

// SolaFlow Demo Dashboard — fully neutered, no auth, no API.
// Lifted from /Users/keilanjames-devereux/SaaS-Dashboard-Pro 3/client/src/lib
// (audit-calc.ts + recommendationEngine.ts as pure functions), and uses
// the canonical SolaFlow product catalogue. Mirrors the SolaFlow dashboard
// UX so reps can practice live without affecting any real data.
const DemoDashboard = dynamic(
  () => import('@/components/demo-dashboard/DemoDashboard'),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#E8192C] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-400">Loading SolaFlow demo...</p>
        </div>
      </div>
    ),
  }
)

export default function DemoDashboardPage() {
  return <DemoDashboard />
}
