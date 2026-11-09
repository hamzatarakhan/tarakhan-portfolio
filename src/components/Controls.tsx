import { useSyncExternalStore } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const SKINS = ["indigo", "acid", "ember", "mint"] as const;

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
  "min-h-11 min-w-11 px-4 rounded-full border border-line bg-surface text-sm font-medium transition-[background,transform] duration-[var(--dur-fast)] active:scale-[0.97] hover:bg-surface-2 aria-pressed:bg-accent aria-pressed:text-on-accent aria-pressed:border-accent";

// Language lives in the URL: swap the locale segment and remember the choice.
export function switchLang(next: string, path: string, push: (u: string) => void) {
  document.cookie = `lang=${next};path=/;max-age=31536000;samesite=lax`;
  transition(() => push(path.replace(/^\/(en|ar)/, `/${next}`)));
}

// Compact header control: 36px visual, 44px hit area via the pseudo-element.
export const btnSm =
  "relative h-9 min-w-9 px-3.5 rounded-full border border-line bg-surface text-[13px] font-medium transition-[background,transform] duration-[var(--dur-fast)] active:scale-[0.97] hover:bg-surface-2 aria-pressed:bg-accent aria-pressed:text-on-accent aria-pressed:border-accent before:absolute before:-inset-1 before:content-['']";

// Round 36px icon control (44px hit area via the pseudo-element).
const iconBtn =
  "relative grid size-9 place-items-center rounded-full border border-line bg-surface text-[13px] font-semibold text-muted transition-[background,color,transform] duration-[var(--dur-fast)] hover:bg-surface-2 hover:text-fg active:scale-[0.94] before:absolute before:-inset-1 before:content-['']";

export function ThemeButton({ labels }: { labels?: [string, string] }) {
  const p = usePrefs();
  const dark = p?.theme === "dark";
  const [light, darkL] = labels ?? ["Light", "Dark"];
  return (
    <button className={iconBtn} aria-label={dark ? light : darkL} title={dark ? light : darkL} onClick={() => setTheme(dark ? "light" : "dark")}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-[18px]" aria-hidden>
        {dark ? (
          <path d="M12 4V2m0 20v-2m8-8h2M2 12h2m13.66-5.66 1.41-1.41M4.93 19.07l1.41-1.41m0-11.32L4.93 4.93m14.14 14.14-1.41-1.41M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
        ) : (
          <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" />
        )}
      </svg>
    </button>
  );
}

export function LangButton() {
  const path = useLocation().pathname;
  const navigate = useNavigate();
  const p = usePrefs();
  const next = p?.lang === "ar" ? "en" : "ar";
  const label = next === "ar" ? "العربية" : "English";
  return (
    <button className={iconBtn} lang={next} aria-label={label} title={label} onClick={() => switchLang(next, path, navigate)}>
      {next === "ar" ? <span className="font-[family-name:var(--font-plex-arabic)] text-[15px] leading-none">ع</span> : "EN"}
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
