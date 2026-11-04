# petermangin.co.nz

Canonical personal website and machine-readable entity hub for **Peter Mangin** (`Wikidata Q139076589`) — Auckland-based executive AI strategist, educator to 400+ New Zealand organisations, Chair of the NZ Marketing Association Data SIG, and open-source software builder.

## Stack & Architecture

Zero-build, zero-dependency static site designed for instant edge delivery on **Cloudflare Pages**:

- `index.html` — Custom WebGL celestial/orbital GLSL fragment shader, editorial typography, 7-node `@graph` Schema.org JSON-LD, and AEO direct-answer FAQ.
- `llms.txt` & `llms-full.txt` — Machine-readable LLM / RAG entity grounding files (`llmstxt.org` spec).
- `robots.txt` & `sitemap.xml` — Explicit crawl permissions for classic search and AI answer engines (`OAI-SearchBot`, `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Googlebot`).
- `og-image.png`, `favicon.svg`, `site.webmanifest` — Social unfurl and web app metadata.
- `_headers` — Cloudflare Pages HTTP response headers (UTF-8 macrons on `.txt`, security headers, and `Link` discovery headers).

## Local Preview

```bash
python3 -m http.server 4321
```

## Deploy to Cloudflare Pages

- **Framework preset**: `None`
- **Build command**: *(leave blank)*
- **Build output directory**: `/`
