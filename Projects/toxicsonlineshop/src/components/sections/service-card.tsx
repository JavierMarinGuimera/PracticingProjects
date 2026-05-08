import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Service } from "@/content/services";

export const ServiceCard = ({ service }: { service: Service }) => {
  const Icon = service.icon;

  return (
    <Card className="group h-full transition duration-300 hover:-translate-y-1 hover:border-aura/25">
      <CardHeader>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-aura/10 text-aura">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-aura">{service.eyebrow}</p>
          <h3 className="mt-2 font-display text-2xl font-semibold text-navy">
            {service.title}
          </h3>
        </div>
      </CardHeader>
      <CardContent>
        <p className="leading-7 text-muted">{service.description}</p>
        <ul className="mt-5 grid gap-2 text-sm text-slate-600">
          {service.benefits.slice(0, 3).map((benefit) => (
            <li className="flex gap-2" key={benefit}>
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-mint" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
          <span className="text-sm font-semibold text-navy">{service.price}</span>
          <Link
            className="inline-flex items-center gap-1 text-sm font-semibold text-aura"
            href={`/services/${service.slug}`}
          >
            Ver detalle <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
