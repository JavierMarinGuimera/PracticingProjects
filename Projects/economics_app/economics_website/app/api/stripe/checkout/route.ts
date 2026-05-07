import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { updateSubscription } from "@/lib/data/store";
import { createStripeCheckoutSession } from "@/lib/stripe";

export async function POST() {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "No autenticado." }, { status: 401 });
  }

  const stripeSession = await createStripeCheckoutSession(user);
  if (stripeSession?.url) {
    return NextResponse.json({ url: stripeSession.url });
  }

  await updateSubscription(user.id, "active", "mock_subscription");
  return NextResponse.json({ url: "/pricing?checkout=mock-success" });
}
