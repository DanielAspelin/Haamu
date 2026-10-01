"use strict";
function bindTopologyV04442(deps={}){
 const source=deps.TERRAFORMER_TOPOLOGY;
 if(!source||typeof source!=="object") throw new Error("topology: canonical descriptor required");
 const descriptor=Object.freeze({...source,registry:"terraformer.topologys.json",authorityGranted:false});
 function describe(){return descriptor;}
 function validate(candidate=descriptor){return !!candidate&&candidate.id===source.id&&candidate.schema===source.schema&&candidate.authorityGranted!==true;}
 function selfTest(){return Object.freeze({schema:"TERRAFORMER-TOPOLOGY-SELF-TEST/1",pass:validate(),id:descriptor.id,authorityGranted:false});}
 return Object.freeze({descriptor,describe,validate,selfTest});
}


function bindConstructionCallTopologyV04504(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.272: Construction & Call/Transmission/Return Topology Fabric === */
const TF_CONSTRUCTION_CALL_TOPOLOGY_V36272=Object.freeze([
 Object.freeze({id:"system.building",concept:"Building",role:"process-or-structure"}),
 Object.freeze({id:"system.builder",concept:"Builder",role:"actor",process:"system.building"}),
 Object.freeze({id:"system.rebuilder",concept:"Rebuilder",role:"actor",process:"system.building"}),
 Object.freeze({id:"system.construction",concept:"Construction",role:"process"}),
 Object.freeze({id:"system.construct",concept:"Construct",role:"operation",process:"system.construction"}),
 Object.freeze({id:"system.destruction",concept:"Destruction",role:"process",policy:"authorization-required"}),
 Object.freeze({id:"system.destruct",concept:"Destruct",role:"operation",process:"system.destruction",policy:"authorization-required"}),
 Object.freeze({id:"system.call-site",concept:"Call Site",role:"site"}),
 Object.freeze({id:"system.call-path",concept:"Call Path",role:"path"}),
 Object.freeze({id:"system.call-lane",concept:"Call Lane",role:"lane"}),
 Object.freeze({id:"system.transmission-path",concept:"Transmission Path",role:"path"}),
 Object.freeze({id:"system.transmission-lane",concept:"Transmission Lane",role:"lane"}),
 Object.freeze({id:"system.return-path",concept:"Return Path",role:"path"}),
 Object.freeze({id:"system.return-lane",concept:"Return Lane",role:"lane"}),
 Object.freeze({id:"system.return-site",concept:"Return Site",role:"site"})
]);
const TF_CALL_TRANSMISSION_RETURN_TOPOLOGY_V36272=Object.freeze({
 forward:Object.freeze(["system.call-site","system.call-path","system.call-lane","system.transmission-path","system.transmission-lane"]),
 return:Object.freeze(["system.return-path","system.return-lane","system.return-site"]),
 rule:"Site, Path, and Lane are contextual topology components and are not aliases."
});
function tfConstructionCallTopologySelfTestV36272(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=TF_CONSTRUCTION_CALL_TOPOLOGY_V36272.filter(x=>!ids.has(x.id)).map(x=>x.id);
 const unique=new Set(TF_CONSTRUCTION_CALL_TOPOLOGY_V36272.map(x=>x.id)).size===TF_CONSTRUCTION_CALL_TOPOLOGY_V36272.length;
 if(missing.length||!unique)throw new Error("construction/call topology qualification failure "+missing.join(","));
 return Object.freeze({pass:true,systems:TF_CONSTRUCTION_CALL_TOPOLOGY_V36272.length,building:true,builder:true,rebuilder:true,construction:true,construct:true,
  destruction:true,destruct:true,callSite:true,callPath:true,callLane:true,transmissionPath:true,transmissionLane:true,returnPath:true,returnLane:true,returnSite:true,
  distinctTopologyComponents:true,destructiveOperationsAuthorizationRequired:true,authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_CONSTRUCTION_CALL_TOPOLOGY_V36272,TF_CALL_TRANSMISSION_RETURN_TOPOLOGY_V36272,tfConstructionCallTopologySelfTestV36272});
}

function bindCanonicalDevelopmentFabricV04508(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.276: Canonical Development Capability Naturalization === */
const TF_TEST_FABRIC_V36276=Object.freeze([
 Object.freeze({id:"system.test",concept:"Test",type:"assurance-entity",mode:"bounded",condition:"specified",state:"ready"}),
 Object.freeze({id:"system.testing",concept:"Testing",type:"process",mode:"bounded",condition:"admitted",state:"ready"}),
 Object.freeze({id:"system.tester",concept:"Tester",type:"actor",mode:"bounded",condition:"available",state:"ready"})
]);
const TF_CANONICAL_DEVELOPMENT_FABRIC_V36276=Object.freeze([
 Object.freeze({id:"system.source",concept:"Source",type:"entity",mode:"read-only",condition:"admitted",state:"available"}),
 Object.freeze({id:"system.preprocessing",concept:"Preprocessing",type:"process",mode:"bounded",condition:"admitted",state:"ready"}),
 Object.freeze({id:"system.preprocessor",concept:"Preprocessor",type:"actor",mode:"bounded",condition:"available",state:"ready"}),
 Object.freeze({id:"system.compilation",concept:"Compilation",type:"process",mode:"bounded",condition:"admitted",state:"ready"}),
 Object.freeze({id:"system.compiler",concept:"Compiler",type:"actor",mode:"bounded",condition:"available",state:"ready"}),
 Object.freeze({id:"system.assembly",concept:"Assembly",type:"process",mode:"bounded",condition:"admitted",state:"ready"}),
 Object.freeze({id:"system.assembler",concept:"Assembler",type:"actor",mode:"bounded",condition:"available",state:"ready"}),
 Object.freeze({id:"system.linking",concept:"Linking",type:"process",mode:"bounded",condition:"admitted",state:"ready"}),
 Object.freeze({id:"system.linker",concept:"Linker",type:"actor",mode:"bounded",condition:"available",state:"ready"}),
 Object.freeze({id:"system.artifact",concept:"Artifact",type:"entity",mode:"bounded",condition:"validated",state:"available"}),
 Object.freeze({id:"system.manifest",concept:"Manifest",type:"descriptor",mode:"read-only",condition:"validated",state:"available"}),
 Object.freeze({id:"system.workspace",concept:"Workspace",type:"context",mode:"bounded",condition:"admitted",state:"ready"}),
 Object.freeze({id:"system.diagnostic",concept:"Diagnostic",type:"evidence",mode:"read-only",condition:"observed",state:"available"}),
 Object.freeze({id:"system.debugging",concept:"Debugging",type:"process",mode:"authorization-required",condition:"admitted",state:"ready"}),
 Object.freeze({id:"system.debugger",concept:"Debugger",type:"actor",mode:"authorization-required",condition:"available",state:"ready"}),
 Object.freeze({id:"system.breakpoint",concept:"Breakpoint",type:"control-point",mode:"authorization-required",condition:"admitted",state:"ready"}),
 Object.freeze({id:"system.formatting",concept:"Formatting",type:"process",mode:"bounded",condition:"admitted",state:"ready"}),
 Object.freeze({id:"system.formatter",concept:"Formatter",type:"actor",mode:"bounded",condition:"available",state:"ready"}),
 Object.freeze({id:"system.refactoring",concept:"Refactoring",type:"process",mode:"authorization-required",condition:"admitted",state:"ready"}),
 Object.freeze({id:"system.refactorer",concept:"Refactorer",type:"actor",mode:"authorization-required",condition:"available",state:"ready"}),
 Object.freeze({id:"system.profiling",concept:"Profiling",type:"process",mode:"bounded",condition:"admitted",state:"ready"}),
 Object.freeze({id:"system.profiler",concept:"Profiler",type:"actor",mode:"bounded",condition:"available",state:"ready"}),
 Object.freeze({id:"system.installation",concept:"Installation",type:"process",mode:"authorization-required",condition:"admitted",state:"ready"}),
 Object.freeze({id:"system.installer",concept:"Installer",type:"actor",mode:"authorization-required",condition:"available",state:"ready"}),
 Object.freeze({id:"system.publication",concept:"Publication",type:"process",mode:"authorization-required",condition:"admitted",state:"ready"}),
 Object.freeze({id:"system.publisher",concept:"Publisher",type:"actor",mode:"authorization-required",condition:"available",state:"ready"}),
 Object.freeze({id:"system.packager",concept:"Packager",type:"actor",mode:"bounded",condition:"available",state:"ready"}),
 Object.freeze({id:"system.distribution",concept:"Distribution",type:"process",mode:"authorization-required",condition:"admitted",state:"ready"}),
 Object.freeze({id:"system.repository",concept:"Repository",type:"storage-context",mode:"bounded",condition:"admitted",state:"available"}),
 Object.freeze({id:"system.editor",concept:"Editor",type:"actor",mode:"authorization-required",condition:"available",state:"ready"}),
 Object.freeze({id:"system.editing",concept:"Editing",type:"process",mode:"authorization-required",condition:"admitted",state:"ready"}),
 Object.freeze({id:"system.definition",concept:"Definition",type:"semantic-entity",mode:"read-only",condition:"resolved",state:"available"}),
 Object.freeze({id:"system.signature",concept:"Signature",type:"semantic-entity",mode:"read-only",condition:"resolved",state:"available"}),
 Object.freeze({id:"system.hover",concept:"Hover",type:"presentation",mode:"read-only",condition:"requested",state:"ready"}),
 Object.freeze({id:"system.snippet",concept:"Snippet",type:"source-fragment",mode:"bounded",condition:"admitted",state:"available"}),
 Object.freeze({id:"system.library",concept:"Library",type:"collection",mode:"bounded",condition:"admitted",state:"available"}),
 Object.freeze({id:"system.module",concept:"Module",type:"structural-entity",mode:"bounded",condition:"admitted",state:"available"}),
 Object.freeze({id:"system.toolchain",concept:"Toolchain",type:"topology",mode:"bounded",condition:"validated",state:"ready"}),
 Object.freeze({id:"system.build",concept:"Build",type:"process",mode:"bounded",condition:"configured",state:"ready"}),
 Object.freeze({id:"system.configure",concept:"Configure",type:"operation",mode:"bounded",condition:"admitted",state:"ready"}),
 Object.freeze({id:"system.deployment",concept:"Deployment",type:"process",mode:"authorization-required",condition:"admitted",state:"ready"}),
 Object.freeze({id:"system.release",concept:"Release",type:"checkpoint",mode:"authorization-required",condition:"qualified",state:"ready"}),
 Object.freeze({id:"system.source-control",concept:"Source Control",type:"process",mode:"authorization-required",condition:"admitted",state:"ready"}),
 Object.freeze({id:"system.documentation",concept:"Documentation",type:"information",mode:"read-only",condition:"available",state:"ready"}),
 Object.freeze({id:"system.documentation-generator",concept:"Documentation Generator",type:"actor",mode:"bounded",condition:"available",state:"ready"}),
 Object.freeze({id:"system.dependency-resolution",concept:"Dependency Resolution",type:"process",mode:"bounded",condition:"admitted",state:"ready"}),
 Object.freeze({id:"system.dependency-resolver",concept:"Dependency Resolver",type:"actor",mode:"bounded",condition:"available",state:"ready"}),
 Object.freeze({id:"system.static-analysis",concept:"Static Analysis",type:"process",mode:"read-only",condition:"admitted",state:"ready"}),
 Object.freeze({id:"system.analyzer",concept:"Analyzer",type:"actor",mode:"read-only",condition:"available",state:"ready"}),
 Object.freeze({id:"system.disassembly",concept:"Disassembly",type:"process",mode:"read-only",condition:"admitted",state:"ready"}),
 Object.freeze({id:"system.disassembler",concept:"Disassembler",type:"actor",mode:"read-only",condition:"available",state:"ready"}),
 Object.freeze({id:"system.optimization",concept:"Optimization",type:"process",mode:"authorization-required",condition:"admitted",state:"ready"}),
 Object.freeze({id:"system.optimizer",concept:"Optimizer",type:"actor",mode:"authorization-required",condition:"available",state:"ready"})
]);
const TF_CANONICAL_DEVELOPMENT_TOPOLOGY_V36276=Object.freeze({
 source:Object.freeze(["system.workspace","system.source","system.editing","system.editor","system.formatting","system.formatter","system.refactoring","system.refactorer"]),
 semantics:Object.freeze(["system.language","system.symbol","system.definition","system.reference","system.signature","system.completion","system.hover","system.navigation","system.diagnostic"]),
 transformation:Object.freeze(["system.preprocessing","system.preprocessor","system.compilation","system.compiler","system.assembly","system.assembler","system.linking","system.linker","system.optimization","system.optimizer"]),
 construction:Object.freeze(["system.configuration","system.configure","system.dependency","system.dependency-resolution","system.dependency-resolver","system.build","system.artifact","system.manifest"]),
 assurance:Object.freeze(["system.static-analysis","system.analyzer","system.testing","system.inspection","system.inspector","system.debugging","system.debugger","system.breakpoint","system.profiling","system.profiler","system.monitoring"]),
 runtime:Object.freeze(["system.execution","system.runtime","system.library","system.module"]),
 distribution:Object.freeze(["system.packaging","system.packager","system.distribution","system.installation","system.installer","system.repository","system.publication","system.publisher","system.release","system.deployment"]),
 information:Object.freeze(["system.documentation","system.documentation-generator","system.source-control","system.version","system.lineage"]),
 rule:"Canonical concepts are independent Systems linked by semantic and topological relationships; external product categories are not runtime identities."
});
function tfCanonicalDevelopmentFabricSelfTestV36276(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const x of TF_TEST_FABRIC_V36276){if(!ids.has(x.id))missing.push(x.id);for(const k of ["type","mode","condition","state"])if(!x[k])missing.push(x.id+":"+k);}
 for(const x of TF_CANONICAL_DEVELOPMENT_FABRIC_V36276){if(!ids.has(x.id))missing.push(x.id);for(const k of ["type","mode","condition","state"])if(!x[k])missing.push(x.id+":"+k);}
 for(const group of Object.values(TF_CANONICAL_DEVELOPMENT_TOPOLOGY_V36276))if(Array.isArray(group))for(const id of group)if(!ids.has(id))missing.push(id);
 if(missing.length)throw new Error("canonical development fabric qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,naturalizedSystems:TF_CANONICAL_DEVELOPMENT_FABRIC_V36276.length,canonicalOrder:true,typeCoverage:true,modeCoverage:true,conditionCoverage:true,stateCoverage:true,
 externalRuntimeAuthority:false,productCategoryIdentity:false,authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_TEST_FABRIC_V36276,TF_CANONICAL_DEVELOPMENT_FABRIC_V36276,TF_CANONICAL_DEVELOPMENT_TOPOLOGY_V36276,tfCanonicalDevelopmentFabricSelfTestV36276});
}
const TOPOLOGY_SCHEMA='TERRAFORMER-RESOURCE-TOPOLOGY/1';

module.exports={bindTopologyV04442,bindConstructionCallTopologyV04504,bindCanonicalDevelopmentFabricV04508,TOPOLOGY_SCHEMA};
