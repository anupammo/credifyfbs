import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/auth/password";
import { signAccessToken, createRefreshToken } from "@/lib/auth/jwt";
import { authLimiter } from "@/lib/rateLimit";
import { auditLog } from "@/lib/audit";
import { slugify } from "@/lib/auth/validation";
import { getProviderConfig, isProviderConfigured, type OAuthProviderConfig } from "@/lib/auth/oauth";

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

function appUrl(): string {
  return process.env.APP_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
}

interface CookiePayload {
  state: string;
  verifier: string;
  provider: string;
}

function unpackCookie(value: string): CookiePayload | null {
  try {
    const outer = JSON.parse(Buffer.from(value, "base64url").toString("utf8")) as {
      d: CookiePayload;
      s?: string;
    };
    const secret = process.env.HMAC_SECRET;
    if (secret) {
      const expected = crypto.createHmac("sha256", secret).update(JSON.stringify(outer.d)).digest("hex");
      if (!outer.s || !crypto.timingSafeEqual(Buffer.from(outer.s), Buffer.from(expected))) {
        return null;
      }
    }
    return outer.d;
  } catch {
    return null;
  }
}

function htmlResponse(body: string): NextResponse {
  return new NextResponse(body, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8", ...corsHeaders },
  });
}

function clearCookie(res: NextResponse): NextResponse {
  res.cookies.set(OAUTH_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}

function errorPage(message: string): NextResponse {
  const safe = JSON.stringify({ __credifyOAuth: { error: message } });
  const page = `<!doctype html><html><head><meta charset="utf-8"><title>Sign-in failed</title></head>
<body><script>
try { if (window.opener) { window.opener.postMessage(${safe}, "*"); } } catch (e) {}
try { window.close(); } catch (e) {}
document.body.innerText = ${JSON.stringify(message)};
</script><p>${message}</p></body></html>`;
  return clearCookie(htmlResponse(page));
}

function successPage(result: { accessToken: string; refreshToken: string; user: unknown }): NextResponse {
  const payload = JSON.stringify({ __credifyOAuth: result });
  const fallbackUrl = `${appUrl()}/?access=${encodeURIComponent(result.accessToken)}&refresh=${encodeURIComponent(result.refreshToken)}`;
  const page = `<!doctype html><html><head><meta charset="utf-8"><title>Signed in</title></head>
<body><script>
(function () {
  var msg = ${payload};
  try {
    if (window.opener) {
      window.opener.postMessage(msg, "*");
      window.close();
      return;
    }
  } catch (e) {}
  window.location.replace(${JSON.stringify(fallbackUrl)});
})();
</script><p>Signed in. You can close this window.</p></body></html>`;
  return clearCookie(htmlResponse(page));
}

async function exchangeCode(config: OAuthProviderConfig, code: string, verifier: string): Promise<string> {
  const params = new URLSearchParams({
    client_id: config.clientId!,
    client_secret: config.clientSecret!,
    code,
    code_verifier: verifier,
    grant_type: "authorization_code",
    redirect_uri: config.redirectUri!,
  });
  const res = await fetch(config.tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
    body: params.toString(),
  });
  if (!res.ok) {
    throw new Error(`token exchange failed (${res.status})`);
  }
  const json = (await res.json()) as { access_token?: string };
  if (!json.access_token) {
    throw new Error("no access_token in token response");
  }
  return json.access_token;
}

async function fetchUserInfo(
  config: OAuthProviderConfig,
  accessToken: string
): Promise<{ email: string; name: string }> {
  const res = await fetch(config.userinfoUrl, {
    headers: { Authorization: `Bearer ${accessToken}`, Accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(`userinfo failed (${res.status})`);
  }
  const data = (await res.json()) as Record<string, unknown>;

  if (config.provider === "google") {
    const email = typeof data.email === "string" ? data.email : "";
    const name = typeof data.name === "string" ? data.name : email;
    return { email, name };
  }

  // Microsoft Graph /me
  const mail = typeof data.mail === "string" ? data.mail : "";
  const upn = typeof data.userPrincipalName === "string" ? data.userPrincipalName : "";
  const email = mail || upn;
  const name = typeof data.displayName === "string" ? data.displayName : email;
  return { email, name };
}

export async function GET(req: NextRequest, ctx: Ctx) {
  const limited = authLimiter(req);
  if (limited) return limited;

  const { provider } = await ctx.params;
  const config = getProviderConfig(provider);
  if (!config || !isProviderConfigured(config)) {
    return errorPage("provider_unconfigured");
  }

  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const providerError = url.searchParams.get("error");

  if (providerError) {
    return errorPage(providerError);
  }
  if (!code || !state) {
    return errorPage("missing_code_or_state");
  }

  const cookieValue = req.cookies.get(OAUTH_COOKIE)?.value;
  const cookie = cookieValue ? unpackCookie(cookieValue) : null;
  if (!cookie || cookie.provider !== config.provider || cookie.state !== state) {
    return errorPage("invalid_state");
  }

  try {
    const providerAccessToken = await exchangeCode(config, code, cookie.verifier);
    const info = await fetchUserInfo(config, providerAccessToken);
    const email = info.email.toLowerCase();
    if (!email) {
      return errorPage("no_email_from_provider");
    }

    let user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, name: true, role: true, organizationId: true, deletedAt: true },
    });

    if (user && user.deletedAt) {
      return errorPage("account_disabled");
    }

    if (!user) {
      const domain = email.split("@")[1] ?? "organization";
      const orgName = domain;
      const slug = `${slugify(domain) || "org"}-${crypto.randomBytes(3).toString("hex")}`;
      const unusable = await hashPassword(crypto.randomBytes(32).toString("hex"));

      user = await prisma.$transaction(async (tx) => {
        const org = await tx.organization.create({ data: { name: orgName, slug } });
        return tx.user.create({
          data: {
            email,
            name: info.name || email,
            passwordHash: unusable,
            role: "ADMIN",
            source: config.provider,
            organizationId: org.id,
          },
          select: { id: true, email: true, name: true, role: true, organizationId: true, deletedAt: true },
        });
      });

      await auditLog(user.id, "auth.oauth.signup", user.id, { email, provider: config.provider });
    } else {
      await auditLog(user.id, "auth.oauth.login", user.id, { email, provider: config.provider });
    }

    const accessToken = signAccessToken({
      sub: user.id,
      email: user.email,
      role: user.role,
      orgId: user.organizationId,
    });
    const refreshToken = await createRefreshToken(user.id);

    return successPage({
      accessToken,
      refreshToken,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    });
  } catch (err) {
    console.error("[auth.oauth.callback] error:", err);
    return errorPage("oauth_failed");
  }
}
