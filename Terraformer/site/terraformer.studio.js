"use strict";
function bindLanguageCreationStudioV04634(deps={}){
 const {tfCanonicalSystemIdsV36196,tfUniversalSystemDefaultsFabricV36388,tfSchemaDrivenReconstructionV36387,tfUniversalEngineFabricV36349,tfUniversalServiceFabricV36351,tfCompactSystemSeedV36353}=deps;
 const TF_LANGUAGE_CREATION_STUDIO_SYSTEMS_V36388=Object.freeze([
 Object.freeze({id:"system.creation",concept:"Creation",type:"construction-process-system",mode:"admitted-definition-construction",condition:"creation-context-admitted",state:"ready"}),
 Object.freeze({id:"system.studio",concept:"Studio",type:"system-construction-studio",mode:"contextual-construction-workspace",condition:"studio-context-admitted",state:"ready"})
]);
const TF_LANGUAGE_CREATION_STUDIO_RELATIONSHIPS_V36388=Object.freeze([
 Object.freeze({from:"system.creation",relation:"may-use",to:"system.construction"}),
 Object.freeze({from:"system.studio",relation:"may-use",to:"system.creation"}),
 Object.freeze({from:"system.studio",relation:"may-use",to:"system.language"}),
 Object.freeze({from:"system.language",relation:"composes-with",to:"system.creation"}),
 Object.freeze({from:"system.language.human",relation:"is-a",to:"system.language"}),
 Object.freeze({from:"system.language.programming",relation:"is-a",to:"system.language"}),
 Object.freeze({from:"system.language.machine",relation:"is-a",to:"system.language"})
]);
 const TF_LANGUAGE_CREATION_FAMILIES_V36388=Object.freeze({
 human:"system.language.human",programming:"system.language.programming",machine:"system.language.machine"
});
function tfLanguageCreationContextV36388(family,spec={}){
 const target=TF_LANGUAGE_CREATION_FAMILIES_V36388[String(family??"").toLowerCase()];
 if(!target)throw new Error("[TF:system.language:invalid-family] Human, programming, or machine language family required.");
 const name=String(spec.name??"").trim();if(!name)throw new Error("[TF:system.creation:missing-name] Language name required.");
 return Object.freeze({system:"system.context",type:"language-creation-context",studio:"system.studio",language:"system.language",creation:"system.creation",
  targetFamily:target,name,schema:"system.schema",defaults:"system.defaults",definition:Object.freeze({...spec,name}),constructed:true,
  registered:false,executable:false,hostMutation:false,persistence:false,externalEffect:false,authorityAmplification:false});
}
function tfLanguageCreationStudioSelfTestV36388(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.defaults","system.language","system.language.human","system.language.programming","system.language.machine","system.creation","system.studio","system.construction","system.context","system.schema"])if(!ids.has(id))missing.push(id);
 const u=tfUniversalSystemDefaultsFabricV36388(sourceText);if(u.systemsCovered!==ids.size||u.defaults!==ids.size||new Set(u.entries.map(x=>x.owner)).size!==ids.size)missing.push("defaults-coverage");
 for(const f of ["human","programming","machine"]){const c=tfLanguageCreationContextV36388(f,{name:"fixture-"+f});if(c.targetFamily!==TF_LANGUAGE_CREATION_FAMILIES_V36388[f]||!c.constructed||c.registered||c.executable||c.hostMutation||c.persistence||c.externalEffect||c.authorityAmplification)missing.push("language:"+f);}
 const r=tfSchemaDrivenReconstructionV36387(sourceText);if(r.count!==ids.size)missing.push("reconstruction");
 const eo=new Set(tfUniversalEngineFabricV36349(sourceText).engines.map(x=>x.owner)),so=new Set(tfUniversalServiceFabricV36351(sourceText).services.map(x=>x.owner)),seeded=new Set(tfCompactSystemSeedV36353(sourceText).entries.map(x=>x.id));
 for(const id of ["system.creation","system.studio"]){if(!eo.has(id))missing.push("engine:"+id);if(!so.has(id))missing.push("service:"+id);if(!seeded.has(id))missing.push("seed:"+id);}
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Language Creation Studio failed: "+[...new Set(missing)].join(",")+".");
 return Object.freeze({pass:true,newSystems:2,systemsCovered:ids.size,everySystemOwnDefaults:true,defaults:u.defaults,languageReused:true,humanLanguageReused:true,
  programmingLanguageReused:true,machineLanguageReused:true,creation:true,studio:true,languageCreationContexts:true,humanCreation:true,programmingCreation:true,machineCreation:true,
  automaticRegistration:false,automaticExecution:false,hostMutation:false,authorityAmplification:false,missing:0});
}
globalThis.TF_LANGUAGE_CREATION_STUDIO_SYSTEMS_V36388=TF_LANGUAGE_CREATION_STUDIO_SYSTEMS_V36388;globalThis.TF_LANGUAGE_CREATION_STUDIO_RELATIONSHIPS_V36388=TF_LANGUAGE_CREATION_STUDIO_RELATIONSHIPS_V36388;
globalThis.TF_SYSTEM_DEFAULTS_SCHEMA_V36388=TF_SYSTEM_DEFAULTS_SCHEMA_V36388;globalThis.tfSystemDefaultsV36388=tfSystemDefaultsV36388;globalThis.tfUniversalSystemDefaultsFabricV36388=tfUniversalSystemDefaultsFabricV36388;
globalThis.TF_LANGUAGE_CREATION_FAMILIES_V36388=TF_LANGUAGE_CREATION_FAMILIES_V36388;globalThis.tfLanguageCreationContextV36388=tfLanguageCreationContextV36388;
 return Object.freeze({TF_LANGUAGE_CREATION_STUDIO_SYSTEMS_V36388,TF_LANGUAGE_CREATION_STUDIO_RELATIONSHIPS_V36388,TF_LANGUAGE_CREATION_FAMILIES_V36388,tfLanguageCreationContextV36388,tfLanguageCreationStudioSelfTestV36388});
}
module.exports=Object.freeze({bindLanguageCreationStudioV04634});
