// Testimonial cards in the portrait style: full-bleed photo, play button for video, name and role over a brand gradient.
// Only real testimonials (given with permission) go in `items`. Until there are any, the same cards show an honest
// invitation instead of invented quotes.
import { Icon } from "./Mock";

export type Testimonial = {
  quote: string;
  name: string;
  role: string; // e.g. "Product Owner · Leading Point Software"
  location?: string;
  photo?: string; // /testimonials/name.webp
  video?: string; // link to the video testimonial
  sample?: boolean; // placeholder for design preview only; never shown in production
};

type Invite = { title: string; body: string; cta: string; soon: string; mailto: string };

const card = "reveal relative aspect-[4/5] overflow-hidden !rounded-[1.75rem]";

function Shade() {
  return <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[color-mix(in_srgb,var(--accent)_70%,var(--bg))]" />;
}

function Play({ href, label }: { href?: string; label: string }) {
  const cls = "absolute start-1/2 top-[60%] grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-md transition-transform duration-[var(--dur-base)] hover:scale-110 rtl:translate-x-1/2";
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={cls}>
      <Icon name="play" className="size-5 translate-x-0.5" />
    </a>
  ) : (
    <span aria-hidden className={cls}>
      <Icon name="play" className="size-5 translate-x-0.5" />
    </span>
  );
}

export function Testimonials({ items, invite, badge }: { items: Testimonial[]; invite: Invite; badge?: string }) {
  if (items.length) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((q, i) => (
          <figure key={q.name} className={`glass ${card}`} style={{ "--i": i } as React.CSSProperties}>
            {q.photo && (
              // eslint-disable-next-line @next/next/no-img-element -- client-supplied portrait
              <img src={q.photo} alt="" className="absolute inset-0 h-full w-full object-cover object-top" />
            )}
            <Shade />
            {(q.video || q.sample) && <Play href={q.video} label={`${q.name}: video`} />}
            {q.sample && (
              <span className="label absolute start-4 top-4 rounded-full border border-white/30 bg-black/40 px-3 py-1.5 text-white backdrop-blur">{badge}</span>
            )}
            <figcaption className="absolute inset-x-0 bottom-0 p-5 text-white">
              <blockquote className="line-clamp-3 text-sm opacity-90">“{q.quote}”</blockquote>
              <p className="display mt-3 text-lg font-medium">{q.name}</p>
              <p className="text-sm opacity-80">{q.role}</p>
              {q.location && <p className="text-sm opacity-70">{q.location}</p>}
            </figcaption>
          </figure>
        ))}
      </div>
    );
  }

  // Invitation state: same card frame and rhythm, no invented people or quotes.
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[0, 1, 2].map((i) => (
        <figure
          key={i}
          className={`glass ${card} ${i === 1 ? "" : "hidden lg:block"}`}
          style={{ "--i": i } as React.CSSProperties}
        >
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-accent/25 via-accent-soft to-surface" />
          <Icon name="user" className="absolute start-1/2 top-[38%] size-40 -translate-x-1/2 -translate-y-1/2 text-fg/10 rtl:translate-x-1/2" />
          <Shade />
          <Play label={invite.soon} />
          <figcaption className="absolute inset-x-0 bottom-0 p-5 text-white">
            {i === 1 ? (
              <>
                <p className="display text-xl font-medium">{invite.title}</p>
                <p className="mt-1 text-sm opacity-85">{invite.body}</p>
                <a href={invite.mailto} className="mt-4 inline-flex min-h-11 items-center rounded-full bg-white px-5 text-sm font-medium text-[#15122b] transition-transform active:scale-[0.97]">
                  {invite.cta}
                </a>
              </>
            ) : (
              <>
                <p className="label opacity-80">{invite.soon}</p>
                <div aria-hidden className="mt-3 h-3 w-1/2 rounded-full bg-white/35" />
                <div aria-hidden className="mt-2 h-2.5 w-2/3 rounded-full bg-white/20" />
              </>
            )}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
