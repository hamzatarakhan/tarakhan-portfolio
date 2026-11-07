import { notFound } from "next/navigation";
import { getDict, isLocale } from "@/lib/i18n";
import { Footer, Header, wrap } from "@/components/Chrome";
import { Txt } from "@/components/Txt";

export default async function About({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  const a = t.aboutPage;
  const h2 = "display text-xl font-semibold";
  return (
    <>
      <Header lang={lang} t={t} />
      <main id="main" className={`${wrap} pt-12 pb-20`}>
        <h1 className="display text-3xl font-semibold sm:text-4xl">{a.title}</h1>
        <div className="mt-8 grid gap-10 md:grid-cols-[1fr_16rem]">
          <div className="max-w-prose space-y-4 text-lg text-muted">{a.intro.map((p) => <p key={p}>{p}</p>)}</div>
          <div className="grid aspect-[4/5] place-items-center rounded-lg border border-dashed border-line bg-surface text-sm" role="img" aria-label="Photo placeholder"><Txt>{a.photo}</Txt></div>
        </div>

        <section className="mt-16">
          <h2 className={h2}>{a.how.title}</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {a.how.items.map((i) => <li key={i} className="rounded-md border border-line bg-surface p-4">{i}</li>)}
          </ul>
        </section>

        <section className="mt-16">
          <h2 className={h2}>{a.timeline.title}</h2>
          <div className="mt-4 space-y-2">
            {a.timeline.items.map((it, n) => (
              <details key={n} open={n === 0} className="group rounded-md border border-line bg-surface open:shadow-1">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 p-4">
                  <span><span className="font-medium">{it.role}</span> · <span className="text-muted">{it.org}</span></span>
                  <span className="font-mono text-xs text-muted"><Txt>{it.when}</Txt></span>
                </summary>
                <p className="px-4 pb-4 text-muted"><Txt>{it.body}</Txt></p>
              </details>
            ))}
          </div>
        </section>

        <div className="mt-16 grid gap-10 md:grid-cols-2">
          {[a.edu, a.tools].map((s) => (
            <section key={s.title}>
              <h2 className={h2}>{s.title}</h2>
              <ul className="mt-4 space-y-2 text-muted">{s.items.map((i) => <li key={i}>{i}</li>)}</ul>
            </section>
          ))}
        </div>
      </main>
      <Footer lang={lang} t={t} />
    </>
  );
}
