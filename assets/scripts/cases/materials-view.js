// Authored articles and native disclosures remain readable without JavaScript.
(() => {
  const materials = document.getElementById('materials');
  const article = document.getElementById('project-article');
  const canvas = document.querySelector('.canvas-shell');
  if (!materials || !article || !canvas) return;
  canvas.id = 'materials-canvas';
  const controls = document.createElement('div');
  controls.className = 'materials-switch';
  controls.setAttribute('role', 'group');
  controls.setAttribute('aria-label', '阅读方式');
  controls.innerHTML = '<span>选择一种阅读方式</span><button type="button" data-mode="cards" aria-controls="materials-canvas" aria-pressed="true">卡片浏览</button><button type="button" data-mode="article" aria-controls="project-article" aria-pressed="false">文章式阅读</button><button type="button" data-mode="text" aria-controls="materials" aria-pressed="false">文字目录</button>';
  canvas.before(controls, materials, article);
  document.body.classList.add('materials-enhanced');
  const setMode = mode => {
    materials.hidden = mode !== 'text';
    article.hidden = mode !== 'article';
    canvas.hidden = mode !== 'cards';
    controls.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.mode === mode)));
    if (mode === 'cards') window.dispatchEvent(new Event('resize'));
  };
  controls.addEventListener('click', event => {
    const button = event.target.closest('button[data-mode]');
    if (!button) return;
    setMode(button.dataset.mode);
    const fragment = {article: 'article', text: 'materials', cards: 'project'}[button.dataset.mode];
    history.replaceState(history.state, '', location.pathname + location.search + '#' + fragment);
  });
  const revealFragment = () => {
    let key;
    try { key = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    const target = key && document.getElementById(key);
    if (target && article.contains(target)) {
      setMode('article');
      target.scrollIntoView({block: 'start'});
    } else if (target && (target === materials || materials.contains(target))) {
      setMode('text');
      const detail = target.closest('details');
      if (detail) detail.open = true;
      target.scrollIntoView({block: 'start'});
    } else if (!key || key === 'project') {
      setMode('cards');
    }
  };
  document.querySelectorAll('a[href="#article"], a[href="#materials"]').forEach(link => {
    link.addEventListener('click', () => setMode(link.hash === '#article' ? 'article' : 'text'));
  });
  article.querySelector('[data-article-return]')?.addEventListener('click', () => {
    setMode('cards');
    controls.scrollIntoView({block: 'start'});
    controls.querySelector('[data-mode="cards"]').focus({preventScroll: true});
  });
  window.addEventListener('hashchange', revealFragment);
  setMode('cards');
  revealFragment();
})();
