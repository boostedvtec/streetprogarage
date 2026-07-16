import nodemailer from "nodemailer";

export function isEmailConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

function humanizeLabel(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (c) => c.toUpperCase())
    .trim();
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Turns a form submission object into readable "Label: value" lines — used as the plain-text fallback. */
export function formatSubmission(body: Record<string, unknown>): string {
  return Object.entries(body)
    .map(([key, value]) => `${humanizeLabel(key)}: ${formatValue(value)}`)
    .join("\n");
}

function formatValue(value: unknown): string {
  if (Array.isArray(value)) return value.length ? value.join(", ") : "—";
  if (value && typeof value === "object") return JSON.stringify(value, null, 2);
  return value === undefined || value === null || value === "" ? "—" : String(value);
}

/** Renders a branded HTML table version of a form submission for the notification email. */
export function renderSubmissionEmail(title: string, body: Record<string, unknown>): string {
  const rows = Object.entries(body)
    .map(([key, value], i) => {
      const rawValue = formatValue(value);
      const displayValue =
        value && typeof value === "object" && !Array.isArray(value)
          ? `<pre style="margin:0;white-space:pre-wrap;font-family:inherit;font-size:13px;">${escapeHtml(rawValue)}</pre>`
          : escapeHtml(rawValue);
      return `
        <tr style="background:${i % 2 === 0 ? "#ffffff" : "#f7f7f7"};">
          <td style="padding:10px 16px;border-bottom:1px solid #e5e5e5;font-weight:600;color:#111111;vertical-align:top;width:180px;font-size:14px;">${escapeHtml(humanizeLabel(key))}</td>
          <td style="padding:10px 16px;border-bottom:1px solid #e5e5e5;color:#333333;font-size:14px;">${displayValue}</td>
        </tr>`;
    })
    .join("");

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e5e5e5;max-width:600px;">
            <tr>
              <td style="background:#262626;padding:20px 24px;">
                <span style="color:#ffffff;font-size:18px;font-weight:700;letter-spacing:0.5px;">STREET <span style="color:#cf5f1c;">PRO</span> GARAGE</span>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 24px 8px;">
                <h1 style="margin:0;font-size:20px;color:#111111;">${escapeHtml(title)}</h1>
                <p style="margin:6px 0 0;font-size:13px;color:#777777;">Submitted via streetprogarage.com</p>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 24px 24px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e5e5;border-radius:6px;overflow:hidden;">
                  ${rows}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 24px;background:#fafafa;border-top:1px solid #e5e5e5;">
                <p style="margin:0;font-size:12px;color:#999999;">Reply directly to this email to respond to the customer.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

type SendNotificationArgs = {
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
};

/** Sends an internal notification email via SMTP. No-ops (returns false) if SMTP env vars aren't set. */
export async function sendNotificationEmail({ subject, text, html, replyTo }: SendNotificationArgs): Promise<boolean> {
  if (!isEmailConfigured()) return false;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Street PRO Garage Website" <${process.env.SMTP_FROM ?? "info@streetprogarage.com"}>`,
    to: process.env.NOTIFY_EMAIL ?? "info@streetprogarage.com",
    replyTo,
    subject,
    text,
    html,
  });

  return true;
}
