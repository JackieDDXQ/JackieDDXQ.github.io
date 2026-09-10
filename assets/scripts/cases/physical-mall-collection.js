const items = [
  {
    "id": "chain",
    "title": "从权益运营走向实物履约",
    "type": "项目背景",
    "category": "structure",
    "caption": "延续商品运营，增加配送与到店交付的触点。",
    "tags": [
      "项目背景",
      "原型线索"
    ],
    "related": [
      "catalog",
      "fulfilment",
      "prototype"
    ],
    "visual": "<div class=\"mini-quote\">权益运营 → 实物商品 → 两种履约</div>"
  },
  {
    "id": "catalog",
    "title": "先把商品信息组织起来",
    "type": "商品模型",
    "category": "structure",
    "caption": "分类、品牌、价格与交付方式，在创建商品时共同定义。",
    "tags": [
      "商品模型",
      "原型线索"
    ],
    "related": [
      "batch",
      "fulfilment",
      "chain"
    ],
    "visual": "<div class=\"mini-quote\">商品信息<br>品牌<br>交付方式</div>"
  },
  {
    "id": "batch",
    "title": "批量录入，也需要反馈",
    "type": "批量运营",
    "category": "decision",
    "caption": "模板、格式与结果提示，把重复任务集中到一次操作中。",
    "tags": [
      "批量运营",
      "原型线索"
    ],
    "related": [
      "catalog",
      "orders",
      "questions"
    ],
    "visual": "<div class=\"mini-quote\">准备模板 → 上传文件 → 查看结果</div>"
  },
  {
    "id": "fulfilment",
    "title": "一件商品，两条交付路径",
    "type": "履约分支",
    "category": "structure",
    "caption": "快递配送填写地址，线下自提选择门店并出示凭证。",
    "tags": [
      "履约分支",
      "原型线索"
    ],
    "related": [
      "orders",
      "stores",
      "prototype"
    ],
    "visual": "<div class=\"mini-quote\">配送 → 地址与收货<br>自提 → 门店与凭证</div>"
  },
  {
    "id": "orders",
    "title": "订单状态要指向下一步",
    "type": "订单操作",
    "category": "practice",
    "caption": "发货与核销对应不同履约动作，详情保留处理线索。",
    "tags": [
      "订单操作",
      "原型线索"
    ],
    "related": [
      "fulfilment",
      "batch",
      "stores"
    ],
    "visual": "<div class=\"mini-quote\">待发货 → 发货<br>待核销 → 核销</div>"
  },
  {
    "id": "stores",
    "title": "到店交付还需要谁参与",
    "type": "门店协作",
    "category": "practice",
    "caption": "门店、员工与订单核销，让用户凭证有接收方。",
    "tags": [
      "门店协作",
      "原型线索"
    ],
    "related": [
      "orders",
      "fulfilment",
      "questions"
    ],
    "visual": "<div class=\"mini-quote\">用户凭证 → 店员核销 → 门店记录</div>"
  },
  {
    "id": "prototype",
    "title": "走进管理端与用户端",
    "type": "交互原型",
    "category": "practice",
    "caption": "保留原有两个入口，按运营与用户视角体验。",
    "tags": [
      "交互原型",
      "原型线索"
    ],
    "related": [
      "catalog",
      "fulfilment",
      "orders"
    ],
    "visual": "<div class=\"mini-quote\">管理后台 ↔ 用户端 H5</div>"
  },
  {
    "id": "questions",
    "title": "从原型走向可验证的结果",
    "type": "开放思考",
    "category": "reflection",
    "caption": "下一份材料，应当解释真实任务怎样完成。",
    "tags": [
      "开放思考",
      "待补记录"
    ],
    "related": [
      "batch",
      "orders",
      "prototype"
    ],
    "visual": "<div class=\"mini-quote\">操作记录<br>交付范围<br>指标口径</div>"
  }
];

const categories={structure:{name:'结构'},decision:{name:'决策'},practice:{name:'实践'},reflection:{name:'思考'}};
const previews=Object.fromEntries(items.map(i=>[i.id,{category:i.category}]));
const visuals={};
const collections={project:{title:'一件商品的两种交付',en:'PROJECT COLLECTION / 05',description:'从权益运营延伸到实物商品，沿商品准备、订单处理与门店交付，阅读结构、判断、实践与思考。',aside:'实物商城 · 产品与运营<br>项目案例与交互原型<span class="project-fact">配送 × 到店自提<small>基于现有页面与原型整理</small></span><a href="./prototypes/physical-mall/emall/index.html" target="_blank" rel="noopener">管理后台原型 ↗</a><br><a href="./prototypes/physical-mall/emall/h5-new.html" target="_blank" rel="noopener">用户端 H5 原型 ↗</a>'}};
function preview(i){return '<div class="surface uniform '+i.category+'"><div class="preview-label"><span class="category-tag">'+categories[i.category].name+'</span>'+i.tags.map(t=>'<span class="facet-tag">'+t+'</span>').join('')+'</div><div class="mall-preview">'+i.visual+'</div><small class="preview-foot">'+i.type+' · 方案材料</small></div>';}
function detailTags(i){return '<div class="tag-dimension"><small>主题与材料</small><div>'+i.tags.map(t=>'<span class="topic-chip">'+t+'</span>').join('')+'</div></div>';}
for(const item of items){
 const source=document.getElementById('project/'+item.id);
 item.sets=['project'];item.source=source.dataset.source;
 const copy=source.cloneNode(true);copy.querySelector('summary').remove();copy.querySelectorAll('[id]').forEach(e=>e.removeAttribute('id'));
 item.body=copy.innerHTML;visuals[item.id]=preview(item);
}
// Native fragments lead to static details without JS; enhanced reading owns these fragments.
document.querySelectorAll('.static-materials details[id]').forEach(detail=>{detail.dataset.articleId=detail.id;detail.removeAttribute('id');});
const $=id=>document.getElementById(id);let current='project',opener=null;const reader=$('reader');
function render(){
 const [candidate,block]=location.hash.slice(1).split('/');
 current='project';
 const c=collections[current];
 $('title').textContent=c.title;$('eyebrow').textContent=c.en;$('description').textContent=c.description;$('aside').innerHTML=c.aside;
 document.querySelectorAll('[data-collection]').forEach(a=>{if(a.dataset.collection===current)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
 const list=items.filter(i=>i.sets.includes(current));
 $('count').textContent=String(list.length).padStart(2,'0')+' 份内容';
 if (!$('grid').querySelector('[data-item]')) $('grid').innerHTML=list.map(i=>'<button class="card" data-item="'+i.id+'" aria-haspopup="dialog">'+preview(i)+'<div class="card-copy"><h3>'+i.title+'</h3><p class="caption">'+i.caption+'</p><div class="card-bottom"><span>查看'+i.type+' ↗</span><span>'+categories[previews[i.id].category].name+'</span></div></div></button>').join('');
 if(block&&items.some(i=>i.id===block))openItem(block);else if(reader.open)reader.close();
}
function openItem(id){const i=items.find(i=>i.id===id);if(!i)return;if(!reader.open)opener=document.activeElement; $('reader-title').textContent=i.title;$('reader-type').textContent=i.type+' / '+String(items.indexOf(i)+1).padStart(2,'0');$('reader-visual').innerHTML=visuals[id].replace('id="ticket-status"','id="active-ticket"');$('reader-body').innerHTML=i.body;$('provenance').textContent=i.source;$('connections').innerHTML=detailTags(i);$('related').innerHTML=i.related.map(r=>`<button data-item="${r}">${items.find(t=>t.id===r).title} →</button>`).join('');if(!reader.open)reader.showModal();reader.scrollTop=0;$('reader-title').tabIndex=-1;$('reader-title').focus({preventScroll:true});}
document.addEventListener('click',e=>{const item=e.target.closest('[data-item]');if(!item)return;if(!reader.open)opener=item;const next=current+'/'+item.dataset.item;if(location.hash.slice(1)===next)openItem(item.dataset.item);else location.hash=next;});
function closeReader(){
 const activeId=location.hash.split('/')[1];
 history.replaceState(null,'',location.pathname+location.search+'#project');
 reader.close();
 const target=opener?.isConnected&&opener!==document.body?opener:document.querySelector('#grid [data-item="'+activeId+'"]');
 if(target){window.revealFolderCard?.(target);target.focus({preventScroll:true});if(target.classList.contains('card'))target.scrollIntoView({block:'nearest',inline:'nearest',behavior:'instant'});}
 if(typeof syncRoute==='function')syncRoute();
}
document.querySelector('.close').addEventListener('click',closeReader);reader.addEventListener('cancel',e=>{e.preventDefault();closeReader()});window.addEventListener('hashchange',render);render();

// Reference layer: spatial-canvas.js
const intro=document.querySelector('.intro'),grid=document.getElementById('grid');
const shell=document.createElement('section');shell.className='canvas-shell';shell.setAttribute('aria-label','项目内容画布');
const viewport=document.createElement('div');viewport.className='canvas-viewport';viewport.tabIndex=0;viewport.setAttribute('aria-label','项目画布，可拖动空白处或使用方向键平移；Tab 键访问内容');
const world=document.createElement('div');world.className='canvas-world';
grid.before(shell);shell.append(viewport);viewport.append(world);world.append(intro,grid);
const toolbar=document.createElement('div');toolbar.className='canvas-toolbar';toolbar.innerHTML='<span>内容用途</span><button data-category="structure">结构 · 2</button><button data-category="decision">决策 · 1</button><button data-category="practice">实践 · 2</button><button data-category="reflection">思考 · 1</button><button class="reset">复位 ↺</button>';shell.append(toolbar);
const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
toolbar.querySelectorAll('[data-category]').forEach(b=>{const key=b.dataset.category;b.textContent=categories[key].name+' · '+items.filter(i=>previews[i.id].category===key).length});
const categoryCursor={};
toolbar.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.classList.contains('reset')){viewport.scrollTo({left:0,top:0,behavior:reduced()?'instant':'smooth'});toolbar.querySelectorAll('[data-category]').forEach(x=>x.removeAttribute('aria-current'));return}const key=b.dataset.category;const matches=[...grid.querySelectorAll('[data-item]')].filter(card=>previews[card.dataset.item].category===key);if(!matches.length)return;const n=categoryCursor[key]||0;const card=matches[n%matches.length];categoryCursor[key]=n+1;toolbar.querySelectorAll('[data-category]').forEach(x=>{if(x===b)x.setAttribute('aria-current','true');else x.removeAttribute('aria-current')});b.title='再次点击定位下一份同类内容';window.revealFolderCard?.(card);card.focus({preventScroll:true});card.scrollIntoView({block:'center',inline:'center',behavior:reduced()?'instant':'smooth'});});
let drag=null;
viewport.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.button!==0||e.target.closest('button,a,.intro'))return;drag={x:e.clientX,y:e.clientY,left:viewport.scrollLeft,top:viewport.scrollTop};viewport.setPointerCapture(e.pointerId);viewport.classList.add('dragging');e.preventDefault()});
viewport.addEventListener('pointermove',e=>{if(!drag)return;viewport.scrollLeft=drag.left-e.clientX+drag.x;viewport.scrollTop=drag.top-e.clientY+drag.y});
function stop(){drag=null;viewport.classList.remove('dragging')}viewport.addEventListener('pointerup',stop);viewport.addEventListener('pointercancel',stop);viewport.addEventListener('lostpointercapture',stop);
viewport.addEventListener('keydown',e=>{if(e.target!==viewport)return;const d={ArrowLeft:[-100,0],ArrowRight:[100,0],ArrowUp:[0,-100],ArrowDown:[0,100]}[e.key];if(d){e.preventDefault();viewport.scrollBy(d[0],d[1])}});
let canvasCollection=location.hash.split('/')[0];window.addEventListener('hashchange',()=>{const next=location.hash.split('/')[0];if(next!==canvasCollection){viewport.scrollTo(0,0);canvasCollection=next;}});

// Reference layer: narratives.js
const narratives={"delivery":{"name":"跟随一件商品","steps":[["chain","从实物销售的背景与范围开始。"],["catalog","先定义商品及交付信息。"],["fulfilment","配送和自提让用户采取不同动作。"],["orders","从用户选择回到订单处理。"],["prototype","最后进入原型对照页面。"]]},"change":{"name":"理解运营判断","steps":[["catalog","从单件商品需要的信息开始。"],["batch","再看批量任务的输入与结果。"],["orders","回到不同履约状态的允许动作。"],["questions","明确真实落地还需要哪些证据。"]]},"team":{"name":"走进门店协作","steps":[["fulfilment","先拆清两种交付路径。"],["stores","自提需要店员接收用户凭证。"],["orders","订单记录让运营回看处理。"],["prototype","通过原型检查这些入口。"]]}};
let activeRoute=null,routeStep=0;
const overview=document.createElement('section');
overview.className='project-overview';
overview.setAttribute('aria-label','项目总览');
world.insertBefore(overview,grid);
const overviewModes={"delivery":{"label":"商品旅程","title":"一件商品，怎样交到用户手上？","description":"从商品信息开始，沿配送与自提的分支，读懂地址、门店、订单与凭证如何共同承接交付。","flow":["准备商品","选择交付","完成与回看"],"cta":"跟随一件商品，开始阅读"},"change":{"label":"运营判断","title":"重复操作，怎样变成可处理的任务？","description":"从单件商品录入，到批量导入和发货结果，观察原型如何表达输入、状态与反馈。","flow":["组织信息","处理批量任务","核对结果"],"cta":"从商品信息，理解运营判断"},"team":{"label":"门店协作","title":"用户到店之后，谁来接下这一步？","description":"一份自提凭证连接用户、店员与运营。从交付方式走向门店核销，再回到订单的处理记录。","flow":["用户选择","门店接力","运营回看"],"cta":"从履约分支，走进协作"}};
function renderOverview(key,animate=false){
 const mode=overviewModes[key];
 overview.dataset.view=key;
 overview.innerHTML='<p class="eyebrow">START HERE / 项目总览</p><div class="overview-lenses" role="group" aria-label="总览阅读视角">'+Object.entries(overviewModes).map(([id,m],n)=>'<button data-overview-view="'+id+'" aria-pressed="'+(id===key)+'"><small>0'+(n+1)+'</small>'+m.label+'</button>').join('')+'</div><h2>'+mode.title+'</h2><p class="description">'+mode.description+'</p><div class="overview-flow">'+mode.flow.map((s,n)=>(n?'<b>→</b>':'')+'<span>'+s+'</span>').join('')+'</div><button class="start-route" data-route="'+key+'">'+mode.cta+' <span>→</span></button><p class="overview-note">下方主题文件夹随当前视角重新组织。</p>';
 if(animate&&!reduced())overview.animate([{opacity:.65,transform:'translateY(7px)'},{opacity:1,transform:'translateY(0)'}],{duration:300,easing:'ease-out'});
}
renderOverview('delivery');
const routeBar=document.createElement('div');routeBar.className='route-reader';reader.querySelector('article').prepend(routeBar);
const resume=document.createElement('button');resume.className='resume-route';resume.hidden=true;shell.append(resume);
function routeGo(n){routeStep=n;const id=narratives[activeRoute].steps[n][0];location.hash='project/'+id;openItem(id);syncRoute();}
function syncRoute(){
 if(!activeRoute){routeBar.hidden=true;resume.hidden=true;grid.querySelectorAll('[data-route-step]').forEach(c=>c.removeAttribute('data-route-step'));return;}
 const r=narratives[activeRoute],id=location.hash.split('/')[1],index=r.steps.findIndex(s=>s[0]===id);if(index>=0)routeStep=index;
 const onRoute=index>=0;routeBar.hidden=!reader.open;
 routeBar.innerHTML='<div class="route-heading"><span>'+r.name+'</span><button data-leave-route>退出路线</button></div><p class="route-context">'+(onRoute?r.steps[routeStep][1]:'正在探索关联材料，阅读进度已保留。')+'</p><div class="route-progress">'+r.steps.map((s,n)=>'<button data-step="'+n+'" '+(n===routeStep?'aria-current="step"':'')+' title="'+items.find(i=>i.id===s[0]).title+'">'+(n+1)+'</button>').join('')+'</div><div class="route-actions">'+(onRoute?'<button data-step="'+(routeStep-1)+'" '+(routeStep===0?'disabled':'')+'>← 上一站</button><span>'+ (routeStep+1)+' / '+r.steps.length+'</span>'+(routeStep<r.steps.length-1?'<button data-step="'+(routeStep+1)+'">下一站 →</button>':'<button data-finish-route>完成 · 回到总览 ↗</button>'):'<button data-step="'+routeStep+'">回到第 '+(routeStep+1)+' 站，继续阅读 →</button>')+'</div>';
 resume.hidden=reader.open;resume.textContent='继续「'+r.name+'」 · '+(routeStep+1)+' / '+r.steps.length+' →';
 grid.querySelectorAll('[data-item]').forEach(c=>{const n=r.steps.findIndex(s=>s[0]===c.dataset.item);if(n>=0)c.dataset.routeStep=String(n+1);else c.removeAttribute('data-route-step')});
}
function resetOverview(){activeRoute=null;closeReader();viewport.scrollTo({left:0,top:0,behavior:reduced()?'instant':'smooth'});syncRoute();overview.querySelector('.start-route').focus({preventScroll:true});}
document.addEventListener('click',e=>{const start=e.target.closest('[data-route]');if(start){activeRoute=start.dataset.route;routeGo(0);}const step=e.target.closest('[data-step]');if(step&&activeRoute){const n=Number(step.dataset.step);if(n>=0&&n<narratives[activeRoute].steps.length)routeGo(n);}if(e.target.closest('[data-leave-route]')){activeRoute=null;syncRoute();}if(e.target.closest('[data-finish-route]'))resetOverview();});
resume.addEventListener('click',()=>routeGo(routeStep));
window.addEventListener('hashchange',syncRoute);
reader.addEventListener('close',syncRoute);syncRoute();

// Reference layer: folders.js
// The same materials, curated into different thematic reading arrangements.
const folderViews={"delivery":{"label":"商品旅程","note":"从商品准备，走向两种交付。","groups":[["准备商品","先整理商品，再看批量工作。",["chain","catalog","batch"]],["两种交付","配送与自提连接不同动作。",["fulfilment","orders","stores"]],["回到实践","用原型和记录继续检验。",["prototype","questions"]]]},"change":{"label":"运营判断","note":"沿信息、批量任务与结果阅读。","groups":[["组织信息","界定业务与商品对象。",["chain","catalog"]],["执行与反馈","看批量处理和履约动作。",["batch","orders","fulfilment"]],["验证设计","从协作和体验回到记录。",["stores","prototype","questions"]]]},"team":{"label":"门店协作","note":"从用户选择走向门店接力。","groups":[["用户选择","了解商品与交付方式。",["chain","catalog","fulfilment"]],["门店接力","凭证、店员与处理记录。",["stores","orders"]],["运营回看","批量任务与可验证的材料。",["batch","prototype","questions"]]]}};
let folderView='delivery',folderSwitch=0;
const expandedFolders=new Set([0]);
const readingNav=document.createElement('nav');readingNav.className='reading-nav';readingNav.setAttribute('aria-label','切换呈现逻辑');
readingNav.innerHTML='<span>阅读视角</span>'+Object.entries(folderViews).map(([key,v])=>'<button data-view="'+key+'" aria-pressed="'+(key===folderView)+'">'+v.label+'</button>').join('');
toolbar.replaceChildren(document.getElementById('count'),readingNav,toolbar.querySelector('.reset'));
toolbar.classList.add('reading-toolbar');
document.querySelector('.collection-bar').remove();
const folderCaption=document.createElement('p');folderCaption.className='folder-caption';folderCaption.setAttribute('aria-live','polite');world.append(folderCaption);
function fitFolderWorld(){
 const mobile=matchMedia('(max-width:700px)').matches;
 const contentTop=Math.max(535,overview.offsetTop+overview.offsetHeight+100,intro.offsetTop+intro.offsetHeight+100);
 folderCaption.style.top=mobile?'':(contentTop-75)+'px';
 // Pack folders against the actual canvas width, then center each row.
 const availableWidth=world.clientWidth-130;
 let y=contentTop,rowHeight=0,rowWidth=0,row=[];
 function placeRow(){
  let x=(world.clientWidth-rowWidth)/2;
  for(const {folder,width,height} of row){
   folder.style.left=x+'px';folder.style.top=y+'px';folder.style.height=height+'px';
   x+=width+50;
  }
  y+=rowHeight+100;row=[];rowWidth=0;rowHeight=0;
 }
 grid.querySelectorAll('.topic-folder').forEach(folder=>{
  const open=expandedFolders.has(Number(folder.dataset.folder));
  folder.classList.toggle('is-open',open);
  const body=folder.querySelector('.folder-body');
  if(mobile){folder.style.left='';folder.style.top='';folder.style.height='';body.style.height='';return;}
  const cards=[...body.querySelectorAll('.card')];
  let floor=0;
  cards.forEach((card,n)=>{
   const positions=[[0,15,410],[490,155,380],[45,520,390],[470,660,410],[0,1030,410],[500,1170,380]];
   const [left,top,width]=positions[n];
   card.style.setProperty('--node-x',left+'px');card.style.setProperty('--node-y',top+'px');card.style.setProperty('--node-width',width+'px');
   floor=Math.max(floor,top+card.offsetHeight);
  });
  body.style.height=(floor+45)+'px';
  const width=open?1340:420,height=open?Math.max(floor+45,400):folder.querySelector('.folder-cover').offsetHeight;
  if(row.length&&rowWidth+50+width>availableWidth)placeRow();
  rowWidth+=(row.length?50:0)+width;row.push({folder,width,height});
  rowHeight=Math.max(rowHeight,height);
  if(open)drawFolderLinks(body,cards);
 });
 if(row.length)placeRow();
 world.style.height=mobile?'':Math.max(1050,y)+'px';
}
function drawFolderLinks(body,cards){
 body.querySelector('.network-links')?.remove();
 const ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg');
 svg.classList.add('network-links');svg.setAttribute('aria-hidden','true');
 const byId=new Map(cards.map(c=>[c.dataset.item,c])),seen=new Set();
 cards.forEach(card=>items.find(i=>i.id===card.dataset.item).related.forEach(id=>{
  const other=byId.get(id),key=[id,card.dataset.item].sort().join(':');if(!other||seen.has(key))return;seen.add(key);
  const a={x:card.offsetLeft+card.offsetWidth/2,y:card.offsetTop+card.offsetHeight/2},b={x:other.offsetLeft+other.offsetWidth/2,y:other.offsetTop+other.offsetHeight/2};
  const path=document.createElementNS(ns,'path');
  path.setAttribute('d',`M ${a.x} ${a.y} C ${a.x} ${(a.y+b.y)/2}, ${b.x} ${(a.y+b.y)/2}, ${b.x} ${b.y}`);svg.append(path);
 }));
 body.prepend(svg);
}
function renderFolders(animate=false){
 const cards=new Map([...grid.querySelectorAll('.card[data-item]')].map(c=>[c.dataset.item,c]));
 grid.replaceChildren();
 folderCaption.textContent=folderViews[folderView].note+' · 展开主题，探索卡片之间的关联';
 folderViews[folderView].groups.forEach(([name,description,ids],index)=>{
  const folder=document.createElement('section');folder.className='topic-folder';folder.dataset.folder=String(index);
  folder.style.setProperty('--folder-order',index);folder.style.setProperty('--folder-tint',['#c5e6de','#d8e4f5','#dedbe8'][index]);
  const cover=document.createElement('button');cover.className='folder-cover';cover.dataset.folderToggle=String(index);cover.setAttribute('aria-controls','folder-body-'+index);cover.setAttribute('aria-expanded',String(expandedFolders.has(index)));
  cover.innerHTML='<span class="folder-tab">主题文件夹 / 0'+(index+1)+'</span><span class="folder-meta">'+ids.length+' 份材料 <span class="folder-open-label">'+(expandedFolders.has(index)?'收起 −':'展开 ↗')+'</span></span><h2>'+name+'</h2><p>'+description+'</p><div class="folder-peeks">'+ids.slice(0,3).map(id=>{const i=items.find(i=>i.id===id),c=categories[previews[id].category];return '<span><i class="peek-dot '+previews[id].category+'"></i><small>'+c.name+'</small>'+i.title+'</span>'}).join('')+'</div>'+(ids.length>3?'<span class="folder-more">还有 '+(ids.length-3)+' 份材料</span>':'');
  const body=document.createElement('div');body.id='folder-body-'+index;body.className='folder-body';body.hidden=!expandedFolders.has(index);
  ids.forEach(id=>{const card=cards.get(id);if(card)body.append(card)});
  folder.append(cover,body);grid.append(folder);
  if(animate&&!reduced())folder.animate([{opacity:0,transform:'translate(35px, 24px) scale(.96)'},{opacity:1,transform:'translate(0, 0) scale(1)'}],{duration:440,delay:index*65,fill:'backwards',easing:'cubic-bezier(.2,.7,.2,1)'});
 });
 fitFolderWorld();syncRoute();
}
function setFolderOpen(index,open){
 if(open)expandedFolders.add(index);else expandedFolders.delete(index);
 const folder=grid.querySelector('[data-folder="'+index+'"]');if(!folder)return;
 const body=folder.querySelector('.folder-body');body.hidden=!open;
 folder.querySelector('.folder-cover').setAttribute('aria-expanded',String(open));
 folder.querySelector('.folder-open-label').textContent=open?'收起 −':'展开 ↗';
 fitFolderWorld();
 if(open&&!reduced())body.querySelectorAll('.card').forEach((card,n)=>card.animate([{opacity:0,transform:'translate(-25px, 12px) scale(.94)'},{opacity:1,transform:'translate(0, 0) scale(1)'}],{duration:420,delay:n*45,fill:'backwards',easing:'cubic-bezier(.2,.7,.2,1)'}));
}
window.revealFolderCard=card=>{const f=card.closest('.topic-folder');if(f&&!expandedFolders.has(Number(f.dataset.folder)))setFolderOpen(Number(f.dataset.folder),true)};
async function switchFolderView(key){
 if(!folderViews[key])return;
 const version=++folderSwitch;
 readingNav.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.view===key)));
 if(!reduced())await Promise.all([...grid.querySelectorAll('.topic-folder')].map((f,i)=>f.animate([{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(18px) scale(.97)'}],{duration:160,delay:i*20,easing:'ease-in'}).finished.catch(()=>{})));
 if(version!==folderSwitch)return;const focusOverview=overview.contains(document.activeElement);
 folderView=key;renderOverview(key,true);expandedFolders.clear();expandedFolders.add(0);renderFolders(true);if(focusOverview)overview.querySelector('[data-overview-view="'+key+'"]').focus({preventScroll:true});
}
readingNav.addEventListener('click',e=>{const b=e.target.closest('[data-view]');if(b)switchFolderView(b.dataset.view)});
overview.addEventListener('click',e=>{const b=e.target.closest('[data-overview-view]');if(b)switchFolderView(b.dataset.overviewView)});
grid.addEventListener('click',e=>{const b=e.target.closest('[data-folder-toggle]');if(b){const n=Number(b.dataset.folderToggle);setFolderOpen(n,!expandedFolders.has(n))}});
// Cards retain their identity while articles and browser history change.
window.addEventListener('resize',fitFolderWorld);
// Also respond when an app pane changes width without a window resize.
let lastCanvasWidth=0;
const canvasResize=new ResizeObserver(()=>{
 const width=viewport.clientWidth;
 if(width!==lastCanvasWidth){lastCanvasWidth=width;fitFolderWorld();}
});
canvasResize.observe(viewport);
document.fonts.ready.then(fitFolderWorld);
renderFolders();


// Static article text remains available if scripts fail or are disabled.
document.getElementById('materials').open=false;
function revealStaticMaterials(){if(location.hash==='#materials')document.getElementById('materials').open=true;}
window.addEventListener('hashchange',revealStaticMaterials);revealStaticMaterials();
document.querySelector('a[href="#materials"]').addEventListener('click',()=>{
 document.getElementById('materials').open=true;
 document.querySelector('#materials > summary').focus();
});
// Focused cards must remain in view while tabbing through the spatial layout.
grid.addEventListener('focusin', event=>{const card=event.target.closest('.card');if(card)card.scrollIntoView({block:'nearest',inline:'nearest',behavior:'instant'});});
// Fragment destinations from the earlier case are preserved in the text reader.
const legacyMap={chain:'chain',catalog:'catalog',fulfilment:'fulfilment',prototype:'prototype',evidence:'questions',next:'questions'};
function revealLegacyFragment(){const key=location.hash.slice(1);const id=legacyMap[key]||(key.startsWith('material-')?key.slice(9):null);if(id&&items.some(i=>i.id===id))openItem(id);}
window.addEventListener('hashchange',revealLegacyFragment);revealLegacyFragment();
