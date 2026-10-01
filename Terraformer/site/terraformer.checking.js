"use strict";
function bindCheckingV04638(deps={}){
 const {tfCanonicalSystemIdsV36196,tfUniversalEngineFabricV36349,tfUniversalServiceFabricV36351,tfCompactSystemSeedV36353,tfUniversalSystemLayerFabricV36389,tfUniversalSystemDefaultsFabricV36388}=deps;
 /* === Terraformer v0.36.392: Checking / Checker Fabric === */
const TF_CHECKING_SYSTEMS_V36392=Object.freeze([
 Object.freeze({id:"system.checking",concept:"Checking",type:"observation-examination-process-system",mode:"bounded-read-only-check",condition:"checking-context-admitted",state:"ready"}),
 Object.freeze({id:"system.checker",concept:"Checker",type:"checking-actor-system",mode:"bounded-read-only-checker",condition:"checking-admitted",state:"ready"})
]);
const TF_CHECKING_RELATIONSHIPS_V36392=Object.freeze([
 Object.freeze({from:"system.checker",relation:"part-of",to:"system.checking"}),
 Object.freeze({from:"system.checking",relation:"may-support",to:"system.testing"}),
 Object.freeze({from:"system.checking",relation:"may-support",to:"system.verification"}),
 Object.freeze({from:"system.checking",relation:"may-support",to:"system.validation"}),
 Object.freeze({from:"system.checking",relation:"may-support",to:"system.inspection"}),
 Object.freeze({from:"system.checking",relation:"may-support",to:"system.qualification"}),
 Object.freeze({from:"system.checking",relation:"may-support",to:"system.assurance"})
]);
function tfCheckV36392(subject,predicate=()=>true){
 if(typeof predicate!=="function")throw new Error("[TF:system.checking:invalid-predicate] Checking predicate Function required.");
 let passed=false,error=null;try{passed=Boolean(predicate(subject));}catch(e){error=String(e?.message??e);}
 return Object.freeze({system:"system.checking",checker:"system.checker",subject,checked:true,passed,error,readOnly:true,
  automaticMutation:false,automaticRepair:false,automaticQualification:false,persistence:false,externalEffect:false,authorityAmplification:false});
}
function tfCheckingSelfTestV36392(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.checking","system.checker","system.testing","system.verification","system.validation","system.inspection","system.qualification","system.assurance"])if(!ids.has(id))missing.push(id);
 const ok=tfCheckV36392({value:1},x=>x.value===1),bad=tfCheckV36392({value:1},x=>x.value===2);
 if(!ok.checked||!ok.passed||bad.passed||!ok.readOnly||ok.automaticMutation||ok.automaticRepair||ok.automaticQualification||ok.persistence||ok.externalEffect||ok.authorityAmplification)missing.push("check-boundary");
 const eo=new Set(tfUniversalEngineFabricV36349(sourceText).engines.map(x=>x.owner)),so=new Set(tfUniversalServiceFabricV36351(sourceText).services.map(x=>x.owner)),seeded=new Set(tfCompactSystemSeedV36353(sourceText).entries.map(x=>x.id));
 for(const id of ["system.checking","system.checker"]){if(!eo.has(id))missing.push("engine:"+id);if(!so.has(id))missing.push("service:"+id);if(!seeded.has(id))missing.push("seed:"+id);}
 const layers=tfUniversalSystemLayerFabricV36389(sourceText),defs=tfUniversalSystemDefaultsFabricV36388(sourceText);if(layers.layers!==ids.size||defs.defaults!==ids.size)missing.push("universal-fabric");
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Checking / Checker failed: "+[...new Set(missing)].join(",")+".");
 return Object.freeze({pass:true,newSystems:2,checking:true,checker:true,testingDistinct:true,verificationDistinct:true,validationDistinct:true,inspectionDistinct:true,
  qualificationDistinct:true,systemsCovered:ids.size,everySystemOwnLayer:true,everySystemOwnDefaults:true,readOnly:true,automaticMutation:false,
  automaticRepair:false,automaticQualification:false,authorityAmplification:false,missing:0});
}
globalThis.TF_CHECKING_SYSTEMS_V36392=TF_CHECKING_SYSTEMS_V36392;globalThis.TF_CHECKING_RELATIONSHIPS_V36392=TF_CHECKING_RELATIONSHIPS_V36392;
globalThis.tfCheckV36392=tfCheckV36392;
 return Object.freeze({TF_CHECKING_SYSTEMS_V36392,TF_CHECKING_RELATIONSHIPS_V36392,tfCheckV36392,tfCheckingSelfTestV36392});
}
module.exports=Object.freeze({bindCheckingV04638});
