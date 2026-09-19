/**
 * Brings a database up to date, and fills an empty one.
 *
 * Written to run unattended on every deploy, which is why both halves are safe
 * to repeat: the schema only creates what is missing, and the demo accounts are
 * inserted only when there are no accounts at all. A deployment that already has
 * real users is therefore never re-seeded.
 *
 * With no DATABASE_URL it says so and succeeds, so that a build without a
 * database attached — a preview, a fork — does not fail here.
 *
 *   DATABASE_URL=postgres://… npm run db:setup
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { sql, usingPostgres } from "../src/lib/db/sql.js";
import { importDatabase, report } from "../src/lib/db/import.js";
import { seedDatabase } from "../src/lib/db/seed.js";
import { emptyDatabase } from "../src/lib/db/types.js";

if (!usingPostgres()) {
  console.log("db:setup — DATABASE_URL is not set; the JSON store needs no setup.");
  process.exit(0);
}

const client = sql();

const schema = await readFile(path.join(process.cwd(), "db", "schema.sql"), "utf8");
// `simple()` sends the file as one script; the default protocol takes a single
// statement at a time and would stop at the first semicolon.
await client.unsafe(schema).simple();
console.log("db:setup — schema applied.");

const [{ n }] = await client<{ n: number }[]>`select count(*)::int as n from users`;
if (n > 0) {
  console.log(`db:setup — ${n} account(s) already present; not seeding.`);
} else {
  console.log("db:setup — no accounts found; seeding the demo data.");
  await report(client, await importDatabase(client, await seedDatabase(emptyDatabase())));
}

await client.end();
console.log("db:setup — done.");
