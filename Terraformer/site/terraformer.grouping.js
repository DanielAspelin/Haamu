"use strict";
const SYSTEM=Object.freeze({id:"system.grouping",concept:"Grouping",type:"system-organization-process-system",logical:true,automaticConnect:false,networkBinding:false,identityMutation:false,persistencePerformed:false,externalEffect:false,authorityGranted:false,scaffold:true});
function bindGroupingSpecializationV04649(deps={}){
 const {tfCanonicalSystemIdsV36196,tfUniversalEngineFabricV36349,tfCompactSystemSeedV36353,tfUniversalSystemLayerFabricV36389,tfUniversalSystemDefaultsFabricV36388,tfUniversalAllocationSystemizationFabricV36398}=deps;
 /* === Terraformer v0.36.399: Grouping Specialization Fabric === */
const TF_GROUP_SPECIALIZATION_SYSTEMS_V36399=Object.freeze([{"id":"system.wire-group","concept":"Wire Group","type":"group-specialization-system","mode":"deterministic-logical-grouping","condition":"grouping-context-admitted","state":"ready"},{"id":"system.server-group","concept":"Server Group","type":"group-specialization-system","mode":"deterministic-logical-grouping","condition":"grouping-context-admitted","state":"ready"},{"id":"system.object-group","concept":"Object Group","type":"group-specialization-system","mode":"deterministic-logical-grouping","condition":"grouping-context-admitted","state":"ready"},{"id":"system.node-group","concept":"Node Group","type":"group-specialization-system","mode":"deterministic-logical-grouping","condition":"grouping-context-admitted","state":"ready"}]);

const TF_GROUP_SPECIALIZATION_RELATIONSHIPS_V36399=Object.freeze([
 Object.freeze({from:"system.grouper",relation:"part-of",to:"system.grouping"}),Object.freeze({from:"system.grouping",relation:"produces",to:"system.group"}),
 Object.freeze({from:"system.wire-group",relation:"is-a",to:"system.group"}),Object.freeze({from:"system.system-group",relation:"is-a",to:"system.group"}),
 Object.freeze({from:"system.server-group",relation:"is-a",to:"system.group"}),Object.freeze({from:"system.object-group",relation:"is-a",to:"system.group"}),
 Object.freeze({from:"system.node-group",relation:"is-a",to:"system.group"}),Object.freeze({from:"system.grouping",relation:"groups",to:"system.wire"}),
 Object.freeze({from:"system.grouping",relation:"groups",to:"system.system"}),Object.freeze({from:"system.grouping",relation:"groups",to:"system.server"}),
 Object.freeze({from:"system.grouping",relation:"groups",to:"system.object"}),Object.freeze({from:"system.grouping",relation:"groups",to:"system.node"})
]);
const TF_GROUP_SPECIALIZATION_SCHEMA_V36399=Object.freeze([
 Object.freeze({kind:"wire",groupSystem:"system.wire-group",memberSystem:"system.wire"}),
 Object.freeze({kind:"system",groupSystem:"system.system-group",memberSystem:"system.system"}),
 Object.freeze({kind:"server",groupSystem:"system.server-group",memberSystem:"system.server"}),
 Object.freeze({kind:"object",groupSystem:"system.object-group",memberSystem:"system.object"}),
 Object.freeze({kind:"node",groupSystem:"system.node-group",memberSystem:"system.node"})
]);
function tfSpecializedGroupV36399(kind,members=[]){
 const schema=TF_GROUP_SPECIALIZATION_SCHEMA_V36399.find(x=>x.kind===String(kind));if(!schema)throw new Error("[TF:system.grouping:invalid-kind] wire, system, server, object, or node required.");
 const normalized=[...new Set((Array.isArray(members)?members:[]).map(String))].sort();
 return Object.freeze({id:schema.groupSystem+"::"+normalized.length+"::logical",system:schema.groupSystem,grouping:"system.grouping",grouper:"system.grouper",
  memberSystem:schema.memberSystem,members:Object.freeze(normalized),logical:true,deterministic:true,automaticConnect:false,networkBinding:false,objectMutation:false,authorityAmplification:false});
}
function tfGroupingSpecializationFabricV36399(sourceText){
 const ids=tfCanonicalSystemIdsV36196(sourceText);
 const systemGroup=tfSpecializedGroupV36399("system",ids);
 return Object.freeze({system:"system.grouping",kinds:Object.freeze(TF_GROUP_SPECIALIZATION_SCHEMA_V36399.map(x=>x.kind)),wireGroup:tfSpecializedGroupV36399("wire"),
  systemGroup,serverGroup:tfSpecializedGroupV36399("server"),objectGroup:tfSpecializedGroupV36399("object"),nodeGroup:tfSpecializedGroupV36399("node"),
  systemsCovered:ids.length,everyCanonicalSystemInSystemGroup:systemGroup.members.length===ids.length});
}
function tfGroupingSpecializationSelfTestV36399(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.group","system.grouping","system.grouper","system.wire","system.wire-group","system.system","system.system-group","system.server","system.server-group","system.object","system.object-group","system.node","system.node-group"])if(!ids.has(id))missing.push(id);
 const f=tfGroupingSpecializationFabricV36399(sourceText);if(f.kinds.length!==5||!f.everyCanonicalSystemInSystemGroup||f.systemGroup.members.length!==ids.size)missing.push("coverage");
 for(const k of ["wireGroup","systemGroup","serverGroup","objectGroup","nodeGroup"]){const g=f[k];if(!g.logical||!g.deterministic||g.automaticConnect||g.networkBinding||g.objectMutation||g.authorityAmplification)missing.push("boundary:"+k);}
 const eo=new Set(tfUniversalEngineFabricV36349(sourceText).engines.map(x=>x.owner)),seeded=new Set(tfCompactSystemSeedV36353(sourceText).entries.map(x=>x.id));
 for(const x of TF_GROUP_SPECIALIZATION_SYSTEMS_V36399){if(!eo.has(x.id))missing.push("engine:"+x.id);if(!seeded.has(x.id))missing.push("seed:"+x.id);}
 const layers=tfUniversalSystemLayerFabricV36389(sourceText),defs=tfUniversalSystemDefaultsFabricV36388(sourceText),alloc=tfUniversalAllocationSystemizationFabricV36398(sourceText);
 if(layers.layers!==ids.size||defs.defaults!==ids.size||alloc.allocators!==ids.size)missing.push("universal-base");
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Grouping specialization failed: "+[...new Set(missing)].slice(0,64).join(",")+".");
 return Object.freeze({pass:true,newSystems:4,groupingReused:true,grouperReused:true,groupReused:true,systemGroupReused:true,systemsCovered:ids.size,
  wireGroups:true,systemGroups:true,serverGroups:true,objectGroups:true,nodeGroups:true,everyCanonicalSystemGrouped:true,logical:true,automaticConnect:false,
  networkBinding:false,objectMutation:false,authorityAmplification:false,missing:0});
}
globalThis.TF_GROUP_SPECIALIZATION_SYSTEMS_V36399=TF_GROUP_SPECIALIZATION_SYSTEMS_V36399;globalThis.TF_GROUP_SPECIALIZATION_RELATIONSHIPS_V36399=TF_GROUP_SPECIALIZATION_RELATIONSHIPS_V36399;
globalThis.TF_GROUP_SPECIALIZATION_SCHEMA_V36399=TF_GROUP_SPECIALIZATION_SCHEMA_V36399;globalThis.tfSpecializedGroupV36399=tfSpecializedGroupV36399;
globalThis.tfGroupingSpecializationFabricV36399=tfGroupingSpecializationFabricV36399;
 return Object.freeze({TF_GROUP_SPECIALIZATION_SYSTEMS_V36399,TF_GROUP_SPECIALIZATION_RELATIONSHIPS_V36399,TF_GROUP_SPECIALIZATION_SCHEMA_V36399,tfSpecializedGroupV36399,tfGroupingSpecializationFabricV36399,tfGroupingSpecializationSelfTestV36399});
}
function bindScopeGroupingV04650(deps={}){
 const {tfCanonicalSystemIdsV36196,tfUniversalEngineFabricV36349,tfCompactSystemSeedV36353,tfUniversalSystemLayerFabricV36389,tfUniversalSystemDefaultsFabricV36388,tfUniversalAllocationSystemizationFabricV36398}=deps;
 /* === Terraformer v0.36.400: Client / Global / Local Grouping Fabric === */
const TF_SCOPE_GROUP_SYSTEMS_V36400=Object.freeze([{"id":"system.client-group","concept":"Client Group","type":"group-specialization-system","mode":"deterministic-logical-grouping","condition":"grouping-context-admitted","state":"ready"},{"id":"system.global","concept":"Global","type":"scope-system","mode":"deterministic-logical-grouping","condition":"grouping-context-admitted","state":"ready"},{"id":"system.global-group","concept":"Global Group","type":"scope-group-system","mode":"deterministic-logical-grouping","condition":"grouping-context-admitted","state":"ready"},{"id":"system.local","concept":"Local","type":"scope-system","mode":"deterministic-logical-grouping","condition":"grouping-context-admitted","state":"ready"},{"id":"system.local-group","concept":"Local Group","type":"scope-group-system","mode":"deterministic-logical-grouping","condition":"grouping-context-admitted","state":"ready"}]);

const TF_SCOPE_GROUP_RELATIONSHIPS_V36400=Object.freeze([
 Object.freeze({from:"system.client-group",relation:"is-a",to:"system.group"}),Object.freeze({from:"system.client-group",relation:"groups",to:"system.client"}),
 Object.freeze({from:"system.global-group",relation:"is-a",to:"system.group"}),Object.freeze({from:"system.global-group",relation:"scope",to:"system.global"}),
 Object.freeze({from:"system.local-group",relation:"is-a",to:"system.group"}),Object.freeze({from:"system.local-group",relation:"scope",to:"system.local"}),
 Object.freeze({from:"system.grouping",relation:"produces",to:"system.client-group"}),Object.freeze({from:"system.grouping",relation:"produces",to:"system.global-group"}),
 Object.freeze({from:"system.grouping",relation:"produces",to:"system.local-group"})
]);
function tfScopeGroupV36400(kind,members=[]){
 const map=Object.freeze({client:Object.freeze({group:"system.client-group",member:"system.client",scope:"client"}),
 global:Object.freeze({group:"system.global-group",member:"system.system",scope:"global"}),
 local:Object.freeze({group:"system.local-group",member:"system.system",scope:"local"})});
 const m=map[String(kind)];if(!m)throw new Error("[TF:system.grouping:invalid-scope-group] client, global, or local required.");
 const normalized=[...new Set((Array.isArray(members)?members:[]).map(String))].sort();
 return Object.freeze({id:m.group+"::"+normalized.length+"::logical",system:m.group,grouping:"system.grouping",grouper:"system.grouper",
  memberSystem:m.member,scope:m.scope,members:Object.freeze(normalized),logical:true,deterministic:true,automaticConnect:false,networkBinding:false,
  globalExposure:false,hostMutation:false,authorityAmplification:false});
}
function tfScopeGroupingFabricV36400(sourceText){
 const ids=tfCanonicalSystemIdsV36196(sourceText);
 return Object.freeze({system:"system.grouping",clientGroup:tfScopeGroupV36400("client"),globalGroup:tfScopeGroupV36400("global",ids),
  localGroup:tfScopeGroupV36400("local",ids),systemsCovered:ids.length,scopeSemantics:Object.freeze({global:"Terraformer-wide logical scope",local:"bounded logical locality; not inferred geolocation"})});
}
function tfScopeGroupingSelfTestV36400(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.group","system.grouping","system.grouper","system.client","system.client-group","system.global","system.global-group","system.local","system.local-group"])if(!ids.has(id))missing.push(id);
 const f=tfScopeGroupingFabricV36400(sourceText);if(f.globalGroup.members.length!==ids.size||f.localGroup.members.length!==ids.size)missing.push("coverage");
 for(const g of [f.clientGroup,f.globalGroup,f.localGroup])if(!g.logical||!g.deterministic||g.automaticConnect||g.networkBinding||g.globalExposure||g.hostMutation||g.authorityAmplification)missing.push("boundary:"+g.system);
 const eo=new Set(tfUniversalEngineFabricV36349(sourceText).engines.map(x=>x.owner)),seeded=new Set(tfCompactSystemSeedV36353(sourceText).entries.map(x=>x.id));
 for(const x of TF_SCOPE_GROUP_SYSTEMS_V36400){if(!eo.has(x.id))missing.push("engine:"+x.id);if(!seeded.has(x.id))missing.push("seed:"+x.id);}
 const layers=tfUniversalSystemLayerFabricV36389(sourceText),defs=tfUniversalSystemDefaultsFabricV36388(sourceText),alloc=tfUniversalAllocationSystemizationFabricV36398(sourceText);
 if(layers.layers!==ids.size||defs.defaults!==ids.size||alloc.allocators!==ids.size)missing.push("universal-base");
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Scope grouping failed: "+[...new Set(missing)].slice(0,64).join(",")+".");
 return Object.freeze({pass:true,newSystems:5,groupingReused:true,grouperReused:true,clientReused:true,clientGroup:true,global:true,globalGroup:true,local:true,localGroup:true,
  systemsCovered:ids.size,logical:true,globalIsLogicalScope:true,localIsLogicalScope:true,geolocationInference:false,automaticConnect:false,networkBinding:false,
  globalExposure:false,authorityAmplification:false,missing:0});
}
globalThis.TF_SCOPE_GROUP_SYSTEMS_V36400=TF_SCOPE_GROUP_SYSTEMS_V36400;globalThis.TF_SCOPE_GROUP_RELATIONSHIPS_V36400=TF_SCOPE_GROUP_RELATIONSHIPS_V36400;
globalThis.tfScopeGroupV36400=tfScopeGroupV36400;globalThis.tfScopeGroupingFabricV36400=tfScopeGroupingFabricV36400;
 return Object.freeze({TF_SCOPE_GROUP_SYSTEMS_V36400,TF_SCOPE_GROUP_RELATIONSHIPS_V36400,tfScopeGroupV36400,tfScopeGroupingFabricV36400,tfScopeGroupingSelfTestV36400});
}
module.exports=Object.freeze({SYSTEM,bindGroupingSpecializationV04649,bindScopeGroupingV04650});
