"use server";

import { headers } from "next/headers";
import { db } from "@/server/db";
import { getStripe } from "@/server/stripe";
import { products } from "@/content/products";
import { checkoutSchema, type CheckoutInput } from "@/lib/validations";
import { absoluteUrl } from "@/lib/utils";

export type CheckoutState = {
  ok: boolean;
  url?: string;
  message?: string;
};

export const createCheckoutSession = async (
  input: CheckoutInput
): Promise<CheckoutState> => {
  const parsed = checkoutSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, message: "Carrito inválido" };
  }

  const cartItems = parsed.data.items
    .map((item) => {
      const product = products.find((candidate) => candidate.slug === item.slug);
      return product ? { product, quantity: item.quantity } : null;
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  if (cartItems.length === 0) {
    return { ok: false, message: "No hay productos válidos en el carrito" };
  }

  const amount = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  try {
    const order = await db.order.create({
      data: {
        amount,
        currency: "eur",
        items: {
          create: cartItems.map(({ product, quantity }) => ({
            productSlug: product.slug,
            name: product.name,
            quantity,
            unitAmount: product.price
          }))
        }
      }
    });

    const stripe = getStripe();
    const requestHeaders = await headers();
    const origin = requestHeaders.get("origin") ?? absoluteUrl("/");

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      client_reference_id: order.id,
      success_url: `${origin}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/shop?checkout=cancelled`,
      metadata: { orderId: order.id },
      line_items: cartItems.map(({ product, quantity }) => ({
        quantity,
        price_data: {
          currency: "eur",
          unit_amount: product.price,
          product_data: {
            name: product.name,
            description: product.description
          }
        }
      }))
    });

    await db.order.update({
      where: { id: order.id },
      data: { stripeSessionId: session.id }
    });

    return { ok: true, url: session.url ?? undefined };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "No se pudo crear el checkout";

    return { ok: false, message };
  }
};
