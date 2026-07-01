// Provider-agnostic transactional email.
//
// The provider is chosen by env (MAIL_PROVIDER); today only "resend" is wired,
// via plain fetch so no SDK dependency is added. To change providers, add a
// branch in sendEmail() — every caller stays the same.
//
// SAFE BY DEFAULT: when MAIL_PROVIDER / MAIL_API_KEY are unset, sendEmail() is a
// logged no-op. Nothing sends (and nothing breaks) until the key + verified
// domain (SPF/DKIM/DMARC) are in place.

export type MailMessage = { to: string; subject: string; html: string; text: string };
export type MailResult = { ok: boolean; skipped?: boolean; error?: string };

const PROVIDER = process.env.MAIL_PROVIDER || "";
const API_KEY = process.env.MAIL_API_KEY || "";
const FROM = process.env.MAIL_FROM || "Credify <notifications@credifyfast.com>";
const REPLY_TO = process.env.MAIL_REPLY_TO || "support@credifyfast.com";

export function mailConfigured(): boolean {
  return !!(PROVIDER && API_KEY);
}

export async function sendEmail(msg: MailMessage): Promise<MailResult> {
  if (!mailConfigured()) {
    console.warn("[mail] not configured (MAIL_PROVIDER/MAIL_API_KEY) — skipping send to", msg.to);
    return { ok: false, skipped: true, error: "mail_not_configured" };
  }
  try {
    if (PROVIDER === "resend") return await sendViaResend(msg);
    return { ok: false, error: "unknown_provider:" + PROVIDER };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

async function sendViaResend(msg: MailMessage): Promise<MailResult> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [msg.to],
      reply_to: REPLY_TO,
      subject: msg.subject,
      html: msg.html,
      text: msg.text,
    }),
  });
  if (!res.ok) {
    const t = await res.text().catch(() => "");
    return { ok: false, error: `resend_${res.status}:${t.slice(0, 200)}` };
  }
  return { ok: true };
}
