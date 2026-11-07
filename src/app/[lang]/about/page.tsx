import Image from "next/image";
import { notFound } from "next/navigation";
import { getDict, isLocale } from "@/lib/i18n";
import { Footer, Header, wrap } from "@/components/Chrome";
import { Txt } from "@/components/Txt";

const st = (i: number) => ({ "--i": i }) as React.CSSProperties;
const h2 = "display text-2xl font-medium sm:text-3xl";

export default async function About({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  const a = t.aboutPage;
  return (
    <>
      <Header lang={lang} t={t} />
      <main id="main" className={`${wrap} pt-6 pb-14`}>
        <p className="label rise inline-flex rounded-full border border-[var(--glass-line)] bg-[var(--glass)] px-3 py-1.5 text-muted" style={st(0)}>{a.title}</p>
        <div className="mt-6 grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h1 className="display rise text-4xl font-medium sm:text-6xl" style={st(1)}>{t.hero.name}</h1>
            <div className="rise mt-6 max-w-prose space-y-5 text-lg text-muted" style={st(2)}>{a.intro.map((p) => <p key={p}>{p}</p>)}</div>
          </div>
          <div className="glass rise !rounded-[2rem] p-3" style={st(3)}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-white">
                <Image src="/hamza.webp" alt={t.hero.name} fill sizes="(min-width: 1024px) 28rem, 90vw" className="object-cover object-top" />
              </div>
          </div>
        </div>

        <section className="mt-14">
          <h2 className={`${h2} reveal`}>{a.how.title}</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {a.how.items.map((i, n) => <li key={i} className="glass reveal p-6 text-lg" style={st(n % 2)}><span className="display me-3 text-2xl font-semibold text-accent/70">{String(n + 1).padStart(2, "0")}</span>{i}</li>)}
          </ul>
        </section>

        <section className="mt-14">
          <h2 className={`${h2} reveal`}>{a.timeline.title}</h2>
          <div className="mt-8 space-y-3">
            {a.timeline.items.map((it, n) => (
              <details key={n} open={n === 0} className="glass reveal group">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 p-5">
                  <span><span className="display text-lg font-medium">{it.role}</span> · <span className="text-muted">{it.org}</span></span>
                  <span className="label text-muted"><Txt>{it.when}</Txt></span>
                </summary>
                <p className="px-5 pb-5 text-muted"><Txt>{it.body}</Txt></p>
              </details>
            ))}
          </div>
        </section>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {[a.edu, a.tools].map((s) => (
            <section key={s.title} className="glass reveal p-7">
              <h2 className={h2}>{s.title}</h2>
              <ul className="mt-5 space-y-3 text-muted">{s.items.map((i) => <li key={i} className="border-b border-[var(--glass-line)] pb-3 last:border-0">{i}</li>)}</ul>
            </section>
          ))}
        </div>
      </main>
      <Footer lang={lang} t={t} />
    </>
  );
}
