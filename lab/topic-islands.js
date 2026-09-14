(() => {
  const themes = {
    supply: ['权益从哪里来', '从实际条件出发，理解供给的选择。', '#d3e7dc'],
    design: ['怎样成为权益', '连接内部资源与面向用户的表达。', '#dce6f0'],
    experience: ['用户如何领取', '把规则翻译成清晰的用户行动。', '#ece6d9']
  };
  const items = {
    source: {theme:'supply', related:[['object','不同来源，如何被系统统一表达？']]},
    choice: {theme:'supply', related:[['package','供给的变化，如何与权益包装分开？']]},
    object: {theme:'design', related:[['source','这些来源，实际有哪些不同？'],['package','内部资源，怎样成为对外权益？']]},
    package: {theme:'design', related:[['receive','不同的包装，带来哪些领取动作？'],['choice','回看供给选择中的人工判断']]},
    receive: {theme:'experience', related:[['package','这些领取方式，对应怎样的权益包装？'],['state','下一步，应该怎样向用户反馈？']]},
    state: {theme:'experience', related:[['object','用户所见的状态，属于哪个业务对象？']]}
  };
  const $ = id => document.getElementById(id);
  const dialog = $('reader'), scroller = $('reader-scroll');
  if (!dialog.showModal) return;
  for (const [id,item] of Object.entries(items)) {
    const source = $('text-'+id);
    item.title = source.querySelector('summary').textContent;
    item.body = [...source.children].filter(el=>el.tagName!=='SUMMARY').map(el=>el.outerHTML).join('');
  }
  document.body.classList.add('enhanced');
  let activeTheme='supply', session=null, path=[], timer;
  const relations = [
    ['source','object','不同来源 → 共同表达'],
    ['package','receive','权益包装 → 领取动作'],
    ['choice','package','人工判断 ↔ 配置边界']
  ];
  function drawLines() {
    const map=document.querySelector('.island-map'),svg=$('island-lines');
    const rect=map.getBoundingClientRect();
    svg.setAttribute('viewBox',`0 0 ${rect.width} ${rect.height}`);
    svg.replaceChildren();
    if(innerWidth<961)return;
    const ns='http://www.w3.org/2000/svg';
    relations.forEach(([from,to,label],index)=>{
      const a=$('card-'+from).getBoundingClientRect(), b=$('card-'+to).getBoundingClientRect();
      const x1=a.right-rect.left, y1=a.top-rect.top+a.height*.48;
      const x2=b.left-rect.left, y2=b.top-rect.top+b.height*.42;
      const mid=(x1+x2)/2;
      const g=document.createElementNS(ns,'g');
      const relevant=!activeTheme||items[from].theme===activeTheme||items[to].theme===activeTheme;
      g.setAttribute('opacity',relevant?'1':'.16');
      const path=document.createElementNS(ns,'path');
      path.setAttribute('d',`M ${x1} ${y1} C ${mid} ${y1},${mid} ${y2},${x2} ${y2}`);
      g.append(path);
      for(const [x,y] of [[x1,y1],[x2,y2]]){const dot=document.createElementNS(ns,'circle');dot.setAttribute('cx',x);dot.setAttribute('cy',y);dot.setAttribute('r','3');g.append(dot);}
      svg.append(g);
    });
  }
  function selectTheme(key) {
    activeTheme=key;
    document.querySelectorAll('[data-theme]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.theme===key)));
    document.querySelectorAll('.island').forEach(island=>island.classList.toggle('is-focused',island.id===key));
    document.querySelectorAll('.material').forEach(card=>card.classList.remove('is-related'));
    const relevant=relations.filter(([a,b])=>items[a].theme===key||items[b].theme===key);
    relevant.forEach(([a,b])=>{ $('card-'+a).classList.add('is-related');$('card-'+b).classList.add('is-related'); });
    $('relation-note').querySelector('p').textContent=key?themes[key][0]+'：'+relevant.map(r=>r[2]).join('；')+'。可通过卡片下方的问题继续阅读。':'虚线连接的是一条阅读线索。点击主题旁的 ⌁，看看它与其他岛屿的联系。';
    drawLines();
  }
  document.querySelectorAll('[data-theme]').forEach(button=>button.addEventListener('click',()=>selectTheme(activeTheme===button.dataset.theme?'':button.dataset.theme)));
  $('clear-focus').addEventListener('click',()=>selectTheme(''));
  new ResizeObserver(drawLines).observe(document.querySelector('.island-map'));
  document.fonts.ready.then(drawLines);
  function renderReader(entry) {
    const item=items[entry.id];
    $('reader-theme').textContent='主题 / '+themes[item.theme][0];
    $('reader-title').textContent=item.title;
    $('reader-body').innerHTML=item.body;
    $('reader-origin').textContent='出发位置：'+themes[session.theme][0]+' / '+items[session.origin].title;
    $('reader-back').disabled=path.length<2;
    $('reader-back').textContent=path.length>1?'← 返回上一篇':'← 阅读起点';
    $('reader-links').replaceChildren(...item.related.map(([id,reason])=>{
      const button=document.createElement('button');button.type='button';
      const label=document.createElement('small');label.textContent=themes[items[id].theme][0]+' / '+reason;
      const title=document.createElement('strong');title.textContent=items[id].title+' →';
      button.append(label,title);button.addEventListener('click',()=>navigate(id));return button;
    }));
    $('reader-title').focus({preventScroll:true});
    scroller.scrollTop=entry.scroll;
  }
  function navigate(id){
    path[path.length-1].scroll=scroller.scrollTop;
    path.push({id,scroll:0});renderReader(path[path.length-1]);
  }
  function openReader(link){
    const id=link.dataset.read, origin=link.dataset.origin||id;
    session={opener:link,origin,theme:items[origin].theme,x:window.scrollX,y:window.scrollY};
    path=[{id,scroll:0}];
    // Keep page geometry constant when its scrollbar is hidden.
    document.body.style.paddingRight=(window.innerWidth-document.documentElement.clientWidth)+'px';
    document.body.classList.add('reader-open');dialog.showModal();renderReader(path[0]);
  }
  document.querySelectorAll('[data-read]').forEach(link=>link.addEventListener('click',event=>{
    event.preventDefault();openReader(link);
  }));
  $('reader-back').addEventListener('click',()=>{
    if(path.length<2)return;path.pop();renderReader(path[path.length-1]);
  });
  $('reader-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>{
    if(!session)return;
    document.body.classList.remove('reader-open');document.body.style.paddingRight='';
    window.scrollTo({left:session.x,top:session.y,behavior:'instant'});
    session.opener.focus({preventScroll:true});
    document.querySelectorAll('.returned').forEach(el=>el.classList.remove('returned'));
    const card=$('card-'+session.origin);card.classList.add('returned');
    $('toast').textContent='已回到「'+items[session.origin].title+'」';$('toast').classList.add('show');
    clearTimeout(timer);timer=setTimeout(()=>{card.classList.remove('returned');$('toast').classList.remove('show');},3000);
    session=null;path=[];
  });
  // Leave Escape to the native dialog: it follows the same restoration path.
  selectTheme('');
})();
