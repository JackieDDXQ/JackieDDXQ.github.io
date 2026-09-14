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
  const edges = [
    ...Object.keys(topics).map(id => ['identity', id]),
    ['modeling', 'decisions'], ['decisions', 'experience'],
    ['collaboration', 'practice'], ['modeling', 'questions'],
    ['modeling', 'background'], ['practice', 'background']
  ];
  const nodes = [...atlas.querySelectorAll('[data-atlas-id]')];
  const controls = [...atlas.querySelectorAll('[data-atlas-topic]')];
  const svg = atlas.querySelector('.atlas-lines');
  const detail = atlas.querySelector('.atlas-detail');
  const reset = atlas.querySelector('.atlas-reset');
  const hint = atlas.querySelector('.atlas-hint');
  detail.querySelector('h2').tabIndex = -1;
  const ns = 'http://www.w3.org/2000/svg';
  const defs = document.createElementNS(ns, 'defs');
  const mask = document.createElementNS(ns, 'mask');
  mask.id = 'home-atlas-line-mask';
  mask.setAttribute('maskUnits', 'userSpaceOnUse');
  const field = document.createElementNS(ns, 'rect');
  field.setAttribute('fill', 'white');
  const opening = document.createElementNS(ns, 'rect');
  opening.setAttribute('fill', 'black');
  opening.setAttribute('rx', '12');
  mask.append(field, opening); defs.append(mask); svg.append(defs);
  const lineGroup = document.createElementNS(ns, 'g');
  lineGroup.setAttribute('mask', 'url(#home-atlas-line-mask)');
  svg.append(lineGroup);
  let selected = null;
  let hover = null;
  let frame = 0;
  const lines = edges.map(([from, to]) => {
    const element = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    lineGroup.append(element);
    return {from, to, element};
  });
  // Terminate at each element's perimeter so lines never run through its text.
  function perimeter(rect, target, base) {
    const x = rect.left + rect.width / 2, y = rect.top + rect.height / 2;
    const dx = target.left + target.width / 2 - x, dy = target.top + target.height / 2 - y;
    const t = Math.min((rect.width / 2 + 5) / (Math.abs(dx) || 1), (rect.height / 2 + 5) / (Math.abs(dy) || 1), 0.48);
    return [x + dx * t - base.left, y + dy * t - base.top];
  }
  function draw() {
    frame = 0;
    const base = atlas.getBoundingClientRect();
    const center = (selected ? detail : atlas.querySelector('.atlas-identity')).getBoundingClientRect();
    field.setAttribute('width', base.width); field.setAttribute('height', base.height);
    mask.setAttribute('x', '0'); mask.setAttribute('y', '0');
    mask.setAttribute('width', base.width); mask.setAttribute('height', base.height);
    opening.setAttribute('x', center.left - base.left - 10);
    opening.setAttribute('y', center.top - base.top - 7);
    opening.setAttribute('width', center.width + 20);
    opening.setAttribute('height', center.height + 14);
    const rects = new Map(nodes.map(node => [node.dataset.atlasId, node.getBoundingClientRect()]));
    const active = hover || selected;
    const related = new Set(active ? [active, ...edges.filter(edge => edge.includes(active)).flat()] : []);
    lines.forEach(({from, to, element}) => {
      const a = perimeter(rects.get(from), rects.get(to), base);
      const b = perimeter(rects.get(to), rects.get(from), base);
      element.setAttribute('x1', a[0]); element.setAttribute('y1', a[1]);
      element.setAttribute('x2', b[0]); element.setAttribute('y2', b[1]);
      const connected = from === active || to === active;
      element.classList.toggle('is-connected', !!active && connected);
      element.classList.toggle('is-muted', !!active && !connected);
    });
    controls.forEach(node => node.classList.toggle('is-muted', !!active && !related.has(node.dataset.atlasTopic)));
    atlas.querySelector('.atlas-profile').classList.toggle('is-connected', related.has('background'));
  }
  function scheduleDraw() { if (!frame) frame = requestAnimationFrame(draw); }
  function select(id, restoreFocus = false) {
    const previous = selected;
    selected = id;
    hover = null;
    atlas.classList.toggle('has-topic', !!id);
    detail.hidden = !id;
    reset.hidden = !id;
    controls.forEach(node => node.setAttribute('aria-expanded', String(node.dataset.atlasTopic === id)));
    if (id) {
      const content = topics[id];
      detail.querySelector('h2').textContent = content.heading;
      detail.querySelector('.atlas-detail-description').textContent = content.description;
      detail.querySelector('.atlas-detail-links').replaceChildren(...content.links.map(([label, href]) => {
        const link = document.createElement('a'); link.href = href; link.textContent = label + ' ↗'; return link;
      }));
      hint.textContent = content.heading + ' · 选择材料继续阅读';
      detail.querySelector('h2').focus({preventScroll:true});
    } else {
      hint.textContent = '选择一个主题，沿着关联走进具体材料。';
      if (restoreFocus && previous) controls.find(node => node.dataset.atlasTopic === previous)?.focus({preventScroll:true});
    }
    scheduleDraw();
  }
  controls.forEach(node => {
    node.setAttribute('aria-controls', detail.id);
    node.setAttribute('aria-expanded', 'false');
    node.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey || event.button !== 0) return;
      event.preventDefault(); select(selected === node.dataset.atlasTopic ? null : node.dataset.atlasTopic);
    });
    node.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') { hover = node.dataset.atlasTopic; scheduleDraw(); } });
    node.addEventListener('pointerleave', () => { hover = null; scheduleDraw(); });
    node.addEventListener('focus', () => { hover = node.dataset.atlasTopic; scheduleDraw(); });
    node.addEventListener('blur', () => { hover = null; scheduleDraw(); });
  });
  reset.addEventListener('click', () => select(null, true));
  atlas.addEventListener('keydown', event => {
    if (event.key === 'Escape' && selected) { event.preventDefault(); select(null, true); }
  });
  window.addEventListener('resize', scheduleDraw);
  const observer = new ResizeObserver(scheduleDraw);
  observer.observe(atlas); nodes.forEach(node => observer.observe(node));
  document.fonts.ready.then(scheduleDraw);
  hint.textContent = '选择一个主题，沿着关联走进具体材料。';
  scheduleDraw();
})();
