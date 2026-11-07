"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Global effects: pointer spotlight on .glass cards and scroll-reveal for .reveal elements.
export function FxProvider() {
  const path = usePathname();

  useEffect(() => {
    const move = (e: PointerEvent) => {
      const g = (e.target as Element | null)?.closest<HTMLElement>(".glass");
      if (!g) return;
      const r = g.getBoundingClientRect();
      g.style.setProperty("--mx", `${e.clientX - r.left}px`);
      g.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    addEventListener("pointermove", move, { passive: true });
    return () => removeEventListener("pointermove", move);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal:not(.in)");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [path]);

  return null;
}
