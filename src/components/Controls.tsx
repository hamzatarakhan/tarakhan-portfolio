"use client";

import { useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";

export const SKINS = ["calm", "ember", "moss", "violet"] as const;

// Runs a change inside a View Transition when supported (smooth, no flash).
function transition(run: () => void) {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (document.startViewTransition && !reduce) document.startViewTransition(run);
  else run();
}
function save(k: string, v: string) {
  try {
    localStorage.setItem(k, v);
  } catch {}
}
export function setTheme(v: string) {
  transition(() => (document.documentElement.dataset.theme = v));
  save("theme", v);
}
export function setSkin(v: string) {
  transition(() => (document.documentElement.dataset.skin = v));
  save("skin", v);
}

// <html> attributes are the single source of truth; components observe them.
function subscribe(cb: () => void) {
  const o = new MutationObserver(cb);
  o.observe(document.documentElement, { attributes: true });
  return () => o.disconnect();
}
const snap = () => {
  const d = document.documentElement;
  return `${d.dataset.theme}|${d.dataset.skin}|${d.lang}`;
};
export function usePrefs() {
  const raw = useSyncExternalStore(subscribe, snap, () => "");
  if (!raw) return null;
  const [theme, skin, lang] = raw.split("|");
  return { theme, skin, lang };
}

export const btn =
  "min-h-11 min-w-11 px-4 rounded-md border border-line bg-surface text-sm font-medium transition-[background,transform] duration-[var(--dur-fast)] active:scale-[0.97] hover:bg-surface-2 aria-pressed:bg-accent aria-pressed:text-on-accent aria-pressed:border-accent";

export function ThemeButton({ labels }: { labels?: [string, string] }) {
  const p = usePrefs();
  const dark = p?.theme === "dark";
  return (
    <button className={btn} aria-pressed={dark} onClick={() => setTheme(dark ? "light" : "dark")}>
      {(labels ?? ["Light", "Dark"])[dark ? 1 : 0]}
    </button>
  );
}

// Language lives in the URL: swap the locale segment and remember the choice.
export function LangButton() {
  const path = usePathname();
  const router = useRouter();
  const p = usePrefs();
  const next = p?.lang === "ar" ? "en" : "ar";
  return (
    <button
      className={btn}
      lang={next}
      onClick={() => {
        document.cookie = `lang=${next};path=/;max-age=31536000;samesite=lax`;
        transition(() => router.push(path.replace(/^\/(en|ar)/, `/${next}`)));
      }}
    >
      {next === "ar" ? "العربية" : "English"}
    </button>
  );
}

export function SkinPicker({ className = "" }: { className?: string }) {
  const p = usePrefs();
  return (
    <div className={`flex flex-wrap gap-2 ${className}`} role="group" aria-label="Brand skin">
      {SKINS.map((s) => (
        <button key={s} className={`${btn} capitalize`} aria-pressed={p?.skin === s} onClick={() => setSkin(s)}>
          {s}
        </button>
      ))}
    </div>
  );
}

export function Controls() {
  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Theme controls">
      <ThemeButton />
      <LangButton />
      <span className="mx-1 h-6 w-px bg-line" aria-hidden />
      <SkinPicker />
    </div>
  );
}
