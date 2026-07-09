import { NextResponse } from "next/server";

type CheckoutPayload = {
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    postcode: string;
  };
  lines: { slug: string; quantity: number }[];
  paymentMethod: "stripe" | "paypal";
};

export async function POST(request: Request) {
  const body = (await request.json()) as CheckoutPayload;

  if (!body.customer?.email || !body.lines?.length) {
    return NextResponse.json(
      { error: "Missing customer details or cart items." },
      { status: 400 }
    );
  }

  const stripeConfigured = Boolean(process.env.STRIPE_SECRET_KEY);
  const paypalConfigured = Boolean(process.env.PAYPAL_CLIENT_ID);

  const configured =
    body.paymentMethod === "stripe" ? stripeConfigured : paypalConfigured;

  if (!configured) {
    return NextResponse.json({
      status: "demo",
      message:
        body.paymentMethod === "stripe"
          ? "Stripe isn't connected yet. Add STRIPE_SECRET_KEY (and STRIPE_PUBLISHABLE_KEY) to your environment to enable real card payments."
          : "PayPal isn't connected yet. Add PAYPAL_CLIENT_ID (and PAYPAL_CLIENT_SECRET) to your environment to enable real PayPal checkout.",
    });
  }

  // TODO: once keys are configured, create a real Stripe Checkout Session or
  // PayPal order here and return its redirect URL instead of the demo response.
  return NextResponse.json({
    status: "not_implemented",
    message:
      "Payment keys are present, but the live payment integration still needs to be wired up in src/app/api/checkout/route.ts.",
  });
}
