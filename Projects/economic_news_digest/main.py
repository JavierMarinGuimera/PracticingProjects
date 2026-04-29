from __future__ import annotations

import logging

from src.news_digest.config import load_settings
from src.news_digest.emailer import build_email_html, send_email
from src.news_digest.fetch import fetch_all_feeds
from src.news_digest.filtering import deduplicate_articles, filter_relevant_articles
from src.news_digest.processing import group_similar_articles, select_top_articles


logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s",
)


def main() -> None:
    settings = load_settings()

    logging.info("Fetching RSS feeds...")
    articles = fetch_all_feeds(settings.feeds)
    logging.info("Fetched %s articles.", len(articles))

    unique_articles = deduplicate_articles(articles)
    relevant_articles = filter_relevant_articles(
        unique_articles,
        keywords=settings.keywords,
        min_score=settings.min_relevance_score,
    )
    grouped_articles = group_similar_articles(relevant_articles)
    top_articles = select_top_articles(grouped_articles, limit=settings.max_news)

    if not top_articles:
        logging.info("No relevant economic news found. Email will not be sent.")
        return

    subject = f"Economic news digest: {len(top_articles)} relevant stories"
    html_body = build_email_html(top_articles)

    if settings.dry_run:
        logging.info("DRY_RUN is enabled. Email preview:")
        print(f"Subject: {subject}\n")
        print(html_body)
        return

    send_email(settings.email, subject, html_body)
    logging.info("Digest sent to %s.", settings.email.to_address)


if __name__ == "__main__":
    main()
