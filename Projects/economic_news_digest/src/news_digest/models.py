from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime, timezone


@dataclass(frozen=True)
class FeedSource:
    name: str
    url: str


@dataclass
class Article:
    title: str
    description: str
    published_at: datetime
    link: str
    source: str
    relevance_score: int = 0
    matched_keywords: list[str] = field(default_factory=list)
    related_links: list[str] = field(default_factory=list)

    @property
    def sort_date(self) -> datetime:
        if self.published_at.tzinfo is None:
            return self.published_at.replace(tzinfo=timezone.utc)
        return self.published_at
