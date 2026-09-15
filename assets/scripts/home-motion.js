// One-time, progressively enhanced entrances. Content is visible by default.
(() => {
  const shell = document.querySelector('.home-shell');
  if (!shell || !window.IntersectionObserver || !Element.prototype.animate) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const canMove = () => !reduced.matches && !document.documentElement.classList.contains('home-motion-off');
  const active = new Map();
  const selector = '.featured-folder, .project-folder, .question-card, .home-chapter .chapter-intro, .home-ai .chapter-intro, .path-stops > li, .method-readings > a, .ai-notes > article, .quiet-note';
  const targets = [...shell.querySelectorAll(selector)];
  const cancelAll = () => {
    [...active.values()].forEach(animation => animation.cancel());
    active.clear();
  };
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        active.get(entry.target)?.cancel();
        return;
      }
      observer.unobserve(entry.target);
      if (!canMove() || document.hidden || entry.target.contains(document.activeElement)) return;
      const siblings = targets.filter(target => target.parentElement === entry.target.parentElement);
      const delay = Math.min(siblings.indexOf(entry.target), 3) * 65;
      const animation = entry.target.animate([
        {opacity: .15, translate: '0 22px'},
        {opacity: 1, translate: '0 0'}
      ], {duration: 650, delay, fill: 'backwards', easing: 'cubic-bezier(.22,1,.36,1)'});
      active.set(entry.target, animation);
      animation.onfinish = animation.oncancel = () => active.delete(entry.target);
    });
  }, {threshold: .08, rootMargin: '0px 0px -24px 0px'});
  targets.forEach(target => observer.observe(target));
  document.addEventListener('portfolio:motionchange', event => {
    if (!event.detail.enabled) cancelAll();
  });
  reduced.addEventListener('change', () => { if (reduced.matches) cancelAll(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) cancelAll(); });
  shell.addEventListener('focusin', event => {
    active.forEach((animation, element) => {
      if (element.contains(event.target)) animation.cancel();
    });
  });
})();
