"""Landing page performance tools for GA4 MCP."""

from __future__ import annotations

from typing import Any, Literal
from urllib.parse import urlparse

from auth import conversion_events, default_host
from client import (
    PresetRange,
    landing_page_contains_filter,
    landing_page_filter,
    resolve_date_range,
    run_report,
)
from tools.traffic import normalize_rate

PAGE_METRICS = [
    "sessions",
    "totalUsers",
    "engagedSessions",
    "engagementRate",
    "bounceRate",
    "averageSessionDuration",
    "conversions",
    "keyEvents",
    "sessionKeyEventRate",
    "ecommercePurchases",
    "totalRevenue",
]


def _path_from_input(url_or_path: str) -> str:
    raw = url_or_path.strip()
    if raw.startswith("http://") or raw.startswith("https://"):
        parsed = urlparse(raw)
        path = parsed.path or "/"
        if parsed.query:
            path = f"{path}?{parsed.query}"
        return path
    return raw if raw.startswith("/") else f"/{raw}"


def get_landing_page_performance(
    url: str,
    preset: PresetRange = "28d",
    start_date: str = "",
    end_date: str = "",
    match: Literal["equals", "contains"] = "equals",
) -> dict[str, Any]:
    start, end = resolve_date_range(preset, start_date, end_date)
    path = _path_from_input(url)
    dim_filter = (
        landing_page_contains_filter(path)
        if match == "contains"
        else landing_page_filter(path, host=default_host())
    )

    report = run_report(
        dimensions=["landingPagePlusQueryString"],
        metrics=PAGE_METRICS,
        start_date=start,
        end_date=end,
        dimension_filter=dim_filter,
        limit=25,
    )

    rows = report.get("rows") or []
    agg = {m: 0.0 for m in PAGE_METRICS}
    for row in rows:
        for m in PAGE_METRICS:
            if m in {"engagementRate", "bounceRate", "sessionKeyEventRate", "averageSessionDuration"}:
                continue
            agg[m] += float(row.get(m) or 0)

    sessions = agg.get("sessions", 0)
    engaged = agg.get("engagedSessions", 0)
    conversions = agg.get("keyEvents") or agg.get("conversions") or 0
    conv_rate = (conversions / sessions * 100) if sessions else 0.0

    if len(rows) == 1:
        engagement_rate = normalize_rate(rows[0].get("engagementRate", 0))
        bounce_rate = normalize_rate(rows[0].get("bounceRate", 0))
        avg_eng = round(float(rows[0].get("averageSessionDuration") or 0), 2)
        session_key_rate = normalize_rate(rows[0].get("sessionKeyEventRate", 0))
    else:
        engagement_rate = round((engaged / sessions * 100) if sessions else 0, 2)
        bounce_rate = None
        avg_eng = None
        session_key_rate = round((conversions / sessions * 100) if sessions else 0, 2)

    # Per-event breakdown for configured conversion events
    event_breakdown = _event_breakdown_for_landing(path, start, end, match)

    return {
        "url_input": url,
        "matched_path": path,
        "match": match,
        "host_hint": default_host(),
        "preset": preset,
        "start_date": start,
        "end_date": end,
        "sessions": sessions,
        "users": agg.get("totalUsers", 0),
        "engaged_sessions": engaged,
        "engagement_rate": engagement_rate,
        "bounce_rate": bounce_rate,
        "average_engagement_time_seconds": avg_eng,
        "conversions": conversions,
        "conversion_rate_percent": round(conv_rate, 2),
        "key_events": agg.get("keyEvents", 0),
        "session_key_event_rate_percent": session_key_rate,
        "ecommerce_purchases": agg.get("ecommercePurchases", 0),
        "total_revenue": agg.get("totalRevenue", 0),
        "matched_landing_pages": [
            {
                "landing_page": r.get("landingPagePlusQueryString"),
                "sessions": r.get("sessions"),
                "users": r.get("totalUsers"),
                "conversions": r.get("keyEvents") or r.get("conversions"),
            }
            for r in rows[:15]
        ],
        "configured_conversion_events": conversion_events(),
        "event_breakdown": event_breakdown,
        "notes": [
            "conversions prefer GA4 keyEvents when available.",
            "Mark generate_lead (and related) as Key events in GA4 Admin for best signal.",
        ],
    }


def _event_breakdown_for_landing(
    path: str,
    start: str,
    end: str,
    match: Literal["equals", "contains"],
) -> list[dict[str, Any]]:
    events = conversion_events()
    if not events:
        return []
    dim_filter = (
        landing_page_contains_filter(path)
        if match == "contains"
        else landing_page_filter(path)
    )
    try:
        report = run_report(
            dimensions=["eventName", "landingPagePlusQueryString"],
            metrics=["eventCount", "conversions"],
            start_date=start,
            end_date=end,
            dimension_filter=dim_filter,
            limit=100,
        )
    except Exception as exc:  # noqa: BLE001
        return [{"error": str(exc)}]

    wanted = set(events)
    out: list[dict[str, Any]] = []
    for row in report.get("rows") or []:
        name = row.get("eventName")
        if name not in wanted:
            continue
        out.append(
            {
                "event": name,
                "landing_page": row.get("landingPagePlusQueryString"),
                "event_count": row.get("eventCount", 0),
                "conversions": row.get("conversions", 0),
            }
        )
    return out
