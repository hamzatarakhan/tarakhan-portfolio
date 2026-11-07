// Placeholder "screens" built from tokens, so they re-tint with the skin. Swap for real screenshots later.
const bar = "rounded-full bg-fg/15";
const acc = "rounded-full bg-accent";

export function Mock({ v, className = "" }: { v: number; className?: string }) {
  const body = [
    // dashboard
    <div key="0" className="flex h-full flex-col gap-2">
      <div className="flex items-center justify-between"><div className={`h-2 w-1/4 ${bar}`} /><div className={`size-4 ${acc}`} /></div>
      <div className={`h-6 w-1/3 ${acc}`} />
      <div className="mt-auto flex h-16 items-end gap-1.5">
        {[40, 65, 50, 85, 60, 95, 70].map((h, i) => <div key={i} className="flex-1 rounded-sm bg-accent/70" style={{ height: `${h}%`, opacity: 0.4 + i * 0.08 }} />)}
      </div>
    </div>,
    // list
    <div key="1" className="flex h-full gap-3">
      <div className="w-1/5 space-y-2"><div className={`h-2 ${acc}`} /><div className={`h-2 ${bar}`} /><div className={`h-2 ${bar}`} /><div className={`h-2 ${bar}`} /></div>
      <div className="flex-1 space-y-2.5">{[0, 1, 2, 3].map((i) => <div key={i} className="flex items-center gap-2"><div className={`size-4 ${i === 0 ? acc : bar}`} /><div className={`h-2 flex-1 ${bar}`} /><div className={`h-2 w-6 ${bar}`} /></div>)}</div>
    </div>,
    // mobile-ish
    <div key="2" className="grid h-full grid-cols-[1fr_auto] items-center gap-4">
      <div className="space-y-2.5"><div className={`h-3 w-3/4 ${acc}`} /><div className={`h-2 ${bar}`} /><div className={`h-2 w-5/6 ${bar}`} /><div className="mt-3 h-7 w-24 rounded-md bg-accent" /></div>
      <div className="grid size-20 place-items-center rounded-full border-4 border-accent/60"><div className="size-8 rounded-full bg-accent/50" /></div>
    </div>,
    // landing
    <div key="3" className="flex h-full flex-col gap-2">
      <div className="h-1/2 rounded-md bg-gradient-to-br from-accent/60 to-accent/10" />
      <div className="grid flex-1 grid-cols-3 gap-2">{[0, 1, 2].map((i) => <div key={i} className="rounded-md bg-fg/10" />)}</div>
    </div>,
    // table
    <div key="4" className="flex h-full flex-col gap-2">
      <div className={`h-2.5 w-1/3 ${acc}`} />
      {[0, 1, 2, 3, 4].map((i) => <div key={i} className="flex gap-2"><div className={`h-2 w-1/4 ${bar}`} /><div className={`h-2 flex-1 ${bar}`} /><div className={`h-2 w-8 ${i % 2 ? bar : acc}`} /></div>)}
    </div>,
  ];
  return <div className={`glass !rounded-xl p-4 ${className}`} aria-hidden>{body[v % body.length]}</div>;
}

const paths: Record<string, string> = {
  search: "M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm10 2-4.3-4.3",
  target: "M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18Zm0-5a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z",
  pen: "M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z",
  flask: "M9 3h6M10 3v6L4 19a2 2 0 0 0 1.7 3h12.6A2 2 0 0 0 20 19l-6-10V3",
  code: "m16 18 6-6-6-6M8 6l-6 6 6 6",
  arrow: "M7 17 17 7M8 7h9v9",
  rocket: "M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2.1-.1-2.9a2.1 2.1 0 0 0-2.9-.1ZM12 15l-3-3a22 22 0 0 1 2-3.9A12.9 12.9 0 0 1 22 2c0 2.7-.8 7.5-6 11a22.4 22.4 0 0 1-4 2ZM9 12H4s.6-3 2-4c1.6-1.1 5 0 5 0M12 15v5s3-.6 4-2c1.1-1.6 0-5 0-5",
  sparkle: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3ZM19 16l.7 1.8 1.8.7-1.8.7L19 21l-.7-1.8-1.8-.7 1.8-.7L19 16Z",
  layers: "M12 2 2 7l10 5 10-5-10-5ZM2 17l10 5 10-5M2 12l10 5 10-5",
  cursor: "M4 4l7 17 2.5-7.5L21 11 4 4ZM13.5 13.5 19 19",
  chat: "M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12ZM8.5 12h.01M12 12h.01M15.5 12h.01",
  globe: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM2 12h20M12 2a15.3 15.3 0 0 1 0 20 15.3 15.3 0 0 1 0-20Z",
};
export function Icon({ name, className = "size-6" }: { name: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d={paths[name]} />
    </svg>
  );
}
