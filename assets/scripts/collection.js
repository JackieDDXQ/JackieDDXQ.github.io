// Navigation is visible without JavaScript. Enhancement only collapses the mobile menu.
(() => {
  const header = document.querySelector('.collection-header');
  const toggle = header?.querySelector('.menu-button');
  const nav = header?.querySelector('.collection-nav');
  if (toggle && nav) {
    header.classList.add('has-menu');
    const setMenu = (open) => {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? '关闭 ×' : '菜单 ＋';
    };
    toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
    header.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setMenu(false); toggle.focus();
      }
    });
    nav.addEventListener('click', (event) => { if (event.target.closest('a')) setMenu(false); });
  }
  const views = document.querySelector('[data-home-views]');
  if (!views) return;
  views.hidden = false;
  const buttons = [...views.querySelectorAll('[data-home-view]')];
  function select(view) {
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.homeView === view)));
    document.querySelectorAll('[data-home-panel]').forEach(panel => { panel.hidden = panel.dataset.homePanel !== view; });
  }
  views.addEventListener('click', event => {
    const button = event.target.closest('[data-home-view]');
    if (button) select(button.dataset.homeView);
  });
  select('projects');
})();
