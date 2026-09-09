"""Google Search Console MCP server (read-only, local stdio)."""

from __future__ import annotations

import json
from typing import Any, Literal, Optional

from mcp.server.fastmcp import FastMCP

from .analytics import get_search_analytics_report
from .audit import seo_audit_report as build_seo_audit
from .auth import describe_auth_state, redact_secrets_from_dict
from .client import list_sites, normalize_site_url
from .compare import compare_both_windows
from .compare import compare_periods as build_period_comparison
from .opportunities import get_top_opportunities
from .page_performance import get_page_performance as build_page_performance

mcp = FastMCP(
    "gsc-seo",
    instructions=(
        "Read-only Google Search Console tools for SEO analysis. "
        "Always call these tools before recommending SEO changes. "
        "Never attempt to modify Search Console settings or sitemap submissions."
    ),
)


def _json(payload: Any) -> str:
    """Serialize tool results as JSON text (never include OAuth secrets)."""
    if isinstance(payload, dict):
        payload = redact_secrets_from_dict(payload)
    text = json.dumps(payload, indent=2, default=str)
    return text


@mcp.tool()
def auth_status() -> str:
    """Check whether GSC OAuth credentials/token are present (never returns secrets)."""
    return _json(describe_auth_state())


@mcp.tool()
def list_gsc_sites() -> str:
    """List Search Console properties the authorized account can access (read-only)."""
    sites = list_sites()
    return _json({"sites": sites, "count": len(sites)})


@mcp.tool()
def get_search_analytics(
    site_url: Optional[str] = None,
    start_date: str = "",
    end_date: str = "",
    dimensions: Optional[str] = "query",
    row_limit: int = 25,
) -> str:
    """
    Query Google Search Console search analytics (read-only).

    Args:
        site_url: GSC property URL (defaults to GSC_DEFAULT_SITE_URL). Example: https://www.locumcareerhub.com/
        start_date: Start date YYYY-MM-DD
        end_date: End date YYYY-MM-DD
        dimensions: Comma-separated: query, page, country, device, date
        row_limit: Max rows (1–25000, default 25)

    Returns clicks, impressions, CTR (%), average position, top queries, and top pages.
    """
    if not start_date or not end_date:
        raise ValueError("start_date and end_date are required (YYYY-MM-DD)")
    dims = [d.strip() for d in (dimensions or "query").split(",") if d.strip()]
    report = get_search_analytics_report(
        site_url=site_url,
        start_date=start_date,
        end_date=end_date,
        dimensions=dims,
        row_limit=row_limit,
    )
    return _json(report)


@mcp.tool()
def get_top_opportunities(
    site_url: Optional[str] = None,
    days: int = 28,
    row_limit: int = 100,
    min_impressions: int = 50,
    max_ctr_percent: float = 2.0,
) -> str:
    """
    Find SEO opportunities from Search Console: high-impression/low-CTR queries,
    pages ranking positions 5–20, declining pages, and pages losing clicks.

    Args:
        site_url: GSC property URL (optional; uses default)
        days: Lookback window ending ~3 days ago (GSC final data lag)
        row_limit: Max rows to pull per dimension query
        min_impressions: Minimum impressions for low-CTR opportunity filter
        max_ctr_percent: Max CTR (%) to count as low CTR
    """
    report = get_top_opportunities(
        site_url=site_url,
        days=days,
        row_limit=row_limit,
        min_impressions=min_impressions,
        max_ctr_percent=max_ctr_percent,
    )
    return _json(report)


@mcp.tool()
def get_page_performance(
    page_url: str,
    site_url: Optional[str] = None,
    days: int = 28,
    query_limit: int = 50,
    match: Literal["equals", "contains"] = "equals",
) -> str:
    """
    Performance for a single page URL: clicks, impressions, CTR, position, ranking keywords.

    Args:
        page_url: Exact page URL as shown in GSC (or substring if match=contains)
        site_url: GSC property URL (optional)
        days: Lookback window
        query_limit: Max ranking queries to return
        match: 'equals' for exact URL match, 'contains' for path substring
    """
    report = build_page_performance(
        page_url=page_url,
        site_url=site_url,
        days=days,
        query_limit=query_limit,
        match=match,
    )
    return _json(report)


@mcp.tool()
def compare_periods(
    site_url: Optional[str] = None,
    kind: Literal["28d", "3m", "both"] = "both",
    row_limit: int = 75,
) -> str:
    """
    Compare traffic and keyword/page changes across periods.

    Args:
        site_url: GSC property URL (optional)
        kind: '28d' (last 28 vs previous 28), '3m' (last 90 vs previous 90), or 'both'
        row_limit: Max rows for winners/losers

    Returns traffic deltas, keyword winners/losers, and page winners/losers.
    """
    if kind == "both":
        report = compare_both_windows(site_url=site_url, row_limit=row_limit)
    else:
        report = build_period_comparison(site_url=site_url, kind=kind, row_limit=row_limit)
    return _json(report)


@mcp.tool()
def seo_audit_report(
    site_url: Optional[str] = None,
    days: int = 28,
) -> str:
    """
    Generate a prioritized SEO audit from live Search Console data:
    recommendations, pages to update, title/meta suggestions, and internal linking ideas.

    Args:
        site_url: GSC property URL (optional; defaults to configured site)
        days: Lookback window for opportunity detection
    """
    # Resolve default early so the report shows the concrete property.
    resolved = normalize_site_url(site_url)
    report = build_seo_audit(site_url=resolved, days=days)
    return _json(report)


def main() -> None:
    mcp.run(transport="stdio")


if __name__ == "__main__":
    main()
