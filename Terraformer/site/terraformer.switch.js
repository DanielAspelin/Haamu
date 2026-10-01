"use strict";
function bindSwitchV04484(){
 const SYSTEMS=Object.freeze([Object.freeze({id:"system.lan-switch",name:"LAN Switch",family:"network",type:"local-area-switch-system",mode:"bounded-layer2-switch-plan",
  conditions:Object.freeze(["lan-admitted","ports-defined","mac-evidence-valid","policy-valid","authorization-valid"]),state:"naturalized",
  integrates:Object.freeze(["system.lan","system.network","system.nic","system.connection","system.bridge","system.wire","system.dios"]),
  forwardsByDefault:false,bridgeMutation:false,interfaceMutation:false,lanMutation:false,wanAuthority:false,grantsAuthority:false,persists:false}),Object.freeze({id:"system.wan-switch",name:"WAN Switch",family:"network",type:"wide-area-switch-system",mode:"bounded-wide-area-switch-plan",
  conditions:Object.freeze(["wan-admitted","ports-defined","endpoint-evidence-valid","policy-valid","authorization-valid"]),state:"naturalized",
  integrates:Object.freeze(["system.wan","system.network","system.nic","system.connection","system.bridge","system.firewall","system.dios"]),
  forwardsByDefault:false,bridgeMutation:false,interfaceMutation:false,wanMutation:false,internetByDefault:false,credentialAuthority:false,grantsAuthority:false,persists:false})]);
 function tfSwitchPlanV36252(spec={}){
 const scope=String(spec.scope||"lan");if(!["lan","wan"].includes(scope))throw new Error("invalid switch scope");
 const ports=[...(spec.ports||[])].map((p,i)=>Object.freeze({id:String(p.id||("port-"+i)),interfaceName:String(p.interfaceName||""),endpoint:String(p.endpoint||""),enabled:p.enabled!==false}));
 if(spec.authorized!==true)throw new Error("explicit switch authorization required");
 const seen=new Set();for(const p of ports){if(seen.has(p.id))throw new Error("duplicate switch port");seen.add(p.id)}
 return Object.freeze({system:scope==="lan"?"system.lan-switch":"system.wan-switch",scope,ports:Object.freeze(ports),authorized:true,executes:false,forwards:false,
  bridgeMutation:false,interfaceMutation:false,internetOpened:false,credentialAuthority:false,authorityGranted:false});
}
 return Object.freeze({SYSTEMS,tfSwitchPlanV36252});
}
module.exports={bindSwitchV04484};
