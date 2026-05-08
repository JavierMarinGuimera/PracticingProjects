import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { absoluteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/services", "/portfolio", "/shop", "/contact"];
  const serviceRoutes = services.map((service) => `/services/${service.slug}`);

  return [...staticRoutes, ...serviceRoutes].map((route) => ({
    url: absoluteUrl(route || "/"),
    lastModified: new Date(),
    changeFrequency: route.includes("/services/") ? "monthly" : "weekly",
    priority: route === "" ? 1 : 0.8
  }));
}
