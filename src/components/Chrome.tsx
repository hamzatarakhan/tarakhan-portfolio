import Link from "next/link";
import { LangButton, ThemeButton } from "./Controls";
import { SWITCHERS } from "@/lib/ui";
import type { Dict, Locale } from "@/lib/i18n";
import { CommandMenu } from "./CommandMenu";
import { MobileMenu } from "./MobileMenu";
import { Logo } from "./Logo";
import { HomeLink } from "./HomeLink";
// Client brand skins must load on every page (a chosen brand persists across navigation).
import "@/styles/brands.css";
import { cases } from "@/content/work";

export const wrap = "mx-auto w-full max-w-[1440px] px-5 sm:px-10";

// "*word*" in copy becomes the serif-italic accent word.
export function Rich({ children }: { children: string }) {
  return (
    <>
      {children.split(/\*(.+?)\*/).map((s, i) =>
        i % 2 ? (
          <span key={i} className="ital">
            {s}
          </span>
        ) : (
          s
        ),
      )}
    </>
  );
}
// Quiet visual break between sections.
export function Divider() {
  return (
    <div className={`${wrap} py-2`} aria-hidden>
      <div className="divider" />
    </div>
  );
}

export const plain = (s: string) => s.replace(/\*/g, "");

export function Header({ lang, t }: { lang: Locale; t: Dict }) {
  const links = [
    ["work", `/${lang}#work`],
    ["testimonials", `/${lang}#testimonials`],
    ["about", `/${lang}/about`],
    ["contact", `/${lang}/contact`],
  ] as const;
  return (
    <header className="sticky top-0 z-20 bg-gradient-to-b from-bg via-bg/85 to-transparent pt-2 pb-3 backdrop-blur-sm">
      <a
        href="#main"
        className="sr-only !m-0 start-0 top-0 focus:not-sr-only focus:absolute focus:start-4 focus:top-2 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
      >
        {t.nav.skip}
      </a>
      <div className={`${wrap} flex items-center justify-between gap-3`}>
        <HomeLink
          href={`/${lang}`}
          className="display group flex min-h-10 items-center gap-2.5 whitespace-nowrap text-base font-semibold sm:text-lg"
        >
          <Logo className="size-7 shrink-0 transition-transform duration-[var(--dur-base)] ease-[var(--ease-spring)] group-hover:scale-110" />
          {t.hero.name}
        </HomeLink>
        <nav
          className="glass hidden items-center gap-1 !rounded-full px-2 py-1 md:flex"
          aria-label="Primary"
        >
          {links.map(([k, href]) => (
            <a
              key={k}
              href={href}
              className="min-h-9 content-center rounded-full px-3.5 text-[13px] text-muted transition-colors hover:bg-accent-soft hover:text-fg"
            >
              {t.nav[k]}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <CommandMenu
            lang={lang}
            d={t.cmd}
            cases={cases.map((c) => ({ slug: c.slug, title: c[lang].title }))}
          />
          {/* On phones these live inside the menu, leaving room for the CTA. */}
          {SWITCHERS && (
            <div className="hidden items-center gap-2 md:flex">
              <ThemeButton labels={t.nav.theme as [string, string]} />
              <LangButton />
            </div>
          )}
          <Link
            href={`/${lang}/contact`}
            className="relative inline-flex h-9 items-center whitespace-nowrap rounded-full border border-accent px-4 text-[13px] font-medium text-accent transition-colors before:absolute before:-inset-1 before:content-[''] hover:bg-accent hover:text-on-accent"
          >
            {t.hero.cta2}
          </Link>
          <MobileMenu
            name={t.hero.name}
            links={links.map(([k, href]) => ({ label: t.nav[k], href }))}
            cta={{ label: t.hero.ctaProject, href: `/${lang}/contact` }}
            email={t.contact.email}
            labels={{
              menu: t.nav.menu,
              close: t.nav.close,
              theme: t.nav.theme as [string, string],
            }}
          />
        </div>
      </div>
    </header>
  );
}

export function Footer({ lang, t }: { lang: Locale; t: Dict }) {
  return (
    <footer className="border-t border-line py-8 text-sm text-muted">
      <div
        className={`${wrap} flex flex-wrap items-center justify-between gap-3`}
      >
        <span>© 2026 {t.hero.name}</span>
        <span>
          {t.footer.built} ·{" "}
          <Link
            href={`/${lang}/colophon`}
            className="underline underline-offset-4 hover:text-fg"
          >
            {t.footer.colophon}
          </Link>
        </span>
      </div>
    </footer>
  );
}
