'use strict';
globalThis.HaamuFamilies ??= Object.create(null);
const finite=(v,f)=>Number.isFinite(Number(v))?Number(v):f;
const HaamuTextAllocation=Object.freeze({
 family:'text',role:'text.allocation',type:'text-allocator',version:'0.1.0',
 allocate(value,options={}){
  if(!globalThis.HaamuTextProcessing)throw new Error('HaamuTextProcessing unavailable.');
  const record=HaamuTextProcessing.process(value,options),start=Math.max(0,Math.trunc(finite(options.start,0))),capacity=Math.max(record.characters.length,Math.trunc(finite(options.capacity,record.characters.length))),end=start+record.characters.length;
  if(end>start+capacity)throw new RangeError('Text allocation exceeds capacity.');
  return Object.freeze({type:'text-allocation',start,end,length:record.characters.length,capacity,available:capacity-record.characters.length,units:options.allocationUnits??'characters',record});
 }
});
globalThis.HaamuFamilies['text.allocation']=Object.freeze({family:'text',role:'text.allocation',type:'text-allocator',version:'0.1.0'});globalThis.HaamuTextAllocation=HaamuTextAllocation;
