"use client";

import { useState } from "react";
import type { Dict } from "@/lib/i18n";
import { btn } from "./Controls";
import "@/styles/forms.css";

// Email: Web3Forms (NEXT_PUBLIC_WEB3FORMS_KEY, free from web3forms.com). WhatsApp: /api/contact (CALLMEBOT_KEY).
const KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
// Country codes for the phone field; Jordan first and selected by default.
const CODES = [
  ["JO", "962"],
  ["SA", "966"],
  ["AE", "971"],
  ["KW", "965"],
  ["QA", "974"],
  ["BH", "973"],
  ["OM", "968"],
  ["EG", "20"],
  ["IQ", "964"],
  ["LB", "961"],
  ["PS", "970"],
  ["SY", "963"],
  ["TR", "90"],
  ["GB", "44"],
  ["US", "1"],
  ["CA", "1"],
  ["DE", "49"],
  ["FR", "33"],
  ["NL", "31"],
  ["IN", "91"],
  ["PK", "92"],
] as const;
const input =
  "min-h-11 w-full rounded-md border border-line bg-surface px-3 placeholder:text-muted/70 aria-[invalid=true]:border-accent aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-accent";

export function ContactForm({ f }: { f: Dict["contactPage"]["f"] }) {
  const [type, setType] = useState(0);
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "ok" | "fail">(
    "idle",
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get("botcheck")) return; // honeypot
    const v = (k: string) => String(fd.get(k) ?? "").trim();
    const next: Record<string, string> = {};
    if (!v("name")) next.name = f.required;
    if (!v("email")) next.email = f.required;
    else if (!/^\S+@\S+\.\S+$/.test(v("email"))) next.email = f.invalid;
    const tel = v("phone")
      .replace(/[\s()-]/g, "")
      .replace(/^0+/, ""); // drop a local leading 0 (079… → 79…)
    if (tel && !/^\d{6,14}$/.test(tel)) next.phone = f.phoneInvalid;
    if (!v("message")) next.message = f.required;
    setErrs(next);
    if (Object.keys(next).length) return;
    setState("sending");
    const msg = {
      type: f.types[type],
      name: v("name"),
      email: v("email"),
      phone: tel ? `+${v("code").split("-")[1]} ${tel}` : "",
      timeline: v("timeline"),
      message: v("message"),
    };
    const post = (url: string, body: object) =>
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(body),
      }).then(
        (r) => r.ok,
        () => false,
      );
    // Email (Web3Forms, from the browser) and WhatsApp (our /api/contact) at the same time; success if either arrives.
    const sent = await Promise.all([
      KEY
        ? post("https://api.web3forms.com/submit", {
            access_key: KEY,
            subject: `Portfolio: ${msg.type} from ${msg.name}`,
            ...msg,
          })
        : false,
      post("/api/contact", msg),
    ]);
    setState(sent.some(Boolean) ? "ok" : "fail");
  }

  if (state === "ok")
    return (
      <p
        role="status"
        className="rounded-lg border border-accent bg-accent-soft p-6 text-lg animate-[fade-in_var(--dur-slow)_var(--ease-out)]"
      >
        ✓ {f.success}
      </p>
    );

  const field = (name: string, label: string, el: React.ReactNode) => (
    <div>
      <label htmlFor={name} className="mb-1 block text-sm font-medium">
        {label}
      </label>
      {el}
      {errs[name] && (
        <p id={`${name}-err`} role="alert" className="mt-1 text-sm text-accent">
          {errs[name]}
        </p>
      )}
    </div>
  );
  const a11y = (n: string) => ({
    id: n,
    name: n,
    "aria-invalid": !!errs[n],
    "aria-describedby": errs[n] ? `${n}-err` : undefined,
  });

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <fieldset>
        <legend className="mb-2 text-sm font-medium">{f.type}</legend>
        <div className="flex flex-wrap gap-2">
          {f.types.map((t, n) => (
            <button
              key={t}
              type="button"
              className={btn}
              aria-pressed={type === n}
              onClick={() => setType(n)}
            >
              {t}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="grid gap-5 sm:grid-cols-2">
        {field(
          "name",
          f.name,
          <input
            {...a11y("name")}
            autoComplete="name"
            placeholder={f.namePh}
            className={input}
          />,
        )}
        {field(
          "email",
          f.email,
          <input
            {...a11y("email")}
            type="email"
            autoComplete="email"
            dir="ltr"
            placeholder={f.emailPh}
            className={input}
          />,
        )}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {field(
          "phone",
          f.phone,
          <div className="flex gap-2" dir="ltr">
            <select
              name="code"
              aria-label={f.phoneCode}
              defaultValue="JO-962"
              className={`${input.replace("w-full", "w-[8.5rem]")} select shrink-0 whitespace-nowrap`}
            >
              {CODES.map(([c, n]) => (
                <option key={c} value={`${c}-${n}`}>
                  {c} +{n}
                </option>
              ))}
            </select>
            <input
              {...a11y("phone")}
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              placeholder={f.phonePh}
              className={input}
            />
          </div>,
        )}
        {type === 0 && (
          <div>
            {field(
              "timeline",
              f.timeline,
              <select
                {...a11y("timeline")}
                defaultValue=""
                className={`${input} select has-[option[value='']:checked]:text-muted`}
              >
                <option value="" disabled>
                  {f.select}
                </option>
                {f.timelines.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>,
            )}
          </div>
        )}
      </div>
      {field(
        "message",
        f.message,
        <textarea
          {...a11y("message")}
          rows={6}
          placeholder={f.messagePh}
          className={`${input} py-2`}
        />,
      )}
      <input
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />
      <div className="flex flex-wrap items-center gap-4">
        <button
          disabled={state === "sending"}
          className="min-h-11 rounded-md bg-accent px-6 font-medium text-on-accent transition-transform active:scale-[0.97] disabled:opacity-60"
        >
          {state === "sending" ? f.sending : f.send}
        </button>
        {state === "fail" && (
          <p role="alert" className="text-sm text-accent">
            {f.error}
          </p>
        )}
      </div>
    </form>
  );
}
