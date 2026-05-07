import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { company } from "@/data/company";
import { getTelHref, getWhatsAppHref } from "@/lib/contact";
import { ContactLink } from "@/components/ui/ContactLink";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/sections/ContactForm";

export function ContactSection() {
  return (
    <Section id="contact" className="bg-neutral-100">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
                Contact
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
                Talk to a product specialist.
              </h2>
              <p className="mt-5 text-lg leading-8 text-neutral-600">
                Call, message us on WhatsApp, or send a short request. The form opens a prepared
                WhatsApp inquiry so your sales team can respond without a backend integration.
              </p>

              <div className="mt-8 grid gap-3">
                <ContactLink
                  href={getTelHref()}
                  label="Phone"
                  value={company.phoneDisplay}
                  icon={<Phone size={20} aria-hidden="true" />}
                />
                <ContactLink
                  href={getWhatsAppHref("Hello Reman, I would like product information.")}
                  label="WhatsApp"
                  value={company.whatsappDisplay}
                  icon={<MessageCircle size={20} aria-hidden="true" />}
                />
                <ContactLink
                  href={`mailto:${company.email}`}
                  label="Email"
                  value={company.email}
                  icon={<Mail size={20} aria-hidden="true" />}
                />
                <div className="flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-neutral-950 text-white">
                    <MapPin size={20} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm text-neutral-500">Visit</span>
                    <span className="block text-base font-semibold text-neutral-950">
                      {company.address}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
