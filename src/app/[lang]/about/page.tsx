import { notFound } from "next/navigation";
import { getDict, isLocale } from "@/lib/i18n";
import { Footer, Header, wrap } from "@/components/Chrome";
import { Txt } from "@/components/Txt";
import { OrbitPortrait } from "@/components/OrbitPortrait";

const st = (i: number) => ({ "--i": i }) as React.CSSProperties;
const h2 = "display text-2xl font-medium sm:text-3xl";
// Hover: lift slightly and pick up the accent border
const lift = "lift hover:-translate-y-0.5 hover:border-accent/50";

export default async function About({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  const a = t.aboutPage;
  return (
    <>
      <Header lang={lang} t={t} />
      <main id="main" className={`${wrap} pt-6 pb-14`}>
        <p
          className="label rise inline-flex rounded-full border border-[var(--glass-line)] bg-[var(--glass)] px-3 py-1.5 text-muted"
          style={st(0)}
        >
          {a.title}
        </p>
        <div className="mt-6 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h1
              className="display rise text-4xl font-medium sm:text-6xl"
              style={st(1)}
            >
              {t.hero.name}
            </h1>
            <div
              className="rise mt-6 max-w-prose space-y-5 text-lg text-muted"
              style={st(2)}
            >
              {a.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          {/* Same floating cutout as the home page: no photo background, orbit ring, service tags */}
          <div className="rise pt-6 lg:pt-2" style={st(3)}>
            <div className="float">
              <OrbitPortrait
                alt={t.hero.name}
                status={t.hero.status}
                className="max-w-[20rem] sm:max-w-[22rem]"
                tags={[
                  { label: t.hero.tags[0], icon: "rocket" },
                  { label: t.hero.tags[1], icon: "sparkle" },
                  { label: t.hero.tags[3], icon: "code" },
                ]}
              />
            </div>
          </div>
        </div>

        <section className="mt-20">
          <h2 className={`${h2} reveal`}>{a.how.title}</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {a.how.items.map((i, n) => (
              <li
                key={i}
                className={`glass reveal group p-6 text-lg ${lift}`}
                style={st(n % 2)}
              >
                <span className="display me-3 text-2xl font-semibold text-accent/70 transition-colors group-hover:text-accent">
                  {String(n + 1).padStart(2, "0")}
                </span>
                {i}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <h2 className={`${h2} reveal`}>{a.timeline.title}</h2>
          {/* A rail with a glowing dot per role; click a role to open or close it */}
          <ol className="relative mt-8 space-y-3 ps-7 before:absolute before:inset-y-3 before:start-[7px] before:w-px before:bg-gradient-to-b before:from-accent before:to-[var(--glass-line)] before:content-['']">
            {a.timeline.items.map((it, n) => (
              <li key={n} className="relative">
                <span
                  aria-hidden
                  className={`absolute -start-7 top-[1.4rem] size-[15px] rounded-full border-2 border-accent bg-bg ${n === 0 ? "pulse" : ""}`}
                />
                <details
                  open={n === 0}
                  className={`glass reveal group ${lift}`}
                >
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 p-5 [&::-webkit-details-marker]:hidden">
                    <span>
                      <span className="display text-lg font-medium">
                        {it.role}
                      </span>{" "}
                      · <span className="text-muted">{it.org}</span>
                    </span>
                    <span className="flex shrink-0 items-center gap-3">
                      <span className="label text-muted">
                        <Txt>{it.when}</Txt>
                      </span>
                      <span
                        aria-hidden
                        className="grid size-8 place-items-center rounded-full border border-[var(--glass-line)] text-muted transition-transform duration-[var(--dur-base)] group-open:rotate-180"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="size-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </span>
                    </span>
                  </summary>
                  <p className="px-5 pb-5 text-muted">
                    <Txt>{it.body}</Txt>
                  </p>
                </details>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <section className={`glass reveal p-7 ${lift}`}>
            <h2 className={h2}>{a.edu.title}</h2>
            <ul className="mt-5 space-y-3 text-muted">
              {a.edu.items.map((i) => (
                <li
                  key={i}
                  className="border-b border-[var(--glass-line)] pb-3 last:border-0"
                >
                  {i}
                </li>
              ))}
            </ul>
          </section>
          <section className={`glass reveal p-7 ${lift}`} style={st(1)}>
            <h2 className={h2}>{a.tools.title}</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {a.tools.items
                .flatMap((line) => line.split(/\s*[,،]\s*|\s+و(?=[A-Za-z])/)) /* Arabic joins names with "و" */
                .map((tool) => (
                  <li
                    key={tool}
                    className="rounded-full border border-[var(--glass-line)] px-3 py-1.5 text-sm transition-colors hover:border-accent hover:bg-accent-soft hover:text-fg"
                  >
                    {tool}
                  </li>
                ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer lang={lang} t={t} />
    </>
  );
}
