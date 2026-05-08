import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { getStripe } from "@/server/stripe";

export async function POST(request: Request) {
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Webhook secret missing" }, { status: 500 });
  }

  const body = await request.text();
  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  try {
    const stripe = getStripe();
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const orderId = session.metadata?.orderId;

      if (orderId) {
        await db.order.update({
          where: { id: orderId },
          data: {
            status: "PAID",
            stripeSessionId: session.id,
            customerEmail: session.customer_details?.email ?? null,
            customerName: session.customer_details?.name ?? null,
            stripePaymentId:
              typeof session.payment_intent === "string"
                ? session.payment_intent
                : session.payment_intent?.id
          }
        });
      }
    }

    if (event.type === "checkout.session.expired") {
      const session = event.data.object;
      const orderId = session.metadata?.orderId;

      if (orderId) {
        await db.order.update({
          where: { id: orderId },
          data: { status: "CANCELLED" }
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Webhook error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
