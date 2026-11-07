import { Controls } from "@/components/Controls";

export const metadata = { title: "Design system — Hamza Tarakhan", robots: { index: false } };

const colors = ["bg", "surface", "surface-2", "fg", "muted", "line", "accent", "on-accent", "accent-soft"];
const type = [
  ["4xl", "Hero"],
  ["3xl", "Page title"],
  ["2xl", "Section"],
  ["xl", "Subhead"],
  ["lg", "Lead"],
  ["base", "Body text for reading"],
  ["sm", "Small label"],
  ["xs", "Caption"],
] as const;
const ar = "أصمم أنظمة تتّسع لأي علامة تجارية";
const motion = [
  ["fast", "--dur-fast"],
  ["base", "--dur-base"],
  ["slow", "--dur-slow"],
] as const;

function Section({ id, title, note, children }: { id: string; title: string; note: string; children: React.ReactNode }) {
  return (
    <section id={id} className="border-t border-line py-12">
      <h2 className="display text-2xl font-semibold">{title}</h2>
      <p className="mt-1 mb-8 max-w-prose text-muted">{note}</p>
      {children}
    </section>
  );
}

export default function System() {
  return (
    <>
      <header className="sticky top-0 z-20 border-b border-line bg-bg/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <span className="font-mono text-sm text-muted">/system</span>
          <Controls />
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <div className="py-16">
          <p className="font-mono text-sm text-accent">Design system v0.1</p>
          <h1 className="display mt-3 text-4xl font-semibold">One system. Many brands.</h1>
          <p className="mt-4 max-w-prose text-lg text-muted">
            Switch theme, language or skin above. Every swatch, size and component below is the same code reading
            different token values — the way SalesPoint runs on five operators.
          </p>
        </div>

        <Section id="color" title="Color" note="Semantic tokens only. Components never use raw hex. Light and dark are designed separately; text pairs pass WCAG AA.">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {colors.map((c) => (
              <div key={c} className="overflow-hidden rounded-md border border-line">
                <div className="h-20" style={{ background: `var(--${c})` }} />
                <div className="bg-surface p-3 font-mono text-xs">--{c}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="type" title="Typography" note="Fluid scale with clamp(). Arabic uses IBM Plex Sans Arabic with its own line-height, size and zero tracking.">
          <div className="space-y-5">
            {type.map(([k, label]) => (
              <div key={k} className="flex flex-wrap items-baseline gap-x-6 gap-y-1 border-b border-line pb-4">
                <span className="w-14 font-mono text-xs text-muted">text-{k}</span>
                <span className="display" style={{ fontSize: `var(--text-${k})` }}>{label}</span>
              </div>
            ))}
            <p className="display text-3xl" lang="ar" dir="rtl">{ar}</p>
          </div>
        </Section>

        <Section id="shape" title="Radius & elevation" note="Radius derives from the skin's base value, so Violet is sharp and Moss is soft with no component changes.">
          <div className="flex flex-wrap gap-4">
            {["sm", "md", "lg"].map((r) => (
              <div key={r} className={`grid h-24 w-32 place-items-center border border-line bg-surface font-mono text-xs shadow-1 rounded-${r}`}>
                radius-{r}
              </div>
            ))}
            <div className="grid h-24 w-32 place-items-center rounded-md bg-surface font-mono text-xs shadow-2">shadow-2</div>
          </div>
        </Section>

        <Section id="motion" title="Motion" note="Durations and easings are tokens. Hover a bar to feel each one. Reduced-motion users get instant fades.">
          <div className="space-y-3">
            {motion.map(([n, v]) => (
              <div key={n} className="group rounded-md border border-line bg-surface p-3">
                <div className="mb-2 font-mono text-xs text-muted">{n} · {v}</div>
                <div className="h-3 rounded-full bg-surface-2">
                  <div
                    className="h-3 w-6 rounded-full bg-accent transition-[width] ease-[var(--ease-out)] group-hover:w-full"
                    style={{ transitionDuration: `var(${v})` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="components" title="Components" note="Core set for the build: button, input, badge, card. 44px minimum touch targets, visible focus, press feedback.">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-wrap items-center gap-3">
              <button className="min-h-11 rounded-md bg-accent px-5 font-medium text-on-accent transition-transform duration-[var(--dur-fast)] active:scale-[0.97]">Start a project</button>
              <button className="min-h-11 rounded-md border border-line bg-surface px-5 font-medium transition-colors hover:bg-surface-2 active:scale-[0.97]">View work</button>
              <span className="rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-accent">Available</span>
            </div>
            <label className="block">
              <span className="mb-1 block text-sm font-medium">Email</span>
              <input type="email" placeholder="you@company.com" className="min-h-11 w-full rounded-md border border-line bg-surface px-3 placeholder:text-muted" />
            </label>
            <article className="rounded-lg border border-line bg-surface p-6 shadow-1 transition-shadow duration-[var(--dur-base)] hover:shadow-2 md:col-span-2">
              <p className="font-mono text-xs text-accent">Case study</p>
              <h3 className="display mt-2 text-xl font-semibold">SalesPoint — dealer platform</h3>
              <p className="mt-2 max-w-prose text-muted">One system running across five telecom operators. {"{{TODO: outcome}}"}</p>
            </article>
          </div>
        </Section>
      </main>
    </>
  );
}
