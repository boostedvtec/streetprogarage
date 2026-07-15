import { NextResponse } from "next/server";
import { formatSubmission, sendNotificationEmail } from "@/lib/mailer";

export async function POST(request: Request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body?.email || !body?.name) {
    return NextResponse.json(
      { error: "Missing required contact details." },
      { status: 400 }
    );
  }

  // Log server-side so submissions are visible during development.
  console.log("[Build List / Quote submission]", JSON.stringify(body, null, 2));

  let emailSent = false;
  try {
    emailSent = await sendNotificationEmail({
      subject: `New Build List Submission — ${body.vehicle || body.name}`,
      text: formatSubmission(body),
      replyTo: body.email,
    });
  } catch (err) {
    console.error("[Build List / Quote submission] Failed to send notification email", err);
  }

  const sheetsConfigured = Boolean(process.env.GOOGLE_SHEETS_WEBHOOK_URL);

  // TODO: once GOOGLE_SHEETS_WEBHOOK_URL is set, POST the submission to that endpoint here.

  return NextResponse.json({
    status: "received",
    notified: { email: emailSent, spreadsheet: sheetsConfigured },
    message:
      "Thanks — your build list has been received. We'll follow up by email with your exact quote.",
  });
}
