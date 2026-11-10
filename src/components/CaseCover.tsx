// Cover visuals for the Selected work cards: built from real brand assets, not grey placeholders.
const frame = "glass relative overflow-hidden !rounded-2xl";

const operators = [
  { src: "/clients/ooredoo.svg", c: "#ed1c24", h: "h-5" },
  { src: "/clients/stc.svg", c: "#8a3ffc", h: "h-7", lift: true },
  { src: "/clients/omantel.svg", c: "#5b4bff", h: "h-5", lift: true },
  { src: "/clients/awasr.webp", c: "#17a39c", h: "h-7" },
  { src: "/clients/beyond-dark.svg", c: "#0076bf", h: "h-6" },
];

function Telecom() {
  return (
    <div className="grid h-full grid-cols-1 gap-3 sm:grid-cols-[1.1fr_0.9fr]">
      <div className="grid grid-cols-2 gap-2">
        {operators.map((o, i) => (
          <div
            key={o.src}
            className={`grid place-items-center rounded-xl border p-2 ${i === 4 ? "col-span-2" : ""}`}
            style={{ borderColor: `color-mix(in srgb, ${o.c} 45%, transparent)`, background: `color-mix(in srgb, ${o.c} 14%, transparent)` }}
          >
            <img src={o.src} alt="" className={`${o.h} w-auto max-w-full object-contain`} style={o.lift ? { filter: "brightness(2.1) saturate(1.1)" } : undefined} />
          </div>
        ))}
      </div>
      {/* A commission line item, like the engine's breakdown view */}
      <div className="hidden flex-col justify-center gap-2 rounded-xl border border-[var(--glass-line)] bg-bg/60 p-3 text-xs sm:flex">
        <p className="label text-muted">Commission</p>
        <p className="display whitespace-nowrap text-xl font-semibold tabular-nums">JOD 128.40</p>
        {[["eSIM activation", "#34d399"], ["Postpaid plan", "#60a5fa"], ["Device bundle", "#f5a524"]].map(([k, c]) => (
          <div key={k} className="flex items-center gap-2">
            <span className="size-2 rounded-full" style={{ background: c }} />
            <span className="flex-1 truncate text-muted">{k}</span>
            <span className="h-1.5 w-8 rounded-full" style={{ background: c, opacity: 0.7 }} />
          </div>
        ))}
        <span className="mt-1 w-fit rounded-full bg-[#34d399]/15 px-2 py-0.5 text-[10px] font-medium text-[#34d399]">Approved</span>
      </div>
    </div>
  );
}

// One component, four looks: two brands × light/dark, in Arabic and English
const looks = [
  { brand: "FRiENDi", c: "#00b3a7", dark: true, lang: "en", t: "Activate SIM", s: "Step 2 of 4" },
  { brand: "Virgin", c: "#e10a0a", dark: true, lang: "ar", t: "تفعيل الشريحة", s: "الخطوة 2 من 4" },
  { brand: "FRiENDi", c: "#00b3a7", dark: false, lang: "ar", t: "تفعيل الشريحة", s: "الخطوة 2 من 4" },
  { brand: "Virgin", c: "#e10a0a", dark: false, lang: "en", t: "Activate SIM", s: "Step 2 of 4" },
];
function System() {
  return (
    <div className="grid h-full grid-cols-2 gap-2">
      {looks.map((l, i) => (
        <div
          key={i}
          dir={l.lang === "ar" ? "rtl" : "ltr"}
          className="flex flex-col justify-between rounded-xl p-3"
          style={{ background: l.dark ? "#101018" : "#f6f6fb", color: l.dark ? "#f2f2f8" : "#15122b", border: `1px solid ${l.dark ? "#ffffff1a" : "#15122b1a"}` }}
        >
          <div className="flex items-center justify-between text-[10px] font-semibold">
            <span style={{ color: l.c }}>{l.brand}</span>
            <span className="opacity-60">{l.dark ? "Dark" : "Light"} · {l.lang === "ar" ? "AR" : "EN"}</span>
          </div>
          <div>
            <p className="text-[13px] font-semibold leading-tight" style={{ fontFamily: l.lang === "ar" ? "var(--font-plex-arabic)" : l.brand === "Virgin" ? "var(--font-space)" : "var(--font-outfit)" }}>{l.t}</p>
            <p className="text-[10px] opacity-60">{l.s}</p>
          </div>
          <div className="h-5 rounded-md" style={{ background: l.c }} />
        </div>
      ))}
    </div>
  );
}

function Shamat() {
  return (
    <div className="relative grid h-full grid-cols-[auto_1fr] items-center gap-5 px-2">
      <div aria-hidden className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#8b1d1c]/40 via-transparent to-[#caa34c]/25" />
      <img src="/clients/shamat-logo-dark.svg" alt="" className="relative h-40 w-auto" />
      <div className="relative rounded-xl border border-[#caa34c]/30 bg-bg/60 p-4 text-center" dir="rtl" lang="ar">
        <p className="text-xl leading-loose" style={{ fontFamily: "var(--font-quran), var(--font-plex-arabic), serif" }}>بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ</p>
        <div className="mt-3 flex justify-center gap-1.5">
          {["Aa", "A+", "۞"].map((k) => (
            <span key={k} className="rounded-md border border-[#caa34c]/40 px-2 py-0.5 text-[10px] text-[#e2b655]">{k}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Flowance() {
  return (
    <div className="grid h-full grid-cols-[1fr_1fr] gap-3">
      <div className="flex flex-col justify-between rounded-xl bg-gradient-to-br from-[#34d399]/30 to-[#60a5fa]/10 p-4">
        <p className="label text-muted">Left this month</p>
        <p className="display text-3xl font-semibold tabular-nums">$1,240</p>
        <div className="flex h-12 items-end gap-1">
          {[45, 70, 55, 90, 60, 80, 65].map((h, i) => (
            <span key={i} className="flex-1 rounded-sm bg-[#34d399]" style={{ height: `${h}%`, opacity: 0.45 + i * 0.07 }} />
          ))}
        </div>
      </div>
      <ul className="flex flex-col justify-center gap-2 text-xs">
        {[["Salary", "+2,400", "#34d399"], ["Groceries", "−86", "#f472b6"], ["Transport", "−24", "#f5a524"], ["Coffee", "−4", "#a78bfa"]].map(([k, v, c]) => (
          <li key={k} className="flex items-center gap-2 rounded-lg border border-[var(--glass-line)] bg-bg/50 px-2.5 py-2">
            <span className="size-2 rounded-full" style={{ background: c }} />
            <span className="flex-1">{k}</span>
            <span className="tabular-nums" style={{ color: c }}>{v}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const covers: Record<string, () => React.ReactElement> = {
  salespoint: Telecom,
  "salespoint-design-system": System,
  shamat: Shamat,
  flowance: Flowance,
};

export function CaseCover({ slug, className = "" }: { slug: string; className?: string }) {
  const Body = covers[slug];
  return (
    <div className={`${frame} p-4 ${className}`} aria-hidden>
      {Body ? <Body /> : null}
    </div>
  );
}
