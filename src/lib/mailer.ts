import nodemailer from "nodemailer";

export function isEmailConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

/** Turns a form submission object into readable "Label: value" lines for a notification email. */
export function formatSubmission(body: Record<string, unknown>): string {
  return Object.entries(body)
    .map(([key, value]) => {
      const label = key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (c) => c.toUpperCase())
        .trim();
      let displayValue: string;
      if (Array.isArray(value)) {
        displayValue = value.length ? value.join(", ") : "—";
      } else if (value && typeof value === "object") {
        displayValue = JSON.stringify(value, null, 2);
      } else {
        displayValue = value === undefined || value === null || value === "" ? "—" : String(value);
      }
      return `${label}: ${displayValue}`;
    })
    .join("\n");
}

type SendNotificationArgs = {
  subject: string;
  text: string;
  replyTo?: string;
};

/** Sends an internal notification email via SMTP. No-ops (returns false) if SMTP env vars aren't set. */
export async function sendNotificationEmail({ subject, text, replyTo }: SendNotificationArgs): Promise<boolean> {
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
  });

  return true;
}
