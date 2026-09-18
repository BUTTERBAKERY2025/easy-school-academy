import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getI18n } from "@/lib/i18n/server";
import { getCurrentUser } from "@/lib/auth/current";
import { LoginForm } from "@/components/auth-forms";

export const metadata: Metadata = { title: "Log in" };

export default async function LoginPage() {
  if (await getCurrentUser()) redirect("/learn");
  const { d } = await getI18n();

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-2xl font-extrabold">{d.auth.loginTitle}</h1>
      <p className="mt-2 text-muted">{d.auth.loginSubtitle}</p>

      <div className="card mt-8 p-6">
        <LoginForm />
      </div>

      <p className="mt-6 rounded-2xl border border-line bg-surface-muted p-4 text-center text-sm text-muted">
        {d.auth.demoHint}
      </p>
    </div>
  );
}
