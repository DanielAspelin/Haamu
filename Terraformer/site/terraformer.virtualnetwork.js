"use strict";
function bindVirtualNetworkV04459(deps={}){
 const {tfCanonicalSystemIdsV36196,tfVirtualMachineCreateV36226}=deps;
/* === Terraformer v0.36.229: Virtual Network System === */
const TF_VIRTUAL_NETWORK_SYSTEM_V36229=Object.freeze({
 id:"system.virtual-network",name:"Virtual Network System",family:"virtual-computation",type:"virtual-network-system",mode:"isolated-admitted-networking",
 condition:Object.freeze(["network-defined","nic-defined","attachment-admitted","backend-compatible","policy-valid"]),state:"naturalized",
 integrates:Object.freeze(["system.virtual-machine","system.virtual-hardware","system.network","system.bridge","system.nat","system.mac","system.hypervisor","system.qemu","system.kvm","system.security","system.lifecycle","system.environment"]),
 governs:Object.freeze(["virtual-nic","mac-identity","isolated-network","bridge-reference","nat-reference","backend-attachment","guest-network-boundary"]),
 modes:Object.freeze(["isolated","nat","bridge"]),attachedByDefault:false,hostNetworkAuthority:false,externalNetworkAuthority:false,grantsAuthority:false,persists:false,intrinsic:true
});
function tfVirtualNetworkDefinitionV36229(spec={}){
 const mode=String(spec.mode||"isolated").toLowerCase();if(!TF_VIRTUAL_NETWORK_SYSTEM_V36229.modes.includes(mode))throw new Error("unsupported virtual network mode");
 return Object.freeze({system:"system.virtual-network",id:String(spec.id||"vnet"),mode,backend:String(spec.backend||""),
  bridge:mode==="bridge"?String(spec.bridge||""):null,nat:mode==="nat"?true:false,isolated:mode==="isolated",
  attached:false,hostNetworkAuthority:false,externalNetworkAuthority:false,authorityGranted:false});
}
function tfVirtualNicDefinitionV36229(spec={}){
 const mac=String(spec.mac||"").toLowerCase();if(mac&&!/^([0-9a-f]{2}:){5}[0-9a-f]{2}$/.test(mac))throw new Error("invalid MAC identity");
 return Object.freeze({type:"virtual-nic",id:String(spec.id||"nic0"),model:String(spec.model||"virtio-net"),mac:mac||null,
  networkId:null,attached:false,hostNetworkAuthority:false,externalNetworkAuthority:false,authorityGranted:false});
}
function tfVirtualNetworkAdmissionV36229(network,options={}){
 if(!network||network.system!=="system.virtual-network")throw new Error("canonical virtual network required");
 if(options.authorized!==true)throw new Error("virtual network attachment authorization required");
 if(network.mode==="bridge"&&options.bridgeAvailable!==true)throw new Error("admitted host bridge unavailable");
 if(network.mode==="nat"&&options.natAvailable!==true)throw new Error("admitted NAT backend unavailable");
 return Object.freeze({...network,admitted:true,authorityGranted:false});
}
function tfVirtualNicAttachV36229(nic,network,options={}){
 if(!nic||nic.type!=="virtual-nic")throw new Error("virtual NIC required");if(!network?.admitted)throw new Error("admitted virtual network required");
 if(options.authorized!==true)throw new Error("virtual NIC attachment authorization required");
 return Object.freeze({...nic,networkId:network.id,attached:true,hostNetworkAuthority:false,externalNetworkAuthority:false,authorityGranted:false});
}
function tfVirtualMachineAttachNetworkV36229(vm,nic,network){
 if(!vm||vm.system!=="system.virtual-machine"||vm.state!=="DEFINED")throw new Error("DEFINED canonical virtual machine required");
 if(!nic?.attached||nic.networkId!==network?.id||!network?.admitted)throw new Error("admitted attached virtual NIC/network required");
 const existing=Array.isArray(vm.virtualNetworks)?vm.virtualNetworks:[];
 return Object.freeze({...vm,virtualNetworks:Object.freeze([...existing,Object.freeze({nic,network})]),networkAuthority:false,hostAuthority:false,authorityGranted:false});
}
const TF_VIRTUAL_NETWORK_KIT_V36229=Object.freeze({id:"kit.virtual-network",name:"Virtual Network Kit",type:"intrinsic-kit",mode:"naturalized",
 condition:Object.freeze(["network-system-canonical","attachments-authorized","host-network-authority-separated"]),state:"naturalized",
 members:Object.freeze(["system.virtual-network","system.virtual-machine","system.virtual-hardware","system.network","system.bridge","system.nat","system.mac","system.hypervisor","system.qemu","system.kvm","system.security","system.lifecycle","system.environment","system.recovery"]),
 intrinsic:true,plugin:false,module:false,loadable:false,unloadable:false,grantsAuthority:false});
function tfVirtualNetworkSelfTestV36229(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];for(const x of TF_VIRTUAL_NETWORK_KIT_V36229.members)if(!ids.has(x))missing.push(x);
 let net=tfVirtualNetworkDefinitionV36229({id:"qual-net",mode:"isolated"}),nic=tfVirtualNicDefinitionV36229({id:"nic0",mac:"02:00:00:00:00:01"});
 let denied=false;try{tfVirtualNetworkAdmissionV36229(net,{})}catch(e){denied=true}
 net=tfVirtualNetworkAdmissionV36229(net,{authorized:true});nic=tfVirtualNicAttachV36229(nic,net,{authorized:true});
 let vm=tfVirtualMachineCreateV36226({id:"network-qualification-vm",backend:"qemu",cpus:1,memoryBytes:64*1024*1024,image:"guest.img"});vm=tfVirtualMachineAttachNetworkV36229(vm,nic,net);
 let bridgeDenied=false;try{tfVirtualNetworkAdmissionV36229(tfVirtualNetworkDefinitionV36229({mode:"bridge",bridge:"br0"}),{authorized:true})}catch(e){bridgeDenied=true}
 if(!denied||!bridgeDenied||!nic.attached||vm.virtualNetworks.length!==1)missing.push("network-admission");
 if(vm.networkAuthority!==false||nic.hostNetworkAuthority!==false||net.externalNetworkAuthority!==false||TF_VIRTUAL_NETWORK_SYSTEM_V36229.attachedByDefault!==false)missing.push("network-authority");
 if(missing.length)throw new Error("virtual network qualification failure "+missing.join(","));
 return Object.freeze({pass:true,system:"system.virtual-network",virtualNic:true,macIdentity:true,isolated:true,nat:true,bridge:true,backendAttachment:true,
  detachedByDefault:true,attachmentAuthorizationRequired:true,bridgeAdmissionRequired:true,natAdmissionRequired:true,vmIntegration:true,
  hostNetworkAuthority:false,externalNetworkAuthority:false,authorityAmplification:false,missing:0});
}
/* === end v0.36.229 === */


 return Object.freeze({TF_VIRTUAL_NETWORK_KIT_V36229,TF_VIRTUAL_NETWORK_SYSTEM_V36229,tfVirtualMachineAttachNetworkV36229,tfVirtualNetworkAdmissionV36229,tfVirtualNetworkDefinitionV36229,tfVirtualNetworkSelfTestV36229,tfVirtualNicAttachV36229,tfVirtualNicDefinitionV36229});
}
module.exports={bindVirtualNetworkV04459};
