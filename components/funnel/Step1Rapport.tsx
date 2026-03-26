'use client'

import SalesStep, { ScriptBox, WhyCard, KeyLine, FromTheCall } from './SalesStep'

export default function Step1Rapport() {
  return (
    <SalesStep
      id="step1"
      stepNumber={1}
      title="Set the Tone in 30 Seconds"
      goal="Build rapport and position yourself as an advisor, not a salesperson."
    >
      <ScriptBox>
{`"Hi [Name], it's [Your Name] from [Company]. How are you doing?

I just wanted to give you a bell — we got your enquiry the other day through one of our Facebook ads. I believe you're looking at some solar and battery options right now?"

[Customer responds]

"Brilliant. My goal on this call is just to learn a bit about your home and how you currently use energy, so I can show you what kind of savings and income solar and batteries could offer. Does that sound okay?"`}
      </ScriptBox>

      <h3 className="text-lg font-bold text-slate-900 mb-4">Why This Works</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <WhyCard title="Casual, not corporate">
          &ldquo;Give you a bell&rdquo; not &ldquo;follow up on your enquiry.&rdquo; You&apos;re a person, not a call centre.
        </WhyCard>
        <WhyCard title="Confirms the lead source">
          They remember clicking the ad. This builds immediate context.
        </WhyCard>
        <WhyCard title="Opens with a question">
          Gets THEM talking. The more they talk, the more intel you have.
        </WhyCard>
        <WhyCard title="No pitch in the first 30 seconds">
          Just human connection. Position yourself as an advisor from the start.
        </WhyCard>
      </div>

      <FromTheCall>
        Mark immediately volunteered: he&apos;d had two other quotes, one company didn&apos;t even visit the property, he was still learning about inverters and optimisers. All gold for positioning later.
      </FromTheCall>

      <KeyLine>
        &ldquo;Whatever you do, it&apos;s going to be probably one of the largest investments you&apos;ve made in your life, right? So it&apos;s important to make sure you&apos;re getting all the questions answered.&rdquo; — This single line shifts the frame from &ldquo;sales call&rdquo; to &ldquo;investment consultation.&rdquo;
      </KeyLine>
    </SalesStep>
  )
}
