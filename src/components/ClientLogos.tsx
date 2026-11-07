// The operators SalesPoint runs on. Logos are the brands' own artwork (trademarks of their owners).
// Shown as solid single-colour marks in an auto-scrolling strip; hovering a tile lights it up in the brand's colour (`c`).
const BRANDS = [
  { id: "ooredoo", name: "Ooredoo", src: "/clients/ooredoo.svg", h: "h-6", c: "#ed1c24" },
  { id: "awasr", name: "Awasr", src: "/clients/awasr.webp", h: "h-9", c: "#17a39c" },
  { id: "beyond", name: "Beyond ONE", src: "/clients/beyond-light.svg", h: "h-7", c: "#0076bf" },
  { id: "stc", name: "stc", src: "/clients/stc.svg", h: "h-8", c: "#8a3ffc" },
  { id: "starlink", name: "Starlink", src: "/clients/starlink.svg", h: "h-14", c: "#c7197d" },
] as const;

export function ClientLogos({ label, hint }: { label: string; hint: string }) {
  // Enough copies to fill wide screens; the track is duplicated once more for a seamless loop.
  const row = [...BRANDS, ...BRANDS];
  return (
    <div className="mt-12 text-center">
      <p className="label text-muted">{label}</p>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted">{hint}</p>
      <ul className="sr-only">
        {BRANDS.map((b) => (
          <li key={b.id}>{b.name}</li>
        ))}
      </ul>
      <div className="mq logo-strip mt-8 py-3" dir="ltr" aria-hidden>
        <div className="mq-track">
          {[...row, ...row].map((b, n) => (
            <div key={n} className="logo-mark glass grid h-24 w-44 shrink-0 place-items-center !rounded-2xl px-6 sm:w-52" style={{ "--b": b.c } as React.CSSProperties}>
              {/* eslint-disable-next-line @next/next/no-img-element -- small brand artwork, no optimisation needed */}
              <img src={b.src} alt="" className={`client-mark ${b.h} w-auto max-w-full object-contain`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
