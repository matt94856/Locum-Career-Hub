Find the highest-ROI SEO opportunities right now.

## Steps

1. Load memory: `.\seo-memory\run.ps1 context` (skip or deprioritize items already Completed; avoid failed experiment patterns).
2. Pull live GSC: `seo_audit_report`, `get_top_opportunities`, `compare_periods`.
3. Pull live GA4: `get_organic_search_performance`, `get_conversion_data`, then `seo_business_impact_report` with GSC page JSON when possible.
4. Rank opportunities by: conversions/lead impact → traffic impact → ranking opportunity → ease.
5. Output a short P0/P1/P2 list with target URL, why (impressions + CTR + sessions + conversions), expected impact, and whether memory shows a prior attempt.
6. Optionally log new recs: `.\seo-memory\run.ps1 log-rec --text "..." --priority p0 --url "..." --impact high`.
