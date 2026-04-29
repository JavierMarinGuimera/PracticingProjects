from __future__ import annotations

import os
from dataclasses import dataclass
from pathlib import Path

from .models import FeedSource


DEFAULT_KEYWORDS = [
    "IPO",
    "inflation",
    "interest rates",
    "central bank",
    "war",
    "sanctions",
    "economy",
    "recession",
    "fed",
    "ecb",
    "monetary policy",
    "tariffs",
    "oil prices",
    "bond yields",
]

DEFAULT_FEEDS = [
    FeedSource("Bloomberg Markets", "https://feeds.bloomberg.com/markets/news.rss"),
    FeedSource("Bloomberg Economics", "https://feeds.bloomberg.com/economics/news.rss"),
    FeedSource("Financial Times Markets", "https://www.ft.com/markets?format=rss"),
    FeedSource("CNBC Economy", "https://www.cnbc.com/id/20910258/device/rss/rss.html"),
    FeedSource("MarketWatch Top Stories", "http://feeds.marketwatch.com/marketwatch/topstories/"),
    FeedSource("NYTimes Business", "https://rss.nytimes.com/services/xml/rss/nyt/Business.xml"),
    FeedSource("The Guardian Business", "https://www.theguardian.com/business/rss"),
    FeedSource("Yahoo Finance", "https://finance.yahoo.com/news/rssindex"),
]


@dataclass(frozen=True)
class EmailSettings:
    smtp_host: str
    smtp_port: int
    username: str
    password: str
    from_address: str
    to_address: str


@dataclass(frozen=True)
class Settings:
    feeds: list[FeedSource]
    keywords: list[str]
    max_news: int
    min_relevance_score: int
    dry_run: bool
    email: EmailSettings


def load_settings(env_path: str | Path = ".env") -> Settings:
    load_env_file(env_path)

    return Settings(
        feeds=parse_feeds(os.getenv("RSS_FEEDS")),
        keywords=parse_list(os.getenv("KEYWORDS"), DEFAULT_KEYWORDS),
        max_news=parse_int("MAX_NEWS", 8),
        min_relevance_score=parse_int("MIN_RELEVANCE_SCORE", 2),
        dry_run=parse_bool(os.getenv("DRY_RUN", "true")),
        email=EmailSettings(
            smtp_host=os.getenv("SMTP_HOST", ""),
            smtp_port=parse_int("SMTP_PORT", 587),
            username=os.getenv("SMTP_USERNAME", ""),
            password=os.getenv("SMTP_PASSWORD", ""),
            from_address=os.getenv("EMAIL_FROM", os.getenv("SMTP_USERNAME", "")),
            to_address=os.getenv("EMAIL_TO", ""),
        ),
    )


def load_env_file(path: str | Path) -> None:
    env_file = Path(path)
    if not env_file.exists():
        return

    for raw_line in env_file.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue

        key, value = line.split("=", 1)
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        os.environ.setdefault(key, value)


def parse_feeds(raw_feeds: str | None) -> list[FeedSource]:
    if not raw_feeds:
        return DEFAULT_FEEDS

    feeds: list[FeedSource] = []
    for item in raw_feeds.split(";"):
        if not item.strip():
            continue
        if "|" not in item:
            raise ValueError(f"Invalid RSS_FEEDS item: {item!r}. Expected 'Name|URL'.")

        name, url = item.split("|", 1)
        feeds.append(FeedSource(name=name.strip(), url=url.strip()))

    return feeds or DEFAULT_FEEDS


def parse_list(raw_value: str | None, default: list[str]) -> list[str]:
    if not raw_value:
        return default
    values = [item.strip() for item in raw_value.split(",") if item.strip()]
    return values or default


def parse_bool(raw_value: str) -> bool:
    return raw_value.strip().lower() in {"1", "true", "yes", "y", "on"}


def parse_int(name: str, default: int) -> int:
    raw_value = os.getenv(name)
    if raw_value is None or raw_value.strip() == "":
        return default

    try:
        return int(raw_value)
    except ValueError as exc:
        raise ValueError(f"{name} must be an integer.") from exc
