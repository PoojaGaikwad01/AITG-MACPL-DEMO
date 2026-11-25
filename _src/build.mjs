// =============================================================================
// Tiny static build: partials + page bodies + content.mjs  →  ../*.html
// Usage:  node _src/build.mjs
// The generated .html files are plain static pages (no runtime templating).
// =============================================================================
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as C from './content.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, '..');
const read = (p) => readFileSync(join(here, p), 'utf8');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const ico = (id) => `<svg class="icon" aria-hidden="true"><use href="#i-${id}"></use></svg>`;
const initials = (name) => name.replace(/^Dr\.\s*/, '').split(' ').map((w) => w[0]).slice(0, 2).join('');

// ---- Pages ---------------------------------------------------------------------
const SITE = 'Marathwada Auto Compo Pvt. Ltd.';
const pages = [
  { id: 'index', title: `${SITE} | Precise products for critical functions`,
    desc: 'MACPL, an AITG company, develops and mass-manufactures safety-critical steering, suspension and chassis components and assemblies for leading OEMs since 1997.',
    headExtra: '\n<link rel="preload" as="image" href="assets/img/hero/hero-poster.jpg" fetchpriority="high">' },
  { id: 'about', title: `About MACPL | ${SITE}`,
    desc: 'MACPL since 1997: our story, AITG vision and values, Board of directors and top management.' },
  { id: 'capabilities', title: `Capabilities | ${SITE}`,
    desc: 'Tube bending, welding and fabrication, heat treatment, aluminium gravity die casting, plasma and gas cutting, components and assemblies.' },
  { id: 'products', title: `Products | ${SITE}`,
    desc: 'Steering, suspension, chassis and fabricated components for agriculture, earth-moving, 3-wheeler and 2-wheeler & EV OEMs.' },
  { id: 'investor-relations', title: `Investor relations | ${SITE}`,
    desc: 'Financial results, annual reports, annual returns, policies, corporate announcements and shareholder information of MACPL.' },
  { id: 'news', title: `News & media | ${SITE}`,
    desc: 'Certifications, events and CSR initiatives at Marathwada Auto Compo.' },
  { id: 'careers', title: `Careers | ${SITE}`,
    desc: 'Current openings and how to apply to Marathwada Auto Compo, Chhatrapati Sambhajinagar.' },
  { id: 'contact', title: `Contact and plant locations | ${SITE}`,
    desc: 'Registered office and plant locations of MACPL at MIDC Waluj, Chhatrapati Sambhajinagar. Phone +91 240 6625613, info@macpl.com.' }
];

// ---- Templates -------------------------------------------------------------------
function capsSection(onCapsPage) {
  const href = onCapsPage ? '' : 'capabilities.html';
  const tabs = C.capabilities.map((c, i) => `
          <button class="cap-tab" type="button" role="tab" id="cap-tab-${c.id}" aria-controls="cap-panel-${c.id}" aria-selected="${i === 0}"${i ? ' tabindex="-1"' : ''}>
            <span class="cap-tab__n">${c.n}</span>
            <span class="cap-tab__title">${esc(c.title)}</span>
            <span class="cap-tab__arrow" aria-hidden="true">${ico('arrow')}</span>
            <span class="cap-tab__meta">${esc(c.meta)}</span>
          </button>`).join('');
  const panels = C.capabilities.map((c, i) => `
        <div class="caps__panel" role="tabpanel" id="cap-panel-${c.id}" aria-labelledby="cap-tab-${c.id}" tabindex="0"${i ? ' hidden' : ''}>
          <div class="caps__frame"><img src="${c.img}" width="960" height="720" alt="${esc(c.alt)}" loading="lazy" decoding="async"></div>
          <div class="caps__info">
            <div>
              <p>${esc(c.short)}</p>
              <ul class="chips">${c.chips.map((x) => `<li class="chip chip--dark">${esc(x)}</li>`).join('')}</ul>
            </div>
            <div>
              <div class="stat-box"><p class="stat-box__meta">${esc(c.statLabel)}</p><p class="stat-box__text">${esc(c.stat)}</p></div>
              <a class="link-arrow link-arrow--light" href="${href}#${c.id}">Process details<span class="visually-hidden">: ${esc(c.title)}</span> ${ico('arrow')}</a>
            </div>
          </div>
        </div>`).join('');
  return `
  <!-- CAPABILITIES: replicates the macpl-iota capabilities section (numbered process list + framed image panel).
       No auto-advance or progress animation; brand-blue tints replace the orange/yellow accents. -->
  <section class="section section--dark on-dark" aria-labelledby="caps-title">
    <div class="container">
      <div class="section-head">
        <div class="section-head__text">
          <p class="eyebrow">Capabilities</p>
          <h2 id="caps-title">Six processes. <span class="tint">One roof.</span></h2>
          <p class="lead">Every critical process stays in-house, under our control.</p>
        </div>
      </div>
      <div class="caps" data-caps>
        <div class="caps__nav">
          <div class="caps__tabs" role="tablist" aria-label="Capabilities">${tabs}
          </div>${onCapsPage ? '' : `
          <a class="link-arrow link-arrow--light caps__more" href="capabilities.html">All capabilities ${ico('arrow')}</a>`}
        </div>
        <div class="caps__panels">${panels}
        </div>
      </div>
    </div>
  </section>`;
}

function capDetails() {
  return C.capabilities.map((c, i) => `
  <section id="${c.id}" class="section process${i % 2 ? ' process--alt section--surface' : ''}" aria-labelledby="${c.id}-title">
    <div class="container process__grid">
      <div class="process__text">
        <p class="eyebrow">Process ${c.n} / 06</p>
        <h2 id="${c.id}-title">${esc(c.title)}</h2>
        <p class="process__meta">${esc(c.meta)}</p>
        <p class="process__long">${esc(c.long)}</p>
        <ul class="spec-list">${c.specs.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
        <div class="stat-box"><p class="stat-box__meta">${esc(c.statLabel)}</p><p class="stat-box__text">${esc(c.stat)}</p></div>
      </div>
      <figure class="process__frame"><img src="${c.img}" width="960" height="720" alt="${esc(c.alt)}" loading="lazy" decoding="async"></figure>
    </div>
  </section>`).join('');
}

const catLabel = Object.fromEntries(C.productCategories.map((c) => [c.id, c.title]));
const catCount = (id) => C.products.filter((p) => p.cat === id).length;

function categoryCards() {
  return C.productCategories.map((c) => `
        <li><a class="cat-card" href="products.html?cat=${c.id}">
          <div class="cat-card__img"><img src="assets/img/products/${c.img}" width="600" height="400" alt="" loading="lazy" decoding="async"></div>
          <div class="cat-card__body">
            <span class="cat-card__n">${c.n}</span>
            <h3 class="card-title">${esc(c.title)}</h3>
            <span class="cat-card__desc">${esc(c.desc)}</span>
            <span class="cat-card__count">${catCount(c.id)} ${catCount(c.id) === 1 ? 'product' : 'products'}</span>
          </div>
        </a></li>`).join('');
}

function productFilters() {
  const btn = (id, label, n, on) => `
        <button class="filter-btn" type="button" data-filter="${id}" aria-pressed="${on}">${esc(label)} <sup>${n}</sup></button>`;
  return btn('all', 'All', C.products.length, true) + C.productCategories.map((c) => btn(c.id, c.title, catCount(c.id), false)).join('');
}

function productCards() {
  return C.products.map((p, i) => `
        <li data-cat="${p.cat}">
          <article class="part">
            <div class="part__img"><img src="assets/img/products/${p.img}" width="600" height="400" alt="${esc(p.name)}"${i < 4 ? '' : ' loading="lazy"'} decoding="async"></div>
            <div class="part__body">
              <p class="part__tag"><span class="part__code">${p.code}</span> &middot; ${esc(catLabel[p.cat])}</p>
              <h3 class="part__name card-title">${esc(p.name)}</h3>
              <p class="part__desc">${esc(p.desc)}</p>
              <a class="link-arrow part__enquire" href="contact.html?product=${encodeURIComponent(p.name)}#enquiry">Enquire<span class="visually-hidden"> about ${esc(p.name)}</span> ${ico('arrow')}</a>
            </div>
          </article>
        </li>`).join('') + `
        <li data-cat="all">
          <article class="part part--cta">
            <h3>Need a custom component?</h3>
            <p>Share your drawing or specification. We develop the part and its production line.</p>
            <a class="btn btn--primary" href="contact.html#enquiry">Send an enquiry ${ico('arrow')}</a>
          </article>
        </li>`;
}

function newsCards(list) {
  return list.map((n) => {
    const date = n.date ? `<time datetime="${n.date}">${esc(n.dateLabel)}</time>` : `<span>${esc(n.dateLabel)}</span>`;
    const meta = `<span class="tag">${esc(n.tag)}</span>${date}${n.placeholder ? '<span class="tag tag--muted">Placeholder</span>' : ''}`;
    return `
        <li data-cat="${n.cat}">${n.placeholder ? '\n          <!-- DEMO PLACEHOLDER story: replace text and image -->' : ''}
          <article class="news-card" data-modal-item>
            <img class="news-card__img" src="${n.img}" width="${n.w}" height="${n.h}" alt="${esc(n.alt)}" loading="lazy" decoding="async">
            <div class="news-card__body">
              <p class="news-meta">${meta}</p>
              <h3 class="news-card__title card-title">${esc(n.title)}</h3>
              <p class="news-card__excerpt">${esc(n.excerpt)}</p>
              <button class="link-arrow" type="button" data-modal-open aria-haspopup="dialog">Read more<span class="visually-hidden">: ${esc(n.title)}</span> ${ico('arrow')}</button>
            </div>
            <div class="modal-src" hidden>
              <p class="news-meta">${meta}</p>
              <h2>${esc(n.title)}</h2>
              ${n.body.map((p) => `<p>${esc(p)}</p>`).join('\n              ')}
            </div>
          </article>
        </li>`;
  }).join('');
}

function newsFilters() {
  const btn = (id, label, on) => `
          <button class="filter-btn" type="button" data-filter="${id}" aria-pressed="${on}">${esc(label)}</button>`;
  return btn('all', 'All', true) + C.newsCategories.map((c) => btn(c.id, c.label, false)).join('');
}

function personPhoto(p, decorative) {
  if (p.photo) return `<img class="person__photo" src="${p.photo}" width="240" height="240" alt="${decorative ? '' : esc(p.name)}" loading="lazy" decoding="async">`;
  return decorative
    ? `<span class="person__photo" aria-hidden="true">${initials(p.name)}</span>`
    : `<span class="person__photo" role="img" aria-label="Photo placeholder for ${esc(p.name)}">${initials(p.name)}</span>`;
}

function people(list) {
  return list.map((p) => `
        <li>
          <article class="person" data-modal-item>
            ${personPhoto(p, false)}
            <h3 class="person__name card-title">${esc(p.name)}</h3>
            <p class="person__role">${esc(p.role)}</p>
            <p class="person__summary">${esc(p.summary)}</p>
            <button class="link-arrow" type="button" data-modal-open aria-haspopup="dialog">Read profile<span class="visually-hidden"> of ${esc(p.name)}</span></button>
            <div class="modal-src" hidden>
              <div class="modal-profile">${personPhoto(p, true)}<div><h2>${esc(p.name)}</h2><p>${esc(p.role)}</p></div></div>
              ${p.bio.map((x) => `<p>${esc(x)}</p>`).join('\n              ')}
            </div>
          </article>
        </li>`).join('');
}

function openings() {
  return C.openings.map((o) => `
        <li class="opening">
          <div>
            <h3>${esc(o.title)}</h3>
            <p class="opening__meta"><span>${ico('pin')}${esc(o.location)}</span><span>${ico('briefcase')}${esc(o.experience)}</span></p>
            <p class="opening__note">${esc(o.note)}</p>
          </div>
          <a class="btn btn--secondary" href="#apply" data-position="${esc(o.title)}">Apply<span class="visually-hidden"> for ${esc(o.title)}</span></a>
        </li>`).join('');
}

function positionOptions() {
  return C.openings.map((o) => `<option>${esc(o.title)}</option>`).join('') + '<option>General application</option>';
}

function pageHero(page) {
  const h = C.pageHeroes[page.id];
  if (!h) throw new Error(`No pageHeroes entry for ${page.id}`);
  const img = `assets/img/page-hero/${page.id}`;
  const n = String(pages.indexOf(page)).padStart(2, '0'); // nav order: About 01 … Contact 07
  const chips = h.chips.map(([label, href, filter, icon]) =>
    `<li><a class="hero-chip" href="${href}"${filter ? ` data-set-filter="${filter}"` : ''}>${icon ? ico(icon) : ''}${esc(label)}</a></li>`).join('');
  return `
  <!-- PAGE HERO (inner pages): blue panel with a faint blueprint grid, cut at the brand's 60deg angle with an
       orange stripe; full-colour plant photo with a caption; numbered kicker, H1, intro, chip strip, brand bar.
       TODO: replace the placeholder photo in assets/img/page-hero/ with a MACPL photo and update its caption. -->
  <section class="page-hero${h.compact ? ' page-hero--compact' : ''}" aria-labelledby="page-title">
    <figure class="page-hero__media">
      <img src="${img}-1600.webp" srcset="${img}-800.webp 800w, ${img}-1600.webp 1600w" sizes="(min-width: 1024px) 50vw, 100vw" width="1600" height="600" alt="" loading="eager" fetchpriority="high" decoding="async">
      <figcaption class="page-hero__caption">${esc(h.caption)}</figcaption>
    </figure>
    <div class="page-hero__panel" aria-hidden="true"></div>
    <div class="page-hero__stripe" aria-hidden="true"></div>
    <div class="container page-hero__inner">${h.eyebrow ? `
      <p class="page-hero__kicker"><span class="page-hero__index" aria-hidden="true">${n}</span><span class="page-hero__slash" aria-hidden="true"></span><span class="page-hero__eyebrow">${esc(h.eyebrow)}</span></p>` : ''}
      <h1 id="page-title">${esc(h.title)}</h1>${h.intro ? `
      <p class="page-hero__intro">${esc(h.intro)}</p>` : ''}
      <ul class="page-hero__chips" aria-label="${esc(h.chipsLabel)}">${chips}</ul>
    </div>
    <div class="brand-bar" aria-hidden="true"></div>
  </section>`;
}

const tokens = {
  PAGE_HERO: pageHero,
  CAPS_SECTION_HOME: () => capsSection(false),
  CAPS_SECTION_PAGE: () => capsSection(true),
  CAP_DETAILS: capDetails,
  CATEGORY_CARDS: categoryCards,
  PRODUCT_FILTERS: productFilters,
  PRODUCT_CARDS: productCards,
  PRODUCT_COUNT: () => String(C.products.length),
  NEWS_HOME: () => newsCards(C.news.slice(0, 3)),
  NEWS_ALL: () => newsCards(C.news),
  NEWS_FILTERS: newsFilters,
  BOARD: () => people(C.board),
  MANAGEMENT: () => people(C.management),
  OPENINGS: openings,
  POSITION_OPTIONS: positionOptions
};

// ---- Assemble --------------------------------------------------------------------
const head = read('partials/head.html');
const header = read('partials/header.html');
const footer = read('partials/footer.html');

for (const page of pages) {
  const nav = header
    .replace(`data-nav="${page.id}"`, 'aria-current="page"')
    .replace(/ data-nav="[^"]+"/g, '');
  let body = read(`pages/${page.id}.html`);
  body = body.replace(/\{\{([A-Z_]+)\}\}/g, (m, key) => {
    if (!tokens[key]) throw new Error(`Unknown token ${m} in ${page.id}.html`);
    return tokens[key](page);
  });
  const html = head
    .replace('{{TITLE}}', esc(page.title))
    .replace('{{DESC}}', esc(page.desc))
    .replace('{{HEAD_EXTRA}}', page.headExtra || '') +
    '<body>\n' + nav + '\n' + body.trimEnd() + '\n' + footer;
  writeFileSync(join(out, `${page.id}.html`), html);
  console.log(`built ${page.id}.html  (${(html.length / 1024).toFixed(1)} KB)`);
}
