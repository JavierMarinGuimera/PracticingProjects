import type { PythonNewsPayload } from "@/lib/types";
import { readDb } from "@/lib/data/store";

export async function fetchPythonAnalyzedNews(): Promise<PythonNewsPayload> {
  const endpoint = process.env.PYTHON_NEWS_API_URL;

  if (endpoint) {
    const response = await fetch(endpoint, { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Python news API failed");
    }
    return response.json() as Promise<PythonNewsPayload>;
  }

  const db = await readDb();
  const latestDate = db.news.map((item) => item.date).sort().at(-1);
  return db.news
    .filter((item) => item.date === latestDate)
    .map((item) => ({
      title: item.title,
      summary: item.summary,
      impact: item.impact,
      investmentInsight: item.investmentInsight,
      horizon: item.horizon,
    }));
}
