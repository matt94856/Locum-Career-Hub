"""
Revoke local OAuth token (does not call Google revoke unless you also remove app access).

Usage:
  python scripts\\revoke_local_token.py
"""

from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src"
if str(SRC) not in sys.path:
    sys.path.insert(0, str(SRC))

from gsc_mcp.auth import revoke_local_token, token_path  # noqa: E402


def main() -> int:
    path = token_path()
    removed = revoke_local_token()
    if removed:
        print(f"Deleted local token: {path}")
    else:
        print(f"No local token found at: {path}")
    print(
        "Also revoke app access in Google Account:\n"
        "  https://myaccount.google.com/permissions\n"
        "Find your OAuth client / project and remove access."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
