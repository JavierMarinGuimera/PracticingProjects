import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

const clerk = clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req)) {
    await auth.protect();
  }

  return NextResponse.next();
});

export default function middleware(req: NextRequest, event: NextFetchEvent) {
  const hasClerkKeys =
    Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) &&
    Boolean(process.env.CLERK_SECRET_KEY);

  if (!hasClerkKeys) {
    if (isAdminRoute(req)) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  }

  return clerk(req, event);
}

export const config = {
  matcher: ["/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)"]
};
