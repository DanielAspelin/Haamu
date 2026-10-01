"use strict";
function bindCommunicationrolesV04477(deps={}){
 const {tfCanonicalSystemIdsV36196,roleSystems,reconciliationOwner}=deps;
 if(!reconciliationOwner||!Array.isArray(roleSystems)||roleSystems.length!==12)throw new Error("canonical communication role owners required");
 const TF_COMMUNICATION_ROLE_SYSTEMS_V36245=Object.freeze(roleSystems);
const TF_CONNECTION_RECONCILIATION_V36245=Object.freeze({id:"reconciliation.connection",system:"system.connection",mode:"preserve-existing-canonical",duplicateSystemCreated:false,
 integrates:Object.freeze(["system.connector","system.transmission","system.transmitter","system.transceiver","system.receiver","system.sender","system.sending","system.receiving","system.broadcasting","system.broadcaster"]),
 connectsByDefault:false,networkAuthority:false,grantsAuthority:false});
function tfCommunicationRoleV36245(id,spec={}){
 const def=TF_COMMUNICATION_ROLE_SYSTEMS_V36245.find(x=>x.id===String(id));if(!def)throw new Error("unknown communication role");
 return Object.freeze({system:def.id,id:String(spec.id||def.id+".instance"),mode:def.mode,source:spec.source??null,target:spec.target??null,channel:spec.channel??null,scope:Object.freeze([...(spec.scope||[]).map(String)]),
  connected:false,sending:false,receiving:false,transmitting:false,broadcasting:false,networkAuthority:false,credentialAuthority:false,persisted:false,authorityGranted:false});
}
function tfCommunicationFlowV36245(spec={}){
 const sender=tfCommunicationRoleV36245("system.sender",{id:spec.sender||"sender"}),transmitter=tfCommunicationRoleV36245("system.transmitter",{id:spec.transmitter||"transmitter"}),
  receiver=tfCommunicationRoleV36245("system.receiver",{id:spec.receiver||"receiver"}),mode=String(spec.mode||"point-to-point");
 return Object.freeze({id:String(spec.id||"communication.flow"),path:Object.freeze(["system.sender","system.sending","system.transmitter",mode==="bidirectional"?"system.transceiver":"system.transmission","system.connection","system.connector","system.receiver","system.receiving"]),
  sender,transmitter,receiver,mode,payload:spec.payload??null,streaming:spec.streaming===true,broadcast:spec.broadcast===true,connected:false,executed:false,transmitted:false,received:false,networkAuthority:false,credentialAuthority:false,authorityGranted:false});
}
const TF_COMMUNICATION_ROLE_KIT_V36245=Object.freeze({id:"kit.communication-roles",name:"Communication Role Kit",type:"intrinsic-kit",mode:"naturalized",
 members:Object.freeze(["system.customer","system.consumer","system.broadcasting","system.broadcaster","system.connection","system.connector","system.transmission","system.transmitter","system.transceiver","system.receiver","system.sender","system.sending","system.receiving","system.communication","system.streaming","system.streamer","system.dios","system.security","system.validation","system.verification"]),
 intrinsic:true,plugin:false,module:false,grantsAuthority:false});
function tfCommunicationRoleSelfTestV36245(sourceText){
 const missing=[],ids=new Set(tfCanonicalSystemIdsV36196(sourceText));for(const id of TF_COMMUNICATION_ROLE_KIT_V36245.members)if(!ids.has(id))missing.push(id);
 const flow=tfCommunicationFlowV36245({mode:"bidirectional",streaming:true}),broadcast=tfCommunicationRoleV36245("system.broadcaster",{id:"b"});
 if(!flow.path.includes("system.transceiver")||!flow.path.includes("system.connection")||!flow.path.includes("system.connector"))missing.push("flow");
 if(flow.connected||flow.executed||flow.transmitted||flow.received||flow.authorityGranted||broadcast.broadcasting||broadcast.networkAuthority)missing.push("boundary");
 if(TF_CONNECTION_RECONCILIATION_V36245.duplicateSystemCreated)missing.push("connection-duplicate");
 if(missing.length)throw new Error("communication role qualification failure "+missing.join(","));
 return Object.freeze({pass:true,customer:true,consumer:true,broadcasting:true,broadcaster:true,connectionReconciled:true,connector:true,transmission:true,transmitter:true,transceiver:true,receiver:true,sender:true,sending:true,receiving:true,
  streamingIntegration:true,diosIntegration:true,pointToPoint:true,bidirectional:true,oneToMany:true,connectsByDefault:false,transmitsByDefault:false,receivesByDefault:false,broadcastsByDefault:false,networkAuthority:false,credentialAuthority:false,authorityAmplification:false,missing:0});
}
/* === end v0.36.245 === */


 return Object.freeze({TF_COMMUNICATION_ROLE_KIT_V36245,TF_COMMUNICATION_ROLE_SYSTEMS_V36245,TF_CONNECTION_RECONCILIATION_V36245,tfCommunicationFlowV36245,tfCommunicationRoleSelfTestV36245,tfCommunicationRoleV36245});
}
module.exports={bindCommunicationrolesV04477};
