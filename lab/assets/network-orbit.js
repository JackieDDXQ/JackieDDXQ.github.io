import {createModel,cameraIds} from './network-model.mjs';
import {buildSpace,projectPoint,clusterColors} from './network-space.mjs';

const $=s=>document.querySelector(s),viewport=$('.viewport'),canvas=$('.space-canvas'),ctx=canvas.getContext('2d');
const reduced=matchMedia('(prefers-reduced-motion:reduce)');
const types={identity:'身份',role:'角色',thesis:'核心主张',theme:'能力',project:'项目',activity:'工作活动',practice:'AI / 协作实践',system:'系统',object:'业务对象',actor:'参与角色',mechanism:'机制',decision:'决策',problem:'问题',journey:'流程',evidence:'产物与证据',metric:'指标',note:'反思',constraint:'约束',experience:'经历',education:'教育',method:'方法'};
const statuses={supported:'当前内容有依据','needs-confirmation':'待本人确认','needs-evidence':'待补充证据',forecast:'预测 · 非已实现成果',experimental:'探索假设'};
const relationNames={contains:'包含',practices:'实践',demonstrates:'体现能力','participates-in':'参与',operates:'操作',owns:'负责','depends-on':'依赖','transforms-into':'转化为',governs:'约束','delivers-to':'交付给',precedes:'先于','evidenced-by':'依据为','measured-by':'衡量指标',extends:'延展自','reflects-on':'反思',assists:'辅助','needs-evidence':'需要证据','has-activity':'开展工作','viewed-through':'体现视角',produces:'产出','transfers-into':'迁移到','shares-pattern-with':'共享模式','addressed-by':'通过决策回应'};
const cameraNames={projectAnatomy:'项目聚簇',capabilityEvidence:'能力关联',augmentedPractice:'AI 与工作流'};
let model,space,focus=null,camera='projectAnatomy',hover=null,trail=[],near=new Set(),projected=new Map();
let view={yaw:-.12,pitch:-.15,zoom:1.15,center:{x:0,y:0,z:0}},orbit=false,drag=null,frame=0,tween=null,lastFrame=0;
const cache=new Map(),buttons=new Map();
function el(tag,text,cls){const n=document.createElement(tag);if(text!=null)n.textContent=text;if(cls)n.className=cls;return n;}
function getState(){const p=new URLSearchParams(location.hash.slice(1));return {id:model.nodes.has(p.get('node'))?p.get('node'):null,camera:cameraIds.includes(p.get('view'))?p.get('view'):'projectAnatomy'};}
function setOrbit(value){orbit=value&&!reduced.matches;$('.orbit-toggle').setAttribute('aria-pressed',String(orbit));$('.orbit-toggle').textContent=orbit?'Ⅱ 暂停环绕':'▷ 自动环绕';if(orbit)requestDraw();}
function navigate(id,mode=camera,push=true){
  if(id&&!model.nodes.has(id))return;
  setOrbit(false);hover=null;focus=id;camera=mode;
  if(push){const p=new URLSearchParams();if(id)p.set('node',id);p.set('view',camera);history.pushState({},'','#'+p);}
  const index=trail.indexOf(id);trail=index>=0?trail.slice(0,index+1):[...trail,id];
  near=new Set(id?[id,...model.adjacency.get(id).map(e=>model.neighbor(e,id))]:[]);
  if(!cache.has(camera))cache.set(camera,buildSpace(model.data,camera));
  const next=cache.get(camera),p=next.get(id),destination={yaw:view.yaw,pitch:view.pitch,zoom:id?1.6:1.15,center:p?{x:p.x*.82,y:p.y*.82,z:p.z*.82}:{x:0,y:0,z:0}};
  tween={start:performance.now(),fromSpace:space||next,toSpace:next,from:structuredClone(view),to:destination};
  if(reduced.matches){space=next;view=destination;tween=null;}else space=space||next;
  document.body.classList.toggle('focused',!!id);
  for(const button of document.querySelectorAll('[data-camera]'))button.setAttribute('aria-pressed',String(button.dataset.camera===camera));
  buttons.forEach((b,key)=>{b.classList.toggle('selected',key===id);b.setAttribute('aria-pressed',String(key===id));});
  renderInspector();renderLegend();resetHint();requestDraw();
  $('.breadcrumbs').replaceChildren(...trail.slice(-5).map(id=>{const b=el('button',id?model.nodes.get(id).label:'作品全景');b.setAttribute('aria-current',String(id===focus));b.addEventListener('click',()=>navigate(id));return b;}));
  $('.graph-count').textContent=`${model.nodes.size} 节点 / ${model.data.edges.length} 关系${focus?' · '+near.size+' 个聚焦节点':''}`;
  document.title=(id?model.nodes.get(id).label:'Constellation')+' · Jackie Hou';
}
function resetHint(){ $('.relation-preview').textContent=focus?`${model.adjacency.get(focus).length} 条直接关系 · 点击邻居继续探索`:'拖动旋转 · 点击节点聚焦 · + / − 缩放'; }
function renderLegend(){
  const names=camera==='projectAnatomy'?['运营商权益','智能协同','出行权益','会员订阅','实物商城','共享能力 / 活动']:camera==='capabilityEvidence'?['能力主题','活动与实践','产物与证据','机制与决策','系统与对象','项目与背景']:['AI 与约束','人的工作活动','系统与业务','产出与验证','反思与复用','项目与背景'];
  $('.cluster-legend').replaceChildren(...names.map((name,i)=>{const s=el('span',name);s.style.setProperty('--cluster',clusterColors[i]);return s;}));
}
function createNodes(){
  model.data.nodes.forEach(node=>{
    const b=el('button',null,'space-node');b.type='button';b.dataset.id=node.id;b.dataset.type=node.type;b.dataset.status=node.status;
    b.setAttribute('aria-label',`${node.label}，${types[node.type]||node.type}，${statuses[node.status]}`);
    b.append(el('span',null,'orb'),el('span',node.label,'space-label'));
    b.addEventListener('click',()=>navigate(node.id));
    b.addEventListener('pointerenter',()=>{if(!drag){hover=node.id;requestDraw();$('.relation-preview').textContent=node.label+' · '+model.adjacency.get(node.id).length+' 条直接关系';}});
    b.addEventListener('pointerleave',()=>{hover=null;resetHint();requestDraw();});
    b.addEventListener('focus',()=>{
      setOrbit(false);hover=node.id;
      const p=projected.get(node.id);
      if(p&&(p.x<30||p.x>viewport.clientWidth-100||p.y<30||p.y>viewport.clientHeight-30)){tween=null;view.center={...space.get(node.id)};}
      requestDraw();
    });
    b.addEventListener('blur',()=>{hover=null;requestDraw();});
    buttons.set(node.id,b);$('.node-layer').append(b);
  });
}
function renderInspector(){
  $('.home-guide').hidden=!!focus;$('.connections-panel').hidden=!focus;$('.source-link').hidden=true;$('.focus-facts').replaceChildren();$('.inspector-scroll').scrollTop=0;
  if(!focus){$('.panel-eyebrow').textContent='A CONNECTED BODY OF WORK';$('.focus-title').textContent='在关联中，看见工作。';$('.focus-summary').textContent='五个项目聚簇，共享的方法与工作活动穿行其间。转动这片网络，从一个节点走进它的上下文。';return;}
  const node=model.nodes.get(focus);$('.panel-eyebrow').textContent=types[node.type]||node.type;$('.focus-title').textContent=node.label;$('.focus-summary').textContent=node.summary||'沿直接关系，探索这个节点的工作情境与产物。';
  $('.focus-facts').append(el('span',statuses[node.status],`fact ${node.status==='supported'?'':'caution'}`));
  if(node.temporal)$('.focus-facts').append(el('span',node.temporal.start?`${node.temporal.start}${node.temporal.end?' — '+node.temporal.end:''}${node.temporal.status!=='supported'?' · 时间待确认':''}`:'时间未确认','fact'));
  if(node.scope&&model.nodes.has(node.scope))$('.focus-facts').append(el('span',model.nodes.get(node.scope).label,'fact'));
  if(node.visibility==='internal')$('.focus-facts').append(el('span','内部组织节点','fact caution'));
  if(node.route&&/^\/(?!\/)/.test(node.route)){$('.source-link').href=node.route;$('.source-link').hidden=false;}
  const edges=model.adjacency.get(focus);$('.relation-count').textContent=edges.length;
  $('.relationship-list').replaceChildren(...edges.map(edge=>{
    const other=model.nodes.get(model.neighbor(edge,focus)),b=el('button',null,'relation-row');b.dataset.target=other.id;
    const direction=model.data.vocabulary.edgeTypes[edge.type].directionality==='undirected'?'↔':edge.from===focus?'→':'←';
    b.append(el('small',direction+' '+(relationNames[edge.type]||edge.type)+(direction==='←'?' · 指向当前节点':'')),el('strong',other.label));
    if(edge.status!=='supported')b.append(el('em','此关系：'+statuses[edge.status]));
    if(other.status!=='supported'&&other.status!==edge.status)b.append(el('em','节点：'+statuses[other.status]));
    b.addEventListener('click',()=>navigate(other.id));b.addEventListener('pointerenter',()=>{hover=other.id;requestDraw();});b.addEventListener('pointerleave',()=>{hover=null;requestDraw();});return b;
  }));
}
function requestDraw(){if(!frame)frame=requestAnimationFrame(draw);}
function draw(now){
  frame=0;if(!model||!space)return;
  if(tween){
    const t=Math.min(1,(now-tween.start)/850),e=1-Math.pow(1-t,3),lerp=(a,b)=>a+(b-a)*e;
    for(const k of ['yaw','pitch','zoom'])view[k]=lerp(tween.from[k],tween.to[k]);
    for(const k of ['x','y','z'])view.center[k]=lerp(tween.from.center[k],tween.to.center[k]);
    space=new Map([...tween.toSpace].map(([id,p])=>{const a=tween.fromSpace.get(id);return [id,{...p,x:lerp(a.x,p.x),y:lerp(a.y,p.y),z:lerp(a.z,p.z)}];}));
    if(t===1)tween=null;
  }
  if(orbit)view.yaw+=Math.min(40,now-(lastFrame||now))*.0001;lastFrame=now;
  const w=viewport.clientWidth,h=viewport.clientHeight,dpr=Math.min(devicePixelRatio||1,2);
  if(canvas.width!==Math.round(w*dpr)||canvas.height!==Math.round(h*dpr)){canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);}
  ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h);
  projected=new Map([...space].map(([id,p])=>[id,{...projectPoint(p,view,w,h),group:p.group}]));
  // A faint orbital grid supplies depth cues without adding semantic graph edges.
  ctx.lineWidth=.6;ctx.strokeStyle='#96a5b321';
  for(const radius of [200,400,600]){ctx.beginPath();for(let i=0;i<=80;i++){const a=i/80*Math.PI*2,p=projectPoint({x:Math.cos(a)*radius,y:270,z:Math.sin(a)*radius},view,w,h);i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y);}ctx.stroke();}
  const active=hover||focus;
  const connected=active?new Set([active,...model.adjacency.get(active).map(e=>model.neighbor(e,active))]):null;
  // Soft cluster fields, computed from membership, distinguish groups from isolated dots.
  for(let group=0;group<6;group++){
    const points=[...projected.values()].filter(p=>p.group===group),x=points.reduce((s,p)=>s+p.x,0)/points.length,y=points.reduce((s,p)=>s+p.y,0)/points.length;
    if(!points.length)continue;const radius=Math.max(65,Math.min(w,h)*.23*view.zoom);
    const g=ctx.createRadialGradient(x,y,0,x,y,radius);g.addColorStop(0,clusterColors[group]+'18');g.addColorStop(1,clusterColors[group]+'00');ctx.fillStyle=g;ctx.fillRect(x-radius,y-radius,radius*2,radius*2);
  }
  for(const edge of model.data.edges){
    const a=projected.get(edge.from),b=projected.get(edge.to),direct=active&&(edge.from===active||edge.to===active),local=focus&&near.has(edge.from)&&near.has(edge.to);
    ctx.strokeStyle=direct?'#537c8dbb':local?'#708b9652':active?'#839baa15':'#8c9ca843';ctx.lineWidth=direct?1.2:.65;
    ctx.setLineDash(edge.status==='supported'?[]:edge.status==='experimental'||edge.status==='needs-confirmation'?[2,4]:[5,4]);
    ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();
    if(direct&&model.data.vocabulary.edgeTypes[edge.type].directionality!=='undirected'){
      const angle=Math.atan2(b.y-a.y,b.x-a.x),x=a.x+(b.x-a.x)*.75,y=a.y+(b.y-a.y)*.75;ctx.setLineDash([]);ctx.beginPath();ctx.moveTo(x-5*Math.cos(angle-.45),y-5*Math.sin(angle-.45));ctx.lineTo(x,y);ctx.lineTo(x-5*Math.cos(angle+.45),y-5*Math.sin(angle+.45));ctx.stroke();
    }
  }
  ctx.setLineDash([]);
  const occupied=[];
  const ordered=[...model.data.nodes].sort((a,b)=>priority(b)-priority(a));
  function priority(n){return n.id===active?100:n.id===focus?95:n.type==='project'?80:focus&&near.has(n.id)?60:n.type==='identity'?50:n.type==='theme'?40:0;}
  for(const node of ordered){
    const p=projected.get(node.id),b=buttons.get(node.id),isHub=node.type==='project'||node.type==='identity',important=connected?.has(node.id),size=(node.id===focus?22:isHub?17:node.type==='activity'?10:7)*Math.max(.7,Math.min(1.4,p.perspective));
    b.style.transform=`translate(${p.x-12}px,${p.y-12}px)`;b.style.zIndex=String(node.id===active?5000:Math.round(2000-p.z));
    b.style.setProperty('--orb-size',size+'px');b.style.setProperty('--orb-color',clusterColors[p.group]);b.style.opacity=active&&!important?.22:Math.max(.55,Math.min(1,p.perspective));
    const label=b.querySelector('.space-label'),show=priority(node)>0||node.id===hover;
    let box={x:p.x+14,y:p.y-9,w:node.type==='project'?155:140,h:node.label.length>18?34:18};
    const left=box.x+box.w>w-12;if(left)box.x=p.x-box.w-15;
    const collision=occupied.some(r=>box.x<r.x+r.w+8&&box.x+box.w>r.x-8&&box.y<r.y+r.h+7&&box.y+box.h>r.y-7);
    const visible=show&&((!collision&&box.x>=8&&box.y>8&&box.y+box.h<h-8)||node.id===active||node.id===focus);
    label.hidden=!visible;label.style.width=box.w+'px';label.classList.toggle('label-left',left);
    if(visible)occupied.push(box);
    b.classList.toggle('highlighted',node.id===active);b.classList.toggle('neighbor',!!important);
  }
  $('.orientation').textContent=`Y ${Math.round(view.yaw*180/Math.PI)}° / X ${Math.round(view.pitch*180/Math.PI)}°`;
  if(tween||orbit)requestDraw();
}
viewport.addEventListener('pointerdown',e=>{
  if(e.button!==0||e.target.closest('button')||!space)return;
  setOrbit(false);tween=null;hover=null;drag={x:e.clientX,y:e.clientY,yaw:view.yaw,pitch:view.pitch};viewport.setPointerCapture(e.pointerId);viewport.classList.add('dragging');viewport.focus({preventScroll:true});
});
viewport.addEventListener('pointermove',e=>{if(!drag)return;view.yaw=drag.yaw+(e.clientX-drag.x)*.006;view.pitch=Math.max(-1.35,Math.min(1.35,drag.pitch-(e.clientY-drag.y)*.006));requestDraw();});
function endDrag(e){if(!drag)return;drag=null;viewport.classList.remove('dragging');if(viewport.hasPointerCapture(e.pointerId))viewport.releasePointerCapture(e.pointerId);}
viewport.addEventListener('pointerup',endDrag);viewport.addEventListener('pointercancel',endDrag);
viewport.addEventListener('keydown',e=>{if(e.target!==viewport)return;const directions={ArrowLeft:[-.12,0],ArrowRight:[.12,0],ArrowUp:[0,-.12],ArrowDown:[0,.12]};if(directions[e.key]){e.preventDefault();rotate(...directions[e.key]);}});
function rotate(yaw,pitch=0){setOrbit(false);tween=null;view.yaw+=yaw;view.pitch=Math.max(-1.35,Math.min(1.35,view.pitch+pitch));requestDraw();}
document.querySelectorAll('[data-turn]').forEach(b=>b.addEventListener('click',()=>rotate(Number(b.dataset.turn))));
document.querySelectorAll('[data-zoom]').forEach(b=>b.addEventListener('click',()=>{tween=null;view.zoom=Math.max(.65,Math.min(3.2,view.zoom*(b.dataset.zoom==='in'?1.2:1/1.2)));requestDraw();}));
$('[data-fit]').addEventListener('click',()=>{setOrbit(false);tween=null;view={yaw:-.12,pitch:-.15,zoom:1.15,center:{x:0,y:0,z:0}};requestDraw();});
$('.orbit-toggle').addEventListener('click',()=>{tween=null;setOrbit(!orbit);});
$('.home-button').addEventListener('click',()=>navigate(null));
document.querySelectorAll('[data-jump]').forEach(b=>b.addEventListener('click',()=>navigate(b.dataset.jump)));
document.querySelectorAll('[data-camera]').forEach(b=>b.addEventListener('click',()=>navigate(focus,b.dataset.camera)));
$('.node-search').addEventListener('input',e=>{
  const query=e.target.value.trim().toLowerCase(),results=$('.search-results');
  results.replaceChildren();if(!query||!model)return;
  const matches=model.data.nodes.filter(n=>(n.label+' '+n.id).toLowerCase().includes(query));
  results.append(el('small',`${matches.length} 个结果${matches.length>12?' · 显示前 12 项':''}`));
  for(const node of matches.slice(0,12)){const b=el('button',node.label+' · '+(types[node.type]||node.type));b.addEventListener('click',()=>{navigate(node.id);results.replaceChildren();e.target.value='';});results.append(b);}
});
window.addEventListener('popstate',()=>{if(model){const s=getState();navigate(s.id,s.camera,false);}});
window.addEventListener('hashchange',()=>{if(model){const s=getState();if(s.id!==focus||s.camera!==camera)navigate(s.id,s.camera,false);}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&focus){navigate(trail.length>1?trail[trail.length-2]:null);}});
document.addEventListener('visibilitychange',()=>{if(document.hidden)setOrbit(false);});
reduced.addEventListener('change',()=>{setOrbit(false);$('.orbit-toggle').disabled=reduced.matches;if(tween){space=tween.toSpace;view=tween.to;tween=null;}requestDraw();});
new ResizeObserver(requestDraw).observe(viewport);
try{
  const response=await fetch('data/portfolio-network.json');if(!response.ok)throw new Error('HTTP '+response.status);
  model=createModel(await response.json());createNodes();$('.map-message').textContent='';$('.data-version').textContent='NETWORK v'+model.data.meta.version;
  document.querySelectorAll('button[disabled]').forEach(b=>b.disabled=false);$('.orbit-toggle').disabled=reduced.matches;
  const state=getState();navigate(state.id,state.camera,false);
}catch(error){$('.map-message').textContent='网络数据未能载入。请使用本地 HTTP 预览，或从下方静态项目入口继续。';console.error(error);}
