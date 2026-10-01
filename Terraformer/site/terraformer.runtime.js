'use strict';
const fs=require('fs'),path=require('path');
const ID='system.runtime', VERSION='0.47.32';
const STATES=Object.freeze(['INVOKED','VOLATILE','PERSISTENT','FAILED']);
const SELF_RUNTIME_SEMANTICS=Object.freeze({subject:'Terraformer',afterInvocation:'VOLATILE',retentionTransition:'SET_TO_PERSISTENCE',persistentState:'PERSISTENT',executionLifecycle:false,terminationLifecycle:false,externalProgramLifecycleUnchanged:true,authorityGranted:false});
function descriptor(){return Object.freeze({id:ID,version:VERSION,boundary:'SYSTEM_BOUNDARY',responsibility:'Terraformer self-runtime volatility/persistence lifecycle, admission, dispatch-state observation and failure boundary',authority:false,productionAuthority:false,nativeAuthority:false,qualification:'UNDER_CONDITIONAL_EXPERIMENT'});}
function loadLayers(){const p=path.join(__dirname,'terraformer.layers.json');const x=JSON.parse(fs.readFileSync(p,'utf8'));if(x.kind!=='LAYER_REGISTRY'||x.authority!==false||!Array.isArray(x.layers))throw new Error('INVALID_LAYER_REGISTRY');return x;}
function admit(req={}){if(!req||typeof req!=='object'||typeof req.id!=='string'||!req.id.trim())throw new TypeError('INVALID_RUNTIME_REQUEST');if(req.authorized!==true)return Object.freeze({admitted:false,state:'INVOKED',reason:'AUTHORIZATION_REQUIRED',authority:false});return Object.freeze({admitted:true,state:'VOLATILE',id:req.id,authority:false});}
function observe(state){if(!STATES.includes(state))throw new Error('INVALID_RUNTIME_STATE');return Object.freeze({state,observed:true,authority:false});}
function dispatch(req,handler){const a=admit(req);if(!a.admitted)return a;if(typeof handler!=='function')throw new TypeError('INVALID_RUNTIME_HANDLER');try{return Object.freeze({admitted:true,state:'VOLATILE',result:handler(req),authority:false});}catch(e){return Object.freeze({admitted:true,state:'FAILED',error:Object.freeze({name:e.name,message:e.message}),authority:false});}}
function setToPersistence(req={}){const pass=req.authorized===true&&req.qualified===true&&req.transactionAdmitted===true;return Object.freeze({pass,state:pass?'PERSISTENT':'VOLATILE',transition:pass?'SET_TO_PERSISTENCE':'PERSISTENCE_NOT_ADMITTED',physicalWrite:pass,authority:false});}
function qualify(){const denied=!admit({id:'q'}).admitted;const ok=dispatch({id:'q',authorized:true},()=>7);const retained=setToPersistence({authorized:true,qualified:true,transactionAdmitted:true});const refused=setToPersistence({});let bad=false;try{observe('RUNNING')}catch{bad=true}return Object.freeze({id:ID,pass:denied&&bad&&ok.result===7&&ok.state==='VOLATILE'&&retained.state==='PERSISTENT'&&refused.state==='VOLATILE'&&loadLayers().authority===false,qualificationGranted:false});}
const TF_RUNTIME_BASE_EXPORTS=Object.freeze({ID,VERSION,STATES,SELF_RUNTIME_SEMANTICS,descriptor,loadLayers,admit,observe,dispatch,setToPersistence,qualify});


/* v0.44.79 bounded streaming runtime ownership */
function bindBoundedStreamingRuntimeV04479(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.247: Bounded Streaming Runtime === */
const TF_BOUNDED_STREAM_RUNTIME_V36247=Object.freeze({
 id:"runtime.streaming.bounded",systems:Object.freeze(["system.streaming","system.streamer"]),runtime:"node:stream",mode:"in-process-bounded-transfer",
 conditions:Object.freeze(["source-admitted","sink-admitted","domain-admitted","limits-valid","authorization-boundary-intact"]),
 semantics:Object.freeze(["backpressure","multi-chunk","eof","cancellation","timeout","source-error","sink-error","byte-limit","recovery-evidence"]),
 opensNetwork:false,opensDevice:false,executesPayload:false,persistsPayload:false,grantsCredentialAuthority:false,grantsNetworkAuthority:false,grantsDeviceAuthority:false,grantsAuthority:false
});
function tfNodeStreamRuntimeV36247(){
 const stream=require("node:stream");return Object.freeze({Readable:stream.Readable,Writable:stream.Writable,pipeline:stream.pipeline});
}
function tfBoundedStreamTransferV36247(spec={}){
 const {Readable,Writable,pipeline}=tfNodeStreamRuntimeV36247(),chunks=[...(spec.chunks||[])].map(x=>Buffer.isBuffer(x)?Buffer.from(x):Buffer.from(String(x))),
 maxBytes=Number.isSafeInteger(spec.maxBytes)&&spec.maxBytes>=0?spec.maxBytes:1048576,timeoutMs=Number.isSafeInteger(spec.timeoutMs)&&spec.timeoutMs>0?spec.timeoutMs:5000,
 cancelAfterBytes=Number.isSafeInteger(spec.cancelAfterBytes)&&spec.cancelAfterBytes>=0?spec.cancelAfterBytes:null,sourceErrorAt=Number.isInteger(spec.sourceErrorAt)?spec.sourceErrorAt:null,
 sinkErrorAt=Number.isInteger(spec.sinkErrorAt)?spec.sinkErrorAt:null,highWaterMark=Number.isSafeInteger(spec.highWaterMark)&&spec.highWaterMark>0?spec.highWaterMark:16;
 return new Promise(resolve=>{
  let sourceIndex=0,bytes=0,writes=0,settled=false,timer=null,ended=false,backpressureObserved=false;const output=[];
  const finish=(state,error=null)=>{if(settled)return;settled=true;if(timer)clearTimeout(timer);resolve(Object.freeze({state,bytes,writes,eof:ended,backpressureObserved,
   output:Buffer.concat(output),error:error?String(error.message||error):null,networkOpened:false,deviceOpened:false,payloadExecuted:false,persisted:false,credentialAuthority:false,networkAuthority:false,deviceAuthority:false,authorityGranted:false,recoverable:["CANCELLED","TIMED_OUT","SOURCE_FAILED","SINK_FAILED","LIMIT_EXCEEDED"].includes(state)}));};
  const source=new Readable({highWaterMark,read(){if(sourceErrorAt!==null&&sourceIndex===sourceErrorAt){this.destroy(new Error("synthetic source failure"));return}
   if(sourceIndex>=chunks.length){ended=true;this.push(null);return}this.push(chunks[sourceIndex++]);}});
  const sink=new Writable({highWaterMark,write(chunk,enc,cb){writes++;if(sinkErrorAt!==null&&writes===sinkErrorAt){cb(new Error("synthetic sink failure"));return}
   if(bytes+chunk.length>maxBytes){cb(new Error("STREAM_BYTE_LIMIT"));return}bytes+=chunk.length;output.push(Buffer.from(chunk));
   if(cancelAfterBytes!==null&&bytes>=cancelAfterBytes){cb(new Error("STREAM_CANCELLED"));return}setImmediate(cb);}});
  const ow=sink.write.bind(sink);sink.write=function(...args){const ok=ow(...args);if(!ok)backpressureObserved=true;return ok};
  timer=setTimeout(()=>{source.destroy(new Error("STREAM_TIMEOUT"));sink.destroy(new Error("STREAM_TIMEOUT"));finish("TIMED_OUT",new Error("STREAM_TIMEOUT"))},timeoutMs);
  pipeline(source,sink,err=>{if(settled)return;if(!err){finish("COMPLETE");return}const msg=String(err.message||err);
   if(msg==="STREAM_CANCELLED")finish("CANCELLED",err);else if(msg==="STREAM_TIMEOUT")finish("TIMED_OUT",err);else if(msg==="STREAM_BYTE_LIMIT")finish("LIMIT_EXCEEDED",err);
   else if(msg==="synthetic source failure")finish("SOURCE_FAILED",err);else if(msg==="synthetic sink failure")finish("SINK_FAILED",err);else finish("FAILED",err);});
 });
}
async function tfBoundedStreamingSelfTestV36247(sourceText){
 const missing=[],ids=new Set(tfCanonicalSystemIdsV36196(sourceText));for(const id of ["system.streaming","system.streamer"])if(!ids.has(id))missing.push(id);
 const chunks=Array.from({length:64},(_,i)=>Buffer.from("chunk-"+String(i).padStart(3,"0")+"|"));
 const ok=await tfBoundedStreamTransferV36247({chunks,highWaterMark:8,maxBytes:65536,timeoutMs:2000});
 const expected=Buffer.concat(chunks);if(ok.state!=="COMPLETE"||!ok.eof||!ok.output.equals(expected)||ok.writes<2)missing.push("multi-chunk-eof");
 if(!ok.backpressureObserved)missing.push("backpressure");
 const cancelled=await tfBoundedStreamTransferV36247({chunks:["aaaa","bbbb","cccc"],cancelAfterBytes:8,timeoutMs:1000});
 if(cancelled.state!=="CANCELLED"||!cancelled.recoverable)missing.push("cancellation");
 const limited=await tfBoundedStreamTransferV36247({chunks:["12345","67890"],maxBytes:7,timeoutMs:1000});
 if(limited.state!=="LIMIT_EXCEEDED"||!limited.recoverable)missing.push("byte-limit");
 const sf=await tfBoundedStreamTransferV36247({chunks:["a","b"],sourceErrorAt:1,timeoutMs:1000});if(sf.state!=="SOURCE_FAILED")missing.push("source-failure");
 const wf=await tfBoundedStreamTransferV36247({chunks:["a","b"],sinkErrorAt:1,timeoutMs:1000});if(wf.state!=="SINK_FAILED")missing.push("sink-failure");
 const timed=await tfBoundedStreamTransferV36247({chunks:[],timeoutMs:20});if(timed.state!=="COMPLETE")missing.push("empty-eof");
 for(const r of [ok,cancelled,limited,sf,wf,timed])if(r.networkOpened||r.deviceOpened||r.payloadExecuted||r.persisted||r.authorityGranted)missing.push("boundary");
 if(missing.length)throw new Error("bounded streaming qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,nodeStreamRuntime:true,multiChunk:true,backpressure:true,eof:true,cancellation:true,byteLimit:true,timeoutMechanism:true,sourceFailure:true,sinkFailure:true,recoveryEvidence:true,
  networkOpened:false,deviceOpened:false,payloadExecuted:false,persisted:false,credentialAuthority:false,networkAuthority:false,deviceAuthority:false,authorityAmplification:false,missing:0});
}
/* === end v0.36.247 === */


 return Object.freeze({TF_BOUNDED_STREAM_RUNTIME_V36247,tfNodeStreamRuntimeV36247,tfBoundedStreamTransferV36247,tfBoundedStreamingSelfTestV36247});
}

function bindRuntimeLayerPausingV04636(deps={}){
 const {tfSystemLayerV36389,tfLoopContextV36383,tfCanonicalSystemIdsV36196,tfUniversalSystemLayerFabricV36389,tfUniversalEngineFabricV36349,tfCompactSystemSeedV36353}=deps;
 /* === Terraformer v0.36.390: Runtime Layer Scheduling + Pausing Fabric === */
const TF_RUNTIME_LAYER_SYSTEMS_V36390=Object.freeze([{"id":"system.parallel","concept":"Parallel","type":"runtime-scheduling-mode-system","mode":"bounded-runtime-control","condition":"runtime-layer-admitted","state":"ready"},{"id":"system.concurrent","concept":"Concurrent","type":"runtime-scheduling-mode-system","mode":"bounded-runtime-control","condition":"runtime-layer-admitted","state":"ready"},{"id":"system.awakening","concept":"Awakening","type":"runtime-layer-lifecycle-process-system","mode":"bounded-runtime-control","condition":"runtime-layer-admitted","state":"ready"},{"id":"system.sleeping","concept":"Sleeping","type":"runtime-layer-lifecycle-process-system","mode":"bounded-runtime-control","condition":"runtime-layer-admitted","state":"ready"},{"id":"system.pacifying","concept":"Pacifying","type":"runtime-layer-lifecycle-process-system","mode":"bounded-runtime-control","condition":"runtime-layer-admitted","state":"ready"},{"id":"system.hibernation","concept":"Hibernation","type":"runtime-layer-lifecycle-state-system","mode":"bounded-runtime-control","condition":"runtime-layer-admitted","state":"ready"},{"id":"system.pausing","concept":"Pausing","type":"runtime-yield-process-system","mode":"bounded-runtime-control","condition":"runtime-layer-admitted","state":"ready"},{"id":"system.pauser","concept":"Pauser","type":"runtime-yield-actor-system","mode":"bounded-runtime-control","condition":"runtime-layer-admitted","state":"ready"},{"id":"system.pause","concept":"Pause","type":"runtime-yield-event-system","mode":"bounded-runtime-control","condition":"runtime-layer-admitted","state":"ready"}]);

const TF_RUNTIME_LAYER_RELATIONSHIPS_V36390=Object.freeze([
 Object.freeze({from:"system.layering",relation:"uses",to:"system.runtime"}),Object.freeze({from:"system.layer",relation:"may-run-as",to:"system.parallel"}),
 Object.freeze({from:"system.layer",relation:"may-run-as",to:"system.concurrent"}),Object.freeze({from:"system.awakening",relation:"transitions",to:"system.layer"}),
 Object.freeze({from:"system.sleeping",relation:"transitions",to:"system.layer"}),Object.freeze({from:"system.pacifying",relation:"uses",to:"system.pacification"}),
 Object.freeze({from:"system.hibernation",relation:"state-of",to:"system.layer"}),Object.freeze({from:"system.pausing",relation:"produces",to:"system.pause"}),
 Object.freeze({from:"system.pauser",relation:"part-of",to:"system.pausing"}),Object.freeze({from:"system.looping",relation:"regulated-by",to:"system.pausing"}),
 Object.freeze({from:"system.pausing",relation:"uses",to:"system.regulation"})
]);
const TF_RUNTIME_LAYER_SCHEMA_V36390=Object.freeze({schema:"TERRAFORMER-RUNTIME-LAYER/1",schedulingModes:Object.freeze(["parallel","concurrent","parallel-concurrent"]),
 lifecycleStates:Object.freeze(["awake","sleeping","pacified","hibernating"]),defaultScheduling:"concurrent",defaultLifecycle:"awake",
 loopYieldRequired:true,maxIterationsWithoutPause:64,cooperative:true,preemptiveClaim:false,automaticThreadCreation:false,authorityAmplification:false});
function tfRuntimeLayerV36390(owner,spec={}){
 const layer=tfSystemLayerV36389(owner),mode=spec.scheduling??TF_RUNTIME_LAYER_SCHEMA_V36390.defaultScheduling,state=spec.lifecycle??TF_RUNTIME_LAYER_SCHEMA_V36390.defaultLifecycle;
 if(!TF_RUNTIME_LAYER_SCHEMA_V36390.schedulingModes.includes(mode))throw new Error("[TF:system.layering:invalid-scheduling] parallel, concurrent, or parallel-concurrent required.");
 if(!TF_RUNTIME_LAYER_SCHEMA_V36390.lifecycleStates.includes(state))throw new Error("[TF:system.layering:invalid-lifecycle] Runtime layer lifecycle state invalid.");
 return Object.freeze({...layer,runtime:"system.runtime",scheduling:mode,lifecycle:state,cooperative:true,loopYieldRequired:true});
}
function tfPauseV36390(runtimeLayer,reason="cooperative-yield"){
 if(!runtimeLayer?.id?.endsWith("::layer"))throw new Error("[TF:system.pausing:invalid-layer] Runtime System Layer required.");
 return Object.freeze({system:"system.pause",pausing:"system.pausing",pauser:"system.pauser",layer:runtimeLayer.id,reason:String(reason),yielded:true,automaticExternalEffect:false});
}
function tfRegulatedLoopV36390(runtimeLayer,iterations,step,{pauseEvery=TF_RUNTIME_LAYER_SCHEMA_V36390.maxIterationsWithoutPause}={}){
 if(!Number.isInteger(iterations)||iterations<0||!Number.isInteger(pauseEvery)||pauseEvery<1)throw new Error("[TF:system.looping:invalid-input] Non-negative iterations and positive pause interval required.");
 if(typeof step!=="function")throw new Error("[TF:system.function:invalid-input] Loop step Function required.");
 const events=[],lc=tfLoopContextV36383("for",runtimeLayer.owner);
 for(let i=0;i<iterations;i++){step(i);if((i+1)%pauseEvery===0&&i+1<iterations)events.push(tfPauseV36390(runtimeLayer));}
 return Object.freeze({system:"system.looping",layer:runtimeLayer.id,iterations,pauseEvery,pauses:Object.freeze(events),yieldRegulated:true,complete:true});
}
function tfRuntimeLayerSelfTestV36390(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.layer","system.layering","system.layerer","system.runtime","system.parallel","system.concurrent","system.awakening","system.sleeping","system.pacifying","system.pacification","system.hibernation","system.pausing","system.pauser","system.pause","system.loop","system.looping","system.regulation"])if(!ids.has(id))missing.push(id);
 const layers=tfUniversalSystemLayerFabricV36389(sourceText);for(const x of layers.entries){const r=tfRuntimeLayerV36390(x.owner);if(!r.loopYieldRequired||!r.cooperative)missing.push("runtime:"+x.owner);}
 let n=0;const rr=tfRegulatedLoopV36390(tfRuntimeLayerV36390("system.looping"),130,()=>n++,{pauseEvery:64});
 if(n!==130||rr.pauses.length!==2||!rr.yieldRegulated||!rr.complete)missing.push("loop-yield");
 for(const mode of ["parallel","concurrent","parallel-concurrent"])if(tfRuntimeLayerV36390("system.layering",{scheduling:mode}).scheduling!==mode)missing.push("mode:"+mode);
 for(const state of ["awake","sleeping","pacified","hibernating"])if(tfRuntimeLayerV36390("system.layering",{lifecycle:state}).lifecycle!==state)missing.push("state:"+state);
 const eo=new Set(tfUniversalEngineFabricV36349(sourceText).engines.map(x=>x.owner)),seeded=new Set(tfCompactSystemSeedV36353(sourceText).entries.map(x=>x.id));
 for(const x of TF_RUNTIME_LAYER_SYSTEMS_V36390){if(!eo.has(x.id))missing.push("engine:"+x.id);if(!seeded.has(x.id))missing.push("seed:"+x.id);}
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Runtime Layer / Pausing failed: "+[...new Set(missing)].slice(0,64).join(",")+".");
 return Object.freeze({pass:true,newSystems:9,pacificationReused:true,regulationReused:true,systemsCovered:ids.size,runtimeLayers:layers.layers,
  parallel:true,concurrent:true,parallelConcurrent:true,awakening:true,sleeping:true,pacifying:true,hibernation:true,pausing:true,pauser:true,pause:true,
  loopYieldRequired:true,maxIterationsWithoutPause:64,regulatedLoopPauses:2,cooperative:true,preemptiveClaim:false,automaticThreadCreation:false,authorityAmplification:false,missing:0});
}
globalThis.TF_RUNTIME_LAYER_SYSTEMS_V36390=TF_RUNTIME_LAYER_SYSTEMS_V36390;globalThis.TF_RUNTIME_LAYER_RELATIONSHIPS_V36390=TF_RUNTIME_LAYER_RELATIONSHIPS_V36390;
globalThis.TF_RUNTIME_LAYER_SCHEMA_V36390=TF_RUNTIME_LAYER_SCHEMA_V36390;globalThis.tfRuntimeLayerV36390=tfRuntimeLayerV36390;globalThis.tfPauseV36390=tfPauseV36390;
globalThis.tfRegulatedLoopV36390=tfRegulatedLoopV36390;
 return Object.freeze({TF_RUNTIME_LAYER_SYSTEMS_V36390,TF_RUNTIME_LAYER_RELATIONSHIPS_V36390,TF_RUNTIME_LAYER_SCHEMA_V36390,tfRuntimeLayerV36390,tfPauseV36390,tfRegulatedLoopV36390,tfRuntimeLayerSelfTestV36390});
}

const TERRAFORMER_RUNTIME_SYSTEM=Object.freeze({schema:'TERRAFORMER-RUNTIME-SYSTEM/1',id:'system.runtime',name:'Runtime System',parent:'system.terraformer',family:'runtime',type:'system',state:'integrated',canonicalPath:'terraformer://terraformer/runtime/',runtimeSubstrate:'nodejs',governs:Object.freeze(['process','state','volatility','persistence','dispatch','worker','event','resource']),rule:'After invocation Terraformer arises into volatility; retained state is explicitly set to persistence. Execution and termination remain valid for external programs but do not define Terraformer self-runtime lifecycle.'});
const TF_AUDIT_STATE={sequence:0,events:[]};
function tfAuditSanitize(value){if(value===null||value===undefined)return value;if(typeof value==='string')return value.length>256?value.slice(0,256)+'…':value;if(Array.isArray(value))return value.slice(0,32).map(tfAuditSanitize);if(typeof value==='object'){const out={};for(const [k,v] of Object.entries(value)){if(/pass|token|secret|credential|cookie|authorization|bearer|key/i.test(k)){out[k]='[REDACTED]';continue}out[k]=tfAuditSanitize(v)}return out}return value}
function tfAuditEvent(action,target,detail={},result='observed'){const event=Object.freeze({schema:'TERRAFORMER-AUDIT-EVENT/1',sequence:++TF_AUDIT_STATE.sequence,at:Date.now(),pid:process.pid,actor:'terraformer',action:String(action),target:String(target),detail:tfAuditSanitize(detail),result:String(result),persisted:false});TF_AUDIT_STATE.events.push(event);if(TF_AUDIT_STATE.events.length>4096)TF_AUDIT_STATE.events.splice(0,TF_AUDIT_STATE.events.length-4096);return event}
function tfAuditVisual(action,target,detail={},result='observed'){return tfAuditEvent('visual.'+String(action),target,detail,result)}
const TERRAFORMER_VISUAL_AUDIT_POLICY=Object.freeze({schema:'TERRAFORMER-VISUAL-AUDIT-POLICY/1',auditSystem:'system.audit',covers:Object.freeze(['create','present','render','project','morph','replace','reload','move','resize','layout','layer','visibility','close']),payload:'metadata-redacted',persistence:'volatile-by-default',rule:'Every Terraformer visual-output action routed through the visual action boundary emits an audit event before returning its result.'});
function tfVisualAction(action,target,detail={},fn=null){let result;try{result=typeof fn==='function'?fn():detail;tfAuditVisual(action,target,detail,'success');return result}catch(error){tfAuditVisual(action,target,{...detail,error:String(error&&error.message||error)},'failure');throw error}}

module.exports=Object.freeze({...TF_RUNTIME_BASE_EXPORTS,bindBoundedStreamingRuntimeV04479,bindRuntimeLayerPausingV04636,TERRAFORMER_RUNTIME_SYSTEM,TF_AUDIT_STATE,tfAuditSanitize,tfAuditEvent,tfAuditVisual,TERRAFORMER_VISUAL_AUDIT_POLICY,tfVisualAction});

/* Terraformer v0.48.9: qualified isolated declaration migration. */
const RUNTIME_FABRIC_SCHEMA='TERRAFORMER-RUNTIME-FABRIC/2';

/* Terraformer v0.48.9: qualified isolated declaration migration. */
let RUNTIME_SUPERVISOR=null;

/* Terraformer v0.48.11: qualified immutable depth-0 declaration migration. */
const TF_RUNTIME_COMPLETENESS_STATES=Object.freeze(['reference-only','specified','implemented','executable','verified','naturalized']);

/* Terraformer v0.48.14: qualified immutable depth-0 declaration migration. */
const TF_ANDROID_MOBILE_RUNTIME_V408=Object.freeze({id:"system.android-mobile-runtime",platform:"Android",hostRuntime:"Termux/Node.js",presentationPort:9966,bind:"127.0.0.1",browserTarget:true,mobileFirst:true,touchFirst:true,desktopWording:false,testAdmission:Object.freeze({environmentFlag:"TERRAFORMER_LOCAL_TEST_MODE=1",loopbackOnly:true,volatile:true,persistentCredential:false,productionDefault:false,authorityAmplification:false}),evidence:Object.freeze({httpBootstrap:"PASS",chromeRendering:"PASS",authenticationUiRendering:"PASS",nativeAuthenticationAction:"UNRESOLVED_FROM_V0.40.7",desktopEntry:"BLOCKED_IN_V0.40.7"})});
