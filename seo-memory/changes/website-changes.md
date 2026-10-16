# Website SEO Changes Log

Auto-exported from `seo_memory.db`. Do not put secrets here.

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
