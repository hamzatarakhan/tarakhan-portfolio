import { NextResponse, type NextRequest } from "next/server";

// Sends locale-less URLs to /en (or /ar when the language switcher is on and Arabic was chosen).
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (/^\/(en|ar)(\/|$)/.test(pathname)) {
    const h = new Headers(req.headers);
    h.set("x-pathname", pathname); // lets the 404 page know the locale
    return NextResponse.next({ request: { headers: h } });
  }
  // Language switcher hidden for now (SWITCHERS in src/lib/ui.ts): always English, old saved choices ignored.
  // To restore: const lang = req.cookies.get("lang")?.value === "ar" ? "ar" : "en";
  const lang = "en";
  const url = req.nextUrl.clone();
  url.pathname = `/${lang}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = { matcher: ["/((?!_next|api|.*\\..*).*)"] };
