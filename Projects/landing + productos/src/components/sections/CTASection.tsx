import { ArrowRight, MessageCircle } from "lucide-react";
import { getWhatsAppHref } from "@/lib/contact";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function CTASection() {
  return (
    <Section className="bg-neutral-100 py-10 sm:py-12">
      <Container>
        <div className="overflow-hidden rounded-3xl bg-neutral-950 px-6 py-12 text-white shadow-2xl shadow-neutral-950/10 sm:px-10 lg:px-14">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">
                Ready to specify?
              </p>
              <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl">
                Send us your requirement and we will guide the next step.
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Button
                href={getWhatsAppHref("Hello Reman, I would like help choosing a product.")}
                target="_blank"
                rel="noreferrer"
                variant="whatsapp"
                icon={<MessageCircle size={18} aria-hidden="true" />}
              >
                WhatsApp sales
              </Button>
              <Button href="#contact" variant="secondary" icon={<ArrowRight size={18} aria-hidden="true" />}>
                Request information
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
