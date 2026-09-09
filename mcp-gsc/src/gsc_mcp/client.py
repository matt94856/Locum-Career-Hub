"""Read-only Google Search Console API client."""

from __future__ import annotations

from datetime import date, datetime, timedelta
from functools import lru_cache
from typing import Any, Iterable, Sequence

from googleapiclient.discovery import build

from .auth import default_site_url, get_credentials

SEARCH_TYPE = "web"


def _parse_date(value: str | date) -> date:
    if isinstance(value, date):
        return value
    return datetime.strptime(value, "%Y-%m-%d").date()


def normalize_site_url(site_url: str | None) -> str:
    url = (site_url or default_site_url()).strip()
    if not url:
        raise ValueError("site_url is required")
    # URL-prefix properties in GSC usually include trailing slash.
    if url.startswith("http") and not url.endswith("/"):
        url += "/"
    return url


@lru_cache(maxsize=1)
def get_webmasters_service():
    creds = get_credentials(interactive=False)
    # cache_discovery=False avoids writing to user home cache unexpectedly
    return build("searchconsole", "v1", credentials=creds, cache_discovery=False)


def list_sites() -> list[dict[str, Any]]:
    service = get_webmasters_service()
    response = service.sites().list().execute()
    return response.get("siteEntry", [])


def search_analytics(
    *,
    site_url: str | None,
    start_date: str | date,
    end_date: str | date,
    dimensions: Sequence[str] | None = None,
    row_limit: int = 25,
    dimension_filter_groups: list[dict[str, Any]] | None = None,
    start_row: int = 0,
    aggregation_type: str = "auto",
) -> dict[str, Any]:
    """
    Call searchanalytics.query (read-only).

    dimensions: query | page | country | device | date (and combinations)
    """
    service = get_webmasters_service()
    site = normalize_site_url(site_url)
    dims = list(dimensions or [])
    body: dict[str, Any] = {
        "startDate": _parse_date(start_date).isoformat(),
        "endDate": _parse_date(end_date).isoformat(),
        "rowLimit": max(1, min(int(row_limit), 25000)),
        "startRow": max(0, int(start_row)),
        "searchType": SEARCH_TYPE,
        "dataState": "final",
        "aggregationType": aggregation_type,
    }
    if dims:
        body["dimensions"] = dims
    if dimension_filter_groups:
        body["dimensionFilterGroups"] = dimension_filter_groups

    result = service.searchanalytics().query(siteUrl=site, body=body).execute()
    rows = result.get("rows", [])
    return {
        "site_url": site,
        "start_date": body["startDate"],
        "end_date": body["endDate"],
        "dimensions": dims,
        "row_count": len(rows),
        "rows": [_normalize_row(row, dims) for row in rows],
        "response_aggregation_type": result.get("responseAggregationType"),
    }


def _normalize_row(row: dict[str, Any], dimensions: Sequence[str]) -> dict[str, Any]:
    keys = row.get("keys", [])
    dims = {dimensions[i]: keys[i] for i in range(min(len(dimensions), len(keys)))}
    clicks = float(row.get("clicks", 0) or 0)
    impressions = float(row.get("impressions", 0) or 0)
    ctr = float(row.get("ctr", 0) or 0)
    position = float(row.get("position", 0) or 0)
    return {
        **dims,
        "clicks": clicks,
        "impressions": impressions,
        "ctr": round(ctr * 100, 4) if ctr <= 1 else round(ctr, 4),  # percent
        "ctr_raw": ctr,
        "position": round(position, 2),
    }


def totals(
    *,
    site_url: str | None,
    start_date: str | date,
    end_date: str | date,
) -> dict[str, Any]:
    data = search_analytics(
        site_url=site_url,
        start_date=start_date,
        end_date=end_date,
        dimensions=None,
        row_limit=1,
    )
    if not data["rows"]:
        return {
            "site_url": data["site_url"],
            "start_date": data["start_date"],
            "end_date": data["end_date"],
            "clicks": 0.0,
            "impressions": 0.0,
            "ctr": 0.0,
            "position": 0.0,
        }
    row = data["rows"][0]
    return {
        "site_url": data["site_url"],
        "start_date": data["start_date"],
        "end_date": data["end_date"],
        "clicks": row["clicks"],
        "impressions": row["impressions"],
        "ctr": row["ctr"],
        "position": row["position"],
    }


def date_range_days(days: int, *, end: date | None = None) -> tuple[date, date]:
    end = end or (date.today() - timedelta(days=3))  # GSC final data lag
    start = end - timedelta(days=days - 1)
    return start, end


def previous_period(start: date, end: date) -> tuple[date, date]:
    length = (end - start).days + 1
    prev_end = start - timedelta(days=1)
    prev_start = prev_end - timedelta(days=length - 1)
    return prev_start, prev_end


def page_equals_filter(page_url: str) -> list[dict[str, Any]]:
    return [
        {
            "filters": [
                {
                    "dimension": "page",
                    "operator": "equals",
                    "expression": page_url,
                }
            ]
        }
    ]


def page_contains_filter(page_url: str) -> list[dict[str, Any]]:
    return [
        {
            "filters": [
                {
                    "dimension": "page",
                    "operator": "contains",
                    "expression": page_url,
                }
            ]
        }
    ]


def merge_by_key(
    current_rows: Iterable[dict[str, Any]],
    previous_rows: Iterable[dict[str, Any]],
    key_field: str,
) -> list[dict[str, Any]]:
    prev_map = {str(r.get(key_field, "")): r for r in previous_rows if r.get(key_field) is not None}
    keys = set(prev_map) | {str(r.get(key_field, "")) for r in current_rows if r.get(key_field) is not None}
    merged: list[dict[str, Any]] = []
    curr_map = {str(r.get(key_field, "")): r for r in current_rows if r.get(key_field) is not None}
    for key in keys:
        if not key:
            continue
        cur = curr_map.get(key, {})
        prev = prev_map.get(key, {})
        cur_clicks = float(cur.get("clicks", 0) or 0)
        prev_clicks = float(prev.get("clicks", 0) or 0)
        cur_impr = float(cur.get("impressions", 0) or 0)
        prev_impr = float(prev.get("impressions", 0) or 0)
        merged.append(
            {
                key_field: key,
                "clicks_current": cur_clicks,
                "clicks_previous": prev_clicks,
                "clicks_delta": cur_clicks - prev_clicks,
                "impressions_current": cur_impr,
                "impressions_previous": prev_impr,
                "impressions_delta": cur_impr - prev_impr,
                "ctr_current": cur.get("ctr"),
                "ctr_previous": prev.get("ctr"),
                "position_current": cur.get("position"),
                "position_previous": prev.get("position"),
                "position_delta": (
                    None
                    if cur.get("position") is None or prev.get("position") is None
                    else round(float(cur["position"]) - float(prev["position"]), 2)
                ),
            }
        )
    return merged
