import { NextResponse, type NextRequest } from "next/server";
import { REGION_STORAGE_KEY as REGION_COOKIE } from "@/lib/region";

const ONE_YEAR = 60 * 60 * 24 * 365;

/**
 * Resolves a first-time visitor's region from Vercel's IP geolocation
 * header instead of showing a manual "pick your region" prompt. Pakistan
 * gets the Pakistan site; everywhere else defaults to the UK site. Once
 * set, the cookie is left alone so a manual switch (or this same guess)
 * sticks across visits.
 */
export function proxy(request: NextRequest) {
  if (request.cookies.get(REGION_COOKIE)?.value) {
    return NextResponse.next();
  }

  const country = request.headers.get("x-vercel-ip-country");
  const region = country === "PK" ? "pk" : "uk";

  // Mutate the Cookie header directly (rather than request.cookies.set)
  // so the new value is visible to cookies() in the Server Component
  // render for this same request, not just on the next one.
  const requestHeaders = new Headers(request.headers);
  const existingCookieHeader = requestHeaders.get("cookie") ?? "";
  requestHeaders.set(
    "cookie",
    existingCookieHeader ? `${existingCookieHeader}; ${REGION_COOKIE}=${region}` : `${REGION_COOKIE}=${region}`
  );

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.cookies.set(REGION_COOKIE, region, {
    maxAge: ONE_YEAR,
    path: "/",
  });
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)"],
};
