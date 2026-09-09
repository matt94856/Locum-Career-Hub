"""Shared GA4 Data API client helpers."""

from __future__ import annotations

from datetime import date, datetime, timedelta
from typing import Any, Iterable, Literal, Optional

from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import (
    DateRange,
    Dimension,
    Filter,
    FilterExpression,
    Metric,
    OrderBy,
    RunReportRequest,
)

from auth import get_credentials, property_resource

PresetRange = Literal["7d", "28d", "90d", "custom"]


def resolve_date_range(
    preset: PresetRange = "28d",
    start_date: str = "",
    end_date: str = "",
) -> tuple[str, str]:
    """Return YYYY-MM-DD inclusive range. GA4 typically has ~1 day processing lag."""
    if preset == "custom":
        if not start_date or not end_date:
            raise ValueError("custom range requires start_date and end_date (YYYY-MM-DD)")
        return start_date, end_date

    end = date.today() - timedelta(days=1)
    days = {"7d": 7, "28d": 28, "90d": 90}[preset]
    start = end - timedelta(days=days - 1)
    return start.isoformat(), end.isoformat()


def prior_period(start: str, end: str) -> tuple[str, str]:
    s = date.fromisoformat(start)
    e = date.fromisoformat(end)
    length = (e - s).days + 1
    prev_end = s - timedelta(days=1)
    prev_start = prev_end - timedelta(days=length - 1)
    return prev_start.isoformat(), prev_end.isoformat()


def get_client() -> BetaAnalyticsDataClient:
    creds = get_credentials(interactive=False)
    return BetaAnalyticsDataClient(credentials=creds)


def _metric_value(row_values: list[Any], idx: int) -> float:
    if idx >= len(row_values):
        return 0.0
    raw = row_values[idx].value
    if raw in (None, "", "(not set)"):
        return 0.0
    try:
        return float(raw)
    except ValueError:
        return 0.0


def run_report(
    *,
    dimensions: Iterable[str] | None = None,
    metrics: Iterable[str],
    start_date: str,
    end_date: str,
    dimension_filter: FilterExpression | None = None,
    order_bys: list[OrderBy] | None = None,
    limit: int = 25,
) -> dict[str, Any]:
    client = get_client()
    dims = [Dimension(name=d) for d in (dimensions or [])]
    mets = [Metric(name=m) for m in metrics]
    request = RunReportRequest(
        property=property_resource(),
        dimensions=dims,
        metrics=mets,
        date_ranges=[DateRange(start_date=start_date, end_date=end_date)],
        dimension_filter=dimension_filter,
        order_bys=order_bys or [],
        limit=limit,
    )
    response = client.run_report(request)

    metric_names = [h.name for h in response.metric_headers]
    dimension_names = [h.name for h in response.dimension_headers]
    rows: list[dict[str, Any]] = []
    for row in response.rows:
        item: dict[str, Any] = {}
        for i, name in enumerate(dimension_names):
            item[name] = row.dimension_values[i].value if i < len(row.dimension_values) else None
        for i, name in enumerate(metric_names):
            item[name] = _metric_value(row.metric_values, i)
        rows.append(item)

    totals: dict[str, float] = {}
    if response.totals:
        for i, name in enumerate(metric_names):
            totals[name] = _metric_value(response.totals[0].metric_values, i)

    return {
        "property": property_resource(),
        "start_date": start_date,
        "end_date": end_date,
        "dimensions": dimension_names,
        "metrics": metric_names,
        "row_count": len(rows),
        "totals": totals,
        "rows": rows,
    }


def organic_filter() -> FilterExpression:
    """Session default channel group = Organic Search."""
    return FilterExpression(
        filter=Filter(
            field_name="sessionDefaultChannelGroup",
            string_filter=Filter.StringFilter(
                match_type=Filter.StringFilter.MatchType.EXACT,
                value="Organic Search",
            ),
        )
    )


def landing_page_filter(page_path_or_url: str, host: str | None = None) -> FilterExpression:
    """Match landingPagePlusQueryString by path or full URL."""
    path = page_path_or_url.strip()
    if path.startswith("http://") or path.startswith("https://"):
        # Extract path+query
        from urllib.parse import urlparse

        parsed = urlparse(path)
        path = parsed.path or "/"
        if parsed.query:
            path = f"{path}?{parsed.query}"
    if not path.startswith("/"):
        path = "/" + path

    return FilterExpression(
        filter=Filter(
            field_name="landingPagePlusQueryString",
            string_filter=Filter.StringFilter(
                match_type=Filter.StringFilter.MatchType.EXACT,
                value=path,
            ),
        )
    )


def landing_page_contains_filter(substring: str) -> FilterExpression:
    return FilterExpression(
        filter=Filter(
            field_name="landingPagePlusQueryString",
            string_filter=Filter.StringFilter(
                match_type=Filter.StringFilter.MatchType.CONTAINS,
                value=substring,
            ),
        )
    )


def pct_change(current: float, previous: float) -> float | None:
    if previous == 0:
        return None if current == 0 else None
    return round(((current - previous) / previous) * 100, 2)


def delta_block(current: dict[str, float], previous: dict[str, float], keys: list[str]) -> dict[str, Any]:
    out: dict[str, Any] = {}
    for key in keys:
        c = float(current.get(key) or 0)
        p = float(previous.get(key) or 0)
        out[key] = {
            "current": c,
            "previous": p,
            "delta": round(c - p, 4),
            "pct_change": pct_change(c, p),
        }
    return out
