'use strict';


/* module-private execution scope */
(() => {
/** Haamu Search Output — renderer-independent search egress contract. */
globalThis.HaamuFamilies ??= Object.create(null);
let sequence=0;
const HaamuSearchOutput=Object.freeze({
 family:'search',role:'search.output',type:'search-output-contract',version:'0.1.0',
 create(query,results=[],state='completed',options={}){
  return Object.freeze({
   type:'search-output',query:String(query??''),
   results:Object.freeze(Array.isArray(results)?Array.from(results):[results]),
   state:String(state),channelId:String(options.channelId??'unbound'),
   sessionId:String(options.sessionId??'haamu'),sequence:++sequence,
   timestamp:new Date().toISOString()
  });
 },
 validate(output){return !!output&&output.type==='search-output'&&Array.isArray(output.results)&&typeof output.channelId==='string';}
});
globalThis.HaamuFamilies['search.output']=Object.freeze({family:'search',role:'search.output',type:'search-output-contract',version:'0.1.0'});
globalThis.HaamuSearchOutput=HaamuSearchOutput;
})();
