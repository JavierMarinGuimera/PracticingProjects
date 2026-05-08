"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { submitContact } from "@/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema, type ContactInput } from "@/lib/validations";

export const ContactForm = () => {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<string | null>(null);
  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" }
  });

  const onSubmit = (values: ContactInput) => {
    startTransition(async () => {
      const response = await submitContact(values);
      setStatus(response.message);
      if (response.ok) {
        form.reset();
      }
    });
  };

  return (
    <form className="grid gap-5" onSubmit={form.handleSubmit(onSubmit)}>
      <div>
        <label className="mb-2 block text-sm font-semibold text-navy" htmlFor="name">
          Nombre
        </label>
        <Input id="name" autoComplete="name" {...form.register("name")} />
        {form.formState.errors.name ? (
          <p className="mt-2 text-sm text-red-600">{form.formState.errors.name.message}</p>
        ) : null}
      </div>
      <div>
        <label className="mb-2 block text-sm font-semibold text-navy" htmlFor="email">
          Email
        </label>
        <Input id="email" type="email" autoComplete="email" {...form.register("email")} />
        {form.formState.errors.email ? (
          <p className="mt-2 text-sm text-red-600">{form.formState.errors.email.message}</p>
        ) : null}
      </div>
      <div>
        <label className="mb-2 block text-sm font-semibold text-navy" htmlFor="message">
          Mensaje
        </label>
        <Textarea id="message" {...form.register("message")} />
        {form.formState.errors.message ? (
          <p className="mt-2 text-sm text-red-600">{form.formState.errors.message.message}</p>
        ) : null}
      </div>
      {status ? <p className="rounded-xl bg-aura/10 p-3 text-sm text-slate-700">{status}</p> : null}
      <Button disabled={isPending} size="lg" type="submit" variant="aura">
        {isPending ? "Enviando..." : "Enviar mensaje"} <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};
