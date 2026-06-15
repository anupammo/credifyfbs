import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { authLimiter } from "@/lib/rateLimit";
import {
  getProviderConfig,
  isProviderConfigured,
  generateVerifier,
  challengeFromVerifier,
  randomState,
} from "@/lib/auth/oauth";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Credify-Signature",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

type Ctx = { params: Promise<Record<string, string>> };

const OAUTH_COOKIE = "credify_oauth";
const COOKIE_MAX_AGE = 10 * 60; // 10 minutes

function appUrl(): string {
  return process.env.APP_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
}

// Optionally HMAC-sign the cookie payload so the callback can detect tampering.
function packCookie(payload: object): string {
  const json = JSON.stringify(payload);
  const secret = process.env.HMAC_SECRET;
  if (secret) {
    const sig = crypto.createHmac("sha256", secret).update(json).digest("hex");
    return Buffer.from(JSON.stringify({ d: payload, s: sig })).toString("base64url");
  }
  return Buffer.from(JSON.stringify({ d: payload })).toString("base64url");
}

export async function GET(req: NextRequest, ctx: Ctx) {
  const limited = authLimiter(req);
  if (limited) return limited;

  const { provider } = await ctx.params;
  const config = getProviderConfig(provider);
  if (!config) {
    return NextResponse.redirect(`${appUrl()}/?oauth_error=invalid_provider`);
  }
  if (!isProviderConfigured(config)) {
    return NextResponse.redirect(`${appUrl()}/?oauth_error=provider_unconfigured`);
  }

  const state = randomState();
  const verifier = generateVerifier();
  const challenge = challengeFromVerifier(verifier);

  const authorize = new URL(config.authorizeUrl);
  authorize.searchParams.set("client_id", config.clientId!);
  authorize.searchParams.set("redirect_uri", config.redirectUri!);
  authorize.searchParams.set("response_type", "code");
  authorize.searchParams.set("scope", config.scopes);
  authorize.searchParams.set("state", state);
  authorize.searchParams.set("code_challenge", challenge);
  authorize.searchParams.set("code_challenge_method", "S256");

  const res = NextResponse.redirect(authorize.toString());
  res.cookies.set(OAUTH_COOKIE, packCookie({ state, verifier, provider: config.provider }), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
  return res;
}
