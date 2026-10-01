"use strict";
function bindSignerRoleV04561(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.320: Signer / Digital Signer Role Fabric === */
const TF_SIGNER_SYSTEMS_V36320=Object.freeze([
 Object.freeze({id:"system.signer",concept:"Signer",type:"signature-actor-role-system",mode:"signature-actor",condition:"signature-context-and-actor-identified",state:"ready"}),
 Object.freeze({id:"system.digital-signer",concept:"Digital Signer",type:"cryptographic-signature-actor-role-system",mode:"digital-signature-actor",condition:"algorithm-key-reference-content-and-actor-identified",state:"ready"})
]);
const TF_SIGNER_RELATIONSHIPS_V36320=Object.freeze([
 Object.freeze({from:"system.signer",relation:"produces",to:"system.signature"}),
 Object.freeze({from:"system.digital-signer",relation:"type-of",to:"system.signer"}),
 Object.freeze({from:"system.digital-signer",relation:"produces",to:"system.digital-signature"}),
 Object.freeze({from:"system.digital-signer",relation:"uses",to:"system.cryptography"}),
 Object.freeze({from:"system.digital-signer",relation:"uses",to:"system.digital-signature"})
]);
function tfSignerContextV36320(spec={}){
 const digital=spec.digital===true;
 const actorReference=spec.actorReference?String(spec.actorReference):null;
 if(!actorReference)throw new Error("signer actor reference required");
 return Object.freeze({system:digital?"system.digital-signer":"system.signer",actorReference,
  signatureSystem:digital?"system.digital-signature":"system.signature",
  keyReference:digital&&spec.keyReference?String(spec.keyReference):null,
  privateKeyEmbedded:false,signingPerformed:false,identityProven:false,legalAuthorityImplied:false,
  authorizationImplied:false,authorityGranted:false});
}
function tfSignerSelfTestV36320(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.signature","system.digital-signature","system.signer","system.digital-signer","system.cryptography"])if(!ids.has(id))missing.push(id);
 const a=tfSignerContextV36320({actorReference:"actor:test"}),d=tfSignerContextV36320({digital:true,actorReference:"actor:test",keyReference:"key:test"});
 if(a.system!=="system.signer"||d.system!=="system.digital-signer"||d.signatureSystem!=="system.digital-signature"||d.privateKeyEmbedded||d.identityProven||d.legalAuthorityImplied||d.authorizationImplied||d.authorityGranted)missing.push("signer-boundary");
 if(missing.length)throw new Error("signer qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,newSystems:2,signatureReused:true,digitalSignatureReused:true,signer:true,digitalSigner:true,
  actorArtifactDistinct:true,privateKeyEmbedded:false,identityProven:false,legalAuthorityImplied:false,
  authorizationImplied:false,authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_SIGNER_SYSTEMS_V36320,TF_SIGNER_RELATIONSHIPS_V36320,tfSignerContextV36320,tfSignerSelfTestV36320});
}
module.exports=Object.freeze({bindSignerRoleV04561});

/* Terraformer v0.48.12: qualified immutable depth-0 declaration migration. */
const TF_SIGNER_TYPES_V04561=Object.freeze({"system.digital-signer":"system.signer"});
