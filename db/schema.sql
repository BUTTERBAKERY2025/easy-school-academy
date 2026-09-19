-- easy school — the schema the application expects.
--
-- Run this once against a new database (Supabase: SQL Editor, or psql with the
-- project's connection string). It is written to be re-runnable: every object is
-- created only if it is missing, so applying it twice changes nothing.
--
-- Ids stay text rather than uuid because the application mints them with a
-- readable prefix (usr_…, prg_…) and the JSON backend already holds them in that
-- shape; keeping the format identical is what lets one be migrated into the other.
--
-- Timestamps are timestamptz and the application reads and writes ISO-8601
-- strings, which is what the rest of the code already passes around.

create table if not exists users (
  id              text primary key,
  name            text        not null,
  email           text        not null,
  password_hash   text        not null,
  role            text        not null check (role in ('student', 'parent', 'teacher', 'admin')),
  curriculum_id   text,
  grade_id        text,
  parent_id       text        references users (id) on delete set null,
  teaching_grade_ids text[]   not null default '{}',
  xp              integer     not null default 0 check (xp >= 0),
  streak_days     integer     not null default 0 check (streak_days >= 0),
  last_active_on  date,
  created_at      timestamptz not null default now()
);

-- Sign-in looks accounts up by address, and an address identifies one account.
-- Case is folded here rather than trusted from the caller, so two rows cannot
-- differ only in capitalisation.
create unique index if not exists users_email_key on users (lower(email));
create index if not exists users_parent_id_idx on users (parent_id);
create index if not exists users_role_grade_idx on users (role, grade_id);

create table if not exists progress (
  id             text primary key,
  user_id        text        not null references users (id) on delete cascade,
  lesson_id      text        not null,
  unit_id        text        not null,
  subject_id     text        not null,
  grade_id       text        not null,
  curriculum_id  text        not null,
  status         text        not null check (status in ('in_progress', 'completed')),
  step_index     integer     not null default 0 check (step_index >= 0),
  score          integer     not null default 0 check (score between 0 and 100),
  seconds_spent  integer     not null default 0 check (seconds_spent >= 0),
  started_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),
  completed_at   timestamptz
);

-- One row per student per lesson. The application upserts on this pair, and the
-- constraint is what makes two concurrent saves collapse into one row rather
-- than racing to create a second.
create unique index if not exists progress_user_lesson_key on progress (user_id, lesson_id);
create index if not exists progress_user_unit_idx on progress (user_id, unit_id);

create table if not exists subscriptions (
  id                 text        primary key,
  user_id            text        not null references users (id) on delete cascade,
  plan_id            text        not null,
  interval           text        not null check (interval in ('monthly', 'yearly')),
  status             text        not null check (status in ('active', 'cancelled')),
  seats              integer     not null default 1 check (seats >= 1),
  started_at         timestamptz not null default now(),
  current_period_end timestamptz not null,
  cancelled_at       timestamptz
);

-- Starting a subscription cancels the one before it, so an account has at most
-- one active row. The index enforces that rather than leaving it to the code.
create unique index if not exists subscriptions_one_active_key
  on subscriptions (user_id) where status = 'active';
create index if not exists subscriptions_user_idx on subscriptions (user_id);

create table if not exists activity (
  id         text        primary key,
  user_id    text        not null references users (id) on delete cascade,
  kind       text        not null check (kind in ('lesson_started', 'lesson_completed', 'badge_earned', 'subscribed')),
  lesson_id  text,
  badge_id   text,
  xp         integer     not null default 0,
  created_at timestamptz not null default now()
);

-- The feed is always "this user, newest first", which is the index it gets.
create index if not exists activity_user_recent_idx on activity (user_id, created_at desc);

create table if not exists assignments (
  id         text        primary key,
  teacher_id text        not null references users (id) on delete cascade,
  grade_id   text        not null,
  subject_id text        not null,
  lesson_ids text[]      not null default '{}',
  due_on     date        not null,
  created_at timestamptz not null default now()
);

create index if not exists assignments_grade_idx on assignments (grade_id);
create index if not exists assignments_teacher_idx on assignments (teacher_id);
