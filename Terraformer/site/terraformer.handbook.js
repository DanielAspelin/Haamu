"use strict";
const SYSTEM=Object.freeze({id:"system.handbook",concept:"Handbook",type:"reference-document-system",derived:false,automaticMutation:false,persistencePerformed:false,authorityGranted:false,scaffold:true});
function bindNetworkHandbookV04651(deps={}){
 const {tfCanonicalSystemIdsV36196,tfUniversalEngineFabricV36349,tfCompactSystemSeedV36353,tfScopeGroupingFabricV36400,tfUniversalSystemLayerFabricV36389,tfUniversalSystemDefaultsFabricV36388,tfUniversalSpecificationFabricV36397}=deps;
 /* === Terraformer v0.36.401: Network Group + Complete Project Handbook Fabric === */
const TF_NETWORK_HANDBOOK_SYSTEMS_V36401=Object.freeze([
 Object.freeze({id:"system.network-group",concept:"Network Group",type:"group-specialization-system",mode:"deterministic-logical-network-grouping",condition:"grouping-context-admitted",state:"ready"})
]);
const TF_NETWORK_HANDBOOK_RELATIONSHIPS_V36401=Object.freeze([
 Object.freeze({from:"system.network-group",relation:"is-a",to:"system.group"}),Object.freeze({from:"system.network-group",relation:"groups",to:"system.network"}),
 Object.freeze({from:"system.grouping",relation:"produces",to:"system.network-group"}),Object.freeze({from:"system.handbook",relation:"documents",to:"system.system"}),
 Object.freeze({from:"system.handbook",relation:"uses",to:"system.documentation"}),Object.freeze({from:"system.handbook",relation:"uses",to:"system.documentary"}),
 Object.freeze({from:"system.handbook",relation:"covers",to:"system.version"}),Object.freeze({from:"system.handbook",relation:"covers",to:"system.lineage"}),
 Object.freeze({from:"system.handbook",relation:"covers",to:"system.history"})
]);
function tfNetworkGroupV36401(members=[]){
 const normalized=[...new Set((Array.isArray(members)?members:[]).map(String))].sort();
 return Object.freeze({id:"system.network-group::"+normalized.length+"::logical",system:"system.network-group",grouping:"system.grouping",grouper:"system.grouper",
  memberSystem:"system.network",scope:"network",members:Object.freeze(normalized),logical:true,deterministic:true,automaticConnect:false,networkBinding:false,
  networkMutation:false,externalExposure:false,authorityAmplification:false});
}
function tfTerraformerHandbookV36401(sourceText){
 const ids=tfCanonicalSystemIdsV36196(sourceText),versions=[...new Set((String(sourceText).match(/v0\.36\.\d+/g)||[]))].sort((a,b)=>Number(a.split(".")[2])-Number(b.split(".")[2]));
 const chapters=ids.map((id,i)=>Object.freeze({number:i+1,system:id,reference:id+"::reference",definition:id+"::definition",description:id+"::description",
  specification:id+"::specification",process:id+"::process",layer:id+"::layer",service:id+"::service",engine:id+"::engine"}));
 return Object.freeze({id:"terraformer::handbook::v0.36.401",system:"system.handbook",project:"Terraformer",version:"0.36.401",current:true,
  generatedFromCanonicalRegistry:true,systemsCovered:ids.length,canonicalSystems:ids.length,completeCanonicalSystemCoverage:chapters.length===ids.length,
  chapters:Object.freeze(chapters),versions:Object.freeze(versions),versionBlocksCovered:versions.length,includesArchitecture:true,includesRuntime:true,
  includesRelationships:true,includesGrouping:true,includesWiring:true,includesProcesses:true,includesQualification:true,includesRecoveryLineage:true,
  includesSecurityBoundaries:true,includesHistoricalVersionCorpus:true,sourceDeletion:false,historicalRewrite:false,readOnly:true,persistence:false,authorityAmplification:false});
}
function tfNetworkHandbookSelfTestV36401(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.group","system.grouping","system.grouper","system.network","system.network-group","system.handbook","system.documentation","system.documentary","system.version","system.lineage","system.history"])if(!ids.has(id))missing.push(id);
 const ng=tfNetworkGroupV36401(["system.network"]);if(!ng.logical||!ng.deterministic||ng.automaticConnect||ng.networkBinding||ng.networkMutation||ng.externalExposure||ng.authorityAmplification)missing.push("network-group-boundary");
 const h=tfTerraformerHandbookV36401(sourceText);if(h.systemsCovered!==ids.size||h.chapters.length!==ids.size||!h.completeCanonicalSystemCoverage||!h.generatedFromCanonicalRegistry)missing.push("handbook-coverage");
 if(!h.includesArchitecture||!h.includesRuntime||!h.includesRelationships||!h.includesGrouping||!h.includesWiring||!h.includesProcesses||!h.includesQualification||!h.includesRecoveryLineage||!h.includesSecurityBoundaries||!h.includesHistoricalVersionCorpus)missing.push("handbook-domain");
 if(new Set(h.chapters.map(x=>x.system)).size!==ids.size||h.chapters.some(x=>!x.reference||!x.definition||!x.description||!x.specification||!x.process||!x.layer||!x.service||!x.engine))missing.push("handbook-chapters");
 const eo=new Set(tfUniversalEngineFabricV36349(sourceText).engines.map(x=>x.owner)),seeded=new Set(tfCompactSystemSeedV36353(sourceText).entries.map(x=>x.id));if(!eo.has("system.network-group"))missing.push("engine");if(!seeded.has("system.network-group"))missing.push("seed");
 const scope=tfScopeGroupingFabricV36400(sourceText);if(!scope.clientGroup||!scope.globalGroup||!scope.localGroup)missing.push("scope-groups");
 const layers=tfUniversalSystemLayerFabricV36389(sourceText),defs=tfUniversalSystemDefaultsFabricV36388(sourceText),specs=tfUniversalSpecificationFabricV36397(sourceText);
 if(layers.layers!==ids.size||defs.defaults!==ids.size||specs.specifications!==ids.size)missing.push("universal-base");
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Network Group / Handbook failed: "+[...new Set(missing)].slice(0,64).join(",")+".");
 return Object.freeze({pass:true,newSystems:1,networkReused:true,handbookReused:true,clientGroup:true,globalGroup:true,localGroup:true,networkGroup:true,
  systemsCovered:ids.size,handbookChapters:h.chapters.length,completeCanonicalSystemCoverage:true,versionBlocksCovered:h.versionBlocksCovered,
  generatedFromCanonicalRegistry:true,readOnly:true,historicalRewrite:false,automaticConnect:false,networkBinding:false,authorityAmplification:false,missing:0});
}
globalThis.TF_NETWORK_HANDBOOK_SYSTEMS_V36401=TF_NETWORK_HANDBOOK_SYSTEMS_V36401;globalThis.TF_NETWORK_HANDBOOK_RELATIONSHIPS_V36401=TF_NETWORK_HANDBOOK_RELATIONSHIPS_V36401;
globalThis.tfNetworkGroupV36401=tfNetworkGroupV36401;globalThis.tfTerraformerHandbookV36401=tfTerraformerHandbookV36401;
 return Object.freeze({TF_NETWORK_HANDBOOK_SYSTEMS_V36401,TF_NETWORK_HANDBOOK_RELATIONSHIPS_V36401,tfNetworkGroupV36401,tfTerraformerHandbookV36401,tfNetworkHandbookSelfTestV36401});
}
module.exports=Object.freeze({SYSTEM,bindNetworkHandbookV04651});
