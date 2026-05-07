"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import { getWhatsAppHref } from "@/lib/contact";

export function ContactForm() {
  const [status, setStatus] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "");
    const companyName = String(formData.get("company") || "");
    const message = String(formData.get("message") || "");
    const inquiry = [
      "Hola your_site, quiero solicitar información.",
      name ? `Nombre: ${name}` : "",
      companyName ? `Empresa/Taller: ${companyName}` : "",
      message ? `Mensaje: ${message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(getWhatsAppHref(inquiry), "_blank", "noopener,noreferrer");
    setStatus("Tu consulta está preparada en WhatsApp.");
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-neutral-700">
          Nombre
          <input
            name="name"
            required
            autoComplete="name"
            className="min-h-12 rounded-xl border border-neutral-200 px-4 text-neutral-950 outline-none transition focus:border-neutral-950"
            placeholder="Alex Morgan"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-neutral-700">
          Empresa o taller
          <input
            name="company"
            autoComplete="organization"
            className="min-h-12 rounded-xl border border-neutral-200 px-4 text-neutral-950 outline-none transition focus:border-neutral-950"
            placeholder="Northline Manufacturing"
          />
        </label>
      </div>
      <label className="mt-4 grid gap-2 text-sm font-medium text-neutral-700">
        Mensaje
        <textarea
          name="message"
          required
          rows={5}
          className="resize-none rounded-xl border border-neutral-200 px-4 py-3 text-neutral-950 outline-none transition focus:border-neutral-950"
          placeholder="Indica servicio, referencia, síntomas o códigos de avería."
        />
      </label>
      <button
        type="submit"
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-neutral-950 px-5 text-sm font-semibold text-white transition hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950 sm:w-auto"
      >
        Enviar consulta
        <Send size={17} aria-hidden="true" />
      </button>
      {status ? <p className="mt-3 text-sm text-emerald-700">{status}</p> : null}
    </form>
  );
}
