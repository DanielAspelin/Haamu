'use strict';

const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const mime = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.ttf':'font/ttf'};
const server = http.createServer((req,res)=>{
  const pathname = decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname);
  const file = path.resolve(root, '.' + pathname);
  if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
  fs.readFile(file,(err,data)=>{
    if(err){res.writeHead(404).end();return;}
    res.writeHead(200,{'content-type':mime[path.extname(file)]||'application/octet-stream'});
    res.end(data);
  });
});

(async()=>{
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const port=server.address().port;
  const browser=await chromium.launch({headless:true});
  try {
    const page=await browser.newPage({viewport:{width:1280,height:800}});
    const errors=[];
    page.on('pageerror',e=>errors.push(String(e)));
    await page.goto('http://127.0.0.1:'+port+'/test/html-modularization.html',{waitUntil:'load'});
    const result=await page.locator('#result').textContent();
    const stream=await page.locator('#result').getAttribute('data-stream-integrity');
    console.log(result);
    console.log('STREAM '+stream);
    if(errors.length) throw new Error('Page errors: '+errors.join(' | '));
    if(!/^PASS 8\/8 exact structural projections/m.test(result))
      throw new Error('Structural integrity mismatch');
    if(stream!=='pass') throw new Error('Mutation integrity stream failed: '+stream);
  } finally {
    await browser.close();
    server.close();
  }
})().catch(error=>{ console.error(error.stack||error); process.exit(1); });
