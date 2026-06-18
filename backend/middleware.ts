import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Central CORS for all /api routes.
 *
 * Credentialed cross-origin requests (the forms.credifyfast.com web app sending
 * the shared `.credifyfast.com` SSO cookie) require a SPECIFIC reflected origin
 * plus `Access-Control-Allow-Credentials: true` — the wildcard `*` is rejected by
 * browsers when credentials are included. We reflect allowlisted origins and fall
 * back to `*` (no credentials) for everything else. Done here (not in
 * next.config static headers) because the value must vary per request origin, and
 * preflight must be answered regardless of which methods a route exports.
 */

const STATIC_ALLOWED = [
  "https://forms.credifyfast.com",
  "https://chrome.credifyfast.com",
  "https://login.credifyfast.com",
];

function isAllowed(origin: string): boolean {
  if (!origin) return false;
  if (STATIC_ALLOWED.includes(origin)) return true;
  if (/^https?:\/\/localhost(:\d+)?$/.test(origin)) return true;
  if (/^https?:\/\/127\.0\.0\.1(:\d+)?$/.test(origin)) return true;
  const extra = (process.env.SSO_ALLOWED_ORIGINS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return extra.includes(origin);
}

function corsHeaders(origin: string): Headers {
  const h = new Headers();
  h.set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  h.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Credify-Signature");
  h.set("Access-Control-Max-Age", "86400");
  if (isAllowed(origin)) {
    h.set("Access-Control-Allow-Origin", origin);
    h.set("Access-Control-Allow-Credentials", "true");
    h.set("Vary", "Origin");
  } else {
    h.set("Access-Control-Allow-Origin", "*");
  }
  return h;
}

export function middleware(req: NextRequest) {
  const origin = req.headers.get("origin") || "";

  // Preflight — answer here so it works regardless of route method exports.
  if (req.method === "OPTIONS") {
    return new NextResponse(null, { status: 204, headers: corsHeaders(origin) });
  }

  const res = NextResponse.next();
  corsHeaders(origin).forEach((value, key) => res.headers.set(key, value));
  return res;
}

export const config = { matcher: "/api/:path*" };
