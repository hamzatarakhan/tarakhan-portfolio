import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { LangButton, ThemeButton } from "./Controls";
import { SWITCHERS } from "@/lib/ui";
import { CV_URL, whatsappLink } from "@/lib/contact";
import { Icon } from "./Mock";
import { Logo } from "./Logo";

type Props = {
  name: string;
  status: string;
  links: { label: string; href: string; icon: string }[];
  cta: { label: string; href: string };
  email: string;
  waText: string;
  labels: { menu: string; close: string; theme: [string, string]; quick: { whatsapp: string; email: string; cv: string } };
};

// Phone/tablet menu. Native <dialog> gives focus trapping, Esc to close and an inert page behind.
// Layout: availability status, the pages as a 2×2 grid of glass tiles (current page highlighted),
// quick ways to reach me, then the main call to action.
export function MobileMenu({ name, status, links, cta, email, waText, labels }: Props) {
  const dlg = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const path = useLocation().pathname;

  const show = () => {
    dlg.current?.showModal();
    setOpen(true);
  };
  const hide = () => dlg.current?.close();

  // Close when the route changes (e.g. after tapping a link).
  useEffect(() => {
    dlg.current?.close();
  }, [path]);

  const st = (i: number) => ({ "--i": i }) as React.CSSProperties;
  const quick = [
    { label: labels.quick.whatsapp, icon: "chat", href: whatsappLink(waText), ext: true },
    { label: labels.quick.email, icon: "mail", href: `mailto:${email}`, ext: false },
    { label: labels.quick.cv, icon: "download", href: CV_URL, ext: true },
  ];

  return (
    <>
      <button
        onClick={show}
        aria-label={labels.menu}
        aria-expanded={open}
        className="relative grid size-9 place-items-center rounded-full border border-line bg-surface before:absolute before:-inset-1 before:content-[''] md:hidden"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="size-[18px]" aria-hidden>
          <path d="M4 8h16M4 16h10" />
        </svg>
      </button>

      <dialog
        ref={dlg}
        onClose={() => setOpen(false)}
        aria-label={labels.menu}
        className="m-0 h-dvh max-h-none w-full max-w-none overflow-hidden bg-bg/95 p-0 text-fg backdrop-blur-xl backdrop:bg-transparent"
      >
        {open && (
          <div className="relative flex h-full flex-col overflow-y-auto px-5 pt-3 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            {/* Soft accent glow behind the menu */}
            <div aria-hidden className="pointer-events-none absolute -top-24 start-1/2 size-80 -translate-x-1/2 rounded-full bg-accent/25 blur-3xl rtl:translate-x-1/2" />

            <div className="relative flex items-center justify-between">
              <span className="display flex items-center gap-2.5 text-base font-semibold">
                <Logo className="size-7" />
                {name}
              </span>
              <button
                onClick={hide}
                aria-label={labels.close}
                className="relative grid size-9 place-items-center rounded-full border border-line bg-surface transition-transform before:absolute before:-inset-1 before:content-[''] active:scale-90"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="size-[18px]" aria-hidden>
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>

            <p className="rise label relative mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-[var(--glass-line)] bg-[var(--glass)] px-3 py-1.5 normal-case text-fg" style={st(0)}>
              <span className="pulse relative size-2 rounded-full bg-accent" aria-hidden />
              {status}
            </p>

            <nav className="relative mt-5" aria-label={labels.menu}>
              <ul className="grid grid-cols-2 gap-3">
                {links.map((l, i) => {
                  const current = !l.href.includes("#") && path === l.href;
                  return (
                    <li key={l.href} className="rise" style={st(i + 1)}>
                      <Link
                        to={l.href}
                        onClick={hide}
                        aria-current={current ? "page" : undefined}
                        className="group flex min-h-32 flex-col justify-between gap-6 rounded-3xl border border-[var(--glass-line)] bg-surface p-4 transition-[transform,border-color,background-color] active:scale-[0.97] active:border-accent/60 aria-[current=page]:border-accent/60 aria-[current=page]:bg-accent-soft"
                      >
                        <span className="flex items-start justify-between">
                          <span className="grid size-10 place-items-center rounded-2xl bg-accent-soft text-accent">
                            <Icon name={l.icon} className="size-5" />
                          </span>
                          <Icon name="arrow" className="flip-rtl size-4 text-muted transition-colors group-active:text-accent" />
                        </span>
                        <span>
                          <span className="label block text-muted">{String(i + 1).padStart(2, "0")}</span>
                          <span className="display mt-1 block text-xl font-medium leading-tight">{l.label}</span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="rise relative mt-auto pt-8" style={st(links.length + 1)}>
              <ul className="grid grid-cols-3 gap-2">
                {quick.map((q) => (
                  <li key={q.label}>
                    <a
                      href={q.href}
                      {...(q.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="flex min-h-16 flex-col items-center justify-center gap-1.5 rounded-2xl border border-[var(--glass-line)] bg-surface px-2 text-xs font-medium transition-transform active:scale-95"
                    >
                      <Icon name={q.icon} className="size-5 text-accent" />
                      {q.label}
                    </a>
                  </li>
                ))}
              </ul>
              <Link
                to={cta.href}
                onClick={hide}
                className="mt-3 flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-accent py-3.5 font-medium text-on-accent shadow-[0_10px_40px_-10px_var(--accent)] transition-transform active:scale-[0.98]"
              >
                {cta.label}
                <Icon name="arrow" className="flip-rtl size-4" />
              </Link>
              {SWITCHERS && (
                <div className="mt-4 flex justify-center gap-2">
                  <ThemeButton labels={labels.theme} />
                  <LangButton />
                </div>
              )}
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
