import { useEffect, useLayoutEffect } from "react";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import { dirOf, getDict, isLocale } from "@/lib/i18n";
import { setMeta } from "@/lib/meta";
import { FxProvider } from "./FxProvider";

// Shell for every /en/* and /ar/* page (what app/[lang]/layout.tsx did in the Next.js build):
// sets <html lang/dir>, default title + description, the global effects, and scroll behaviour.
export function Layout() {
  const { lang = "" } = useParams();
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (!isLocale(lang)) return;
    const d = document.documentElement;
    d.lang = lang;
    d.dir = dirOf(lang);
  }, [lang]);

  // Layout effect: runs before the pages' own effects, so a page can still set its own title.
  useLayoutEffect(() => {
    if (!isLocale(lang)) return;
    const m = getDict(lang).meta;
    setMeta(m.title, m.description);
  }, [lang, pathname]);

  // Like Next's router: new page → top; a #hash → scroll that section into view once it renders.
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    const id = decodeURIComponent(hash.slice(1));
    let tries = 0;
    const find = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView();
      else if (tries++ < 20) requestAnimationFrame(find);
    };
    find();
  }, [pathname, hash]);

  // Old locale-less links (/about) used to be redirected by the Next.js proxy: send them to English.
  if (!isLocale(lang)) return <Navigate to={`/en${pathname}${hash}`} replace />;

  return (
    <>
      <FxProvider />
      <Outlet />
    </>
  );
}
