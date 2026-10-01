"use strict";
const SYSTEM=Object.freeze({id:"system.law",concept:"Law",authorityGranted:false,scaffold:true});
function bindLawV04516(){return Object.freeze({SYSTEM});}


function bindNormativeFabricV04516(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.283: Law / Rule / Regulation Semantic Fabric === */
const TF_NORMATIVE_FABRIC_V36283=Object.freeze([
 Object.freeze({id:"system.law",concept:"Law",type:"normative-system",mode:"reference-and-administration",condition:"scope-and-source-identified",state:"ready",actor:"system.lawyer"}),
 Object.freeze({id:"system.lawyer",concept:"Lawyer",type:"actor-role",mode:"advisory",condition:"admitted-scope",state:"ready",domain:"system.law"}),
 Object.freeze({id:"system.rule",concept:"Rule",type:"normative-constraint-system",mode:"bounded",condition:"scope-defined",state:"ready",actor:"system.ruler"}),
 Object.freeze({id:"system.ruler",concept:"Ruler",type:"actor-role",mode:"bounded-administration",condition:"admitted-scope",state:"ready",domain:"system.rule"}),
 Object.freeze({id:"system.regulation",concept:"Regulation",type:"regulatory-system",mode:"reference-and-administration",condition:"jurisdiction-and-scope-identified",state:"ready",actor:"system.regulator"}),
 Object.freeze({id:"system.regulator",concept:"Regulator",type:"actor-role",mode:"bounded-administration",condition:"admitted-scope",state:"ready",domain:"system.regulation"})
]);
const TF_NORMATIVE_RELATIONSHIPS_V36283=Object.freeze([
 Object.freeze({from:"system.lawyer",relation:"operates-on",to:"system.law"}),
 Object.freeze({from:"system.ruler",relation:"operates-on",to:"system.rule"}),
 Object.freeze({from:"system.regulator",relation:"operates-on",to:"system.regulation"}),
 Object.freeze({from:"system.regulation",relation:"uses",to:"system.rule"}),
 Object.freeze({from:"system.rule",relation:"uses",to:"system.policy"})
]);
function tfNormativePlanV36283(kind,spec={}){
 const id="system."+String(kind),d=TF_NORMATIVE_FABRIC_V36283.find(x=>x.id===id);if(!d)throw new Error("unknown normative system");
 return Object.freeze({system:id,scope:String(spec.scope||""),source:String(spec.source||""),jurisdiction:String(spec.jurisdiction||""),
  admitted:spec.authorized===true,interpretsOnly:true,createsExternalAuthority:false,legalDetermination:false,enforces:false,authorityGranted:false});
}
function tfNormativeFabricSelfTestV36283(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const x of TF_NORMATIVE_FABRIC_V36283){if(!ids.has(x.id))missing.push(x.id);for(const k of ["type","mode","condition","state"])if(!x[k])missing.push(x.id+":"+k);}
 for(const e of TF_NORMATIVE_RELATIONSHIPS_V36283)if(!ids.has(e.from)||!ids.has(e.to))missing.push(e.from+"->"+e.to);
 const p=tfNormativePlanV36283("law",{authorized:true,scope:"internal"});if(!p.admitted||p.createsExternalAuthority||p.legalDetermination||p.enforces||p.authorityGranted)missing.push("authority-boundary");
 if(missing.length)throw new Error("normative fabric qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,law:true,lawyer:true,rule:true,ruler:true,regulation:true,regulator:true,typeCoverage:true,modeCoverage:true,
  conditionCoverage:true,stateCoverage:true,externalAuthorityCreated:false,enforcementImplied:false,authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_NORMATIVE_FABRIC_V36283,TF_NORMATIVE_RELATIONSHIPS_V36283,tfNormativePlanV36283,tfNormativeFabricSelfTestV36283});
}
module.exports=Object.freeze({bindLawV04516,bindNormativeFabricV04516});
