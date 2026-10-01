"use strict";
function bindEngineV04590(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.349: Universal System Engine / Constructive Compaction I === */
const TF_ENGINE_SYSTEM_V36349=Object.freeze({id:"system.engine",concept:"Engine",type:"execution-capability-system",
 mode:"system-scoped-inert-by-default",condition:"execution-operation-admitted",state:"ready"});
const TF_ENGINE_DEFAULTS_V36349=Object.freeze({privateByDefault:true,inertByDefault:true,automaticExecution:false,
 backgroundExecution:false,persistencePerformed:false,externalEffect:false,authorityGranted:false});
const TF_ENGINE_RELATIONSHIPS_V36349=Object.freeze([
 Object.freeze({from:"system.engine",relation:"uses",to:"system.execution"}),
 Object.freeze({from:"system.engine",relation:"coordinates-with",to:"system.worker"}),
 Object.freeze({from:"system.engine",relation:"may-use",to:"system.generator"}),
 Object.freeze({from:"system.engine",relation:"may-use",to:"system.automator"})
]);
function tfSystemEngineV36349(systemId,sourceText){
 const id=String(systemId??"");if(!id.startsWith("system."))throw new Error("[TF:system.engine:invalid-input] Canonical System identity required.");
 if(sourceText!=null&&!new Set(tfCanonicalSystemIdsV36196(String(sourceText))).has(id))throw new Error("[TF:system.engine:not-found] Canonical System not found: "+id+".");
 return Object.freeze({system:"system.engine",owner:id,engineId:id+"::engine",...TF_ENGINE_DEFAULTS_V36349});
}
function tfUniversalEngineFabricV36349(sourceText){
 const systems=tfCanonicalSystemIdsV36196(sourceText);
 return Object.freeze({system:"system.engine",systemsCovered:systems.length,engines:Object.freeze(systems.map(id=>tfSystemEngineV36349(id))),
  schema:TF_ENGINE_DEFAULTS_V36349,materialization:"derived-shared-schema",automaticExecution:false,authorityGranted:false});
}
function tfEngineSelfTestV36349(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.engine","system.execution","system.worker","system.generator","system.automator"])if(!ids.has(id))missing.push(id);
 const fabric=tfUniversalEngineFabricV36349(sourceText),systems=[...ids];
 if(fabric.engines.length!==systems.length)missing.push("engine-coverage");
 const owners=new Set(fabric.engines.map(x=>x.owner)),engineIds=new Set(fabric.engines.map(x=>x.engineId));
 for(const id of systems)if(!owners.has(id))missing.push("owner:"+id);
 if(engineIds.size!==systems.length)missing.push("engine-identity-uniqueness");
 if(fabric.engines.some(x=>!x.privateByDefault||!x.inertByDefault||x.automaticExecution||x.backgroundExecution||x.persistencePerformed||x.externalEffect||x.authorityGranted))missing.push("engine-boundary");
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Universal Engine qualification failed: "+[...new Set(missing)].slice(0,32).join(",")+".");
 return Object.freeze({pass:true,newSystems:1,engine:true,systemsCovered:systems.length,engines:systems.length,everySystemOwnEngine:true,
  sharedImmutableSchema:true,perSystemCodeDuplication:false,privateByDefault:true,inertByDefault:true,automaticExecution:false,
  backgroundExecution:false,persistencePerformed:false,externalEffect:false,authorityAmplification:false,missing:0});
}
globalThis.TF_ENGINE_SYSTEM_V36349=TF_ENGINE_SYSTEM_V36349;
globalThis.TF_ENGINE_DEFAULTS_V36349=TF_ENGINE_DEFAULTS_V36349;
globalThis.TF_ENGINE_RELATIONSHIPS_V36349=TF_ENGINE_RELATIONSHIPS_V36349;
globalThis.tfSystemEngineV36349=tfSystemEngineV36349;
globalThis.tfUniversalEngineFabricV36349=tfUniversalEngineFabricV36349;
 return Object.freeze({TF_ENGINE_SYSTEM_V36349,TF_ENGINE_DEFAULTS_V36349,TF_ENGINE_RELATIONSHIPS_V36349,tfSystemEngineV36349,tfUniversalEngineFabricV36349,tfEngineSelfTestV36349});
}
module.exports=Object.freeze({bindEngineV04590});
