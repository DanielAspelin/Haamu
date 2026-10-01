"use strict";
function bindPhysicalSystemDomainsV04640(deps={}){
 const {tfCanonicalSystemIdsV36196,tfUniversalEngineFabricV36349,tfUniversalServiceFabricV36351,tfCompactSystemSeedV36353,tfUniversalSystemLayerFabricV36389,tfUniversalSystemDefaultsFabricV36388}=deps;
 /* === Terraformer v0.36.393: Power / Electric / Electronic System-Domain Coverage === */
const TF_PHYSICAL_SYSTEM_DOMAIN_SYSTEMS_V36393=Object.freeze([
 Object.freeze({id:"system.electric",concept:"Electric",type:"physical-system-domain",mode:"electric-phenomena-and-system-description",condition:"electric-context-admitted",state:"ready"}),
 Object.freeze({id:"system.electronic",concept:"Electronic",type:"physical-system-domain",mode:"electronic-device-and-system-description",condition:"electronic-context-admitted",state:"ready"})
]);
const TF_PHYSICAL_SYSTEM_DOMAIN_RELATIONSHIPS_V36393=Object.freeze([
 Object.freeze({from:"system.power",relation:"peer-domain-of",to:"system.computation"}),
 Object.freeze({from:"system.electric",relation:"peer-domain-of",to:"system.computation"}),
 Object.freeze({from:"system.electronic",relation:"peer-domain-of",to:"system.computation"}),
 Object.freeze({from:"system.electronic",relation:"may-use",to:"system.electric"}),
 Object.freeze({from:"system.computation",relation:"may-use",to:"system.electronic"}),
 Object.freeze({from:"system.computer",relation:"may-use",to:"system.electronic"}),
 Object.freeze({from:"system.electronic",relation:"may-use",to:"system.hardware"})
]);
const TF_PHYSICAL_SYSTEM_DOMAIN_COVERAGE_V36393=Object.freeze({system:"system.system",domains:Object.freeze([
 Object.freeze({id:"system.power",reused:true,scope:"power systems"}),
 Object.freeze({id:"system.electric",reused:false,scope:"electric systems"}),
 Object.freeze({id:"system.electronic",reused:false,scope:"electronic systems"}),
 Object.freeze({id:"system.computation",reused:true,scope:"computational systems"})
]),distinctDomains:true,descriptiveByDefault:true,automaticHardwareControl:false,automaticElectricalActuation:false,authorityAmplification:false});
function tfPhysicalSystemDomainContextV36393(domain,subject=null){
 const admitted=new Set(TF_PHYSICAL_SYSTEM_DOMAIN_COVERAGE_V36393.domains.map(x=>x.id));domain=String(domain??"");
 if(!admitted.has(domain))throw new Error("[TF:system.system:invalid-domain] Power, electric, electronic, or computation domain required.");
 return Object.freeze({system:"system.context",type:"system-domain-context",domain,subject,descriptive:true,automaticHardwareControl:false,
  automaticElectricalActuation:false,externalEffect:false,authorityAmplification:false});
}
function tfPhysicalSystemDomainSelfTestV36393(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.power","system.electric","system.electronic","system.computation","system.computer","system.hardware","system.context"])if(!ids.has(id))missing.push(id);
 for(const d of ["system.power","system.electric","system.electronic","system.computation"]){const c=tfPhysicalSystemDomainContextV36393(d);if(c.domain!==d||!c.descriptive||c.automaticHardwareControl||c.automaticElectricalActuation||c.externalEffect||c.authorityAmplification)missing.push("domain:"+d);}
 const eo=new Set(tfUniversalEngineFabricV36349(sourceText).engines.map(x=>x.owner)),so=new Set(tfUniversalServiceFabricV36351(sourceText).services.map(x=>x.owner)),seeded=new Set(tfCompactSystemSeedV36353(sourceText).entries.map(x=>x.id));
 for(const id of ["system.electric","system.electronic"]){if(!eo.has(id))missing.push("engine:"+id);if(!so.has(id))missing.push("service:"+id);if(!seeded.has(id))missing.push("seed:"+id);}
 const layers=tfUniversalSystemLayerFabricV36389(sourceText),defs=tfUniversalSystemDefaultsFabricV36388(sourceText);if(layers.layers!==ids.size||defs.defaults!==ids.size)missing.push("universal-fabric");
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Physical System Domain coverage failed: "+[...new Set(missing)].join(",")+".");
 return Object.freeze({pass:true,newSystems:2,powerReused:true,electric:true,electronic:true,computationReused:true,computerReused:true,hardwareReused:true,
  distinctDomains:true,systemsCovered:ids.size,everySystemOwnLayer:true,everySystemOwnDefaults:true,automaticHardwareControl:false,automaticElectricalActuation:false,
  authorityAmplification:false,missing:0});
}
globalThis.TF_PHYSICAL_SYSTEM_DOMAIN_SYSTEMS_V36393=TF_PHYSICAL_SYSTEM_DOMAIN_SYSTEMS_V36393;globalThis.TF_PHYSICAL_SYSTEM_DOMAIN_RELATIONSHIPS_V36393=TF_PHYSICAL_SYSTEM_DOMAIN_RELATIONSHIPS_V36393;
globalThis.TF_PHYSICAL_SYSTEM_DOMAIN_COVERAGE_V36393=TF_PHYSICAL_SYSTEM_DOMAIN_COVERAGE_V36393;globalThis.tfPhysicalSystemDomainContextV36393=tfPhysicalSystemDomainContextV36393;
 return Object.freeze({TF_PHYSICAL_SYSTEM_DOMAIN_SYSTEMS_V36393,TF_PHYSICAL_SYSTEM_DOMAIN_RELATIONSHIPS_V36393,TF_PHYSICAL_SYSTEM_DOMAIN_COVERAGE_V36393,tfPhysicalSystemDomainContextV36393,tfPhysicalSystemDomainSelfTestV36393});
}
module.exports=Object.freeze({bindPhysicalSystemDomainsV04640});
