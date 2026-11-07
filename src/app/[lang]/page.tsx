import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict, isLocale } from "@/lib/i18n";
import { Footer, Header, Rich, plain, wrap } from "@/components/Chrome";
import { CopyEmail, CountUp } from "@/components/HomeClient";
import { Icon, Mock } from "@/components/Mock";
import { Txt } from "@/components/Txt";
import { ContactForm } from "@/components/ContactForm";

const h2 = "display text-3xl font-medium sm:text-4xl lg:text-5xl";
const pill = "inline-flex min-h-12 items-center gap-2 rounded-full px-7 font-medium transition-transform duration-[var(--dur-fast)] active:scale-[0.97]";
const btnPrimary = `${pill} bg-accent text-on-accent shadow-[0_10px_40px_-10px_var(--accent)] hover:-translate-y-0.5`;
const btnGhost = `${pill} border border-[var(--glass-line)] bg-[var(--glass)] backdrop-blur hover:border-accent`;
const num = (n: number) => String(n + 1).padStart(2, "0");
const st = (i: number) => ({ "--i": i }) as React.CSSProperties;

function Head({ label, title, intro, center }: { label: string; title: string; intro?: string; center?: boolean }) {
  return (
    <div className={`reveal mb-12 ${center ? "mx-auto max-w-2xl text-center" : "max-w-3xl"}`}>
      <p className="label inline-flex items-center gap-2 rounded-full border border-[var(--glass-line)] bg-[var(--glass)] px-3 py-1.5 text-muted">{label}</p>
      <h2 className={`${h2} mt-5`}><Rich>{title}</Rich></h2>
      {intro && <p className="mt-4 text-lg text-muted">{intro}</p>}
    </div>
  );
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  const cards = [...t.work.items.map((w) => w.title), ...t.play.items.map((p) => p.name)];
  const row1 = cards.slice(0, 7);
  const row2 = cards.slice(7).concat(cards.slice(0, 4));
  const processCols = ["lg:col-span-2", "lg:col-span-2", "lg:col-span-2", "lg:col-span-3", "lg:col-span-3"];
  const icons = ["search", "target", "pen", "flask", "code"];

  return (
    <>
      <Header lang={lang} t={t} />
      <main id="main">
        {/* Hero */}
        <section className={`${wrap} grid items-center gap-12 pt-12 pb-16 lg:grid-cols-[1.15fr_0.85fr] lg:pt-20`}>
          <div>
            <p className="rise label inline-flex items-center gap-3 rounded-full border border-[var(--glass-line)] bg-[var(--glass)] px-4 py-2" style={st(0)}>
              <span className="pulse relative size-2 rounded-full bg-accent" aria-hidden /> {t.hero.status}
            </p>
            <h1 className="display rise mt-7 text-4xl font-medium sm:text-6xl lg:text-7xl" style={st(1)}>
              <Rich>{t.hero.headline}</Rich>
            </h1>
            <p className="rise mt-6 max-w-xl text-lg text-muted" style={st(2)}>{t.hero.sub}</p>
            <div className="rise mt-9 flex flex-wrap gap-3" style={st(3)}>
              <Link href={`/${lang}/contact`} className={btnPrimary}>{t.hero.cta2}</Link>
              <a href="#work" className={btnGhost}>{t.hero.cta1} <Icon name="arrow" className="flip-rtl size-4" /></a>
            </div>
            <p className="label rise mt-8 text-muted" style={st(4)}>{t.hero.eyebrow}</p>
          </div>

          <div className="rise relative mx-auto w-full max-w-md" style={st(2)}>
            <div className="glass !rounded-[2rem] p-3">
              <div className="relative grid aspect-[4/5] place-items-center overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-accent/30 via-accent-soft to-surface">
                <span className="display text-[9rem] font-semibold leading-none text-fg/10 select-none" aria-hidden>HT</span>
                <p className="label absolute bottom-4 start-4 end-4 rounded-full bg-bg/70 px-3 py-2 text-center backdrop-blur"><Txt>{t.aboutPage.photo}</Txt></p>
              </div>
            </div>
            {[
              [t.marquee[0], "-top-4 -start-4 sm:-start-8", 0],
              [t.marquee[2], "top-1/3 -end-3 sm:-end-8", 1.2],
              [t.marquee[3], "-bottom-5 start-6", 2.4],
            ].map(([label, pos, d]) => (
              <span key={label as string} className={`glass float label absolute whitespace-nowrap !rounded-full px-4 py-2.5 shadow-2 ${pos}`} style={{ "--d": d } as React.CSSProperties}>
                {label}
              </span>
            ))}
          </div>
        </section>

        {/* Auto-scrolling project rows */}
        <section aria-hidden className="space-y-5 py-6">
          {[row1, row2].map((row, r) => (
            <div key={r} className={`mq ${r ? "rev" : ""}`} dir="ltr">
              <div className="mq-track">
                {[...row, ...row].map((name, i) => (
                  <div key={i} className="w-72 shrink-0">
                    <Mock v={i + r * 2} className="h-44" />
                    <p className="label mt-3 truncate text-muted">{name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Proof */}
        <section aria-label="Key numbers" className={`${wrap} py-16`}>
          <dl className="glass reveal grid grid-cols-2 !rounded-[2rem] lg:grid-cols-4">
            {t.proof.items.map((it, i) => (
              <div key={it.label} className={`p-7 text-center sm:p-9 ${i < 3 ? "lg:border-e lg:border-[var(--glass-line)]" : ""} ${i % 2 === 0 ? "border-e border-[var(--glass-line)] lg:border-e" : ""}`}>
                <dd className="display shine text-5xl font-semibold tabular-nums sm:text-6xl"><CountUp to={it.n} suffix={it.suffix} /></dd>
                <dt className="label mt-3 text-muted">{it.label}</dt>
              </div>
            ))}
          </dl>
          <p className="label reveal mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-muted">
            {t.proof.brandsLabel}
            {t.proof.brands.map((b) => <span key={b} dir="ltr" className="display text-xl normal-case text-fg">{b}</span>)}
          </p>
        </section>

        {/* Selected work */}
        <section id="work" className={`${wrap} scroll-mt-20 py-20`}>
          <Head label={plain(t.work.title)} title={t.work.title} intro={t.work.intro} center />
          <div className="grid gap-6 md:grid-cols-2">
            {t.work.items.map((w, i) => (
              <Link key={w.slug} href={`/${lang}/work/${w.slug}`} className="glass reveal group block overflow-hidden p-4 hover:-translate-y-1" style={st(i % 2)}>
                <Mock v={i} className="!rounded-2xl h-56 sm:h-64 transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out)] group-hover:scale-[1.02]" />
                <div className="p-3 pt-6">
                  <p className="label text-accent">{w.role}</p>
                  <h3 className="display mt-2 flex items-center justify-between gap-4 text-2xl font-medium sm:text-3xl">
                    {w.title}
                    <span className="grid size-10 shrink-0 place-items-center rounded-full border border-[var(--glass-line)] transition-colors group-hover:bg-accent group-hover:text-on-accent"><Icon name="arrow" className="flip-rtl size-4" /></span>
                  </h3>
                  <p className="mt-3 text-muted">{w.outcome}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">{w.tags.map((g) => <li key={g} className="label rounded-full bg-accent-soft px-3 py-1.5 text-accent">{g}</li>)}</ul>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Services */}
        <section className={`${wrap} grid gap-12 py-20 lg:grid-cols-[0.8fr_1.2fr]`}>
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Head label={plain(t.services.title)} title={t.services.title} intro={t.hero.sub} />
          </div>
          <div className="space-y-4">
            {t.services.items.map((sv, i) => (
              <article key={sv.title} className="glass reveal group flex items-start gap-5 p-6 sm:p-7" style={st(i)}>
                <span className="label mt-1 text-muted">{num(i)}</span>
                <div className="flex-1">
                  <h3 className="display text-xl font-medium sm:text-2xl">{sv.title}</h3>
                  <p className="mt-2 text-muted">{sv.body}</p>
                  <p className="mt-4 text-sm"><span className="label me-2 text-accent">{t.services.getLabel}</span>{sv.get}</p>
                </div>
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-[var(--glass-line)] transition-colors group-hover:bg-accent group-hover:text-on-accent"><Icon name="arrow" className="flip-rtl size-4" /></span>
              </article>
            ))}
          </div>
        </section>

        {/* Why me */}
        <section className={`${wrap} py-20`}>
          <Head label={plain(t.why.title)} title={t.why.title} center />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-6">
            {t.why.items.map((w, i) => (
              <article key={w.t} className={`glass reveal p-7 ${i > 2 ? "lg:col-span-3" : "lg:col-span-2"}`} style={st(i % 3)}>
                <span className="display text-5xl font-semibold text-accent/80">{num(i)}</span>
                <h3 className="display mt-5 text-xl font-medium sm:text-2xl">{w.t}</h3>
                <p className="mt-3 text-muted">{w.b}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className={`${wrap} py-20`}>
          <Head label={plain(t.process.title)} title={t.process.title} intro={t.process.intro} center />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-6">
            {t.process.steps.map((p, i) => (
              <article key={p.name} className={`glass reveal p-7 ${processCols[i]}`} style={st(i % 3)}>
                <div className="flex items-start justify-between">
                  <span className="grid size-12 place-items-center rounded-2xl bg-accent-soft text-accent"><Icon name={icons[i]} /></span>
                  <span className="display text-4xl font-semibold text-fg/15">{num(i)}</span>
                </div>
                <h3 className="display mt-6 text-xl font-medium sm:text-2xl">{p.name}</h3>
                <p className="mt-2 text-muted">{p.body}</p>
                <p className="mt-4 border-s-2 border-accent ps-4 text-sm">{p.example}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Independent products */}
        <section className={`${wrap} py-20`}>
          <Head label={plain(t.play.title)} title={t.play.title} intro={t.play.intro} center />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {t.play.items.map((p, i) => (
              <li key={p.name} className="glass reveal p-5" style={st(i % 5)}>
                <span className="label text-muted">{num(i)}</span>
                <p className="display mt-6 text-xl font-medium">{p.name}</p>
                <p className="mt-1 text-sm text-muted">{p.tag}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Capabilities */}
        <section className={`${wrap} py-20`}>
          <Head label={plain(t.skills.title)} title={t.skills.title} center />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {t.skills.groups.map((g, i) => (
              <div key={g.name} className="glass reveal p-6" style={st(i % 3)}>
                <h3 className="label text-accent">{g.name}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">{g.items.map((it) => <li key={it} className="rounded-full border border-[var(--glass-line)] px-3 py-1.5 text-sm">{it}</li>)}</ul>
              </div>
            ))}
          </div>
        </section>

        {/* About */}
        <section className={`${wrap} py-20`}>
          <div className="glass reveal grid gap-10 !rounded-[2rem] p-8 sm:p-12 lg:grid-cols-2">
            <div>
              <Head label={t.aboutPage.title} title={t.about.title} />
              <p className="-mt-4 max-w-prose text-lg text-muted">{t.about.body}</p>
              <Link href={`/${lang}/about`} className={`${btnGhost} mt-8`}>{t.about.cta}</Link>
            </div>
            <div className="space-y-8 lg:pt-14">
              <div>
                <h3 className="label text-accent">{t.aboutPage.timeline.title}</h3>
                <p className="mt-3 text-lg"><span className="font-medium">{t.aboutPage.timeline.items[0].role}</span> · <span className="text-muted">{t.aboutPage.timeline.items[0].org}</span></p>
                <p className="label mt-1 text-muted"><Txt>{t.aboutPage.timeline.items[0].when}</Txt></p>
              </div>
              <div>
                <h3 className="label text-accent">{t.aboutPage.edu.title}</h3>
                <ul className="mt-3 space-y-2 text-muted">{t.aboutPage.edu.items.map((e) => <li key={e}>{e}</li>)}</ul>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className={`${wrap} py-20`}>
          <Head label={plain(t.testimonials.title)} title={t.testimonials.title} intro={t.testimonials.intro} center />
          <div className="grid gap-6 md:grid-cols-3">
            {t.testimonials.items.map((q, i) => (
              <figure key={i} className="glass reveal overflow-hidden p-3" style={st(i)}>
                <div className="relative grid aspect-[4/5] place-items-center overflow-hidden rounded-[calc(var(--r-lg)-6px)] bg-gradient-to-b from-accent/25 via-accent-soft to-surface">
                  <span className="display select-none text-8xl font-semibold text-fg/10" aria-hidden>“</span>
                  <span className="absolute grid size-14 place-items-center rounded-full bg-accent text-on-accent shadow-[0_10px_40px_-10px_var(--accent)]" aria-hidden><Icon name="arrow" className="size-5 rotate-45" /></span>
                </div>
                <figcaption className="p-4">
                  <blockquote className="text-muted"><Txt>{q.quote}</Txt></blockquote>
                  <p className="display mt-4 font-medium"><Txt>{q.name}</Txt></p>
                  <p className="label mt-1 text-muted"><Txt>{q.role}</Txt></p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className={`${wrap} scroll-mt-20 pt-10 pb-24`}>
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="glass reveal !rounded-[2rem] p-8 sm:p-12">
              <p className="label inline-flex items-center gap-2 text-muted"><span className="pulse relative size-2 rounded-full bg-accent" aria-hidden />{t.hero.status}</p>
              <h2 className="display mt-6 text-4xl font-medium sm:text-5xl"><Rich>{t.contact.title}</Rich></h2>
              <p className="mt-5 max-w-prose text-lg text-muted">{t.contact.body}</p>
              <p className="display mt-8 break-all text-base font-medium sm:text-xl" dir="ltr">
                <a href={`mailto:${t.contact.email}`} className="underline decoration-accent decoration-2 underline-offset-8 hover:text-accent">{t.contact.email}</a>
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <CopyEmail email={t.contact.email} copy={t.contact.copy} copied={t.contact.copied} />
                <a className={btnGhost} href="https://linkedin.com/in/hamza-tarakhan-b8ab961a5" target="_blank" rel="noopener noreferrer">{t.contact.linkedin}</a>
              </div>
              <p className="label mt-8 text-muted"><Txt>{t.contactPage.cv}</Txt> · <Txt>{t.contactPage.whatsapp}</Txt></p>
            </div>
            <div className="glass reveal !rounded-[2rem] p-6 sm:p-10" style={st(1)}><ContactForm f={t.contactPage.f} /></div>
          </div>
        </section>
      </main>
      <Footer lang={lang} t={t} />
    </>
  );
}
