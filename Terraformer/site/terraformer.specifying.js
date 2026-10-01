"use strict";
const SPECIFICATION_FAMILY=Object.freeze({specifying:"system.specifying",specifier:"system.specifier",specification:"system.specification",relationship:"Specifier part-of Specifying; Specifying produces Specification"});
function bindSpecifyingV04646(deps={}){
 const {tfCanonicalSystemIdsV36196,tfUniversalEngineFabricV36349,tfUniversalServiceFabricV36351,tfCompactSystemSeedV36353,tfUniversalSystemLayerFabricV36389,tfUniversalSystemDefaultsFabricV36388,tfUniversalProcessCycleFabricV36395,tfUniversalReferenceFabricV36396}=deps;
 /* === Terraformer v0.36.397: Universal Specifying / Specifier / Specification Fabric === */
const TF_SPECIFYING_SYSTEMS_V36397=Object.freeze([
 Object.freeze({id:"system.specifying",concept:"Specifying",type:"specification-process-system",mode:"structured-system-specification",condition:"specifying-context-admitted",state:"ready"}),
 Object.freeze({id:"system.specifier",concept:"Specifier",type:"specifying-actor-system",mode:"bounded-specification-issuer",condition:"specifying-admitted",state:"ready"})
]);
const TF_SPECIFYING_RELATIONSHIPS_V36397=Object.freeze([
 Object.freeze({from:"system.specifier",relation:"part-of",to:"system.specifying"}),
 Object.freeze({from:"system.specifying",relation:"produces",to:"system.specification"}),
 Object.freeze({from:"system.specification",relation:"specifies",to:"system.system"}),
 Object.freeze({from:"system.specification",relation:"may-use",to:"system.schema"}),
 Object.freeze({from:"system.specification",relation:"may-state",to:"system.requirement"}),
 Object.freeze({from:"system.specification",relation:"distinct-from",to:"system.definition"}),
 Object.freeze({from:"system.specification",relation:"distinct-from",to:"system.description"})
]);
function tfSystemSpecificationV36397(owner){
 owner=String(owner??"");if(!owner.startsWith("system."))throw new Error("[TF:system.specifying:invalid-owner] Canonical System owner required.");
 return Object.freeze({id:owner+"::specification",owner,system:"system.specification",specifiedBy:"system.specifier",through:"system.specifying",
  subject:owner,requirements:Object.freeze(["canonical-identity","universal-derived-fabric","governed-runtime-boundaries"]),
  schemaAware:true,selfSpecification:true,structured:true,executable:false,automaticMutation:false,persistence:false,externalEffect:false,authorityAmplification:false});
}
function tfUniversalSpecificationFabricV36397(sourceText){
 const ids=tfCanonicalSystemIdsV36196(sourceText),entries=ids.map(tfSystemSpecificationV36397);
 return Object.freeze({system:"system.specifying",systemsCovered:ids.length,specifications:entries.length,entries:Object.freeze(entries),
  everySystemSpecification:true,uniqueSpecifications:new Set(entries.map(x=>x.id)).size===ids.length,selfSpecifications:entries.every(x=>x.owner===x.subject&&x.selfSpecification)});
}
function tfSpecifyingSelfTestV36397(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.specification","system.specifying","system.specifier","system.schema","system.requirement","system.definition","system.description","system.system"])if(!ids.has(id))missing.push(id);
 const u=tfUniversalSpecificationFabricV36397(sourceText);
 if(u.specifications!==ids.size||!u.everySystemSpecification||!u.uniqueSpecifications||!u.selfSpecifications)missing.push("coverage");
 for(const x of u.entries)if(x.subject!==x.owner||!x.schemaAware||!x.structured||x.executable||x.automaticMutation||x.persistence||x.externalEffect||x.authorityAmplification)missing.push("boundary:"+x.owner);
 const eo=new Set(tfUniversalEngineFabricV36349(sourceText).engines.map(x=>x.owner)),so=new Set(tfUniversalServiceFabricV36351(sourceText).services.map(x=>x.owner)),seeded=new Set(tfCompactSystemSeedV36353(sourceText).entries.map(x=>x.id));
 for(const id of ["system.specifying","system.specifier"]){if(!eo.has(id))missing.push("engine:"+id);if(!so.has(id))missing.push("service:"+id);if(!seeded.has(id))missing.push("seed:"+id);}
 const layers=tfUniversalSystemLayerFabricV36389(sourceText),defs=tfUniversalSystemDefaultsFabricV36388(sourceText),pc=tfUniversalProcessCycleFabricV36395(sourceText),refs=tfUniversalReferenceFabricV36396(sourceText);
 if(layers.layers!==ids.size||defs.defaults!==ids.size||pc.processes!==ids.size||refs.references!==ids.size)missing.push("universal-base");
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Specification fabric failed: "+[...new Set(missing)].slice(0,64).join(",")+".");
 return Object.freeze({pass:true,newSystems:2,specificationReused:true,specifying:true,specifier:true,systemsCovered:ids.size,specifications:u.specifications,
  everySystemSpecification:true,selfSpecifications:true,uniqueSpecifications:true,schemaAware:true,definitionDistinct:true,descriptionDistinct:true,
  executable:false,automaticMutation:false,authorityAmplification:false,missing:0});
}
globalThis.TF_SPECIFYING_SYSTEMS_V36397=TF_SPECIFYING_SYSTEMS_V36397;globalThis.TF_SPECIFYING_RELATIONSHIPS_V36397=TF_SPECIFYING_RELATIONSHIPS_V36397;
globalThis.tfSystemSpecificationV36397=tfSystemSpecificationV36397;globalThis.tfUniversalSpecificationFabricV36397=tfUniversalSpecificationFabricV36397;
 return Object.freeze({SPECIFICATION_FAMILY,TF_SPECIFYING_SYSTEMS_V36397,TF_SPECIFYING_RELATIONSHIPS_V36397,tfSystemSpecificationV36397,tfUniversalSpecificationFabricV36397,tfSpecifyingSelfTestV36397});
}
module.exports=Object.freeze({bindSpecifyingV04646});
