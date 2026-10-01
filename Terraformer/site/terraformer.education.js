"use strict";
const SYSTEM=Object.freeze({id:"system.education",concept:"Education",authorityGranted:false,scaffold:true});
function bindEducationV04517(){return Object.freeze({SYSTEM});}


function bindEducationFabricV04517(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.284: Education / Teaching Role Fabric === */
const TF_EDUCATION_FABRIC_V36284=Object.freeze([
 Object.freeze({id:"system.teaching",concept:"Teaching",type:"education-process",mode:"bounded",condition:"education-scope-admitted",state:"ready",parent:"system.education"}),
 Object.freeze({id:"system.teacher",concept:"Teacher",type:"education-actor-role",mode:"teaching",condition:"assigned",state:"ready",parent:"system.education",process:"system.teaching"}),
 Object.freeze({id:"system.student",concept:"Student",type:"education-participant-role",mode:"learning",condition:"admitted",state:"ready",parent:"system.education",process:"system.teaching"})
]);
const TF_EDUCATION_RELATIONSHIPS_V36284=Object.freeze([
 Object.freeze({from:"system.teaching",relation:"part-of",to:"system.education"}),
 Object.freeze({from:"system.teacher",relation:"part-of",to:"system.education"}),
 Object.freeze({from:"system.teacher",relation:"operates-on",to:"system.teaching"}),
 Object.freeze({from:"system.student",relation:"part-of",to:"system.education"}),
 Object.freeze({from:"system.student",relation:"participates-in",to:"system.teaching"})
]);
function tfEducationFabricSelfTestV36284(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=["system.education","system.teaching","system.teacher","system.student"].filter(x=>!ids.has(x));
 for(const x of TF_EDUCATION_FABRIC_V36284)for(const k of ["type","mode","condition","state"])if(!x[k])missing.push(x.id+":"+k);
 if(missing.length)throw new Error("education fabric qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,educationParent:true,teaching:true,teacher:true,student:true,typeCoverage:true,modeCoverage:true,
  conditionCoverage:true,stateCoverage:true,administrativeAuthorityImplied:false,authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_EDUCATION_FABRIC_V36284,TF_EDUCATION_RELATIONSHIPS_V36284,tfEducationFabricSelfTestV36284});
}
const TERRAFORMER_EDUCATION_SYSTEM=Object.freeze({schema:'TERRAFORMER-EDUCATION-SYSTEM/1',id:'system.education',name:'Education System',family:'education',type:'education-system',state:'integrated',canonicalPath:'terraformer://education/',dependsOn:Object.freeze(['system.learning','system.training']),governs:Object.freeze(['education','curriculum','course','lesson','learning-objective','assessment-reference']),rule:'Education System composes learning and training structures; it does not independently award recognized credentials, accreditation, or professional authority.'});

module.exports=Object.freeze({bindEducationV04517,bindEducationFabricV04517,TERRAFORMER_EDUCATION_SYSTEM});
