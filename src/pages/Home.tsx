import { useState } from "react";
import cutout from "@/assets/hamza-cutout.webp";
import { Link } from "react-router-dom";
import { getDict, useLang } from "@/lib/i18n";
import { Divider, Footer, Header, Rich, wrap } from "@/components/Chrome";
import { CopyEmail, CountUp } from "@/components/HomeClient";
import { Icon, Mock } from "@/components/Mock";
import { Txt } from "@/components/Txt";
import { ContactForm } from "@/components/ContactForm";
import { ClientLogos, ConfManageMark } from "@/components/ClientLogos";
import { OrbitPortrait } from "@/components/OrbitPortrait";
import { Testimonials, type Testimonial } from "@/components/Testimonials";
import { ProductShots } from "@/components/ProductShots";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CaseCover } from "@/components/CaseCover";
import { CV_URL, whatsappLink } from "@/lib/contact";
import "@/styles/steps.css";

const h2 = "display text-3xl font-medium sm:text-4xl lg:text-5xl";
const pill = "inline-flex min-h-12 items-center gap-2 rounded-full px-7 font-medium transition-transform duration-[var(--dur-fast)] active:scale-[0.97]";
const btnPrimary = `${pill} bg-accent text-on-accent shadow-[0_10px_40px_-10px_var(--accent)] hover:-translate-y-0.5`;
const btnGhost = `${pill} border border-[var(--glass-line)] bg-[var(--glass)] backdrop-blur hover:border-accent`;
const num = (n: number) => String(n + 1).padStart(2, "0");
const st = (i: number) => ({ "--i": i }) as React.CSSProperties;
// Service icon hues: violet, champagne, teal, rose, sky, amber
const serviceHues = ["#a78bfa", "#d9b77e", "#2dd4bf", "#f472b6", "#60a5fa", "#f5a524"];

function Head({ label, title, intro, center }: { label: string; title: string; intro?: string; center?: boolean }) {
  return (
    <div className={`reveal mb-8 sm:mb-10 ${center ? "mx-auto max-w-2xl text-center" : "max-w-3xl"}`}>
      <p className="label inline-flex items-center gap-2 rounded-full border border-[var(--glass-line)] bg-[var(--glass)] px-3 py-1.5 text-muted">{label}</p>
      <h2 className={`${h2} mt-5`}><Rich>{title}</Rich></h2>
      {intro && <p className="mt-4 text-lg text-muted">{intro}</p>}
    </div>
  );
}

export default function Home() {
  const lang = useLang();
  const t = getDict(lang);
  // "Things I've built" tabs: redesigns of existing products vs. products built from zero
  const kinds = ["redesign", "new"] as const;
  const [kind, setKind] = useState<(typeof kinds)[number]>("redesign");
  const built = t.play.items.filter((p) => p.kind === kind);
  // Each project once: SalesPoint (case study only) + every product; Shamat and Flowance already appear as products
  const cards = [t.work.items[0].title, ...t.play.items.map((p) => p.name)];
  const row1 = cards.slice(0, 6);
  const row2 = cards.slice(6);
  const icons = ["search", "target", "pen", "flask", "code"];
  // One colour per step (amber, violet, blue, pink, green), like a journey; tuned for dark and light in CSS.
  const stepColors = ["#f5a524", "#a78bfa", "#60a5fa", "#f472b6", "#34d399"];

  return (
    <>
      <ScrollProgress />
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
              <Link to={`/${lang}/contact`} data-magnetic className={btnPrimary}>{t.hero.ctaProject}</Link>
              <a href="#work" className={btnGhost}>{t.hero.cta1} <Icon name="arrow" className="flip-rtl size-4" /></a>
            </div>
            <p className="label rise mt-6 text-muted" style={st(4)}>{t.hero.eyebrow}</p>
          </div>

          <div className="rise relative mx-auto mt-10 w-full max-w-md lg:mt-0" style={st(2)}>
            {/* Floating cut-out portrait: accent glow and a thin orbit ring behind, soft fade at the bottom */}
            <div aria-hidden className="absolute inset-x-[6%] top-[14%] bottom-[4%] rounded-full bg-gradient-to-b from-accent/35 via-accent/20 to-gold/30 blur-3xl" />
            <div aria-hidden className="absolute start-1/2 top-[6%] aspect-square w-[92%] -translate-x-1/2 rounded-full border border-[var(--glass-line)] rtl:translate-x-1/2" />
            <div className="float relative" style={{ "--d": 0.6 } as React.CSSProperties}>
              <img src={cutout} alt={t.hero.name} width={900} height={984} fetchPriority="high" className="relative h-auto w-full [mask-image:linear-gradient(to_bottom,#000_70%,transparent_98%)]" />
            </div>
            {/* Skill tags around the portrait, on the background and the jacket, never over the face.
                Phones show only the two lower ones; the rest would cover the photo. */}
            {(
              [
                [t.hero.tags[1], "sparkle", "hidden sm:flex top-[5%] start-0 sm:-start-24", 1],
                [t.hero.tags[4], "layers", "hidden sm:flex top-[23%] start-0 sm:-start-28", 3],
                [t.hero.tags[5], "globe", "hidden sm:flex top-[42%] start-0 sm:-start-16", 4],
                [t.hero.tags[0], "rocket", "flex top-[57%] end-0 sm:-end-12", 0],
                [t.hero.tags[3], "code", "flex top-[72%] start-0 sm:-start-12", 2],
                [t.hero.tags[6], "user", "hidden sm:flex top-[86%] end-0 sm:-end-6", 5],
              ] as const
            ).map(([label, icon, pos, d]) => (
              <span key={label} className={`glass float label absolute items-center gap-2 whitespace-nowrap !rounded-full bg-bg/90 px-3.5 py-2.5 text-fg normal-case shadow-2 ${pos}`} style={{ "--d": d } as React.CSSProperties}>
                <Icon name={icon} className="size-4 text-gold" />
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
                {[...row, ...row, ...row, ...row].map((name, i) => ( /* 4 copies: the -50% loop stays seamless on screens wider than one set */
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
                <dd className="display shine text-5xl font-light tabular-nums sm:text-7xl"><CountUp to={it.n} suffix={it.suffix} /></dd>
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
              <Link key={w.slug} to={`/${lang}/work/${w.slug}`} className={`glass reveal group block overflow-hidden p-4 hover:-translate-y-1 ${i === 0 ? "md:col-span-2" : ""}`} style={st(i % 2)}>
                <CaseCover slug={w.slug} className={`${i === 0 ? "h-60 sm:h-72" : "h-56 sm:h-64"} transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out)] group-hover:scale-[1.02]`} />
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
        <section id="services" className={`${wrap} grid scroll-mt-20 grid-cols-1 gap-8 sec lg:grid-cols-[0.8fr_1.2fr]`}>
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Head label={t.services.eyebrow} title={t.services.title} intro={t.services.intro} />
            <OrbitPortrait alt={t.hero.name} className="mt-6 hidden lg:block" tags={[{ label: t.hero.tags[2], icon: "cursor" }, { label: t.hero.tags[3], icon: "code" }, { label: t.hero.tags[4], icon: "layers" }]} />
          </div>
          <div className="space-y-4">
            {t.services.items.map((sv, i) => (
              <article key={sv.title} className="glass reveal group flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:gap-5 sm:p-7" style={st(i)}>
                {/* each service gets its own hue, so the list isn't one colour */}
                <span
                  className="grid size-12 shrink-0 place-items-center rounded-2xl"
                  style={{ color: serviceHues[i % serviceHues.length], background: `color-mix(in srgb, ${serviceHues[i % serviceHues.length]} 14%, transparent)` }}
                >
                  <Icon name={sv.icon} />
                </span>
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

        {/* Ways to work together: clear scopes and timings, a fixed quote, a free call */}
        <section className={`${wrap} pb-4`}>
          <h3 className="display reveal text-center text-2xl font-medium sm:text-3xl">{t.services.packagesTitle}</h3>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.services.packages.map((pk, i) => (
              <li key={pk.name} className="glass reveal flex flex-col p-6" style={st(i)}>
                <span className="label w-fit rounded-full border border-gold/40 px-2.5 py-1 text-gold">{pk.time}</span>
                <p className="display mt-4 text-xl font-medium">{pk.name}</p>
                <p className="mt-2 text-sm text-muted">{pk.body}</p>
              </li>
            ))}
          </ul>
          <div className="reveal mt-8 flex flex-wrap items-center justify-center gap-3 text-center">
            <p className="w-full text-muted sm:w-auto">{t.services.note}</p>
            <Link to={`/${lang}/contact`} data-magnetic className={btnPrimary}>{t.hero.ctaProject}</Link>
            <a href={whatsappLink(t.services.callText)} target="_blank" rel="noopener noreferrer" className={btnGhost}>
              <Icon name="chat" className="size-4" /> {t.services.call}
            </a>
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
          {/* Tabs (ARIA tabs pattern: arrow keys move between them) */}
          <div
            role="tablist"
            aria-label={t.play.eyebrow}
            className="reveal mx-auto -mt-2 mb-8 flex w-fit rounded-full border border-[var(--glass-line)] bg-[var(--glass)] p-1 backdrop-blur"
            onKeyDown={(e) => {
              if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
              const next = kind === "redesign" ? "new" : "redesign";
              setKind(next);
              document.getElementById(`tab-${next}`)?.focus();
            }}
          >
            {kinds.map((k) => (
              <button
                key={k}
                id={`tab-${k}`}
                role="tab"
                type="button"
                aria-selected={kind === k}
                aria-controls="built-panel"
                tabIndex={kind === k ? 0 : -1}
                onClick={() => setKind(k)}
                className="inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-medium text-muted transition-colors hover:text-fg aria-selected:bg-accent aria-selected:text-on-accent"
              >
                {t.play.kinds[k]}
                <span className="label rounded-full bg-[var(--glass)] px-2 py-0.5 text-[11px] leading-none">
                  {t.play.items.filter((p) => p.kind === k).length}
                </span>
              </button>
            ))}
          </div>
          <ul id="built-panel" role="tabpanel" aria-labelledby={`tab-${kind}`} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {built.map((p, i) => (
              // key includes the tab, so switching tabs replays the staggered rise
              <li key={kind + p.name} className="glass rise relative p-5" style={st(i)}>
                <span className="label text-muted">{num(i)}</span>
                {"lockup" in p && p.lockup === "confmanage" && <ConfManageMark className="mt-4" />}
                {"logo" in p && p.logo && (
                  <>
                    <img src={`${p.logo}-light.svg`} alt="" className={`logo-on-light mt-4 w-auto ${"tall" in p ? "h-24" : "h-10"}`} />
                    <img src={`${p.logo}-dark.svg`} alt="" className={`logo-on-dark mt-4 w-auto ${"tall" in p ? "h-24" : "h-10"}`} />
                  </>
                )}
                {/* The logo already shows the name: keep it for screen readers only, unless two cards share a logo (Shamat) */}
                <p className={"showName" in p ? "display mt-3 text-xl font-medium" : ("logo" in p && p.logo) || "lockup" in p ? "sr-only" : "display mt-6 text-xl font-medium"}>{p.name}</p>
                <p className="mt-1 text-sm text-muted">{p.tag}</p>
                {"shots" in p && p.shots && "shotsId" in p && (
                  <ProductShots
                    id={p.shotsId}
                    name={p.name}
                    count={p.shots}
                    before={"before" in p ? p.before : 0}
                    l={{ view: "before" in p ? t.play.compare : t.play.view, screen: t.play.screen, close: t.nav.close, after: t.play.after, before: t.play.before }}
                  />
                )}
              </li>
            ))}
          </ul>
        </section>

        <Divider />
        {/* About */}
        <section className={`${wrap} sec`}>
          <div className="glass reveal grid grid-cols-1 gap-10 !rounded-[2rem] p-6 sm:p-12 lg:grid-cols-2">
            <div>
              <Head label={t.aboutPage.title} title={t.about.title} />
              <p className="-mt-4 max-w-prose text-lg text-muted">{t.about.body}</p>
              <Link to={`/${lang}/about`} className={`${btnGhost} mt-8`}>{t.about.cta}</Link>
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
                : import.meta.env.PROD
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
