import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (amount: number, currency = "EUR") =>
  new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency
  }).format(amount / 100);

export const absoluteUrl = (path = "") => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return `${siteUrl.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
};
