import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Extract country from Vercel's geo object, or standard edge headers
  let country =
    req.geo?.country ||
    req.headers.get("x-vercel-ip-country") ||
    req.headers.get("cf-ipcountry");

  // Allow local development testing via query parameter (e.g., ?simulate_country=KE)
  const simulateCountry = req.nextUrl.searchParams.get("simulate_country");
  if (simulateCountry) {
    country = simulateCountry.toUpperCase();
  }

  // If we couldn't determine the country, default to International (US)
  if (!country) {
    country = "US";
  }

  const isLocal = country === "KE";
  const newRegion = isLocal ? "LOCAL" : "INTL";

  const currentRegionCookie = req.cookies.get("user_region")?.value;

  // Create response
  const response = NextResponse.next();

  // If the cookie isn't set or needs to be updated, set it
  if (currentRegionCookie !== newRegion) {
    response.cookies.set("user_region", newRegion, {
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
  }

  return response;
}

// Only run middleware on pages, not on static files, images, or API routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
