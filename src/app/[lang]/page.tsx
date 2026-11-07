import Image from "next/image";
import cutout from "@/assets/hamza-cutout.webp";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict, isLocale } from "@/lib/i18n";
import { Divider, Footer, Header, Rich, wrap } from "@/components/Chrome";
import { CopyEmail, CountUp } from "@/components/HomeClient";
import { Icon, Mock } from "@/components/Mock";
import { Txt } from "@/components/Txt";
import { ContactForm } from "@/components/ContactForm";
import { ClientLogos } from "@/components/ClientLogos";
import { OrbitPortrait } from "@/components/OrbitPortrait";
import { Testimonials, type Testimonial } from "@/components/Testimonials";
import { CV_URL, whatsappLink } from "@/lib/contact";
import "@/styles/steps.css";

const h2 = "display text-3xl font-medium sm:text-4xl lg:text-5xl";
const pill = "inline-flex min-h-12 items-center gap-2 rounded-full px-7 font-medium transition-transform duration-[var(--dur-fast)] active:scale-[0.97]";
const btnPrimary = `${pill} bg-accent text-on-accent shadow-[0_10px_40px_-10px_var(--accent)] hover:-translate-y-0.5`;
const btnGhost = `${pill} border border-[var(--glass-line)] bg-[var(--glass)] backdrop-blur hover:border-accent`;
const num = (n: number) => String(n + 1).padStart(2, "0");
const st = (i: number) => ({ "--i": i }) as React.CSSProperties;

function Head({ label, title, intro, center }: { label: string; title: string; intro?: string; center?: boolean }) {
  return (
    <div className={`reveal mb-8 sm:mb-10 ${center ? "mx-auto max-w-2xl text-center" : "max-w-3xl"}`}>
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
  const icons = ["search", "target", "pen", "flask", "code"];
  // One colour per step (amber, violet, blue, pink, green), like a journey; tuned for dark and light in CSS.
  const stepColors = ["#f5a524", "#a78bfa", "#60a5fa", "#f472b6", "#34d399"];

  return (
    <>
      <Header lang={lang} t={t} />
      <main id="main">
        {/* Hero */}
        <section className={`${wrap} grid grid-cols-1 items-center gap-10 pt-6 pb-8 lg:grid-cols-[1.15fr_0.85fr] lg:pt-12`}>
          <div>
            <p className="rise label inline-flex items-center gap-3 rounded-full border border-[var(--glass-line)] bg-[var(--glass)] px-4 py-2" style={st(0)}>
              <span className="pulse relative size-2 rounded-full bg-accent" aria-hidden /> {t.hero.status}
            </p>
            <h1 className="display rise mt-7 text-4xl font-medium sm:text-6xl lg:text-7xl" style={st(1)}>
              <Rich>{t.hero.headline}</Rich>
            </h1>
            <p className="rise mt-6 max-w-xl text-lg text-muted" style={st(2)}>{t.hero.sub}</p>
            <div className="rise mt-9 flex flex-wrap gap-3" style={st(3)}>
              <Link href={`/${lang}/contact`} className={btnPrimary}>{t.hero.ctaProject}</Link>
              <a href="#work" className={btnGhost}>{t.hero.cta1} <Icon name="arrow" className="flip-rtl size-4" /></a>
            </div>
            <p className="label rise mt-8 text-muted" style={st(4)}>{t.hero.eyebrow}</p>
          </div>

          <div className="rise relative mx-auto mt-10 w-full max-w-md lg:mt-0" style={st(2)}>
            {/* Floating cut-out portrait: accent glow and a thin orbit ring behind, soft fade at the bottom */}
            <div aria-hidden className="absolute inset-x-[6%] top-[14%] bottom-[4%] rounded-full bg-accent/40 blur-3xl" />
            <div aria-hidden className="absolute start-1/2 top-[6%] aspect-square w-[92%] -translate-x-1/2 rounded-full border border-[var(--glass-line)] rtl:translate-x-1/2" />
            <div className="float relative" style={{ "--d": 0.6 } as React.CSSProperties}>
              <Image src={cutout} placeholder="blur" alt={t.hero.name} sizes="(min-width: 1024px) 28rem, 90vw" className="relative h-auto w-full [mask-image:linear-gradient(to_bottom,#000_70%,transparent_98%)]" priority />
            </div>
            {/* What I do, in five tags. Placed on the background and the jacket, never over the face. */}
            {(
              [
                [t.hero.tags[0], "rocket", "-top-9 start-0 sm:-start-10", 0],
                [t.hero.tags[1], "sparkle", "top-[57%] end-0 sm:-end-12", 0.9],
                [t.hero.tags[2], "cursor", "top-[69%] start-0 sm:-start-14", 1.8],
                [t.hero.tags[3], "code", "top-[81%] end-0 sm:-end-8", 2.7],
                [t.hero.tags[4], "layers", "-bottom-4 start-2 sm:-start-6", 3.6],
              ] as const
            ).map(([label, icon, pos, d]) => (
              <span key={label} className={`glass float label absolute flex items-center gap-2 whitespace-nowrap !rounded-full bg-bg/90 px-3.5 py-2.5 text-fg normal-case shadow-2 ${pos}`} style={{ "--d": d } as React.CSSProperties}>
                <Icon name={icon} className="size-4 text-accent" />
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
        <section aria-label="Key numbers" className={`${wrap} sec`}>
          <dl className="glass reveal grid grid-cols-2 !rounded-[2rem] lg:grid-cols-4">
            {t.proof.items.map((it, i) => (
              <div key={it.label} className={`p-7 text-center sm:p-9 ${i < 3 ? "lg:border-e lg:border-[var(--glass-line)]" : ""} ${i % 2 === 0 ? "border-e border-[var(--glass-line)] lg:border-e" : ""}`}>
                <dd className="display shine text-5xl font-semibold tabular-nums sm:text-6xl"><CountUp to={it.n} suffix={it.suffix} /></dd>
                <dt className="label mt-3 text-muted">{it.label}</dt>
              </div>
            ))}
          </dl>
          <ClientLogos label={t.proof.brandsLabel} hint={t.proof.brandsHint} />
        </section>

        <Divider />
        {/* Selected work */}
        <section id="work" className={`${wrap} scroll-mt-20 sec`}>
          <Head label={t.work.eyebrow} title={t.work.title} intro={t.work.intro} center />
          <div className="grid gap-6 md:grid-cols-2">
            {t.work.items.map((w, i) => (
              <Link key={w.slug} href={`/${lang}/work/${w.slug}`} className="glass reveal group block overflow-hidden p-4 hover:-translate-y-1" style={st(i % 2)}>
                <Mock v={i} className="!rounded-2xl h-56 sm:h-64 transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out)] group-hover:scale-[1.02]" />
                <div className="p-3 pt-6">
                  <p className="label text-accent">{w.role}</p>
                  <h3 className="display mt-2 flex items-center justify-between gap-4 text-2xl font-medium lg:text-3xl">
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

        <Divider />
        {/* Services */}
        <section className={`${wrap} grid grid-cols-1 gap-8 sec lg:grid-cols-[0.8fr_1.2fr]`}>
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Head label={t.services.eyebrow} title={t.services.title} intro={t.services.intro} />
            <OrbitPortrait alt={t.hero.name} className="mt-6 hidden lg:block" tags={[{ label: t.hero.tags[2], icon: "cursor" }, { label: t.hero.tags[3], icon: "code" }, { label: t.hero.tags[4], icon: "layers" }]} />
          </div>
          <div className="space-y-4">
            {t.services.items.map((sv, i) => (
              <article key={sv.title} className="glass reveal group flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:gap-5 sm:p-7" style={st(i)}>
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent"><Icon name={sv.icon} /></span>
                <div className="flex-1">
                  <span className="label text-muted">{num(i)}</span>
                  <h3 className="display mt-1 text-xl font-medium sm:text-2xl">{sv.title}</h3>
                  <p className="mt-2 text-muted">{sv.body}</p>
                  <p className="mt-4 text-sm"><span className="label me-2 text-accent">{t.services.getLabel}</span>{sv.get}</p>
                </div>
                <span className="hidden size-10 shrink-0 place-items-center rounded-full sm:grid border border-[var(--glass-line)] transition-colors group-hover:bg-accent group-hover:text-on-accent"><Icon name="arrow" className="flip-rtl size-4" /></span>
              </article>
            ))}
          </div>
        </section>

        <Divider />
        {/* Why me */}
        <section className={`${wrap} sec`}>
          <Head label={t.why.eyebrow} title={t.why.title} intro={t.why.intro} center />
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

        <Divider />
        {/* Process */}
        <section className={`${wrap} sec`}>
          <Head label={t.process.eyebrow} title={t.process.title} intro={t.process.intro} center />
          {/* A connected path: each node links to the next with a line blending the two step colours */}
          <ol className="path grid gap-6 lg:grid-cols-5 lg:gap-5">
            {t.process.steps.map((p, i) => (
              <li
                key={p.name}
                className="path-step reveal relative flex gap-5 lg:flex-col lg:gap-6"
                style={{ ...st(i), "--c": stepColors[i], "--cn": stepColors[i + 1] ?? stepColors[i] } as React.CSSProperties}
              >
                <span className="path-node step-icon relative z-10 grid size-14 shrink-0 place-items-center rounded-full"><Icon name={icons[i]} /></span>
                <article className="glass step flex-1 p-6">
                  <span className="label text-muted">{num(i)}</span>
                  <h3 className="display mt-2 text-xl font-medium">{p.name}</h3>
                  <p className="mt-2 text-sm text-muted">{p.body}</p>
                  <p className="step-example mt-4 border-s-2 ps-3 text-sm">{p.example}</p>
                </article>
              </li>
            ))}
          </ol>
        </section>

        <Divider />
        {/* Independent products */}
        <section className={`${wrap} sec`}>
          <Head label={t.play.eyebrow} title={t.play.title} intro={t.play.intro} center />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {t.play.items.map((p, i) => (
              <li key={p.name} className="glass reveal p-5" style={st(i % 5)}>
                <span className="label text-muted">{num(i)}</span>
                {"logo" in p && p.logo && (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element -- small project logo, light/dark artwork */}
                    <img src={`${p.logo}-light.svg`} alt="" className="logo-on-light mt-4 h-10 w-auto" />
                    {/* eslint-disable-next-line @next/next/no-img-element -- small project logo, light/dark artwork */}
                    <img src={`${p.logo}-dark.svg`} alt="" className="logo-on-dark mt-4 h-10 w-auto" />
                  </>
                )}
                {/* The logo already shows the name; keep it for screen readers only */}
                <p className={"logo" in p && p.logo ? "sr-only" : "display mt-6 text-xl font-medium"}>{p.name}</p>
                <p className="mt-1 text-sm text-muted">{p.tag}</p>
              </li>
            ))}
          </ul>
        </section>

        <Divider />
        {/* Capabilities */}
        <section className={`${wrap} sec`}>
          <Head label={t.skills.eyebrow} title={t.skills.title} intro={t.skills.intro} center />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {t.skills.groups.map((g, i) => (
              <div key={g.name} className="glass reveal p-6" style={st(i % 3)}>
                <h3 className="label text-accent">{g.name}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">{g.items.map((it) => <li key={it} className="rounded-full border border-[var(--glass-line)] px-3 py-1.5 text-sm">{it}</li>)}</ul>
              </div>
            ))}
          </div>
        </section>

        <Divider />
        {/* About */}
        <section className={`${wrap} sec`}>
          <div className="glass reveal grid grid-cols-1 gap-10 !rounded-[2rem] p-6 sm:p-12 lg:grid-cols-2">
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

        <Divider />
        {/* Testimonials: real ones only; an invitation in the same card style until they arrive */}
        <section id="testimonials" className={`${wrap} scroll-mt-20 sec`}>
          <Head label={t.testimonials.eyebrow} title={t.testimonials.title} intro={t.testimonials.intro} center />
          <Testimonials
            items={
              (t.testimonials.items as Testimonial[]).length
                ? (t.testimonials.items as Testimonial[])
                : process.env.NODE_ENV === "production"
                  ? []
                  : (t.testimonials.samples as Testimonial[])
            }
            badge={t.testimonials.sampleBadge}
            invite={{ ...t.testimonials.invite, mailto: `mailto:${t.contact.email}?subject=${encodeURIComponent(t.testimonials.invite.subject)}` }}
          />
        </section>

        <Divider />
        {/* Contact */}
        <section id="contact" className={`${wrap} scroll-mt-20 pt-2 pb-12`}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="glass reveal !rounded-[2rem] p-8 sm:p-12">
              <OrbitPortrait alt={t.hero.name} status={t.hero.status} className="mb-10 max-w-[16rem]" tags={[{ label: t.hero.tags[0], icon: "rocket" }, { label: t.hero.tags[1], icon: "sparkle" }, { label: t.hero.tags[3], icon: "code" }]} />
              <h2 className="display text-4xl font-medium sm:text-5xl"><Rich>{t.contact.title}</Rich></h2>
              <p className="mt-5 max-w-prose text-lg text-muted">{t.contact.body}</p>
              <p className="display mt-8 break-all text-base font-medium sm:text-xl" dir="ltr">
                <a href={`mailto:${t.contact.email}`} className="underline decoration-accent decoration-2 underline-offset-8 hover:text-accent">{t.contact.email}</a>
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <CopyEmail email={t.contact.email} copy={t.contact.copy} copied={t.contact.copied} />
                <a className={btnGhost} href="https://linkedin.com/in/hamza-tarakhan-b8ab961a5" target="_blank" rel="noopener noreferrer">{t.contact.linkedin}</a>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a className={btnGhost} href={whatsappLink(t.contactPage.waText)} target="_blank" rel="noopener noreferrer">{t.contactPage.whatsapp}</a>
                <a className={btnGhost} href={CV_URL} download>{t.contactPage.cv}</a>
              </div>
            </div>
            <div className="glass reveal !rounded-[2rem] p-6 sm:p-10" style={st(1)}><ContactForm f={t.contactPage.f} /></div>
          </div>
        </section>
      </main>
      <Footer lang={lang} t={t} />
    </>
  );
}
