import { Link } from "react-router-dom";
import { getDict, useLang } from "@/lib/i18n";
import { wrap } from "@/components/Chrome";

// Rendered inside the [lang] layout, so theme, skin and direction already apply.
export default function NotFound() {
  const lang = useLang();
  const t = getDict(lang).notFound;
  return (
    <main className={`${wrap} grid min-h-dvh place-items-center text-center`}>
      <div className="glass rise !rounded-[2rem] px-8 py-14 sm:px-16">
        <p className="display shine text-8xl font-semibold sm:text-9xl" aria-hidden>404</p>
        <h1 className="display mt-4 text-3xl font-medium sm:text-4xl">{t.title}</h1>
        <p className="mt-3 text-muted">{t.body}</p>
        <Link to={`/${lang}`} className="mt-8 inline-flex min-h-12 items-center rounded-full bg-accent px-7 font-medium text-on-accent shadow-[0_10px_40px_-10px_var(--accent)] transition-transform active:scale-[0.97]">{t.home}</Link>
      </div>
    </main>
  );
}
