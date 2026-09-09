"""Per-URL Search Console performance."""

from __future__ import annotations

from typing import Any

from .client import date_range_days, page_contains_filter, page_equals_filter, search_analytics, totals


def get_page_performance(
    *,
    page_url: str,
    site_url: str | None = None,
    days: int = 28,
    query_limit: int = 50,
    match: str = "equals",
) -> dict[str, Any]:
    if not page_url or not page_url.strip():
        raise ValueError("page_url is required")
    page_url = page_url.strip()
    start, end = date_range_days(days)

    filters = page_equals_filter(page_url) if match == "equals" else page_contains_filter(page_url)

    # Totals for the filtered page(s)
    page_totals = search_analytics(
        site_url=site_url,
        start_date=start,
        end_date=end,
        dimensions=None,
        row_limit=1,
        dimension_filter_groups=filters,
    )
    summary_row = page_totals["rows"][0] if page_totals["rows"] else {
        "clicks": 0,
        "impressions": 0,
        "ctr": 0,
        "position": 0,
    }

    queries = search_analytics(
        site_url=site_url,
        start_date=start,
        end_date=end,
        dimensions=["query"],
        row_limit=query_limit,
        dimension_filter_groups=filters,
    )["rows"]

    devices = search_analytics(
        site_url=site_url,
        start_date=start,
        end_date=end,
        dimensions=["device"],
        row_limit=10,
        dimension_filter_groups=filters,
    )["rows"]

    countries = search_analytics(
        site_url=site_url,
        start_date=start,
        end_date=end,
        dimensions=["country"],
        row_limit=15,
        dimension_filter_groups=filters,
    )["rows"]

    site_summary = totals(site_url=site_url, start_date=start, end_date=end)

    return {
        "page_url": page_url,
        "match": match,
        "period": {"start": start.isoformat(), "end": end.isoformat()},
        "summary": {
            "clicks": summary_row["clicks"],
            "impressions": summary_row["impressions"],
            "ctr": summary_row["ctr"],
            "position": summary_row["position"],
        },
        "ranking_keywords": queries,
        "by_device": devices,
        "by_country": countries,
        "site_context": site_summary,
        "notes": [
            "Use match='contains' for path prefixes; 'equals' for exact GSC page URLs.",
            "Ranking keywords are queries that generated impressions for this page.",
        ],
    }
