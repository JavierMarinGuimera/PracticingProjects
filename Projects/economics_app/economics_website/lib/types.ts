export type Horizon = "short-term" | "medium-term" | "long-term";
export type SubscriptionStatus = "free" | "active" | "past_due" | "canceled";

export type User = {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  subscriptionStatus: SubscriptionStatus;
  stripeCustomerId?: string;
};

export type PublicUser = {
  id: string;
  email: string;
  createdAt: string;
  subscriptionStatus: SubscriptionStatus;
};

export type NewsItem = {
  id: string;
  date: string;
  title: string;
  summary: string;
  impact: string;
  investmentInsight: string;
  horizon: Horizon;
  source: string;
  publishedAt: string;
  detailedAnalysis: string;
  sectors: string[];
  assetTypes: string[];
  riskLevel: "low" | "medium" | "high";
};

export type Subscription = {
  id: string;
  userId: string;
  status: SubscriptionStatus;
  plan: "monthly";
  currentPeriodEnd?: string;
  stripeSubscriptionId?: string;
  createdAt: string;
};

export type AppDatabase = {
  users: User[];
  news: NewsItem[];
  subscriptions: Subscription[];
};

export type PythonNewsPayload = Array<{
  title: string;
  summary: string;
  impact: string;
  investmentInsight: string;
  horizon: Horizon;
}>;
