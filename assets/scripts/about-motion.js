// Motion enhances visible content; nothing is hidden while waiting for JavaScript.
(() => {
  const page = document.querySelector('.about-page');
  if (!page) return;
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const running = new Set();
  const seen = new WeakSet();
  let observer;
  function animate(element, delay = 0, distance = 16) {
    if (preference.matches) return;
    const animation = element.animate([
      {opacity: .2, translate: '0 ' + distance + 'px'},
      {opacity: 1, translate: '0 0'}
    ], {duration: 480, delay, fill: 'backwards', easing: 'cubic-bezier(.22,.7,.2,1)'});
    running.add(animation);
    const clear = () => running.delete(animation);
    animation.onfinish = clear;
    animation.oncancel = clear;
    return animation;
  }
  function setup() {
    observer?.disconnect();
    running.forEach(animation => animation.cancel());
    running.clear();
    if (preference.matches || !('IntersectionObserver' in window)) return;
    observer = new IntersectionObserver(entries => {
      let order = 0;
      entries.forEach(entry => {
        if (!entry.isIntersecting || seen.has(entry.target)) return;
        seen.add(entry.target);
        observer.unobserve(entry.target);
        animate(entry.target, Math.min(order++, 4) * 55);
      });
    }, {threshold: .06});
    page.querySelectorAll(
      '.profile-copy > *, .profile-path > .eyebrow, .profile-path > h2, .profile-path li, .profile-path > a, ' +
      '.profile-notes > section, .section-header, .working-method-intro, .method-folders > li, ' +
      '.experience-item, .capability-ledger > .capability-card, .ai-sheet, .education-item, .about-next'
    ).forEach(element => { if (!seen.has(element)) observer.observe(element); });
  }
  page.querySelectorAll('.method-folder').forEach(folder => {
    let paperAnimation;
    folder.addEventListener('toggle', () => {
      paperAnimation?.cancel();
      if (!folder.open || preference.matches) return;
      const paper = folder.querySelector('.method-paper');
      paperAnimation = animate(paper, 0, 8);
    });
  });
  preference.addEventListener('change', setup);
  setup();
})();
