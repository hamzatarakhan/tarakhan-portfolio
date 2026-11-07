import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict, isLocale } from "@/lib/i18n";
import { Footer, Header, wrap } from "@/components/Chrome";
import { Txt } from "@/components/Txt";

export default async function Colophon({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  const c = t.colophon;
  return (
    <>
      <Header lang={lang} t={t} />
      <main id="main" className={`${wrap} pt-12 pb-20`}>
        <h1 className="display text-3xl font-semibold sm:text-4xl">{c.title}</h1>
        <p className="mt-4 max-w-prose text-lg text-muted">{c.intro}</p>
        <dl className="mt-10 divide-y divide-line border-y border-line">
          {c.items.map(([k, v]) => (
            <div key={k} className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr]">
              <dt className="font-mono text-sm text-muted">{k}</dt>
              <dd><Txt>{v}</Txt></dd>
            </div>
          ))}
        </dl>
        <Link href={`/${lang}/system`} className="mt-8 inline-block text-accent underline underline-offset-4">{c.system}</Link>
      </main>
      <Footer lang={lang} t={t} />
    </>
  );
}
