"""
One-time interactive OAuth setup for Google Search Console (read-only).

Usage (Windows PowerShell):
  cd mcp-gsc
  .\\.venv\\Scripts\\Activate.ps1
  python scripts\\auth_setup.py
"""

from __future__ import annotations

import sys
from pathlib import Path

# Allow running without installing the package when PYTHONPATH includes src/
ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src"
if str(SRC) not in sys.path:
    sys.path.insert(0, str(SRC))

from gsc_mcp.auth import describe_auth_state, get_credentials  # noqa: E402
from gsc_mcp.client import list_sites, normalize_site_url  # noqa: E402
from gsc_mcp.auth import default_site_url  # noqa: E402


def main() -> int:
    print("=== Google Search Console OAuth setup (read-only) ===\n")
    before = describe_auth_state()
    print(f"Credentials file: {before['credentials_path']} (exists={before['credentials_file_exists']})")
    print(f"Token file:       {before['token_path']} (exists={before['token_file_exists']})")
    print(f"Default site:     {before['default_site_url']}")
    print(f"Scopes:           {before['scopes']}\n")

    if not before["credentials_file_exists"]:
        print("ERROR: credentials.json not found.")
        print("1. Create a Desktop OAuth client in Google Cloud Console")
        print("2. Download the JSON")
        print(f"3. Save it to: {before['credentials_path']}")
        print("See mcp-gsc/README.md for full steps.")
        return 1

    print("Opening browser for Google consent (webmasters.readonly only)...")
    get_credentials(interactive=True)
    after = describe_auth_state()
    print("\nToken saved successfully (token values are never printed).")
    print(f"token_valid={after.get('token_valid')} has_refresh_token={after.get('has_refresh_token')}")

    print("\nVerifying API access — listing properties...")
    sites = list_sites()
    if not sites:
        print("WARNING: No Search Console properties returned for this Google account.")
        print("Add/verify your property in https://search.google.com/search-console")
        return 2

    print(f"Found {len(sites)} property(ies):")
    for entry in sites:
        print(f"  - {entry.get('siteUrl')}  (permission={entry.get('permissionLevel')})")

    default = normalize_site_url(default_site_url())
    matched = any(entry.get("siteUrl") == default for entry in sites)
    # Domain properties won't match URL-prefix formatting
    matched = matched or any(default.rstrip("/") in (entry.get("siteUrl") or "") for entry in sites)
    if not matched:
        print(f"\nNOTE: Default site `{default}` was not an exact match in the list.")
        print("Update GSC_DEFAULT_SITE_URL in mcp-gsc/.env to match a siteUrl above exactly.")
    else:
        print(f"\nDefault site looks available: {default}")

    print("\nDone. Restart Cursor so the MCP server can load the new token.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
