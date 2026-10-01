"use strict";
function bindBridgeV04485(){
 const SYSTEMS=Object.freeze([Object.freeze({id:"system.nat-bridge",name:"NAT Bridge",family:"network",type:"nat-bridge-system",mode:"bounded-nat-bridge-plan",
  parent:"system.nat",conditions:Object.freeze(["nat-network-admitted","bridge-ports-defined","policy-valid","authorization-valid"]),state:"naturalized",
  integrates:Object.freeze(["system.nat","system.nat-network","system.bridge","system.nic","system.connection","system.lan-switch","system.wan-switch","system.firewall"]),
  forwardingByDefault:false,bridgeMutation:false,natMutation:false,interfaceMutation:false,firewallMutation:false,grantsAuthority:false,persists:false})]);
 return Object.freeze({SYSTEMS});
}
module.exports={bindBridgeV04485};
