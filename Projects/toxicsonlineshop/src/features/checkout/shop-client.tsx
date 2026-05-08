"use client";

import { ShoppingCart, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { createCheckoutSession } from "@/actions/checkout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { products } from "@/content/products";
import { formatCurrency } from "@/lib/utils";
import { CartProvider, useCart } from "./cart-context";

const ProductGrid = () => {
  const cart = useCart();

  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {products.map((product) => (
        <Card className="flex h-full flex-col p-6" key={product.slug}>
          <div className="flex-1">
            <p className="text-sm font-semibold text-aura">{product.delivery}</p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-navy">
              {product.name}
            </h2>
            <p className="mt-3 leading-7 text-muted">{product.description}</p>
            <p className="mt-5 font-display text-4xl font-semibold text-navy">
              {formatCurrency(product.price)}
            </p>
            <ul className="mt-5 grid gap-2 text-sm text-slate-600">
              {product.includes.map((item) => (
                <li className="flex gap-2" key={item}>
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-mint" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <Button className="mt-6" onClick={() => cart.addItem(product.slug)} variant="aura">
            Añadir al carrito <ShoppingCart className="h-4 w-4" />
          </Button>
        </Card>
      ))}
    </div>
  );
};

const CartSummary = () => {
  const cart = useCart();
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  const checkout = () => {
    startTransition(async () => {
      const response = await createCheckoutSession({ items: cart.items });
      if (response.ok && response.url) {
        window.location.href = response.url;
        return;
      }
      setMessage(response.message ?? "No se pudo iniciar el checkout");
    });
  };

  return (
    <Card className="sticky top-24 h-fit p-6">
      <h2 className="font-display text-2xl font-semibold text-navy">Carrito</h2>
      {cart.detailedItems.length === 0 ? (
        <p className="mt-4 text-sm leading-7 text-muted">
          Añade un servicio cerrado para iniciar una compra directa con Stripe.
        </p>
      ) : (
        <div className="mt-5 grid gap-4">
          {cart.detailedItems.map(({ product, quantity }) => (
            <div className="flex items-start justify-between gap-4" key={product.slug}>
              <div>
                <p className="font-semibold text-navy">{product.name}</p>
                <p className="text-sm text-muted">
                  {quantity} × {formatCurrency(product.price)}
                </p>
              </div>
              <Button
                aria-label={`Eliminar ${product.name}`}
                onClick={() => cart.removeItem(product.slug)}
                size="icon"
                variant="ghost"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <div className="border-t border-border pt-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-navy">Total</span>
              <span className="font-display text-2xl font-semibold text-navy">
                {formatCurrency(cart.total)}
              </span>
            </div>
            <Button
              className="mt-5 w-full"
              disabled={isPending}
              onClick={checkout}
              size="lg"
              variant="aura"
            >
              {isPending ? "Preparando..." : "Pagar con Stripe"}
            </Button>
            {message ? <p className="mt-3 text-sm text-red-600">{message}</p> : null}
          </div>
        </div>
      )}
    </Card>
  );
};

export const ShopClient = () => (
  <CartProvider>
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <ProductGrid />
      <CartSummary />
    </div>
  </CartProvider>
);
