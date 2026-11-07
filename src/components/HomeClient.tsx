"use client";

import { useEffect, useRef, useState } from "react";
import { btn } from "./Controls";

// Server HTML already holds the final number (content never hidden); we replay 0 → n on scroll-in.
export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    el.textContent = "0" + suffix;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min((t - t0) / 1200, 1);
        el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + suffix;
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, suffix]);
  return <span ref={ref}>{to + suffix}</span>;
}

export function ProcessTabs({ steps }: { steps: { name: string; body: string; example: string }[] }) {
  const [i, setI] = useState(0);
  const s = steps[i];
  return (
    <div className="grid gap-6 md:grid-cols-[minmax(0,16rem)_1fr]">
      <div role="tablist" className="flex gap-2 overflow-x-auto md:flex-col md:overflow-visible" aria-orientation="vertical">
        {steps.map((st, n) => (
          <button
            key={st.name}
            role="tab"
            id={`tab-${n}`}
            aria-selected={n === i}
            aria-controls="process-panel"
            tabIndex={n === i ? 0 : -1}
            onClick={() => setI(n)}
            onKeyDown={(e) => {
              const d = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
              if (!d) return;
              const m = (n + d + steps.length) % steps.length;
              setI(m);
              document.getElementById(`tab-${m}`)?.focus();
            }}
            className="flex min-h-11 shrink-0 items-center gap-3 rounded-full border border-line bg-bg px-5 text-start text-sm font-medium transition-colors aria-selected:border-accent aria-selected:bg-accent-soft aria-selected:text-accent"
          >
            <span className="font-mono text-xs text-muted">{String(n + 1).padStart(2, "0")}</span>
            {st.name}
          </button>
        ))}
      </div>
      <div id="process-panel" role="tabpanel" aria-labelledby={`tab-${i}`} key={i} className="rounded-lg border border-line bg-bg p-7 shadow-1 animate-[fade-in_var(--dur-base)_var(--ease-out)]">
        <h3 className="display text-xl font-semibold">{s.name}</h3>
        <p className="mt-2 max-w-prose text-muted">{s.body}</p>
        <p className="mt-5 border-s-2 border-accent ps-4 text-sm">{s.example}</p>
      </div>
    </div>
  );
}

export function CopyEmail({ email, copy, copied }: { email: string; copy: string; copied: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      className={btn}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email);
        } catch {
          return;
        }
        setDone(true);
        setTimeout(() => setDone(false), 1800);
      }}
    >
      <span aria-live="polite">{done ? copied : copy}</span>
    </button>
  );
}
