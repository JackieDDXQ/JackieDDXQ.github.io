const items = [
  {
    "id": "scope",
    "title": "共享能力，容纳不同运营",
    "type": "项目背景",
    "category": "structure",
    "caption": "从多个子公司的相似需求，理解共享核心与租户差异。",
    "tags": [
      "项目背景",
      "材料线索"
    ],
    "related": [
      "package",
      "boundary",
      "prototype"
    ],
    "visual": "<div class=\"mini-quote\">共享核心<br>租户配置<br>独立运营</div>"
  },
  {
    "id": "package",
    "title": "套餐把权益组织成订阅",
    "type": "套餐模型",
    "category": "structure",
    "caption": "价格、周期、合约与权益关联，组成一份可理解的会员方案。",
    "tags": [
      "套餐模型",
      "材料线索"
    ],
    "related": [
      "cycle",
      "channels",
      "claim"
    ],
    "visual": "<div class=\"mini-quote\">套餐 → 订阅条件 → 关联权益</div>"
  },
  {
    "id": "cycle",
    "title": "三种时间，不是同一个问题",
    "type": "订阅规则",
    "category": "decision",
    "caption": "计费周期、合约时长与生效时间，需要分别表达。",
    "tags": [
      "订阅规则",
      "材料线索"
    ],
    "related": [
      "package",
      "journey",
      "boundary"
    ],
    "visual": "<div class=\"mini-quote\">多久付费<br>合约多久<br>何时生效</div>"
  },
  {
    "id": "channels",
    "title": "上架到哪里，怎样办理",
    "type": "渠道配置",
    "category": "decision",
    "caption": "上架应用与办理方式分别配置，区分用户入口和办理路径。",
    "tags": [
      "渠道配置",
      "材料线索"
    ],
    "related": [
      "package",
      "scope",
      "boundary"
    ],
    "visual": "<div class=\"mini-quote\">上架应用 ≠ 办理方式</div>"
  },
  {
    "id": "journey",
    "title": "从开通会员，到看见权益",
    "type": "用户旅程",
    "category": "practice",
    "caption": "商品介绍之后，还需要知道自己拥有什么、下一步做什么。",
    "tags": [
      "用户旅程",
      "材料线索"
    ],
    "related": [
      "claim",
      "cycle",
      "prototype"
    ],
    "visual": "<div class=\"mini-quote\">浏览套餐 → 开通 → 领取详情</div>"
  },
  {
    "id": "claim",
    "title": "订阅成功之后，还要领取什么",
    "type": "权益领取",
    "category": "practice",
    "caption": "套餐、权益列表和单项使用说明，形成三个阅读层次。",
    "tags": [
      "权益领取",
      "材料线索"
    ],
    "related": [
      "journey",
      "orders",
      "package"
    ],
    "visual": "<div class=\"mini-quote\">会员套餐 → 权益清单 → 单项领取</div>"
  },
  {
    "id": "orders",
    "title": "从订购记录回看服务状态",
    "type": "订单运营",
    "category": "practice",
    "caption": "用户查看权益和续费，运营查看订单与发放线索。",
    "tags": [
      "订单运营",
      "材料线索"
    ],
    "related": [
      "cycle",
      "claim",
      "prototype"
    ],
    "visual": "<div class=\"mini-quote\">用户订购记录 ↔ 运营订单详情</div>"
  },
  {
    "id": "prototype",
    "title": "把配置与体验放在一起看",
    "type": "交互原型",
    "category": "practice",
    "caption": "先配置一份套餐，再对照用户端怎样理解它。",
    "tags": [
      "交互原型",
      "材料线索"
    ],
    "related": [
      "package",
      "journey",
      "orders"
    ],
    "visual": "<div class=\"mini-quote\">运营配置 ↔ 用户体验</div>"
  },
  {
    "id": "boundary",
    "title": "配置的边界，需要真实记录",
    "type": "方案边界",
    "category": "reflection",
    "caption": "保留多租户方向，继续核对隔离、品牌配置与效率指标。",
    "tags": [
      "方案边界",
      "方案待核对"
    ],
    "related": [
      "scope",
      "channels",
      "cycle"
    ],
    "visual": "<div class=\"mini-quote\">品牌配置<br>权限隔离<br>实际交付</div>"
  }
];

const categories={structure:{name:'结构'},decision:{name:'决策'},practice:{name:'实践'},reflection:{name:'思考'}};
const previews=Object.fromEntries(items.map(i=>[i.id,{category:i.category}]));
const visuals={};
const collections={"project":{"title":"一份会员背后的共享与差异","en":"PROJECT COLLECTION / 04","description":"从一份会员的开通与领取，回看套餐、周期、渠道配置和多租户方案，探索共享能力怎样承接不同运营需求。","aside":"多租户会员订阅商城<br>共享能力 × 运营配置<span class=\"project-fact\">从套餐配置到权益领取<small>依据现有案例与原型整理</small></span><a href=\"./prototypes/multi-tenant-mall/shopping-mall/admin/packages.html\" target=\"_blank\" rel=\"noopener\">管理后台原型（新窗口） ↗</a><br><a href=\"./prototypes/multi-tenant-mall/shopping-mall/mobile/index.html\" target=\"_blank\" rel=\"noopener\">移动端原型（新窗口） ↗</a>"}};
function preview(i){return '<div class="surface uniform '+i.category+'"><div class="preview-label"><span class="category-tag">'+categories[i.category].name+'</span>'+i.tags.map(t=>'<span class="facet-tag">'+t+'</span>').join('')+'</div><div class="member-preview">'+i.visual+'</div><small class="preview-foot">'+i.type+' · 方案材料</small></div>';}
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
const narratives={"delivery":{"name":"跟随一份会员","steps":[["journey","从用户开通与查看权益开始。"],["package","回看会员背后的套餐配置。"],["cycle","区分付费周期、合约与生效时间。"],["claim","理解会员与单项领取的关系。"],["orders","在订购记录中回看服务。"]]},"change":{"name":"理解配置边界","steps":[["scope","先看共享核心与差异化运营的目标。"],["package","哪些套餐信息已经被表达为字段？"],["channels","区分上架应用和办理方式。"],["boundary","回到品牌、权限与实施证据。"]]},"team":{"name":"连接运营与用户","steps":[["package","从运营配置的内容开始。"],["journey","对照用户读到的套餐和开通信息。"],["claim","用户获得会员后，还需要查看和领取权益。"],["orders","订单记录帮助双方定位当前服务。"],["prototype","进入原型，继续对照页面。"]]}};
let activeRoute=null,routeStep=0;
const overview=document.createElement('section');
overview.className='project-overview';
overview.setAttribute('aria-label','项目总览');
world.insertBefore(overview,grid);
const overviewModes={"delivery":{"label":"会员旅程","title":"开通会员之后，用户获得了什么？","description":"从套餐说明走向权益清单，再回到周期、领取和订购记录。沿用户的下一步行动，理解会员服务如何被表达。","flow":["看懂套餐","开通与领取","回看订阅"],"cta":"跟随一份会员，开始阅读"},"change":{"label":"配置边界","title":"哪些能力共享，哪些差异需要保留？","description":"相似的订阅业务可以共享套餐与订单能力。沿现有配置字段，观察品牌、应用与租户边界中已经表达和仍需核对的部分。","flow":["共享业务","配置差异","核对边界"],"cta":"从共享能力，理解配置边界"},"team":{"label":"运营与用户","title":"后台的配置，怎样成为用户的理解？","description":"运营填写的是价格、周期、生效条件和权益关联。用户需要看懂能获得什么、何时开始，以及在哪里领取和回看。","flow":["运营配置","用户理解","订单回看"],"cta":"从套餐配置，连接两端体验"}};
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
const folderViews={"delivery":{"label":"会员旅程","note":"沿开通、领取和订阅记录阅读。","groups":[["看懂套餐","从用户所见回到配置。",["journey","package","cycle"]],["开通与领取","查看单项权益与服务记录。",["claim","orders","prototype"]],["回到共享能力","继续探索差异与边界。",["scope","channels","boundary"]]]},"change":{"label":"配置边界","note":"从共享核心，走向可配置的业务差异。","groups":[["共享业务","理解需求与套餐对象。",["scope","package"]],["配置差异","区分时间、应用与实施边界。",["cycle","channels","boundary"]],["回到体验","用用户动作检验配置表达。",["journey","claim","orders","prototype"]]]},"team":{"label":"运营与用户","note":"把运营字段与用户下一步行动对照起来。","groups":[["运营配置","定义套餐、时间和应用。",["package","cycle","channels"]],["用户理解","从开通到领取与订单。",["journey","claim","orders"]],["继续验证","连接共享方案、原型与记录。",["scope","prototype","boundary"]]]}};
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
 // Reset temporary space before measuring the natural folder layout.
 world.style.width='';grid.style.transform='';
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
const folderReturnPositions=new WeakMap();
let folderPanAnimation;
function setFolderOpen(index,open){
 const folder=grid.querySelector('[data-folder="'+index+'"]');if(!folder)return;
 if(expandedFolders.has(index)===open)return;
 // Capture the visual position before repacking, including an interrupted pan.
 const anchor=folder.querySelector('.folder-cover h2');
 const before=anchor.getBoundingClientRect();
 folderPanAnimation?.cancel();
 if(open)folderReturnPositions.set(folder,{left:before.left,top:before.top});
 if(open)expandedFolders.add(index);else expandedFolders.delete(index);
 const body=folder.querySelector('.folder-body');body.hidden=!open;
 folder.querySelector('.folder-cover').setAttribute('aria-expanded',String(open));
 folder.querySelector('.folder-open-label').textContent=open?'收起 −':'展开 ↗';
 fitFolderWorld();
 const after=anchor.getBoundingClientRect();
 if(matchMedia('(max-width:700px)').matches){
  window.scrollBy({left:after.left-before.left,top:after.top-before.top,behavior:'instant'});
 }else{
  const bounds=viewport.getBoundingClientRect();
  const previous=folderReturnPositions.get(folder);
  const cover=folder.querySelector('.folder-cover');
  const titleInset=after.left-cover.getBoundingClientRect().left;
  const targetX=open?bounds.left+32+titleInset:(previous?.left??before.left);
  const targetY=open?before.top:(previous?.top??before.top);
  const desiredX=viewport.scrollLeft+after.left-targetX;
  const desiredY=viewport.scrollTop+after.top-targetY;
  const insetX=Math.max(0,-desiredX),insetY=Math.max(0,-desiredY);
  const left=desiredX+insetX,top=desiredY+insetY;
  const width=world.offsetWidth,height=world.offsetHeight;
  grid.style.transform=`translate(${insetX}px,${insetY}px)`;
  world.style.width=Math.max(width+insetX,left+viewport.clientWidth+1)+'px';
  world.style.height=Math.max(height+insetY,top+viewport.clientHeight+1)+'px';
  viewport.scrollTo({left,top,behavior:'instant'});
  if(!reduced()){
   const final=anchor.getBoundingClientRect();
   folderPanAnimation=grid.animate([
    {transform:`translate(${insetX+before.left-final.left}px,${insetY+before.top-final.top}px)`},
    {transform:`translate(${insetX}px,${insetY}px)`}
   ],{duration:380,easing:'cubic-bezier(.22,.7,.2,1)'});
  }
 }
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

// Focused cards must remain in view while tabbing through the spatial layout.
grid.addEventListener('focusin', event=>{const card=event.target.closest('.card');if(card)card.scrollIntoView({block:'nearest',inline:'nearest',behavior:'instant'});});
// Fragment destinations from the earlier case are preserved in the text reader.
const legacyMap={};
function revealLegacyFragment(){const key=location.hash.slice(1);const id=legacyMap[key]||(key.startsWith('material-')?key.slice(9):null);if(id&&items.some(i=>i.id===id))openItem(id);}
window.addEventListener('hashchange',revealLegacyFragment);revealLegacyFragment();
