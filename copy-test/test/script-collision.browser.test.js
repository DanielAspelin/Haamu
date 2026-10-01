'use strict';
const {chromium}=require('playwright'),fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..'), html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const scripts=[...html.matchAll(/<script\b[^>]*\bsrc=["']([^"'?]+)(?:\?[^"']*)?["'][^>]*>/gi)].map(m=>m[1]);
(async()=>{const browser=await chromium.launch({headless:true});const page=await browser.newPage();const out=[];
for(const src of scripts){
 const code=fs.readFileSync(path.join(root,src),'utf8');
 const r=await page.evaluate(({src,code})=>{try{const s=document.createElement('script');s.dataset.owner=src;s.textContent=code;document.head.appendChild(s);return{src,ok:true};}catch(e){return{src,ok:false,error:String(e)}}},{src,code}).catch(e=>({src,ok:false,error:String(e)}));
 out.push(r); if(!r.ok)console.log('PARSE OWNER '+src+' :: '+r.error);
}
console.log('PARSE MAP '+JSON.stringify(out));await browser.close();
})().catch(e=>{console.error(e.stack||e);process.exit(1);});
