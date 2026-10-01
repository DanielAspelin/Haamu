"use strict";
function bindVirtualizationV04454(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
/* === Terraformer v0.36.224: Binary, Emulation & Virtualization Architecture === */
const TF_BINARY_SYSTEM_V36224=Object.freeze({id:"system.binary",name:"Binary System",family:"representation",type:"binary-system",mode:"validated-binary-boundary",condition:Object.freeze(["bytes-admitted","format-identified","integrity-valid"]),state:"naturalized",governs:Object.freeze(["bytes","buffers","binary-format","executable-format-reference","image-format-reference","hash","load-handoff"]),executesByDefault:false,grantsAuthority:false,persists:false,intrinsic:true});
const TF_EMULATION_SYSTEM_V36224=Object.freeze({id:"system.emulation",name:"Emulation System",family:"virtual-computation",type:"emulation-system",mode:"bounded-machine-emulation",condition:Object.freeze(["machine-defined","isa-defined","device-model-valid","image-admitted"]),state:"naturalized",governs:Object.freeze(["machine-model","instruction-set-emulation","device-emulation","firmware-interface","guest-state"]),nativeExecution:false,hostBackendRequiredForExternalExecution:true,grantsAuthority:false,persists:false,intrinsic:true});
const TF_VIRTUALIZATION_SYSTEM_V36224=Object.freeze({id:"system.virtualization",name:"Virtualization System",family:"virtual-computation",type:"virtualization-system",mode:"backend-mediated",condition:Object.freeze(["vm-defined","resources-bounded","backend-admitted","image-admitted","lifecycle-valid"]),state:"naturalized",governs:Object.freeze(["virtual-machine","vcpu","virtual-memory","virtual-block","virtual-device","guest-lifecycle","backend-adapter"]),hostBackends:Object.freeze(["kvm","qemu"]),directHypervisor:false,backendAuthorityRequired:true,grantsAuthority:false,persists:false,intrinsic:true});
const TF_OPERATING_SYSTEM_SYSTEM_V36224=Object.freeze({id:"system.operating-system",name:"Operating System System",family:"guest-runtime",type:"operating-system-system",mode:"guest-image-runtime",condition:Object.freeze(["os-image-admitted","machine-compatible","boot-path-valid","backend-authorized"]),state:"naturalized",governs:Object.freeze(["os-image","boot-definition","guest-runtime","guest-console","guest-shutdown","guest-recovery"]),hostReplacement:false,grantsAuthority:false,persists:false,intrinsic:true});
const TF_VM_BOOT_LIFECYCLE_V36224=Object.freeze(["admit-image","identify-binary","define-machine","allocate-virtual-resources","bind-backend","validate","boot","guest-running","shutdown","recover"]);
function tfVirtualMachineDefinitionV36224(spec={}){
 const backend=String(spec.backend||"").toLowerCase();if(!["kvm","qemu","emulated"].includes(backend))throw new Error("unsupported virtualization backend");
 const cpus=Math.max(1,Math.min(256,Number(spec.cpus||1))),memoryBytes=Number(spec.memoryBytes||0);if(!Number.isSafeInteger(memoryBytes)||memoryBytes<=0)throw new Error("bounded virtual memory required");
 if(!spec.image)throw new Error("guest operating-system image required");
 return Object.freeze({id:String(spec.id||"vm"),type:"virtual-machine",backend,cpus,memoryBytes,image:String(spec.image),machine:String(spec.machine||"generic"),
  lifecycle:Object.freeze([...TF_VM_BOOT_LIFECYCLE_V36224]),state:"DEFINED",isolated:true,hostExecution:false,authorityGranted:false});
}
function tfVirtualMachineAdmissionV36224(vm,options={}){
 if(!vm||vm.type!=="virtual-machine")throw new Error("virtual machine definition required");
 if(options.authorized!==true)throw new Error("virtual machine execution authorization required");
 if((vm.backend==="kvm"||vm.backend==="qemu")&&options.backendAvailable!==true)throw new Error("admitted host virtualization backend unavailable");
 return Object.freeze({...vm,state:"ADMITTED",hostExecution:vm.backend!=="emulated",backendAuthorized:true,authorityGranted:false});
}
const TF_VIRTUAL_COMPUTATION_KIT_V36224=Object.freeze({id:"kit.virtual-computation",name:"Virtual Computation Kit",type:"intrinsic-kit",mode:"naturalized",condition:Object.freeze(["binary-boundary-valid","native-virtual-distinction-valid","backend-authority-explicit"]),state:"naturalized",
 members:Object.freeze(["system.virtual","system.virtualization","system.emulation","system.binary","system.operating-system","system.native","system.architecture","system.lifecycle","system.environment","system.memory","system.block","system.image","system.processor","system.security","system.recovery"]),
 intrinsic:true,plugin:false,module:false,loadable:false,unloadable:false,grantsAuthority:false});
function tfVirtualizationSelfTestV36224(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];for(const x of TF_VIRTUAL_COMPUTATION_KIT_V36224.members)if(!ids.has(x))missing.push(x);
 const vm=tfVirtualMachineDefinitionV36224({id:"qual-vm",backend:"emulated",cpus:2,memoryBytes:64*1024*1024,image:"qualification-os.img",machine:"generic"});
 const admitted=tfVirtualMachineAdmissionV36224(vm,{authorized:true,backendAvailable:false});let backendDenied=false,authDenied=false;
 try{tfVirtualMachineAdmissionV36224(tfVirtualMachineDefinitionV36224({backend:"kvm",memoryBytes:64*1024*1024,image:"x.img"}),{authorized:true})}catch(e){backendDenied=true}
 try{tfVirtualMachineAdmissionV36224(vm,{})}catch(e){authDenied=true}
 if(!admitted||!backendDenied||!authDenied)missing.push("vm-boundary");
 if(TF_VIRTUALIZATION_SYSTEM_V36224.directHypervisor!==false||TF_EMULATION_SYSTEM_V36224.nativeExecution!==false||TF_BINARY_SYSTEM_V36224.executesByDefault!==false)missing.push("authority-distinction");
 if(missing.length)throw new Error("virtualization qualification failure "+missing.join(","));
 return Object.freeze({pass:true,binarySystem:true,emulationSystem:true,virtualizationSystem:true,virtualSystem:true,operatingSystemSystem:true,vmLifecycleStages:TF_VM_BOOT_LIFECYCLE_V36224.length,
  guestArchitecture:true,kvmBoundary:true,qemuBoundary:true,directHypervisor:false,binaryExecutesByDefault:false,authorizationRequired:true,authorityAmplification:false,missing:0});
}
/* === end v0.36.224 === */


 return Object.freeze({TF_BINARY_SYSTEM_V36224,TF_EMULATION_SYSTEM_V36224,TF_OPERATING_SYSTEM_SYSTEM_V36224,TF_VIRTUALIZATION_SYSTEM_V36224,TF_VIRTUAL_COMPUTATION_KIT_V36224,TF_VM_BOOT_LIFECYCLE_V36224,tfVirtualMachineAdmissionV36224,tfVirtualMachineDefinitionV36224,tfVirtualizationSelfTestV36224});
}
module.exports={bindVirtualizationV04454};
