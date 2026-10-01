'use strict';

/**
 * Haamu Browser Plate Text — safe text projection into an established Plate
 * content region. Geometry is owned by the Plate/CSS; this module only runs
 * the canonical Text -> Matrix -> Grid -> Mesh pipeline and projects textContent.
 */
globalThis.HaamuFamilies ??= Object.create(null);

const payloadText=output=>{
 const payload=output?.payload?.payload ?? output?.payload ?? '';
 if(Array.isArray(payload))return payload.map(item=>typeof item==='string'?item:JSON.stringify(item)).join('\n');
 if(payload&&typeof payload==='object')return JSON.stringify(payload,null,2);
 return String(payload??'');
};

const HaamuBrowserPlateText=Object.freeze({
 family:'browser',role:'browser.plate.text',type:'plate-text-projector',version:'0.2.1',

 project(output,plate,target,options={}){
  if(!plate||plate.type!=='web-plate')throw new TypeError('Web Plate required.');
  if(!(target instanceof Element))throw new TypeError('Plate content target required.');
  const value=payloadText(output);
  const width=Math.max(1,Math.trunc(target.clientWidth||1));
  const height=Math.max(1,Math.trunc(target.clientHeight||1));
  const rendered=globalThis.HaamuWebText?.renderToPlate
   ? HaamuWebText.renderToPlate(value,plate,{
      unit:'symbol',columns:Math.max(1,Math.trunc(options.columns??80)),
      grid:{width,height,gapX:0,gapY:0},
      mesh:{animationScope:'symbol'}
     })
   : null;

  /* The DOM remains a compatibility painter. Placement authority is the
     generated symbol mesh; each mesh node corresponds to a WebText symbol. */
  target.textContent=value;
  target.dataset.placement='symbol-mesh';
  target.dataset.snap='plate';
  target.dataset.areaPlate=plate.id;
  target.dataset.textState='projected';
  target.dataset.matrixRows=String(rendered?.matrix?.rows??0);
  target.dataset.matrixColumns=String(rendered?.matrix?.columns??0);
  target.dataset.meshNodes=String(rendered?.mesh?.nodes?.length??0);
  return Object.freeze({type:'plate-text-projection',plateId:plate.id,value,rendered});
 },

 test(){
  if(!globalThis.HaamuTextParsing)throw new Error('HaamuTextParsing unavailable.');
  const cases=Object.freeze([
   Object.freeze({name:'plain',input:'Haamu text',expected:'Haamu text'}),
   Object.freeze({name:'multiline',input:'first\nsecond',expected:'first\nsecond'}),
   Object.freeze({name:'whitespace',input:'  a\tb  ',expected:'  a\tb  '}),
   Object.freeze({name:'unicode',input:'Häämu 世界 👻',expected:'Häämu 世界 👻'}),
   Object.freeze({name:'empty',input:'',expected:''}),
   Object.freeze({name:'long',input:'x'.repeat(2048),expected:'x'.repeat(2048)})
  ]);
  const results=cases.map(test=>{
   const parsed=HaamuTextParsing.parse(test.input);
   return Object.freeze({name:test.name,pass:parsed.source===test.expected,length:Array.from(parsed.source).length});
  });
  return Object.freeze({
   type:'plate-text-test',
   passed:results.every(result=>result.pass),
   count:results.length,
   results:Object.freeze(results)
  });
 }
});
globalThis.HaamuFamilies['browser.plate.text']=Object.freeze({family:'browser',role:'browser.plate.text',type:'plate-text-projector',version:'0.2.1'});
globalThis.HaamuBrowserPlateText=HaamuBrowserPlateText;
