"""Period-over-period Search Console comparisons."""

from __future__ import annotations

from datetime import date
from typing import Any, Literal

from .client import date_range_days, merge_by_key, previous_period, search_analytics, totals

PeriodKind = Literal["28d", "3m"]


def _period_for(kind: PeriodKind) -> tuple[date, date, date, date]:
    if kind == "28d":
        start, end = date_range_days(28)
    elif kind == "3m":
        start, end = date_range_days(90)
    else:
        raise ValueError("kind must be '28d' or '3m'")
    prev_start, prev_end = previous_period(start, end)
    return start, end, prev_start, prev_end


def compare_periods(
    *,
    site_url: str | None = None,
    kind: PeriodKind = "28d",
    row_limit: int = 100,
) -> dict[str, Any]:
    start, end, prev_start, prev_end = _period_for(kind)

    current_totals = totals(site_url=site_url, start_date=start, end_date=end)
    previous_totals = totals(site_url=site_url, start_date=prev_start, end_date=prev_end)

    def delta(cur: float, prev: float) -> dict[str, Any]:
        change = cur - prev
        pct = None if prev == 0 else round((change / prev) * 100, 2)
        return {"current": cur, "previous": prev, "delta": change, "pct_change": pct}

    traffic_changes = {
        "clicks": delta(current_totals["clicks"], previous_totals["clicks"]),
        "impressions": delta(current_totals["impressions"], previous_totals["impressions"]),
        "ctr": delta(current_totals["ctr"], previous_totals["ctr"]),
        "position": delta(current_totals["position"], previous_totals["position"]),
    }

    cur_queries = search_analytics(
        site_url=site_url, start_date=start, end_date=end, dimensions=["query"], row_limit=row_limit
    )["rows"]
    prev_queries = search_analytics(
        site_url=site_url, start_date=prev_start, end_date=prev_end, dimensions=["query"], row_limit=row_limit
    )["rows"]
    cur_pages = search_analytics(
        site_url=site_url, start_date=start, end_date=end, dimensions=["page"], row_limit=row_limit
    )["rows"]
    prev_pages = search_analytics(
        site_url=site_url, start_date=prev_start, end_date=prev_end, dimensions=["page"], row_limit=row_limit
    )["rows"]

    query_merged = merge_by_key(cur_queries, prev_queries, "query")
    page_merged = merge_by_key(cur_pages, prev_pages, "page")

    query_winners = sorted(query_merged, key=lambda r: r["clicks_delta"], reverse=True)[:20]
    query_losers = sorted(query_merged, key=lambda r: r["clicks_delta"])[:20]
    page_winners = sorted(page_merged, key=lambda r: r["clicks_delta"], reverse=True)[:20]
    page_losers = sorted(page_merged, key=lambda r: r["clicks_delta"])[:20]

    return {
        "kind": kind,
        "periods": {
            "current": {"start": start.isoformat(), "end": end.isoformat()},
            "previous": {"start": prev_start.isoformat(), "end": prev_end.isoformat()},
        },
        "traffic_changes": traffic_changes,
        "keyword_changes": {
            "biggest_winners": query_winners,
            "biggest_losers": query_losers,
        },
        "page_changes": {
            "biggest_winners": page_winners,
            "biggest_losers": page_losers,
        },
        "interpretation_hints": [
            "Position delta: negative means rankings improved (moved closer to #1).",
            "CTR is percent; small absolute CTR deltas can still matter at high impressions.",
            "New queries may appear only in current period (previous clicks=0).",
        ],
    }


def compare_both_windows(*, site_url: str | None = None, row_limit: int = 75) -> dict[str, Any]:
    return {
        "last_28_vs_previous_28": compare_periods(site_url=site_url, kind="28d", row_limit=row_limit),
        "last_3_months_vs_previous_3_months": compare_periods(site_url=site_url, kind="3m", row_limit=row_limit),
    }
