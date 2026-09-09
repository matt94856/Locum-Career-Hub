---
name: seo-impact
description: Measure whether prior SEO changes worked using seo-memory history plus live GSC page performance.
disable-model-invocation: true
---

Analyze whether previous SEO changes worked.

1. Resolve target URLs from the user or recent `website_changes`.
2. Run `.\seo-memory\run.ps1 impact --url <full-url>` per URL.
3. Pull live `get_page_performance` from GSC MCP.
4. Declare winner / loser / inconclusive and update memory when conclusive.
