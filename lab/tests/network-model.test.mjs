import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createModel,layout,cameraIds} from '../assets/network-model.mjs';
const data=JSON.parse(await readFile(new URL('../data/portfolio-network.json',import.meta.url),'utf8'));
const model=createModel(data);
test('home uses the source visibility set and discloses no metrics',()=>{
  const home=model.project(null);
  assert.deepEqual(new Set(home.nodes.map(n=>n.id)),new Set(data.views.home.defaultVisible));
  assert.ok(home.nodes.every(n=>n.type!=='metric'));
});
test('every focus preserves all incoming and outgoing neighbors in every camera',()=>{
  for(const node of data.nodes){
    const p=model.project(node.id), ids=new Set(p.nodes.map(n=>n.id));
    for(const edge of model.adjacency.get(node.id)){assert.ok(ids.has(edge.from));assert.ok(ids.has(edge.to));}
    for(const camera of cameraIds){
      const view=layout(p,node.id,camera,data);
      assert.deepEqual(new Set(view.positions.keys()),ids);
      for(const point of view.positions.values()){assert.ok(Number.isFinite(point.x)&&Number.isFinite(point.y));}
    }
  }
});
test('a shared activity connects projects, AI assistance and artifacts bidirectionally',()=>{
  const id='activity:prototype-design',p=model.project(id),ids=new Set(p.nodes.map(n=>n.id));
  for(const project of data.meta.canonicalProjectOrder)assert.ok(ids.has(project));
  assert.ok(ids.has('ai:rapid-prototyping'));
  assert.ok(ids.has('evidence:rights-depot-prototype'));
  assert.ok(p.edges.some(e=>e.from==='ai:rapid-prototyping'&&e.to===id&&e.type==='assists'));
});
test('camera changes rearrange geometry without changing nodes, edges or statuses',()=>{
  const p=model.project('activity:prototype-design'),snapshot=JSON.stringify(p);
  const a=layout(p,'activity:prototype-design','projectAnatomy',data);
  const b=layout(p,'activity:prototype-design','augmentedPractice',data);
  assert.notDeepEqual([...a.positions],[...b.positions]);assert.equal(JSON.stringify(p),snapshot);
  assert.equal(model.nodes.get('metric:rights-10m').status,'needs-evidence');
  assert.notEqual(model.nodes.get('metric:penetration-30-90').scope,'project:rights-management');
});
