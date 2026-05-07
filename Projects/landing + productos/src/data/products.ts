import type { Product } from "@/types/product";

// Client projects can replace this array without touching layout or catalog logic.
export const products: Product[] = [
  {
    id: "flowline-automation-cell",
    title: "Flowline Automation Cell",
    category: "Automation",
    description:
      "A configurable automation cell for handling repetitive line movements with consistent throughput and reduced operator fatigue.",
    image:
      "https://images.unsplash.com/photo-1764835994645-3faa2c40f708?auto=format&fit=crop&fm=jpg&q=80&w=1400",
    imageAlt: "Industrial automation machinery operating inside a large factory.",
    featured: true,
  },
  {
    id: "inox-process-manifold",
    title: "Inox Process Manifold",
    category: "Processing",
    description:
      "Stainless process distribution for facilities that require clean routing, high durability, and easy service access.",
    image:
      "https://images.unsplash.com/photo-1765218933298-dc55fdfb517a?auto=format&fit=crop&fm=jpg&q=80&w=1400",
    imageAlt: "Stainless steel industrial pipes and process machinery.",
    featured: true,
  },
  {
    id: "modular-storage-system",
    title: "Modular Storage System",
    category: "Storage",
    description:
      "Dense storage infrastructure for parts, consumables, and finished goods with clear organization and fast retrieval.",
    image:
      "https://images.unsplash.com/photo-1684695749267-233af13276d0?auto=format&fit=crop&fm=jpg&q=80&w=1400",
    imageAlt: "Organized industrial warehouse with shelving and inventory boxes.",
    featured: true,
  },
  {
    id: "conveyor-transfer-suite",
    title: "Conveyor Transfer Suite",
    category: "Automation",
    description:
      "Roller and belt transfer modules designed for smooth material movement across packaging and logistics workflows.",
    image:
      "https://images.unsplash.com/photo-1684695747561-9372850cf165?auto=format&fit=crop&fm=jpg&q=80&w=1400",
    imageAlt: "Conveyor system inside an industrial warehouse.",
  },
  {
    id: "precision-control-panel",
    title: "Precision Control Panel",
    category: "Control",
    description:
      "Control and monitoring assemblies built for simple diagnostics, stable operation, and fast maintenance access.",
    image:
      "https://images.unsplash.com/photo-1759159091682-3b98f4759367?auto=format&fit=crop&fm=jpg&q=80&w=1400",
    imageAlt: "Close up of industrial machinery with dials and mechanical controls.",
  },
  {
    id: "hygienic-pipe-kit",
    title: "Hygienic Pipe Kit",
    category: "Processing",
    description:
      "A ready-to-spec pipe and valve kit for production environments where clean installation and serviceability matter.",
    image:
      "https://images.unsplash.com/photo-1765218933298-dc55fdfb517a?auto=format&fit=crop&fm=jpg&q=80&w=1400",
    imageAlt: "Polished stainless process piping in a modern facility.",
  },
];
