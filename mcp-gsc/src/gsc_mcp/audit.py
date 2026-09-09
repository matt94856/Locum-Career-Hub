"""Prioritized SEO audit recommendations from live GSC data."""

from __future__ import annotations

from typing import Any
from urllib.parse import urlparse

from .compare import compare_periods
from .opportunities import get_top_opportunities


def _slug_from_url(url: str) -> str:
    path = urlparse(url).path.strip("/") or "homepage"
    return path.replace("/", " ").replace("-", " ")


def _title_suggestion(page: str, top_query: str | None, ctr: float, position: float) -> str:
    topic = (top_query or _slug_from_url(page)).strip()
    topic = topic[:55]
    if position <= 10 and ctr < 2:
        return f"{topic.title()} (2026) | Clear Next Step | Locum Career Hub"
    if 5 <= position <= 20:
        return f"{topic.title()} for Cardiologists | Locum Career Hub"
    return f"{topic.title()} | Cardiologist Locums | Locum Career Hub"


def _meta_suggestion(page: str, impressions: float, ctr: float) -> str:
    topic = _slug_from_url(page)
    return (
        f"Practical guidance on {topic} for MD/DO cardiologists. "
        f"Transparent locums expectations and free decision tools. "
        f"Currently ~{int(impressions)} impressions at {ctr:.2f}% CTR — sharpen the promise in the first 120 characters."
    )[:155]


def seo_audit_report(
    *,
    site_url: str | None = None,
    days: int = 28,
) -> dict[str, Any]:
    opps = get_top_opportunities(site_url=site_url, days=days, row_limit=150)
    comparison = compare_periods(site_url=site_url, kind="28d", row_limit=100)

    pages_to_update: list[dict[str, Any]] = []
    seen: set[str] = set()

    for row in opps["pages_ranking_positions_5_to_20"][:15]:
        page = row["page"]
        if page in seen:
            continue
        seen.add(page)
        pages_to_update.append(
            {
                "page": page,
                "reason": "mid_pack_rank",
                "impressions": row["impressions"],
                "clicks": row["clicks"],
                "ctr": row["ctr"],
                "position": row["position"],
                "title_suggestion": _title_suggestion(page, None, row["ctr"], row["position"]),
                "meta_suggestion": _meta_suggestion(page, row["impressions"], row["ctr"]),
                "internal_linking": [
                    f"Add contextual links from related cardiology hubs to `{page}` using descriptive anchors.",
                    "Link from `/tools` and the earnings calculator when topical.",
                    "Add a reciprocal link back to `/locum-tenens-jobs` or specialty hub.",
                ],
            }
        )

    for row in opps["pages_losing_clicks"][:10]:
        page = row["page"]
        if page in seen:
            continue
        seen.add(page)
        pages_to_update.append(
            {
                "page": page,
                "reason": "losing_clicks",
                "clicks_delta": row["clicks_delta"],
                "impressions_delta": row["impressions_delta"],
                "title_suggestion": _title_suggestion(page, None, 0, row.get("position_current") or 20),
                "meta_suggestion": _meta_suggestion(page, row.get("impressions_current") or 0, 0),
                "internal_linking": [
                    f"Re-surface `{page}` from high-traffic parents that still rank.",
                    "Refresh the direct-answer block and FAQs for AI + SERP snippets.",
                ],
            }
        )

    query_title_ops = []
    for row in opps["high_impression_low_ctr_queries"][:20]:
        query_title_ops.append(
            {
                "query": row["query"],
                "impressions": row["impressions"],
                "ctr": row["ctr"],
                "position": row["position"],
                "recommendation": (
                    f"Find the page ranking for “{row['query']}” and rewrite title/meta to mirror the query intent. "
                    f"Target CTR uplift from {row['ctr']}% toward 2–5%+ depending on position {row['position']}."
                ),
                "title_pattern": f"{row['query'].title()} | Locum Career Hub",
            }
        )

    prioritized = opps["priority_actions"][:25]

    return {
        "site_url": site_url,
        "generated_from": {
            "opportunities_period": opps["period"],
            "comparison_period": comparison["periods"],
        },
        "executive_summary": {
            "traffic_clicks_pct_change": comparison["traffic_changes"]["clicks"]["pct_change"],
            "traffic_impressions_pct_change": comparison["traffic_changes"]["impressions"]["pct_change"],
            "top_issue_count": {
                "low_ctr_queries": len(opps["high_impression_low_ctr_queries"]),
                "mid_pack_pages": len(opps["pages_ranking_positions_5_to_20"]),
                "pages_losing_clicks": len(opps["pages_losing_clicks"]),
            },
        },
        "prioritized_recommendations": prioritized,
        "pages_to_update": pages_to_update,
        "title_meta_suggestions": query_title_ops,
        "internal_linking_opportunities": [
            {
                "from": "/cardiologist-locums-calculator",
                "to_candidates": [p["page"] for p in pages_to_update[:5]],
                "anchor_ideas": ["cardiologist locums pay", "state locum jobs", "IMLC eligibility"],
            },
            {
                "from": "/locum-tenens-jobs",
                "to_candidates": [p["page"] for p in pages_to_update if "/locum-tenens-jobs/" in p["page"]][:8],
                "anchor_ideas": ["cardiologist locums in {state}", "specialty coverage"],
            },
            {
                "from": "/tools",
                "to_candidates": [p["page"] for p in pages_to_update if "/tools/" in p["page"]][:8],
                "anchor_ideas": ["decision tool", "calculator"],
            },
        ],
        "tracking": {
            "recheck_with": [
                "compare_periods kind=28d after metadata deploys (allow 7–14 days)",
                "get_page_performance on each updated URL",
                "get_top_opportunities to confirm CTR and mid-pack movement",
            ]
        },
        "raw_signals": {
            "high_impression_low_ctr_queries_sample": opps["high_impression_low_ctr_queries"][:15],
            "mid_pack_pages_sample": opps["pages_ranking_positions_5_to_20"][:15],
            "biggest_page_losers": comparison["page_changes"]["biggest_losers"][:10],
            "biggest_page_winners": comparison["page_changes"]["biggest_winners"][:10],
        },
    }
