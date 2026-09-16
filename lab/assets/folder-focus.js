(() => {
  const folder = document.querySelector('.supply-folder');
  const map = folder.querySelector('.reading-map');
  const reset = folder.querySelector('.reset-focus');
  const related = {core:['evidence','practice','cost'],evidence:['core','practice'],practice:['core','evidence'],cost:['core']};
  function focus(id) {
    map.classList.toggle('has-focus', Boolean(id));
    map.querySelectorAll('[data-node]').forEach(node => {
      node.classList.toggle('selected', node.dataset.node === id);
      node.classList.toggle('dimmed', Boolean(id) && node.dataset.node !== id && !related[id].includes(node.dataset.node));
    });
    reset.hidden = !id;
  }
  folder.querySelectorAll('[data-focus]').forEach(material => material.addEventListener('toggle', () => {
    if (material.open) focus(material.dataset.focus);
    else if (material.closest('[data-node]').classList.contains('selected')) focus(null);
  }));
  reset.addEventListener('click', () => {focus(null);folder.querySelector('.material summary').focus({preventScroll:true});});
  let timer;
  function reveal() {clearTimeout(timer);folder.classList.remove('revealing');void folder.offsetWidth;folder.classList.add('revealing');timer=setTimeout(()=>folder.classList.remove('revealing'),850);}
  folder.addEventListener('toggle',()=>{if(folder.open)reveal();});
  if(folder.open)reveal();
  document.querySelector('[data-follow]').addEventListener('click',()=>{document.getElementById('delivery').open=true;});
  function restore(){if(location.hash==='#delivery')document.getElementById('delivery').open=true;}
  window.addEventListener('hashchange',restore);restore();
})();
