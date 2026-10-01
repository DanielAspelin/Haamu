"use strict";
function bindVirtualMachineV04456(deps={}){
 const {tfCanonicalSystemIdsV36196,tfHypervisorAdmissionV36225,tfHypervisorBackendDescribeV36225,tfVirtualMachineDefinitionV36224}=deps;
/* === Terraformer v0.36.226: Virtual Machine System === */
const TF_VIRTUAL_MACHINE_SYSTEM_V36226=Object.freeze({
 id:"system.virtual-machine",name:"Virtual Machine System",family:"virtual-computation",type:"virtual-machine-system",mode:"isolated-guest-machine",
 condition:Object.freeze(["identity-valid","configuration-valid","resources-bounded","guest-image-admitted","backend-admitted","lifecycle-valid"]),
 state:"naturalized",
 integrates:Object.freeze(["system.virtual","system.virtualization","system.hypervisor","system.kvm","system.qemu","system.emulation","system.operating-system","system.binary","system.processor","system.memory","system.block","system.image","system.network","system.lifecycle","system.environment","system.security","system.checkpoint","system.snapshot","system.recovery"]),
 governs:Object.freeze(["vm-identity","vm-configuration","vcpu","virtual-memory","virtual-block","virtual-device","guest-image","backend-binding","boot","run","stop","checkpoint","snapshot","recover","isolation"]),
 lifecycle:Object.freeze(["DEFINED","VALIDATED","ADMITTED","BOUND","BOOTING","RUNNING","STOPPING","STOPPED","RECOVERING","RECOVERED"]),
 hostAuthority:false,networkAuthority:false,persistenceByDefault:false,grantsAuthority:false,intrinsic:true
});
function tfVirtualMachineCreateV36226(spec={}){
 const base=tfVirtualMachineDefinitionV36224(spec);
 return Object.freeze({...base,system:"system.virtual-machine",environment:String(spec.environment||"environment.sandbox"),
  devices:Object.freeze(Array.isArray(spec.devices)?spec.devices.map(String):[]),network:Object.freeze({attached:false,authorityGranted:false}),
  checkpoints:Object.freeze([]),snapshots:Object.freeze([]),state:"DEFINED",hostAuthority:false,networkAuthority:false,persistenceByDefault:false,authorityGranted:false});
}
function tfVirtualMachineTransitionV36226(vm,to,options={}){
 if(!vm||vm.system!=="system.virtual-machine")throw new Error("canonical virtual machine required");
 const transitions=Object.freeze({DEFINED:["VALIDATED"],VALIDATED:["ADMITTED"],ADMITTED:["BOUND"],BOUND:["BOOTING"],BOOTING:["RUNNING"],RUNNING:["STOPPING","RECOVERING"],STOPPING:["STOPPED"],STOPPED:["BOUND","RECOVERING"],RECOVERING:["RECOVERED"],RECOVERED:["BOUND","STOPPED"]});
 to=String(to||"").toUpperCase();if(!(transitions[vm.state]||[]).includes(to))throw new Error("invalid virtual machine lifecycle transition");
 if(["ADMITTED","BOUND","BOOTING","RUNNING"].includes(to)&&options.authorized!==true)throw new Error("virtual machine transition authorization required");
 return Object.freeze({...vm,state:to,authorityGranted:false});
}
function tfVirtualMachineBindV36226(vm,backend,options={}){
 if(vm.state!=="ADMITTED")throw new Error("virtual machine must be ADMITTED before backend binding");
 const admitted=tfHypervisorAdmissionV36225(backend,options);
 return Object.freeze({...vm,backend:admitted.backend,backendSystem:admitted.system,state:"BOUND",hostAuthority:false,authorityGranted:false});
}
function tfVirtualMachineCheckpointV36226(vm,id){
 if(!vm||vm.system!=="system.virtual-machine")throw new Error("canonical virtual machine required");
 const record=Object.freeze({id:String(id||("vm-checkpoint-"+Date.now())),vmId:vm.id,state:vm.state,backend:vm.backend||null,image:vm.image,createdAt:new Date().toISOString(),persistent:false,authorityGranted:false});
 return Object.freeze({...vm,checkpoints:Object.freeze([...(vm.checkpoints||[]),record]),authorityGranted:false});
}
const TF_VIRTUAL_MACHINE_KIT_V36226=Object.freeze({id:"kit.virtual-machine",name:"Virtual Machine Kit",type:"intrinsic-kit",mode:"naturalized",
 condition:Object.freeze(["vm-system-canonical","hypervisor-boundary-valid","guest-isolation-valid","lifecycle-controlled"]),state:"naturalized",
 members:Object.freeze(["system.virtual-machine","system.virtual","system.virtualization","system.hypervisor","system.kvm","system.qemu","system.emulation","system.operating-system","system.binary","system.processor","system.memory","system.block","system.image","system.lifecycle","system.environment","system.security","system.checkpoint","system.snapshot","system.recovery"]),
 intrinsic:true,plugin:false,module:false,loadable:false,unloadable:false,grantsAuthority:false});
function tfVirtualMachineSelfTestV36226(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];for(const x of TF_VIRTUAL_MACHINE_KIT_V36226.members)if(!ids.has(x))missing.push(x);
 let vm=tfVirtualMachineCreateV36226({id:"qualification-vm",backend:"emulated",cpus:2,memoryBytes:64*1024*1024,image:"qualification-os.img"});
 vm=tfVirtualMachineTransitionV36226(vm,"VALIDATED");vm=tfVirtualMachineTransitionV36226(vm,"ADMITTED",{authorized:true});
 const backend=tfHypervisorBackendDescribeV36225("qemu",{detected:true,permitted:true});vm=tfVirtualMachineBindV36226(vm,backend,{authorized:true});
 vm=tfVirtualMachineTransitionV36226(vm,"BOOTING",{authorized:true});vm=tfVirtualMachineTransitionV36226(vm,"RUNNING",{authorized:true});vm=tfVirtualMachineCheckpointV36226(vm,"qualification-checkpoint");
 let invalidDenied=false,authDenied=false;try{tfVirtualMachineTransitionV36226(vm,"DEFINED")}catch(e){invalidDenied=true}
 try{tfVirtualMachineTransitionV36226(tfVirtualMachineCreateV36226({memoryBytes:1024,image:"x"}),"VALIDATED"),tfVirtualMachineTransitionV36226(tfVirtualMachineTransitionV36226(tfVirtualMachineCreateV36226({memoryBytes:1024,image:"x"}),"VALIDATED"),"ADMITTED")}catch(e){authDenied=true}
 if(vm.state!=="RUNNING"||vm.checkpoints.length!==1||!invalidDenied||!authDenied)missing.push("vm-lifecycle");
 if(vm.hostAuthority!==false||vm.networkAuthority!==false||vm.persistenceByDefault!==false)missing.push("vm-authority-boundary");
 if(missing.length)throw new Error("virtual machine qualification failure "+missing.join(","));
 return Object.freeze({pass:true,system:"system.virtual-machine",identity:true,configuration:true,vcpu:true,virtualMemory:true,virtualBlock:true,virtualDevice:true,guestImage:true,hypervisorBinding:true,
  lifecycleStates:TF_VIRTUAL_MACHINE_SYSTEM_V36226.lifecycle.length,checkpoint:true,snapshotIntegration:true,recoveryIntegration:true,isolation:true,hostAuthority:false,networkAuthority:false,persistenceByDefault:false,authorityAmplification:false,missing:0});
}
/* === end v0.36.226 === */


 return Object.freeze({TF_VIRTUAL_MACHINE_KIT_V36226,TF_VIRTUAL_MACHINE_SYSTEM_V36226,tfVirtualMachineBindV36226,tfVirtualMachineCheckpointV36226,tfVirtualMachineCreateV36226,tfVirtualMachineSelfTestV36226,tfVirtualMachineTransitionV36226});
}
module.exports={bindVirtualMachineV04456};
