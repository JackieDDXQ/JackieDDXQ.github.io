(() => {
  const section = document.querySelector('.home-ai');
  if (!section || !('IntersectionObserver' in window)) return;
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const animations = new Set();
  const seen = new WeakSet();
  let observer;
  function setup() {
    observer?.disconnect();
    animations.forEach(animation => animation.cancel());
    animations.clear();
    if (preference.matches) return;
    observer = new IntersectionObserver(entries => {
      let index = 0;
      entries.forEach(entry => {
        if (!entry.isIntersecting || seen.has(entry.target)) return;
        seen.add(entry.target);
        observer.unobserve(entry.target);
        const animation = entry.target.animate([
          {opacity: .2, translate: '0 16px'},
          {opacity: 1, translate: '0 0'}
        ], {duration: 480, delay: index++ * 85, fill: 'backwards', easing: 'cubic-bezier(.22,.7,.2,1)'});
        animations.add(animation);
        animation.onfinish = animation.oncancel = () => animations.delete(animation);
      });
    }, {threshold: .12});
    section.querySelectorAll('.chapter-intro, .ai-notes article, .ai-notes > a').forEach(element => {
      if (!seen.has(element)) observer.observe(element);
    });
  }
  preference.addEventListener('change', setup);
  setup();
})();
