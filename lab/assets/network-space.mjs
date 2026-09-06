// Deterministic 3D spring layout. Coordinates express adjacency, not measured similarity.
export const clusterColors = ['#51b8a3','#9d8de0','#69abd4','#d8b65d','#d68da9','#97a9b9'];
const anchors = [
  {x:-265,y:-120,z:90},{x:240,y:-155,z:-100},{x:285,y:155,z:130},
  {x:-180,y:220,z:-120},{x:-330,y:80,z:-160},{x:0,y:0,z:65}
];
function hash(s){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return h>>>0;}
export function buildSpace(data, camera='projectAnatomy') {
  const ids=new Set(data.nodes.map(n=>n.id));
  const projects=data.meta.canonicalProjectOrder;
  const adjacency=new Map(data.nodes.map(n=>[n.id,[]]));
  data.edges.forEach(e=>{if(ids.has(e.from)&&ids.has(e.to)){adjacency.get(e.from).push(e.to);adjacency.get(e.to).push(e.from);}});
  const distances=projects.map(root=>{
    const d=new Map([[root,0]]),queue=[root];
    for(let i=0;i<queue.length;i++)for(const id of adjacency.get(queue[i])||[])if(!d.has(id)){d.set(id,d.get(queue[i])+1);queue.push(id);}
    return d;
  });
  const nodes=data.nodes.map(n=>{
    const scores=distances.map(d=>d.get(n.id)??99),min=Math.min(...scores);
    let group=projects.indexOf(n.id);
    if(group<0)group=projects.indexOf(n.scope);
    if(group<0)group=['theme','activity','practice','identity','role','thesis','method'].includes(n.type)||scores.filter(s=>s===min).length>2?5:scores.indexOf(min);
    if(camera==='capabilityEvidence'&&!projects.includes(n.id))group={theme:0,activity:1,practice:1,evidence:2,metric:2,decision:3,mechanism:3,system:4,object:4}[n.type]??5;
    if(camera==='augmentedPractice'&&!projects.includes(n.id))group={practice:0,constraint:0,activity:1,method:1,theme:1,system:2,actor:2,object:2,evidence:3,metric:3,note:4}[n.type]??5;
    const a=anchors[group],h=hash(n.id),u=(h%1000)/1000,v=((h>>>10)%1000)/1000;
    const angle=u*Math.PI*2,rad=45+v*105;
    return {id:n.id,group,x:a.x+Math.cos(angle)*rad,y:a.y+Math.sin(angle)*rad*.8,z:a.z+((h>>>20)/4095-.5)*220,home:a,fixed:projects.includes(n.id)};
  });
  const byId=new Map(nodes.map(n=>[n.id,n]));
  const links=data.edges.map(e=>({a:byId.get(e.from),b:byId.get(e.to)}));
  for(let step=0;step<160;step++){
    const forces=nodes.map(()=>({x:0,y:0,z:0}));
    for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){
      const a=nodes[i],b=nodes[j],dx=a.x-b.x,dy=a.y-b.y,dz=a.z-b.z;
      const d2=Math.max(60,dx*dx+dy*dy+dz*dz),f=950/(d2*Math.sqrt(d2));
      for(const [axis,delta] of [['x',dx],['y',dy],['z',dz]]){forces[i][axis]+=delta*f;forces[j][axis]-=delta*f;}
    }
    const index=new Map(nodes.map((n,i)=>[n.id,i]));
    for(const {a,b} of links){
      const dx=b.x-a.x,dy=b.y-a.y,dz=b.z-a.z,d=Math.max(1,Math.hypot(dx,dy,dz));
      const f=(d-(a.group===b.group?66:235))*.004/d;
      for(const [axis,delta] of [['x',dx],['y',dy],['z',dz]]){forces[index.get(a.id)][axis]+=delta*f;forces[index.get(b.id)][axis]-=delta*f;}
    }
    nodes.forEach((n,i)=>{for(const axis of ['x','y','z'])n[axis]+=Math.max(-4,Math.min(4,forces[i][axis]+(n.home[axis]-n[axis])*(n.fixed?.075:.008)));});
  }
  return new Map(nodes.map(({home,fixed,...n})=>[n.id,n]));
}
export function projectPoint(p, view, width, height) {
  const x=p.x-view.center.x,y=p.y-view.center.y,z=p.z-view.center.z;
  const cy=Math.cos(view.yaw),sy=Math.sin(view.yaw),cp=Math.cos(view.pitch),sp=Math.sin(view.pitch);
  const rx=x*cy-z*sy,rz=x*sy+z*cy,ry=y*cp-rz*sp,depth=y*sp+rz*cp;
  const perspective=1000/Math.max(400,1000+depth);
  const scale=Math.min(width/1040,height/780)*view.zoom*perspective;
  return {x:width/2+rx*scale,y:height/2+ry*scale,z:depth,scale,perspective};
}
