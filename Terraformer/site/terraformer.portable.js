"use strict";
function bindPortableDomainPortV04572(deps={}){
 const {tfCanonicalSystemIdsV36196,tfSystemPoolFarmerV36329}=deps;
 /* === Terraformer v0.36.331: Portable Domain Controller / Six-Stage Logical Port Fabric === */
const TF_PORTABLE_DOMAIN_SYSTEMS_V36331=Object.freeze([
 Object.freeze({id:"system.domain-controller",concept:"Domain Controller",type:"domain-coordination-system",mode:"portable-domain-control",condition:"domain-context-admitted",state:"ready"}),
 Object.freeze({id:"system.portable",concept:"Portable",type:"mobility-capability-system",mode:"cross-environment-portability",condition:"capability-boundaries-satisfied",state:"ready"})
]);
const TF_SIX_STAGE_PORT_FAMILIES_V36331=Object.freeze([
 Object.freeze({stage:1,tcp:9966,udp:9966,role:"bootstrap"}),
 Object.freeze({stage:2,tcp:19966,udp:19966,role:"control"}),
 Object.freeze({stage:3,tcp:29966,udp:29966,role:"coordination"}),
 Object.freeze({stage:4,tcp:39966,udp:39966,role:"data"}),
 Object.freeze({stage:5,tcp:49966,udp:49966,role:"service"}),
 Object.freeze({stage:6,tcp:59966,udp:59966,role:"extension"})
]);
const TF_PORTABLE_DOMAIN_RELATIONSHIPS_V36331=Object.freeze([
 Object.freeze({from:"system.domain-controller",relation:"operates-on",to:"system.domain"}),
 Object.freeze({from:"system.domain-controller",relation:"uses",to:"system.pool"}),
 Object.freeze({from:"system.domain-controller",relation:"uses",to:"system.portable"}),
 Object.freeze({from:"system.portable",relation:"applies-to",to:"system.system"}),
 Object.freeze({from:"system.port",relation:"used-by",to:"system.system"})
]);
function tfSystemPortabilityV36331(systemId){
 const id=String(systemId??"");if(!id.startsWith("system."))throw new Error("canonical system id required");
 return Object.freeze({system:id,portable:true,logicalPortStages:TF_SIX_STAGE_PORT_FAMILIES_V36331,
  physicalBinding:false,networkExposure:false,hostMutation:false,capabilityNegotiationRequired:true,authorityGranted:false});
}
function tfDomainControllerV36331(domain=""){
 const d=String(domain).trim().toLowerCase();if(!d)throw new Error("domain required");
 const owner="system.domain";
 return Object.freeze({system:"system.domain-controller",domain:d,portable:true,
  domainPool:tfSystemPoolFarmerV36329(owner).pool.id,poolOwner:owner,poolShared:false,
  logicalPortStages:TF_SIX_STAGE_PORT_FAMILIES_V36331,physicalBinding:false,dnsMutation:false,
  directoryAuthorityImplied:false,windowsActiveDirectoryImplied:false,externalControl:false,authorityGranted:false});
}
function tfPortableDomainPortSelfTestV36331(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.domain-controller","system.portable","system.domain","system.pool","system.port","system.tcp","system.udp"])if(!ids.has(id))missing.push(id);
 const all=[...ids],p=all.map(tfSystemPortabilityV36331),d=tfDomainControllerV36331("haamu.space");
 const ports=TF_SIX_STAGE_PORT_FAMILIES_V36331;
 if(p.length!==all.length||p.some(x=>!x.portable||x.logicalPortStages.length!==6||x.physicalBinding||x.networkExposure)||ports.length!==6||new Set(ports.map(x=>x.tcp)).size!==6||d.domainPool!=="system.domain.pool"||d.poolShared||d.physicalBinding||d.dnsMutation||d.windowsActiveDirectoryImplied||d.authorityGranted)missing.push("portable-domain-port-boundary");
 if(missing.length)throw new Error("portable domain port qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,newSystems:2,systemsCovered:all.length,everySystemPortable:true,everySystemLogicalPortStages:6,
  domainController:true,domainPoolReused:true,physicalPortsAllocated:0,physicalBinding:false,networkExposure:false,
  dnsMutation:false,activeDirectoryImplied:false,authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_PORTABLE_DOMAIN_SYSTEMS_V36331,TF_SIX_STAGE_PORT_FAMILIES_V36331,TF_PORTABLE_DOMAIN_RELATIONSHIPS_V36331,tfSystemPortabilityV36331,tfDomainControllerV36331,tfPortableDomainPortSelfTestV36331});
}
module.exports=Object.freeze({bindPortableDomainPortV04572});

/* Terraformer v0.48.12: qualified immutable depth-0 declaration migration. */
const TF_PORTABLE_DOMAIN_TYPES_V04572=Object.freeze({"system.domain-controller":"system.controller"});
