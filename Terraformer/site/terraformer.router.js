"use strict";
function bindRouterV04484(){
 const SYSTEMS=Object.freeze([Object.freeze({id:"system.lan-router",name:"LAN Router",family:"network",type:"local-area-router-system",mode:"admission-controlled-routing-plan",
  conditions:Object.freeze(["lan-admitted","interfaces-defined","routes-valid","policy-valid","authorization-valid"]),state:"naturalized",
  integrates:Object.freeze(["system.lan","system.routing","system.network","system.ip","system.subnet","system.nic","system.connection","system.firewall","system.nat","system.dios"]),
  forwardsByDefault:false,routeMutation:false,firewallMutation:false,natMutation:false,lanMutation:false,wanAuthority:false,grantsAuthority:false,persists:false}),Object.freeze({id:"system.wan-router",name:"WAN Router",family:"network",type:"wide-area-router-system",mode:"external-route-boundary-plan",
  conditions:Object.freeze(["wan-admitted","interfaces-defined","routes-admitted","policy-valid","authorization-valid"]),state:"naturalized",
  integrates:Object.freeze(["system.wan","system.routing","system.network","system.ip","system.nic","system.connection","system.firewall","system.nat","system.proxy","system.dios"]),
  forwardsByDefault:false,routeMutation:false,firewallMutation:false,natMutation:false,internetByDefault:false,credentialAuthority:false,grantsAuthority:false,persists:false})]);
 function tfRoutePlanV36252(spec={}){
 const scope=String(spec.scope||"lan");if(!["lan","wan"].includes(scope))throw new Error("invalid routing scope");
 const routes=[...(spec.routes||[])].map(r=>Object.freeze({destination:String(r.destination||""),gateway:r.gateway==null?null:String(r.gateway),interfaceName:String(r.interfaceName||""),metric:Number.isFinite(+r.metric)?+r.metric:0}));
 if(spec.authorized!==true)throw new Error("explicit router authorization required");
 return Object.freeze({system:scope==="lan"?"system.lan-router":"system.wan-router",scope,routes:Object.freeze(routes),authorized:true,executes:false,forwards:false,
  routeMutation:false,firewallMutation:false,natMutation:false,internetOpened:false,credentialAuthority:false,authorityGranted:false});
}
 return Object.freeze({SYSTEMS,tfRoutePlanV36252});
}
module.exports={bindRouterV04484};
