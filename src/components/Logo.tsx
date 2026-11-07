// "Switch H": two stems joined by a toggle in the on state. One system that switches theme, language and brand.
// Stems use currentColor; the toggle uses the active skin's accent, so the mark re-tints with every skin.
// Geometry lives in a 48x48 grid; keep it in sync with src/app/icon.svg.
export function Logo({ className = "size-7", title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <rect x="12" y="17" width="24" height="14" rx="7" fill="var(--accent)" opacity=".4" />
      <rect x="4" y="5" width="10" height="38" rx="5" fill="currentColor" />
      <rect x="34" y="5" width="10" height="38" rx="5" fill="currentColor" />
      <circle cx="28" cy="24" r="5.5" fill="var(--accent)" />
    </svg>
  );
}
