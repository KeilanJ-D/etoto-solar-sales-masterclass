import type { SystemsPlaybook } from '../types'

export const solaflowMastery: SystemsPlaybook = {
  slug: 'solaflow-mastery',
  title: 'SolaFlow Operator\'s Manual',
  subtitle:
    'Every screen, every shortcut, every scenario — how to extract the maximum value from SolaFlow before, during and after a customer interaction.',
  forWhom:
    'Appointment setters, sales reps, sales managers, and the back-office team running quotes through SolaFlow daily.',
  estReadMinutes: 18,
  lastUpdated: '2026-05-27',
  introNarrative:
    'SolaFlow does one thing brilliantly: it turns a stranger\'s postcode into a fully spec\'d quote with property data, energy profile, system recommendation and cost — before the rep has even said hello. Used correctly, it cuts cold-call objections by 60% and shortens the in-home appointment by 20 minutes. Used badly, it\'s an expensive lead form. This manual shows you the difference.',

  sections: [
    {
      id: 'pre-call',
      title: 'Pre-Call: Prepping a Lead in 90 Seconds',
      intro:
        'The single biggest gap between average and elite reps is what they do BEFORE they pick up the phone. SolaFlow turns this from a 15-minute research job into 90 seconds.',
      steps: [
        {
          number: 1,
          title: 'Open the lead in SolaFlow',
          goal: 'Get the auto-generated property + system snapshot loaded.',
          instructions: [
            'In your dashboard, find the lead under the relevant pipeline stage.',
            'Click into the lead — SolaFlow auto-loads the property data (address, EPC, roof orientation/area, existing electric).',
            'Note the auto-suggested system size and cost band — this is your anchor for the call.',
          ],
          timeEstimate: '15 seconds',
        },
        {
          number: 2,
          title: 'Cross-check the customer-supplied data',
          goal: 'Spot inconsistencies before they cost you on the call.',
          instructions: [
            'Compare the customer\'s self-reported bill with what SolaFlow estimated from the property.',
            'If the customer said £180/month but SolaFlow estimates £90/month — they\'re running heavy use (heat pump, EV, workshop). Flag this in your notes.',
            'If the EPC shows old gas heating but they ticked "all electric" — they\'re moving to heat pump. Pivot the call angle.',
          ],
          timeEstimate: '30 seconds',
          proTip:
            'When the customer-supplied data and SolaFlow data disagree, the truth is usually halfway. Lead with curiosity ("I noticed your bill seems higher than the property would suggest — are you running anything unusual?").',
        },
        {
          number: 3,
          title: 'Adjust the SolaFlow recommendation',
          goal: 'Sharpen the spec before the customer sees it.',
          instructions: [
            'Override the panel count if the roof can fit more than SolaFlow defaults.',
            'Adjust battery size based on your read of usage and tariff fit (see Battery + Inverter Pairing knowledge page).',
            'If they\'re on 3-phase supply, switch the inverter selection BEFORE the quote is generated.',
          ],
          timeEstimate: '30 seconds',
          commonMistake:
            'Sending the SolaFlow default quote without adjusting. The default is a starting point, not a finished spec. Reps who don\'t adjust look like they\'re running a script.',
        },
        {
          number: 4,
          title: 'Pre-stage the high anchor',
          goal: 'Set the headline price BEFORE the call so the actual quote feels like a win.',
          instructions: [
            'Configure SolaFlow\'s "headline estimate" to be 10 – 15% above your final target price.',
            'When the auto-email or text fires to the customer, they see the high number first.',
            'On the call, your actual quote comes in lower — feels like negotiation, even though it\'s your standard price.',
          ],
          timeEstimate: '15 seconds',
          proTip:
            'This is the SolaFlow psychology in one sentence: the customer\'s reference point is set by the system, not by the rep, which lets the rep deliver the "lower" number as good news.',
        },
      ],
      keyTakeaway:
        'A rep who walks into a call having done this 90-second prep closes 22% higher than a rep who opens the lead live. Make this a non-negotiable.',
    },
    {
      id: 'in-call',
      title: 'In-Call: SolaFlow as the Conversation Backbone',
      intro:
        'During the call, SolaFlow is your shared whiteboard. The customer sees what you see. Use it.',
      steps: [
        {
          number: 1,
          title: 'Share the screen / send the link',
          goal: 'Get the customer looking at the SolaFlow page in front of them.',
          instructions: [
            'If on a video call, share the SolaFlow lead view.',
            'If on phone, text them the customer-facing quote URL during the call — most people open it within 30 seconds.',
            '"You\'ll have just received a link from me — could you open that on your phone for a sec? I want to walk you through what I\'m looking at."',
          ],
          proTip:
            'Customers who SEE the spec while you talk close 40% higher than customers who only HEAR it.',
        },
        {
          number: 2,
          title: 'Walk them through the energy audit live',
          goal: 'Show your maths, build credibility.',
          instructions: [
            'Use SolaFlow\'s "kWh per year" calculation from their bill — say it out loud.',
            'Convert to daily use: "So you\'re using about 18 kWh a day — that\'s why I\'m recommending this size battery."',
            'Point at the SolaFlow visualisation that shows their current consumption vs solar generation overlay.',
          ],
        },
        {
          number: 3,
          title: 'Adjust the spec live based on their answers',
          goal: 'Show them you\'re designing FOR them, not selling AT them.',
          instructions: [
            'When they mention an EV, click the EV toggle in SolaFlow — battery size and inverter spec update visibly.',
            'When they mention an extension being built, increase the future load — they see the system grow.',
            'Each adjustment reinforces "this is a custom design", not a template.',
          ],
          proTip:
            'The visible "spec changes as you talk" is the killer SolaFlow feature competitors don\'t have. Use it ostentatiously.',
        },
        {
          number: 4,
          title: 'Deliver the final price as a "good news" reveal',
          goal: 'Use the pre-staged anchor to land lower.',
          instructions: [
            'After spec\'ing, look at the SolaFlow headline estimate and acknowledge it: "So the system as designed comes in at the headline £18,400 you would have seen on your text..."',
            'Then deliver the lower price: "But because we don\'t use middlemen and we install directly, your actual cost is £15,950."',
            'Pause. Let them feel the gap.',
          ],
        },
      ],
      keyTakeaway:
        'SolaFlow\'s in-call use case is theatre. The reps who lean into it close. The reps who treat it as a quoting tool leave money on the table.',
    },
    {
      id: 'post-call',
      title: 'Post-Call: Closing, Following Up, and Funnel Data',
      intro:
        'The call doesn\'t end when you hang up. SolaFlow has post-call automation that 80% of users never touch.',
      steps: [
        {
          number: 1,
          title: 'Trigger the follow-up sequence from the lead status',
          goal: 'Hand the lead to SolaFlow\'s automated nurture.',
          instructions: [
            'Mark the call outcome (interested, needs to think, blocked).',
            '"Interested" auto-triggers a 24h follow-up email with the final quote PDF + the install timeline.',
            '"Needs to think" auto-triggers a 72h check-in plus a video testimonial from a similar postcode.',
            '"Blocked" routes to your manager for personalised follow-up.',
          ],
          commonMistake:
            'Reps marking everything as "interested" because they don\'t want to look like they failed. The automations are tuned to outcomes — mislabelling breaks them.',
        },
        {
          number: 2,
          title: 'Update the lead with the precise spec',
          goal: 'So your installer team can quote materials without re-asking the customer.',
          instructions: [
            'Lock in the final panel count, battery model, inverter model.',
            'Add any notes about access, scaffolding, electrical condition.',
            'If you flagged G99, mark it — the back-office submits the form next day.',
          ],
        },
        {
          number: 3,
          title: 'Tag the lead source and rep performance',
          goal: 'Feed the marketing engine.',
          instructions: [
            'Confirm UTM source captured (Meta, Google, referral, organic).',
            'If you closed, tag the deciding factor (price, finance, install speed, brand).',
            'These tags drive next month\'s ad spend and your own commission attribution.',
          ],
        },
      ],
    },
    {
      id: 'scenarios',
      title: 'Common Scenarios',
      intro:
        'Specific situations and exactly what to do in SolaFlow.',
      scenarios: [
        {
          title: 'Customer asks for a written quote BEFORE the call',
          trigger:
            'Inbound enquiry where the customer says "just send me a quote, I don\'t want a call".',
          actions: [
            'Generate the SolaFlow quote with the high anchor active.',
            'Send the customer-facing URL with a personal video Loom embedded (30 seconds: "here\'s your quote, here\'s what to look at first, click reply if anything\'s unclear").',
            'Set a 48h follow-up trigger — most "send me a quote" leads convert on the second touch.',
          ],
          outcome:
            '40% of "no call" leads convert to a call within 72 hours when this flow runs. Without the Loom, it\'s under 10%.',
        },
        {
          title: 'Customer has multiple competing quotes',
          trigger:
            'On the call, customer says "I\'ve got three other quotes".',
          actions: [
            'In SolaFlow, switch to "comparison mode" — generates a side-by-side template they can fill with the other quotes.',
            'Send them the link mid-call: "let me give you a tool to compare apples to apples — I\'ll send it now".',
            'Walk them through 3 spec-quality questions to ask the other installers (panel brand tier, inverter MPPT count, battery DoD).',
          ],
          outcome:
            'You win on transparency. Even if they go with another quote, you\'ve set the spec bar — and 50% of the time, they come back because the other installers can\'t answer the technical questions.',
        },
        {
          title: 'Customer goes quiet after the call',
          trigger:
            'No response to the 24h auto follow-up.',
          actions: [
            'Day 5: SolaFlow auto-fires a "case study" email — testimonial from a similar postcode with their actual savings.',
            'Day 10: Manual rep follow-up. Open the lead, check what they engaged with (email open, link click). Reference it.',
            'Day 14: Final automation — a "we\'re holding your install slot for 7 more days" gentle scarcity message.',
          ],
          outcome:
            '20 – 30% of cold leads come back through this sequence. Without it, they\'re dead.',
        },
      ],
    },
  ],

  troubleshooting: [
    {
      problem: 'SolaFlow estimate looks wildly off from customer\'s actual bill',
      cause:
        'Property data is averaged from EPC + postcode. Outliers (heat pump, EV, electric heating, large workshop) are missed.',
      fix:
        'Ask 3 questions on the call: "Do you have an EV, heat pump, or electric heating? Anything unusual like a workshop or pool?" — then manually override the SolaFlow energy estimate.',
    },
    {
      problem: 'Auto follow-up email never fired',
      cause:
        'Lead wasn\'t correctly marked at end of call, or customer email field was empty.',
      fix:
        'Check the lead status was updated. Verify email captured. Re-trigger manually from the lead actions menu.',
    },
    {
      problem: 'Customer says the SolaFlow quote is different from what you discussed on the call',
      cause:
        'You made adjustments in-call but didn\'t save them before sending the post-call PDF.',
      fix:
        'After every call, hit "Save spec" before triggering the follow-up. If it\'s already gone out wrong, re-send with a 1-line note: "small correction — corrected version attached".',
    },
    {
      problem: 'Lead has been in pipeline for 30+ days with no movement',
      cause:
        'Automation paused itself after the 14-day sequence; nobody manually re-engaged.',
      fix:
        'Use the SolaFlow "stale leads" report (Reports → Stale leads). Bulk re-assign or trigger a manager re-engagement flow.',
    },
  ],

  relatedSystems: ['highlevel-playbook', 'customer-discovery-mastery'],
}
