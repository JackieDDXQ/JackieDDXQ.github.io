/* A small, disposable node model. Content sources remain the existing case pages. */
(() => {
  const topics = {
    product: { title: 'Product', heading: '把业务问题，变成产品结构。', description: '从角色和场景出发，观察产品如何组织资源、规则与协作。', related: ['systems', 'mechanism', 'experience'], links: [['多租户商城 · 产品复用', '../projects/multi-tenant-mall.html'], ['知枢平台 · 产品实践', '../projects/zhishu-platform.html']] },
    systems: { title: 'Systems', heading: '复杂业务，清晰结构。', description: '沿着系统边界，看资源如何被抽象，规则如何被复用，以及不同角色怎样协作。', related: ['product', 'mechanism', 'architecture'], links: [['多租户商城 · 复用与边界', '../projects/multi-tenant-mall.html'], ['知枢平台 · 平台组织', '../projects/zhishu-platform.html']] },
    mechanism: { title: 'Mechanism', heading: '规则，让系统运转。', description: '从条件、边界与状态，进入产品背后的运行逻辑。同一个项目，可以从另一种问题重新理解。', related: ['systems', 'product', 'experience'], links: [['直接进入 · 三级限办机制', '#policy'], ['知枢平台 · 查看现有案例', '../projects/zhishu-platform.html']] },
    experience: { title: 'Experience', heading: '把系统复杂度，留在背后。', description: '从用户下一步要做什么，回看后台的配置、状态与交付方式。', related: ['product', 'mechanism', 'research'], links: [['权益系统 · 领取端体验', '../projects/rights-management.html#experience'], ['出行权益 · 查看现有案例', '../projects/chuxing-equity.html']] },
    research: { title: 'Research', heading: '从问题，重新观察。', description: '这一轮先以项目中的问题与决策作为研究入口。独立研究材料尚待整理。', related: ['experience', 'notes', 'architecture'], links: [['权益系统 · 问题与决策', '../projects/rights-management.html']] },
    architecture: { title: 'Architecture', heading: '从空间背景，理解组织。', description: '建筑背景在这里是一条理解结构与关系的线索。它与产品系统的联系，是本轮信息组织的探索假设。', related: ['systems', 'research', 'experience'], links: [['个人背景 · 现有介绍', '../about.html'], ['进入系统职责图', '#structure']] },
    notes: { title: 'Notes', heading: '沿着问题，留下线索。', description: '独立笔记尚待整理。本轮先连接现有项目里的设计决策，观察它们怎样成为新的探索入口。', related: ['research', 'mechanism', 'product'], links: [['权益系统 · 阅读设计决策', '../projects/rights-management.html'], ['回到三级机制', '#policy']] }
  };
  const details = { structure: '系统结构', policy: '三级限办', business: '业务关系', impact: '指标草案', evidence: '界面片段' };
  const edges = [['identity','product'],['identity','systems'],['identity','mechanism'],['identity','experience'],['identity','research'],['systems','architecture'],['research','notes'],['product','project'],['systems','project'],['mechanism','project']];
  const body = document.body;
  const atlas = document.querySelector('.atlas');
  const nodes = [...document.querySelectorAll('[data-node]')];
  const originalPositions = nodes.map(node => [node.style.getPropertyValue('--x'), node.style.getPropertyValue('--y')]);
  const projectNode = document.querySelector('.project-node');
  const topicCopy = document.querySelector('.topic-copy');
  const world = document.querySelector('.world');
  const viewport = document.querySelector('.viewport');
  const mobile = matchMedia('(max-width:700px)');
  const reduced = matchMedia('(prefers-reduced-motion:reduce)');
  let current = 'overview';
  let path = ['overview'];
  let activeHover = null;
  let frame = 0;
  let pan = { x: 0, y: 0, scale: 1 };
  let drag = null;
  let suppressClick = false;
  const panMemory = new Map();
  const motionToggle = document.querySelector('.motion-toggle');
  const animations = new Set();
  let ghost = null;
  let motionEnabled = true;
  let tiltFrame = 0;
  const svg = document.querySelector('.connections');
  const svgNS = 'http://www.w3.org/2000/svg';
  const lineElements = edges.map(([from, to]) => {
    const line = document.createElementNS(svgNS, 'line');
    svg.append(line);
    return { from, to, line };
  });
  const label = id => topics[id]?.title || details[id] || (id === 'project' ? '运营商权益' : 'Jackie Hou');
  const valid = id => id === 'overview' || id === 'project' || Object.hasOwn(topics, id) || Object.hasOwn(details, id);
  function getRoute() {
    const id = location.hash.slice(1);
    return valid(id) ? id : 'overview';
  }
  function center(id) {
    const element = id === 'identity' ? document.querySelector('.identity') : id === 'project' ? projectNode : nodes.find(node => node.dataset.node === id);
    const rect = element.getBoundingClientRect();
    const base = atlas.getBoundingClientRect();
    return [rect.left - base.left + rect.width / 2, rect.top - base.top + rect.height / 2];
  }
  function drawLines() {
    if (body.dataset.view !== 'atlas') return;
    const focused = topics[current] ? current : activeHover;
    const related = topics[focused]?.related || [];
    lineElements.forEach(({ from, to, line }) => {
      const a = center(from), b = center(to);
      line.setAttribute('x1', a[0]); line.setAttribute('y1', a[1]);
      line.setAttribute('x2', b[0]); line.setAttribute('y2', b[1]);
      const selected = from === focused || to === focused;
      line.classList.toggle('active', !!focused && selected);
      line.classList.toggle('quiet', !!focused && !selected);
      if (topics[current] && from === 'identity') line.classList.add('quiet');
    });
    nodes.forEach(node => node.classList.toggle('dim', !!focused && node.dataset.node !== focused && !related.includes(node.dataset.node)));
  }
  function animateLines() {
    cancelAnimationFrame(frame);
    const start = performance.now();
    function tick(now) {
      drawLines();
      if (!reduced.matches && now - start < 720) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
  }
  function renderAtlas(id) {
    const topic = topics[id];
    atlas.classList.toggle('is-focused', !!topic);
    topicCopy.hidden = !topic;
    nodes.forEach((node, i) => {
      node.classList.toggle('selected', node.dataset.node === id);
      if (node.dataset.node === id) node.setAttribute('aria-current', 'location');
      else node.removeAttribute('aria-current');
      let position = originalPositions[i];
      if (topic) {
        if (node.dataset.node === id) position = [25, 22];
        else {
          const relatedIndex = topic.related.indexOf(node.dataset.node);
          const relatedPositions = [[59,20],[85,32],[78,79]];
          const otherIds = nodes.filter(n => n.dataset.node !== id && !topic.related.includes(n.dataset.node)).map(n=>n.dataset.node);
          const peripheral = [[12,84],[39,85],[90,66]];
          position = relatedIndex >= 0 ? relatedPositions[relatedIndex] : peripheral[otherIds.indexOf(node.dataset.node)];
        }
      }
      node.style.setProperty('--x', position[0]);
      node.style.setProperty('--y', position[1]);
    });
    if (topic) {
      topicCopy.querySelector('h2').textContent = topic.heading;
      topicCopy.querySelector('p').textContent = topic.description;
      const links = topicCopy.querySelector('.topic-links');
      links.replaceChildren(...topic.links.map(([title, href]) => {
        const a = document.createElement('a'); a.textContent = title + ' ↗'; a.href = href; return a;
      }));
    }
    document.querySelector('.relation-hint').textContent = topic ? `${topic.title} → 运营商权益 → 继续深入` : '选择一个词，展开它的关系。';
    animateLines();
  }
  function applyPan() {
    if (mobile.matches) { world.style.transform = ''; return; }
    const width = viewport.clientWidth, height = viewport.clientHeight;
    // Keep every object reachable while retaining a small, bounded margin.
    pan.x = Math.min(35, Math.max(width - 1500 * pan.scale - 80, pan.x));
    pan.y = Math.min(25, Math.max(height - 1060 * pan.scale - 45, pan.y));
    world.style.transform = `translate(${pan.x}px, ${pan.y}px) scale(${pan.scale})`;
  }
  function resetPan() {
    pan.scale = Math.min(1, Math.max(.72, viewport.clientWidth / 1450));
    pan.x = Math.max(0, (viewport.clientWidth - 1450 * pan.scale) / 2);
    pan.y = 0;
    applyPan();
  }
  function renderTrail() {
    const trail = document.querySelector('.trail');
    trail.replaceChildren();
    path.slice(-6).forEach((id, i) => {
      if (i) { const divider = document.createElement('span'); divider.textContent = '—'; divider.setAttribute('aria-hidden', 'true'); trail.append(divider); }
      const a = document.createElement('a'); a.href = '#' + id; a.textContent = label(id);
      if (id === current) a.setAttribute('aria-current', 'location');
      trail.append(a);
    });
    const depth = current === 'overview' ? 0 : topics[current] ? 1 : current === 'project' ? 2 : 3;
    document.querySelector('.depth b').textContent = '0' + depth;
    document.querySelectorAll('.depth i').forEach((dot, i) => dot.classList.toggle('on', i < depth));
  }
  function render(id, moveFocus = false) {
    if (current === 'project') panMemory.set('project', { ...pan });
    current = id;
    activeHover = null;
    const view = id === 'overview' || topics[id] ? 'atlas' : id === 'project' ? 'project' : 'reading';
    body.dataset.view = view;
    if (view === 'atlas') renderAtlas(id);
    if (view === 'project') {
      if (panMemory.has('project')) { pan = { ...panMemory.get('project') }; applyPan(); }
      else resetPan();
    }
    document.querySelectorAll('.story').forEach(story => story.hidden = story.id !== id);
    if (view === 'reading') document.querySelector('.reading-count').textContent = `0${Object.keys(details).indexOf(id) + 1} / 05`;
    const existing = path.lastIndexOf(id);
    if (existing >= 0) path = path.slice(0, existing + 1);
    else path.push(id);
    renderTrail();
    document.title = `${label(id)} — Work & Thinking · Jackie Hou`;
    document.querySelector('#view-status').textContent = `${label(id)}，${view === 'atlas' ? '关系地图' : view === 'project' ? '项目全景' : '内容阅读'}`;
    if (moveFocus) {
      const target = topics[id] ? nodes.find(n => n.dataset.node === id) : id === 'overview' ? document.querySelector('.overview-link') : id === 'project' ? document.querySelector('.project-title h2') : document.querySelector(`#${id} h2`);
      target?.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }
  // Animation never owns navigation state: rapid input always wins immediately.
  function animate(element, keyframes, options) {
    const animation = element.animate(keyframes, options);
    animations.add(animation);
    animation.finished.catch(() => {}).finally(() => animations.delete(animation));
    return animation;
  }
  function cancelMotion() {
    animations.forEach(animation => animation.cancel());
    animations.clear();
    ghost?.remove();
    ghost = null;
    cancelAnimationFrame(tiltFrame);
    document.querySelectorAll('[data-tilting]').forEach(element => {
      element.style.removeProperty('--tilt-x'); element.style.removeProperty('--tilt-y');
      delete element.dataset.tilting;
    });
  }
  const depthOf = id => id === 'overview' ? 0 : topics[id] ? 1 : id === 'project' ? 2 : 3;
  function changeView(id, source) {
    cancelMotion();
    if (id === current) { render(id, true); return; }
    const oldView = body.dataset.view;
    const nextView = id === 'overview' || topics[id] ? 'atlas' : id === 'project' ? 'project' : 'reading';
    const useMotion = motionEnabled && !reduced.matches;
    const useDepth = useMotion && !mobile.matches;
    const direction = depthOf(id) >= depthOf(current) ? 1 : -1;
    const outgoing = oldView === 'atlas' ? atlas : oldView === 'project' ? document.querySelector('.project-space') : document.querySelector('.reading');
    const box = outgoing.getBoundingClientRect();
    const sourceBox = source?.getBoundingClientRect();
    const originX = sourceBox ? sourceBox.left + sourceBox.width / 2 - box.left : box.width / 2;
    const originY = sourceBox ? sourceBox.top + sourceBox.height / 2 - box.top : box.height / 2;
    const snapshot = useDepth && oldView !== nextView ? outgoing.cloneNode(true) : null;
    if (snapshot) {
      snapshot.removeAttribute('id');
      snapshot.querySelectorAll('[id]').forEach(element => element.removeAttribute('id'));
      snapshot.setAttribute('aria-hidden', 'true');
      snapshot.inert = true;
      snapshot.classList.add('scene-ghost');
      Object.assign(snapshot.style, { left: `${box.left}px`, top: `${box.top}px`, width: `${box.width}px`, height: `${box.height}px`, transformOrigin: `${originX}px ${originY}px` });
    }
    render(id, true);
    if (!useMotion) return;
    const incoming = nextView === 'atlas' ? atlas : nextView === 'project' ? document.querySelector('.project-space') : document.querySelector('.reading');
    if (snapshot) {
      ghost = snapshot;
      body.append(snapshot);
      animate(snapshot, [
        { opacity: 1, transform: 'perspective(1400px) translateZ(0px) rotateX(0deg)' },
        { opacity: 0, transform: `perspective(1400px) translateZ(${direction * 210}px) rotateX(${direction * 7}deg)` }
      ], { duration: 460, easing: 'cubic-bezier(.22,.7,.16,1)', fill: 'forwards' }).finished.catch(() => {}).finally(() => {
        snapshot.remove(); if (ghost === snapshot) ghost = null;
      });
    }
    if (oldView === 'atlas' && nextView === 'atlas') {
      if (topics[id]) animate(topicCopy, [
        { opacity: 0, transform: useDepth ? 'perspective(1000px) translate3d(-15px,25px,-70px) rotateY(7deg)' : 'translateY(12px)' },
        { opacity: 1, transform: 'none' }
      ], { duration: 650, easing: 'cubic-bezier(.22,.7,.16,1)' });
    } else {
      animate(incoming, [
        { opacity: .1, transform: useDepth ? `perspective(1400px) translateZ(${-direction * 150}px) rotateX(${-direction * 6}deg)` : 'translateY(16px)' },
        { opacity: 1, transform: 'none' }
      ], { duration: useDepth ? 680 : 300, easing: 'cubic-bezier(.22,.7,.16,1)' }).finished.catch(() => {}).finally(animateLines);
    }
    const objects = nextView === 'project' ? [...world.querySelectorAll('.object')] : nextView === 'reading' ? [document.querySelector(`#${id} .story-visual`)] : [];
    objects.forEach((object, index) => animate(object, [
      { opacity: 0, transform: useDepth ? `perspective(1100px) translate3d(0,${40 + index * 9}px,${-100 - index * 18}px) rotateX(13deg) rotateY(-7deg)` : 'translateY(12px)' },
      { opacity: 1, transform: 'none' }
    ], { duration: useDepth ? 720 : 280, delay: useDepth ? 70 + index * 55 : 0, easing: 'cubic-bezier(.2,.75,.15,1)', fill: 'backwards' }));
  }
  function navigate(id, source) {
    if (!valid(id)) return;
    if (id !== current) history.pushState({ spatial: true }, '', '#' + id);
    changeView(id, source);
  }
  body.classList.add('enhanced');
  function syncMotionPreference() {
    cancelMotion();
    const enabled = motionEnabled && !reduced.matches;
    body.classList.toggle('depth-enabled', enabled);
    motionToggle.hidden = false;
    motionToggle.disabled = reduced.matches;
    motionToggle.setAttribute('aria-pressed', String(enabled));
    motionToggle.querySelector('b').textContent = enabled ? '开' : '关';
    motionToggle.title = reduced.matches ? '已遵循系统的减少动态效果设置' : '切换空间动效';
    animateLines();
  }
  motionToggle.addEventListener('click', () => { motionEnabled = !motionEnabled; syncMotionPreference(); });
  reduced.addEventListener('change', syncMotionPreference);
  mobile.addEventListener('change', cancelMotion);
  syncMotionPreference();
  document.addEventListener('click', event => {
    if (suppressClick) { event.preventDefault(); suppressClick = false; return; }
    const a = event.target.closest('a[href^="#"]');
    if (!a || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const id = a.getAttribute('href').slice(1);
    if (!valid(id)) return;
    event.preventDefault(); navigate(id, a);
  });
  nodes.forEach(node => {
    const activate = () => { activeHover = node.dataset.node; animateLines(); };
    const deactivate = () => { activeHover = null; animateLines(); };
    node.addEventListener('pointerenter', activate);
    node.addEventListener('pointerleave', deactivate);
    node.addEventListener('focus', activate);
    node.addEventListener('blur', deactivate);
  });
  window.addEventListener('popstate', () => changeView(getRoute()));
  window.addEventListener('hashchange', () => { if (getRoute() !== current) changeView(getRoute()); });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || current === 'overview') return;
    event.preventDefault();
    navigate(Object.hasOwn(details, current) ? 'project' : current === 'project' && path.length > 1 ? path[path.length - 2] : 'overview');
  });
  viewport.addEventListener('pointerdown', event => {
    if (mobile.matches || event.button !== 0 || event.target.closest('a,button')) return;
    suppressClick = false;
    drag = { x: event.clientX, y: event.clientY, startX: pan.x, startY: pan.y, moved: false };
    viewport.setPointerCapture(event.pointerId);
    viewport.classList.add('dragging');
    viewport.focus({ preventScroll: true });
  });
  viewport.addEventListener('pointermove', event => {
    if (!drag) return;
    const dx = event.clientX - drag.x, dy = event.clientY - drag.y;
    drag.moved ||= Math.abs(dx) + Math.abs(dy) > 5;
    pan.x = drag.startX + dx; pan.y = drag.startY + dy; applyPan();
  });
  function endDrag(event) {
    if (!drag) return;
    suppressClick = event.type !== 'pointercancel' && drag.moved;
    drag = null; viewport.classList.remove('dragging');
    if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
    // Suppression applies only to the click generated by this pointer gesture.
    setTimeout(() => { suppressClick = false; }, 0);
  }
  viewport.addEventListener('pointerup', endDrag);
  viewport.addEventListener('pointercancel', endDrag);
  viewport.addEventListener('keydown', event => {
    if (mobile.matches || event.target !== viewport) return;
    const movement = { ArrowLeft: [80,0], ArrowRight: [-80,0], ArrowUp: [0,80], ArrowDown: [0,-80] }[event.key];
    if (!movement) return;
    event.preventDefault(); pan.x += movement[0]; pan.y += movement[1]; applyPan();
  });
  viewport.addEventListener('focusin', event => {
    if (mobile.matches || !event.target.closest('.object')) return;
    const object = event.target.closest('.object');
    const r = object.getBoundingClientRect(), v = viewport.getBoundingClientRect();
    if (r.right > v.right - 35) pan.x -= r.right - v.right + 35;
    if (r.left < v.left + 35) pan.x += v.left + 35 - r.left;
    if (r.bottom > v.bottom - 75) pan.y -= r.bottom - v.bottom + 75;
    if (r.top < v.top + 30) pan.y += v.top + 30 - r.top;
    applyPan();
  });
  document.querySelector('[data-reset]').addEventListener('click', resetPan);
  document.querySelectorAll('.object,.story-visual').forEach(element => {
    element.addEventListener('pointermove', event => {
      if (!motionEnabled || reduced.matches || mobile.matches || event.pointerType !== 'mouse' || drag) return;
      const rect = element.getBoundingClientRect();
      const x = Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1));
      const y = Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height * 2 - 1));
      cancelAnimationFrame(tiltFrame);
      tiltFrame = requestAnimationFrame(() => {
        element.dataset.tilting = '';
        element.style.setProperty('--tilt-x', `${-y * 4}deg`);
        element.style.setProperty('--tilt-y', `${x * 5}deg`);
      });
    });
    element.addEventListener('pointerleave', () => {
      cancelAnimationFrame(tiltFrame);
      element.style.removeProperty('--tilt-x'); element.style.removeProperty('--tilt-y');
      delete element.dataset.tilting;
    });
  });
  new ResizeObserver(() => {
    animateLines();
    if (current === 'project') resetPan();
  }).observe(atlas);
  window.addEventListener('resize', () => {
    if (current === 'project') resetPan();
    else if (body.dataset.view === 'atlas') animateLines();
  });
  render(getRoute());
})();
