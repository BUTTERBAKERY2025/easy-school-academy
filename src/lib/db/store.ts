import "server-only";
import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { emptyDatabase, type Database } from "./types";
import { seedDatabase } from "./seed";

/**
 * Development-grade persistence: the whole database is a single JSON file that is
 * read once into memory and rewritten atomically on every mutation.
 *
 * Everything else in the app talks to `read()` / `mutate()` only, so swapping this
 * module for Postgres, SQLite or any ORM is a self-contained change.
 */

const DATA_DIR = process.env.SCHOOL_ON_DATA_DIR ?? path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "school-on.json");

type GlobalCache = {
  db: Database | null;
  loading: Promise<Database> | null;
  writeChain: Promise<unknown>;
};

// Next.js may evaluate this module more than once per process (dev HMR, route
// bundles), so the cache hangs off globalThis to stay a single instance.
const globalRef = globalThis as typeof globalThis & { __schoolOnStore?: GlobalCache };

const cache: GlobalCache = (globalRef.__schoolOnStore ??= {
  db: null,
  loading: null,
  writeChain: Promise.resolve(),
});

async function loadFromDisk(): Promise<Database> {
  try {
    const raw = await readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw) as Partial<Database>;
    return { ...emptyDatabase(), ...parsed };
  } catch {
    const seeded = await seedDatabase(emptyDatabase());
    await persist(seeded);
    return seeded;
  }
}

async function persist(db: Database): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  // Write to a temp file first so a crash mid-write cannot truncate the database.
  const tmp = `${DATA_FILE}.${randomUUID()}.tmp`;
  await writeFile(tmp, JSON.stringify(db, null, 2), "utf8");
  await rename(tmp, DATA_FILE);
}

export async function read(): Promise<Database> {
  if (cache.db) return cache.db;
  cache.loading ??= loadFromDisk().then((db) => {
    cache.db = db;
    cache.loading = null;
    return db;
  });
  return cache.loading;
}

/**
 * Applies `apply` to the database and persists the result. Mutations are queued so
 * two concurrent requests can never interleave a read-modify-write.
 */
export async function mutate<T>(apply: (db: Database) => T | Promise<T>): Promise<T> {
  const run = cache.writeChain.then(async () => {
    const db = await read();
    const result = await apply(db);
    await persist(db);
    return result;
  });
  // Keep the chain alive even when a mutation throws.
  cache.writeChain = run.catch(() => undefined);
  return run;
}

export function newId(prefix: string): string {
  return `${prefix}_${randomUUID().replace(/-/g, "").slice(0, 16)}`;
}
