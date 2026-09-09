"""Traffic overview tools for GA4 MCP."""

from __future__ import annotations

from typing import Any

from client import PresetRange, resolve_date_range, run_report

CORE_METRICS = [
    "totalUsers",
    "sessions",
    "engagedSessions",
    "engagementRate",
    "averageSessionDuration",
    "bounceRate",
    "screenPageViews",
]


def get_traffic_overview(
    preset: PresetRange = "28d",
    start_date: str = "",
    end_date: str = "",
) -> dict[str, Any]:
    start, end = resolve_date_range(preset, start_date, end_date)
    report = run_report(
        metrics=CORE_METRICS,
        start_date=start,
        end_date=end,
        limit=1,
    )
    totals = report.get("totals") or {}
    # Fallback: if totals empty, sum first row
    if not totals and report.get("rows"):
        totals = {k: report["rows"][0].get(k, 0) for k in CORE_METRICS}

    return {
        "preset": preset,
        "start_date": start,
        "end_date": end,
        "users": totals.get("totalUsers", 0),
        "sessions": totals.get("sessions", 0),
        "engaged_sessions": totals.get("engagedSessions", 0),
        "engagement_rate": round(float(totals.get("engagementRate", 0)) * 100, 2)
        if float(totals.get("engagementRate", 0)) <= 1
        else round(float(totals.get("engagementRate", 0)), 2),
        "average_engagement_time_seconds": round(float(totals.get("averageSessionDuration", 0)), 2),
        "bounce_rate": round(float(totals.get("bounceRate", 0)) * 100, 2)
        if float(totals.get("bounceRate", 0)) <= 1
        else round(float(totals.get("bounceRate", 0)), 2),
        "page_views": totals.get("screenPageViews", 0),
        "raw_totals": totals,
        "notes": [
            "engagement_rate and bounce_rate are returned as percentages (0–100).",
            "average_engagement_time_seconds maps to GA4 averageSessionDuration.",
            "GA4 data typically lags ~24–48 hours.",
        ],
    }


def normalize_rate(value: float) -> float:
    """GA4 API may return rates as 0–1 fractions."""
    v = float(value or 0)
    return round(v * 100, 2) if v <= 1 else round(v, 2)
