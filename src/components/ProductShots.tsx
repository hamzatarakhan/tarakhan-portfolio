import { Icon } from "./Mock";

// "View screens" on a product card: the whole card is the trigger, the screens open in a native popover
// (Esc / click outside closes it, no JS). Screens live in /public/work/<id>/1.webp … n.webp.
export function ProductShots({ id, name, count, view, screen, close }: { id: string; name: string; count: number; view: string; screen: string; close: string }) {
  const pop = `shots-${id}`;
  return (
    <>
      <button
        type="button"
        popoverTarget={pop}
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent after:absolute after:inset-0 after:rounded-[inherit] after:content-['']"
      >
        {view} <Icon name="arrow" className="flip-rtl size-4" />
      </button>
      <div id={pop} popover="auto" aria-label={name} className="shots m-auto h-fit max-h-dvh w-full max-w-none border-0 bg-transparent p-0 text-fg">
        <div className="flex items-center justify-between px-5 pt-5 sm:px-10">
          <p className="display text-xl font-medium">{name}</p>
          <button type="button" popoverTarget={pop} popoverTargetAction="hide" aria-label={close} className="grid size-10 place-items-center rounded-full border border-[var(--glass-line)] bg-surface text-xl leading-none">
            ×
          </button>
        </div>
        <ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 py-6 sm:px-10">
          {Array.from({ length: count }, (_, i) => (
            <li key={i} className="shrink-0 snap-center">
              {/* eslint-disable-next-line @next/next/no-img-element -- app screenshots, already sized webp */}
              <img
                src={`/work/${id}/${i + 1}.webp`}
                alt={`${name}, ${screen} ${i + 1}/${count}`}
                loading="lazy"
                width={600}
                height={1301}
                className="h-[min(72vh,640px)] w-auto rounded-[1.75rem] border border-[var(--glass-line)]"
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
