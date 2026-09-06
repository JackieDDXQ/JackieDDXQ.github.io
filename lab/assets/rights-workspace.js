import {createModel} from './network-model.mjs';
const $=s=>document.querySelector(s),world=$('.world'),canvas=$('.canvas'),dialog=$('dialog');
const root='project:rights-management',reduced=matchMedia('(prefers-reduced-motion: reduce)');
const names={home:'权益系统',systems:'系统与边界',decisions:'问题与决策',artifacts:'原型与产物',work:'工作活动'};
const types={system:'系统',decision:'决策',mechanism:'机制',problem:'问题',evidence:'原型 / 产物',activity:'工作活动',actor:'参与角色',object:'业务对象',journey:'业务流程',metric:'指标',practice:'协作实践',theme:'能力',project:'项目',note:'反思'};
const rel={contains:'包含','participates-in':'参与','has-activity':'开展工作','evidenced-by':'依据为',produces:'产出',assists:'辅助','addressed-by':'通过决策回应',governs:'约束',demonstrates:'体现能力','viewed-through':'体现视角','measured-by':'衡量指标','depends-on':'依赖','transforms-into':'转化为',precedes:'先于',operates:'操作',owns:'负责','delivers-to':'交付给',extends:'延展自'};
const states={supported:'内容有依据','needs-confirmation':'待确认','needs-evidence':'待补充证据',experimental:'探索假设',forecast:'预测，非已实现成果'};
const copy={
'system:rights-depot':'将外部供应商的产品，转化为稳定的内部商品与规格。',
'system:rights-omni':'管理权益库存、配置、发放与核销。',
'system:rights-cel':'管理运营商套餐、模板、渠道与限办规则。',
'system:rights-touchpoint':'将配置与履约状态，转化为用户可以理解的下一步操作。',
'problem:rights-variation':'供给、权益组合、销售策略和领取状态，需要独立变化，同时保持全链路稳定。',
'decision:rights-standardization':'用内部规格，隔离外部供应商的变化。',
'decision:rights-abstraction':'将库存资源与对外的权益配置分开。',
'decision:rights-policy':'在运营商、套餐和渠道层级分别控制限制。',
'decision:rights-state-translation':'把后台差异，转化为用户清晰的下一步操作。',
'activity:prototype-design':'将产品构想、系统结构与交互假设，转化为可查看、可运行的原型。'};
let model,groups,current='home',pan={x:0,y:0,scale:1},height=790,drag,animation,opener;
function el(tag,text,cls){const n=document.createElement(tag);if(text!=null)n.textContent=text;if(cls)n.className=cls;return n;}
function btn(text,fn,cls){const b=el('button',text,cls);b.type='button';b.addEventListener('click',fn);return b;}
function place(n,x,y,w,h){Object.assign(n.style,{left:x+'px',top:y+'px',width:w+'px',...(h?{height:h+'px'}:{})});world.append(n);return n;}
function desc(n){return copy[n.id]||n.summary||'';}
function pairs(id){return model.adjacency.get(id).map(edge=>({edge,node:model.nodes.get(model.neighbor(edge,id))}));}
function relation(edge,id){return `${model.data.vocabulary.edgeTypes[edge.type].directionality==='undirected'?'↔':edge.from===id?'→':'←'} ${rel[edge.type]||edge.type}${edge.to===id?' · 指向当前内容':''}`;}
function label(node){return types[node.type]||node.type;}
function paper(id,cls=''){const n=model.nodes.get(id),b=btn('',()=>read(id,b),'paper '+cls);b.dataset.node=id;b.append(el('small',label(n),'kind'),el('h3',n.label));if(desc(n))b.append(el('p',desc(n)));if(n.status!=='supported')b.append(el('em',states[n.status]));b.append(el('span','打开内容 ↗','open-label'));return b;}
function nested(key,x,y,w,h){const b=btn('',()=>show(key,b),'nested '+key);b.dataset.board=key;const head=el('div',null,'nested-heading');head.append(el('strong',names[key]),el('span',groups[key].length+' 张内容卡片 ↗'));b.append(head);const mini=el('div',null,'miniature');groups[key].slice(0,4).forEach((n,i)=>{const tile=el('div',null,'mini mini-'+i);tile.append(el('small',label(n)),el('strong',n.label));mini.append(tile);});b.append(mini);place(b,x,y,w,h);}
function render(){
 world.replaceChildren();world.className='world '+current;
 if(current==='home'){
  const title=el('div',null,'canvas-title');title.append(el('small','PROJECT / 01'),el('h1','运营商权益\n全链路管理系统'),el('p','把复杂业务，拆成可以独立变化的部分。'));place(title,365,33,640,130);
  place(paper('problem:rights-variation','question'),30,35,280,275);
  const note=el('div',null,'margin-note');note.append(el('span','从这里进入 →'),el('p','点开一张小画布，\n里面还有更具体的内容。'));place(note,46,339,245,72);
  nested('systems',350,200,690,315);nested('artifacts',30,455,275,285);nested('decisions',350,550,335,225);nested('work',720,555,320,215);
  height=815;
 }else{
  const title=el('div',null,'canvas-title');title.append(el('small','权益系统 / '+String(Object.keys(names).indexOf(current)).padStart(2,'0')),el('h1',names[current]),el('p',({systems:'从职责边界进入，理解每个系统为什么存在。',decisions:'从问题出发，查看回应它的产品决策。',artifacts:'保留原始入口，直接查看已有原型与案例。',work:'本项目开展的工作；打开卡片查看具体关联。'})[current]));place(title,42,25,900,125);
  const nodes=groups[current];height=Math.max(790,210+Math.ceil(nodes.length/3)*285);
  nodes.forEach((n,i)=>{
   const b=paper(n.id,(current==='systems'?'system-paper ':current==='decisions'?'decision-paper ':'')+(n.type==='problem'?'question':''));
   if(current==='artifacts'){const cover=el('div',null,'document-cover');cover.append(el('span','↗'),el('small',n.route?'原型 / 案例入口':'材料待补充'));b.insertBefore(cover,b.querySelector('h3'));}
   if(current==='work'){const edge=model.adjacency.get(root).find(e=>e.to===n.id);if(edge?.status!=='supported')b.append(el('em','项目关联：'+states[edge.status]));}
   place(b,42+(i%3)*345,185+Math.floor(i/3)*285+(i%3===1?17:0),310,250);
  });
 }
 world.style.height=height+'px';
 $('.trail').replaceChildren(btn('权益系统',()=>show('home')),...(current==='home'?[]:[el('span',' / '),el('strong',names[current])]));
 document.querySelectorAll('.board-index button').forEach(b=>b.setAttribute('aria-current',String(b.dataset.board===current)));
 $('[data-action=back]').disabled=current==='home';
}
function show(key,source,push=true){
 if(!names[key])key='home';if(dialog.open)dialog.close();animation?.cancel();const r=source?.getBoundingClientRect(),v=canvas.getBoundingClientRect();current=key;
 if(push)history.pushState({},'','#'+key);render();fit();
 if(!reduced.matches){world.style.transformOrigin=r?`${(r.x+r.width/2-v.x-pan.x)/pan.scale}px ${(r.y+r.height/2-v.y-pan.y)/pan.scale}px`:'50% 40%';animation=world.animate([{opacity:0,filter:'blur(3px)',transform:`translate(${pan.x}px,${pan.y}px) scale(${pan.scale*.86})`},{opacity:1,filter:'blur(0)',transform:world.style.transform}],{duration:520,easing:'cubic-bezier(.2,.75,.2,1)'});animation.finished.then(()=>world.style.transformOrigin='0 0').catch(()=>{});}
 document.title=names[current]+' · 权益系统工作台';
}
function fit(){pan.scale=Math.max(.3,Math.min(canvas.clientWidth/1100,(canvas.clientHeight-20)/height,1));pan.x=(canvas.clientWidth-1100*pan.scale)/2;pan.y=10;apply();}
function apply(){world.style.transformOrigin='0 0';world.style.transform=`translate(${pan.x}px,${pan.y}px) scale(${pan.scale})`;$('.scale').textContent=Math.round(pan.scale*100)+'%';}
function read(id,b){
 opener=b;const n=model.nodes.get(id),body=$('.reading');body.replaceChildren();body.append(el('small',label(n),'eyebrow'));const title=el('h2',n.label);title.id='material-title';body.append(title,el('span',states[n.status],'state '+n.status));if(desc(n))body.append(el('p',desc(n),'summary'));
 if(n.route&&/^\/(?!\/)/.test(n.route)){const a=el('a','打开原型 / 案例 ↗','primary');a.href=n.route;a.target='_blank';a.rel='noopener';body.append(a);}
 body.append(el('h3','内容关联'),el('p','方向与关系名称来自原始内容数据。','help'));
 pairs(id).forEach(({node,edge})=>{const row=el('div',null,'relation');row.append(el('small',relation(edge,id)),el('strong',node.label));if(edge.status!=='supported')row.append(el('em','关系：'+states[edge.status]));if(node.status!=='supported')row.append(el('em','内容：'+states[node.status]));body.append(row);});dialog.showModal();$('.close').focus();
}
$('.close').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>opener?.isConnected&&opener.focus({preventScroll:true}));
canvas.addEventListener('pointerdown',e=>{if(e.button!==0||e.target.closest('button,a'))return;animation?.cancel();drag={x:e.clientX,y:e.clientY,px:pan.x,py:pan.y};canvas.setPointerCapture(e.pointerId);canvas.focus({preventScroll:true});});
canvas.addEventListener('pointermove',e=>{if(!drag)return;pan.x=drag.px+e.clientX-drag.x;pan.y=drag.py+e.clientY-drag.y;apply();});
function end(e){drag=null;if(canvas.hasPointerCapture(e.pointerId))canvas.releasePointerCapture(e.pointerId);}canvas.addEventListener('pointerup',end);canvas.addEventListener('pointercancel',end);
canvas.addEventListener('keydown',e=>{if(e.target!==canvas)return;const a={ArrowLeft:[50,0],ArrowRight:[-50,0],ArrowUp:[0,50],ArrowDown:[0,-50]}[e.key];if(a){e.preventDefault();pan.x+=a[0];pan.y+=a[1];apply();}});
canvas.addEventListener('focusin',e=>{if(!e.target.matches('button'))return;animation?.cancel();const r=e.target.getBoundingClientRect(),v=canvas.getBoundingClientRect();if(r.left<v.left)pan.x+=v.left-r.left+10;if(r.right>v.right)pan.x-=r.right-v.right+10;if(r.top<v.top)pan.y+=v.top-r.top+10;if(r.bottom>v.bottom)pan.y-=r.bottom-v.bottom+10;apply();});
document.querySelectorAll('[data-action]').forEach(b=>b.addEventListener('click',()=>{animation?.cancel();const a=b.dataset.action;if(a==='back'){show('home');return;}if(a==='fit'){fit();return;}const next=Math.max(.3,Math.min(1.6,pan.scale*(a==='in'?1.2:1/1.2))),x=canvas.clientWidth/2,y=canvas.clientHeight/2;pan.x=x-(x-pan.x)*next/pan.scale;pan.y=y-(y-pan.y)*next/pan.scale;pan.scale=next;apply();}));
window.addEventListener('popstate',()=>show(location.hash.slice(1),null,false));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!dialog.open&&current!=='home'&&!e.defaultPrevented)show('home');});
new ResizeObserver(()=>{if(model)fit();}).observe(canvas);reduced.addEventListener('change',()=>animation?.cancel());
try{const r=await fetch('data/portfolio-network.json');if(!r.ok)throw Error(r.status);model=createModel(await r.json());const scoped=model.data.nodes.filter(n=>n.scope===root);groups={systems:scoped.filter(n=>n.type==='system'),decisions:scoped.filter(n=>['problem','decision'].includes(n.type)),artifacts:scoped.filter(n=>n.type==='evidence'),work:pairs(root).filter(x=>x.edge.from===root&&x.edge.type==='has-activity').map(x=>x.node)};
 Object.keys(names).forEach((key,i)=>{const b=btn('',()=>show(key));b.dataset.board=key;b.append(el('span',i===0?'▦':'▧'),el('strong',names[key]));$('.board-index').append(b);});$('.message').textContent='';show(location.hash.slice(1)||'home',null,false);
}catch(e){$('.message').textContent='内容未能载入，请从完整案例入口继续阅读。';console.error(e);}
