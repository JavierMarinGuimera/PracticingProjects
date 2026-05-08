import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Introduce tu nombre"),
  email: z.string().trim().email("Introduce un email válido"),
  message: z.string().trim().min(12, "Cuéntame un poco más sobre el proyecto")
});

export type ContactInput = z.infer<typeof contactSchema>;

export const checkoutSchema = z.object({
  items: z
    .array(
      z.object({
        slug: z.string(),
        quantity: z.number().int().min(1).max(5)
      })
    )
    .min(1)
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
