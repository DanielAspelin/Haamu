const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const { chromium } = require('playwright');
(async () => {
 const root = path.resolve(__dirname, '..');
 const server = http.createServer((req,res)=>{
  const file=path.join(root,decodeURIComponent(req.url.split('?')[0]==='/'?'/index.html':req.url.split('?')[0]));
  if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
  fs.readFile(file,(e,data)=>{if(e){res.writeHead(404).end();return;}res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.html')?'text/html':'application/octet-stream');res.end(data);});
 });
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 let browser;
 try {
  browser=await chromium.launch({headless:true,args:['--no-sandbox']});
  for(const viewport of [{width:1280,height:800},{width:390,height:844},{width:844,height:390}]){
   const page=await browser.newPage({viewport, ...(viewport.width<900?{userAgent:'Mozilla/5.0 Android Mobile'}:{})});
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.goto('http://127.0.0.1:'+server.address().port);
   await page.locator('.corner[data-position="top-left"]').click();
   await page.waitForTimeout(650);
   const before=await page.locator('.corner-menu.open').boundingBox();
   const result=await page.evaluate(()=>{
    HaamuVisual.render('top-left','Hello 👨‍👩‍👧‍👦 e\u0301',{unit:'glyph',columns:3,links:{'glyph:0':'javascript:alert(1)'}});
    HaamuVisual.button('top-left','S','100.0%');
    const host=document.querySelector('.corner-menu.open .plate-content');
    const unit=host.querySelector('.visual-cell');
    const effect=HaamuVisual.animate('top-left',unit.dataset.visualId,[{opacity:0},{opacity:1}],{duration:10000});
    return {ready:HaamuRuntime.state,graphemes:HaamuWebText.graphemes('👨‍👩‍👧‍👦e\u0301').length,cells:host.querySelectorAll('.visual-cell').length,unsafe:host.querySelectorAll('a[href^="javascript:"]').length,animated:!!effect,inert:host.closest('section').inert};
   });
   assert.equal(result.ready,'READY');assert.equal(result.graphemes,2);assert.ok(result.cells>0);assert.equal(result.unsafe,0);assert.ok(result.animated);assert.equal(result.inert,false);
   assert.deepEqual(await page.locator('.corner-menu.open').boundingBox(),before);
   await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(100);
   assert.equal(await page.evaluate(()=>document.getAnimations().length),0);
   await page.evaluate(()=>HaamuVisual.render('top-left','<script>unsafe</script>'));
   assert.equal(await page.locator('.plate-content script').count(),0);
   await page.locator('.corner[data-position="top-right"]').click();
   assert.equal(await page.locator('.corner-menu.open').count(),1);
   assert.equal(await page.locator('.corner-menu:not(.open):not([inert])').count(),0);
   assert.deepEqual(errors,[]);
   console.log('PASS',viewport.width+'x'+viewport.height,'load, graphemes, safe content, geometry, animation, reduced motion, plate switching');
   await page.close();
  }
 } finally {await browser?.close();await new Promise(resolve=>server.close(resolve));}
})().catch(e=>{console.error(e);process.exitCode=1;});
