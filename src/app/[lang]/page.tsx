import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict, isLocale } from "@/lib/i18n";
import { Footer, Header, wrap } from "@/components/Chrome";
import { SkinPicker } from "@/components/Controls";
import { CopyEmail, CountUp, ProcessTabs } from "@/components/HomeClient";

const h2 = "display text-2xl font-semibold sm:text-3xl";
const btnPrimary =
  "inline-flex min-h-11 items-center rounded-md bg-accent px-5 font-medium text-on-accent transition-transform duration-[var(--dur-fast)] active:scale-[0.97]";
const btnGhost =
  "inline-flex min-h-11 items-center rounded-md border border-line bg-surface px-5 font-medium transition-colors hover:bg-surface-2 active:scale-[0.97]";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);

  return (
    <>
      <Header lang={lang} t={t} />
      <main id="main">
        {/* Hero */}
        <section className={`${wrap} pt-14 pb-16 sm:pt-24 sm:pb-24`}>
          <p className="rise inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-sm" style={{ "--i": 0 } as React.CSSProperties}>
            <span className="size-2 rounded-full bg-accent" aria-hidden /> {t.hero.status}
          </p>
          <p className="rise mt-6 font-mono text-sm text-accent" style={{ "--i": 1 } as React.CSSProperties}>{t.hero.eyebrow}</p>
          <h1 className="display rise mt-3 max-w-4xl text-4xl font-semibold" style={{ "--i": 2 } as React.CSSProperties}>{t.hero.headline}</h1>
          <p className="rise mt-5 max-w-prose text-lg text-muted" style={{ "--i": 3 } as React.CSSProperties}>{t.hero.sub}</p>
          <div className="rise mt-8 flex flex-wrap gap-3" style={{ "--i": 4 } as React.CSSProperties}>
            <a href="#work" className={btnPrimary}>{t.hero.cta1}</a>
            <a href="#contact" className={btnGhost}>{t.hero.cta2}</a>
          </div>
          <div className="rise mt-12 max-w-xl rounded-lg border border-line bg-surface p-5 shadow-1" style={{ "--i": 5 } as React.CSSProperties}>
            <p className="font-mono text-xs text-muted">{t.hero.skinsLabel}</p>
            <SkinPicker className="mt-3" />
            <p className="mt-3 text-sm text-muted">{t.hero.skinsCaption}</p>
          </div>
        </section>

        {/* Proof strip */}
        <section className="border-y border-line bg-surface" aria-label="Key numbers">
          <div className={`${wrap} py-10`}>
            <dl className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              {t.proof.items.map((it) => (
                <div key={it.label}>
                  <dt className="order-2 mt-1 text-sm text-muted">{it.label}</dt>
                  <dd className="display order-1 text-3xl font-semibold tabular-nums">
                    <CountUp to={it.n} suffix={it.suffix} />
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-6 text-sm">
              <span className="text-muted">{t.proof.brandsLabel}</span>
              {t.proof.brands.map((b) => (
                <span key={b} dir="ltr" className="font-medium">{b}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Work */}
        <section id="work" className={`${wrap} scroll-mt-16 py-20`}>
          <h2 className={h2}>{t.work.title}</h2>
          <p className="mt-2 max-w-prose text-muted">{t.work.intro}</p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {t.work.items.map((w) => (
              <Link key={w.slug} href={`/${lang}/work/${w.slug}`} className="group block overflow-hidden rounded-lg border border-line bg-surface shadow-1 transition-[box-shadow,transform] duration-[var(--dur-base)] ease-[var(--ease-out)] hover:-translate-y-1 hover:shadow-2">
                <div className="grid aspect-[16/10] place-items-center bg-gradient-to-br from-accent-soft to-surface-2 p-8" aria-hidden>
                  <div className="w-3/4 space-y-3 rounded-md border border-line bg-surface p-4 shadow-1 transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out)] group-hover:scale-[1.03]">
                    <div className="h-2.5 w-1/3 rounded-full bg-accent" />
                    <div className="h-2 w-full rounded-full bg-surface-2" />
                    <div className="h-2 w-4/5 rounded-full bg-surface-2" />
                    <div className="h-7 w-24 rounded-sm bg-accent/90" />
                  </div>
                </div>
                <div className="p-6">
                  <p className="font-mono text-xs text-accent">{w.role}</p>
                  <h3 className="display mt-1 text-xl font-semibold">{w.title}</h3>
                  <p className="mt-2 text-muted">{w.outcome}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {w.tags.map((g) => (
                      <li key={g} className="rounded-full bg-surface-2 px-3 py-1 text-xs">{g}</li>
                    ))}
                  </ul>
                  <p className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent">
                    {t.work.view} <span aria-hidden className="flip-rtl transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">→</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Services */}
        <section className="border-t border-line bg-surface py-20">
          <div className={wrap}>
            <h2 className={h2}>{t.services.title}</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {t.services.items.map((s) => (
                <article key={s.title} className="rounded-lg border border-line bg-bg p-6">
                  <h3 className="display text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-muted">{s.body}</p>
                  <p className="mt-4 text-sm"><span className="font-medium text-accent">{t.services.getLabel}: </span>{s.get}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className={`${wrap} py-20`}>
          <h2 className={h2}>{t.process.title}</h2>
          <p className="mt-2 mb-10 max-w-prose text-muted">{t.process.intro}</p>
          <ProcessTabs steps={t.process.steps} />
        </section>

        {/* Independent products */}
        <section className="border-t border-line bg-surface py-20">
          <div className={wrap}>
            <h2 className={h2}>{t.play.title}</h2>
            <p className="mt-2 max-w-prose text-muted">{t.play.intro}</p>
            <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {t.play.items.map((p) => (
                <li key={p.name} className="rounded-md border border-line bg-bg p-4 transition-colors hover:border-accent">
                  <p className="font-medium">{p.name}</p>
                  <p className="text-sm text-muted">{p.tag}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* About teaser */}
        <section className={`${wrap} py-20`}>
          <div className="max-w-3xl">
            <h2 className={h2}>{t.about.title}</h2>
            <p className="mt-4 text-lg text-muted">{t.about.body}</p>
            <Link href={`/${lang}/about`} className={`${btnGhost} mt-6`}>{t.about.cta}</Link>
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact" className="scroll-mt-16 border-t border-line bg-accent-soft py-20">
          <div className={wrap}>
            <h2 className="display text-3xl font-semibold sm:text-4xl">{t.contact.title}</h2>
            <p className="mt-3 max-w-prose text-muted">{t.contact.body}</p>
            <p className="mt-6 font-mono text-lg" dir="ltr">
              <a href={`mailto:${t.contact.email}`} className="underline underline-offset-4">{t.contact.email}</a>
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <CopyEmail email={t.contact.email} copy={t.contact.copy} copied={t.contact.copied} />
              <a className={btnGhost} href="https://linkedin.com/in/hamza-tarakhan-b8ab961a5" target="_blank" rel="noopener noreferrer">{t.contact.linkedin}</a>
              {/* {{TODO: CV PDF and contact form}} */}
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} t={t} />
    </>
  );
}
