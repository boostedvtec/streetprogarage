import { NextResponse } from "next/server";
import { getProductBySlug } from "@/lib/products";
import { getDeliveryOption } from "@/lib/delivery";
import { vatAmount } from "@/lib/vat";
import { formatSubmission, renderSubmissionEmail, sendNotificationEmail } from "@/lib/mailer";

type CheckoutPayload = {
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    postcode: string;
  };
  lines: { slug: string; quantity: number }[];
  deliveryOptionId?: string;
  paymentMethod?: "card" | "bank";
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.streetprogarage.com";

const toPence = (pounds: number) => Math.round(pounds * 100);

/** Creates a Stripe Checkout Session via the REST API (no SDK dependency). */
async function createStripeSession(args: {
  secretKey: string;
  reference: string;
  customer: CheckoutPayload["customer"];
  items: { name: string; quantity: number; lineTotal: number }[];
  vat: number;
  delivery: number;
  total: number;
}): Promise<string | null> {
  const params = new URLSearchParams();
  params.set("mode", "payment");
  params.set("customer_email", args.customer.email);
  params.set("client_reference_id", args.reference);
  params.set("success_url", `${SITE_URL}/checkout/success?ref=${args.reference}`);
  params.set("cancel_url", `${SITE_URL}/checkout`);
  params.set("metadata[reference]", args.reference);
  params.set("metadata[name]", args.customer.name);
  params.set("metadata[phone]", args.customer.phone ?? "");
  params.set("metadata[address]", `${args.customer.address}, ${args.customer.postcode}`.slice(0, 480));
  params.set("payment_intent_data[description]", `Street PRO Garage order ${args.reference}`);
  params.set("payment_intent_data[metadata][reference]", args.reference);

  const lines: { name: string; unitPence: number; quantity: number }[] = args.items.map((i) => ({
    name: i.name,
    unitPence: toPence(i.lineTotal / i.quantity),
    quantity: i.quantity,
  }));
  if (args.vat > 0) lines.push({ name: "VAT", unitPence: toPence(args.vat), quantity: 1 });
  if (args.delivery > 0) lines.push({ name: "Delivery", unitPence: toPence(args.delivery), quantity: 1 });

  lines.forEach((line, idx) => {
    params.set(`line_items[${idx}][quantity]`, String(line.quantity));
    params.set(`line_items[${idx}][price_data][currency]`, "gbp");
    params.set(`line_items[${idx}][price_data][unit_amount]`, String(line.unitPence));
    params.set(`line_items[${idx}][price_data][product_data][name]`, line.name);
  });

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${args.secretKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });
  if (!res.ok) {
    console.error("[Checkout order] Stripe session failed", res.status, await res.text());
    return null;
  }
  const session = (await res.json()) as { url?: string };
  return session.url ?? null;
}

function orderReference() {
  const stamp = Date.now().toString(36).toUpperCase().slice(-5);
  const rand = Math.random().toString(36).toUpperCase().slice(2, 5);
  return `SPG-${stamp}${rand}`;
}

export async function POST(request: Request) {
  let body: CheckoutPayload;
  try {
    body = (await request.json()) as CheckoutPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body.customer?.email || !body.customer?.name || !body.lines?.length) {
    return NextResponse.json(
      { error: "Missing customer details or cart items." },
      { status: 400 }
    );
  }

  // Recompute the order total on the server — never trust a total sent by the browser.
  const items: { name: string; quantity: number; lineTotal: number }[] = [];
  let subtotal = 0;
  for (const line of body.lines) {
    const product = getProductBySlug(line.slug);
    const quantity = Math.floor(Number(line.quantity));
    if (!product || product.price == null || !Number.isFinite(quantity) || quantity < 1) {
      return NextResponse.json(
        { error: "One of the items in your cart is no longer available." },
        { status: 400 }
      );
    }
    const lineTotal = product.price * quantity;
    subtotal += lineTotal;
    items.push({ name: product.name, quantity, lineTotal });
  }

  const vat = vatAmount(subtotal);
  const delivery = getDeliveryOption(body.deliveryOptionId ?? "")?.price ?? 0;
  const total = subtotal + vat + delivery;
  const reference = orderReference();

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (body.paymentMethod === "card") {
    if (!stripeKey) {
      return NextResponse.json(
        { error: "Card payments aren't available right now — please choose bank transfer." },
        { status: 503 }
      );
    }
    console.log("[Checkout order]", reference, JSON.stringify({ customer: body.customer, items, total, method: "card" }));
    const url = await createStripeSession({
      secretKey: stripeKey,
      reference,
      customer: body.customer,
      items,
      vat,
      delivery,
      total,
    });
    if (!url) {
      return NextResponse.json(
        { error: "Couldn't start card payment — please try again or choose bank transfer." },
        { status: 502 }
      );
    }
    // The owner is emailed by the Stripe webhook once payment actually succeeds.
    return NextResponse.json({ status: "redirect", reference, url });
  }

  const accountName = process.env.BANK_ACCOUNT_NAME;
  const sortCode = process.env.BANK_SORT_CODE;
  const accountNumber = process.env.BANK_ACCOUNT_NUMBER;
  const bankConfigured = Boolean(accountName && sortCode && accountNumber);

  console.log("[Checkout order]", reference, JSON.stringify({ customer: body.customer, items, total }));

  let emailSent = false;
  try {
    const subject = `New order ${reference} — £${total.toFixed(2)} (awaiting bank transfer)`;
    const details = {
      reference,
      name: body.customer.name,
      email: body.customer.email,
      phone: body.customer.phone,
      address: `${body.customer.address}, ${body.customer.postcode}`,
      items: items.map((i) => `${i.name} x ${i.quantity} — £${i.lineTotal.toFixed(2)}`).join("; "),
      subtotal: `£${subtotal.toFixed(2)}`,
      vat: `£${vat.toFixed(2)}`,
      delivery: `£${delivery.toFixed(2)}`,
      total: `£${total.toFixed(2)}`,
    };
    emailSent = await sendNotificationEmail({
      subject,
      text: formatSubmission(details),
      html: renderSubmissionEmail(subject, details),
      replyTo: body.customer.email,
    });
  } catch (err) {
    console.error("[Checkout order] Failed to send notification email", err);
  }

  if (!bankConfigured) {
    return NextResponse.json({
      status: "received",
      reference,
      total,
      notified: emailSent,
      message: `Thanks — your order ${reference} (£${total.toFixed(2)}) has been received. We'll email you our bank transfer details shortly.`,
    });
  }

  return NextResponse.json({
    status: "awaiting_payment",
    reference,
    total,
    notified: emailSent,
    bank: { accountName, sortCode, accountNumber },
    message: `Order ${reference} received. Please pay £${total.toFixed(2)} by bank transfer using the details below, quoting ${reference} as the payment reference. We'll dispatch once the payment clears.`,
  });
}
