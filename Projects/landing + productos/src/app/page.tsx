import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { CTASection } from "@/components/sections/CTASection";
import { FeaturedProductsSection } from "@/components/sections/FeaturedProductsSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServiceCategoriesSection } from "@/components/sections/ServiceCategoriesSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Reparación técnica automotriz en Barcelona",
  description:
    "Reparación de turbos, ABS, mecatrónica DSG, centralitas, dirección eléctrica y otros componentes técnicos con consulta por WhatsApp.",
});

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServiceCategoriesSection />
      <WhyChooseUsSection />
      <FeaturedProductsSection />
      <CTASection />
      <ContactSection />
    </>
  );
}
