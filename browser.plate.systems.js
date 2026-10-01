'use strict';

/**
 * Haamu Browser Plate Systems — isolated output ownership per logical Plate.
 * Projection is deliberately data-bound only; visual rendering remains deferred.
 */
globalThis.HaamuFamilies ??= Object.create(null);
const systems=new Map();

const create=(plateId,definition={})=>{
 const channelId=String(definition.channelId??plateId);
 const outputs=[];
 const accept=(kind,output)=>{
  if(!output)throw new TypeError('Output record required.');
  if(output.channelId&&output.channelId!=='unbound'&&output.channelId!==channelId)
   throw new Error('Cross-channel Plate output rejected.');
  const record=globalThis.HaamuBrowserOutput?.record
   ? HaamuBrowserOutput.record(kind,output,{plateId,channelId})
   : Object.freeze({type:'browser-output',kind,payload:output,metadata:Object.freeze({plateId,channelId})});
  outputs.push(record);
  return record;
 };
 return Object.freeze({
  type:'plate-output-systems',plateId,channelId,
  terminal:Object.freeze({accept:output=>accept('terminal',output)}),
  search:Object.freeze({accept:output=>accept('search',output)}),
  shell:Object.freeze({accept:output=>accept('shell',output)}),
  accept(output){
   if(output?.type==='terminal-output')return this.terminal.accept(output);
   if(output?.type==='search-output')return this.search.accept(output);
   if(output?.type==='shell-output')return this.shell.accept(output);
   throw new TypeError('Terminal, search or shell output required.');
  },
  history:()=>Object.freeze(Array.from(outputs)),
  latest:()=>outputs.at(-1)??null
 });
};

const HaamuBrowserPlateSystems=Object.freeze({
 family:'browser',role:'browser.plate.systems',type:'per-plate-output-systems',version:'0.1.0',
 forPlate(plate,definition={}){
  const plateId=String(typeof plate==='string'?plate:(plate?.id??plate?.dataset?.plate??'')).trim();
  if(!plateId)throw new RangeError('Plate identity required.');
  if(!systems.has(plateId))systems.set(plateId,create(plateId,definition));
  return systems.get(plateId);
 },
 remove(id){return systems.delete(String(id));},
 plates(){return Object.freeze(Array.from(systems.keys()));}
});
globalThis.HaamuFamilies['browser.plate.systems']=Object.freeze({family:'browser',role:'browser.plate.systems',type:'per-plate-output-systems',version:'0.1.0'});
globalThis.HaamuBrowserPlateSystems=HaamuBrowserPlateSystems;
