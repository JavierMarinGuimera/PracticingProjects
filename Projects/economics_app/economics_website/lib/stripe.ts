import type { User } from "@/lib/types";

export function getAppUrl() {
  return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
}

export async function createStripeCheckoutSession(user: User) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const priceId = process.env.STRIPE_PRICE_ID;

  if (!stripeSecretKey || !priceId) {
    return null;
  }

  const body = new URLSearchParams({
    mode: "subscription",
    "payment_method_types[0]": "card",
    "line_items[0][price]": priceId,
    "line_items[0][quantity]": "1",
    customer_email: user.email,
    success_url: `${getAppUrl()}/pricing?checkout=success`,
    cancel_url: `${getAppUrl()}/pricing?checkout=cancel`,
    "metadata[userId]": user.id,
    "subscription_data[metadata][userId]": user.id,
  });

  const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${stripeSecretKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json() as Promise<{ url: string }>;
}
