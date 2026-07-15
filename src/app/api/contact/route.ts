import { NextResponse } from "next/server";
import { formatSubmission, renderSubmissionEmail, sendNotificationEmail } from "@/lib/mailer";

export async function POST(request: Request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body?.email || !body?.name || !body?.message) {
    return NextResponse.json(
      { error: "Please fill in your name, email and message." },
      { status: 400 }
    );
  }

  console.log("[Contact form submission]", JSON.stringify(body, null, 2));

  let emailSent = false;
  try {
    const subject = `New Contact Form Message from ${body.name}`;
    emailSent = await sendNotificationEmail({
      subject,
      text: formatSubmission(body),
      html: renderSubmissionEmail(subject, body),
      replyTo: body.email,
    });
  } catch (err) {
    console.error("[Contact form submission] Failed to send notification email", err);
  }

  const sheetsConfigured = Boolean(process.env.GOOGLE_SHEETS_WEBHOOK_URL);

  // TODO: once GOOGLE_SHEETS_WEBHOOK_URL is set, POST the submission to that endpoint here.

  return NextResponse.json({
    status: "received",
    notified: { email: emailSent, spreadsheet: sheetsConfigured },
    message: "Thanks for reaching out — we'll get back to you as soon as we can.",
  });
}
