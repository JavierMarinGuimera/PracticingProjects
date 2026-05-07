import { NextResponse } from "next/server";
import { updateSubscription } from "@/lib/data/store";

export async function POST(request: Request) {
  const event = await request.json();

  if (event?.type === "checkout.session.completed") {
    const session = event.data?.object;
    const userId = session?.metadata?.userId;
    if (userId) {
      await updateSubscription(userId, "active", session?.subscription);
    }
  }

  if (event?.type === "customer.subscription.deleted") {
    const subscription = event.data?.object;
    const userId = subscription?.metadata?.userId;
    if (userId) {
      await updateSubscription(userId, "canceled", subscription?.id);
    }
  }

  return NextResponse.json({ received: true });
}
