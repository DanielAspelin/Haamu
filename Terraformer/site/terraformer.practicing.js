"use strict";
function bindPracticeMLNeuralV0461(deps={}){
 const {tfCanonicalSystemIdsV36196,tfUniversalEngineFabricV36349,tfUniversalServiceFabricV36351,tfCompactSystemSeedV36353,tfUniversalActiveSummaryFabricV36358}=deps;
 /* === Terraformer v0.36.360: Practicing / Machine Learning / Neural Networking Context Fabric === */
const TF_PRACTICE_ML_NEURAL_SYSTEMS_V36360=Object.freeze([{"id":"system.practicing","concept":"Practicing","type":"practice-process-system"},{"id":"system.practitioner","concept":"Practitioner","type":"practice-actor-system"},{"id":"system.machine-learning","concept":"Machine Learning","type":"composed-learning-context-system"},{"id":"system.networking","concept":"Networking","type":"network-process-system"},{"id":"system.neural-network","concept":"Neural Network","type":"neural-network-structure-system"},{"id":"system.neural-networking","concept":"Neural Networking","type":"composed-neural-network-context-system"}]);

const TF_PRACTICE_ML_NEURAL_RELATIONSHIPS_V36360=Object.freeze([
 Object.freeze({from:"system.practicing",relation:"uses",to:"system.practice"}),
 Object.freeze({from:"system.practitioner",relation:"part-of",to:"system.practicing"}),
 Object.freeze({from:"system.machine-learning",relation:"composes",to:"system.machine"}),
 Object.freeze({from:"system.machine-learning",relation:"composes",to:"system.learning"}),
 Object.freeze({from:"system.machine-learning",relation:"uses",to:"system.context"}),
 Object.freeze({from:"system.networking",relation:"uses",to:"system.network"}),
 Object.freeze({from:"system.neural-network",relation:"composes",to:"system.neural"}),
 Object.freeze({from:"system.neural-network",relation:"composes",to:"system.network"}),
 Object.freeze({from:"system.neural-networking",relation:"uses",to:"system.neural-network"}),
 Object.freeze({from:"system.neural-networking",relation:"uses",to:"system.networking"}),
 Object.freeze({from:"system.neural-networking",relation:"uses",to:"system.context"})
]);
function tfComposedContextV36360(kind,spec={}){
 const defs={
  "machine-learning":{system:"system.machine-learning",components:["system.machine","system.learning"]},
  "neural-networking":{system:"system.neural-networking",components:["system.neural","system.network","system.networking"]}
 },d=defs[String(kind??"").toLowerCase()];
 if(!d)throw new Error("[TF:system.context:invalid-input] Machine Learning or Neural Networking context required.");
 return Object.freeze({system:d.system,context:"system.context",components:Object.freeze(d.components),subject:spec.subject??null,
  contextualComposition:true,trainingPerformed:false,inferencePerformed:false,networkMutation:false,automaticExecution:false,
  persistencePerformed:false,externalEffect:false,authorityGranted:false});
}
function tfPracticingPlanV36360(spec={}){
 return Object.freeze({system:"system.practicing",actor:"system.practitioner",practice:"system.practice",subject:spec.subject??null,
  planOnly:true,practicePerformed:false,automaticExecution:false,persistencePerformed:false,externalEffect:false,authorityGranted:false});
}
function tfPracticeMLNeuralSelfTestV36360(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[],added=TF_PRACTICE_ML_NEURAL_SYSTEMS_V36360.map(x=>x.id);
 for(const id of [...added,"system.practice","system.machine","system.learning","system.neural","system.network","system.context","system.engine","system.service","system.seed","system.summary"])if(!ids.has(id))missing.push(id);
 const p=tfPracticingPlanV36360({subject:"fixture"});if(!p.planOnly||p.practicePerformed||p.automaticExecution||p.authorityGranted)missing.push("practicing-boundary");
 for(const k of ["machine-learning","neural-networking"]){const c=tfComposedContextV36360(k,{subject:"fixture"});if(!c.contextualComposition||c.trainingPerformed||c.inferencePerformed||c.networkMutation||c.automaticExecution||c.authorityGranted)missing.push("context-boundary:"+k);}
 const eo=new Set(tfUniversalEngineFabricV36349(sourceText).engines.map(x=>x.owner)),so=new Set(tfUniversalServiceFabricV36351(sourceText).services.map(x=>x.owner)),seeded=new Set(tfCompactSystemSeedV36353(sourceText).entries.map(x=>x.id));
 for(const id of added){if(!eo.has(id))missing.push("engine:"+id);if(!so.has(id))missing.push("service:"+id);if(!seeded.has(id))missing.push("seed:"+id);}
 const summaries=new Set(tfUniversalActiveSummaryFabricV36358(sourceText).summaries.map(x=>x.owner));for(const id of added)if(!summaries.has(id))missing.push("summary:"+id);
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Practice / ML / Neural qualification failed: "+[...new Set(missing)].join(",")+".");
 return Object.freeze({pass:true,newSystems:added.length,practiceReused:true,machineReused:true,learningReused:true,neuralReused:true,networkReused:true,
  practicing:true,practitioner:true,machineLearningContext:true,networking:true,neuralNetwork:true,neuralNetworkingContext:true,
  systemsWithEngines:added.length,systemsWithServices:added.length,systemsInCompactSeed:added.length,systemsWithActiveSummaries:added.length,
  automaticTraining:false,automaticInference:false,automaticNetworkMutation:false,authorityAmplification:false,missing:0});
}
globalThis.TF_PRACTICE_ML_NEURAL_SYSTEMS_V36360=TF_PRACTICE_ML_NEURAL_SYSTEMS_V36360;
globalThis.TF_PRACTICE_ML_NEURAL_RELATIONSHIPS_V36360=TF_PRACTICE_ML_NEURAL_RELATIONSHIPS_V36360;
globalThis.tfComposedContextV36360=tfComposedContextV36360;
globalThis.tfPracticingPlanV36360=tfPracticingPlanV36360;
 return Object.freeze({TF_PRACTICE_ML_NEURAL_SYSTEMS_V36360,TF_PRACTICE_ML_NEURAL_RELATIONSHIPS_V36360,tfComposedContextV36360,tfPracticingPlanV36360,tfPracticeMLNeuralSelfTestV36360});
}
module.exports=Object.freeze({bindPracticeMLNeuralV0461});
