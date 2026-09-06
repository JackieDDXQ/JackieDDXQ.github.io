(() => {
  'use strict';

  const graph = document.querySelector('[data-graph]');
  if (graph) {
    const nodes = [...graph.querySelectorAll('[data-node]')];
    const edges = [...graph.querySelectorAll('[data-edge]')];

    const setActiveNode = (activeNode) => {
      const id = activeNode?.dataset.node;
      graph.classList.toggle('has-active', Boolean(id));

      const relatedIds = new Set(id ? [id] : []);
      edges.forEach((edge) => {
        const ids = edge.dataset.edge.split('-');
        const related = Boolean(id && ids.includes(id));
        edge.classList.toggle('is-related', related);
        if (related) ids.forEach((edgeId) => relatedIds.add(edgeId));
      });

      nodes.forEach((node) => {
        node.classList.toggle('is-active', node === activeNode);
        node.classList.toggle('is-related', relatedIds.has(node.dataset.node));
      });
    };

    nodes.forEach((node) => {
      node.addEventListener('pointerenter', () => setActiveNode(node));
      node.addEventListener('pointerleave', () => setActiveNode(null));
      node.addEventListener('focus', () => setActiveNode(node));
      node.addEventListener('blur', () => setActiveNode(null));
    });
  }

  const viewport = document.querySelector('[data-canvas]');
  const stage = viewport?.querySelector('[data-canvas-stage]');
  if (!viewport || !stage) return;

  const initial = { x: -260, y: -170 };
  const position = { ...initial };
  const pointer = { id: null, x: 0, y: 0 };

  const bounds = () => ({
    minX: Math.min(0, viewport.clientWidth - stage.offsetWidth),
    minY: Math.min(0, viewport.clientHeight - stage.offsetHeight),
  });

  const render = () => {
    const limit = bounds();
    position.x = Math.max(limit.minX, Math.min(0, position.x));
    position.y = Math.max(limit.minY, Math.min(0, position.y));
    stage.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`;
  };

  viewport.addEventListener('pointerdown', (event) => {
    if (event.target.closest('button, a')) return;
    pointer.id = event.pointerId;
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    viewport.setPointerCapture(event.pointerId);
    viewport.classList.add('is-dragging');
  });

  viewport.addEventListener('pointermove', (event) => {
    if (event.pointerId !== pointer.id) return;
    position.x += event.clientX - pointer.x;
    position.y += event.clientY - pointer.y;
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    render();
  });

  const stopDragging = (event) => {
    if (event.pointerId !== pointer.id) return;
    pointer.id = null;
    viewport.classList.remove('is-dragging');
  };

  viewport.addEventListener('pointerup', stopDragging);
  viewport.addEventListener('pointercancel', stopDragging);

  viewport.addEventListener('keydown', (event) => {
    const step = event.shiftKey ? 120 : 48;
    const movement = {
      ArrowLeft: [step, 0],
      ArrowRight: [-step, 0],
      ArrowUp: [0, step],
      ArrowDown: [0, -step],
    }[event.key];
    if (!movement) return;
    event.preventDefault();
    position.x += movement[0];
    position.y += movement[1];
    render();
  });

  viewport.querySelector('[data-canvas-reset]')?.addEventListener('click', () => {
    Object.assign(position, initial);
    render();
    viewport.focus();
  });

  const regions = [...stage.querySelectorAll('[data-region]')];
  regions.forEach((region) => {
    const focusRegion = () => {
      regions.forEach((item) => item.classList.toggle('is-focused', item === region));
      stage.classList.add('has-focus');
    };
    region.addEventListener('click', focusRegion);
    region.addEventListener('focus', focusRegion);
  });

  viewport.addEventListener('click', (event) => {
    if (event.target.closest('[data-region]')) return;
    regions.forEach((region) => region.classList.remove('is-focused'));
    stage.classList.remove('has-focus');
  });

  window.addEventListener('resize', render, { passive: true });
  render();
})();
