import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="bg-neutral-50 py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
            404
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-neutral-950">
            Page not found
          </h1>
          <p className="mt-4 text-neutral-600">
            The page you are looking for is not available in this catalog template.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-neutral-950 px-5 text-sm font-semibold text-white transition hover:bg-cyan-700"
          >
            Back to home
          </Link>
        </div>
      </Container>
    </section>
  );
}
