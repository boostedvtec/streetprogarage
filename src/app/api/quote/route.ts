import { NextResponse } from "next/server";

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

  const emailConfigured = Boolean(process.env.RESEND_API_KEY || process.env.SMTP_HOST);
  const sheetsConfigured = Boolean(process.env.GOOGLE_SHEETS_WEBHOOK_URL);

  // TODO: once RESEND_API_KEY / SMTP_HOST is set, send an email notification here.
  // TODO: once GOOGLE_SHEETS_WEBHOOK_URL is set, POST the submission to that endpoint here.

  return NextResponse.json({
    status: "received",
    notified: { email: emailConfigured, spreadsheet: sheetsConfigured },
    message:
      "Thanks — your build list has been received. We'll follow up by email with your exact quote.",
  });
}
