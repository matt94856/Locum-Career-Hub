---
name: seo-audit
description: Run a full live GSC SEO audit, compare to SEO memory, and ingest results into seo-memory.
disable-model-invocation: true
---

Run a complete SEO audit and store results in SEO memory.

1. Call GSC MCP `auth_status`, `seo_audit_report`, `compare_periods` (kind=both), `get_top_opportunities`.
2. Call GA4 MCP `auth_status`, `get_organic_search_performance`, `get_conversion_data`, `compare_periods` (when connected).
3. Run `.\seo-memory\run.ps1 context` and summarize changes since the last audit.
4. Produce prioritized findings (P0–P2) using GSC + GA4 business impact (not rankings alone).
5. Write ingest JSON under `seo-memory/seed/YYYY-MM-DD-audit.json` (no secrets).
6. Run `.\seo-memory\run.ps1 ingest-audit --file <that-file>`.
7. If implementing fixes, `log-change` each ship and update recommendation statuses.
8. End with a 7–14 day recheck plan.
