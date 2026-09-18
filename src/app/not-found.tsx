import Link from "next/link";
import { getI18n } from "@/lib/i18n/server";

export default async function NotFound() {
  const { d } = await getI18n();

  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <p className="text-6xl" aria-hidden>
        🧭
      </p>
      <h1 className="mt-6 text-2xl font-bold">{d.common.notFound}</h1>
      <Link href="/" className="btn btn-primary mt-8">
        {d.common.backHome}
      </Link>
    </div>
  );
}
