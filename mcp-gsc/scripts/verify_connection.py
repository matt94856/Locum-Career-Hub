"""Verify GSC auth without printing secrets."""
from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src"
if str(SRC) not in sys.path:
    sys.path.insert(0, str(SRC))

from gsc_mcp.auth import default_site_url, describe_auth_state, get_credentials  # noqa: E402
from gsc_mcp.client import list_sites, normalize_site_url  # noqa: E402


def main() -> int:
    state = describe_auth_state()
    for key in (
        "credentials_file_exists",
        "token_file_exists",
        "token_valid",
        "has_refresh_token",
        "default_site_url",
        "scopes",
    ):
        print(f"{key}={state.get(key)}")

    get_credentials(interactive=False)
    sites = list_sites()
    print(f"site_count={len(sites)}")
    for entry in sites:
        print(f"site={entry.get('siteUrl')} permission={entry.get('permissionLevel')}")

    default = normalize_site_url(default_site_url())
    matched = any(entry.get("siteUrl") == default for entry in sites) or any(
        default.rstrip("/") in (entry.get("siteUrl") or "") for entry in sites
    )
    print(f"default_site={default}")
    print(f"default_matched={matched}")
    return 0 if sites and state.get("token_valid") else 1


if __name__ == "__main__":
    raise SystemExit(main())
