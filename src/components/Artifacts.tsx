"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import { btn, SkinPicker, usePrefs } from "./Controls";

const frame = "glass p-5 sm:p-7";
const field = "min-h-11 rounded-md border border-line bg-bg px-3";

/* ───────── 1. SIM activation flow (illustrative) ───────── */
const act = {
  en: {
    type: "SIM type", physical: "Physical SIM", esim: "eSIM", back: "Back", next: "Continue", restart: "Start over", done: "Activated (demo)", step: "Step",
    steps: { physical: ["Verify identity", "Scan SIM", "Choose plan", "Confirm"], esim: ["Verify identity", "Choose plan", "Send QR code", "Confirm"] },
    hint: "Illustrative flow. Not the production screens.",
  },
  ar: {
    type: "نوع الشريحة", physical: "شريحة مادية", esim: "eSIM", back: "رجوع", next: "متابعة", restart: "ابدأ من جديد", done: "تم التفعيل (تجريبي)", step: "الخطوة",
    steps: { physical: ["التحقق من الهوية", "مسح الشريحة", "اختيار الباقة", "التأكيد"], esim: ["التحقق من الهوية", "اختيار الباقة", "إرسال رمز QR", "التأكيد"] },
    hint: "مسار توضيحي، وليس شاشات الإنتاج.",
  },
};
export function ActivationDemo({ lang }: { lang: Locale }) {
  const c = act[lang];
  const [kind, setKind] = useState<"physical" | "esim">("physical");
  const [i, setI] = useState(0);
  const steps = c.steps[kind];
  const done = i >= steps.length;
  return (
    <div className={frame}>
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label={c.type}>
        {(["physical", "esim"] as const).map((k) => (
          <button key={k} className={btn} aria-pressed={kind === k} onClick={() => { setKind(k); setI(0); }}>{c[k]}</button>
        ))}
      </div>
      <ol className="mt-6 grid grid-cols-4 gap-2" aria-label="Progress">
        {steps.map((s, n) => (
          <li key={s} aria-current={n === i ? "step" : undefined} className="min-w-0">
            <div className={`h-1.5 rounded-full transition-colors duration-[var(--dur-base)] ${n <= i || done ? "bg-accent" : "bg-surface-2"}`} />
            <p className={`mt-2 truncate text-xs ${n === i ? "font-medium" : "text-muted"}`}>{s}</p>
          </li>
        ))}
      </ol>
      <div key={`${kind}${i}`} className="mt-6 min-h-24 rounded-md bg-bg p-5 animate-[fade-in_var(--dur-base)_var(--ease-out)]" aria-live="polite">
        {done ? <p className="display text-lg font-semibold text-accent">✓ {c.done}</p> : (
          <>
            <p className="font-mono text-xs text-muted">{c.step} {i + 1}/{steps.length}</p>
            <p className="display mt-1 text-lg font-semibold">{steps[i]}</p>
          </>
        )}
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-2">
        {done ? <button className={btn} onClick={() => setI(0)}>{c.restart}</button> : (
          <>
            <button className={btn} disabled={i === 0} onClick={() => setI(i - 1)}>{c.back}</button>
            <button className="min-h-11 rounded-md bg-accent px-5 text-sm font-medium text-on-accent transition-transform active:scale-[0.97]" onClick={() => setI(i + 1)}>{c.next}</button>
          </>
        )}
      </div>
      <p className="mt-4 text-xs text-muted">{c.hint}</p>
    </div>
  );
}

/* ───────── 2. Token architecture, live ───────── */
const tk = {
  en: { l1: "1 · Primitives", l2: "2 · Semantic roles", l3: "3 · Components", note: "Values are read live from this page.", pick: "Brand skin" },
  ar: { l1: "1 · القيم الأولية", l2: "2 · الأدوار الدلالية", l3: "3 · المكوّنات", note: "القيم تُقرأ مباشرة من هذه الصفحة.", pick: "علامة السمة" },
};
const prim = ["--p-ink-950", "--p-ink-900", "--p-slate-500", "--p-mist-50"];
const sem = ["--bg", "--surface", "--fg", "--accent", "--r-md", "--font-display"];
export function TokenDiagram({ lang }: { lang: Locale }) {
  const c = tk[lang];
  const p = usePrefs(); // re-renders on theme / skin change
  const read = (v: string) => (p && typeof document !== "undefined" ? getComputedStyle(document.documentElement).getPropertyValue(v).trim().split(",")[0] : "…");
  return (
    <div className={frame}>
      <p className="mb-2 text-sm font-medium">{c.pick}</p>
      <SkinPicker />
      <div className="mt-6 grid gap-4 md:grid-cols-3" dir="ltr">
        <div>
          <p className="mb-2 font-mono text-xs text-muted">{c.l1}</p>
          <ul className="space-y-2">
            {prim.map((v) => (
              <li key={v} className="flex items-center gap-2 text-xs">
                <span className="size-5 shrink-0 rounded-sm border border-line" style={{ background: `var(${v})` }} />
                <span className="font-mono">{v}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-2 font-mono text-xs text-muted">{c.l2}</p>
          <ul className="space-y-2">
            {sem.map((v) => (
              <li key={v} className="flex items-center justify-between gap-2 text-xs">
                <span className="font-mono">{v}</span>
                <span className="truncate rounded-sm bg-surface-2 px-2 py-0.5 font-mono text-muted">{read(v)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-2 font-mono text-xs text-muted">{c.l3}</p>
          <div className="space-y-3 rounded-md bg-bg p-4">
            <button className="min-h-11 rounded-md bg-accent px-4 text-sm font-medium text-on-accent">Button</button>
            <div className="rounded-lg border border-line bg-surface p-3 text-sm shadow-1">
              <p className="display font-semibold">Card</p>
              <span className="mt-1 inline-block rounded-full bg-accent-soft px-2 py-0.5 text-xs text-accent">Badge</span>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-4 text-xs text-muted">{c.note}</p>
    </div>
  );
}

/* ───────── 3. Arabic reader ───────── */
const read = {
  en: { size: "Text size", lh: "Line spacing", tashkeel: "Show diacritics" },
  ar: { size: "حجم الخط", lh: "تباعد الأسطر", tashkeel: "إظهار التشكيل" },
};
// Surat Al-Fatiha, verses 1–4. Verify against your Mushaf source before launch.
const verses = ["بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ", "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ", "ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ", "مَـٰلِكِ يَوْمِ ٱلدِّينِ"];
const arNum = (n: number) => String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[+d]);
const strip = (s: string) => s.replace(/[ً-ٰٟ]/g, "");
export function ReaderDemo({ lang }: { lang: Locale }) {
  const c = read[lang];
  const [size, setSize] = useState(32);
  const [lh, setLh] = useState(2.2);
  const [tashkeel, setTashkeel] = useState(true);
  return (
    <div className={frame}>
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="text-sm">{c.size} · {size}px
          <input type="range" min={22} max={52} value={size} onChange={(e) => setSize(+e.target.value)} className="mt-2 block min-h-11 w-full accent-[var(--accent)]" />
        </label>
        <label className="text-sm">{c.lh} · {lh.toFixed(1)}
          <input type="range" min={1.5} max={3} step={0.1} value={lh} onChange={(e) => setLh(+e.target.value)} className="mt-2 block min-h-11 w-full accent-[var(--accent)]" />
        </label>
        <label className="flex min-h-11 items-center gap-2 self-end text-sm">
          <input type="checkbox" checked={tashkeel} onChange={(e) => setTashkeel(e.target.checked)} className="size-5 accent-[var(--accent)]" /> {c.tashkeel}
        </label>
      </div>
      <p lang="ar" dir="rtl" className="mt-6 rounded-md bg-bg p-5 text-center" style={{ fontFamily: "var(--font-quran), var(--font-plex-arabic), serif", fontSize: size, lineHeight: lh }}>
        {verses.map((v, n) => (
          <span key={n}>{tashkeel ? v : strip(v)} <span className="text-accent">﴿{arNum(n + 1)}﴾</span> </span>
        ))}
      </p>
    </div>
  );
}

/* ───────── 4. Ledger (add-transaction) ───────── */
const lg = {
  en: { balance: "Balance", amount: "Amount", income: "Income", expense: "Expense", add: "Add", cats: ["Food", "Transport", "Salary", "Other"], empty: "No transactions yet", hint: "Illustrative data, kept in this page only." },
  ar: { balance: "الرصيد", amount: "المبلغ", income: "دخل", expense: "مصروف", add: "إضافة", cats: ["طعام", "مواصلات", "راتب", "أخرى"], empty: "لا توجد معاملات بعد", hint: "بيانات توضيحية، تبقى في هذه الصفحة فقط." },
};
type Tx = { id: number; amt: number; cat: string };
export function LedgerDemo({ lang }: { lang: Locale }) {
  const c = lg[lang];
  const [txs, setTxs] = useState<Tx[]>([{ id: 1, amt: 1200, cat: c.cats[2] }, { id: 2, amt: -45, cat: c.cats[0] }]);
  const [type, setType] = useState<"in" | "out">("out");
  const [amt, setAmt] = useState("");
  const [cat, setCat] = useState(0);
  const [err, setErr] = useState(false);
  const balance = txs.reduce((s, t) => s + t.amt, 0);
  return (
    <div className={frame}>
      <p className="font-mono text-xs text-muted">{c.balance}</p>
      <p className="display text-3xl font-semibold tabular-nums" dir="ltr" style={{ textAlign: "start" }}>{balance.toLocaleString("en-US")}</p>
      <form
        className="mt-5 grid gap-3 sm:grid-cols-[auto_1fr_auto]"
        onSubmit={(e) => {
          e.preventDefault();
          const n = Number(amt);
          if (!n || n <= 0) return setErr(true);
          setErr(false);
          setTxs([{ id: Date.now(), amt: type === "in" ? n : -n, cat: c.cats[cat] }, ...txs]);
          setAmt("");
        }}
      >
        <div className="flex gap-2" role="group">
          <button type="button" className={btn} aria-pressed={type === "out"} onClick={() => setType("out")}>{c.expense}</button>
          <button type="button" className={btn} aria-pressed={type === "in"} onClick={() => setType("in")}>{c.income}</button>
        </div>
        <input inputMode="decimal" aria-label={c.amount} aria-invalid={err} placeholder={c.amount} value={amt} onChange={(e) => setAmt(e.target.value)} className={`${field} ${err ? "border-accent" : ""}`} />
        <button className="min-h-11 rounded-md bg-accent px-5 text-sm font-medium text-on-accent transition-transform active:scale-[0.97]">{c.add}</button>
      </form>
      <div className="mt-3 flex flex-wrap gap-2" role="group">
        {c.cats.map((n, k) => (
          <button key={n} type="button" className={btn} aria-pressed={cat === k} onClick={() => setCat(k)}>{n}</button>
        ))}
      </div>
      <ul className="mt-5 divide-y divide-line">
        {txs.length === 0 && <li className="py-3 text-sm text-muted">{c.empty}</li>}
        {txs.slice(0, 6).map((t) => (
          <li key={t.id} className="flex items-center justify-between py-3 text-sm animate-[fade-in_var(--dur-base)_var(--ease-out)]">
            <span>{t.cat}</span>
            <span dir="ltr" className={`tabular-nums ${t.amt > 0 ? "text-accent" : ""}`}>{t.amt > 0 ? "+" : "−"}{Math.abs(t.amt).toLocaleString("en-US")}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-muted">{c.hint}</p>
    </div>
  );
}
