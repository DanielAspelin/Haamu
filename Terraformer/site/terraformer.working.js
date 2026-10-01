"use strict";
function bindWorkingV04575(deps={}){
 const {tfCanonicalSystemIdsV36196,tfWorkerWorkFabricV36333}=deps;
 /* === Terraformer v0.36.334: Working System / Worker Hierarchy Fabric === */
const TF_WORKING_SYSTEM_V36334=Object.freeze({
 id:"system.working",concept:"Working",type:"work-process-system",
 mode:"bounded-work-coordination",condition:"work-context-admitted",state:"ready"
});
const TF_WORKING_RELATIONSHIPS_V36334=Object.freeze([
 Object.freeze({from:"system.worker",relation:"part-of",to:"system.working"}),
 Object.freeze({from:"system.working",relation:"operates-on",to:"system.work"}),
 Object.freeze({from:"system.worker",relation:"operates-on",to:"system.work"}),
 Object.freeze({from:"system.worker",relation:"owns-scoped",to:"system.generator"}),
 Object.freeze({from:"system.worker",relation:"owns-scoped",to:"system.automator"})
]);
function tfWorkingFabricV36334(spec={}){
 const owner=String(spec.ownerSystem??"system.working");
 if(!owner.startsWith("system."))throw new Error("canonical system id required");
 const worker=String(spec.workerId??(owner+".worker"));
 const subordinate=tfWorkerWorkFabricV36333(owner,worker);
 return Object.freeze({workingSystem:"system.working",ownerSystem:owner,worker,work:subordinate.workScope,
  hierarchy:Object.freeze(["system.working","system.worker","system.work"]),
  generator:subordinate.generator,automator:subordinate.automator,
  workerUnderWorking:true,workDistinctFromWorking:true,workerDistinctFromWorking:true,
  automaticExecution:false,backgroundExecution:false,persistencePerformed:false,authorityGranted:false});
}
function tfWorkingSelfTestV36334(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.working","system.worker","system.work","system.generator","system.automator"])if(!ids.has(id))missing.push(id);
 const p=tfWorkingFabricV36334({ownerSystem:"system.working",workerId:"system.working.worker"});
 if(!p.workerUnderWorking||p.hierarchy.join(">")!=="system.working>system.worker>system.work"||!p.workDistinctFromWorking||!p.workerDistinctFromWorking||p.generator.ownerWorker!==p.worker||p.automator.ownerWorker!==p.worker||p.automaticExecution||p.backgroundExecution||p.persistencePerformed||p.authorityGranted)missing.push("working-hierarchy-boundary");
 if(missing.length)throw new Error("working qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,newSystems:1,working:true,workerReused:true,workReused:true,
  workerUnderWorking:true,workerGeneratorAutomatorPreserved:true,automaticExecution:false,
  backgroundExecution:false,persistencePerformed:false,authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_WORKING_SYSTEM_V36334,TF_WORKING_RELATIONSHIPS_V36334,tfWorkingFabricV36334,tfWorkingSelfTestV36334});
}
module.exports=Object.freeze({bindWorkingV04575});
