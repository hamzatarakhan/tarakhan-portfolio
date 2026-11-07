import Link from "next/link";
import { headers } from "next/headers";
import { getDict, isLocale } from "@/lib/i18n";
import { wrap } from "@/components/Chrome";

// Rendered inside the [lang] layout, so theme, skin and direction already apply.
export default async function NotFound() {
  const seg = ((await headers()).get("x-pathname") ?? "").split("/")[1];
  const lang = isLocale(seg) ? seg : "en";
  const t = getDict(lang).notFound;
  return (
    <main className={`${wrap} grid min-h-dvh place-items-center text-center`}>
      <div>
        <p className="display text-4xl font-semibold text-accent" aria-hidden>404</p>
        <h1 className="display mt-3 text-3xl font-semibold">{t.title}</h1>
        <p className="mt-3 text-muted">{t.body}</p>
        <Link href={`/${lang}`} className="mt-6 inline-flex min-h-11 items-center rounded-md bg-accent px-5 font-medium text-on-accent">{t.home}</Link>
      </div>
    </main>
  );
}
