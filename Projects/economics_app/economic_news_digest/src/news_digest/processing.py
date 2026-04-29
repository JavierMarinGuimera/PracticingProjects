from __future__ import annotations

import re
from collections import defaultdict

from .models import Article


STOP_WORDS = {
    "about",
    "after",
    "against",
    "from",
    "into",
    "more",
    "over",
    "that",
    "the",
    "their",
    "this",
    "with",
    "will",
    "would",
}


def group_similar_articles(articles: list[Article]) -> list[Article]:
    grouped: dict[str, list[Article]] = defaultdict(list)

    for article in articles:
        grouped[topic_key(article.title)].append(article)

    merged_articles: list[Article] = []
    for group in grouped.values():
        group.sort(key=lambda item: (item.relevance_score, item.sort_date), reverse=True)
        main_article = group[0]
        main_article.related_links = [
            article.link for article in group[1:] if article.link != main_article.link
        ]
        merged_articles.append(main_article)

    return merged_articles


def select_top_articles(articles: list[Article], limit: int) -> list[Article]:
    ranked = sorted(
        articles,
        key=lambda article: (article.relevance_score, article.sort_date),
        reverse=True,
    )
    return ranked[:limit]


def summarize_article(article: Article, max_chars: int = 260) -> str:
    base_text = article.description or article.title
    cleaned = re.sub(r"\s+", " ", base_text).strip()

    if len(cleaned) <= max_chars:
        return cleaned

    shortened = cleaned[: max_chars - 1].rsplit(" ", 1)[0]
    return f"{shortened}..."


def topic_key(title: str) -> str:
    tokens = [
        token
        for token in re.findall(r"[a-z0-9]+", title.lower())
        if len(token) > 3 and token not in STOP_WORDS
    ]
    if not tokens:
        return title.lower().strip()
    return " ".join(tokens[:5])
