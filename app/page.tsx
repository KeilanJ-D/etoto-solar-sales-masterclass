'use client'

import Cover from '@/components/audit/Cover'
import ExecutiveSnapshot from '@/components/audit/ExecutiveSnapshot'
import PipelineMoney from '@/components/audit/PipelineMoney'
import SEOAudit from '@/components/audit/SEOAudit'
import CROFunnel from '@/components/audit/CROFunnel'
import BrandAudit from '@/components/audit/BrandAudit'
import Competitors from '@/components/audit/Competitors'
import Services from '@/components/audit/Services'
import SocialProof from '@/components/audit/SocialProof'
import CallToAction from '@/components/audit/CallToAction'
import ReviewRequest from '@/components/audit/ReviewRequest'

export default function AuditDocument() {
  const handleDownloadPDF = () => {
    window.print()
  }

  return (
    <main className="bg-[#E8E8E8] min-h-screen">
      <button
        onClick={handleDownloadPDF}
        className="fixed top-6 right-6 z-50 bg-[#E8192C] hover:bg-[#D01622] text-white px-6 py-3 font-semibold rounded-lg shadow-lg transition-all print:hidden"
      >
        Download PDF
      </button>
      <style jsx global>{`
        @media print {
          body { background: white !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          main { background: white !important; }
          .page-container {
            page-break-after: always;
            break-after: page;
            box-shadow: none !important;
            max-width: 100% !important;
          }
          .page-container:last-child {
            page-break-after: avoid;
          }
        }
      `}</style>
      <div className="flex flex-col items-center py-12 gap-10 print:py-0 print:gap-0 print:bg-white">
        <Cover />
        <ExecutiveSnapshot />
        <PipelineMoney />
        <SEOAudit />
        <CROFunnel />
        <BrandAudit />
        <Competitors />
        <Services />
        <SocialProof />
        <CallToAction />
        <ReviewRequest />
      </div>
    </main>
  )
}
