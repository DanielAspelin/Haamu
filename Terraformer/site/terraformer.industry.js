"use strict";
function bindIndustryV04443(deps={}){
 const {tfCanonicalSystemIdsV36196,tfEntityObservabilityDescriptorV36207,tfIdentityUuidV36195,tfSystemAutomatorDescriptorV36196,tfSystemGeneratorDescriptorV36196,tfSystemWorkerDescriptorV36209}=deps;
/* === Terraformer v0.36.220: Design-to-Obtainment Industrial Fabric === */
const TF_INDUSTRIAL_SYSTEMS_V36213=Object.freeze({
 industry:Object.freeze({id:"system.industry",name:"Industry System",type:"industrial-domain",mode:"organizational",condition:["scope-defined","policy-valid"],state:"registered",contains:["system.cad","system.simulation","system.factory","system.manufacturing","system.production","system.delivery","system.obtainment"]}),
 cad:Object.freeze({id:"system.cad",name:"CAD System",expandedName:"Computer-Aided Design System",type:"design-system",mode:"computer-aided-design",condition:["requirements-present","design-scope-valid"],state:"registered",input:"requirements",output:"design",productionAuthority:false}),
 simulation:Object.freeze({id:"system.simulation",name:"Simulation System",type:"simulation-system",mode:"non-production-model",condition:["design-present","model-valid"],state:"registered",input:"design",output:"simulation-evidence",productionAuthority:false}),
 factory:Object.freeze({id:"system.factory",name:"Factory System",type:"factory-system",mode:"bounded-facility-model",condition:["simulation-qualified","resources-admitted"],state:"registered",input:"qualified-design",output:"manufacturing-readiness"}),
 manufacturing:Object.freeze({id:"system.manufacturing",name:"Manufacturing System",type:"manufacturing-system",mode:"bounded-transformation",condition:["factory-ready","design-qualified","resources-authorized"],state:"registered",input:"manufacturing-readiness",output:"manufactured-output"}),
 production:Object.freeze({id:"system.production",name:"Production System",type:"production-system",mode:"bounded-production",condition:["manufactured-output-valid","production-policy-allows"],state:"registered",input:"manufactured-output",output:"production-output"}),
 delivery:Object.freeze({id:"system.delivery",name:"Delivery System",type:"delivery-system",mode:"authorization-required",condition:["production-output-valid","destination-authorized","delivery-authorized"],state:"registered",input:"production-output",output:"delivery-record",externalConsequence:true}),
 obtainment:Object.freeze({id:"system.obtainment",name:"Obtainment System",type:"obtainment-system",mode:"authorization-required",condition:["delivery-valid","recipient-authorized","acceptance-valid"],state:"registered",input:"delivery-record",output:"obtainment-record",ownershipImplied:false})
});
const TF_INDUSTRIAL_FLOW_V36213=Object.freeze(["system.cad","system.simulation","system.factory","system.manufacturing","system.production","system.delivery","system.obtainment"]);
function tfIndustrialSystemDescriptorV36213(name){
 const x=TF_INDUSTRIAL_SYSTEMS_V36213[String(name||"").toLowerCase()];if(!x)return null;
 return Object.freeze({...tfEntityObservabilityDescriptorV36207("system",{...x,family:"industry",grantsAuthority:false,persists:false}),
   uuid:tfIdentityUuidV36195("industrial-system",x.id),worker:tfSystemWorkerDescriptorV36209(x.id),
   generator:tfEntityObservabilityDescriptorV36207("generator",tfSystemGeneratorDescriptorV36196(x.id)),
   automator:tfEntityObservabilityDescriptorV36207("automator",tfSystemAutomatorDescriptorV36196(x.id))});
}
function tfIndustrialFlowV36213(){return Object.freeze(TF_INDUSTRIAL_FLOW_V36213.map(id=>tfIndustrialSystemDescriptorV36213(id.slice(7))))}
function tfIndustrialTransitionV36213(from,to,evidence={}){
 const a=TF_INDUSTRIAL_FLOW_V36213.indexOf(String(from)),b=TF_INDUSTRIAL_FLOW_V36213.indexOf(String(to));
 const adjacent=a>=0&&b===a+1,external=to==="system.delivery"||to==="system.obtainment";
 return Object.freeze({from,to,adjacent,external,authorized:!external||evidence.authorized===true,admissible:adjacent&&(!external||evidence.authorized===true),authorityGranted:false});
}
const TF_INDUSTRIAL_KIT_V36213=Object.freeze({id:"kit.industry",name:"Industry Kit",type:"intrinsic-computational-kit",mode:"naturalized",condition:["canonical-members-resolved","ordered-flow-valid"],state:"naturalized",intrinsic:true,plugin:false,module:false,loadable:false,unloadable:false,members:Object.freeze(["system.industry",...TF_INDUSTRIAL_FLOW_V36213]),logging:"system.logging",reporting:"system.reporting"});
function tfIndustrialFabricSelfTestV36213(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),names=Object.keys(TF_INDUSTRIAL_SYSTEMS_V36213),missing=[];
 for(const n of names){const d=tfIndustrialSystemDescriptorV36213(n);if(!ids.has(d.id))missing.push(d.id);for(const k of ["type","mode","condition","state","uuid"])if(d[k]===undefined||d[k]===null||d[k]==="")missing.push(d.id+":"+k);if(!d.logging?.enabled||!d.reporting?.enabled)missing.push(d.id+":observability");if(!d.worker||!d.generator||!d.automator)missing.push(d.id+":entity-fabric")}
 for(let i=0;i<TF_INDUSTRIAL_FLOW_V36213.length-1;i++){const a=TF_INDUSTRIAL_FLOW_V36213[i],b=TF_INDUSTRIAL_FLOW_V36213[i+1],external=b==="system.delivery"||b==="system.obtainment";const t=tfIndustrialTransitionV36213(a,b,{authorized:external});if(!t.admissible)missing.push(a+"->"+b)}
 if(tfIndustrialTransitionV36213("system.production","system.delivery").admissible)missing.push("delivery-authority-boundary");
 if(missing.length)throw new Error("industrial fabric qualification failure "+missing.join(","));
 return Object.freeze({pass:true,systems:names.length,flow:TF_INDUSTRIAL_FLOW_V36213,industryEnvelope:true,cad:true,simulationNonProduction:true,factory:true,manufacturing:true,production:true,deliveryAuthorizationBoundary:true,obtainmentAuthorizationBoundary:true,kitIntrinsic:true,metadataCoverage:true,workerCoverage:true,generatorCoverage:true,automatorCoverage:true,loggingCoverage:true,reportingCoverage:true,missing:0});
}
/* === end v0.36.220 === */


 return Object.freeze({tfIndustrialSystemDescriptorV36213,TF_INDUSTRIAL_SYSTEMS_V36213,tfIndustrialFabricSelfTestV36213,tfIndustrialTransitionV36213,TF_INDUSTRIAL_KIT_V36213,TF_INDUSTRIAL_FLOW_V36213,tfIndustrialFlowV36213});
}
module.exports={bindIndustryV04443};
