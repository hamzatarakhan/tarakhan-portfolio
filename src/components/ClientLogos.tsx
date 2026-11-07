"use client";

import { setSkin, usePrefs } from "./Controls";

// The operators SalesPoint runs on. Logos are the brands' own artwork (trademarks of their owners).
const BRANDS = [
  { id: "ooredoo", name: "Ooredoo", src: "/clients/ooredoo.svg", h: "h-5 sm:h-6" },
  { id: "awasr", name: "Awasr", src: "/clients/awasr.webp", h: "h-7 sm:h-9" },
  { id: "beyond", name: "Beyond ONE", src: "/clients/beyond-light.svg", h: "h-6 sm:h-7" },
  { id: "stc", name: "stc", src: "/clients/stc.svg", h: "h-7 sm:h-8" },
  { id: "starlink", name: "Starlink", src: "/clients/starlink.svg", h: "h-8 sm:h-10" },
] as const;

type Labels = { label: string; hint: string; showing: string; reset: string };

export function ClientLogos({ l }: { l: Labels }) {
  const prefs = usePrefs();
  const active = BRANDS.find((b) => b.id === prefs?.skin);

  return (
    <div className="mt-10 text-center">
      <p className="label text-muted">{l.label}</p>
      <p className="mt-2 text-sm text-muted">{l.hint}</p>
      <ul className="mt-6 flex flex-wrap justify-center gap-3">
        {BRANDS.map((b) => (
          <li key={b.id}>
            <button
              type="button"
              aria-pressed={active?.id === b.id}
              aria-label={b.name}
              title={b.name}
              onClick={() => setSkin(active?.id === b.id ? "indigo" : b.id)}
              className="client-tile glass grid h-20 w-36 place-items-center !rounded-2xl px-5 transition-transform duration-[var(--dur-base)] ease-[var(--ease-out)] hover:-translate-y-1 active:scale-[0.97] aria-pressed:ring-2 aria-pressed:ring-accent sm:w-44"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- small brand artwork, no optimisation needed */}
              <img src={b.src} alt="" className={`client-logo ${b.h} w-auto max-w-full object-contain `} />
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-5 min-h-11 text-sm" aria-live="polite">
        {active && (
          <span className="inline-flex flex-wrap items-center justify-center gap-3">
            <span className="text-muted">
              {l.showing} <b className="font-medium text-accent">{active.name}</b>
            </span>
            <button type="button" onClick={() => setSkin("indigo")} className="min-h-11 rounded-full border border-[var(--glass-line)] px-4 text-sm transition-colors hover:border-accent hover:text-accent">
              {l.reset}
            </button>
          </span>
        )}
      </p>
    </div>
  );
}
