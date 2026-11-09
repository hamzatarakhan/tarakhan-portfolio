import { useEffect, useRef } from "react";

// Thin reading-progress bar pinned to the top of the viewport: fills as the page scrolls.
// Writes a transform straight to the DOM (no re-renders); starts from the reading side in RTL.
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - innerHeight;
      const p = max > 0 ? Math.min(1, scrollY / max) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px]">
      <div
        ref={bar}
        style={{ transform: "scaleX(0)" }}
        className="h-full origin-left bg-gradient-to-r from-accent/60 via-accent to-accent shadow-[0_0_12px_var(--accent)] rtl:origin-right rtl:bg-gradient-to-l"
      />
    </div>
  );
}
