"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Dict, Locale } from "@/lib/i18n";
import { CV_URL } from "@/lib/contact";
import { SWITCHERS } from "@/lib/ui";
import { SKINS, switchLang, setSkin, setTheme, usePrefs } from "./Controls";

type Cmd = { group: string; label: string; run: () => void };

export function CommandMenu({
  lang,
  d,
  cases,
}: {
  lang: Locale;
  d: Dict["cmd"];
  cases: { slug: string; title: string }[];
}) {
  const router = useRouter();
  const path = usePathname();
  const prefs = usePrefs();
  const dlg = useRef<HTMLDialogElement>(null);
  const [q, setQ] = useState("");
  const [i, setI] = useState(0);
  const email = "hamzatarakhan2000@gmail.com";

  const open = () => {
    setQ("");
    setI(0);
    dlg.current?.showModal();
  };
  const close = () => dlg.current?.close();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (dlg.current?.open) close();
        else open();
      }
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, []);

  const go = (p: string) => () => router.push(`/${lang}${p}`);
  const other = lang === "ar" ? "en" : "ar";
  const all: Cmd[] = [
    { group: d.pages, label: d.home, run: go("") },
    { group: d.pages, label: d.about, run: go("/about") },
    { group: d.pages, label: d.contact, run: go("/contact") },
    { group: d.pages, label: d.colophon, run: go("/colophon") },
    ...cases.map((c) => ({
      group: d.work,
      label: c.title,
      run: go(`/work/${c.slug}`),
    })),
    ...(SWITCHERS
      ? [
          {
            group: d.actions,
            label: d.theme,
            run: () => setTheme(prefs?.theme === "dark" ? "light" : "dark"),
          },
          {
            group: d.actions,
            label: d.lang,
            run: () => switchLang(other, path, router.push),
          },
          ...SKINS.map((s) => ({
            group: d.actions,
            label: `${d.skin}: ${s}`,
            run: () => setSkin(s),
          })),
        ]
      : []),
    {
      group: d.actions,
      label: d.copy,
      run: () => navigator.clipboard?.writeText(email),
    },
    { group: d.actions, label: d.cv, run: () => window.open(CV_URL, "_blank") },
  ];
  const list = all.filter((c) =>
    c.label.toLowerCase().includes(q.toLowerCase()),
  );
  const pick = (c?: Cmd) => {
    if (!c) return;
    close();
    c.run();
  };

  return (
    <>
      <button
        onClick={open}
        aria-label={d.open}
        className="relative hidden h-9 items-center gap-2 whitespace-nowrap rounded-full border border-line bg-surface px-3.5 text-[13px] text-muted transition-colors before:absolute before:-inset-1 before:content-[''] hover:text-fg lg:inline-flex"
      >
        {d.open}{" "}
        <kbd className="rounded-sm bg-surface-2 px-1.5 font-mono text-xs">
          {d.hint}
        </kbd>
      </button>
      <dialog
        ref={dlg}
        aria-label={d.open}
        onClick={(e) => e.target === dlg.current && close()}
        className="m-auto mt-[12vh] w-[min(92vw,34rem)] rounded-lg border border-line bg-surface p-0 text-fg shadow-2 backdrop:bg-black/40 backdrop:backdrop-blur-sm"
      >
        <input
          autoFocus
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setI(0);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setI((i + 1) % Math.max(list.length, 1));
            }
            if (e.key === "ArrowUp") {
              e.preventDefault();
              setI((i - 1 + list.length) % Math.max(list.length, 1));
            }
            if (e.key === "Enter") pick(list[i]);
          }}
          placeholder={d.placeholder}
          aria-label={d.placeholder}
          className="min-h-12 w-full border-b border-line bg-transparent px-4 outline-none"
        />
        <ul role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
          {list.length === 0 && (
            <li className="p-3 text-sm text-muted">{d.empty}</li>
          )}
          {list.map((c, n) => (
            <li
              key={c.group + c.label}
              role="option"
              aria-selected={n === i}
              onMouseEnter={() => setI(n)}
              onClick={() => pick(c)}
              className="flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-md px-3 text-sm aria-selected:bg-accent-soft aria-selected:text-accent"
            >
              <span>{c.label}</span>
              <span className="text-xs text-muted">{c.group}</span>
            </li>
          ))}
        </ul>
      </dialog>
    </>
  );
}
