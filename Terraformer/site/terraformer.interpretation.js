"use strict";
function bindInterpretationV04446(deps={}){
 const {tfCanonicalSystemIdsV36196,tfEntityObservabilityDescriptorV36207,tfIdentityUuidV36195,tfSystemAutomatorDescriptorV36196,tfSystemGeneratorDescriptorV36196,tfSystemWorkerDescriptorV36209}=deps;
/* === Terraformer v0.36.220: Native Interpretation System === */
const TF_INTERPRETATION_SYSTEM_V36216=Object.freeze({
 schema:"TERRAFORMER-INTERPRETATION-SYSTEM/1",id:"system.interpretation",name:"Interpretation System",
 family:"semantic-processing",type:"interpretation-system",mode:"evidence-bounded",
 condition:Object.freeze(["input-admitted","context-available","representation-valid","policy-valid"]),
 state:"registered",inputs:Object.freeze(["system.dios","system.context","system.information","system.language"]),
 outputs:Object.freeze(["meaning","representation","ambiguity","confidence","evidence","downstream-handoff"]),
 downstream:Object.freeze(["system.information","system.instruction","system.feature","system.interface"]),
 stages:Object.freeze(["admit","contextualize","parse","interpret","represent","identify-ambiguity","attach-evidence","validate","handoff"]),
 sourceMutation:false,executionAuthority:false,instructionAuthority:false,grantsAuthority:false,persists:false,
 logging:"system.logging",reporting:"system.reporting",intrinsic:true,plugin:false,module:false
});
function tfInterpretV36216(value,options={}){
 const context=options.context??null,evidence=Array.isArray(options.evidence)?options.evidence.slice():[],
 ambiguity=Array.isArray(options.ambiguity)?options.ambiguity.slice():[],
 confidence=Number.isFinite(options.confidence)?Math.max(0,Math.min(1,options.confidence)):null;
 const representation=Buffer.isBuffer(value)?Object.freeze({kind:"binary",bytes:value.length}):
   value===null?Object.freeze({kind:"null",value:null}):
   typeof value==="object"?Object.freeze({kind:"structured",value}):Object.freeze({kind:typeof value,value});
 return Object.freeze({type:"interpretation",mode:"evidence-bounded",condition:ambiguity.length?"ambiguous":"interpreted",state:"validated",
  source:value,context,representation,meaning:options.meaning??representation,ambiguity:Object.freeze(ambiguity),
  confidence,evidence:Object.freeze(evidence),sourceMutated:false,executable:false,authorityGranted:false});
}
function tfInterpretationDescriptorV36216(){
 return Object.freeze({...tfEntityObservabilityDescriptorV36207("system",TF_INTERPRETATION_SYSTEM_V36216),
 uuid:tfIdentityUuidV36195("canonical-system","system.interpretation"),worker:tfSystemWorkerDescriptorV36209("system.interpretation"),
 generator:tfEntityObservabilityDescriptorV36207("generator",tfSystemGeneratorDescriptorV36196("system.interpretation")),
 automator:tfEntityObservabilityDescriptorV36207("automator",tfSystemAutomatorDescriptorV36196("system.interpretation"))});
}
const TF_INTERPRETATION_KIT_V36216=Object.freeze({id:"kit.interpretation",name:"Interpretation Kit",type:"intrinsic-kit",mode:"naturalized",
 condition:Object.freeze(["members-canonical","semantic-boundary-valid"]),state:"naturalized",
 members:Object.freeze(["system.interpretation","system.dios","system.context","system.information","system.instruction","system.language","system.feature","system.interface"]),
 intrinsic:true,plugin:false,module:false,loadable:false,unloadable:false,logging:"system.logging",reporting:"system.reporting",grantsAuthority:false});
function tfInterpretationSelfTestV36216(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),d=tfInterpretationDescriptorV36216(),missing=[];
 for(const id of TF_INTERPRETATION_KIT_V36216.members)if(!ids.has(id))missing.push(id);
 for(const k of ["type","mode","condition","state","uuid"])if(d[k]===undefined||d[k]===null||d[k]==="")missing.push("system.interpretation:"+k);
 if(!d.worker||!d.generator||!d.automator||!d.logging?.enabled||!d.reporting?.enabled)missing.push("system.interpretation:fabric");
 const source=Object.freeze({a:1}),r=tfInterpretV36216(source,{meaning:"test",ambiguity:["example"],confidence:.5,evidence:["self-test"]});
 if(r.source!==source||r.sourceMutated||r.executable||r.authorityGranted||r.condition!=="ambiguous")missing.push("interpretation-boundary");
 if(missing.length)throw new Error("interpretation qualification failure "+missing.join(","));
 return Object.freeze({pass:true,system:"system.interpretation",stages:TF_INTERPRETATION_SYSTEM_V36216.stages.length,intrinsic:true,
 diosIntegrated:true,contextIntegrated:true,informationIntegrated:true,instructionIntegrated:true,languageIntegrated:true,featureIntegrated:true,interfaceIntegrated:true,
 ambiguityExplicit:true,confidenceExplicit:true,evidenceExplicit:true,sourceMutation:false,executionAuthority:false,workerCoverage:true,generatorCoverage:true,
 automatorCoverage:true,metadataCoverage:true,loggingCoverage:true,reportingCoverage:true,authorityGranted:false,missing:0});
}
/* === end v0.36.220 === */


 return Object.freeze({TF_INTERPRETATION_KIT_V36216,TF_INTERPRETATION_SYSTEM_V36216,tfInterpretV36216,tfInterpretationDescriptorV36216,tfInterpretationSelfTestV36216});
}
module.exports={bindInterpretationV04446};
