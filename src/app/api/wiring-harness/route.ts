import { NextResponse } from "next/server";
import { formatSubmission, renderSubmissionEmail, sendNotificationEmail } from "@/lib/mailer";

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

  console.log("[Wiring harness build submission]", JSON.stringify(body, null, 2));

  let emailSent = false;
  try {
    const subject = `New Wiring Harness Build — ${body.engineCode || body.name}`;
    emailSent = await sendNotificationEmail({
      subject,
      text: formatSubmission(body),
      html: renderSubmissionEmail(subject, body),
      replyTo: body.email,
    });
  } catch (err) {
    console.error("[Wiring harness build submission] Failed to send notification email", err);
  }

  return NextResponse.json({
    status: "received",
    notified: { email: emailSent },
    message:
      "Thanks — your harness build details have been received. We'll follow up by email with pricing and lead time.",
  });
}
