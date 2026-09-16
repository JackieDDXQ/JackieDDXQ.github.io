// Reference layer: app.js
const collections={project:{title:'一张权益背后的系统',en:'PROJECT COLLECTION / 01',description:'从供给到领取，探索这项产品里的结构、决策、实践与思考。打开一份材料，继续查看与它相关的内容。',aside:'运营商权益平台<br>产品经理 · 产品实践<span class="project-fact">平台已接入 28 个二级单位<small>支撑权益业务开展</small></span>'},decisions:{title:'选择是怎样作出的',en:'IDEAS COLLECTION / 02',description:'将具体问题放在一起阅读：哪些差异值得保留，哪些关系需要稳定，哪些判断暂时交给人。',aside:'来自权益项目的判断片段<br>以及围绕它们展开的思考'},human:{title:'哪些判断，仍然交给人',en:'OPEN QUESTION / 03',description:'从一次真实的供给选择出发，讨论系统的执行能力与人的经营判断。这里保留问题，也保留尚未验证的想法。',aside:'人工与自动化<br>实践记录 × 开放思考'}};
const visuals={journey:`<div class="surface route"><span class="index">EXPERIENCE / 01</span><div class="ticket"><small>你的会员权益</small><strong>视频月会员</strong><div class="status" id="ticket-status">● 等待领取</div></div><div class="micro-path"><span>获得权益</span>→<span>确认账号</span>→<span>查看结果</span></div></div>`,supply:`<div class="surface quote"><span class="index">FIELD NOTE / 02</span><blockquote>同一张月卡，<br>有不止一种<br>供给选择。</blockquote><small>价格 / 返点 / 账期 / 补货时间</small></div>`,map:`<div class="surface diagram"><span class="index">SYSTEM / 03</span><div class="row"><span class="box">官方供给</span><span class="box">第三方供给</span></div><span class="arrow">↘　 ↙</span><span class="box dark">标准商品规格</span><span class="arrow">↓</span><div class="row"><span class="box">权益配置</span><span class="box">套餐与渠道</span></div></div>`,manual:`<div class="surface note"><span class="index">DECISION / 04</span><p class="hand">系统提供选择的基础。<br><span class="under">经营判断，目前由人完成。</span></p><small>关于人工选择供给的一则记录 ↗</small></div>`,rules:`<div class="surface matrix"><span class="index">WORKING MATERIAL / 05</span><p class="eyebrow">让规则变成下一步行动</p><table><tr><th>业务状态</th><th>用户看见</th></tr><tr><td>等待领取</td><td>确认领取账号</td></tr><tr><td>处理中</td><td>等待结果</td></tr><tr><td>已到账</td><td>查看权益</td></tr></table></div>`,thought:`<div class="surface reflection"><span class="index">OPEN THOUGHT / 06</span><span class="circle">?</span><p>有些变化需要被吸收。<br>有些差异，<br>需要被保留。</p></div>`};
const items=[
{id:'journey',title:'跟随一张权益到达用户',type:'交互演示',caption:'从用户能够理解的状态，走进后台的产品逻辑。',sets:['project'],source:'为本次呈现制作的状态示意，非线上系统。',body:'<p>用户关心自己获得了什么、是否需要操作，以及权益是否已经到账。这里用三个状态说明同一份权益如何被用户理解。</p><div class="demo-controls"><button data-state="0" aria-pressed="true">等待领取</button><button data-state="1" aria-pressed="false">处理中</button><button data-state="2" aria-pressed="false">已到账</button></div><div class="demo-output" aria-live="polite" id="demo-output">用户需要确认领取账号。真实业务还需校验资格与领取条件。</div><p>上面的按钮用于查看不同状态，不会提交订单或发放权益。</p>',related:['map','rules']},
{id:'supply',title:'优酷月会员：供给选择的实际条件',type:'实践片段',caption:'官方、第三方和一段时间内的经营判断。',sets:['project','decisions','human'],source:'来源：Jackie 在本次共创中确认的业务实践。',body:'<p>同一种优酷视频月会员，同时接入官方和第三方供应商产品。第三方有时价格更低，部分支持后付款；官方补货可能需要时间，但达到一定销量后可能获得返点。</p><h3>选择要考虑一段时间</h3><p>当前报价之外，还需要考虑销量政策、补货情况和付款条件。官方补货来不及时，可以由第三方接续供给。</p><h3>目前怎样执行</h3><p>这些判断由人工完成，再手动调整供给选择。具体配置步骤，以及切换对上层对象的影响，还需要补充实际记录。</p>',related:['manual','map']},
{id:'map',title:'从供给到业务表达',type:'关系图',caption:'同一种内部规格，连接不同来源与上层权益。',sets:['project'],source:'依据现有权益案例整理；图为简化关系示意，不是完整调用时序。',body:'<p>供应商产品保留外部来源信息，标准商品规格提供内部引用对象。权益库存与配置进一步组织资源、组合关系和领取方式，套餐与渠道承接具体办理场景。</p><h3>边界的作用</h3><p>通过明确对象关系，供给变化可以在相应位置处理。但是否能够互相替代，仍需核对会员类型、适用账号、有效期和履约条件。</p><p>云仓、万象、灵霄分别承接供给、权益服务和渠道办理相关工作。</p>',related:['supply','thought']},
{id:'manual',title:'为什么现在由人工选择供给？',type:'判断记录',caption:'已经确认的工作方式，与尚待深入的原因。',sets:['project','decisions','human'],source:'人工选择为已确认事实；本文列出的判断边界为共创分析。',body:'<p>当前供给选择由人工完成。系统提供供给关联与配置基础，人结合商务条件决定如何使用这些供给。</p><h3>这里仍需要追问</h3><p>返点条件是否稳定？补货信息是否及时？付款安排是否能被结构化？这些问题有助于判断哪些步骤值得自动化，但目前没有足够材料说明它们就是当时保留人工的原因。</p><p>一个值得继续记录的方向：人作出选择时使用哪些信息，哪些信息已经存在于系统，哪些仍来自沟通。</p>',related:['supply','thought']},
{id:'rules',title:'把业务状态翻译成用户行动',type:'材料摘录',caption:'字段背后，是用户此刻应该知道与能做的事。',sets:['project'],source:'依据现有案例制作的说明表，并非原始需求文档截图。',body:'<p>办理、发放、领取、到账分别代表不同事实。前台需要表达用户当前所处的位置，而不是直接呈现后台对象名。</p><h3>一个可检查的对应关系</h3><p>等待领取：说明所需信息与领取动作。处理中：说明正在等待结果。已到账：提供权益结果与使用信息。</p><p>异常状态、重试条件与恢复方式需要按真实业务补充，不能用演示中的三种状态覆盖全部场景。</p>',related:['journey','map']},
{id:'thought',title:'标准化应该停在哪里？',type:'开放札记',caption:'从一次供给选择，延伸到产品抽象的边界。',sets:['project','decisions','human'],source:'本次共创的思考提案，尚未作为 Jackie 的个人定论。',body:'<p>价格和付款条件可以不同，但用户获得的会员内容需要满足承诺。标准化需要确定哪些差异能由内部处理，哪些差异必须明确保留。</p><h3>一个尚未完成的问题</h3><p>当引入一种新供给时，如何判断它是既有规格的新来源，还是一种需要单独表达的权益？</p><p>这篇札记可以继续连接实际接入记录与产品定义。它保留的是一个讨论方向，而非已经验证的方法论。</p>',related:['map','manual']}
];
const categories={structure:{name:'结构',number:'01',description:'系统如何组成与运转',mark:'↔'},decision:{name:'决策',number:'02',description:'选择、约束与取舍',mark:'↗'},practice:{name:'实践',number:'03',description:'具体做法与可检查的产出',mark:'▤'},reflection:{name:'思考',number:'04',description:'观察、反思与开放问题',mark:'?'}};
const previews={
map:{category:'structure',lines:[['供给来源','官方 / 第三方'],['内部对象','标准商品规格'],['业务表达','权益 / 套餐 / 渠道']]},
rules:{category:'structure',lines:[['等待领取','确认领取账号'],['处理中','等待履约结果'],['已到账','查看权益信息']]},
manual:{category:'decision',lead:'经营判断由人完成，系统提供配置与执行基础。',foot:'已确认：人工选择供给。保留人工的具体原因仍待补充。'},
journey:{category:'practice',lead:'视频月会员领取',lines:[['01','获得权益'],['02','确认账号'],['03','查看结果']],foot:'状态演示 · 为本次呈现制作'},
supply:{category:'practice',lead:'优酷多供给选择',lines:[['01','比较商务条件'],['02','人工选择供给'],['03','手动调整配置']],foot:'实际做法 · 由 Jackie 确认'},
thought:{category:'reflection',lead:'哪些差异可以被吸收，哪些差异必须保留？',foot:'开放问题 · 共创中的思考提案'}
};
const tagDimensions={business:'业务环节',topic:'讨论主题',method:'方法视角',actors:'相关角色',status:'材料状态',format:'呈现形式'};
const contentTags={
journey:{business:['用户领取'],topic:['状态与行动'],method:['体验设计'],actors:['用户'],status:['演示示意'],format:['交互演示']},
supply:{business:['供给管理'],topic:['商务取舍'],method:['经营条件分析'],actors:['商务','供应商'],status:['口述实践'],format:['实践记录']},
map:{business:['全链路'],topic:['系统边界'],method:['对象建模'],actors:['供应商','运营商','渠道'],status:['关系示意'],format:['关系图']},
manual:{business:['供给管理'],topic:['人工与自动化'],method:['决策边界'],actors:['商务','运营'],status:['原因待补充'],format:['判断记录']},
rules:{business:['用户领取'],topic:['状态与行动'],method:['状态建模'],actors:['用户'],status:['整理示意'],format:['对照表']},
thought:{business:['供给管理'],topic:['标准化边界'],method:['抽象与复用'],actors:[],status:['思考提案'],format:['开放札记']}
};
items.push(...[{"id":"packaging","title":"同一份资源，怎样成为不同权益","type":"设计说明","caption":"从原子权益到组合与 N 选 M，分开资源和对外表达。","sets":["project"],"source":"来源：现有权益案例；本卡片为重新编排的说明，非原始交付文件。","body":"<p>现有方案在商品规格之上组织权益库存与权益配置。库存聚合底层资源，配置承载对外名称、组合关系、发放方式和领取规则，再关联到运营商套餐。</p><h3>为什么分开</h3><p>同一资源可以用于独立权益，也可以进入组合或 N 选 M。分离后，资源调用与业务表达有各自的维护位置，减少直接绑定供应商产品的需要。</p><h3>这层抽象的代价</h3><p>配置步骤与对象数量增加，业务人员需要理解库存和配置的区别。如何降低这部分操作成本，仍应结合真实操作记录评估。</p>","related":["map","choices","guide"]},{"id":"policy","title":"办理条件怎样共同生效","type":"规则示意","caption":"时间、额度与用户限制，分别对应不同的判断。","sets":["project"],"source":"来源：现有权益案例与灵霄限办策略原型；执行细节待核对。","body":"<p>灵霄原型提供限量、限办次数、限时等策略类型，并支持运营商、策划与渠道层级。现有案例也描述了多级限制共同约束办理范围。</p><h3>共同生效不等于同一种算法</h3><p>时间窗口、用户资格与额度消耗需要各自明确判断口径。案例以“限制取交集”概括许可范围，但原型表单不足以证明并发占额、失败释放等执行行为。</p><h3>还需要核对的边界</h3><p>案例中的“套餐级”和原型中的“策划级”需要核对对应关系。这份材料保留已存在的规则维度，不将待确认细节写成既定事实。</p>","related":["roles","rules","packaging"]},{"id":"roles","title":"同一条链路上的不同关注点","type":"角色关系","caption":"供给、合作、推广与使用，需要用共同的业务对象衔接。","sets":["project"],"source":"来源：现有权益案例；本卡片为重新编排的说明，非原始交付文件。","body":"<p>供应商提供产品与履约能力，运营商组织套餐合作，渠道提交办理与推广，用户最终领取和使用权益。</p><h3>共同理解同一次业务</h3><p>对外产品、内部规格、权益配置、套餐和订单承担不同职责。把它们的关联说清楚，才能讨论一次办理对应什么资源、用户应得到什么结果。</p><h3>个人贡献需要另行说明</h3><p>这里展示的是项目参与方及其业务关注点，不代表 Jackie 独立承担所有工作。具体职责、协作分工与推进实例仍需补充。</p>","related":["map","policy","guide"]},{"id":"choices","title":"三种领取方式，三种用户行动","type":"场景对照","caption":"自动下发、主动领取与 N 选 M，不应共用一句提示。","sets":["project"],"source":"来源：现有权益案例；本卡片为重新编排的说明，非原始交付文件。","body":"<h3>自动下发</h3><p>用户无需再次领取，重点是查看处理和到账结果。</p><h3>主动领取</h3><p>向用户说明需要确认的信息与领取动作，同时表达领取状态与有效期。</p><h3>N 选 M</h3><p>在候选权益中完成选择，再进入相应领取流程。具体可选数量由业务配置决定；本卡片不虚构真实套餐数量。</p><p>以上来自现有案例的领取方式说明。组合中的逐项结果、选择后能否更换等细节，应继续依据实际规则补齐。</p>","related":["journey","rules","packaging"]},{"id":"guide","title":"让业务人员能够完成新品接入","type":"交付线索","caption":"上架步骤、编码规范和操作指南，把对象模型带进日常工作。","sets":["project"],"source":"来源：现有权益案例；本卡片为重新编排的说明，非原始交付文件。","body":"<p>现有案例将新品上架步骤、编码规范与业务操作指南列入交付内容。这些材料帮助业务人员理解应该创建什么对象、怎样建立关联以及如何完成接入。</p><h3>为什么值得单独呈现</h3><p>多一层抽象，也可能意味着多一步操作。规范与操作说明能够帮助团队使用模型，其价值需要通过具体任务和实际反馈检验。</p><h3>下一份适合补充的材料</h3><p>一份脱敏的新品接入记录：输入是什么，经过哪些配置，如何检查结果。当前页面只是交付线索，不是已展示的原始操作手册，也不证明效率提升。</p>","related":["roles","packaging","complexity"]},{"id":"complexity","title":"分层之后，复杂度去了哪里？","type":"开放札记","caption":"系统边界更清楚时，操作人员是否承担了更多理解成本？","sets":["project"],"source":"来源：基于项目材料的共创思考提案。","body":"<p>标准规格、权益库存和权益配置让不同变化拥有处理位置。但业务人员也可能需要理解更多名词、页面与依赖关系。</p><h3>一个可观察的问题</h3><p>新增一种权益或更换供给时，需要打开多少页面、重复录入什么信息、向哪些人求助？</p><p>这些记录能帮助判断复杂度是否被系统妥善处理，还是转移到了人的记忆和沟通里。当前没有实际测量，不预设方案已经有效或无效。</p><p>这是由现有分层方案延伸出的共创问题，尚未作为 Jackie 的个人结论。</p>","related":["guide","manual","thought"]}]);
Object.assign(previews,{"packaging":{"category":"decision","lead":"资源可以复用，权益的包装和领取规则分别定义。","foot":"依据现有案例整理"},"policy":{"category":"structure","lines":[["时间限制","限定可办理窗口"],["数量限制","控制适用范围的额度"],["用户限制","次数与黑名单条件"]]},"roles":{"category":"structure","lines":[["供应商","供给与履约"],["运营商 / 渠道","套餐合作与办理"],["用户","领取与到账结果"]]},"choices":{"category":"practice","lead":"按领取方式组织用户触点","lines":[["01","自动下发"],["02","主动领取"],["03","选择权益"]],"foot":"根据案例中的领取方式整理"},"guide":{"category":"practice","lead":"从产品定义到团队使用","lines":[["01","新品上架步骤"],["02","关键编码规范"],["03","业务操作指南"]],"foot":"案例已提及，原始交付材料待补充"},"complexity":{"category":"reflection","lead":"一次普通调整，还需要找到最懂系统的那个人吗？","foot":"共创思考 · 尚未验证"}});
Object.assign(contentTags,{"packaging":{"business":["权益配置"],"topic":["资源与包装"],"method":["分层设计"],"actors":["运营"],"status":["方案整理"],"format":["设计说明"]},"policy":{"business":["渠道办理"],"topic":["规则边界"],"method":["约束建模"],"actors":["运营商","渠道","运营"],"status":["规则示意"],"format":["规则示意"]},"roles":{"business":["全链路"],"topic":["协作边界"],"method":["角色分析"],"actors":["供应商","运营商","渠道","用户"],"status":["关系示意"],"format":["角色关系"]},"choices":{"business":["用户领取"],"topic":["选择与反馈"],"method":["场景设计"],"actors":["用户"],"status":["场景示意"],"format":["场景对照"]},"guide":{"business":["运营交付"],"topic":["知识传递"],"method":["流程标准化"],"actors":["运营","研发"],"status":["原件待补充"],"format":["交付线索"]},"complexity":{"business":["运营交付"],"topic":["复杂度与可用性"],"method":["任务成本分析"],"actors":["运营"],"status":["思考提案"],"format":["开放札记"]}});
for(const [id,links] of Object.entries({map:['packaging','roles'],rules:['policy','choices'],journey:['choices'],supply:['packaging'],manual:['complexity'],thought:['complexity']})){const item=items.find(i=>i.id===id);item.related=[...new Set([...item.related,...links])];}
function cardTags(i){const tags=contentTags[i.id];return ['business','topic','status'].map(d=>tags[d].map(t=>'<span class="facet-tag" title="'+tagDimensions[d]+'：'+t+'"><small>'+tagDimensions[d]+'</small>'+t+'</span>').join('')).join('');}
function detailTags(i){return Object.entries(tagDimensions).map(([d,label])=>contentTags[i.id][d].length?'<div class="tag-dimension"><small>'+label+'</small><div>'+contentTags[i.id][d].map(t=>'<span class="topic-chip">'+t+'</span>').join('')+'</div></div>':'').join('');}
function preview(i){const p=previews[i.id],c=categories[p.category];let inner='';if(p.category==='structure')inner=`<div class="preview-table">${p.lines.map(([a,b])=>`<div><span>${a}</span><strong>${b}</strong></div>`).join('')}</div>`;if(p.category==='practice')inner=`<strong class="practice-title">${p.lead}</strong><div class="practice-steps">${p.lines.map(([a,b])=>`<div><small>${a}</small><span>${b}</span></div>`).join('')}</div><small class="preview-foot">${p.foot}</small>`;if(p.category==='decision'||p.category==='reflection')inner=`<p class="preview-statement">${p.lead}</p><small class="preview-foot">${p.foot}</small>`;return `<div class="surface uniform ${p.category}"><div class="preview-label"><span class="category-tag">${c.name}</span>${cardTags(i)}</div>${inner}</div>`;}
for(const item of items){visuals[item.id]=preview(item)+(item.id==='journey'?'<p class="reader-status" id="ticket-status" aria-live="polite">● 等待领取</p>':'');}
items.find(i=>i.id==='choices').body='<div class="comparison-heading"><span>领取方式</span><span>用户行动与界面重点</span></div><section class="claim-row"><h3>自动下发</h3><p>用户无需再次领取，重点是查看处理和到账结果。</p></section><section class="claim-row"><h3>主动领取</h3><p>向用户说明需要确认的信息与领取动作，同时表达领取状态与有效期。</p></section><section class="claim-row"><h3>N 选 M</h3><p>在候选权益中完成选择，再进入相应领取流程。具体可选数量由业务配置决定。</p></section><p class="reader-note">依据现有案例的领取方式整理。组合中的逐项结果、选择后能否更换等细节，仍需依据实际业务规则补充。</p>';

// Real prototype links supplement the curated reference material.
items.find(item=>item.id==="map").body += "<p class=\"reader-evidence\"><a href=\"../projects/prototypes/rights-management/index.html\" target=\"_blank\" rel=\"noopener\">查看三个系统的原型目录 ↗</a></p>";
items.find(item=>item.id==="supply").body += "<p class=\"reader-evidence\"><a href=\"./prototypes/rights-management/depot/dist/index.html\" target=\"_blank\" rel=\"noopener\">查看云仓供给原型 ↗</a></p>";
items.find(item=>item.id==="packaging").body += "<p class=\"reader-evidence\"><a href=\"./prototypes/rights-management/omni/dist/index.html\" target=\"_blank\" rel=\"noopener\">查看万象权益原型 ↗</a></p>";
items.find(item=>item.id==="policy").body += "<p class=\"reader-evidence\"><a href=\"./prototypes/rights-management/cel/frontend/dist/index.html\" target=\"_blank\" rel=\"noopener\">查看灵霄策略原型 ↗</a></p>";
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
function openItem(id){const i=items.find(i=>i.id===id);if(!i)return;if(!reader.open)opener=document.activeElement; $('reader-title').textContent=i.title;$('reader-type').textContent=i.type+' / '+String(items.indexOf(i)+1).padStart(2,'0');$('reader-visual').innerHTML=visuals[id].replace('id="ticket-status"','id="active-ticket"');$('reader-body').innerHTML=i.body;$('provenance').textContent=i.source;$('connections').innerHTML=detailTags(i);$('related').innerHTML=i.related.map(r=>`<button data-item="${r}">${items.find(t=>t.id===r).title} →</button>`).join('');if(!reader.open)reader.showModal();reader.scrollTop=0;}
document.addEventListener('click',e=>{const item=e.target.closest('[data-item]');if(item){if(!reader.open)opener=item;const next=current+'/'+item.dataset.item;if(location.hash.slice(1)===next)openItem(item.dataset.item);else location.hash=next;}const state=e.target.closest('[data-state]');if(state){const n=Number(state.dataset.state);document.querySelectorAll('[data-state]').forEach(b=>b.setAttribute('aria-pressed',String(b===state)));$('active-ticket').textContent=['● 等待领取','◌ 正在处理','✓ 权益已到账'][n];$('demo-output').textContent=['用户需要确认领取账号。真实业务还需校验资格与领取条件。','领取已提交，正在等待履约结果。处理中不等同于失败。','显示已确认的到账结果，并提供后续使用说明。'][n];}});
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
delivery:{name:'一张权益如何到达用户',intro:'从用户体验出发，逐步看见供给、包装与办理规则。',steps:[['journey','先从用户最终看见的领取体验开始。'],['supply','同一种用户权益，背后可能由不同来源履约。'],['packaging','供给确定后，资源还需要被组织成具体权益。'],['policy','进入渠道后，办理还要满足相应规则。'],['choices','规则与包装最终决定用户需要采取什么行动。']]},
change:{name:'如何处理业务差异',intro:'沿着供给与对象边界，理解哪些变化可以由系统吸收。',steps:[['supply','从官方与第三方的真实商务差异开始。'],['map','通过稳定的内部对象，连接不同供给来源。'],['manual','当前由人工结合经营条件选择供给。'],['thought','继续追问：什么差异可以吸收，什么必须保留？']]},
team:{name:'如何把方案带入团队工作',intro:'从参与方到交付材料，观察系统如何进入日常协作。',steps:[['roles','先看清参与方各自关心什么。'],['packaging','共同使用系统，需要理解对象及其边界。'],['guide','上架步骤与编码规范是交付线索，原始材料仍待补充。'],['complexity','最后检验：分层是否增加了人的操作与理解成本？']]}
};
let activeRoute=null,routeStep=0;
const overview=document.createElement('section');
overview.className='project-overview';
overview.setAttribute('aria-label','项目总览');
world.insertBefore(overview,grid);
const overviewModes={
 delivery:{label:'用户旅程',title:'从一张权益，看见整个业务',description:'用户领取的是一份会员权益。沿着这次体验，追溯供给如何选择、资源如何包装，再看规则与履约怎样落实到用户行动。',flow:['用户看见什么','权益从哪里来','怎样到达用户'],cta:'跟随一张权益，开始阅读'},
 change:{label:'业务差异',title:'变化的业务，如何被系统承接？',description:'同一份权益可能来自不同供应商，价格、返点、账期与补货条件也在变化。从一次实际选择出发，理解稳定的业务对象，以及系统与人工判断的边界。',flow:['供给的变化','稳定的业务表达','系统与人的边界'],cta:'从供给差异，理解设计判断'},
 team:{label:'团队工作',title:'产品方案，怎样进入日常工作？',description:'从参与方对业务对象的共同理解，到配置、办理与交付材料，再回到用户行动和操作成本，观察产品设计如何进入实际协作。',flow:['建立共同理解','让方案可以执行','回到真实使用'],cta:'从参与方出发，阅读协作与交付'}
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
 delivery:{label:'跟随一张权益',note:'从用户所见，回到供给，再走向交付。',groups:[
  ['用户看见什么','先理解领取体验与用户行动。',['journey','choices','rules']],
  ['权益从哪里来','追溯供给来源、包装与经营选择。',['supply','map','packaging','manual','thought']],
  ['怎样到达用户','把规则、参与方与日常操作接起来。',['policy','roles','guide','complexity']]]},
 change:{label:'理解业务差异',note:'从变化的条件，到稳定的对象，再到设计的边界。',groups:[
  ['供给的变化','价格、补货与账期，影响实际选择。',['supply','manual']],
  ['稳定的业务表达','用对象、规则与状态承接变化。',['map','packaging','policy','rules']],
  ['系统与人的边界','回到使用者，检验抽象的成本。',['thought','complexity','roles','guide','journey','choices']]]},
 team:{label:'走进团队工作',note:'从共同理解，到操作执行，再回到反思。',groups:[
  ['建立共同理解','参与方需要对齐对象和边界。',['roles','map','packaging']],
  ['让方案可以执行','将业务判断带入配置、流程和交付。',['guide','policy','manual','supply']],
  ['回到真实使用','从用户行动和操作成本继续追问。',['journey','choices','rules','complexity','thought']]]}
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
 // Remove temporary anchor space before calculating the natural layout.
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
const legacyFragments=new Set(['overview','tensions','architecture','supply','service','growth','experience','delivery']);
function revealLegacyFragment(){const key=location.hash.slice(1);if(!legacyFragments.has(key))return;const target=document.getElementById(key);if(!target)return;target.closest('details').open=true;target.scrollIntoView({block:'start'});}
window.addEventListener('hashchange',revealLegacyFragment);revealLegacyFragment();
