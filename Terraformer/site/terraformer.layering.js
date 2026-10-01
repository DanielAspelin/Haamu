"use strict";
function bindUniversalLayeringV04635(deps={}){
 const {tfCanonicalSystemIdsV36196,tfUniversalEngineFabricV36349,tfUniversalServiceFabricV36351,tfCompactSystemSeedV36353,tfSchemaDrivenReconstructionV36387}=deps;
 /* === Terraformer v0.36.389: Universal Per-System Layer Fabric === */
const TF_LAYERING_SYSTEMS_V36389=Object.freeze([
 Object.freeze({id:"system.layering",concept:"Layering",type:"structural-organization-process-system",mode:"per-system-layer-issuance",condition:"layer-context-admitted",state:"ready"}),
 Object.freeze({id:"system.layerer",concept:"Layerer",type:"layering-actor-system",mode:"bounded-layer-issuer",condition:"layering-admitted",state:"ready"})
]);
const TF_LAYERING_RELATIONSHIPS_V36389=Object.freeze([
 Object.freeze({from:"system.layering",relation:"produces",to:"system.layer"}),
 Object.freeze({from:"system.layerer",relation:"part-of",to:"system.layering"}),
 Object.freeze({from:"system.layerer",relation:"issues",to:"system.layer"}),
 Object.freeze({from:"system.layer",relation:"belongs-to",to:"system.system"}),
 Object.freeze({from:"system.reconstruction",relation:"may-use",to:"system.layering"})
]);
const TF_SYSTEM_LAYER_SCHEMA_V36389=Object.freeze({schema:"TERRAFORMER-SYSTEM-LAYER/1",system:"system.layer",issuer:"system.layerer",process:"system.layering",
 perSystem:true,uniquePerOwner:true,logical:true,volatile:true,processIsolation:false,persistence:false,automaticExecution:false,authorityAmplification:false});
function tfSystemLayerV36389(owner){
 owner=String(owner??"");if(!owner.startsWith("system."))throw new Error("[TF:system.layering:invalid-owner] Canonical System owner required.");
 return Object.freeze({id:owner+"::layer",owner,system:"system.layer",issuedBy:"system.layerer",through:"system.layering",...TF_SYSTEM_LAYER_SCHEMA_V36389});
}
function tfUniversalSystemLayerFabricV36389(sourceText){
 const ids=tfCanonicalSystemIdsV36196(sourceText),entries=ids.map(tfSystemLayerV36389);
 return Object.freeze({system:"system.layering",systemsCovered:ids.length,layers:entries.length,entries:Object.freeze(entries),everySystemOwnLayer:true,
  uniqueLayers:new Set(entries.map(x=>x.id)).size===ids.length});
}
function tfLayeringSelfTestV36389(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.layer","system.layering","system.layerer","system.system","system.schema","system.defaults","system.reconstruction"])if(!ids.has(id))missing.push(id);
 const u=tfUniversalSystemLayerFabricV36389(sourceText);if(u.systemsCovered!==ids.size||u.layers!==ids.size||!u.everySystemOwnLayer||!u.uniqueLayers)missing.push("layer-coverage");
 for(const x of u.entries)if(x.issuedBy!=="system.layerer"||x.through!=="system.layering"||!x.logical||x.processIsolation||x.persistence||x.automaticExecution||x.authorityAmplification)missing.push("boundary:"+x.owner);
 const eo=new Set(tfUniversalEngineFabricV36349(sourceText).engines.map(x=>x.owner)),so=new Set(tfUniversalServiceFabricV36351(sourceText).services.map(x=>x.owner)),seeded=new Set(tfCompactSystemSeedV36353(sourceText).entries.map(x=>x.id));
 for(const id of ["system.layering","system.layerer"]){if(!eo.has(id))missing.push("engine:"+id);if(!so.has(id))missing.push("service:"+id);if(!seeded.has(id))missing.push("seed:"+id);}
 const r=tfSchemaDrivenReconstructionV36387(sourceText);if(r.count!==ids.size)missing.push("reconstruction");
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Universal Layer Fabric failed: "+[...new Set(missing)].slice(0,64).join(",")+".");
 return Object.freeze({pass:true,newSystems:2,layerReused:true,systemsCovered:ids.size,layers:u.layers,everySystemOwnLayer:true,uniqueLayers:true,
  issuedByLayerer:true,throughLayering:true,logical:true,processIsolation:false,persistence:false,automaticExecution:false,authorityAmplification:false,missing:0});
}
globalThis.TF_LAYERING_SYSTEMS_V36389=TF_LAYERING_SYSTEMS_V36389;globalThis.TF_LAYERING_RELATIONSHIPS_V36389=TF_LAYERING_RELATIONSHIPS_V36389;
globalThis.TF_SYSTEM_LAYER_SCHEMA_V36389=TF_SYSTEM_LAYER_SCHEMA_V36389;globalThis.tfSystemLayerV36389=tfSystemLayerV36389;
globalThis.tfUniversalSystemLayerFabricV36389=tfUniversalSystemLayerFabricV36389;
 return Object.freeze({TF_LAYERING_SYSTEMS_V36389,TF_LAYERING_RELATIONSHIPS_V36389,TF_SYSTEM_LAYER_SCHEMA_V36389,tfSystemLayerV36389,tfUniversalSystemLayerFabricV36389,tfLayeringSelfTestV36389});
}
module.exports=Object.freeze({bindUniversalLayeringV04635});
