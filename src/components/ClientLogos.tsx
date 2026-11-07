"use client";

import { useEffect, useState } from "react";

// The operators SalesPoint runs on. Logos are the brands' own artwork (trademarks of their owners).
// `c` is each brand's primary colour, used only inside the mini SalesPoint screen.
const BRANDS = [
  { id: "ooredoo", name: "Ooredoo", src: "/clients/ooredoo.svg", h: "h-5 sm:h-6", c: "#ed1c24" },
  { id: "awasr", name: "Awasr", src: "/clients/awasr.webp", h: "h-7 sm:h-9", c: "#17a39c" },
  { id: "beyond", name: "Beyond ONE", src: "/clients/beyond-light.svg", h: "h-6 sm:h-7", c: "#0076bf" },
  { id: "stc", name: "stc", src: "/clients/stc.svg", h: "h-7 sm:h-8", c: "#4f008c" },
  { id: "starlink", name: "Starlink", src: "/clients/starlink.svg", h: "h-12 sm:h-14", c: "#c7197d" },
] as const;

type Labels = {
  label: string;
  hint: string;
  screen: string;
  balance: string;
  cta: string;
  rows: [string, string, string];
  caption: string;
};

export function ClientLogos({ l }: { l: Labels }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  // Cycle through the brands on its own; pause while the visitor is interacting, and never for reduced motion.
  useEffect(() => {
    if (paused || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % BRANDS.length), 2800);
    return () => clearInterval(id);
  }, [paused]);

  const b = BRANDS[i];

  return (
    <div
      className="mt-12 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="text-center lg:text-start">
        <p className="label text-muted">{l.label}</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted lg:mx-0 lg:max-w-none">{l.hint}</p>
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {BRANDS.map((x, n) => (
            <li key={x.id} className={n === BRANDS.length - 1 ? "col-span-2 sm:col-span-1" : ""}>
              <button
                type="button"
                aria-pressed={n === i}
                aria-label={x.name}
                title={x.name}
                onClick={() => setI(n)}
                onMouseEnter={() => setI(n)}
                style={{ "--b": x.c } as React.CSSProperties}
                className="logo-tile grid h-20 w-full place-items-center rounded-2xl bg-white px-5 shadow-1 transition-[transform,box-shadow] duration-[var(--dur-base)] ease-[var(--ease-out)] hover:-translate-y-1 active:scale-[0.97]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- small brand artwork, no optimisation needed */}
                <img src={x.src} alt="" className={`${x.h} w-auto max-w-full object-contain`} />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* The same SalesPoint screen, re-themed per brand: one system, many brands */}
      <figure className="mx-auto w-full max-w-sm" style={{ "--b": b.c } as React.CSSProperties}>
        <div className="brand-screen glass overflow-hidden !rounded-[1.75rem] p-4 shadow-2">
          <div className="flex items-center justify-between">
            <span className="grid h-9 min-w-24 place-items-center rounded-xl bg-white px-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img key={b.id} src={b.src} alt={b.name} className="brand-swap h-6 w-auto max-w-24 object-contain" />
            </span>
            <span className="label text-muted">{l.screen}</span>
          </div>
          <div className="brand-fill mt-4 rounded-2xl p-5 text-white">
            <p className="text-xs opacity-80">{l.balance}</p>
            <p className="display mt-1 text-3xl font-semibold tabular-nums" dir="ltr">12,480</p>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/25">
              <div className="h-full w-2/3 rounded-full bg-white/90" />
            </div>
          </div>
          <ul className="mt-4 space-y-2">
            {l.rows.map((r, n) => (
              <li key={r} className="flex items-center gap-3 rounded-xl bg-[var(--glass)] px-3 py-2.5 text-sm">
                <span className="brand-dot size-2.5 shrink-0 rounded-full" style={{ opacity: 1 - n * 0.25 }} />
                <span className="flex-1">{r}</span>
                <span className="tabular-nums text-muted" dir="ltr">{["+320", "+145", "+60"][n]}</span>
              </li>
            ))}
          </ul>
          <span aria-hidden className="brand-fill mt-4 grid min-h-11 w-full place-items-center rounded-xl font-medium text-white">
            {l.cta}
          </span>
        </div>
        <figcaption className="mt-3 text-center text-sm text-muted" aria-live="polite">
          {l.caption} <b className="font-medium text-fg">{b.name}</b>
        </figcaption>
      </figure>
    </div>
  );
}
