import { NextResponse, type NextRequest } from "next/server";

// Sends locale-less URLs to /en or /ar: saved choice first, then browser language.
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (/^\/(en|ar)(\/|$)/.test(pathname)) return;
  const saved = req.cookies.get("lang")?.value;
  const accept = req.headers.get("accept-language") ?? "";
  const lang = saved === "ar" || saved === "en" ? saved : /^\s*ar/i.test(accept) ? "ar" : "en";
  const url = req.nextUrl.clone();
  url.pathname = `/${lang}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = { matcher: ["/((?!_next|api|.*\\..*).*)"] };
