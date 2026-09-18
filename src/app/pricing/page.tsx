import type { Metadata } from "next";
import { getI18n } from "@/lib/i18n/server";
import { getViewer } from "@/lib/auth/current";
import { PlanCards } from "@/components/plan-cards";
import { SectionHeading } from "@/components/ui";

export const metadata: Metadata = { title: "Pricing" };

export default async function PricingPage() {
  const { d } = await getI18n();
  const viewer = await getViewer();

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <SectionHeading title={d.pricing.title} body={d.pricing.subtitle} />
      <PlanCards signedIn={Boolean(viewer)} currentPlanId={viewer?.subscription?.planId} />

      <p className="mt-10 text-center text-sm text-muted">{d.pricing.guarantee}</p>
      <p className="mx-auto mt-4 w-fit rounded-2xl border border-line bg-surface-muted px-4 py-2 text-center text-xs text-muted">
        ⚠️ {d.pricing.demoNotice}
      </p>
    </div>
  );
}
