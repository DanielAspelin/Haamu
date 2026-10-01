"use strict";
function bindDiosV04445(deps={}){
 const {tfCanonicalSystemIdsV36196,tfEntityObservabilityDescriptorV36207,tfIdentityUuidV36195,tfSystemAutomatorDescriptorV36196,tfSystemGeneratorDescriptorV36196,tfSystemWorkerDescriptorV36209}=deps;
/* === Terraformer v0.36.220: DIOS — Dynamic Input Output System === */
const TF_DIOS_SYSTEM_V36215=Object.freeze({
 schema:"TERRAFORMER-DIOS/1",id:"system.dios",name:"DIOS System",expandedName:"Dynamic Input Output System",
 family:"input-output",type:"dynamic-input-output-system",mode:"dynamic-bounded-routing",
 condition:Object.freeze(["channel-defined","input-admitted","schema-valid","scope-valid","policy-valid"]),
 state:"registered",interfacesThrough:"system.interface",featuresThrough:"system.feature",
 inputSystem:"system.input",outputSystem:"system.output",ioSystem:"system.io",
 stages:Object.freeze(["admit-input","validate","classify","route-input","processing-handoff","form-output","validate-output","route-output","report"]),
 logging:"system.logging",reporting:"system.reporting",intrinsic:true,plugin:false,module:false,
 deviceAuthority:false,networkAuthority:false,executionAuthority:false,grantsAuthority:false,persists:false
});
const TF_DIOS_CHANNEL_TYPES_V36215=Object.freeze(["data","text","binary","object","event","command","stream","interface"]);
const TF_DIOS_STATE_V36215={sequence:0,channels:new Map(),events:[]};
function tfDiosChannelV36215(id,type="data",options={}){
 id=String(id||"");type=String(type||"data");if(!id)throw new Error("DIOS channel id required");if(!TF_DIOS_CHANNEL_TYPES_V36215.includes(type))throw new Error("unsupported DIOS channel type");
 const c=Object.freeze({id,type,direction:options.direction==="output"?"output":options.direction==="bidirectional"?"bidirectional":"input",
  mode:"dynamic-bounded",condition:"admitted",state:"ready",deviceAuthority:false,networkAuthority:false,grantsAuthority:false});
 TF_DIOS_STATE_V36215.channels.set(id,c);return c;
}
function tfDiosRouteV36215(channelId,payload,options={}){
 const c=TF_DIOS_STATE_V36215.channels.get(String(channelId));if(!c)throw new Error("DIOS channel not admitted");
 if(options.authorized===false)throw new Error("DIOS route authorization denied");
 const record=Object.freeze({sequence:++TF_DIOS_STATE_V36215.sequence,channel:c.id,type:c.type,direction:c.direction,
  mode:c.mode,condition:"validated",state:"routed",payloadType:Buffer.isBuffer(payload)?"binary":typeof payload,
  external:false,deviceAuthority:false,networkAuthority:false,authorityGranted:false});
 TF_DIOS_STATE_V36215.events.push(record);return record;
}
function tfDiosDescriptorV36215(){
 return Object.freeze({...tfEntityObservabilityDescriptorV36207("system",TF_DIOS_SYSTEM_V36215),
  uuid:tfIdentityUuidV36195("canonical-system","system.dios"),worker:tfSystemWorkerDescriptorV36209("system.dios"),
  generator:tfEntityObservabilityDescriptorV36207("generator",tfSystemGeneratorDescriptorV36196("system.dios")),
  automator:tfEntityObservabilityDescriptorV36207("automator",tfSystemAutomatorDescriptorV36196("system.dios"))});
}
const TF_DIOS_KIT_V36215=Object.freeze({id:"kit.dios",name:"Dynamic Input Output Kit",type:"intrinsic-kit",mode:"naturalized",
 condition:Object.freeze(["canonical-members-present","routing-bounded"]),state:"naturalized",
 members:Object.freeze(["system.dios","system.input","system.output","system.io","system.interface","system.feature"]),
 intrinsic:true,plugin:false,module:false,loadable:false,unloadable:false,logging:"system.logging",reporting:"system.reporting",grantsAuthority:false});
function tfDiosSelfTestV36215(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),d=tfDiosDescriptorV36215(),missing=[];
 for(const id of TF_DIOS_KIT_V36215.members)if(!ids.has(id))missing.push(id);
 for(const k of ["type","mode","condition","state","uuid"])if(d[k]===undefined||d[k]===null||d[k]==="")missing.push("system.dios:"+k);
 if(!d.worker||!d.generator||!d.automator||!d.logging?.enabled||!d.reporting?.enabled)missing.push("system.dios:fabric");
 const id="dios-selftest-"+Date.now();tfDiosChannelV36215(id,"data",{direction:"bidirectional"});const r=tfDiosRouteV36215(id,{test:true},{authorized:true});TF_DIOS_STATE_V36215.channels.delete(id);
 if(r.state!=="routed"||r.authorityGranted)missing.push("route");
 if(missing.length)throw new Error("DIOS qualification failure "+missing.join(","));
 return Object.freeze({pass:true,system:"system.dios",expandedName:"Dynamic Input Output System",stages:TF_DIOS_SYSTEM_V36215.stages.length,channelTypes:TF_DIOS_CHANNEL_TYPES_V36215.length,
 intrinsic:true,workerCoverage:true,generatorCoverage:true,automatorCoverage:true,metadataCoverage:true,loggingCoverage:true,reportingCoverage:true,
 interfaceIntegrated:true,featureIntegrated:true,deviceAuthority:false,networkAuthority:false,authorityGranted:false,missing:0});
}
/* === end v0.36.220 === */


 return Object.freeze({TF_DIOS_CHANNEL_TYPES_V36215,TF_DIOS_KIT_V36215,TF_DIOS_STATE_V36215,TF_DIOS_SYSTEM_V36215,tfDiosChannelV36215,tfDiosDescriptorV36215,tfDiosRouteV36215,tfDiosSelfTestV36215});
}
module.exports={bindDiosV04445};

function bindDiosCommunicationStreamV04446(deps={}){
 const {TF_STREAMABLE_DOMAINS_V36244,tfBoundedStreamTransferV36247,tfCanonicalSystemIdsV36196,tfCommunicationLifecycleV36246,tfCommunicationTransitionV36246}=deps;
/* === Terraformer v0.36.248: DIOS Communication Stream Binding === */
const TF_DIOS_COMM_STREAM_BINDING_V36248=Object.freeze({
 id:"binding.dios.communication-stream",mode:"in-process-bounded-routing",
 systems:Object.freeze(["system.dios","system.streaming","system.streamer","system.sender","system.sending","system.transmitter","system.transceiver","system.transmission","system.connection","system.connector","system.receiver","system.receiving","system.broadcasting","system.broadcaster"]),
 topologies:Object.freeze(["point-to-point","bidirectional","one-to-many"]),
 stages:Object.freeze(["admit","validate","dios-input","send","transmit","stream","receive","dios-output","verify","complete"]),
 opensNetwork:false,opensDevice:false,executesPayload:false,persistsPayload:false,grantsCredentialAuthority:false,grantsNetworkAuthority:false,grantsDeviceAuthority:false,grantsAuthority:false
});
function tfDiosStreamEnvelopeV36248(spec={}){
 const domain=String(spec.domain||"data");if(!TF_STREAMABLE_DOMAINS_V36244.some(x=>x.id===domain))throw new Error("unadmitted stream domain");
 const payload=[...(spec.chunks||[])].map(x=>Buffer.isBuffer(x)?Buffer.from(x):Buffer.from(String(x)));
 return Object.freeze({id:String(spec.id||"dios.stream"),domain,direction:String(spec.direction||"outbound"),payload:Object.freeze(payload),validated:true,
  sourceSystem:String(spec.sourceSystem||"system.sender"),targetSystem:String(spec.targetSystem||"system.receiver"),networkAuthority:false,deviceAuthority:false,credentialAuthority:false,authorityGranted:false});
}
async function tfDiosPointToPointStreamV36248(spec={}){
 const env=tfDiosStreamEnvelopeV36248(spec),life0=tfCommunicationLifecycleV36246({id:env.id+".lifecycle"});
 let life=tfCommunicationTransitionV36246(life0,"CONNECTING",{authorized:true});life=tfCommunicationTransitionV36246(life,"CONNECTED");
 life=tfCommunicationTransitionV36246(life,"SENDING",{authorized:true});
 const result=await tfBoundedStreamTransferV36247({chunks:env.payload,maxBytes:spec.maxBytes,timeoutMs:spec.timeoutMs,highWaterMark:spec.highWaterMark});
 if(result.state==="COMPLETE"){life=tfCommunicationTransitionV36246(life,"COMPLETE");life=tfCommunicationTransitionV36246(life,"DISCONNECTING");life=tfCommunicationTransitionV36246(life,"DISCONNECTED")}
 else {life=tfCommunicationTransitionV36246(life,"FAILED");life=tfCommunicationTransitionV36246(life,"RECOVERING");life=tfCommunicationTransitionV36246(life,"DISCONNECTED")}
 return Object.freeze({topology:"point-to-point",envelope:env,path:Object.freeze(["system.dios","system.sender","system.sending","system.transmitter","system.transmission","system.connection","system.connector","system.streamer","system.streaming","system.receiver","system.receiving","system.dios"]),
  result,lifecycle:life,networkOpened:false,deviceOpened:false,payloadExecuted:false,persisted:false,authorityGranted:false});
}
async function tfDiosBidirectionalStreamV36248(a={},b={}){
 const forward=await tfDiosPointToPointStreamV36248({...a,id:a.id||"duplex.forward",sourceSystem:"system.transceiver",targetSystem:"system.transceiver",direction:"bidirectional"});
 const reverse=await tfDiosPointToPointStreamV36248({...b,id:b.id||"duplex.reverse",sourceSystem:"system.transceiver",targetSystem:"system.transceiver",direction:"bidirectional"});
 return Object.freeze({topology:"bidirectional",system:"system.transceiver",forward,reverse,complete:forward.result.state==="COMPLETE"&&reverse.result.state==="COMPLETE",
  networkOpened:false,deviceOpened:false,payloadExecuted:false,persisted:false,authorityGranted:false});
}
async function tfDiosBroadcastStreamV36248(spec={}){
 const targets=[...(spec.targets||[])].map(String);if(!targets.length)throw new Error("broadcast target required");if(new Set(targets).size!==targets.length)throw new Error("duplicate broadcast target");
 const deliveries=[];for(const target of targets)deliveries.push(await tfDiosPointToPointStreamV36248({...spec,id:String(spec.id||"broadcast")+"."+target,targetSystem:"system.receiver"}));
 return Object.freeze({topology:"one-to-many",system:"system.broadcaster",broadcastingSystem:"system.broadcasting",targets:Object.freeze(targets),deliveries:Object.freeze(deliveries),
  complete:deliveries.every(x=>x.result.state==="COMPLETE"),networkOpened:false,deviceOpened:false,payloadExecuted:false,persisted:false,authorityGranted:false});
}
async function tfDiosCommunicationStreamSelfTestV36248(sourceText){
 const missing=[],ids=new Set(tfCanonicalSystemIdsV36196(sourceText));for(const id of TF_DIOS_COMM_STREAM_BINDING_V36248.systems)if(!ids.has(id))missing.push(id);
 const p=await tfDiosPointToPointStreamV36248({domain:"data",chunks:["alpha","beta","gamma"],highWaterMark:4,maxBytes:1024,timeoutMs:1000});
 if(p.result.state!=="COMPLETE"||p.result.output.toString()!=="alphabetagamma"||p.lifecycle.state!=="DISCONNECTED")missing.push("point-to-point");
 const d=await tfDiosBidirectionalStreamV36248({domain:"text",chunks:["left"]},{domain:"text",chunks:["right"]});if(!d.complete||d.forward.result.output.toString()!=="left"||d.reverse.result.output.toString()!=="right")missing.push("bidirectional");
 const b=await tfDiosBroadcastStreamV36248({domain:"event",chunks:["event-1"],targets:["r1","r2","r3"],highWaterMark:2});if(!b.complete||b.deliveries.length!==3||b.deliveries.some(x=>x.result.output.toString()!=="event-1"))missing.push("broadcast");
 const f=await tfDiosPointToPointStreamV36248({domain:"binary",chunks:["12345","67890"],maxBytes:7});if(f.result.state!=="LIMIT_EXCEEDED"||f.lifecycle.state!=="DISCONNECTED"||!f.result.recoverable)missing.push("failure-recovery");
 for(const x of [p,d,b,f])if(x.networkOpened||x.deviceOpened||x.payloadExecuted||x.persisted||x.authorityGranted)missing.push("boundary");
 if(missing.length)throw new Error("DIOS communication stream qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,dios:true,senderReceiver:true,transmitter:true,transceiver:true,broadcaster:true,pointToPoint:true,bidirectional:true,oneToMany:true,boundedStreaming:true,
  lifecycleIntegration:true,failureRecovery:true,networkOpened:false,deviceOpened:false,payloadExecuted:false,persisted:false,credentialAuthority:false,networkAuthority:false,deviceAuthority:false,authorityAmplification:false,missing:0});
}
/* === end v0.36.248 === */


 return Object.freeze({TF_DIOS_COMM_STREAM_BINDING_V36248,tfDiosBidirectionalStreamV36248,tfDiosBroadcastStreamV36248,tfDiosCommunicationStreamSelfTestV36248,tfDiosPointToPointStreamV36248,tfDiosStreamEnvelopeV36248});
}
module.exports.bindDiosCommunicationStreamV04446=bindDiosCommunicationStreamV04446;
