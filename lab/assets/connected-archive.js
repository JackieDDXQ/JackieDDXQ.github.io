import {createModel} from './network-model.mjs';
const $=s=>document.querySelector(s),main=$('#content'),dialog=$('dialog');
const types={project:'项目',theme:'能力主题',activity:'工作活动',practice:'协作实践',system:'系统',problem:'问题',decision:'决策',mechanism:'机制',evidence:'材料 / 原型',metric:'指标',actor:'参与角色',object:'业务对象',journey:'流程',experience:'经历',note:'反思',constraint:'约束',identity:'身份',role:'角色',thesis:'主张',method:'方法',education:'教育'};
const statuses={supported:'内容有依据','needs-confirmation':'待本人确认','needs-evidence':'待补充证据',experimental:'探索假设',forecast:'预测，非已实现成果'};
const relations={contains:'包含','has-activity':'开展工作',demonstrates:'体现能力','viewed-through':'体现视角','evidenced-by':'依据为',produces:'产出',assists:'辅助',extends:'延展自','measured-by':'衡量指标','addressed-by':'通过决策回应',governs:'约束',operates:'操作',owns:'负责','participates-in':'参与','depends-on':'依赖','transforms-into':'转化为','delivers-to':'交付给',precedes:'先于','reflects-on':'反思',practices:'实践','transfers-into':'迁移到','shares-pattern-with':'共享模式','needs-evidence':'需要证据'};
const descriptions={
'project:rights-management':'让供给、权益服务、增长与用户触点各有边界。',
'project:zhishu-platform':'把多人命题协作，组织为可审核、有激励的闭环。',
'project:chuxing-equity':'连接身份、会员权益、充电交易与结算。',
'project:multi-tenant-mall':'共享能力保持稳定，租户差异通过配置表达。',
'project:physical-mall':'从虚拟权益延展到商品、库存、订单与物流。',
'activity:prototype-design':'把产品构想、系统结构与交互假设，变成可以查看和运行的原型。',
'system:rights-depot':'把供应商产品转化为稳定的内部商品与规格。',
'system:rights-omni':'管理权益库存、配置、发放与核销。',
'system:rights-cel':'管理运营商套餐、模板、渠道与限办规则。',
'system:rights-touchpoint':'把配置与履约状态转化为用户可以理解的操作。'};
let model,current=null,animation,lastOpener;
function el(tag,text,cls){const n=document.createElement(tag);if(text!=null)n.textContent=text;if(cls)n.className=cls;return n;}
function button(text,action,cls){const b=el('button',text,cls);b.type='button';b.addEventListener('click',action);return b;}
function description(n){return descriptions[n.id]||n.summary||'';}
function link(n,text){if(!n.route||!/^\/(?!\/)/.test(n.route))return null;const a=el('a',text,'source-link');a.href=n.route;a.target='_blank';a.rel='noopener';return a;}
function neighbors(id){return model.adjacency.get(id).map(edge=>({edge,node:model.nodes.get(model.neighbor(edge,id))}));}
function relationText(edge,id){const both=model.data.vocabulary.edgeTypes[edge.type].directionality==='undirected';return `${both?'↔':edge.from===id?'→':'←'} ${relations[edge.type]||edge.type}${!both&&edge.to===id?' · 指向当前节点':''}`;}
function status(n){return el('span',statuses[n.status]||n.status,'status '+(n.status==='supported'?'':'pending'));}
function preview(n,index){
 const box=el('div',null,'mini-board tone-'+index);box.setAttribute('aria-hidden','true');
 const items=neighbors(n.id).filter(x=>['system','problem','evidence'].includes(x.node.type)).slice(0,4);
 box.append(el('span','PROJECT CONTENTS / '+String(index+1).padStart(2,'0'),'mini-caption'));
 items.forEach((x,i)=>{const tile=el('div',null,'mini-tile tile-'+i);tile.append(el('small',types[x.node.type]),el('strong',x.node.label));box.append(tile);});return box;
}
function projectCard(n,index){const b=button('',()=>navigate(n.id),'project-card');b.append(preview(n,index));const caption=el('div',null,'project-caption');caption.append(el('small','0'+(index+1)+' / PROJECT'),el('h3',n.label),el('p',description(n)),el('span','打开项目画布 ↗','enter'));b.append(caption);return b;}
function home(){
 const hero=el('section',null,'hero');hero.append(el('p','PRODUCT THINKING, CONNECTED.','eyebrow'));
 const title=el('h1');title.append(document.createTextNode('Jackie Hou'),el('span','Work, in context.'));hero.append(title);
 const foot=el('div',null,'hero-foot');foot.append(el('p','让复杂成为\n可以运行的系统。','statement'));
 const topics=el('div',null,'topics');model.data.nodes.filter(n=>n.type==='theme').forEach(n=>topics.append(button(n.label+' ↗',()=>navigate(n.id))));foot.append(topics);hero.append(foot);
 const section=el('section',null,'collection');const heading=el('div',null,'section-heading');heading.append(el('h2','Selected projects'),el('span','05 个项目 · 点击进入内容画布'));section.append(heading);
 const grid=el('div',null,'projects-grid');model.data.meta.canonicalProjectOrder.forEach((id,i)=>grid.append(projectCard(model.nodes.get(id),i)));section.append(grid);
 const bridge=el('section',null,'bridge');bridge.append(el('small','ANOTHER WAY IN'),el('h2','同一种工作，\n如何出现在不同项目里？'),el('p','从工作活动进入，查看它连接的项目、能力与产物。'),button('从「原型设计与实现」开始 ↗',()=>navigate('activity:prototype-design'),'black-button'));
 main.append(hero,section,bridge);
}
function card(item,id,index){
 const {node:n,edge}=item,b=button('',e=>openDetail(n.id,b),'content-card '+n.type);b.dataset.node=n.id;
 b.append(el('small',types[n.type]||n.type,'card-type'));
 if(n.type==='evidence'){const graphic=el('div',null,'artifact-cover');graphic.append(el('span','↗'),el('span',n.route?'可打开的原型 / 案例':'材料入口 · 待确认'));b.append(graphic);}
 if(n.type==='problem')b.append(el('span','“','quote'));
 b.append(el('h3',n.label));if(description(n))b.append(el('p',description(n)));
 if(n.type==='system'){const sub=neighbors(n.id).filter(x=>x.edge.from===n.id&&['contains','governs','operates'].includes(x.edge.type)).slice(0,3);if(sub.length){const list=el('div',null,'sub-items');sub.forEach(x=>list.append(el('span',x.node.label)));b.append(list);}}
 const bottom=el('div',null,'card-bottom');bottom.append(el('span',relationText(edge,id)),el('span','↗'));b.append(bottom);
 if(n.status!=='supported')b.append(status(n));if(edge.status!=='supported')b.append(el('span','关系：'+statuses[edge.status],'status pending'));
 b.style.setProperty('--delay',Math.min(index*30,180)+'ms');return b;
}
function board(id){
 const n=model.nodes.get(id),items=neighbors(id);
 const breadcrumb=el('nav',null,'breadcrumb');breadcrumb.setAttribute('aria-label','当前位置');breadcrumb.append(button('作品档案',()=>navigate(null)),el('span','/'),el('span',n.label));main.append(breadcrumb);
 const heading=el('section',null,'board-heading');const text=el('div');text.append(el('p',(types[n.type]||n.type)+' / CONNECTED ARCHIVE','eyebrow'),el('h1',n.label),el('p',description(n),'board-description'));heading.append(text);
 const meta=el('div',null,'board-meta');meta.append(status(n),el('small',items.length+' 条直接关系'));const source=link(n,'阅读完整案例 ↗');if(source)meta.append(source);heading.append(meta);main.append(heading);
 const notes=el('div',null,'board-note');notes.append(el('span','在这里，打开一份材料。'),el('span','打开卡片，沿明确的关联继续阅读。'));main.append(notes);
 const groups=[['项目与情境',x=>x.node.type==='project'],['问题、系统与材料',x=>!['project','theme','activity','practice','metric','experience','education'].includes(x.node.type)],['工作活动与能力',x=>['theme','activity','practice'].includes(x.node.type)],['经历与待核实信息',x=>['metric','experience','education'].includes(x.node.type)]];
 if(n.type==='project')groups.push(groups.shift());
 for(const [name,predicate] of groups){const subset=items.filter(predicate);if(!subset.length)continue;const section=el('section',null,'board-section');const h=el('div',null,'section-heading');h.append(el('h2',name),el('span',String(subset.length).padStart(2,'0')));section.append(h);const grid=el('div',null,'content-grid');subset.forEach((item,i)=>grid.append(card(item,id,i)));section.append(grid);main.append(section);}
 if(!items.length)main.append(el('p','源数据暂未列出这个节点的直接关系。','empty'));
}
function navigate(id,push=true){
 if(id&&!model.nodes.has(id))id=null;if(dialog.open)dialog.close();current=id;
 if(push)history.pushState({},'',id?'#node='+encodeURIComponent(id):location.pathname);
 animation?.cancel();main.replaceChildren();id?board(id):home();document.title=(id?model.nodes.get(id).label:'Work, in context')+' — Jackie Hou';
 if(!matchMedia('(prefers-reduced-motion: reduce)').matches)animation=main.animate([{opacity:0,transform:'perspective(1400px) translateY(24px) rotateX(2deg) scale(.985)'},{opacity:1,transform:'none'}],{duration:480,easing:'cubic-bezier(.2,.7,.2,1)'});
 window.scrollTo({top:0,behavior:'instant'});if(push){const title=main.querySelector('h1');title.tabIndex=-1;title.focus({preventScroll:true});}
}
function openDetail(id,opener){
 lastOpener=opener;const n=model.nodes.get(id),body=$('.detail-body');body.replaceChildren();body.append(el('p',types[n.type]||n.type,'eyebrow'));const h=el('h2',n.label);h.id='detail-title';body.append(h,status(n));if(description(n))body.append(el('p',description(n),'detail-summary'));
 if(n.scope&&model.nodes.has(n.scope)){const scope=el('div',null,'scope');scope.append(el('small','来源明确标注的项目范围'),button(model.nodes.get(n.scope).label+' ↗',()=>navigate(n.scope)));body.append(scope);}
 const source=link(n,'打开原始案例 / 原型 ↗');if(source)body.append(source);
 body.append(el('h3','这份内容，还连接到哪里？','detail-subtitle'),el('p','下列关系直接来自源数据。箭头表示关系方向，点击可继续阅读。','detail-help'));
 const list=el('div',null,'relations');neighbors(id).forEach(({edge,node})=>{const b=button('',()=>navigate(node.id),'relation');b.dataset.target=node.id;b.append(el('small',relationText(edge,id)),el('strong',node.label));if(edge.status!=='supported')b.append(el('em','关系：'+statuses[edge.status]));if(node.status!=='supported')b.append(el('em','节点：'+statuses[node.status]));list.append(b);});body.append(list);
 dialog.showModal();$('.close').focus();
}
$('.close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});dialog.addEventListener('close',()=>{if(lastOpener?.isConnected)lastOpener.focus({preventScroll:true});});
window.addEventListener('popstate',()=>navigate(new URLSearchParams(location.hash.slice(1)).get('node'),false));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!dialog.open&&current&&!e.defaultPrevented)navigate(null);});
matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',()=>animation?.cancel());
try{const response=await fetch('data/portfolio-network.json');if(!response.ok)throw new Error('HTTP '+response.status);model=createModel(await response.json());navigate(new URLSearchParams(location.hash.slice(1)).get('node'),false);}catch(error){main.replaceChildren(el('p','内容暂未载入。请通过本地 HTTP 预览打开，或从实验室进入现有案例。','loading'));console.error(error);}

