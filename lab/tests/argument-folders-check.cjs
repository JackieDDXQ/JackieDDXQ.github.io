const {chromium}=require(process.env.PLAYWRIGHT_PATH || 'playwright');
const assert=require('node:assert/strict');
const {join}=require('node:path');
const snapshots=process.env.SNAPSHOT_DIR||require('node:os').tmpdir();
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 try{
 const page=await browser.newPage({viewport:{width:1440,height:1100}}), errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 const response=await page.goto('http://localhost:8080/lab/argument-folders.html');assert.equal(response.status(),200);
 await page.screenshot({path:join(snapshots,'argument-overview.png'),fullPage:true});
 await page.locator('[data-node="packaging"] .node-focus').click();
 assert.equal(await page.locator('.is-selected').count(),1);
 assert.ok(await page.locator('.node.is-muted').count()>0);
 assert.equal(await page.locator('[data-node="cost"]').getAttribute('class'),'node question');
 await page.locator('#extend').click();assert.match(page.url(),/depth=2/);
 await page.locator('#clear').click();assert.equal(await page.locator('.node.is-muted').count(),0);
 await page.locator('[data-node="cost"] .node-focus').click();
 await page.screenshot({path:join(snapshots,'argument-focus.png'),fullPage:true});
 await page.locator('#supply .portal').click();assert.match(page.url(),/#delivery\/guide/);
 assert.equal(await page.locator('#delivery').isVisible(),true);
 await page.locator('#return').click();assert.match(page.url(),/#supply\/cost/);
 await page.goBack();assert.equal(await page.locator('#delivery').isVisible(),true);
 await page.locator('[data-node="guide"] .read-link').click();assert.equal(await page.locator('dialog').isVisible(),true);
 await page.keyboard.press('Escape');assert.equal(await page.locator('dialog').isVisible(),false);
 assert.equal(await page.locator('[data-node="guide"] .read-link').evaluate(el=>el===document.activeElement),true);
 await page.goto('http://localhost:8080/lab/argument-folders.html#supply/model');
 assert.equal(await page.locator('[data-node="model"] button').getAttribute('aria-pressed'),'true');
 for(const width of [1024,768,390,320]){
  await page.setViewportSize({width,height:900});
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`overflow at ${width}`);
  const overlap=await page.locator('#supply .graph').evaluate(el=>{const r=el.getBoundingClientRect();return [...el.querySelectorAll('.node,.portal')].some(n=>n.getBoundingClientRect().bottom>r.bottom+1);});assert.equal(overlap,false,`vertical overflow at ${width}`);
  if(width===390)await page.screenshot({path:join(snapshots,'argument-mobile.png'),fullPage:true});
 }
 await page.emulateMedia({reducedMotion:'reduce'});assert.equal(await page.locator('.folder').first().evaluate(el=>getComputedStyle(el).transitionDuration),'0s');
 const nojs=await browser.newPage({javaScriptEnabled:false});await nojs.goto('http://localhost:8080/lab/argument-folders.html');await nojs.locator('[href="#source-model"]').click();assert.equal(await nojs.locator('#source-model').isVisible(),true);
 const paths=['/lab/','/index.html','/projects.html','/about.html','/contact.html','/experience.html','/projects/rights-management.html','/projects/prototypes/rights-management/omni/dist/index.html'];for(const path of paths)assert.equal((await page.request.get('http://localhost:8080'+path)).status(),200,path);
 assert.deepEqual(errors,[]);console.log('PASS: folder toggle, focus, further connections, cross-folder return, history, deep link, dialog/keyboard, responsive bounds, reduced motion, no-JS and HTTP links.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
