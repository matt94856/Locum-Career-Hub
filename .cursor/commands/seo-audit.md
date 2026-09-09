Run a complete SEO audit and store results in SEO memory.

## Steps

1. Call GSC MCP `auth_status`, then `seo_audit_report`, `compare_periods` (kind=both), and `get_top_opportunities`.
2. Call GA4 MCP `auth_status`, `get_organic_search_performance`, `get_conversion_data`, and `compare_periods` (when connected).
3. Run `.\seo-memory\run.ps1 context` and summarize what changed since the last audit.
4. Produce prioritized findings (P0–P2) using **GSC + GA4 business impact** (not rankings alone).
5. Write an ingest JSON under `seo-memory/seed/YYYY-MM-DD-audit.json` (no secrets).
6. Run `.\seo-memory\run.ps1 ingest-audit --file <that-file>`.
7. If the user wants code fixes, implement high-priority items and `log-change` each ship.
8. End with a 7–14 day recheck plan (`compare_periods`, page performance, `/seo-impact`).
