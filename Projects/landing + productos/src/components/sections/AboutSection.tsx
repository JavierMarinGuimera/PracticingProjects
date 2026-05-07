import { BadgeCheck, Factory, Gauge } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

const highlights = [
  {
    title: "Specification-first sales",
    description: "We help teams choose the right product before a quote ever leaves the inbox.",
    icon: BadgeCheck,
  },
  {
    title: "Built for production teams",
    description: "The catalog is structured around real operational needs, not online shopping flows.",
    icon: Factory,
  },
  {
    title: "Fast lead response",
    description: "Phone and WhatsApp CTAs keep high-intent customers close to the sales team.",
    icon: Gauge,
  },
];

export function AboutSection() {
  return (
    <Section id="about" className="bg-white">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <Reveal>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
                About us
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
                A modern sales presence for technical products.
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-lg leading-8 text-neutral-600">
              your_site presents industrial products clearly, helps buyers compare options quickly,
              and turns interest into direct conversations. The website is intentionally not an
              ecommerce store because these products deserve consultation, sizing, and support.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {highlights.map((item, index) => {
            const Icon = item.icon;

            return (
              <Reveal key={item.title} delay={index * 0.06}>
                <article className="h-full rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
                  <div className="flex size-11 items-center justify-center rounded-full bg-neutral-950 text-white">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-neutral-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-neutral-600">{item.description}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
