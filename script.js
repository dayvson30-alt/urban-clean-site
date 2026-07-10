/* Urban Clean — landing interactions + i18n (vanilla, no deps) */
(function () {
  'use strict';

  /* =========================================================
     I18N ENGINE (EN / PT / ES)
     ========================================================= */
  const DICT = window.I18N || {};
  const SUPPORTED = ['en', 'pt', 'es'];
  const trustItems = {
    en: ['★ Background-checked pros', '★ Bonded & insured', '★ SMS "on our way" alerts', '★ Pet-friendly products', '★ Vacation-rental specialists', '★ EN · PT · ES'],
    pt: ['★ Equipe verificada', '★ Com seguro', '★ Alertas "estamos a caminho"', '★ Produtos pet-friendly', '★ Especialistas em vacation rentals', '★ EN · PT · ES'],
    es: ['★ Personal verificado', '★ Con seguro', '★ Alertas "vamos en camino"', '★ Productos pet-friendly', '★ Especialistas en vacation rentals', '★ EN · PT · ES']
  };

  function detectLang() {
    const saved = localStorage.getItem('uc_lang');
    if (saved && SUPPORTED.includes(saved)) return saved;
    const nav = (navigator.language || 'en').slice(0, 2).toLowerCase();
    return SUPPORTED.includes(nav) ? nav : 'en';
  }

  function applyLang(lang) {
    const dict = DICT[lang];
    if (!dict) return;
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const v = dict[el.getAttribute('data-i18n')];
      if (v != null) el.textContent = v;
    });
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const v = dict[el.getAttribute('data-i18n-html')];
      if (v != null) el.innerHTML = v;
    });

    // Trust marquee (duplicated for seamless loop)
    const track = document.getElementById('trustTrack');
    if (track) {
      const items = (trustItems[lang] || trustItems.en).map((t) => `<span>${t}</span>`).join('');
      track.innerHTML = items + items;
    }

    // Switcher active state
    document.querySelectorAll('.lang-switch button').forEach((b) =>
      b.classList.toggle('active', b.getAttribute('data-lang') === lang)
    );
    localStorage.setItem('uc_lang', lang);
  }

  // Wire switcher
  document.querySelectorAll('.lang-switch button').forEach((b) =>
    b.addEventListener('click', () => applyLang(b.getAttribute('data-lang')))
  );
  applyLang(detectLang());

  /* =========================================================
     UI INTERACTIONS
     ========================================================= */

  /* Sticky header shadow */
  const header = document.getElementById('siteHeader');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Mobile nav toggle */
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('primaryNav');
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    })
  );

  /* Reveal on scroll */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('in'));
  }

  /* Floating CTA: show after hero */
  const floating = document.querySelector('.floating-cta');
  const hero = document.querySelector('.hero');
  if (floating && hero && 'IntersectionObserver' in window) {
    const heroIO = new IntersectionObserver(
      ([entry]) => floating.classList.toggle('show', !entry.isIntersecting),
      { threshold: 0 }
    );
    heroIO.observe(hero);
  }

  /* Form handling (placeholder — wire to Formspree/N8N webhook) */
  function handleForm(form, note) {
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      console.log('[Urban Clean] lead captured:', data);
      if (note) {
        note.hidden = false;
        const btn = form.querySelector('button[type="submit"]');
        if (btn) btn.textContent = '✓';
      }
      form.reset();
    });
  }
  handleForm(document.getElementById('estimateForm'), document.getElementById('formNote'));

  const miniForm = document.getElementById('miniForm');
  if (miniForm) {
    miniForm.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log('[Urban Clean] mini lead:', Object.fromEntries(new FormData(miniForm).entries()));
      setTimeout(() => document.getElementById('estimate').scrollIntoView({ behavior: 'smooth' }), 120);
    });
  }
})();
