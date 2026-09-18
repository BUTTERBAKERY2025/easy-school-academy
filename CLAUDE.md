# School On — notes for future work in this repo

## Commands

- `npm run dev` — development server on :3000
- `npm run check` — typecheck + eslint + content validation; run this before committing
- `npm run check:content` — validates the catalogue (translations, question integrity, duplicate ids)

## Things worth knowing before changing code

- **Bilingual strings never live in JSX.** UI copy goes in `src/lib/i18n/dictionary.ts`; content carries
  both languages as `{ ar, en }`. Topic banks use the compact `"one side|the other"` form, and `bi()`
  works out which side is Arabic from its script, so either order is fine.
- **Numbers need formatting, not interpolation.** Use `num()` / `percent()` from `lib/i18n/config`, and
  wrap mixed strings like `3 / 10` in the `Ratio` component — they reorder inside RTL text otherwise.
- **The catalogue is generated, not stored.** `lib/content/build.ts` derives every unit and lesson from
  the topic banks at module load. Lesson ids are stable (`saudi-g4-math-fractions-1`), and an entry in
  `lib/content/lessons/*` with that id replaces the generated body.
- **Persistence is behind a repository.** Everything goes through `lib/db/repo.ts`; only
  `lib/db/store.ts` knows the data is a JSON file. Swap that one file to move to a real database.
- **The language switch is a route handler, not a server action** (`app/api/locale/route.ts`): a server
  action that sets a cookie and redirects loses the `Set-Cookie`, and `next/link` cannot navigate to a
  route handler — the switcher is a plain `<a>` for that reason.
- **Lesson gating:** the first lesson of every subject is free; everything else needs an active
  subscription, which a student can inherit from their parent account.
