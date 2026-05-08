# TOXICS Online Shop

Sitio web production-ready para la marca personal **TOXICS** de Javier Marín: servicios digitales, portfolio, ecommerce con Stripe, leads, emails, admin y SEO técnico.

## Stack

- Next.js 15 App Router + TypeScript strict
- Tailwind CSS v4
- shadcn/ui style components
- Framer Motion
- React Hook Form + Zod
- PostgreSQL + Prisma
- Clerk auth
- Stripe Checkout + webhook
- Resend emails
- Google Analytics + Plausible
- Vercel-ready

## Arquitectura

```txt
src/
├── app/                 # Rutas, layouts, metadata, route handlers
├── actions/             # Server actions de contacto y checkout
├── components/
│   ├── ui/              # Primitives estilo shadcn
│   ├── shared/          # Helpers visuales reutilizables
│   ├── sections/        # Secciones de marketing
│   └── layout/          # Header, footer, analytics
├── config/              # Configuración de marca y navegación
├── content/             # Catálogo editable de servicios, productos y portfolio
├── features/            # Módulos verticales de negocio
├── lib/                 # Utilidades, SEO y validaciones
├── server/              # Infraestructura: Prisma, Stripe, Resend, auth
└── emails/              # Plantillas email
```

La separación favorece una Clean Architecture práctica: la UI consume contenido y acciones; las acciones delegan en infraestructura; el dominio editable vive en `content`; los límites externos están encapsulados en `server`.

## Variables de entorno

Copia `.env.example` a `.env` y rellena:

```bash
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
DATABASE_URL="postgresql://user:password@localhost:5432/toxics"

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
CLERK_SECRET_KEY=""
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
ADMIN_EMAILS="javier@example.com"

STRIPE_SECRET_KEY=""
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""
STRIPE_WEBHOOK_SECRET=""

RESEND_API_KEY=""
RESEND_FROM_EMAIL="TOXICS <hello@toxics.dev>"
LEAD_NOTIFICATION_EMAIL="javier@example.com"

NEXT_PUBLIC_GA_ID=""
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=""
NEXT_PUBLIC_WHATSAPP_URL="https://wa.me/34600000000"
NEXT_PUBLIC_CONTACT_EMAIL="hola@toxics.dev"
NEXT_PUBLIC_CONTACT_PHONE="+34 600 000 000"
```

## Setup local

```bash
corepack prepare pnpm@latest --activate
corepack pnpm install
corepack pnpm prisma:generate
corepack pnpm prisma:migrate
corepack pnpm dev
```

## Base de datos

El esquema Prisma incluye:

- `Lead`: contactos del formulario, estado comercial y origen.
- `Service`: servicios gestionables para futura edición desde admin.
- `Order`: pedidos con estado, importe y referencias de Stripe.
- `OrderItem`: líneas de pedido con precio y cantidad.

## Stripe

El checkout se crea desde `src/actions/checkout.ts` y redirige a Stripe Checkout. Configura el webhook:

```txt
POST /api/stripe/webhook
```

Eventos recomendados:

- `checkout.session.completed`
- `checkout.session.expired`

## Clerk

`/admin` está protegida por middleware de Clerk. Además, `src/server/auth.ts` valida que el email principal del usuario esté incluido en `ADMIN_EMAILS`.

## Resend

El formulario de contacto guarda el lead en PostgreSQL y, si `RESEND_API_KEY` está configurado, envía notificación interna y confirmación al usuario.

## SEO

Incluye Metadata API, metadata dinámica para servicios, canonical URLs, `robots.txt`, `sitemap.xml`, Open Graph generado, Twitter Cards y JSON-LD para ProfessionalService y Service.

## Deploy en Vercel

1. Importa el repo en Vercel.
2. Añade las variables de entorno.
3. Conecta PostgreSQL gestionado.
4. Ejecuta migraciones con `corepack pnpm prisma:migrate` o en CI.
5. Configura el webhook de Stripe apuntando al dominio de producción.
6. Activa Analytics/Plausible si corresponde.
