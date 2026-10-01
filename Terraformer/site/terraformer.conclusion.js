"use strict";
function bindDecisionConclusionV04595(deps={}){
 const {tfCanonicalSystemIdsV36196,tfUniversalEngineFabricV36349,tfUniversalServiceFabricV36351,tfCompactSystemSeedV36353}=deps;
 /* === Terraformer v0.36.354: Decision / Conclusion Reconciliation Fabric === */
const TF_DECISION_CONCLUSION_SYSTEMS_V36354=Object.freeze([
 Object.freeze({id:"system.conclusion",concept:"Conclusion",type:"reasoned-result-system",mode:"evidence-derived-result",condition:"conclusion-context-admitted",state:"ready"})
]);
const TF_DECISION_CONCLUSION_RELATIONSHIPS_V36354=Object.freeze([
 Object.freeze({from:"system.decision",relation:"may-use",to:"system.selection"}),
 Object.freeze({from:"system.conclusion",relation:"uses",to:"system.evidence"}),
 Object.freeze({from:"system.decision",relation:"may-use",to:"system.conclusion"}),
 Object.freeze({from:"system.conclusion",relation:"distinct-from",to:"system.decision"})
]);
function tfDecisionConclusionPlanV36354(kind,spec={}){
 const id="system."+String(kind??"").toLowerCase();
 if(id!=="system.decision"&&id!=="system.conclusion")throw new Error("[TF:system.decision:invalid-input] Decision or Conclusion required.");
 return Object.freeze({system:id,subject:spec.subject??null,evidence:spec.evidence??null,options:spec.options??null,
  planOnly:true,decisionPerformed:false,conclusionAsserted:false,externalEffect:false,persistencePerformed:false,authorityGranted:false});
}
function tfDecisionConclusionSelfTestV36354(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.decision","system.conclusion","system.selection","system.evidence","system.seed","system.engine","system.service"])if(!ids.has(id))missing.push(id);
 for(const k of ["decision","conclusion"]){const p=tfDecisionConclusionPlanV36354(k,{subject:"fixture"});if(!p.planOnly||p.decisionPerformed||p.conclusionAsserted||p.externalEffect||p.persistencePerformed||p.authorityGranted)missing.push("boundary:"+k);}
 const eo=new Set(tfUniversalEngineFabricV36349(sourceText).engines.map(x=>x.owner)),so=new Set(tfUniversalServiceFabricV36351(sourceText).services.map(x=>x.owner));
 for(const id of ["system.decision","system.conclusion"]){if(!eo.has(id))missing.push("engine:"+id);if(!so.has(id))missing.push("service:"+id);}
 const seed=tfCompactSystemSeedV36353(sourceText),seeded=new Set(seed.entries.map(x=>x.id));
 for(const id of ["system.decision","system.conclusion"])if(!seeded.has(id))missing.push("seed:"+id);
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Decision / Conclusion qualification failed: "+[...new Set(missing)].join(",")+".");
 return Object.freeze({pass:true,newSystems:1,decisionReused:true,conclusion:true,decisionDistinctFromConclusion:true,
  selectionReused:true,evidenceReused:true,systemsWithEngines:2,systemsWithServices:2,systemsInCompactSeed:2,
  consequentialDecisionAuthority:false,automaticDecision:false,automaticConclusionAssertion:false,authorityAmplification:false,missing:0});
}
globalThis.TF_DECISION_CONCLUSION_SYSTEMS_V36354=TF_DECISION_CONCLUSION_SYSTEMS_V36354;
globalThis.TF_DECISION_CONCLUSION_RELATIONSHIPS_V36354=TF_DECISION_CONCLUSION_RELATIONSHIPS_V36354;
globalThis.tfDecisionConclusionPlanV36354=tfDecisionConclusionPlanV36354;
 return Object.freeze({TF_DECISION_CONCLUSION_SYSTEMS_V36354,TF_DECISION_CONCLUSION_RELATIONSHIPS_V36354,tfDecisionConclusionPlanV36354,tfDecisionConclusionSelfTestV36354});
}
module.exports=Object.freeze({bindDecisionConclusionV04595});
