'use client'

import Page1Cover from '@/components/audit/Page1Cover'
import Page2Executive from '@/components/audit/Page2Executive'
import Page3Pipeline from '@/components/audit/Page3Pipeline'
import Page4SEO from '@/components/audit/Page4SEO'
import Page5CRO from '@/components/audit/Page5CRO'
import Page6Brand from '@/components/audit/Page6Brand'
import Page7Competitors from '@/components/audit/Page7Competitors'
import Page8Services from '@/components/audit/Page8Services'
import Page9Proof from '@/components/audit/Page9Proof'
import Page10CTA from '@/components/audit/Page10CTA'
import Page11Review from '@/components/audit/Page11Review'

const pages = [
  { id: 'cover', label: 'Cover', component: Page1Cover },
  { id: 'executive', label: '01 Executive Snapshot', component: Page2Executive },
  { id: 'pipeline', label: '02 Pipeline Money', component: Page3Pipeline },
  { id: 'seo', label: '03 SEO Audit', component: Page4SEO },
  { id: 'cro', label: '04 CRO & Funnel', component: Page5CRO },
  { id: 'brand', label: '05 Brand', component: Page6Brand },
  { id: 'competitors', label: '06 Competitors', component: Page7Competitors },
  { id: 'services', label: '07 Services', component: Page8Services },
  { id: 'proof', label: '08 Social Proof', component: Page9Proof },
  { id: 'cta', label: '09 CTA', component: Page10CTA },
  { id: 'review', label: '10 Review Request', component: Page11Review },
]

export default function AuditDocument() {
  return (
    <div className="min-h-screen bg-[#E2E5EA] font-sans">
      {/* Navigation bar */}
      <nav className="sticky top-0 z-50 bg-[#0A0A0A] border-b border-[#1F2937] px-4 py-2 flex items-center gap-3 overflow-x-auto no-scrollbar print:hidden">
        <span className="text-[#E8192C] font-black text-xs whitespace-nowrap shrink-0 mr-2">ETOTO × Solar Path</span>
        {pages.map((p, i) => (
          <a
            key={p.id}
            href={`#page-${i + 1}`}
            className="text-[#9CA3AF] hover:text-white font-medium whitespace-nowrap text-[10px] transition-colors shrink-0"
          >
            {p.label}
          </a>
        ))}
        <button
          onClick={() => window.print()}
          className="ml-auto shrink-0 bg-[#E8192C] text-white font-bold px-3 py-1 text-[10px] hover:bg-red-700 transition-colors"
        >
          Print / Export PDF
        </button>
      </nav>

      {/* Pages */}
      <div className="flex flex-col items-center py-8 gap-8 print:gap-0 print:py-0">
        {pages.map((p, i) => {
          const Component = p.component
          return (
            <div
              key={p.id}
              id={`page-${i + 1}`}
              className="w-full shadow-xl print:shadow-none"
              style={{ maxWidth: '794px', background: 'white' }}
            >
              <Component />
            </div>
          )
        })}
      </div>

      {/* Print styles */}
      <style jsx global>{`
        @media print {
          nav { display: none !important; }
          body { background: white !important; margin: 0; }
          #__next > div > div { padding: 0 !important; gap: 0 !important; }
          [id^="page-"] {
            max-width: 100% !important;
            width: 210mm !important;
            page-break-after: always;
            break-after: page;
            box-shadow: none !important;
          }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  )
}
