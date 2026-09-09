Analyze whether previous SEO changes worked.

## Steps

1. Identify target URL(s) from the user, or default to recent `website_changes` via `.\seo-memory\run.ps1 history --limit 30`.
2. For each important URL run `.\seo-memory\run.ps1 impact --url <full-url>`.
3. Pull live `get_page_performance` from GSC MCP for the same URLs (last 28d).
4. Compare pre/post snapshots and changes log. State winner / loser / inconclusive (need more data).
5. Update experiment or change `actual_result` when conclusive; suggest next test if inconclusive.
