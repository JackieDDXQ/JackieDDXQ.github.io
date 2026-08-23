(() => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function initPageReady() {
    requestAnimationFrame(() => document.body.classList.add('is-ready'));
  }

  function initCurrentNavigation() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('.nav-item').forEach((item) => {
      const href = item.getAttribute('href');
      if (!href || href.startsWith('#')) return;
      const targetPath = href.split('/').pop();
      const isProjectPage = window.location.pathname.includes('/projects/') && targetPath === 'projects.html';
      const isCurrent = targetPath === currentPath || isProjectPage;

      item.classList.toggle('active', isCurrent);
      if (isCurrent) item.setAttribute('aria-current', 'page');
      else item.removeAttribute('aria-current');
    });
  }

  function initMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const navigation = document.getElementById('site-navigation');
    if (!toggle || !navigation) return;

    const focusableSelector = 'a[href], button:not([disabled])';
    let previousFocus = null;

    const setMenu = (open, returnFocus = false) => {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.querySelector('.menu-toggle__label').textContent = open ? 'Close' : 'Menu';
      navigation.classList.toggle('is-open', open);
      document.body.classList.toggle('menu-open', open);

      if (open) {
        previousFocus = document.activeElement;
        navigation.querySelector(focusableSelector)?.focus();
      } else if (returnFocus) {
        (previousFocus instanceof HTMLElement ? previousFocus : toggle).focus();
      }
    };

    toggle.addEventListener('click', () => {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });

    navigation.addEventListener('click', (event) => {
      if (event.target.closest('a')) setMenu(false);
    });

    document.addEventListener('keydown', (event) => {
      if (toggle.getAttribute('aria-expanded') !== 'true') return;

      if (event.key === 'Escape') {
        event.preventDefault();
        setMenu(false, true);
        return;
      }

      if (event.key !== 'Tab') return;
      const focusable = [toggle, ...navigation.querySelectorAll(focusableSelector)];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    const desktopQuery = window.matchMedia('(min-width: 768px)');
    const closeOnDesktop = (event) => {
      if (event.matches) setMenu(false);
    };
    desktopQuery.addEventListener?.('change', closeOnDesktop);
  }

  function initRevealObserver() {
    if (reducedMotion.matches || !('IntersectionObserver' in window)) return;

    const elements = [
      ...document.querySelectorAll('[data-reveal]'),
      ...document.querySelectorAll('.project-page .architecture-layer, .project-page .process-step'),
    ];
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -8% 0px',
    });

    elements.forEach((element) => {
      element.classList.add('reveal-pending');
      observer.observe(element);
    });
  }

  function initScrollProgress() {
    const progressBar = document.querySelector('.site-progress');
    if (!progressBar) return;

    let frame = 0;
    const update = () => {
      const maximum = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maximum > 0 ? Math.min(1, Math.max(0, window.scrollY / maximum)) : 0;
      document.documentElement.style.setProperty('--scroll-progress', progress.toFixed(4));
      frame = 0;
    };
    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate, { passive: true });
    update();
  }

  function initProjectPreview() {
    const list = document.querySelector('.project-index-list');
    const preview = document.querySelector('.project-preview');
    if (!list || !preview) return;

    const switchPreview = (row) => {
      const targetId = row?.dataset.preview;
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (!target || target.classList.contains('is-active')) return;

      preview.querySelectorAll('.project-preview__item').forEach((item) => {
        item.classList.toggle('is-active', item === target);
      });
    };

    list.addEventListener('pointerover', (event) => {
      switchPreview(event.target.closest('[data-preview]'));
    });
    list.addEventListener('focusin', (event) => {
      switchPreview(event.target.closest('[data-preview]'));
    });
  }

  function initSectionSpy() {
    const links = [...document.querySelectorAll('.floating-nav-item[href^="#"]')];
    if (!links.length || !('IntersectionObserver' in window)) return;

    const sections = links
      .map((link) => document.querySelector(link.getAttribute('href')))
      .filter(Boolean);

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;

      links.forEach((link) => {
        const active = link.getAttribute('href') === `#${visible.target.id}`;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, {
      rootMargin: '-15% 0px -60% 0px',
      threshold: [0, 0.2, 0.5],
    });

    sections.forEach((section) => observer.observe(section));
  }

  function initReducedMotion() {
    const handleChange = (event) => {
      if (!event.matches) return;
      document.querySelectorAll('.reveal-pending').forEach((element) => {
        element.classList.remove('reveal-pending');
        element.classList.add('is-visible');
      });
    };
    reducedMotion.addEventListener?.('change', handleChange);
  }

  initPageReady();
  initCurrentNavigation();
  initMobileMenu();
  initRevealObserver();
  initScrollProgress();
  initProjectPreview();
  initSectionSpy();
  initReducedMotion();
})();
