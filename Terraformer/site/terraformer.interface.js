"use strict";
function bindInterfaceV04444(deps={}){
 const {tfCanonicalSystemIdsV36196,tfEntityObservabilityDescriptorV36207,tfIdentityUuidV36195,tfSystemAutomatorDescriptorV36196,tfSystemGeneratorDescriptorV36196,tfSystemWorkerDescriptorV36209}=deps;
 const tfOperationalEntityFabric=()=>deps.TF_OPERATIONAL_ENTITY_FABRIC_V36275;
/* === Terraformer v0.36.220: Interface & Feature Systems === */
const TF_INTERFACE_SYSTEM_V36214=Object.freeze({
 schema:"TERRAFORMER-INTERFACE-SYSTEM/1",id:"system.interface",name:"Interface System",family:"interaction",
 type:"interface-system",mode:"native-boundary",condition:Object.freeze(["interface-defined","scope-valid","exposure-policy-valid"]),
 state:"registered",role:"Exposes admitted capabilities and interactions across a defined boundary without creating capability or authority.",
 logging:"system.logging",reporting:"system.reporting",intrinsic:true,grantsAuthority:false,persists:false
});
const TF_FEATURE_SYSTEM_V36214=Object.freeze({
 schema:"TERRAFORMER-FEATURE-SYSTEM/1",id:"system.feature",name:"Feature System",family:"capability-description",
 type:"feature-system",mode:"native-capability-description",condition:Object.freeze(["feature-defined","capability-referenced","scope-valid","policy-valid"]),
 state:"registered",role:"Describes an admitted capability or behavior and its conditions without itself executing or granting authority.",
 interfacesThrough:"system.interface",logging:"system.logging",reporting:"system.reporting",intrinsic:true,grantsExecution:false,grantsAuthority:false,persists:false
});
function tfInterfaceFeatureDescriptorV36214(id){
 const x=id==="system.interface"?TF_INTERFACE_SYSTEM_V36214:id==="system.feature"?TF_FEATURE_SYSTEM_V36214:null;if(!x)return null;
 return Object.freeze({...tfEntityObservabilityDescriptorV36207("system",x),uuid:tfIdentityUuidV36195("canonical-system",x.id),
  worker:tfSystemWorkerDescriptorV36209(x.id),generator:tfEntityObservabilityDescriptorV36207("generator",tfSystemGeneratorDescriptorV36196(x.id)),
  automator:tfEntityObservabilityDescriptorV36207("automator",tfSystemAutomatorDescriptorV36196(x.id))});
}
const TF_INTERFACE_FEATURE_KIT_V36214=Object.freeze({id:"kit.interface-feature",name:"Interface & Feature Kit",type:"intrinsic-kit",mode:"naturalized",
 condition:Object.freeze(["members-canonical","feature-interface-separation-valid"]),state:"naturalized",members:Object.freeze(["system.interface","system.feature"]),
 intrinsic:true,plugin:false,module:false,loadable:false,unloadable:false,logging:"system.logging",reporting:"system.reporting",grantsAuthority:false});
function tfInterfaceFeatureSelfTestV36214(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const x of tfOperationalEntityFabric()){if(!ids.has(x.id))missing.push(x.id);for(const k of ["type","mode","condition","state"])if(!x[k])missing.push(x.id+":"+k);}
 for(const id of TF_INTERFACE_FEATURE_KIT_V36214.members){const d=tfInterfaceFeatureDescriptorV36214(id);if(!ids.has(id))missing.push(id);
  for(const k of ["type","mode","condition","state","uuid"])if(d[k]===undefined||d[k]===null||d[k]==="")missing.push(id+":"+k);
  if(!d.logging?.enabled||!d.reporting?.enabled)missing.push(id+":observability");if(!d.worker||!d.generator||!d.automator)missing.push(id+":entity-fabric")}
 if(TF_FEATURE_SYSTEM_V36214.grantsExecution||TF_FEATURE_SYSTEM_V36214.grantsAuthority||TF_INTERFACE_SYSTEM_V36214.grantsAuthority)missing.push("authority-separation");
 if(missing.length)throw new Error("interface/feature qualification failure "+missing.join(","));
 return Object.freeze({pass:true,interfaceSystem:true,featureSystem:true,separatedRoles:true,interfaceIsExposureBoundary:true,featureIsCapabilityDescription:true,
 workerCoverage:true,generatorCoverage:true,automatorCoverage:true,metadataCoverage:true,loggingCoverage:true,reportingCoverage:true,intrinsicKit:true,authorityGranted:false,missing:0});
}
/* === end v0.36.220 === */


 return Object.freeze({TF_FEATURE_SYSTEM_V36214,TF_INTERFACE_FEATURE_KIT_V36214,TF_INTERFACE_SYSTEM_V36214,tfInterfaceFeatureDescriptorV36214,tfInterfaceFeatureSelfTestV36214});
}
module.exports={bindInterfaceV04444};
