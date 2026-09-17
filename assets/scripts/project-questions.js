// The complete reading routes remain available as anchor links without JavaScript.
(() => {
  const root = document.getElementById('question-collections');
  if (!root) return;
  const nav = root.querySelector('.question-index');
  const tabs = [...nav.querySelectorAll('[data-question]')];
  const panels = [...root.querySelectorAll('.question-dossier')];
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const animations = new Set();
  let revealObserver;
  function stopMotion() {
    revealObserver?.disconnect();
    animations.forEach(animation => animation.cancel());
    animations.clear();
  }
  function reveal(element, delay = 0) {
    const animation = element.animate(
      [{opacity: .25, transform: 'translateY(12px)'}, {opacity: 1, transform: 'translateY(0)'}],
      {duration: 360, delay, fill: 'backwards', easing: 'cubic-bezier(.22,.7,.2,1)'}
    );
    animations.add(animation);
    animation.onfinish = () => animations.delete(animation);
  }
  motion.addEventListener('change', stopMotion);
  nav.setAttribute('role', 'tablist');
  nav.setAttribute('aria-orientation', 'vertical');
  tabs.forEach(tab => {
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', 'question-' + tab.dataset.question);
  });
  panels.forEach(panel => {
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', 'question-tab-' + panel.id.replace('question-', ''));
  });
  function select(id, animate = false) {
    stopMotion();
    tabs.forEach(tab => {
      const active = tab.dataset.question === id;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    panels.forEach(panel => { panel.hidden = panel.id !== 'question-' + id; });
    if (animate && !motion.matches) {
      const panel = document.getElementById('question-' + id);
      panel.querySelectorAll(':scope > .question-dossier-head, :scope > h3, :scope > .question-lead, :scope > .question-figure')
        .forEach((element, index) => reveal(element, index * 45));
      if ('IntersectionObserver' in window) {
        revealObserver = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            reveal(entry.target);
            revealObserver.unobserve(entry.target);
          });
        }, {threshold: .08});
        panel.querySelectorAll('.question-example, .question-note').forEach(element => revealObserver.observe(element));
      }
    }
  }
  function activate(tab) {
    select(tab.dataset.question, true);
    history.replaceState(history.state, '', location.pathname + location.search + tab.hash);
    const panel = document.getElementById('question-' + tab.dataset.question);
    if (panel.getBoundingClientRect().top < 20) panel.scrollIntoView({block: 'start', behavior: 'instant'});
  }
  nav.addEventListener('click', event => {
    const tab = event.target.closest('[data-question]');
    if (!tab || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    activate(tab);
  });
  nav.addEventListener('keydown', event => {
    const index = tabs.indexOf(document.activeElement);
    if (index < 0) return;
    if (event.key === ' ') {
      event.preventDefault();
      activate(tabs[index]);
      return;
    }
    const next = {ArrowDown: (index+1)%tabs.length, ArrowRight: (index+1)%tabs.length, ArrowUp: (index+tabs.length-1)%tabs.length, ArrowLeft: (index+tabs.length-1)%tabs.length, Home: 0, End: tabs.length-1}[event.key];
    if (next === undefined) return;
    event.preventDefault();
    tabs[next].focus();
    activate(tabs[next]);
  });
  function restore() {
    const tab = tabs.find(tab => tab.hash === location.hash);
    if (!tab) return;
    select(tab.dataset.question);
    document.querySelector('[data-home-view="questions"]').click();
  }
  select(tabs[0].dataset.question);
  restore();
  window.addEventListener('hashchange', restore);
  document.querySelector('[data-home-views]').addEventListener('click', event => {
    const button = event.target.closest('[data-home-view]');
    if (!button) return;
    const fragment = button.dataset.homeView === 'questions'
      ? tabs.find(tab => tab.getAttribute('aria-selected') === 'true').hash
      : '#collections';
    history.replaceState(history.state, '', location.pathname + location.search + fragment);
    if (button.dataset.homeView === 'questions') {
      select(tabs.find(tab => tab.getAttribute('aria-selected') === 'true').dataset.question, true);
    } else {
      stopMotion();
    }
  });
})();
