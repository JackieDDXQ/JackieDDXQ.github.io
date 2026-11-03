const items = [
  {
    "id": "home",
    "title": "先讲清这家公司做什么",
    "type": "业务理解",
    "category": "understanding",
    "caption": "我把觉观科技的三类服务、两条业务线与关键数字，组织成首页第一屏的说明与事实区。",
    "tags": [
      "业务全貌",
      "对外口径",
    ],
    "related": [
      "benefits",
      "content",
      "routes",
    ],
    "visual": "<div class=\"mini-quote\">好内容<br>好权益<br>好技术<br>好生意</div>"
  },
  {
    "id": "benefits",
    "title": "权益从引入到交付",
    "type": "业务理解",
    "category": "understanding",
    "caption": "我读懂了引入、包装、推广三段流程与五类权益生态，才决定首页把它放在第一位。",
    "tags": [
      "权益运营",
      "业务链路",
    ],
    "related": [
      "content",
      "ai",
      "home",
    ],
    "visual": "<div class=\"mini-quote\">引入 → 包装 → 推广</div>"
  },
  {
    "id": "content",
    "title": "把正版内容运营成生意",
    "type": "业务理解",
    "category": "understanding",
    "caption": "数字内容是独立于权益的第二条线，从引入上架到会员产品化有自己的完整路径。",
    "tags": [
      "数字内容",
      "第二业务线",
    ],
    "related": [
      "benefits",
      "ai",
      "home",
    ],
    "visual": "<div class=\"mini-quote\">引入上架 → 云盘运营 → 会员产品</div>"
  },
  {
    "id": "ai",
    "title": "区分已上线与在建能力",
    "type": "业务理解",
    "category": "understanding",
    "caption": "我把已上线能力、已沉淀资产与在建方向分成三层写，避免用模糊表述覆盖真实进度。",
    "tags": [
      "AI 能力",
      "状态分层",
    ],
    "related": [
      "content",
      "tech",
      "home",
    ],
    "visual": "<div class=\"mini-quote\">语音朗读 · 全书速读<br>伴读问答</div>"
  },
  {
    "id": "routes",
    "title": "同一套内容，两种进入方式",
    "type": "表达设计",
    "category": "expression",
    "caption": "机构方与品牌方关心的问题不同，我在首页做了双角色入口与路径分流。",
    "tags": [
      "访客分流",
      "双入口",
    ],
    "related": [
      "home",
      "brand",
      "benefits",
    ],
    "visual": "<div class=\"mini-quote\">我是机构方<br>我是品牌方</div>"
  },
  {
    "id": "brand",
    "title": "给供给侧一条独立通路",
    "type": "表达设计",
    "category": "expression",
    "caption": "我把它拆成不占主导航的转化页，把「合作」写成一条可读懂的接入链路。",
    "tags": [
      "合作转化",
      "接入链路",
    ],
    "related": [
      "benefits",
      "routes",
      "home",
    ],
    "visual": "<div class=\"mini-quote\">资源引入 → 渠道上架<br>→ 触达运营商用户</div>"
  },
  {
    "id": "cases",
    "title": "用合作网络说明服务范围",
    "type": "表达设计",
    "category": "expression",
    "caption": "合作台账、模式分类与覆盖地图，让「服务过谁」有具体指向而不是形容词。",
    "tags": [
      "客户案例",
      "合作台账",
    ],
    "related": [
      "home",
      "tech",
      "about",
    ],
    "visual": "<div class=\"mini-quote\">28+ 签约运营商单位<br>18 单公开合作案例</div>"
  },
  {
    "id": "tech",
    "title": "不炫技，但可靠",
    "type": "表达设计",
    "category": "expression",
    "caption": "自研系统、标准化交付与安全合规，回答的是「凭什么可靠」这一层顾虑。",
    "tags": [
      "技术保障",
      "交付",
    ],
    "related": [
      "cases",
      "ai",
      "home",
    ],
    "visual": "<div class=\"mini-quote\">全链路自研 · 标准化交付<br>等保与 ISO 27001</div>"
  },
  {
    "id": "about",
    "title": "资质是可信度的底座",
    "type": "表达设计",
    "category": "expression",
    "caption": "主体、许可与知识产权放在最后，因为它们属于决策后期才需要的证据。",
    "tags": [
      "关于觉观",
      "资质",
    ],
    "related": [
      "tech",
      "home",
      "cases",
    ],
    "visual": "<div class=\"mini-quote\">增值电信业务经营许可证<br>ISO/IEC 27001 · 软件著作权</div>"
  },
  {
    "id": "build",
    "title": "从判断到可运行产品",
    "type": "实现方式",
    "category": "practice",
    "caption": "整站由我一人用 Vibe Coding 完成：结构设计、页面实现与内容组织全部自己推进。",
    "tags": [
      "Vibe Coding",
      "独立实现",
    ],
    "related": [
      "home",
      "tech",
      "cases",
    ],
    "visual": "<div class=\"mini-quote\">对话式开发<br>从架构到上线</div>"
  }
];

const categories={understanding:{name:'业务理解'},expression:{name:'表达设计'},practice:{name:'实现方式'}};
const previews=Object.fromEntries(items.map(i=>[i.id,{category:i.category}]));
const visuals={};
const collections={project:{title:'把业务判断，做成一个能上线的产品',en:'PROJECT COLLECTION / 06',description:`这是我为觉观科技做的官网。我先把公司的业务结构看懂，再决定访客该按什么顺序理解它，最后用 Vibe Coding 自己把它实现出来——从信息架构到部署上线，整站由我一人完成，同事只提过少量建议。`,aside:`觉观科技官网 · 我一人完成设计与实现<br>Astro 静态站点 · 8 个页面<span class="project-fact">首页 + 6 个二级页 + 1 个转化页<small>同事只提过少量建议，其余由我完成</small></span><a href="https://www.senins.cn/" target="_blank" rel="noopener">当前线上官网 ↗</a>`}};
function preview(i){return '<div class="surface uniform '+i.category+'"><div class="preview-label"><span class="category-tag">'+categories[i.category].name+'</span>'+i.tags.map(t=>'<span class="facet-tag">'+t+'</span>').join('')+'</div><div class="site-preview">'+i.visual+'</div><small class="preview-foot">'+i.type+' · 方案材料</small></div>';}
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
const toolbar=document.createElement('div');toolbar.className='canvas-toolbar';toolbar.innerHTML='<span>内容用途</span><button data-category="understanding">业务理解 · 4</button><button data-category="expression">表达设计 · 5</button><button data-category="practice">实现方式 · 1</button><button class="reset">复位 ↺</button>';shell.append(toolbar);
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
const narratives={"understanding":{"name":"按业务理解读","steps":[["home","先看首页怎样交代公司的业务全貌。"],["benefits","再看权益这条主线如何展开。"],["content","然后是数字内容这条第二业务线。"],["ai","最后是 AI 能力的状态分层。"]]},"expression":{"name":"按表达设计读","steps":[["routes","先看两类访客如何被分流。"],["cases","用案例台账建立信任。"],["tech","用技术保障回答可靠性。"],["about","最后落到主体与资质。"]]},"build":{"name":"按实现方式读","steps":[["build","这个站点我怎么自己把它做出来的。"],["home","回到首页看这些判断的落点。"],["tech","看组件与页面语言如何共享。"],["cases","看内容与视觉如何配合。"]]}};
let activeRoute=null,routeStep=0;
const overview=document.createElement('section');
overview.className='project-overview';
overview.setAttribute('aria-label','项目总览');
world.insertBefore(overview,grid);
const overviewModes={"understanding":{"label":"业务理解","title":"做官网之前，先得看懂这家公司。","description":"我先把觉观科技的权益运营、数字内容与 AI 能力三条线读成一张业务全貌，再判断哪些信息该先说、哪些该后说。这一步决定后面所有的页面结构。","flow":["读懂业务","判断先后","形成结构"],"cta":"从业务理解开始"},"expression":{"label":"表达设计","title":"同一套业务，该让谁先看到什么。","description":"我按访客身份重新组织入口：机构方看到能力与保障，品牌方看到渠道价值与接入方式。信任分层交付——案例在中期，资质在后期。","flow":["识别身份","分层信任","推动行动"],"cta":"从表达设计开始"},"build":{"label":"实现方式","title":"判断做完之后，我把它做出来了。","description":"这个官网由我用 Vibe Coding 独立完成：信息架构、组件设计、页面实现与内容组织，从零写成一个可部署的 Astro 静态站点。同事只提过少量建议，其余全部由我完成。","flow":["结构设计","对话式实现","部署上线"],"cta":"从实现方式开始"}};
function renderOverview(key,animate=false){
 const mode=overviewModes[key];
 overview.dataset.view=key;
 overview.innerHTML='<p class="eyebrow">START HERE / 项目总览</p><div class="overview-lenses" role="group" aria-label="总览阅读视角">'+Object.entries(overviewModes).map(([id,m],n)=>'<button data-overview-view="'+id+'" aria-pressed="'+(id===key)+'"><small>0'+(n+1)+'</small>'+m.label+'</button>').join('')+'</div><h2>'+mode.title+'</h2><p class="description">'+mode.description+'</p><div class="overview-flow">'+mode.flow.map((s,n)=>(n?'<b>→</b>':'')+'<span>'+s+'</span>').join('')+'</div><button class="start-route" data-route="'+key+'">'+mode.cta+' <span>→</span></button><p class="overview-note">下方主题文件夹随当前视角重新组织。</p>';
 if(animate&&!reduced())overview.animate([{opacity:.65,transform:'translateY(7px)'},{opacity:1,transform:'translateY(0)'}],{duration:300,easing:'ease-out'});
}
renderOverview('understanding');
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
const folderViews={"understanding":{"label":"业务理解","note":"从业务全貌读到 AI 能力。","groups":[["业务全貌","首页与三类服务的关系。",["home","routes"]],["三条主线","权益、内容与 AI 各自的业务逻辑。",["benefits","content","ai"]],["支撑与落地","能力边界与合作通路如何落地。",["build","tech","cases","about","brand"]]]},"expression":{"label":"表达设计","note":"按访客与信任层级组织。","groups":[["入口分流","让两类访客各自找到起点。",["routes","brand"]],["信任建立","案例与保障解决可信度。",["cases","tech"]],["决策收尾","资质与实现的可核对性。",["about","build","home","benefits","content","ai"]]]},"build":{"label":"实现方式","note":"从判断走向可运行产品。","groups":[["我怎么做的","独立推进的完整过程。",["build"]],["站点结构","八页如何共享同一套语言。",["home","routes","brand"]],["内容落地","业务素材如何变成页面。",["benefits","content","ai","cases","tech","about"]]]}};
let folderView='understanding',folderSwitch=0;
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
const legacyMap={home:'home',benefits:'benefits',content:'content',ai:'ai',cases:'cases',tech:'tech',brand:'brand',about:'about',evidence:'cases',next:'build',build:'build'};
function revealLegacyFragment(){const key=location.hash.slice(1);const id=legacyMap[key]||(key.startsWith('material-')?key.slice(9):null);if(id&&items.some(i=>i.id===id))openItem(id);}
window.addEventListener('hashchange',revealLegacyFragment);revealLegacyFragment();
