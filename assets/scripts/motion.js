(() => {
  'use strict';

  const page = document.body;
  if (!page.classList.contains('home-page')) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(min-width: 768px) and (pointer: fine)');
  let lenis = null;
  let tickerCallback = null;
  let gsapContext = null;

  function initHeaderState() {
    let frame = 0;

    const update = () => {
      page.classList.toggle('is-scrolled', window.scrollY > 28);
      const hero = document.querySelector('[data-hero-scene]');
      const heroBoundary = hero ? hero.offsetTop + hero.offsetHeight - 72 : 0;
      page.classList.toggle('is-past-hero', window.scrollY >= heroBoundary);
      frame = 0;
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    window.addEventListener('scroll', requestUpdate, { passive: true });
    update();
  }

  function initSmoothScroll() {
    if (lenis || reducedMotion.matches || !finePointer.matches || typeof window.Lenis !== 'function') return;

    lenis = new window.Lenis({
      duration: 1.08,
      smoothWheel: true,
      syncTouch: false,
      anchors: { offset: -72 },
    });

    page.classList.add('motion-enhanced');

    if (window.gsap && window.ScrollTrigger) {
      lenis.on('scroll', window.ScrollTrigger.update);
      tickerCallback = (time) => lenis?.raf(time * 1000);
      window.gsap.ticker.add(tickerCallback);
      window.gsap.ticker.lagSmoothing(0);
      return;
    }

    const raf = (time) => {
      if (!lenis) return;
      lenis.raf(time);
      window.requestAnimationFrame(raf);
    };
    window.requestAnimationFrame(raf);
  }

  function destroySmoothScroll() {
    if (tickerCallback && window.gsap) window.gsap.ticker.remove(tickerCallback);
    tickerCallback = null;
    lenis?.destroy();
    lenis = null;
  }

  function initScrollScenes() {
    const { gsap, ScrollTrigger } = window;
    if (reducedMotion.matches || !gsap || !ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);
    page.classList.add('motion-enhanced');

    gsapContext = gsap.context(() => {
      const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

      heroTimeline
        .from('.demo-hero__meta span', {
          autoAlpha: 0,
          y: 12,
          duration: 0.65,
          stagger: 0.07,
        })
        .from('.archive-kicker', { autoAlpha: 0, x: -18, duration: 0.55 }, '-=0.38')
        .from('.demo-title-line', {
          autoAlpha: 0,
          y: 34,
          duration: 0.82,
          stagger: 0.1,
        }, '-=0.34')
        .from('.archive-hero__statement', { autoAlpha: 0, y: 22, duration: 0.72 }, '-=0.48')
        .from('.demo-hero__footer', { autoAlpha: 0, duration: 0.5 }, '-=0.35');

      gsap.matchMedia().add('(min-width: 768px)', () => {
        gsap.to('[data-hero-layer="copy"]', {
          yPercent: -3,
          ease: 'none',
          scrollTrigger: {
            trigger: '[data-hero-scene]',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.7,
          },
        });
      });

      const statementVisual = document.querySelector('[data-statement-visual]');
      if (statementVisual) {
        const statementTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: statementVisual,
            start: 'top 82%',
            once: true,
          },
        });

        statementTimeline
          .from(statementVisual.querySelector('.demo-hero__visual-frame'), {
            autoAlpha: 0,
            clipPath: 'inset(0 0 100% 0)',
            duration: 0.95,
            ease: 'power3.out',
          })
          .from(statementVisual.querySelectorAll('.demo-hero__visual-node'), {
            autoAlpha: 0,
            y: 18,
            duration: 0.55,
            stagger: 0.08,
            ease: 'power3.out',
          }, '-=0.42')
          .from(statementVisual.querySelectorAll('.demo-hero__visual-map i'), {
            scaleX: 0,
            duration: 0.45,
            stagger: 0.06,
            ease: 'power3.out',
          }, '-=0.5');
      }

      gsap.utils.toArray('[data-motion-section]').forEach((section) => {
        const heading = section.querySelector('.archive-section-heading');
        if (heading) {
          gsap.from(heading, {
            autoAlpha: 0,
            y: 18,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 78%',
              once: true,
            },
          });
        }
      });

      const architecture = document.querySelector('[data-motion-architecture]');
      if (architecture) {
        const caseTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: '[data-motion-section="featured"]',
            start: 'top 68%',
            end: 'center 42%',
            scrub: 0.65,
          },
        });

        caseTimeline
          .from(architecture.querySelectorAll('.architecture-node'), {
            autoAlpha: 0.2,
            y: 36,
            stagger: 0.16,
            ease: 'power2.out',
          })
          .from(architecture.querySelectorAll('.architecture-connector'), {
            autoAlpha: 0,
            scaleY: 0,
            transformOrigin: 'top center',
            stagger: 0.12,
            ease: 'power2.out',
          }, '<0.15')
          .from(architecture.querySelector('.architecture-parties'), {
            autoAlpha: 0,
            y: 16,
            ease: 'power2.out',
          }, '-=0.3');
      }
    });

    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }

  function destroyMotion() {
    destroySmoothScroll();
    gsapContext?.revert();
    gsapContext = null;
    window.ScrollTrigger?.getAll().forEach((trigger) => trigger.kill());
    page.classList.remove('motion-enhanced');
  }

  initHeaderState();
  initSmoothScroll();
  initScrollScenes();

  reducedMotion.addEventListener?.('change', (event) => {
    if (event.matches) destroyMotion();
  });

  finePointer.addEventListener?.('change', (event) => {
    if (event.matches) initSmoothScroll();
    else destroySmoothScroll();
  });

  window.addEventListener('pagehide', destroyMotion, { once: true });
})();
