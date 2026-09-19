"use client";

import { useState, useSyncExternalStore } from "react";
import { num, type Locale } from "@/lib/i18n/config";

/**
 * The daily goal.
 *
 * Deliberately the student's to set, and deliberately small by default. Choice
 * over the target is what makes the ring a goal rather than a demand, and a
 * goal met most days teaches more than an ambitious one met occasionally.
 *
 * The choice is a preference for one child on one device, so it lives in
 * `localStorage` rather than the database; the ring renders correctly when
 * reading it fails or returns nothing.
 */

const KEY = "easy-school:daily-goal";
const OPTIONS = [10, 20, 30, 45];
const DEFAULT_GOAL = 20;

/**
 * `localStorage` read as an external store rather than copied into state in an
 * effect: the server has no way to know the stored goal, and this is the shape
 * React provides for exactly that — it hydrates with the default and swaps in
 * the real value without a mismatch. The `storage` listener keeps a second tab
 * in step.
 */
const listeners = new Set<() => void>();
let cached: number | undefined;

function readGoal(): number {
  if (cached !== undefined) return cached;
  try {
    const stored = Number(window.localStorage.getItem(KEY));
    cached = OPTIONS.includes(stored) ? stored : DEFAULT_GOAL;
  } catch {
    cached = DEFAULT_GOAL; // private mode, blocked storage
  }
  return cached;
}

function subscribe(notify: () => void): () => void {
  const onStorage = (event: StorageEvent) => {
    if (event.key !== KEY) return;
    cached = undefined;
    notify();
  };
  listeners.add(notify);
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(notify);
    window.removeEventListener("storage", onStorage);
  };
}

function writeGoal(minutes: number): void {
  cached = minutes;
  try {
    window.localStorage.setItem(KEY, String(minutes));
  } catch {
    /* nothing to do: the goal still applies for this visit */
  }
  for (const notify of listeners) notify();
}

export function GoalRing({
  minutesToday,
  locale,
  labels,
}: {
  minutesToday: number;
  locale: Locale;
  labels: { title: string; done: string; toGo: string; of: string; change: string; minutes: string; hint: string };
}) {
  const goal = useSyncExternalStore(subscribe, readGoal, () => DEFAULT_GOAL);
  const [open, setOpen] = useState(false);

  function choose(minutes: number) {
    writeGoal(minutes);
    setOpen(false);
  }

  const share = Math.min(1, goal ? minutesToday / goal : 0);
  const reached = minutesToday >= goal;
  const RADIUS = 52;
  const circumference = 2 * Math.PI * RADIUS;

  return (
    <div className="card flex flex-col items-center p-6 text-center">
      <h2 className="text-sm font-bold text-muted">{labels.title}</h2>

      <div className="relative mt-3">
        <svg viewBox="0 0 128 128" className="size-32 -rotate-90" aria-hidden>
          <circle cx="64" cy="64" r={RADIUS} fill="none" strokeWidth="12" className="stroke-surface-muted" />
          <circle
            cx="64"
            cy="64"
            r={RADIUS}
            fill="none"
            strokeWidth="12"
            strokeLinecap="round"
            className={reached ? "stroke-mint-500" : "stroke-brand-500"}
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - share)}
            style={{ transition: "stroke-dashoffset 700ms ease" }}
          />
        </svg>
        <div className="absolute inset-0 grid place-content-center">
          <span className="block text-3xl font-extrabold tabular-nums" dir="ltr">
            {num(minutesToday, locale)}
          </span>
          <span className="block text-xs text-muted" dir="ltr">
            {labels.of} {num(goal, locale)}
          </span>
        </div>
      </div>

      <p className={`mt-3 text-sm font-semibold ${reached ? "text-mint-600 dark:text-mint-300" : "text-muted"}`}>
        {reached ? labels.done : labels.toGo}
      </p>

      <button type="button" onClick={() => setOpen((was) => !was)} className="mt-3 text-xs font-semibold text-brand-600 underline dark:text-brand-300">
        {labels.change}
      </button>

      {open ? (
        <div className="mt-3 w-full">
          <div className="flex justify-center gap-2">
            {OPTIONS.map((minutes) => (
              <button
                key={minutes}
                type="button"
                onClick={() => choose(minutes)}
                aria-pressed={goal === minutes}
                className={`chip tabular-nums ${
                  goal === minutes
                    ? "bg-brand-500 text-white"
                    : "bg-surface-muted text-body hover:bg-brand-100 dark:hover:bg-brand-900/50"
                }`}
                dir="ltr"
              >
                {num(minutes, locale)}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs font-semibold text-muted">{labels.minutes}</p>
          <p className="mt-3 text-xs text-muted">{labels.hint}</p>
        </div>
      ) : null}
    </div>
  );
}
