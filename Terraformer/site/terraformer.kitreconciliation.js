"use strict";
function bindCanonicalKitReconciliationV04467(deps={}){
 const {TF_BOOT_GUEST_KIT_V36228,TF_ENVIRONMENT_KIT_V36222,TF_HOST_DISCOVERY_KIT_V36231,TF_HYPERVISOR_KIT_V36225,TF_IO_NATIVE_KIT_V36223,TF_LAUNCH_ADDRESS_KIT_V36232,TF_MACHINE_HARDWARE_KIT_V36227,TF_NAT_NIC_KIT_V36230,TF_SECURITY_EDGE_KIT_V36234,TF_SUBNET_KIT_V36233,TF_VIRTUAL_COMPUTATION_KIT_V36224,TF_VIRTUAL_MACHINE_KIT_V36226,TF_VIRTUAL_NETWORK_KIT_V36229,tfCanonicalKitInventoryV36220,tfCanonicalSystemIdsV36196}=deps;
/* === Terraformer v0.36.237: Successor Canonical Kit Registry Reconciliation === */
const TF_SUCCESSOR_SPECIALIZED_KITS_V36237=Object.freeze([
 TF_ENVIRONMENT_KIT_V36222,TF_IO_NATIVE_KIT_V36223,TF_VIRTUAL_COMPUTATION_KIT_V36224,TF_HYPERVISOR_KIT_V36225,
 TF_VIRTUAL_MACHINE_KIT_V36226,TF_MACHINE_HARDWARE_KIT_V36227,TF_BOOT_GUEST_KIT_V36228,TF_VIRTUAL_NETWORK_KIT_V36229,
 TF_NAT_NIC_KIT_V36230,TF_HOST_DISCOVERY_KIT_V36231,TF_LAUNCH_ADDRESS_KIT_V36232,TF_SUBNET_KIT_V36233,TF_SECURITY_EDGE_KIT_V36234
]);
function tfCanonicalKitInventoryV36237(sourceText){
 const predecessor=tfCanonicalKitInventoryV36220(sourceText),byId=new Map();
 for(const k of predecessor)if(k&&k.id)byId.set(String(k.id),k);
 for(const k of TF_SUCCESSOR_SPECIALIZED_KITS_V36237)if(k&&k.id)byId.set(String(k.id),k);
 return Object.freeze([...byId.values()].sort((a,b)=>String(a.id).localeCompare(String(b.id))));
}
function tfCanonicalKitCoverageV36237(sourceText){
 const systems=new Set(tfCanonicalSystemIdsV36196(sourceText)),kits=tfCanonicalKitInventoryV36237(sourceText),global=new Set(),specialized=new Set(),missing=[];
 for(const k of kits){for(const id of (k.members||[])){if(!systems.has(id))missing.push({kit:k.id,system:id});if(k.id==="kit.system")global.add(id);else specialized.add(id)}}
 const all=new Set([...global,...specialized]),unassigned=[...systems].filter(id=>!specialized.has(id));
 return Object.freeze({kits,counts:Object.freeze({canonicalKits:kits.length,canonicalSystems:systems.size,globalSystemKitMembers:global.size,specializedMemberSystems:specialized.size,
  uniqueKitMembers:all.size,specializedUnassignedSystems:unassigned.length,successorKits:TF_SUCCESSOR_SPECIALIZED_KITS_V36237.length}),
  globalCoverage:Object.freeze({kind:"catch-all",kit:"kit.system",covered:global.size,total:systems.size,complete:global.size===systems.size}),
  specializedCoverage:Object.freeze({kind:"semantic",covered:specialized.size,total:systems.size,complete:specialized.size===systems.size,unassigned:Object.freeze(unassigned)}),
  missing:Object.freeze(missing),intrinsic:kits.every(k=>k.intrinsic!==false),authorityAmplification:kits.some(k=>k.grantsAuthority===true)});
}
function tfCanonicalKitReverseLookupV36237(sourceText,systemId){
 return Object.freeze(tfCanonicalKitInventoryV36237(sourceText).filter(k=>(k.members||[]).includes(systemId)).map(k=>k.id));
}
function tfCanonicalKitRegistrySelfTestV36237(sourceText){
 const c=tfCanonicalKitCoverageV36237(sourceText),missing=[];
 for(const k of TF_SUCCESSOR_SPECIALIZED_KITS_V36237)if(!c.kits.some(x=>x.id===k.id))missing.push(k.id);
 if(!c.globalCoverage.complete)missing.push("global-coverage");if(c.missing.length)missing.push("dangling-kit-members");
 if(c.authorityAmplification)missing.push("authority-amplification");
 for(const id of ["system.environment","system.virtual-machine","system.subnet","system.firewall","system.antivirus","system.vm-launch-plan"])
  if(!tfCanonicalKitReverseLookupV36237(sourceText,id).length)missing.push("reverse:"+id);
 if(missing.length)throw new Error("canonical successor kit reconciliation failure "+missing.join(","));
 return Object.freeze({pass:true,canonicalKits:c.counts.canonicalKits,successorKits:c.counts.successorKits,canonicalSystems:c.counts.canonicalSystems,
  globalSystemKitMembers:c.counts.globalSystemKitMembers,specializedMemberSystems:c.counts.specializedMemberSystems,specializedUnassignedSystems:c.counts.specializedUnassignedSystems,
  globalCoverageComplete:c.globalCoverage.complete,specializedCoverageSeparated:true,reverseLookup:true,deduplicated:true,intrinsic:c.intrinsic,authorityAmplification:false,missing:0});
}
/* === end v0.36.237 === */


 return Object.freeze({TF_SUCCESSOR_SPECIALIZED_KITS_V36237,tfCanonicalKitCoverageV36237,tfCanonicalKitInventoryV36237,tfCanonicalKitRegistrySelfTestV36237,tfCanonicalKitReverseLookupV36237});
}
module.exports={bindCanonicalKitReconciliationV04467};
