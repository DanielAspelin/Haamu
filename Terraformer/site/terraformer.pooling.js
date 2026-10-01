"use strict";
function bindPoolingV04570(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.329: Universal Per-System Pool / Farmer Fabric === */
const TF_POOL_SYSTEM_V36329=Object.freeze({
 id:"system.pool",concept:"Pool",type:"resource-collection-system",
 mode:"system-scoped-resource-pool",condition:"owning-system-identified",state:"ready"
});
const TF_POOL_FARMER_RELATIONSHIPS_V36329=Object.freeze([
 Object.freeze({from:"system.pool",relation:"part-of",to:"system.system"}),
 Object.freeze({from:"system.farmer",relation:"operates-on",to:"system.pool"}),
 Object.freeze({from:"system.farmer",relation:"part-of",to:"system.system"})
]);
function tfSystemPoolFarmerV36329(systemId){
 const id=String(systemId??"");if(!id.startsWith("system."))throw new Error("canonical system id required");
 const slug=id.slice(7);
 return Object.freeze({
  system:id,
  pool:Object.freeze({id:id+".pool",ownerSystem:id,role:"Pool",scope:"system-private-by-default",shared:false,active:false}),
  farmer:Object.freeze({id:id+".farmer",ownerSystem:id,role:"Farmer",pool:id+".pool",scope:"system-private-by-default",active:false}),
  workerCoordination:true,generatorCoordination:true,automatorCoordination:true,agentCoordination:true,
  backgroundFarming:false,resourceSharing:false,executionPerformed:false,persistencePerformed:false,authorityGranted:false
 });
}
function tfUniversalPoolFarmerSelfTestV36329(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.pool","system.farmer","system.worker","system.generator","system.automator","system.agent"])if(!ids.has(id))missing.push(id);
 const all=[...ids],trees=all.map(tfSystemPoolFarmerV36329);
 if(trees.length!==all.length||trees.some(x=>!x.pool||!x.farmer||x.pool.ownerSystem!==x.system||x.farmer.ownerSystem!==x.system||x.farmer.pool!==x.pool.id||x.pool.shared||x.pool.active||x.farmer.active||x.backgroundFarming||x.resourceSharing||x.executionPerformed||x.authorityGranted))missing.push("universal-pool-farmer-boundary");
 if(missing.length)throw new Error("pool farmer qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,newSystems:1,farmerReused:true,systemsCovered:all.length,pools:trees.length,farmers:trees.length,
  everySystemOwnPool:true,everySystemOwnFarmer:true,privateByDefault:true,backgroundFarming:false,resourceSharing:false,
  executionPerformed:false,persistencePerformed:false,authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_POOL_SYSTEM_V36329,TF_POOL_FARMER_RELATIONSHIPS_V36329,tfSystemPoolFarmerV36329,tfUniversalPoolFarmerSelfTestV36329});
}
module.exports=Object.freeze({bindPoolingV04570});
