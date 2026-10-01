'use strict';
const { chromium } = require('playwright');
const http=require('http'),fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.ttf':'font/ttf','.json':'application/json'};
const server=http.createServer((req,res)=>{const p=decodeURIComponent(new URL(req.url,'http://x').pathname);let file=path.resolve(root,'.'+p);if(p==='/')file=path.join(root,'index.html');if(!file.startsWith(root)){res.writeHead(403).end();return;}fs.readFile(file,(e,d)=>{if(e){res.writeHead(404).end();return;}res.writeHead(200,{'content-type':mime[path.extname(file)]||'application/octet-stream'});res.end(d);});});
const positions=['top-left','top-right','bottom-left','bottom-right'];
async function qualify(browser,name,viewport,isMobile){
 const page=await browser.newPage({viewport,isMobile,hasTouch:isMobile}); const errors=[]; page.on('pageerror',e=>errors.push(String(e)));
 await page.goto(base,{waitUntil:'load'}); await page.waitForFunction(()=>document.documentElement.dataset.haamu==='ready');
 const initial=await page.locator('.corner.start').count(); if(initial!==4)throw Error(name+' expected 4 buttons got '+initial);
 if(await page.locator('.corner-menu').count()!==8)throw Error(name+' expected 8 plates');
 for(const pos of positions){
   const b=page.locator('.corner.start[data-position="'+pos+'"]'); await b.click(); await page.waitForTimeout(700);
   const open=page.locator('.corner-menu.open'); if(await open.count()!==1)throw Error(name+' '+pos+' open count '+await open.count());
   const menu=open.first(); const plat=await menu.getAttribute('data-platform'); if(plat!==(isMobile?'mobile':'desktop'))throw Error(name+' '+pos+' wrong platform '+plat);
   const prompt=menu.locator('.plate-prompt'); await prompt.fill('Alpha beta gamma delta epsilon zeta eta theta iota kappa lambda mu nu xi omicron pi rho sigma tau');
   await prompt.press('Home'); await prompt.press('ArrowRight'); await prompt.press('ArrowRight'); await page.waitForTimeout(80);
   if(await prompt.inputValue()==='')throw Error(name+' '+pos+' prompt input lost');
   await page.screenshot({path:'artifacts/'+name+'-'+pos+'.png',fullPage:true});
 }
 // Switch stress: every ordered pair, one click must select successor.
 for(const a of positions)for(const b of positions){if(a===b)continue;await page.locator('.corner.start[data-position="'+a+'"]').click();await page.waitForTimeout(700);await page.locator('.corner.start[data-position="'+b+'"]').click();await page.waitForTimeout(isMobile?1300:700);const open=page.locator('.corner-menu.open');if(await open.count()!==1)throw Error(name+' switch '+a+'>'+b+' open='+await open.count());const selected=await open.first().evaluate(el=>({position:el.dataset.position||null,logicalPlate:el.dataset.logicalPlate||null,classes:el.className,ariaHidden:el.getAttribute('aria-hidden')}));const expectedPlate='plate-'+b;if(selected.logicalPlate!==expectedPlate)throw Error(name+' switch '+a+'>'+b+' selected '+JSON.stringify(selected)+' expected '+expectedPlate);}
 if(!isMobile){for(const pos of positions){await page.locator('.corner.start[data-position="'+pos+'"]').click();await page.waitForTimeout(700);const menu=page.locator('.corner-menu.open');const toggle=menu.locator('.plate-state-toggle');if(await toggle.count()){await toggle.click();await page.waitForTimeout(120);if(await menu.getAttribute('data-plate-state')!=='maximized')throw Error(name+' '+pos+' maximize failed');await toggle.click();await page.waitForTimeout(120);if(await menu.getAttribute('data-plate-state')==='maximized')throw Error(name+' '+pos+' restore failed');}}}
 if(errors.length)throw Error(name+' page errors: '+errors.join(' | ')); console.log('PASS '+name+' full interaction matrix'); await page.close();
}
let base;
(async()=>{fs.mkdirSync('artifacts',{recursive:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));base='http://127.0.0.1:'+server.address().port+'/';const browser=await chromium.launch({headless:true});try{await qualify(browser,'desktop',{width:1440,height:900},false);await qualify(browser,'mobile',{width:390,height:844},true);}finally{await browser.close();server.close();}})().catch(e=>{console.error(e.stack||e);process.exit(1);});
