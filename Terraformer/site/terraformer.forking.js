"use strict";
function bindForkWrapV04585(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.345: Forking / Wrapping Actor Fabric === */
const TF_FORK_WRAP_SYSTEMS_V36345=Object.freeze([
 Object.freeze({id:"system.forking",concept:"Forking",type:"derivation-process-system",mode:"lineage-preserving-derivation",condition:"fork-operation-admitted",state:"ready"}),
 Object.freeze({id:"system.forker",concept:"Forker",type:"process-actor-system",mode:"forking-actor",condition:"fork-operation-admitted",state:"ready"}),
 Object.freeze({id:"system.wrapping",concept:"Wrapping",type:"composition-process-system",mode:"identity-preserving-enclosure",condition:"wrap-operation-admitted",state:"ready"}),
 Object.freeze({id:"system.wrapper",concept:"Wrapper",type:"process-actor-system",mode:"wrapping-actor",condition:"wrap-operation-admitted",state:"ready"})
]);
const TF_FORK_WRAP_RELATIONSHIPS_V36345=Object.freeze([
 Object.freeze({from:"system.forker",relation:"part-of",to:"system.forking"}),
 Object.freeze({from:"system.forking",relation:"uses",to:"system.lineage"}),
 Object.freeze({from:"system.wrapper",relation:"part-of",to:"system.wrapping"}),
 Object.freeze({from:"system.wrapping",relation:"may-use",to:"system.adapter"}),
 Object.freeze({from:"system.wrapping",relation:"may-use",to:"system.container"})
]);
function tfForkPlanV36345(spec={}){
 const source=String(spec.source??"");if(!source)throw new Error("[TF:system.forking:missing-input] Forking requires a source identity.");
 return Object.freeze({system:"system.forking",actor:"system.forker",source,derived:spec.derived==null?null:String(spec.derived),
  lineagePreserved:true,originReplaced:false,originMutated:false,automaticPersistence:false,authorityTransferred:false,authorityGranted:false});
}
function tfWrapPlanV36345(spec={}){
 const subject=String(spec.subject??"");if(!subject)throw new Error("[TF:system.wrapping:missing-input] Wrapping requires a subject identity.");
 return Object.freeze({system:"system.wrapping",actor:"system.wrapper",subject,wrapper:spec.wrapper==null?null:String(spec.wrapper),
  subjectIdentityPreserved:true,underlyingAuthorityChanged:false,subjectMutated:false,automaticExecution:false,
  automaticPersistence:false,authorityGranted:false});
}
function tfForkWrapSelfTestV36345(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.forking","system.forker","system.wrapping","system.wrapper","system.lineage","system.adapter","system.container"])if(!ids.has(id))missing.push(id);
 const f=tfForkPlanV36345({source:"origin",derived:"fork"}),w=tfWrapPlanV36345({subject:"subject",wrapper:"wrapper"});
 if(!f.lineagePreserved||f.originReplaced||f.originMutated||f.automaticPersistence||f.authorityTransferred||f.authorityGranted)missing.push("fork-boundary");
 if(!w.subjectIdentityPreserved||w.underlyingAuthorityChanged||w.subjectMutated||w.automaticExecution||w.automaticPersistence||w.authorityGranted)missing.push("wrap-boundary");
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Forking / wrapping qualification failed: "+[...new Set(missing)].join(",")+".");
 return Object.freeze({pass:true,newSystems:4,forking:true,forker:true,wrapping:true,wrapper:true,lineageReused:true,adapterReused:true,
  containerReused:true,originReplacement:false,subjectIdentityPreserved:true,authorityAmplification:false,missing:0});
}
globalThis.TF_FORK_WRAP_SYSTEMS_V36345=TF_FORK_WRAP_SYSTEMS_V36345;
globalThis.TF_FORK_WRAP_RELATIONSHIPS_V36345=TF_FORK_WRAP_RELATIONSHIPS_V36345;
globalThis.tfForkPlanV36345=tfForkPlanV36345;
globalThis.tfWrapPlanV36345=tfWrapPlanV36345;
 return Object.freeze({TF_FORK_WRAP_SYSTEMS_V36345,TF_FORK_WRAP_RELATIONSHIPS_V36345,tfForkPlanV36345,tfWrapPlanV36345,tfForkWrapSelfTestV36345});
}
module.exports=Object.freeze({bindForkWrapV04585});
