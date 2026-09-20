# easy school — notes for future work in this repo

An interactive academy teaching the American, British and Saudi curricula from
kindergarten to Grade 9, in Arabic (RTL) and English.

## Where the project stands

- **Structure is complete**: 3 curricula, 29 grades, 175 subjects, 657 units,
  1347 lessons — all browsable, generated from the topic banks except where a
  syllabus pins the real course (British Year 5 Science, so far).
- **15 lessons are fully authored** with interactive bodies. Every other lesson
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
3. Write the lesson as `screens` — each with a `kicker`, a `title`, a `lead` and an
   `aim`, holding several blocks — or as `blocks` alone, in which case each block
   becomes a screen of its own. Seven screens read better than twenty steps: a
   question, a reading and a figure arrive as one move. Keep the sentences short;
   a ten-year-old keeps "Some are big. Some are tiny." and loses a paragraph with
   three clauses. Build the body from the block types in `src/lib/content/types.ts`:
   teaching blocks (`concept`, `example`, `callout`, `vocab`, `flashcards`,
   `activity`, `checklist`, `summary`) and the seven question types (`mcq`, `multi`, `truefalse`, `fill`,
   `match`, `order`, `sort`). Every question needs an `explanation` — the player
   shows it whether the answer was right or wrong. A wrong `mcq`/`multi` choice can
   also carry its own `feedback`, and a `truefalse` a `whenWrong`, shown only to the
   child who gave that answer: one explanation for every wrong answer treats all
   mistakes as the same mistake, and they never are.
4. Visuals are mostly data, not images: `figure`, `array`, `fraction`, `numberline`,
   `bars`, `table`, `steps`, drawn by `src/components/visual.tsx`. Where a real
   photograph or painted illustration is what teaches, `{ type: "image" }` points
   at a file under `public/images/lessons/<subject>/` — `alt` is required and
   bilingual, and `npm run check` fails a lesson pointing at a file that is not
   there. Only artwork this academy owns; nothing from a publisher's book.
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
- **A lesson is read in the language its course is taught in.** `lib/content/teaching.ts` maps each
  curriculum to its language — British and American to English, Saudi to Arabic — and the lesson
  title, objectives and body render in it (with that language's `dir`, or English comes out
  right-to-left) while the navigation and buttons stay in the reader's own. A reader whose language
  differs gets a support toggle inside the player, off by default and remembered per device.
- **A wrong answer is answered, not just marked.** `Choice.feedback` and `truefalse.whenWrong` are
  shown above the general explanation and only to the child who chose that option, because "a pine
  is a flowering plant" and "a fern is a flowering plant" are different misunderstandings needing
  different replies. Both optional; a question without them behaves as before. For `multi` the notes
  of every wrong box ticked are joined.
- **A lesson can read itself aloud.** The largest difference between a page and a teacher is that a
  teacher speaks. `components/narration.tsx` reads the current screen with the device's own voice —
  nothing leaves the device, no key, works offline — block by block, so the part being read is
  highlighted and stopping is immediate. `lib/content/readable.ts` says what each block sounds like:
  a table is read as its cells, a question as the question and its options, never the answer. It
  speaks the **course's** language, not the interface's, and the button hides itself where the device
  has no voice for it. Moving screen, or leaving, silences it; a run id stops a cancelled queue
  carrying on, because some browsers fire `onend` for an utterance they have just thrown away.
- **A lesson is screens, not steps.** `Lesson.screens` is the unit the player advances through, and a
  lesson written as blocks alone gets one screen per block — which is exactly how it behaved before.
  A screen is left once every question on it is answered or revealed. Scoring is unchanged and still
  per question across the whole lesson, so progress rows and the unit review did not have to change.
  The progress bar shows a segment per screen up to eight, and a single bar beyond that.
- **A lesson can walk through a page of the book.** A `pagewalk` block names a printed page, a one-line
  big idea, and regions given as `[x, y, w, h]` percentages. Over the family's own rendered page each
  region gets a numbered marker sitting on it; choosing one outlines that part and says what it is
  for — the aims box, the task, the key words — which is how a teacher opens a textbook: by pointing,
  before reading. Percentages rather than pixels, so the markers land at any size and on any copy of
  that edition. Without a book file the regions are still readable as a numbered list beside the
  paper book. A scan's sheet numbers never match the printed ones, so the child nudges ‹ › until the
  right page shows and the difference is remembered for every later lesson.
- **The book on screen is the family's own copy.** `components/book/reader.tsx` renders a PDF the
  family chooses from their device with pdf.js; it is stored in IndexedDB on that device
  (`lib/book-file.ts`), never uploaded, and no part of any book is in this repository. Printed page
  numbers do not match a scan's sheet numbers, so the reader is calibrated once per device — say what
  number is printed on the page you are looking at — and a lesson's `bookPage` then means the printed
  page. `BookBeside` puts the reader next to the player, closed by default. **pdf.js is pinned to the
  4.x line**: 6.x calls `Map.prototype.getOrInsertComputed`, which stable Chrome does not have, and
  the canvas comes out blank.
- **Figures are drawn and answer questions.** A `diagram` block names one of the drawings in
  `components/art/diagrams.tsx` (`flower`, `life-cycle`) and labels its parts. Each part carries its
  name and a leader line on the drawing itself, as a printed figure does; choosing a part — on the
  drawing or in the list — lights it up, dims the rest and explains it, which is the one thing a
  printed figure cannot do. `lib/content/diagrams.ts` holds the part ids each art has, and the
  validator fails a label naming a part the drawing lacks **or** a drawn part nothing labels.
- **A lesson covers its whole page, not a corner of it.** Where a course is aligned, the lesson is
  written against everything that page teaches, and carries the shape a primary science lesson has:
  a `callout` to settle in, `vocab`, the reading, an `activity` for practical work away from the
  screen, questions, and a `checklist` to close. `activity` and `checklist` are teaching blocks —
  neither is marked, and the checklist saves nothing.
- **A syllabus pins the real course where one has been aligned.** The topic banks generate a
  plausible catalogue for every year, which is what makes all 1347 lessons browsable. A file under
  `lib/content/syllabus/` instead states a year's actual units and lessons, and `buildSubject` uses it
  in place of the band slice (`british-science-5.ts` is the first: Cambridge Primary Science Stage 5,
  6 units, 24 lessons). Unit ids become part of every lesson id beneath them, so they are chosen once
  and never renamed. A scope and sequence is a fact about a course — **the syllabus names the course
  it follows and reproduces nothing from any book**; every explanation, example and question under
  those headings is written here.
- **A unit opens and closes like a chapter.** `/books/[bookId]/[unitId]` derives its objectives, its
  glossary and its end-of-unit review from the lessons themselves (`lib/learning/unit-review.ts`), so
  a unit gains all three the moment its lessons are written. The review draws at most two questions
  per lesson, ten in all, interleaved, with a seed fixed per day. `saveUnitReviewAction` writes back
  **only the lessons that scored 70 or better**: a saved row moves `updatedAt`, which is what tells
  the learner model the memory was refreshed, and the stores keep the better of two scores — so
  writing a failed lesson would mark it revised and leave the failure no trace. A lesson not held
  stays due.
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
