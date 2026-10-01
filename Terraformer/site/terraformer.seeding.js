"use strict";
function bindSeedingV04594(deps={}){
 const {tfCanonicalSystemIdsV36196,tfUniversalEngineFabricV36349,tfUniversalServiceFabricV36351}=deps;
 /* === Terraformer v0.36.353: Seeding / Seeder + Generative Bootstrap & Compact System Seed I === */
const TF_SEED_SYSTEMS_V36353=Object.freeze([
 Object.freeze({id:"system.seed",concept:"Seed",type:"compact-reconstruction-definition-system",mode:"canonical-seed",condition:"seed-schema-valid",state:"ready"}),
 Object.freeze({id:"system.seeding",concept:"Seeding",type:"construction-process-system",mode:"canonical-seed-construction",condition:"seeding-operation-admitted",state:"ready"}),
 Object.freeze({id:"system.seeder",concept:"Seeder",type:"process-actor-system",mode:"seeding-actor",condition:"seeding-operation-admitted",state:"ready"})
]);
const TF_SEED_RELATIONSHIPS_V36353=Object.freeze([
 Object.freeze({from:"system.seeder",relation:"part-of",to:"system.seeding"}),
 Object.freeze({from:"system.seeding",relation:"produces-plan-for",to:"system.seed"}),
 Object.freeze({from:"system.seed",relation:"used-by",to:"system.bootstrap"}),
 Object.freeze({from:"system.seed",relation:"may-use",to:"system.registry"}),
 Object.freeze({from:"system.seed",relation:"may-use",to:"system.generator"})
]);
const TF_COMPACT_SYSTEM_SEED_SCHEMA_V36353=Object.freeze({
 version:1,required:Object.freeze(["id"]),derived:Object.freeze(["uuid","type","mode","condition","state","engine","service","worker","generator","automator","pool","farmer","agents","assurance","ports","logging","reporting"]),
 authority:"preserve-bounded-authority",persistence:"volatile-expansion-by-default"
});
function tfSeedPlanV36353(spec={}){
 const ids=Array.isArray(spec.systemIds)?spec.systemIds.map(String):[];
 return Object.freeze({system:"system.seeding",actor:"system.seeder",artifact:"system.seed",systemIds:Object.freeze([...ids]),
  schema:TF_COMPACT_SYSTEM_SEED_SCHEMA_V36353,planOnly:true,expansionPerformed:false,sourceDeletion:false,
  historicalRewrite:false,persistencePerformed:false,authorityGranted:false});
}
function tfCompactSystemSeedV36353(sourceText){
 const ids=tfCanonicalSystemIdsV36196(sourceText);
 return Object.freeze({system:"system.seed",format:"terraformer-compact-system-seed/v1",count:ids.length,
  entries:Object.freeze(ids.map(id=>Object.freeze({id}))),schema:TF_COMPACT_SYSTEM_SEED_SCHEMA_V36353});
}
function tfExpandCompactSystemSeedV36353(seed,sourceText){
 if(!seed||seed.system!=="system.seed"||!Array.isArray(seed.entries))throw new Error("[TF:system.seed:invalid-input] Canonical compact System Seed required.");
 const canonical=new Set(tfCanonicalSystemIdsV36196(sourceText));
 const systems=seed.entries.map(x=>String(x.id));
 for(const id of systems)if(!canonical.has(id))throw new Error("[TF:system.seed:not-found] Seed references noncanonical System: "+id+".");
 const engineByOwner=new Map(tfUniversalEngineFabricV36349(sourceText).engines.map(x=>[x.owner,x]));
 const serviceByOwner=new Map(tfUniversalServiceFabricV36351(sourceText).services.map(x=>[x.owner,x]));
 return Object.freeze({system:"system.bootstrap",source:"system.seed",count:systems.length,
  systems:Object.freeze(systems.map(id=>Object.freeze({id,engine:engineByOwner.get(id),service:serviceByOwner.get(id),
   workerId:id+"::worker",generatorId:id+"::generator",automatorId:id+"::automator",poolId:id+"::pool",farmerId:id+"::farmer",
   assurance:Object.freeze(["examiner","inspector","validator","qualifier","verifier","tester"].map(role=>id+"::"+role)),
   logging:"system.logging",reporting:"system.reporting"}))),
  volatile:true,deterministic:true,automaticExecution:false,persistencePerformed:false,authorityGranted:false});
}
function tfGenerativeBootstrapSelfTestV36353(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.seed","system.seeding","system.seeder","system.bootstrap","system.generator","system.engine","system.service","system.registry"])if(!ids.has(id))missing.push(id);
 const seed=tfCompactSystemSeedV36353(sourceText),expanded=tfExpandCompactSystemSeedV36353(seed,sourceText),canonical=[...ids];
 const seeded=new Set(seed.entries.map(x=>x.id)),generated=new Set(expanded.systems.map(x=>x.id));
 if(seed.count!==canonical.length||expanded.count!==canonical.length)missing.push("coverage-count");
 for(const id of canonical){if(!seeded.has(id))missing.push("seed:"+id);if(!generated.has(id))missing.push("expanded:"+id);}
 if(expanded.systems.some(x=>!x.engine||!x.service||!x.workerId||!x.generatorId||!x.automatorId||!x.poolId||!x.farmerId||x.assurance.length!==6))missing.push("derived-fabric");
 if(!expanded.volatile||!expanded.deterministic||expanded.automaticExecution||expanded.persistencePerformed||expanded.authorityGranted)missing.push("bootstrap-boundary");
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Generative Bootstrap qualification failed: "+[...new Set(missing)].slice(0,32).join(",")+".");
 return Object.freeze({pass:true,newSystems:3,seed:true,seeding:true,seeder:true,canonicalSystems:canonical.length,seedEntries:seed.count,
  expandedSystems:expanded.count,coverageEquivalent:true,enginesGenerated:true,servicesGenerated:true,workersGenerated:true,
  generatorsGenerated:true,automatorsGenerated:true,poolsGenerated:true,farmersGenerated:true,assuranceGenerated:true,
  deterministic:true,volatileExpansion:true,sourceDeletion:false,historicalRewrite:false,automaticExecution:false,
  authorityAmplification:false,missing:0});
}
globalThis.TF_SEED_SYSTEMS_V36353=TF_SEED_SYSTEMS_V36353;
globalThis.TF_SEED_RELATIONSHIPS_V36353=TF_SEED_RELATIONSHIPS_V36353;
globalThis.TF_COMPACT_SYSTEM_SEED_SCHEMA_V36353=TF_COMPACT_SYSTEM_SEED_SCHEMA_V36353;
globalThis.tfSeedPlanV36353=tfSeedPlanV36353;
globalThis.tfCompactSystemSeedV36353=tfCompactSystemSeedV36353;
globalThis.tfExpandCompactSystemSeedV36353=tfExpandCompactSystemSeedV36353;
 return Object.freeze({TF_SEED_SYSTEMS_V36353,TF_SEED_RELATIONSHIPS_V36353,TF_COMPACT_SYSTEM_SEED_SCHEMA_V36353,tfSeedPlanV36353,tfCompactSystemSeedV36353,tfExpandCompactSystemSeedV36353,tfGenerativeBootstrapSelfTestV36353});
}
module.exports=Object.freeze({bindSeedingV04594});
