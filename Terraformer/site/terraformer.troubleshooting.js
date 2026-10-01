"use strict";
function bindTroubleshootingV04578(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.337: Troubleshooting / Error-First / Universal Assurance Roles === */
const TF_TROUBLESHOOTING_SYSTEMS_V36337=Object.freeze([
 Object.freeze({id:"system.troubleshooting",concept:"Troubleshooting",type:"diagnostic-process-system",mode:"error-first-diagnosis",condition:"troubleshooting-context-admitted",state:"ready"}),
 Object.freeze({id:"system.troubleshooter",concept:"Troubleshooter",type:"process-actor-system",mode:"troubleshooting-actor",condition:"troubleshooting-operation-admitted",state:"ready"})
]);
const TF_ASSURANCE_ROLE_IDS_V36337=Object.freeze([
 "system.examiner","system.inspector","system.validator","system.qualifier","system.verifier","system.tester"
]);
const TF_TROUBLESHOOTING_RELATIONSHIPS_V36337=Object.freeze([
 Object.freeze({from:"system.troubleshooter",relation:"part-of",to:"system.troubleshooting"}),
 Object.freeze({from:"system.troubleshooter",relation:"observes",to:"system.error"}),
 Object.freeze({from:"system.troubleshooting",relation:"uses",to:"system.error"}),
 Object.freeze({from:"system.examiner",relation:"operates-on",to:"system.examination"}),
 Object.freeze({from:"system.inspector",relation:"operates-on",to:"system.inspection"}),
 Object.freeze({from:"system.validator",relation:"operates-on",to:"system.validation"}),
 Object.freeze({from:"system.qualifier",relation:"operates-on",to:"system.qualification"}),
 Object.freeze({from:"system.verifier",relation:"operates-on",to:"system.verification"}),
 Object.freeze({from:"system.tester",relation:"operates-on",to:"system.testing"})
]);
function tfSystemAssuranceRolesV36337(systemId){
 const sid=String(systemId??"");if(!sid.startsWith("system."))throw new Error("canonical system id required");
 const roles=Object.freeze(TF_ASSURANCE_ROLE_IDS_V36337.map(role=>Object.freeze({
  role,id:sid+"."+role.slice(7),ownerSystem:sid,scope:"system-private-assurance",active:false,authorityGranted:false
 })));
 return Object.freeze({system:sid,roles,examiner:true,inspector:true,validator:true,qualifier:true,verifier:true,tester:true,
  automaticExecution:false,persistencePerformed:false,authorityGranted:false});
}
function tfTroubleshooterPassV36337(spec={}){
 const errors=Array.isArray(spec.errors)?spec.errors.slice():[];
 const other=Array.isArray(spec.otherFindings)?spec.otherFindings.slice():[];
 const sequence=Object.freeze([
  Object.freeze({stage:1,kind:"error",items:Object.freeze(errors)}),
  Object.freeze({stage:2,kind:"other-finding",items:Object.freeze(other)})
 ]);
 return Object.freeze({system:"system.troubleshooting",actor:"system.troubleshooter",errorSystem:"system.error",
  errorFirst:true,existingErrors:errors.length,sequence,errorsInspectedBeforeOtherFindings:true,
  errorsResolved:false,automaticMutation:false,automaticRecovery:false,externalAction:false,authorityGranted:false});
}
function tfTroubleshootingAssuranceSelfTestV36337(sourceText){
 const ids=[...new Set(tfCanonicalSystemIdsV36196(sourceText))],set=new Set(ids),missing=[];
 for(const id of ["system.troubleshooting","system.troubleshooter","system.error",...TF_ASSURANCE_ROLE_IDS_V36337])if(!set.has(id))missing.push(id);
 const assurance=ids.map(tfSystemAssuranceRolesV36337);
 if(assurance.some(x=>x.roles.length!==6||!x.examiner||!x.inspector||!x.validator||!x.qualifier||!x.verifier||!x.tester||x.automaticExecution||x.authorityGranted))missing.push("universal-assurance-role-coverage");
 const p=tfTroubleshooterPassV36337({errors:["e1","e2"],otherFindings:["f1"]});
 if(!p.errorFirst||!p.errorsInspectedBeforeOtherFindings||p.sequence[0].kind!=="error"||p.existingErrors!==2||p.errorsResolved||p.automaticMutation||p.automaticRecovery||p.externalAction||p.authorityGranted)missing.push("error-first-troubleshooting");
 if(missing.length)throw new Error("troubleshooting assurance qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,newSystems:2,errorReused:true,systemsCovered:ids.length,troubleshooting:true,troubleshooter:true,
  errorFirst:true,assuranceRolesPerSystem:6,examiners:ids.length,inspectors:ids.length,validators:ids.length,
  qualifiers:ids.length,verifiers:ids.length,testers:ids.length,automaticExecution:false,automaticRecovery:false,
  authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_TROUBLESHOOTING_SYSTEMS_V36337,TF_ASSURANCE_ROLE_IDS_V36337,TF_TROUBLESHOOTING_RELATIONSHIPS_V36337,tfSystemAssuranceRolesV36337,tfTroubleshooterPassV36337,tfTroubleshootingAssuranceSelfTestV36337});
}
module.exports=Object.freeze({bindTroubleshootingV04578});
