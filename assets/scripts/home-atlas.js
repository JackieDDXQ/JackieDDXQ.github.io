// Editorial reading connections, not a skill score or a business execution graph.
(() => {
  const atlas = document.querySelector('.home-atlas');
  if (!atlas) return;
  const topics = {
    modeling: {
      heading: '业务怎样成为清晰的结构？',
      description: '从供给、规格与权益之间的关系出发，再看看共享能力如何容纳不同业务。',
      links: [['权益平台 · 对象与边界', 'projects/rights-management.html#project/map'], ['多租户商城 · 共享与差异', 'projects/multi-tenant-mall.html']]
    },
    decisions: {
      heading: '规则之外，如何作出选择？',
      description: '从供给的价格、返点与补货条件，到办理策略的约束，阅读系统规则与人工判断各自的边界。',
      links: [['供给选择 · 人工判断', 'projects/rights-management.html#project/manual'], ['办理条件 · 规则边界', 'projects/rights-management.html#project/policy']]
    },
    experience: {
      heading: '用户此刻，需要做什么？',
      description: '从一份权益的领取，到出行服务里的状态与行动，回到用户能理解的下一步。',
      links: [['权益领取 · 状态与行动', 'projects/rights-management.html#project/journey'], ['和包出行 · 服务体验', 'projects/chuxing-equity.html']]
    },
    collaboration: {
      heading: '不同角色，怎样共同工作？',
      description: '从权益业务的参与方，到多角色的命题协作，观察产品如何连接不同关注点。',
      links: [['权益平台 · 角色关系', 'projects/rights-management.html#project/roles'], ['命题平台 · 协作流程', 'projects/zhishu-platform.html']]
    },
    practice: {
      heading: '方案怎样进入日常工作？',
      description: '从新品接入的步骤，到可以操作的系统原型，沿着材料继续看设计如何被理解与使用。',
      links: [['新品接入 · 交付线索', 'projects/rights-management.html#project/guide'], ['系统原型 · 查看与体验', 'projects/prototypes/rights-management/index.html']]
    },
    questions: {
      heading: '标准化，应该停在哪里？',
      description: '哪些差异可以被吸收？分层之后，复杂度又去了哪里？把尚未完成的问题留在实践旁边。',
      links: [['标准化 · 开放问题', 'projects/rights-management.html#project/thought'], ['使用成本 · 继续追问', 'projects/rights-management.html#project/complexity']]
    }
  };
  // These are editorial reading associations, not measured business causality.
  const routes = {
    modeling: ['decisions', '业务建模 → 规则与取舍', '对象的边界，如何影响规则？'],
    decisions: ['experience', '规则与取舍 → 用户体验', '一个规则，会怎样被用户感知？'],
    experience: ['decisions', '用户体验 → 规则与取舍', '从使用中的困惑，回看规则的设计。'],
    collaboration: ['practice', '协作机制 → 从方案到实践', '不同角色，怎样让方案真正运转？'],
    practice: ['collaboration', '从方案到实践 → 协作机制', '交付之后，谁来接住下一步？'],
    questions: ['modeling', '开放思考 → 业务建模', '一次追问，能否重新看清边界？']
  };
  const edges = [
    ...Object.keys(topics).map(id => ['center', id]),
    ['modeling', 'decisions'], ['decisions', 'experience'],
    ['collaboration', 'practice'], ['modeling', 'questions']
  ];
  const identity = atlas.querySelector('.atlas-identity');
  const mapCenter = atlas.querySelector('.atlas-intro');
  const svg = atlas.querySelector('.atlas-lines');
  const detail = atlas.querySelector('.atlas-detail');
  const reset = atlas.querySelector('.atlas-reset');
  const hint = atlas.querySelector('.atlas-hint');
  const route = atlas.querySelector('.atlas-route');
  const motionButton = atlas.querySelector('.atlas-motion');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = matchMedia('(max-width: 1000px)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const controls = [...atlas.querySelectorAll('[data-atlas-topic]')].map(link => {
    // Native buttons provide Enter/Space disclosure semantics; no-script keeps links.
    const button = document.createElement('button');
    button.type = 'button';
    button.className = link.className;
    button.dataset.atlasId = link.dataset.atlasId;
    button.dataset.atlasTopic = link.dataset.atlasTopic;
    button.setAttribute('aria-controls', detail.id);
    button.setAttribute('aria-expanded', 'false');
    button.append(...link.childNodes);
    link.replaceWith(button);
    return button;
  });
  const surfaces = controls.map(node => ({
    node, surface: node.querySelector('.atlas-topic-surface'), x: 0, y: 0
  }));
  const nodes = [mapCenter, ...surfaces.map(item => item.surface)];
  const ids = ['center', ...controls.map(node => node.dataset.atlasId)];
  const ns = 'http://www.w3.org/2000/svg';
  function makeSvg(tag, attributes = {}) {
    const node = document.createElementNS(ns, tag);
    Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
    return node;
  }
  const defs = makeSvg('defs');
  const mask = makeSvg('mask', {id: 'home-atlas-line-mask', maskUnits: 'userSpaceOnUse'});
  const field = makeSvg('rect', {fill: 'white'});
  const masks = [...nodes, detail, route].map(() => makeSvg('rect', {fill: 'black', rx: 15}));
  mask.append(field, ...masks); defs.append(mask);
  const lineGroup = makeSvg('g', {mask: 'url(#home-atlas-line-mask)'});
  svg.replaceChildren(defs, lineGroup);
  const lines = edges.map(([from, to]) => {
    const element = makeSvg('path', {pathLength: 1, class: from === 'center' ? 'atlas-spoke' : 'atlas-association'});
    const signal = makeSvg('path', {class: 'atlas-signal', pathLength: 1});
    lineGroup.append(element, signal);
    return {from, to, element, signal};
  });
  let selected = null, hovered = null, focused = null;
  let frame = 0, trackUntil = 0, inView = true, userPaused = false, interacted = false;
  let pointerX = 0, pointerY = 0;
  const animations = new Set();
  const pulses = new Set();
  try { userPaused = localStorage.getItem('portfolio:hero-motion') === 'off'; } catch {}
  const canMove = () => !userPaused && !reducedMotion.matches;
  const isVisible = () => inView && !document.hidden;
  function animate(node, keyframes, options) {
    if (!canMove() || !isVisible() || !node.animate) return null;
    const animation = node.animate(keyframes, options);
    animations.add(animation);
    animation.onfinish = animation.oncancel = () => {
      animations.delete(animation); pulses.delete(animation);
    };
    return animation;
  }
  function cancelAnimations() {
    [...animations].forEach(animation => animation.cancel());
    animations.clear(); pulses.clear();
  }
  function perimeter(rect, target, base) {
    const x = rect.left + rect.width / 2, y = rect.top + rect.height / 2;
    const dx = target.left + target.width / 2 - x, dy = target.top + target.height / 2 - y;
    const t = Math.min((rect.width / 2 + 8) / (Math.abs(dx) || 1), (rect.height / 2 + 8) / (Math.abs(dy) || 1), .48);
    return [x + dx * t - base.left, y + dy * t - base.top];
  }
  function draw() {
    if (mobile.matches) return;
    const base = atlas.getBoundingClientRect();
    // Batch geometry reads before updating SVG attributes.
    const boxes = [...nodes, detail, route].map(node => node.getBoundingClientRect());
    const rects = new Map(ids.map((id, index) => [id, boxes[index]]));
    field.setAttribute('width', base.width); field.setAttribute('height', base.height);
    mask.setAttribute('x', 0); mask.setAttribute('y', 0);
    mask.setAttribute('width', base.width); mask.setAttribute('height', base.height);
    masks.forEach((opening, index) => {
      const rect = boxes[index];
      opening.setAttribute('x', rect.left - base.left - 8);
      opening.setAttribute('y', rect.top - base.top - 8);
      opening.setAttribute('width', rect.width ? rect.width + 16 : 0);
      opening.setAttribute('height', rect.height ? rect.height + 16 : 0);
    });
    lines.forEach(({from, to, element, signal}, index) => {
      const a = perimeter(rects.get(from), rects.get(to), base);
      const b = perimeter(rects.get(to), rects.get(from), base);
      const bend = from === 'center' ? 0 : (index % 2 ? 24 : -24);
      const d = 'M ' + a[0] + ' ' + a[1] + ' Q ' + ((a[0] + b[0]) / 2 + bend) + ' ' + ((a[1] + b[1]) / 2 - bend) + ' ' + b[0] + ' ' + b[1];
      element.setAttribute('d', d); signal.setAttribute('d', d);
    });
  }
  function tick(now) {
    frame = 0;
    if (!isVisible()) return;
    let moving = false;
    const allowDrift = canMove() && !mobile.matches && finePointer.matches;
    surfaces.forEach((item, index) => {
      const id = item.node.dataset.atlasId;
      const stationary = id === hovered || id === focused || id === selected;
      const depth = 5 + (index % 3) * 3;
      const targetX = allowDrift && !stationary ? pointerX * depth : 0;
      const targetY = allowDrift && !stationary ? pointerY * depth * .75 : 0;
      const dx = targetX - item.x, dy = targetY - item.y;
      if (Math.abs(dx) + Math.abs(dy) > .04) {
        item.x += dx * .12; item.y += dy * .12; moving = true;
      } else { item.x = targetX; item.y = targetY; }
      item.surface.style.setProperty('--drift-x', item.x.toFixed(2) + 'px');
      item.surface.style.setProperty('--drift-y', item.y.toFixed(2) + 'px');
    });
    draw();
    if (moving || now < trackUntil) scheduleDraw();
  }
  function scheduleDraw(duration = 0) {
    if (duration) trackUntil = Math.max(trackUntil, performance.now() + duration);
    if (!frame && isVisible()) frame = requestAnimationFrame(tick);
  }
  function highlight(emitPulse = true) {
    const active = selected || hovered || focused;
    const related = new Set(active ? ['center', active, routes[active][0]] : []);
    controls.forEach(node => {
      node.classList.toggle('is-muted', !!active && !related.has(node.dataset.atlasId));
      node.classList.toggle('is-connected', !!active && related.has(node.dataset.atlasId));
    });
    [...pulses].forEach(animation => animation.cancel());
    pulses.clear();
    lines.forEach(({from, to, element, signal}) => {
      const connected = !!active && related.has(from) && related.has(to);
      element.classList.toggle('is-connected', connected);
      element.classList.toggle('is-muted', !!active && !connected);
      if (connected && emitPulse && !mobile.matches) {
        const direction = to === active ? -1 : 1;
        const pulse = animate(signal, [
          {strokeDasharray: '.1 .9', strokeDashoffset: direction, opacity: 0},
          {strokeDasharray: '.1 .9', strokeDashoffset: direction * .85, opacity: .85, offset: .15},
          {strokeDasharray: '.1 .9', strokeDashoffset: 0, opacity: 0}
        ], {duration: 850, easing: 'ease-out'});
        if (pulse) pulses.add(pulse);
      }
    });
    route.hidden = !active || !!selected;
    if (active) {
      route.querySelector('.atlas-route-label').textContent = routes[active][1];
      route.querySelector('.atlas-route-question').textContent = routes[active][2];
    }
    scheduleDraw();
  }
  let panelAnimation = null;
  function select(id, restoreFocus = false) {
    interacted = true;
    cancelAnimations();
    const previous = selected;
    selected = id; hovered = null; focused = null;
    atlas.classList.toggle('has-topic', !!id);
    detail.hidden = !id;
    controls.forEach(node => node.setAttribute('aria-expanded', String(node.dataset.atlasTopic === id)));
    if (id) {
      const content = topics[id];
      detail.querySelector('h2').textContent = content.heading;
      detail.querySelector('.atlas-detail-description').textContent = content.description;
      detail.querySelector('.atlas-detail-links').replaceChildren(...content.links.map(([label, href]) => {
        const link = document.createElement('a');
        link.href = href; link.textContent = label;
        const arrow = document.createElement('span');
        arrow.textContent = '↗'; arrow.setAttribute('aria-hidden', 'true'); link.append(arrow);
        return link;
      }));
      const source = controls.find(node => node.dataset.atlasId === id).getBoundingClientRect();
      const target = detail.getBoundingClientRect();
      const originX = source.left + source.width / 2 - target.left;
      const originY = source.top + source.height / 2 - target.top;
      detail.style.setProperty('--origin-x', originX + 'px');
      detail.style.setProperty('--origin-y', originY + 'px');
      if (panelAnimation) panelAnimation.cancel();
      panelAnimation = animate(detail, [
        {opacity: 0, scale: mobile.matches ? '.97' : '.88'},
        {opacity: 1, scale: '1'}
      ], {duration: 460, easing: 'cubic-bezier(.22,1,.36,1)'});
      hint.textContent = routes[id][1] + ' · ' + routes[id][2];
      detail.querySelector('h2').focus({preventScroll: true});
      if (mobile.matches) detail.scrollIntoView({block: 'nearest', behavior: 'instant'});
    } else {
      hint.textContent = '选择一个主题，沿着关联走进具体材料。';
      if (restoreFocus && previous) controls.find(node => node.dataset.atlasId === previous).focus({preventScroll: !mobile.matches});
    }
    highlight();
    scheduleDraw(canMove() ? 720 : 0);
  }
  controls.forEach(node => {
    node.addEventListener('click', () => select(selected === node.dataset.atlasTopic ? null : node.dataset.atlasTopic, selected === node.dataset.atlasTopic));
    node.addEventListener('pointerenter', event => {
      if (event.pointerType !== 'mouse' || mobile.matches) return;
      interacted = true;
      hovered = node.dataset.atlasTopic; highlight();
    });
    node.addEventListener('pointerleave', () => { hovered = null; highlight(false); });
    node.addEventListener('focus', () => { focused = node.dataset.atlasTopic; highlight(); });
    node.addEventListener('blur', () => { focused = null; highlight(false); });
  });
  reset.addEventListener('click', () => select(null, true));
  atlas.addEventListener('keydown', event => {
    if (event.key === 'Escape' && selected) { event.preventDefault(); select(null, true); }
  });
  atlas.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse' || !canMove() || mobile.matches || !finePointer.matches) return;
    const rect = atlas.getBoundingClientRect();
    pointerX = Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1));
    pointerY = Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height * 2 - 1));
    scheduleDraw();
  }, {passive: true});
  atlas.addEventListener('pointerleave', () => { pointerX = 0; pointerY = 0; scheduleDraw(); });
  function updateMotion() {
    cancelAnimations();
    trackUntil = 0; pointerX = 0; pointerY = 0;
    surfaces.forEach(item => {
      item.x = item.y = 0;
      item.surface.style.setProperty('--drift-x', '0px');
      item.surface.style.setProperty('--drift-y', '0px');
    });
    atlas.classList.toggle('motion-off', !canMove());
    document.documentElement.classList.toggle('home-motion-off', !canMove());
    document.dispatchEvent(new CustomEvent('portfolio:motionchange', {detail: {enabled: canMove()}}));
    motionButton.setAttribute('aria-pressed', String(!canMove()));
    motionButton.querySelector('.atlas-motion-label').textContent = reducedMotion.matches ? '已减少动态' : userPaused ? '动态已暂停' : '动态已开启';
    motionButton.setAttribute('aria-label', reducedMotion.matches ? '已遵循系统设置，减少动态效果' : userPaused ? '开启动效' : '暂停动效');
    motionButton.setAttribute('aria-disabled', String(reducedMotion.matches));
    scheduleDraw();
  }
  motionButton.addEventListener('click', () => {
    if (reducedMotion.matches) return;
    interacted = true; userPaused = !userPaused;
    try { localStorage.setItem('portfolio:hero-motion', userPaused ? 'off' : 'on'); } catch {}
    updateMotion();
  });
  motionButton.hidden = false;
  reducedMotion.addEventListener('change', updateMotion);
  mobile.addEventListener('change', () => { updateMotion(); scheduleDraw(); });
  finePointer.addEventListener('change', updateMotion);
  window.addEventListener('resize', () => scheduleDraw());
  const resizeObserver = new ResizeObserver(() => scheduleDraw());
  [atlas, identity, mapCenter, detail, ...controls].forEach(node => resizeObserver.observe(node));
  function suspend() {
    cancelAnimations();
    if (frame) cancelAnimationFrame(frame);
    frame = 0; trackUntil = 0;
  }
  const visibilityObserver = new IntersectionObserver(entries => {
    inView = entries[0].isIntersecting;
    if (!inView) suspend(); else scheduleDraw();
  });
  visibilityObserver.observe(atlas);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) suspend(); else scheduleDraw();
  });
  hint.textContent = '选择一个主题，沿着关联走进具体材料。';
  updateMotion();
  document.fonts.ready.then(() => {
    draw();
    if (!canMove() || interacted || !isVisible()) return;
    const center = mapCenter.getBoundingClientRect();
    [mapCenter].forEach((node, index) => animate(node, [
      {opacity: 0, translate: '0 14px'}, {opacity: 1, translate: '0 0'}
    ], {duration: 750, delay: index * 65, fill: 'backwards', easing: 'cubic-bezier(.22,1,.36,1)'}));
    [...identity.children].forEach((node, index) => animate(node, [
      {opacity: 0, translate: '12px 16px'}, {opacity: 1, translate: '0 0'}
    ], {duration: 850, delay: 650 + index * 85, fill: 'backwards', easing: 'cubic-bezier(.22,1,.36,1)'}));
    surfaces.forEach(({surface}, index) => {
      const rect = surface.getBoundingClientRect();
      const dx = mobile.matches ? 0 : (center.left + center.width / 2 - rect.left - rect.width / 2) * .42;
      const dy = mobile.matches ? 20 : (center.top + center.height / 2 - rect.top - rect.height / 2) * .42;
      animate(surface, [
        {opacity: 0, transform: 'translate(' + dx + 'px,' + dy + 'px) scale(.78) rotate(0deg)'},
        {opacity: 1, transform: getComputedStyle(surface).transform}
      ], {duration: 1050, delay: 140 + index * 65, fill: 'backwards', easing: 'cubic-bezier(.16,1,.3,1)'});
    });
    if (!mobile.matches) lines.forEach(({element, from}, index) => animate(element, [
      {strokeDasharray: '1', strokeDashoffset: 1, opacity: 0},
      {strokeDasharray: '1', strokeDashoffset: 0, opacity: from === 'center' ? .55 : .24}
    ], {duration: 900, delay: 320 + index * 35, fill: 'backwards', easing: 'cubic-bezier(.22,1,.36,1)'}));
    scheduleDraw(1550);
  });
})();
