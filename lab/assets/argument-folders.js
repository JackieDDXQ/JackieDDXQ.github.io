(() => {
  const groups = ['supply','delivery','experience'];
  const names = {supply:'权益从哪里来',delivery:'方案怎样用起来',experience:'用户需要做什么'};
  const nodes = new Map([...document.querySelectorAll('[data-node]')].map(el=>[el.dataset.node,el]));
  const relations = [
    ['conditions','manual','当前怎样选择','explain'],
    ['conditions','model','继续追溯关联','explain'],
    ['model','packaging','进一步组织','explain'],
    ['packaging','cost','带来什么成本','cost'],
    ['cost','guide','操作说明的线索','cost'],
    ['roles','guide','落到接入操作','explain'],
    ['packaging','choices','对应领取方式','explain'],
    ['choices','states','还需表达状态','explain']
  ];
  const title = id => nodes.get(id).querySelector('h3').textContent.replace(/\s+/g,' ').trim();
  const groupOf = id => nodes.get(id).closest('.argument-folder').id;
  const toolbar=document.querySelector('.reader-tools'), locationLabel=document.querySelector('#location');
  const summary=document.querySelector('.focus-summary'), back=document.querySelector('#return'), clear=document.querySelector('#clear'), extend=document.querySelector('#extend');
  const dialog=document.querySelector('dialog');
  let state={folder:'supply',node:null,depth:1}, previous=[], opener=null;
  document.body.classList.add('enhanced');toolbar.hidden=false;
  document.querySelectorAll('[data-x]').forEach(el=>{el.style.setProperty('--x',el.dataset.x);el.style.setProperty('--y',el.dataset.y);});
  // Relationship captions stay readable in a linear mobile/no-canvas layout.
  nodes.forEach((el,id)=>{const outgoing=relations.filter(r=>r[0]===id);if(!outgoing.length)return;const p=document.createElement('div');p.className='mobile-relation';p.textContent=outgoing.map(r=>r[2]+' → '+title(r[1])).join(' / ');el.append(p);});
  function neighborhood(){if(!state.node)return new Set(nodes.keys());let seen=new Set([state.node]);for(let i=0;i<state.depth;i++){const next=new Set(seen);relations.forEach(([a,b])=>{if(seen.has(a))next.add(b);if(seen.has(b))next.add(a);});seen=next;}return seen;}
  function draw(){
    const section=document.getElementById(state.folder);if(!section)return;
    const graph=section.querySelector('.graph');graph.querySelector('svg')?.remove();
    if(matchMedia('(max-width:700px)').matches)return;
    const rect=graph.getBoundingClientRect(), seen=neighborhood(), ns='http://www.w3.org/2000/svg';
    const svg=document.createElementNS(ns,'svg');svg.classList.add('edges');svg.setAttribute('viewBox',`0 0 ${rect.width} ${rect.height}`);svg.setAttribute('aria-hidden','true');
    const defs=document.createElementNS(ns,'defs');
    ['explain','cost'].forEach(kind=>{const marker=document.createElementNS(ns,'marker');marker.id='arrow-'+kind;marker.setAttribute('viewBox','0 0 10 10');marker.setAttribute('refX','9');marker.setAttribute('refY','5');marker.setAttribute('markerWidth','6');marker.setAttribute('markerHeight','6');marker.setAttribute('orient','auto-start-reverse');const arrow=document.createElementNS(ns,'polygon');arrow.setAttribute('points','0,0 10,5 0,10');arrow.setAttribute('fill',kind==='cost'?'#b98d72':'#8aab95');marker.append(arrow);defs.append(marker);});svg.append(defs);
    const anchors=new Map([...graph.querySelectorAll('[data-node],[data-portal]')].map(el=>[el.dataset.node||el.dataset.portal,el]));
    relations.forEach(([a,b,label,kind])=>{
      if(!anchors.has(a)||!anchors.has(b))return;
      const ra=anchors.get(a).getBoundingClientRect(),rb=anchors.get(b).getBoundingClientRect();
      const ac={x:ra.left+ra.width/2-rect.left,y:ra.top+ra.height/2-rect.top},bc={x:rb.left+rb.width/2-rect.left,y:rb.top+rb.height/2-rect.top};
      const horizontal=Math.abs(ac.x-bc.x)>Math.abs(ac.y-bc.y);
      const sx=horizontal?ac.x+Math.sign(bc.x-ac.x)*ra.width/2:ac.x,sy=horizontal?ac.y:ac.y+Math.sign(bc.y-ac.y)*ra.height/2;
      const ex=horizontal?bc.x-Math.sign(bc.x-ac.x)*rb.width/2:bc.x,ey=horizontal?bc.y:bc.y-Math.sign(bc.y-ac.y)*rb.height/2;
      const mx=(sx+ex)/2,my=(sy+ey)/2,g=document.createElementNS(ns,'g');
      if(state.node&&!(seen.has(a)&&seen.has(b)))g.classList.add('muted-edge');
      const path=document.createElementNS(ns,'path');path.setAttribute('d',horizontal?`M${sx},${sy} C${mx},${sy} ${mx},${ey} ${ex},${ey}`:`M${sx},${sy} C${sx},${my} ${ex},${my} ${ex},${ey}`);if(kind==='cost')path.classList.add('cost-edge');
      path.setAttribute('marker-end','url(#arrow-'+kind+')');
      const wrap=horizontal&&Math.abs(ex-sx)<label.length*10+14,lines=wrap?[label.slice(0,3),label.slice(3)]:[label];
      const bg=document.createElementNS(ns,'rect');const width=Math.max(...lines.map(l=>l.length))*10+10;bg.setAttribute('x',mx-width/2);bg.setAttribute('y',my-(wrap?17:10));bg.setAttribute('width',width);bg.setAttribute('height',wrap?34:20);bg.setAttribute('rx',5);
      const text=document.createElementNS(ns,'text');text.setAttribute('x',mx);text.setAttribute('y',my);lines.forEach((line,n)=>{const span=document.createElementNS(ns,'tspan');span.setAttribute('x',mx);span.setAttribute('y',my+(wrap?n*14-7:0));span.textContent=line;text.append(span);});if(kind==='cost')text.classList.add('cost-text');
      g.append(path,bg,text);svg.append(g);
    });graph.prepend(svg);
  }
  function render(){
    const seen=neighborhood();
    groups.forEach(id=>document.getElementById(id).hidden=state.folder!==id);
    document.querySelectorAll('[data-folder]').forEach(el=>{const open=el.dataset.folder===state.folder;el.setAttribute('aria-expanded',String(open));el.querySelector('b').textContent=open?'收起 −':'展开 ↗';});
    nodes.forEach((el,id)=>{el.classList.toggle('is-selected',id===state.node);el.classList.toggle('is-muted',!!state.node&&!seen.has(id));el.querySelector('button').setAttribute('aria-pressed',String(id===state.node));});
    document.querySelectorAll('.portal').forEach(el=>el.classList.toggle('is-muted',!!state.node&&!seen.has(el.dataset.portal)));
    locationLabel.textContent=state.folder?(names[state.folder]+(state.node?' / '+title(state.node):' / 已展开')):'选择一个文件夹，展开它的线索';
    back.hidden=!previous.length;clear.hidden=!state.node;extend.hidden=!state.node;extend.disabled=seen.size===nodes.size;extend.textContent=state.depth===1?'再展开一层联系 ＋':`已展开 ${state.depth} 层 · 继续 ＋`;
    summary.hidden=!state.node;
    if(state.node){document.querySelector('#focus-title').textContent=title(state.node);const container=document.querySelector('#focus-links');container.replaceChildren();relations.filter(([a,b])=>a===state.node||b===state.node).forEach(([a,b,label])=>{const other=a===state.node?b:a,link=document.createElement('a');link.href='#'+groupOf(other)+'/'+other;link.dataset.visit=other;link.textContent=title(a)+' → '+label+' → '+title(b);container.append(link);});}
    draw();
  }
  const route=()=>state.folder?'#'+state.folder+(state.node?'/'+state.node:'')+(state.depth>1?'?depth='+state.depth:''):'#overview';
  function move(next,{scroll=false,focus=false}={}){previous.push({...state});state={...next};history.pushState(null,'',route());render();if(scroll&&state.folder)document.getElementById(state.folder).scrollIntoView({block:'start',behavior:'instant'});if(focus&&state.node)nodes.get(state.node).querySelector('button').focus({preventScroll:true});}
  function visit(id){move({folder:groupOf(id),node:id,depth:1},{scroll:groupOf(id)!==state.folder,focus:true});}
  document.addEventListener('click',event=>{
    const folder=event.target.closest('[data-folder]');if(folder){event.preventDefault();move({folder:state.folder===folder.dataset.folder?null:folder.dataset.folder,node:null,depth:1});return;}
    const node=event.target.closest('.node-focus');if(node){const id=node.closest('[data-node]').dataset.node;move({...state,node:state.node===id?null:id,depth:1});return;}
    const link=event.target.closest('[data-portal],[data-visit]');if(link){event.preventDefault();visit(link.dataset.portal||link.dataset.visit);return;}
    const read=event.target.closest('.read-link');if(read){event.preventDefault();opener=read;const source=document.querySelector(read.getAttribute('href'));const clone=source.cloneNode(true);clone.removeAttribute('id');clone.querySelector('h2').id='detail-title';dialog.querySelector('.detail-content').replaceChildren(clone);dialog.showModal();dialog.querySelector('.close-detail').focus();}
  });
  back.addEventListener('click',()=>{const restored=previous.pop();if(!restored)return;state=restored;history.pushState(null,'',route());render();if(state.folder)document.getElementById(state.folder).scrollIntoView({block:'start',behavior:'instant'});const target=state.node?nodes.get(state.node).querySelector('button'):document.querySelector(`[data-folder="${state.folder||'supply'}"]`);target.focus({preventScroll:true});});
  clear.addEventListener('click',()=>move({...state,node:null,depth:1}));extend.addEventListener('click',()=>move({...state,depth:state.depth+1}));
  dialog.querySelector('.close-detail').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>opener?.focus({preventScroll:true}));
  function restore(){const [path,query]=location.hash.slice(1).split('?'),[folder,node]=path.split('/');if(path.startsWith('source-')){document.querySelector('.sources').open=true;document.getElementById(path)?.scrollIntoView();return;}state={folder:folder==='overview'?null:groups.includes(folder)?folder:'supply',node:nodes.has(node)&&groupOf(node)===folder?node:null,depth:Math.min(9,Math.max(1,Number(new URLSearchParams(query).get('depth'))||1))};previous=[];render();}
  window.addEventListener('hashchange',restore);new ResizeObserver(draw).observe(document.querySelector('main'));document.fonts.ready.then(draw);restore();
})();
