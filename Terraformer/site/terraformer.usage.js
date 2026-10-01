"use strict";
function bindUsageHaltingV04637(deps={}){
 const {tfCanonicalSystemIdsV36196,tfRuntimeLayerV36390,tfUniversalEngineFabricV36349,tfUniversalServiceFabricV36351,tfCompactSystemSeedV36353,tfUniversalSystemLayerFabricV36389,tfUniversalSystemDefaultsFabricV36388}=deps;
 /* === Terraformer v0.36.391: Usage / User + Halting / Halter Fabric === */
const TF_USAGE_HALTING_SYSTEMS_V36391=Object.freeze([
 Object.freeze({id:"system.usage",concept:"Usage",type:"use-process-system",mode:"bounded-admitted-use",condition:"usage-context-admitted",state:"ready"}),
 Object.freeze({id:"system.halting",concept:"Halting",type:"runtime-stop-process-system",mode:"bounded-runtime-halt",condition:"halting-admitted",state:"ready"}),
 Object.freeze({id:"system.halter",concept:"Halter",type:"halting-actor-system",mode:"bounded-runtime-halt-actor",condition:"halting-admitted",state:"ready"})
]);
const TF_USAGE_HALTING_RELATIONSHIPS_V36391=Object.freeze([
 Object.freeze({from:"system.user",relation:"part-of",to:"system.usage"}),
 Object.freeze({from:"system.usage",relation:"performed-by",to:"system.user"}),
 Object.freeze({from:"system.halter",relation:"part-of",to:"system.halting"}),
 Object.freeze({from:"system.halting",relation:"distinct-from",to:"system.pausing"}),
 Object.freeze({from:"system.halting",relation:"may-regulate",to:"system.looping"}),
 Object.freeze({from:"system.halting",relation:"may-transition",to:"system.layer"})
]);
function tfUsageV36391(user,subject,spec={}){
 if(!user)throw new Error("[TF:system.usage:missing-user] User required.");
 return Object.freeze({system:"system.usage",user,subject:subject??null,purpose:spec.purpose??null,admitted:spec.admitted===true,
  automaticAuthority:false,automaticMutation:false,persistence:false,externalEffect:false});
}
function tfHaltV36391(runtimeLayer,reason="admitted-halt"){
 if(!runtimeLayer?.id?.endsWith("::layer"))throw new Error("[TF:system.halting:invalid-layer] Runtime System Layer required.");
 return Object.freeze({system:"system.halting",halter:"system.halter",layer:runtimeLayer.id,reason:String(reason),halted:true,resumableByExplicitLifecycleTransition:true,
  pause:false,termination:false,automaticRestart:false,externalEffect:false,authorityAmplification:false});
}
function tfUsageHaltingSelfTestV36391(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.usage","system.user","system.halting","system.halter","system.pausing","system.pause","system.termination","system.runtime","system.layer","system.looping"])if(!ids.has(id))missing.push(id);
 const u=tfUsageV36391("fixture-user","system.usage",{admitted:true});if(!u.admitted||u.automaticAuthority||u.automaticMutation||u.persistence||u.externalEffect)missing.push("usage-boundary");
 const h=tfHaltV36391(tfRuntimeLayerV36390("system.looping"));if(!h.halted||!h.resumableByExplicitLifecycleTransition||h.pause||h.termination||h.automaticRestart||h.externalEffect||h.authorityAmplification)missing.push("halt-boundary");
 const eo=new Set(tfUniversalEngineFabricV36349(sourceText).engines.map(x=>x.owner)),so=new Set(tfUniversalServiceFabricV36351(sourceText).services.map(x=>x.owner)),seeded=new Set(tfCompactSystemSeedV36353(sourceText).entries.map(x=>x.id));
 for(const id of ["system.usage","system.halting","system.halter"]){if(!eo.has(id))missing.push("engine:"+id);if(!so.has(id))missing.push("service:"+id);if(!seeded.has(id))missing.push("seed:"+id);}
 const layers=tfUniversalSystemLayerFabricV36389(sourceText),defs=tfUniversalSystemDefaultsFabricV36388(sourceText);if(layers.layers!==ids.size||defs.defaults!==ids.size)missing.push("universal-fabric");
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Usage / Halting failed: "+[...new Set(missing)].join(",")+".");
 return Object.freeze({pass:true,newSystems:3,userReused:true,usage:true,userUnderUsage:true,halting:true,halter:true,haltEventRepresentedByHalting:true,
  haltingDistinctFromPausing:true,haltingDistinctFromTermination:true,systemsCovered:ids.size,everySystemOwnLayer:true,everySystemOwnDefaults:true,
  automaticRestart:false,authorityAmplification:false,missing:0});
}
globalThis.TF_USAGE_HALTING_SYSTEMS_V36391=TF_USAGE_HALTING_SYSTEMS_V36391;globalThis.TF_USAGE_HALTING_RELATIONSHIPS_V36391=TF_USAGE_HALTING_RELATIONSHIPS_V36391;
globalThis.tfUsageV36391=tfUsageV36391;globalThis.tfHaltV36391=tfHaltV36391;
 return Object.freeze({TF_USAGE_HALTING_SYSTEMS_V36391,TF_USAGE_HALTING_RELATIONSHIPS_V36391,tfUsageV36391,tfHaltV36391,tfUsageHaltingSelfTestV36391});
}
/* === Terraformer v0.40.61 — Universal Usage-Designed System Contract === */
const TF_USAGE_DESIGN_V4061=Object.freeze({
 version:"0.40.61",system:"system.usage",appliesTo:"every-canonical-system",
 readiness:Object.freeze(["USABLE","CONDITIONAL","INTERNAL","OBSERVATIONAL","UNAVAILABLE","UNKNOWN"]),
 required:Object.freeze(["purpose","consumer","entry","output","conditions","limits","readiness"]),
 invariants:Object.freeze([
  "every-system-is-designed-for-usage",
  "usage-design-does-not-imply-public-or-interactive-use",
  "usage-design-does-not-imply-executability",
  "usage-design-does-not-grant-permission-or-authority",
  "unavailable-systems-retain-an-explicit-usage-contract",
  "unknown-usage-readiness-is-not-usable",
  "usage-remains-subject-to-admission-policy-authorization-and-limits"
 ])
});
function tfUsageDesignV4061(systemId,{purpose="unspecified",consumer="system",
 entry="governed-interface",output="declared-result",conditions=[],limits=[],readiness="UNKNOWN"}={}){
 if(!String(systemId).startsWith("system."))throw new TypeError("systemId");
 if(!TF_USAGE_DESIGN_V4061.readiness.includes(readiness))throw new RangeError("readiness");
 return Object.freeze({systemId:String(systemId),purpose:String(purpose),consumer:String(consumer),
  entry:String(entry),output:String(output),conditions:Object.freeze(conditions.map(String)),
  limits:Object.freeze(limits.map(String)),readiness,designedForUsage:true,
  authority:false,permission:false,public:false});
}
function tfUniversalUsageProjectionV4061(systemIds=[]){
 const ids=[...new Set(systemIds.map(String).filter(x=>x.startsWith("system.")))];
 return Object.freeze(ids.map(id=>tfUsageDesignV4061(id,{
  purpose:"canonical-system-purpose",consumer:"governed-consumer",
  entry:"system-usage-boundary",output:"system-defined-output",
  conditions:["admission","policy","authorization-when-required","availability"],
  limits:["occupation","limitation","delimitation"],readiness:"UNKNOWN"
 })));
}
function tfUsageDesignCoverageV4061(systemIds=[]){
 const p=tfUniversalUsageProjectionV4061(systemIds);
 const bad=p.filter(x=>!x.designedForUsage||TF_USAGE_DESIGN_V4061.required.some(k=>x[k]===undefined));
 return Object.freeze({systems:p.length,covered:p.length-bad.length,missing:bad.length,
  complete:bad.length===0,contracts:p});
}
function tfUsageAdmissionViewV4061(design,{availability="UNKNOWN",occupation="UNKNOWN",admitted=false,authorized=false}={}){
 const usable=design.readiness==="USABLE"&&availability==="AVAILABLE"&&admitted===true&&authorized===true;
 return Object.freeze({systemId:design.systemId,readiness:design.readiness,availability,occupation,
  admitted:Boolean(admitted),authorized:Boolean(authorized),usableNow:usable});
}
function tfUsageDesignQualificationV4061(){
 const f=[],ids=["system.io","system.language","system.availability","system.occupation","system.usage"];
 const c=tfUsageDesignCoverageV4061(ids);
 if(!c.complete||c.covered!==ids.length)f.push("coverage");
 if(c.contracts.some(x=>x.readiness!=="UNKNOWN"))f.push("unknown-default");
 const d=tfUsageDesignV4061("system.io",{purpose:"IO circulation",consumer:"system",
  readiness:"USABLE",conditions:["admission"],limits:["occupation"]});
 const denied=tfUsageAdmissionViewV4061(d,{availability:"AVAILABLE",admitted:true,authorized:false});
 const allowed=tfUsageAdmissionViewV4061(d,{availability:"AVAILABLE",admitted:true,authorized:true});
 if(denied.usableNow||!allowed.usableNow)f.push("gate");
 if(d.authority||d.permission||d.public)f.push("authority");
 if(f.length)throw Error("Usage-design qualification failed:"+f.join(","));
 return Object.freeze({pass:true,version:"0.40.61",universalUsageDesign:true,
  explicitUsageContract:true,unknownNotUsable:true,admissionAuthorizationGate:true,
  availabilityIntegrated:true,occupationIntegrated:true,nonAuthorizing:true});
}

module.exports=Object.freeze({bindUsageHaltingV04637,TF_USAGE_DESIGN_V4061,tfUsageDesignV4061,tfUniversalUsageProjectionV4061,tfUsageDesignCoverageV4061,tfUsageAdmissionViewV4061,tfUsageDesignQualificationV4061});
