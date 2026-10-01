"use strict";
const SYSTEM=Object.freeze({id:"system.containerization",concept:"Containerization",authorityGranted:false});
function bindContainerizationV04514(){return Object.freeze({SYSTEM});}


function bindContainerizationFabricV04514(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.281: Containerization & System Container Fabric === */
const TF_CONTAINERIZATION_FABRIC_V36281=Object.freeze([
 Object.freeze({id:"system.containerization",concept:"Containerization",type:"containment-process",mode:"bounded",condition:"boundary-validated",state:"ready",entity:"system.container",workerRole:"worker.container"}),
 Object.freeze({id:"system.system-containerization",concept:"System Containerization",type:"system-containment-process",mode:"authorization-required",condition:"system-boundary-validated-and-admitted",state:"ready",entity:"system.system-container",uses:"system.containerization"}),
 Object.freeze({id:"system.system-container",concept:"System Container",type:"system-container-entity",mode:"bounded",condition:"contained-system-validated",state:"ready",container:"system.container"})
]);
const TF_CONTAINER_WORKER_ROLE_V36281=Object.freeze({id:"worker.container",concept:"Container Worker",type:"worker-role",mode:"bounded",condition:"assigned",state:"ready",
 systemId:"system.containerization",responsibilities:Object.freeze(["construct-boundary-plan","bind-contained-identity","observe-boundary","verify-containment","report"]),
 grantsAuthority:false,executesContainedSystem:false,virtualizesHost:false,persistsByDefault:false});
function tfSystemContainerPlanV36281(spec={}){
 const target=String(spec.systemId||""),valid=/^system\.[a-z0-9_.-]+$/.test(target),authorized=spec.authorized===true;
 return Object.freeze({system:"system.system-containerization",containerSystem:"system.system-container",container:"system.container",worker:"worker.container",
  target,admitted:valid&&authorized,boundary:Object.freeze({execution:false,virtualization:false,persistence:false,hostAuthority:false,networkAuthority:false}),
  createsContainer:false,executes:false,authorityGranted:false});
}
function tfContainerizationSelfTestV36281(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=["system.container","system.containerization","system.system-containerization","system.system-container"].filter(x=>!ids.has(x));
 for(const x of TF_CONTAINERIZATION_FABRIC_V36281)for(const k of ["type","mode","condition","state"])if(!x[k])missing.push(x.id+":"+k);
 const denied=tfSystemContainerPlanV36281({systemId:"system.call"}),ok=tfSystemContainerPlanV36281({systemId:"system.call",authorized:true});
 if(denied.admitted||!ok.admitted||ok.createsContainer||ok.executes||ok.authorityGranted||TF_CONTAINER_WORKER_ROLE_V36281.grantsAuthority)missing.push("containment-boundary");
 if(missing.length)throw new Error("containerization qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,existingContainerPreserved:true,containerization:true,containerWorker:true,systemContainerization:true,systemContainer:true,
  typeCoverage:true,modeCoverage:true,conditionCoverage:true,stateCoverage:true,virtualizationNotImplied:true,executionNotImplied:true,persistenceNotImplied:true,
  authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_CONTAINERIZATION_FABRIC_V36281,TF_CONTAINER_WORKER_ROLE_V36281,tfSystemContainerPlanV36281,tfContainerizationSelfTestV36281});
}
module.exports=Object.freeze({bindContainerizationV04514,bindContainerizationFabricV04514});
