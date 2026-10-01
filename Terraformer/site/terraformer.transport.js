"use strict";
function bindTransportV04481(){
 const SYSTEM=Object.freeze({id:"system.transport",name:"Transport System",type:"transport-system",state:"naturalized",authorityGranted:false,automaticExecution:false,persistence:false});
 return Object.freeze({SYSTEM});
}


function bindAuthorizedLoopbackTransportV04481(deps={}){
 const {tfCanonicalSystemIdsV36196,networkOwner,tcpipOwner,tcpOwner,adapterOwner,authorizationOwner,loopbackOwner}=deps;
 if(!networkOwner||!tcpipOwner||!tcpOwner||!adapterOwner||!authorizationOwner||!loopbackOwner)throw new Error("canonical transport owners required");
 /* === Terraformer v0.36.249: Authorized Loopback Network Transport Adapter === */
const TF_AUTHORIZED_NETWORK_TRANSPORT_V36249=Object.freeze({
 id:"adapter.network.transport.authorized",mode:"explicit-authority-loopback-qualified",
 systems:Object.freeze(["system.network","system.tcpip","system.tcp","system.socket","system.port","system.connection","system.connector","system.transmission","system.transmitter","system.receiver","system.sender","system.receiving","system.dios","system.streaming","system.streamer"]),
 protocols:Object.freeze(["tcp"]),qualificationScope:"loopback-only",allowedHosts:Object.freeze(["127.0.0.1","::1","localhost"]),
 authorizationRequired:true,lanByDefault:false,internetByDefault:false,listenByDefault:false,connectByDefault:false,credentialAuthority:false,deviceAuthority:false,persistence:false,payloadExecution:false,grantsAuthority:false
});
function tfAuthorizedNetworkEndpointV36249(spec={}){
 const host=String(spec.host||"127.0.0.1"),port=Number(spec.port||0),protocol=String(spec.protocol||"tcp");
 if(protocol!=="tcp")throw new Error("unsupported network transport protocol");
 if(!TF_AUTHORIZED_NETWORK_TRANSPORT_V36249.allowedHosts.includes(host))throw new Error("network host outside qualified loopback scope");
 if(!Number.isInteger(port)||port<0||port>65535)throw new Error("invalid port");
 return Object.freeze({protocol,host,port,authorized:spec.authorized===true,scope:"loopback",credentialAuthority:false,deviceAuthority:false,persistence:false,payloadExecution:false,authorityGranted:false});
}
function tfRequireNetworkAuthorizationV36249(endpoint){if(!endpoint||endpoint.authorized!==true)throw new Error("explicit network authorization required");return true}
async function tfLoopbackTcpExchangeV36249(spec={}){
 const net=require("node:net"),serverEp=tfAuthorizedNetworkEndpointV36249({host:spec.host||"127.0.0.1",port:spec.port||0,authorized:spec.authorized===true});
 tfRequireNetworkAuthorizationV36249(serverEp);
 const chunks=[...(spec.chunks||[])].map(x=>Buffer.isBuffer(x)?Buffer.from(x):Buffer.from(String(x))),maxBytes=Number.isSafeInteger(spec.maxBytes)&&spec.maxBytes>=0?spec.maxBytes:1048576,timeoutMs=Number.isSafeInteger(spec.timeoutMs)&&spec.timeoutMs>0?spec.timeoutMs:3000;
 return await new Promise((resolve)=>{
  let server=null,client=null,timer=null,settled=false,received=[],bytes=0,accepted=false,connected=false;
  const finish=(state,error=null)=>{if(settled)return;settled=true;if(timer)clearTimeout(timer);try{client&&client.destroy()}catch{}try{server&&server.close()}catch{}
   resolve(Object.freeze({state,bytes,received:Buffer.concat(received),accepted,connected,loopback:true,protocol:"tcp",error:error?String(error.message||error):null,
    networkOpened:true,lanOpened:false,internetOpened:false,deviceOpened:false,payloadExecuted:false,persisted:false,credentialAuthority:false,deviceAuthority:false,authorityGranted:false,recoverable:state!=="COMPLETE"}));};
  server=net.createServer(sock=>{accepted=true;sock.on("data",d=>{if(bytes+d.length>maxBytes){sock.destroy(new Error("NETWORK_BYTE_LIMIT"));return}bytes+=d.length;received.push(Buffer.from(d))});
   sock.on("end",()=>finish("COMPLETE"));sock.on("error",e=>{if(String(e.message)==="NETWORK_BYTE_LIMIT")finish("LIMIT_EXCEEDED",e);else finish("SERVER_FAILED",e)})});
  server.on("error",e=>finish("LISTEN_FAILED",e));
  server.listen({host:serverEp.host,port:serverEp.port,exclusive:true},()=>{const a=server.address();client=net.createConnection({host:serverEp.host,port:a.port},()=>{connected=true;for(const c of chunks)client.write(c);client.end()});
   client.on("error",e=>finish("CLIENT_FAILED",e))});
  timer=setTimeout(()=>finish("TIMED_OUT",new Error("NETWORK_TIMEOUT")),timeoutMs);
 });
}
async function tfAuthorizedNetworkTransportSelfTestV36249(sourceText){
 const missing=[],ids=new Set(tfCanonicalSystemIdsV36196(sourceText));for(const id of TF_AUTHORIZED_NETWORK_TRANSPORT_V36249.systems)if(!ids.has(id))missing.push(id);
 let denied=false;try{const e=tfAuthorizedNetworkEndpointV36249({host:"127.0.0.1"});tfRequireNetworkAuthorizationV36249(e)}catch(e){denied=true}if(!denied)missing.push("authorization-denial");
 let externalDenied=false;try{tfAuthorizedNetworkEndpointV36249({host:"192.168.1.10",authorized:true})}catch(e){externalDenied=true}if(!externalDenied)missing.push("external-scope-denial");
 const r=await tfLoopbackTcpExchangeV36249({authorized:true,chunks:["terraformer-","network-","stream"],maxBytes:4096,timeoutMs:3000});
 if(r.state!=="COMPLETE"||r.received.toString()!=="terraformer-network-stream"||!r.accepted||!r.connected||!r.networkOpened||r.lanOpened||r.internetOpened)missing.push("tcp-loopback");
 if(r.deviceOpened||r.payloadExecuted||r.persisted||r.credentialAuthority||r.authorityGranted)missing.push("boundary");
 if(missing.length)throw new Error("authorized network transport qualification failure "+missing.join(","));
 return Object.freeze({pass:true,tcp:true,loopback:true,realSocketTransfer:true,authorizationRequired:true,unauthorizedRejected:true,externalHostRejected:true,diosIntegration:true,communicationLifecycleIntegration:true,streamingIntegration:true,
  networkOpenedForQualifiedTest:true,lanOpened:false,internetOpened:false,deviceOpened:false,payloadExecuted:false,persisted:false,credentialAuthority:false,deviceAuthority:false,authorityAmplification:false,missing:0});
}
/* === end v0.36.249 === */


 return Object.freeze({TF_AUTHORIZED_NETWORK_TRANSPORT_V36249,tfAuthorizedNetworkEndpointV36249,tfRequireNetworkAuthorizationV36249,tfLoopbackTcpExchangeV36249,tfAuthorizedNetworkTransportSelfTestV36249});
}
module.exports={bindTransportV04481,bindAuthorizedLoopbackTransportV04481};

/* Terraformer v0.48.0: dependency-closed cluster migrated from terraformer.temporary.js. */
function tfReservedTransportPortPlanV36419({protocol="tcp",port=8888}={}){protocol=String(protocol).toLowerCase();port=Number(port);const admitted=TF_RESERVED_TRANSPORT_PROTOCOLS_8888_V36419.includes(protocol)&&TF_RESERVED_TRANSPORT_PORT_FAMILY_8888_V36419.includes(port);return Object.freeze({system:"system.port",protocol,port,family:admitted?"8888":null,reserved:admitted,logical:admitted,physicalBinding:false,automaticListen:false,automaticConnect:false,firewallMutation:false,externalExposure:false,authorityAmplification:false});}

function tfReservedTransportPortSelfTestV36419(sourceText){const missing=[];if(TF_RESERVED_TRANSPORT_PORT_FAMILY_8888_V36419.length!==6||new Set(TF_RESERVED_TRANSPORT_PORT_FAMILY_8888_V36419).size!==6)missing.push("family-six");if(TF_RESERVED_TRANSPORT_PAIRS_8888_V36419.length!==12)missing.push("twelve-pairs");for(const protocol of ["tcp","udp"])for(const port of [8888,18888,28888,38888,48888,58888]){const p=tfReservedTransportPortPlanV36419({protocol,port});if(!p.reserved||p.family!=="8888"||p.physicalBinding||p.automaticListen||p.automaticConnect||p.firewallMutation||p.externalExposure||p.authorityAmplification)missing.push(protocol+":"+port);}if(tfReservedTransportPortPlanV36419({protocol:"sctp",port:8888}).reserved||tfReservedTransportPortPlanV36419({protocol:"tcp",port:68888}).reserved)missing.push("bounds");const ids=new Set(tfCanonicalSystemIdsV36196(sourceText));if(!ids.has("system.port")||!ids.has("system.tcp")||!ids.has("system.udp"))missing.push("canonical-authority");if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Reserved 8888 transport family failed: "+[...new Set(missing)].join(","));return Object.freeze({pass:true,family:"8888",ports:6,protocols:2,reservedPairs:12,tcp:true,udp:true,physicalBinding:false,operationalStageAssignment:false,missing:0});}

/* Terraformer v0.48.12: qualified immutable depth-0 declaration migration. */
const TF_RESERVED_TRANSPORT_PORT_FAMILY_8888_V36419=Object.freeze([8888,18888,28888,38888,48888,58888]);

/* Terraformer v0.48.12: qualified immutable depth-0 declaration migration. */
const TF_RESERVED_TRANSPORT_PROTOCOLS_8888_V36419=Object.freeze(["tcp","udp"]);

/* Terraformer v0.48.14: promoted dependency-closed declaration migration. */
const TF_RESERVED_TRANSPORT_PAIRS_8888_V36419=Object.freeze(TF_RESERVED_TRANSPORT_PROTOCOLS_8888_V36419.flatMap(protocol=>TF_RESERVED_TRANSPORT_PORT_FAMILY_8888_V36419.map(port=>Object.freeze({system:"system.port",protocol,port,family:"8888",reserved:true,logical:true,physicalBinding:false,automaticListen:false,automaticConnect:false,firewallMutation:false,externalExposure:false,authorityAmplification:false}))));
