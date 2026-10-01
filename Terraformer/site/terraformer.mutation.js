"use strict";
function bindMutationV04447(deps={}){
 const {tfCanonicalSystemIdsV36196,tfEntityObservabilityDescriptorV36207,tfIdentityUuidV36195,tfSystemAutomatorDescriptorV36196,tfSystemGeneratorDescriptorV36196,tfSystemWorkerDescriptorV36209}=deps;
/* === Terraformer v0.36.220: Controlled Mutation System === */
const TF_MUTATION_SYSTEM_V36217=Object.freeze({
 schema:"TERRAFORMER-MUTATION-SYSTEM/1",id:"system.mutation",name:"Mutation System",family:"controlled-transformation",
 type:"mutation-system",mode:"authorization-required",condition:Object.freeze(["target-defined","mutation-defined","scope-valid","authorization-valid","prestate-captured"]),
 state:"registered",stages:Object.freeze(["propose","validate-proposal","authorize","capture-prestate","mutate-copy","validate-result","compare","accept-or-recover","report"]),
 integrates:Object.freeze(["system.interpretation","system.validation","system.verification","system.checkpoint","system.snapshot","system.recovery","system.history","system.state"]),
 sourceMutationByDefault:false,inPlaceMutation:false,persistenceByDefault:false,grantsAuthority:false,
 logging:"system.logging",reporting:"system.reporting",intrinsic:true,plugin:false,module:false
});
function tfMutationCloneV36217(value){
 if(typeof structuredClone==="function")return structuredClone(value);
 return value===undefined?undefined:JSON.parse(JSON.stringify(value));
}
function tfMutationV36217(target,mutator,options={}){
 if(typeof mutator!=="function")throw new TypeError("mutation function required");
 if(options.authorized!==true)throw new Error("mutation authorization required");
 const before=tfMutationCloneV36217(target),working=tfMutationCloneV36217(target),after=mutator(working);
 const result=after===undefined?working:after,validator=typeof options.validate==="function"?options.validate:()=>true;
 const valid=validator(result,before)===true;
 return Object.freeze({type:"mutation-result",mode:"authorized-copy-on-mutate",condition:valid?"validated":"rejected",state:valid?"accepted":"recover",
  before:Object.freeze({value:before}),after:Object.freeze({value:valid?result:before}),candidate:Object.freeze({value:result}),
  changed:JSON.stringify(before)!==JSON.stringify(result),sourceMutated:false,inPlace:false,persisted:false,recoveryRequired:!valid,authorityGranted:false});
}
function tfMutationDescriptorV36217(){
 return Object.freeze({...tfEntityObservabilityDescriptorV36207("system",TF_MUTATION_SYSTEM_V36217),
 uuid:tfIdentityUuidV36195("canonical-system","system.mutation"),worker:tfSystemWorkerDescriptorV36209("system.mutation"),
 generator:tfEntityObservabilityDescriptorV36207("generator",tfSystemGeneratorDescriptorV36196("system.mutation")),
 automator:tfEntityObservabilityDescriptorV36207("automator",tfSystemAutomatorDescriptorV36196("system.mutation"))});
}
const TF_MUTATION_KIT_V36217=Object.freeze({id:"kit.mutation",name:"Mutation Kit",type:"intrinsic-kit",mode:"naturalized",
 condition:Object.freeze(["members-canonical","authorization-boundary-valid","recovery-path-valid"]),state:"naturalized",
 members:Object.freeze(["system.mutation","system.interpretation","system.validation","system.verification","system.checkpoint","system.snapshot","system.recovery","system.history","system.state"]),
 intrinsic:true,plugin:false,module:false,loadable:false,unloadable:false,logging:"system.logging",reporting:"system.reporting",grantsAuthority:false});
function tfMutationSelfTestV36217(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),d=tfMutationDescriptorV36217(),missing=[];
 for(const id of TF_MUTATION_KIT_V36217.members)if(!ids.has(id))missing.push(id);
 for(const k of ["type","mode","condition","state","uuid"])if(d[k]===undefined||d[k]===null||d[k]==="")missing.push("system.mutation:"+k);
 if(!d.worker||!d.generator||!d.automator||!d.logging?.enabled||!d.reporting?.enabled)missing.push("system.mutation:fabric");
 const source=Object.freeze({n:1}),ok=tfMutationV36217(source,x=>{x.n=2;return x},{authorized:true,validate:x=>x.n===2});
 const rejected=tfMutationV36217(source,x=>{x.n=3;return x},{authorized:true,validate:()=>false});
 let denied=false;try{tfMutationV36217(source,x=>x)}catch(e){denied=true}
 if(source.n!==1||ok.after.value.n!==2||ok.sourceMutated||ok.authorityGranted||rejected.state!=="recover"||rejected.after.value.n!==1||!denied)missing.push("mutation-boundary");
 if(missing.length)throw new Error("mutation qualification failure "+missing.join(","));
 return Object.freeze({pass:true,system:"system.mutation",stages:TF_MUTATION_SYSTEM_V36217.stages.length,intrinsic:true,authorizationRequired:true,
 copyOnMutate:true,inPlaceMutation:false,prestateEvidence:true,validationRequired:true,recoveryPath:true,interpretationSeparated:true,persistenceByDefault:false,
 workerCoverage:true,generatorCoverage:true,automatorCoverage:true,metadataCoverage:true,loggingCoverage:true,reportingCoverage:true,authorityGranted:false,missing:0});
}
/* === end v0.36.220 === */


 return Object.freeze({TF_MUTATION_KIT_V36217,TF_MUTATION_SYSTEM_V36217,tfMutationCloneV36217,tfMutationDescriptorV36217,tfMutationSelfTestV36217,tfMutationV36217});
}
module.exports={bindMutationV04447};
