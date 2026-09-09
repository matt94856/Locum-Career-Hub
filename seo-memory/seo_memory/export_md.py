from __future__ import annotations

from datetime import date
from pathlib import Path
from typing import Any

from .db import ROOT, connect, list_audits, list_changes, list_experiments, list_recommendations

AUDITS_DIR = ROOT / "audits"
CHANGES_MD = ROOT / "changes" / "website-changes.md"
EXPERIMENTS_MD = ROOT / "experiments" / "experiments.md"
REPORTS_DIR = ROOT / "reports" / "weekly-reports"


def ensure_dirs() -> None:
    AUDITS_DIR.mkdir(parents=True, exist_ok=True)
    CHANGES_MD.parent.mkdir(parents=True, exist_ok=True)
    EXPERIMENTS_MD.parent.mkdir(parents=True, exist_ok=True)
    REPORTS_DIR.mkdir(parents=True, exist_ok=True)


def export_audit_markdown(audit: dict[str, Any], path: Path | None = None) -> Path:
    ensure_dirs()
    d = audit.get("date") or date.today().isoformat()
    out = path or (AUDITS_DIR / f"{d}-audit.md")
    problems = audit.get("problems_found") or []
    recs = audit.get("recommendations") or []
    completed = audit.get("completed_actions") or []

    lines = [
        f"# SEO Audit — {d}",
        "",
        f"- Priority: **{audit.get('priority_level', 'medium')}**",
        f"- Expected traffic impact: {audit.get('expected_traffic_impact') or 'n/a'}",
        f"- Period: {audit.get('period_start') or '?'} → {audit.get('period_end') or '?'}",
        f"- Pages analyzed: {audit.get('pages_analyzed') or 0}",
        f"- Clicks: {audit.get('traffic_clicks')} ({audit.get('clicks_pct_change')}%)",
        f"- Impressions: {audit.get('traffic_impressions')} ({audit.get('impressions_pct_change')}%)",
        f"- CTR: {audit.get('traffic_ctr')} · Avg position: {audit.get('traffic_position')}",
        "",
        "## Summary",
        "",
        audit.get("summary") or "_No summary._",
        "",
        "## Problems found",
        "",
    ]
    if not problems:
        lines.append("- None recorded")
    else:
        for p in problems:
            if isinstance(p, dict):
                lines.append(
                    f"- **{p.get('issue') or p.get('type') or 'Issue'}**"
                    + (f" — {p.get('target') or p.get('url') or ''}" if (p.get('target') or p.get('url')) else "")
                    + (f" · {p.get('why') or p.get('detail') or ''}" if (p.get('why') or p.get('detail')) else "")
                )
            else:
                lines.append(f"- {p}")

    lines += ["", "## Recommendations", ""]
    if not recs:
        lines.append("- None recorded")
    else:
        for r in recs:
            if isinstance(r, dict):
                lines.append(
                    f"- [{r.get('priority', 'medium')}] {r.get('recommendation') or r.get('type') or r}"
                    + (f" → `{r.get('target') or r.get('url') or ''}`" if (r.get('target') or r.get('url')) else "")
                )
            else:
                lines.append(f"- {r}")

    lines += ["", "## Completed actions", ""]
    if not completed:
        lines.append("- None yet")
    else:
        for c in completed:
            lines.append(f"- {c}")

    out.write_text("\n".join(lines) + "\n", encoding="utf-8")
    return out


def rebuild_changes_markdown(conn=None) -> Path:
    ensure_dirs()
    own = conn is None
    if own:
        conn = connect()
    try:
        rows = list_changes(conn, limit=500)
        lines = [
            "# Website SEO Changes Log",
            "",
            "Auto-exported from `seo_memory.db`. Do not put secrets here.",
            "",
        ]
        if not rows:
            lines.append("_No changes logged yet._")
        else:
            for r in rows:
                lines += [
                    f"## {r.get('date')} — `{r.get('url')}`",
                    "",
                    f"- Type: `{r.get('change_type')}`",
                    f"- Status: {r.get('status')}",
                    f"- Before: {r.get('before_value') or '—'}",
                    f"- After: {r.get('after_value') or '—'}",
                    f"- Reason: {r.get('reason') or '—'}",
                    f"- Expected: {r.get('expected_result') or '—'}",
                    f"- Actual: {r.get('actual_result') or 'pending'}",
                    "",
                ]
        CHANGES_MD.write_text("\n".join(lines), encoding="utf-8")
        return CHANGES_MD
    finally:
        if own:
            conn.close()


def rebuild_experiments_markdown(conn=None) -> Path:
    ensure_dirs()
    own = conn is None
    if own:
        conn = connect()
    try:
        rows = list_experiments(conn, limit=200)
        lines = [
            "# SEO Experiments",
            "",
            "Auto-exported from `seo_memory.db`.",
            "",
        ]
        if not rows:
            lines.append("_No experiments logged yet._")
        else:
            for r in rows:
                lines += [
                    f"## {r.get('start_date')} — {r.get('page_changed')}",
                    "",
                    f"- Hypothesis: {r.get('hypothesis')}",
                    f"- Change: {r.get('change_made')}",
                    f"- End: {r.get('end_date') or 'open'}",
                    f"- Outcome: **{r.get('outcome')}**",
                    f"- Result: {r.get('result') or '—'}",
                    "",
                ]
        EXPERIMENTS_MD.write_text("\n".join(lines), encoding="utf-8")
        return EXPERIMENTS_MD
    finally:
        if own:
            conn.close()


def write_weekly_report(markdown: str, report_date: str | None = None) -> Path:
    ensure_dirs()
    d = report_date or date.today().isoformat()
    path = REPORTS_DIR / f"{d}-weekly-seo-report.md"
    path.write_text(markdown, encoding="utf-8")
    return path


def sync_all_markdown(conn=None) -> dict[str, Any]:
    own = conn is None
    if own:
        conn = connect()
    try:
        audits = list_audits(conn, limit=5)
        audit_paths = []
        for a in audits:
            audit_paths.append(str(export_audit_markdown(a)))
        return {
            "audits": audit_paths,
            "changes": str(rebuild_changes_markdown(conn)),
            "experiments": str(rebuild_experiments_markdown(conn)),
            "open_recommendations": list_recommendations(conn, status="New", limit=20),
        }
    finally:
        if own:
            conn.close()
