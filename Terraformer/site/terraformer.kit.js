"use strict";
function bindKitV04442(deps={}){
 const {tfCanonicalSystemIdsV36196,tfEntityDescriptorV36206,tfEntityObservabilityDescriptorV36207,tfIdentityUuidV36195,tfSystemAutomatorDescriptorV36196,tfSystemDerivedWorkerFabricV36209,tfSystemGeneratorDescriptorV36196}=deps;
/* === Terraformer v0.36.220: Tool & Kit Peer Architecture === */
const TERRAFORMER_KIT_SYSTEM_V36210=Object.freeze({
 schema:"TERRAFORMER-KIT-SYSTEM/1",id:"system.kit",name:"Kit System",family:"composition",
 type:"kit-composition-system",mode:"bounded-composition",
 condition:Object.freeze(["components-known","purpose-defined","scope-valid","policy-valid"]),
 state:"registered",peer:"system.tool",logging:"system.logging",reporting:"system.reporting",
 rule:"A Tool is an individual instrument/capability. A Kit is an ordered purpose-bound composition of tools and optionally workers/resources. Composition grants no authority.",
 grantsAuthority:false,persists:false
});
const TF_KIT_DEFINITIONS_V36210=Object.freeze({
 development:Object.freeze({id:"kit.development",name:"Development Kit",purpose:"construct and qualify software",tools:Object.freeze(["system.tool.nodejs","system.tool.npm","system.tool.git","system.tool.bash"]),workerRoles:Object.freeze(["processor","validator","runner","collector","reporter","qualifier"])}),
 web:Object.freeze({id:"kit.web",name:"Web Kit",purpose:"bounded browser and web work",tools:Object.freeze(["system.tool.browser","system.tool.nodejs"]),workerRoles:Object.freeze(["detector","adapter","validator","runner","collector","reporter"])}),
 source:Object.freeze({id:"kit.source",name:"Source Kit",purpose:"source inspection and controlled transformation",tools:Object.freeze(["system.tool.git","system.tool.bash","system.tool.nodejs"]),workerRoles:Object.freeze(["detector","validator","runner","collector","reporter","qualifier"])}),
 qualification:Object.freeze({id:"kit.qualification",name:"Qualification Kit",purpose:"validate verify collect and report evidence",tools:Object.freeze(["system.tool.nodejs","system.tool.bash"]),workerRoles:Object.freeze(["validator","runner","collector","reporter","qualifier"])}),
 language:Object.freeze({id:"kit.language",name:"Language Kit",purpose:"language processing pipeline",tools:Object.freeze(["system.linguist.tool"]),workerRoles:Object.freeze(["lexer","parser","tokenizer","validator","serializer","interpreter","compiler","transpiler"])})
});
function tfKitDescriptorV36210(name){
 const k=TF_KIT_DEFINITIONS_V36210[String(name||"").toLowerCase()];if(!k)return null;
 const e=tfEntityObservabilityDescriptorV36207("system",{...k,type:"kit",mode:"bounded-composition",condition:["components-known","purpose-defined","scope-valid","policy-allows"],state:"registered",parent:"system.kit",grantsAuthority:false});
 return Object.freeze({...e,uuid:tfIdentityUuidV36195("kit",k.id),components:Object.freeze([...k.tools]),workers:Object.freeze([...k.workerRoles]),generator:tfEntityDescriptorV36206("generator",tfSystemGeneratorDescriptorV36196("system.kit")),automator:tfEntityDescriptorV36206("automator",tfSystemAutomatorDescriptorV36196("system.kit"))});
}
function tfKitInventoryV36210(){return Object.freeze(Object.keys(TF_KIT_DEFINITIONS_V36210).map(tfKitDescriptorV36210))}
function tfKitSelfTestV36210(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),kits=tfKitInventoryV36210(),missing=[];
 if(!ids.has("system.kit"))missing.push("system.kit");if(!ids.has("system.tool"))missing.push("system.tool");
 for(const k of kits){for(const x of ["type","mode","condition","state","uuid"])if(k[x]===undefined||k[x]===null||k[x]==="")missing.push(k.id+":"+x);if(!k.logging?.enabled)missing.push(k.id+":logging");if(!k.reporting?.enabled)missing.push(k.id+":reporting");if(!k.generator||!k.automator)missing.push(k.id+":generation-automation");for(const t of k.components)if(!ids.has(t))missing.push(k.id+":tool:"+t)}
 if(missing.length)throw new Error("kit qualification failure "+missing.join(","));
 return Object.freeze({pass:true,toolSystem:true,kitSystem:true,peerArchitecture:true,kits:kits.length,toolComponents:[...new Set(kits.flatMap(k=>k.components))].length,metadataCoverage:true,loggingCoverage:true,reportingCoverage:true,generatorCoverage:true,automatorCoverage:true,uuidCoverage:true,authorityGranted:false,missing:0});
}
/* === end v0.36.220 === */


/* === Terraformer v0.36.220: Naturalized Intrinsic Kit Fabric === */
const TERRAFORMER_INTRINSIC_KIT_SYSTEM_V36211=Object.freeze({
 schema:"TERRAFORMER-INTRINSIC-KIT-SYSTEM/1",id:"system.kit",name:"Kit System",family:"native-structure",
 type:"intrinsic-kit-system",mode:"naturalized",condition:Object.freeze(["canonical-members-only","in-monolith","non-plugin","non-module","non-loadable"]),
 state:"naturalized",logging:"system.logging",reporting:"system.reporting",
 intrinsic:true,plugin:false,module:false,loadable:false,unloadable:false,externalBoundary:false,
 rule:"A Kit is a native Terraformer structural grouping. It remains inside Terraformer and groups canonical capabilities without creating a plugin, module, package, deployment or authority boundary.",
 grantsAuthority:false,persists:false
});
const TF_INTRINSIC_KIT_SPECS_V36211=Object.freeze({
 system:Object.freeze({id:"kit.system",name:"System Kit",root:"system",purpose:"canonical system structure and lifecycle"}),
 interface:Object.freeze({id:"kit.interface",name:"Interface Kit",root:"interface",purpose:"canonical interface structure and interaction boundaries"}),
 network:Object.freeze({id:"kit.network",name:"Network Kit",root:"network",purpose:"network structure discovery monitoring diagnostics and security"}),
 language:Object.freeze({id:"kit.language",name:"Language Kit",root:"language",purpose:"language representation parsing processing and semantics"}),
 storage:Object.freeze({id:"kit.storage",name:"Storage Kit",root:"storage",purpose:"storage structure and bounded persistence"}),
 memory:Object.freeze({id:"kit.memory",name:"Memory Kit",root:"memory",purpose:"memory structure and volatile state"}),
 security:Object.freeze({id:"kit.security",name:"Security Kit",root:"security",purpose:"security posture and control boundaries"}),
 object:Object.freeze({id:"kit.object",name:"Object Kit",root:"object",purpose:"naturalized object image block and semantic structure"}),
 processing:Object.freeze({id:"kit.processing",name:"Processing Kit",root:"processing",purpose:"processing structure and execution preparation"}),
 communication:Object.freeze({id:"kit.communication",name:"Communication Kit",root:"communication",purpose:"communication structure without implicit network authority"}),
 configuration:Object.freeze({id:"kit.configuration",name:"Configuration Kit",root:"configuration",purpose:"configuration settings properties preferences and attributes"}),
 project:Object.freeze({id:"kit.project",name:"Project Kit",root:"project",purpose:"project structure and management"}),
 service:Object.freeze({id:"kit.service",name:"Service Kit",root:"service",purpose:"service structure"}),
 product:Object.freeze({id:"kit.product",name:"Product Kit",root:"product",purpose:"product structure"})
});
function tfIntrinsicKitMembersV36211(root,sourceText){
 const ids=tfCanonicalSystemIdsV36196(sourceText),p="system."+root;
 const m=ids.filter(x=>x===p||x.startsWith(p+".")||x.startsWith(p+"-"));
 if(root==="system")return Object.freeze(ids);return Object.freeze(m);
}
function tfIntrinsicKitDescriptorV36211(name,sourceText){
 const k=TF_INTRINSIC_KIT_SPECS_V36211[String(name||"").toLowerCase()];if(!k)return null;
 const members=tfIntrinsicKitMembersV36211(k.root,sourceText);
 const e=tfEntityObservabilityDescriptorV36207("system",{...k,type:"intrinsic-kit",mode:"naturalized",condition:["canonical-members-only","in-monolith","non-plugin","non-module"],state:"naturalized",parent:"system.kit",intrinsic:true,plugin:false,module:false,loadable:false,unloadable:false,grantsAuthority:false});
 return Object.freeze({...e,uuid:tfIdentityUuidV36195("intrinsic-kit",k.id),members,generator:tfEntityDescriptorV36206("generator",tfSystemGeneratorDescriptorV36196("system.kit")),automator:tfEntityDescriptorV36206("automator",tfSystemAutomatorDescriptorV36196("system.kit"))});
}
function tfIntrinsicKitInventoryV36211(sourceText){return Object.freeze(Object.keys(TF_INTRINSIC_KIT_SPECS_V36211).map(x=>tfIntrinsicKitDescriptorV36211(x,sourceText)))}
function tfIntrinsicKitSelfTestV36211(sourceText){
 const kits=tfIntrinsicKitInventoryV36211(sourceText),missing=[];
 for(const k of kits){if(!k.intrinsic||k.plugin||k.module||k.loadable||k.unloadable)missing.push(k.id+":boundary");if(!k.members.length)missing.push(k.id+":members");for(const m of k.members)if(!m.startsWith("system."))missing.push(k.id+":noncanonical");for(const x of ["type","mode","condition","state","uuid"])if(k[x]===undefined||k[x]===null||k[x]==="")missing.push(k.id+":"+x);if(!k.logging?.enabled||!k.reporting?.enabled)missing.push(k.id+":observability")}
 if(missing.length)throw new Error("intrinsic kit qualification failure "+missing.join(","));
 return Object.freeze({pass:true,state:"NATURALIZED",kits:kits.length,systemKit:kits.find(x=>x.id==="kit.system").members.length,interfaceKit:kits.find(x=>x.id==="kit.interface").members.length,intrinsic:true,plugin:false,module:false,loadable:false,unloadable:false,metadataCoverage:true,loggingCoverage:true,reportingCoverage:true,uuidCoverage:true,missing:0,authorityGranted:false});
}
/* === end v0.36.220 === */


/* === Terraformer v0.36.220: Terraformer Computational Kit Fabric === */
const TF_COMPUTATIONAL_KIT_ROOTS_V36212=Object.freeze([
 "computation","arithmetic","algorithm","procedure","operation","processing","processor","scheduling","scheduler",
 "memory","storage","object","block","image","language","interface","network","communication","security","cryptography",
 "generation","automation","validation","verification","qualification","recovery","runtime","resource","session","transfer",
 "registry","index","search","code","reader","writer","allocator","configuration","state","event","notification","logging",
 "reporting","history","project","service","product"
]);
const TF_COMPUTATIONAL_KIT_FABRIC_V36212=Object.freeze({
 schema:"TERRAFORMER-COMPUTATIONAL-KIT-FABRIC/1",id:"system.kit.computational",parent:"system.kit",
 type:"intrinsic-computational-kit-fabric",mode:"naturalized",condition:Object.freeze(["canonical-root-present","members-resolved","entity-contracts-valid"]),
 state:"naturalized",intrinsic:true,plugin:false,module:false,loadable:false,unloadable:false,
 logging:"system.logging",reporting:"system.reporting",authorityGranted:false,persistence:false
});
function tfComputationalKitMembersV36212(root,sourceText){
 const ids=tfCanonicalSystemIdsV36196(sourceText),p="system."+root;
 return Object.freeze(ids.filter(x=>x===p||x.startsWith(p+".")||x.startsWith(p+"-")));
}
function tfComputationalKitDescriptorV36212(root,sourceText){
 root=String(root||"").toLowerCase();if(!TF_COMPUTATIONAL_KIT_ROOTS_V36212.includes(root))return null;
 const members=tfComputationalKitMembersV36212(root,sourceText);if(!members.length)return null;
 const systemSet=new Set(tfCanonicalSystemIdsV36196(sourceText)),workerFabric=tfSystemDerivedWorkerFabricV36209(sourceText);
 const systems=members.map(id=>tfEntityObservabilityDescriptorV36207("system",{id,type:"kit-member-system",mode:"canonical",condition:"member-resolved",state:"registered"}));
 const workers=members.map(id=>workerFabric.workers.find(w=>w.id==="worker."+id.slice(7))).filter(Boolean);
 const generators=members.map(id=>tfEntityObservabilityDescriptorV36207("generator",tfSystemGeneratorDescriptorV36196(id)));
 const automators=members.map(id=>tfEntityObservabilityDescriptorV36207("automator",tfSystemAutomatorDescriptorV36196(id)));
 return Object.freeze({id:"kit."+root,name:root[0].toUpperCase()+root.slice(1)+" Kit",root,type:"intrinsic-computational-kit",mode:"naturalized",
  condition:Object.freeze(["canonical-members-resolved","worker-coverage","generator-coverage","automator-coverage"]),state:"naturalized",
  uuid:tfIdentityUuidV36195("computational-kit","kit."+root),intrinsic:true,plugin:false,module:false,loadable:false,unloadable:false,
  systems:Object.freeze(systems),workers:Object.freeze(workers),generators:Object.freeze(generators),automators:Object.freeze(automators),
  logging:Object.freeze({enabled:true,system:"system.logging",persistent:false}),reporting:Object.freeze({enabled:true,system:"system.reporting",reporter:"system.reporter",persistent:false}),grantsAuthority:false});
}
function tfComputationalKitInventoryV36212(sourceText){return Object.freeze(TF_COMPUTATIONAL_KIT_ROOTS_V36212.map(r=>tfComputationalKitDescriptorV36212(r,sourceText)).filter(Boolean))}
function tfComputationalKitSelfTestV36212(sourceText){
 const kits=tfComputationalKitInventoryV36212(sourceText),missing=[];
 for(const k of kits){if(!k.intrinsic||k.plugin||k.module||k.loadable||k.unloadable)missing.push(k.id+":boundary");if(!k.systems.length)missing.push(k.id+":systems");
  if(k.workers.length!==k.systems.length)missing.push(k.id+":workers");if(k.generators.length!==k.systems.length)missing.push(k.id+":generators");if(k.automators.length!==k.systems.length)missing.push(k.id+":automators");
  for(const collection of [k.systems,k.workers,k.generators,k.automators])for(const x of collection)for(const f of ["type","mode","condition","state"])if(x[f]===undefined||x[f]===null||x[f]==="")missing.push(k.id+":"+f);
  if(!k.logging.enabled||!k.reporting.enabled)missing.push(k.id+":observability")}
 if(missing.length)throw new Error("computational kit qualification failure "+missing.slice(0,20).join(","));
 const memberSystems=kits.reduce((n,k)=>n+k.systems.length,0);
 return Object.freeze({pass:true,state:"NATURALIZED",kits:kits.length,memberSystems,workerBindings:memberSystems,generatorBindings:memberSystems,automatorBindings:memberSystems,
  intrinsic:true,plugin:false,module:false,loadable:false,unloadable:false,metadataCoverage:true,loggingCoverage:true,reportingCoverage:true,missing:0,authorityGranted:false});
}
/* === end v0.36.220 === */


 return {TERRAFORMER_KIT_SYSTEM_V36210,TF_KIT_DEFINITIONS_V36210,TERRAFORMER_INTRINSIC_KIT_SYSTEM_V36211,TF_INTRINSIC_KIT_SPECS_V36211,TF_COMPUTATIONAL_KIT_ROOTS_V36212,TF_COMPUTATIONAL_KIT_FABRIC_V36212,tfKitDescriptorV36210,tfKitInventoryV36210,tfKitSelfTestV36210,tfIntrinsicKitMembersV36211,tfIntrinsicKitDescriptorV36211,tfIntrinsicKitInventoryV36211,tfIntrinsicKitSelfTestV36211,tfComputationalKitMembersV36212,tfComputationalKitDescriptorV36212,tfComputationalKitInventoryV36212,tfComputationalKitSelfTestV36212};
}
module.exports={bindKitV04442};
