/* ==========================================================================
   MACPL — main.js (demo)
   One small vanilla script for every page. No libraries, no scroll effects.

   EDIT HERE ─────────────────────────────────────────────────────────────────
   A. MAPPLS_KEY    — MapmyIndia / Mappls Web SDK key (contact page map)
   B. PLANTS        — office + plant locations shown on contact.html
   C. IR_DOCUMENTS  — every document listed on investor-relations.html
   ========================================================================== */

/* A. Mappls key. TODO: paste the client's Mappls (MapmyIndia) Web SDK key.
      While it is 'TODO' the contact page shows a static address card instead of the map. */
const MAPPLS_KEY = 'TODO';

/* B. Locations. TODO: the client must supply exact addresses and coordinates for every unit.
      Current lat/lng values are placeholders around MIDC Waluj (~19.84, 75.24). */
const PLANTS = [
  { id: 'registered-office', name: 'Registered office', address: 'E-63, MIDC Waluj, Chhatrapati Sambhajinagar (Aurangabad), Maharashtra 431136', lat: 19.8436, lng: 75.2391, phone: '+91 240 6625613' },
  { id: 'unit-1', name: 'Unit 1', address: 'MIDC Waluj, Chhatrapati Sambhajinagar, Maharashtra 431136 (full address TBC)', lat: 19.8412, lng: 75.2352, phone: '+91 240 6625613' },
  { id: 'unit-2', name: 'Unit 2', address: 'MIDC Waluj, Chhatrapati Sambhajinagar, Maharashtra 431136 (full address TBC)', lat: 19.8471, lng: 75.2446, phone: '+91 240 6625614' },
  { id: 'unit-3', name: 'Unit 3', address: 'MIDC Waluj, Chhatrapati Sambhajinagar, Maharashtra 431136 (full address TBC)', lat: 19.8377, lng: 75.2309, phone: '+91 240 6625614' }
];

/* C. Investor relations documents.
      To add a document, copy one line and edit it:
        category : one of the ids in IR_CATEGORIES below
        fy       : financial year as 'YYYY-YY' (must exist in FY_LIST to be filterable)
        title    : document title
        date     : 'YYYY-MM-DD' or '' if not known
        url      : full link to the PDF ('' = not uploaded yet, shown as a placeholder)
      Entries with placeholder: true are DEMO PLACEHOLDERS — replace or delete them. */
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
  // Real documents
  { category: 'annual-returns', fy: '2021-22', title: 'Annual return FY 2021–22', date: '', url: 'https://www.macpl-aitg.co/images/financials/MACPL-Annual-Return-2021-2022.pdf' },
  { category: 'policies', fy: '2022-23', title: 'Corporate social responsibility (CSR) policy, 2022', date: '', url: 'https://www.macpl-aitg.co/images/financials/MACPL-CSR-Policy-2022.pdf' }, // TODO: confirm FY

  // DEMO PLACEHOLDERS — replace with real documents
  { category: 'financial-results', fy: '2024-25', title: 'Audited financial results FY 2024–25', date: '', url: '', placeholder: true },
  { category: 'financial-results', fy: '2023-24', title: 'Audited financial results FY 2023–24', date: '', url: '', placeholder: true },
  { category: 'financial-results', fy: '2022-23', title: 'Audited financial results FY 2022–23', date: '', url: '', placeholder: true },
  { category: 'annual-reports', fy: '2024-25', title: 'Annual report FY 2024–25', date: '', url: '', placeholder: true },
  { category: 'annual-reports', fy: '2023-24', title: 'Annual report FY 2023–24', date: '', url: '', placeholder: true },
  { category: 'annual-returns', fy: '2024-25', title: 'Annual return FY 2024–25', date: '', url: '', placeholder: true },
  { category: 'annual-returns', fy: '2023-24', title: 'Annual return FY 2023–24', date: '', url: '', placeholder: true },
  { category: 'annual-returns', fy: '2022-23', title: 'Annual return FY 2022–23', date: '', url: '', placeholder: true },
  { category: 'policies', fy: '2025-26', title: 'CSR annual action plan FY 2025–26', date: '', url: '', placeholder: true },
  { category: 'announcements', fy: '2025-26', title: 'Notice of annual general meeting (FY 2024–25)', date: '', url: '', placeholder: true },
  { category: 'announcements', fy: '2024-25', title: 'Notice of annual general meeting (FY 2023–24)', date: '', url: '', placeholder: true },
  { category: 'committees', fy: '2025-26', title: 'Composition of Board committees', date: '', url: '', placeholder: true },
  { category: 'shareholder-info', fy: '2024-25', title: 'Shareholding pattern as on 31 March 2025', date: '', url: '', placeholder: true }
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

  /* 2. Hero video + demo variant switcher ------------------------------------ */
  function initHero() {
    var hero = $('#hero');
    if (!hero) return;
    var video = $('.hero__video', hero);
    var btn = $('.hero__video-toggle', hero);

    /* One <video> only. It plays after `loadeddata`, pauses while the hero is off-screen or the tab is hidden,
       stays paused for prefers-reduced-motion (until the visitor presses play) and after a manual pause.
       A poster layer covers it until the first `playing` event, so there is no black flash.
       No scroll listeners touch the video. */
    if (video) {
      var userPaused = false;
      var userStarted = false;
      var inView = true;
      var wanted = function () {
        return !userPaused && inView && !document.hidden && (userStarted || !reduceMotion.matches);
      };
      var play = function () { var p = video.play(); if (p && p.catch) p.catch(function () {}); };
      var update = function () {
        if (wanted()) { if (video.paused && video.readyState >= 2) play(); }
        else if (!video.paused) video.pause();
      };
      var sync = function () {
        if (!btn) return;
        var playing = !video.paused;
        btn.setAttribute('aria-label', playing ? 'Pause background video' : 'Play background video');
        $('.i-pause', btn).hidden = !playing;
        $('.i-play', btn).hidden = playing;
      };

      hero.classList.add('js-video');
      if (reduceMotion.matches) { video.removeAttribute('autoplay'); video.pause(); }
      video.addEventListener('playing', function () { hero.classList.add('is-playing'); });
      video.addEventListener('play', sync);
      video.addEventListener('pause', sync);
      if (video.readyState >= 2) update(); else video.addEventListener('loadeddata', update, { once: true });

      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (entries) {
          inView = entries[0].isIntersecting;
          update();
        }, { threshold: 0.01 }).observe(hero);
      }
      document.addEventListener('visibilitychange', update);

      if (btn) btn.addEventListener('click', function () {
        if (video.paused) { userPaused = false; userStarted = true; play(); }
        else { userPaused = true; video.pause(); }
      });
      sync();
    }

    /* DEMO ONLY — hero option A/B/C. Delete this block and the .demo-switch markup before launch. */
    var sw = $('.demo-switch');
    if (!sw) return;
    var buttons = $$('button[data-hero]', sw);
    function setVariant(v, save) {
      if (!/^[abc]$/.test(v)) v = 'a';
      hero.setAttribute('data-variant', v);
      buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-hero') === v)); });
      if (save) store('macpl-hero-variant', v);
    }
    buttons.forEach(function (b) { b.addEventListener('click', function () { setVariant(b.getAttribute('data-hero'), true); }); });
    setVariant((param('hero') || store('macpl-hero-variant') || hero.getAttribute('data-variant') || 'a').toLowerCase(), false);
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
        // On small screens keep the newly shown panel in view (instant, no smooth scrolling).
        if (fromClick && !desktopMq.matches && panels[i]) {
          var r = panels[i].getBoundingClientRect();
          if (r.top > window.innerHeight - 120) panels[i].scrollIntoView({ block: 'nearest' });
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
          : '<span class="pdf-link" aria-disabled="true" title="Document to be uploaded">' + icon('file') + 'PDF</span>';
        return '<tr><td><span class="doc-title">' + icon('file') + '<span>' + esc(d.title) +
          (d.placeholder ? ' <span class="tag tag--muted">Placeholder</span>' : '') +
          '<br><small class="doc-fy">FY ' + esc(d.fy.replace('-', '–')) + '</small></span></span></td>' +
          '<td class="doc-date">' + fmtDate(d.date) + '</td><td>' + link + '</td></tr>';
      }).join('');
      tableWrap.hidden = docs.length === 0;
      empty.hidden = docs.length > 0;
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
      if (i > -1) { selectTab(i, false); root.scrollIntoView({ block: 'start' }); }
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
        (btn.closest('.filter-bar') || btn.closest('section') || btn).scrollIntoView({ block: 'start' });
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
      $('[data-fb-coords]', fallback).textContent = p.lat.toFixed(4) + '° N, ' + p.lng.toFixed(4) + '° E';
      $('[data-fb-open]', fallback).href = mapplsUrl(p);
      $('[data-fb-call]', fallback).href = telHref(p.phone);
      $('[data-fb-phone]', fallback).textContent = p.phone;
    }
    function showFallback() {
      if (ready) return;
      failed = true;
      clearTimeout(timer);
      fallback.hidden = false;
      mapEl.setAttribute('aria-hidden', 'true');
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
      if (detail) detail.textContent = current.address;
      $$('[data-plant-directions]').forEach(function (l) { l.href = mapplsUrl(current); });
      renderFallback(current);
      if (ready) placeMarker(current, animate);
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
        map = new window.mappls.Map('map', { center: { lat: current.lat, lng: current.lng }, zoom: 16, zoomControl: true, location: false });
        var onLoad = function () {
          if (ready) return;
          ready = true;
          clearTimeout(timer);
          fallback.hidden = true;
          placeMarker(current, false);
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

    if (!MAPPLS_KEY || MAPPLS_KEY === 'TODO') {
      if (window.console) console.info('Mappls key not set (MAPPLS_KEY in assets/js/main.js). Showing the static location card.');
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
  initHero();
  initCapTabs();
  initFilters();
  initModal();
  initInvestorRelations();
  initPageHero();
  initContactMap();
  initForms();
})();
