---
name: seo-opportunities
description: Find highest-ROI SEO opportunities from live GSC plus open seo-memory recommendations.
disable-model-invocation: true
---

Find highest-ROI SEO opportunities.

1. `.\seo-memory\run.ps1 context`
2. Live GSC: `seo_audit_report`, `get_top_opportunities`, `compare_periods`
3. Live GA4: `get_organic_search_performance`, `get_conversion_data`, `seo_business_impact_report` (pass GSC pages JSON when possible)
4. Rank by conversions/leads → traffic → ranking → ease; skip completed recs and failed experiment patterns
5. Output P0/P1/P2 with URLs and evidence (impressions, CTR, sessions, conversions)
6. Optionally `log-rec` new items into memory
