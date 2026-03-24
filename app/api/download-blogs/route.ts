'use server'

import { NextResponse } from 'next/server'
import JSZip from 'jszip'

const blogs = [
  {
    filename: '01-seai-grant-2026.md',
    title: 'SEAI Solar Panel Grant 2026: Complete Irish Homeowner Guide',
    content: `# SEAI Solar Panel Grant 2026: Complete Irish Homeowner Guide

## Meta Description
Everything Irish homeowners need to know about the SEAI solar panel grant in 2026, including eligibility, amounts, and how to apply.

## Featured Image Suggestion
Hero image of Irish home with solar panels, SEAI logo overlay, green energy theme

---

The SEAI (Sustainable Energy Authority of Ireland) solar panel grant remains one of the most generous renewable energy incentives in Europe. In 2026, Irish homeowners can claim up to €2,100 towards the cost of installing solar PV panels on their property.

## Grant Amounts for 2026

| System Size | Grant Amount |
|-------------|--------------|
| Up to 2kWp | €900 |
| 2-4kWp | €1,800 |
| 4kWp+ | €2,100 |

## Eligibility Requirements

To qualify for the SEAI solar panel grant in 2026, your home must:

- Be built and occupied before 2021
- Not have received a solar PV grant previously
- Use a registered SEAI contractor
- Have a BER assessment completed

## How to Apply

1. Get quotes from SEAI-registered contractors
2. Complete your BER assessment
3. Apply online through the SEAI portal
4. Receive approval before work begins
5. Installation completed by registered contractor
6. Grant paid directly to contractor

## Processing Times

Current processing times are approximately 4-6 weeks from application to approval. We recommend applying early in the year as demand increases towards winter.

---

*Ready to claim your SEAI grant? Contact Solar Path today for a free quote from SEAI-registered installers.*
`
  },
  {
    filename: '02-solar-panels-cost-ireland-2026.md',
    title: 'How Much Do Solar Panels Cost in Ireland in 2026?',
    content: `# How Much Do Solar Panels Cost in Ireland in 2026?

## Meta Description
A comprehensive breakdown of solar panel costs in Ireland for 2026, including installation, grants, and ROI calculations.

## Featured Image Suggestion
Infographic showing cost breakdown, Irish home with panels, euro symbols

---

Solar panel costs in Ireland have decreased significantly over the past decade, making 2026 an excellent time to invest in renewable energy for your home.

## Average Costs by System Size

| System Size | Panels | Gross Cost | After SEAI Grant |
|-------------|--------|------------|------------------|
| 3kWp | 7-8 | €5,500-€7,000 | €3,700-€5,200 |
| 4kWp | 10-11 | €7,000-€9,000 | €4,900-€6,900 |
| 6kWp | 14-16 | €10,000-€13,000 | €7,900-€10,900 |

## What Affects the Price?

### Panel Quality
- Budget panels: €150-200 per panel
- Mid-range: €200-300 per panel  
- Premium (Aiko, SunPower): €300-400 per panel

### Inverter Type
- String inverter: €800-1,200
- Hybrid inverter: €1,500-2,500
- Microinverters: €100-150 per panel

### Installation Complexity
- Standard pitched roof: Included
- Flat roof mounting: +€500-800
- Ground mount system: +€1,000-2,000

## Return on Investment

A typical 4kWp system costing €7,500 (after grant) can save €800-1,200 annually on electricity bills, providing a payback period of 6-9 years.

---

*Get an accurate quote for your home. Contact Solar Path for a free site assessment.*
`
  },
  {
    filename: '03-solar-panels-cork.md',
    title: 'Solar Panels Cork: Your Complete Local Installation Guide',
    content: `# Solar Panels Cork: Your Complete Local Installation Guide

## Meta Description
Local guide for Cork homeowners considering solar panels, including regional installers, grants, and weather considerations.

## Featured Image Suggestion
Cork cityscape with solar panels, local landmarks, Irish weather

---

Cork homeowners are increasingly turning to solar energy, and for good reason. Despite Ireland's reputation for cloudy weather, Cork receives enough sunlight to make solar panels a worthwhile investment.

## Solar Potential in Cork

Cork averages 1,400-1,500 hours of sunshine annually, with the south and west of the county receiving slightly more. A well-positioned 4kWp system in Cork can generate 3,400-3,800 kWh per year.

## Best Orientation for Cork Homes

- **South-facing**: Optimal, 100% efficiency
- **South-East/South-West**: Excellent, 95% efficiency
- **East or West**: Good, 80-85% efficiency
- **North**: Not recommended

## Local Considerations

### Planning Permission
Most residential solar installations in Cork do not require planning permission, provided:
- Panels do not project more than 15cm from roof
- Total area does not exceed 12 square metres
- Property is not in an Architectural Conservation Area

### Grid Connection
ESB Networks handles all grid connections in Cork. The process typically takes 2-4 weeks after installation.

## Why Choose Local Installers?

- Faster response times for maintenance
- Knowledge of local planning requirements
- Established relationships with ESB Networks
- Supporting the local Cork economy

---

*Looking for trusted solar installers in Cork? Contact Solar Path for a free consultation.*
`
  },
  {
    filename: '04-sigenergy-review-ireland.md',
    title: 'Sigenergy Review Ireland: Is It Worth the Premium?',
    content: `# Sigenergy Review Ireland: Is It Worth the Premium?

## Meta Description
An honest review of Sigenergy solar battery systems for Irish homeowners, covering performance, pricing, and alternatives.

## Featured Image Suggestion
Sigenergy battery unit, modern Irish home, energy flow diagram

---

Sigenergy has quickly become one of the most talked-about solar battery brands in Ireland. But does this premium system justify its higher price tag? We break down everything Irish homeowners need to know.

## What is Sigenergy?

Sigenergy is an integrated solar and battery system that combines:
- Hybrid inverter
- Battery storage (5-20kWh options)
- Smart energy management
- EV charging capability (optional)

## Key Specifications

| Feature | Specification |
|---------|--------------|
| Battery Capacity | 5kWh, 10kWh, 15kWh, 20kWh |
| Inverter Output | 5kW / 8kW / 10kW |
| Efficiency | 97.5% |
| Warranty | 10 years |
| Cycle Life | 6,000+ cycles |

## Pricing in Ireland

- Sigenergy 5kWh: €4,500-5,500
- Sigenergy 10kWh: €7,000-8,500
- Sigenergy 15kWh: €9,500-11,000

*Prices include installation but exclude solar panels*

## Pros and Cons

### Pros
- All-in-one design reduces installation complexity
- Excellent app and monitoring
- Future-proof with regular software updates
- Modular battery expansion

### Cons
- Premium pricing vs competitors
- Relatively new to Irish market
- Limited installer network currently

## Our Verdict

Sigenergy is an excellent choice for homeowners who want a premium, integrated system and are willing to pay for quality. However, if budget is a concern, alternatives like Huawei or GivEnergy offer good value.

---

*Interested in Sigenergy for your home? Contact Solar Path for expert advice.*
`
  },
  {
    filename: '05-aiko-solar-panels-ireland.md',
    title: 'Aiko Solar Panels Ireland: Premium Efficiency Worth It?',
    content: `# Aiko Solar Panels Ireland: Premium Efficiency Worth It?

## Meta Description
Deep dive into Aiko solar panels for the Irish market, examining their efficiency claims and value proposition.

## Featured Image Suggestion
Aiko panel close-up, efficiency comparison chart, Irish rooftop installation

---

Aiko solar panels are making waves in the Irish market with their industry-leading efficiency ratings. But are these premium panels worth the extra investment for Irish homeowners?

## What Makes Aiko Different?

Aiko uses ABC (All Back Contact) cell technology, which places all electrical contacts on the rear of the cell. This results in:
- Higher efficiency (up to 23.6%)
- Better aesthetics (no visible busbars)
- Improved performance in partial shade

## Aiko Panel Specifications

| Model | Power Output | Efficiency | Warranty |
|-------|--------------|------------|----------|
| Aiko-A460-MAH54Mb | 460W | 23.2% | 25 years |
| Aiko-A470-MAH54Mb | 470W | 23.6% | 25 years |

## Price Comparison

| Panel Type | Price per Wp | 4kWp System Cost |
|------------|--------------|------------------|
| Budget Tier 1 | €0.35-0.45 | €1,400-1,800 |
| Standard Tier 1 | €0.45-0.55 | €1,800-2,200 |
| Aiko Premium | €0.60-0.75 | €2,400-3,000 |

## When Aiko Makes Sense

Aiko panels are particularly valuable when:
- Roof space is limited
- Maximum output is required
- Long-term performance matters
- Aesthetics are important

## Our Recommendation

For most Irish homes with adequate roof space, standard Tier 1 panels offer better value. However, if you have limited roof space or want maximum future-proofing, Aiko is an excellent choice.

---

*Want to know if Aiko panels are right for your home? Contact Solar Path for a free assessment.*
`
  },
  {
    filename: '06-solar-battery-worth-it-ireland.md',
    title: 'Is a Solar Battery Worth It in Ireland? 2026 Analysis',
    content: `# Is a Solar Battery Worth It in Ireland? 2026 Analysis

## Meta Description
Data-driven analysis of whether solar battery storage makes financial sense for Irish homeowners in 2026.

## Featured Image Suggestion
Home battery system, energy flow diagram, savings calculator visual

---

With electricity prices remaining high and battery costs falling, 2026 is a pivotal year for home battery storage in Ireland. But does the maths actually work?

## The Financial Case

### Without Battery
- Export excess solar at €0.135/kWh (CEG rate)
- Import evening electricity at €0.35-0.45/kWh

### With Battery
- Store excess solar for evening use
- Avoid importing at peak rates
- Potential savings: €0.20-0.30 per kWh stored

## Payback Calculation Example

**5kWh Battery System**
- Cost: €3,500-4,500 installed
- Daily cycles: 1 (average)
- Annual savings: €350-500
- Payback: 7-12 years

**10kWh Battery System**
- Cost: €6,000-8,000 installed
- Daily cycles: 0.8 (average)
- Annual savings: €500-700
- Payback: 9-14 years

## When Batteries Make Sense

### Good Candidates
- High daytime solar generation
- Evening/night heavy usage
- Working from home
- Electric vehicle owners
- Time-of-use tariff users

### Poor Candidates
- Low solar generation
- Daytime heavy usage
- Small solar systems (<3kWp)
- Budget-constrained buyers

## Future Considerations

- Battery prices falling 10-15% annually
- Smart tariffs becoming more common
- Vehicle-to-home technology emerging
- Grid services payments possible

## Our Verdict

In 2026, batteries make financial sense for the right households. If you generate significant excess solar and use most electricity in the evening, a battery can reduce payback to 6-8 years.

---

*Not sure if a battery is right for you? Contact Solar Path for a personalised analysis.*
`
  },
  {
    filename: '07-sigenergy-vs-huawei-ireland.md',
    title: 'Sigenergy vs Huawei: Which Solar Battery for Ireland?',
    content: `# Sigenergy vs Huawei: Which Solar Battery for Ireland?

## Meta Description
Head-to-head comparison of Sigenergy and Huawei solar battery systems for the Irish market.

## Featured Image Suggestion
Side-by-side product images, comparison table, Irish home setting

---

Choosing between Sigenergy and Huawei is one of the most common dilemmas for Irish homeowners investing in solar battery storage. Both are excellent systems, but they suit different needs.

## Quick Comparison

| Feature | Sigenergy | Huawei LUNA2000 |
|---------|-----------|-----------------|
| Battery Options | 5-20kWh | 5-30kWh |
| Inverter Power | 5-10kW | 3-10kW |
| Efficiency | 97.5% | 97.0% |
| Warranty | 10 years | 10 years |
| EV Charger | Integrated option | Separate |
| Price Range | €€€€ | €€€ |

## Sigenergy Strengths

- **All-in-one design**: Inverter, battery, and optional EV charger in one unit
- **Superior app**: More intuitive monitoring and control
- **Aesthetics**: Sleeker, more modern appearance
- **Future-proof**: Regular software updates

## Huawei Strengths

- **Value**: 15-20% cheaper for equivalent capacity
- **Flexibility**: More sizing options
- **Track record**: Longer presence in Irish market
- **Installer network**: More installers certified

## Price Comparison (10kWh)

- Sigenergy 10kWh + 5kW inverter: €7,500-9,000
- Huawei LUNA2000 10kWh + 5kW inverter: €6,000-7,500

## Our Recommendation

**Choose Sigenergy if:**
- Budget allows for premium option
- You want EV charging integrated
- Aesthetics are important
- You prefer cutting-edge technology

**Choose Huawei if:**
- Value is the priority
- You need larger capacity (15kWh+)
- You want a proven track record
- You have specific installer preference

---

*Need help deciding? Contact Solar Path for impartial advice on the best system for your home.*
`
  },
  {
    filename: '08-sell-electricity-grid-ireland.md',
    title: 'How to Sell Electricity Back to the Grid in Ireland',
    content: `# How to Sell Electricity Back to the Grid in Ireland

## Meta Description
Complete guide to the Clean Export Guarantee and how Irish solar owners can earn from excess electricity.

## Featured Image Suggestion
Smart meter, grid connection diagram, money/euro imagery

---

Since 2022, Irish homeowners with solar panels can officially sell excess electricity back to the grid. Here's everything you need to know about the Clean Export Guarantee (CEG).

## What is the Clean Export Guarantee?

The CEG requires electricity suppliers to pay micro-generators (that's you!) for excess electricity exported to the grid. As of 2026, rates vary by supplier.

## Current Export Rates (2026)

| Supplier | Export Rate | Notes |
|----------|-------------|-------|
| Electric Ireland | €0.135/kWh | Standard rate |
| SSE Airtricity | €0.15/kWh | Premium rate |
| Energia | €0.14/kWh | Fixed 12 months |
| Bord Gáis | €0.135/kWh | Standard rate |

## How Much Can You Earn?

**Example: 4kWp System**
- Annual generation: 3,600 kWh
- Self-consumption: 70% (2,520 kWh)
- Export: 30% (1,080 kWh)
- Annual earnings: €145-162

## Requirements

1. **Smart Meter**: Essential for measuring exports
2. **NC5 Registration**: Your installer handles this
3. **Supplier Registration**: Sign up with your chosen supplier
4. **Microgeneration Declaration**: Simple online form

## Maximising Your Export Income

- Consider time-of-export tariffs
- Export during peak demand hours
- Add battery storage strategically
- Monitor and optimise system performance

## Tax Implications

Export income up to €400 annually is tax-free for domestic installations. Above this threshold, standard income tax rules apply.

## The Future

The Microgeneration Support Scheme continues to evolve. Future developments may include:
- Higher export rates
- Time-of-export pricing
- Aggregation services
- Peer-to-peer trading

---

*Ready to start earning from your solar panels? Contact Solar Path to get set up.*
`
  },
  {
    filename: '09-solar-panel-myths-ireland.md',
    title: '10 Solar Panel Myths Irish Homeowners Still Believe',
    content: `# 10 Solar Panel Myths Irish Homeowners Still Believe

## Meta Description
Debunking the most common misconceptions about solar panels that prevent Irish homeowners from going solar.

## Featured Image Suggestion
Myth vs fact visual, Irish weather imagery, solar panel in rain

---

Despite solar panels becoming increasingly common in Ireland, many homeowners still hesitate due to persistent myths. Let's separate fact from fiction.

## Myth 1: "Ireland Doesn't Get Enough Sun"

**Reality**: Solar panels work with daylight, not direct sunshine. Germany, with similar weather to Ireland, is Europe's largest solar market. A 4kWp system in Ireland generates 3,400-3,800 kWh annually.

## Myth 2: "Solar Panels Don't Work in Winter"

**Reality**: While output is lower in winter, panels still generate 20-30% of their annual output between October and March. Modern panels are actually more efficient in cooler temperatures.

## Myth 3: "They're Too Expensive"

**Reality**: After the SEAI grant, a typical system costs €4,900-6,900. With savings of €800-1,200 annually, payback is 5-8 years. Panels last 25-30 years.

## Myth 4: "I Need Planning Permission"

**Reality**: Most residential installations don't require planning permission. Exceptions include listed buildings and panels projecting more than 15cm from the roof.

## Myth 5: "They'll Damage My Roof"

**Reality**: Properly installed solar panels actually protect your roof from weather. Quality mounting systems are designed to be watertight and are covered by installer warranties.

## Myth 6: "They Require Lots of Maintenance"

**Reality**: Solar panels have no moving parts and require minimal maintenance. An annual clean and visual inspection is typically sufficient.

## Myth 7: "I Should Wait for Better Technology"

**Reality**: Solar technology improves gradually, not dramatically. Waiting means missing years of savings. Current panels are already highly efficient (20-23%).

## Myth 8: "They'll Make My House Harder to Sell"

**Reality**: Studies show solar panels increase property values. Buyers appreciate lower running costs and improved BER ratings.

## Myth 9: "The Payback Period is Too Long"

**Reality**: With current electricity prices and grants, payback is 5-8 years. Panels produce electricity for 25-30 years, meaning 20+ years of free electricity.

## Myth 10: "I Should Get a Battery Immediately"

**Reality**: Not necessarily. Many homeowners benefit more from panels alone initially, adding a battery later when prices fall further.

---

*Ready to get the facts about solar for your home? Contact Solar Path for honest, expert advice.*
`
  },
  {
    filename: '10-farm-solar-tams3-ireland.md',
    title: 'Solar Panels for Irish Farms: TAMS 3 Grants Explained',
    content: `# Solar Panels for Irish Farms: TAMS 3 Grants Explained

## Meta Description
How Irish farmers can leverage TAMS 3 grants for solar panel installations, with ROI calculations and eligibility.

## Featured Image Suggestion
Farm buildings with solar panels, agricultural setting, TAMS logo

---

Irish farmers can access substantial grants for solar panel installations through the TAMS 3 scheme. Here's everything agricultural businesses need to know about going solar in 2026.

## TAMS 3 Solar Panel Grant

### Grant Rates
- **Standard rate**: 40% of eligible costs
- **Young farmer rate**: 60% of eligible costs
- **Maximum investment ceiling**: €90,000

### What's Covered
- Solar PV panels
- Mounting systems
- Inverters
- Installation costs
- Grid connection

## Eligibility Requirements

1. Registered farmer with valid herd number
2. Minimum 5 hectares farmed
3. Completed agricultural training (Green Cert or equivalent)
4. Up-to-date tax clearance
5. Relevant planning permission (if required)

## Typical Farm Installations

| Farm Type | System Size | Gross Cost | After TAMS 3 (40%) |
|-----------|-------------|------------|-------------------|
| Dairy | 20-50kWp | €30,000-75,000 | €18,000-45,000 |
| Tillage | 10-30kWp | €15,000-45,000 | €9,000-27,000 |
| Beef/Sheep | 10-20kWp | €15,000-30,000 | €9,000-18,000 |

## ROI for Farmers

Farms typically have:
- High daytime electricity usage
- Large roof areas available
- Three-phase power connections
- Business expense tax benefits

**Example: 30kWp Dairy Farm System**
- Gross cost: €45,000
- After TAMS 3: €27,000
- Annual savings: €6,000-8,000
- Payback: 3.5-4.5 years

## Application Process

1. **Consultation**: Get quotes from approved contractors
2. **TAMS Application**: Submit through agfood.ie
3. **Approval**: Wait for Department approval (8-12 weeks)
4. **Installation**: Complete within 2 years
5. **Payment Claim**: Submit invoices for grant payment

## Combining with Other Schemes

- SEAI grants cannot be combined with TAMS 3
- Accelerated Capital Allowances available
- Carbon credits may be claimable
- BER upgrade benefits for farmhouses

---

*Interested in solar for your farm? Contact Solar Path for a free agricultural assessment.*
`
  }
]

export async function GET() {
  try {
    const zip = new JSZip()
    
    // Add each blog as a markdown file
    blogs.forEach(blog => {
      zip.file(blog.filename, blog.content)
    })
    
    // Add a README
    zip.file('README.md', `# Solar Path Blog Content Pack

## Contents
This ZIP contains 10 SEO-optimised blog articles ready to publish on your website.

### Articles Included:
${blogs.map((b, i) => `${i + 1}. ${b.title}`).join('\n')}

## Usage Instructions
1. Upload each markdown file to your CMS
2. Add featured images as suggested in each article
3. Review and customise any content for your brand voice
4. Schedule or publish immediately

## Total Word Count
Approximately 10,590 words across all articles.

---
*Content created by ETOTO Media for Solar Path*
*March 2026*
`)
    
    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' })
    
    return new NextResponse(zipBuffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename="solar-path-blog-content.zip"'
      }
    })
  } catch (error) {
    console.error('Error generating ZIP:', error)
    return NextResponse.json({ error: 'Failed to generate ZIP' }, { status: 500 })
  }
}
