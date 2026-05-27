import type { SystemsPlaybook } from '../types'

export const highlevelPlaybook: SystemsPlaybook = {
  slug: 'highlevel-playbook',
  title: 'HighLevel (GHL) CRM Playbook',
  subtitle:
    'How to set up HighLevel so it pulls leads from your ads, qualifies them automatically, fires the right SMS/email at the right hour, and lets your reps focus on closing.',
  forWhom:
    'Sales managers, ops managers, and any installer running paid Meta/Google ads who pays HighLevel money and isn\'t getting the multiplier.',
  estReadMinutes: 22,
  lastUpdated: '2026-05-27',
  introNarrative:
    'HighLevel is overpowered and underused. Most installers run it as a glorified inbox — leads come in, reps eventually call them, half go cold. The leverage is in the automation layer: pipelines that move leads automatically, smart lists that surface the right lead at the right time, and SMS sequences that warm leads while reps sleep. This playbook is the configuration that took ETOTO from 40% lead conversion to 67% in one quarter.',

  sections: [
    {
      id: 'pipelines',
      title: 'Pipeline Structure — The 7 Stages That Matter',
      intro:
        'Most installers use 3 – 4 pipeline stages and miss the operational data they need. This 7-stage structure is the one we deploy for every solar installer.',
      steps: [
        {
          number: 1,
          title: '01 — New Lead',
          goal:
            'Captures every inbound (ad form, website chat, referral, organic). No qualification yet.',
          instructions: [
            'All sources land here via webhook or native form integration.',
            'Auto-trigger: 5-minute SMS — "Hey [Name], it\'s [Rep] from [Brand]. Saw you enquired about solar — what made you start looking?".',
            '5-minute response time is the single biggest lift in lead conversion (3 – 5× vs 30-minute response).',
          ],
          timeEstimate: 'Auto — under 5 minutes',
        },
        {
          number: 2,
          title: '02 — Contacted',
          goal: 'Lead has had a human touch (call, SMS reply, email).',
          instructions: [
            'Auto-moves when rep marks "contacted" OR customer replies to the auto-SMS.',
            'Trigger: rep is auto-assigned a calendar booking link to send.',
            'If no response in 48h → auto-move to "Cold — re-engage" pipeline.',
          ],
        },
        {
          number: 3,
          title: '03 — Appointment Booked',
          goal: 'Calendar slot confirmed.',
          instructions: [
            'Auto-triggers from calendar booking.',
            'Sends customer: confirmation email + 24h reminder + 1h reminder.',
            'Sends rep: SolaFlow lead-prep link + customer\'s pre-call answers.',
          ],
        },
        {
          number: 4,
          title: '04 — Appointment Held',
          goal: 'Call/visit happened. Rep updates outcome.',
          instructions: [
            'Manual move from rep based on call outcome.',
            'Sub-tags: "Interested — sending quote", "Needs to think", "Not now", "Disqualified".',
            'Auto-fires post-call sequence based on sub-tag.',
          ],
        },
        {
          number: 5,
          title: '05 — Quote Sent',
          goal: 'Final spec + price delivered to customer.',
          instructions: [
            'Auto-fires when rep marks quote sent OR SolaFlow webhook triggers.',
            'Customer gets: quote PDF + 1-min Loom from rep + finance options + FAQ.',
            'Rep gets: 48h follow-up reminder on their dashboard.',
          ],
        },
        {
          number: 6,
          title: '06 — Deposit / Sale',
          goal: 'Customer has paid deposit or signed contract.',
          instructions: [
            'Auto-fires when Stripe payment webhook hits OR rep manually closes.',
            'Customer enters install-prep sequence: welcome video, MCS info, install day expectations.',
            'Triggers internal: G99 form submitted next-day, scaffolding booked, panels ordered.',
          ],
        },
        {
          number: 7,
          title: '07 — Installed / Lost',
          goal: 'Final lead state.',
          instructions: [
            'Installed: 30-day post-install review request, referral ask, Google review link.',
            'Lost: tagged with reason (price, finance, went elsewhere, timing). Re-enters nurture pipeline.',
          ],
        },
      ],
      keyTakeaway:
        'Every stage has an automation. Every transition has data. Reps focus on the human moments; HighLevel handles the rest.',
    },
    {
      id: 'smart-lists',
      title: 'Smart Lists — The 8 Views Every Rep Should Have',
      intro:
        'Smart lists are saved filters that auto-update. Build these once, every rep gets the right work surfaced.',
      steps: [
        {
          number: 1,
          title: 'Smart List: "Reply needed — under 1 hour old"',
          goal: 'New leads that haven\'t had a human response yet.',
          instructions: [
            'Filter: stage = "New Lead" AND created_at < 1 hour AND no call_logged.',
            'Sort: newest first.',
            'Notification: bell ping every 15 minutes if list has items.',
          ],
        },
        {
          number: 2,
          title: 'Smart List: "Stuck in Contacted >48h"',
          goal: 'Leads that responded but rep hasn\'t booked them yet.',
          instructions: [
            'Filter: stage = "Contacted" AND days_in_stage > 2.',
            'Daily 9am notification to rep.',
          ],
        },
        {
          number: 3,
          title: 'Smart List: "Appointment today"',
          goal: 'Rep\'s call list for the day.',
          instructions: [
            'Filter: appointment_date = today.',
            'Sort: by time.',
            'One-click into SolaFlow lead prep.',
          ],
        },
        {
          number: 4,
          title: 'Smart List: "Quote sent — needs follow-up"',
          goal: 'Quote sent 48 – 72h ago, no response.',
          instructions: [
            'Filter: stage = "Quote Sent" AND days_since_quote between 2 and 4.',
            'Surfaced on rep dashboard daily.',
          ],
        },
        {
          number: 5,
          title: 'Smart List: "Hot — engaged in last 24h"',
          goal:
            'Any lead who opened an email, clicked a link, or visited a page in the last 24 hours.',
          instructions: [
            'Filter: last_engagement < 1 day.',
            'These are your highest-intent leads at any moment. Call them first.',
          ],
          proTip:
            'Reps who work this list first close 1.5× more. Email opens correlate with intent more than time of day.',
        },
        {
          number: 6,
          title: 'Smart List: "Going cold — last engagement 7 – 14 days"',
          goal: 'Catch leads before they\'re fully cold.',
          instructions: [
            'Filter: stage != "Lost" AND last_engagement between 7 and 14 days.',
            'Trigger personal re-engagement (not auto).',
          ],
        },
        {
          number: 7,
          title: 'Smart List: "G99 pending"',
          goal:
            'Operations view — installs blocked by DNO paperwork.',
          instructions: [
            'Filter: g99_submitted = true AND g99_approved = false.',
            'Sort: by deposit_date.',
            'Ops checks weekly.',
          ],
        },
        {
          number: 8,
          title: 'Smart List: "Installed last 30 days — review pending"',
          goal: 'Capture Google reviews while customer is happy.',
          instructions: [
            'Filter: installed_date between 7 and 30 days ago AND no_review.',
            'Trigger: rep does personal text ask.',
          ],
        },
      ],
    },
    {
      id: 'automations',
      title: 'The 12 Automations That Run the Business',
      intro:
        'These are the workflows that run without rep intervention. Each one tested with at least 500 leads.',
      steps: [
        {
          number: 1,
          title: '5-minute auto-SMS on new lead',
          goal: 'Hit the response-time golden hour.',
          instructions: [
            'Trigger: new lead created.',
            'Delay: 4 minutes (so it doesn\'t feel automated).',
            'Message: "Hey [FirstName], it\'s [RepName] from [Brand] — saw your enquiry about solar. What made you start looking?"',
            'Open question forces a reply, not a yes/no.',
          ],
        },
        {
          number: 2,
          title: 'Inbound enquiry email confirmation',
          goal: 'Set expectations.',
          instructions: [
            'Trigger: new lead.',
            'Delay: 2 minutes.',
            'Email: "Got it. Your local rep [RepName] will be in touch within the hour. While you wait, here\'s a 2-min video showing how we work [Loom URL]."',
          ],
        },
        {
          number: 3,
          title: 'Appointment confirmation + reminder cascade',
          goal: 'No-show prevention.',
          instructions: [
            'Trigger: appointment booked.',
            'Immediate: confirmation email with calendar invite.',
            '24h before: SMS reminder with rescheduling link.',
            '1h before: SMS with rep mobile number.',
          ],
        },
        {
          number: 4,
          title: 'Post-call follow-up by outcome',
          goal: 'Different nurture for different stages.',
          instructions: [
            '"Interested" → 24h: quote PDF + Loom from rep. 72h: case study from similar postcode. 7 days: scarcity nudge.',
            '"Needs to think" → 48h: testimonial video. 5 days: rep personal text. 14 days: final auto.',
            '"Not now" → 90-day nurture: monthly value email (energy tips, market updates).',
          ],
        },
        {
          number: 5,
          title: 'Quote-sent abandoned recovery',
          goal: 'Catch the 50% who go silent.',
          instructions: [
            'Trigger: quote sent + no response in 72h.',
            '72h: rep personal SMS "Did the quote land? Happy to walk through it."',
            '7 days: testimonial from same area.',
            '14 days: gentle scarcity ("install slot held for 7 more days").',
          ],
        },
        {
          number: 6,
          title: 'Deposit confirmation + install prep',
          goal: 'Reduce buyer\'s remorse, accelerate to install.',
          instructions: [
            'Trigger: Stripe webhook on deposit OR rep marks deposit.',
            'Email: thank you + what happens next (timeline graphic).',
            'Auto-trigger ops: G99 form, scaffolding book, panel order.',
            'Day 3: welcome video from director.',
            'Day 7: install day prep video.',
          ],
        },
        {
          number: 7,
          title: 'Install day comms',
          goal: 'Customer feels in the loop.',
          instructions: [
            'Day before install: SMS reminder + installer photos + arrival window.',
            'Install morning: SMS "team on the way".',
            'Install complete: SMS + Loom from installer "here\'s your system, here\'s the app, here\'s the warranty".',
          ],
        },
        {
          number: 8,
          title: 'Post-install Google review ask',
          goal: 'Capture reviews when satisfaction is peak.',
          instructions: [
            'Day 7 post-install: SMS asking for Google review with direct link.',
            'Day 14 if no review: personal rep text.',
            'Day 30: final auto with referral incentive.',
          ],
        },
        {
          number: 9,
          title: 'Referral activation',
          goal: 'Turn happy customers into pipeline.',
          instructions: [
            'Trigger: review left OR 30 days post-install.',
            'Email: "loved working with you — here\'s a £100 voucher for any friend you refer who books an install".',
            'Auto-track referrals via unique link.',
          ],
        },
        {
          number: 10,
          title: 'Cold lead nurture (90-day)',
          goal: 'Stay top of mind without spam.',
          instructions: [
            'Trigger: lost lead OR 30 days no engagement.',
            'Monthly email: market update / energy tip / customer story / new product.',
            'Re-engagement reply → back into active pipeline.',
          ],
        },
        {
          number: 11,
          title: 'Internal alert: high-value lead',
          goal: 'Reps catch the whales.',
          instructions: [
            'Trigger: lead estimated system value > £20K.',
            'Slack/SMS to manager + assigned rep instantly.',
            'These get manual VIP treatment.',
          ],
        },
        {
          number: 12,
          title: 'Weekly performance digest',
          goal: 'Reps and managers see their own numbers.',
          instructions: [
            'Every Friday: email to each rep — leads handled, calls made, quotes sent, conversion rate.',
            'Manager gets team rollup.',
            'Transparent stats = self-correction.',
          ],
        },
      ],
    },
    {
      id: 'templates',
      title: 'Templates: SMS and Email Wording That Convert',
      intro:
        'Stolen from 18 months of A/B testing across 200+ installers. These are the winning variants.',
      scenarios: [
        {
          title: '5-minute auto-SMS (new lead)',
          trigger: 'Lead just filled in your form.',
          actions: [
            '"Hey [FirstName], [RepName] from [Brand]. Saw your solar enquiry — quick question: what triggered you to start looking? Bills, batteries, both?"',
          ],
          outcome:
            '38% reply rate (vs 12% for "thanks for your enquiry, we\'ll be in touch"). The open question forces engagement.',
        },
        {
          title: 'Calendar link send',
          trigger: 'After the first conversation.',
          actions: [
            '"Great chat — here\'s my diary, grab any slot that works: [calendar link]. The call takes 20 mins and you\'ll leave with a proper system spec and a price."',
          ],
          outcome:
            'Sets expectations (time + outcome). Booking rate ~70% vs 45% with just a link.',
        },
        {
          title: '24h appointment reminder',
          trigger: 'Day before booked appointment.',
          actions: [
            '"Hey [FirstName] — quick reminder we\'re scheduled for [TIME] tomorrow. If anything\'s changed, no stress, reply RESCHEDULE and I\'ll send you new options."',
          ],
          outcome:
            'No-show rate drops from 18% to 6%. The opt-out reduces guilt — they actually reply if blocked.',
        },
        {
          title: 'Post-call quote send',
          trigger: 'Within 2h of the call ending.',
          actions: [
            '"Quote attached — and a 60-sec Loom walking through it [link]. Any questions, just reply here. No rush, but our install diary fills 4 – 6 weeks out so worth flagging if you\'re leaning yes."',
          ],
          outcome:
            'Loom video drives 2× higher engagement than PDF alone. Soft scarcity at the end works without feeling pushy.',
        },
        {
          title: '72h "did you see it" follow-up',
          trigger: 'Quote sent, no reply for 72h.',
          actions: [
            '"Hey [FirstName] — did the quote land okay? Sometimes my emails sneak into spam. Happy to walk through anything or answer questions."',
          ],
          outcome:
            'Reply rate 35% — half of those convert to deposit within 14 days.',
        },
        {
          title: 'Cold re-engagement (60 days post-loss)',
          trigger: 'Lost lead, 60 days quiet.',
          actions: [
            '"Hey [FirstName] — Energy prices just shifted again. Wondered if solar is back on the radar? No pitch — just a check-in. If yes, reply with a thumbs up."',
          ],
          outcome:
            '12% re-engagement on lost leads, of which ~30% close. Free pipeline.',
        },
      ],
    },
  ],

  troubleshooting: [
    {
      problem: 'Automations firing twice or out of order',
      cause:
        'Multiple triggers overlap (e.g. "lead created" + "form submitted") or a workflow loops back into itself.',
      fix:
        'Build a "workflow map" diagram in Whimsical/Lucidchart. Audit every trigger. Use the HighLevel "Workflow History" tab to trace a recent firing and find the duplicate.',
    },
    {
      problem: 'Leads landing in the wrong pipeline stage',
      cause:
        'Form integration bypassed the stage-mapping logic, or webhook payload changed.',
      fix:
        'Check Settings → Integrations → Webhooks. Verify the source tag is being sent. Add a "Set stage" action at the start of every entry workflow as a safety net.',
    },
    {
      problem: 'SMS deliverability dropping',
      cause:
        'Sending volume spiked above carrier limits, or you\'re using a number flagged as marketing.',
      fix:
        'Move bulk sequences to a separate dedicated number. Use the HighLevel toll-free verification process. Spread sends across the day, not in bursts.',
    },
    {
      problem: 'Calendar bookings creating duplicate leads',
      cause:
        'Customer booked using a different email/phone than they used in the form.',
      fix:
        'Enable HighLevel\'s "merge by email or phone" setting. Set up a daily duplicate-scan workflow to flag and merge.',
    },
    {
      problem: 'Reps not using the smart lists',
      cause:
        'Smart lists buried in side menu, no dashboard surface.',
      fix:
        'Pin the 4 most-used lists to each rep\'s dashboard. Make "calls per day" visible to the team — peer pressure does the rest.',
    },
  ],

  relatedSystems: ['solaflow-mastery', 'customer-discovery-mastery'],
}
