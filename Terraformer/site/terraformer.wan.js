"use strict";
function bindWanV04483(){
 const TF_WAN_SYSTEM_V36251=Object.freeze({id:"system.wan",name:"WAN System",family:"network",type:"wide-area-network-system",mode:"external-network-boundary",
  conditions:Object.freeze(["endpoint-defined","route-admitted","policy-valid","authorization-valid"]),
  state:"naturalized",integrates:Object.freeze(["system.network","system.ip","system.connection","system.connector","system.tcpip","system.tcp","system.firewall","system.proxy","system.dios","system.streaming"]),
  scope:"wide-area",connectsByDefault:false,internetByDefault:false,routeMutation:false,firewallMutation:false,credentialAuthority:false,grantsAuthority:false,persists:false});
 function tfWanPlanV36251(spec={}){
 return Object.freeze({system:"system.wan",endpoint:String(spec.endpoint||""),protocol:String(spec.protocol||"tcp"),authorized:spec.authorized===true,
  state:"PLANNED",executes:false,connects:false,internetOpened:false,routeMutated:false,firewallMutated:false,credentialAuthority:false,authorityGranted:false});
}
 return Object.freeze({TF_WAN_SYSTEM_V36251,tfWanPlanV36251});
}
module.exports={bindWanV04483};
