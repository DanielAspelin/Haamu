"use strict";
const SYSTEM=Object.freeze({id:"system.loop",concept:"Loop",authorityGranted:false,scaffold:true});
function bindLoopV04507(){return Object.freeze({SYSTEM});}

function bindLoopRulingV04629(deps={}){
 const {tfSystemInstanceV36377,tfCanonicalSystemIdsV36196,tfUniversalEngineFabricV36349,tfUniversalServiceFabricV36351,tfCompactSystemSeedV36353,tfUniversalActiveSummaryFabricV36358}=deps;
 /* === Terraformer v0.36.383: Loop Invocation / Instantiation Ruling Fabric === */
const TF_LOOP_RULING_SYSTEMS_V36383=Object.freeze([{"id":"system.while-looping","concept":"While Looping","type":"while-loop-process-system"},{"id":"system.for-looping","concept":"For Looping","type":"for-loop-process-system"},{"id":"system.for-each-looping","concept":"For Each Looping","type":"for-each-loop-process-system"},{"id":"system.while-looper","concept":"While Looper","type":"while-loop-actor-system"},{"id":"system.for-looper","concept":"For Looper","type":"for-loop-actor-system"},{"id":"system.for-each-looper","concept":"For Each Looper","type":"for-each-loop-actor-system"},{"id":"system.ruling","concept":"Ruling","type":"rule-application-process-system"}]);

const TF_LOOP_RULING_RELATIONSHIPS_V36383=Object.freeze([
 Object.freeze({from:"system.while-looping",relation:"is-a",to:"system.looping"}),Object.freeze({from:"system.while-looper",relation:"part-of",to:"system.while-looping"}),
 Object.freeze({from:"system.for-looping",relation:"is-a",to:"system.looping"}),Object.freeze({from:"system.for-looper",relation:"part-of",to:"system.for-looping"}),
 Object.freeze({from:"system.for-each-looping",relation:"is-a",to:"system.looping"}),Object.freeze({from:"system.for-each-looper",relation:"part-of",to:"system.for-each-looping"}),
 Object.freeze({from:"system.ruling",relation:"applies",to:"system.rule"}),Object.freeze({from:"system.loop",relation:"admits",to:"system.invocation"}),
 Object.freeze({from:"system.loop",relation:"admits",to:"system.execution"}),Object.freeze({from:"system.loop",relation:"admits-executable",to:"system.instantiation"})
]);
const TF_LOOP_INVOCATION_RULE_V36383=Object.freeze({schema:"TERRAFORMER-LOOP-INVOCATION-RULE/1",ruleSystem:"system.rule",rulingSystem:"system.ruling",
 invocationRequiresLoop:true,executionRequiresLoop:true,executableInstantiationRequiresLoop:true,functionDefinitionRequiresLoop:false,
 systemDefinitionRequiresLoop:false,bootstrapException:true,bootstrapExceptionSystem:"system.bootstrap",authorityAmplification:false});
function tfLoopContextV36383(kind,owner){
 const map=Object.freeze({"while":"system.while-looping","for":"system.for-looping","for-each":"system.for-each-looping"}),system=map[kind];
 if(!system)throw new Error("[TF:system.loop:invalid-kind] while, for, or for-each required.");
 return Object.freeze({system:"system.loop",loopingSystem:system,kind,owner:String(owner??system),active:true,admitted:true});
}
function tfLoopInvokeV36383(loopContext,instance,fn,args=[]){
 if(!loopContext?.active||!loopContext?.admitted||loopContext.system!=="system.loop")throw new Error("[TF:system.rule:loop-required] Function invocation requires admitted Loop context.");
 if(!instance?.instantiated||!instance?.initialized)throw new Error("[TF:system.instantiation:admission-denied] Executable Instance required.");
 if(typeof fn!=="function")throw new Error("[TF:system.function:invalid-input] Callable Function required.");
 const parameters=Object.freeze(Array.isArray(args)?[...args]:[args]),value=fn(...parameters);
 return Object.freeze({system:"system.invocation",loop:loopContext.kind,instance:instance.id,parameters,return:Object.freeze({system:"system.return",value}),complete:true});
}
function tfLoopExecutableInstantiationV36383(loopContext,owner,generation=0){
 if(!loopContext?.active||!loopContext?.admitted||loopContext.system!=="system.loop")throw new Error("[TF:system.rule:loop-required] Executable Instantiation requires admitted Loop context.");
 return tfSystemInstanceV36377(owner,generation);
}
function tfLoopRulingSelfTestV36383(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[],added=TF_LOOP_RULING_SYSTEMS_V36383.map(x=>x.id);
 for(const id of [...added,"system.loop","system.looping","system.looper","system.rule","system.function","system.invocation","system.instantiation","system.execution","system.bootstrap"])if(!ids.has(id))missing.push(id);
 for(const kind of ["while","for","for-each"]){const lc=tfLoopContextV36383(kind,"fixture"),inst=tfLoopExecutableInstantiationV36383(lc,"system.function"),r=tfLoopInvokeV36383(lc,inst,x=>x+1,[1]);if(r.return.value!==2||!r.complete)missing.push("loop:"+kind);}
 let invocationDenied=false,instantiationDenied=false;try{tfLoopInvokeV36383(null,tfSystemInstanceV36377("system.function"),x=>x,[1]);}catch(_){invocationDenied=true;}
 try{tfLoopExecutableInstantiationV36383(null,"system.function");}catch(_){instantiationDenied=true;}
 if(!invocationDenied)missing.push("invocation-outside-loop");if(!instantiationDenied)missing.push("instantiation-outside-loop");
 const eo=new Set(tfUniversalEngineFabricV36349(sourceText).engines.map(x=>x.owner)),so=new Set(tfUniversalServiceFabricV36351(sourceText).services.map(x=>x.owner)),seeded=new Set(tfCompactSystemSeedV36353(sourceText).entries.map(x=>x.id)),summaries=new Set(tfUniversalActiveSummaryFabricV36358(sourceText).summaries.map(x=>x.owner));
 for(const id of added){if(!eo.has(id))missing.push("engine:"+id);if(!so.has(id))missing.push("service:"+id);if(!seeded.has(id))missing.push("seed:"+id);if(!summaries.has(id))missing.push("summary:"+id);}
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Loop ruling failed: "+[...new Set(missing)].slice(0,64).join(",")+".");
 return Object.freeze({pass:true,newSystems:7,whileLooping:true,forLooping:true,forEachLooping:true,whileLooper:true,forLooper:true,forEachLooper:true,ruling:true,
  invocationRequiresLoop:true,executableInstantiationRequiresLoop:true,functionDefinitionRequiresLoop:false,systemDefinitionRequiresLoop:false,bootstrapException:true,
  invocationOutsideLoopDenied:true,executableInstantiationOutsideLoopDenied:true,authorityAmplification:false,missing:0});
}
globalThis.TF_LOOP_RULING_SYSTEMS_V36383=TF_LOOP_RULING_SYSTEMS_V36383;
globalThis.TF_LOOP_RULING_RELATIONSHIPS_V36383=TF_LOOP_RULING_RELATIONSHIPS_V36383;
globalThis.TF_LOOP_INVOCATION_RULE_V36383=TF_LOOP_INVOCATION_RULE_V36383;
globalThis.tfLoopContextV36383=tfLoopContextV36383;globalThis.tfLoopInvokeV36383=tfLoopInvokeV36383;
globalThis.tfLoopExecutableInstantiationV36383=tfLoopExecutableInstantiationV36383;
 return Object.freeze({TF_LOOP_RULING_SYSTEMS_V36383,TF_LOOP_RULING_RELATIONSHIPS_V36383,TF_LOOP_INVOCATION_RULE_V36383,tfLoopContextV36383,tfLoopInvokeV36383,tfLoopExecutableInstantiationV36383,tfLoopRulingSelfTestV36383});
}

module.exports=Object.freeze({bindLoopV04507,bindLoopRulingV04629});
