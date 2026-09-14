// One source of article text, with native disclosures as the no-script fallback.
(() => {
  const materials = document.getElementById('materials');
  const canvas = document.querySelector('.canvas-shell');
  if (!materials || !canvas) return;
  canvas.id = 'materials-canvas';
  const controls = document.createElement('div');
  controls.className = 'materials-switch';
  controls.setAttribute('role', 'group');
  controls.setAttribute('aria-label', '阅读方式');
  controls.innerHTML = '<span>选择一种阅读方式</span><button type="button" data-mode="cards" aria-controls="materials-canvas" aria-pressed="true">卡片浏览</button><button type="button" data-mode="text" aria-controls="materials" aria-pressed="false">文字目录</button>';
  canvas.before(controls, materials);
  const context = document.createElement('p');
  context.className = 'eyebrow';
  context.textContent = document.getElementById('title')?.textContent || document.title;
  materials.prepend(context);
  document.body.classList.add('materials-enhanced');
  const setMode = (mode) => {
    const text = mode === 'text';
    materials.hidden = !text;
    canvas.hidden = text;
    controls.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.mode === mode)));
    if (!text) window.dispatchEvent(new Event('resize'));
  };
  controls.addEventListener('click', event => {
    const button = event.target.closest('button[data-mode]');
    if (!button) return;
    setMode(button.dataset.mode);
    // Remove only text-directory fragments; article dialogs own their history.
    if (button.dataset.mode === 'cards' && location.hash === '#materials') {
      history.replaceState(history.state, '', location.pathname + location.search);
    }
  });
  const revealFragment = () => {
    let key;
    try { key = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    const target = key && document.getElementById(key);
    if (target && (target === materials || materials.contains(target))) {
      setMode('text');
      const detail = target.closest('details');
      if (detail) detail.open = true;
      target.scrollIntoView({block: 'start'});
    }
  };
  document.querySelectorAll('a[href="#materials"]').forEach(link => link.addEventListener('click', () => setMode('text')));
  window.addEventListener('hashchange', revealFragment);
  setMode('cards');
  revealFragment();
})();
