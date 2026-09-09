"""OAuth 2.0 (Desktop) auth for Google Analytics Data API — readonly scope only."""

from __future__ import annotations

import os
from pathlib import Path

from dotenv import load_dotenv
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow

# Read-only Analytics access — never request edit scopes.
SCOPES = ["https://www.googleapis.com/auth/analytics.readonly"]

PACKAGE_ROOT = Path(__file__).resolve().parent


def _load_env() -> None:
    load_dotenv(PACKAGE_ROOT / ".env")
    load_dotenv()


def credentials_path() -> Path:
    _load_env()
    raw = os.getenv("GA4_CREDENTIALS_PATH", "./credentials/credentials.json")
    path = Path(raw)
    if not path.is_absolute():
        path = (PACKAGE_ROOT / path).resolve()
    return path


def token_path() -> Path:
    _load_env()
    raw = os.getenv("GA4_TOKEN_PATH", "./credentials/token.json")
    path = Path(raw)
    if not path.is_absolute():
        path = (PACKAGE_ROOT / path).resolve()
    return path


def property_id() -> str:
    _load_env()
    raw = os.getenv("GA4_PROPERTY_ID", "").strip()
    raw = raw.replace("properties/", "")
    if not raw.isdigit() or raw == "0" or set(raw) == {"0"}:
        raise RuntimeError(
            "GA4_PROPERTY_ID must be set to your numeric GA4 Property ID "
            "(Admin → Property settings). Example: 123456789"
        )
    return raw


def property_resource() -> str:
    return f"properties/{property_id()}"


def property_label() -> str:
    _load_env()
    return os.getenv("GA4_PROPERTY_LABEL", "GA4 property").strip()


def conversion_events() -> list[str]:
    _load_env()
    raw = os.getenv(
        "GA4_CONVERSION_EVENTS",
        "generate_lead,booking_link_click,viral_share",
    )
    return [e.strip() for e in raw.split(",") if e.strip()]


def default_host() -> str:
    _load_env()
    return os.getenv("GA4_DEFAULT_HOST", "www.locumcareerhub.com").strip()


def get_credentials(*, interactive: bool = False) -> Credentials:
    """
    Load or refresh OAuth credentials.

    interactive=True opens a browser for first-time consent (scripts/auth_setup.py).
    interactive=False is used by the MCP server (requires existing token.json).
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
            "GA4 OAuth token missing or invalid. Run once:\n"
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
    creds = flow.run_local_server(port=0, prompt="consent", access_type="offline")
    token_file.parent.mkdir(parents=True, exist_ok=True)
    token_file.write_text(creds.to_json(), encoding="utf-8")
    return creds


def describe_auth_state() -> dict:
    """Safe status for debugging (never returns token values)."""
    cred_file = credentials_path()
    tok_file = token_path()
    has_token = tok_file.exists()
    valid = False
    expired = None
    has_refresh = False
    prop = None
    prop_error = None
    try:
        prop = property_id()
    except Exception as exc:  # noqa: BLE001
        prop_error = str(exc)

    if has_token:
        try:
            creds = Credentials.from_authorized_user_file(str(tok_file), SCOPES)
            valid = bool(creds.valid)
            expired = bool(creds.expired)
            has_refresh = bool(creds.refresh_token)
        except Exception as exc:  # noqa: BLE001
            return {
                "credentials_file_exists": cred_file.exists(),
                "token_file_exists": True,
                "token_parse_error": str(exc),
                "scopes": SCOPES,
                "property_id": prop,
                "property_error": prop_error,
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
        "property_id": prop,
        "property_label": property_label() if prop else None,
        "property_error": prop_error,
        "conversion_events": conversion_events(),
    }


def redact_secrets_from_dict(payload: dict) -> dict:
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
