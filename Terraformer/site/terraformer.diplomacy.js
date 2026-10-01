"use strict";
function bindCivicLegalV04583(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.343: Policy / Diplomacy / Democracy / Association / Legal Fabric === */
const TF_CIVIC_LEGAL_SYSTEMS_V36343=Object.freeze([
 Object.freeze({id:"system.diplomacy",concept:"Diplomacy",type:"coordination-process-system",mode:"bounded-dialogue-and-representation",condition:"diplomatic-context-admitted",state:"ready"}),
 Object.freeze({id:"system.democracy",concept:"Democracy",type:"governance-model-system",mode:"participatory-governance-reference",condition:"democratic-context-identified",state:"ready"}),
 Object.freeze({id:"system.association",concept:"Association",type:"organizational-relationship-system",mode:"bounded-association-reference",condition:"association-context-identified",state:"ready"}),
 Object.freeze({id:"system.legal-register",concept:"Legal Register",type:"legal-reference-register-system",mode:"legal-reference-indexing",condition:"legal-reference-admitted",state:"ready"}),
 Object.freeze({id:"system.legal",concept:"Legal",type:"legal-context-system",mode:"legal-reference-and-context",condition:"legal-context-identified",state:"ready"})
]);
const TF_CIVIC_LEGAL_RELATIONSHIPS_V36343=Object.freeze([
 Object.freeze({from:"system.diplomacy",relation:"uses",to:"system.communication"}),
 Object.freeze({from:"system.diplomacy",relation:"may-use",to:"system.negotiation"}),
 Object.freeze({from:"system.democracy",relation:"may-use",to:"system.policy"}),
 Object.freeze({from:"system.association",relation:"uses",to:"system.organization"}),
 Object.freeze({from:"system.legal-register",relation:"uses",to:"system.registry"}),
 Object.freeze({from:"system.legal-register",relation:"uses",to:"system.legal"}),
 Object.freeze({from:"system.legal",relation:"may-use",to:"system.law"}),
 Object.freeze({from:"system.legal",relation:"may-use",to:"system.rule"}),
 Object.freeze({from:"system.legal",relation:"may-use",to:"system.regulation"}),
 Object.freeze({from:"system.policy",relation:"distinct-from",to:"system.legal"})
]);
function tfCivicLegalContextV36343(kind,spec={}){
 const allowed=new Set(["policy","diplomacy","democracy","association","legal-register","legal"]);
 const k=String(kind??"");if(!allowed.has(k))throw new Error("[TF:system.policy:unsupported-operation] Unsupported civic/legal context.");
 return Object.freeze({system:"system."+k,subject:spec.subject==null?null:String(spec.subject),
  descriptive:true,referenceOnly:true,governmentAuthority:false,legalAuthority:false,votingAuthority:false,
  representativeAuthority:false,policyAuthority:false,automaticEnforcement:false,automaticExternalAction:false,
  persistencePerformed:false,authorityGranted:false});
}
function tfCivicLegalSelfTestV36343(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.policy","system.diplomacy","system.democracy","system.association","system.legal-register","system.legal",
 "system.law","system.rule","system.regulation","system.registry"])if(!ids.has(id))missing.push(id);
 for(const k of ["policy","diplomacy","democracy","association","legal-register","legal"]){
  const p=tfCivicLegalContextV36343(k);
  if(!p.descriptive||!p.referenceOnly||p.governmentAuthority||p.legalAuthority||p.votingAuthority||p.representativeAuthority||p.policyAuthority||p.automaticEnforcement||p.automaticExternalAction||p.authorityGranted)missing.push(k+"-boundary");
 }
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Civic / legal fabric qualification failed: "+[...new Set(missing)].join(",")+".");
 return Object.freeze({pass:true,newSystems:5,policyReused:true,diplomacy:true,democracy:true,association:true,legalRegister:true,legal:true,
  lawReused:true,ruleReused:true,regulationReused:true,registryReused:true,governmentAuthority:false,legalAuthority:false,
  votingAuthority:false,representativeAuthority:false,automaticEnforcement:false,authorityAmplification:false,missing:0});
}
globalThis.TF_CIVIC_LEGAL_SYSTEMS_V36343=TF_CIVIC_LEGAL_SYSTEMS_V36343;
globalThis.TF_CIVIC_LEGAL_RELATIONSHIPS_V36343=TF_CIVIC_LEGAL_RELATIONSHIPS_V36343;
globalThis.tfCivicLegalContextV36343=tfCivicLegalContextV36343;
 return Object.freeze({TF_CIVIC_LEGAL_SYSTEMS_V36343,TF_CIVIC_LEGAL_RELATIONSHIPS_V36343,tfCivicLegalContextV36343,tfCivicLegalSelfTestV36343});
}
module.exports=Object.freeze({bindCivicLegalV04583});
