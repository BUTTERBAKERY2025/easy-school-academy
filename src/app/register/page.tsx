import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getI18n } from "@/lib/i18n/server";
import { getCurrentUser } from "@/lib/auth/current";
import { RegisterForm } from "@/components/auth-forms";
import { EnrolmentFields } from "@/components/enrolment";

export const metadata: Metadata = { title: "Create an account" };

export default async function RegisterPage() {
  if (await getCurrentUser()) redirect("/learn");
  const { d } = await getI18n();

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-2xl font-extrabold">{d.auth.registerTitle}</h1>
      <p className="mt-2 text-muted">{d.auth.registerSubtitle}</p>

      <div className="card mt-8 p-6">
        <RegisterForm enrolmentFields={<EnrolmentFields />} />
      </div>
    </div>
  );
}
