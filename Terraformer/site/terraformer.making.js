"use strict";
function bindMakingV04596(deps={}){
 const {tfCanonicalSystemIdsV36196,tfUniversalEngineFabricV36349,tfUniversalServiceFabricV36351,tfCompactSystemSeedV36353}=deps;
 /* === Terraformer v0.36.355: Making / Maker Fabric === */
const TF_MAKING_MAKER_SYSTEMS_V36355=Object.freeze([
 Object.freeze({id:"system.making",concept:"Making",type:"construction-process-system",mode:"making",condition:"making-operation-admitted",state:"ready"}),
 Object.freeze({id:"system.maker",concept:"Maker",type:"process-actor-system",mode:"making-actor",condition:"making-operation-admitted",state:"ready"})
]);
const TF_MAKING_MAKER_RELATIONSHIPS_V36355=Object.freeze([
 Object.freeze({from:"system.maker",relation:"part-of",to:"system.making"}),
 Object.freeze({from:"system.making",relation:"may-use",to:"system.construction"}),
 Object.freeze({from:"system.making",relation:"distinct-from",to:"system.manufacturing"}),
 Object.freeze({from:"system.making",relation:"distinct-from",to:"system.production"}),
 Object.freeze({from:"system.making",relation:"distinct-from",to:"system.generation"})
]);
function tfMakingPlanV36355(spec={}){
 return Object.freeze({system:"system.making",actor:"system.maker",subject:spec.subject??null,input:spec.input??null,output:spec.output??null,
  planOnly:true,artifactCreated:false,sourceMutated:false,manufacturingPerformed:false,productionPerformed:false,
  automaticExecution:false,persistencePerformed:false,externalEffect:false,authorityGranted:false});
}
function tfMakingMakerSelfTestV36355(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 const added=["system.making","system.maker"];
 for(const id of [...added,"system.construction","system.manufacturing","system.production","system.generation","system.seed","system.engine","system.service"])if(!ids.has(id))missing.push(id);
 const p=tfMakingPlanV36355({subject:"fixture"});
 if(!p.planOnly||p.artifactCreated||p.sourceMutated||p.manufacturingPerformed||p.productionPerformed||p.automaticExecution||p.persistencePerformed||p.externalEffect||p.authorityGranted)missing.push("making-boundary");
 const eo=new Set(tfUniversalEngineFabricV36349(sourceText).engines.map(x=>x.owner)),so=new Set(tfUniversalServiceFabricV36351(sourceText).services.map(x=>x.owner));
 const seeded=new Set(tfCompactSystemSeedV36353(sourceText).entries.map(x=>x.id));
 for(const id of added){if(!eo.has(id))missing.push("engine:"+id);if(!so.has(id))missing.push("service:"+id);if(!seeded.has(id))missing.push("seed:"+id);}
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Making / Maker qualification failed: "+[...new Set(missing)].join(",")+".");
 return Object.freeze({pass:true,newSystems:2,making:true,maker:true,makingDistinctFromManufacturing:true,makingDistinctFromProduction:true,
  makingDistinctFromGeneration:true,systemsWithEngines:2,systemsWithServices:2,systemsInCompactSeed:2,
  artifactCreationPerformed:false,sourceMutation:false,automaticExecution:false,authorityAmplification:false,missing:0});
}
globalThis.TF_MAKING_MAKER_SYSTEMS_V36355=TF_MAKING_MAKER_SYSTEMS_V36355;
globalThis.TF_MAKING_MAKER_RELATIONSHIPS_V36355=TF_MAKING_MAKER_RELATIONSHIPS_V36355;
globalThis.tfMakingPlanV36355=tfMakingPlanV36355;
 return Object.freeze({TF_MAKING_MAKER_SYSTEMS_V36355,TF_MAKING_MAKER_RELATIONSHIPS_V36355,tfMakingPlanV36355,tfMakingMakerSelfTestV36355});
}
module.exports=Object.freeze({bindMakingV04596});
