// Minimal mail abstraction with no extra npm dependencies (global fetch only).
//
// Sending strategy (first available wins):
//   1. RESEND_API_KEY  → POST https://api.resend.com/emails
//   2. SMTP_URL / SMTP creds present → (delegated; logged — wire an SMTP
//      transport here if/when a dependency is added)
//   3. Dev fallback → console.log the email and resolve.

export interface MailMessage {
  to: string;
  subject: string;
  html: string;
  text: string;
}

const MAIL_FROM = process.env.MAIL_FROM ?? "Credify <no-reply@credifyfast.com>";

export async function sendMail({ to, subject, html, text }: MailMessage): Promise<void> {
  const resendKey = process.env.RESEND_API_KEY;

  if (resendKey) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from: MAIL_FROM, to, subject, html, text }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      throw new Error(`Resend send failed (${res.status}): ${detail}`);
    }
    return;
  }

  if (process.env.SMTP_URL) {
    // No SMTP client dependency is bundled; log so dev/staging still surfaces
    // the message. Replace with a real transport when a dependency is allowed.
    console.log("[mail:smtp] SMTP_URL is set but no transport is bundled. Email:", {
      from: MAIL_FROM,
      to,
      subject,
      text,
    });
    return;
  }

  // Dev fallback.
  console.log("[mail:dev] (no mailer configured) Would send email:", {
    from: MAIL_FROM,
    to,
    subject,
    text,
  });
}

export function passwordResetEmail(link: string): { subject: string; html: string; text: string } {
  const subject = "Reset your Credify password";
  const text = [
    "We received a request to reset your Credify password.",
    "",
    `Reset your password using this link (valid for 30 minutes):`,
    link,
    "",
    "If you did not request this, you can safely ignore this email.",
  ].join("\n");
  const html = `
    <div style="font-family: -apple-system, Segoe UI, Roboto, sans-serif; max-width: 480px; margin: 0 auto; color: #1a1a1a;">
      <h2 style="margin: 0 0 16px;">Reset your password</h2>
      <p>We received a request to reset your Credify password.</p>
      <p style="margin: 24px 0;">
        <a href="${link}" style="background: #2563eb; color: #fff; padding: 12px 20px; border-radius: 8px; text-decoration: none; display: inline-block;">Reset password</a>
      </p>
      <p style="font-size: 13px; color: #555;">This link is valid for 30 minutes. If you did not request a reset, you can safely ignore this email.</p>
      <p style="font-size: 12px; color: #999; word-break: break-all;">${link}</p>
    </div>
  `.trim();
  return { subject, html, text };
}
