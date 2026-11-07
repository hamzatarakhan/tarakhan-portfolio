import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDict, isLocale, locales } from "@/lib/i18n";
import { cases } from "@/content/work";
import { Footer, Header, wrap } from "@/components/Chrome";
import { Txt } from "@/components/Txt";
import { ActivationDemo, LedgerDemo, ReaderDemo, TokenDiagram } from "@/components/Artifacts";

export const generateStaticParams = () => locales.flatMap((lang) => cases.map((c) => ({ lang, slug: c.slug })));

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const c = cases.find((x) => x.slug === slug);
  return c && isLocale(lang) ? { title: `${c[lang].title} — Hamza Tarakhan`, description: c[lang].tldr.problem } : {};
}

const h2 = "display text-2xl font-semibold scroll-mt-24";

export default async function CaseStudy({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const idx = cases.findIndex((x) => x.slug === slug);
  if (idx < 0) notFound();
  const t = getDict(lang);
  const k = t.case;
  const c = cases[idx][lang];
  const nextCase = cases[(idx + 1) % cases.length];
  const toc = (["problem", "found", "decisions", "solution", "impact", "next"] as const).map((id) => [id, k.sections[id]] as const);
  const Demo = { activation: ActivationDemo, tokens: TokenDiagram, reader: ReaderDemo, ledger: LedgerDemo }[cases[idx].artifact];
  const tl = [["problem", c.tldr.problem], ["role", c.tldr.role], ["team", c.tldr.team], ["timeline", c.tldr.timeline], ["platform", c.tldr.platform], ["outcome", c.tldr.outcome]] as const;

  return (
    <>
      <div className="progress fixed inset-x-0 top-0 z-40 h-0.5 origin-left bg-accent rtl:origin-right" aria-hidden />
      <Header lang={lang} t={t} />
      <main id="main" className={`${wrap} pt-10 pb-20`}>
        <Link href={`/${lang}#work`} className="text-sm text-muted hover:text-fg"><span aria-hidden className="flip-rtl inline-block">←</span> {k.back}</Link>
        <h1 className="display mt-4 max-w-3xl text-3xl font-semibold sm:text-4xl">{c.title}</h1>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_14rem]">
          <div className="min-w-0 space-y-14">
            <section aria-label={k.tldr} className="rounded-lg border border-line bg-surface p-5 shadow-1 sm:p-6">
              <p className="font-mono text-xs text-accent">{k.tldr}</p>
              <dl className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {tl.map(([key, v]) => (
                  <div key={key} className={key === "problem" || key === "outcome" ? "sm:col-span-2" : ""}>
                    <dt className="text-xs text-muted">{k[key]}</dt>
                    <dd className="mt-0.5"><Txt>{v}</Txt></dd>
                  </div>
                ))}
              </dl>
            </section>

            <section>
              <h2 id="problem" className={h2}>{k.sections.problem}</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted">{c.problem.map((p, i) => <p key={i}><Txt>{p}</Txt></p>)}</div>
            </section>

            <section>
              <h2 id="found" className={h2}>{k.sections.found}</h2>
              <ul className="mt-4 max-w-prose list-disc space-y-3 ps-5 text-muted">{c.found.map((p, i) => <li key={i}><Txt>{p}</Txt></li>)}</ul>
            </section>

            <section>
              <h2 id="decisions" className={h2}>{k.sections.decisions}</h2>
              <div className="mt-6 space-y-4">
                {c.decisions.map((d, i) => (
                  <article key={i} className="rounded-lg border border-line bg-surface p-5">
                    <h3 className="display text-lg font-semibold"><span className="me-2 font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>{d.title}</h3>
                    <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-3">
                      {([[k.options, d.options], [k.chose, d.chose], [k.why, d.why]] as const).map(([l, v]) => (
                        <div key={l}><dt className="text-xs text-muted">{l}</dt><dd className="mt-0.5"><Txt>{v}</Txt></dd></div>
                      ))}
                    </dl>
                  </article>
                ))}
              </div>
            </section>

            <section>
              <h2 id="solution" className={h2}>{k.sections.solution}</h2>
              <p className="mt-4 mb-6 max-w-prose text-muted">{c.solution}</p>
              <p className="mb-2 font-mono text-xs text-accent">{k.demo}</p>
              <Demo lang={lang} />
            </section>

            <section>
              <h2 id="impact" className={h2}>{k.sections.impact}</h2>
              <ul className="mt-4 max-w-prose list-disc space-y-3 ps-5 text-muted">{c.impact.map((p, i) => <li key={i}><Txt>{p}</Txt></li>)}</ul>
            </section>

            <section>
              <h2 id="next" className={h2}>{k.sections.next}</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted">{c.next.map((p, i) => <p key={i}><Txt>{p}</Txt></p>)}</div>
            </section>

            <Link href={`/${lang}/work/${nextCase.slug}`} className="group block rounded-lg border border-line bg-surface p-6 shadow-1 transition-[box-shadow,transform] duration-[var(--dur-base)] ease-[var(--ease-out)] hover:-translate-y-1 hover:shadow-2">
              <p className="font-mono text-xs text-accent">{k.next}</p>
              <p className="display mt-1 text-xl font-semibold">{nextCase[lang].title} <span aria-hidden className="flip-rtl inline-block transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">→</span></p>
            </Link>
          </div>

          <aside className="hidden lg:block">
            <nav aria-label={k.contents} className="sticky top-24">
              <p className="font-mono text-xs text-muted">{k.contents}</p>
              <ul className="mt-3 space-y-1 border-s border-line">
                {toc.map(([id, label]) => (
                  <li key={id}><a href={`#${id}`} className="-ms-px block border-s border-transparent py-1.5 ps-4 text-sm text-muted transition-colors hover:border-accent hover:text-fg">{label}</a></li>
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
