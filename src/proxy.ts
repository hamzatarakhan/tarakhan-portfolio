import { NextResponse, type NextRequest } from "next/server";

// Sends locale-less URLs to /en or /ar: the visitor's saved choice, otherwise English.
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (/^\/(en|ar)(\/|$)/.test(pathname)) {
    const h = new Headers(req.headers);
    h.set("x-pathname", pathname); // lets the 404 page know the locale
    return NextResponse.next({ request: { headers: h } });
  }
  const saved = req.cookies.get("lang")?.value;
  const lang = saved === "ar" ? "ar" : "en";
  const url = req.nextUrl.clone();
  url.pathname = `/${lang}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = { matcher: ["/((?!_next|api|.*\\..*).*)"] };
