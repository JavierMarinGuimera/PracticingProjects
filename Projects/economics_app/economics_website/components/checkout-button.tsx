"use client";

import { CreditCard, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CheckoutButton({ disabled = false }: { disabled?: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function checkout() {
    setLoading(true);
    const response = await fetch("/api/stripe/checkout", { method: "POST" });
    const payload = await response.json();
    setLoading(false);

    if (payload.url) {
      router.push(payload.url);
      router.refresh();
    }
  }

  return (
    <button
      type="button"
      onClick={checkout}
      disabled={disabled || loading}
      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-ink px-4 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CreditCard className="h-4 w-4" />}
      {disabled ? "Ya estás suscrito" : "Suscribirme"}
    </button>
  );
}
