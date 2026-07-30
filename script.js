/* Urban Clean — landing interactions + i18n (vanilla, no deps) */
(function () {
  'use strict';

  /* =========================================================
     I18N ENGINE (EN / PT / ES)
     ========================================================= */
  const DICT = window.I18N || {};
  const SUPPORTED = ['en', 'pt', 'es'];
  const trustItems = {
    en: ['✓ Trusted people, never a stranger', '✓ Insured', '✓ "On our way" message', '✓ Pet-friendly products', '✓ Vacation-rental specialists', '✓ EN · PT · ES'],
    pt: ['✓ Gente de confiança, nunca um estranho', '✓ Com seguro', '✓ Alertas "estamos a caminho"', '✓ Produtos pet-friendly', '✓ Especialistas em vacation rentals', '✓ EN · PT · ES'],
    es: ['✓ Siempre el mismo equipo', '✓ Con seguro', '✓ Alertas "vamos en camino"', '✓ Productos pet-friendly', '✓ Especialistas en vacation rentals', '✓ EN · PT · ES']
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

  /* =========================================================
     SMOOTH SCROLL (Lenis)
     styles.css keeps html{scroll-behavior:auto} on purpose — with
     smooth there, the native and Lenis animations fight each other.
     Under prefers-reduced-motion Lenis never boots and every jump
     falls back to a native instant scroll.
     ========================================================= */
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let lenis = null;

  if (window.Lenis && !reducedMotion.matches) {
    lenis = new window.Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });
    (function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    })(0);
  }

  /* Single entry point for every in-page jump, so the header never
     covers the section we just scrolled to. */
  const headerEl = document.querySelector('.site-header');
  const scrollToTarget = (target) => {
    if (!target) return;
    const offset = -((headerEl ? headerEl.offsetHeight : 0) + 12);
    if (lenis) lenis.scrollTo(target, { offset });
    else target.scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth' });
  };

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    link.addEventListener('click', (e) => {
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      scrollToTarget(target);
    });
  });

  /* Back to top — desktop only via CSS, see .scroll-top */
  const scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      if (lenis) lenis.scrollTo(0);
      else window.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    });
    const toggleScrollTop = () =>
      scrollTopBtn.classList.toggle('visible', window.scrollY > 600);
    window.addEventListener('scroll', toggleScrollTop, { passive: true });
    toggleScrollTop();
  }

  /* Hero parallax — the photo drifts slower than the page.
     Transform-only, rAF-throttled, and off for reduced-motion / small screens. */
  const PARALLAX_DEPTH = 0.18;
  const PARALLAX_MIN_WIDTH = 900;
  const heroBg = document.getElementById('heroBg');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (heroBg && hero) {
    let ticking = false;

    const paint = () => {
      ticking = false;
      const offset = Math.min(window.scrollY, hero.offsetHeight) * PARALLAX_DEPTH;
      heroBg.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    };

    const requestPaint = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(paint);
    };

    const isParallaxOn = () =>
      !prefersReducedMotion.matches && window.innerWidth >= PARALLAX_MIN_WIDTH;

    const syncParallax = () => {
      if (isParallaxOn()) {
        window.addEventListener('scroll', requestPaint, { passive: true });
        requestPaint();
      } else {
        window.removeEventListener('scroll', requestPaint);
        heroBg.style.transform = '';
      }
    };

    syncParallax();
    window.addEventListener('resize', syncParallax, { passive: true });
    prefersReducedMotion.addEventListener('change', syncParallax);
  }

  /* Form handling — opens WhatsApp (Sofia) with the lead details prefilled. Zero backend, no lead lost. */
  const WA_NUMBER = '18634381727';
  const LEAD_HEADERS = {
    estimate: {
      en: "Hi Urban Clean! I'd like a free quote:",
      pt: 'Olá Urban Clean! Quero um orçamento grátis:',
      es: '¡Hola Urban Clean! Quiero un presupuesto gratis:'
    },
    owners: {
      en: 'Hi Urban Clean! I manage properties and want vacation-rental turnover cleaning:',
      pt: 'Olá Urban Clean! Administro imóveis e quero limpeza de turnover:',
      es: '¡Hola Urban Clean! Administro propiedades y quiero limpieza de turnover:'
    }
  };
  function currentLang() {
    try { return localStorage.getItem('uc_lang') || (document.documentElement.lang || 'en').slice(0, 2); }
    catch (e) { return 'en'; }
  }
  function fieldLabel(el) {
    if (el.labels && el.labels[0]) return el.labels[0].textContent.trim();
    return el.getAttribute('aria-label') || el.placeholder || el.name;
  }
  function buildWhatsAppUrl(form, headerKey) {
    const lang = currentLang();
    const group = LEAD_HEADERS[headerKey] || {};
    const header = group[lang] || group.en || '';
    const lines = [];
    form.querySelectorAll('input, select, textarea').forEach((el) => {
      if (!el.name || el.type === 'submit' || el.type === 'button' || el.type === 'hidden') return;
      let val = el.value;
      if (el.type === 'checkbox') val = el.checked ? 'Yes' : '';
      if (el.type === 'radio' && !el.checked) return;
      if (!val || !String(val).trim()) return;
      lines.push(`${fieldLabel(el)}: ${val}`);
    });
    const body = header + (lines.length ? '\n' + lines.join('\n') : '');
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(body)}`;
  }
  function handleForm(form, note, headerKey) {
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const url = buildWhatsAppUrl(form, headerKey);
      const win = window.open(url, '_blank', 'noopener');
      if (!win) window.location.href = url;
      if (note) {
        note.hidden = false;
        const btn = form.querySelector('button[type="submit"]');
        if (btn) btn.textContent = '✓';
      }
      form.reset();
    });
  }
  handleForm(document.getElementById('estimateForm'), document.getElementById('formNote'), 'estimate');
  handleForm(document.getElementById('ownersForm'), document.getElementById('ownersNote'), 'owners');

  const miniForm = document.getElementById('miniForm');
  if (miniForm) {
    miniForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const url = buildWhatsAppUrl(miniForm, 'estimate');
      const win = window.open(url, '_blank', 'noopener');
      if (!win) window.location.href = url;
      miniForm.reset();
    });
  }
})();
