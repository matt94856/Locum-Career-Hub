---
name: seo-report
description: Generate and save the weekly SEO report using live GSC and seo-memory history.
disable-model-invocation: true
---

Generate the SEO weekly report.

1. Pull live GSC compare + audit data.
2. Load `.\seo-memory\run.ps1 context`.
3. Run `.\seo-memory\run.ps1 report` (with `--live-json` if you prepared a summary file).
4. Present Executive Summary, Wins, Losses, Recommended Actions, and the saved report path under `seo-memory/reports/weekly-reports/`.
