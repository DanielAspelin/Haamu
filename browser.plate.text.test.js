'use strict';

/**
 * Haamu Plate Text Qualification — non-destructive runtime checks.
 * Tests every logical Plate and both projections without changing accepted
 * outer geometry. Re-runs on actual viewport resize/orientation changes.
 */
globalThis.HaamuFamilies ??= Object.create(null);

const CORNERS=Object.freeze(['top-left','top-right','bottom-left','bottom-right']);
const results=[];

const finitePx=value=>Number.parseFloat(value)||0;
const sample='Haamu text\nUnicode: Häämu 世界 👻\nLong: '+('x'.repeat(256));

const inspectTarget=(target,corner,platform)=>{
 const menu=target.closest('.corner-menu');
 const prompt=menu?.querySelector('.plate-prompt-row');
 const content=menu?.querySelector('.plate-content-row');
 const style=getComputedStyle(target);
 const pad=[style.paddingTop,style.paddingRight,style.paddingBottom,style.paddingLeft].map(finitePx);
 const gap=finitePx(style.gap);
 const top=corner.startsWith('top-');
 const promptTrack=prompt ? getComputedStyle(prompt).gridRowStart : '';
 const contentTrack=content ? getComputedStyle(content).gridRowStart : '';
 const checks=Object.freeze({
  exists:!!menu&&!!prompt&&!!content,
  narrowPadding:pad.every(value=>value>=3&&value<=7),
  narrowSpacing:gap>=1&&gap<=3,
  centered:style.marginLeft==='0px'&&style.marginRight==='0px',
  promptSeparated:top
   ? (promptTrack==='2'&&contentTrack==='1')
   : (promptTrack==='1'&&contentTrack==='2'),
  contained:target.scrollWidth>=target.clientWidth&&target.scrollHeight>=target.clientHeight
 });
 return Object.freeze({
  corner,platform,width:target.clientWidth,height:target.clientHeight,
  padding:Object.freeze(pad),gap,checks,
  passed:Object.values(checks).every(Boolean)
 });
};

const run=()=>{
 const parser=globalThis.HaamuBrowserPlateText?.test?.();
 const plates=[];
 for(const corner of CORNERS){
  const plateId='plate-'+corner;
  const webPlate=globalThis.HaamuWebPlate?.create?.({id:plateId+':qualification',corner,platform:'common'});
  for(const platform of ['mobile','desktop']){
   const target=document.querySelector('.corner-menu[data-corner="'+corner+'"][data-platform="'+platform+'"] .plate-content-region');
   if(!target||!webPlate){plates.push(Object.freeze({corner,platform,passed:false,reason:'projection unavailable'}));continue;}
   const previous=target.textContent;
   let projection=null,error=null;
   try{
    projection=HaamuBrowserPlateText.project({type:'terminal-output',payload:sample},webPlate,target);
   }catch(caught){error=String(caught?.message??caught);}
   const structural=inspectTarget(target,corner,platform);
   const textSafe=target.textContent===sample;
   const pipeline=!!projection?.rendered?.matrix&&!!projection?.rendered?.grid&&!!projection?.rendered?.mesh;
   target.textContent=previous;
   plates.push(Object.freeze({...structural,textSafe,pipeline,error,passed:structural.passed&&textSafe&&pipeline&&!error}));
  }
 }
 const report=Object.freeze({
  type:'plate-text-qualification',
  timestamp:new Date().toISOString(),
  viewport:Object.freeze({width:innerWidth,height:innerHeight}),
  parser,
  plates:Object.freeze(plates),
  passed:!!parser?.passed&&plates.every(item=>item.passed)
 });
 results.push(report);
 document.documentElement.dataset.haamuPlateTextTest=report.passed?'pass':'fail';
 globalThis.dispatchEvent(new CustomEvent('haamu:plate-text-test',{detail:report}));
 return report;
};

let scheduled=0;
const schedule=()=>{
 cancelAnimationFrame(scheduled);
 scheduled=requestAnimationFrame(()=>requestAnimationFrame(run));
};

const HaamuPlateTextQualification=Object.freeze({
 family:'browser',role:'browser.plate.text.test',type:'plate-text-runtime-qualification',version:'0.1.0',
 run,
 latest:()=>results.at(-1)??null,
 history:()=>Object.freeze(Array.from(results))
});
globalThis.HaamuFamilies['browser.plate.text.test']=Object.freeze({family:'browser',role:'browser.plate.text.test',type:'plate-text-runtime-qualification',version:'0.1.0'});
globalThis.HaamuPlateTextQualification=HaamuPlateTextQualification;

if(document.readyState==='loading')globalThis.addEventListener('load',schedule,{once:true});
else schedule();
globalThis.addEventListener('resize',schedule,{passive:true});
globalThis.addEventListener('orientationchange',schedule,{passive:true});
