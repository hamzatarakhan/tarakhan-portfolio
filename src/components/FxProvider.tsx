import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Global effects: pointer spotlight on .glass cards and scroll-reveal for .reveal elements.
// Both write only things React does not render (a data-in attribute; style vars after hydration),
// so parts of the page that hydrate later (partial prerendering) never see a mismatch.
export function FxProvider() {
  const path = useLocation().pathname;

  useEffect(() => {
    const move = (e: PointerEvent) => {
      const g = (e.target as Element | null)?.closest<HTMLElement>(".glass");
      if (!g) return;
      const r = g.getBoundingClientRect();
      g.style.setProperty("--mx", `${e.clientX - r.left}px`);
      g.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    // Wait until the page is idle (hydrated) before touching style attributes React owns.
    const idle = window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 200));
    const id = idle(() => addEventListener("pointermove", move, { passive: true }));
    return () => {
      window.cancelIdleCallback?.(id as number);
      removeEventListener("pointermove", move);
    };
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal:not([data-in])");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.in = "";
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
