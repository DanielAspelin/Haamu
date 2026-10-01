"use strict";
function bindReferencingV04645(deps={}){
 const {tfCanonicalSystemIdsV36196,tfUniversalEngineFabricV36349,tfUniversalServiceFabricV36351,tfCompactSystemSeedV36353,tfUniversalSystemLayerFabricV36389,tfUniversalSystemDefaultsFabricV36388,tfUniversalProcessCycleFabricV36395}=deps;
 /* === Terraformer v0.36.396: Universal Referencing / Referencer / Reference Fabric === */
const TF_REFERENCING_SYSTEMS_V36396=Object.freeze([
 Object.freeze({id:"system.referencing",concept:"Referencing",type:"reference-process-system",mode:"canonical-reference-issuance",condition:"referencing-context-admitted",state:"ready"}),
 Object.freeze({id:"system.referencer",concept:"Referencer",type:"referencing-actor-system",mode:"bounded-reference-issuer",condition:"referencing-admitted",state:"ready"})
]);
const TF_REFERENCING_RELATIONSHIPS_V36396=Object.freeze([
 Object.freeze({from:"system.referencer",relation:"part-of",to:"system.referencing"}),
 Object.freeze({from:"system.referencing",relation:"produces",to:"system.reference"}),
 Object.freeze({from:"system.reference",relation:"refers-to",to:"system.system"}),
 Object.freeze({from:"system.resolver",relation:"may-resolve",to:"system.reference"})
]);
function tfSystemReferenceV36396(owner){
 owner=String(owner??"");if(!owner.startsWith("system."))throw new Error("[TF:system.referencing:invalid-owner] Canonical System owner required.");
 return Object.freeze({id:owner+"::reference",owner,system:"system.reference",issuedBy:"system.referencer",through:"system.referencing",
  canonicalTarget:owner,canonical:true,alias:false,readOnly:true,identityMutation:false,persistence:false,externalEffect:false,authorityAmplification:false});
}
function tfUniversalReferenceFabricV36396(sourceText){
 const ids=tfCanonicalSystemIdsV36196(sourceText),entries=ids.map(tfSystemReferenceV36396);
 return Object.freeze({system:"system.referencing",systemsCovered:ids.length,references:entries.length,entries:Object.freeze(entries),
  everySystemReference:true,uniqueReferences:new Set(entries.map(x=>x.id)).size===ids.length});
}
function tfReferencingSelfTestV36396(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.reference","system.referencing","system.referencer","system.resolver","system.system"])if(!ids.has(id))missing.push(id);
 const u=tfUniversalReferenceFabricV36396(sourceText);if(u.references!==ids.size||!u.everySystemReference||!u.uniqueReferences)missing.push("coverage");
 for(const x of u.entries)if(x.canonicalTarget!==x.owner||!x.canonical||x.alias||!x.readOnly||x.identityMutation||x.persistence||x.externalEffect||x.authorityAmplification)missing.push("boundary:"+x.owner);
 const eo=new Set(tfUniversalEngineFabricV36349(sourceText).engines.map(x=>x.owner)),so=new Set(tfUniversalServiceFabricV36351(sourceText).services.map(x=>x.owner)),seeded=new Set(tfCompactSystemSeedV36353(sourceText).entries.map(x=>x.id));
 for(const id of ["system.referencing","system.referencer"]){if(!eo.has(id))missing.push("engine:"+id);if(!so.has(id))missing.push("service:"+id);if(!seeded.has(id))missing.push("seed:"+id);}
 const layers=tfUniversalSystemLayerFabricV36389(sourceText),defs=tfUniversalSystemDefaultsFabricV36388(sourceText),pc=tfUniversalProcessCycleFabricV36395(sourceText);
 if(layers.layers!==ids.size||defs.defaults!==ids.size||pc.processes!==ids.size||pc.pids!==ids.size)missing.push("universal-base");
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Referencing fabric failed: "+[...new Set(missing)].slice(0,64).join(",")+".");
 return Object.freeze({pass:true,newSystems:2,referenceReused:true,referencing:true,referencer:true,systemsCovered:ids.size,references:u.references,
  everySystemReference:true,uniqueReferences:true,canonicalTargets:true,aliases:false,readOnly:true,identityMutation:false,authorityAmplification:false,missing:0});
}
globalThis.TF_REFERENCING_SYSTEMS_V36396=TF_REFERENCING_SYSTEMS_V36396;globalThis.TF_REFERENCING_RELATIONSHIPS_V36396=TF_REFERENCING_RELATIONSHIPS_V36396;
globalThis.tfSystemReferenceV36396=tfSystemReferenceV36396;globalThis.tfUniversalReferenceFabricV36396=tfUniversalReferenceFabricV36396;
 return Object.freeze({TF_REFERENCING_SYSTEMS_V36396,TF_REFERENCING_RELATIONSHIPS_V36396,tfSystemReferenceV36396,tfUniversalReferenceFabricV36396,tfReferencingSelfTestV36396});
}
module.exports=Object.freeze({bindReferencingV04645});
