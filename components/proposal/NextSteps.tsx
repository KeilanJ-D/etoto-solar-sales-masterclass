'use client'

const steps = [
  {
    number: 1,
    title: 'The Green Light',
    description: 'Review this with Jackie. Decide if you want to proceed. Let me know.',
  },
  {
    number: 2,
    title: 'GHL Access',
    description: 'Add Keilan as a staff member in Go High Level so we can start scoping the CRM build.',
  },
  {
    number: 3,
    title: 'Google Ads + GA4',
    description: 'Grant access for the free audit. We want to see what you are currently spending and where.',
  },
  {
    number: 4,
    title: 'Rocky Update',
    description: 'Let me know how the conversation landed. If the funding model opens up, we will factor it in.',
  },
]

export default function NextSteps() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <p className="text-[#E8192C] text-xs font-semibold tracking-[0.2em] uppercase mb-4 animate-on-scroll">
          Next Steps
        </p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-12 animate-on-scroll stagger-1">
          What We Need From You
        </h2>
        
        {/* Step cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, idx) => (
            <div 
              key={step.number}
              className={`animate-on-scroll stagger-${idx + 1}`}
            >
              <div className="w-10 h-10 bg-[#E8192C] flex items-center justify-center mb-4">
                <span className="text-white font-heading font-bold">{step.number}</span>
              </div>
              <h3 className="font-heading text-lg font-bold text-[#0A0A0A] mb-2">
                {step.title}
              </h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Urgency callout */}
        <div className="border-t-[3px] border-[#E8192C] bg-[#FEF2F2] p-8 text-center animate-on-scroll">
          <p className="font-heading text-xl font-bold text-[#0A0A0A] mb-2">
            Your current agency ends this week.
          </p>
          <p className="text-[#374151]">
            We can have campaigns live within <span className="font-semibold text-[#E8192C]">7 days</span> of signing.
          </p>
        </div>
      </div>
    </section>
  )
}
