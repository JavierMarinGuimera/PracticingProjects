from __future__ import annotations

import smtplib
from datetime import datetime
from email.message import EmailMessage
from html import escape

from .config import EmailSettings
from .models import Article
from .processing import summarize_article


def build_email_html(articles: list[Article]) -> str:
    article_blocks = "\n".join(build_article_block(article) for article in articles)
    today = datetime.now().strftime("%Y-%m-%d")

    return f"""\
<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:#f5f7f8;font-family:Arial,sans-serif;color:#172026;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f7f8;padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="680" cellpadding="0" cellspacing="0" style="max-width:680px;background:#ffffff;border:1px solid #dde4e8;">
            <tr>
              <td style="padding:24px 28px;border-bottom:1px solid #dde4e8;">
                <h1 style="margin:0;font-size:22px;line-height:1.3;color:#172026;">Economic news digest</h1>
                <p style="margin:6px 0 0;color:#66757f;font-size:14px;">{today} &middot; {len(articles)} relevant stories</p>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 28px 24px;">
                {article_blocks}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
"""


def build_article_block(article: Article) -> str:
    keywords = ", ".join(escape(keyword) for keyword in article.matched_keywords) or "keyword match"
    related = ""
    if article.related_links:
        related = (
            f'<p style="margin:8px 0 0;color:#66757f;font-size:13px;">'
            f"Related sources: {len(article.related_links)}</p>"
        )

    return f"""\
<article style="padding:18px 0;border-bottom:1px solid #edf1f3;">
  <p style="margin:0 0 6px;color:#66757f;font-size:12px;text-transform:uppercase;">{escape(article.source)} &middot; score {article.relevance_score}</p>
  <h2 style="margin:0 0 8px;font-size:18px;line-height:1.35;color:#172026;">{escape(article.title)}</h2>
  <p style="margin:0 0 10px;font-size:14px;line-height:1.55;color:#34424b;">{escape(summarize_article(article))}</p>
  <p style="margin:0;font-size:14px;">
    <a href="{escape(article.link)}" style="color:#0b66c3;text-decoration:none;">Read article</a>
    <span style="color:#9aa6ad;"> &middot; {keywords}</span>
  </p>
  {related}
</article>
"""


def send_email(settings: EmailSettings, subject: str, html_body: str) -> None:
    validate_email_settings(settings)

    message = EmailMessage()
    message["Subject"] = subject
    message["From"] = settings.from_address
    message["To"] = settings.to_address
    message.set_content("Your email client does not support HTML. Please open this digest in an HTML-capable client.")
    message.add_alternative(html_body, subtype="html")

    with smtplib.SMTP(settings.smtp_host, settings.smtp_port, timeout=30) as smtp:
        smtp.starttls()
        smtp.login(settings.username, settings.password)
        smtp.send_message(message)


def validate_email_settings(settings: EmailSettings) -> None:
    missing = [
        name
        for name, value in {
            "SMTP_HOST": settings.smtp_host,
            "SMTP_USERNAME": settings.username,
            "SMTP_PASSWORD": settings.password,
            "EMAIL_FROM": settings.from_address,
            "EMAIL_TO": settings.to_address,
        }.items()
        if not value
    ]

    if missing:
        raise ValueError(f"Missing email configuration: {', '.join(missing)}")
