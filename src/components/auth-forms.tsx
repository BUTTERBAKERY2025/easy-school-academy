"use client";

import { useActionState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { loginAction, registerAction, type FormState } from "@/lib/auth/actions";
import { useI18n } from "@/lib/i18n/client";

function useErrorMessage(error?: string): string | null {
  const { d } = useI18n();
  if (!error) return null;
  if (error === "invalid") return d.auth.errorInvalid;
  if (error === "taken") return d.auth.errorTaken;
  if (error === "short_password") return d.auth.errorShortPassword;
  return d.auth.errorRequired;
}

function ErrorNote({ error }: { error?: string }) {
  const message = useErrorMessage(error);
  if (!message) return null;
  return (
    <p role="alert" className="rounded-2xl border border-sun-300 bg-sun-50 p-3 text-sm dark:border-sun-700 dark:bg-sun-900/30">
      {message}
    </p>
  );
}

export function LoginForm() {
  const { d } = useI18n();
  const [state, formAction, pending] = useActionState<FormState, FormData>(loginAction, {});

  return (
    <form action={formAction} className="space-y-4">
      <ErrorNote error={state.error} />
      <label className="block">
        <span className="mb-1 block text-sm font-semibold">{d.auth.email}</span>
        <input type="email" name="email" required autoComplete="email" className="field" dir="ltr" />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-semibold">{d.auth.password}</span>
        <input type="password" name="password" required autoComplete="current-password" className="field" dir="ltr" />
      </label>
      <button type="submit" className="btn btn-primary w-full" disabled={pending}>
        {pending ? d.common.loading : d.auth.submitLogin}
      </button>
      <p className="text-center text-sm text-muted">
        {d.auth.noAccount}{" "}
        <Link href="/register" className="font-semibold text-brand-600 underline dark:text-brand-300">
          {d.auth.registerTitle}
        </Link>
      </p>
    </form>
  );
}

export function RegisterForm({ enrolmentFields }: { enrolmentFields: ReactNode }) {
  const { d } = useI18n();
  const [state, formAction, pending] = useActionState<FormState, FormData>(registerAction, {});

  return (
    <form action={formAction} className="space-y-4">
      <ErrorNote error={state.error} />
      <label className="block">
        <span className="mb-1 block text-sm font-semibold">{d.auth.name}</span>
        <input type="text" name="name" required autoComplete="name" className="field" />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-semibold">{d.auth.email}</span>
        <input type="email" name="email" required autoComplete="email" className="field" dir="ltr" />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-semibold">{d.auth.password}</span>
        <input type="password" name="password" required minLength={8} autoComplete="new-password" className="field" dir="ltr" />
      </label>

      <fieldset>
        <legend className="mb-2 text-sm font-semibold">{d.auth.role}</legend>
        <div className="grid grid-cols-3 gap-2">
          {[
            { value: "student", label: d.auth.roleStudent, glyph: "🎒" },
            { value: "parent", label: d.auth.roleParent, glyph: "👨‍👩‍👧" },
            { value: "teacher", label: d.auth.roleTeacher, glyph: "🍎" },
          ].map((option, index) => (
            <label
              key={option.value}
              className="flex cursor-pointer flex-col items-center gap-1 rounded-2xl border border-line p-3 text-sm has-checked:border-brand-500 has-checked:bg-brand-50 dark:has-checked:bg-brand-900/30"
            >
              <input type="radio" name="role" value={option.value} defaultChecked={index === 0} className="sr-only" />
              <span aria-hidden className="text-xl">
                {option.glyph}
              </span>
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      {enrolmentFields}

      <button type="submit" className="btn btn-primary w-full" disabled={pending}>
        {pending ? d.common.loading : d.auth.submitRegister}
      </button>
      <p className="text-center text-sm text-muted">
        {d.auth.haveAccount}{" "}
        <Link href="/login" className="font-semibold text-brand-600 underline dark:text-brand-300">
          {d.auth.loginTitle}
        </Link>
      </p>
    </form>
  );
}
