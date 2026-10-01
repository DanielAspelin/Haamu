'use strict';

/** Haamu Search Input — renderer-independent search ingress contract. */
globalThis.HaamuFamilies ??= Object.create(null);
let sequence=0;
const HaamuSearchInput=Object.freeze({
 family:'search',role:'search.input',type:'search-input-contract',version:'0.1.0',
 create(query,options={}){
  return Object.freeze({
   type:'search-input',query:String(query??'').trim(),
   channelId:String(options.channelId??'unbound'),
   sessionId:String(options.sessionId??'haamu'),
   sequence:++sequence,timestamp:new Date().toISOString(),
   source:String(options.source??'unbound')
  });
 },
 validate(input){return !!input&&input.type==='search-input'&&typeof input.query==='string'&&typeof input.channelId==='string';}
});
globalThis.HaamuFamilies['search.input']=Object.freeze({family:'search',role:'search.input',type:'search-input-contract',version:'0.1.0'});
globalThis.HaamuSearchInput=HaamuSearchInput;
