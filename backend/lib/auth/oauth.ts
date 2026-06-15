import crypto from "crypto";

// OAuth 2.0 (authorization-code + PKCE) provider configuration and helpers.

export type OAuthProvider = "google" | "microsoft";

export interface OAuthProviderConfig {
  provider: OAuthProvider;
  authorizeUrl: string;
  tokenUrl: string;
  userinfoUrl: string;
  scopes: string;
  clientId: string | undefined;
  clientSecret: string | undefined;
  redirectUri: string | undefined;
}

const MICROSOFT_TENANT = "common";

export function getProviderConfig(provider: string): OAuthProviderConfig | null {
  switch (provider) {
    case "google":
      return {
        provider: "google",
        authorizeUrl: "https://accounts.google.com/o/oauth2/v2/auth",
        tokenUrl: "https://oauth2.googleapis.com/token",
        userinfoUrl: "https://www.googleapis.com/oauth2/v3/userinfo",
        scopes: "openid email profile",
        clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
        clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        redirectUri: process.env.GOOGLE_OAUTH_REDIRECT_URI,
      };
    case "microsoft":
      return {
        provider: "microsoft",
        authorizeUrl: `https://login.microsoftonline.com/${MICROSOFT_TENANT}/oauth2/v2.0/authorize`,
        tokenUrl: `https://login.microsoftonline.com/${MICROSOFT_TENANT}/oauth2/v2.0/token`,
        userinfoUrl: "https://graph.microsoft.com/v1.0/me",
        scopes: "openid email profile User.Read",
        clientId: process.env.MICROSOFT_OAUTH_CLIENT_ID,
        clientSecret: process.env.MICROSOFT_OAUTH_CLIENT_SECRET,
        redirectUri: process.env.MICROSOFT_OAUTH_REDIRECT_URI,
      };
    default:
      return null;
  }
}

export function isProviderConfigured(config: OAuthProviderConfig): boolean {
  return Boolean(config.clientId && config.clientSecret && config.redirectUri);
}

function base64url(buf: Buffer): string {
  return buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

// PKCE: high-entropy code verifier.
export function generateVerifier(): string {
  return base64url(crypto.randomBytes(32));
}

// PKCE S256: code_challenge = base64url(sha256(verifier)).
export function challengeFromVerifier(verifier: string): string {
  return base64url(crypto.createHash("sha256").update(verifier).digest());
}

export function randomState(): string {
  return base64url(crypto.randomBytes(16));
}
