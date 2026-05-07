# Market Pulse AI

MVP SaaS en Next.js para un producto de suscripción basado en noticias financieras analizadas con IA.

## Stack

- Next.js App Router + React
- Tailwind CSS
- API routes en Next.js
- Auth con JWT firmado y cookie HTTP-only
- Persistencia local en `data/db.json` como alternativa simple a PostgreSQL
- Stripe Checkout por REST, con modo mock si no hay claves
- Endpoint mock para integrar una app Python de noticias

## Arranque

```powershell
cd Projects\economics_app\economics_website
Copy-Item .env.example .env
npm.cmd install
npm.cmd run dev
```

Abre `http://localhost:3000`.

## Variables

```env
JWT_SECRET=change-this-long-random-secret
NEXT_PUBLIC_APP_URL=http://localhost:3000

PYTHON_NEWS_API_URL=

STRIPE_SECRET_KEY=
STRIPE_PRICE_ID=
STRIPE_WEBHOOK_SECRET=
```

Si `STRIPE_SECRET_KEY` y `STRIPE_PRICE_ID` están vacías, el botón de pago activa una suscripción mock para validar el flujo completo.

Si `PYTHON_NEWS_API_URL` está vacío, `/api/news/python-mock` devuelve noticias desde `data/db.json` con este formato:

```json
[
  {
    "title": "Example news",
    "summary": "Short summary",
    "impact": "Economic impact",
    "investmentInsight": "Possible opportunity",
    "horizon": "short-term"
  }
]
```

## Rutas

- `/` landing page
- `/register` registro
- `/login` login
- `/dashboard` feed diario protegido
- `/history` historial por fecha protegido
- `/news/[id]` detalle protegido
- `/pricing` suscripción protegida
- `/profile` perfil protegido

## Estructura

- `app/api/auth/*`: registro, login, logout y sesión actual
- `app/api/stripe/*`: checkout y webhook base
- `app/api/news/python-mock`: contrato mock para la app Python
- `lib/auth.ts`: hash de password, JWT y lectura de sesión
- `lib/data/store.ts`: capa de persistencia local
- `lib/python-news.ts`: función de consumo de la API Python
- `components/*`: UI reutilizable

## Siguiente paso natural

Para escalar a PostgreSQL, reemplaza `lib/data/store.ts` por Prisma, Drizzle o SQL directo manteniendo las mismas funciones públicas. Las páginas y API routes ya dependen de esa capa, no del formato JSON.
