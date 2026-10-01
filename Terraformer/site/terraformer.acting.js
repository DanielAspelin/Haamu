"use strict";
function bindActingV04576(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.335: Acting / Actor / Action / Acts Fabric === */
const TF_ACTING_SYSTEMS_V36335=Object.freeze([
 Object.freeze({id:"system.acting",concept:"Acting",type:"action-process-system",mode:"bounded-action-coordination",condition:"action-context-admitted",state:"ready"}),
 Object.freeze({id:"system.actor",concept:"Actor",type:"process-actor-system",mode:"acting-actor",condition:"acting-operation-admitted",state:"ready"}),
 Object.freeze({id:"historical-system.acts",concept:"Acts",type:"action-result-collection-system",mode:"organized-admitted-acts",condition:"action-results-identified",state:"ready"})
]);
const TF_ACTING_RELATIONSHIPS_V36335=Object.freeze([
 Object.freeze({from:"system.actor",relation:"part-of",to:"system.acting"}),
 Object.freeze({from:"system.actor",relation:"produces",to:"system.action"}),
 Object.freeze({from:"system.acting",relation:"uses",to:"system.action"}),
 Object.freeze({from:"system.action",relation:"produces",to:"historical-system.acts"}),
 Object.freeze({from:"historical-system.acts",relation:"part-of",to:"system.acting"})
]);
function tfActingFabricV36335(spec={}){
 const actor=String(spec.actorId??"system.acting.actor"),subject=spec.subject==null?null:String(spec.subject);
 return Object.freeze({actingSystem:"system.acting",actor,actionSystem:"system.action",actsSystem:"historical-system.acts",subject,
  hierarchy:Object.freeze(["system.acting","system.actor","system.action","historical-system.acts"]),
  actorCreatesActions:true,actionsOrganizedAsActs:true,actorDistinctFromAction:true,actionDistinctFromActs:true,
  automaticExecution:false,externalAction:false,mutationPerformed:false,persistencePerformed:false,authorityGranted:false});
}
function tfActingSelfTestV36335(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.acting","system.actor","system.action","historical-system.acts"])if(!ids.has(id))missing.push(id);
 const p=tfActingFabricV36335({subject:"qualification"});
 if(p.hierarchy.join(">")!=="system.acting>system.actor>system.action>system.acts"||!p.actorCreatesActions||!p.actionsOrganizedAsActs||!p.actorDistinctFromAction||!p.actionDistinctFromActs||p.automaticExecution||p.externalAction||p.mutationPerformed||p.persistencePerformed||p.authorityGranted)missing.push("acting-boundary");
 if(missing.length)throw new Error("acting qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,newSystems:3,actionReused:true,acting:true,actor:true,acts:true,
  actorCreatesActions:true,actionsOrganizedAsActs:true,automaticExecution:false,externalAction:false,
  persistencePerformed:false,authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_ACTING_SYSTEMS_V36335,TF_ACTING_RELATIONSHIPS_V36335,tfActingFabricV36335,tfActingSelfTestV36335});
}
module.exports=Object.freeze({bindActingV04576});
