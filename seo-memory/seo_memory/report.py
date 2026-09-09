from __future__ import annotations

from datetime import date
from typing import Any

from .db import connect, list_audits, list_changes, list_experiments, list_recommendations, page_history
from .export_md import write_weekly_report


def build_weekly_report_markdown(
    *,
    live_summary: dict[str, Any] | None = None,
    report_date: str | None = None,
) -> str:
    """Compose a weekly report from memory (+ optional live GSC/GA summary passed by the agent)."""
    d = report_date or date.today().isoformat()
    live = live_summary or {}

    with connect() as conn:
        audits = list_audits(conn, limit=2)
        changes = list_changes(conn, limit=15)
        experiments = list_experiments(conn, limit=10)
        open_recs = list_recommendations(conn, status="New", limit=20)
        in_progress = list_recommendations(conn, status="In Progress", limit=20)
        latest = audits[0] if audits else None

    clicks = live.get("clicks", latest.get("traffic_clicks") if latest else None)
    impressions = live.get("impressions", latest.get("traffic_impressions") if latest else None)
    ctr = live.get("ctr", latest.get("traffic_ctr") if latest else None)
    clicks_pct = live.get("clicks_pct_change", latest.get("clicks_pct_change") if latest else None)
    imps_pct = live.get(
        "impressions_pct_change",
        latest.get("impressions_pct_change") if latest else None,
    )

    wins = live.get("wins") or []
    losses = live.get("losses") or []
    opportunities = live.get("opportunities") or open_recs[:8]

    lines = [
        f"# Weekly SEO Report — {d}",
        "",
        "Property: `sc-domain:locumcareerhub.com`",
        "",
        "## Executive Summary",
        "",
        f"- Organic clicks (latest window): **{clicks}** ({clicks_pct}% vs prior)",
        f"- Impressions: **{impressions}** ({imps_pct}% vs prior)",
        f"- CTR: **{ctr}%**",
        f"- Open recommendations: {len(open_recs)} new · {len(in_progress)} in progress",
        f"- Experiments tracked: {len(experiments)}",
        "",
    ]

    if latest and latest.get("summary"):
        lines += ["### Memory note from last audit", "", latest["summary"], ""]

    threats = live.get("threats") or []
    if not threats and latest:
        threats = [
            p.get("issue") or p.get("why") or str(p)
            for p in (latest.get("problems_found") or [])[:5]
            if isinstance(p, dict) or p
        ]

    lines += [
        "### Biggest opportunities",
        "",
    ]
    if opportunities:
        for o in opportunities[:6]:
            if isinstance(o, dict):
                lines.append(
                    f"- [{o.get('priority', '—')}] {o.get('recommendation') or o.get('issue') or o}"
                    + (f" (`{o.get('target_url') or o.get('target') or ''}`)" if (o.get('target_url') or o.get('target')) else "")
                )
            else:
                lines.append(f"- {o}")
    else:
        lines.append("- _Pull live GSC opportunities via MCP, then re-run._")

    lines += ["", "### Biggest threats", ""]
    if threats:
        for t in threats[:6]:
            lines.append(f"- {t}")
    else:
        lines.append("- None flagged in memory.")

    lines += ["", "## Wins", ""]
    if wins:
        for w in wins:
            if isinstance(w, dict):
                lines.append(
                    f"- `{w.get('url')}` — clicks {w.get('clicks_delta', w.get('clicks'))}, "
                    f"keywords: {w.get('keywords') or '—'}"
                )
            else:
                lines.append(f"- {w}")
    else:
        lines.append("- Compare `compare_periods` winners and paste here / pass as live_summary.wins.")

    lines += ["", "## Losses", ""]
    if losses:
        for w in losses:
            if isinstance(w, dict):
                lines.append(
                    f"- `{w.get('url')}` — clicks {w.get('clicks_delta', w.get('clicks'))}; "
                    f"possible cause: {w.get('cause') or 'see recent website_changes'}"
                )
            else:
                lines.append(f"- {w}")
    else:
        # Fall back: pages with recent shipped title changes still measuring
        measuring = [c for c in changes if c.get("status") in {"shipped", "measuring"}][:5]
        if measuring:
            lines.append("Recent shipped changes still measuring:")
            for c in measuring:
                lines.append(f"- `{c.get('url')}` ({c.get('change_type')}) on {c.get('date')}")
        else:
            lines.append("- No losses recorded in memory for this window.")

    lines += [
        "",
        "## Recommended Actions",
        "",
        "### Priority 1 — High impact / easy fixes",
        "",
    ]
    p1 = [r for r in open_recs if str(r.get("priority", "")).lower() in {"p0", "p1", "critical", "high"}]
    p2 = [r for r in open_recs if str(r.get("priority", "")).lower() in {"p2", "medium"}]
    p3 = [r for r in open_recs if str(r.get("priority", "")).lower() in {"p3", "low"}]
    if not p1 and not p2 and not p3:
        p1 = open_recs[:5]
    for bucket, title in ((p1, None),):
        _ = title
        for r in (p1 or [])[:6]:
            lines.append(f"- {r.get('recommendation')} (`{r.get('target_url') or 'site'}`)")
    if not p1:
        lines.append("- _None open at P1._")

    lines += ["", "### Priority 2 — Medium impact", ""]
    for r in (p2 or [])[:6]:
        lines.append(f"- {r.get('recommendation')} (`{r.get('target_url') or 'site'}`)")
    if not p2:
        lines.append("- _None open at P2._")

    lines += ["", "### Priority 3 — Long-term", ""]
    for r in (p3 or [])[:6]:
        lines.append(f"- {r.get('recommendation')} (`{r.get('target_url') or 'site'}`)")
    if not p3:
        lines.append("- _None open at P3._")

    lines += [
        "",
        "## Recent website changes (memory)",
        "",
    ]
    for c in changes[:10]:
        lines.append(
            f"- {c.get('date')} · `{c.get('url')}` · {c.get('change_type')} · expected: {c.get('expected_result') or '—'}"
        )

    lines += [
        "",
        "## Experiments",
        "",
    ]
    if experiments:
        for e in experiments[:8]:
            lines.append(
                f"- [{e.get('outcome')}] {e.get('hypothesis')} — `{e.get('page_changed')}`"
            )
    else:
        lines.append("- No experiments logged.")

    lines += [
        "",
        "---",
        "",
        "_Generated by `seo-memory`. Live GSC/GA numbers must be refreshed via MCP when available._",
        "",
    ]
    return "\n".join(lines)


def generate_and_save_weekly_report(live_summary: dict[str, Any] | None = None) -> str:
    md = build_weekly_report_markdown(live_summary=live_summary)
    path = write_weekly_report(md)
    return str(path)
