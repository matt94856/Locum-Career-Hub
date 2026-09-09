from __future__ import annotations

import argparse
import json
import sys
from datetime import date
from pathlib import Path
from typing import Any

from . import db
from .export_md import export_audit_markdown, sync_all_markdown
from .report import generate_and_save_weekly_report


def _print(data: Any) -> None:
    payload = json.dumps(data, indent=2, ensure_ascii=False, default=str)
    try:
        sys.stdout.reconfigure(encoding="utf-8")  # type: ignore[attr-defined]
    except Exception:
        pass
    sys.stdout.buffer.write((payload + "\n").encode("utf-8", errors="replace"))
    sys.stdout.buffer.flush()


def cmd_init(_: argparse.Namespace) -> int:
    path = db.init_db()
    sync_all_markdown()
    _print({"ok": True, "database": str(path)})
    return 0


def cmd_context(_: argparse.Namespace) -> int:
    with db.connect() as conn:
        _print(db.memory_context(conn))
    return 0


def cmd_history(args: argparse.Namespace) -> int:
    with db.connect() as conn:
        payload = {
            "audits": db.list_audits(conn, limit=args.limit),
            "changes": db.list_changes(conn, url=args.url, limit=args.limit),
            "recommendations": db.list_recommendations(conn, status=args.status, limit=args.limit),
            "experiments": db.list_experiments(conn, limit=args.limit),
        }
        if args.keyword:
            payload["keyword_history"] = db.keyword_history(conn, args.keyword, limit=args.limit)
        if args.url:
            payload["page_history"] = db.page_history(conn, args.url, limit=args.limit)
        _print(payload)
    return 0


def cmd_impact(args: argparse.Namespace) -> int:
    with db.connect() as conn:
        _print(db.impact_for_url(conn, args.url))
    return 0


def cmd_log_change(args: argparse.Namespace) -> int:
    with db.connect() as conn:
        change_id = db.insert_change(
            conn,
            date=args.date or date.today().isoformat(),
            url=args.url,
            change_type=args.type,
            before_value=args.before,
            after_value=args.after,
            reason=args.reason,
            expected_result=args.expected,
            status=args.status,
        )
        sync_all_markdown(conn)
    _print({"ok": True, "change_id": change_id})
    return 0


def cmd_log_rec(args: argparse.Namespace) -> int:
    with db.connect() as conn:
        rec_id = db.insert_recommendation(
            conn,
            recommendation=args.text,
            date_created=args.date or date.today().isoformat(),
            priority=args.priority,
            status=args.status,
            target_url=args.url,
            expected_impact=args.impact,
        )
    _print({"ok": True, "recommendation_id": rec_id})
    return 0


def cmd_set_rec_status(args: argparse.Namespace) -> int:
    with db.connect() as conn:
        db.update_recommendation_status(
            conn,
            args.id,
            status=args.status,
            completed_date=args.completed_date,
            outcome=args.outcome,
        )
    _print({"ok": True, "id": args.id, "status": args.status})
    return 0


def cmd_log_experiment(args: argparse.Namespace) -> int:
    with db.connect() as conn:
        exp_id = db.insert_experiment(
            conn,
            hypothesis=args.hypothesis,
            page_changed=args.page,
            change_made=args.change,
            start_date=args.start or date.today().isoformat(),
            end_date=args.end,
            result=args.result,
            outcome=args.outcome,
        )
        sync_all_markdown(conn)
    _print({"ok": True, "experiment_id": exp_id})
    return 0


def cmd_ingest_audit(args: argparse.Namespace) -> int:
    raw = json.loads(Path(args.file).read_text(encoding="utf-8"))
    with db.connect() as conn:
        audit_id = db.insert_audit(
            conn,
            date=raw.get("date") or date.today().isoformat(),
            period_start=raw.get("period_start"),
            period_end=raw.get("period_end"),
            pages_analyzed=int(raw.get("pages_analyzed") or 0),
            problems_found=raw.get("problems_found") or [],
            recommendations=raw.get("recommendations") or [],
            priority_level=raw.get("priority_level") or "medium",
            expected_traffic_impact=raw.get("expected_traffic_impact"),
            completed_actions=raw.get("completed_actions") or [],
            traffic_clicks=raw.get("traffic_clicks"),
            traffic_impressions=raw.get("traffic_impressions"),
            traffic_ctr=raw.get("traffic_ctr"),
            traffic_position=raw.get("traffic_position"),
            clicks_pct_change=raw.get("clicks_pct_change"),
            impressions_pct_change=raw.get("impressions_pct_change"),
            summary=raw.get("summary"),
            raw_json=raw.get("raw_json") or raw,
            source=raw.get("source") or "gsc-mcp",
        )
        for rec in raw.get("recommendation_rows") or []:
            db.insert_recommendation(
                conn,
                recommendation=rec["recommendation"],
                date_created=raw.get("date") or date.today().isoformat(),
                priority=rec.get("priority") or "medium",
                status=rec.get("status") or "New",
                target_url=rec.get("target_url"),
                expected_impact=rec.get("expected_impact"),
                audit_id=audit_id,
                completed_date=rec.get("completed_date"),
                outcome=rec.get("outcome"),
            )
        for page in raw.get("pages") or []:
            db.upsert_page_performance(
                conn,
                url=page["url"],
                date=raw.get("date") or date.today().isoformat(),
                period_start=raw.get("period_start"),
                period_end=raw.get("period_end"),
                clicks=float(page.get("clicks") or 0),
                impressions=float(page.get("impressions") or 0),
                ctr=float(page.get("ctr") or 0),
                average_position=page.get("average_position"),
                notes=page.get("notes"),
            )
        for kw in raw.get("keywords") or []:
            db.upsert_keyword_ranking(
                conn,
                keyword=kw["keyword"],
                url=kw.get("url"),
                date=raw.get("date") or date.today().isoformat(),
                period_start=raw.get("period_start"),
                period_end=raw.get("period_end"),
                clicks=float(kw.get("clicks") or 0),
                impressions=float(kw.get("impressions") or 0),
                ctr=float(kw.get("ctr") or 0),
                average_position=kw.get("average_position"),
            )
        audits = db.list_audits(conn, limit=1)
        if audits:
            export_audit_markdown(audits[0])
        sync_all_markdown(conn)
    _print({"ok": True, "audit_id": audit_id})
    return 0


def cmd_report(args: argparse.Namespace) -> int:
    live = None
    if args.live_json:
        live = json.loads(Path(args.live_json).read_text(encoding="utf-8"))
    path = generate_and_save_weekly_report(live)
    _print({"ok": True, "report": path})
    return 0


def cmd_export(_: argparse.Namespace) -> int:
    _print(sync_all_markdown())
    return 0


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(prog="seo-memory", description="Persistent SEO memory for Locum Career Hub")
    sub = p.add_subparsers(dest="command", required=True)

    s = sub.add_parser("init", help="Create SQLite DB + folders")
    s.set_defaults(func=cmd_init)

    s = sub.add_parser("context", help="Print agent memory context JSON")
    s.set_defaults(func=cmd_context)

    s = sub.add_parser("history", help="Show audits/changes/recs/experiments")
    s.add_argument("--url")
    s.add_argument("--keyword")
    s.add_argument("--status")
    s.add_argument("--limit", type=int, default=30)
    s.set_defaults(func=cmd_history)

    s = sub.add_parser("impact", help="Compare change history vs page metrics for a URL")
    s.add_argument("--url", required=True)
    s.set_defaults(func=cmd_impact)

    s = sub.add_parser("log-change", help="Log an SEO website change")
    s.add_argument("--url", required=True)
    s.add_argument("--type", required=True)
    s.add_argument("--before")
    s.add_argument("--after")
    s.add_argument("--reason")
    s.add_argument("--expected")
    s.add_argument("--date")
    s.add_argument("--status", default="shipped")
    s.set_defaults(func=cmd_log_change)

    s = sub.add_parser("log-rec", help="Log a recommendation")
    s.add_argument("--text", required=True)
    s.add_argument("--priority", default="medium")
    s.add_argument("--status", default="New")
    s.add_argument("--url")
    s.add_argument("--impact")
    s.add_argument("--date")
    s.set_defaults(func=cmd_log_rec)

    s = sub.add_parser("set-rec-status", help="Update recommendation status")
    s.add_argument("--id", type=int, required=True)
    s.add_argument("--status", required=True)
    s.add_argument("--completed-date")
    s.add_argument("--outcome")
    s.set_defaults(func=cmd_set_rec_status)

    s = sub.add_parser("log-experiment", help="Log an SEO experiment")
    s.add_argument("--hypothesis", required=True)
    s.add_argument("--page", required=True)
    s.add_argument("--change", required=True)
    s.add_argument("--start")
    s.add_argument("--end")
    s.add_argument("--result")
    s.add_argument("--outcome", default="running")
    s.set_defaults(func=cmd_log_experiment)

    s = sub.add_parser("ingest-audit", help="Ingest audit JSON file into memory")
    s.add_argument("--file", required=True)
    s.set_defaults(func=cmd_ingest_audit)

    s = sub.add_parser("report", help="Generate weekly SEO report markdown")
    s.add_argument("--live-json", help="Optional live GSC/GA summary JSON")
    s.set_defaults(func=cmd_report)

    s = sub.add_parser("export-md", help="Re-export markdown mirrors from SQLite")
    s.set_defaults(func=cmd_export)

    return p


def main(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    return int(args.func(args))


if __name__ == "__main__":
    raise SystemExit(main())
