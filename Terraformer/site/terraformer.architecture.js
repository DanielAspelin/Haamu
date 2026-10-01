"use strict";
function bindIoArchitectureV04453(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 const tfOperationalEntityFabricV36275=()=>deps.TF_OPERATIONAL_ENTITY_FABRIC_V36275;
/* === Terraformer v0.36.223: IO Native Architecture Naturalization === */
const TF_ARCHITECTURE_SYSTEM_V36223=Object.freeze({id:"system.architecture",name:"Architecture System",family:"structural-governance",type:"architecture-system",mode:"canonical-composition",condition:Object.freeze(["entities-resolved","relationships-valid","boundaries-explicit"]),state:"naturalized",governs:Object.freeze(["composition","structure","relationships","layers","boundaries","topology"]),executionAuthority:false,grantsAuthority:false,persists:false,intrinsic:true});
const TF_NATURALIZATION_SYSTEM_V36223=Object.freeze({id:"system.naturalization",name:"Naturalization System",family:"semantic-integration",type:"naturalization-system",mode:"qualified-absorption",condition:Object.freeze(["source-provenance-known","semantic-map-valid","native-owner-resolved","qualification-valid"]),state:"naturalized",governs:Object.freeze(["predecessor-analysis","semantic-mapping","native-absorption","lineage-preservation","authority-retirement"]),predecessorAuthority:false,grantsAuthority:false,persists:false,intrinsic:true});
const TF_NATIVE_SYSTEM_V36223=Object.freeze({id:"system.native",name:"Native System",family:"runtime-identity",type:"native-system",mode:"intrinsic",condition:Object.freeze(["canonical-owner","intrinsic-implementation","boundary-valid"]),state:"naturalized",governs:Object.freeze(["native-identity","intrinsic-capability","host-boundary","native-runtime-boundary"]),virtual:false,grantsAuthority:false,persists:false,intrinsic:true});
const TF_VIRTUAL_SYSTEM_V36223=Object.freeze({id:"system.virtual",name:"Virtual System",family:"representation",type:"virtual-system",mode:"bounded-representation",condition:Object.freeze(["representation-defined","native-distinction-explicit","authority-bounded"]),state:"naturalized",governs:Object.freeze(["virtualization","representation","simulation","emulation","virtual-resource"]),native:false,physicalAuthority:false,grantsAuthority:false,persists:false,intrinsic:true});
const TF_IO_NATURALIZATION_V36223=Object.freeze({
 id:"naturalization.io",source:"IO",role:"predecessor-architecture",state:"NATURALIZED",runtimeAuthority:false,parallelSubsystem:false,
 semanticMap:Object.freeze({
  processing:Object.freeze(["system.processing","system.processor","system.process","system.operation"]),
  memory:Object.freeze(["system.memory"]),storage:Object.freeze(["system.storage","system.block","system.image"]),
  allocation:Object.freeze(["system.resource","system.allocator"]),filing:Object.freeze(["system.file","system.filesystem","system.storage"]),
  network:Object.freeze(["system.network","system.tcpip","system.gps","system.gsm","system.rfid"]),
  media:Object.freeze(["system.graphics","system.audio","system.image"]),
  structure:Object.freeze(["system.chain","system.ring","system.grid","system.mesh","system.matrix","system.bridge"]),
  nativeBoundary:Object.freeze(["system.native","system.code","system.language","system.runtime"]),
  control:Object.freeze(["system.architecture","system.lifecycle","system.entity","system.environment"])
 }),
 distinctions:Object.freeze(["architecture!=execution-authority","naturalized!=predecessor-authority","virtual!=native","native!=unbounded-authority"]),
 lineagePreserved:true,grantsAuthority:false
});
const TF_IO_NATIVE_KIT_V36223=Object.freeze({id:"kit.io-native",name:"IO Native Architecture Kit",type:"intrinsic-kit",mode:"naturalized",condition:Object.freeze(["io-semantics-mapped","native-owners-canonical","predecessor-authority-retired"]),state:"naturalized",
 members:Object.freeze(["system.architecture","system.naturalization","system.native","system.virtual","system.processing","system.processor","system.memory","system.storage","system.block","system.resource","system.allocator","system.network","system.tcpip","system.gps","system.gsm","system.rfid","system.graphics","system.audio","system.image","system.chain","system.ring","system.grid","system.mesh","system.matrix","system.bridge","system.runtime","system.code","system.language","system.lifecycle","system.entity","system.environment"]),
 intrinsic:true,plugin:false,module:false,loadable:false,unloadable:false,grantsAuthority:false});
function tfIoNaturalizationSelfTestV36223(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const x of tfOperationalEntityFabricV36275()){if(!ids.has(x.id))missing.push(x.id);for(const k of ["type","mode","condition","state"])if(!x[k])missing.push(x.id+":"+k);}
 for(const x of TF_IO_NATIVE_KIT_V36223.members)if(!ids.has(x))missing.push(x);
 for(const x of ["system.architecture","system.naturalization","system.native","system.virtual"])if(!ids.has(x))missing.push(x);
 if(TF_IO_NATURALIZATION_V36223.runtimeAuthority||TF_IO_NATURALIZATION_V36223.parallelSubsystem)missing.push("predecessor-authority");
 if(TF_NATIVE_SYSTEM_V36223.virtual!==false||TF_VIRTUAL_SYSTEM_V36223.native!==false)missing.push("native-virtual-distinction");
 if(TF_ARCHITECTURE_SYSTEM_V36223.executionAuthority!==false)missing.push("architecture-authority");
 if(missing.length)throw new Error("IO naturalization qualification failure "+missing.join(","));
 return Object.freeze({pass:true,source:"IO",state:"NATURALIZED",architectureSystem:true,naturalizationSystem:true,nativeSystem:true,virtualSystem:true,
  semanticDomains:Object.keys(TF_IO_NATURALIZATION_V36223.semanticMap).length,kitMembers:TF_IO_NATIVE_KIT_V36223.members.length,parallelSubsystem:false,
  predecessorRuntimeAuthority:false,lineagePreserved:true,nativeVirtualSeparated:true,architectureExecutionAuthority:false,authorityAmplification:false,missing:0});
}
/* === end v0.36.223 === */


 return Object.freeze({TF_ARCHITECTURE_SYSTEM_V36223,TF_IO_NATIVE_KIT_V36223,TF_IO_NATURALIZATION_V36223,TF_NATIVE_SYSTEM_V36223,TF_NATURALIZATION_SYSTEM_V36223,TF_VIRTUAL_SYSTEM_V36223,tfIoNaturalizationSelfTestV36223});
}
module.exports={bindIoArchitectureV04453};
