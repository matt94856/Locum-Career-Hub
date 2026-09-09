"""High-level search analytics aggregations for MCP tools."""

from __future__ import annotations

from typing import Any, Sequence

from .client import search_analytics, totals


ALLOWED_DIMENSIONS = {"query", "page", "country", "device", "date"}


def get_search_analytics_report(
    *,
    site_url: str | None,
    start_date: str,
    end_date: str,
    dimensions: Sequence[str] | None = None,
    row_limit: int = 25,
) -> dict[str, Any]:
    dims = [d.strip().lower() for d in (dimensions or ["query"])]
    unknown = [d for d in dims if d not in ALLOWED_DIMENSIONS]
    if unknown:
        raise ValueError(f"Unsupported dimensions: {unknown}. Allowed: {sorted(ALLOWED_DIMENSIONS)}")

    summary = totals(site_url=site_url, start_date=start_date, end_date=end_date)

    primary = search_analytics(
        site_url=site_url,
        start_date=start_date,
        end_date=end_date,
        dimensions=dims,
        row_limit=row_limit,
    )

    top_queries = search_analytics(
        site_url=site_url,
        start_date=start_date,
        end_date=end_date,
        dimensions=["query"],
        row_limit=min(row_limit, 50),
    )["rows"]

    top_pages = search_analytics(
        site_url=site_url,
        start_date=start_date,
        end_date=end_date,
        dimensions=["page"],
        row_limit=min(row_limit, 50),
    )["rows"]

    return {
        "summary": summary,
        "dimension_rows": primary["rows"],
        "dimensions": dims,
        "top_queries": top_queries,
        "top_pages": top_pages,
        "notes": [
            "CTR is returned as a percentage (0–100).",
            "Position is average ranking (lower is better).",
            "GSC final data typically lags ~2–3 days.",
        ],
    }
