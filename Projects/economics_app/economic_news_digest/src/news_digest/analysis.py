from __future__ import annotations

from .models import Article, InvestmentInsight
from .processing import summarize_article


def add_investment_insights(articles: list[Article]) -> list[Article]:
    for article in articles:
        article.investment_insight = analyze_article(article)
    return articles


def analyze_article(article: Article) -> InvestmentInsight:
    text = f"{article.title} {article.description} {' '.join(article.matched_keywords)}".lower()

    if any(term in text for term in ["interest rates", "central bank", "fed", "ecb", "monetary policy", "bond yields"]):
        return build_rates_insight(article)
    if any(term in text for term in ["inflation", "consumer prices", "price growth", "cpi"]):
        return build_inflation_insight(article)
    if any(term in text for term in ["war", "sanctions", "oil prices", "opec", "geopolitical"]):
        return build_geopolitical_insight(article)
    if any(term in text for term in ["recession", "economy", "gdp", "slowdown", "unemployment"]):
        return build_macro_cycle_insight(article)
    if any(term in text for term in ["ipo", "listing", "public offering"]):
        return build_ipo_insight(article)
    if any(term in text for term in ["tariffs", "trade", "exports", "imports", "supply chain"]):
        return build_trade_insight(article)

    return build_general_insight(article)


def build_rates_insight(article: Article) -> InvestmentInsight:
    return InvestmentInsight(
        summary=summarize_article(article),
        event="La noticia apunta a cambios o expectativas sobre tipos de interes, bancos centrales o rentabilidad de bonos.",
        impact=(
            "Los movimientos de tipos pueden afectar al coste de financiacion, valoraciones de acciones, credito, "
            "divisas y sensibilidad de los bonos."
        ),
        opportunity=(
            "Podria favorecer de forma selectiva a bancos si mejora el margen financiero, o a tecnologia y activos "
            "de crecimiento si el mercado anticipa tipos mas bajos. La reaccion dependera del tono de los bancos centrales."
        ),
        sectors=["Banca", "Tecnologia", "Inmobiliario", "Utilities", "Consumo discrecional"],
        asset_types=["Acciones", "ETFs / fondos indexados", "Indices", "Bonos"],
        examples=["XLF", "KBE", "QQQ", "XLK", "TLT", "S&P 500", "Nasdaq 100", "JPMorgan Chase", "Microsoft"],
        horizon="Corto a medio plazo",
        risks=[
            "Una inflacion persistente podria retrasar bajadas de tipos o provocar nuevas subidas.",
            "El mercado podria haber descontado ya el escenario principal.",
            "Datos de empleo, IPC o mensajes de bancos centrales podrian cambiar rapidamente la lectura.",
        ],
    )


def build_inflation_insight(article: Article) -> InvestmentInsight:
    return InvestmentInsight(
        summary=summarize_article(article),
        event="La noticia esta relacionada con presiones inflacionistas o cambios en precios al consumo, energia o salarios.",
        impact=(
            "La inflacion condiciona la politica monetaria, los margenes empresariales, el poder adquisitivo y las "
            "valoraciones de activos sensibles a tipos."
        ),
        opportunity=(
            "Podria apoyar sectores con poder de fijacion de precios, energia o materias primas en determinados escenarios. "
            "Si la inflacion se modera, tambien podria beneficiar a indices de crecimiento y bonos de mayor duracion."
        ),
        sectors=["Energia", "Consumo basico", "Materiales", "Tecnologia", "Retail"],
        asset_types=["Acciones", "ETFs / fondos indexados", "Indices", "Bonos ligados a inflacion"],
        examples=["XLE", "XLP", "XLB", "QQQ", "TIP", "S&P 500", "Exxon Mobil", "Procter & Gamble"],
        horizon="Corto a medio plazo",
        risks=[
            "Un repunte inesperado de precios podria presionar margenes y valoraciones.",
            "Los bancos centrales podrian mantener politicas restrictivas mas tiempo del esperado.",
            "Los precios de energia y salarios pueden alterar el escenario base.",
        ],
    )


def build_geopolitical_insight(article: Article) -> InvestmentInsight:
    return InvestmentInsight(
        summary=summarize_article(article),
        event="La noticia refleja tensiones geopoliticas, conflicto, sanciones o riesgo sobre suministros estrategicos.",
        impact=(
            "Estos eventos pueden elevar la volatilidad, afectar cadenas de suministro, energia, defensa, divisas y "
            "flujos hacia activos considerados defensivos."
        ),
        opportunity=(
            "Podria beneficiar a energia, defensa o materias primas si aumentan los riesgos de suministro. Tambien podria "
            "impulsar demanda de activos defensivos, aunque el efecto puede ser rapido y dificil de sostener."
        ),
        sectors=["Energia", "Defensa", "Materiales", "Transporte", "Industriales"],
        asset_types=["Acciones", "ETFs / fondos indexados", "Indices", "Materias primas"],
        examples=["XLE", "ITA", "XLI", "GLD", "USO", "Brent", "Lockheed Martin", "Chevron"],
        horizon="Corto plazo, con posibles efectos a medio plazo",
        risks=[
            "Una desescalada podria revertir rapidamente movimientos en energia o defensa.",
            "Sanciones adicionales pueden crear impactos de segunda ronda dificiles de estimar.",
            "La liquidez y la volatilidad pueden distorsionar precios en el corto plazo.",
        ],
    )


def build_macro_cycle_insight(article: Article) -> InvestmentInsight:
    return InvestmentInsight(
        summary=summarize_article(article),
        event="La noticia trata sobre crecimiento economico, riesgo de recesion, empleo, PIB o ciclo macroeconomico.",
        impact=(
            "El ciclo economico influye en beneficios empresariales, apetito por riesgo, credito, indices bursatiles y "
            "rotacion entre sectores ciclicos y defensivos."
        ),
        opportunity=(
            "Si los datos mejoran, sectores ciclicos e indices amplios podrian verse apoyados. Si aumenta el riesgo de "
            "recesion, el mercado podria favorecer sectores defensivos, calidad y bonos."
        ),
        sectors=["Industriales", "Consumo discrecional", "Banca", "Salud", "Consumo basico"],
        asset_types=["Acciones", "ETFs / fondos indexados", "Indices", "Bonos"],
        examples=["SPY", "DIA", "IWM", "XLI", "XLY", "XLV", "XLP", "HYG", "S&P 500"],
        horizon="Medio plazo",
        risks=[
            "Los datos macro suelen revisarse y pueden enviar señales contradictorias.",
            "La reaccion del mercado depende de expectativas previas, no solo del dato publicado.",
            "Un deterioro del credito o empleo podria ampliar el impacto negativo.",
        ],
    )


def build_ipo_insight(article: Article) -> InvestmentInsight:
    return InvestmentInsight(
        summary=summarize_article(article),
        event="La noticia esta relacionada con una salida a bolsa, valoracion de mercado privado o actividad de nuevas cotizadas.",
        impact=(
            "La actividad de IPOs puede indicar apetito por riesgo, condiciones de liquidez y valoraciones en sectores de "
            "crecimiento o tecnologia."
        ),
        opportunity=(
            "Podria senalar una mejora del sentimiento hacia empresas de crecimiento o tecnologia. ETFs de small caps, "
            "tecnologia o IPOs podrian verse influidos de forma orientativa por el tono del mercado."
        ),
        sectors=["Tecnologia", "Fintech", "Consumo digital", "Small caps", "Capital riesgo"],
        asset_types=["Acciones", "ETFs / fondos indexados", "Indices"],
        examples=["IPO", "QQQ", "ARKK", "IWM", "Renaissance IPO ETF", "Nasdaq 100"],
        horizon="Corto a medio plazo",
        risks=[
            "Las IPOs pueden tener alta volatilidad y poca visibilidad de resultados.",
            "Valoraciones exigentes pueden corregir si cambian tipos o apetito por riesgo.",
            "Lock-ups, baja liquidez o resultados trimestrales pueden alterar el escenario.",
        ],
    )


def build_trade_insight(article: Article) -> InvestmentInsight:
    return InvestmentInsight(
        summary=summarize_article(article),
        event="La noticia afecta comercio internacional, aranceles, exportaciones, importaciones o cadenas de suministro.",
        impact=(
            "Cambios comerciales pueden afectar costes, margenes, inflacion importada, divisas y competitividad de empresas "
            "con exposicion global."
        ),
        opportunity=(
            "Podria favorecer empresas con produccion local o cadenas de suministro diversificadas. Tambien podria afectar "
            "a industriales, semiconductores, automocion y consumo dependiendo del alcance de las medidas."
        ),
        sectors=["Industriales", "Semiconductores", "Automocion", "Retail", "Materiales"],
        asset_types=["Acciones", "ETFs / fondos indexados", "Indices"],
        examples=["XLI", "SMH", "XLY", "EFA", "EWJ", "S&P 500", "Nvidia", "Toyota", "Caterpillar"],
        horizon="Medio a largo plazo",
        risks=[
            "Represalias comerciales podrian ampliar el impacto a mas sectores.",
            "Empresas con dependencia de importaciones podrian sufrir presion en margenes.",
            "Los acuerdos politicos pueden cambiar rapidamente el escenario.",
        ],
    )


def build_general_insight(article: Article) -> InvestmentInsight:
    return InvestmentInsight(
        summary=summarize_article(article),
        event="La noticia contiene informacion economica o de mercado potencialmente relevante.",
        impact=(
            "Puede influir en expectativas de beneficios, sentimiento inversor o rotacion sectorial, aunque el efecto "
            "dependera de su alcance y de las expectativas previas del mercado."
        ),
        opportunity=(
            "Podria generar oportunidades de seguimiento en indices amplios, ETFs sectoriales o empresas directamente "
            "expuestas al tema de la noticia, siempre como analisis orientativo."
        ),
        sectors=["Mercado amplio", "Sectores directamente mencionados", "Banca", "Tecnologia", "Industriales"],
        asset_types=["Acciones", "ETFs / fondos indexados", "Indices"],
        examples=["SPY", "QQQ", "DIA", "IWM", "ETFs sectoriales relacionados"],
        horizon="Corto a medio plazo",
        risks=[
            "La noticia podria estar parcialmente descontada por el mercado.",
            "Faltan detalles para estimar impacto financiero directo.",
            "Resultados empresariales, datos macro o cambios regulatorios podrian modificar la lectura.",
        ],
    )
