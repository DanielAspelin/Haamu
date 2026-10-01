"use strict";
function bindPortingV04573(deps={}){
 const {tfCanonicalSystemIdsV36196,TF_SIX_STAGE_PORT_FAMILIES_V36331}=deps;
 /* === Terraformer v0.36.332: Porting / Porter / Portal Fabric === */
const TF_PORTING_SYSTEMS_V36332=Object.freeze([
 Object.freeze({id:"system.porting",concept:"Porting",type:"portability-process-system",mode:"controlled-context-porting",condition:"source-and-target-context-admitted",state:"ready"}),
 Object.freeze({id:"system.porter",concept:"Porter",type:"process-actor-system",mode:"porting-actor",condition:"porting-operation-admitted",state:"ready"}),
 Object.freeze({id:"system.portal",concept:"Portal",type:"boundary-interface-system",mode:"admitted-porting-boundary",condition:"portal-context-admitted",state:"ready"})
]);
const TF_PORTING_RELATIONSHIPS_V36332=Object.freeze([
 Object.freeze({from:"system.porting",relation:"uses",to:"system.portable"}),
 Object.freeze({from:"system.porting",relation:"may-use",to:"system.port"}),
 Object.freeze({from:"system.porting",relation:"uses",to:"system.portal"}),
 Object.freeze({from:"system.porter",relation:"operates-on",to:"system.porting"}),
 Object.freeze({from:"system.portal",relation:"uses",to:"system.interface"}),
 Object.freeze({from:"system.portal",relation:"may-use",to:"system.transfer"}),
 Object.freeze({from:"system.portal",relation:"may-use",to:"system.migration"})
]);
function tfPortingPlanV36332(spec={}){
 const system=String(spec.system??"");if(!system.startsWith("system."))throw new Error("canonical system id required");
 const source=spec.source==null?null:String(spec.source),target=spec.target==null?null:String(spec.target);
 return Object.freeze({system:"system.porting",subject:system,actor:"system.porter",portal:"system.portal",source,target,
  portable:true,logicalPortStages:TF_SIX_STAGE_PORT_FAMILIES_V36331,compatibilityRequired:true,admissionRequired:true,
  transferImplied:false,migrationImplied:false,installationImplied:false,networkTransmission:false,physicalBinding:false,
  mutationPerformed:false,persistencePerformed:false,authorityTransferred:false,authorityGranted:false});
}
function tfPortingSelfTestV36332(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.porting","system.porter","system.portal","system.portable","system.port","system.interface","system.transfer","system.migration"])if(!ids.has(id))missing.push(id);
 const p=tfPortingPlanV36332({system:"system.domain-controller",source:"context-a",target:"context-b"});
 if(!p.portable||p.logicalPortStages.length!==6||!p.compatibilityRequired||!p.admissionRequired||p.transferImplied||p.migrationImplied||p.installationImplied||p.networkTransmission||p.physicalBinding||p.mutationPerformed||p.persistencePerformed||p.authorityTransferred||p.authorityGranted)missing.push("porting-boundary");
 if(missing.length)throw new Error("porting qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,newSystems:3,porting:true,porter:true,portal:true,portableReused:true,portReused:true,
  interfaceReused:true,transferReused:true,migrationReused:true,sixStagePortPlanReused:true,
  transferImplied:false,migrationImplied:false,networkTransmission:false,physicalBinding:false,
  authorityTransfer:false,authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_PORTING_SYSTEMS_V36332,TF_PORTING_RELATIONSHIPS_V36332,tfPortingPlanV36332,tfPortingSelfTestV36332});
}
module.exports=Object.freeze({bindPortingV04573});
