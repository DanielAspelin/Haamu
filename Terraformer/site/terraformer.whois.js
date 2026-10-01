"use strict";
function bindWHOISV04568(deps={}){
 const {tfCanonicalSystemIdsV36196}=deps;
 /* === Terraformer v0.36.327: WHOIS System === */
const TF_WHOIS_SYSTEM_V36327=Object.freeze({
 id:"system.whois",concept:"WHOIS",type:"registration-information-lookup-system",
 mode:"read-only-registration-query",condition:"query-target-identified",state:"ready"
});
const TF_WHOIS_RELATIONSHIPS_V36327=Object.freeze([
 Object.freeze({from:"system.whois",relation:"operates-on",to:"system.domain"}),
 Object.freeze({from:"system.whois",relation:"uses",to:"system.registration"}),
 Object.freeze({from:"system.whois",relation:"may-reference",to:"system.registrar"}),
 Object.freeze({from:"system.whois",relation:"may-reference",to:"system.registry"})
]);
function tfWHOISPlanV36327(spec={}){
 const target=String(spec.target??"").trim().toLowerCase();if(!target)throw new Error("WHOIS target required");
 return Object.freeze({system:"system.whois",target,operation:"registration-information-query-plan",
  readOnly:true,dnsResolution:false,icmpReachability:false,registrationAuthority:false,
  dataCompletenessAssumed:false,dataCurrencyAssumed:false,registrantPublicityAssumed:false,
  queryPerformed:false,networkTransmission:false,persistencePerformed:false,authorityGranted:false});
}
function tfWHOISSelfTestV36327(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[];
 for(const id of ["system.whois","system.domain","system.registration","system.registrar","system.registry"])if(!ids.has(id))missing.push(id);
 const p=tfWHOISPlanV36327({target:"haamu.space"});
 if(!p.readOnly||p.dnsResolution||p.icmpReachability||p.registrationAuthority||p.dataCompletenessAssumed||p.dataCurrencyAssumed||p.registrantPublicityAssumed||p.queryPerformed||p.networkTransmission||p.authorityGranted)missing.push("whois-boundary");
 if(missing.length)throw new Error("WHOIS qualification failure "+[...new Set(missing)].join(","));
 return Object.freeze({pass:true,newSystems:1,whois:true,domainReused:true,registrationReused:true,registrarReused:true,registryReused:true,
  readOnly:true,dnsDistinct:true,icmpDistinct:true,queryPerformed:false,networkTransmission:false,authorityAmplification:false,missing:0});
}
 return Object.freeze({TF_WHOIS_SYSTEM_V36327,TF_WHOIS_RELATIONSHIPS_V36327,tfWHOISPlanV36327,tfWHOISSelfTestV36327});
}
module.exports=Object.freeze({bindWHOISV04568});
