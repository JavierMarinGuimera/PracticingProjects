# Economic News Digest

Small Python app that fetches economic news from RSS feeds, filters relevant stories, groups similar items, and sends a clean HTML email digest.

## What it does

- Fetches RSS entries with `feedparser`.
- Extracts title, description, date, link, and source.
- Removes duplicates by canonical URL.
- Scores relevance using economic keywords and a small rule-based NLP boost.
- Groups similar headlines and keeps the 5-10 strongest items.
- Adds market impact notes with sectors, asset types, examples, horizon, and risks.
- Sends an HTML email with `smtplib`.
- Reads configuration from environment variables or a local `.env` file.

The investment notes are informational and orientation-only. They are not financial advice or direct buy/sell recommendations.

## Default RSS sources

The default list includes Bloomberg Markets, Bloomberg Economics, Financial Times Markets, CNBC Economy, MarketWatch, NYTimes Business, The Guardian Business, and Yahoo Finance. RSS availability can change, so the feed list is fully configurable through `RSS_FEEDS`.

Reuters no longer offers broad official public RSS feeds, so it is better to add a licensed/provider feed or a trusted RSS generator URL if you have one.

## Setup

```powershell
cd economic_news_digest
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
```

Edit `.env` with your SMTP credentials and recipient.

For Gmail, use an app password instead of your normal account password.

## Run

Start in dry-run mode:

```powershell
python main.py
```

When the preview looks good, set this in `.env`:

```env
DRY_RUN=false
```

Then run again:

```powershell
python main.py
```

## Daily automation

Use Windows Task Scheduler with:

- Program: `C:\Users\marin\Desktop\Programming\PracticingProjects\economic_news_digest\.venv\Scripts\python.exe`
- Arguments: `main.py`
- Start in: `C:\Users\marin\Desktop\Programming\PracticingProjects\economic_news_digest`

## Custom feeds

Use semicolon-separated `Name|URL` pairs:

```env
RSS_FEEDS=Bloomberg Markets|https://feeds.bloomberg.com/markets/news.rss;CNBC Economy|https://www.cnbc.com/id/20910258/device/rss/rss.html
```

## Custom keywords

```env
KEYWORDS=IPO,inflation,interest rates,central bank,war,sanctions,economy,recession
```
