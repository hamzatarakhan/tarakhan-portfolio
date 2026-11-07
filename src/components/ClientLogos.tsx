// Brands I have designed products for: the SalesPoint operators, Omantel, ConfManage and Virgin Bakery. Logos are the brands' own artwork (trademarks of their owners).
// Shown in their real colours in an auto-scrolling strip; on hover the tile picks up a soft brand tint (`c`).
const BRANDS = [
  { id: "ooredoo", name: "Ooredoo", src: "/clients/ooredoo.svg", h: "h-6", c: "#ed1c24" },
  { id: "awasr", name: "Awasr", src: "/clients/awasr.webp", h: "h-9", c: "#17a39c" },
  { id: "beyond", name: "Beyond ONE", src: "/clients/beyond-light.svg", dark: "/clients/beyond-dark.svg", h: "h-7", c: "#0076bf" },
  { id: "stc", name: "stc", src: "/clients/stc.svg", h: "h-8", c: "#8a3ffc", lift: 2.1 },
  { id: "omantel", name: "Omantel", src: "/clients/omantel.svg", h: "h-6", c: "#5b4bff", lift: 2.2 },
  { id: "confmanage", name: "ConfManage", src: "/clients/confmanage-icon.png", h: "h-10", c: "#e0457b", lockup: true },
  { id: "virgin", name: "Virgin Bakery", src: "/clients/virgin-light.svg", h: "h-12", c: "#b3262b", lift: 2.4 },
  { id: "starlink", name: "Starlink", src: "/clients/starlink.svg", h: "h-14", c: "#c7197d", lift: 1.45 },
] as const;

// ConfManage's own header lockup: their icon + "CONF / MANAGE / HOST YOUR CONFERENCE" set as text (also used on its product card)
export function ConfManageMark({ className = "" }: { className?: string }) {
  return (
    <span className={`flex w-fit items-center gap-2 text-start text-fg ${className}`} dir="ltr">
      {/* eslint-disable-next-line @next/next/no-img-element -- small brand artwork */}
      <img src="/clients/confmanage-icon.png" alt="" className="h-10 w-auto" />
      <span className="block font-[family-name:var(--font-outfit)] leading-none">
        <span className="block text-[15px] font-extrabold tracking-[0.08em]">CONF</span>
        <span className="block text-[15px] font-extrabold tracking-[0.08em]">MANAGE</span>
        <span className="mt-1 block whitespace-nowrap text-[7px] font-semibold tracking-[0.14em] opacity-60">HOST YOUR CONFERENCE</span>
      </span>
    </span>
  );
}

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
            <div
              key={n}
              className="logo-mark glass grid h-24 w-44 shrink-0 place-items-center !rounded-2xl px-6 sm:w-52"
              data-lift={"lift" in b ? "" : undefined}
              style={{ "--b": b.c, "--lift": "lift" in b ? b.lift : 1 } as React.CSSProperties}
            >
              {"lockup" in b ? (
                <ConfManageMark className="client-mark" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element -- small brand artwork, no optimisation needed
                <img src={b.src} alt="" className={`client-mark ${b.h} w-auto max-w-full object-contain ${"dark" in b ? "logo-on-light" : ""}`} />
              )}
              {"dark" in b && (
                // eslint-disable-next-line @next/next/no-img-element -- the brand's own artwork for dark backgrounds
                <img src={b.dark} alt="" className={`client-mark logo-on-dark ${b.h} w-auto max-w-full object-contain`} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
