# petermangin.co.nz

Canonical personal website and machine-readable entity hub for **Peter Mangin** (`Wikidata Q139076589`) — Auckland-based executive AI strategist, educator to 400+ New Zealand organisations, founder and Principal, AI Enablement of AI Innovisory, developer of the NZ Marketing Association's AI in marketing courses, and open-source software builder.

## Stack & Architecture

Zero-build, zero-dependency static site designed for instant edge delivery on **Cloudflare Pages**:

- `index.html` — Hand-coded Canvas 2D walkable map of Aotearoa, 7-node `@graph` Schema.org JSON-LD, and AEO direct-answer FAQ.
- `llms.txt` & `llms-full.txt` — Machine-readable LLM / RAG entity grounding files (`llmstxt.org` spec).
- `robots.txt` & `sitemap.xml` — Explicit crawl permissions for classic search and AI answer engines (`OAI-SearchBot`, `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Googlebot`).
- `og-image.png`, `favicon.svg`, `site.webmanifest` — Social unfurl and web app metadata.
- `fonts/` — Self-hosted Familjen Grotesk variable subsets, with `OFL.txt` licence.
- `_headers` — Cloudflare Pages HTTP response headers (UTF-8 macrons on `.txt`, security headers, and `Link` discovery headers).

## Local Preview

```bash
python3 -m http.server 4321
```

## Deploy to Cloudflare Pages

- **Framework preset**: `None`
- **Build command**: *(leave blank)*
- **Build output directory**: `/`
