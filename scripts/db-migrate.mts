/**
 * Copies the JSON database into Postgres.
 *
 * Run once, after applying db/schema.sql, to carry an existing deployment's
 * accounts and progress across:
 *
 *   DATABASE_URL=postgres://… npm run db:migrate
 *
 * Safe to repeat: nothing is inserted twice.
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { sql, usingPostgres } from "../src/lib/db/sql.js";
import { importDatabase, report } from "../src/lib/db/import.js";
import { emptyDatabase, type Database } from "../src/lib/db/types.js";

if (!usingPostgres()) {
  console.error("DATABASE_URL is not set — there is nothing to migrate into.");
  process.exit(1);
}

const candidates = [
  process.env.SCHOOL_ON_DATA_DIR,
  path.join(process.cwd(), "data"),
  path.join(os.tmpdir(), "school-on-data"),
].filter(Boolean) as string[];

let source: { db: Database; from: string } | undefined;
for (const dir of candidates) {
  const file = path.join(dir, "school-on.json");
  try {
    const raw = await readFile(file, "utf8");
    source = { db: { ...emptyDatabase(), ...(JSON.parse(raw) as Partial<Database>) }, from: file };
    break;
  } catch {
    continue;
  }
}

if (!source) {
  console.error(`No school-on.json found. Looked in: ${candidates.join(", ")}`);
  console.error("For a database with no history, use `npm run db:seed` instead.");
  process.exit(1);
}

console.log(`reading ${source.from}`);
const client = sql();
await report(client, await importDatabase(client, source.db));
await client.end();
console.log("\nmigration complete.");
