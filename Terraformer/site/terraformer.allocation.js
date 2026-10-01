"use strict";
function bindAllocationSystemizationV04648(deps={}){
 const {tfCanonicalSystemIdsV36196,tfUniversalEngineFabricV36349,tfCompactSystemSeedV36353,tfUniversalSystemLayerFabricV36389,tfUniversalSystemDefaultsFabricV36388,tfUniversalProcessCycleFabricV36395,tfUniversalReferenceFabricV36396,tfUniversalSpecificationFabricV36397}=deps;
 /* === Terraformer v0.36.398: Universal Allocation / Release + Generation / Systemization Fabric === */
const TF_ALLOCATION_SYSTEMIZATION_SYSTEMS_V36398=Object.freeze([{"id":"system.allocation","concept":"Allocation","type":"resource-lifecycle-system","mode":"bounded-lifecycle-capability","condition":"lifecycle-context-admitted","state":"ready"},{"id":"system.allocating","concept":"Allocating","type":"allocation-process-system","mode":"bounded-lifecycle-capability","condition":"lifecycle-context-admitted","state":"ready"},{"id":"system.releasing","concept":"Releasing","type":"release-process-system","mode":"bounded-lifecycle-capability","condition":"lifecycle-context-admitted","state":"ready"},{"id":"system.releaser","concept":"Releaser","type":"release-actor-system","mode":"bounded-lifecycle-capability","condition":"lifecycle-context-admitted","state":"ready"},{"id":"system.generating","concept":"Generating","type":"generation-process-system","mode":"bounded-lifecycle-capability","condition":"lifecycle-context-admitted","state":"ready"},{"id":"system.systemizing","concept":"Systemizing","type":"systemization-process-system","mode":"bounded-lifecycle-capability","condition":"lifecycle-context-admitted","state":"ready"},{"id":"system.systemizer","concept":"Systemizer","type":"systemization-actor-system","mode":"bounded-lifecycle-capability","condition":"lifecycle-context-admitted","state":"ready"}]);

const TF_ALLOCATION_SYSTEMIZATION_RELATIONSHIPS_V36398=Object.freeze([
 Object.freeze({from:"system.allocator",relation:"part-of",to:"system.allocating"}),Object.freeze({from:"system.allocating",relation:"produces",to:"system.allocation"}),
 Object.freeze({from:"system.releaser",relation:"part-of",to:"system.releasing"}),Object.freeze({from:"system.releasing",relation:"produces",to:"system.release"}),
 Object.freeze({from:"system.release",relation:"closes",to:"system.allocation"}),Object.freeze({from:"system.generator",relation:"part-of",to:"system.generating"}),
 Object.freeze({from:"system.generating",relation:"uses",to:"system.generation"}),Object.freeze({from:"system.systemizer",relation:"part-of",to:"system.systemizing"}),
 Object.freeze({from:"system.systemizing",relation:"uses",to:"system.systemization"}),Object.freeze({from:"system.systemizing",relation:"produces",to:"system.system"})
]);
function tfSystemAllocationLifecycleV36398(owner){
 owner=String(owner??"");if(!owner.startsWith("system."))throw new Error("[TF:system.allocation:invalid-owner] Canonical System owner required.");
 return Object.freeze({owner,allocation:Object.freeze({id:owner+"::allocation",system:"system.allocation",owner,allocatedBy:owner+"::allocator",state:"available"}),
  allocator:Object.freeze({id:owner+"::allocator",system:"system.allocator",owner}),releaser:Object.freeze({id:owner+"::releaser",system:"system.releaser",owner}),
  paired:true,automaticHostAllocation:false,automaticRelease:false,persistence:false,externalEffect:false,authorityAmplification:false});
}
function tfSystemGenerationSystemizationV36398(owner){
 owner=String(owner??"");if(!owner.startsWith("system."))throw new Error("[TF:system.systemization:invalid-owner] Canonical System owner required.");
 return Object.freeze({owner,generator:Object.freeze({id:owner+"::generator",system:"system.generator",owner,through:"system.generating"}),
  systemizer:Object.freeze({id:owner+"::systemizer",system:"system.systemizer",owner,through:"system.systemizing"}),
  generatable:true,systemizable:true,automaticGeneration:false,automaticSystemization:false,authorityAmplification:false});
}
function tfUniversalAllocationSystemizationFabricV36398(sourceText){
 const ids=tfCanonicalSystemIdsV36196(sourceText),allocation=ids.map(tfSystemAllocationLifecycleV36398),systemization=ids.map(tfSystemGenerationSystemizationV36398);
 return Object.freeze({systemsCovered:ids.length,allocators:allocation.length,releasers:allocation.length,generators:systemization.length,systemizers:systemization.length,
  allocation:Object.freeze(allocation),systemization:Object.freeze(systemization),everySystemAllocator:true,everySystemReleaser:true,everySystemGeneratable:true,everySystemSystemizable:true});
}
function tfAllocateV36398(capability,request=null){if(!capability?.allocator)throw new Error("[TF:system.allocating:invalid-capability] System allocator required.");return Object.freeze({owner:capability.owner,allocation:capability.allocation.id,state:"allocated",request,hostAllocation:false});}
function tfReleaseV36398(capability,allocation){if(!capability?.releaser||allocation?.owner!==capability.owner)throw new Error("[TF:system.releasing:invalid-allocation] Matching System allocation required.");return Object.freeze({owner:capability.owner,release:capability.owner+"::release",allocation:allocation.allocation,state:"released",hostRelease:false});}
function tfAllocationSystemizationSelfTestV36398(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.allocation","system.allocating","system.allocator","system.release","system.releasing","system.releaser","system.generation","system.generating","system.generator","system.systemization","system.systemizing","system.systemizer","system.system"])if(!ids.has(id))missing.push(id);
 const u=tfUniversalAllocationSystemizationFabricV36398(sourceText);
 if(u.allocators!==ids.size||u.releasers!==ids.size||u.generators!==ids.size||u.systemizers!==ids.size)missing.push("coverage");
 if(new Set(u.allocation.map(x=>x.allocator.id)).size!==ids.size||new Set(u.allocation.map(x=>x.releaser.id)).size!==ids.size||new Set(u.systemization.map(x=>x.systemizer.id)).size!==ids.size)missing.push("uniqueness");
 const c=u.allocation[0],a=tfAllocateV36398(c),r=tfReleaseV36398(c,a);if(a.state!=="allocated"||r.state!=="released"||a.hostAllocation||r.hostRelease||c.automaticHostAllocation||c.automaticRelease||c.authorityAmplification)missing.push("lifecycle");
 const eo=new Set(tfUniversalEngineFabricV36349(sourceText).engines.map(x=>x.owner)),seeded=new Set(tfCompactSystemSeedV36353(sourceText).entries.map(x=>x.id));
 for(const x of TF_ALLOCATION_SYSTEMIZATION_SYSTEMS_V36398){if(!eo.has(x.id))missing.push("engine:"+x.id);if(!seeded.has(x.id))missing.push("seed:"+x.id);}
 const layers=tfUniversalSystemLayerFabricV36389(sourceText),defs=tfUniversalSystemDefaultsFabricV36388(sourceText),pc=tfUniversalProcessCycleFabricV36395(sourceText),refs=tfUniversalReferenceFabricV36396(sourceText),specs=tfUniversalSpecificationFabricV36397(sourceText);
 if(layers.layers!==ids.size||defs.defaults!==ids.size||pc.processes!==ids.size||refs.references!==ids.size||specs.specifications!==ids.size)missing.push("universal-base");
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Allocation/Systemization fabric failed: "+[...new Set(missing)].slice(0,64).join(",")+".");
 return Object.freeze({pass:true,newSystems:7,allocatorReused:true,releaseReused:true,generationReused:true,generatorReused:true,systemizationReused:true,systemsCovered:ids.size,
  allocators:u.allocators,releasers:u.releasers,generators:u.generators,systemizers:u.systemizers,everySystemAllocator:true,everySystemReleaser:true,everySystemGeneratable:true,everySystemSystemizable:true,
  allocationReleasePaired:true,automaticHostAllocation:false,automaticGeneration:false,automaticSystemization:false,authorityAmplification:false,missing:0});
}
globalThis.TF_ALLOCATION_SYSTEMIZATION_SYSTEMS_V36398=TF_ALLOCATION_SYSTEMIZATION_SYSTEMS_V36398;globalThis.TF_ALLOCATION_SYSTEMIZATION_RELATIONSHIPS_V36398=TF_ALLOCATION_SYSTEMIZATION_RELATIONSHIPS_V36398;
globalThis.tfSystemAllocationLifecycleV36398=tfSystemAllocationLifecycleV36398;globalThis.tfSystemGenerationSystemizationV36398=tfSystemGenerationSystemizationV36398;
globalThis.tfUniversalAllocationSystemizationFabricV36398=tfUniversalAllocationSystemizationFabricV36398;globalThis.tfAllocateV36398=tfAllocateV36398;globalThis.tfReleaseV36398=tfReleaseV36398;
 return Object.freeze({TF_ALLOCATION_SYSTEMIZATION_SYSTEMS_V36398,TF_ALLOCATION_SYSTEMIZATION_RELATIONSHIPS_V36398,tfSystemAllocationLifecycleV36398,tfSystemGenerationSystemizationV36398,tfUniversalAllocationSystemizationFabricV36398,tfAllocateV36398,tfReleaseV36398,tfAllocationSystemizationSelfTestV36398});
}
const ALLOCATION_SCHEMA='TERRAFORMER-ASSET-ALLOCATION/1';

module.exports=Object.freeze({bindAllocationSystemizationV04648,ALLOCATION_SCHEMA});
