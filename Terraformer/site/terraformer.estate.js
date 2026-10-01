"use strict";
function bindEstateMerchFranchiseV04618(deps={}){
 const {tfCanonicalSystemIdsV36196,tfUniversalEngineFabricV36349,tfUniversalServiceFabricV36351,tfCompactSystemSeedV36353,tfUniversalActiveSummaryFabricV36358}=deps;
 /* === Terraformer v0.36.374: Estate / Merchandising / Franchising Fabric === */
const TF_ESTATE_MERCH_FRANCHISE_SYSTEMS_V36374=Object.freeze([{"id":"system.estate","concept":"Estate","type":"estate-domain-system"},{"id":"system.merchandising","concept":"Merchandising","type":"merchandising-process-system"},{"id":"system.merchandiser","concept":"Merchandiser","type":"merchandising-actor-system"},{"id":"system.franchising","concept":"Franchising","type":"franchising-process-system"},{"id":"system.franchisor","concept":"Franchisor","type":"franchising-role-system"}]);

const TF_ESTATE_MERCH_FRANCHISE_RELATIONSHIPS_V36374=Object.freeze([
 Object.freeze({from:"system.estate",relation:"may-use",to:"system.catalog"}),
 Object.freeze({from:"system.estate",relation:"may-use",to:"system.inventory"}),
 Object.freeze({from:"system.merchandising",relation:"may-use",to:"system.marketing"}),
 Object.freeze({from:"system.merchandising",relation:"may-use",to:"system.sales"}),
 Object.freeze({from:"system.merchandising",relation:"may-use",to:"system.store"}),
 Object.freeze({from:"system.merchandiser",relation:"part-of",to:"system.merchandising"}),
 Object.freeze({from:"system.franchising",relation:"may-use",to:"system.contract"}),
 Object.freeze({from:"system.franchising",relation:"may-use",to:"system.legal"}),
 Object.freeze({from:"system.franchisor",relation:"part-of",to:"system.franchising"})
]);
function tfEstateMerchFranchisePlanV36374(kind,spec={}){
 const map={estate:"system.estate",merchandising:"system.merchandising",merchandiser:"system.merchandiser",franchising:"system.franchising",franchisor:"system.franchisor"},id=map[String(kind??"").toLowerCase()];
 if(!id)throw new Error("[TF:system.business:invalid-input] Estate, Merchandising, Merchandiser, Franchising, or Franchisor required.");
 return Object.freeze({system:id,subject:spec.subject??null,planOnly:true,ownershipClaimed:false,salePerformed:false,licenseGranted:false,
  contractExecuted:false,legalAuthority:false,persistencePerformed:false,externalEffect:false,authorityGranted:false});
}
function tfEstateMerchFranchiseSelfTestV36374(sourceText){
 const ids=new Set(tfCanonicalSystemIdsV36196(sourceText)),missing=[],added=TF_ESTATE_MERCH_FRANCHISE_SYSTEMS_V36374.map(x=>x.id);
 for(const id of [...added,"system.catalog","system.inventory","system.marketing","system.sales","system.store","system.contract","system.legal","system.summary","system.engine","system.service","system.seed"])if(!ids.has(id))missing.push(id);
 for(const k of ["estate","merchandising","merchandiser","franchising","franchisor"]){const p=tfEstateMerchFranchisePlanV36374(k,{subject:"fixture"});if(!p.planOnly||p.ownershipClaimed||p.salePerformed||p.licenseGranted||p.contractExecuted||p.legalAuthority||p.authorityGranted)missing.push("boundary:"+k);}
 const eo=new Set(tfUniversalEngineFabricV36349(sourceText).engines.map(x=>x.owner)),so=new Set(tfUniversalServiceFabricV36351(sourceText).services.map(x=>x.owner)),seeded=new Set(tfCompactSystemSeedV36353(sourceText).entries.map(x=>x.id)),summaries=new Set(tfUniversalActiveSummaryFabricV36358(sourceText).summaries.map(x=>x.owner));
 for(const id of added){if(!eo.has(id))missing.push("engine:"+id);if(!so.has(id))missing.push("service:"+id);if(!seeded.has(id))missing.push("seed:"+id);if(!summaries.has(id))missing.push("summary:"+id);}
 if(missing.length)throw new Error("[TF:system.assurance:qualification-failed] Estate / Merchandising / Franchising qualification failed: "+[...new Set(missing)].join(",")+".");
 return Object.freeze({pass:true,newSystems:5,estate:true,merchandising:true,merchandiser:true,franchising:true,franchisor:true,
  systemsWithEngines:5,systemsWithServices:5,systemsInCompactSeed:5,systemsWithActiveSummaries:5,ownershipClaimed:false,salePerformed:false,
  licenseGranted:false,contractExecuted:false,legalAuthority:false,authorityAmplification:false,missing:0});
}
globalThis.TF_ESTATE_MERCH_FRANCHISE_SYSTEMS_V36374=TF_ESTATE_MERCH_FRANCHISE_SYSTEMS_V36374;
globalThis.TF_ESTATE_MERCH_FRANCHISE_RELATIONSHIPS_V36374=TF_ESTATE_MERCH_FRANCHISE_RELATIONSHIPS_V36374;
globalThis.tfEstateMerchFranchisePlanV36374=tfEstateMerchFranchisePlanV36374;
 return Object.freeze({TF_ESTATE_MERCH_FRANCHISE_SYSTEMS_V36374,TF_ESTATE_MERCH_FRANCHISE_RELATIONSHIPS_V36374,tfEstateMerchFranchisePlanV36374,tfEstateMerchFranchiseSelfTestV36374});
}
module.exports=Object.freeze({bindEstateMerchFranchiseV04618});
