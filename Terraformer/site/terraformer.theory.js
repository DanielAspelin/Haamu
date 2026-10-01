"use strict";
function bindTheoryPracticeV0460(deps={}){
 const {tfCanonicalSystemIdsV36196,tfUniversalEngineFabricV36349,tfUniversalServiceFabricV36351,tfCompactSystemSeedV36353,tfUniversalActiveSummaryFabricV36358}=deps;
 /* === Terraformer v0.36.359: Theory / Practice Fabric === */
const TF_THEORY_PRACTICE_SYSTEMS_V36359=Object.freeze([
 Object.freeze({id:"system.theory",concept:"Theory",type:"conceptual-explanatory-system",mode:"model-and-explanation",condition:"theoretical-context-admitted",state:"ready"}),
 Object.freeze({id:"system.practice",concept:"Practice",type:"applied-operational-context-system",mode:"application-and-exercise",condition:"practice-context-admitted",state:"ready"})
]);
const TF_THEORY_PRACTICE_RELATIONSHIPS_V36359=Object.freeze([
 Object.freeze({from:"system.theory",relation:"may-use",to:"system.evidence"}),
 Object.freeze({from:"system.theory",relation:"may-use",to:"system.knowledge"}),
 Object.freeze({from:"system.practice",relation:"may-use",to:"system.theory"}),
 Object.freeze({from:"system.practice",relation:"may-produce",to:"system.evidence"}),
 Object.freeze({from:"system.theory",relation:"distinct-from",to:"system.practice"})
]);
function tfTheoryPracticePlanV36359(kind,spec={}){
 const id="system."+String(kind??"").toLowerCase();
 if(id!=="system.theory"&&id!=="system.practice")throw new Error("[TF:system.theory:invalid-input] Theory or Practice required.");
 return Object.freeze({system:id,subject:spec.subject??null,evidence:spec.evidence??null,theory:spec.theory??null,
  planOnly:true,truthClaimed:false,practicePerformed:false,externalEffect:false,persistencePerformed:false,authorityGranted:false});
}
function tfTheoryPracticeSelfTestV36359(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[],added=["system.theory","system.practice"];
 for(const id of [...added,"system.evidence","system.knowledge","system.summary","system.engine","system.service","system.seed"])if(!ids.has(id))missing.push(id);
 for(const k of ["theory","practice"]){const p=tfTheoryPracticePlanV36359(k,{subject:"fixture"});if(!p.planOnly||p.truthClaimed||p.practicePerformed||p.externalEffect||p.persistencePerformed||p.authorityGranted)missing.push("boundary:"+k);}
 const eo=new Set(tfUniversalEngineFabricV36349(sourceText).engines.map(x=>x.owner)),so=new Set(tfUniversalServiceFabricV36351(sourceText).services.map(x=>x.owner)),seeded=new Set(tfCompactSystemSeedV36353(sourceText).entries.map(x=>x.id));
 for(const id of added){if(!eo.has(id))missing.push("engine:"+id);if(!so.has(id))missing.push("service:"+id);if(!seeded.has(id))missing.push("seed:"+id);}
 const summaries=tfUniversalActiveSummaryFabricV36358(sourceText);if(!summaries.summaries.some(x=>x.owner==="system.theory")||!summaries.summaries.some(x=>x.owner==="system.practice"))missing.push("summary-coverage");
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Theory / Practice qualification failed: "+[...new Set(missing)].join(",")+".");
 return Object.freeze({pass:true,newSystems:2,theory:true,practice:true,distinct:true,reciprocalEvidenceRelationship:true,
  systemsWithEngines:2,systemsWithServices:2,systemsInCompactSeed:2,systemsWithActiveSummaries:2,
  automaticTruthClaim:false,automaticPractice:false,authorityAmplification:false,missing:0});
}
globalThis.TF_THEORY_PRACTICE_SYSTEMS_V36359=TF_THEORY_PRACTICE_SYSTEMS_V36359;
globalThis.TF_THEORY_PRACTICE_RELATIONSHIPS_V36359=TF_THEORY_PRACTICE_RELATIONSHIPS_V36359;
globalThis.tfTheoryPracticePlanV36359=tfTheoryPracticePlanV36359;
 return Object.freeze({TF_THEORY_PRACTICE_SYSTEMS_V36359,TF_THEORY_PRACTICE_RELATIONSHIPS_V36359,tfTheoryPracticePlanV36359,tfTheoryPracticeSelfTestV36359});
}
module.exports=Object.freeze({bindTheoryPracticeV0460});

/* Terraformer v0.48.13: qualified immutable depth-0 declaration migration. */
const TF_SYSTEM_THEORY_FORMS_V36437=Object.freeze(["identity","composition","operation","boundary","lifecycle","qualification"]);
