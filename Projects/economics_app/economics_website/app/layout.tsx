import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Market Pulse AI",
  description: "Noticias financieras analizadas con IA para decisiones de inversión mejor informadas.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
