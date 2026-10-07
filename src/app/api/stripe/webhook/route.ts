import { createHmac, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { formatSubmission, renderSubmissionEmail, sendNotificationEmail } from "@/lib/mailer";

export const runtime = "nodejs";

/** Verifies Stripe's `Stripe-Signature` header (HMAC-SHA256, 5 minute tolerance). */
function verifySignature(payload: string, header: string, secret: string): boolean {
  const parts = Object.fromEntries(
    header.split(",").map((p) => {
      const [k, ...v] = p.split("=");
      return [k, v.join("=")];
    })
  );
  const timestamp = parts.t;
  const signature = parts.v1;
  if (!timestamp || !signature) return false;
  if (Math.abs(Date.now() / 1000 - Number(timestamp)) > 300) return false;
  const expected = createHmac("sha256", secret).update(`${timestamp}.${payload}`).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}

type StripeEvent = {
  type: string;
  data: {
    object: {
      id: string;
      amount_total?: number;
      currency?: string;
      payment_status?: string;
      customer_details?: { email?: string; name?: string };
      metadata?: Record<string, string>;
    };
  };
};

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Webhook not configured." }, { status: 503 });
  }

  const payload = await request.text();
  const header = request.headers.get("stripe-signature") ?? "";
  if (!verifySignature(payload, header, secret)) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  const event = JSON.parse(payload) as StripeEvent;

  if (event.type === "checkout.session.completed" && event.data.object.payment_status === "paid") {
    const s = event.data.object;
    const reference = s.metadata?.reference ?? s.id;
    const total = ((s.amount_total ?? 0) / 100).toFixed(2);
    const subject = `PAID ${reference} — £${total} (card)`;
    const details = {
      reference,
      name: s.metadata?.name ?? s.customer_details?.name,
      email: s.customer_details?.email,
      phone: s.metadata?.phone,
      address: s.metadata?.address,
      paid: `£${total}`,
      stripeSession: s.id,
    };
    try {
      await sendNotificationEmail({
        subject,
        text: formatSubmission(details),
        html: renderSubmissionEmail(subject, details),
        replyTo: s.customer_details?.email,
      });
    } catch (err) {
      console.error("[Stripe webhook] Failed to send notification email", err);
    }
    console.log("[Stripe webhook] Paid", reference, total);
  }

  return NextResponse.json({ received: true });
}
