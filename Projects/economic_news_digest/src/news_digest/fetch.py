from __future__ import annotations

import logging
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime
from html import unescape
from re import sub
from urllib.request import Request, urlopen

import feedparser

from .models import Article, FeedSource


def fetch_all_feeds(feeds: list[FeedSource]) -> list[Article]:
    articles: list[Article] = []

    for feed in feeds:
        try:
            articles.extend(fetch_feed(feed))
        except Exception:
            logging.exception("Failed to fetch feed '%s' from %s", feed.name, feed.url)

    return articles


def fetch_feed(feed: FeedSource) -> list[Article]:
    raw_feed = download_feed(feed.url)
    parsed_feed = feedparser.parse(raw_feed)

    if parsed_feed.bozo:
        logging.warning("Feed '%s' returned a parse warning: %s", feed.name, parsed_feed.bozo_exception)

    articles: list[Article] = []
    for entry in parsed_feed.entries:
        title = clean_text(entry.get("title", ""))
        description = clean_text(
            entry.get("summary")
            or entry.get("description")
            or entry.get("subtitle")
            or ""
        )
        link = entry.get("link", "").strip()

        if not title or not link:
            continue

        articles.append(
            Article(
                title=title,
                description=description,
                published_at=parse_entry_date(entry),
                link=link,
                source=feed.name,
            )
        )

    logging.info("Fetched %s articles from %s.", len(articles), feed.name)
    return articles


def download_feed(url: str, timeout: int = 20) -> bytes:
    request = Request(
        url,
        headers={
            "User-Agent": "economic-news-digest/1.0 (+https://example.local)",
            "Accept": "application/rss+xml, application/xml, text/xml, */*",
        },
    )

    with urlopen(request, timeout=timeout) as response:
        return response.read()


def parse_entry_date(entry: dict) -> datetime:
    published = entry.get("published") or entry.get("updated") or entry.get("created")

    if published:
        try:
            parsed = parsedate_to_datetime(published)
            if parsed.tzinfo is None:
                return parsed.replace(tzinfo=timezone.utc)
            return parsed
        except (TypeError, ValueError):
            pass

    parsed_struct = entry.get("published_parsed") or entry.get("updated_parsed")
    if parsed_struct:
        return datetime(*parsed_struct[:6], tzinfo=timezone.utc)

    return datetime.now(timezone.utc)


def clean_text(value: str) -> str:
    without_tags = sub(r"<[^>]+>", " ", value)
    normalized = sub(r"\s+", " ", without_tags)
    return unescape(normalized).strip()
