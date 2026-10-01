"use strict";
function bindWiringGroupingClassIdentityV04627(deps={}){
 const {tfCanonicalSystemIdsV36196,tfUniversalEngineFabricV36349,tfUniversalServiceFabricV36351,tfCompactSystemSeedV36353,tfUniversalActiveSummaryFabricV36358}=deps;
 /* === Terraformer v0.36.381: Wiring / Grouping / Class Identity Fabric === */
const TF_WIRING_GROUPING_SYSTEMS_V36381=Object.freeze([{"id":"system.wiring","concept":"Wiring","type":"system-interconnection-process-system"},{"id":"system.grouping","concept":"Grouping","type":"system-organization-process-system"},{"id":"system.grouper","concept":"Grouper","type":"grouping-actor-system"},{"id":"system.group","concept":"Group","type":"logical-group-system"},{"id":"system.system-group","concept":"System Group","type":"system-membership-group-system"}]);

const TF_WIRING_GROUPING_RELATIONSHIPS_V36381=Object.freeze([
 Object.freeze({from:"system.wiring",relation:"uses",to:"system.wire"}),
 Object.freeze({from:"system.wiring",relation:"may-use",to:"system.socket"}),
 Object.freeze({from:"system.wiring",relation:"may-use",to:"system.carrier"}),
 Object.freeze({from:"system.grouping",relation:"produces",to:"system.group"}),
 Object.freeze({from:"system.grouper",relation:"part-of",to:"system.grouping"}),
 Object.freeze({from:"system.system-group",relation:"is-a",to:"system.group"}),
 Object.freeze({from:"system.system-group",relation:"groups",to:"system.system"}),
 Object.freeze({from:"system.class",relation:"uses",to:"system.number"}),
 Object.freeze({from:"system.class",relation:"uses",to:"system.name"})
]);
const TF_SYSTEM_WIRING_SCHEMA_V36381=Object.freeze({schema:"TERRAFORMER-SYSTEM-WIRING/1",derived:true,logical:true,admissionRequired:true,
 automaticConnect:false,automaticSocketOpen:false,networkBinding:false,externalEffect:false,authorityAmplification:false});
function tfSystemWiringCapabilityV36381(owner){
 const id=typeof owner==="string"?owner:String(owner?.id??"");if(!id)throw new Error("[TF:system.wiring:invalid-input] System identity required.");
 return Object.freeze({owner:id,id:id+"::wiring",system:"system.wiring",wireSystem:"system.wire",sourceSocket:id+"::socket",
  connectTo(target){const t=typeof target==="string"?target:String(target?.id??"");if(!t)throw new Error("[TF:system.wiring:invalid-target] Target System required.");return Object.freeze({wire:id+"::wire::"+t,source:id,target:t,logical:true,admitted:false,networkBound:false});},...TF_SYSTEM_WIRING_SCHEMA_V36381});
}
function tfLogicalSystemGroupsV36381(sourceText){
 const ids=tfCanonicalSystemIdsV36196(sourceText),buckets=new Map();
 for(const id of ids){const leaf=id.replace(/^system\./,""),key=leaf.includes(".")?leaf.split(".")[0]:"core";if(!buckets.has(key))buckets.set(key,[]);buckets.get(key).push(id);}
 const groups=[...buckets.entries()].sort((a,b)=>a[0].localeCompare(b[0])).map(([key,members],i)=>Object.freeze({id:"system-group."+key,system:"system.system-group",number:i+1,name:key,members:Object.freeze(members.sort())}));
 return Object.freeze({system:"system.grouping",grouper:"system.grouper",groups:Object.freeze(groups),groupCount:groups.length,systemsCovered:ids.length,logicalOnly:true,identityMutation:false});
}
function tfClassIdentityFabricV36381(sourceText){
 const classes=[...new Set([...sourceText.matchAll(/\bclass\s+([A-Za-z_$][\w$]*)/g)].map(m=>m[1]))].sort();
 const entries=classes.map((className,i)=>Object.freeze({classSystem:"system.class",className,number:Object.freeze({value:i+1,issuedBy:"system.numbering"}),
  name:Object.freeze({value:className,issuedBy:"system.naming"}),numberingService:"system.numbering",namingService:"system.naming",immutable:true}));
 return Object.freeze({classes:entries.length,numbersIssued:entries.length,namesIssued:entries.length,entries:Object.freeze(entries),everyClassNumbered:true,everyClassNamed:true});
}
function tfWiringGroupingClassIdentitySelfTestV36381(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[],added=TF_WIRING_GROUPING_SYSTEMS_V36381.map(x=>x.id);
 for(const id of [...added,"system.wire","system.socket","system.carrier","system.class","system.numbering","system.numberer","system.number","system.naming","system.namer","system.name","system.context","system.relationship"])if(!ids.has(id))missing.push(id);
 const wirings=[...ids].map(tfSystemWiringCapabilityV36381);if(wirings.length!==ids.size||new Set(wirings.map(w=>w.id)).size!==ids.size)missing.push("wiring-coverage");
 const probe=wirings[0].connectTo(wirings[wirings.length-1].owner);if(!probe.logical||probe.admitted||probe.networkBound)missing.push("wire-boundary");
 const groups=tfLogicalSystemGroupsV36381(sourceText),covered=new Set(groups.groups.flatMap(g=>g.members));if(covered.size!==ids.size||groups.identityMutation)missing.push("group-coverage");
 const ci=tfClassIdentityFabricV36381(sourceText);if(ci.numbersIssued!==ci.classes||ci.namesIssued!==ci.classes||new Set(ci.entries.map(e=>e.number.value)).size!==ci.classes||new Set(ci.entries.map(e=>e.name.value)).size!==ci.classes||ci.entries.some(e=>e.number.issuedBy!=="system.numbering"||e.name.issuedBy!=="system.naming"))missing.push("class-identity");
 const eo=new Set(tfUniversalEngineFabricV36349(sourceText).engines.map(x=>x.owner)),so=new Set(tfUniversalServiceFabricV36351(sourceText).services.map(x=>x.owner)),seeded=new Set(tfCompactSystemSeedV36353(sourceText).entries.map(x=>x.id)),summaries=new Set(tfUniversalActiveSummaryFabricV36358(sourceText).summaries.map(x=>x.owner));
 for(const id of added){if(!eo.has(id))missing.push("engine:"+id);if(!so.has(id))missing.push("service:"+id);if(!seeded.has(id))missing.push("seed:"+id);if(!summaries.has(id))missing.push("summary:"+id);}
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Wiring / Grouping / Class Identity failed: "+[...new Set(missing)].slice(0,64).join(",")+".");
 return Object.freeze({pass:true,newSystems:5,wireReused:true,systemsCovered:ids.size,wiringCapabilities:wirings.length,everySystemWiringCapability:true,
  logicalGroups:groups.groupCount,groupedSystems:covered.size,everySystemGrouped:true,classes:ci.classes,classNumbersIssued:ci.numbersIssued,classNamesIssued:ci.namesIssued,
  everyClassNumbered:true,everyClassNamed:true,automaticConnect:false,networkBinding:false,identityMutation:false,authorityAmplification:false,missing:0});
}
globalThis.TF_WIRING_GROUPING_SYSTEMS_V36381=TF_WIRING_GROUPING_SYSTEMS_V36381;
globalThis.TF_WIRING_GROUPING_RELATIONSHIPS_V36381=TF_WIRING_GROUPING_RELATIONSHIPS_V36381;
globalThis.TF_SYSTEM_WIRING_SCHEMA_V36381=TF_SYSTEM_WIRING_SCHEMA_V36381;
globalThis.tfSystemWiringCapabilityV36381=tfSystemWiringCapabilityV36381;
globalThis.tfLogicalSystemGroupsV36381=tfLogicalSystemGroupsV36381;
globalThis.tfClassIdentityFabricV36381=tfClassIdentityFabricV36381;
 return Object.freeze({TF_WIRING_GROUPING_SYSTEMS_V36381,TF_WIRING_GROUPING_RELATIONSHIPS_V36381,TF_SYSTEM_WIRING_SCHEMA_V36381,tfSystemWiringCapabilityV36381,tfLogicalSystemGroupsV36381,tfClassIdentityFabricV36381,tfWiringGroupingClassIdentitySelfTestV36381});
}
module.exports=Object.freeze({bindWiringGroupingClassIdentityV04627});
