import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDict, isLocale, locales } from "@/lib/i18n";
import { cases } from "@/content/work";
import { Footer, Header, wrap } from "@/components/Chrome";
import { Txt } from "@/components/Txt";
import { Icon } from "@/components/Mock";
import { ActivationDemo, LedgerDemo, ReaderDemo, TokenDiagram } from "@/components/Artifacts";

export const generateStaticParams = () => locales.flatMap((lang) => cases.map((c) => ({ lang, slug: c.slug })));

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const c = cases.find((x) => x.slug === slug);
  return c && isLocale(lang) ? { title: `${c[lang].title} — Hamza Tarakhan`, description: c[lang].tldr.problem } : {};
}

const h2 = "display text-2xl font-medium scroll-mt-28 sm:text-4xl";
const chip = "label inline-flex rounded-full border border-[var(--glass-line)] bg-[var(--glass)] px-3 py-1.5 text-muted";
const st = (i: number) => ({ "--i": i }) as React.CSSProperties;

export default async function CaseStudy({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const idx = cases.findIndex((x) => x.slug === slug);
  if (idx < 0) notFound();
  const t = getDict(lang);
  const k = t.case;
  const c = cases[idx][lang];
  const nextCase = cases[(idx + 1) % cases.length];
  const toc = (["problem", "found", "decisions", "solution", "impact", "next"] as const).map((id, n) => [id, k.sections[id], n] as const);
  const Demo = { activation: ActivationDemo, tokens: TokenDiagram, reader: ReaderDemo, ledger: LedgerDemo }[cases[idx].artifact];
  const tl = [["role", c.tldr.role], ["team", c.tldr.team], ["timeline", c.tldr.timeline], ["platform", c.tldr.platform]] as const;
  const sec = (id: (typeof toc)[number][0], n: number) => (
    <div className="mb-6 flex items-center gap-3">
      <span className={chip}>{String(n + 1).padStart(2, "0")}</span>
      <h2 id={id} className={h2}>{k.sections[id]}</h2>
    </div>
  );

  return (
    <>
      <div className="progress fixed inset-x-0 top-0 z-40 h-0.5 origin-left bg-accent rtl:origin-right" aria-hidden />
      <Header lang={lang} t={t} />
      <main id="main" className={`${wrap} pt-8 pb-24`}>
        <Link href={`/${lang}#work`} className="rise inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-fg" style={st(0)}>
          <span aria-hidden className="flip-rtl">←</span> {k.back}
        </Link>
        <h1 className="display rise mt-4 max-w-4xl text-4xl font-medium sm:text-6xl lg:text-7xl" style={st(1)}>{c.title}</h1>
        <p className="rise mt-5 max-w-2xl text-lg text-muted" style={st(2)}><Txt>{c.tldr.problem}</Txt></p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_14rem]">
          <div className="min-w-0 space-y-20">
            <section aria-label={k.tldr} className="glass rise p-6 sm:p-8" style={st(3)}>
              <p className="label text-accent">{k.tldr}</p>
              <dl className="mt-5 grid gap-x-10 gap-y-5 sm:grid-cols-2">
                {tl.map(([key, v]) => (
                  <div key={key}><dt className="label text-muted">{k[key]}</dt><dd className="mt-1"><Txt>{v}</Txt></dd></div>
                ))}
                <div className="sm:col-span-2 border-t border-[var(--glass-line)] pt-5">
                  <dt className="label text-muted">{k.outcome}</dt><dd className="mt-1 text-lg"><Txt>{c.tldr.outcome}</Txt></dd>
                </div>
              </dl>
            </section>

            <section className="reveal">
              {sec("problem", 0)}
              <div className="max-w-prose space-y-4 text-lg text-muted">{c.problem.map((p, i) => <p key={i}><Txt>{p}</Txt></p>)}</div>
            </section>

            <section className="reveal">
              {sec("found", 1)}
              <ul className="grid gap-4 sm:grid-cols-2">{c.found.map((p, i) => <li key={i} className="glass p-5 text-muted"><Txt>{p}</Txt></li>)}</ul>
            </section>

            <section>
              <div className="reveal">{sec("decisions", 2)}</div>
              <div className="space-y-4">
                {c.decisions.map((d, i) => (
                  <article key={i} className="glass reveal p-6 sm:p-8" style={st(i % 2)}>
                    <h3 className="display flex items-center gap-4 text-xl font-medium sm:text-2xl">
                      <span className="display text-4xl font-semibold text-accent/70">{String(i + 1).padStart(2, "0")}</span>{d.title}
                    </h3>
                    <dl className="mt-5 grid gap-5 text-sm sm:grid-cols-3">
                      {([[k.options, d.options], [k.chose, d.chose], [k.why, d.why]] as const).map(([l, v]) => (
                        <div key={l}><dt className="label text-accent">{l}</dt><dd className="mt-1.5 text-base text-muted"><Txt>{v}</Txt></dd></div>
                      ))}
                    </dl>
                  </article>
                ))}
              </div>
            </section>

            <section className="reveal">
              {sec("solution", 3)}
              <p className="mb-6 max-w-prose text-lg text-muted">{c.solution}</p>
              <p className="label mb-3 inline-flex items-center gap-2 text-accent"><span className="pulse relative size-2 rounded-full bg-accent" aria-hidden />{k.demo}</p>
              <Demo lang={lang} />
            </section>

            <section className="reveal">
              {sec("impact", 4)}
              <ul className="grid gap-4 sm:grid-cols-2">{c.impact.map((p, i) => <li key={i} className="glass p-5 text-lg"><Txt>{p}</Txt></li>)}</ul>
            </section>

            <section className="reveal">
              {sec("next", 5)}
              <div className="max-w-prose space-y-4 text-lg text-muted">{c.next.map((p, i) => <p key={i}><Txt>{p}</Txt></p>)}</div>
            </section>

            <Link href={`/${lang}/work/${nextCase.slug}`} className="glass reveal group flex items-center justify-between gap-6 !rounded-[2rem] p-8 hover:-translate-y-1 sm:p-12">
              <div>
                <p className="label text-accent">{k.next}</p>
                <p className="display mt-3 text-3xl font-medium sm:text-5xl">{nextCase[lang].title}</p>
              </div>
              <span className="grid size-14 shrink-0 place-items-center rounded-full border border-[var(--glass-line)] transition-colors group-hover:bg-accent group-hover:text-on-accent"><Icon name="arrow" className="flip-rtl size-6" /></span>
            </Link>
          </div>

          <aside className="hidden lg:block">
            <nav aria-label={k.contents} className="glass sticky top-28 p-5">
              <p className="label text-muted">{k.contents}</p>
              <ul className="mt-3 space-y-1">
                {toc.map(([id, label, n]) => (
                  <li key={id}><a href={`#${id}`} className="flex min-h-9 items-center gap-3 rounded-full px-2 text-sm text-muted transition-colors hover:bg-accent-soft hover:text-fg"><span className="label">{String(n + 1).padStart(2, "0")}</span>{label}</a></li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      </main>
      <Footer lang={lang} t={t} />
    </>
  );
}
