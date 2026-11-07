"use client";

import { useState } from "react";
import type { Dict } from "@/lib/i18n";
import { btn } from "./Controls";

// Web3Forms works on static hosting. Set NEXT_PUBLIC_WEB3FORMS_KEY (free key from web3forms.com).
const KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
const input = "min-h-11 w-full rounded-md border border-line bg-surface px-3 aria-[invalid=true]:border-accent aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-accent";

export function ContactForm({ f }: { f: Dict["contactPage"]["f"] }) {
  const [type, setType] = useState(0);
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "ok" | "fail">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get("botcheck")) return; // honeypot
    const v = (k: string) => String(fd.get(k) ?? "").trim();
    const next: Record<string, string> = {};
    if (!v("name")) next.name = f.required;
    if (!v("email")) next.email = f.required;
    else if (!/^\S+@\S+\.\S+$/.test(v("email"))) next.email = f.invalid;
    if (!v("message")) next.message = f.required;
    setErrs(next);
    if (Object.keys(next).length) return;
    if (!KEY) return setState("fail");
    setState("sending");
    try {
      const r = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: KEY, subject: "Portfolio contact", type: f.types[type], name: v("name"), email: v("email"), budget: v("budget"), timeline: v("timeline"), message: v("message") }),
      });
      setState(r.ok ? "ok" : "fail");
    } catch {
      setState("fail");
    }
  }

  if (state === "ok")
    return <p role="status" className="rounded-lg border border-accent bg-accent-soft p-6 text-lg animate-[fade-in_var(--dur-slow)_var(--ease-out)]">✓ {f.success}</p>;

  const field = (name: string, label: string, el: React.ReactNode) => (
    <div>
      <label htmlFor={name} className="mb-1 block text-sm font-medium">{label}</label>
      {el}
      {errs[name] && <p id={`${name}-err`} role="alert" className="mt-1 text-sm text-accent">{errs[name]}</p>}
    </div>
  );
  const a11y = (n: string) => ({ id: n, name: n, "aria-invalid": !!errs[n], "aria-describedby": errs[n] ? `${n}-err` : undefined });

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <fieldset>
        <legend className="mb-2 text-sm font-medium">{f.type}</legend>
        <div className="flex flex-wrap gap-2">
          {f.types.map((t, n) => <button key={t} type="button" className={btn} aria-pressed={type === n} onClick={() => setType(n)}>{t}</button>)}
        </div>
      </fieldset>
      <div className="grid gap-5 sm:grid-cols-2">
        {field("name", f.name, <input {...a11y("name")} autoComplete="name" className={input} />)}
        {field("email", f.email, <input {...a11y("email")} type="email" autoComplete="email" className={input} />)}
      </div>
      {type === 0 && (
        <div className="grid gap-5 sm:grid-cols-2">
          {field("budget", f.budget, <select {...a11y("budget")} className={input}>{f.budgets.map((b) => <option key={b}>{b}</option>)}</select>)}
          {field("timeline", f.timeline, <select {...a11y("timeline")} className={input}>{f.timelines.map((b) => <option key={b}>{b}</option>)}</select>)}
        </div>
      )}
      {field("message", f.message, <textarea {...a11y("message")} rows={6} className={`${input} py-2`} />)}
      <input name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <div className="flex flex-wrap items-center gap-4">
        <button disabled={state === "sending"} className="min-h-11 rounded-md bg-accent px-6 font-medium text-on-accent transition-transform active:scale-[0.97] disabled:opacity-60">
          {state === "sending" ? f.sending : f.send}
        </button>
        {state === "fail" && <p role="alert" className="text-sm text-accent">{f.error}</p>}
      </div>
    </form>
  );
}
