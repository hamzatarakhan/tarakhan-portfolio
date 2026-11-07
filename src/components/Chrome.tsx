import Link from "next/link";
import { ThemeButton } from "./Controls";
import type { Dict, Locale } from "@/lib/i18n";
import { CommandMenu } from "./CommandMenu";
import { cases } from "@/content/work";

export const wrap = "mx-auto w-full max-w-[1440px] px-5 sm:px-10";

// "*word*" in copy becomes the serif-italic accent word.
export function Rich({ children }: { children: string }) {
  return (
    <>
      {children.split(/\*(.+?)\*/).map((s, i) => (i % 2 ? <span key={i} className="ital">{s}</span> : s))}
    </>
  );
}
export const plain = (s: string) => s.replace(/\*/g, "");

export function Header({ lang, t }: { lang: Locale; t: Dict }) {
  const links = [["work", `/${lang}#work`], ["about", `/${lang}/about`], ["contact", `/${lang}/contact`]] as const;
  return (
    <header className="sticky top-0 z-20 bg-gradient-to-b from-bg via-bg/85 to-transparent pt-3 pb-5 backdrop-blur-sm">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-2 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent">
        {t.nav.skip}
      </a>
      <div className={`${wrap} flex items-center justify-between gap-3`}>
        <Link href={`/${lang}`} className="display min-h-11 content-center text-lg font-semibold">
          {t.hero.name}
        </Link>
        <nav className="glass hidden items-center gap-1 !rounded-full px-2 py-1 md:flex" aria-label="Primary">
          {links.map(([k, href]) => (
            <a key={k} href={href} className="min-h-10 content-center rounded-full px-4 text-sm text-muted transition-colors hover:bg-accent-soft hover:text-fg">
              {t.nav[k]}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <CommandMenu lang={lang} d={t.cmd} cases={cases.map((c) => ({ slug: c.slug, title: c[lang].title }))} />
          <ThemeButton labels={t.nav.theme as [string, string]} />
          <Link href={`/${lang}/contact`} className="hidden min-h-11 items-center rounded-full border border-accent px-5 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-on-accent sm:inline-flex">
            {t.hero.cta2}
          </Link>
        </div>
      </div>
    </header>
  );
}

export function Footer({ lang, t }: { lang: Locale; t: Dict }) {
  return (
    <footer className="border-t border-line py-8 text-sm text-muted">
      <div className={`${wrap} flex flex-wrap items-center justify-between gap-3`}>
        <span>© 2026 {t.hero.name}</span>
        <span>
          {t.footer.built} ·{" "}
          <Link href={`/${lang}/colophon`} className="underline underline-offset-4 hover:text-fg">
            {t.footer.colophon}
          </Link>
        </span>
      </div>
    </footer>
  );
}
