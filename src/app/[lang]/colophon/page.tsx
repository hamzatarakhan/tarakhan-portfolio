import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict, isLocale } from "@/lib/i18n";
import { Footer, Header, wrap } from "@/components/Chrome";
import { Txt } from "@/components/Txt";

const st = (i: number) => ({ "--i": i }) as React.CSSProperties;

export default async function Colophon({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  const c = t.colophon;
  return (
    <>
      <Header lang={lang} t={t} />
      <main id="main" className={`${wrap} pt-10 pb-24`}>
        <h1 className="display rise text-4xl font-medium sm:text-6xl" style={st(0)}>{c.title}</h1>
        <p className="rise mt-5 max-w-prose text-lg text-muted" style={st(1)}>{c.intro}</p>
        <dl className="mt-12 grid gap-4 md:grid-cols-2">
          {c.items.map(([k, v], i) => (
            <div key={k} className="glass reveal p-6" style={st(i % 2)}>
              <dt className="label text-accent">{k}</dt>
              <dd className="mt-2 text-lg"><Txt>{v}</Txt></dd>
            </div>
          ))}
        </dl>
        <Link href={`/${lang}/system`} className="mt-10 inline-flex min-h-12 items-center rounded-full border border-accent px-7 font-medium text-accent transition-colors hover:bg-accent hover:text-on-accent">{c.system}</Link>
      </main>
      <Footer lang={lang} t={t} />
    </>
  );
}
