// A read-only projection of the supplied graph. Layout never changes factual edges.
export const cameraIds = ['projectAnatomy', 'capabilityEvidence', 'augmentedPractice'];
export function createModel(data) {
  const nodes = new Map(data.nodes.map(node => [node.id, node]));
  if (nodes.size !== data.nodes.length) throw new Error('节点 ID 重复');
  const adjacency = new Map(data.nodes.map(node => [node.id, []]));
  data.edges.forEach((edge, index) => {
    if (!nodes.has(edge.from) || !nodes.has(edge.to)) throw new Error('关系引用了不存在的节点');
    if (!data.vocabulary.edgeTypes[edge.type]) throw new Error('未知关系类型');
    adjacency.get(edge.from).push({ ...edge, key: index });
    if (edge.to !== edge.from) adjacency.get(edge.to).push({ ...edge, key: index });
  });
  const neighbor = (edge, id) => edge.from === id ? edge.to : edge.from;
  function project(focus) {
    const visible = new Set(focus ? [focus] : data.views.home.defaultVisible);
    if (focus) adjacency.get(focus)?.forEach(edge => visible.add(neighbor(edge, focus)));
    // Internal nodes remain accessible if directly related, with their status explicit.
    const edges = data.edges.map((edge, key) => ({ ...edge, key })).filter(edge => visible.has(edge.from) && visible.has(edge.to));
    return { nodes: [...visible].map(id => nodes.get(id)).filter(Boolean), edges };
  }
  return { data, nodes, adjacency, neighbor, project };
}
export function laneFor(node, camera) {
  if (camera === 'augmentedPractice') {
    if (['practice', 'constraint'].includes(node.type)) return 0;
    if (['activity', 'method', 'theme'].includes(node.type)) return 1;
    if (['project', 'system', 'actor', 'object', 'problem', 'decision', 'mechanism', 'journey'].includes(node.type)) return 2;
    return 3;
  }
  if (camera === 'capabilityEvidence') {
    if (['theme','method','role','identity','thesis'].includes(node.type)) return 0;
    if (['activity','practice','constraint'].includes(node.type)) return 1;
    if (['project','experience','education','problem','actor','system','object','decision','mechanism','journey'].includes(node.type)) return 2;
    return 3;
  }
  if (['theme','method','identity','role','thesis','experience','education'].includes(node.type)) return 0;
  if (['activity','practice','constraint'].includes(node.type)) return 1;
  if (['actor','system','object'].includes(node.type)) return 2;
  return 3;
}
export const laneNames = {
  projectAnatomy: ['能力与背景', '工作活动', '系统与协作', '问题、延展与证据'],
  capabilityEvidence: ['能力主题', '共享工作活动', '跨项目应用', '产物与验证'],
  augmentedPractice: ['AI 协作与约束', '人的工作活动', '项目与业务情境', '产出与复用']
};
export function layout(projection, focus, camera, data) {
  const positions = new Map();
  if (!focus) {
    // Only the home composition uses editorial anchors; identities come from the JSON.
    const home = data.views.home;
    positions.set(home.root, {x:590,y:275,w:350,h:105});
    positions.set('role:product-manager', {x:590,y:202,w:190,h:40});
    positions.set('thesis:complex-to-operable', {x:590,y:350,w:350,h:70});
    const themes = projection.nodes.filter(n=>n.type==='theme');
    const anchors = [[265,215],[465,100],[850,125],[305,400],[885,400],[1015,270],[155,350]];
    themes.forEach((node,i) => positions.set(node.id,{x:anchors[i][0],y:anchors[i][1],w:168,h:76}));
    data.meta.canonicalProjectOrder.forEach((id,i)=>positions.set(id,{x:145+i*222,y:535+(i%2)*36,w:204,h:118}));
    return {positions,width:1190,height:655,lanes:[]};
  }
  const profile = data.cameraProfiles[camera];
  const lanes = Array.from({length:4},()=>[]);
  projection.nodes.filter(n=>n.id!==focus).forEach(node=>lanes[laneFor(node,camera)].push(node));
  lanes.forEach(lane=>lane.sort((a,b)=>{
    const rank = n => profile.emphasizeNodeTypes.includes(n.type) ? 0 : 1;
    return rank(a)-rank(b) || a.tier-b.tier || a.id.localeCompare(b.id);
  }));
  positions.set(focus,{x:595,y:90,w:350,h:100});
  const height = Math.max(620, 240+Math.max(...lanes.map(l=>l.length))*87);
  lanes.forEach((lane,col)=>lane.forEach((node,row)=>positions.set(node.id,{x:145+col*299+(row%2?12:-8),y:268+row*87,w:242,h:74})));
  return {positions,width:1190,height,lanes:laneNames[camera].map((name,i)=>({name,x:145+i*299,y:198,count:lanes[i].length}))};
}
