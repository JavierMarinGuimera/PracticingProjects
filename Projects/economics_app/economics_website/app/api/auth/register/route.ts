import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createSessionToken, hashPassword, sessionCookieOptions, toPublicUser } from "@/lib/auth";
import { createUser, findUserByEmail } from "@/lib/data/store";
import { parseEmail, parsePassword } from "@/lib/validators";
import { SESSION_COOKIE } from "@/lib/constants";

export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string; password?: string };
  const email = parseEmail(body.email);
  const password = parsePassword(body.password);

  if (!email || !password) {
    return NextResponse.json(
      { error: "Introduce un email válido y una contraseña de al menos 8 caracteres." },
      { status: 400 },
    );
  }

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return NextResponse.json({ error: "Ya existe una cuenta con este email." }, { status: 409 });
  }

  const user = await createUser({
    id: crypto.randomUUID(),
    email,
    passwordHash: hashPassword(password),
    createdAt: new Date().toISOString(),
    subscriptionStatus: "free",
  });

  cookies().set(SESSION_COOKIE, createSessionToken(user.id), sessionCookieOptions());
  return NextResponse.json({ user: toPublicUser(user) }, { status: 201 });
}
