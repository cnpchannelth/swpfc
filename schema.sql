-- Run with: wrangler d1 execute police-swp-fc-db --file=./schema.sql
-- For production: wrangler d1 execute police-swp-fc-db --remote --file=./schema.sql

CREATE TABLE IF NOT EXISTS store (
  key   TEXT PRIMARY KEY NOT NULL,
  value TEXT NOT NULL DEFAULT '[]'
);

INSERT OR IGNORE INTO store (key, value) VALUES ('players',      '[]');
INSERT OR IGNORE INTO store (key, value) VALUES ('matches',      '[]');
INSERT OR IGNORE INTO store (key, value) VALUES ('news',         '[]');
INSERT OR IGNORE INTO store (key, value) VALUES ('player_stats', '[]');
INSERT OR IGNORE INTO store (key, value) VALUES ('standings',    '[]');
INSERT OR IGNORE INTO store (key, value) VALUES ('staff',        '[]');
INSERT OR IGNORE INTO store (key, value) VALUES ('sponsors',     '[]');
