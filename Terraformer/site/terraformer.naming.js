"use strict";
function bindNumberNameIssuanceV04623(deps={}){
 const {tfCanonicalSystemIdsV36196,tfUniversalEngineFabricV36349,tfUniversalServiceFabricV36351,tfCompactSystemSeedV36353,tfUniversalActiveSummaryFabricV36358}=deps;
 /* === Terraformer v0.36.379: Universal Number / Name Issuance Services === */
const TF_NAMING_SYSTEMS_V36379=Object.freeze([{"id":"system.naming","concept":"Naming","type":"name-issuance-process-system"},{"id":"system.namer","concept":"Namer","type":"naming-actor-system"}]);

const TF_NUMBER_NAME_RELATIONSHIPS_V36379=Object.freeze([
 Object.freeze({from:"system.numbering",relation:"uses",to:"system.number"}),
 Object.freeze({from:"system.numberer",relation:"part-of",to:"system.numbering"}),
 Object.freeze({from:"system.naming",relation:"uses",to:"system.name"}),
 Object.freeze({from:"system.namer",relation:"part-of",to:"system.naming"}),
 Object.freeze({from:"system.numbering",relation:"may-use",to:"system.service"}),
 Object.freeze({from:"system.naming",relation:"may-use",to:"system.service"}),
 Object.freeze({from:"system.numbering",relation:"may-use",to:"system.registry"}),
 Object.freeze({from:"system.naming",relation:"may-use",to:"system.registry"})
]);
const TF_SYSTEM_NUMBER_NAME_SCHEMA_V36379=Object.freeze({schema:"TERRAFORMER-SYSTEM-NUMBER-NAME/1",issued:true,deterministic:true,immutable:true,
 numberingService:"system.numbering",namingService:"system.naming",renumberAutomatically:false,renameAutomatically:false,persistence:false,authorityAmplification:false});
function tfHumanSystemNameV36379(id){return id.replace(/^system\./,"").split(/[._-]+/).filter(Boolean).map(x=>x.charAt(0).toUpperCase()+x.slice(1)).join(" ");}
function tfUniversalSystemNumberNameFabricV36379(sourceText){
 const ids=tfCanonicalSystemIdsV36196(sourceText);
 const entries=ids.map((id,index)=>Object.freeze({owner:id,number:Object.freeze({value:index+1,system:"system.number",issuedBy:"system.numbering"}),
  name:Object.freeze({value:id,label:tfHumanSystemNameV36379(id),system:"system.name",issuedBy:"system.naming"}),...TF_SYSTEM_NUMBER_NAME_SCHEMA_V36379}));
 return Object.freeze({systemsCovered:ids.length,numbersIssued:entries.length,namesIssued:entries.length,entries:Object.freeze(entries),
  everySystemHasNumber:true,everySystemHasName:true,numberingService:"system.numbering",namingService:"system.naming"});
}
function tfSystemNumberNameSelfTestV36379(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[],added=TF_NAMING_SYSTEMS_V36379.map(x=>x.id),u=tfUniversalSystemNumberNameFabricV36379(sourceText);
 for(const id of [...added,"system.numbering","system.numberer","system.number","system.name","system.service","system.registry","system.uuid","system.identity","system.context"])if(!ids.has(id))missing.push(id);
 if(u.systemsCovered!==ids.size||u.numbersIssued!==ids.size||u.namesIssued!==ids.size||u.entries.length!==ids.size)missing.push("coverage");
 const nums=new Set(u.entries.map(e=>e.number.value)),names=new Set(u.entries.map(e=>e.name.value)),owners=new Set(u.entries.map(e=>e.owner));
 if(nums.size!==ids.size||names.size!==ids.size||owners.size!==ids.size||Math.min(...nums)!==1||Math.max(...nums)!==ids.size)missing.push("uniqueness");
 for(const e of u.entries){if(!e.issued||!e.deterministic||!e.immutable||e.number.issuedBy!=="system.numbering"||e.name.issuedBy!=="system.naming"||e.renumberAutomatically||e.renameAutomatically||e.authorityAmplification)missing.push("entry:"+e.owner);}
 const eo=new Set(tfUniversalEngineFabricV36349(sourceText).engines.map(x=>x.owner)),so=new Set(tfUniversalServiceFabricV36351(sourceText).services.map(x=>x.owner)),seeded=new Set(tfCompactSystemSeedV36353(sourceText).entries.map(x=>x.id)),summaries=new Set(tfUniversalActiveSummaryFabricV36358(sourceText).summaries.map(x=>x.owner));
 for(const id of added){if(!eo.has(id))missing.push("engine:"+id);if(!so.has(id))missing.push("service:"+id);if(!seeded.has(id))missing.push("seed:"+id);if(!summaries.has(id))missing.push("summary:"+id);}
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Universal Number / Name issuance failed: "+[...new Set(missing)].slice(0,64).join(",")+".");
 return Object.freeze({pass:true,newSystems:2,numberingReused:true,numbererReused:true,numberReused:true,nameReused:true,systemsCovered:u.systemsCovered,
  numbersIssued:u.numbersIssued,namesIssued:u.namesIssued,everySystemHasNumber:true,everySystemHasName:true,uniqueNumbers:true,uniqueNames:true,
  deterministic:true,immutable:true,automaticRenumber:false,automaticRename:false,authorityAmplification:false,missing:0});
}
globalThis.TF_NAMING_SYSTEMS_V36379=TF_NAMING_SYSTEMS_V36379;
globalThis.TF_NUMBER_NAME_RELATIONSHIPS_V36379=TF_NUMBER_NAME_RELATIONSHIPS_V36379;
globalThis.TF_SYSTEM_NUMBER_NAME_SCHEMA_V36379=TF_SYSTEM_NUMBER_NAME_SCHEMA_V36379;
globalThis.tfHumanSystemNameV36379=tfHumanSystemNameV36379;
globalThis.tfUniversalSystemNumberNameFabricV36379=tfUniversalSystemNumberNameFabricV36379;
 return Object.freeze({TF_NAMING_SYSTEMS_V36379,TF_NUMBER_NAME_RELATIONSHIPS_V36379,TF_SYSTEM_NUMBER_NAME_SCHEMA_V36379,tfHumanSystemNameV36379,tfUniversalSystemNumberNameFabricV36379,tfSystemNumberNameSelfTestV36379});
}


function bindUniqueServiceNamingV04625(deps={}){
 const {tfCanonicalSystemIdsV36196,tfHumanSystemNameV36379,tfUniversalEngineFabricV36349,tfUniversalServiceFabricV36351,tfCompactSystemSeedV36353,tfUniversalActiveSummaryFabricV36358}=deps;
/* === Terraformer v0.36.380: Unique System / Service-Issued Naming Fabric === */
const TF_UNIQUE_SYSTEM_V36380=Object.freeze({id:"system.unique",concept:"Unique",type:"uniqueness-identity-system",mode:"canonical-identity-distinction",condition:"identity-context-admitted",state:"ready"});
const TF_UNIQUE_NAMING_RELATIONSHIPS_V36380=Object.freeze([
 Object.freeze({from:"system.unique",relation:"may-use",to:"system.identity"}),
 Object.freeze({from:"system.unique",relation:"may-use",to:"system.uuid"}),
 Object.freeze({from:"system.naming",relation:"uses",to:"system.name"}),
 Object.freeze({from:"system.namer",relation:"part-of",to:"system.naming"}),
 Object.freeze({from:"system.naming",relation:"uses",to:"system.service"})
]);
const TF_SERVICE_ISSUED_NAME_SCHEMA_V36380=Object.freeze({schema:"TERRAFORMER-SERVICE-ISSUED-NAME/1",unique:true,issued:true,deterministic:true,immutable:true,
 namingSystem:"system.naming",namerSystem:"system.namer",serviceSystem:"system.service",automaticRename:false,persistence:false,authorityAmplification:false});
function tfSystemNamingServiceV36380(owner){
 const id=typeof owner==="string"?owner:String(owner?.id??"");if(!id)throw new Error("[TF:system.naming:invalid-input] System identity required.");
 return Object.freeze({id:id+"::naming-service",owner:id,system:"system.service",serviceOf:"system.naming",namer:id+"::namer",privateByDefault:true,inertByDefault:true,admissionRequired:true});
}
function tfIssueSystemNameV36380(owner){
 const id=typeof owner==="string"?owner:String(owner?.id??"");if(!id)throw new Error("[TF:system.naming:invalid-input] System identity required.");
 const service=tfSystemNamingServiceV36380(id);
 return Object.freeze({owner:id,name:Object.freeze({value:id,label:tfHumanSystemNameV36379(id),system:"system.name",uniqueSystem:"system.unique",
  issuedBy:"system.naming",issuedThrough:service.id,namer:service.namer}),service,...TF_SERVICE_ISSUED_NAME_SCHEMA_V36380});
}
function tfUniversalServiceIssuedNamingV36380(sourceText){
 const ids=tfCanonicalSystemIdsV36196(sourceText),entries=ids.map(tfIssueSystemNameV36380);
 return Object.freeze({systemsCovered:ids.length,namesIssued:entries.length,namingServices:entries.length,entries:Object.freeze(entries),
  everySystemUnique:true,everySystemNamed:true,everyNameIssuedByNamingSystem:true,everyNameIssuedThroughService:true});
}
function tfUniqueNamingSelfTestV36380(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[],u=tfUniversalServiceIssuedNamingV36380(sourceText);
 for(const id of ["system.unique","system.naming","system.namer","system.name","system.service","system.identity","system.uuid","system.numbering","system.numberer"])if(!ids.has(id))missing.push(id);
 if(u.systemsCovered!==ids.size||u.namesIssued!==ids.size||u.namingServices!==ids.size||u.entries.length!==ids.size)missing.push("coverage");
 if(new Set(u.entries.map(e=>e.name.value)).size!==ids.size||new Set(u.entries.map(e=>e.service.id)).size!==ids.size)missing.push("uniqueness");
 for(const e of u.entries){if(!e.unique||!e.issued||!e.immutable||e.name.issuedBy!=="system.naming"||e.name.issuedThrough!==e.service.id||e.service.serviceOf!=="system.naming"||e.automaticRename||e.authorityAmplification)missing.push("entry:"+e.owner);}
 const eo=new Set(tfUniversalEngineFabricV36349(sourceText).engines.map(x=>x.owner)),so=new Set(tfUniversalServiceFabricV36351(sourceText).services.map(x=>x.owner)),seeded=new Set(tfCompactSystemSeedV36353(sourceText).entries.map(x=>x.id)),summaries=new Set(tfUniversalActiveSummaryFabricV36358(sourceText).summaries.map(x=>x.owner));
 for(const id of ["system.unique"]){if(!eo.has(id))missing.push("engine:"+id);if(!so.has(id))missing.push("service:"+id);if(!seeded.has(id))missing.push("seed:"+id);if(!summaries.has(id))missing.push("summary:"+id);}
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Unique / Naming Service qualification failed: "+[...new Set(missing)].slice(0,64).join(",")+".");
 return Object.freeze({pass:true,newSystems:1,namingReused:true,namerReused:true,nameReused:true,systemsCovered:u.systemsCovered,namesIssued:u.namesIssued,
  namingServices:u.namingServices,everySystemUnique:true,everySystemNamed:true,everyNameIssuedByNamingSystem:true,everyNameIssuedThroughService:true,
  uniqueNames:true,uniqueNamingServices:true,automaticRename:false,authorityAmplification:false,missing:0});
}
globalThis.TF_UNIQUE_SYSTEM_V36380=TF_UNIQUE_SYSTEM_V36380;
globalThis.TF_UNIQUE_NAMING_RELATIONSHIPS_V36380=TF_UNIQUE_NAMING_RELATIONSHIPS_V36380;
globalThis.TF_SERVICE_ISSUED_NAME_SCHEMA_V36380=TF_SERVICE_ISSUED_NAME_SCHEMA_V36380;
globalThis.tfSystemNamingServiceV36380=tfSystemNamingServiceV36380;
globalThis.tfIssueSystemNameV36380=tfIssueSystemNameV36380;
globalThis.tfUniversalServiceIssuedNamingV36380=tfUniversalServiceIssuedNamingV36380;
 return Object.freeze({TF_UNIQUE_SYSTEM_V36380,TF_UNIQUE_NAMING_RELATIONSHIPS_V36380,TF_SERVICE_ISSUED_NAME_SCHEMA_V36380,tfSystemNamingServiceV36380,tfIssueSystemNameV36380,tfUniversalServiceIssuedNamingV36380,tfUniqueNamingSelfTestV36380});
}

module.exports=Object.freeze({bindNumberNameIssuanceV04623,bindUniqueServiceNamingV04625});
