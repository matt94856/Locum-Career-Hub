-- Locum Career Hub SEO Memory — SQLite schema
-- Never store OAuth tokens or credentials in this database.

PRAGMA foreign_keys = ON;
PRAGMA journal_mode = WAL;

CREATE TABLE IF NOT EXISTS seo_audits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL,
  period_start TEXT,
  period_end TEXT,
  pages_analyzed INTEGER DEFAULT 0,
  problems_found TEXT NOT NULL DEFAULT '[]',       -- JSON array
  recommendations TEXT NOT NULL DEFAULT '[]',      -- JSON array
  priority_level TEXT NOT NULL DEFAULT 'medium',  -- critical|high|medium|low
  expected_traffic_impact TEXT,                   -- high|medium|low + notes
  completed_actions TEXT NOT NULL DEFAULT '[]',   -- JSON array
  traffic_clicks REAL,
  traffic_impressions REAL,
  traffic_ctr REAL,
  traffic_position REAL,
  clicks_pct_change REAL,
  impressions_pct_change REAL,
  source TEXT DEFAULT 'gsc-mcp',
  summary TEXT,
  raw_json TEXT,                                  -- optional compact audit payload (no secrets)
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS website_changes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL,
  url TEXT NOT NULL,
  change_type TEXT NOT NULL,   -- title|meta|h1|content|internal_link|canonical|schema|redirect|other
  before_value TEXT,
  after_value TEXT,
  reason TEXT,
  expected_result TEXT,
  actual_result TEXT,          -- filled after measurement window
  related_audit_id INTEGER REFERENCES seo_audits(id),
  related_experiment_id INTEGER,
  status TEXT NOT NULL DEFAULT 'shipped', -- planned|shipped|measuring|measured|reverted
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS keyword_rankings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  keyword TEXT NOT NULL,
  url TEXT,
  date TEXT NOT NULL,          -- snapshot date (end of window)
  period_start TEXT,
  period_end TEXT,
  clicks REAL NOT NULL DEFAULT 0,
  impressions REAL NOT NULL DEFAULT 0,
  ctr REAL NOT NULL DEFAULT 0, -- percentage 0–100
  average_position REAL,
  source TEXT DEFAULT 'gsc',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(keyword, url, date, period_start, period_end)
);

CREATE TABLE IF NOT EXISTS page_performance (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  url TEXT NOT NULL,
  date TEXT NOT NULL,
  period_start TEXT,
  period_end TEXT,
  clicks REAL NOT NULL DEFAULT 0,
  impressions REAL NOT NULL DEFAULT 0,
  ctr REAL NOT NULL DEFAULT 0,
  average_position REAL,
  source TEXT DEFAULT 'gsc',
  notes TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(url, date, period_start, period_end)
);

CREATE TABLE IF NOT EXISTS seo_experiments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  hypothesis TEXT NOT NULL,
  page_changed TEXT NOT NULL,
  change_made TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT,
  result TEXT,
  outcome TEXT,                -- winner|loser|inconclusive|running
  metrics_before TEXT,         -- JSON
  metrics_after TEXT,          -- JSON
  related_change_ids TEXT DEFAULT '[]',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS seo_recommendations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  recommendation TEXT NOT NULL,
  date_created TEXT NOT NULL,
  priority TEXT NOT NULL DEFAULT 'medium', -- p0|p1|p2|p3|critical|high|medium|low
  status TEXT NOT NULL DEFAULT 'New',      -- New|In Progress|Completed|Rejected
  completed_date TEXT,
  outcome TEXT,
  target_url TEXT,
  expected_impact TEXT,
  audit_id INTEGER REFERENCES seo_audits(id),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS memory_meta (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_changes_url ON website_changes(url);
CREATE INDEX IF NOT EXISTS idx_changes_date ON website_changes(date);
CREATE INDEX IF NOT EXISTS idx_rankings_kw ON keyword_rankings(keyword);
CREATE INDEX IF NOT EXISTS idx_rankings_date ON keyword_rankings(date);
CREATE INDEX IF NOT EXISTS idx_pages_url ON page_performance(url);
CREATE INDEX IF NOT EXISTS idx_recs_status ON seo_recommendations(status);
CREATE INDEX IF NOT EXISTS idx_audits_date ON seo_audits(date);
