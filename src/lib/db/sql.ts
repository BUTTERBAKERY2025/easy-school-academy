import "server-only";
import postgres from "postgres";

/**
 * The Postgres connection, opened once per process and only when asked for.
 *
 * Nothing here is Supabase-specific by name, but two of its defaults would break
 * quietly if they were not handled:
 *
 * - Its transaction pooler (the `…pooler.supabase.com:6543` address, and the one
 *   you want on a serverless host) hands a different backend to every statement,
 *   so prepared statements cannot be reused and the driver has to stop making
 *   them. The direct `:5432` address is a normal connection and keeps them.
 * - It refuses connections that are not over TLS, so anything that is not a
 *   local database gets `ssl: require`.
 *
 * `max` stays small because a pooler counts each of these as a client, and a
 * handful of app instances at the default of ten would exhaust a small project's
 * allowance.
 */

export type Sql = ReturnType<typeof postgres>;

const globalRef = globalThis as typeof globalThis & { __schoolOnSql?: Sql };

export const databaseUrl = (): string | undefined =>
  process.env.DATABASE_URL?.trim() || undefined;

/** True when the app is configured to use Postgres rather than the JSON file. */
export const usingPostgres = (): boolean => Boolean(databaseUrl());

export function sql(): Sql {
  const existing = globalRef.__schoolOnSql;
  if (existing) return existing;

  const url = databaseUrl();
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Either set it to a Postgres connection string, " +
        "or leave it unset to use the JSON file store.",
    );
  }

  const { hostname, port } = new URL(url);
  const isLocal = hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1";
  const isTransactionPooler = port === "6543" || hostname.includes("pooler");

  const client = postgres(url, {
    max: 4,
    idle_timeout: 20,
    connect_timeout: 15,
    prepare: !isTransactionPooler,
    ssl: isLocal ? false : "require",
    // Timestamps travel as ISO-8601 strings everywhere else in the app, so they
    // are parsed here rather than handed over as Date objects.
    types: {
      date: {
        to: 1184,
        from: [1082, 1114, 1184],
        serialize: (value: string | Date) =>
          value instanceof Date ? value.toISOString() : value,
        parse: (value: string) => value,
      },
    },
    onnotice: () => {},
  });

  globalRef.__schoolOnSql = client;
  return client;
}
