'use strict';
const ID='terraformer.mobile',VERSION='0.44.8';
const FAMILIES=Object.freeze(['android','ios']);
function describe(x={}){return Object.freeze({id:ID,version:VERSION,form:'mobile',platform:String(x.platform||'').toLowerCase(),authority:false});}
function admit(x={}){const d=describe(x);return Object.freeze({pass:FAMILIES.includes(d.platform),descriptor:d,authority:false});}
function authorize(){return Object.freeze({pass:false,reason:'MOBILE_FORM_DOES_NOT_CREATE_PLATFORM_OR_DEVICE_AUTHORITY'});}
module.exports=Object.freeze({ID,VERSION,FAMILIES,describe,admit,authorize});

/* Terraformer v0.48.0: dependency-closed cluster migrated from terraformer.temporary.js. */
function tfGenerateMobilePortraitFrameV4014(){
 const bars=TF_MOBILE_PORTRAIT_FRAME_V4014.bars;
 const bar=(name,d)=>`<div class="tf-mbar tf-mbar-${name}" data-system="system.bar" data-variant="${d.variant}" data-nest="${d.nest}" aria-hidden="true"></div>`;
 const prompt=(scope)=>`<form class="tf-mscope-prompt tf-mscope-${scope}" data-system="system.prompt" data-scope="${scope}" onsubmit="return false"><label><span>${scope[0].toUpperCase()+scope.slice(1)}</span><input inputmode="text" autocomplete="off" aria-label="${scope} prompt" placeholder="${scope[0].toUpperCase()+scope.slice(1)} prompt"></label></form>`;
 return [
  '<div id="tfMobilePortraitFrame" data-system="system.mobile-portrait-frame">',
  bar("upper",bars.upper),bar("upper-nested",bars.upperNested),prompt("local"),
  '<section class="tf-mworkspace tf-mworkspace-local" data-scope="local"><div id="tfMobileLocalViewport"></div></section>',
  '<div class="tf-msplitter" data-system="system.spacing" role="separator" aria-orientation="horizontal"></div>',
  '<section class="tf-mworkspace tf-mworkspace-global" data-scope="global"><div id="tfMobileGlobalViewport"></div></section>',
  prompt("global"),bar("lower-nested",bars.lowerNested),bar("lower",bars.lower),
  '</div>'
 ].join("");
}

function tfGenerateMobilePortraitCSSV4014(){
 return [
 '#tfMobilePortraitFrame{position:fixed;inset:0;display:grid;grid-template-rows:4px 4px minmax(42px,auto) minmax(0,var(--tf-local,1fr)) 10px minmax(0,var(--tf-global,1fr)) minmax(42px,auto) 4px 4px;background:#151a20;color:#eef1f4;overflow:hidden}',
 '.tf-mbar{min-height:4px;max-height:4px;background:currentColor;opacity:.22;pointer-events:none}',
 '.tf-mscope-prompt{margin:0;padding:4px 8px;background:#11171d;min-width:0}',
 '.tf-mscope-prompt label{height:34px;display:grid;grid-template-columns:auto 1fr;align-items:center;gap:8px}',
 '.tf-mscope-prompt span{font-size:11px;text-transform:uppercase;letter-spacing:.08em}',
 '.tf-mscope-prompt input{min-width:0;width:100%;height:32px;box-sizing:border-box;font:inherit}',
 '.tf-mworkspace{min-width:0;min-height:0;overflow:hidden}',
 '.tf-msplitter{min-height:10px;cursor:row-resize;touch-action:none;background:#0d1217}',
 '@media(orientation:landscape){#tfMobilePortraitFrame{display:none}}'
 ].join("");
}

function tfMobilePortraitFrameSelfTestV4014(){
 const html=tfGenerateMobilePortraitFrameV4014(),css=tfGenerateMobilePortraitCSSV4014(),failures=[];
 const ordered=["tf-mbar-upper","tf-mbar-upper-nested","tf-mscope-local","tf-mworkspace-local","tf-msplitter","tf-mworkspace-global","tf-mscope-global","tf-mbar-lower-nested","tf-mbar-lower"];
 let p=-1;for(const token of ordered){const n=html.indexOf(token);if(n<=p)failures.push("order:"+token);p=n}
 if((html.match(/data-system="system\.bar"/g)||[]).length!==4)failures.push("four-bars");
 if((html.match(/data-system="system\.prompt"/g)||[]).length!==2)failures.push("two-prompts");
 if(!css.includes("4px 4px minmax(42px,auto)"))failures.push("narrow-upper-bars");
 if(!css.includes("minmax(42px,auto) 4px 4px"))failures.push("narrow-lower-bars");
 if(failures.length)throw new Error("[TF:system.assurance:qualification-failed] Portrait frame failed: "+failures.join(","));
 return Object.freeze({pass:true,version:"0.40.14",fourNarrowBars:true,localPrompt:true,globalPrompt:true,
  localAboveGlobal:true,desktopChrome:false,androidRuntimeRetest:"DEFERRED_FOR_MOBILE_HARDENING",failures:Object.freeze([])});
}

/* Terraformer v0.48.14: qualified immutable depth-0 declaration migration. */
const TF_MOBILE_SYSTEM_V408=Object.freeze({id:"system.mobile",name:"Mobile System",worker:"system.mobile-presenter",platformContext:"smartphone",presentation:"mobile-first",desktopEmulation:false,version:"0.40.8",transversion:"tv0.40.8"});
