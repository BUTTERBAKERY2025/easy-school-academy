import "server-only";
import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import os from "node:os";
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

const PREFERRED_DIR = process.env.SCHOOL_ON_DATA_DIR ?? path.join(process.cwd(), "data");

/**
 * Serverless hosts (Vercel and friends) mount the deployment read-only and give
 * each instance its own writable temp directory, so fall back to that rather than
 * failing every write. Data written there lasts as long as the instance does,
 * which is why a real deployment should point `SCHOOL_ON_DATA_DIR` at a durable
 * volume — or, better, replace this module with a database.
 */
const FALLBACK_DIR = path.join(os.tmpdir(), "school-on-data");

let dataDir: string | null = null;

async function resolveDataDir(): Promise<string> {
  if (dataDir) return dataDir;

  try {
    await mkdir(PREFERRED_DIR, { recursive: true });
    dataDir = PREFERRED_DIR;
  } catch (error) {
    // Any reason the preferred directory cannot be used — read-only mount, wrong
    // permissions, a bad SCHOOL_ON_DATA_DIR — is better handled by degrading to
    // temporary storage than by failing every request. The reason is logged so a
    // misconfiguration is still visible.
    const code = (error as NodeJS.ErrnoException).code ?? "unknown";
    await mkdir(FALLBACK_DIR, { recursive: true });
    dataDir = FALLBACK_DIR;
    console.warn(
      `[school-on] cannot use ${PREFERRED_DIR} (${code}); storing data in ${FALLBACK_DIR} instead. ` +
        "That is per-instance and temporary — point SCHOOL_ON_DATA_DIR at a durable volume, " +
        "or replace src/lib/db/store.ts with a database, before relying on it.",
    );
  }

  return dataDir;
}

const dataFile = async () => path.join(await resolveDataDir(), "school-on.json");

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
    const raw = await readFile(await dataFile(), "utf8");
    const parsed = JSON.parse(raw) as Partial<Database>;
    return { ...emptyDatabase(), ...parsed };
  } catch {
    const seeded = await seedDatabase(emptyDatabase());
    await persist(seeded);
    return seeded;
  }
}

async function persist(db: Database): Promise<void> {
  const file = await dataFile();
  // Write to a temp file first so a crash mid-write cannot truncate the database.
  const tmp = `${file}.${randomUUID()}.tmp`;
  await writeFile(tmp, JSON.stringify(db, null, 2), "utf8");
  await rename(tmp, file);
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
