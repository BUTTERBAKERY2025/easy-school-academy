"use client";

import { useState } from "react";
import Link from "next/link";
import { Chevron } from "@/components/ui";
import { Icon } from "@/components/art/icons";
import { num, type Locale } from "@/lib/i18n/config";

/**
 * The two-step picker that opens the homepage.
 *
 * A parent arriving here knows one thing for certain — their child's age — and
 * usually one more, the curriculum the school follows. Asking those two instead
 * of showing a sign-up button turns the hero into the shortest route to the
 * catalogue, and the answer is a real grade page rather than a form.
 *
 * Ages are offered rather than grades on purpose: a parent outside the system
 * the child is enrolled in often cannot name the grade, but never misses the age.
 */

export type FinderCurriculum = {
  id: string;
  flag: string;
  title: string;
  /** Grades of this curriculum, ordinal-indexed, already localised. */
  grades: { ordinal: number; id: string; short: string }[];
};

export type FinderCopy = {
  kicker: string;
  ageTitle: string;
  ageHint: string;
  curriculumTitle: string;
  resultTitle: string;
  open: string;
  back: string;
  change: string;
  years: string;
  freeNote: string;
};

/** Kindergarten is the five-year-old's year, so each later age is one grade on. */
const KINDERGARTEN_AGE = 5;
const AGES = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

export function GradeFinder({
  curricula,
  copy,
  locale,
}: {
  curricula: FinderCurriculum[];
  copy: FinderCopy;
  /** Digits follow the reading language; a formatter cannot cross into a client
      component, so the locale comes over instead and `num` runs here. */
  locale: Locale;
}) {
  const [age, setAge] = useState<number | null>(null);
  const [curriculumId, setCurriculumId] = useState<string | null>(null);

  const curriculum = curricula.find((candidate) => candidate.id === curriculumId) ?? null;
  const grade = curriculum ? gradeFor(curriculum, age ?? KINDERGARTEN_AGE) : null;

  return (
    <div className="card relative overflow-hidden p-6 sm:p-7">
      <span aria-hidden className="blob -end-16 -top-16 size-40 bg-brand-200/40" />

      <div className="relative">
        <span className="chip bg-brand-50 text-brand-700 dark:bg-brand-900/50 dark:text-brand-100">
          <Icon name="lessons" tint="brand" tile={false} className="size-4" />
          {copy.kicker}
        </span>

        {/* step one — the age */}
        <h2 className="mt-4 text-xl sm:text-2xl">{copy.ageTitle}</h2>
        <p className="mt-1.5 text-sm text-muted">{copy.ageHint}</p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {AGES.map((candidate) => {
            const picked = candidate === age;
            return (
              <li key={candidate}>
                <button
                  type="button"
                  onClick={() => setAge(candidate)}
                  aria-pressed={picked}
                  className={`size-11 rounded-2xl border text-base font-extrabold transition-colors ${
                    picked
                      ? "border-brand-600 bg-brand-600 text-white"
                      : "border-line bg-surface hover:bg-surface-muted"
                  }`}
                >
                  {num(candidate, locale)}
                </button>
              </li>
            );
          })}
        </ul>

        {/* step two — the curriculum, revealed once an age is in */}
        {age !== null ? (
          <>
            <h3 className="mt-7 text-lg">{copy.curriculumTitle}</h3>
            <ul className="mt-3 grid gap-2 sm:grid-cols-3">
              {curricula.map((candidate) => {
                const picked = candidate.id === curriculumId;
                return (
                  <li key={candidate.id}>
                    <button
                      type="button"
                      onClick={() => setCurriculumId(candidate.id)}
                      aria-pressed={picked}
                      className={`flex w-full items-center gap-2 rounded-2xl border px-3 py-2.5 text-start text-sm font-bold transition-colors ${
                        picked
                          ? "border-brand-600 bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-100"
                          : "border-line bg-surface hover:bg-surface-muted"
                      }`}
                    >
                      <span aria-hidden className="text-xl">
                        {candidate.flag}
                      </span>
                      {candidate.title}
                    </button>
                  </li>
                );
              })}
            </ul>
          </>
        ) : null}

        {/* the answer */}
        {grade && curriculum ? (
          <div className="mt-6 rounded-3xl bg-surface-muted p-4">
            <p className="text-xs font-bold text-muted">{copy.resultTitle}</p>
            <p className="mt-1 font-display text-xl font-extrabold">
              {curriculum.flag} {grade.short}
            </p>
            <Link href={`/grade/${grade.id}`} className="btn btn-coral mt-3 w-full py-3">
              {copy.open}
              <Chevron />
            </Link>
            <p className="mt-2.5 text-center text-xs text-muted">{copy.freeNote}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/**
 * The grade a child of this age sits in, clamped to the curriculum's own range —
 * the American catalogue stops a year earlier than the other two.
 */
function gradeFor(curriculum: FinderCurriculum, age: number) {
  const wanted = age - KINDERGARTEN_AGE;
  const ordinals = curriculum.grades.map((grade) => grade.ordinal);
  const lowest = Math.min(...ordinals);
  const highest = Math.max(...ordinals);
  const clamped = Math.min(Math.max(wanted, lowest), highest);
  return curriculum.grades.find((grade) => grade.ordinal === clamped) ?? null;
}
