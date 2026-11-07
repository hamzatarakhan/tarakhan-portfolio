import Link from "next/link";
import { ThemeButton } from "./Controls";
import type { Dict, Locale } from "@/lib/i18n";
import { CommandMenu } from "./CommandMenu";
import { cases } from "@/content/work";

export const wrap = "mx-auto w-full max-w-[1600px] px-5 sm:px-10";

export function Header({ lang, t }: { lang: Locale; t: Dict }) {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-bg/85 backdrop-blur">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-2 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-on-accent">
        {t.nav.skip}
      </a>
      <div className={`${wrap} flex items-center justify-between gap-3 py-2`}>
        <Link href={`/${lang}`} className="display min-h-11 content-center font-semibold">
          {t.hero.name}
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {(["work", "about", "contact"] as const).map((k) => (
            <a key={k} href={k === "work" ? `/${lang}#work` : k === "contact" ? `/${lang}/contact` : `/${lang}/about`} className="min-h-11 content-center rounded-md px-3 text-sm text-muted transition-colors hover:text-fg">
              {t.nav[k]}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <CommandMenu lang={lang} d={t.cmd} cases={cases.map((c) => ({ slug: c.slug, title: c[lang].title }))} />
          <ThemeButton labels={t.nav.theme as [string, string]} />
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
