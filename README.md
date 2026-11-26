# AITG-MACPL-DEMO

Static demo website for **Marathwada Auto Compo Pvt. Ltd. (MACPL)**, an AITG company.
Plain HTML5, one stylesheet, one small vanilla script. There are no frameworks, web fonts or animation libraries.

## Pages

| File | Contents |
|---|---|
| `index.html` | Video hero (options A/B/C), Trusted by (OEM logos), About intro + facts, Capabilities, Product categories, Latest news, CTA strip |
| `about.html` | Overview, Vision & Values, Board of Directors (profile modals) |
| `capabilities.html` | Tabbed overview + six detail sections (`#tube-bending`, `#welding`, `#heat-treatment`, `#casting`, `#plasma-cutting`, `#assembly`) |
| `products.html` | Category filter (`?cat=agri / earth / 3w / 2w`) + product grid |
| `investor-relations.html` | Category tabs, financial-year filter and document table (`#annual-returns`, `#policies`, …) |
| `news.html` | Filterable news cards with "Read more" modal |
| `careers.html` | Openings + application form |
| `contact.html` | Office + plant selector, Mappls map (static fallback), enquiry form (`?product=` prefills it) |

## Run locally

```bash
python -m http.server 8080    # then open http://localhost:8080
```

## Where to edit

| What | Where |
|---|---|
| Colours, type scale, spacing, radii | CSS variables at the top of `assets/css/styles.css` (AITG Brand Manual palette) |
| Mappls API key | `MAPPLS_KEY` in `.env` (see `.env.example`) or host environment, then rebuild |
| Plant addresses and coordinates | `PLANTS` array in `assets/js/main.js` |
| Investor documents | `IR_DOCUMENTS` array in `assets/js/main.js` (one line per PDF) |
| Capabilities, products, news, people, openings | `_src/content.mjs` |
| Header / footer (shared by all pages) | `_src/partials/header.html`, `_src/partials/footer.html` |
| Page layouts | `_src/pages/*.html` |

The `.html` files in the root are **generated**. After editing anything in `_src/`, rebuild with Node 18+:

```bash
node _src/build.mjs
```

This keeps the header and footer identical on every page. If you edit a root `.html` file directly, make the same change in `_src` too, or the next build will overwrite it.

## Before launch (TODO)

- **Logo:** replace `assets/img/logo/*.png` with the official files from the AITG Brand Manual (on-white and on-blue versions, at 2× resolution). On 360–390px phones the horizontal lockup scales to about 35–40px high, because 55px would make it 393px wide. A stacked or compact official version is needed to meet the 55px minimum on phones. A favicon is also needed.
- **Hero video:** `assets/video/` holds `hero.webm` (VP9), `hero.mp4` (H.264, fast start) and `hero-mobile.mp4` (640×360, used up to 768px), plus the poster `assets/img/hero/hero-poster.jpg`. All are placeholders. Replace all four together, keeping 10–20 s, muted, about 1 Mbps for desktop and about 0.45 Mbps for mobile. There must only ever be **one** `<video>`: the A/B/C switch restyles it.
- **Inner-page hero photos:** `assets/img/page-hero/<page>-1600.webp` and `-800.webp` are placeholders (plant video stills and stock). Replace each pair with a real MACPL photo for that page (WebP, ≤200 KB, 1600×600 and 800×480). The text and chips for each page hero are in `pageHeroes` in `_src/content.mjs`.
- **Photos:** the welding, casting and About images are stock (credits in `_src/content.mjs`). Tube bending, heat treatment and plasma cutting are stills taken from the hero video. Board and management portraits are initials placeholders; set `photo:` in `_src/content.mjs`.
- **Data to confirm:** unit addresses and coordinates, product names and descriptions, capability bullet specs, the certification date, the investor contact name, and group company URLs.
- **Placeholders:** news stories, career openings and most IR documents are marked "Placeholder" on the page and in the code.
- **Forms:** connect both forms to a real endpoint (`initForms()` in `main.js`).
- **Demo only:** delete the "Hero option A/B/C" pill (markup in `_src/pages/index.html`, the `DEMO ONLY` block in `initHero()`, and `.demo-switch` CSS). The `?hero=a|b|c` URL parameter goes with it.

## Accessibility notes on the brand palette

Everything passes WCAG AA contrast except three brand-requested treatments:

| Element | Ratio | Switch to pass AA |
|---|---|---|
| White text on orange primary buttons | 2.75:1 | set `--btn-primary-text: #404040` and give `.btn--primary` 19px bold text |
| Orange eyebrow labels | 2.75:1 | set `--eyebrow-color: #404040` (or `var(--blue)`) |
| Orange "Innovative Group" / "Globally" in the vision | 2.75:1 | remove the `accent` spans in `_src/pages/about.html`, then rebuild |

`#939598` is 3:1 on white, so it is used for borders, icons and chart neutrals only. All readable text uses `#404040`.
