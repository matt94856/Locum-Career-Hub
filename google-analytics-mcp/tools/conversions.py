"""Conversion-focused GA4 tools."""

from __future__ import annotations

from typing import Any

from google.analytics.data_v1beta.types import OrderBy

from auth import conversion_events
from client import PresetRange, organic_filter, resolve_date_range, run_report
from tools.traffic import normalize_rate


def get_conversion_data(
    preset: PresetRange = "28d",
    start_date: str = "",
    end_date: str = "",
    row_limit: int = 25,
) -> dict[str, Any]:
    start, end = resolve_date_range(preset, start_date, end_date)

    overview = run_report(
        metrics=[
            "sessions",
            "totalUsers",
            "conversions",
            "keyEvents",
            "sessionKeyEventRate",
            "totalRevenue",
        ],
        start_date=start,
        end_date=end,
        limit=1,
    )
    totals = overview.get("totals") or {}
    sessions = float(totals.get("sessions") or 0)
    key_events = float(totals.get("keyEvents") or totals.get("conversions") or 0)
    conv_rate = (key_events / sessions * 100) if sessions else 0.0

    top_pages = run_report(
        dimensions=["landingPagePlusQueryString"],
        metrics=["sessions", "keyEvents", "conversions", "sessionKeyEventRate", "totalUsers"],
        start_date=start,
        end_date=end,
        order_bys=[
            OrderBy(metric=OrderBy.MetricOrderBy(metric_name="keyEvents"), desc=True),
        ],
        limit=row_limit,
    )

    by_source = run_report(
        dimensions=["sessionDefaultChannelGroup"],
        metrics=["sessions", "keyEvents", "conversions", "sessionKeyEventRate", "totalUsers"],
        start_date=start,
        end_date=end,
        order_bys=[
            OrderBy(metric=OrderBy.MetricOrderBy(metric_name="keyEvents"), desc=True),
        ],
        limit=20,
    )

    organic = run_report(
        dimensions=["landingPagePlusQueryString"],
        metrics=["sessions", "keyEvents", "conversions", "sessionKeyEventRate", "totalUsers"],
        start_date=start,
        end_date=end,
        dimension_filter=organic_filter(),
        order_bys=[
            OrderBy(metric=OrderBy.MetricOrderBy(metric_name="keyEvents"), desc=True),
        ],
        limit=row_limit,
    )

    event_rows = run_report(
        dimensions=["eventName"],
        metrics=["eventCount", "conversions"],
        start_date=start,
        end_date=end,
        order_bys=[
            OrderBy(metric=OrderBy.MetricOrderBy(metric_name="eventCount"), desc=True),
        ],
        limit=50,
    )
    wanted = set(conversion_events())
    tracked_events = [
        {
            "event": r.get("eventName"),
            "event_count": r.get("eventCount", 0),
            "conversions": r.get("conversions", 0),
        }
        for r in (event_rows.get("rows") or [])
        if r.get("eventName") in wanted
    ]

    return {
        "preset": preset,
        "start_date": start,
        "end_date": end,
        "conversions": key_events,
        "conversion_rate_percent": round(conv_rate, 2),
        "sessions": sessions,
        "users": totals.get("totalUsers", 0),
        "session_key_event_rate_percent": normalize_rate(totals.get("sessionKeyEventRate", 0)),
        "total_revenue": totals.get("totalRevenue", 0),
        "configured_conversion_events": conversion_events(),
        "tracked_conversion_events": tracked_events,
        "top_converting_landing_pages": [
            {
                "landing_page": r.get("landingPagePlusQueryString"),
                "sessions": r.get("sessions"),
                "users": r.get("totalUsers"),
                "conversions": r.get("keyEvents") or r.get("conversions"),
                "session_key_event_rate_percent": normalize_rate(r.get("sessionKeyEventRate", 0)),
            }
            for r in (top_pages.get("rows") or [])
            if (r.get("keyEvents") or r.get("conversions") or 0) > 0
        ][:row_limit],
        "conversions_by_channel": [
            {
                "channel": r.get("sessionDefaultChannelGroup"),
                "sessions": r.get("sessions"),
                "users": r.get("totalUsers"),
                "conversions": r.get("keyEvents") or r.get("conversions"),
                "session_key_event_rate_percent": normalize_rate(r.get("sessionKeyEventRate", 0)),
            }
            for r in (by_source.get("rows") or [])
        ],
        "organic_conversion_performance": {
            "landing_pages": [
                {
                    "landing_page": r.get("landingPagePlusQueryString"),
                    "sessions": r.get("sessions"),
                    "users": r.get("totalUsers"),
                    "conversions": r.get("keyEvents") or r.get("conversions"),
                    "session_key_event_rate_percent": normalize_rate(r.get("sessionKeyEventRate", 0)),
                }
                for r in (organic.get("rows") or [])
            ],
            "totals": organic.get("totals") or {},
        },
        "notes": [
            "Prefer Key events configured in GA4 Admin (generate_lead recommended).",
            "Organic block uses sessionDefaultChannelGroup = Organic Search.",
        ],
    }
