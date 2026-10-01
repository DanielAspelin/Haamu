"use strict";
function bindHypervisorV04455(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
/* === Terraformer v0.36.225: Hypervisor, KVM & QEMU Systems === */
const TF_HYPERVISOR_SYSTEM_V36225=Object.freeze({id:"system.hypervisor",name:"Hypervisor System",family:"virtual-computation",type:"hypervisor-system",mode:"backend-control-boundary",
 condition:Object.freeze(["backend-detected","backend-admitted","resources-bounded","execution-authorized"]),state:"naturalized",
 integrates:Object.freeze(["system.virtualization","system.emulation","system.operating-system","system.kvm","system.qemu","system.security","system.lifecycle","system.environment"]),
 governs:Object.freeze(["hypervisor-backend-selection","vm-execution-boundary","virtual-resource-control","guest-isolation","backend-lifecycle"]),
 isHypervisorImplementation:false,hostAuthorityRequired:true,grantsAuthority:false,persists:false,intrinsic:true});
const TF_KVM_SYSTEM_V36225=Object.freeze({id:"system.kvm",name:"KVM System",family:"virtualization-backend",type:"kvm-system",mode:"linux-kernel-virtualization-adapter",
 condition:Object.freeze(["linux-host","kvm-device-detected","permission-admitted","execution-authorized"]),state:"naturalized",
 integrates:Object.freeze(["system.hypervisor","system.virtualization","system.native","system.operating-system"]),device:"/dev/kvm",
 provides:Object.freeze(["hardware-assisted-virtualization-reference","vcpu-execution-backend","guest-memory-backend"]),availabilityAssumed:false,permissionAssumed:false,
 grantsAuthority:false,persists:false,intrinsic:true});
const TF_QEMU_SYSTEM_V36225=Object.freeze({id:"system.qemu",name:"QEMU System",family:"emulation-virtualization-backend",type:"qemu-system",mode:"external-backend-adapter",
 condition:Object.freeze(["qemu-binary-detected","machine-compatible","execution-authorized"]),state:"naturalized",
 integrates:Object.freeze(["system.hypervisor","system.virtualization","system.emulation","system.kvm","system.operating-system","system.binary"]),
 provides:Object.freeze(["machine-emulation-reference","device-model-reference","software-emulation-backend","kvm-accelerated-backend-reference"]),availabilityAssumed:false,
 executesExternalProcessByDefault:false,grantsAuthority:false,persists:false,intrinsic:true});
function tfHypervisorBackendDescribeV36225(name,probe={}){
 name=String(name||"").toLowerCase();if(!["kvm","qemu"].includes(name))throw new Error("unknown hypervisor backend");
 if(name==="kvm")return Object.freeze({system:"system.kvm",backend:"kvm",detected:probe.detected===true,permitted:probe.permitted===true,available:probe.detected===true&&probe.permitted===true,authorityGranted:false});
 return Object.freeze({system:"system.qemu",backend:"qemu",detected:probe.detected===true,permitted:probe.permitted===true,available:probe.detected===true&&probe.permitted===true,authorityGranted:false});
}
function tfHypervisorAdmissionV36225(backend,options={}){
 if(!backend?.system)throw new Error("backend descriptor required");if(!backend.detected)throw new Error("hypervisor backend not detected");
 if(!backend.permitted)throw new Error("hypervisor backend permission unavailable");if(options.authorized!==true)throw new Error("hypervisor execution authorization required");
 return Object.freeze({...backend,admitted:true,executionAuthorized:true,authorityGranted:false});
}
const TF_HYPERVISOR_KIT_V36225=Object.freeze({id:"kit.hypervisor",name:"Hypervisor Kit",type:"intrinsic-kit",mode:"naturalized",
 condition:Object.freeze(["virtualization-boundary-valid","backend-detection-required","authorization-explicit"]),state:"naturalized",
 members:Object.freeze(["system.hypervisor","system.kvm","system.qemu","system.virtualization","system.emulation","system.virtual","system.operating-system","system.binary","system.native","system.architecture","system.lifecycle","system.environment","system.security","system.recovery"]),
 intrinsic:true,plugin:false,module:false,loadable:false,unloadable:false,grantsAuthority:false});
function tfHypervisorSelfTestV36225(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];for(const x of TF_HYPERVISOR_KIT_V36225.members)if(!ids.has(x))missing.push(x);
 const k=tfHypervisorBackendDescribeV36225("kvm",{detected:true,permitted:true}),q=tfHypervisorBackendDescribeV36225("qemu",{detected:false,permitted:false});
 const admitted=tfHypervisorAdmissionV36225(k,{authorized:true});let detectionDenied=false,authDenied=false;
 try{tfHypervisorAdmissionV36225(q,{authorized:true})}catch(e){detectionDenied=true}
 try{tfHypervisorAdmissionV36225(k,{})}catch(e){authDenied=true}
 if(!admitted.admitted||!detectionDenied||!authDenied)missing.push("backend-admission");
 if(TF_HYPERVISOR_SYSTEM_V36225.isHypervisorImplementation!==false||TF_KVM_SYSTEM_V36225.availabilityAssumed!==false||TF_QEMU_SYSTEM_V36225.availabilityAssumed!==false)missing.push("host-claims");
 if(missing.length)throw new Error("hypervisor qualification failure "+missing.join(","));
 return Object.freeze({pass:true,hypervisorSystem:true,kvmSystem:true,qemuSystem:true,virtualizationIntegrated:true,emulationIntegrated:true,operatingSystemIntegrated:true,
  backendDetectionRequired:true,backendPermissionRequired:true,executionAuthorizationRequired:true,availabilityAssumed:false,hypervisorImplementationClaimed:false,authorityAmplification:false,missing:0});
}
/* === end v0.36.225 === */


 return Object.freeze({TF_HYPERVISOR_KIT_V36225,TF_HYPERVISOR_SYSTEM_V36225,TF_KVM_SYSTEM_V36225,TF_QEMU_SYSTEM_V36225,tfHypervisorAdmissionV36225,tfHypervisorBackendDescribeV36225,tfHypervisorSelfTestV36225});
}
module.exports={bindHypervisorV04455};
