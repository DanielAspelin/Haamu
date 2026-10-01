"use strict";
function bindBootstrapV04519(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.286: Bootstrap System === */
const TF_BOOTSTRAP_SYSTEM_V36286=Object.freeze({
 id:"system.bootstrap",concept:"Bootstrap",type:"system-initialization-process",mode:"bounded",
 condition:"kernel-entry-validated",state:"ready",
 stages:Object.freeze(["kernel-entry","construct-bootstrap-system","validate-core","register-system-fabric","verify-registry","handoff-runtime"]),
 kernelExceptionBoundary:"minimum-entry-only",authorityExpansion:false,persistenceByDefault:false
});
function tfBootstrapPlanV36286(spec={}){
 const admitted=spec.authorized===true&&spec.kernelValidated===true;
 return Object.freeze({system:"system.bootstrap",admitted,stages:TF_BOOTSTRAP_SYSTEM_V36286.stages,
  kernelException:"minimum-entry-only",registersFabric:false,executes:false,persists:false,authorityGranted:false});
}
function tfBootstrapSystemSelfTestV36286(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 if(!ids.has("system.bootstrap"))missing.push("system.bootstrap");
 for(const k of ["type","mode","condition","state"])if(!TF_BOOTSTRAP_SYSTEM_V36286[k])missing.push("bootstrap:"+k);
 const denied=tfBootstrapPlanV36286({authorized:true}),ok=tfBootstrapPlanV36286({authorized:true,kernelValidated:true});
 if(denied.admitted||!ok.admitted||ok.registersFabric||ok.executes||ok.persists||ok.authorityGranted)missing.push("bootstrap-boundary");
 if(missing.length)throw new Error("bootstrap system qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,bootstrapSystem:true,kernelEntryBoundary:true,systemFabricHandoff:true,typeCoverage:true,modeCoverage:true,
  conditionCoverage:true,stateCoverage:true,executionPerformed:false,persistencePerformed:false,authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_BOOTSTRAP_SYSTEM_V36286,tfBootstrapPlanV36286,tfBootstrapSystemSelfTestV36286});
}
module.exports=Object.freeze({bindBootstrapV04519});
