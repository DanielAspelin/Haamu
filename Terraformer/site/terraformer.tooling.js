"use strict";
function bindToolingV04619(deps={}){
 const {tfCanonicalSystemIdsV36196,tfUniversalEngineFabricV36349,tfUniversalServiceFabricV36351,tfCompactSystemSeedV36353,tfUniversalActiveSummaryFabricV36358}=deps;
 /* === Terraformer v0.36.375: Tooling / Tooler Fabric === */
const TF_TOOLING_SYSTEMS_V36375=Object.freeze([{"id":"system.tooling","concept":"Tooling","type":"tool-application-process-system"},{"id":"system.tooler","concept":"Tooler","type":"tooling-actor-system"}]);

const TF_TOOLING_RELATIONSHIPS_V36375=Object.freeze([
 Object.freeze({from:"system.tooling",relation:"uses",to:"system.tool"}),
 Object.freeze({from:"system.tooler",relation:"part-of",to:"system.tooling"}),
 Object.freeze({from:"system.tooling",relation:"may-use",to:"system.working"}),
 Object.freeze({from:"system.tooling",relation:"may-use",to:"system.making"}),
 Object.freeze({from:"system.tooling",relation:"may-use",to:"system.construction"})
]);
function tfToolingPlanV36375(kind,spec={}){
 const map={tool:"system.tool",tooling:"system.tooling",tooler:"system.tooler"},id=map[String(kind??"").toLowerCase()];
 if(!id)throw new Error("[TF:system.tool:invalid-input] Tool, Tooling, or Tooler required.");
 return Object.freeze({system:id,subject:spec.subject??null,tool:spec.tool??null,planOnly:true,toolExecuted:false,
  systemMutated:false,persistencePerformed:false,externalEffect:false,authorityGranted:false});
}
function tfToolingSelfTestV36375(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[],added=TF_TOOLING_SYSTEMS_V36375.map(x=>x.id);
 for(const id of [...added,"system.tool","system.working","system.worker","system.making","system.maker","system.construction","system.summary","system.engine","system.service","system.seed"])if(!ids.has(id))missing.push(id);
 for(const k of ["tool","tooling","tooler"]){const p=tfToolingPlanV36375(k,{subject:"fixture",tool:"fixture-tool"});if(!p.planOnly||p.toolExecuted||p.systemMutated||p.authorityGranted)missing.push("boundary:"+k);}
 const eo=new Set(tfUniversalEngineFabricV36349(sourceText).engines.map(x=>x.owner)),so=new Set(tfUniversalServiceFabricV36351(sourceText).services.map(x=>x.owner)),seeded=new Set(tfCompactSystemSeedV36353(sourceText).entries.map(x=>x.id)),summaries=new Set(tfUniversalActiveSummaryFabricV36358(sourceText).summaries.map(x=>x.owner));
 for(const id of added){if(!eo.has(id))missing.push("engine:"+id);if(!so.has(id))missing.push("service:"+id);if(!seeded.has(id))missing.push("seed:"+id);if(!summaries.has(id))missing.push("summary:"+id);}
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Tooling / Tooler qualification failed: "+[...new Set(missing)].join(",")+".");
 return Object.freeze({pass:true,newSystems:2,toolReused:true,tooling:true,tooler:true,toolingUsesTool:true,toolerPartOfTooling:true,
  systemsWithEngines:2,systemsWithServices:2,systemsInCompactSeed:2,systemsWithActiveSummaries:2,
  toolExecuted:false,systemMutation:false,authorityAmplification:false,missing:0});
}
globalThis.TF_TOOLING_SYSTEMS_V36375=TF_TOOLING_SYSTEMS_V36375;
globalThis.TF_TOOLING_RELATIONSHIPS_V36375=TF_TOOLING_RELATIONSHIPS_V36375;
globalThis.tfToolingPlanV36375=tfToolingPlanV36375;
 return Object.freeze({TF_TOOLING_SYSTEMS_V36375,TF_TOOLING_RELATIONSHIPS_V36375,tfToolingPlanV36375,tfToolingSelfTestV36375});
}
module.exports=Object.freeze({bindToolingV04619});
