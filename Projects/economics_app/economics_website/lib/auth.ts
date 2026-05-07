import { pbkdf2Sync, randomBytes, timingSafeEqual, createHmac } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { PublicUser, User } from "@/lib/types";
import { findUserById } from "@/lib/data/store";
import { SESSION_COOKIE } from "@/lib/constants";

export { SESSION_COOKIE };

const tokenTtlSeconds = 60 * 60 * 24 * 7;

function getJwtSecret() {
  return process.env.JWT_SECRET ?? "dev-only-change-me-market-pulse-ai";
}

function base64Url(input: Buffer | string) {
  return Buffer.from(input).toString("base64url");
}

function signPayload(payload: string) {
  return createHmac("sha256", getJwtSecret()).update(payload).digest("base64url");
}

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = pbkdf2Sync(password, salt, 120000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string) {
  const [salt, hash] = storedHash.split(":");
  if (!salt || !hash) {
    return false;
  }

  const candidate = pbkdf2Sync(password, salt, 120000, 64, "sha512");
  const expected = Buffer.from(hash, "hex");
  return expected.length === candidate.length && timingSafeEqual(expected, candidate);
}

export function createSessionToken(userId: string) {
  const header = base64Url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = base64Url(
    JSON.stringify({
      sub: userId,
      exp: Math.floor(Date.now() / 1000) + tokenTtlSeconds,
    }),
  );
  const signature = signPayload(`${header}.${payload}`);
  return `${header}.${payload}.${signature}`;
}

export function verifySessionToken(token?: string): string | null {
  if (!token) {
    return null;
  }

  const [header, payload, signature] = token.split(".");
  if (!header || !payload || !signature) {
    return null;
  }

  const expectedSignature = signPayload(`${header}.${payload}`);
  if (signature.length !== expectedSignature.length) {
    return null;
  }

  const validSignature = timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
  if (!validSignature) {
    return null;
  }

  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      sub?: string;
      exp?: number;
    };
    if (!parsed.sub || !parsed.exp || parsed.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    return parsed.sub;
  } catch {
    return null;
  }
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    maxAge: tokenTtlSeconds,
    path: "/",
  };
}

export function toPublicUser(user: User): PublicUser {
  return {
    id: user.id,
    email: user.email,
    createdAt: user.createdAt,
    subscriptionStatus: user.subscriptionStatus,
  };
}

export async function getSessionUser(): Promise<User | null> {
  const token = cookies().get(SESSION_COOKIE)?.value;
  const userId = verifySessionToken(token);
  if (!userId) {
    return null;
  }

  return (await findUserById(userId)) ?? null;
}

export async function requireSessionUser(): Promise<User> {
  const user = await getSessionUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}

export function isSubscribed(user: User | PublicUser) {
  return user.subscriptionStatus === "active";
}
