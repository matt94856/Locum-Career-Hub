"""GA4 period comparison + organic + SEO business impact reports."""

from __future__ import annotations

from typing import Any, Optional

from google.analytics.data_v1beta.types import OrderBy

from client import (
    PresetRange,
    delta_block,
    organic_filter,
    prior_period,
    resolve_date_range,
    run_report,
)
from tools.traffic import CORE_METRICS, get_traffic_overview, normalize_rate


COMPARE_METRICS = CORE_METRICS + [
    "conversions",
    "keyEvents",
    "sessionKeyEventRate",
]


def compare_periods(
    preset: PresetRange = "28d",
    start_date: str = "",
    end_date: str = "",
    row_limit: int = 25,
) -> dict[str, Any]:
    start, end = resolve_date_range(preset if preset != "custom" else "custom", start_date, end_date)
    prev_start, prev_end = prior_period(start, end)

    current = run_report(metrics=COMPARE_METRICS, start_date=start, end_date=end, limit=1)
    previous = run_report(metrics=COMPARE_METRICS, start_date=prev_start, end_date=prev_end, limit=1)
    cur_t = current.get("totals") or {}
    prev_t = previous.get("totals") or {}

    # Normalize rate metrics for readability
    def view(totals: dict[str, float]) -> dict[str, float]:
        return {
            "users": totals.get("totalUsers", 0),
            "sessions": totals.get("sessions", 0),
            "engaged_sessions": totals.get("engagedSessions", 0),
            "engagement_rate": normalize_rate(totals.get("engagementRate", 0)),
            "average_engagement_time_seconds": round(float(totals.get("averageSessionDuration", 0)), 2),
            "bounce_rate": normalize_rate(totals.get("bounceRate", 0)),
            "conversions": totals.get("keyEvents") or totals.get("conversions") or 0,
            "session_key_event_rate_percent": normalize_rate(totals.get("sessionKeyEventRate", 0)),
            "page_views": totals.get("screenPageViews", 0),
        }

    cur_v = view(cur_t)
    prev_v = view(prev_t)

    landing_cur = run_report(
        dimensions=["landingPagePlusQueryString"],
        metrics=["sessions", "totalUsers", "keyEvents", "conversions", "engagementRate"],
        start_date=start,
        end_date=end,
        limit=200,
    )
    landing_prev = run_report(
        dimensions=["landingPagePlusQueryString"],
        metrics=["sessions", "totalUsers", "keyEvents", "conversions", "engagementRate"],
        start_date=prev_start,
        end_date=prev_end,
        limit=200,
    )

    prev_map = {
        r.get("landingPagePlusQueryString"): r for r in (landing_prev.get("rows") or [])
    }
    scored: list[dict[str, Any]] = []
    for row in landing_cur.get("rows") or []:
        page = row.get("landingPagePlusQueryString")
        prev = prev_map.get(page) or {}
        cur_sessions = float(row.get("sessions") or 0)
        prev_sessions = float(prev.get("sessions") or 0)
        cur_conv = float(row.get("keyEvents") or row.get("conversions") or 0)
        prev_conv = float(prev.get("keyEvents") or prev.get("conversions") or 0)
        scored.append(
            {
                "landing_page": page,
                "sessions_current": cur_sessions,
                "sessions_previous": prev_sessions,
                "sessions_delta": cur_sessions - prev_sessions,
                "conversions_current": cur_conv,
                "conversions_previous": prev_conv,
                "conversions_delta": cur_conv - prev_conv,
                "users_current": row.get("totalUsers"),
                "engagement_rate_current": normalize_rate(row.get("engagementRate", 0)),
            }
        )

    winners = sorted(scored, key=lambda x: (x["conversions_delta"], x["sessions_delta"]), reverse=True)[
        :row_limit
    ]
    losers = sorted(scored, key=lambda x: (x["conversions_delta"], x["sessions_delta"]))[:row_limit]

    return {
        "current_period": {"start": start, "end": end},
        "previous_period": {"start": prev_start, "end": prev_end},
        "traffic_changes": delta_block(
            {
                "users": cur_v["users"],
                "sessions": cur_v["sessions"],
                "engaged_sessions": cur_v["engaged_sessions"],
                "page_views": cur_v["page_views"],
            },
            {
                "users": prev_v["users"],
                "sessions": prev_v["sessions"],
                "engaged_sessions": prev_v["engaged_sessions"],
                "page_views": prev_v["page_views"],
            },
            ["users", "sessions", "engaged_sessions", "page_views"],
        ),
        "engagement_changes": delta_block(
            {
                "engagement_rate": cur_v["engagement_rate"],
                "average_engagement_time_seconds": cur_v["average_engagement_time_seconds"],
                "bounce_rate": cur_v["bounce_rate"],
            },
            {
                "engagement_rate": prev_v["engagement_rate"],
                "average_engagement_time_seconds": prev_v["average_engagement_time_seconds"],
                "bounce_rate": prev_v["bounce_rate"],
            },
            ["engagement_rate", "average_engagement_time_seconds", "bounce_rate"],
        ),
        "conversion_changes": delta_block(
            {
                "conversions": cur_v["conversions"],
                "session_key_event_rate_percent": cur_v["session_key_event_rate_percent"],
            },
            {
                "conversions": prev_v["conversions"],
                "session_key_event_rate_percent": prev_v["session_key_event_rate_percent"],
            },
            ["conversions", "session_key_event_rate_percent"],
        ),
        "current_snapshot": cur_v,
        "previous_snapshot": prev_v,
        "biggest_winners": winners,
        "biggest_losers": losers,
    }


def get_organic_search_performance(
    preset: PresetRange = "28d",
    start_date: str = "",
    end_date: str = "",
    row_limit: int = 50,
) -> dict[str, Any]:
    start, end = resolve_date_range(preset, start_date, end_date)
    overview = run_report(
        metrics=[
            "sessions",
            "totalUsers",
            "engagedSessions",
            "engagementRate",
            "bounceRate",
            "keyEvents",
            "conversions",
            "sessionKeyEventRate",
        ],
        start_date=start,
        end_date=end,
        dimension_filter=organic_filter(),
        limit=1,
    )
    totals = overview.get("totals") or {}
    pages = run_report(
        dimensions=["landingPagePlusQueryString"],
        metrics=[
            "sessions",
            "totalUsers",
            "engagedSessions",
            "engagementRate",
            "keyEvents",
            "conversions",
            "sessionKeyEventRate",
        ],
        start_date=start,
        end_date=end,
        dimension_filter=organic_filter(),
        order_bys=[
            OrderBy(metric=OrderBy.MetricOrderBy(metric_name="sessions"), desc=True),
        ],
        limit=row_limit,
    )
    sessions = float(totals.get("sessions") or 0)
    conversions = float(totals.get("keyEvents") or totals.get("conversions") or 0)
    return {
        "channel": "Organic Search",
        "preset": preset,
        "start_date": start,
        "end_date": end,
        "users": totals.get("totalUsers", 0),
        "sessions": sessions,
        "engaged_sessions": totals.get("engagedSessions", 0),
        "engagement_rate": normalize_rate(totals.get("engagementRate", 0)),
        "bounce_rate": normalize_rate(totals.get("bounceRate", 0)),
        "conversions": conversions,
        "conversion_rate_percent": round((conversions / sessions * 100) if sessions else 0, 2),
        "landing_pages": [
            {
                "landing_page": r.get("landingPagePlusQueryString"),
                "users": r.get("totalUsers"),
                "sessions": r.get("sessions"),
                "engaged_sessions": r.get("engagedSessions"),
                "engagement_rate": normalize_rate(r.get("engagementRate", 0)),
                "conversions": r.get("keyEvents") or r.get("conversions"),
                "session_key_event_rate_percent": normalize_rate(r.get("sessionKeyEventRate", 0)),
            }
            for r in (pages.get("rows") or [])
        ],
    }


def seo_business_impact_report(
    *,
    gsc_snapshot: Optional[dict[str, Any]] = None,
    preset: PresetRange = "28d",
    start_date: str = "",
    end_date: str = "",
    row_limit: int = 25,
) -> dict[str, Any]:
    """
    Combine GA4 organic landing performance with optional GSC snapshot from the agent.

    gsc_snapshot shape (optional, passed by Cursor after calling GSC MCP):
    {
      "pages": [{"page": "https://...", "clicks": 1, "impressions": 100, "ctr": 1.0, "position": 8.0}],
      "period": {"start": "...", "end": "..."}
    }
    """
    organic = get_organic_search_performance(preset=preset, start_date=start_date, end_date=end_date, row_limit=100)
    traffic = get_traffic_overview(preset=preset, start_date=start_date, end_date=end_date)

    gsc_pages = (gsc_snapshot or {}).get("pages") or []
    gsc_by_path: dict[str, dict[str, Any]] = {}
    for p in gsc_pages:
        page = p.get("page") or p.get("url") or ""
        path = page
        if "://" in page:
            from urllib.parse import urlparse

            parsed = urlparse(page)
            path = parsed.path or "/"
            if parsed.query:
                path = f"{path}?{parsed.query}"
        gsc_by_path[path] = p

    opportunities: list[dict[str, Any]] = []
    for row in organic.get("landing_pages") or []:
        path = row.get("landing_page") or ""
        gsc = gsc_by_path.get(path) or {}
        impressions = float(gsc.get("impressions") or 0)
        clicks = float(gsc.get("clicks") or 0)
        position = gsc.get("position") or gsc.get("average_position")
        ctr = gsc.get("ctr")
        conversions = float(row.get("conversions") or 0)
        sessions = float(row.get("sessions") or 0)

        # Simple ROI score: mid-pack + impressions + existing conversions
        score = 0.0
        if impressions:
            score += min(impressions / 50.0, 40)
        if position and 5 <= float(position) <= 20:
            score += 25
        if ctr is not None and float(ctr) < 2 and impressions >= 50:
            score += 15
        if conversions > 0:
            score += min(conversions * 8, 30)
        elif sessions >= 10:
            score += 5  # traffic without conversion = fix UX/CTA

        estimate = None
        if impressions and position and 5 <= float(position) <= 15:
            # Rough: moving toward pos ~3–5 often ~2–3x CTR; keep directional
            estimate = (
                f"If CTR doubles from improved SERP + on-page fit, "
                f"~{int(clicks)} → ~{int(clicks * 2)} organic clicks/period; "
                f"at current conversion density "
                f"({'%.1f' % (conversions / sessions * 100) if sessions else '0'}% of sessions), "
                f"expect directional conversion lift — validate with a 14-day experiment."
            )

        opportunities.append(
            {
                "landing_page": path,
                "roi_score": round(score, 1),
                "ga4": {
                    "sessions": sessions,
                    "users": row.get("users"),
                    "engagement_rate": row.get("engagement_rate"),
                    "conversions": conversions,
                },
                "gsc": {
                    "clicks": clicks or None,
                    "impressions": impressions or None,
                    "ctr": ctr,
                    "position": position,
                    "matched": bool(gsc),
                },
                "why": _why(impressions, position, ctr, conversions, sessions),
                "estimated_upside": estimate,
            }
        )

    opportunities.sort(key=lambda x: x["roi_score"], reverse=True)

    return {
        "preset": preset,
        "start_date": organic.get("start_date"),
        "end_date": organic.get("end_date"),
        "site_traffic_overview": traffic,
        "organic_summary": {
            "users": organic.get("users"),
            "sessions": organic.get("sessions"),
            "conversions": organic.get("conversions"),
            "conversion_rate_percent": organic.get("conversion_rate_percent"),
        },
        "gsc_pages_provided": len(gsc_pages),
        "highest_roi_opportunities": opportunities[:row_limit],
        "method_notes": [
            "Pass gsc_snapshot from GSC MCP get_search_analytics (dimensions=page) for full SEO ROI scoring.",
            "Without GSC pages, ranking/CTR fields are null and scores rely on GA4 sessions/conversions.",
            "Estimates are directional — not guarantees. Log experiments in seo-memory.",
        ],
    }


def _why(
    impressions: float,
    position: Any,
    ctr: Any,
    conversions: float,
    sessions: float,
) -> str:
    bits = []
    if impressions:
        bits.append(f"{int(impressions)} GSC impressions")
    if position is not None:
        bits.append(f"avg position {position}")
    if ctr is not None:
        bits.append(f"CTR {ctr}%")
    bits.append(f"{int(sessions)} organic sessions")
    bits.append(f"{conversions:g} conversions")
    return "; ".join(bits)
