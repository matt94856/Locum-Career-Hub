# Google Analytics 4 MCP Server (local, read-only)

Local [Model Context Protocol](https://modelcontextprotocol.io/) server that connects **Cursor** to your **GA4 property** via the official **Google Analytics Data API** and **OAuth 2.0 Desktop** credentials.

- Runs on your machine (stdio)
- Read-only scope: `https://www.googleapis.com/auth/analytics.readonly`
- Credentials stay in `google-analytics-mcp/credentials/` (gitignored)
- Designed to pair with **GSC MCP** + **seo-memory** for SEO ROI decisions

## Tools

| MCP tool | Purpose |
|---|---|
| `auth_status` | OAuth + property readiness (no secrets) |
| `get_traffic_overview` | Users, sessions, engagement, bounce (7d/28d/90d/custom) |
| `get_landing_page_performance` | Sessions, engagement, conversions for a URL/path |
| `get_conversion_data` | Conversions, rate, top pages, channels, organic |
| `compare_periods` | Current vs prior period + winners/losers |
| `get_organic_search_performance` | Organic Search landing pages only |
| `seo_business_impact_report` | GA4 organic + optional GSC page metrics → ROI list |

## Folder layout

```
google-analytics-mcp/
├── server.py
├── auth.py
├── client.py
├── tools/
│   ├── traffic.py
│   ├── conversions.py
│   ├── landing_pages.py
│   └── reports.py
├── scripts/
│   ├── auth_setup.py
│   └── verify_connection.py
├── credentials/          ← OAuth files (gitignored)
├── requirements.txt
├── .env.example
├── README.md
└── .gitignore
```

---

## Setup (do this once)

### 1) Google Cloud project

1. Open [Google Cloud Console](https://console.cloud.google.com/)
2. Use the **same project** as Search Console MCP (recommended), or create one (e.g. `Locum Career Hub Analytics`)

### 2) Enable API

**APIs & Services → Library** → enable **Google Analytics Data API**

### 3) OAuth consent + Desktop client

1. **APIs & Services → OAuth consent screen**
   - External (or Internal if Workspace)
   - App name: `Local GA4 MCP`
   - Scope: `https://www.googleapis.com/auth/analytics.readonly`
   - Add yourself as a **Test user** while in Testing
2. **Credentials → Create credentials → OAuth client ID**
   - Application type: **Desktop app**
   - Download JSON → save as:

```
C:\Users\matt9\Desktop\MPLT Health\google-analytics-mcp\credentials\credentials.json
```

### 4) Find your GA4 property ID

1. Open [Google Analytics](https://analytics.google.com/)
2. **Admin → Property settings → Property ID** (numeric, e.g. `123456789`)
3. Copy `.env.example` → `.env` and set:

```
GA4_PROPERTY_ID=123456789
GA4_PROPERTY_LABEL=locumcareerhub.com
GA4_CONVERSION_EVENTS=generate_lead,booking_link_click,viral_share,locums_calculator_lead_success,decision_tool_lead_success
```

Mark `generate_lead` (and other key events) as **Key events** in GA4 Admin so conversion metrics populate cleanly.

### 5) Python venv + login

```powershell
cd "C:\Users\matt9\Desktop\MPLT Health\google-analytics-mcp"
python -m venv .venv
.\.venv\Scripts\pip install -r requirements.txt
copy .env.example .env
# edit .env with your Property ID
.\.venv\Scripts\python scripts\auth_setup.py
.\.venv\Scripts\python scripts\verify_connection.py
```

You must be a GA4 user with at least **Viewer** access on that property.

### 6) Cursor MCP config

Project file (already wired for Windows path-with-spaces):

`C:\Users\matt9\Desktop\MPLT Health\.cursor\mcp.json`

Also add the same `ga4-analytics` block to user config if project MCP does not appear:

`C:\Users\matt9\.cursor\mcp.json`

**Restart Cursor fully** (File → Exit), reopen this folder, then check **Customize → MCPs** for `ga4-analytics` (green/connected).

Windows note: `command` must be `cmd` (not a Python path with spaces in `MPLT Health`).

### 7) Verify in chat

Ask:

> Use the ga4-analytics MCP `auth_status` and `get_traffic_overview` for the last 28 days.

Then:

> Which SEO pages should we improve next? Combine GSC + GA4 + seo-memory.

---

## Security

- Scope is **read-only** (`analytics.readonly`)
- Tokens only in `credentials/token.json` (gitignored)
- Never commit `.env`, `credentials.json`, or `token.json`
- Tools redact secret-looking keys from responses
- Do **not** store OAuth tokens in `seo-memory` SQLite

## SEO agent behavior

Cursor rules now require:

1. GSC MCP (rankings / CTR / impressions)
2. GA4 MCP (sessions / engagement / conversions)
3. `seo-memory` context (prior changes / experiments)

Do not recommend optimizing a page only because it ranks — weigh traffic, engagement, conversions, and business value.

## Troubleshooting

| Symptom | Fix |
|---|---|
| Access blocked / verification | Consent screen Testing + add your Google as Test user |
| `GA4_PROPERTY_ID` error | Set numeric ID in `.env` (no `properties/` prefix) |
| Empty conversions | Mark events as Key events in GA4; wait 24–48h |
| MCP not in Cursor | Confirm `type: stdio` + `cmd /c` paths; restart; check Customize → MCPs |
| 403 from API | Your Google user needs Viewer+ on the GA4 property |
