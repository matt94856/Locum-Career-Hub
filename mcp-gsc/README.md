# Google Search Console MCP Server (local, read-only)

Local [Model Context Protocol](https://modelcontextprotocol.io/) server that connects **Cursor** to your **Google Search Console** account using the official Search Console API and **OAuth 2.0 Desktop** credentials.

- Runs on your machine (stdio)
- Read-only scope: `https://www.googleapis.com/auth/webmasters.readonly`
- Credentials stay in `mcp-gsc/credentials/` (gitignored)
- Designed so Cursor can act as your long-term SEO agent

## What you get

| MCP tool | Purpose |
|---|---|
| `get_search_analytics` | Clicks, impressions, CTR, position + top queries/pages |
| `get_top_opportunities` | Low-CTR keywords, positions 5–20, declining / losing pages |
| `get_page_performance` | Per-URL metrics + ranking keywords |
| `compare_periods` | Last 28d vs prior 28d and/or last 3m vs prior 3m |
| `seo_audit_report` | Prioritized recommendations, title/meta, internal links |
| `list_gsc_sites` | Properties your account can access |
| `auth_status` | Safe auth diagnostics (no secrets) |

## Folder structure

```
mcp-gsc/
  README.md                 ← this file
  .env.example              ← copy to .env
  .gitignore
  requirements.txt
  pyproject.toml
  credentials/              ← put credentials.json here (gitignored)
    .gitkeep
  scripts/
    auth_setup.py           ← one-time browser OAuth
    revoke_local_token.py   ← delete local token.json
  src/gsc_mcp/
    __init__.py
    __main__.py             ← python -m gsc_mcp
    server.py               ← MCP tools
    auth.py                 ← OAuth load/refresh (readonly)
    client.py               ← Search Console API wrappers
    analytics.py
    opportunities.py
    page_performance.py
    compare.py
    audit.py

.cursor/
  mcp.json                  ← Cursor project MCP config
  rules/
    seo-agent.mdc           ← always-on SEO agent rule
    seo-agent.md
```

---

## 1) Prerequisites (Windows)

1. **Python 3.10+** installed (`python --version`)
2. A Google account that owns / has access to your Search Console property
3. Cursor installed
4. This repo opened as the Cursor workspace (`MPLT Health`)

---

## 2) Google Cloud setup (step-by-step)

### A. Create a Google Cloud project

1. Open [Google Cloud Console](https://console.cloud.google.com/)
2. Click the project picker → **New Project**
3. Name it e.g. `Locum Career Hub GSC MCP`
4. Create and select the project

### B. Enable the Search Console API

1. Go to **APIs & Services → Library**
2. Search for **Google Search Console API**
3. Open it → click **Enable**

> API id is often listed as `searchconsole.googleapis.com`.

### C. Configure the OAuth consent screen

1. Go to **APIs & Services → OAuth consent screen**
2. Choose **External** (unless you use Google Workspace internal)
3. App name: e.g. `Local GSC MCP`
4. User support email: your email
5. Developer contact: your email
6. Save
7. Under **Scopes**, click **Add or remove scopes**
8. Add: `https://www.googleapis.com/auth/webmasters.readonly`
9. Save
10. Under **Test users** (while app is in Testing), add **your Google account email**
11. Save

### D. Create OAuth Desktop credentials

1. Go to **APIs & Services → Credentials**
2. **Create Credentials → OAuth client ID**
3. Application type: **Desktop app**
4. Name: `Cursor GSC MCP Desktop`
5. Create
6. Click **Download JSON**

### E. Save credentials locally

1. Rename the downloaded file to `credentials.json`
2. Place it here:

```
C:\Users\matt9\Desktop\MPLT Health\mcp-gsc\credentials\credentials.json
```

3. Do **not** commit this file (already gitignored)

### F. Connect / confirm Search Console property

1. Open [Google Search Console](https://search.google.com/search-console)
2. Confirm your property exists, e.g.:
   - URL-prefix: `https://www.locumcareerhub.com/`
   - or Domain: `sc-domain:locumcareerhub.com`
3. Your Google account must have at least **Restricted** / **Full** access to that property
4. Copy the **exact** `siteUrl` string — you will put it in `.env`

---

## 3) Install the MCP server (Windows PowerShell)

```powershell
cd "C:\Users\matt9\Desktop\MPLT Health\mcp-gsc"

# Create virtualenv
python -m venv .venv

# Activate
.\.venv\Scripts\Activate.ps1

# If activation is blocked by execution policy (once):
# Set-ExecutionPolicy -Scope CurrentUser RemoteSigned

# Install package + deps
python -m pip install --upgrade pip
pip install -e .

# Configure env
Copy-Item .env.example .env
notepad .env
```

Edit `.env` so `GSC_DEFAULT_SITE_URL` matches your GSC property **exactly**, for example:

```env
GSC_DEFAULT_SITE_URL=https://www.locumcareerhub.com/
```

### One-time OAuth login

```powershell
cd "C:\Users\matt9\Desktop\MPLT Health\mcp-gsc"
.\.venv\Scripts\Activate.ps1
python scripts\auth_setup.py
```

What happens:

1. Browser opens Google login / consent
2. Approve **read-only** Search Console access
3. `credentials/token.json` is written locally
4. Script lists properties your account can see

If you see a Google “app isn’t verified” warning while the consent screen is in Testing: choose **Advanced → Go to … (unsafe)** — expected for personal Desktop OAuth apps.

---

## 4) Cursor setup (Windows)

### Where the MCP config lives

Project config (already created for this repo):

```
C:\Users\matt9\Desktop\MPLT Health\.cursor\mcp.json
```

Contents point Cursor at the local venv:

```json
{
  "mcpServers": {
    "gsc-seo": {
      "type": "stdio",
      "command": "cmd",
      "args": [
        "/c",
        "C:\\Users\\matt9\\Desktop\\MPLT Health\\mcp-gsc\\.venv\\Scripts\\python.exe",
        "-m",
        "gsc_mcp"
      ],
      "cwd": "C:\\Users\\matt9\\Desktop\\MPLT Health\\mcp-gsc",
      "env": {
        "PYTHONUNBUFFERED": "1"
      },
      "envFile": "C:\\Users\\matt9\\Desktop\\MPLT Health\\mcp-gsc\\.env"
    }
  }
}
```

**Windows note:** Do not put a path with spaces (e.g. `MPLT Health`) in `command` — Cursor can split on the space and fail to spawn. Use `cmd` + `/c` as above so the Python path stays in `args`.

Optional global config (all projects):

```
%USERPROFILE%\.cursor\mcp.json
```

Prefer the **project** file for this repo.

### SEO agent rule

Already created:

- `.cursor/rules/seo-agent.mdc` (always apply)
- `.cursor/rules/seo-agent.md`

### Restart Cursor

1. Fully quit Cursor (**File → Exit**, or tray Quit)
2. Re-open the `MPLT Health` folder
3. Open **Settings → MCP** (or Cursor Settings → Features → MCP)
4. Confirm server `gsc-seo` shows as connected / tools available

### Verify it works

In a new Agent chat, ask:

> Use the gsc-seo MCP `auth_status` and `list_gsc_sites` tools.

Then:

> Audit my website SEO using Search Console data.

You should see tool calls to `seo_audit_report`, `compare_periods`, and related tools — not generic SEO advice alone.

---

## 5) Security

### Protected by design

- Scope is **read-only** (`webmasters.readonly`) — no sitemap edits, no setting changes
- Tokens never printed by tools (`auth_status` redacts secrets)
- `credentials/`, `token.json`, `.env` are gitignored

### Never commit

- `mcp-gsc/credentials/credentials.json`
- `mcp-gsc/credentials/token.json`
- `mcp-gsc/.env`

### How to revoke access

1. Delete local token:

```powershell
cd "C:\Users\matt9\Desktop\MPLT Health\mcp-gsc"
.\.venv\Scripts\Activate.ps1
python scripts\revoke_local_token.py
```

2. Revoke the app in Google Account:

[https://myaccount.google.com/permissions](https://myaccount.google.com/permissions)

Find your OAuth app / Cloud project → **Remove access**

3. Optionally delete the OAuth client in Google Cloud → Credentials

---

## 6) Troubleshooting

| Symptom | Fix |
|---|---|
| `Missing OAuth client file` | Put Desktop client JSON at `mcp-gsc/credentials/credentials.json` |
| `token missing or invalid` | Re-run `python scripts\auth_setup.py` |
| MCP server won’t start | Confirm `.venv` exists and `pip install -e .` succeeded |
| Empty analytics | Wrong `GSC_DEFAULT_SITE_URL` — must match GSC `siteUrl` exactly |
| `accessNotConfigured` | Enable Search Console API on the Cloud project |
| Consent screen blocked | Add yourself as Test user; keep app in Testing for personal use |
| Cursor shows no tools | Restart Cursor; check Customize → MCPs + Output → MCP Logs; ensure `command` is `cmd` (not a spaced Python path) |

---

## 7) Development notes

- GSC “final” data lags ~2–3 days; date windows end accordingly
- CTR is returned as a **percentage** (0–100)
- Lower average position is better
- Server transport: **stdio** only (local Cursor subprocess)

Run manually (for debug; Cursor normally manages this):

```powershell
cd "C:\Users\matt9\Desktop\MPLT Health\mcp-gsc"
.\.venv\Scripts\python.exe -m gsc_mcp
```

(This waits on stdin — expected for MCP.)
