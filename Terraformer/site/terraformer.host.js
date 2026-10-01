"use strict";
function bindHostV04461(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
/* === Terraformer v0.36.231: Host Capability Discovery === */
const TF_HOST_CAPABILITY_DISCOVERY_SYSTEM_V36231=Object.freeze({
 id:"system.host-capability-discovery",name:"Host Capability Discovery System",family:"discovery",type:"host-capability-discovery-system",mode:"read-only-observation",
 condition:Object.freeze(["scope-admitted","observation-read-only","evidence-recorded","authority-unchanged"]),state:"naturalized",
 integrates:Object.freeze(["system.discovery","system.capability","system.native","system.machine","system.virtualization","system.hypervisor","system.kvm","system.qemu","system.memory","system.resource","system.security","system.environment"]),
 governs:Object.freeze(["platform","architecture","cpu-virtualization-evidence","kvm-device-evidence","kvm-access-evidence","qemu-executable-evidence","qemu-version-evidence","memory-evidence","cpu-count-evidence"]),
 installs:false,changesPermissions:false,opensKvm:false,launchesProcess:false,mutatesHost:false,grantsAuthority:false,persists:false,intrinsic:true
});
function tfHostCapabilityFromProbeV36231(probe={}){
 const platform=String(probe.platform||"unknown"),arch=String(probe.arch||"unknown");
 const qemu=Object.freeze({path:probe.qemuPath?String(probe.qemuPath):null,detected:!!probe.qemuPath,version:probe.qemuVersion?String(probe.qemuVersion):null});
 const kvm=Object.freeze({device:"/dev/kvm",exists:probe.kvmExists===true,readable:probe.kvmReadable===true,writable:probe.kvmWritable===true,
  available:probe.kvmExists===true&&probe.kvmReadable===true&&probe.kvmWritable===true});
 return Object.freeze({system:"system.host-capability-discovery",observedAt:String(probe.observedAt||new Date().toISOString()),platform,arch,
  cpu:Object.freeze({count:Number.isSafeInteger(probe.cpuCount)?probe.cpuCount:null,virtualizationEvidence:Array.isArray(probe.cpuVirtualizationEvidence)?Object.freeze(probe.cpuVirtualizationEvidence.map(String)):Object.freeze([])}),
  memory:Object.freeze({totalBytes:Number.isSafeInteger(probe.totalMemoryBytes)?probe.totalMemoryBytes:null,freeBytes:Number.isSafeInteger(probe.freeMemoryBytes)?probe.freeMemoryBytes:null}),
  kvm,qemu,observational:true,hostMutation:false,authorityGranted:false});
}
function tfHostCapabilityProbeV36231(adapter){
 if(!adapter||typeof adapter!=="object")throw new Error("host observation adapter required");
 const read=(name,fallback)=>typeof adapter[name]==="function"?adapter[name]():fallback;
 return tfHostCapabilityFromProbeV36231({platform:read("platform","unknown"),arch:read("arch","unknown"),cpuCount:read("cpuCount",null),
  cpuVirtualizationEvidence:read("cpuVirtualizationEvidence",[]),totalMemoryBytes:read("totalMemoryBytes",null),freeMemoryBytes:read("freeMemoryBytes",null),
  kvmExists:read("kvmExists",false),kvmReadable:read("kvmReadable",false),kvmWritable:read("kvmWritable",false),
  qemuPath:read("qemuPath",null),qemuVersion:read("qemuVersion",null)});
}
function tfHostVirtualizationReadinessV36231(cap){
 if(!cap||cap.system!=="system.host-capability-discovery")throw new Error("host capability record required");
 return Object.freeze({platform:cap.platform,arch:cap.arch,kvmDetected:cap.kvm.exists,kvmAccessible:cap.kvm.available,qemuDetected:cap.qemu.detected,
  qemuVersionKnown:!!cap.qemu.version,cpuVirtualizationObserved:cap.cpu.virtualizationEvidence.length>0,
  executable:false,authorizationRequired:true,authorityGranted:false});
}
const TF_HOST_DISCOVERY_KIT_V36231=Object.freeze({id:"kit.host-capability-discovery",name:"Host Capability Discovery Kit",type:"intrinsic-kit",mode:"naturalized",
 condition:Object.freeze(["read-only","evidence-based","no-host-mutation"]),state:"naturalized",
 members:Object.freeze(["system.host-capability-discovery","system.discovery","system.capability","system.native","system.machine","system.virtualization","system.hypervisor","system.kvm","system.qemu","system.memory","system.resource","system.security","system.environment"]),
 intrinsic:true,plugin:false,module:false,loadable:false,unloadable:false,grantsAuthority:false});
function tfHostCapabilityDiscoverySelfTestV36231(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];for(const x of TF_HOST_DISCOVERY_KIT_V36231.members)if(!ids.has(x))missing.push(x);
 const cap=tfHostCapabilityProbeV36231({platform:()=> "linux",arch:()=> "x64",cpuCount:()=>8,cpuVirtualizationEvidence:()=>["vmx"],
  totalMemoryBytes:()=>8589934592,freeMemoryBytes:()=>4294967296,kvmExists:()=>true,kvmReadable:()=>true,kvmWritable:()=>true,qemuPath:()=>"/usr/bin/qemu-system-x86_64",qemuVersion:()=>"qualification"});
 const ready=tfHostVirtualizationReadinessV36231(cap);
 if(!ready.kvmAccessible||!ready.qemuDetected||!ready.cpuVirtualizationObserved||ready.executable!==false)missing.push("readiness");
 if(TF_HOST_CAPABILITY_DISCOVERY_SYSTEM_V36231.installs||TF_HOST_CAPABILITY_DISCOVERY_SYSTEM_V36231.changesPermissions||TF_HOST_CAPABILITY_DISCOVERY_SYSTEM_V36231.opensKvm||TF_HOST_CAPABILITY_DISCOVERY_SYSTEM_V36231.launchesProcess||cap.hostMutation)missing.push("observation-boundary");
 if(missing.length)throw new Error("host capability discovery qualification failure "+missing.join(","));
 return Object.freeze({pass:true,system:"system.host-capability-discovery",platform:true,architecture:true,cpuCount:true,cpuVirtualizationEvidence:true,kvmDevice:true,kvmAccess:true,qemuExecutable:true,qemuVersion:true,memory:true,
  readOnly:true,installs:false,changesPermissions:false,opensKvm:false,launchesProcess:false,hostMutation:false,authorizationRequiredForExecution:true,authorityAmplification:false,missing:0});
}
/* === end v0.36.231 === */


 return Object.freeze({TF_HOST_CAPABILITY_DISCOVERY_SYSTEM_V36231,TF_HOST_DISCOVERY_KIT_V36231,tfHostCapabilityDiscoverySelfTestV36231,tfHostCapabilityFromProbeV36231,tfHostCapabilityProbeV36231,tfHostVirtualizationReadinessV36231});
}
module.exports={bindHostV04461};
