import { Icon } from "./Mock";

type Labels = { view: string; screen: string; close: string; after?: string; before?: string };

// "View screens" on a product card: the whole card is the trigger, the screens open in a native popover
// (Esc / click outside closes it, no JS). Screens live in /public/work/<id>/1.webp … n.webp.
// For a redesign, `before` old screens live in /public/work/<id>/before/; an After / Before switch
// (plain radio buttons + CSS in brands.css) flips between the two rows so visitors can compare.
export function ProductShots({ id, name, count, before = 0, l }: { id: string; name: string; count: number; before?: number; l: Labels }) {
  const pop = `shots-${id}`;
  const row = (set: "after" | "before", n: number, dir: string, label: string) => (
    <ul data-set={set} aria-label={label} className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 py-6 sm:px-10">
      {Array.from({ length: n }, (_, i) => (
        <li key={i} className="shrink-0 snap-center">
          {/* eslint-disable-next-line @next/next/no-img-element -- app screenshots, already sized webp */}
          <img
            src={`/work/${dir}${i + 1}.webp`}
            alt={`${name}, ${label}, ${l.screen} ${i + 1}/${n}`}
            loading="lazy"
            width={600}
            height={1301}
            className="h-[min(68vh,620px)] w-auto rounded-[1.75rem] border border-[var(--glass-line)]"
          />
        </li>
      ))}
    </ul>
  );
  const opt = (value: "after" | "before", label: string) => (
    <label className="cursor-pointer">
      <input type="radio" name={`${pop}-set`} value={value} defaultChecked={value === "after"} className="peer sr-only" />
      <span className="block rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors peer-checked:bg-accent peer-checked:text-on-accent peer-focus-visible:ring-2 peer-focus-visible:ring-accent">
        {label}
      </span>
    </label>
  );
  return (
    <>
      <button
        type="button"
        popoverTarget={pop}
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent after:absolute after:inset-0 after:rounded-[inherit] after:content-['']"
      >
        {l.view} <Icon name="arrow" className="flip-rtl size-4" />
      </button>
      <div id={pop} popover="auto" aria-label={name} className="shots m-auto h-fit max-h-dvh w-full max-w-none border-0 bg-transparent p-0 text-fg">
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 pt-5 sm:px-10">
          <p className="display text-xl font-medium">{name}</p>
          <div className="flex items-center gap-3">
            {before > 0 && (
              <div role="radiogroup" aria-label={name} className="flex rounded-full border border-[var(--glass-line)] bg-surface p-1">
                {opt("after", l.after!)}
                {opt("before", l.before!)}
              </div>
            )}
            <button type="button" popoverTarget={pop} popoverTargetAction="hide" aria-label={l.close} className="grid size-10 place-items-center rounded-full border border-[var(--glass-line)] bg-surface text-xl leading-none">
              ×
            </button>
          </div>
        </div>
        {row("after", count, `${id}/`, l.after ?? l.view)}
        {before > 0 && row("before", before, `${id}/before/`, l.before!)}
      </div>
    </>
  );
}
