/* ==========================================================================
   MACPL — main.js (demo)
   One small vanilla script for every page. No libraries, no scroll effects.

   EDIT HERE ─────────────────────────────────────────────────────────────────
   A. MAPPLS_KEY    — MapmyIndia / Mappls Web SDK key (contact page map)
   B. PLANTS        — office + plant locations shown on contact.html
   C. IR_DOCUMENTS  — every document listed on investor-relations.html
   ========================================================================== */

/* A. Mappls (MapmyIndia) Web SDK key: build.mjs writes it from the MAPPLS_KEY environment variable into
      <meta name="mappls-key"> on contact.html. Restrict the key to the site's domain in the Mappls console.
      Without a key (or without plant coordinates) the contact page shows an OpenStreetMap interim map or static card. */
const MAPPLS_KEY = (document.querySelector('meta[name="mappls-key"]') || {}).content || '';

/* B. Locations. Addresses are from the Contact page of macpl-aitg.co. Unit I's coordinates come from the map
      embedded on that page; Units II and III have none yet (lat/lng: null shows the address without a marker).
      TODO: MACPL to supply coordinates for Units II and III (decimal degrees). */
const PLANTS = [
  { id: 'unit-1', name: 'Unit I (Regd. office)', address: 'E-63, MIDC Waluj, Chhatrapati Sambhajinagar (Aurangabad), Maharashtra 431136', lat: 19.843761, lng: 75.222207, phone: '+91 240 6625613' },
  { id: 'unit-2', name: 'Unit II', address: 'E-69, MIDC Waluj, Chhatrapati Sambhajinagar (Aurangabad), Maharashtra 431136', lat: null, lng: null, phone: '+91 240 6625613' },
  { id: 'unit-3', name: 'Unit III', address: 'K-22/23, MIDC Waluj, Chhatrapati Sambhajinagar (Aurangabad), Maharashtra 431136', lat: null, lng: null, phone: '+91 240 6625613' }
];

/* C. Investor relations documents.
      To add a document, copy one line and edit it:
        category : one of the ids in IR_CATEGORIES below
        fy       : financial year as 'YYYY-YY' (must exist in FY_LIST to be filterable)
        title    : document title
        date     : 'YYYY-MM-DD' or '' if not known
        url      : full link to the PDF */
const FY_LIST = ['2025-26', '2024-25', '2023-24', '2022-23', '2021-22'];

const IR_CATEGORIES = [
  { id: 'financial-results', label: 'Financial results', desc: 'Audited annual financial results.' },
  { id: 'annual-reports', label: 'Annual reports', desc: 'Annual reports with the Board’s report and audited accounts.' },
  { id: 'annual-returns', label: 'Annual returns', desc: 'Annual returns under Section 92(3) of the Companies Act, 2013.' },
  { id: 'policies', label: 'Policies', desc: 'Corporate policies, including our CSR policy.' },
  { id: 'announcements', label: 'Corporate announcements', desc: 'Notices of general meetings and other announcements to members.' },
  { id: 'committees', label: 'Board committees', desc: 'Composition and terms of reference of Board committees.' },
  { id: 'shareholder-info', label: 'Shareholder information & investor contact', desc: 'Shareholding information and the contact for investor queries.' }
];

const IR_DOCUMENTS = [
  { category: 'annual-returns', fy: '2021-22', title: 'Annual return FY 2021–22', date: '', url: 'https://www.macpl-aitg.co/images/financials/MACPL-Annual-Return-2021-2022.pdf' },
  { category: 'policies', fy: '2022-23', title: 'Corporate social responsibility (CSR) policy, 2022', date: '', url: 'https://www.macpl-aitg.co/images/financials/MACPL-CSR-Policy-2022.pdf' }
];

/* ==========================================================================
   Modules
   ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var desktopMq = window.matchMedia('(min-width: 1024px)');

  function $(sel, root) { return sel ? (root || document).querySelector(sel) : null; }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function icon(id, cls) { return '<svg class="icon' + (cls ? ' ' + cls : '') + '" aria-hidden="true"><use href="#i-' + id + '"></use></svg>'; }
  function store(key, val) {
    try { if (val === undefined) return window.localStorage.getItem(key); window.localStorage.setItem(key, val); } catch (e) { /* storage unavailable */ }
    return null;
  }
  function param(name) {
    try { return new URLSearchParams(window.location.search).get(name); } catch (e) { return null; }
  }

  /* 1. Mobile navigation ---------------------------------------------------- */
  function initNav() {
    var toggle = $('.nav-toggle');
    var nav = $('#site-nav');
    if (!toggle || !nav) return;
    function setOpen(open) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      nav.classList.toggle('is-open', open);
    }
    toggle.addEventListener('click', function () { setOpen(toggle.getAttribute('aria-expanded') !== 'true'); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setOpen(false); toggle.focus(); }
    });
    document.addEventListener('click', function (e) {
      if (toggle.getAttribute('aria-expanded') === 'true' && !e.target.closest('.site-header')) setOpen(false);
    });
    desktopMq.addEventListener('change', function () { setOpen(false); });
  }

  /* 2. Hero video ----------------------------------------------------------- */
  function initHero() {
    var hero = $('#hero');
    if (!hero) return;
    var video = $('.hero__video', hero);

    /* One <video> only. It plays after `loadeddata`, pauses while the hero is off-screen or the tab is hidden,
       and stays paused for prefers-reduced-motion. A poster layer covers it until it starts playing. */
    if (video) {
      var inView = true;
      var wanted = function () {
        return inView && !document.hidden && !reduceMotion.matches;
      };
      var play = function () { var p = video.play(); if (p && p.catch) p.catch(function () {}); };
      var update = function () {
        if (wanted()) { if (video.paused && video.readyState >= 2) play(); }
        else if (!video.paused) video.pause();
      };

      hero.classList.add('js-video');
      if (reduceMotion.matches) { video.removeAttribute('autoplay'); video.pause(); }
      else if (!video.paused && video.readyState >= 2) { hero.classList.add('is-playing'); }
      video.addEventListener('playing', function () { hero.classList.add('is-playing'); });
      video.addEventListener('timeupdate', function () { hero.classList.add('is-playing'); }, { once: true });
      if (video.readyState >= 2) update(); else video.addEventListener('loadeddata', update, { once: true });

      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (entries) {
          inView = entries[0].isIntersecting;
          update();
        }, { threshold: 0.01 }).observe(hero);
      }
      document.addEventListener('visibilitychange', update);
    }
  }

  /* 2a. Smooth scrolling across the entire website:
         - In-page #hash links, back-to-top, and cross-page #hash targets glide smoothly with sticky-header offset
         - Mouse-wheel / pointer scrolling uses frame-rate-independent exponential smoothing (60Hz–144Hz)
         - Touch devices, Ctrl+wheel zoom, and inner scrollable areas (modal, map, textarea) stay native
         - Respects prefers-reduced-motion */
  function initSmoothScroll() {
    var root = document.scrollingElement || document.documentElement;
    var target = 0, current = 0, raf = 0, lastTs = 0;

    function smoothTo(y) {
      var max = Math.max(0, root.scrollHeight - window.innerHeight);
      var dest = Math.max(0, Math.min(max, y));
      if (reduceMotion.matches) {
        stop();
        window.scrollTo(0, dest);
        return;
      }
      if (!raf) { current = window.scrollY; lastTs = 0; root.style.scrollBehavior = 'auto'; }
      target = dest;
      if (!raf) raf = requestAnimationFrame(step);
    }

    function stop() {
      if (!raf) return;
      cancelAnimationFrame(raf);
      raf = 0;
      lastTs = 0;
      root.style.scrollBehavior = '';
    }

    function step(ts) {
      if (!lastTs) lastTs = ts;
      var dt = Math.min(0.05, (ts - lastTs) / 1000);
      lastTs = ts;
      var alpha = 1 - Math.exp(-11 * dt);
      current += (target - current) * alpha;
      if (Math.abs(target - current) < 0.5) current = target;
      window.scrollTo(0, current);
      if (current === target) stop();
      else raf = requestAnimationFrame(step);
    }

    function hashOffset(el) {
      var header = $('.site-header');
      var anchor = $('.anchor-bar');
      var offset = (header ? header.offsetHeight : 0) + 12;
      if (anchor && el.closest && el.closest('.about-section')) offset += anchor.offsetHeight;
      return Math.max(0, el.getBoundingClientRect().top + window.scrollY - offset);
    }

    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href]');
      if (!link || link.target === '_blank') return;
      var raw = link.getAttribute('href');
      if (link.classList.contains('to-top') || raw === '#') {
        e.preventDefault();
        smoothTo(0);
        return;
      }
      var url;
      try { url = new URL(link.href, window.location.href); } catch (err) { return; }
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash || url.hash.length < 2) return;
      var destEl = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!destEl) return;
      e.preventDefault();
      smoothTo(hashOffset(destEl));
      if (window.history.pushState) window.history.pushState(null, '', url.hash);
    });

    if (reduceMotion.matches) return;
    if (!window.matchMedia('(any-pointer: fine)').matches) return;

    function ownScroll(el, dy) {
      for (; el && el !== document.body && el !== root; el = el.parentElement) {
        if (el.matches && el.matches('dialog, textarea, select, iframe, .map-wrap')) return true;
        if (el.scrollHeight > el.clientHeight && /(auto|scroll)/.test(getComputedStyle(el).overflowY) &&
            ((dy < 0 && el.scrollTop > 0) || (dy > 0 && el.scrollTop + el.clientHeight < el.scrollHeight - 1))) return true;
      }
      return false;
    }

    window.addEventListener('wheel', function (e) {
      if (e.defaultPrevented || e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      if (document.querySelector('dialog[open]') || ownScroll(e.target, e.deltaY)) return;
      var dy = e.deltaY * (e.deltaMode === 1 ? 40 : e.deltaMode === 2 ? window.innerHeight : 1);
      if (!dy) return;
      e.preventDefault();
      if (!raf) { current = target = window.scrollY; lastTs = 0; root.style.scrollBehavior = 'auto'; }
      var max = Math.max(0, root.scrollHeight - window.innerHeight);
      target = Math.max(0, Math.min(max, target + dy));
      if (!raf) raf = requestAnimationFrame(step);
    }, { passive: false });

    ['mousedown', 'keydown', 'touchstart'].forEach(function (ev) { window.addEventListener(ev, stop, { passive: true }); });
  }

  /* 2b. Sticky header elevation on scroll */
  function initHeaderState() {
    var header = $('.site-header');
    if (!header) return;
    var on = null;
    function update() {
      var scrolled = window.scrollY > 4;
      if (scrolled !== on) { on = scrolled; header.classList.toggle('is-scrolled', scrolled); }
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* 2c. About: highlight the "on this page" anchor link while reading */
  function initAnchorSpy() {
    var links = $$('.anchor-bar a[href^="#"]');
    if (!links.length || !('IntersectionObserver' in window)) return;
    var byId = {};
    links.forEach(function (a) { var id = a.getAttribute('href').slice(1); if (document.getElementById(id)) byId[id] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) { if (a === byId[e.target.id]) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
      });
    }, { rootMargin: '-38% 0px -55% 0px' });
    Object.keys(byId).forEach(function (id) { io.observe(document.getElementById(id)); });
  }

  /* 3. Capabilities tabs (macpl-iota style) --------------------------------- */
  function initCapTabs() {
    $$('[data-caps]').forEach(function (root) {
      var tabs = $$('[role="tab"]', root);
      var panels = tabs.map(function (t) { return document.getElementById(t.getAttribute('aria-controls')); });
      function select(i, focus, fromClick) {
        tabs.forEach(function (t, j) {
          var on = i === j;
          t.setAttribute('aria-selected', String(on));
          t.tabIndex = on ? 0 : -1;
          if (panels[j]) panels[j].hidden = !on;
        });
        if (focus) tabs[i].focus();
        if (fromClick && !desktopMq.matches && panels[i]) {
          var r = panels[i].getBoundingClientRect();
          if (r.top > window.innerHeight - 120) panels[i].scrollIntoView({ block: 'nearest', behavior: reduceMotion.matches ? 'auto' : 'smooth' });
        }
      }
      tabs.forEach(function (t, i) {
        t.addEventListener('click', function () { select(i, false, true); });
        t.addEventListener('keydown', function (e) {
          var n = null;
          if (e.key === 'ArrowDown' || e.key === 'ArrowRight') n = (i + 1) % tabs.length;
          else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') n = (i - 1 + tabs.length) % tabs.length;
          else if (e.key === 'Home') n = 0;
          else if (e.key === 'End') n = tabs.length - 1;
          if (n !== null) { e.preventDefault(); select(n, true, false); }
        });
      });
    });
  }

  /* 4. Category filters (products, news) — instant, no animation ------------ */
  function initFilters() {
    $$('[data-filter-group]').forEach(function (group) {
      var grid = $(group.getAttribute('data-filter-group'));
      if (!grid) return;
      var items = $$('[data-cat]', grid);
      var buttons = $$('[data-filter]', group);
      var status = $(group.getAttribute('data-filter-status') || '');
      var empty = $(group.getAttribute('data-filter-empty') || '');
      var noun = group.getAttribute('data-filter-noun') || 'items';
      function apply(cat, updateUrl) {
        if (!buttons.some(function (b) { return b.getAttribute('data-filter') === cat; })) cat = 'all';
        var shown = 0;
        items.forEach(function (it) {
          // data-cat="all" marks a tile (e.g. the enquiry tile) shown only in the "All" view and not counted.
          var itemCat = it.getAttribute('data-cat');
          var match = cat === 'all' || itemCat === cat;
          it.hidden = !match;
          if (match && itemCat !== 'all') shown++;
        });
        buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-filter') === cat)); });
        if (status) status.textContent = 'Showing ' + shown + ' ' + (shown === 1 ? noun.replace(/s$/, '') : noun);
        if (empty) empty.hidden = shown > 0;
        if (updateUrl && window.history.replaceState) {
          var url = new URL(window.location.href);
          if (cat === 'all') url.searchParams.delete('cat'); else url.searchParams.set('cat', cat);
          window.history.replaceState(null, '', url);
        }
      }
      buttons.forEach(function (b) { b.addEventListener('click', function () { apply(b.getAttribute('data-filter'), true); }); });
      apply(param('cat') || 'all', false);
    });
  }

  /* 5. Modal (profiles, news articles) — native <dialog> --------------------- */
  function initModal() {
    var dialog = $('#modal');
    if (!dialog) return;
    var body = $('.modal__body', dialog);
    var lastTrigger = null;
    document.addEventListener('click', function (e) {
      var trigger = e.target.closest('[data-modal-open]');
      if (!trigger) return;
      var item = trigger.closest('[data-modal-item]');
      var src = item && $('.modal-src', item);
      if (!src) return;
      e.preventDefault();
      lastTrigger = trigger;
      body.innerHTML = src.innerHTML;
      var title = $('h2', body);
      if (title) { title.id = 'modal-title'; dialog.setAttribute('aria-labelledby', 'modal-title'); }
      if (typeof dialog.showModal === 'function') dialog.showModal(); else dialog.setAttribute('open', '');
    });
    function close() { if (typeof dialog.close === 'function') dialog.close(); else dialog.removeAttribute('open'); }
    $('.modal__close', dialog).addEventListener('click', close);
    dialog.addEventListener('click', function (e) { if (e.target === dialog) close(); });
    dialog.addEventListener('close', function () { body.innerHTML = ''; if (lastTrigger) lastTrigger.focus(); });
  }

  /* 6. Investor relations: tabs + FY filter + document table ---------------- */
  function initInvestorRelations() {
    var root = $('[data-ir]');
    if (!root) return;
    var nav = $('#ir-nav', root);
    var panel = $('#ir-panel', root);
    var title = $('#ir-title', root);
    var desc = $('#ir-desc', root);
    var select = $('#ir-year', root);
    var tbody = $('#ir-rows', root);
    var tableWrap = $('#ir-table', root);
    var empty = $('#ir-empty', root);
    var emptyText = $('#ir-empty-text', root);
    var contact = $('#ir-contact', root);

    select.innerHTML = '<option value="all">All years</option>' + FY_LIST.map(function (fy) {
      return '<option value="' + fy + '">FY ' + fy.replace('-', '–') + '</option>';
    }).join('');

    nav.innerHTML = IR_CATEGORIES.map(function (c, i) {
      return '<button type="button" class="ir-tab" role="tab" id="ir-tab-' + c.id + '" aria-controls="ir-panel" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '" data-id="' + c.id + '">' + esc(c.label) + '</button>';
    }).join('');
    var tabs = $$('.ir-tab', nav);
    var current = IR_CATEGORIES[0].id;

    function fmtDate(d) {
      if (!d) return '—';
      var dt = new Date(d + 'T00:00:00');
      return isNaN(dt) ? esc(d) : dt.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    }
    function render() {
      var cat = IR_CATEGORIES.filter(function (c) { return c.id === current; })[0];
      var fy = select.value;
      title.textContent = cat.label;
      desc.textContent = cat.desc;
      panel.setAttribute('aria-labelledby', 'ir-tab-' + cat.id);
      contact.hidden = cat.id !== 'shareholder-info';
      var docs = IR_DOCUMENTS.filter(function (d) { return d.category === cat.id && (fy === 'all' || d.fy === fy); })
        .sort(function (a, b) { return (b.fy + b.date).localeCompare(a.fy + a.date); });
      tbody.innerHTML = docs.map(function (d) {
        var link = d.url
          ? '<a class="pdf-link" href="' + esc(d.url) + '" target="_blank" rel="noopener" aria-label="View PDF: ' + esc(d.title) + ' (opens in a new tab)">' + icon('file') + 'PDF</a>'
          : '<span class="pdf-link" aria-disabled="true" title="Document not yet available">' + icon('file') + 'PDF</span>';
        return '<tr><td><span class="doc-title">' + icon('file') + '<span>' + esc(d.title) +
          '<br><small class="doc-fy">FY ' + esc(d.fy.replace('-', '–')) + '</small></span></span></td>' +
          '<td class="doc-date">' + fmtDate(d.date) + '</td><td>' + link + '</td></tr>';
      }).join('');
      tableWrap.hidden = docs.length === 0;
      empty.hidden = docs.length > 0;
      if (emptyText) {
        var inCategory = IR_DOCUMENTS.some(function (d) { return d.category === cat.id; });
        emptyText.innerHTML = inCategory
          ? '<strong>No documents for the selected year.</strong><br>Choose another year or &ldquo;All years&rdquo;.'
          : '<strong>No documents published in this category yet.</strong>';
      }
    }
    function selectTab(i, focus) {
      current = IR_CATEGORIES[i].id;
      tabs.forEach(function (t, j) { t.setAttribute('aria-selected', String(i === j)); t.tabIndex = i === j ? 0 : -1; });
      if (focus) tabs[i].focus();
      if (window.history.replaceState) window.history.replaceState(null, '', '#' + current);
      render();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { selectTab(i, false); });
      t.addEventListener('keydown', function (e) {
        var n = null;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') n = (i + 1) % tabs.length;
        else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') n = (i - 1 + tabs.length) % tabs.length;
        else if (e.key === 'Home') n = 0;
        else if (e.key === 'End') n = tabs.length - 1;
        if (n !== null) { e.preventDefault(); selectTab(n, true); }
      });
    });
    select.addEventListener('change', render);
    var ids = IR_CATEGORIES.map(function (c) { return c.id; });
    var fromHash = ids.indexOf(window.location.hash.slice(1));
    if (fromHash > -1) selectTab(fromHash, false); else render();
    // Page-hero chips link to #financial-results, #policies, … : switch tab and bring the panel into view.
    window.addEventListener('hashchange', function () {
      var i = ids.indexOf(window.location.hash.slice(1));
      if (i > -1) { selectTab(i, false); root.scrollIntoView({ block: 'start', behavior: reduceMotion.matches ? 'auto' : 'smooth' }); }
    });
  }

  /* 6b. Inner-page hero: filter chips + hide a chip row that wraps past 2 lines --------- */
  function initPageHero() {
    // Chips with data-set-filter (products, news) set the page's category filter in place.
    // Without JS they are plain ?cat= links, which the filter module also reads on load.
    $$('.hero-chip[data-set-filter]').forEach(function (chip) {
      chip.addEventListener('click', function (e) {
        var btn = $('[data-filter="' + chip.getAttribute('data-set-filter') + '"]');
        if (!btn) return;
        e.preventDefault();
        btn.click();
        (btn.closest('.filter-bar') || btn.closest('section') || btn).scrollIntoView({ block: 'start', behavior: reduceMotion.matches ? 'auto' : 'smooth' });
      });
    });

    var rows = $$('.page-hero__chips');
    if (!rows.length) return;
    function fit() {
      rows.forEach(function (ul) {
        ul.classList.remove('is-collapsed');
        var lines = {};
        Array.prototype.forEach.call(ul.children, function (li) { lines[li.offsetTop] = true; });
        if (Object.keys(lines).length > 2) ul.classList.add('is-collapsed');
      });
    }
    var raf = 0;
    window.addEventListener('resize', function () { cancelAnimationFrame(raf); raf = requestAnimationFrame(fit); });
    fit();
  }

  /* 7. Contact: plant selector + Mappls map with static fallback ------------ */
  function initContactMap() {
    var wrap = $('[data-map]');
    if (!wrap) return;
    var mapEl = $('#map', wrap);
    var fallback = $('#map-fallback', wrap);
    var list = $('#plant-list');
    var detail = $('#plant-detail');
    var current = PLANTS[0];
    var map = null, marker = null, ready = false, failed = false, timer = null;

    function hasCoords(p) { return typeof p.lat === 'number' && typeof p.lng === 'number'; }
    function mapplsUrl(p) { return 'https://mappls.com/@' + p.lat + ',' + p.lng; }
    function telHref(n) { return 'tel:' + n.replace(/[^+\d]/g, ''); }
    function popupHtml(p) {
      return '<div class="map-popup"><strong>' + esc(p.name) + '</strong>' + esc(p.address) +
        '<br><a href="' + mapplsUrl(p) + '" target="_blank" rel="noopener">Get directions</a></div>';
    }

    list.innerHTML = PLANTS.map(function (p, i) {
      return '<button type="button" class="plant-btn" aria-pressed="' + (i === 0) + '" data-id="' + esc(p.id) + '">' +
        '<span class="plant-btn__name">' + icon('pin') + esc(p.name) + '</span>' +
        '<span class="plant-btn__addr">' + esc(p.address) + '</span></button>';
    }).join('');

    function renderFallback(p) {
      $('[data-fb-name]', fallback).textContent = p.name;
      $('[data-fb-address]', fallback).textContent = p.address;
      var located = hasCoords(p);
      $('[data-fb-coords]', fallback).textContent = located ? p.lat.toFixed(4) + '° N, ' + p.lng.toFixed(4) + '° E' : '';
      $('[data-fb-open]', fallback).hidden = !located;
      if (located) $('[data-fb-open]', fallback).href = mapplsUrl(p);
      var noteEl = $('[data-fb-note]', fallback);
      if (noteEl) {
        noteEl.textContent = !located ? 'Showing the MIDC Waluj industrial area. Call us for gate directions.'
          : wrap.classList.contains('is-interim') ? ''
          : 'Interactive map unavailable. Open this location in Mappls for directions.';
      }
      $('[data-fb-call]', fallback).href = telHref(p.phone);
      $('[data-fb-phone]', fallback).textContent = p.phone;
    }
    /* Keyless stand-in: an OpenStreetMap embed, used until MAPPLS_KEY is configured or if the SDK fails.
       A location without coordinates shows the surrounding area of the nearest known location, with no marker. */
    function interimMap(p) {
      var base = hasCoords(p) ? p : PLANTS.filter(hasCoords)[0];
      if (!base) return false;
      var bbox = [base.lng - 0.008, base.lat - 0.005, base.lng + 0.008, base.lat + 0.005].map(function (n) { return n.toFixed(6); });
      var src = 'https://www.openstreetmap.org/export/embed.html?layer=mapnik&bbox=' + bbox.join('%2C') +
        (hasCoords(p) ? '&marker=' + p.lat + '%2C' + p.lng : '');
      var frame = $('iframe', mapEl);
      if (!frame) {
        frame = document.createElement('iframe');
        frame.title = 'Map of the selected MACPL location';
        mapEl.appendChild(frame);
      }
      if (frame.getAttribute('src') !== src) frame.setAttribute('src', src);
      wrap.classList.add('is-interim');
      return true;
    }
    function showFallback() {
      if (ready) return;
      failed = true;
      clearTimeout(timer);
      fallback.hidden = false;
      if (interimMap(current)) { mapEl.removeAttribute('aria-hidden'); renderFallback(current); }
      else mapEl.setAttribute('aria-hidden', 'true');
    }
    function placeMarker(p, animate) {
      if (!map) return;
      if (marker) {
        try { window.mappls.remove({ map: map, layer: marker }); } catch (e) { try { marker.remove(); } catch (e2) { /* ignore */ } }
        marker = null;
      }
      // Default Mappls pin: its tip is anchored on the exact lat/lng. Do not add an icon offset.
      marker = new window.mappls.Marker({
        map: map,
        position: { lat: p.lat, lng: p.lng },
        fitbounds: false,
        popupHtml: popupHtml(p),
        popupOptions: { openPopup: true }
      });
      var center = { lat: p.lat, lng: p.lng };
      if (animate && !reduceMotion.matches && typeof map.flyTo === 'function') {
        try { map.flyTo({ center: center, zoom: 16 }); return; } catch (e) { /* fall through */ }
      }
      map.setCenter(center);
      map.setZoom(16);
    }
    function select(id, animate) {
      current = PLANTS.filter(function (p) { return p.id === id; })[0] || PLANTS[0];
      $$('.plant-btn', list).forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-id') === current.id)); });
      if (detail) detail.textContent = hasCoords(current) ? '' : current.name + ' — MIDC Waluj industrial area (call +91 240 6625613 for gate directions).';
      $$('[data-plant-directions]').forEach(function (l) {
        l.hidden = !hasCoords(current);
        if (hasCoords(current)) l.href = mapplsUrl(current);
      });
      renderFallback(current);
      if (failed) interimMap(current);
      if (ready) {
        fallback.hidden = hasCoords(current);
        if (hasCoords(current)) placeMarker(current, animate);
      }
    }
    list.addEventListener('click', function (e) {
      var b = e.target.closest('.plant-btn');
      if (b) select(b.getAttribute('data-id'), true);
    });
    select(current.id, false);

    // Called by the Mappls SDK (callback=initMap).
    window.initMap = function () {
      if (failed) return;
      try {
        var start = hasCoords(current) ? current : PLANTS.filter(hasCoords)[0];
        map = new window.mappls.Map('map', { center: { lat: start.lat, lng: start.lng }, zoom: 16, zoomControl: true, location: false });
        var onLoad = function () {
          if (ready) return;
          ready = true;
          clearTimeout(timer);
          fallback.hidden = !hasCoords(current);
          if (hasCoords(current)) placeMarker(current, false);
        };
        if (typeof map.addListener === 'function') map.addListener('load', onLoad);
        else if (typeof map.on === 'function') map.on('load', onLoad);
        if ('ResizeObserver' in window) {
          new ResizeObserver(function () { if (ready && typeof map.resize === 'function') map.resize(); }).observe(wrap);
        }
      } catch (err) {
        showFallback();
      }
    };

    if (!MAPPLS_KEY || MAPPLS_KEY === 'TODO' || !PLANTS.some(hasCoords)) {
      if (window.console) console.info(!MAPPLS_KEY || MAPPLS_KEY === 'TODO'
        ? 'Mappls key not set (MAPPLS_KEY environment variable, then rebuild). Showing the OpenStreetMap stand-in.'
        : 'No plant coordinates yet (PLANTS in assets/js/main.js). Showing the static location card.');
      showFallback();
      return;
    }
    var s = document.createElement('script');
    s.src = 'https://apis.mappls.com/advancedmaps/api/' + encodeURIComponent(MAPPLS_KEY) + '/map_sdk?layer=vector&v=3.0&callback=initMap';
    s.async = true;
    s.defer = true;
    s.onerror = showFallback;
    document.head.appendChild(s);
    timer = setTimeout(showFallback, 10000);
  }

  /* 8. Forms (demo: validate, then show a thank-you message) ----------------- */
  function initForms() {
    $$('form[data-demo-form]').forEach(function (form) {
      var status = $('.form__status', form);
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!form.checkValidity()) { form.reportValidity(); return; }
        // TODO: connect to the client's form endpoint / email service before launch.
        form.reset();
        if (status) {
          status.hidden = false;
          status.textContent = form.getAttribute('data-success') || 'Thank you. We have received your message.';
          status.focus();
        }
      });
    });

    // contact.html?product=Name → prefill the enquiry message
    var product = param('product');
    var msg = $('#enq-message');
    if (product && msg) msg.value = 'Enquiry about: ' + product + '\n\n';

    // careers.html "Apply" buttons → preselect the position
    var position = $('#app-position');
    if (position) {
      $$('[data-position]').forEach(function (a) {
        a.addEventListener('click', function () { position.value = a.getAttribute('data-position'); });
      });
    }
  }

  initNav();
  initSmoothScroll();
  initHeaderState();
  initAnchorSpy();
  initHero();
  initCapTabs();
  initFilters();
  initModal();
  initInvestorRelations();
  initPageHero();
  initContactMap();
  initForms();
})();
