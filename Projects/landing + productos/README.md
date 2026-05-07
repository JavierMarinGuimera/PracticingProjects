# your_site Company Catalog Website

Modern company presentation and product catalog template built with Next.js, TypeScript, TailwindCSS, Framer Motion, and Lucide React.

This is intentionally not an ecommerce website. There is no cart, checkout, payment flow, login, or backend. Customers contact the company by phone, WhatsApp, or the request form, which opens a prepared WhatsApp inquiry.

## Tech Stack

- Next.js App Router
- TypeScript
- TailwindCSS
- Framer Motion
- Lucide React
- `next/image` with optimized remote images

## Project Structure

```txt
src/
  app/                 Routes, metadata, global layout, global styles
  components/layout/   Navbar, mobile menu, footer
  components/sections/ Page sections and catalog experience
  components/ui/       Reusable primitives
  config/              Site and navigation config
  data/                Replaceable company, category, and product data
  lib/                 SEO, contact, and utility helpers
  types/               Shared TypeScript types
```

The architecture keeps content in `data/` and `config/` so future clients can reuse the template without rewriting components.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Customize The Template

- Company details: edit `src/data/company.ts`
- Logo text and site metadata: edit `src/config/site.ts`
- Navigation links: edit `src/config/navigation.ts`
- Product categories: edit `src/data/categories.ts`
- Products: edit `src/data/products.ts`
- Theme colors and global behavior: edit `src/app/globals.css`

## Add More Products

Add a new object to `src/data/products.ts`:

```ts
{
  id: "new-product-id",
  title: "New Product Name",
  category: "Automation",
  description: "Short, sales-ready product description.",
  image: "https://images.unsplash.com/...",
  imageAlt: "Clear description of the product image.",
}
```

If you add a new category, also add it to `src/data/categories.ts` and to the `ProductCategory` type in `src/types/product.ts`.

## Contact Form

The request form does not require a backend. On submit, it builds a structured WhatsApp message and opens the customer conversation.

For a production CRM or email workflow, replace `ContactForm.tsx` with a provider such as HubSpot, Formspree, Resend, or a custom Next.js API route.

## Build

```bash
npm run lint
npm run build
```

## Deploy To Vercel

1. Push this project to GitHub.
2. Import the repository in Vercel.
3. Keep the default Next.js framework settings.
4. Deploy.

No environment variables are required unless you connect a real backend form or CRM provider later.
