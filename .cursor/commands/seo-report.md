Generate the SEO weekly report and save it under seo-memory/reports/weekly-reports/.

## Steps

1. Pull live GSC: `compare_periods` (both), `seo_audit_report`, top wins/losses from the comparison payload.
2. Load `.\seo-memory\run.ps1 context`.
3. Build a live summary JSON (clicks, impressions, ctr, wins[], losses[], opportunities[], threats[]) and save temporarily if helpful.
4. Run `.\seo-memory\run.ps1 report` (pass `--live-json` when you wrote a summary file).
5. Present Executive Summary, Wins, Losses, and Recommended Actions (P1/P2/P3) in chat, and link the saved markdown report path.
