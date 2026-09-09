"""Opportunity detection from Search Console data."""

from __future__ import annotations

from typing import Any

from .client import date_range_days, merge_by_key, previous_period, search_analytics


def get_top_opportunities(
    *,
    site_url: str | None = None,
    days: int = 28,
    row_limit: int = 100,
    min_impressions: int = 50,
    max_ctr_percent: float = 2.0,
    position_min: float = 5.0,
    position_max: float = 20.0,
) -> dict[str, Any]:
    start, end = date_range_days(days)
    prev_start, prev_end = previous_period(start, end)

    queries = search_analytics(
        site_url=site_url,
        start_date=start,
        end_date=end,
        dimensions=["query"],
        row_limit=row_limit,
    )["rows"]

    pages = search_analytics(
        site_url=site_url,
        start_date=start,
        end_date=end,
        dimensions=["page"],
        row_limit=row_limit,
    )["rows"]

    prev_pages = search_analytics(
        site_url=site_url,
        start_date=prev_start,
        end_date=prev_end,
        dimensions=["page"],
        row_limit=row_limit,
    )["rows"]

    high_impr_low_ctr = [
        row
        for row in queries
        if row["impressions"] >= min_impressions and row["ctr"] <= max_ctr_percent
    ]
    high_impr_low_ctr.sort(key=lambda r: (-r["impressions"], r["ctr"]))

    mid_pack_pages = [
        row
        for row in pages
        if position_min <= row["position"] <= position_max and row["impressions"] >= min_impressions / 2
    ]
    mid_pack_pages.sort(key=lambda r: (r["position"], -r["impressions"]))

    merged = merge_by_key(pages, prev_pages, "page")
    declining_pages = [
        row
        for row in merged
        if row["clicks_delta"] < 0 or (row["impressions_delta"] < 0 and (row["clicks_delta"] or 0) <= 0)
    ]
    declining_pages.sort(key=lambda r: (r["clicks_delta"], r["impressions_delta"]))

    losing_clicks = [row for row in merged if row["clicks_delta"] < 0]
    losing_clicks.sort(key=lambda r: r["clicks_delta"])

    return {
        "period": {
            "current": {"start": start.isoformat(), "end": end.isoformat()},
            "previous": {"start": prev_start.isoformat(), "end": prev_end.isoformat()},
        },
        "filters": {
            "min_impressions": min_impressions,
            "max_ctr_percent": max_ctr_percent,
            "position_band": [position_min, position_max],
        },
        "high_impression_low_ctr_queries": high_impr_low_ctr[:40],
        "pages_ranking_positions_5_to_20": mid_pack_pages[:40],
        "declining_pages": declining_pages[:40],
        "pages_losing_clicks": losing_clicks[:40],
        "priority_actions": _priority_actions(high_impr_low_ctr, mid_pack_pages, losing_clicks),
    }


def _priority_actions(
    low_ctr: list[dict[str, Any]],
    mid_pack: list[dict[str, Any]],
    losing: list[dict[str, Any]],
) -> list[dict[str, Any]]:
    actions: list[dict[str, Any]] = []
    for row in low_ctr[:10]:
        actions.append(
            {
                "priority": "high",
                "type": "ctr_rewrite",
                "target": row.get("query"),
                "why": f"{int(row['impressions'])} impressions at {row['ctr']}% CTR (pos {row['position']})",
                "expected_impact": "Lift CTR on already-visible demand; fastest near-term clicks",
            }
        )
    for row in mid_pack[:10]:
        actions.append(
            {
                "priority": "high",
                "type": "rank_push_into_top5",
                "target": row.get("page"),
                "why": f"Position {row['position']} with {int(row['impressions'])} impressions",
                "expected_impact": "Content depth, internal links, and title alignment can unlock page-1 CTR",
            }
        )
    for row in losing[:8]:
        actions.append(
            {
                "priority": "medium",
                "type": "recover_declining_page",
                "target": row.get("page"),
                "why": f"Clicks {row['clicks_previous']} → {row['clicks_current']} (Δ {row['clicks_delta']})",
                "expected_impact": "Stop leakage on pages that previously earned traffic",
            }
        )
    return actions
