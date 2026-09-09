"""OAuth 2.0 (Desktop) auth for Google Search Console — readonly scope only."""

from __future__ import annotations

import json
import os
from pathlib import Path

from dotenv import load_dotenv
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow

# Read-only Search Console access — never request write scopes.
SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]

PACKAGE_ROOT = Path(__file__).resolve().parents[2]  # mcp-gsc/


def _load_env() -> None:
    load_dotenv(PACKAGE_ROOT / ".env")
    load_dotenv()  # also allow process cwd / user env


def credentials_path() -> Path:
    _load_env()
    raw = os.getenv("GSC_CREDENTIALS_PATH", "./credentials/credentials.json")
    path = Path(raw)
    if not path.is_absolute():
        path = (PACKAGE_ROOT / path).resolve()
    return path


def token_path() -> Path:
    _load_env()
    raw = os.getenv("GSC_TOKEN_PATH", "./credentials/token.json")
    path = Path(raw)
    if not path.is_absolute():
        path = (PACKAGE_ROOT / path).resolve()
    return path


def default_site_url() -> str:
    _load_env()
    return os.getenv("GSC_DEFAULT_SITE_URL", "https://www.locumcareerhub.com/").strip()


def get_credentials(*, interactive: bool = False) -> Credentials:
    """
    Load or refresh OAuth credentials.

    interactive=True opens a local browser for first-time consent (auth_setup.py).
    interactive=False is used by the MCP server (must already have token.json).
    """
    creds: Credentials | None = None
    token_file = token_path()
    cred_file = credentials_path()

    if token_file.exists():
        creds = Credentials.from_authorized_user_file(str(token_file), SCOPES)

    if creds and creds.valid:
        return creds

    if creds and creds.expired and creds.refresh_token:
        creds.refresh(Request())
        token_file.parent.mkdir(parents=True, exist_ok=True)
        token_file.write_text(creds.to_json(), encoding="utf-8")
        return creds

    if not interactive:
        raise RuntimeError(
            "GSC OAuth token missing or invalid. Run once:\n"
            f"  cd {PACKAGE_ROOT}\n"
            "  .\\.venv\\Scripts\\python scripts\\auth_setup.py\n"
            f"Expected credentials at: {cred_file}\n"
            f"Expected token at: {token_file}"
        )

    if not cred_file.exists():
        raise FileNotFoundError(
            f"Missing OAuth client file: {cred_file}\n"
            "Download Desktop OAuth client JSON from Google Cloud Console "
            "and save it as credentials/credentials.json (see README)."
        )

    flow = InstalledAppFlow.from_client_secrets_file(str(cred_file), SCOPES)
    # Localhost loopback — required for Desktop OAuth clients.
    creds = flow.run_local_server(port=0, prompt="consent", access_type="offline")
    token_file.parent.mkdir(parents=True, exist_ok=True)
    token_file.write_text(creds.to_json(), encoding="utf-8")
    return creds


def revoke_local_token() -> bool:
    """Delete local token.json. Revoke app access in Google Account separately."""
    path = token_path()
    if path.exists():
        path.unlink()
        return True
    return False


def describe_auth_state() -> dict:
    """Safe status for debugging (never returns token values)."""
    cred_file = credentials_path()
    tok_file = token_path()
    has_token = tok_file.exists()
    valid = False
    expired = None
    has_refresh = False
    if has_token:
        try:
            creds = Credentials.from_authorized_user_file(str(tok_file), SCOPES)
            valid = bool(creds.valid)
            expired = bool(creds.expired)
            has_refresh = bool(creds.refresh_token)
        except Exception as exc:  # noqa: BLE001 — status helper
            return {
                "credentials_file_exists": cred_file.exists(),
                "token_file_exists": True,
                "token_parse_error": str(exc),
                "scopes": SCOPES,
            }
    return {
        "credentials_file_exists": cred_file.exists(),
        "credentials_path": str(cred_file),
        "token_file_exists": has_token,
        "token_path": str(tok_file),
        "token_valid": valid,
        "token_expired": expired,
        "has_refresh_token": has_refresh,
        "scopes": SCOPES,
        "default_site_url": default_site_url(),
    }


def redact_secrets_from_dict(payload: dict) -> dict:
    """Defensive helper — never echo OAuth material in tool responses."""
    blocked = {"token", "access_token", "refresh_token", "client_secret", "credentials"}
    out = {}
    for key, value in payload.items():
        if key.lower() in blocked:
            out[key] = "[redacted]"
        elif isinstance(value, dict):
            out[key] = redact_secrets_from_dict(value)
        else:
            out[key] = value
    return out


def assert_no_secrets_in_text(text: str) -> None:
    """Best-effort guard against accidentally returning token JSON."""
    lowered = text.lower()
    if "refresh_token" in lowered or '"token"' in lowered and "ya29." in text:
        raise RuntimeError("Refusing to return content that looks like OAuth secrets.")
