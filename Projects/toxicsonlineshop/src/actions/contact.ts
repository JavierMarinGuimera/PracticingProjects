"use server";

import { db } from "@/server/db";
import { getResend } from "@/server/resend";
import { contactSchema, type ContactInput } from "@/lib/validations";

export type ContactState = {
  ok: boolean;
  message: string;
};

export const submitContact = async (
  input: ContactInput
): Promise<ContactState> => {
  const parsed = contactSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Datos inválidos" };
  }

  try {
    await db.lead.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        message: parsed.data.message,
        source: "contact"
      }
    });

    const resend = getResend();
    if (resend) {
      const from = process.env.RESEND_FROM_EMAIL ?? "TOXICS <onboarding@resend.dev>";
      const notificationTo =
        process.env.LEAD_NOTIFICATION_EMAIL ?? process.env.NEXT_PUBLIC_CONTACT_EMAIL;

      if (notificationTo) {
        await resend.emails.send({
          from,
          to: notificationTo,
          subject: `Nuevo lead de ${parsed.data.name}`,
          html: `<h1>Nuevo lead</h1><p><strong>Email:</strong> ${parsed.data.email}</p><p>${parsed.data.message}</p>`
        });
      }

      await resend.emails.send({
        from,
        to: parsed.data.email,
        subject: "He recibido tu mensaje",
        html: `<p>Hola ${parsed.data.name},</p><p>Gracias por contactar con TOXICS. He recibido tu mensaje y te responderé con próximos pasos lo antes posible.</p><p>Javier Marín</p>`
      });
    }

    return {
      ok: true,
      message: "Mensaje enviado. Te responderé con próximos pasos lo antes posible."
    };
  } catch {
    return {
      ok: false,
      message:
        "No se pudo guardar el lead. Revisa la configuración de DATABASE_URL o contacta por WhatsApp."
    };
  }
};
