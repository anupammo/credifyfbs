// Submission notifications — server-side, PHI-safe.
//
// Called AFTER a submission commits. Fire-and-forget: it must never throw into
// the submit response, and mail failure must never fail the submission.
//
// v1 recipients: the form OWNER + all active ADMINs in the org (team only).
// Per-form configurable recipients (authored in the builder's "Notify on
// submission" panel and stored in the encrypted schema) is the next layer.

import { prisma } from "@/lib/db";
import { sendEmail, mailConfigured } from "@/lib/mail/mailer";

const APP_BASE_URL = process.env.APP_BASE_URL || "https://forms.credifyfast.com";

type FormRef = { id: string; title: string; ownerId: string; organizationId: string };

function escapeHtml(s: string): string {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));
}

// PHI-SAFE: no answers, ever. Just a heads-up + a secure link into the SSO-gated
// app where the response can be viewed by an authorized user.
function buildMessage(formTitle: string, when: Date) {
  const link = APP_BASE_URL.replace(/\/+$/, "") + "/";
  const stamp = when.toISOString();
  const subject = `New response: ${formTitle}`;
  const text =
    `A new response to "${formTitle}" was submitted at ${stamp}.\n\n` +
    `View it in Credify: ${link}\n\n` +
    `This message contains no patient data.`;
  const html =
    `<p>A new response to <strong>${escapeHtml(formTitle)}</strong> was submitted at ${escapeHtml(stamp)}.</p>` +
    `<p><a href="${escapeHtml(link)}">View it in Credify</a></p>` +
    `<p style="color:#6b7280;font-size:12px">This message contains no patient data.</p>`;
  return { subject, text, html };
}

async function resolveTeamRecipients(form: FormRef): Promise<string[]> {
  const users = await prisma.user.findMany({
    where: {
      organizationId: form.organizationId,
      active: true,
      deletedAt: null,
      OR: [{ id: form.ownerId }, { role: "ADMIN" }],
    },
    select: { email: true },
  });
  const seen = new Set<string>();
  const out: string[] = [];
  for (const u of users) {
    const e = (u.email || "").trim();
    if (e && !seen.has(e.toLowerCase())) { seen.add(e.toLowerCase()); out.push(e); }
  }
  return out;
}

export async function notifyOnSubmission(form: FormRef, submissionId: string): Promise<void> {
  try {
    if (!mailConfigured()) return; // inert until MAIL_* is configured
    const recipients = await resolveTeamRecipients(form);
    if (!recipients.length) return;
    const msg = buildMessage(form.title, new Date());
    for (const to of recipients) {
      const result = await sendEmail({ to, subject: msg.subject, html: msg.html, text: msg.text });
      await prisma.notificationLog.create({
        data: {
          submissionId,
          formId: form.id,
          organizationId: form.organizationId,
          channel: "email",
          recipient: to,
          status: result.ok ? "sent" : result.skipped ? "skipped" : "failed",
          error: result.error || null,
        },
      }).catch((e: unknown) => console.error("[notify] log write failed:", (e as Error).message));
    }
  } catch (e) {
    console.error("[notify] onSubmission failed:", (e as Error).message);
  }
}
