"use strict";
function bindTransmitterV04477(){
 const SYSTEM=Object.freeze({id:"system.transmitter",name:"Transmitter",family:"communication",type:"transmitter-system",mode:"outbound-signal-role",condition:Object.freeze(["identity-defined","scope-defined","endpoint-admitted","policy-valid"]),state:"naturalized",connectsByDefault:false,transmitsByDefault:false,receivesByDefault:false,broadcastsByDefault:false,networkAuthority:false,credentialAuthority:false,grantsAuthority:false,persists:false,intrinsic:true,workerRoleEstablished:false});
 return Object.freeze({SYSTEM});
}
module.exports={bindTransmitterV04477};
