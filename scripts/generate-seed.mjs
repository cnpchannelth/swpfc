// Run: node scripts/generate-seed.mjs > seed.sql
// Then apply: wrangler d1 execute police-swp-fc-db --remote --file=./seed.sql
import { createRequire } from 'module';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// We read sample-data directly as JSON since we can't import TS
// Run: npx tsx scripts/generate-seed.mjs > seed.sql  (if you have tsx)
// Or compile first with: npx tsc --module esnext --moduleResolution bundler src/lib/sample-data.ts

console.log('-- Auto-generated seed file');
console.log('-- Run: wrangler d1 execute police-swp-fc-db --remote --file=./seed.sql');
console.log('-- NOTE: Edit this file to insert your actual sample data if needed');
console.log("INSERT OR REPLACE INTO store (key, value) VALUES ('players', '[]');");
console.log("INSERT OR REPLACE INTO store (key, value) VALUES ('matches', '[]');");
console.log("INSERT OR REPLACE INTO store (key, value) VALUES ('news', '[]');");
console.log("INSERT OR REPLACE INTO store (key, value) VALUES ('player_stats', '[]');");
console.log("INSERT OR REPLACE INTO store (key, value) VALUES ('standings', '[]');");
console.log("INSERT OR REPLACE INTO store (key, value) VALUES ('staff', '[]');");
console.log("INSERT OR REPLACE INTO store (key, value) VALUES ('sponsors', '[]');");
