"use client";

import { useSyncExternalStore } from "react";

export const SKINS = ["calm", "ember", "moss", "violet"] as const;
type Prefs = { theme: string; skin: string; lang: string };

// Applies a change inside a View Transition when supported (smooth, no flash).
function apply(key: keyof Prefs, value: string) {
  const run = () => {
    const d = document.documentElement;
    if (key === "theme") d.dataset.theme = value;
    if (key === "skin") d.dataset.skin = value;
    if (key === "lang") {
      d.lang = value;
      d.dir = value === "ar" ? "rtl" : "ltr";
    }
    try {
      localStorage.setItem(key, value);
    } catch {}
  };
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (document.startViewTransition && !reduce) document.startViewTransition(run);
  else run();
}

const btn =
  "min-h-11 min-w-11 px-4 rounded-md border border-line bg-surface text-sm font-medium transition-[background,transform] duration-[var(--dur-fast)] active:scale-[0.97] hover:bg-surface-2 aria-pressed:bg-accent aria-pressed:text-on-accent aria-pressed:border-accent";

// <html> attributes are the single source of truth; the component just observes them.
function subscribe(cb: () => void) {
  const o = new MutationObserver(cb);
  o.observe(document.documentElement, { attributes: true });
  return () => o.disconnect();
}
const snap = () => {
  const d = document.documentElement;
  return `${d.dataset.theme}|${d.dataset.skin}|${d.lang}`;
};

export function Controls() {
  const raw = useSyncExternalStore(subscribe, snap, () => "");
  if (!raw) return <div className="min-h-11" />;
  const [theme, skin, lang] = raw.split("|");
  const p: Prefs = { theme, skin, lang };
  const set = apply;
  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Theme controls">
      <button className={btn} aria-pressed={p.theme === "dark"} onClick={() => set("theme", p.theme === "dark" ? "light" : "dark")}>
        {p.theme === "dark" ? "Dark" : "Light"}
      </button>
      <button className={btn} aria-pressed={p.lang === "ar"} onClick={() => set("lang", p.lang === "ar" ? "en" : "ar")}>
        {p.lang === "ar" ? "العربية" : "English"}
      </button>
      <span className="mx-1 h-6 w-px bg-line" aria-hidden />
      {SKINS.map((s) => (
        <button key={s} className={`${btn} capitalize`} aria-pressed={p.skin === s} onClick={() => set("skin", s)}>
          {s}
        </button>
      ))}
    </div>
  );
}
