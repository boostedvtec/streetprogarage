import { NextResponse } from "next/server";

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

  const emailConfigured = Boolean(process.env.RESEND_API_KEY || process.env.SMTP_HOST);
  const sheetsConfigured = Boolean(process.env.GOOGLE_SHEETS_WEBHOOK_URL);

  // TODO: once RESEND_API_KEY / SMTP_HOST is set, send an email notification here.
  // TODO: once GOOGLE_SHEETS_WEBHOOK_URL is set, POST the submission to that endpoint here.

  return NextResponse.json({
    status: "received",
    notified: { email: emailConfigured, spreadsheet: sheetsConfigured },
    message: "Thanks for reaching out — we'll get back to you as soon as we can.",
  });
}
