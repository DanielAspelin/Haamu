"use strict";
function bindBaseCompositionV04544(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.305: Base / Database / Knowledge Base Composition Fabric === */
const TF_BASE_COMPOSITION_SYSTEMS_V36305=Object.freeze([
 Object.freeze({id:"system.base",concept:"Base",type:"structural-system",mode:"foundational-collection",condition:"subject-domain-and-organization-identified",state:"ready"}),
 Object.freeze({id:"system.database",concept:"Database",type:"base-system",baseType:"data",mode:"structured-data-base",condition:"data-domain-and-base-organization-identified",state:"ready"}),
 Object.freeze({id:"system.knowledge-base",concept:"Knowledge Base",type:"base-system",baseType:"knowledge",mode:"organized-knowledge-base",condition:"knowledge-domain-and-base-organization-identified",state:"ready"})
]);
const TF_BASE_COMPOSITION_RELATIONSHIPS_V36305=Object.freeze([
 Object.freeze({from:"system.data",relation:"uses",to:"system.base"}),
 Object.freeze({from:"system.base",relation:"supports",to:"system.data"}),
 Object.freeze({from:"system.database",relation:"uses",to:"system.data"}),
 Object.freeze({from:"system.database",relation:"uses",to:"system.base"}),
 Object.freeze({from:"system.data",relation:"composes",to:"system.database"}),
 Object.freeze({from:"system.base",relation:"composes",to:"system.database"}),
 Object.freeze({from:"system.knowledge",relation:"uses",to:"system.base"}),
 Object.freeze({from:"system.base",relation:"supports",to:"system.knowledge"}),
 Object.freeze({from:"system.knowledge-base",relation:"uses",to:"system.knowledge"}),
 Object.freeze({from:"system.knowledge-base",relation:"uses",to:"system.base"}),
 Object.freeze({from:"system.knowledge",relation:"composes",to:"system.knowledge-base"}),
 Object.freeze({from:"system.base",relation:"composes",to:"system.knowledge-base"}),
 Object.freeze({from:"system.database",relation:"uses",to:"system.storage"}),
 Object.freeze({from:"system.knowledge-base",relation:"uses",to:"system.storage"}),
 Object.freeze({from:"system.database",relation:"uses",to:"system.persistence"}),
 Object.freeze({from:"system.knowledge-base",relation:"uses",to:"system.persistence"})
]);
function tfBaseCompositionV36305(spec={}){
 const domain=String(spec.domain??"").toLowerCase();
 const target=domain==="data"?"system.database":domain==="knowledge"?"system.knowledge-base":null;
 if(!target)throw new Error("base composition domain must be data or knowledge");
 return Object.freeze({system:"system.base",domainSystem:"system."+domain,baseSystem:"system.base",baseType:domain,
  specialization:domain==="data"?"database":"knowledge-base",composedSystem:target,
  composition:true,storageImplied:false,persistenceImplied:false,reasoningImplied:false,executionPerformed:false,mutationPerformed:false,authorityGranted:false});
}
function tfBaseCompositionSelfTestV36305(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.base","system.database","system.knowledge-base","system.data","system.knowledge","system.storage","system.persistence","system.type","system.mode","system.condition","system.state"])if(!ids.has(id))missing.push(id);
 const d=tfBaseCompositionV36305({domain:"data"}),k=tfBaseCompositionV36305({domain:"knowledge"});
 if(d.composedSystem!=="system.database"||k.composedSystem!=="system.knowledge-base"||d.storageImplied||k.persistenceImplied||k.reasoningImplied||d.authorityGranted)missing.push("composition-boundary");
 if(missing.length)throw new Error("base composition qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,newSystems:3,base:true,database:true,knowledgeBase:true,dataBaseBidirectional:true,knowledgeBaseBidirectional:true,
  storageSeparate:true,persistenceSeparate:true,reasoningNotImplied:true,executionPerformed:false,mutationPerformed:false,authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_BASE_COMPOSITION_SYSTEMS_V36305,TF_BASE_COMPOSITION_RELATIONSHIPS_V36305,tfBaseCompositionV36305,tfBaseCompositionSelfTestV36305});
}
module.exports=Object.freeze({bindBaseCompositionV04544});
