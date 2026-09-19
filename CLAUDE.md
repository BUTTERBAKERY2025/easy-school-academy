# easy school — notes for future work in this repo

An interactive academy teaching the American, British and Saudi curricula from
kindergarten to Grade 9, in Arabic (RTL) and English.

## Where the project stands

- **Structure is complete**: 3 curricula, 29 grades, 175 subjects, 656 units,
  1331 lessons — all browsable, generated from the topic banks.
- **14 lessons are fully authored** with interactive bodies. Every other lesson
  shows its title, objectives and place in the unit, marked "in preparation".
  `npm run check:content` prints the current counts.
- **Working end to end**: sign-up and sign-in, four roles, subscriptions with
  free-first-lesson gating, the lesson player, saved progress, and the student,
  parent, teacher and admin dashboards.
- **Not production-ready yet**: payments are simulated (no gateway), and the
  database is a JSON file rather than a real database.

## The agreed way of working

The owner and Claude build the content **one curriculum, subject and grade at a
time**: pick the target, author its units as complete interactive lessons,
review, then move to the next. Structure and ids already exist for every lesson,
so authoring never requires touching the catalogue builder.

### Adding a fully authored lesson

1. Find the lesson id — they are stable and predictable:
   `{curriculum}-g{grade}-{subject}-{strand}-{n}`, e.g. `saudi-g4-math-fractions-1`.
   `npx tsx scripts/dump-catalog.mts saudi-g4-math` lists the ids of a subject.
2. Add an entry under that id in `src/lib/content/lessons/american.ts`,
   `british.ts` or `saudi.ts`. Anything left out (title, summary, objectives,
   duration) falls back to the generated value, so only write what differs.
3. Build the body from the block types in `src/lib/content/types.ts`:
   teaching blocks (`concept`, `example`, `callout`, `vocab`, `flashcards`,
   `summary`) and the seven question types (`mcq`, `multi`, `truefalse`, `fill`,
   `match`, `order`, `sort`). Every question needs an `explanation` — the player
   shows it whether the answer was right or wrong.
4. Visuals are data, not images: `figure`, `array`, `fraction`, `numberline`,
   `bars`, `table`, `steps`, drawn by `src/components/visual.tsx`.
5. Run `npm run check` — the content validator catches a missing translation, a
   `correctId` that matches no choice, blanks that do not match the placeholders
   in the text, a sort item with no bucket, and duplicate ids.

## Design system

- Violet is the brand hue; **coral is reserved for the single most important
  action on a page** — do not use it for secondary buttons.
- Headings use a rounded display face (`--font-display`); body text uses Cairo.
- Tokens live in `src/app/globals.css` and cover light and dark; style through
  the tokens rather than hard-coded colours.

## Deployment

Hosted on Render from `render.yaml`. `AUTH_SECRET` is required — the server
refuses to start without it (`src/instrumentation.ts`). **Secrets belong in the
host's environment variables, never in this repository.** On Render's free plan
there is no persistent disk, so the database resets on restart and the demo
accounts are re-seeded; see the README for the persistent-disk and database
options.

## Commands

- `npm run dev` — development server on :3000
- `npm run check` — typecheck + eslint + content validation; run this before committing
- `npm run check:content` — validates the catalogue (translations, question integrity, duplicate ids)
- `npm run check:model` — asserts the learner model's rules against fixed dates

## Things worth knowing before changing code

- **Bilingual strings never live in JSX.** UI copy goes in `src/lib/i18n/dictionary.ts`; content carries
  both languages as `{ ar, en }`. Topic banks use the compact `"one side|the other"` form, and `bi()`
  works out which side is Arabic from its script, so either order is fine.
- **Numbers need formatting, not interpolation.** Use `num()` / `percent()` from `lib/i18n/config`, and
  wrap mixed strings like `3 / 10` in the `Ratio` component — they reorder inside RTL text otherwise.
  Digits are Western in both languages: the American and British curricula are taught in them. A
  student may still *type* Arabic-Indic digits, and the answer normaliser accepts them.
- **Some terms are deliberately untranslated.** "Year 5", "Grade 4", the Key Stages and "English
  Language Arts" are written with both sides of the `Localized` pair identical, which is what marks
  them as a decision; the catalogue validator treats an identical pair as intentional and any other
  Latin-in-Arabic as a mistake.
- **The catalogue is generated, not stored.** `lib/content/build.ts` derives every unit and lesson from
  the topic banks at module load. Lesson ids are stable (`saudi-g4-math-fractions-1`), and an entry in
  `lib/content/lessons/*` with that id replaces the generated body.
- **Persistence is behind a repository.** Everything goes through `lib/db/repo.ts`, which picks a
  store at start-up: Postgres when `DATABASE_URL` is set, otherwise the JSON file. Both implement
  `lib/db/contract.ts`, so neither can gain a method the other lacks, and `npm run db:check` runs the
  two through the same scenario and fails if any answer differs. The schema is `db/schema.sql`;
  `npm run db:seed` fills an empty database and `npm run db:migrate` carries a JSON file across.
- **Scripts that touch the store need `--conditions=react-server`**, which the `db:*` scripts already
  pass — `server-only` throws under plain Node without it.
- **The language switch is a route handler, not a server action** (`app/api/locale/route.ts`): a server
  action that sets a cookie and redirects loses the `Set-Cookie`, and `next/link` cannot navigate to a
  route handler — the switcher is a plain `<a>` for that reason.
- **Lesson gating:** the first lesson of every subject is free; everything else needs an active
  subscription, which a student can inherit from their parent account.
- **Every subject is also a book.** `lib/content/books.ts` gives each subject a cover, the framework
  it follows and the year it is for; the book's id *is* the subject's id and its chapters *are* the
  subject's units, so nothing is duplicated. `/books` is the student's shelf, `/books/[bookId]` the
  book with its table of contents, and `/subject/[id]` permanently redirects there. Covers are drawn
  from the subject's colour and icon in `components/art/book-cover.tsx`, sized in container units so
  one component works as a thumbnail and full size. **No publisher's cover, page or exercise is
  reproduced anywhere in this repository** — a book names the authority whose framework it follows
  (the Ministry, the Cambridge stage, the standards), never an edition.
- **The learner model is derived, never stored.** `lib/learning/model.ts` turns progress rows into a
  mastery level per lesson and today's plan. Two rules drive it: recall decays as `2^(-t/S)`, where
  stability `S` comes from the score, so a lesson aced two months ago is no longer counted as
  mastered; and the plan reviews what is fading before adding anything new, never more than two
  reviews at once, interleaved across subjects. Nothing is written to the database, so a change to
  the rules applies to work already done and needs no migration. `npm run check:model` asserts all of
  it against fixed dates. Badges (`lib/learning/badges.ts`) are derived the same way — the
  `activity.badge_id` column is still unused.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
