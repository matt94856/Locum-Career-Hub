"""One-time OAuth setup for Google Analytics Data API (Desktop client)."""

from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from auth import describe_auth_state, get_credentials, property_id  # noqa: E402


def main() -> int:
    print("GA4 MCP — OAuth setup (analytics.readonly)")
    print("Opening browser for Google consent…")
    get_credentials(interactive=True)
    try:
        prop = property_id()
    except Exception as exc:  # noqa: BLE001
        print(f"Token saved, but GA4_PROPERTY_ID is not set yet: {exc}")
        print("Edit google-analytics-mcp/.env and set GA4_PROPERTY_ID, then re-run verify.")
        return 0
    status = describe_auth_state()
    print("Auth complete.")
    print(f"  token_valid={status.get('token_valid')}")
    print(f"  property_id={prop}")
    print(f"  scopes={status.get('scopes')}")
    print("Next: restart Cursor and confirm ga4-analytics MCP is connected.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
