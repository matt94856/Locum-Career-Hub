# Website SEO Changes Log

Auto-exported from `seo_memory.db`. Do not put secrets here.

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
