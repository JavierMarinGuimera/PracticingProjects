from __future__ import annotations

import re
from urllib.parse import parse_qsl, urlencode, urlsplit, urlunsplit

from .models import Article


HIGH_IMPACT_TERMS = {
    "inflation",
    "interest rates",
    "central bank",
    "recession",
    "war",
    "sanctions",
    "monetary policy",
    "tariffs",
}


def deduplicate_articles(articles: list[Article]) -> list[Article]:
    seen_urls: set[str] = set()
    seen_titles: set[str] = set()
    unique: list[Article] = []

    for article in articles:
        url_key = canonical_url(article.link)
        title_key = normalize_title(article.title)
        if url_key in seen_urls or title_key in seen_titles:
            continue

        seen_urls.add(url_key)
        seen_titles.add(title_key)
        unique.append(article)

    return unique


def filter_relevant_articles(
    articles: list[Article],
    keywords: list[str],
    min_score: int,
) -> list[Article]:
    relevant_articles: list[Article] = []

    for article in articles:
        score, matched_keywords = score_article(article, keywords)
        if score >= min_score:
            article.relevance_score = score
            article.matched_keywords = matched_keywords
            relevant_articles.append(article)

    return relevant_articles


def score_article(article: Article, keywords: list[str]) -> tuple[int, list[str]]:
    haystack = f"{article.title} {article.description}".lower()
    matched_keywords: list[str] = []
    score = 0

    for keyword in keywords:
        keyword_lower = keyword.lower()
        if keyword_lower in haystack:
            matched_keywords.append(keyword)
            score += 2 if keyword_lower in HIGH_IMPACT_TERMS else 1

    # A tiny NLP-like boost: stories with economic entities plus market movement words
    # tend to be more useful in a daily finance brief.
    if re.search(r"\b(fed|ecb|bank of england|treasury|opec|imf|world bank)\b", haystack):
        score += 1
    if re.search(r"\b(rises?|falls?|cuts?|hikes?|slows?|surges?|drops?|yields?)\b", haystack):
        score += 1

    return score, matched_keywords


def canonical_url(url: str) -> str:
    parts = urlsplit(url.strip())
    query = [
        (key, value)
        for key, value in parse_qsl(parts.query, keep_blank_values=True)
        if not key.lower().startswith("utm_")
    ]
    return urlunsplit(
        (
            parts.scheme.lower(),
            parts.netloc.lower(),
            parts.path.rstrip("/"),
            urlencode(query),
            "",
        )
    )


def normalize_title(title: str) -> str:
    return re.sub(r"[^a-z0-9]+", " ", title.lower()).strip()
