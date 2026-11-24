# Website SEO Changes Log

Auto-exported from `seo_memory.db`. Do not put secrets here.

## 2026-11-24 — `https://www.locumcareerhub.com/llms.txt`

- Type: `technical`
- Status: shipped
- Before: Hand-curated IC-heavy catalog; NIC pay missing; llms files not in sitemap; footer omitted llms-full
- After: When to use index, NIC pay claim, featured jobs synced into ai-catalog.json, sitemap+footer include AI files
- Reason: Agents follow llms.txt links; Google ignores the file so sitemap+HTML still matter
- Expected: Primary retrieval set is calculator, pay, IMLC, KY/OH/KS jobs, not city shells
- Actual: pending

## 2026-11-24 — `https://www.locumcareerhub.com/interventional-cardiology-locums-pay`

- Type: `content`
- Status: shipped
- Before: IC/EP/NIC pay pages had no AiCitePanel; SERP titles unchanged
- After: Answer-first claim, pay vs callback table, cite panel; IC title still Interventional Cardiology Locums Pay | ,200/Day
- Reason: Pay pages are the unique daily-band facts AI should cite; titles stay as-is
- Expected: ChatGPT/Perplexity can quote dated IC/EP/NIC daily bands from HTML or markdown
- Actual: pending

## 2026-11-24 — `https://www.locumcareerhub.com/guides/how-to-start-interventional-cardiology-locums`

- Type: `content`
- Status: shipped
- Before: Direct answer paragraph without speakable id; no cite panel on programmatic guides
- After: AnswerFirstBlock id=direct-answer, provenance, IC scope table, AiCitePanel on IC/money/licensing templates
- Reason: Schema speakable targeted #direct-answer that did not exist on the guide template RAG needs
- Expected: IC cluster pages extract as citeable chunks once indexed
- Actual: pending

## 2026-11-24 — `https://www.locumcareerhub.com/`

- Type: `technical`
- Status: shipped
- Before: Unknown URLs HTTP 200; Accept text/markdown returned HTML; llms.txt When to cite only; Organization schema missing postal address
- After: dynamicParams false + 404 recovery to llms.txt/sitemap; Markdown Accept with Vary; When to use section; MPLT Boca Raton address in SITE and JSON-LD
- Reason: Is Agentic essential failures blocked agent retrieval even though bots were allowed
- Expected: Is Agentic essential 404 and markdown pass; agents can recover from misses
- Actual: pending

## 2026-11-11 — `https://www.locumcareerhub.com/guides/impella-mcs-locum-jobs`

- Type: `new-landing-page`
- Status: shipped
- Before: No Impella/MCS locum URL; do not invent shock jobs
- After: MCS as a privilege-set question on IC locums, not a fake job board
- Reason: High-acuity IC operators search MCS; agencies do not buy this ad
- Expected: IC inquiries that state MCS yes/no without implying a live Impella listing
- Actual: pending

## 2026-11-11 — `https://www.locumcareerhub.com/guides/first-interventional-locum-assignment`

- Type: `new-landing-page`
- Status: shipped
- Before: No first-assignment IC URL
- After: How to pick a first IC locum week without stacking hardest STEMI
- Reason: People-also-search from how-to-start; unpaid
- Expected: First-week IC match requests with recovery stated
- Actual: pending

## 2026-11-11 — `https://www.locumcareerhub.com/guides/questions-before-ic-locum-contract`

- Type: `new-landing-page`
- Status: shipped
- Before: No IC contract-questions URL
- After: Physician-side checklist before signing an IC locum contract
- Reason: Decision SERP, not a job board; Reddit/ACC currently occupy it
- Expected: High-intent IC inquiries after reading the checklist
- Actual: pending

## 2026-11-11 — `https://www.locumcareerhub.com/guides/interventional-locums-gratis-hours-and-callback`

- Type: `new-landing-page`
- Status: shipped
- Before: Pay arcade only; people-also-search includes IC locum rates
- After: Gratis hours vs daily guarantee vs STEMI callback
- Reason: Related search from the paid SERP; do not retitle the pay arcade
- Expected: Clicks from rate queries into a unique IC pay-mechanics URL
- Actual: pending

## 2026-11-11 — `https://www.locumcareerhub.com/guides/temporary-privileges-for-ic-locums`

- Type: `new-landing-page`
- Status: shipped
- Before: Generic temp-privileges glossary already converted 1 generate_lead
- After: Cath-lab-specific temp privileges page
- Reason: Glossary converted; IC operators need PCI/STEMI specifics
- Expected: ASAP IC form_starts that do not assume temps are a plan
- Actual: pending

## 2026-11-11 — `https://www.locumcareerhub.com/guides/board-eligible-interventional-locums`

- Type: `new-landing-page`
- Status: shipped
- Before: No BE IC locums URL
- After: Board-eligible IC locums: logs and solo STEMI reality
- Reason: Fellowship graduates search BE/BC locums; not a paid job pack
- Expected: Honest BE IC inquiries with exam dates
- Actual: pending

## 2026-11-11 — `https://www.locumcareerhub.com/guides/primary-pci-vs-diagnostic-cath-locums`

- Type: `new-landing-page`
- Status: shipped
- Before: No diagnostic-vs-primary PCI locum distinction URL
- After: Diagnostic-only vs primary PCI locums as different privilege sets
- Reason: Operators search this split; job ads collapse it into interventional
- Expected: Fewer mismatched STEMI presentations
- Actual: pending

## 2026-11-11 — `https://www.locumcareerhub.com/guides/call-only-interventional-locums`

- Type: `new-landing-page`
- Status: shipped
- Before: Only cath-lab-only and STEMI-call pages
- After: Call-only vs lab-only vs mixed week distinction
- Reason: Call-only is a different product than weekday PCI; agencies do not buy this query
- Expected: STEMI-night match requests without clinic panels
- Actual: pending

## 2026-11-11 — `https://www.locumcareerhub.com/guides/pci-without-surgical-backup-locums`

- Type: `new-landing-page`
- Status: shipped
- Before: No non-SOS PCI locum URL
- After: SCAI-context PCI without on-site surgery locums guide; not invented hospital listings
- Reason: Paid job SERP ignores this query; organic is SCAI/ACC/NIH
- Expected: Community STEMI IC inquiries that state backup preference
- Actual: pending

## 2026-11-11 — `https://www.locumcareerhub.com/guides/how-to-start-interventional-cardiology-locums`

- Type: `new-landing-page`
- Status: shipped
- Before: No IC how-to-start URL; SERP is Locumstory/Weatherby blog/Reddit with 0 ads
- After: Unique IC start sequence: logs, IMLC, moonlighting, written STEMI scope
- Reason: Live Google 2026-11-11: how to start IC locums has no CompHealth/Weatherby ads
- Expected: Index and rank for how-to-start IC locums; form_starts from operators skipping the paid job SERP
- Actual: pending

## 2026-11-11 — `https://www.locumcareerhub.com/interventional-cardiology-locums-pay`

- Type: `content`
- Status: shipped
- Before: Pay arcade + Ohio/KY examples; 28 impr / 0 clicks / pos 9.6; title already ,200/Day
- After: Added STEMI nights, IMLC, lab-only sections and cluster links; SERP title unchanged
- Reason: Memory forbids retitling IC pay; content/internal links are the remaining lever
- Expected: First click from existing ~#10 impressions and clicks through to Ohio/KY jobs
- Actual: pending

## 2026-11-11 — `https://www.locumcareerhub.com/interventional-cardiologist-locum-jobs`

- Type: `content`
- Status: shipped
- Before: One exclusive-blocks section; 29 impr / 1 click / 1 generate_lead
- After: Added lab-only vs mixed, IMLC/logs sections, FAQs, cluster internal links
- Reason: Only IC landing with a GA4 generate_lead in 90d
- Expected: More IC form_starts from this URL without a title change
- Actual: pending

## 2026-11-11 — `https://www.locumcareerhub.com/locum-jobs/cardiology/interventional`

- Type: `content`
- Status: shipped
- Before: Thin hub sections; 90d GSC 88 impr / 3 clicks / pos 44
- After: Unique lab-only vs mixed copy, 12-guide cluster nav, IMLC/cath-lab contextual links
- Reason: Highest-ROI IC URL by clicks; deepen instead of more state shells
- Expected: More clicks from generic cardiology locums queries into KY/OH jobs and IC guides
- Actual: pending

## 2026-11-11 — `https://www.locumcareerhub.com/guides/rural-stemi-coverage-locums`

- Type: `new-landing-page`
- Status: shipped
- Before: No rural STEMI intent page
- After: Community PCI/STEMI locums guide; not a 50-state shell list
- Reason: Real IC demand is community STEMI; city shells already failed
- Expected: Community STEMI IC match requests with solo-call preference stated
- Actual: pending

## 2026-11-11 — `https://www.locumcareerhub.com/guides/sacramento-interventional-cardiology-locums`

- Type: `new-landing-page`
- Status: shipped
- Before: Only VMS featured job
- After: Sacramento-area IC guide: CA is not IMLC; VMS facility withheld; hospitals as context
- Reason: Live Sacramento VMS IC job had 2 GA4 sessions; unique geography without fake hospital listings
- Expected: CA-licensed IC inquiries; out-of-state operators routed to compact states
- Actual: pending

## 2026-11-11 — `https://www.locumcareerhub.com/guides/ohio-interventional-cardiology-locums`

- Type: `new-landing-page`
- Status: shipped
- Before: Only state shell + featured job
- After: Unique Ohio IC corridor page for live 1-2 week mixed block + IMLC
- Reason: Ohio featured job needed a unique market page, not another thin state URL
- Expected: Ohio IC queries into the featured job inquiry
- Actual: pending

## 2026-11-11 — `https://www.locumcareerhub.com/guides/kentucky-interventional-cardiology-locums`

- Type: `new-landing-page`
- Status: shipped
- Before: Only state shell + featured job
- After: Unique KY IC corridor page for live cath-lab-only job + IMLC; hospitals as context not listings
- Reason: State IC shells had ~0 clicks; unique corridor + live job is the alternative to city shells
- Expected: KY IC queries into the featured lab-only job form
- Actual: pending

## 2026-11-11 — `https://www.locumcareerhub.com/guides/moonlighting-as-an-employed-interventional-cardiologist`

- Type: `new-landing-page`
- Status: shipped
- Before: Generic moonlighting landing only
- After: Employed IC moonlighting: clause, recovery, compact second license
- Reason: Ohio/KY IC jobs fit employed add-on weeks; generic moonlighting page is not IC-specific
- Expected: Employed IC form_starts with moonlighting status stated
- Actual: pending

## 2026-11-11 — `https://www.locumcareerhub.com/guides/structural-vs-pci-locums`

- Type: `new-landing-page`
- Status: shipped
- Before: Structural hub existed; no PCI-vs-structural locums comparison
- After: Honest comparison: most IC locums are PCI/STEMI, not TAVR
- Reason: Do not invent structural jobs; separate privilege sets
- Expected: PCI operators self-select; structural-only asks stay honest
- Actual: pending

## 2026-11-11 — `https://www.locumcareerhub.com/guides/pci-logs-and-privileging-for-locums`

- Type: `new-landing-page`
- Status: shipped
- Before: Privileging mentioned in hub/pay only
- After: PCI/STEMI logs, FPPE, and why ASAP is a file date
- Reason: ASAP Ohio/KY starts fail on thin logs more than on titles
- Expected: Complete-file IC inquiries and fewer dead ASAP presentations
- Actual: pending

## 2026-11-11 — `https://www.locumcareerhub.com/guides/one-week-a-month-interventional-locums`

- Type: `new-landing-page`
- Status: shipped
- Before: 1-2 week cadence lived only on the Ohio job
- After: Recurring IC week guide; explicitly not the NE Kansas inpatient shift job
- Reason: Ohio job is 1-2 weeks/month mixed IC; prevent confusion with general inpatient shift counts
- Expected: Recurring-block IC inquiries without Kansas-inpatient mixups
- Actual: pending

## 2026-11-11 — `https://www.locumcareerhub.com/guides/weekend-interventional-cardiology-locums`

- Type: `new-landing-page`
- Status: shipped
- Before: Weekend locums was general cardiology, not IC
- After: Weekend IC locums guide for employed moonlighting STEMI blocks
- Reason: Employed IC moonlighting is a real door; do not invent weekly salary theater
- Expected: Moonlighting IC inquiries with licenses and weekend dates
- Actual: pending

## 2026-11-11 — `https://www.locumcareerhub.com/guides/stemi-call-locums`

- Type: `new-landing-page`
- Status: shipped
- Before: STEMI explained only inside pay/hub copy
- After: Flagship STEMI call locums guide with activation, backup, and Ohio example
- Reason: IC pay has 28 impr at #9.6 with 0 clicks; STEMI nights are the conversion topic
- Expected: Engaged sessions from STEMI/call queries into Ohio job and IC pay
- Actual: pending

## 2026-11-11 — `https://www.locumcareerhub.com/guides/cath-lab-only-locum-jobs`

- Type: `new-landing-page`
- Status: shipped
- Before: No dedicated cath-lab-only intent page
- After: Flagship guide distinguishing lab-only vs mixed IC weeks; CTA to KY featured job
- Reason: Live KY job is lab-only; hub clicks come from generic locums queries that need a unique next step
- Expected: Clicks and form_starts from cath-lab-only / no-clinic IC searches
- Actual: pending

## 2026-11-11 — `https://www.locumcareerhub.com/guides/imlc-for-interventional-cardiology-locums`

- Type: `new-landing-page`
- Status: shipped
- Before: No unique IC+IMLC guide
- After: Flagship guide: IMLC is a separate license pathway for IC locums, not a multistate STEMI card
- Reason: GSC 90d had 0 IMLC query impressions; compact licensing is the gating item for KY/OH IC locums
- Expected: Index this URL and send compact-eligible IC inquiries to KY/OH jobs and the IMLC calculator
- Actual: pending

## 2026-11-04 — `https://www.locumcareerhub.com/featured-cardiology-jobs/kansas-northeastern-inpatient-cardiology-locum`

- Type: `new-landing-page`
- Status: shipped
- Before: No dedicated NE Kansas inpatient 7-10 shift page
- After: Featured inpatient locum: 7-10 shifts/month, 12-hour hospital days, Epic, KS license not required, fly MCI, BE/BC
- Reason: New recruiting assignment needed an indexable unique URL distinct from the 7-on/7-off nuclear Kansas page and the NE Kansas full-time IC row
- Expected: Index the job URL; inquiries via the on-page lead form from Kansas/inpatient NIC searches
- Actual: pending

## 2026-10-15 — `https://www.locumcareerhub.com/cardiology-wordle`

- Type: `page`
- Status: shipped
- Before: none
- After: New indexable Cardiology Wordle at /cardiology-wordle, sitemap only
- Reason: Net-new query play for cardiology wordle; hidden from nav/footer/homepage/tools
- Expected: Organic impressions for cardiology wordle; shares back to the puzzle URL
- Actual: pending

## 2026-10-15 — `https://www.locumcareerhub.com/non-invasive-cardiology-locums-pay`

- Type: `new_page`
- Status: shipped
- Before: General cardiology pay href pointed at generic compensation guide
- After: Dedicated NIC Pay Arcade: TEE, nukes, call, inpatient/outpatient/both; share ticket; Request matches; Non-invasive jobs
- Reason: Give non-invasive cardiologists the same shareable pay game with imaging and setting questions that actually move NIC rates
- Expected: New NIC pay URL starts collecting impressions and match requests from TEE/nuclear/call mix
- Actual: pending

## 2026-10-15 — `https://www.locumcareerhub.com/ep-cardiology-locums-pay`

- Type: `content`
- Status: shipped
- Before: Generic EP compensation guide with formula theater
- After: EP Pay Arcade: ablation/devices/call/access rounds, shareable score ticket, Request EP matches, EP jobs
- Reason: Same arcade as IC so electrophysiologists can share specialty + pay expectation and convert to matches/jobs
- Expected: More EP pay engagement and generate_lead from arcade CTAs
- Actual: pending

## 2026-10-15 — `https://www.locumcareerhub.com/interventional-cardiology-locums-pay`

- Type: `content`
- Status: shipped
- Before: Static skill chips and range card
- After: Vintage 5-round pay arcade with specialty ticket and LinkedIn/Messages share
- Reason: Physicians bounced off a form-like range tool. Game + shareable score card should raise engagement and referral without retitling.
- Expected: More decision_tool_start/result and viral_share events; same SERP title.
- Actual: pending

## 2026-10-15 — `https://www.locumcareerhub.com/interventional-cardiology-locums-pay`

- Type: `content`
- Status: shipped
- Before: Generic CompensationGuide plus truncated hook and daily-divided-by-8 weekly math
- After: Skill-based range tool plus complete sentences. 3200-3500 is a starting band, not a posted salary. SERP title unchanged.
- Reason: Live page cut sentences and treated 3200-3500 as a formula. GSC last 28d: 12 impressions, 0 clicks, position 9.3. Title already shipped Sep 21.
- Expected: Longer engaged sessions and more form starts from IC pay visitors. No title change.
- Actual: pending

## 2026-10-13 — `https://www.locumcareerhub.com/featured-cardiology-jobs/baton-rouge-non-invasive-cardiology-locum`

- Type: `content`
- Status: shipped
- Before: Southeastern Louisiana non-invasive page: call plus inpatient call, no city name, slug louisiana-southeastern-non-invasive-cardiology-locum
- After: Baton Rouge part-time non-invasive locum: outpatient M-F or outpatient plus optional 24-hour weekend and night call, competitive pay, 301 from the old slug
- Reason: Priority job. GSC 90d showed 0 impressions on the old URL and no Baton Rouge URL. Physicians search the city plus part-time or locums.
- Expected: Impressions for Baton Rouge part-time and non-invasive locum queries, then inquiries that name the outpatient or optional-call structure
- Actual: pending

## 2026-10-12 — `https://www.locumcareerhub.com/`

- Type: `conversion`
- Status: shipped
- Before: generate_lead fired on form page and thank-you; honeypot returned ok without a stored lead
- After: generate_lead fires once and only when the API returns stored true
- Reason: Last 28 days: generate_lead 2 on / and 2 on /thank-you, lead_thank_you_view 4, key events 0. Business reports no new submissions.
- Expected: Next 28 days: generate_lead count matches rows in physician_leads. Mark generate_lead as a GA4 key event in Admin so landing reports stop showing 0.
- Actual: pending

## 2026-10-12 — `https://www.locumcareerhub.com/interventional-cardiology-locums-pay`

- Type: `content`
- Status: shipped
- Before: Daily band without a public-post comparison
- After: One paragraph: AMN posts near ,993/day are single openings, not the ,200-,500 band
- Reason: Title with ,200/Day already shipped Sep 21. 28d page is 12 impressions, 0 clicks, position 9.3, which is too small to retitle again.
- Expected: No title change. Next GSC pull should keep the ,200 title and show whether the snippet picks up the comparison.
- Actual: pending

## 2026-10-12 — `https://www.locumcareerhub.com/cardiologist-locums-pay-report`

- Type: `content`
- Status: shipped
- Before: Citeable daily bands only
- After: October 2026 public-post comparison: AMN day rates, Aya Canton and Kingsport, Locumstory hourly range, calculator CTA
- Reason: 28d: 23 impressions, 1 click, 4.3% CTR, position 10.3. Page already shares. Comparison gives physicians a reason to forward it.
- Expected: More calculator clicks and viral_share events from this URL. Do not judge by title CTR; title was left unchanged.
- Actual: pending

## 2026-10-12 — `https://www.locumcareerhub.com/salary/electrophysiologist-salary`

- Type: `title`
- Status: shipped
- Before: Electrophysiologist Salary | Locums vs Employed Pay
- After: Electrophysiologist Salary | ,800-,200/Day
- Reason: 90d GSC: 210 impressions, 0 clicks, position 20.9. Title had no rate. This is not the Sep 21 EP pay-page title test.
- Expected: First clicks from electrophysiologist salary queries. 28-day check: impressions still present and CTR above 0.
- Actual: pending

## 2026-10-12 — `https://www.locumcareerhub.com/locum-jobs/cardiology/cardiac-imaging`

- Type: `title`
- Status: shipped
- Before: Cardiac Imaging Locum Jobs | Attending Echo/CT
- After: Locum Cardiac Imaging Fellowship Jobs | Attendings
- Reason: 28d GSC: 259 impressions, 2 clicks, 0.77% CTR, position 8.3. 231 of those impressions are locum cardiac imaging fellowship jobs at position 8.6 with 0 clicks. The Sep 21 attending title did not earn a click.
- Expected: Snippet matches the query and states these are attending blocks. Success in 28 days is a click on that query or a form_start from this URL.
- Actual: pending

## 2026-09-29 — `https://www.locumcareerhub.com/physician-opportunities`

- Type: `new-landing-page`
- Status: shipped
- Before: 3 featured cardiology jobs with inline forms
- After: 50 unique cardiology job URLs (direct + VMS), posted dates, availability inquiry CTA, specialty-hub internal links
- Reason: Board open jobs needed indexable unique pages that convert; GA4 28d showed 32 organic sessions and 3 generate_lead events with almost no featured-job organic landings
- Expected: Index unique high-intent job URLs and route inquiries through the existing lead form
- Actual: pending

## 2026-09-29 — `https://www.locumcareerhub.com/featured-cardiology-jobs/north-carolina-outpatient-cardiology-locum`

- Type: `content`
- Status: shipped
- Before: Generic NC outpatient 2 weeks/month; posted 2026-09-09
- After: Western NC Monday-Friday clinic, posted 2026-08-11, availability CTA
- Reason: Board D3 matched the existing NC page; unique region and posted date for SEO and honesty
- Expected: Stronger query match for western NC outpatient locum without a duplicate URL
- Actual: pending

## 2026-09-21 — `https://www.locumcareerhub.com/locum-tenens-jobs/tennessee/electrophysiology`

- Type: `content`
- Status: shipped
- Before: Template specialty-state copy
- After: Tennessee EP unique copy; cluster links from EP hub, pay guide, and salary page
- Reason: TN EP already had 100% CTR on tiny volume plus 312s GA4 engagement; deepen instead of chasing new URLs.
- Expected: More qualified EP sessions on NY/TN pages and EP pay.
- Actual: pending

## 2026-09-21 — `https://www.locumcareerhub.com/locum-tenens-jobs/ohio/interventional-cardiology`

- Type: `content`
- Status: shipped
- Before: Template specialty-state copy
- After: Ohio IC unique copy plus featured 1-2 weeks/month job with written / callback
- Reason: Live IC opening should rank and convert from Ohio IC searches, not sit as an orphan featured URL.
- Expected: Clicks from Ohio IC queries into the featured job inquiry form.
- Actual: pending

## 2026-09-21 — `https://www.locumcareerhub.com/jobs`

- Type: `redirect`
- Status: shipped
- Before: No hub redirect for /jobs
- After: Permanent redirect /jobs -> /locum-tenens-jobs; /jobs/:state/:specialty already 301s
- Reason: GSC still listed duplicate /jobs/ NY EP URLs after path 301s.
- Expected: Duplicate /jobs URLs consolidate; crawl budget on canonical locum-tenens-jobs URLs.
- Actual: pending

## 2026-09-21 — `https://www.locumcareerhub.com/ep-cardiology-locums-pay`

- Type: `title`
- Status: shipped
- Before: EP Cardiology Locums Pay and Opportunity Guide
- After: EP Cardiology Locums Pay | ,800-,200/Day
- Reason: EP pay and NY/TN EP pages already convert relative to size; titles and internal links deepen the cluster.
- Expected: More clicks from EP pay queries into NY and TN EP locum pages.
- Actual: pending

## 2026-09-21 — `https://www.locumcareerhub.com/interventional-cardiology-locums-pay`

- Type: `title`
- Status: shipped
- Before: Interventional Cardiology Locums Pay and Rate Drivers
- After: Interventional Cardiology Locums Pay | ,200/Day
- Reason: Pay page had impressions at ~#10 with weak CTR; number in title plus Ohio featured job link.
- Expected: Higher CTR and more clicks through to the Ohio IC featured job.
- Actual: pending

## 2026-09-21 — `https://www.locumcareerhub.com/#get-matched`

- Type: `conversion`
- Status: shipped
- Before: Two-step inquiry; recaptcha and submit only on step 2; states/availability required.
- After: One-step Find my match; recaptcha on first screen; states/timeline optional; API accepts quick leads without states.
- Reason: GA4 showed ~70 form viewers / 5 starts / 0 generate_lead; step 2 was the bottleneck.
- Expected: More form_submit and generate_lead from the same organic sessions.
- Actual: pending

## 2026-09-21 — `https://www.locumcareerhub.com/locum-jobs/cardiology/cardiac-imaging`

- Type: `title`
- Status: shipped
- Before: Cardiac Imaging Locum Jobs | Echo, MRI & CT
- After: Cardiac Imaging Locum Jobs | Attending Echo/CT
- Reason: Page ranks ~#9 for locum cardiac imaging fellowship jobs with 0 clicks; SERP and on-page now disambiguate attending locums vs fellowship.
- Expected: CTR up from attending imagers; fewer wasted fellowship-intent impressions.
- Actual: pending

## 2026-09-21 — `https://www.locumcareerhub.com/`

- Type: `title`
- Status: shipped
- Before: Cardiologist Locum Jobs | General, IC & EP
- After: Cardiologist Locum Jobs | IC, EP & Recruiter
- Reason: Homepage CTR is 1.09% at ~#23; title now names recruiter match vs a generic job board.
- Expected: Higher homepage CTR from recruiter-intent queries without changing HOME_H1.
- Actual: pending

## 2026-09-11 — `https://www.locumcareerhub.com/moonlighting-physician-jobs`

- Type: `content`
- Status: shipped
- Before: Generic physician moonlighting landing
- After: Cardiologist-only moonlighting door with General, IC, and EP CTAs
- Reason: Convert high-impression moonlighting queries into qualified cardiology leads
- Expected: CTR lift and moonlighting-stage generate_lead events
- Actual: pending

## 2026-09-11 — `https://www.locumcareerhub.com/`

- Type: `conversion-funnel`
- Status: shipped
- Before: Generic physician inquiry form; homepage and life-stage landings mixed all-physician copy
- After: Career-stage plus specialty-fit screens on the inquiry form; cardiologist-only fellowship, moonlighting, locums-primary, and scale-down doors; persona cards on general, IC, and EP hubs
- Reason: Qualify general, interventional, and EP leads by life stage instead of adding thin nationwide job URLs
- Expected: Higher-quality cardiology inquiries segmented by specialty and career stage; better CTR on moonlighting, retired, and new-grad URLs
- Actual: pending

## 2026-09-09 — `https://www.locumcareerhub.com/featured-cardiology-jobs/`

- Type: `conversion-measurement`
- Status: ready-to-ship
- Before: First-touch attribution initialized only at forms; hero CTA and thank-you events lacked opportunity segmentation
- After: Sitewide first-touch attribution, tracked featured-job hero and mid-page CTAs, opportunity-specific GA4 thank-you parameters, and Meta Lead event
- Reason: Measure each featured opportunity from arrival through inquiry completion and preserve campaign attribution
- Expected: Reliable Kansas vs North Carolina funnel reporting and paid/organic lead attribution
- Actual: pending

## 2026-09-09 — `https://www.locumcareerhub.com/`

- Type: `lead-routing`
- Status: ready-to-ship
- Before: Mobile sticky inquiry CTA redirected many interior-page users to the homepage form; lead emails could be abandoned after the API response
- After: Mobile sticky CTA targets the current page form when present; lead emails complete before successful API response; thank-you content preserves featured job context
- Reason: Keep physicians in the job-specific journey and improve recruiter notification reliability
- Expected: Lower mobile funnel leakage and fewer missed recruiter notifications
- Actual: pending

## 2026-09-09 — `https://www.locumcareerhub.com/featured-cardiology-jobs/north-carolina-outpatient-cardiology-locum`

- Type: `conversion-funnel`
- Status: ready-to-ship
- Before: Generic two-step physician preference form with no opportunity-specific source or schedule data
- After: One-step four-field private inquiry with optional two-weeks-per-month and outpatient-fit screening; specific analytics attribution and recruiter notification
- Reason: Reduce abandonment and route qualified North Carolina outpatient cardiology leads with assignment context
- Expected: Higher featured-page form starts and qualified inquiry completion rate
- Actual: pending

## 2026-09-09 — `https://www.locumcareerhub.com/featured-cardiology-jobs/kansas-inpatient-non-invasive-cardiology-locum`

- Type: `conversion-funnel`
- Status: ready-to-ship
- Before: Generic two-step physician preference form with no opportunity-specific source or qualification data
- After: One-step four-field private inquiry with optional nuclear, PCF/HCSF, TEE, availability screening; specific analytics attribution and recruiter notification
- Reason: Reduce abandonment and route qualified Kansas cardiology leads with assignment context
- Expected: Higher featured-page form starts and qualified inquiry completion rate
- Actual: pending

## 2026-09-09 — `https://www.locumcareerhub.com/featured-cardiology-jobs/north-carolina-outpatient-cardiology-locum`

- Type: `new-landing-page`
- Status: ready-to-ship
- Before: No dedicated page
- After: Outpatient 2-weeks-per-month cardiology opportunity page with part-time, semi-retired, portfolio-career, travel, FAQs, and JobPosting schema
- Reason: Capture high-intent North Carolina outpatient, part-time cardiology, recurring locum, and semi-retirement searches
- Expected: Qualified inquiries from board-certified outpatient cardiologists seeking recurring blocks
- Actual: pending

## 2026-09-09 — `https://www.locumcareerhub.com/featured-cardiology-jobs/kansas-inpatient-non-invasive-cardiology-locum`

- Type: `new-landing-page`
- Status: ready-to-ship
- Before: No dedicated page
- After: Inpatient 7-on/7-off cardiology opportunity page with nuclear, TEE, call, licensing, PCF eligibility, travel benefits, candidate niches, FAQs, and JobPosting schema
- Reason: Capture high-intent Kansas inpatient, nuclear cardiology, block-schedule, and license-assistance searches
- Expected: Qualified inquiries from board-certified non-invasive cardiologists eligible for the assignment
- Actual: pending

## 2026-08-03 — `https://www.locumcareerhub.com/tools/locum-salary-estimator`

- Type: `canonical`
- Status: measuring
- Before: canonical=/cardiologist-locums-calculator
- After: canonical=/tools/locum-salary-estimator + distinct title
- Reason: Wrong canonical diluted page signals
- Expected: Correct indexing + clearer SERP
- Actual: pending

## 2026-08-03 — `https://www.locumcareerhub.com/tools`

- Type: `title`
- Status: measuring
- Before: Cardiologist Calculators | Pay, IMLC, Call & Offers
- After: Free Cardiologist Locum Calculators | Pay & IMLC
- Reason: 529 imps / 90d at 0.19% CTR
- Expected: CTR lift on tools index
- Actual: pending

## 2026-08-03 — `https://www.locumcareerhub.com/locum-jobs/cardiology/cardiac-imaging`

- Type: `title`
- Status: measuring
- Before: Advanced Cardiac Imaging Locum Jobs
- After: Cardiac Imaging Locum Jobs | Echo, MRI & CT
- Reason: Mid-pack pos 11.5 with 65 imps
- Expected: CTR and position improve toward top 10
- Actual: pending

## 2026-08-03 — `https://www.locumcareerhub.com/locum-tenens-jobs/new-york/electrophysiology`

- Type: `content`
- Status: measuring
- Before: Generic Mad Libs specialty-state template
- After: NY-specific EP sections, FAQs, SERP title, hub links
- Reason: Recover 7→0 click loss; was #1 URL over 90d
- Expected: Impressions/clicks return within 14 days
- Actual: pending

## 2026-08-03 — `https://www.locumcareerhub.com/`

- Type: `title`
- Status: measuring
- Before: Cardiologist Locum Jobs & Career Tools (2026)
- After: Cardiologist Locum Jobs | Recruiter + Pay Tools
- Reason: Homepage mid-pack low CTR (125 imps @ pos 18)
- Expected: Higher CTR within 14 days
- Actual: pending
