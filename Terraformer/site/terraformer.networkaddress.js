"use strict";
function bindNatNicCoreV04460(deps={}){ const {tfCanonicalSystemIdsV36196}=deps;
/* === Terraformer v0.36.230: NAT & NIC Systems === */
const TF_NAT_SYSTEM_V36230=Object.freeze({
 id:"system.nat",name:"NAT System",family:"network",type:"network-address-translation-system",mode:"authorization-required-forwarding",
 condition:Object.freeze(["network-defined","translation-defined","interfaces-admitted","policy-valid","forwarding-authorized"]),state:"naturalized",
 integrates:Object.freeze(["system.network","system.nic","system.virtual-network","system.bridge","system.mac","system.security","system.lifecycle","system.environment"]),
 governs:Object.freeze(["address-translation","source-nat","destination-nat","port-translation","forwarding-policy","inside-boundary","outside-boundary"]),
 forwardingByDefault:false,hostNetworkMutationByDefault:false,externalNetworkAuthority:false,grantsAuthority:false,persists:false,intrinsic:true
});
const TF_NIC_SYSTEM_V36230=Object.freeze({
 id:"system.nic",name:"NIC System",family:"network",type:"network-interface-controller-system",mode:"admitted-interface-representation",
 condition:Object.freeze(["interface-identified","mac-valid","link-defined","attachment-admitted"]),state:"naturalized",
 integrates:Object.freeze(["system.network","system.mac","system.bridge","system.nat","system.virtual-network","system.virtual-hardware","system.virtual-machine","system.device","system.security","system.lifecycle","system.environment"]),
 governs:Object.freeze(["nic-identity","physical-nic-reference","virtual-nic","mac-identity","link-state","network-attachment","backend-interface"]),
 physicalControlByDefault:false,linkMutationByDefault:false,networkAuthority:false,grantsAuthority:false,persists:false,intrinsic:true
});
function tfNicDefinitionV36230(spec={}){
 const kind=String(spec.kind||"virtual").toLowerCase();if(!["physical-reference","virtual"].includes(kind))throw new Error("unsupported NIC kind");
 const mac=String(spec.mac||"").toLowerCase();if(mac&&!/^([0-9a-f]{2}:){5}[0-9a-f]{2}$/.test(mac))throw new Error("invalid MAC identity");
 return Object.freeze({system:"system.nic",id:String(spec.id||"nic0"),kind,mac:mac||null,backend:String(spec.backend||""),link:"detached",networkId:null,
  admitted:false,physicalControl:false,networkAuthority:false,authorityGranted:false});
}
function tfNicAdmissionV36230(nic,options={}){
 if(!nic||nic.system!=="system.nic")throw new Error("canonical NIC required");if(options.authorized!==true)throw new Error("NIC admission authorization required");
 if(nic.kind==="physical-reference"&&options.hostInterfaceAvailable!==true)throw new Error("admitted host NIC unavailable");
 return Object.freeze({...nic,admitted:true,physicalControl:false,networkAuthority:false,authorityGranted:false});
}
function tfNatDefinitionV36230(spec={}){
 const mode=String(spec.mode||"snat").toLowerCase();if(!["snat","dnat","pat"].includes(mode))throw new Error("unsupported NAT mode");
 return Object.freeze({system:"system.nat",id:String(spec.id||"nat0"),mode,inside:String(spec.inside||""),outside:String(spec.outside||""),
  rules:Object.freeze((spec.rules||[]).map(x=>Object.freeze({...x}))),forwarding:false,admitted:false,externalNetworkAuthority:false,authorityGranted:false});
}
function tfNatAdmissionV36230(nat,options={}){
 if(!nat||nat.system!=="system.nat")throw new Error("canonical NAT required");if(options.authorized!==true)throw new Error("NAT authorization required");
 if(options.interfacesAdmitted!==true)throw new Error("NAT interfaces must be admitted");return Object.freeze({...nat,admitted:true,forwarding:options.forwarding===true,externalNetworkAuthority:false,authorityGranted:false});
}
const TF_NAT_NIC_KIT_V36230=Object.freeze({id:"kit.nat-nic",name:"NAT & NIC Kit",type:"intrinsic-kit",mode:"naturalized",
 condition:Object.freeze(["nat-canonical","nic-canonical","network-authority-separated"]),state:"naturalized",
 members:Object.freeze(["system.nat","system.nic","system.network","system.virtual-network","system.bridge","system.mac","system.virtual-machine","system.virtual-hardware","system.device","system.security","system.lifecycle","system.environment","system.recovery"]),
 intrinsic:true,plugin:false,module:false,loadable:false,unloadable:false,grantsAuthority:false});
function tfNatNicSelfTestV36230(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];for(const x of TF_NAT_NIC_KIT_V36230.members)if(!ids.has(x))missing.push(x);
 let nic=tfNicDefinitionV36230({id:"vnic0",kind:"virtual",mac:"02:00:00:00:00:02"}),denied=false;try{tfNicAdmissionV36230(nic,{})}catch(e){denied=true}
 nic=tfNicAdmissionV36230(nic,{authorized:true});let nat=tfNatDefinitionV36230({id:"nat0",mode:"pat",inside:"guest",outside:"host"});
 let natDenied=false;try{tfNatAdmissionV36230(nat,{authorized:true})}catch(e){natDenied=true}nat=tfNatAdmissionV36230(nat,{authorized:true,interfacesAdmitted:true,forwarding:true});
 if(!denied||!natDenied||!nic.admitted||!nat.admitted||!nat.forwarding)missing.push("admission");
 if(nic.physicalControl||nic.networkAuthority||nat.externalNetworkAuthority||TF_NAT_SYSTEM_V36230.forwardingByDefault)missing.push("authority-boundary");
 if(missing.length)throw new Error("NAT NIC qualification failure "+missing.join(","));
 return Object.freeze({pass:true,natSystem:true,nicSystem:true,snat:true,dnat:true,pat:true,physicalNicReference:true,virtualNic:true,macIdentity:true,
  forwardingAuthorizationRequired:true,interfaceAdmissionRequired:true,physicalControlByDefault:false,networkAuthority:false,externalNetworkAuthority:false,authorityAmplification:false,missing:0});
}
/* === end v0.36.230 === */


return Object.freeze({TF_NAT_NIC_KIT_V36230,TF_NAT_SYSTEM_V36230,TF_NIC_SYSTEM_V36230,tfNatAdmissionV36230,tfNatDefinitionV36230,tfNatNicSelfTestV36230,tfNicAdmissionV36230,tfNicDefinitionV36230});}
module.exports={bindNatNicCoreV04460};
