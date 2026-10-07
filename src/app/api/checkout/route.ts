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
};

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
