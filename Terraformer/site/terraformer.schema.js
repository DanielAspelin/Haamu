"use strict";
function bindCanonicalSchemaV04632(deps={}){
 const {tfCanonicalSystemIdsV36196,tfUniversalEngineFabricV36349,tfUniversalServiceFabricV36351,tfCompactSystemSeedV36353,tfUniversalActiveSummaryFabricV36358,tfReconstructFromInnerCapabilitiesV36384}=deps;
 /* === Terraformer v0.36.386: Canonical Schema System === */
const TF_SCHEMA_SYSTEM_V36386=Object.freeze({id:"system.schema",concept:"Schema",type:"structural-description-system",mode:"canonical-structure-description",
 condition:"schema-context-admitted",state:"ready"});
const TF_SCHEMA_RELATIONSHIPS_V36386=Object.freeze([
 Object.freeze({from:"system.schema",relation:"may-use",to:"system.type"}),
 Object.freeze({from:"system.schema",relation:"may-use",to:"system.validation"}),
 Object.freeze({from:"system.schema",relation:"may-use",to:"system.registry"}),
 Object.freeze({from:"system.generator",relation:"may-use",to:"system.schema"}),
 Object.freeze({from:"system.reconstruction",relation:"may-use",to:"system.schema"})
]);
function tfSchemaDescriptorV36386(subject,spec={}){
 const id=typeof subject==="string"?subject:String(subject?.id??"");if(!id)throw new Error("[TF:system.schema:invalid-input] Schema subject required.");
 return Object.freeze({system:"system.schema",subject:id,type:spec.type??null,fields:Object.freeze([...(spec.fields??[])]),
  constraints:Object.freeze([...(spec.constraints??[])]),version:spec.version??1,descriptive:true,executable:false,automaticMutation:false,persistence:false,authorityAmplification:false});
}
function tfSchemaSystemSelfTestV36386(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.schema","system.type","system.validation","system.registry","system.generator","system.reconstruction"])if(!ids.has(id))missing.push(id);
 const d=tfSchemaDescriptorV36386("system.schema",{type:"structural-description",fields:["subject","type","fields","constraints","version"]});
 if(!d.descriptive||d.executable||d.automaticMutation||d.persistence||d.authorityAmplification)missing.push("boundary");
 const eo=new Set(tfUniversalEngineFabricV36349(sourceText).engines.map(x=>x.owner)),so=new Set(tfUniversalServiceFabricV36351(sourceText).services.map(x=>x.owner)),seeded=new Set(tfCompactSystemSeedV36353(sourceText).entries.map(x=>x.id)),summaries=new Set(tfUniversalActiveSummaryFabricV36358(sourceText).summaries.map(x=>x.owner));
 for(const m of [["engine",eo],["service",so],["seed",seeded],["summary",summaries]])if(!m[1].has("system.schema"))missing.push(m[0]+":system.schema");
 const r=tfReconstructFromInnerCapabilitiesV36384(sourceText);if(!r.systems.some(x=>x.id==="system.schema"))missing.push("reconstruction");
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Schema System failed: "+[...new Set(missing)].join(",")+".");
 return Object.freeze({pass:true,newSystems:1,schema:true,systemsCovered:ids.size,reconstructible:true,engine:true,service:true,seed:true,summary:true,
  descriptive:true,executable:false,automaticMutation:false,authorityAmplification:false,missing:0});
}
globalThis.TF_SCHEMA_SYSTEM_V36386=TF_SCHEMA_SYSTEM_V36386;globalThis.TF_SCHEMA_RELATIONSHIPS_V36386=TF_SCHEMA_RELATIONSHIPS_V36386;
globalThis.tfSchemaDescriptorV36386=tfSchemaDescriptorV36386;
 return Object.freeze({TF_SCHEMA_SYSTEM_V36386,TF_SCHEMA_RELATIONSHIPS_V36386,tfSchemaDescriptorV36386,tfSchemaSystemSelfTestV36386});
}
module.exports=Object.freeze({bindCanonicalSchemaV04632});

/* Terraformer v0.48.5: static declaration migrated from terraformer.temporary.js. */
const PID_SYSTEM_SCHEMA='TERRAFORMER-PID-SYSTEM/1';
const NODE_SYSTEM_SCHEMA='TERRAFORMER-NODEJS-SYSTEM/2';

/* Terraformer v0.48.9: qualified isolated declaration migration. */
const GOALS_SCHEMA='TERRAFORMER-CONSTRUCTIVE-GOALS/1';

/* Terraformer v0.48.9: qualified isolated declaration migration. */
const SUPERVISOR_SCHEMA='TERRAFORMER-RUNTIME-SUPERVISOR/1';
