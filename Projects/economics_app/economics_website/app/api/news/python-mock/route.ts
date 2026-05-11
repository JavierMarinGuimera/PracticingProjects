import { NextResponse } from "next/server";
import { fetchPythonAnalyzedNews } from "@/lib/python-news";

export async function GET() {
  const news = await fetchPythonAnalyzedNews();
  return NextResponse.json(news);
}
