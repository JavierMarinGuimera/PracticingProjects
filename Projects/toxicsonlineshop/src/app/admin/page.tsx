import Link from "next/link";
import {
  BarChart3,
  BriefcaseBusiness,
  Inbox,
  ShoppingBag,
  type LucideIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { services } from "@/content/services";
import { db } from "@/server/db";
import { formatCurrency } from "@/lib/utils";

const getDashboardData = async () => {
  try {
    const [leads, orders, paidOrders] = await Promise.all([
      db.lead.findMany({ orderBy: { createdAt: "desc" }, take: 8 }),
      db.order.findMany({
        orderBy: { createdAt: "desc" },
        take: 8,
        include: { items: true }
      }),
      db.order.aggregate({
        where: { status: "PAID" },
        _sum: { amount: true },
        _count: true
      })
    ]);

    return {
      leads,
      orders,
      revenue: paidOrders._sum.amount ?? 0,
      paidCount: paidOrders._count
    };
  } catch {
    return { leads: [], orders: [], revenue: 0, paidCount: 0 };
  }
};

export default async function AdminPage() {
  const data = await getDashboardData();

  return (
    <section className="section-padding">
      <div className="container-page">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold text-aura">Admin</p>
            <h1 className="mt-2 display-heading text-5xl font-semibold text-navy">
              Dashboard TOXICS
            </h1>
            <p className="mt-3 max-w-2xl text-muted">
              Vista operativa para leads, pedidos, catálogo de servicios y métricas simples.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/">Volver a la web</Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {([
            [Inbox, "Leads", String(data.leads.length)],
            [ShoppingBag, "Pedidos", String(data.orders.length)],
            [BarChart3, "Ingresos pagados", formatCurrency(data.revenue)],
            [BriefcaseBusiness, "Servicios", String(services.length)]
          ] satisfies Array<[LucideIcon, string, string]>).map(([Icon, label, value]) => (
            <Card className="p-6" key={label}>
              <Icon className="h-5 w-5 text-aura" />
              <p className="mt-5 text-sm text-muted">{label}</p>
              <p className="mt-2 font-display text-3xl font-semibold text-navy">
                {value}
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <h2 className="font-display text-2xl font-semibold text-navy">
              Leads recientes
            </h2>
            <div className="mt-5 grid gap-3">
              {data.leads.length === 0 ? (
                <p className="text-sm text-muted">
                  Sin leads todavía o base de datos pendiente de configurar.
                </p>
              ) : (
                data.leads.map((lead) => (
                  <div className="rounded-xl border border-border p-4" key={lead.id}>
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold text-navy">{lead.name}</p>
                      <span className="rounded-full bg-aura/10 px-2 py-1 text-xs font-semibold text-aura">
                        {lead.status}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted">{lead.email}</p>
                    <p className="mt-3 line-clamp-2 text-sm text-slate-600">{lead.message}</p>
                  </div>
                ))
              )}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="font-display text-2xl font-semibold text-navy">
              Pedidos recientes
            </h2>
            <div className="mt-5 grid gap-3">
              {data.orders.length === 0 ? (
                <p className="text-sm text-muted">
                  Sin pedidos todavía o checkout pendiente de configurar.
                </p>
              ) : (
                data.orders.map((order) => (
                  <div className="rounded-xl border border-border p-4" key={order.id}>
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold text-navy">
                        {formatCurrency(order.amount)}
                      </p>
                      <span className="rounded-full bg-mint/15 px-2 py-1 text-xs font-semibold text-slate-800">
                        {order.status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-muted">
                      {order.customerEmail ?? "Cliente pendiente de Stripe"}
                    </p>
                    <p className="mt-2 text-xs text-slate-500">
                      {order.items.map((item) => item.name).join(", ")}
                    </p>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        <Card className="mt-6 p-6">
          <h2 className="font-display text-2xl font-semibold text-navy">
            Gestión de servicios
          </h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {services.map((service) => (
              <div className="rounded-xl border border-border p-4" key={service.slug}>
                <p className="font-semibold text-navy">{service.title}</p>
                <p className="mt-2 text-sm leading-6 text-muted">{service.description}</p>
                <p className="mt-3 text-sm font-semibold text-aura">{service.price}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
