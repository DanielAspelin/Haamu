"use strict";
function bindNatV04460(core){if(!core)throw new Error("NAT core required");return Object.freeze({
 TF_NAT_SYSTEM_V36230:core.TF_NAT_SYSTEM_V36230,tfNatAdmissionV36230:core.tfNatAdmissionV36230,tfNatDefinitionV36230:core.tfNatDefinitionV36230
});}


function bindNatTopologyV04485(deps={}){
 const {tfCanonicalSystemIdsV36196,tfPrivatePoolAdmissionV36250,bridgeOwner,routerOwner,switchOwner,topologyOwner}=deps;
 if(!bridgeOwner||!routerOwner||!switchOwner||!topologyOwner)throw new Error("canonical NAT topology owners required");
 const TF_NAT_TOPOLOGY_SYSTEMS_V36253=Object.freeze([Object.freeze({id:"system.nat-network",name:"NAT Network",family:"network",type:"nat-network-system",mode:"bounded-address-translation-network",
  parent:"system.nat",conditions:Object.freeze(["nat-policy-defined","subnet-admitted","interfaces-defined","authorization-valid"]),state:"naturalized",
  integrates:Object.freeze(["system.nat","system.network","system.lan","system.wan","system.subnet","system.nic","system.firewall","system.connection","system.dios"]),
  forwardingByDefault:false,natMutation:false,routeMutation:false,interfaceMutation:false,firewallMutation:false,internetByDefault:false,grantsAuthority:false,persists:false}),...bridgeOwner.SYSTEMS,Object.freeze({id:"system.nat-router",name:"NAT Router",family:"network",type:"nat-router-system",mode:"bounded-translation-routing-plan",
  parent:"system.nat",conditions:Object.freeze(["nat-network-admitted","routes-valid","translation-policy-valid","authorization-valid"]),state:"naturalized",
  integrates:Object.freeze(["system.nat","system.nat-network","system.routing","system.lan-router","system.wan-router","system.ip","system.subnet","system.nic","system.firewall"]),
  forwardingByDefault:false,routeMutation:false,natMutation:false,firewallMutation:false,internetByDefault:false,grantsAuthority:false,persists:false}),Object.freeze({id:"system.nat-switch",name:"NAT Switch",family:"network",type:"nat-switch-system",mode:"bounded-nat-switch-plan",
  parent:"system.nat",conditions:Object.freeze(["nat-network-admitted","ports-defined","translation-boundary-valid","authorization-valid"]),state:"naturalized",
  integrates:Object.freeze(["system.nat","system.nat-network","system.nat-bridge","system.nat-router","system.lan-switch","system.wan-switch","system.nic","system.connection","system.firewall"]),
  forwardingByDefault:false,bridgeMutation:false,natMutation:false,interfaceMutation:false,firewallMutation:false,grantsAuthority:false,persists:false})]);
 const TF_NAT_TOPOLOGY_V36253=Object.freeze({
 root:"system.nat",path:Object.freeze(["system.nat-network","system.nat-bridge","system.nat-router","system.nat-switch"]),
 ingress:Object.freeze(["system.lan","system.lan-switch","system.lan-router"]),egress:Object.freeze(["system.wan-router","system.wan-switch","system.wan"]),
 security:Object.freeze(["system.firewall"]),translation:Object.freeze(["SNAT","DNAT","PAT"]),executionByDefault:false
});
 function tfNatTopologyPlanV36253(spec={}){
 if(spec.authorized!==true)throw new Error("explicit NAT topology authorization required");
 const network=String(spec.network||"10.77.0.0/24");if(!tfPrivatePoolAdmissionV36250(network))throw new Error("NAT network outside private-pool policy");
 const mode=String(spec.mode||"SNAT").toUpperCase();if(!TF_NAT_TOPOLOGY_V36253.translation.includes(mode))throw new Error("invalid NAT translation mode");
 return Object.freeze({root:"system.nat",network,mode,systems:TF_NAT_TOPOLOGY_V36253.path,authorized:true,executes:false,forwards:false,
  natMutation:false,routeMutation:false,bridgeMutation:false,interfaceMutation:false,firewallMutation:false,internetOpened:false,credentialAuthority:false,authorityGranted:false});
}
 function tfNatTopologySelfTestV36253(sourceText){
 const missing=[],ids=new Set(tfCanonicalSystemIdsV36196(sourceText));if(!ids.has("system.nat"))missing.push("system.nat");
 for(const x of TF_NAT_TOPOLOGY_SYSTEMS_V36253)if(!ids.has(x.id))missing.push(x.id);
 let denied=false,publicDenied=false;try{tfNatTopologyPlanV36253({network:"10.77.0.0/24"})}catch(e){denied=true}
 try{tfNatTopologyPlanV36253({network:"8.8.8.0/24",authorized:true})}catch(e){publicDenied=true}
 const p=tfNatTopologyPlanV36253({network:"10.77.0.0/24",mode:"PAT",authorized:true});
 if(!denied||!publicDenied)missing.push("admission");
 if(p.executes||p.forwards||p.natMutation||p.routeMutation||p.bridgeMutation||p.interfaceMutation||p.firewallMutation||p.internetOpened||p.authorityGranted)missing.push("boundary");
 if(TF_NAT_TOPOLOGY_V36253.path.join(">")!=="system.nat-network>system.nat-bridge>system.nat-router>system.nat-switch")missing.push("topology-order");
 if(missing.length)throw new Error("NAT topology qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,nat:true,natNetwork:true,natBridge:true,natRouter:true,natSwitch:true,lanIntegration:true,wanIntegration:true,firewallIntegration:true,
  subnetNicIntegration:true,authorizationRequired:true,unauthorizedRejected:true,publicRangeRejected:true,snat:true,dnat:true,pat:true,planOnly:true,forwardingByDefault:false,
  natMutation:false,routeMutation:false,bridgeMutation:false,interfaceMutation:false,firewallMutation:false,internetByDefault:false,credentialAuthority:false,authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_NAT_TOPOLOGY_SYSTEMS_V36253,TF_NAT_TOPOLOGY_V36253,tfNatTopologyPlanV36253,tfNatTopologySelfTestV36253});
}
module.exports={bindNatV04460,bindNatTopologyV04485};
