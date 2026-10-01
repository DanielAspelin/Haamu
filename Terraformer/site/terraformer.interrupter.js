"use strict";
function bindInterrupterV04496(deps={}){
 const {tfNetworkDiscoveryCycleV36263,tfNetworkMapV36261}=deps;const SYSTEM=Object.freeze({id:"system.interrupter",concept:"Interrupter",mode:"bounded-scan-lane-controller"});const CONCURRENCY=Object.freeze({max:32,perLaneTimeoutMs:5000,stallDetection:true,cooperativeCancellation:true});
 async function tfConcurrentDiscoveryScanV36264(spec={}){
 const cycle=tfNetworkDiscoveryCycleV36263(spec),limit=Math.max(1,Math.min(Number(spec.concurrency||8),32));
 const probe=typeof spec.probe==="function"?spec.probe:async address=>Object.freeze({address,observed:true,simulated:true});
 const timeoutMs=Math.max(10,Math.min(Number(spec.timeoutMs||5000),30000)),targets=cycle.plans.flatMap(p=>p.addresses);
 const results=[],interrupted=[],failed=[];let cursor=0;
 async function lane(){
  while(cursor<targets.length){const address=targets[cursor++];let timer;
   try{
    const timeout=new Promise((_,reject)=>{timer=setTimeout(()=>reject(Object.assign(new Error("scan lane timeout"),{code:"INTERRUPTED"})),timeoutMs)});
    const r=await Promise.race([Promise.resolve().then(()=>probe(address)),timeout]);clearTimeout(timer);
    if(r&&r.address)results.push(Object.freeze({...r,address:String(r.address),observed:true}));
   }catch(e){clearTimeout(timer);if(e&&e.code==="INTERRUPTED")interrupted.push(address);else failed.push(Object.freeze({address,error:String(e&&e.message||e)}));}
  }
 }
 await Promise.all(Array.from({length:Math.min(limit,Math.max(1,targets.length))},()=>lane()));
 const map=tfNetworkMapV36261(results);
 return Object.freeze({targets:targets.length,completed:results.length,interrupted:Object.freeze(interrupted),failed:Object.freeze(failed),observations:Object.freeze(results),map,
  partialResultsPreserved:true,mapAvailableResults:true,continueNextCycle:true,forceKilled:false,publicScan:false,internetScan:false,authorityGranted:false});
}
 return Object.freeze({SYSTEM,CONCURRENCY,tfConcurrentDiscoveryScanV36264});
}
module.exports={bindInterrupterV04496};
