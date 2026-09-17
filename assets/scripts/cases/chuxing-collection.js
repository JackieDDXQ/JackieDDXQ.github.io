
  const items = [
    {id:'roles',title:'一次扫码，三方接力',type:'角色关系',category:'structure',caption:'入口、交易编排与物理履约，各自回答不同的问题。',tags:['三方协作','系统边界','关系示意'],related:['rails','journey','sync'],visual:'<div class="mini-flow"><span>和包</span><i>→</i><span>觉观</span><i>→</i><span>特来电</span></div>'},
    {id:'rails',title:'先拆开三条链路',type:'产品模型',category:'structure',caption:'身份、权益与交易相互关联，但有各自的事实来源。',tags:['身份','权益','交易'],related:['roles','states','settlement'],visual:'<div class="mini-stack"><span>IDENTITY <b>身份</b></span><span>BENEFIT <b>权益</b></span><span>TRANSACTION <b>交易</b></span></div>'},
    {id:'journey',title:'从扫码到订单完成',type:'核心旅程',category:'practice',caption:'七个阶段串成一条可以返回、继续和恢复的充电流程。',tags:['用户旅程','交易闭环','流程示意'],related:['roles','states','recovery','prototype'],visual:'<div class="mini-flow"><span>扫码</span><i>→</i><span>预付</span><i>→</i><span>启充</span><i>→</i><span>结算</span></div>'},
    {id:'states',title:'四个状态，四种事实',type:'状态语义',category:'structure',caption:'付款、充电、结算与完成不能用一个“成功”概括。',tags:['状态建模','事实来源','规则示意'],related:['journey','unknown','settlement'],visual:'<div class="mini-status"><i></i><span>钱到账 ≠ 已充电 ≠ 已完成</span></div>'},
    {id:'unknown',title:'结果未知时，先停一下',type:'异常判断',category:'decision',caption:'不确定不是失败；高风险动作需要等待原流水的权威结果。',tags:['未知结果','风险边界','产品判断'],related:['states','recovery','resume'],visual:'<div class="mini-quote">查询原流水，<br>不要再创建一笔。</div>'},
    {id:'recovery',title:'异常之后，用户还能做什么',type:'恢复矩阵',category:'practice',caption:'把页面提示、允许动作与系统禁区放在同一张表里。',tags:['异常恢复','用户行动','对照表'],related:['journey','unknown','resume'],visual:'<div class="mini-stack"><span>明确失败 <b>重试 / 换枪 / 取消</b></span><span>结果未知 <b>等待 / 查询</b></span></div>'},
    {id:'autostart',title:'支付确认后自动启充',type:'产品决策',category:'decision',caption:'缩短一次确认，同时保留支付与物理启动的状态边界。',tags:['自动启充','主链路','方案规则'],related:['journey','states','resume'],visual:'<div class="mini-flow"><span>预付确认</span><i>→</i><span>服务端启充</span></div>'},
    {id:'resume',title:'再次扫码，先恢复原订单',type:'产品决策',category:'decision',caption:'返回入口不意味着重新开始，先找回进行中的业务事实。',tags:['订单恢复','幂等','方案规则'],related:['autostart','unknown','recovery'],visual:'<div class="mini-quote">先找回正在发生的事。</div>'},
    {id:'settlement',title:'最终账单才是结算起点',type:'产品决策',category:'decision',caption:'实时费用帮助感知，最终账单才进入权益和资金计算。',tags:['最终账单','资金闭环','方案规则'],related:['rails','states','funds'],visual:'<div class="mini-flow"><span>最终账单</span><i>→</i><span>权益</span><i>→</i><span>应退 / 应补</span></div>'},
    {id:'funds',title:'在原订单里说明资金去向',type:'资金表达',category:'practice',caption:'差额退款留在充电订单，超时占用费单独表达。',tags:['退款','补缴','费用表达'],related:['settlement','recovery','delivery'],visual:'<div class="mini-stack"><span>充电订单 <b>消费 / 退款</b></span><span>占用费 <b>独立成单</b></span></div>'},
    {id:'sync',title:'事件负责及时，查询负责权威',type:'协作机制',category:'structure',caption:'通知变化，查询现状；用唯一标识处理重复和乱序。',tags:['状态同步','一致性','机制说明'],related:['roles','states','delivery'],visual:'<div class="mini-flow"><span>EVENT</span><i>↔</i><span>QUERY</span><i>→</i><span>RECOVERY</span></div>'},
    {id:'delivery',title:'把接口约束变成共同语言',type:'交付线索',category:'reflection',caption:'流程、状态矩阵、字段规范和联调清单，帮助团队对齐。',tags:['产品交付','团队协作','原件待补'],related:['roles','sync','prototype'],visual:'<div class="mini-stack"><span>FLOW <b>全链路流程</b></span><span>MATRIX <b>状态与动作</b></span><span>CHECKLIST <b>联调清单</b></span></div>'},
    {id:'prototype',title:'把规则放进可操作的页面',type:'交互原型',category:'practice',caption:'体验用户端流程，并查看权益配置与运营管理原型。',tags:['交互原型','用户端','非线上系统'],related:['journey','recovery','delivery'],visual:'<div class="mini-quote">从地图找桩，<br>一直走到账单与退款。</div>'}
  ];

const categories={structure:{name:'结构'},decision:{name:'决策'},practice:{name:'实践'},reflection:{name:'思考'}};
const previews=Object.fromEntries(items.map(i=>[i.id,{category:i.category}]));
const visuals={};
const collections={project:{title:'一次充电，三方系统',en:'PROJECT COLLECTION / 02',description:'从一次扫码出发，阅读三方协作、交易状态、异常恢复与产品判断。打开一份材料，继续探索与它相关的内容。',aside:'和包 App × 特来电<br>产品经理 · 充电服务接入<span class="project-fact">方案设计 · 联调准备<small>当前材料用于说明方案与原型</small></span><a href="./prototypes/chuxing-equity/carlife/index.html#/map-list" target="_blank" rel="noopener">体验用户端原型 ↗</a>'}};
function preview(i){return '<div class="surface uniform '+i.category+'"><div class="preview-label"><span class="category-tag">'+categories[i.category].name+'</span>'+i.tags.map(t=>'<span class="facet-tag">'+t+'</span>').join('')+'</div><div class="travel-preview">'+i.visual+'</div><small class="preview-foot">'+i.type+' · 方案材料</small></div>';}
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
const narratives={
 delivery:{name:'跟随一次充电',steps:[['roles','先理解一次扫码背后，三方各自承接什么。'],['journey','把参与方放回从扫码到结算的具体旅程。'],['states','每一步进展都需要独立的事实来确认。'],['recovery','遇到中断时，当前事实决定用户能做什么。'],['prototype','最后走进原型，查看规则如何成为页面。']]},
 change:{name:'理解产品决策',steps:[['rails','先区分身份、权益与交易的边界。'],['autostart','在明确边界后，理解支付确认后的自动启充。'],['resume','流程中断或再次扫码时，先恢复原订单。'],['settlement','沿原交易继续，等待最终账单进入结算。'],['funds','金额确定后，再说明应退、应补与费用去向。']]},
 team:{name:'看三方如何协作',steps:[['roles','从三方职责开始建立共同理解。'],['states','职责边界决定每个状态的权威来源。'],['sync','通过事件与查询，让状态能够同步与恢复。'],['delivery','将接口约束整理为团队可以执行的材料。']]}
};
let activeRoute=null,routeStep=0;
const overview=document.createElement('section');
overview.className='project-overview';
overview.setAttribute('aria-label','项目总览');
world.insertBefore(overview,grid);
const overviewModes={
 delivery:{label:'充电旅程',title:'从一次扫码，看见三方接力',description:'用户在和包中发起一次充电。沿这次体验，查看身份、预付、物理履约与最终结算怎样衔接，再看结果不确定时如何继续。',flow:['一次充电如何开始','状态怎样被确认','交易怎样完成'],cta:'跟随一次充电，开始阅读'},
 change:{label:'产品决策',title:'更短的流程，清楚的交易边界',description:'支付到账不等于物理充电开始。沿自动启充、订单恢复与最终账单，理解方案如何组织用户动作，以及何时需要等待权威结果。',flow:['拆清业务边界','缩短与恢复流程','解释最终资金'],cta:'从链路边界，理解产品决策'},
 team:{label:'三方协作',title:'不同系统，怎样面对同一个结果？',description:'和包提供入口与支付，觉观承接交易编排，特来电提供充电履约。从职责、状态与同步机制，走向共同使用的流程和联调材料。',flow:['对齐参与方','确认权威状态','形成共同材料'],cta:'从三方职责，走进协作材料'}
};
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
const folderViews={
 delivery:{label:'跟随一次充电',note:'从用户旅程，到权威状态，再到结算与交付。',groups:[
 ['一次充电如何开始','先理解参与方与用户发起的这次服务。',['roles','rails','journey','autostart']],
 ['状态怎样被确认','付款、启充与恢复需要明确的事实。',['states','unknown','recovery','resume','sync']],
 ['交易怎样完成','从最终账单走向资金表达与可操作材料。',['settlement','funds','delivery','prototype']]]},
 change:{label:'理解产品决策',note:'沿业务边界、流程取舍与资金表达阅读。',groups:[
 ['拆清业务边界','区分三方职责、业务链路和状态语义。',['roles','rails','states']],
 ['缩短与恢复流程','理解自动启充、返回入口和不确定结果。',['autostart','resume','unknown','recovery','journey']],
 ['解释最终资金','连接结算、同步、交付与原型。',['settlement','funds','sync','delivery','prototype']]]},
 team:{label:'看三方如何协作',note:'从职责分工到状态对齐，再走进交付。',groups:[
 ['对齐参与方','用共同的旅程建立三方的工作边界。',['roles','rails','journey']],
 ['确认权威状态','让启充、异常和恢复面对同一业务事实。',['states','sync','unknown','recovery','autostart','resume']],
 ['形成共同材料','把结算与费用规则变成可检查的交付。',['settlement','funds','delivery','prototype']]]}
};
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
const legacyMap={overview:'roles',architecture:'rails',experience:'journey',tensions:'unknown',service:'recovery',supply:'settlement',growth:'sync',delivery:'delivery','section-context':'roles','section-model':'rails','section-journey':'journey','section-exception':'recovery','section-decisions':'autostart','section-consistency':'sync','section-delivery':'delivery','prototype-title':'prototype'};
function revealLegacyFragment(){const key=location.hash.slice(1);const id=legacyMap[key]||(key.startsWith('material-')?key.slice(9):null);if(id&&items.some(i=>i.id===id))openItem(id);}
window.addEventListener('hashchange',revealLegacyFragment);revealLegacyFragment();
