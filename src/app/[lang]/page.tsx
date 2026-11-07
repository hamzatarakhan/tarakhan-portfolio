import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict, isLocale } from "@/lib/i18n";
import { Footer, Header, wrap } from "@/components/Chrome";
import { CopyEmail, CountUp, ProcessTabs } from "@/components/HomeClient";
import { Txt } from "@/components/Txt";

const h2 = "display text-3xl font-semibold sm:text-4xl lg:text-5xl";
const pill = "inline-flex min-h-12 items-center rounded-full px-7 font-medium transition-transform duration-[var(--dur-fast)] active:scale-[0.97]";
const btnPrimary = `${pill} bg-accent text-on-accent`;
const btnGhost = `${pill} border border-line hover:bg-surface-2`;
const num = (n: number) => String(n + 1).padStart(2, "0");

function Head({ n, label, title, intro }: { n: string; label: string; title: string; intro?: string }) {
  return (
    <div className="mb-12 grid gap-4 lg:grid-cols-[14rem_1fr]">
      <p className="label text-muted" aria-hidden title={label}>({n})</p>
      <div>
        <h2 className={h2}>{title}</h2>
        {intro && <p className="mt-4 max-w-prose text-lg text-muted">{intro}</p>}
      </div>
    </div>
  );
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  const [first, ...rest] = t.hero.name.split(" ");
  const marquee = [...t.marquee, ...t.marquee];
  const s = (i: number) => ({ "--i": i }) as React.CSSProperties;

  return (
    <>
      <Header lang={lang} t={t} />
      <main id="main">
        {/* 01 — Hero */}
        <section className={`${wrap} pt-12 sm:pt-20`}>
          <p className="rise label inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5" style={s(0)}>
            <span className="size-2 rounded-full bg-accent" aria-hidden /> {t.hero.status}
          </p>
          <h1 className="name rise mt-10 sm:mt-14" style={s(1)} aria-label={t.hero.name}>
            <span>{first}</span>
            <span className="dim">{rest.join(" ")}</span>
          </h1>
          <div className="rise mt-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end" style={s(3)}>
            <div>
              <p className="label text-accent">{t.hero.eyebrow}</p>
              <p className="display mt-4 max-w-3xl text-2xl font-light sm:text-3xl" style={{ lineHeight: "var(--lh-body)", letterSpacing: "-0.02em" }}>
                {t.hero.headline}
              </p>
              <p className="mt-4 max-w-prose text-muted">{t.hero.sub}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="#work" className={btnPrimary}>{t.hero.cta1}</a>
              <Link href={`/${lang}/contact`} className={btnGhost}>{t.hero.cta2}</Link>
            </div>
          </div>
          <dl className="rise mt-14 grid grid-cols-2 border-t border-line md:grid-cols-3 lg:grid-cols-6" style={s(4)}>
            {t.facts.items.map(([k, v]) => (
              <div key={k} className="border-b border-line py-4 pe-4 lg:border-b-0">
                <dt className="label text-muted">{k}</dt>
                <dd className="mt-1.5 text-sm">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Marquee */}
        <div className="mt-16 overflow-hidden border-y border-line py-5" dir="ltr" aria-hidden>
          <div className="marquee-track display text-3xl font-light sm:text-5xl">
            {marquee.map((m, i) => (
              <span key={i} className="me-12 whitespace-nowrap">{m} <b className="ms-12 font-medium text-accent">●</b></span>
            ))}
          </div>
        </div>

        {/* 02 — Proof */}
        <section aria-label="Key numbers" className="border-b border-line">
          <div className={wrap}>
            <dl className="grid grid-cols-2 lg:grid-cols-4">
              {t.proof.items.map((it, i) => (
                <div key={it.label} className={`border-line py-10 pe-4 ${i % 2 === 0 ? "border-e" : ""} lg:border-e lg:ps-8 lg:first:ps-0 lg:last:border-e-0`}>
                  <dd className="display order-1 text-6xl font-extrabold tabular-nums sm:text-7xl lg:text-8xl">
                    <CountUp to={it.n} suffix={it.suffix} />
                  </dd>
                  <dt className="label mt-3 text-muted">{it.label}</dt>
                </div>
              ))}
            </dl>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-2 border-t border-line py-6">
              <span className="label text-muted">{t.proof.brandsLabel}</span>
              {t.proof.brands.map((b) => <span key={b} dir="ltr" className="display text-xl font-medium">{b}</span>)}
            </div>
          </div>
        </section>

        {/* 03 — Work index */}
        <section id="work" className={`${wrap} scroll-mt-16 py-24`}>
          <Head n="03" label={t.work.title} title={t.work.title} intro={t.work.intro} />
          <div className="border-b border-line">
            {t.work.items.map((w, i) => (
              <Link key={w.slug} href={`/${lang}/work/${w.slug}`} className="idx-row group relative grid gap-3 border-t border-line py-8 md:grid-cols-[4rem_1fr_16rem_3rem] md:items-center md:py-10">
                <span className="label text-muted">{num(i)}</span>
                <div className="transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out)] group-hover:translate-x-3 rtl:group-hover:-translate-x-3">
                  <h3 className="display text-4xl font-medium transition-colors group-hover:text-accent sm:text-5xl lg:text-7xl">{w.title}</h3>
                  <p className="mt-3 max-w-xl text-muted">{w.outcome}</p>
                  <p className="label mt-3 text-accent">{w.role}</p>
                </div>
                <ul className="flex flex-wrap gap-2 md:justify-end">
                  {w.tags.map((g) => <li key={g} className="label rounded-full border border-line px-3 py-1.5 text-muted">{g}</li>)}
                </ul>
                <span aria-hidden className="flip-rtl hidden text-3xl transition-transform group-hover:translate-x-1 md:block">↗</span>
                <span className="peek absolute end-24 top-2 z-10 hidden h-44 w-72 overflow-hidden rounded-lg border border-line bg-surface shadow-2 lg:block" aria-hidden>
                  <span className="label grid h-full place-items-center bg-[repeating-linear-gradient(135deg,var(--surface)_0_10px,var(--surface-2)_10px_20px)] text-muted">Preview — {w.title}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* 04 — Why me */}
        <section className="border-y border-line bg-surface py-24">
          <div className={wrap}>
            <Head n="04" label={t.why.title} title={t.why.title} />
            <ol>
              {t.why.items.map((w, i) => (
                <li key={w.t} className="grid gap-3 border-t border-line py-7 lg:grid-cols-[4rem_1fr_1.2fr] lg:gap-8">
                  <span className="label text-muted">{num(i)}</span>
                  <h3 className="display text-2xl font-medium sm:text-3xl">{w.t}</h3>
                  <p className="text-muted">{w.b}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 05 — Services */}
        <section className={`${wrap} py-24`}>
          <Head n="05" label={t.services.title} title={t.services.title} />
          <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
            {t.services.items.map((sv, i) => (
              <article key={sv.title} className="bg-bg p-7 sm:p-9">
                <span className="label text-muted">{num(i)}</span>
                <h3 className="display mt-6 text-2xl font-medium sm:text-3xl">{sv.title}</h3>
                <p className="mt-3 text-muted">{sv.body}</p>
                <p className="mt-6 border-t border-line pt-4 text-sm"><span className="label me-2 text-accent">{t.services.getLabel}</span>{sv.get}</p>
              </article>
            ))}
          </div>
        </section>

        {/* 06 — Process */}
        <section className="border-t border-line bg-surface py-24">
          <div className={wrap}>
            <Head n="06" label={t.process.title} title={t.process.title} intro={t.process.intro} />
            <ProcessTabs steps={t.process.steps} />
          </div>
        </section>

        {/* 07 — Independent products */}
        <section className={`${wrap} py-24`}>
          <Head n="07" label={t.play.title} title={t.play.title} intro={t.play.intro} />
          <ul className="grid border-b border-line md:grid-cols-2 md:gap-x-12">
            {t.play.items.map((p, i) => (
              <li key={p.name} className="group flex items-baseline gap-4 border-t border-line py-5">
                <span className="label w-8 text-muted">{num(i)}</span>
                <span className="display flex-1 text-2xl font-medium transition-colors group-hover:text-accent">{p.name}</span>
                <span className="label text-end text-muted">{p.tag}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 08 — Capabilities */}
        <section className="border-y border-line bg-surface py-24">
          <div className={wrap}>
            <Head n="08" label={t.skills.title} title={t.skills.title} />
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
              {t.skills.groups.map((g) => (
                <div key={g.name}>
                  <h3 className="label text-accent">{g.name}</h3>
                  <ul className="mt-4 space-y-2">{g.items.map((it) => <li key={it} className="border-b border-line pb-2 text-sm">{it}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 09 — About */}
        <section className={`${wrap} py-24`}>
          <Head n="09" label={t.aboutPage.title} title={t.about.title} />
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="max-w-prose text-lg text-muted">{t.about.body}</p>
              <Link href={`/${lang}/about`} className={`${btnGhost} mt-8`}>{t.about.cta}</Link>
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="label text-accent">{t.aboutPage.timeline.title}</h3>
                <p className="mt-3"><span className="font-medium">{t.aboutPage.timeline.items[0].role}</span> · <span className="text-muted">{t.aboutPage.timeline.items[0].org}</span></p>
                <p className="label mt-1 text-muted"><Txt>{t.aboutPage.timeline.items[0].when}</Txt></p>
              </div>
              <div>
                <h3 className="label text-accent">{t.aboutPage.edu.title}</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted">{t.aboutPage.edu.items.map((e) => <li key={e}>{e}</li>)}</ul>
              </div>
            </div>
          </div>
        </section>

        {/* 10 — Contact */}
        <section id="contact" className="scroll-mt-16 border-t border-line bg-accent text-on-accent">
          <div className={`${wrap} py-24`}>
            <p className="label opacity-70">({"10"}) {t.nav.contact}</p>
            <h2 className="name mt-6" style={{ fontSize: "clamp(3.5rem, 11vw, 11rem)", lineHeight: 0.9 }}>{t.contact.title}</h2>
            <p className="mt-8 max-w-prose text-lg opacity-80">{t.contact.body}</p>
            <p className="display mt-8 break-all text-2xl font-medium sm:text-4xl" dir="ltr">
              <a href={`mailto:${t.contact.email}`} className="underline decoration-2 underline-offset-8">{t.contact.email}</a>
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/${lang}/contact`} className={`${pill} bg-on-accent text-accent`}>{t.contact.form}</Link>
              <CopyEmail email={t.contact.email} copy={t.contact.copy} copied={t.contact.copied} />
              <a className={`${pill} border border-current`} href="https://linkedin.com/in/hamza-tarakhan-b8ab961a5" target="_blank" rel="noopener noreferrer">{t.contact.linkedin}</a>
            </div>
            <p className="label mt-8 opacity-70"><Txt>{t.contactPage.cv}</Txt> · <Txt>{t.contactPage.whatsapp}</Txt></p>
          </div>
        </section>
      </main>
      <Footer lang={lang} t={t} />
    </>
  );
}
