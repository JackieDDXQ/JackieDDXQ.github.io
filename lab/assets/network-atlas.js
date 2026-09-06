import { createModel, cameraIds, layout } from './network-model.mjs';

const typeLabels = {identity:'身份',role:'角色',thesis:'核心主张',theme:'能力主题',project:'项目',activity:'工作活动',practice:'协作实践',system:'系统',object:'业务对象',actor:'参与角色',mechanism:'机制',decision:'产品决策',problem:'问题',journey:'业务流程',evidence:'案例 / 原型证据',metric:'指标',note:'反思',constraint:'约束',experience:'经历',education:'教育',method:'方法'};
const statusLabels = {supported:'当前内容有依据','needs-confirmation':'待本人确认','needs-evidence':'待补充证据',forecast:'预测 · 非已实现成果',experimental:'探索假设'};
const edgeLabels = {contains:'包含',practices:'实践',demonstrates:'体现能力','participates-in':'参与',operates:'操作',owns:'拥有 / 负责','depends-on':'依赖','transforms-into':'转化为',governs:'约束','delivers-to':'交付给',precedes:'先于','evidenced-by':'依据为','measured-by':'衡量指标',extends:'延展自','reflects-on':'反思',assists:'辅助','needs-evidence':'需要证据','has-activity':'开展工作','viewed-through':'体现视角',produces:'产出','transfers-into':'迁移到','shares-pattern-with':'共享模式','addressed-by':'通过决策回应'};
const $ = selector => document.querySelector(selector);
const viewport = $('.viewport'), world = $('.world'), nodeLayer = $('.node-layer'), edgeLayer = $('.edge-layer');
const reduced = matchMedia('(prefers-reduced-motion:reduce)');
const narrow = matchMedia('(max-width:720px)');
const svgNS = 'http://www.w3.org/2000/svg';
let model, focus = null, camera = 'projectAnatomy', projection, geometry;
let pan = {x:0,y:0,scale:1}, drag = null, suppressed = false, animationFrame = 0;
let trail = [], activeAnimations = [], hovered = null;
const buttons = new Map();
let edgeElements = [];

function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text != null) node.textContent = text;
  if (className) node.className = className;
  return node;
}
function currentState() {
  const params = new URLSearchParams(location.hash.slice(1));
  const id = params.get('node');
  return {focus:model.nodes.has(id)?id:null,camera:cameraIds.includes(params.get('view'))?params.get('view'):'projectAnatomy'};
}
function navigate(id, chosenCamera, push = true) {
  if (id != null && !model.nodes.has(id)) return;
  hovered = null;
  const sameNode = focus === id;
  const previousPositions = geometry?.positions;
  focus = id;
  camera = chosenCamera || (id && model.nodes.get(id).type === 'theme' ? 'capabilityEvidence' : id && ['practice','activity'].includes(model.nodes.get(id).type) ? 'augmentedPractice' : 'projectAnatomy');
  if (push) {
    const params = new URLSearchParams();
    if (focus) {params.set('node',focus);params.set('view',camera);}
    const hash = params.size ? '#' + params : location.pathname;
    history.pushState({},'',hash);
  }
  if (!sameNode || !trail.length) {
    const index = trail.indexOf(focus);
    trail = index >= 0 ? trail.slice(0,index+1) : [...trail,focus];
  }
  projection = model.project(focus);
  geometry = layout(projection,focus,camera,model.data);
  document.body.classList.toggle('focused',!!focus);
  renderCameras();
  renderNodes(previousPositions, sameNode);
  renderInspector();
  renderTrail();
  fit(false);
  drawEdges();
  animateEdges();
  if (focus) buttons.get(focus)?.focus({preventScroll:true});
  $('.graph-count').textContent = `${projection.nodes.length} / ${model.nodes.size} 节点 · ${projection.edges.length} 条可见关系`;
  resetHint();
  document.title = `${focus?model.nodes.get(focus).label:'Connected Practice'} · Jackie Hou`;
}
function renderCameras() {
  const container = $('.camera-options');
  container.replaceChildren();
  if (!focus) return;
  cameraIds.forEach(id=>{
    const button = element('button', {projectAnatomy:'项目解剖',capabilityEvidence:'能力与证据',augmentedPractice:'增强型工作流'}[id]);
    button.type='button'; button.dataset.camera=id;
    button.setAttribute('aria-pressed',String(id===camera));
    button.title = model.data.cameraProfiles[id].question;
    button.addEventListener('click',()=>navigate(focus,id));
    container.append(button);
  });
}
function renderNodes(previousPositions, sameNode) {
  activeAnimations.forEach(a=>a.cancel()); activeAnimations=[];
  world.style.width = `${geometry.width}px`; world.style.height = `${geometry.height}px`;
  const visible = new Set(projection.nodes.map(n=>n.id));
  buttons.forEach((button,id)=>{button.hidden=!visible.has(id);});
  projection.nodes.forEach((node,index)=>{
    let button = buttons.get(node.id);
    if (!button) {
      button = element('button',null,'node'); button.type='button';
      button.dataset.id=node.id;button.dataset.type=node.type;button.dataset.status=node.status;
      button.title = `${node.label} · ${statusLabels[node.status]||node.status}`;
      button.setAttribute('aria-label',`${node.label}，${typeLabels[node.type]||node.type}，${statusLabels[node.status]||node.status}`);
      button.addEventListener('click',()=>{if(!suppressed)navigate(node.id);});
      button.addEventListener('pointerenter',()=>highlight(node.id));
      button.addEventListener('pointerleave',()=>highlight(null));
      button.addEventListener('focus',()=>highlight(node.id));
      button.addEventListener('blur',()=>highlight(null));
      buttons.set(node.id,button);nodeLayer.append(button);
    }
    button.hidden=false;button.replaceChildren();
    const p = geometry.positions.get(node.id);
    button.style.width=`${p.w}px`;button.style.height=`${p.h}px`;
    button.style.transform=`translate(${p.x-p.w/2}px,${p.y-p.h/2}px)`;
    const projectIndex = model.data.meta.canonicalProjectOrder.indexOf(node.id);
    if (!focus && projectIndex>=0) button.append(element('span',`P0${projectIndex+1}`,'project-index'));
    else button.append(element('span',`${typeLabels[node.type]||node.type}${node.status!=='supported'?' · '+statusLabels[node.status]:''}`,'node-kind'));
    const title = node.type==='identity'&&!focus ? 'Jackie Hou' : node.label;
    button.append(element('span',title,'node-label'));
    button.classList.toggle('selected',node.id===focus);
    button.classList.toggle('quiet',!!focus&&!model.data.cameraProfiles[camera].emphasizeNodeTypes.includes(node.type));
    button.setAttribute('aria-pressed',String(node.id===focus));
    if (!reduced.matches && !narrow.matches && !sameNode && !previousPositions?.has(node.id)) {
      const final = button.style.transform;
      activeAnimations.push(button.animate([{opacity:0,transform:`${final} perspective(900px) translateZ(-65px) rotateX(8deg)`},{opacity:1,transform:final}],{duration:480,delay:Math.min(index*12,150),easing:'cubic-bezier(.2,.7,.15,1)'}));
    }
  });
  $('.lane-labels').replaceChildren(...geometry.lanes.map(lane=>{
    const label = element('div',lane.name,'lane-label');label.append(element('span',String(lane.count)));label.style.left=`${lane.x}px`;label.style.top=`${lane.y}px`;return label;
  }));
  edgeLayer.replaceChildren();
  edgeElements = projection.edges.map(edge=>{
    const path=document.createElementNS(svgNS,'path');path.classList.add('edge');
    path.dataset.status=edge.status;path.dataset.key=edge.key;
    const direction = model.data.vocabulary.edgeTypes[edge.type].directionality;
    if (focus && direction!=='undirected') path.setAttribute('marker-end','url(#arrow)');
    const title=document.createElementNS(svgNS,'title');title.textContent=`${model.nodes.get(edge.from).label} → ${edgeLabels[edge.type]||edge.type} → ${model.nodes.get(edge.to).label}`;path.append(title);
    edgeLayer.append(path);return {edge,path};
  });
}
function drawEdges() {
  if(!geometry)return;
  // Track the actual interpolated DOM positions, including keyboard-driven panning.
  const base=world.getBoundingClientRect();
  const coordinates=new Map();
  projection.nodes.forEach(node=>{
    const r=buttons.get(node.id).getBoundingClientRect();
    coordinates.set(node.id,{x:(r.x-base.x+r.width/2)/pan.scale,y:(r.y-base.y+r.height/2)/pan.scale,w:r.width/pan.scale,h:r.height/pan.scale});
  });
  edgeElements.forEach(({edge,path})=>{
    const a=coordinates.get(edge.from),b=coordinates.get(edge.to);
    const dx=b.x-a.x,dy=b.y-a.y;
    function boundary(p,sign) {
      const s=1/Math.max(Math.abs(dx)/(p.w/2+5),Math.abs(dy)/(p.h/2+5),.001);
      return {x:p.x+dx*s*sign,y:p.y+dy*s*sign};
    }
    const start=boundary(a,1),end=boundary(b,-1);
    const bend=focus?Math.min(80,Math.abs(end.y-start.y)*.32):0;
    path.setAttribute('d',`M${start.x},${start.y} C${start.x},${start.y+bend} ${end.x},${end.y-bend} ${end.x},${end.y}`);
    const related = !hovered || edge.from===hovered || edge.to===hovered;
    path.classList.toggle('highlight',!!hovered&&related);
    path.classList.toggle('quiet',!related||(!hovered&&focus&&!model.data.cameraProfiles[camera].emphasizeEdgeTypes.includes(edge.type)));
  });
}
function animateEdges() {
  cancelAnimationFrame(animationFrame);const started=performance.now();
  function tick(now){drawEdges();if(!reduced.matches&&now-started<800)animationFrame=requestAnimationFrame(tick);}
  animationFrame=requestAnimationFrame(tick);
}
function resetHint() {
  $('.relation-preview').textContent = focus ? `${model.adjacency.get(focus).length} 条直接关系 · 拖动画布，沿节点继续` : '拖动画布，选择项目或能力。';
}
function highlight(id) {
  if(!projection)return;
  hovered=id;
  const neighbors=new Set(id?model.adjacency.get(id).map(edge=>model.neighbor(edge,id)):[]);
  buttons.forEach((button,key)=>{
    button.classList.toggle('hovered',key===id);
    button.classList.toggle('related',neighbors.has(key));
  });
  if(id&&id!==focus){
    const connecting=focus?model.adjacency.get(focus).find(e=>e.from===id||e.to===id):null;
    $('.relation-preview').textContent=connecting?`${model.nodes.get(connecting.from).label} — ${edgeLabels[connecting.type]} → ${model.nodes.get(connecting.to).label}`:`${model.nodes.get(id).label} · ${model.adjacency.get(id).length} 条直接关系，点击展开`;
  } else resetHint();
  drawEdges();
}
function renderInspector() {
  $('.home-guide').hidden=!!focus;$('.connections-panel').hidden=!focus;
  $('.source-link').hidden=true;$('.focus-facts').replaceChildren();
  $('.inspector-scroll').scrollTop=0;
  if(!focus){$('.panel-eyebrow').textContent='AN ATLAS OF WORK & THINKING';$('.focus-title').textContent='从一项工作，走向另一项。';$('.focus-summary').textContent='同一个项目连接能力、工作活动、系统和产物。选择任一节点，可以沿关系继续探索。';return;}
  const node=model.nodes.get(focus);
  $('.focus-title').textContent=node.label;
  $('.panel-eyebrow').textContent=typeLabels[node.type]||node.type;
  $('.focus-summary').textContent=node.summary||'沿下面的直接关系，查看这个节点所处的项目与工作情境。';
  $('.focus-facts').append(element('span',statusLabels[node.status]||node.status,`fact ${node.status!=='supported'?'caution':''}`));
  if(node.temporal){const t=node.temporal;$('.focus-facts').append(element('span',t.start?`${t.start}${t.end?' — '+t.end:''}${t.status!=='supported'?' · 时间待确认':''}`:'时间未确认','fact'));}
  if(node.visibility==='internal')$('.focus-facts').append(element('span','内部组织节点','fact caution'));
  if(node.scope&&model.nodes.has(node.scope))$('.focus-facts').append(element('span',model.nodes.get(node.scope).label,'fact'));
  if(node.route&&/^\/(?!\/)/.test(node.route)){$('.source-link').href=node.route;$('.source-link').hidden=false;}
  const edges=model.adjacency.get(focus);
  $('.relation-count').textContent=String(edges.length);
  $('.relationship-list').replaceChildren(...edges.map(edge=>{
    const other=model.nodes.get(model.neighbor(edge,focus));
    const row=element('button',null,'relation-row');row.type='button';row.dataset.target=other.id;
    const undirected=model.data.vocabulary.edgeTypes[edge.type].directionality==='undirected';
    row.append(element('small',`${undirected?'↔':edge.from===focus?'→':'←'} ${edgeLabels[edge.type]||edge.type}${!undirected&&edge.to===focus?' · 指向当前节点':''}`));
    row.append(element('strong',other.label));
    if(edge.status!=='supported')row.append(element('em',`此关系：${statusLabels[edge.status]||edge.status}`));
    if(other.status!=='supported'&&other.status!==edge.status)row.append(element('em',`节点：${statusLabels[other.status]||other.status}`));
    row.addEventListener('click',()=>navigate(other.id));
    row.addEventListener('pointerenter',()=>highlight(other.id));row.addEventListener('pointerleave',()=>highlight(null));
    return row;
  }));
}
function renderTrail(){
  $('.breadcrumbs').replaceChildren(...trail.slice(-6).flatMap((id,i)=>{
    const button=element('button',id?model.nodes.get(id).label:'作品全景');button.type='button';if(id===focus)button.setAttribute('aria-current','location');button.addEventListener('click',()=>navigate(id));
    return i?[element('span','/'),button]:[button];
  }));
}
function applyPan(){
  if(!geometry)return;
  const w=viewport.clientWidth,h=viewport.clientHeight;
  pan.x=Math.max(Math.min(0,w-geometry.width*pan.scale)-80,Math.min(w*.45,pan.x));
  pan.y=Math.max(Math.min(0,h-geometry.height*pan.scale)-60,Math.min(h*.4,pan.y));
  world.style.transform=`translate(${pan.x}px,${pan.y}px) scale(${pan.scale})`;
}
function fit(all = false){
  if(!geometry)return;
  // Phone uses horizontal exploration instead of shrinking all labels to illegibility.
  pan.scale=all ? Math.max(.25,Math.min(viewport.clientWidth/geometry.width,(viewport.clientHeight-15)/geometry.height,1.15)) : narrow.matches ? .72 : focus ? Math.max(.65,Math.min(viewport.clientWidth/geometry.width,.95)) : Math.min(viewport.clientWidth/geometry.width,(viewport.clientHeight-15)/geometry.height,1.15);
  pan.x=(viewport.clientWidth-geometry.width*pan.scale)/2;
  pan.y=focus&&!all?10:narrow.matches&&!all?15:Math.max(5,(viewport.clientHeight-geometry.height*pan.scale)/2);
  applyPan();
}
viewport.addEventListener('pointerdown',event=>{
  if(!model||event.button!==0||event.target.closest('button,a'))return;
  drag={x:event.clientX,y:event.clientY,px:pan.x,py:pan.y,moved:false};suppressed=false;
  viewport.setPointerCapture(event.pointerId);viewport.classList.add('dragging');viewport.focus({preventScroll:true});
});
viewport.addEventListener('pointermove',event=>{
  if(!drag)return;const x=event.clientX-drag.x,y=event.clientY-drag.y;drag.moved ||=Math.abs(x)+Math.abs(y)>5;pan.x=drag.px+x;pan.y=drag.py+y;applyPan();
});
function endDrag(event){if(!drag)return;suppressed=drag.moved;drag=null;viewport.classList.remove('dragging');if(viewport.hasPointerCapture(event.pointerId))viewport.releasePointerCapture(event.pointerId);setTimeout(()=>suppressed=false,0);}
viewport.addEventListener('pointerup',endDrag);viewport.addEventListener('pointercancel',endDrag);
viewport.addEventListener('keydown',event=>{
  if(event.target!==viewport||!model)return;const d={ArrowLeft:[70,0],ArrowRight:[-70,0],ArrowUp:[0,70],ArrowDown:[0,-70]}[event.key];if(d){event.preventDefault();pan.x+=d[0];pan.y+=d[1];applyPan();}
});
viewport.addEventListener('focusin',event=>{
  if(!event.target.classList.contains('node'))return;
  // Use the destination geometry, not an intermediate camera animation frame.
  const p=geometry.positions.get(event.target.dataset.id),v=viewport.getBoundingClientRect();
  const r={left:v.left+pan.x+(p.x-p.w/2)*pan.scale,right:v.left+pan.x+(p.x+p.w/2)*pan.scale,top:v.top+pan.y+(p.y-p.h/2)*pan.scale,bottom:v.top+pan.y+(p.y+p.h/2)*pan.scale};
  if(r.left<v.left+12)pan.x+=v.left+12-r.left;if(r.right>v.right-12)pan.x-=r.right-v.right+12;
  if(r.top<v.top+12)pan.y+=v.top+12-r.top;if(r.bottom>v.bottom-12)pan.y-=r.bottom-v.bottom+12;applyPan();
});
document.querySelectorAll('[data-zoom]').forEach(button=>button.addEventListener('click',()=>{
  const before=pan.scale,next=Math.max(.25,Math.min(1.7,before*(button.dataset.zoom==='in'?1.2:1/1.2)));
  const x=viewport.clientWidth/2,y=viewport.clientHeight/2;pan.x=x-(x-pan.x)*next/before;pan.y=y-(y-pan.y)*next/before;pan.scale=next;applyPan();
}));
$('[data-fit]').addEventListener('click',()=>fit(true));
$('.home-button').addEventListener('click',()=>navigate(null));
document.querySelectorAll('[data-jump]').forEach(button=>button.addEventListener('click',()=>navigate(button.dataset.jump)));
window.addEventListener('popstate',()=>{if(model){const s=currentState();navigate(s.focus,s.camera,false);}});
window.addEventListener('hashchange',()=>{if(model){const s=currentState();if(s.focus!==focus||s.camera!==camera)navigate(s.focus,s.camera,false);}});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&model&&focus){event.preventDefault();navigate(trail.length>1?trail[trail.length-2]:null);}});
new ResizeObserver(()=>{if(model){fit();animateEdges();}}).observe(viewport);
reduced.addEventListener('change',()=>{activeAnimations.forEach(a=>a.cancel());activeAnimations=[];animateEdges();});
try{
  const response=await fetch('data/portfolio-network.json');
  if(!response.ok)throw new Error(`HTTP ${response.status}`);
  model=createModel(await response.json());
  $('.map-message').textContent='';
  document.querySelectorAll('button[disabled]').forEach(button=>button.disabled=false);
  $('.data-version').textContent=`NETWORK v${model.data.meta.version}`;
  const state=currentState();navigate(state.focus,state.camera,false);
}catch(error){
  $('.map-message').textContent='网络数据未能载入。请通过本地 HTTP 预览打开，或使用右侧源数据链接查看内容。';
  $('.focus-summary').textContent='交互示例暂不可用。你可以返回上一轮示例，或查看源数据。';
  console.error('Portfolio network could not load:',error);
}
