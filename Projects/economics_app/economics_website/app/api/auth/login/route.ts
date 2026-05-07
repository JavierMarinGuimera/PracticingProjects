import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createSessionToken, sessionCookieOptions, toPublicUser, verifyPassword } from "@/lib/auth";
import { findUserByEmail } from "@/lib/data/store";
import { parseEmail } from "@/lib/validators";
import { SESSION_COOKIE } from "@/lib/constants";

export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string; password?: string };
  const email = parseEmail(body.email);

  if (!email || typeof body.password !== "string") {
    return NextResponse.json({ error: "Credenciales inválidas." }, { status: 400 });
  }

  const user = await findUserByEmail(email);
  if (!user || !verifyPassword(body.password, user.passwordHash)) {
    return NextResponse.json({ error: "Email o contraseña incorrectos." }, { status: 401 });
  }

  cookies().set(SESSION_COOKIE, createSessionToken(user.id), sessionCookieOptions());
  return NextResponse.json({ user: toPublicUser(user) });
}
