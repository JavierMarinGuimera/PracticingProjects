from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime, timezone


@dataclass(frozen=True)
class FeedSource:
    name: str
    url: str


@dataclass
class InvestmentInsight:
    summary: str
    event: str
    impact: str
    opportunity: str
    sectors: list[str]
    asset_types: list[str]
    examples: list[str]
    horizon: str
    risks: list[str]


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
    investment_insight: InvestmentInsight | None = None

    @property
    def sort_date(self) -> datetime:
        if self.published_at.tzinfo is None:
            return self.published_at.replace(tzinfo=timezone.utc)
        return self.published_at
