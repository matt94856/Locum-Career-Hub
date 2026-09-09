# SEO Memory System

Persistent local memory for the Locum Career Hub SEO agent. Stores audits, website changes, ranking/page snapshots, experiments, and recommendations so Cursor can recommend from history—not just the latest GSC pull.

```
Cursor Agent
├── Website codebase
├── Google Search Console MCP (user-gsc-seo) ✅
├── Google Analytics 4 MCP (user-ga4-analytics) ✅ when connected
├── SEO rules (.cursor/rules)
└── SEO Knowledge Base (this folder)
    ├── Past SEO audits
    ├── Website changes log
    ├── Ranking + page performance history
    ├── SEO experiments
    └── Recommendations archive
```

Agent workflow: GSC rankings/CTR + GA4 sessions/conversions + this memory. Never optimize on rank alone.

## Layout

```
seo-memory/
├── database/seo_memory.db   # SQLite (gitignored)
├── schema.sql
├── seo_memory/              # Python CLI package (stdlib only)
├── audits/                  # Markdown mirrors of audits
├── changes/website-changes.md
├── experiments/experiments.md
├── reports/weekly-reports/
├── seed/                    # One-time / bootstrap JSON
└── README.md
```

## Security

- **Never** store Google OAuth tokens, `credentials.json`, or `token.json` here.
- GSC/GA credentials stay in `mcp-gsc/credentials/` (gitignored).
- `seo_memory.db` is gitignored; Markdown exports are safe to commit if they contain no secrets.
- Backup: copy `database/seo_memory.db` + `audits/` + `reports/` to encrypted storage weekly.

## Quick start

```powershell
cd "C:\Users\matt9\Desktop\MPLT Health"
python -m seo_memory init
python -m seo_memory ingest-audit --file seo-memory\seed\2026-08-03-baseline-audit.json
python -m seo_memory context
python -m seo_memory report
```

Run from repo root with `PYTHONPATH=seo-memory` **or** use the helper script:

```powershell
.\seo-memory\run.ps1 context
.\seo-memory\run.ps1 history --url /locum-tenens-jobs/new-york/electrophysiology
.\seo-memory\run.ps1 impact --url https://www.locumcareerhub.com/
.\seo-memory\run.ps1 report
```

## Agent workflow (required)

Before SEO recommendations the agent must:

1. Pull live GSC via MCP (`seo_audit_report`, `compare_periods`, …).
2. Load memory: `.\seo-memory\run.ps1 context`.
3. Compare live vs memory (changes since last audit, open recs, failed experiments).
4. Recommend with historical framing.
5. After shipping code: `log-change` + update recommendation status.
6. After audits: write ingest JSON and `ingest-audit`.

GA4: use `user-ga4-analytics` MCP for sessions/conversions in weekly reports and `actual_result` fields. Combine with GSC — never prioritize on rankings alone.

## Cursor commands / skills

| Invoke | Purpose |
|---|---|
| `/seo-audit` | Full live audit + store in memory |
| `/seo-history` | Show historical changes / audits |
| `/seo-impact` | Did prior changes work? |
| `/seo-opportunities` | Highest ROI open opportunities |
| `/seo-report` | Weekly SEO report |

## Tables

| Table | Purpose |
|---|---|
| `seo_audits` | Audit history |
| `website_changes` | SEO change log |
| `keyword_rankings` | Keyword snapshots |
| `page_performance` | Page snapshots |
| `seo_experiments` | Hypotheses + outcomes |
| `seo_recommendations` | Rec archive (New / In Progress / Completed / Rejected) |
