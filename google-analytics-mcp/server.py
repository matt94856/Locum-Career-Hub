"""Google Analytics 4 MCP server (read-only, local stdio)."""

from __future__ import annotations

import json
import sys
from pathlib import Path
from typing import Any, Literal, Optional

# Allow `python server.py` and `python -m`-style runs from this directory.
ROOT = Path(__file__).resolve().parent
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from mcp.server.fastmcp import FastMCP

from auth import describe_auth_state, property_id, property_label, redact_secrets_from_dict
from tools.conversions import get_conversion_data as build_conversion_data
from tools.landing_pages import get_landing_page_performance as build_landing_page_performance
from tools.reports import (
    compare_periods as build_compare_periods,
)
from tools.reports import (
    get_organic_search_performance as build_organic_search_performance,
)
from tools.reports import (
    seo_business_impact_report as build_seo_business_impact_report,
)
from tools.traffic import get_traffic_overview as build_traffic_overview

mcp = FastMCP(
    "ga4-analytics",
    instructions=(
        "Read-only Google Analytics 4 tools for traffic, engagement, conversions, "
        "and SEO business impact. Always combine with Google Search Console MCP and "
        "seo-memory before recommending SEO changes. Never modify GA4 settings."
    ),
)

Preset = Literal["7d", "28d", "90d", "custom"]


def _json(payload: Any) -> str:
    if isinstance(payload, dict):
        payload = redact_secrets_from_dict(payload)
    return json.dumps(payload, indent=2, default=str)


@mcp.tool()
def auth_status() -> str:
    """Check whether GA4 OAuth credentials/token and property ID are ready (never returns secrets)."""
    return _json(describe_auth_state())


@mcp.tool()
def get_traffic_overview(
    preset: Preset = "28d",
    start_date: str = "",
    end_date: str = "",
) -> str:
    """
    GA4 traffic overview: users, sessions, engaged sessions, engagement rate,
    average engagement time, bounce rate.

    Args:
        preset: last 7d / 28d / 90d, or custom
        start_date: YYYY-MM-DD when preset=custom
        end_date: YYYY-MM-DD when preset=custom
    """
    return _json(build_traffic_overview(preset=preset, start_date=start_date, end_date=end_date))


@mcp.tool()
def get_landing_page_performance(
    url: str,
    preset: Preset = "28d",
    start_date: str = "",
    end_date: str = "",
    match: Literal["equals", "contains"] = "equals",
) -> str:
    """
    Performance for a landing page URL/path: sessions, users, engagement,
    conversions, conversion rate, revenue/events when available.

    Args:
        url: Full URL or path (e.g. https://www.locumcareerhub.com/tools or /tools)
        preset: 7d | 28d | 90d | custom
        start_date / end_date: required when preset=custom
        match: equals (exact landing page) or contains (substring)
    """
    return _json(
        build_landing_page_performance(
            url=url,
            preset=preset,
            start_date=start_date,
            end_date=end_date,
            match=match,
        )
    )


@mcp.tool()
def get_conversion_data(
    preset: Preset = "28d",
    start_date: str = "",
    end_date: str = "",
    row_limit: int = 25,
) -> str:
    """
    Conversion overview: totals, rate, top converting pages, channel mix,
    and organic conversion performance.
    """
    return _json(
        build_conversion_data(
            preset=preset,
            start_date=start_date,
            end_date=end_date,
            row_limit=row_limit,
        )
    )


@mcp.tool()
def compare_periods(
    preset: Preset = "28d",
    start_date: str = "",
    end_date: str = "",
    row_limit: int = 25,
) -> str:
    """
    Compare current period vs previous equal-length period for traffic,
    engagement, conversions, plus biggest landing-page winners/losers.
    """
    return _json(
        build_compare_periods(
            preset=preset,
            start_date=start_date,
            end_date=end_date,
            row_limit=row_limit,
        )
    )


@mcp.tool()
def get_organic_search_performance(
    preset: Preset = "28d",
    start_date: str = "",
    end_date: str = "",
    row_limit: int = 50,
) -> str:
    """Organic Search only: landing pages with users, sessions, engagement, conversions."""
    return _json(
        build_organic_search_performance(
            preset=preset,
            start_date=start_date,
            end_date=end_date,
            row_limit=row_limit,
        )
    )


@mcp.tool()
def seo_business_impact_report(
    preset: Preset = "28d",
    start_date: str = "",
    end_date: str = "",
    row_limit: int = 25,
    gsc_pages_json: str = "",
) -> str:
    """
    SEO ROI analysis combining GA4 organic performance with optional GSC page metrics.

    Args:
        preset / start_date / end_date: GA4 window
        row_limit: max opportunities to return
        gsc_pages_json: Optional JSON string:
            {"pages":[{"page":"https://...","clicks":1,"impressions":100,"ctr":1.0,"position":8.0}]}
            Populate from GSC MCP get_search_analytics (dimensions=page) when available.
    """
    gsc_snapshot = None
    if gsc_pages_json.strip():
        gsc_snapshot = json.loads(gsc_pages_json)
    report = build_seo_business_impact_report(
        gsc_snapshot=gsc_snapshot,
        preset=preset,
        start_date=start_date,
        end_date=end_date,
        row_limit=row_limit,
    )
    report["property_id"] = property_id()
    report["property_label"] = property_label()
    return _json(report)


def main() -> None:
    mcp.run(transport="stdio")


if __name__ == "__main__":
    main()
