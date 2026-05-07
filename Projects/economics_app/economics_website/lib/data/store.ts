import { promises as fs } from "node:fs";
import path from "node:path";
import type { AppDatabase, NewsItem, Subscription, User } from "@/lib/types";

const dbPath = path.join(process.cwd(), "data", "db.json");

async function ensureDatabase() {
  try {
    await fs.access(dbPath);
  } catch {
    await fs.mkdir(path.dirname(dbPath), { recursive: true });
    await fs.writeFile(
      dbPath,
      JSON.stringify({ users: [], subscriptions: [], news: [] }, null, 2),
      "utf8",
    );
  }
}

export async function readDb(): Promise<AppDatabase> {
  await ensureDatabase();
  const raw = await fs.readFile(dbPath, "utf8");
  return JSON.parse(raw) as AppDatabase;
}

export async function writeDb(db: AppDatabase) {
  await fs.writeFile(dbPath, JSON.stringify(db, null, 2), "utf8");
}

export async function findUserByEmail(email: string): Promise<User | undefined> {
  const db = await readDb();
  return db.users.find((user) => user.email.toLowerCase() === email.toLowerCase());
}

export async function findUserById(id: string): Promise<User | undefined> {
  const db = await readDb();
  return db.users.find((user) => user.id === id);
}

export async function createUser(user: User): Promise<User> {
  const db = await readDb();
  db.users.push(user);
  db.subscriptions.push({
    id: crypto.randomUUID(),
    userId: user.id,
    status: "free",
    plan: "monthly",
    createdAt: new Date().toISOString(),
  });
  await writeDb(db);
  return user;
}

export async function updateSubscription(
  userId: string,
  status: User["subscriptionStatus"],
  stripeSubscriptionId?: string,
): Promise<User | undefined> {
  const db = await readDb();
  const user = db.users.find((item) => item.id === userId);
  if (!user) {
    return undefined;
  }

  user.subscriptionStatus = status;
  const currentPeriodEnd = new Date();
  currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + 1);

  const existing = db.subscriptions.find((item) => item.userId === userId);
  const nextSubscription: Subscription = {
    id: existing?.id ?? crypto.randomUUID(),
    userId,
    status,
    plan: "monthly",
    currentPeriodEnd: currentPeriodEnd.toISOString(),
    stripeSubscriptionId: stripeSubscriptionId ?? existing?.stripeSubscriptionId,
    createdAt: existing?.createdAt ?? new Date().toISOString(),
  };

  db.subscriptions = [
    ...db.subscriptions.filter((item) => item.userId !== userId),
    nextSubscription,
  ];
  await writeDb(db);
  return user;
}

export async function getNewsByDate(date: string): Promise<NewsItem[]> {
  const db = await readDb();
  return db.news
    .filter((item) => item.date === date)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getLatestNewsDate(): Promise<string | undefined> {
  const db = await readDb();
  return db.news.map((item) => item.date).sort().at(-1);
}

export async function getNewsDates(): Promise<string[]> {
  const db = await readDb();
  return Array.from(new Set(db.news.map((item) => item.date))).sort().reverse();
}

export async function getNewsById(id: string): Promise<NewsItem | undefined> {
  const db = await readDb();
  return db.news.find((item) => item.id === id);
}
