"use strict";
const SYSTEM=Object.freeze({id:"system.position",concept:"Position",authorityGranted:false,scaffold:true});
function bindPositionV04525(){return Object.freeze({SYSTEM});}

function bindPositionWeatherForecastV04525(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.291: Position / Weather / Forecast Fabric === */
const TF_POSITION_WEATHER_SYSTEMS_V36291=Object.freeze([
 Object.freeze({id:"system.position",concept:"Position",type:"spatial-or-logical-entity",mode:"contextual",condition:"reference-frame-identified",state:"ready"}),
 Object.freeze({id:"system.positioning",concept:"Positioning",type:"position-process",mode:"bounded",condition:"reference-and-subject-identified",state:"ready",entity:"system.position"}),
 Object.freeze({id:"system.positioner",concept:"Positioner",type:"actor-role",mode:"positioning",condition:"assigned",state:"ready",process:"system.positioning"}),
 Object.freeze({id:"system.weather",concept:"Weather",type:"environmental-context-system",mode:"observational",condition:"time-and-location-context-identified",state:"ready"}),
 Object.freeze({id:"system.forecast",concept:"Forecast",type:"future-estimate-system",mode:"evidence-model",condition:"forecast-domain-and-horizon-identified",state:"ready"})
]);
const TF_POSITION_WEATHER_RELATIONSHIPS_V36291=Object.freeze([
 Object.freeze({from:"system.positioning",relation:"produces",to:"system.position"}),
 Object.freeze({from:"system.positioner",relation:"invokes",to:"system.positioning"}),
 Object.freeze({from:"system.weather",relation:"uses",to:"system.position"}),
 Object.freeze({from:"system.forecast",relation:"uses",to:"system.weather"}),
 Object.freeze({from:"system.forecast",relation:"communicates-with",to:"system.prediction"}),
 Object.freeze({from:"system.prediction",relation:"communicates-with",to:"system.forecast"})
]);
function tfPositioningPlanV36291(spec={}){
 const reference=String(spec.reference??""),subject=String(spec.subject??"");
 return Object.freeze({system:"system.positioning",reference,subject,admitted:reference.length>0&&subject.length>0,position:null,executes:false,mutates:false,authorityGranted:false});
}
function tfForecastContextV36291(spec={}){
 return Object.freeze({system:"system.forecast",domain:String(spec.domain??"weather"),locationContext:spec.locationContext??null,horizon:spec.horizon??null,evidence:spec.evidence??null,
  predictionBridge:"system.prediction",estimated:true,fact:false,executes:false,mutates:false,authorityGranted:false});
}
function tfPositionWeatherSelfTestV36291(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.position","system.positioning","system.positioner","system.weather","system.forecast","system.prediction","system.type","system.mode","system.condition","system.state"])if(!ids.has(id))missing.push(id);
 for(const x of TF_POSITION_WEATHER_SYSTEMS_V36291)for(const k of ["type","mode","condition","state"])if(!x[k])missing.push(x.id+":"+k);
 const p=tfPositioningPlanV36291({reference:"frame",subject:"entity"}),f=tfForecastContextV36291({domain:"weather",locationContext:"context",horizon:"future",evidence:"model"});
 if(!p.admitted||p.position!==null||p.executes||p.mutates||p.authorityGranted||!f.estimated||f.fact||f.executes||f.authorityGranted)missing.push("position-weather-boundary");
 if(missing.length)throw new Error("position/weather qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,position:true,positioning:true,positioner:true,weather:true,forecast:true,predictionBridge:true,forecastNotFact:true,positionNotGeolocationAuthority:true,executionPerformed:false,mutationPerformed:false,authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_POSITION_WEATHER_SYSTEMS_V36291,TF_POSITION_WEATHER_RELATIONSHIPS_V36291,tfPositioningPlanV36291,tfForecastContextV36291,tfPositionWeatherSelfTestV36291});
}
module.exports=Object.freeze({bindPositionV04525,bindPositionWeatherForecastV04525});

/* Terraformer v0.48.4: bridge-covered cross-owner migration. */
async function tfOXBlockDispositionV4094(block,decision={}){
 const v=await tfOXValidateBlockV4093(block);
 const x={boundary:"system.block",candidateId:block?.header?.blockId||"UNKNOWN",
  generation:block?.header?.generation,decisionId:decision.decisionId||"",provenance:decision.provenance||"block-validator"};
 if(!v.valid)return tfRejectV4094(x,v.errors);
 return tfAcceptV4094(x,{validated:true,qualified:decision.qualified!==false,policyAllows:decision.policyAllows===true});
}

async function tfBlockDispositionV4095(block,decision={}){
 const v=await tfValidateBlockV4095(block);
 const x={boundary:"system.block",candidateId:block?.header?.blockId||"UNKNOWN",generation:block?.header?.generation,
  decisionId:decision.decisionId||"",provenance:decision.provenance||"system.block::validator"};
 return v.valid?tfAcceptV4094(x,{validated:true,qualified:decision.qualified!==false,policyAllows:decision.policyAllows===true})
               :tfRejectV4094(x,v.errors);
}

/* Terraformer v0.48.14: qualified immutable depth-0 declaration migration. */
const TF_END_NODE_DISPOSITIONS_V4069=Object.freeze(["NATURALIZE","PROGRAM","ADMINISTRATION_BUSINESS","PROVENANCE","EVIDENCE","REFERENCE","QUARANTINE","RESIDUE"]);
