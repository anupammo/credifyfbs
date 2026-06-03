import { NextRequest, NextResponse } from "next/server";

// Simple in-process sliding-window rate limiter (suitable for single-instance dev/staging).
// In production behind Cloud Run, replace with a Redis-backed solution.

interface Window {
  count: number;
  start: number;
}

const store = new Map<string, Window>();

export function rateLimit(maxRequests: number, windowMs: number) {
  return function check(req: NextRequest): NextResponse | null {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
    const now = Date.now();
    const win = store.get(ip);

    if (!win || now - win.start > windowMs) {
      store.set(ip, { count: 1, start: now });
      return null;
    }

    win.count += 1;
    if (win.count > maxRequests) {
      return NextResponse.json(
        { error: "Too many requests", code: "RATE_LIMIT" },
        { status: 429, headers: { "Retry-After": String(Math.ceil((win.start + windowMs - now) / 1000)) } }
      );
    }

    return null;
  };
}

// Pre-configured limiters
export const authLimiter = rateLimit(100, 60_000);   // 100 req/min
export const dataLimiter = rateLimit(500, 60_000);   // 500 req/min
