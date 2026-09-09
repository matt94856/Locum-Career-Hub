from __future__ import annotations

import json
import sqlite3
from pathlib import Path
from typing import Any, Iterable, Optional

ROOT = Path(__file__).resolve().parents[1]
DB_PATH = ROOT / "database" / "seo_memory.db"
SCHEMA_PATH = ROOT / "schema.sql"


def connect(db_path: Path | None = None) -> sqlite3.Connection:
    path = db_path or DB_PATH
    path.parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(str(path))
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    return conn


def init_db(db_path: Path | None = None) -> Path:
    path = db_path or DB_PATH
    schema = SCHEMA_PATH.read_text(encoding="utf-8")
    with connect(path) as conn:
        conn.executescript(schema)
        conn.execute(
            "INSERT INTO memory_meta(key, value, updated_at) VALUES(?, ?, datetime('now')) "
            "ON CONFLICT(key) DO UPDATE SET value=excluded.value, updated_at=datetime('now')",
            ("schema_version", "1"),
        )
        conn.commit()
    return path


def _json_dumps(value: Any) -> str:
    return json.dumps(value, ensure_ascii=False, indent=None)


def _json_loads(value: str | None, default: Any = None) -> Any:
    if not value:
        return default if default is not None else []
    try:
        return json.loads(value)
    except json.JSONDecodeError:
        return default if default is not None else []


def row_to_dict(row: sqlite3.Row | None) -> dict[str, Any] | None:
    if row is None:
        return None
    return {k: row[k] for k in row.keys()}


def insert_audit(
    conn: sqlite3.Connection,
    *,
    date: str,
    problems_found: list[Any],
    recommendations: list[Any],
    priority_level: str = "medium",
    expected_traffic_impact: str | None = None,
    completed_actions: list[Any] | None = None,
    pages_analyzed: int = 0,
    period_start: str | None = None,
    period_end: str | None = None,
    traffic_clicks: float | None = None,
    traffic_impressions: float | None = None,
    traffic_ctr: float | None = None,
    traffic_position: float | None = None,
    clicks_pct_change: float | None = None,
    impressions_pct_change: float | None = None,
    summary: str | None = None,
    raw_json: dict[str, Any] | None = None,
    source: str = "gsc-mcp",
) -> int:
    cur = conn.execute(
        """
        INSERT INTO seo_audits(
          date, period_start, period_end, pages_analyzed, problems_found, recommendations,
          priority_level, expected_traffic_impact, completed_actions,
          traffic_clicks, traffic_impressions, traffic_ctr, traffic_position,
          clicks_pct_change, impressions_pct_change, source, summary, raw_json
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
        """,
        (
            date,
            period_start,
            period_end,
            pages_analyzed,
            _json_dumps(problems_found),
            _json_dumps(recommendations),
            priority_level,
            expected_traffic_impact,
            _json_dumps(completed_actions or []),
            traffic_clicks,
            traffic_impressions,
            traffic_ctr,
            traffic_position,
            clicks_pct_change,
            impressions_pct_change,
            source,
            summary,
            _json_dumps(raw_json) if raw_json is not None else None,
        ),
    )
    conn.commit()
    return int(cur.lastrowid)


def insert_change(
    conn: sqlite3.Connection,
    *,
    date: str,
    url: str,
    change_type: str,
    before_value: str | None = None,
    after_value: str | None = None,
    reason: str | None = None,
    expected_result: str | None = None,
    actual_result: str | None = None,
    related_audit_id: int | None = None,
    status: str = "shipped",
) -> int:
    cur = conn.execute(
        """
        INSERT INTO website_changes(
          date, url, change_type, before_value, after_value, reason,
          expected_result, actual_result, related_audit_id, status
        ) VALUES (?,?,?,?,?,?,?,?,?,?)
        """,
        (
            date,
            url,
            change_type,
            before_value,
            after_value,
            reason,
            expected_result,
            actual_result,
            related_audit_id,
            status,
        ),
    )
    conn.commit()
    return int(cur.lastrowid)


def upsert_keyword_ranking(
    conn: sqlite3.Connection,
    *,
    keyword: str,
    url: str | None,
    date: str,
    clicks: float,
    impressions: float,
    ctr: float,
    average_position: float | None,
    period_start: str | None = None,
    period_end: str | None = None,
    source: str = "gsc",
) -> None:
    conn.execute(
        """
        INSERT INTO keyword_rankings(
          keyword, url, date, period_start, period_end, clicks, impressions, ctr, average_position, source
        ) VALUES (?,?,?,?,?,?,?,?,?,?)
        ON CONFLICT(keyword, url, date, period_start, period_end) DO UPDATE SET
          clicks=excluded.clicks,
          impressions=excluded.impressions,
          ctr=excluded.ctr,
          average_position=excluded.average_position,
          source=excluded.source
        """,
        (
            keyword,
            url,
            date,
            period_start,
            period_end,
            clicks,
            impressions,
            ctr,
            average_position,
            source,
        ),
    )
    conn.commit()


def upsert_page_performance(
    conn: sqlite3.Connection,
    *,
    url: str,
    date: str,
    clicks: float,
    impressions: float,
    ctr: float,
    average_position: float | None,
    period_start: str | None = None,
    period_end: str | None = None,
    notes: str | None = None,
    source: str = "gsc",
) -> None:
    conn.execute(
        """
        INSERT INTO page_performance(
          url, date, period_start, period_end, clicks, impressions, ctr, average_position, source, notes
        ) VALUES (?,?,?,?,?,?,?,?,?,?)
        ON CONFLICT(url, date, period_start, period_end) DO UPDATE SET
          clicks=excluded.clicks,
          impressions=excluded.impressions,
          ctr=excluded.ctr,
          average_position=excluded.average_position,
          notes=excluded.notes,
          source=excluded.source
        """,
        (
            url,
            date,
            period_start,
            period_end,
            clicks,
            impressions,
            ctr,
            average_position,
            source,
            notes,
        ),
    )
    conn.commit()


def insert_experiment(
    conn: sqlite3.Connection,
    *,
    hypothesis: str,
    page_changed: str,
    change_made: str,
    start_date: str,
    end_date: str | None = None,
    result: str | None = None,
    outcome: str = "running",
    metrics_before: dict[str, Any] | None = None,
    metrics_after: dict[str, Any] | None = None,
    related_change_ids: list[int] | None = None,
) -> int:
    cur = conn.execute(
        """
        INSERT INTO seo_experiments(
          hypothesis, page_changed, change_made, start_date, end_date, result, outcome,
          metrics_before, metrics_after, related_change_ids
        ) VALUES (?,?,?,?,?,?,?,?,?,?)
        """,
        (
            hypothesis,
            page_changed,
            change_made,
            start_date,
            end_date,
            result,
            outcome,
            _json_dumps(metrics_before or {}),
            _json_dumps(metrics_after or {}),
            _json_dumps(related_change_ids or []),
        ),
    )
    conn.commit()
    return int(cur.lastrowid)


def insert_recommendation(
    conn: sqlite3.Connection,
    *,
    recommendation: str,
    date_created: str,
    priority: str = "medium",
    status: str = "New",
    target_url: str | None = None,
    expected_impact: str | None = None,
    audit_id: int | None = None,
    completed_date: str | None = None,
    outcome: str | None = None,
) -> int:
    cur = conn.execute(
        """
        INSERT INTO seo_recommendations(
          recommendation, date_created, priority, status, completed_date, outcome,
          target_url, expected_impact, audit_id
        ) VALUES (?,?,?,?,?,?,?,?,?)
        """,
        (
            recommendation,
            date_created,
            priority,
            status,
            completed_date,
            outcome,
            target_url,
            expected_impact,
            audit_id,
        ),
    )
    conn.commit()
    return int(cur.lastrowid)


def update_recommendation_status(
    conn: sqlite3.Connection,
    rec_id: int,
    *,
    status: str,
    completed_date: str | None = None,
    outcome: str | None = None,
) -> None:
    conn.execute(
        """
        UPDATE seo_recommendations
        SET status=?, completed_date=COALESCE(?, completed_date), outcome=COALESCE(?, outcome)
        WHERE id=?
        """,
        (status, completed_date, outcome, rec_id),
    )
    conn.commit()


def list_audits(conn: sqlite3.Connection, limit: int = 20) -> list[dict[str, Any]]:
    rows = conn.execute(
        "SELECT * FROM seo_audits ORDER BY date DESC, id DESC LIMIT ?",
        (limit,),
    ).fetchall()
    out: list[dict[str, Any]] = []
    for r in rows:
        d = row_to_dict(r) or {}
        d["problems_found"] = _json_loads(d.get("problems_found"))
        d["recommendations"] = _json_loads(d.get("recommendations"))
        d["completed_actions"] = _json_loads(d.get("completed_actions"))
        out.append(d)
    return out


def list_changes(conn: sqlite3.Connection, url: str | None = None, limit: int = 50) -> list[dict[str, Any]]:
    if url:
        rows = conn.execute(
            "SELECT * FROM website_changes WHERE url LIKE ? ORDER BY date DESC, id DESC LIMIT ?",
            (f"%{url}%", limit),
        ).fetchall()
    else:
        rows = conn.execute(
            "SELECT * FROM website_changes ORDER BY date DESC, id DESC LIMIT ?",
            (limit,),
        ).fetchall()
    return [row_to_dict(r) or {} for r in rows]


def list_recommendations(
    conn: sqlite3.Connection,
    status: str | None = None,
    limit: int = 50,
) -> list[dict[str, Any]]:
    if status:
        rows = conn.execute(
            "SELECT * FROM seo_recommendations WHERE status=? ORDER BY date_created DESC, id DESC LIMIT ?",
            (status, limit),
        ).fetchall()
    else:
        rows = conn.execute(
            "SELECT * FROM seo_recommendations ORDER BY date_created DESC, id DESC LIMIT ?",
            (limit,),
        ).fetchall()
    return [row_to_dict(r) or {} for r in rows]


def list_experiments(conn: sqlite3.Connection, limit: int = 50) -> list[dict[str, Any]]:
    rows = conn.execute(
        "SELECT * FROM seo_experiments ORDER BY start_date DESC, id DESC LIMIT ?",
        (limit,),
    ).fetchall()
    out: list[dict[str, Any]] = []
    for r in rows:
        d = row_to_dict(r) or {}
        d["metrics_before"] = _json_loads(d.get("metrics_before"), {})
        d["metrics_after"] = _json_loads(d.get("metrics_after"), {})
        d["related_change_ids"] = _json_loads(d.get("related_change_ids"))
        out.append(d)
    return out


def keyword_history(conn: sqlite3.Connection, keyword: str, limit: int = 30) -> list[dict[str, Any]]:
    rows = conn.execute(
        """
        SELECT * FROM keyword_rankings
        WHERE keyword LIKE ?
        ORDER BY date ASC, id ASC
        LIMIT ?
        """,
        (f"%{keyword}%", limit),
    ).fetchall()
    return [row_to_dict(r) or {} for r in rows]


def page_history(conn: sqlite3.Connection, url: str, limit: int = 30) -> list[dict[str, Any]]:
    rows = conn.execute(
        """
        SELECT * FROM page_performance
        WHERE url LIKE ?
        ORDER BY date ASC, id ASC
        LIMIT ?
        """,
        (f"%{url}%", limit),
    ).fetchall()
    return [row_to_dict(r) or {} for r in rows]


def impact_for_url(conn: sqlite3.Connection, url: str) -> dict[str, Any]:
    changes = list_changes(conn, url=url, limit=20)
    pages = page_history(conn, url, limit=20)
    before = pages[0] if pages else None
    after = pages[-1] if pages else None
    delta: dict[str, Any] = {}
    if before and after and before.get("id") != after.get("id"):
        for key in ("clicks", "impressions", "ctr", "average_position"):
            b, a = before.get(key), after.get(key)
            if b is None or a is None:
                continue
            delta[key] = {
                "before": b,
                "after": a,
                "delta": (a or 0) - (b or 0),
            }
    return {"url": url, "changes": changes, "snapshots": pages, "delta": delta}


def memory_context(conn: sqlite3.Connection) -> dict[str, Any]:
    """Compact context bundle for the SEO agent before recommendations."""
    return {
        "latest_audits": list_audits(conn, limit=3),
        "open_recommendations": list_recommendations(conn, status="New", limit=15)
        + list_recommendations(conn, status="In Progress", limit=15),
        "recent_changes": list_changes(conn, limit=20),
        "experiments": list_experiments(conn, limit=10),
        "failed_or_losing_experiments": [
            e for e in list_experiments(conn, limit=50) if e.get("outcome") == "loser"
        ],
    }


def bulk_upsert_rankings(conn: sqlite3.Connection, rows: Iterable[dict[str, Any]]) -> int:
    n = 0
    for row in rows:
        upsert_keyword_ranking(conn, **row)
        n += 1
    return n


def bulk_upsert_pages(conn: sqlite3.Connection, rows: Iterable[dict[str, Any]]) -> int:
    n = 0
    for row in rows:
        upsert_page_performance(conn, **row)
        n += 1
    return n
