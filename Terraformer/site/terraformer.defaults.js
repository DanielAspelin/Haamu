"use strict";
function bindSchemaDefaultsV04633(deps={}){
 const {tfSchemaDescriptorV36386,tfReconstructFromInnerCapabilitiesV36384,tfCanonicalSystemIdsV36196,tfUniversalEngineFabricV36349,tfUniversalServiceFabricV36351,tfCompactSystemSeedV36353,tfNeedCompletionAuditV36385}=deps;
 /* === Terraformer v0.36.387: Defaults + Schema-Driven Reconstruction === */
const TF_DEFAULTS_SYSTEM_V36387=Object.freeze({id:"system.defaults",concept:"Defaults",type:"default-value-system",mode:"schema-admitted-fallback",
 condition:"explicit-value-absent-and-default-admitted",state:"ready"});
const TF_DEFAULTS_RELATIONSHIPS_V36387=Object.freeze([
 Object.freeze({from:"system.defaults",relation:"uses",to:"system.schema"}),
 Object.freeze({from:"system.reconstruction",relation:"may-use",to:"system.defaults"}),
 Object.freeze({from:"system.generator",relation:"may-use",to:"system.defaults"}),
 Object.freeze({from:"system.defaults",relation:"governed-by",to:"system.rule"})
]);
const TF_RECONSTRUCTION_SCHEMA_V36387=tfSchemaDescriptorV36386("system.reconstruction",{type:"schema-driven-inner-reconstruction",
 version:1,fields:["id","identity","serviceIssuedName","engine","service","workerId","generatorId","automatorId","poolId","farmerId","assurance","instance","contexts","ticketer","wiring","group","statements","visual","inputOutput","serverClient","summary","volatile","automaticExecution","persistencePerformed","externalEffect","authorityAmplification"],
 constraints:["canonical-system-id","inner-capabilities-only","deterministic","volatile-by-default","no-authority-amplification"]});
const TF_RECONSTRUCTION_DEFAULTS_V36387=Object.freeze({volatile:true,automaticExecution:false,persistencePerformed:false,externalEffect:false,authorityAmplification:false});
function tfApplySchemaDefaultsV36387(schema,explicit={},defaults=TF_RECONSTRUCTION_DEFAULTS_V36387){
 if(!schema||schema.system!=="system.schema")throw new Error("[TF:system.defaults:invalid-schema] Canonical Schema required.");
 const out={};for(const field of schema.fields){if(Object.prototype.hasOwnProperty.call(explicit,field))out[field]=explicit[field];else if(Object.prototype.hasOwnProperty.call(defaults,field))out[field]=defaults[field];}
 return Object.freeze(out);
}
function tfSchemaDrivenReconstructionV36387(sourceText){
 const r=tfReconstructFromInnerCapabilitiesV36384(sourceText);
 const systems=r.systems.map(x=>Object.freeze({...x,schema:"system.schema",schemaVersion:TF_RECONSTRUCTION_SCHEMA_V36387.version,
  defaults:"system.defaults",reconstructionDefaults:tfApplySchemaDefaultsV36387(TF_RECONSTRUCTION_SCHEMA_V36387,{})}));
 return Object.freeze({...r,schemaSystem:"system.schema",defaultsSystem:"system.defaults",reconstructionSchema:TF_RECONSTRUCTION_SCHEMA_V36387,
  systems:Object.freeze(systems),schemaDriven:true,defaultsOnlyWhenAdmitted:true,explicitValuesOverrideDefaults:true});
}
function tfDefaultsSchemaReconstructionSelfTestV36387(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.defaults","system.schema","system.reconstruction","system.registry","system.generator","system.validation","system.rule"])if(!ids.has(id))missing.push(id);
 const d=tfApplySchemaDefaultsV36387(TF_RECONSTRUCTION_SCHEMA_V36387,{volatile:false},{volatile:true,externalEffect:false});
 if(d.volatile!==false||d.externalEffect!==false)missing.push("default-precedence");
 const r=tfSchemaDrivenReconstructionV36387(sourceText);if(!r.schemaDriven||!r.defaultsOnlyWhenAdmitted||!r.explicitValuesOverrideDefaults||r.count!==ids.size)missing.push("schema-reconstruction");
 if(r.systems.some(x=>x.schema!=="system.schema"||x.defaults!=="system.defaults"))missing.push("coverage");
 const eo=new Set(tfUniversalEngineFabricV36349(sourceText).engines.map(x=>x.owner)),so=new Set(tfUniversalServiceFabricV36351(sourceText).services.map(x=>x.owner)),seeded=new Set(tfCompactSystemSeedV36353(sourceText).entries.map(x=>x.id));
 for(const m of [["engine",eo],["service",so],["seed",seeded]])if(!m[1].has("system.defaults"))missing.push(m[0]+":system.defaults");
 const need=tfNeedCompletionAuditV36385(sourceText);if(!need.completionEligible)missing.push("need-closure");
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Defaults / Schema reconstruction failed: "+[...new Set(missing)].join(",")+".");
 return Object.freeze({pass:true,newSystems:1,defaults:true,schemaReused:true,systemsCovered:r.count,schemaDrivenReconstruction:true,
  defaultsOnlyWhenAdmitted:true,explicitValuesOverrideDefaults:true,mandatoryAbsenceNotSilentlySatisfied:true,authorityAmplification:false,missing:0});
}
globalThis.TF_DEFAULTS_SYSTEM_V36387=TF_DEFAULTS_SYSTEM_V36387;globalThis.TF_DEFAULTS_RELATIONSHIPS_V36387=TF_DEFAULTS_RELATIONSHIPS_V36387;
globalThis.TF_RECONSTRUCTION_SCHEMA_V36387=TF_RECONSTRUCTION_SCHEMA_V36387;globalThis.TF_RECONSTRUCTION_DEFAULTS_V36387=TF_RECONSTRUCTION_DEFAULTS_V36387;
globalThis.tfApplySchemaDefaultsV36387=tfApplySchemaDefaultsV36387;globalThis.tfSchemaDrivenReconstructionV36387=tfSchemaDrivenReconstructionV36387;
 return Object.freeze({TF_DEFAULTS_SYSTEM_V36387,TF_DEFAULTS_RELATIONSHIPS_V36387,TF_RECONSTRUCTION_SCHEMA_V36387,TF_RECONSTRUCTION_DEFAULTS_V36387,tfApplySchemaDefaultsV36387,tfSchemaDrivenReconstructionV36387,tfDefaultsSchemaReconstructionSelfTestV36387});
}

function bindUniversalDefaultsV04634(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 const TF_SYSTEM_DEFAULTS_SCHEMA_V36388=Object.freeze({schema:"TERRAFORMER-SYSTEM-DEFAULTS/1",system:"system.defaults",perSystem:true,
 values:Object.freeze({volatile:true,privateByDefault:true,inertByDefault:true,automaticExecution:false,automaticMutation:false,persistence:false,externalEffect:false,authorityAmplification:false})});
function tfSystemDefaultsV36388(owner){
 owner=String(owner??"");if(!owner.startsWith("system."))throw new Error("[TF:system.defaults:invalid-owner] Canonical System owner required.");
 return Object.freeze({id:owner+"::defaults",owner,system:"system.defaults",...TF_SYSTEM_DEFAULTS_SCHEMA_V36388.values});
}
function tfUniversalSystemDefaultsFabricV36388(sourceText){
 const ids=tfCanonicalSystemIdsV36196(sourceText),entries=ids.map(tfSystemDefaultsV36388);
 return Object.freeze({system:"system.defaults",systemsCovered:ids.length,defaults:entries.length,entries:Object.freeze(entries),everySystemOwnDefaults:true});
}
 return Object.freeze({TF_SYSTEM_DEFAULTS_SCHEMA_V36388,tfSystemDefaultsV36388,tfUniversalSystemDefaultsFabricV36388});
}

module.exports=Object.freeze({bindSchemaDefaultsV04633,bindUniversalDefaultsV04634});

/* Terraformer v0.48.12: qualified immutable depth-0 declaration migration. */
const TF_GUARD_DEFAULTS_V36421=Object.freeze({guarded:true,automaticEnforcement:false,automaticExecution:false,automaticMonitoring:false,automaticBlocking:false,automaticNetworkAccess:false,automaticPersistence:false,externalEffect:false,authorityAmplification:false});
