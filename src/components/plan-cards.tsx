"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { subscribeAction, type FormState } from "@/lib/auth/actions";
import { plans, currency } from "@/lib/billing/plans";
import { useI18n } from "@/lib/i18n/client";
import { t } from "@/lib/i18n/config";

export function PlanCards({ signedIn, currentPlanId }: { signedIn: boolean; currentPlanId?: string }) {
  const { locale, d } = useI18n();
  const [interval, setInterval] = useState<"monthly" | "yearly">("yearly");
  const [state, formAction, pending] = useActionState<FormState, FormData>(subscribeAction, {});

  return (
    <div>
      <div className="mx-auto mt-8 flex w-fit rounded-full border border-line bg-surface-muted p-1">
        {(["monthly", "yearly"] as const).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setInterval(option)}
            aria-pressed={interval === option}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
              interval === option ? "bg-brand-600 text-white" : "text-muted"
            }`}
          >
            {option === "monthly" ? d.pricing.monthly : d.pricing.yearly}
          </button>
        ))}
      </div>
      {interval === "yearly" ? <p className="mt-2 text-center text-sm text-mint-600">🎁 {d.pricing.saveHint}</p> : null}

      {state.ok ? (
        <p role="status" className="mx-auto mt-6 w-fit rounded-2xl border border-mint-300 bg-mint-50 px-5 py-3 text-sm font-semibold dark:border-mint-700 dark:bg-mint-900/30">
          ✅ {d.pricing.subscribed}
        </p>
      ) : null}
      {state.error === "need_login" ? (
        <p role="alert" className="mx-auto mt-6 w-fit rounded-2xl border border-sun-300 bg-sun-50 px-5 py-3 text-sm dark:border-sun-700 dark:bg-sun-900/30">
          {d.pricing.needLogin}
        </p>
      ) : null}

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {plans.map((plan) => {
          const price = interval === "monthly" ? plan.monthly : plan.yearly;
          const isCurrent = currentPlanId === plan.id;

          return (
            <article key={plan.id} className={`card flex flex-col p-6 ${plan.popular ? "ring-2 ring-brand-400" : ""}`}>
              {plan.popular ? <span className="chip w-fit bg-brand-600 text-white">{d.pricing.popular}</span> : null}
              <h2 className="mt-2 text-xl font-bold">{t(plan.title, locale)}</h2>
              <p className="text-sm text-muted">{t(plan.tagline, locale)}</p>

              <p className="mt-5 text-4xl font-extrabold">
                {price}
                <span className="text-base font-medium text-muted">
                  {" "}
                  {t(currency, locale)} {interval === "monthly" ? d.pricing.perMonth : d.pricing.perYear}
                </span>
              </p>

              <ul className="mt-5 flex-1 space-y-2 text-sm">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex gap-2">
                    <span aria-hidden className="text-mint-500">
                      ✓
                    </span>
                    <span>{t(feature, locale)}</span>
                  </li>
                ))}
              </ul>

              {signedIn ? (
                <form action={formAction} className="mt-6">
                  <input type="hidden" name="planId" value={plan.id} />
                  <input type="hidden" name="interval" value={interval} />
                  <button type="submit" className="btn btn-primary w-full" disabled={pending || isCurrent}>
                    {isCurrent ? d.pricing.current : pending ? d.common.loading : d.pricing.choose}
                  </button>
                </form>
              ) : (
                <Link href="/register" className="btn btn-primary mt-6 w-full">
                  {d.pricing.choose}
                </Link>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
