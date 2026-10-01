'use strict';
globalThis.HaamuFamilies ??= Object.create(null);
const HaamuTextScheduling=Object.freeze({
 family:'text',role:'text.scheduling',type:'text-scheduler',version:'0.1.0',
 schedule(units,options={}){
  const list=Object.freeze(Array.from(units??[])),request={stage:options.stage??'text',units:list,completed:options.completed??[],capacity:options.capacity,direction:options.direction??'forward'};
  const concurrency=globalThis.HaamuWebConcurrency?.negotiate?HaamuWebConcurrency.negotiate(request):Object.freeze({type:'concurrency-negotiation',stage:request.stage,ready:list,blocked:Object.freeze([]),backPressure:false});
  const parallelism=globalThis.HaamuWebParallelism?.negotiate?HaamuWebParallelism.negotiate({...request,units:concurrency.ready}):Object.freeze({type:'parallelism-negotiation',stage:request.stage,capacity:1,lanes:Object.freeze([concurrency.ready])});
  return Object.freeze({type:'text-schedule',stage:request.stage,concurrency,parallelism});
 }
});
globalThis.HaamuFamilies['text.scheduling']=Object.freeze({family:'text',role:'text.scheduling',type:'text-scheduler',version:'0.1.0'});globalThis.HaamuTextScheduling=HaamuTextScheduling;
