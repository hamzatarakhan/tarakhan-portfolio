"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LangButton, ThemeButton } from "./Controls";

type Props = {
  name: string;
  links: { label: string; href: string }[];
  cta: { label: string; href: string };
  email: string;
  labels: { menu: string; close: string; theme: [string, string] };
};

// Phone-only full-screen menu. Native <dialog> gives focus trapping, Esc to close and an inert page behind.
export function MobileMenu({ name, links, cta, email, labels }: Props) {
  const dlg = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const path = usePathname();

  const show = () => {
    dlg.current?.showModal();
    setOpen(true);
  };
  const hide = () => dlg.current?.close();

  // Close when the route changes (e.g. after tapping a link).
  useEffect(() => {
    dlg.current?.close();
  }, [path]);

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
        className="m-0 h-dvh max-h-none w-full max-w-none bg-bg/95 p-0 text-fg backdrop-blur-xl backdrop:bg-transparent"
      >
        {open && (
          <div className="flex h-full flex-col px-5 pt-3 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            <div className="flex items-center justify-between">
              <span className="display text-base font-semibold">{name}</span>
              <button
                onClick={hide}
                aria-label={labels.close}
                className="relative grid size-9 place-items-center rounded-full border border-line bg-surface before:absolute before:-inset-1 before:content-['']"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="size-[18px]" aria-hidden>
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>

            <nav className="mt-12" aria-label={labels.menu}>
              <ul className="space-y-1">
                {links.map((l, i) => (
                  <li key={l.href} className="rise" style={{ "--i": i } as React.CSSProperties}>
                    <Link href={l.href} onClick={hide} className="flex min-h-16 items-baseline gap-4 border-b border-[var(--glass-line)] py-3">
                      <span className="label text-muted">{String(i + 1).padStart(2, "0")}</span>
                      <span className="display text-4xl font-medium">{l.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="rise mt-auto space-y-5" style={{ "--i": links.length } as React.CSSProperties}>
              <Link
                href={cta.href}
                onClick={hide}
                className="flex min-h-13 w-full items-center justify-center rounded-full bg-accent py-3.5 font-medium text-on-accent shadow-[0_10px_40px_-10px_var(--accent)]"
              >
                {cta.label}
              </Link>
              <div className="flex items-center justify-between">
                <a href={`mailto:${email}`} dir="ltr" className="truncate text-sm text-muted underline decoration-accent underline-offset-4">
                  {email}
                </a>
                <div className="flex gap-2">
                  <ThemeButton labels={labels.theme} />
                  <LangButton />
                </div>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
