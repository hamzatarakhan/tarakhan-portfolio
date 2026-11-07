// {{TODO: …}} placeholders render as a visible marker so nothing unfinished looks final.
export function Txt({ children }: { children: string }) {
  return (
    <>
      {children.split(/(\{\{TODO[^}]*\}\})/).map((s, i) =>
        s.startsWith("{{") ? (
          <mark key={i} className="rounded-sm bg-accent-soft px-1 font-mono text-[0.85em] text-accent">{s.slice(2, -2)}</mark>
        ) : (
          s
        ),
      )}
    </>
  );
}
