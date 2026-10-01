"use strict";
const SYSTEM=Object.freeze({id:"system.subsystem",concept:"Subsystem",authorityGranted:false,scaffold:true});
function bindSubsystemV04518(){return Object.freeze({SYSTEM});}


function bindSubstructureFabricV04518(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.285: Subsystem / Subshell Structural Fabric === */
const TF_SUBSTRUCTURE_FABRIC_V36285=Object.freeze([
 Object.freeze({id:"system.subsystem",concept:"Subsystem",type:"system-structural-entity",mode:"bounded",condition:"parent-system-identified-and-admitted",state:"ready",
  parentType:"system",inheritAuthority:false,independentIdentity:true}),
 Object.freeze({id:"system.subshell",concept:"Subshell",type:"shell-structural-entity",mode:"bounded",condition:"parent-shell-identified-and-admitted",state:"ready",
  parent:"system.shell",inheritAuthority:false,independentContext:true})
]);
const TF_SUBSTRUCTURE_RELATIONSHIPS_V36285=Object.freeze([
 Object.freeze({from:"system.subsystem",relation:"part-of",to:"system.system"}),
 Object.freeze({from:"system.subshell",relation:"part-of",to:"system.shell"})
]);
function tfSubsystemPlanV36285(spec={}){
 const parent=String(spec.parentSystem||""),child=String(spec.subsystemId||"");
 return Object.freeze({system:"system.subsystem",parent,child,admitted:/^system\.[a-z0-9_.-]+$/.test(parent)&&/^system\.[a-z0-9_.-]+$/.test(child)&&spec.authorized===true,
  authorityInherited:false,authorityGranted:false,executes:false});
}
function tfSubshellPlanV36285(spec={}){
 const parent=String(spec.parentShell||"system.shell"),name=String(spec.name||"");
 return Object.freeze({system:"system.subshell",parent,name,admitted:parent==="system.shell"&&name.length>0&&spec.authorized===true,
  authorityInherited:false,authorityGranted:false,executes:false});
}
function tfSubstructureFabricSelfTestV36285(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=["system.system","system.subsystem","system.shell","system.subshell"].filter(x=>!ids.has(x));
 for(const x of TF_SUBSTRUCTURE_FABRIC_V36285)for(const k of ["type","mode","condition","state"])if(!x[k])missing.push(x.id+":"+k);
 const a=tfSubsystemPlanV36285({parentSystem:"system.education",subsystemId:"system.teaching",authorized:true});
 const b=tfSubshellPlanV36285({name:"bounded-child",authorized:true});
 if(!a.admitted||!b.admitted||a.authorityInherited||b.authorityInherited||a.executes||b.executes)missing.push("substructure-boundary");
 if(missing.length)throw new Error("substructure qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,subsystem:true,subshell:true,parentSystemRequired:true,parentShellRequired:true,independentIdentity:true,
  authorityInheritance:false,executionImplied:false,typeCoverage:true,modeCoverage:true,conditionCoverage:true,stateCoverage:true,missing:0});
}
 return Object.freeze({TF_SUBSTRUCTURE_FABRIC_V36285,TF_SUBSTRUCTURE_RELATIONSHIPS_V36285,tfSubsystemPlanV36285,tfSubshellPlanV36285,tfSubstructureFabricSelfTestV36285});
}
module.exports=Object.freeze({bindSubsystemV04518,bindSubstructureFabricV04518});
