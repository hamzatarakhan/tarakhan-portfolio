import cutout from "@/assets/hamza-cutout.webp";
import { Icon } from "./Mock";
import "@/styles/steps.css";

type Tag = { label: string; icon: string };

// Portrait in a circle, inside a slowly turning dashed orbit, with a few service tags placed on the orbit.
// Tag slots hug the lower half of the orbit (shoulders and below), never the face.
const SLOTS = [
  "bottom-[20%] -start-4 sm:-start-8",
  "bottom-[6%] -end-4 sm:-end-8",
  "-bottom-9 start-[6%]",
];

export function OrbitPortrait({ alt, tags, status, className = "" }: { alt: string; tags: Tag[]; status?: string; className?: string }) {
  return (
    <div className={`relative mx-auto aspect-square w-full max-w-[19rem] ${className}`}>
      <div aria-hidden className="absolute inset-[8%] rounded-full bg-accent/35 blur-3xl" />
      <div aria-hidden className="orbit absolute inset-0 rounded-full border-2 border-dashed border-[var(--glass-line)]" />
      <div aria-hidden className="absolute inset-[6%] rounded-full border border-[var(--glass-line)]" />
      <div className="absolute inset-[12%] overflow-hidden rounded-full bg-gradient-to-b from-accent/45 via-accent-soft to-surface ring-1 ring-[var(--glass-line)]">
        {/* The photo runs to the waist: scale it up from the top so head and shoulders fill the circle */}
        <img src={cutout} alt={alt} loading="lazy" className="absolute inset-x-0 top-[8%] mx-auto h-[150%] w-auto max-w-none" />
      </div>
      {status && (
        <span className="label absolute -top-2 start-1/2 inline-flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-[var(--glass-line)] bg-bg/90 px-3 py-1.5 normal-case text-fg shadow-2 rtl:translate-x-1/2">
          <span className="pulse relative size-2 rounded-full bg-accent" aria-hidden />
          {status}
        </span>
      )}
      {tags.slice(0, SLOTS.length).map((t, i) => (
        <span
          key={t.label}
          className={`glass float label absolute flex items-center gap-1.5 whitespace-nowrap !rounded-full bg-bg/90 px-3 py-1.5 !leading-tight normal-case text-fg shadow-2 ${SLOTS[i]}`}
          style={{ "--d": i * 1.2 } as React.CSSProperties}
        >
          <Icon name={t.icon} className="size-3.5 text-accent" />
          {t.label}
        </span>
      ))}
    </div>
  );
}
