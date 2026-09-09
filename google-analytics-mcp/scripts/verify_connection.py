"""Verify GA4 OAuth + property access with a tiny report."""

from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from auth import describe_auth_state  # noqa: E402
from tools.traffic import get_traffic_overview  # noqa: E402


def main() -> int:
    status = describe_auth_state()
    print("auth_status:")
    for k, v in status.items():
        print(f"  {k}={v}")
    if not status.get("token_valid"):
        print("FAIL: token not valid — run scripts/auth_setup.py")
        return 1
    if status.get("property_error"):
        print(f"FAIL: {status['property_error']}")
        return 1
    overview = get_traffic_overview(preset="7d")
    print("traffic_overview_7d:")
    print(f"  users={overview.get('users')} sessions={overview.get('sessions')}")
    print(f"  engagement_rate={overview.get('engagement_rate')}%")
    print("OK")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
