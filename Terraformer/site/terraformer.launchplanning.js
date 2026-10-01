"use strict";
function bindLaunchPlanAddressSpaceV04462(deps={}){
 const {tfBootDefinitionV36228,tfCanonicalSystemIdsV36196,tfGuestImageAdmissionV36228,tfGuestImageDefinitionV36228,tfHostCapabilityFromProbeV36231,tfVirtualMachineAttachGuestImageV36228,tfVirtualMachineCreateV36226}=deps;
 for(const k of ["launch","planning","address","space"])if(!deps[k])throw new Error(k+" owner required");
/* === Terraformer v0.36.232: Deterministic Launch Plan & Private Address Space === */
const TF_PRIVATE_ADDRESS_SPACE_SYSTEM_V36232=Object.freeze({
 id:"system.private-address-space",name:"Private Address Space System",family:"network",type:"private-address-space-system",mode:"internal-reservation-policy",
 condition:Object.freeze(["private-range-valid","allocation-noncolliding","scope-internal","host-route-unchanged"]),state:"naturalized",
 integrates:Object.freeze(["system.network","system.ip","system.nat","system.nic","system.virtual-network","system.security","system.environment"]),
 pools:Object.freeze([{cidr:"10.0.0.0/8",purpose:"terraformer-private"},{cidr:"192.168.0.0/16",purpose:"terraformer-private"}]),
 excludes:Object.freeze(["127.0.0.0/8","169.254.0.0/16","224.0.0.0/4"]),
 claimsGlobalOwnership:false,mutatesHostRoutes:false,mutatesLan:false,grantsAuthority:false,persists:false,intrinsic:true
});
function tfIpv4IntV36232(ip){const p=String(ip).split(".").map(Number);if(p.length!==4||p.some(x=>!Number.isInteger(x)||x<0||x>255))throw new Error("invalid IPv4");return (((p[0]*256+p[1])*256+p[2])*256+p[3])>>>0}
function tfIpv4InCidrV36232(ip,cidr){const [base,bitsS]=String(cidr).split("/"),bits=Number(bitsS);if(!Number.isInteger(bits)||bits<0||bits>32)throw new Error("invalid CIDR");const a=tfIpv4IntV36232(ip),b=tfIpv4IntV36232(base),mask=bits===0?0:(0xffffffff<<(32-bits))>>>0;return (a&mask)===(b&mask)}
function tfTerraformerPrivateAddressV36232(ip){return TF_PRIVATE_ADDRESS_SPACE_SYSTEM_V36232.pools.some(p=>tfIpv4InCidrV36232(ip,p.cidr))}
function tfPrivateAddressAllocationV36232(ip,used=[]){
 if(!tfTerraformerPrivateAddressV36232(ip))throw new Error("address outside Terraformer private pools");
 if(used.map(String).includes(String(ip)))throw new Error("private address collision");
 return Object.freeze({system:"system.private-address-space",address:String(ip),reservedFor:"terraformer-private",allocated:true,hostRouteMutation:false,lanMutation:false,authorityGranted:false});
}
const TF_VM_LAUNCH_PLAN_SYSTEM_V36232=Object.freeze({
 id:"system.vm-launch-plan",name:"VM Launch Plan System",family:"virtual-computation",type:"vm-launch-plan-system",mode:"deterministic-nonexecuting",
 condition:Object.freeze(["vm-defined","host-capabilities-observed","backend-compatible","image-admitted","network-policy-valid"]),state:"naturalized",
 integrates:Object.freeze(["system.virtual-machine","system.virtual-hardware","system.guest-image","system.virtual-network","system.nat","system.nic","system.private-address-space","system.hypervisor","system.kvm","system.qemu","system.host-capability-discovery","system.security","system.lifecycle"]),
 governs:Object.freeze(["backend-selection","executable-reference","machine-arguments","cpu-memory-arguments","image-arguments","network-arguments","console-arguments","deterministic-plan"]),
 executes:false,spawnsProcess:false,installs:false,mutatesHost:false,grantsAuthority:false,persists:false,intrinsic:true
});
function tfVmLaunchPlanV36232(vm,host,options={}){
 if(!vm||vm.system!=="system.virtual-machine")throw new Error("canonical VM required");if(!host||host.system!=="system.host-capability-discovery")throw new Error("host capability record required");
 const backend=String(options.backend||vm.backend||"qemu");if(!["qemu","kvm"].includes(backend))throw new Error("unsupported launch backend");
 if(!host.qemu.detected)throw new Error("QEMU executable not observed");if(backend==="kvm"&&!host.kvm.available)throw new Error("KVM capability unavailable");
 const args=["-name",String(vm.id||"terraformer-vm"),"-m",String(vm.memoryBytes),"-smp",String(vm.cpus)];
 if(vm.guestImage?.image){args.push("-drive",`file=${vm.guestImage.image},format=${vm.guestImage.format},readonly=${vm.guestImage.readOnly?"on":"off"}`)}
 if(Array.isArray(vm.virtualNetworks))for(const [i,x] of vm.virtualNetworks.entries()){const net=x.network,nic=x.nic;args.push("-netdev",`${net.mode==="isolated"?"user":net.mode},id=net${i}`,"-device",`${nic.model||"virtio-net"},netdev=net${i}${nic.mac?`,mac=${nic.mac}`:""}`)}
 args.push("-serial","stdio");
 return Object.freeze({system:"system.vm-launch-plan",vmId:String(vm.id||""),backend,executable:host.qemu.path,args:Object.freeze(args),deterministic:true,authorized:false,executed:false,spawned:false,hostMutation:false,authorityGranted:false});
}
const TF_LAUNCH_ADDRESS_KIT_V36232=Object.freeze({id:"kit.vm-launch-private-address",name:"VM Launch & Private Address Kit",type:"intrinsic-kit",mode:"naturalized",
 condition:Object.freeze(["launch-plan-nonexecuting","private-address-policy-valid","host-routing-unchanged"]),state:"naturalized",
 members:Object.freeze(["system.vm-launch-plan","system.private-address-space","system.virtual-machine","system.virtual-hardware","system.guest-image","system.virtual-network","system.nat","system.nic","system.network","system.ip","system.hypervisor","system.kvm","system.qemu","system.host-capability-discovery","system.security","system.lifecycle","system.environment","system.recovery"]),
 intrinsic:true,plugin:false,module:false,loadable:false,unloadable:false,grantsAuthority:false});
function tfVmLaunchPrivateAddressSelfTestV36232(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];for(const x of TF_LAUNCH_ADDRESS_KIT_V36232.members)if(!ids.has(x))missing.push(x);
 if(!tfTerraformerPrivateAddressV36232("10.1.2.3")||!tfTerraformerPrivateAddressV36232("192.168.44.2")||tfTerraformerPrivateAddressV36232("172.16.0.1"))missing.push("private-ranges");
 let collision=false;tfPrivateAddressAllocationV36232("10.10.0.2");try{tfPrivateAddressAllocationV36232("10.10.0.2",["10.10.0.2"])}catch(e){collision=true}if(!collision)missing.push("collision");
 let vm=tfVirtualMachineCreateV36226({id:"plan-vm",backend:"qemu",cpus:2,memoryBytes:67108864,image:"guest.img"});
 let gi=tfGuestImageAdmissionV36228(tfGuestImageDefinitionV36228({image:"guest.img",format:"raw"}),{validated:true,authorized:true});vm=tfVirtualMachineAttachGuestImageV36228(vm,gi,tfBootDefinitionV36228({firmware:"uefi"}));
 const host=tfHostCapabilityFromProbeV36231({platform:"linux",arch:"x64",cpuCount:8,totalMemoryBytes:8589934592,kvmExists:true,kvmReadable:true,kvmWritable:true,qemuPath:"/usr/bin/qemu-system-x86_64",qemuVersion:"qualification"});
 const plan=tfVmLaunchPlanV36232(vm,host,{backend:"kvm"});if(plan.executed||plan.spawned||plan.hostMutation||plan.authorized||!plan.deterministic)missing.push("launch-boundary");
 if(TF_PRIVATE_ADDRESS_SPACE_SYSTEM_V36232.claimsGlobalOwnership||TF_PRIVATE_ADDRESS_SPACE_SYSTEM_V36232.mutatesHostRoutes||TF_PRIVATE_ADDRESS_SPACE_SYSTEM_V36232.mutatesLan)missing.push("address-authority");
 if(missing.length)throw new Error("launch/address qualification failure "+missing.join(","));
 return Object.freeze({pass:true,launchPlanSystem:true,privateAddressSpaceSystem:true,pools:2,range10:true,range192168:true,collisionControl:true,deterministicPlan:true,qemuPlan:true,kvmPlan:true,
  executes:false,spawnsProcess:false,hostMutation:false,claimsGlobalOwnership:false,mutatesHostRoutes:false,mutatesLan:false,authorityAmplification:false,missing:0});
}
/* === end v0.36.232 === */


 return Object.freeze({TF_LAUNCH_ADDRESS_KIT_V36232,TF_PRIVATE_ADDRESS_SPACE_SYSTEM_V36232,TF_VM_LAUNCH_PLAN_SYSTEM_V36232,tfIpv4InCidrV36232,tfIpv4IntV36232,tfPrivateAddressAllocationV36232,tfTerraformerPrivateAddressV36232,tfVmLaunchPlanV36232,tfVmLaunchPrivateAddressSelfTestV36232});
}
module.exports={bindLaunchPlanAddressSpaceV04462};
