// Collection interaction follows the rights and travel references; content stays local to this case.
(() => {
'use strict';
const items=[{"id":"roles","title":"一道题，连接三类参与者","type":"角色关系","category":"structure","caption":"高校师生与行业专家参与生产，AI 企业承接数据需求。","tags":["命题协作","多边平台","关系示意"],"related":["workflow","challenge","demand"],"visual":"<div class=\"mini-flow\"><span>高校师生</span><i>＋</i><span>行业专家</span><i>→</i><span>AI 企业</span></div>","status":"项目材料"},{"id":"challenge","title":"把分散资源组织成稳定供给","type":"问题拆解","category":"structure","caption":"资源、标准与参与动力，需要放在同一个流程里考虑。","tags":["资源整合","质量标准","原项目设计"],"related":["roles","review","incentives"],"visual":"<div class=\"mini-stack\"><span>资源分散 <b>众包协作</b></span><span>质量不稳 <b>多轮审核</b></span><span>持续参与 <b>等级激励</b></span></div>","status":"项目材料"},{"id":"workflow","title":"从创作到审核，再到激励","type":"核心流程","category":"practice","caption":"沿一道题的生产过程，理解平台希望建立的协作闭环。","tags":["内容生产","协作闭环","流程示意"],"related":["review","incentives","prototype"],"visual":"<div class=\"mini-flow\"><span>创作</span><i>→</i><span>审核</span><i>→</i><span>激励</span><i>↺</i></div>","status":"项目材料"},{"id":"review","title":"审核通过，能说明多少质量？","type":"质量判断","category":"decision","caption":"从内部审核继续追问：内容是否被采购，是否有训练价值？","tags":["多轮审核","质量定义","项目复盘"],"related":["workflow","demand","pricing"],"visual":"<div class=\"mini-stack\"><span>内部标准 <b>审核通过</b></span><span>需求匹配 <b>被采购意愿</b></span><span>实际价值 <b>AI 训练效果</b></span></div>","status":"项目复盘"},{"id":"incentives","title":"从等级激励走向长期贡献","type":"激励设计","category":"decision","caption":"原有等级体系之外，复盘提出持续产出、反馈与带教激励。","tags":["等级激励","长期贡献","优化方向"],"related":["supply","pricing","efficiency"],"visual":"<div class=\"mini-quote\">完成一次贡献之后，<br>为什么还愿意回来？</div>","status":"项目复盘"},{"id":"results","title":"已有积累，与未达预期的商业结果","type":"项目记录","category":"practice","caption":"保留内容与专家规模，也保留原案例对商业结果的反思。","tags":["原案例记录","规模指标","商业结果"],"related":["health","demand","efficiency"],"visual":"<div class=\"mini-metrics\"><span><b>18,000+</b><small>优质题目沉淀</small></span><span><b>500+</b><small>活跃专家</small></span></div>","status":"原案例记录"},{"id":"health","title":"规模之后，怎样判断生态健康？","type":"复盘框架","category":"reflection","caption":"把专家供给、企业需求和平台投入放在一起观察。","tags":["生态健康","指标框架","项目复盘"],"related":["supply","demand","efficiency","results"],"visual":"<div class=\"mini-flow\"><span>供给质量</span><i>↔</i><span>需求采纳</span><i>↔</i><span>投入产出</span></div>","status":"项目复盘"},{"id":"supply","title":"专家留下来了，也持续产出了吗？","type":"供给侧复盘","category":"reflection","caption":"留存率与人均优质产能，需要结合起来看。","tags":["专家留存","产能密度","待验证指标"],"related":["incentives","health","pricing"],"visual":"<div class=\"mini-quote\">专家留存<br>× 人均优质产能</div>","status":"项目复盘"},{"id":"demand","title":"产出的题目，真正被需要了吗？","type":"需求侧复盘","category":"reflection","caption":"用采纳率和采纳周期，连接内容生产与实际需求。","tags":["题目采纳","需求匹配","待验证指标"],"related":["review","results","efficiency"],"visual":"<div class=\"mini-flow\"><span>题目产出</span><i>→</i><span>企业采纳</span><i>→</i><span>训练使用</span></div>","status":"项目复盘"},{"id":"efficiency","title":"增长能否持续，激励是否值得？","type":"商业复盘","category":"reflection","caption":"自然进入的专家与单位激励带来的价值，指向可持续性。","tags":["自然增长","激励 ROI","待验证指标"],"related":["health","incentives","results"],"visual":"<div class=\"mini-stack\"><span>自然增长 <b>非激励性加入</b></span><span>激励投入 <b>优质内容增量价值</b></span></div>","status":"项目复盘"},{"id":"pricing","title":"两层报酬，对应两次价值确认","type":"优化原型","category":"decision","caption":"审核通过费与采购奖金分开表达，再用计算器探索酬金。","tags":["质量分层定价","两层报酬","后续原型"],"related":["review","incentives","prototype"],"visual":"<div class=\"mini-stack\"><span>审核通过 <b>审核通过费</b></span><span>题目被采购 <b>采购奖金</b></span></div>","status":"后续原型"},{"id":"prototype","title":"走进页面，继续验证产品判断","type":"原型索引","category":"practice","caption":"用户端、管理后台与后续定价探索，各自承接不同问题。","tags":["用户端","管理后台","定价原型"],"related":["workflow","pricing","health"],"visual":"<div class=\"mini-stack\"><span>原项目 <b>用户端 / 管理后台</b></span><span>后续优化 <b>质量分层定价</b></span></div>","status":"项目材料"}];
const categories={structure:{name:'结构'},decision:{name:'决策'},practice:{name:'实践'},reflection:{name:'思考'}};
const previews=Object.fromEntries(items.map(i=>[i.id,{category:i.category}]));
const visuals={};
const collections={"project":{"title":"一道题背后的协作与激励","en":"PROJECT COLLECTION / 04","description":"连接高校师生、行业专家与 AI 企业。从命题协作到质量激励，再回到一次商业未达预期的项目复盘。","aside":"命题智能协同平台<br>2024.05 — 09<span class=\"project-fact\">创作 · 审核 · 激励<small>原项目记录 / 复盘 / 后续原型</small></span><a href=\"quality-pricing.html\">查看质量分层定价原型 ↗</a>"}};
function preview(i){return '<div class="surface uniform '+i.category+'"><div class="preview-label"><span class="category-tag">'+categories[i.category].name+'</span>'+i.tags.map(t=>'<span class="facet-tag">'+t+'</span>').join('')+'</div><div class="zhishu-preview">'+i.visual+'</div><small class="preview-foot">'+i.type+' · '+i.status+'</small></div>';}
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
 if(candidate==='project'&&block&&items.some(i=>i.id===block))openItem(block);else if(reader.open)reader.close();
}
function openItem(id){const i=items.find(i=>i.id===id);if(!i)return;if(!reader.open)opener=document.activeElement; $('reader-title').textContent=i.title;$('reader-type').textContent=i.type+' / '+String(items.indexOf(i)+1).padStart(2,'0');$('reader-visual').innerHTML=visuals[id];$('reader-body').innerHTML=i.body;$('provenance').textContent=i.source;$('connections').innerHTML=detailTags(i);$('related').innerHTML=i.related.map(r=>`<button data-item="${r}">${items.find(t=>t.id===r).title} →</button>`).join('');if(!reader.open)reader.showModal();reader.scrollTop=0;$('reader-title').tabIndex=-1;$('reader-title').focus({preventScroll:true});}
document.addEventListener('click',e=>{const item=e.target.closest('[data-item]');if(!item)return;if(!reader.open)opener=item;const next=current+'/'+item.dataset.item;if(location.hash.slice(1)===next)openItem(item.dataset.item);else location.hash=next;});
function closeReader(){
 const activeId=location.hash.split('/')[1];
 history.replaceState(null,'',location.pathname+location.search+'#project');
 reader.close();
 const target=opener?.isConnected&&opener!==document.body?opener:document.querySelector('#grid [data-item="'+activeId+'"]');
 if(target){window.revealFolderCard?.(target);target.focus({preventScroll:true});if(target.classList.contains('card'))target.scrollIntoView({block:'nearest',inline:'nearest',behavior:'instant'});}
 
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
const narratives={"delivery":{"name":"跟随命题协作","steps":[["roles","先理解供给与需求两端的参与者。"],["challenge","再看平台需要解决的资源与质量问题。"],["workflow","把问题放回创作、审核与激励的闭环。"],["review","查看质量判断从审核走向实际使用。"],["prototype","最后走进原项目页面和后续优化原型。"]]},"change":{"name":"理解质量与激励","steps":[["review","先明确什么可以代表题目质量。"],["incentives","再看激励如何回应长期贡献。"],["supply","检查专家是否留下并持续产出。"],["demand","将内容供给与企业实际采纳连接。"],["pricing","最后用两层报酬原型探索激励机制。"]]},"team":{"name":"阅读商业复盘","steps":[["results","同时保留已有积累与商业未达预期的记录。"],["health","从规模指标转向三个生态健康维度。"],["supply","先观察专家留存与人均优质产能。"],["demand","再观察题目采纳率与采纳周期。"],["efficiency","最后追问自然增长与激励投入是否可持续。"]]}};
let activeRoute=null,routeStep=0;
const overview=document.createElement('section');
overview.className='project-overview';
overview.setAttribute('aria-label','项目总览');
world.insertBefore(overview,grid);
const overviewModes={"delivery":{"label":"命题协作","title":"从一道题，看见平台如何组织协作","description":"高校师生与行业专家参与生产，AI 企业提出数据需求。沿创作、审核与激励，理解原项目怎样连接分散资源，再走进页面与原型。","flow":["谁参与生产","如何控制质量","怎样持续贡献"],"cta":"跟随一道题，开始阅读"},"change":{"label":"质量与激励","title":"什么样的贡献，值得怎样的回报？","description":"从多轮审核与等级激励出发，把质量判断延伸到企业采纳，阅读复盘提出的动态酬金方向，以及两层报酬的原型探索。","flow":["明确质量标准","连接需求反馈","探索报酬机制"],"cta":"从质量判断，理解激励设计"},"team":{"label":"商业复盘","title":"有了内容与专家，生态就健康了吗？","description":"项目已有内容积累，但商业表现未达预期。回到供给活力、需求匹配与投入产出三个维度，重新思考平台是否具有持续价值。","flow":["回看已有积累","观察供需质量","判断可持续性"],"cta":"从项目记录，进入商业复盘"}};
function renderOverview(key,animate=false){
 const mode=overviewModes[key];
 overview.dataset.view=key;
 overview.innerHTML='<p class="eyebrow">START HERE / 项目总览</p><div class="overview-lenses" role="group" aria-label="总览阅读视角">'+Object.entries(overviewModes).map(([id,m],n)=>'<button data-overview-view="'+id+'" aria-pressed="'+(id===key)+'"><small>0'+(n+1)+'</small>'+m.label+'</button>').join('')+'</div><h2>'+mode.title+'</h2><p class="description">'+mode.description+'</p><div class="overview-flow">'+mode.flow.map((s,n)=>(n?'<b>→</b>':'')+'<span>'+s+'</span>').join('')+'</div><button class="start-route" data-route="'+key+'">'+mode.cta+' <span>→</span></button><p class="overview-note">下方主题文件夹随当前视角重新组织。</p>';
 if(animate&&!reduced())overview.animate([{opacity:.65,transform:'translateY(7px)'},{opacity:1,transform:'translateY(0)'}],{duration:300,easing:'ease-out'});
}
renderOverview('delivery');
const routeBar=document.createElement('div');routeBar.className='route-reader';reader.querySelector('article').prepend(routeBar);
const resume=document.createElement('button');resume.className='resume-route';resume.hidden=true;shell.append(resume);
function routeGo(n){if(!reader.open)opener=document.activeElement;routeStep=n;const id=narratives[activeRoute].steps[n][0];if(location.hash==='#project/'+id)openItem(id);else location.hash='project/'+id;syncRoute();}
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
const folderViews={"delivery":{"label":"命题协作","note":"从参与者和核心流程，走向质量激励，再回看项目复盘。","groups":[["组织命题协作","连接分散资源，建立创作、审核与激励闭环。",["roles","challenge","workflow","prototype"]],["质量与持续贡献","从审核标准走向专家留存和报酬设计。",["review","incentives","supply","pricing"]],["回到真实价值","一起阅读规模记录、企业采纳与商业可持续性。",["results","health","demand","efficiency"]]]},"change":{"label":"质量与激励","note":"先看质量问题，再看激励机制，最后回到价值验证。","groups":[["明确质量标准","理解资源、流程与需求侧的质量要求。",["challenge","workflow","review","demand"]],["连接贡献与回报","让等级、留存与两层报酬进入同一场讨论。",["incentives","supply","pricing","prototype"]],["验证平台价值","结合参与方、项目记录和生态健康指标继续判断。",["roles","results","health","efficiency"]]]},"team":{"label":"商业复盘","note":"保留未达预期的结果，沿供需与成本重新理解平台。","groups":[["回看项目与积累","理解原始设想，也保留商业未达预期的记录。",["results","roles","challenge","health"]],["观察供需质量","从审核与生产走向留存、产能和企业采纳。",["workflow","review","supply","demand"]],["寻找可持续机制","用投入产出约束激励，并在原型里继续探索。",["efficiency","incentives","pricing","prototype"]]]}};
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
// Focused cards must remain in view while tabbing through the spatial layout.
grid.addEventListener('focusin', event=>{const card=event.target.closest('.card');if(card)card.scrollIntoView({block:'nearest',inline:'nearest',behavior:'instant'});});


render();
})();
