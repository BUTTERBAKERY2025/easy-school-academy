/**
 * Puts the demo accounts into a database that has none.
 *
 * A fresh Postgres — a new Supabase project, say — has the tables but nobody to
 * sign in as. This writes the same accounts the JSON backend seeds itself with,
 * so the deployment is usable the moment the schema is applied:
 *
 *   DATABASE_URL=postgres://… npm run db:seed
 *
 * Safe to repeat: existing rows are left alone.
 */
import { sql, usingPostgres } from "../src/lib/db/sql.js";
import { importDatabase, report } from "../src/lib/db/import.js";
import { seedDatabase } from "../src/lib/db/seed.js";
import { emptyDatabase } from "../src/lib/db/types.js";

if (!usingPostgres()) {
  console.error("DATABASE_URL is not set — there is no database to seed.");
  process.exit(1);
}

const client = sql();
await report(client, await importDatabase(client, await seedDatabase(emptyDatabase())));
await client.end();
console.log("\nseeding complete.");
